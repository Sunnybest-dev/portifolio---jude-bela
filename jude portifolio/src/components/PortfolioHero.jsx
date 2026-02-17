import React from "react";
import mapBanner from "../../images/ink draw.webp";
import cyprusThumbnail from "../../images/thumb.webp";

export default function PortfolioHero() {
  return (
    <div className="w-full font-serifDisplay">

      {/* Top Map Banner */}
      <div className="relative w-full h-[150px] sm:h-[180px] lg:h-[200px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
          className="w-full h-full border-0 pointer-events-none"
          loading="lazy"
          title="Map Background"
        ></iframe>

        {/* Overlay for faded effect */}
        <div className="absolute inset-0 bg-[#7f8b7c]/60"></div>

        {/* Title */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-2xl sm:text-5xl lg:text-6xl font-medium tracking-wide">
            Portfolio
          </h1>
        </div>

        {/* Bottom Divider */}
        <div className="absolute bottom-15 left-0 w-full flex justify-center">
          <div className="w-[90%] border-b-3 border-black"></div>
        </div>
      </div>

      {/* Beige Section */}
      <div className="bg-[#d8cec2] py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 text-[#1e1e1e]">

        {/* Section Title */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
            Uncharted Series
          </h2>
        </div>

        {/* Large Image */}
        <div className="flex justify-center">
          <img
            src={cyprusThumbnail}
            alt="Cyprus"
            className="w-200 max-w-[1000px] object-cover shadow-sm"
          />
        </div>

      </div>
    </div>
  );
}
