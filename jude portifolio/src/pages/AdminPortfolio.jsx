import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminPortfolio() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', image_url: '', category: '', link_url: '' });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
    fetchItems();
  }, [navigate]);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('portfolio_items').select('*').order('created_at', { ascending: false });
    if (error) console.error('Error fetching items:', error);
    else setItems(data || []);
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
      handleCancel();
      fetchItems();
    } catch (error) {
      alert('Error saving item: ' + error.message);
    }
  };

  const handleImageUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `portfolio-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('portfolio').upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio').getPublicUrl(fileName);
      setFormData({ ...formData, image_url: data.publicUrl });
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await supabase.from('portfolio_items').delete().eq('id', id);
      fetchItems();
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setFormData({ title: '', description: '', image_url: '', category: '', link_url: '' });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-['Poppins']">Portfolio</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-[#e05532] text-white px-4 py-2 rounded hover:bg-[#c44b2b] font-['Poppins']">
            {showForm ? 'Cancel' : 'Add Item'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border p-2 rounded" required />
              <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="border p-2 rounded" />
              <input type="text" placeholder="Link URL" value={formData.link_url} onChange={e => setFormData({...formData, link_url: e.target.value})} className="border p-2 rounded" />
              <div className="flex items-center gap-2">
                 <input type="text" placeholder="Image URL" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="border p-2 rounded flex-1" />
                 <label className="cursor-pointer bg-gray-200 px-3 py-2 rounded hover:bg-gray-300">
                    Upload
                    <input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                 </label>
              </div>
              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="border p-2 rounded md:col-span-2" rows="3" />
            </div>
            <button type="submit" className="mt-4 bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 font-['Poppins']">
              {editId ? 'Update' : 'Save'}
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />}
              <div className="p-4">
                <h3 className="font-bold text-lg font-['Poppins']">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline text-sm font-['Poppins']">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline text-sm font-['Poppins']">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}