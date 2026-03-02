import React from "react";
import { useCMS } from "../lib/useCMS";

export default function ChannelSection() {
  const { content, loading } = useCMS("HomePage.ChannelSection");

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[#d8cfc2] min-h-screen py-12 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Label */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 inline-block pb-1">
            {content.label}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-black/40 mb-8 sm:mb-10 lg:mb-12"></div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-12 sm:mb-14 lg:mb-16">
          {content.title}
        </h1>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Left Video */}
          <div className="flex flex-col items-center">
            <a href={content.video1_url} target="_blank" rel="noopener noreferrer" className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
              <img
                src={content.video1_thumbnail}
                alt="McDonald's Ice Cream Video"
                className="w-full h-full object-cover"
              />
            </a>
            <a href={content.video1_url} target="_blank" rel="noopener noreferrer" className="mt-4 sm:mt-6 text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:opacity-70 transition">
              Play Video
            </a>
          </div>

          {/* Right Video */}
          <div className="flex flex-col items-center">
            <a href={content.video2_url} target="_blank" rel="noopener noreferrer" className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
              <img
                src={content.video2_thumbnail}
                alt="Taiwan Invasion Video"
                className="w-full h-full object-cover"
              />
            </a>
            <a href={content.video2_url} target="_blank" rel="noopener noreferrer" className="mt-4 sm:mt-6 text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:opacity-70 transition">
              Play Video
            </a>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center">
          <a href={content.button_url} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl text-xs sm:text-sm tracking-widest uppercase shadow-lg hover:scale-105 transition-transform duration-300">
            {content.button_text}
          </a>
        </div>
      </div>
    </section>
  );
}
