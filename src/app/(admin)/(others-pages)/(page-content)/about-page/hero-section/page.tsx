"use client"
import HeroSectionCard from "@/components/common/HeroSectionCard";
import ResponsiveView from "@/components/common/ResponsiveView";
import { useAboutStore } from "@/stores/about.store";
import HeroSection from "@/types/hero.type";
import { useEffect } from "react";

export default function AboutHeroSection() {
  const placeholder: HeroSection = {
    title: "AI. Consulting. Development. Maintenance.",
    subtitle: "Innovate with AI. We offer expert AI consulting and advanced solutions to help businesses thrive in the digital era. Let’s work together to create something extraordinary!",
    imageUrl: "/images/grid-image/image-04.png",
  }
  
  const { content, setContent, setAboutStore } = useAboutStore();
  
  useEffect(() => {
    setAboutStore('content', placeholder);
  }, []);
  
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          About - Hero Section
        </h3>

        <div className="space-y-6">
          <HeroSectionCard 
            key="about-page-hero-card"
            store={{
              content: content,
              setContent: setContent,
              setStore: setAboutStore,
            }}
          />
          <ResponsiveView 
            key="about-page-hero-view"
            title={content.title}
            subtitle={content.subtitle}
            imageUrl={content.imageUrl}
          />
        </div>
      </div>
    </div>
  );
}