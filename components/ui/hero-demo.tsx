import React from "react";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";

// High quality curated tech & project showcase images
const TECH_SHOWCASE_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=75", // Abstract AI Neural Waves
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=75", // Data Science & Code Screen
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=75", // Healthcare AI Tech
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=75", // Machine Learning Matrix
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=75", // Analytics Dashboard & Full Stack
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=75", // AI Intelligent Core
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=75", // Clean Software Development
];

export const AnimatedHeroDemo = () => {
  return (
    <AnimatedMarqueeHero
      tagline="B.E. Computer Science • AI & Data Science Specialization"
      title={
        <>
          Engineering Intelligent <br />
          <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">
            AI & Full-Stack Solutions
          </span>
        </>
      }
      description="Computer Science student at Kumaraguru College of Technology building predictive AI healthcare systems, intelligent full-stack applications, and data-driven software."
      ctaText="Explore Projects"
      ctaLink="#projects"
      secondaryCtaText="ATS Resume"
      secondaryCtaLink="resume.html"
      images={TECH_SHOWCASE_IMAGES}
    />
  );
};

export default AnimatedHeroDemo;
