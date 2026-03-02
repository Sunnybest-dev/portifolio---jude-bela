import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { CONTENT_SCHEMAS } from './contentSchema';

export function useCMS(groupName) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // 1. Load defaults from schema
        const schema = CONTENT_SCHEMAS[groupName];
        let initialContent = {};
        if (schema && schema.fields) {
          schema.fields.forEach(field => {
            if (field.defaultValue !== undefined) {
              initialContent[field.key] = field.defaultValue;
            }
          });
        }

        // 2. Fetch overrides from Supabase
        const { data } = await supabase
          .from('content_groups')
          .select('content')
          .eq('group_name', groupName)
          .maybeSingle();

        setContent({ ...initialContent, ...(data?.content || {}) });
      } catch (error) {
        console.error(`Error fetching content for ${groupName}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [groupName]);

  return { content, loading };
}