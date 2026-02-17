import React from "react";
import nytThumbnail from "../../images/man.webp";

export default function NYTimesSection() {
  return (
    <div className="w-full bg-[#d8cec2] py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 font-['Cormorant_Garamond',serif] text-[#1e1e1e]">

      {/* Watch Series */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <button className="uppercase text-xs sm:text-sm tracking-widest border-b-2 border-red-500 pb-1 hover:opacity-80 transition-opacity">
          Watch Series
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-black mb-10 sm:mb-12 lg:mb-16"></div>

      {/* Title */}
      <div className="text-center mb-10 sm:mb-12 lg:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
          The New York Times
        </h2>
      </div>

      {/* Video Card */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-[1100px]">

          <img
            src={nytThumbnail}
            alt="NYT Video"
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-10 text-center">

            <p className="text-[10px] sm:text-xs tracking-widest text-red-400 uppercase mb-2">
              Opinion Video
            </p>

            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-semibold mb-3 sm:mb-4 leading-tight">
              Blue States, You're the Problem
            </h3>

            <p className="text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 max-w-2xl">
              Why do states with Democratic majorities fail to live up to their values?
            </p>

            <p className="text-xs sm:text-sm mb-6 sm:mb-8">
              By Johnny Harris and Binyamin Appelbaum
            </p>

            {/* Play Button */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
              <div className="w-0 h-0 border-l-[14px] sm:border-l-[16px] lg:border-l-[18px] border-l-black border-t-[10px] sm:border-t-[11px] lg:border-t-[12px] border-t-transparent border-b-[10px] sm:border-b-[11px] lg:border-b-[12px] border-b-transparent ml-1"></div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
