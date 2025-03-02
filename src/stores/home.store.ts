import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { create } from "zustand";
import Highlight from "@/types/highlight.type";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../../firebase";
import { FIREBASE_BRANDS, FIREBASE_BROSCINE, FIREBASE_HIGHLIGHTS, FIREBASE_HOME } from "@/constants/firebase";
import Brand from "@/types/brand.type";

interface HomeStore {
  content: HeroSection;
  highlights: Highlight[];
  brands: Brand[];
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
  modifyBrands: (
    action: "add" | "update" | "delete",
    brand: Brand,
  ) => void;
  fAddHighlight: (highlight: Highlight) => Promise<string | null>;
  fAddBrand: (newBrand: Brand) => Promise<string | null>;
  fUpdateBrand: (newBrand: Brand) => Promise<boolean>;
  fUpdateHeroSection: () => Promise<boolean>;
}

export const useHomeStore = create<HomeStore>()((set, get) => ({
  content: {
    title: "Title",
    subtitle: "Subtitle",
    imageUrl: DEFAULT_HERO_IMAGE
  },
  highlights: [],
  brands: [],
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
    const highlightsCollectionRef = collection(database, FIREBASE_BROSCINE, FIREBASE_HOME, FIREBASE_HIGHLIGHTS);
    
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
  modifyBrands(action, brand) {
    set((state) => {
      if (action === "add") {
        return { brands: [...state.brands, brand] };
      }

      if (action === "update") {
        set({
          brands: get().brands.map((oldBrand) => 
            oldBrand.id === brand.id ? brand : oldBrand
          ),
        });
      }

      if (action === "delete") {
        return { brands: state.brands.filter((t) => t.id != brand.id) };
      }
      
      return state;
    });
  },
  fAddBrand: async (newBrand) => {
    const brandCollectionRef = collection(database, FIREBASE_BROSCINE, FIREBASE_HOME, FIREBASE_BRANDS);

    try {
      const brandRef = await addDoc(brandCollectionRef, {
        name: newBrand.name,
        logoUrl: newBrand.logoUrl,
      });
      return brandRef.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  fUpdateBrand: async (newBrand) => {
    const brandRef = doc(database, FIREBASE_BROSCINE, FIREBASE_HOME, FIREBASE_BRANDS, newBrand.id);
    
    try {
      await updateDoc(brandRef, {
        logoUrl: newBrand.logoUrl,
        name: newBrand.name,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  fUpdateHeroSection: async () => {
    const heroSectionRef = doc(database, FIREBASE_BROSCINE, FIREBASE_HOME);
    
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