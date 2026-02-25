import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', thumbnail_url: '', youtube_url: '', order_position: 1, is_active: true
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from('portfolio_items').select('*').order('order_position');
    setItems(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const { error } = await supabase.from('portfolio_items').update(formData).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('portfolio_items').insert([formData]);
        if (error) throw error;
      }
      setShowForm(false);
      setEditId(null);
      setFormData({ title: '', description: '', category: '', thumbnail_url: '', youtube_url: '', order_position: 1, is_active: true });
      await fetchItems();
      alert('Saved successfully!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this item?')) {
      await supabase.from('portfolio_items').delete().eq('id', id);
      fetchItems();
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-['Poppins']">Portfolio Items</h1>
          <button onClick={() => setShowForm(!showForm)} style={{background: 'linear-gradient(to right, #e05532, #c44b2b)'}} className="text-white px-6 py-2 rounded-lg hover:opacity-90 shadow-lg transform hover:scale-105 transition-all duration-200 font-['Poppins'] font-medium">
            {showForm ? 'Cancel' : 'Add New'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]"
                >
                  <option value="">Select</option>
                  <option value="Series">Series</option>
                  <option value="Channel">Channel</option>
                  <option value="Collaboration">Collaboration</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Thumbnail URL *</label>
                <input
                  type="text"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]"
                  placeholder="/images/thumb.webp"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">YouTube URL</label>
                <input
                  type="text"
                  value={formData.youtube_url}
                  onChange={(e) => setFormData({...formData, youtube_url: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]"
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Order</label>
                <input
                  type="number"
                  value={formData.order_position}
                  onChange={(e) => setFormData({...formData, order_position: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm font-semibold font-['Poppins']">Active</label>
              </div>
            </div>
            <button type="submit" style={{backgroundColor: '#e05532'}} className="mt-4 text-white px-8 py-3 rounded-lg hover:opacity-90 font-['Poppins'] font-semibold shadow-lg">
              {editId ? 'Save Changes' : 'Save'}
            </button>
          </form>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
              <img src={item.thumbnail_url} alt={item.title} className="w-32 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold font-['Poppins']">{item.title}</h3>
                <p className="text-sm text-gray-600 font-['Poppins']">{item.category} - Order: {item.order_position}</p>
                <p className="text-xs text-gray-500 font-['Poppins']">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="text-[#e05532] hover:underline font-['Poppins']">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline font-['Poppins']">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
