import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import books2Img from "../../images/books 2.webp";
import asset10Img from "../../images/Asset+10.webp";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("newsletter_subscriptions")
      .insert([{ email }]);

    if (error) {
      setStatus("error");
      console.error(error);
    } else {
      setStatus("success");
      setEmail("");
    }

    setTimeout(() => setStatus(""), 3000);
  };
  const links = [
    { label: "Vox Borders Series", href: "https://www.youtube.com/playlist?list=PLJ8cMiYb3G5dRe4rC7m8jDaqodjZeLzCZ" },
    { label: "The New York Times", href: "https://www.nytimes.com" },
    { label: "Jude's Channel", href: "https://www.youtube.com/channel/UCmGSJVG3mCRXVOP4yZrU1Dw" },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Cream section - newsletter (johnnyharris.ch #e7dfd2) */}
      <section className="relative bg-[#e7dfd2] py-8 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Books 2 Image */}
          <div className=" w-full max-w-[300px] lg:max-w-none lg:w-[380px] h-[420px] lg:h-[520px] order-2 lg:order-1 z-0 -mb-20">
            <img
              src={books2Img}
              alt="Books"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Arrow Image - Centered */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-15 h-15 z-20">
            <img
              src={asset10Img}
              alt="Arrow"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right: Text */}
          <div className="max-w-xl text-black order-1 lg:order-2 font-['Caveat'] z-30 relative">
            <h2 className="text-xl font-semibold sm:text-2xl lg:text-5xl leading-relaxed italic -skew-x-6">
              We have a monthly, non-spammy<br />
              <span className="float-right">newsletter with our</span><br />
              recommendations and a playlist.
            </h2>
          </div>
        </div>
      </section>

      {/* Dark green bar - work links (#6f7f72) */}
      <section className="relative w-full bg-[#6f7f72] text-white py-6 lg:py-10 z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 lg:gap-16 text-sm tracking-[0.2em] uppercase font-medium">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b-2 border-white/80 pb-2 hover:border-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
