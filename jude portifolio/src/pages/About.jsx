import React from "react";
import Header from "../components/Header";
import AboutHero from "../components/AboutHero";
import WorkHighlights from "../components/WorkHighlights";
import ResourcesSection from "../components/ResourcesSection";
import ProjectShowcase from "../components/ProjectShowcase";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Header />
      <AboutHero />
      <WorkHighlights />
      <ResourcesSection />
      <ProjectShowcase />
      <Footer />
    </div>
  );
}
