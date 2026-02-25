import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from '../lib/supabase';
import floatingIcon from "../../images/Asset+53.webp";
import floatingIcon2 from "../../images/Asset+38.webp";
import rightIcon1 from "../../images/Icon+103.webp";
import rightIcon2 from "../../images/Icon+85.webp";
import rightIcon3 from "../../images/triangle.webp";
import leftIcon1 from "../../images/Icon+58.webp";
import leftIcon2 from "../../images/Icon+185.webp";
import leftIcon3 from "../../images/shape.webp";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await supabase.from('faqs').select('*').eq('is_active', true).order('order_position');
      setFaqs(data || []);
    };
    fetchFaqs();
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen pt-20 bg-[#dedad1]">
        
        {/* Top Banner */}
        <section className="w-full bg-[#833b29] text-white relative overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Floating Icons (Top Section) */}
          <div className="absolute left-50 top-15 opacity-70">
            <img src={floatingIcon} alt="Icon" className="w-24 h-24" />
          </div>

          <div className="absolute right-50 top-15 opacity-70">
            <img src={floatingIcon2} alt="Icon" className="w-24 h-24" />
          </div>
          
          <div className="max-w-6xl mx-auto px-6 py-20 text-center relative">
            <h1 className="relative text-5xl tracking-wide">
              Frequently Asked Questions
            </h1>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative max-w-4xl mx-auto px-8 py-20 space-y-14 text-gray-900">

          {/* Floating Icons (FAQ Section) */}
          {/* Left side icons */}
          <div className="absolute left-[-160px] top-20 opacity-40">
            <img src={leftIcon1} alt="Icon" className="w-24 h-24 -rotate-12" />
          </div>

          <div className="absolute left-[-100px] top-[50%] opacity-40">
            <img src={leftIcon2} alt="Icon" className="w-24 h-24 rotate-12" />
          </div>

          <div className="absolute left-[-160px] bottom-40 opacity-40">
            <img src={leftIcon3} alt="Icon" className="w-24 h-24 -rotate-12" />
          </div>

          {/* Right side icons */}
          <div className="absolute right-[-160px] top-32 opacity-40">
            <img src={rightIcon1} alt="Icon" className="w-24 h-24 rotate-12" />
          </div>

          <div className="absolute right-[-100px] top-[50%] opacity-40">
            <img src={rightIcon2} alt="Icon" className="w-24 h-24 -rotate-12" />
          </div>

          <div className="absolute right-[-160px] bottom-20 opacity-40">
            <img src={rightIcon3} alt="Icon" className="w-24 h-24 rotate-12" />
          </div>

          {faqs.map((faq, index) => (
            <div key={index} className="space-y-4">
              <div 
                className="flex items-start gap-3 text-xl md:text-2xl cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold transition-transform duration-300">{openIndex === index ? '-' : '+'}</span>
                <p>{faq.question}</p>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-lg text-gray-700 ml-8 mt-2">{faq.answer}</p>
              </div>
              <div className="h-[2px] w-full bg-[#e05532]"></div>
            </div>
          ))}

          {/* Contact Button */}
          <div className="flex justify-center pt-6 text-white font-semibold ">
            <a
              href="/contact" className="bg-[#1f1f1f] px-80 py-3 tracking-widest text-sm">
              CONTACT PAGE
            </a>
          </div>

        </section>
      </div>
      <Footer />
    </div>
  );
}
