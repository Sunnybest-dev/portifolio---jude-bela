import React from "react";
import { Link } from "react-router-dom";

export default function SubmitIdeasSection() {
  return (
    <div className="relative w-full py-20 bg-black text-white flex font-['DM_Sans'] items-center justify-center overflow-hidden">

      {/* Dust effect background */}
      <div className="absolute inset-0 opacity-[0.93]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.11)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.13)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.09)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_70%,rgba(255,255,255,0.11)_0%,transparent_50%)]" />
      </div>

      {/* Grainy texture overlay */}
      <div className="absolute inset-0 opacity-[0.5] mix-blend-overlay" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="3" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")'}} />

      {/* Background subtle texture effect */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_3px)] bg-[size:3px_3px] opacity-40" />

      {/* Large Gold Question Mark */}
      <div className="absolute text-[500px] font-bold text-yellow-500 opacity-70 select-none leading-none" style={{
        textShadow: '0 0 20px rgba(202, 138, 4, 0.3), 0 0 40px rgba(202, 138, 4, 0.2)',
        WebkitTextStroke: '2px rgba(202, 138, 4, 0.5)',
        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))'
      }}>
        ?
      </div>

      {/* Question mark texture overlay */}
      <div className="absolute text-[500px] font-bold text-transparent opacity-30 select-none leading-none" style={{
        WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="grain"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="2" numOctaves="3"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23grain)"/%3E%3C/svg%3E")',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text'
      }}>
        ?
      </div>

      {/* Content */}
      <div className="relative text-center max-w-3xl px-6 font-['Vario']">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-light mb-10 tracking-wide font-['Vario']">
          Have an idea for a story?
        </h1>

        {/* Paragraph */}
        <p className="text-lg md:text-xl leading-9 font-light mb-12 font-['Vario']">
          We're eager to hear about the stories you would like to see covered.<br />
          Please include your story submissions using the form below and we<br />
          will reach out if it seems like a good fit.
        </p>

        {/* Button */}
        <Link to="/submit-ideas" className="relative uppercase tracking-widest text-sm font-semibold group inline-block">
          SUBMIT IDEAS
          <span className="block h-[2px] bg-orange-600 w-full mt-2"></span>
        </Link>

      </div>
    </div>
  );
}
