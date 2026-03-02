import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminFAQs() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({ question: '', answer: '' });
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
    const { data, error } = await supabase.from('faqs').select('*').order('created_at');
    if (error) console.error('Error:', error);
    else setFaqs(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await supabase.from('faqs').update(formData).eq('id', editId);
    } else {
      await supabase.from('faqs').insert([formData]);
    }
    setFormData({ question: '', answer: '' });
    setEditId(null);
    fetchFaqs();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this FAQ?')) {
      await supabase.from('faqs').delete().eq('id', id);
      fetchFaqs();
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-['Poppins']">Manage FAQs</h1>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 font-['Poppins']">Question</label>
            <input 
              type="text" 
              value={formData.question} 
              onChange={e => setFormData({...formData, question: e.target.value})} 
              className="w-full border p-2 rounded" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 font-['Poppins']">Answer</label>
            <textarea 
              value={formData.answer} 
              onChange={e => setFormData({...formData, answer: e.target.value})} 
              className="w-full border p-2 rounded" 
              rows="3" 
              required 
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-[#e05532] text-white px-6 py-2 rounded hover:bg-[#c44b2b] font-['Poppins']">
              {editId ? 'Update FAQ' : 'Add FAQ'}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setFormData({ question: '', answer: '' }); }} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-['Poppins']">
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h3 className="font-bold font-['Poppins']">{faq.question}</h3>
              <p className="text-gray-600 mt-1 font-['Poppins']">{faq.answer}</p>
              <div className="mt-3 flex gap-3 text-sm">
                <button onClick={() => { setFormData(faq); setEditId(faq.id); }} className="text-blue-600 hover:underline font-['Poppins']">Edit</button>
                <button onClick={() => handleDelete(faq.id)} className="text-red-600 hover:underline font-['Poppins']">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}