import React from "react";

export default function PlaylistSection() {
  return (
    <div className="w-full bg-gray-100 flex items-center justify-center py-20">
      <div className="w-full max-w-7xl flex items-center justify-between px-16">
        
        {/* LEFT STACKED CARDS */}
        <div className="relative w-[520px] h-[420px]">
          
          {/* Back Card */}
          <div className="absolute top-0 left-24 w-[340px] h-[400px] bg-pink-300 rounded-sm shadow-md rotate-0 z-10 flex items-start justify-center pt-6">
            <h2 className="text-white text-xl font-semibold tracking-wide">
              May Playlist
            </h2>
          </div>

          {/* Middle Card */}
          <div className="absolute top-16 left-32 w-[360px] h-[400px] bg-orange-500 rounded-sm shadow-lg rotate-6 z-20 flex items-start justify-center pt-6">
            <h2 className="text-white text-2xl font-semibold">
              Good for the soul
            </h2>
          </div>

          {/* Front Card */}
          <div className="absolute top-24 left-0 w-[400px] h-[320px] bg-emerald-700 rounded-sm shadow-xl -rotate-6 z-30 flex items-center justify-center">
            <h2 className="text-white text-3xl font-semibold">
              Jude & Iz
            </h2>
          </div>

        </div>

        {/* RIGHT SIDE TEXT */}
        <div className="flex items-center gap-6">
          
          {/* Arrow */}
          <div className="text-3xl">←</div>

          {/* Text */}
          <div className="max-w-md">
            <p className="text-2xl leading-relaxed text-black font-['Poppins']">
              We have a monthly, non-spammy newsletter with our
              recommendations and a playlist.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
