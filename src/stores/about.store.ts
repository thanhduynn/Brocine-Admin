import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { doc, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { database } from "../../firebase";
import { FIREBASE_ABOUT, FIREBASE_BROSCINE } from "@/constants/firebase";

interface AboutStore {
  content: HeroSection;
  setAboutStore: <T extends keyof AboutStore>(
    key: T,
    value: AboutStore[T],
  ) => void;
  setContent: <K extends keyof AboutStore['content']>(
    key: K,
    value: AboutStore['content'][K],
  ) => void;
  fUpdateHeroSection: () => Promise<boolean>;
}

export const useAboutStore = create<AboutStore>()((set, get) => ({
  content: {
    title: "Title",
    subtitle: "Subtitle",
    imageUrl: DEFAULT_HERO_IMAGE
  },
  setAboutStore(key, value) {
    set({
      [key]: value,
    });
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
    const heroSectionRef = doc(database, FIREBASE_BROSCINE, FIREBASE_ABOUT);
    
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