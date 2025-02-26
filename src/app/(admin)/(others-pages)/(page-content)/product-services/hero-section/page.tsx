"use client"
import HeroSection from "@/types/hero.type";
import { useServiceStore } from "@/stores/service.store";
import ResponsiveView from "@/components/common/ResponsiveView";
import HeroSectionCard from "@/components/common/HeroSectionCard";
import { useEffect } from "react";

export default function ProductServicesHeroSection() {
  const placeholder: HeroSection = {
    title: "AI. Consulting. Development. Maintenance.",
    subtitle: "Your AI partner for success. We specialize in AI strategy, development, and deployment to bring your ideas to life. Contact us today to start your AI journey!",
    imageUrl: "/images/grid-image/image-03.png",
  };

  const { content, setContent, setServiceStore } = useServiceStore();

  useEffect(() => {
    setServiceStore('content', placeholder);
  }, []);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Product Service - Hero Section
        </h3>

        <div className="space-y-6">
          <HeroSectionCard 
            key="product-service-hero-card"
            store={{
              content: content,
              setContent: setContent,
              setStore: setServiceStore,
            }}
          />
          <ResponsiveView 
            key="product-service-hero-view"
            title={content.title}
            subtitle={content.subtitle}
            imageUrl={content.imageUrl}
          />
        </div>
      </div>
    </div>
  );
}