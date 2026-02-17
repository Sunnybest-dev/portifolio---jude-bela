import React from "react";
import mcdonaldsVideo from "../../images/McDonalds+video.webp";
import taiwanVideo from "../../images/maxresdefault.webp";

export default function ChannelSection() {
  return (
    <section className="bg-[#d8cfc2] min-h-screen py-12 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Label */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 inline-block pb-1">
            Play Piece
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-black/40 mb-8 sm:mb-10 lg:mb-12"></div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-12 sm:mb-14 lg:mb-16">
          Johnny's Channel
        </h1>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Left Video */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
              <img
                src={mcdonaldsVideo}
                alt="McDonald's Ice Cream Video"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="mt-4 sm:mt-6 text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:opacity-70 transition">
              Play Video
            </button>
          </div>

          {/* Right Video */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
              <img
                src={taiwanVideo}
                alt="Taiwan Invasion Video"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="mt-4 sm:mt-6 text-xs sm:text-sm tracking-widest uppercase border-b-2 border-red-500 pb-1 hover:opacity-70 transition">
              Play Video
            </button>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center">
          <button className="bg-black text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl text-xs sm:text-sm tracking-widest uppercase shadow-lg hover:scale-105 transition-transform duration-300">
            Go To Channel
          </button>
        </div>
      </div>
    </section>
  );
}
