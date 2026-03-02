import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newSetting, setNewSetting] = useState({ key: '', value: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
    fetchSettings();
  }, [navigate]);

  const fetchSettings = async () => {
    const { data, error } = await supabase.from('site_settings').select('*').not('key', 'in', '(primary_color,secondary_color,background_color)').order('key');
    if (error) {
      console.error('Error fetching settings:', error);
    } else {
      setSettings(data || []);
      const initialData = {};
      data?.forEach(s => initialData[s.id] = s.value);
      setFormData(initialData);
    }
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

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSetting.key) return alert('Key is required');
    
    const { error } = await supabase.from('site_settings').insert([newSetting]);
    if (error) {
      alert('Error adding setting: ' + error.message);
    } else {
      setNewSetting({ key: '', value: '', description: '' });
      setShowAdd(false);
      fetchSettings();
    }
  };

  const handleImageUpload = async (settingId, event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `setting-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, [settingId]: data.publicUrl }));
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <AdminLayout><div className="text-center py-8">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-['Poppins']">Site Settings</h1>
          <button onClick={() => setShowAdd(!showAdd)} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 font-['Poppins'] text-sm">
            {showAdd ? 'Cancel' : '+ Add Setting'}
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <h3 className="font-bold mb-4 font-['Poppins']">Add New Setting</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Key (e.g. site_title)</label>
                <input type="text" value={newSetting.key} onChange={e => setNewSetting({...newSetting, key: e.target.value})} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Value</label>
                <input type="text" value={newSetting.value} onChange={e => setNewSetting({...newSetting, value: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
                <input type="text" value={newSetting.description} onChange={e => setNewSetting({...newSetting, description: e.target.value})} className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="bg-[#e05532] text-white px-6 py-2 rounded hover:opacity-90 font-['Poppins']">Add</button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-6">
          {settings.map((setting) => {
            const isImage = setting.key.includes('logo') || setting.key.includes('image') || setting.key.includes('icon');
            return (
              <div key={setting.id} className="border-b pb-4 last:border-0">
                <label className="block text-sm font-semibold mb-2 font-['Poppins'] text-gray-700">
                  {setting.key.replace(/_/g, ' ').toUpperCase()}
                </label>
                <p className="text-xs text-gray-500 mb-2 font-['Poppins']">{setting.description}</p>
                
                <div className="flex gap-4 items-start">
                  <input
                    type="text"
                    value={formData[setting.id] || ''}
                    onChange={(e) => setFormData({...formData, [setting.id]: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e05532] focus:border-transparent"
                  />
                  {isImage && (
                    <label className="cursor-pointer bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition border border-gray-300">
                      📷
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(setting.id, e)}
                        disabled={uploading}
                      />
                    </label>
                  )}
                </div>
                {isImage && formData[setting.id] && (
                  <div className="mt-2">
                    <img src={formData[setting.id]} alt="Preview" className="h-16 object-contain border rounded bg-gray-50" />
                  </div>
                )}
              </div>
            );
          })}
          <button onClick={handleSave} disabled={saving} style={{backgroundColor: '#e05532'}} className="w-full text-white px-8 py-3 rounded-lg hover:opacity-90 font-['Poppins'] font-semibold shadow-lg disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}