import React, { useEffect, useState } from "react";
import { supabase } from '../lib/supabase';
import { useCMS } from "../lib/useCMS";
import cyprusThumbnail from "../../images/thumb.webp";
import voxBordersImg from "../../images/Vox+Borders.webp";
import nytThumbnail from "../../images/screen.webp";
import mcdonaldsVideo from "../../images/McDonalds+video.webp";
import taiwanVideo from "../../images/maxresdefault.webp";

export default function PortfolioContent() {
  const [items, setItems] = useState([]);
  const [sections, setSections] = useState([]);
  const { content: staticContent } = useCMS("PortfolioPage.Static");

  useEffect(() => {
    const fetchAllData = async () => {
      const { data: itemsData } = await supabase.from('portfolio_items').select('*').eq('is_active', true).order('order_position');
      setItems(itemsData || []);
      
      const { data: sectionsData } = await supabase.from('page_sections').select('*').eq('is_active', true).order('order_position');
      setSections(sectionsData || []);
    };
    
    // Initial fetch
    fetchAllData();

    // Set up Supabase Realtime subscription for both tables
    const channel = supabase
      .channel('public:portfolio-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'page_sections' },
        () => fetchAllData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_items' },
        () => fetchAllData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getSectionStyle = (pageName, sectionName) => {
    const section = sections.find(s => s.page_name === pageName && s.section_name === sectionName);
    if (!section) return { backgroundColor: '#d8cec2' };
    
    if (section.background_type === 'color') {
      return { backgroundColor: section.background_value };
    } else if (section.background_type === 'image') {
      return { backgroundImage: `url(${section.background_value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    return { backgroundColor: '#d8cec2' };
  };

  const getSectionTitle = (pageName, sectionName, defaultTitle) => {
    const section = sections.find(s => s.page_name === pageName && s.section_name === sectionName);
    return section?.title || defaultTitle;
  };

  const getSectionLink = (pageName, sectionName) => {
    const section = sections.find(s => s.page_name === pageName && s.section_name === sectionName);
    return section?.link_url;
  };

  const getSectionLinkText = (pageName, sectionName, defaultText) => {
    const section = sections.find(s => s.page_name === pageName && s.section_name === sectionName);
    return section?.link_text || defaultText;
  };

  return (
    <div className="w-full">
      {/* Top Map Banner */}
      <div className="relative w-full h-[150px] sm:h-[180px] lg:h-[200px]">
        <iframe
          src={staticContent?.map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"}
          className="w-full h-full border-0 pointer-events-none"
          loading="lazy"
          title="Map Background"
        ></iframe>
        <div className="absolute inset-0 bg-[#7f8b7c]/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl sm:text-5xl lg:text-6xl font-medium tracking-wide">
            {staticContent?.header_title || "Portfolio"}
          </h1>
        </div>
        <div className="absolute bottom-15 left-0 w-full flex justify-center">
          <div className="w-[90%] border-b-3 border-black"></div>
        </div>
      </div>

      {/* Uncharted Series Section */}
      <div className="pt-12 sm:pt-16 lg:pt-20 px-6 sm:px-8 lg:px-12 text-[#1e1e1e] font-serifDisplay" style={getSectionStyle('portfolio', 'uncharted')}>
        {getSectionLink('portfolio', 'uncharted') && (
          <div className="flex justify-center mb-8 sm:mb-10">
            <a href={getSectionLink('portfolio', 'uncharted')} target="_blank" rel="noopener noreferrer" className="uppercase text-xs sm:text-sm tracking-widest border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
              {getSectionLinkText('portfolio', 'uncharted', 'Watch Series')}
            </a>
          </div>
        )}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
            {getSectionTitle('portfolio', 'uncharted', 'Uncharted Series')}
          </h2>
        </div>
        <div className="flex justify-center">
          {items.filter(item => item.category === 'Uncharted').length > 0 ? (
            <div className="flex flex-col items-center">
              {items.filter(item => item.category === 'Uncharted').map((item) => (
                <div key={item.id}>
                  <a href={item.youtube_url} target="_blank" rel="noopener noreferrer">
                    <img src={item.thumbnail_url} alt={item.title} className="w-full max-w-[750px] h-auto object-cover shadow-sm cursor-pointer" />
                  </a>
                  <div className="text-center mt-4">
                    <a href={item.youtube_url} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
                      Watch Video
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <a href={items.filter(item => item.category === 'Uncharted')[0]?.youtube_url || "https://youtu.be/_vDbXQCU_yo"} target="_blank" rel="noopener noreferrer">
              <img src={cyprusThumbnail} alt="Cyprus" className="w-full max-w-[750px] h-auto object-cover shadow-sm cursor-pointer" />
            </a>
          )}
        </div>
      </div>

      {/* Vox Borders Section */}
      <div className="w-full sm:pt-16 px-6 sm:px-8 lg:px-12 font-serifDisplay text-[#1e1e1e]" style={getSectionStyle('portfolio', 'vox-borders')}>
        {getSectionLink('portfolio', 'vox-borders') && (
          <div className="flex justify-center mb-8 sm:mb-10">
            <a href={getSectionLink('portfolio', 'vox-borders')} target="_blank" rel="noopener noreferrer" className="uppercase text-xs sm:text-sm tracking-widest border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
              {getSectionLinkText('portfolio', 'vox-borders', 'Watch Series')}
            </a>
          </div>
        )}
        <div className="border-t border-black mb-10 sm:mb-12 lg:mb-16"></div>
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
            {getSectionTitle('portfolio', 'vox-borders', 'Vox Borders Series')}
          </h2>
        </div>
        <div className="flex justify-center">
          {items.filter(item => item.category === 'Vox Borders').length > 0 ? (
            <div className="flex flex-col items-center">
              {items.filter(item => item.category === 'Vox Borders').map((item) => (
                <div key={item.id}>
                  <a href={item.youtube_url} target="_blank" rel="noopener noreferrer">
                    <img src={item.thumbnail_url} alt={item.title} className="w-full max-w-[750px] h-auto object-cover cursor-pointer" />
                  </a>
                  <div className="text-center mt-4">
                    <a href={item.youtube_url} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
                      Watch Video
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <a href={items.filter(item => item.category === 'Vox Borders')[0]?.youtube_url || "https://youtu.be/-EdVmKnb4_U"} target="_blank" rel="noopener noreferrer">
              <img src={voxBordersImg} alt="Vox Borders" className="w-full max-w-[750px] h-auto object-cover cursor-pointer" />
            </a>
          )}
        </div>
      </div>

      {/* NY Times Section */}
      <div className="w-full py-8 sm:pt-16 lg:pt-20 px-6 sm:px-8 lg:px-12 font-['Cormorant_Garamond',serif] text-[#1e1e1e]" style={getSectionStyle('portfolio', 'nyt')}>
        {getSectionLink('portfolio', 'nyt') && (
          <div className="flex justify-center mb-8 sm:mb-10">
            <a href={getSectionLink('portfolio', 'nyt')} target="_blank" rel="noopener noreferrer" className="uppercase text-xs sm:text-sm tracking-widest border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
              {getSectionLinkText('portfolio', 'nyt', 'Watch Series')}
            </a>
          </div>
        )}
        <div className="border-t border-black mb-10 sm:mb-12 lg:mb-16"></div>
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium">
            {getSectionTitle('portfolio', 'nyt', 'The New York Times')}
          </h2>
        </div>
        <div className="flex justify-center">
          {items.filter(item => item.category === 'NYT').length > 0 ? (
            <div className="flex flex-col items-center">
              {items.filter(item => item.category === 'NYT').map((item) => (
                <div key={item.id}>
                  <a href={item.youtube_url} target="_blank" rel="noopener noreferrer" className="relative w-full max-w-[850px]">
                    <img src={item.thumbnail_url} alt={item.title} className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover cursor-pointer" />
                  </a>
                  <div className="text-center mt-4">
                    <a href={item.youtube_url} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
                      Watch Video
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <a href={items.filter(item => item.category === 'NYT')[0]?.youtube_url || "https://youtu.be/_vDbXQCU_yo"} target="_blank" rel="noopener noreferrer" className="relative w-full max-w-[850px]">
              <img src={nytThumbnail} alt="NYT Video" className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover cursor-pointer" />
            </a>
          )}
        </div>
      </div>


      {/* Channel Section */}
      <section className="w-full bg-[#d8cfc2]  px-6 pb-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-black/40 mb-6 sm:mb-8 lg:mb-10"></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-serif text-center mb-12 sm:mb-14 lg:mb-16">
            {getSectionTitle('portfolio', 'channel', 'Channel Videos')}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-10 sm:mb-12">
            {items.filter(item => item.category === 'Channel').length > 0 ? (
              items.filter(item => item.category === 'Channel').map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <a href={item.youtube_url} target="_blank" rel="noopener noreferrer" className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
                    <img src={item.thumbnail_url} alt={item.title} className="w-full h-full object-cover" />
                  </a>
                  <a href={item.youtube_url} target="_blank" rel="noopener noreferrer" className="mt-2 sm:mt-3 text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
                    Play Video
                  </a>
                </div>
              ))
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
                    <img src={mcdonaldsVideo} alt="McDonald's Ice Cream Video" className="w-full h-full object-cover" />
                  </a>
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="mt-2 sm:mt-3 text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
                    Play Video
                  </a>
                </div>
                <div className="flex flex-col items-center">
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
                    <img src={taiwanVideo} alt="Taiwan Invasion Video" className="w-full h-full object-cover" />
                  </a>
                  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="mt-2 sm:mt-3 text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:border-gray-500 transition-colors">
                    Play Video
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white">
          
            <a href={getSectionLink('portfolio', 'channel') || "https://www.youtube.com/@judebela"} target="_blank" rel="noopener noreferrer" className="block bg-gray-900  px-8 sm:px-10 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm tracking-widest uppercase shadow-lg hover:bg-orange-500 transition-all duration-300 w-[90vw] max-w-6xl">
              Go To Channel
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="w-full bg-[#E0552F] py-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-20 lg:gap-40 px-6">
          {(staticContent?.footer_links || [
            { label: "CONTACT", url: "/contact" },
            { label: "SHOP MERCH", url: "/shop" },
            { label: "SUBMIT IDEAS", url: "/submit-ideas" }
          ]).map((link, idx) => (
            <a key={idx} href={link.url} className="flex flex-col items-center group">
              <span className="text-white text-sm tracking-widest font-semibold uppercase">
                {link.label}
              </span>
              <div className="w-full min-w-[80px] h-[2px] bg-black mt-2 group-hover:bg-white transition-colors"></div>
            </a>
          ))}


        </div>
      </div>
    </div>
  );
}
