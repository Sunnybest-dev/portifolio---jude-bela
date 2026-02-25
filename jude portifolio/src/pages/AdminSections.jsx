import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminSections() {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ page_name: '', section_name: '', background_value: '', order_position: 1, is_active: true });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
    fetchSections();
  }, [navigate]);

  const fetchSections = async () => {
    const { data } = await supabase.from('page_sections').select('*').order('page_name, order_position');
    setSections(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await supabase.from('page_sections').update(formData).eq('id', editId);
    } else {
      await supabase.from('page_sections').insert([formData]);
    }
    setShowForm(false);
    setEditId(null);
    setFormData({ page_name: '', section_name: '', background_value: '', order_position: 1, is_active: true });
    fetchSections();
  };

  const handleEdit = (section) => {
    setFormData(section);
    setEditId(section.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this section?')) {
      await supabase.from('page_sections').delete().eq('id', id);
      fetchSections();
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">Page Sections</h1>
          <button onClick={() => setShowForm(!showForm)} style={{background: 'linear-gradient(to right, #e05532, #c44b2b)'}} className="text-white px-6 py-2 rounded-lg hover:opacity-90 shadow-lg transform hover:scale-105 transition-all duration-200 font-['Poppins'] font-medium">
            {showForm ? 'Cancel' : 'Add New'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Page Name *</label>
                <input type="text" value={formData.page_name} onChange={(e) => setFormData({...formData, page_name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Section Name *</label>
                <input type="text" value={formData.section_name} onChange={(e) => setFormData({...formData, section_name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Background Image URL</label>
                <input type="text" value={formData.background_value} onChange={(e) => setFormData({...formData, background_value: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" placeholder="https://example.com/image.jpg or /images/bg.jpg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Or Upload Image File</label>
                <input type="file" accept="image/*" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" />
                <p className="text-xs text-gray-500 mt-1">Upload will override the URL above</p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Order</label>
                <input type="number" value={formData.order_position} onChange={(e) => setFormData({...formData, order_position: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="mr-2" />
                <label className="text-sm font-semibold font-['Poppins']">Active</label>
              </div>
            </div>
            <button type="submit" style={{backgroundColor: '#e05532'}} className="mt-4 text-white px-8 py-3 rounded-lg hover:opacity-90 font-['Poppins'] font-semibold shadow-lg">
              {editId ? 'Save Changes' : 'Save'}
            </button>
          </form>
        )}

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold font-['Poppins']">{section.page_name} - {section.section_name}</h3>
                  <p className="text-sm text-gray-600 font-['Poppins']">Order: {section.order_position} | Image: {section.background_value}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(section)} className="text-[#e05532] hover:underline font-['Poppins']">Edit</button>
                  <button onClick={() => handleDelete(section.id)} className="text-red-600 hover:underline font-['Poppins']">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
