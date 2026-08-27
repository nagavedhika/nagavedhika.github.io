"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Props interface for the component
export interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  images: string[];
  className?: string;
}

// Reusable Action Button component
export const ActionButton = ({ 
  children, 
  href, 
  className 
}: { 
  children: React.ReactNode; 
  href?: string; 
  className?: string;
}) => {
  const ButtonContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-sm sm:text-base",
        className
      )}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return <a href={href}>{ButtonContent}</a>;
  }

  return ButtonContent;
};

// The main animated marquee hero component
export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  ctaLink = "#projects",
  secondaryCtaText,
  secondaryCtaLink,
  images,
  className,
}) => {
  // Animation variants for the text content
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  // Duplicate images for a seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-[#070b14] flex flex-col items-center justify-center text-center px-4 pt-20 pb-32",
        className
      )}
    >
      {/* Background glow meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[25rem] bg-blue-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[25rem] h-[20rem] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-1.5 text-xs sm:text-sm font-medium text-blue-300 backdrop-blur-md shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.1]"
        >
          {typeof title === "string" ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <ActionButton href={ctaLink}>{ctaText}</ActionButton>
          {secondaryCtaText && (
            <a
              href={secondaryCtaLink || "resume.html"}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm sm:text-base transition-all hover:border-slate-600 shadow-md"
            >
              {secondaryCtaText}
            </a>
          )}
        </motion.div>
      </div>

      {/* Animated Image Marquee */}
      <div className="absolute bottom-4 left-0 w-full h-44 sm:h-56 md:h-64 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] pointer-events-none select-none">
        <motion.div
          className="flex gap-4 sm:gap-6 will-change-transform"
          animate={{
            x: ["0%", "-50%"],
            transition: {
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] h-36 sm:h-48 md:h-52 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm shadow-xl"
              style={{
                transform: `rotate(${index % 2 === 0 ? -2 : 3}deg)`,
              }}
            >
              <img
                src={src}
                alt={`Showcase showcase ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl opacity-85 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedMarqueeHero;
