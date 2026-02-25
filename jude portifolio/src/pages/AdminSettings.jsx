import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminSettings() {
  const [settings, setSettings] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*').not('key', 'in', '(primary_color,secondary_color,background_color)').order('key');
    setSettings(data || []);
    const initialData = {};
    data?.forEach(s => initialData[s.id] = s.value);
    setFormData(initialData);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [id, value] of Object.entries(formData)) {
        await supabase.from('site_settings').update({ value }).eq('id', id);
      }
      alert('Settings saved!');
      await fetchSettings(); // Refresh settings
    } catch (error) {
      alert('Error saving settings: ' + error.message);
    }
    setSaving(false);
  };

  if (loading) return <AdminLayout><div className="text-center py-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-['Poppins']">Site Settings</h1>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-6">
          {settings.map((setting) => (
            <div key={setting.id} className="border-b pb-4 last:border-0">
              <label className="block text-sm font-semibold mb-2 font-['Poppins'] text-gray-700">
                {setting.key.replace(/_/g, ' ').toUpperCase()}
              </label>
              <p className="text-xs text-gray-500 mb-2 font-['Poppins']">{setting.description}</p>
              <input
                type="text"
                value={formData[setting.id] || ''}
                onChange={(e) => setFormData({...formData, [setting.id]: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e05532] focus:border-transparent"
              />
            </div>
          ))}
          <button onClick={handleSave} disabled={saving} style={{backgroundColor: '#e05532'}} className="w-full text-white px-8 py-3 rounded-lg hover:opacity-90 font-['Poppins'] font-semibold shadow-lg disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
