import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminSocial() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState({ platform: '', url: '', icon_class: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
    fetchLinks();
  }, [navigate]);

  const fetchLinks = async () => {
    const { data } = await supabase.from('social_links').select('*');
    setLinks(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await supabase.from('social_links').update(formData).eq('id', editId);
    } else {
      await supabase.from('social_links').insert([formData]);
    }
    setFormData({ platform: '', url: '', icon_class: '' });
    setEditId(null);
    fetchLinks();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this link?')) {
      await supabase.from('social_links').delete().eq('id', id);
      fetchLinks();
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-['Poppins']">Social Media Links</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Platform (e.g. Twitter)" value={formData.platform} onChange={e => setFormData({...formData, platform: e.target.value})} className="border p-2 rounded" required />
          <input type="text" placeholder="URL" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="border p-2 rounded" required />
          <input type="text" placeholder="Icon Class (e.g. fab fa-twitter)" value={formData.icon_class} onChange={e => setFormData({...formData, icon_class: e.target.value})} className="border p-2 rounded" />
          
          <div className="md:col-span-3 flex gap-2">
            <button type="submit" className="bg-[#e05532] text-white px-6 py-2 rounded hover:bg-[#c44b2b] font-['Poppins']">
              {editId ? 'Update' : 'Add Link'}
            </button>
            {editId && <button type="button" onClick={() => { setEditId(null); setFormData({ platform: '', url: '', icon_class: '' }); }} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map(link => (
            <div key={link.id} className="bg-white p-4 rounded-lg shadow border border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold font-['Poppins']">{link.platform}</h3>
                <a href={link.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate block max-w-[200px]">{link.url}</a>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setFormData(link); setEditId(link.id); }} className="text-gray-600 hover:text-blue-600">Edit</button>
                <button onClick={() => handleDelete(link.id)} className="text-gray-600 hover:text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}