import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminSubmissions() {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [editors, setEditors] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    const { data: n } = await supabase.from('newsletter_subscriptions').select('*').order('created_at', { ascending: false });
    const { data: c } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    const { data: r } = await supabase.from('research_writer_applications').select('*').order('created_at', { ascending: false });
    const { data: e } = await supabase.from('editor_animator_applications').select('*').order('created_at', { ascending: false });
    setNewsletters(n || []);
    setContacts(c || []);
    setResearchers(r || []);
    setEditors(e || []);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 font-['Poppins']">Form Submissions</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 font-['Poppins']">Newsletter ({newsletters.length})</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold font-['Poppins']">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold font-['Poppins']">Date</th>
                </tr>
              </thead>
              <tbody>
                {newsletters.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 text-sm font-['Poppins']">{item.email}</td>
                    <td className="px-4 py-3 text-sm font-['Poppins']">{new Date(item.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 font-['Poppins']">Contact ({contacts.length})</h2>
          <div className="space-y-4">
            {contacts.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <p className="font-bold font-['Poppins']">{item.name} - {item.email}</p>
                <p className="text-sm text-gray-600 font-['Poppins'] mt-2">{item.message}</p>
                <p className="text-xs text-gray-400 font-['Poppins'] mt-2">{new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 font-['Poppins']">Research Writers ({researchers.length})</h2>
          <div className="space-y-4">
            {researchers.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <p className="font-bold font-['Poppins']">{item.full_name} - {item.email}</p>
                <p className="text-sm text-gray-600 font-['Poppins']">Phone: {item.phone}</p>
                <p className="text-xs text-gray-400 font-['Poppins'] mt-2">{new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 font-['Poppins']">Editor/Animators ({editors.length})</h2>
          <div className="space-y-4">
            {editors.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <p className="font-bold font-['Poppins']">{item.full_name} - {item.email}</p>
                <p className="text-sm text-gray-600 font-['Poppins']">Phone: {item.phone}</p>
                <p className="text-xs text-gray-400 font-['Poppins'] mt-2">{new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
