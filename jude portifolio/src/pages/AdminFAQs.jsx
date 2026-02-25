import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminFAQs() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ question: '', answer: '', category: '', order_position: 1, is_active: true });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
    fetchFaqs();
  }, [navigate]);

  const fetchFaqs = async () => {
    const { data } = await supabase.from('faqs').select('*').order('order_position');
    setFaqs(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await supabase.from('faqs').update(formData).eq('id', editId);
    } else {
      await supabase.from('faqs').insert([formData]);
    }
    setShowForm(false);
    setEditId(null);
    setFormData({ question: '', answer: '', category: '', order_position: 1, is_active: true });
    fetchFaqs();
  };

  const handleEdit = (faq) => {
    setFormData(faq);
    setEditId(faq.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this FAQ?')) {
      await supabase.from('faqs').delete().eq('id', id);
      fetchFaqs();
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins']">FAQs Management</h1>
          <button onClick={() => setShowForm(!showForm)} style={{background: 'linear-gradient(to right, #e05532, #c44b2b)'}} className="text-white px-6 py-2 rounded-lg hover:opacity-90 shadow-lg transform hover:scale-105 transition-all duration-200 font-['Poppins'] font-medium">
            {showForm ? 'Cancel' : 'Add New'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Question *</label>
                <input type="text" value={formData.question} onChange={(e) => setFormData({...formData, question: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 font-['Poppins']">Answer *</label>
                <textarea value={formData.answer} onChange={(e) => setFormData({...formData, answer: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" rows="4" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 font-['Poppins']">Category</label>
                  <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 font-['Poppins']">Order</label>
                  <input type="number" value={formData.order_position} onChange={(e) => setFormData({...formData, order_position: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#e05532]" />
                </div>
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
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold font-['Poppins'] mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 font-['Poppins'] mb-2">{faq.answer}</p>
                  <p className="text-xs text-gray-500 font-['Poppins']">Category: {faq.category || 'None'} | Order: {faq.order_position}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => handleEdit(faq)} className="text-[#e05532] hover:underline font-['Poppins']">Edit</button>
                  <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:underline font-['Poppins']">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
