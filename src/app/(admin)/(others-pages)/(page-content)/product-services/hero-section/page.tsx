"use client"
import HeroSection from "@/types/hero.type";
import { useServiceStore } from "@/stores/service.store";
import ResponsiveView from "@/components/common/ResponsiveView";
import HeroSectionCard from "@/components/common/HeroSectionCard";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../../../../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_HERO, FIREBASE_SERVICES } from "@/constants/firebase";

export default function ProductServicesHeroSection() {
  const { content, setContent, setServiceStore, fUpdateHeroSection } = useServiceStore();

  const fetchData = async () => {
    const heroSectionRef = doc(database, FIREBASE_BROSCINE, FIREBASE_SERVICES);
    const docSnap = await getDoc(heroSectionRef);
    if (docSnap.exists()) { 
      const data = docSnap.data()[FIREBASE_HERO] as HeroSection;
      setServiceStore('content', data);
    };
  };

  useEffect(() => {
    fetchData();
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
              updateContent: fUpdateHeroSection,
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