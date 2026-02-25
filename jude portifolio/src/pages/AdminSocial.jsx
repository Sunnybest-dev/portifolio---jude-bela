import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminSocial() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ platform: '', url: '', icon_url: '', order_position: 1, is_active: true });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    const { data } = await supabase.from('social_links').select('*').order('order_position');
    setItems(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await supabase.from('social_links').update(formData).eq('id', editId);
    } else {
      await supabase.from('social_links').insert([formData]);
    }
    setShowForm(false);
    setEditId(null);
    setFormData({ platform: '', url: '', icon_url: '', order_position: 1, is_active: true });
    fetchItems();
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">Social Links</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-[#e05532] text-white px-6 py-2 rounded-lg hover:bg-[#c44b2b] font-['Poppins'] font-medium">
            {showForm ? 'Cancel' : 'Add New'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Platform *</label>
                <input type="text" value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">URL *</label>
                <input type="text" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Icon URL</label>
                <input type="text" value={formData.icon_url} onChange={(e) => setFormData({...formData, icon_url: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Order</label>
                <input type="number" value={formData.order_position} onChange={(e) => setFormData({...formData, order_position: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" />
              </div>
            </div>
            <button type="submit" style={{backgroundColor: '#e05532'}} className="mt-4 text-white px-8 py-3 rounded-lg hover:opacity-90 font-['Poppins'] font-semibold shadow-lg">
              {editId ? 'Save Changes' : 'Save'}
            </button>
          </form>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold font-['Poppins']">{item.platform}</h3>
                <p className="text-sm text-gray-600 font-['Poppins']">{item.url}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setFormData(item); setEditId(item.id); setShowForm(true); }} className="text-[#e05532] hover:underline font-['Poppins']">Edit</button>
                <button onClick={async () => { if (confirm('Delete?')) { await supabase.from('social_links').delete().eq('id', item.id); fetchItems(); }}} className="text-red-600 hover:underline font-['Poppins']">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
