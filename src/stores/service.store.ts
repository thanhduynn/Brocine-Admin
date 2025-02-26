import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { create } from "zustand";

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
}));