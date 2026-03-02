import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from '../lib/supabase';
import logo from "../../images/JudeBella.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [siteSettings, setSiteSettings] = useState({});

  useEffect(() => {
    const fetchNav = async () => {
      const { data } = await supabase.from('navigation_items').select('*').eq('is_active', true).order('order_position');
      setNavItems(data || []);
    };
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*');
      const settingsMap = {};
      data?.forEach(item => settingsMap[item.key] = item.value);
      setSiteSettings(settingsMap);
    };

    fetchNav();
    fetchSettings();

    // Realtime subscription for navigation updates
    const channel = supabase.channel('header_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'navigation_items' }, fetchNav)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, fetchSettings)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#e9e4da] text-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-4 lg:py-6 flex items-center justify-between">

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img src={siteSettings.site_logo_url || logo} alt="Logo" className="h-10 lg:h-12" />
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide">
              {siteSettings.site_title || "JUDE·BELA"}
            </h1>
            <div className="h-[2px] lg:h-[3px] bg-red-600 w-full mt-2 lg:mt-3"></div>
          </div>
        </Link>

        {/* Hamburger Menu Button - Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center"
        >
          <span className={`block h-0.5 w-full bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-full bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex space-x-6 lg:space-x-12 text-xs lg:text-base tracking-widest uppercase font-medium">
          {navItems.map((item) => (
            <Link key={item.id} to={item.url} className="hover:border-b-2 hover:border-[#e05532] pb-1 transition">{item.label}</Link>
          ))}
        </nav>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#e9e4da] border-t border-black/10 px-4 py-6">
          <div className="flex flex-col space-y-4 text-sm tracking-widest uppercase font-medium">
            {navItems.map((item) => (
              <Link key={item.id} to={item.url} className="hover:border-b-2 hover:border-[#e05532] pb-1 transition" onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
