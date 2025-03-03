"use client"
import HeroSectionCard from "@/components/common/HeroSectionCard";
import ResponsiveView from "@/components/common/ResponsiveView";
import HeroSection from "@/types/hero.type";
import { useAboutStore } from "@/stores/about.store";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../../../../../firebase";
import { FIREBASE_ABOUT, FIREBASE_BROSCINE, FIREBASE_HERO } from "@/constants/firebase";

export default function AboutPageHeroSection() {
  const { content, setContent, setAboutStore, fUpdateHeroSection } = useAboutStore();

  const fetchData = async () => {
    const heroSectionRef = doc(database, FIREBASE_BROSCINE, FIREBASE_ABOUT);
    const docSnap = await getDoc(heroSectionRef);
    if (docSnap.exists()) { 
      const data = docSnap.data()[FIREBASE_HERO] as HeroSection;
      setAboutStore('content', data);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <div className="rounded-2xl borderF border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          About Page - Hero Section
        </h3>

        <div className="space-y-6">
          <HeroSectionCard 
            key="about-page-hero-card"
            store={{
              content: content,
              setContent: setContent,
              setStore: setAboutStore,
              updateContent: fUpdateHeroSection,
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