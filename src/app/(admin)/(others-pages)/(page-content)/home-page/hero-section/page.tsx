"use client"
import HeroSectionCard from "@/components/common/HeroSectionCard";
import ResponsiveView from "@/components/common/ResponsiveView";
import HeroSection from "@/types/hero.type";
import { useHomeStore } from "@/stores/home.store";
import { useEffect } from "react";

export default function HomePageHeroSection() {
  const placeholder: HeroSection = {
    title: "AI. Consulting. Development. Maintenance.",
    subtitle: "Vietnam's AI experts. We provide top-tier AI consulting services and develop innovative AI products. Let's build the future, together. Get in touch to explore the possibilities!",
    imageUrl: "/images/grid-image/image-02.png",
  }

  const { content, setHomeStore } = useHomeStore();

  useEffect(() => {
    setHomeStore('content', placeholder);
  }, []);
  
  return (
    <div>
      <div className="rounded-2xl borderF border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Home Page - Hero Section
        </h3>

        <div className="space-y-6">
          <HeroSectionCard 
            key="home-page-hero-card"
          />
          <ResponsiveView 
            key="home-page-hero-view" 
            title={content.title}
            subtitle={content.subtitle}
            imageUrl={content.imageUrl}
          />
        </div>
      </div>
    </div>
  );
}