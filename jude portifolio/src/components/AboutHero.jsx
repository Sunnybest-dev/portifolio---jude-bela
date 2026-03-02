import React from "react";
import { useCMS } from '../lib/useCMS';

export default function AboutHero() {
  const { content, loading } = useCMS('AboutPage.HeroSection');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="w-full min-h-screen bg-[#e9e3d6] bg-[url('/paper-texture.png')] bg-cover bg-center flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 pt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-serif text-[#1f1f1f] leading-tight">
            {content.title}
          </h1>

          {/* Green underline */}
          <div className="w-full max-w-[420px] h-[3px] bg-[#5f6f63] mt-4 mb-6 sm:mb-8 lg:mb-10 mx-auto lg:mx-0"></div>

          <p className="text-base sm:text-lg lg:text-[20px] leading-relaxed sm:leading-[32px] lg:leading-[36px] text-[#2c2c2c] font-serif max-w-[600px] mx-auto lg:mx-0">
            {content.description}
          </p>

          {/* CONTACT */}
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <a
              href={content.link_url}
              className="uppercase tracking-widest text-sm font-semibold text-black border-b-2 border-[#c24a3a] pb-1"
            >
              {content.link_text}
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE STACK */}
        <div className="relative flex justify-center mt-8 lg:mt-0">

          {/* Main Image */}
          <img
            src={content.background_image}
            alt="Jude Bela"
            className="relative w-full max-w-[400px] sm:max-w-[480px] lg:w-[540px] h-[250px] sm:h-[300px] lg:h-[360px] object-cover border border-black"
          />
        </div>

      </div>
    </section>
  );
}
