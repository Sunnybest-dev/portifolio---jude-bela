import React, { useEffect, useState } from "react";
import { supabase } from '../lib/supabase';
import { useCMS } from "../lib/useCMS";
import logo from "../../images/JudeBella.png";

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [siteSettings, setSiteSettings] = useState({});
  const { content } = useCMS("Global.Footer");

  useEffect(() => {
    const fetchSocial = async () => {
      const { data } = await supabase.from('social_links').select('*').eq('is_active', true).order('order_position');
      setSocialLinks(data || []);
    };
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*');
      const settingsMap = {};
      data?.forEach(item => settingsMap[item.key] = item.value);
      setSiteSettings(settingsMap);
    };

    fetchSocial();
    fetchSettings();

    // Realtime subscription for footer updates
    const channel = supabase.channel('footer_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'social_links' }, fetchSocial)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, fetchSettings)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const defaultCol1 = [
    { label: "HOME", url: "/" },
    { label: "ABOUT", url: "/about" },
    { label: "CONTACT", url: "/contact" }
  ];
  const defaultCol2 = [
    { label: "SHOP", url: "/shop" },
    { label: "FAQS", url: "/faqs" },
    { label: "GEAR GUIDE", url: "/gear-guide" }
  ];
  const defaultCol3 = [
    { label: "PORTFOLIO", url: "/portfolio" },
    { label: "SUBMIT IDEAS", url: "/submit-ideas" },
    { label: "JOIN THE TEAM", url: "/join-team" }
  ];

  const navColumns = [content?.column_1 || defaultCol1, content?.column_2 || defaultCol2, content?.column_3 || defaultCol3];

  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative w-full px-4 sm:px-6 lg:px-16 py-16 lg:py-24 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* SOCIAL SECTION */}
          <div className="lg:col-span-1 pe-3.5">
            <h2 className="text-2xl lg:text-3xl font-light mb-6 lg:mb-8 tracking-wide whitespace-nowrap border-b-2 border-orange-500 pb-4 inline-block font-['Poppins']">
              {content?.follow_heading || "Follow Jude"}
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:gap-6 text-[10px] lg:text-xs tracking-widest uppercase font-['Nord']">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION SECTION */}
          <div className="lg:col-span-2 border-l-2 border-white/50 pl-6 lg:pl-12">
            <div className="grid grid-cols-3 gap-6 lg:gap-12 text-[10px] lg:text-xs tracking-widest uppercase font-['Nord']">
              {navColumns.map((column, idx) => (
                <div key={idx} className="space-y-4 lg:space-y-6">
                  {column.map((item, i) => (
                    <a
                      key={i}
                      href={item.url || "#"}
                      className="block hover:text-orange-500 transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
            <div className="flex justify-start lg:justify-end">
              <img src={content?.footer_logo || siteSettings.site_logo_url || logo} alt="Logo" className="h-12" />
            </div>

            <p className="text-left lg:text-right text-xs lg:text-sm leading-6 lg:leading-6 w-85 lg:ml-auto font-['Poppins']">
              {content?.bio || siteSettings.footer_bio || "Jude Bela is a journalist based in Washington, DC. You can find his work on Vox, The New York Times, and his YouTube channel."}
            </p>

            <p className="text-left lg:text-right text-gray-500 text-xs font-['Poppins']">
              {content?.copyright || siteSettings.footer_copyright || `© Jude Bela ${new Date().getFullYear()}`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
