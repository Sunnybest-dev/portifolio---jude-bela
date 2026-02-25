import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ResearchWriter() {
  const [formData, setFormData] = useState({
    first_name: "", last_name: "", pronouns: "", email: "", social_handles: "",
    location: "", portfolio_url: "", work_examples: "", about_yourself: "",
    subject_matter: "", available_now: true, available_date: "",
    monthly_availability: "", years_experience: "", additional_info: ""
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("research_writer_applications")
      .insert([formData]);

    if (error) {
      setStatus("error");
      console.error(error);
    } else {
      setStatus("success");
      setFormData({
        first_name: "", last_name: "", pronouns: "", email: "", social_handles: "",
        location: "", portfolio_url: "", work_examples: "", about_yourself: "",
        subject_matter: "", available_now: true, available_date: "",
        monthly_availability: "", years_experience: "", additional_info: ""
      });
    }
  };
  return (
    <div className="w-full">
      <Header />
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-[#0e0e0e] text-white text-center px-6 py-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
          Researcher/Writer Application
        </h1>

        <p className="uppercase tracking-widest text-sm mb-10">
          Remote Position
        </p>

        <div className="max-w-3xl mx-auto text-base sm:text-lg leading-7 sm:leading-8 font-serif space-y-6">
          <p>
            We're looking to expand our team of freelance researchers and writers
            for upcoming videos on the channel.
          </p>

          <p>
            Writers should have a strong background in research as well as
            journalistic or educational writing experience, and experience
            writing for online video is a requirement. The ability to sort
            through complex data sets, journals, and archives and condense
            information into a digestible script is imperative.
          </p>

          <p>
            Please fill out the submission form below so that we can add you to
            our resource list for upcoming stories. If we have a story in your
            field of expertise or interest, we will reach out to begin working
            together. If our process of working together is positive on both
            ends then we may also integrate you into our internal pitch
            meetings to pitch story ideas you'd like to see made and work
            together more regularly. Pay will depend on experience but will
            likely range between $15-30 per hour.
          </p>
        </div>
      </section>

      {/* ================= FORM SECTION ================= */}
      <section className="bg-[#d6cbbd] px-6 py-20">
        <div className="max-w-3xl mx-auto font-serif text-[#1a1a1a]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-12 text-center">
            Researcher/Writer Application
          </h2>

          {status === "success" && <p className="mb-6 p-4 bg-green-100 text-green-800 text-center">Application submitted successfully!</p>}
          {status === "error" && <p className="mb-6 p-4 bg-red-100 text-red-800 text-center">Error submitting. Please try again.</p>}

          <form onSubmit={handleSubmit}>

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

          {/* Portfolio */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Link to your portfolio or resume (required)
            </label>
            <input
              type="text"
              placeholder="http://"
              className="w-full bg-gray-200 border border-gray-400 h-12 px-3"
            />
          </div>

          {/* Work Examples */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Links to 1-2 relevant examples of your work writing for video (required)
            </label>
            <p className="text-sm mb-3">
              Tell us about the research process behind them. Please do not link to a page with multiple examples but instead individually link to 1-2 examples.
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

          {/* Subject Matter */}
          <div className="mb-10">
            <label className="block text-lg mb-2">
              Describe your subject matter focus or areas of expertise (required)
            </label>
            <textarea
              rows="6"
              className="w-full bg-gray-200 border border-gray-400 px-3 py-2"
            ></textarea>
          </div>

          {/* Availability */}
          <div className="mb-10">
            <label className="block text-lg mb-4">
              Are you available to start right away? (required)
            </label>
            <div className="flex items-center gap-3 mb-8">
              <input type="radio" name="availability" id="yes" className="w-5 h-5 border border-black accent-black" />
              <label htmlFor="yes" className="text-[18px] tracking-wide">YES</label>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <input type="radio" id="no" name="availability" className="w-5 h-5 border border-black accent-black" />
              <label htmlFor="no" className="text-[18px] tracking-wide">NO</label>
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
              research/writing projects?
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
              How many years of professional research and writing experience do you have?
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
          <button type="submit" disabled={status === "loading"} className="tracking-wide text-[16px] border-b-2 border-red-600 pb-1 bg-transparent cursor-pointer disabled:opacity-50">
            {status === "loading" ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
