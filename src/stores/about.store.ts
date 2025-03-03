import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { database } from "../../firebase";
import { FIREBASE_ABOUT, FIREBASE_BROSCINE, FIREBASE_HIGHLIGHTS, FIREBASE_HOME } from "@/constants/firebase";
import Highlight from "@/types/highlight.type";

interface AboutStore {
  content: HeroSection;
  highlights: Highlight[];
  setAboutStore: <T extends keyof AboutStore>(
    key: T,
    value: AboutStore[T],
  ) => void;
  setContent: <K extends keyof AboutStore['content']>(
    key: K,
    value: AboutStore['content'][K],
  ) => void;
  modifyHighlights: (
    action: "add" | "delete",
    highlight: Highlight, 
  ) => void;
  fAddHighlight: (highlight: Highlight) => Promise<string | null>;
  fUpdateHeroSection: () => Promise<boolean>;
}

export const useAboutStore = create<AboutStore>()((set, get) => ({
  content: {
    title: "Title",
    subtitle: "Subtitle",
    imageUrl: DEFAULT_HERO_IMAGE
  },
  highlights: [],
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
  modifyHighlights(action, highlight) {
    set((state) => {
      if (action === "add") {
        return { highlights: [...state.highlights, highlight] }
      }

      if (action === "delete") {
        return { highlights: state.highlights.filter((t) => t.id != highlight.id) }
      }
      
      return state;
    })
  },
  fAddHighlight: async (highlight) => {
    const highlightsCollectionRef = collection(database, FIREBASE_BROSCINE, FIREBASE_ABOUT, FIREBASE_HIGHLIGHTS);
    
    try {
      const highlightRef = await addDoc(highlightsCollectionRef, {
        imageUrl: highlight.imageUrl,
        description: highlight.description != "" ? highlight.description : "No description",
      });
      return highlightRef.id;
    } catch (error) {
      console.error(error);
      return null;
    }
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