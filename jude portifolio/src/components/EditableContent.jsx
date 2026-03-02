import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AdminLayout from '../components/AdminLayout';
import { CONTENT_SCHEMAS } from '../lib/contentSchema';

export default function AdminContent() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate('/admin/login');
    };
    checkAuth();
    fetchGroups();
  }, [navigate]);

  const fetchGroups = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('content_groups').select('*').order('group_name');
    if (error) {
      console.error('Error fetching groups:', error);
    } else {
      setGroups(data || []);
    }
    setLoading(false);
  };

  const handleGroupSelect = (groupName) => {
    const group = groups.find(g => g.group_name === groupName);
    
    // Deep clone content to avoid mutation issues and ensure fresh state
    let content = group?.content ? JSON.parse(JSON.stringify(group.content)) : {};

    // Pre-fill with default values from schema if content is empty or fields are missing
    const schema = CONTENT_SCHEMAS[groupName];
    if (schema && schema.fields) {
      schema.fields.forEach(field => {
        if (content[field.key] === undefined && field.defaultValue !== undefined) {
          // Deep clone defaults so we don't mutate the schema itself
          content[field.key] = JSON.parse(JSON.stringify(field.defaultValue));
        }
      });
    }
    
    setSelectedGroup({ 
      group_name: groupName, 
      id: group?.id,
      description: group?.description || CONTENT_SCHEMAS[groupName].label
    });
    setFormData(content);
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleListItemChange = (listKey, index, subKey, value) => {
    setFormData(prev => {
      const list = [...(prev[listKey] || [])];
      // Create a shallow copy of the item being modified to ensure React detects the change
      if (!list[index]) list[index] = {};
      list[index] = { ...list[index], [subKey]: value };
      return { ...prev, [listKey]: list };
    });
  };

  const handleAddListItem = (listKey, itemSchema) => {
    setFormData(prev => {
      const list = [...(prev[listKey] || [])];
      const newItem = {};
      // Pre-fill defaults if any, deep cloning to avoid reference sharing
      itemSchema.forEach(field => { 
        if(field.defaultValue !== undefined) {
          newItem[field.key] = JSON.parse(JSON.stringify(field.defaultValue));
        }
      });
      list.push(newItem);
      return { ...prev, [listKey]: list };
    });
  };

  const handleRemoveListItem = (listKey, index) => {
    setFormData(prev => {
      const list = [...(prev[listKey] || [])];
      list.splice(index, 1);
      return { ...prev, [listKey]: list };
    });
  };

  const handleImageUpload = async (key, event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `content-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      handleInputChange(key, data.publicUrl);
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleListImageUpload = async (listKey, index, subKey, event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `content-list-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      handleListItemChange(listKey, index, subKey, data.publicUrl);
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        group_name: selectedGroup.group_name,
        description: selectedGroup.description,
        content: formData
      };

      if (selectedGroup.id) {
        payload.id = selectedGroup.id;
      }

      const { data, error } = await supabase
        .from('content_groups')
        .upsert(payload, { onConflict: 'group_name' })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        // Update selected group with new ID if it was a new insertion
        setSelectedGroup(prev => ({ ...prev, id: data.id }));
        
        // Update local groups list to reflect changes immediately
        setGroups(prev => {
          const existingIndex = prev.findIndex(g => g.group_name === data.group_name);
          if (existingIndex >= 0) {
            const newGroups = [...prev];
            newGroups[existingIndex] = data;
            return newGroups;
          }
          return [...prev, data].sort((a, b) => a.group_name.localeCompare(b.group_name));
        });
      }
      
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving content: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Combine DB groups with Schema groups to ensure all are visible
  const allGroupNames = Array.from(new Set([
    ...groups.map(g => g.group_name),
    ...Object.keys(CONTENT_SCHEMAS)
  ])).sort();

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-['Poppins']">Content Management</h1>

        <div className="w-full">
            {selectedGroup ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <button 
                      onClick={() => setSelectedGroup(null)}
                      className="text-sm text-gray-500 hover:text-[#e05532] mb-2 flex items-center gap-1 font-['Poppins']"
                    >
                      ← Back to Sections
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800 font-['Poppins']">
                      {CONTENT_SCHEMAS[selectedGroup.group_name]?.label || selectedGroup.group_name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 font-['Poppins']">
                      Edit content for this section
                    </p>
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#e05532] text-white px-6 py-2.5 rounded-lg hover:bg-[#c44b2b] transition font-['Poppins'] font-medium shadow-sm disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {CONTENT_SCHEMAS[selectedGroup.group_name] ? (
                    CONTENT_SCHEMAS[selectedGroup.group_name].fields.map((field) => (
                      <div key={field.key} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 font-['Poppins']">
                          {field.label}
                        </label>
                        
                        {field.type === 'text' && (
                          <input
                            type="text"
                            value={formData[field.key] || ''}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e05532] focus:border-transparent transition"
                          />
                        )}

                        {field.type === 'textarea' && (
                          <textarea
                            rows={4}
                            value={formData[field.key] || ''}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e05532] focus:border-transparent transition"
                          />
                        )}

                        {field.type === 'image' && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-4">
                              <input
                                type="text"
                                value={formData[field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e05532] focus:border-transparent"
                                placeholder="Image URL"
                              />
                              <label className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm font-medium whitespace-nowrap">
                                Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(field.key, e)}
                                  disabled={uploading}
                                />
                              </label>
                            </div>
                            {formData[field.key] && (
                              <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden border border-gray-300">
                                <img
                                  src={formData[field.key]}
                                  alt="Preview"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            )}
                          </div>
                        )}

                        {field.type === 'list' && (
                          <div className="space-y-4 mt-2">
                            {(formData[field.key] || field.defaultValue || []).map((item, index) => (
                              <div key={index} className="border border-gray-200 p-4 rounded-lg bg-white relative shadow-sm">
                                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                                  <h4 className="font-bold text-gray-600 font-['Poppins']">Item {index + 1}</h4>
                                  <button 
                                    onClick={() => handleRemoveListItem(field.key, index)} 
                                    className="text-red-500 hover:text-red-700 text-sm font-medium font-['Poppins']"
                                  >
                                    Remove
                                  </button>
                                </div>
                                <div className="space-y-4">
                                  {field.itemSchema.map(subField => (
                                    <div key={subField.key}>
                                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1 font-['Poppins']">
                                        {subField.label}
                                      </label>
                                      
                                      {(subField.type === 'text' || subField.type === 'textarea') && (
                                        subField.type === 'textarea' ? 
                                        <textarea
                                          rows={2}
                                          value={item[subField.key] || ''}
                                          onChange={(e) => handleListItemChange(field.key, index, subField.key, e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#e05532] text-sm"
                                        /> :
                                        <input
                                          type="text"
                                          value={item[subField.key] || ''}
                                          onChange={(e) => handleListItemChange(field.key, index, subField.key, e.target.value)}
                                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#e05532] text-sm"
                                        />
                                      )}

                                      {subField.type === 'image' && (
                                        <div className="flex items-center gap-2">
                                          <input
                                            type="text"
                                            value={item[subField.key] || ''}
                                            onChange={(e) => handleListItemChange(field.key, index, subField.key, e.target.value)}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                                            placeholder="Image URL"
                                          />
                                          <label className="cursor-pointer bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 text-xs font-bold uppercase">
                                            Upload
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleListImageUpload(field.key, index, subField.key, e)} disabled={uploading} />
                                          </label>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <button onClick={() => handleAddListItem(field.key, field.itemSchema)} className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-lg hover:border-[#e05532] hover:text-[#e05532] transition font-['Poppins'] font-medium">
                              + Add New Item
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      No schema defined for this group. Please add it to contentSchema.js
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allGroupNames.map(name => {
                  const schema = CONTENT_SCHEMAS[name];
                  const label = schema?.label || name;
                  return (
                    <div 
                      key={name} 
                      onClick={() => handleGroupSelect(name)}
                      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-200 group flex flex-col justify-between h-40"
                    >
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-[#e05532] transition-colors font-['Poppins']">
                          {label}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2 font-['Poppins']">
                          {schema?.fields?.length || 0} editable fields
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-[#e05532] text-sm font-medium group-hover:translate-x-1 transition-transform">
                          Edit Content →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
        </div>
      </div>
    </AdminLayout>
  );
}
