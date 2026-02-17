import React from "react";
import voxBordersImg from "../../images/Vox+Borders.webp";

export default function VoxBordersSection() {
  return (
    <div className="w-full bg-[#d8cec2] py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 font-serifDisplay text-[#1e1e1e]">

      {/* Watch Series Button */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <button className="uppercase text-xs sm:text-sm tracking-widest border-b-2 border-red-500 pb-1 hover:opacity-80 transition-opacity">
          Watch Series
        </button>
      </div>

      {/* Top Divider */}
      <div className="border-t border-black mb-10 sm:mb-12 lg:mb-16"></div>

      {/* Title */}
      <div className="text-center mb-10 sm:mb-12 lg:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
          Vox Borders Series
        </h2>
      </div>

      {/* Large Center Image */}
      <div className="flex justify-center">
        <img
          src={voxBordersImg}
          alt="Vox Borders"
          className="w-full max-w-[1000px] object-cover"
        />
      </div>

    </div>
  );
}
