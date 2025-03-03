import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { database } from "../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_HIGHLIGHTS, FIREBASE_SERVICES_COLL, FIREBASE_SERVICES_DOCS } from "@/constants/firebase";
import Highlight from "@/types/highlight.type";
import Service from "@/types/service.type";

interface ServiceStore {
  content: HeroSection;
  highlights: Highlight[];
  services: Service[];
  setServiceStore: <T extends keyof ServiceStore>(
    key: T,
    value: ServiceStore[T],
  ) => void;
  setContent: <K extends keyof ServiceStore['content']>(
    key: K,
    value: ServiceStore['content'][K],
  ) => void;
  modifyHighlights: (
    action: "add" | "delete",
    highlight: Highlight, 
  ) => void;
  modifyService: (
    action: "add" | "update" | "delete", 
    service: Partial<Service> & { id: string }
  ) => void;
  fUpdateService: (newService: Service) => Promise<boolean>;
  fAddService: (newServiceName: string) => Promise<string | null>;
  fAddHighlight: (highlight: Highlight) => Promise<string | null>;
  fUpdateHeroSection: () => Promise<boolean>;
}

export const useServiceStore = create<ServiceStore>()((set, get) => ({
  content: {
    title: "Title",
    subtitle: "Subtitle",
    imageUrl: DEFAULT_HERO_IMAGE
  },
  highlights: [],
  services: [],
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
    const highlightsCollectionRef = collection(database, FIREBASE_BROSCINE, FIREBASE_SERVICES_COLL, FIREBASE_HIGHLIGHTS);
    
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
  modifyService: (action, service) => {
    set((state) => {
      if (action === "add") {
        if (state.services.some((t) => t.id === service.id)) {
          console.warn(`Service with ID ${service.id} already exists!`);
          return state; // Return unchanged state
        }
        return { services: [...state.services, { id: service.id, serviceName: service.serviceName || "New Service" }] };
      }

      if (action === "update") {
        return { services: state.services.map((t) => (t.id === service.id ? { ...t, ...service } : t)) };
      }

      if (action === "delete") {
        return { services: state.services.filter((t) => t.id !== service.id) };
      }

      return state;
    });
  },
  fAddService: async (newServiceName) => {
    const categoryCollectionRef = collection(database, FIREBASE_BROSCINE, FIREBASE_SERVICES_COLL, FIREBASE_SERVICES_DOCS);

    try {
      const serviceRef = await addDoc(categoryCollectionRef, {
        serviceName: newServiceName,
      });
      return serviceRef.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  fUpdateService: async (newService) => {
    const serviceRef = doc(database, FIREBASE_BROSCINE, FIREBASE_SERVICES_COLL, FIREBASE_SERVICES_DOCS, newService.id);

    try {
      await updateDoc(serviceRef, {
        serviceName: newService.serviceName,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  fUpdateHeroSection: async () => {
      const heroSectionRef = doc(database, FIREBASE_BROSCINE, FIREBASE_SERVICES_COLL);
      
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