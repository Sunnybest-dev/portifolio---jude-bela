import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminSubmissions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contact');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (table) => {
    setLoading(true);
    let tableName = 'contact_submissions';
    if (table === 'newsletter') tableName = 'newsletter_subscriptions';
    if (table === 'research') tableName = 'research_writer_applications';
    if (table === 'editor') tableName = 'editor_animator_applications';

    const { data, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setData(data || []);
    setLoading(false);
  };

  const tabs = [
    { id: 'contact', label: 'Contact Messages' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'research', label: 'Research Applications' },
    { id: 'editor', label: 'Editor Applications' },
  ];

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-['Poppins']">Submissions</h1>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg font-medium transition ${activeTab === tab.id ? 'bg-[#e05532] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            {data.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No submissions found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 font-semibold text-gray-700">Date</th>
                      <th className="p-4 font-semibold text-gray-700">Email</th>
                      {activeTab !== 'newsletter' && <th className="p-4 font-semibold text-gray-700">Name</th>}
                      {activeTab === 'contact' && <th className="p-4 font-semibold text-gray-700">Message</th>}
                      {(activeTab === 'research' || activeTab === 'editor') && <th className="p-4 font-semibold text-gray-700">Portfolio/Link</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="p-4 font-medium">{item.email}</td>
                        {activeTab !== 'newsletter' && <td className="p-4">{item.name || item.full_name}</td>}
                        {activeTab === 'contact' && <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{item.message}</td>}
                        {(activeTab === 'research' || activeTab === 'editor') && <td className="p-4 text-sm text-blue-600"><a href={item.portfolio_link || item.link} target="_blank" rel="noreferrer">View Link</a></td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}