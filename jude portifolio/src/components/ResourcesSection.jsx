import React from "react";
import patreonImg from "../../images/Asset+26.webp";
import assetImg from "../../images/Asset+25 (1).webp";
import newsletterImg from "../../images/Asset+28.webp";
import gearImg from "../../images/Asset+27.webp";

export default function ResourcesSection() {
  return (
    <div className="w-full bg-[#d8cec2] py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 font-serifDisplay text-[#1e1e1e]">

      {/* Title */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-3xl sm:text-4xl font-light">More From Jude</h2>
      </div>

      <div className="border-t border-black mb-8 sm:mb-12 lg:mb-16"></div>

      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start mb-8 sm:mb-12 lg:mb-16">

        {/* Patreon */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10">
          <img
            src={patreonImg}
            alt="Patreon"
            className="w-full sm:w-[200px] lg:w-[280px] h-[150px] sm:h-[140px] lg:h-[180px] object-cover mx-auto sm:mx-0"
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-3 lg:mb-4">Patreon</h3>
            <p className="text-base sm:text-lg leading-relaxed mb-4 lg:mb-6">
              Support my Patreon and get behind <br className="hidden sm:block" />
              the scenes of my videos.
            </p>
            <a href="#" className="uppercase text-xs sm:text-sm tracking-wider border-b-2 lg:border-b-3 font-semibold border-white pb-1 inline-block">
              Go To Patreon
            </a>
          </div>
        </div>

        {/* Bright Trip */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10">
          <img
            src={assetImg}
            alt="Asset"
            className="w-full sm:w-[200px] lg:w-[280px] h-[150px] sm:h-[140px] lg:h-[180px] object-contain mx-auto sm:mx-0"
          />
       
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-3 lg:mb-4">Bright Trip</h3>
            <p className="text-base sm:text-lg leading-relaxed mb-4 lg:mb-6">
              I started a travel company that
              <br className="hidden sm:block" />
              teaches you how to travel smarter.
            </p>
            <a href="#" className="uppercase text-xs sm:text-sm tracking-wider border-b-2 lg:border-b-3 font-semibold border-white pb-1 inline-block">
              Visit Bright Trip
            </a>
          </div>
        </div>

      </div>

      <div className="border-t border-black mb-8 sm:mb-12 lg:mb-16"></div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10">
          <img
            src={newsletterImg}
            alt="Newsletter"
            className="w-full sm:w-[200px] lg:w-[280px] h-[150px] sm:h-[140px] lg:h-[180px] object-cover mx-auto sm:mx-0"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-3 lg:mb-4">Newsletter</h3>
            <p className="text-base sm:text-lg leading-relaxed mb-4 lg:mb-6 max-w-sm mx-auto sm:mx-0">
              We have a monthly non-spammy
              newsletter with our recommendations
              and a playlist.
            </p>
            <a href="#" className="uppercase text-xs sm:text-sm tracking-wider border-b-2 lg:border-b-3 font-semibold border-white pb-1">
              Join Newsletter
            </a>
          </div>
        </div>

        {/* Gear Guide */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10">
          <img
            src={gearImg}
            alt="Gear Guide"
            className="w-full sm:w-[200px] lg:w-[280px] h-[150px] sm:h-[140px] lg:h-[180px] object-cover mx-auto sm:mx-0"
          />
          <div className="text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl mb-3 lg:mb-4">Gear Guide</h3>
            <p className="text-base sm:text-lg leading-relaxed mb-4 lg:mb-6 max-w-sm mx-auto sm:mx-0">
              Here is all of the gear we use to make <br className="hidden sm:block" />
              our videos.
            </p>
            <a href="#" className="uppercase text-xs sm:text-sm tracking-wider border-b-2 lg:border-b-3 font-semibold border-white pb-1">
              View Gear Guide
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
