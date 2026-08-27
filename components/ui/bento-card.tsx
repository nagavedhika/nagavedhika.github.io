"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Activity, 
  Bot, 
  ShoppingBag, 
  Database, 
  Layers, 
  ShieldCheck, 
  Code2, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BentoTabItem {
  id: string;
  label: string;
  badge?: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  image: string;
  linkText?: string;
  linkUrl?: string;
}

const DEFAULT_TABS: BentoTabItem[] = [
  {
    id: "healthcare-ai",
    label: "Healthcare AI",
    badge: "Predictive ML",
    icon: Brain,
    title: "AI Healthcare Treatment Response",
    tagline: "Predictive Machine Learning for Clinical Efficacy",
    description:
      "An intelligent predictive system analyzing patient physiological metrics and clinical indicators to forecast personalized treatment response efficacy with high diagnostic accuracy.",
    stats: [
      { label: "Accuracy", value: "94.2%" },
      { label: "Pipeline", value: "Python ML" },
      { label: "Dataset", value: "Clinical" },
    ],
    tags: ["Python", "Machine Learning", "Healthcare AI", "Predictive Analytics"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=75",
    linkText: "View Repository",
    linkUrl: "https://github.com/nagavedhika",
  },
  {
    id: "fullstack-ai",
    label: "Full-Stack App",
    badge: "AI Chatbot",
    icon: Bot,
    title: "Full-Stack Web App with AI Chatbot",
    tagline: "End-to-End Application with Intelligent Conversational Assistant",
    description:
      "Developed a full-stack web application featuring user authentication, catalog management, and relational order handling, integrated with an AI chatbot for instant recommendations and FAQ support.",
    stats: [
      { label: "Auth", value: "JWT / Session" },
      { label: "Database", value: "MySQL Relational" },
      { label: "AI Core", value: "Conversational" },
    ],
    tags: ["Full-Stack", "Conversational AI", "MySQL", "Authentication", "Python"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=75",
    linkText: "View Details",
    linkUrl: "https://github.com/nagavedhika",
  },
  {
    id: "internship",
    label: "AI-ML Internship",
    badge: "Google & AICTE",
    icon: Sparkles,
    title: "AI-ML Virtual Internship Program",
    tagline: "EduSkills, AICTE & Google for Developers",
    description:
      "Completed structured training in Machine Learning algorithms, predictive analytics, and data pipeline construction supported jointly by EduSkills, AICTE, and Google for Developers.",
    stats: [
      { label: "Domain", value: "AI & ML" },
      { label: "Partner", value: "Google Developers" },
      { label: "Status", value: "Certified" },
    ],
    tags: ["Machine Learning", "Google Tech", "Data Pipelines", "Model Training"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=75",
    linkText: "View Certificate Info",
    linkUrl: "#education",
  },
  {
    id: "technologies",
    label: "Core Arsenal",
    badge: "Skills Matrix",
    icon: Code2,
    title: "Programming & Database Systems",
    tagline: "Python, Java, C++, MySQL & Blender 3D",
    description:
      "Strong foundational competencies in Object-Oriented Programming (OOP), Data Structures & Algorithms, and relational DBMS certified by Infosys Springboard (Part 1 & 2).",
    stats: [
      { label: "Languages", value: "Python, Java, C++" },
      { label: "Database", value: "MySQL (Part 1 & 2)" },
      { label: "CGPA", value: "7.8 / 10" },
    ],
    tags: ["Python", "Java", "C++", "MySQL", "DBMS", "Blender 3D"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&auto=format&fit=crop&q=75",
    linkText: "Explore Skills",
    linkUrl: "#skills",
  },
];

export interface BentoCardProps {
  tabs?: BentoTabItem[];
  className?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  tabs = DEFAULT_TABS,
  className,
}) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const IconComponent = activeTab.icon;

  return (
    <div
      className={cn(
        "relative w-full max-w-5xl mx-auto rounded-3xl p-4 sm:p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden",
        className
      )}
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with animated pill tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-red-400 block mb-1">
            Interactive Bento Showcase
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
            Project & Technical Highlights
          </h3>
        </div>

        {/* Animated Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            const TabIcon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors",
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="bento-active-pill"
                    className="absolute inset-0 bg-red-500/90 rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Content Grid */}
      <div className="relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left Column: Details & Stats */}
        <div className="lg:col-span-7 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Badge & Title */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-950/60 border border-red-500/30 text-red-300">
                  {activeTab.badge || "Featured"}
                </span>
                <span className="text-xs text-slate-400 font-medium">{activeTab.tagline}</span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {activeTab.title}
              </h4>

              <p className="text-slate-300 text-sm leading-relaxed">
                {activeTab.description}
              </p>

              {/* Stats Bar */}
              {activeTab.stats && (
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                  {activeTab.stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-sm sm:text-base font-bold text-white font-mono">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeTab.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              {activeTab.linkText && (
                <div className="pt-2">
                  <a
                    href={activeTab.linkUrl || "#"}
                    className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                  >
                    <span>{activeTab.linkText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Interactive Image Preview */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/70 bg-slate-950 shadow-xl group"
            >
              <img
                src={activeTab.image}
                alt={activeTab.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-semibold text-white">
                    {activeTab.title}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center shadow">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default BentoCard;
