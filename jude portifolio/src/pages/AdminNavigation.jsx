import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminNavigation() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState({ label: '', url: '', order_position: 0 });
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
    const { data } = await supabase.from('navigation_links').select('*').order('order_position');
    setLinks(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await supabase.from('navigation_links').update(formData).eq('id', editId);
    } else {
      await supabase.from('navigation_links').insert([formData]);
    }
    setFormData({ label: '', url: '', order_position: 0 });
    setEditId(null);
    fetchLinks();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this link?')) {
      await supabase.from('navigation_links').delete().eq('id', id);
      fetchLinks();
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-['Poppins']">Navigation Links</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200 flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold mb-1 uppercase text-gray-500">Label</label>
            <input type="text" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full border p-2 rounded" required />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold mb-1 uppercase text-gray-500">URL</label>
            <input type="text" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full border p-2 rounded" required />
          </div>
          <div className="w-20">
            <label className="block text-xs font-bold mb-1 uppercase text-gray-500">Order</label>
            <input type="number" value={formData.order_position} onChange={e => setFormData({...formData, order_position: parseInt(e.target.value)})} className="w-full border p-2 rounded" />
          </div>
          <button type="submit" className="bg-[#e05532] text-white px-6 py-2 rounded hover:bg-[#c44b2b] font-['Poppins'] h-[42px]">
            {editId ? 'Update' : 'Add'}
          </button>
          {editId && <button type="button" onClick={() => { setEditId(null); setFormData({ label: '', url: '', order_position: 0 }); }} className="bg-gray-500 text-white px-4 py-2 rounded h-[42px]">Cancel</button>}
        </form>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          {links.map(link => (
            <div key={link.id} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">#{link.order_position}</span>
                <span className="font-bold font-['Poppins']">{link.label}</span>
                <span className="text-gray-500 text-sm font-mono">{link.url}</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setFormData(link); setEditId(link.id); }} className="text-blue-600 hover:underline text-sm">Edit</button>
                <button onClick={() => handleDelete(link.id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}