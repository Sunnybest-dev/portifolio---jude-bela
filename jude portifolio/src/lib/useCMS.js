import { useState, useEffect } from 'react';
import { supabase } from './supabase';

// Fetch site settings
export const useSiteSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*');
      const settingsObj = {};
      data?.forEach(item => {
        settingsObj[item.key] = item.value;
      });
      setSettings(settingsObj);
      setLoading(false);
    };
    fetchSettings();
  }, []);

  return { settings, loading };
};

// Fetch hero content
export const useHeroContent = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .single();
      setHero(data);
      setLoading(false);
    };
    fetchHero();
  }, []);

  return { hero, loading };
};

// Fetch portfolio items
export const usePortfolioItems = (category = null) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      let query = supabase
        .from('portfolio_items')
        .select('*')
        .eq('is_active', true)
        .order('order_position');
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data } = await query;
      setItems(data || []);
      setLoading(false);
    };
    fetchItems();
  }, [category]);

  return { items, loading };
};

// Fetch FAQs
export const useFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('order_position');
      setFaqs(data || []);
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  return { faqs, loading };
};

// Fetch navigation items
export const useNavigation = () => {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNav = async () => {
      const { data } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('is_active', true)
        .order('order_position');
      setNavItems(data || []);
      setLoading(false);
    };
    fetchNav();
  }, []);

  return { navItems, loading };
};

// Fetch social links
export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocial = async () => {
      const { data } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('order_position');
      setSocialLinks(data || []);
      setLoading(false);
    };
    fetchSocial();
  }, []);

  return { socialLinks, loading };
};

// Fetch about content
export const useAboutContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from('about_content')
        .select('*')
        .eq('is_active', true)
        .order('order_position');
      setContent(data || []);
      setLoading(false);
    };
    fetchContent();
  }, []);

  return { content, loading };
};

// Fetch job listings
export const useJobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from('job_listings')
        .select('*')
        .eq('is_active', true);
      setJobs(data || []);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return { jobs, loading };
};
