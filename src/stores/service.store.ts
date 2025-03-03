import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { doc, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { database } from "../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_SERVICES } from "@/constants/firebase";

interface ServiceStore {
  content: HeroSection;
  setServiceStore: <T extends keyof ServiceStore>(
    key: T,
    value: ServiceStore[T],
  ) => void;
  setContent: <K extends keyof ServiceStore['content']>(
    key: K,
    value: ServiceStore['content'][K],
  ) => void;
  fUpdateHeroSection: () => Promise<boolean>;
}

export const useServiceStore = create<ServiceStore>()((set, get) => ({
  content: {
    title: "Title",
    subtitle: "Subtitle",
    imageUrl: DEFAULT_HERO_IMAGE
  },
  setServiceStore(key, value) {
    set({
      [key]: value,
    })
  },
  setContent(key, value) {
    set({
      content: {
        ...get().content,
        [key]: value,
      }
    })
  },
  fUpdateHeroSection: async () => {
      const heroSectionRef = doc(database, FIREBASE_BROSCINE, FIREBASE_SERVICES);
      
      try {
        const newHeroSection = get().content;
  
        await updateDoc(heroSectionRef, {
          heroSection: newHeroSection,
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
}));