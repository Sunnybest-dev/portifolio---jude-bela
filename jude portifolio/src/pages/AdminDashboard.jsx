import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    { label: 'Portfolio Items', value: '0', color: 'bg-[#7f9696]' },
    { label: 'FAQs', value: '0', color: 'bg-[#e05532]' },
    { label: 'Submissions', value: '0', color: 'bg-[#6f7f72]' },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
      }
    };
    checkAuth();
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const portfolioResult = await supabase.from('portfolio_items').select('*');
      const faqsResult = await supabase.from('faqs').select('*');
      
      const [newsletters, contacts, researchers, editors] = await Promise.all([
        supabase.from('newsletter_subscriptions').select('*'),
        supabase.from('contact_submissions').select('*'),
        supabase.from('research_writer_applications').select('*'),
        supabase.from('editor_animator_applications').select('*')
      ]);
      
      const totalSubmissions = [
        ...(newsletters.data || []),
        ...(contacts.data || []),
        ...(researchers.data || []),
        ...(editors.data || [])
      ];

      setStats([
        { label: 'Portfolio Items', value: (portfolioResult.data?.length || 0).toString(), color: 'bg-[#7f9696]' },
        { label: 'FAQs', value: (faqsResult.data?.length || 0).toString(), color: 'bg-[#e05532]' },
        { label: 'Submissions', value: totalSubmissions.length.toString(), color: 'bg-[#6f7f72]' },
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-['Poppins']">Dashboard</h1>
          <p className="text-gray-600 font-['Poppins']">Welcome back! Manage your portfolio content</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
              <p className="text-sm text-gray-600 font-['Poppins'] mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-[#e05532] font-['Poppins']">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-4 font-['Poppins'] text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/portfolio" className="bg-[#e05532] text-white px-6 py-3 rounded-lg hover:bg-[#c44b2b] transition font-['Poppins'] font-medium text-center">
              Add Portfolio Item
            </Link>
            <Link to="/admin/settings" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-['Poppins'] font-medium text-center">
              Edit Site Settings
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
