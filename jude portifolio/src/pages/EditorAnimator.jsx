import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EditorAnimator() {
  return (
    <div className="w-full">
      <Header />
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-[#0e0e0e] text-white text-center px-6 py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
          Editor/Animator Application
        </h1>

        <p className="uppercase tracking-widest text-sm mb-10">
          Remote Position
        </p>

        <div className="max-w-3xl mx-auto text-base sm:text-lg leading-7 sm:leading-8 font-serif space-y-6">
          <p>
            We're looking to expand our team of freelance editors and animators
            for upcoming videos on the channel.
          </p>

          <p>
            Editors should have a strong background in video editing as well as
            motion graphics and animation experience. Experience editing for
            online video is a requirement. The ability to work with complex
            timelines, color grading, and sound design is imperative.
          </p>

          <p>
            Please fill out the submission form below so that we can add you to
            our resource list for upcoming projects. If we have a project that
            matches your skills and interests, we will reach out to begin working
            together. If our process of working together is positive on both
            ends then we may also integrate you into our internal production
            meetings and work together more regularly. Pay will depend on
            experience but will likely range between $20-40 per hour.
          </p>
        </div>
      </section>

      {/* ================= FORM SECTION ================= */}
      <section className="bg-[#d6cbbd] px-6 py-20">
        <div className="max-w-3xl mx-auto font-serif text-[#1a1a1a]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-12 text-center">
            Editor/Animator Application
          </h2>

          {/* Name */}
          <div className="mb-10">
            <label className="block text-lg mb-4">Name</label>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm mb-2">
                  First Name (required)
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-200 border border-gray-400 h-12 px-3"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-2">
                  Last Name (required)
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-200 border border-gray-400 h-12 px-3"
                />
              </div>
            </div>
          </div>

          {/* Pronouns */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Pronouns (required)
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 border border-gray-400 h-12 px-3"
            />
          </div>

          {/* Email */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Email (required)
            </label>
            <input
              type="email"
              className="w-full bg-gray-200 border border-gray-400 h-12 px-3"
            />
          </div>

          {/* Social Handles */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Social Handles (required)
            </label>
            <input
              type="text"
              className="w-full bg-gray-200 border border-gray-400 h-12 px-3"
            />
          </div>

          {/* Location */}
          <div className="mb-10">
            <label className="block text-lg mb-1">
              Location (required)
            </label>
            <p className="text-sm mb-3">
              (note, this is a remote position, we are just curious where you're based)
            </p>
            <input
              type="text"
              className="w-full bg-gray-200 border border-gray-400 h-12 px-3"
            />
          </div>

          {/* Editing Work Examples */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Link to 1-2 examples of your editing work: (required)
            </label>
            <p className="text-sm mb-3">
              Please do not link to a page with multiple videos but instead individually link to 1-2 videos.
            </p>
            <textarea
              rows="6"
              className="w-full bg-gray-200 border border-gray-400 px-3 py-2"
            ></textarea>
          </div>

          {/* Animation Work Examples */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Link to 1-2 examples of your animation work:
            </label>
            <p className="text-sm mb-3">
              Please do not link to a page with multiple videos but instead individually link to 1-2 videos.
            </p>
            <textarea
              rows="6"
              className="w-full bg-gray-200 border border-gray-400 px-3 py-2"
            ></textarea>
          </div>

          {/* 3 Things */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Help us get to know you. Tell us 3 things about yourself: (required)
            </label>
            <textarea
              rows="6"
              className="w-full bg-gray-200 border border-gray-400 px-3 py-2"
            ></textarea>
          </div>

          {/* Adobe Illustrator Rating */}
          <div className="mb-10">
            <label className="block text-lg mb-4">
              Rate your skills: Designing in Adobe Illustrator (required)
            </label>
            <div className="space-y-3">
              {['1 - Minimal Experience', '2', '3', '4', '5 - Expert'].map((level, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input type="radio" name="illustrator" id={`illustrator-${idx}`} className="w-5 h-5 border border-black accent-black" />
                  <label htmlFor={`illustrator-${idx}`} className="text-[18px] tracking-wide">{level}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Premiere Pro Rating */}
          <div className="mb-10">
            <label className="block text-lg mb-4">
              Rate your skills: Editing in Premiere Pro (required)
            </label>
            <div className="space-y-3">
              {['1 - Minimal Experience', '2', '3', '4', '5 - Expert'].map((level, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input type="radio" name="premiere" id={`premiere-${idx}`} className="w-5 h-5 border border-black accent-black" />
                  <label htmlFor={`premiere-${idx}`} className="text-[18px] tracking-wide">{level}</label>
                </div>
              ))}
            </div>
          </div>

          {/* After Effects Rating */}
          <div className="mb-10">
            <label className="block text-lg mb-4">
              Rate your skills: Animation in After Effects (required)
            </label>
            <div className="space-y-3">
              {['1 - Minimal Experience', '2', '3', '4', '5 - Expert'].map((level, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input type="radio" name="aftereffects" id={`aftereffects-${idx}`} className="w-5 h-5 border border-black accent-black" />
                  <label htmlFor={`aftereffects-${idx}`} className="text-[18px] tracking-wide">{level}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-10">
            <label className="block text-lg mb-4">
              Are you available to start right away? (required)
            </label>
            <div className="flex items-center gap-3 mb-8">
              <input type="radio" name="availability" id="yes" className="w-5 h-5 border border-black accent-black" />
              <label htmlFor="yes" className="text-[18px] tracking-wide">Yes</label>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <input type="radio" id="no" name="availability" className="w-5 h-5 border border-black accent-black" />
              <label htmlFor="no" className="text-[18px] tracking-wide">No</label>
            </div>
          </div>

          {/* Date Question */}
          <div className="mb-8">
            <p className="text-base sm:text-lg md:text-[22px] mb-4">
              If no, when will you be available?
            </p>
            <input
              type="date"
              className="w-full sm:w-[250px] bg-[#e5e5e5] border border-gray-400 px-4 py-3 text-base sm:text-[18px] focus:outline-none"
            />
          </div>

          {/* Availability per month */}
          <div className="mb-8">
            <p className="text-base sm:text-lg md:text-[22px] mb-2">
              Approximately how much availability do you have per month for
              editing/animation projects?
            </p>
            <p className="text-gray-600 mb-3">(required)</p>
            <input
              type="text"
              className="w-full bg-[#e5e5e5] border border-gray-400 px-4 py-4 text-base sm:text-[18px] focus:outline-none"
            />
          </div>

          {/* Years experience */}
          <div className="mb-8">
            <p className="text-base sm:text-lg md:text-[22px] mb-2">
              How many years of professional editing and animation experience do you have?
            </p>
            <p className="text-gray-600 mb-3">(required)</p>
            <input
              type="text"
              className="w-full bg-[#e5e5e5] border border-gray-400 px-4 py-4 text-base sm:text-[18px] focus:outline-none"
            />
          </div>

          {/* Anything else */}
          <div className="mb-12">
            <p className="text-base sm:text-lg md:text-[22px] mb-4">
              Anything else you think we should know?
            </p>
            <textarea
              rows="5"
              className="w-full bg-[#e5e5e5] border border-gray-400 px-4 py-4 text-base sm:text-[18px] resize-none focus:outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button className="tracking-wide text-[16px] border-b-2 border-red-600 pb-1">
            Submit
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
