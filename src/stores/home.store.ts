import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { create } from "zustand";
import Highlight from "@/types/highlight.type";
import { addDoc, collection, doc } from "firebase/firestore";
import { database } from "../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_HIGHLIGHTS, FIREBASE_HOME } from "@/constants/firebase";

interface HomeStore {
  content: HeroSection;
  highlights: Highlight[];
  setHomeStore: <T extends keyof HomeStore>(
    key: T,
    value: HomeStore[T],
  ) => void;
  setContent: <K extends keyof HomeStore['content']>(
    key: K,
    value: HomeStore['content'][K],
  ) => void;
  modifyHighlights: (
    action: "add" | "delete",
    highlight: Highlight, 
  ) => void; 
  fAddHighlight: (highlight: Highlight) => Promise<boolean>;
}

export const useHomeStore = create<HomeStore>()((set, get) => ({
  content: {
    title: "Title",
    subtitle: "Subtitle",
    imageUrl: DEFAULT_HERO_IMAGE
  },
  highlights: [],
  setContent(key, value) {
    set({
      content: {
        ...get().content,
        [key]: value,
      }
    });
  },
  setHomeStore(key, value) {
    set({
      [key]: value
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
    const highlightsRef = collection(database, FIREBASE_BROSCINE, FIREBASE_HOME, FIREBASE_HIGHLIGHTS);
    
    try {
      await addDoc(highlightsRef, {
        imageUrl: highlight.imageUrl,
        description: highlight.description != "" ? highlight.description : "No description",
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}));