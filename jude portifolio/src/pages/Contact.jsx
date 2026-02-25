import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from '../lib/supabase';
import mapBg from "../../images/map.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [emails, setEmails] = useState({ business: '', journalism: '' });

  useEffect(() => {
    const fetchEmails = async () => {
      const { data } = await supabase.from('site_settings').select('key, value').in('key', ['contact_email_business', 'contact_email_journalism']);
      if (data) {
        const business = data.find(d => d.key === 'contact_email_business')?.value || 'REBECCA.BIBB@UNITEDTALENT.COM';
        const journalism = data.find(d => d.key === 'contact_email_journalism')?.value || 'PASKINM@UNITEDTALENT.COM';
        setEmails({ business, journalism });
      }
    };
    fetchEmails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('contact_submissions').insert([formData]);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Message sent!');
      setFormData({ name: '', email: '', message: '' });
    }
  };
  return (
    <div>
      <Header />
      <div
        className="w-full min-h-screen pt-20 flex items-center justify-center bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${mapBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Black backdrop overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="w-[800px] shadow-lg relative z-10">
          {/* Header */}
          <div className="bg-[#1e1e1e] py-5">
            <h1 className="text-white text-center text-2xl tracking-[4px] font-semibold">
              CONTACT
            </h1>
          </div>

          {/* Content */}
          <div className="bg-[#e9e9e9] px-16 py-14">
            {/* Business Section */}
            <div className="mb-12">
              <h2 className="text-[26px] font-serif text-gray-800 leading-relaxed">
                For business and partnership inquiries on <br />
                Jude's Youtube Channel:
              </h2>

              <div className="w-full h-[2px] bg-[#c44b2b] mt-4 mb-6"></div>

              <p className="text-gray-600 uppercase tracking-wide text-sm font-medium">
                {emails.business}
              </p>
            </div>

            {/* Hosting Section */}
            <div className="mb-12">
              <h2 className="text-[26px] font-serif text-gray-800 leading-relaxed">
                For hosting or journalism work:
              </h2>

              <div className="w-full h-[2px] bg-[#c44b2b] mt-4 mb-6"></div>

              <p className="text-gray-600 uppercase tracking-wide text-sm font-medium">
                {emails.journalism}
              </p>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-[26px] font-serif text-gray-800 mb-4">Send a Message:</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  rows="4"
                  required
                />
                <button type="submit" style={{backgroundColor: '#c44b2b'}} className="w-full text-white py-3 rounded hover:opacity-90 font-semibold">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
