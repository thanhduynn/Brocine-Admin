import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { create } from "zustand";

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
}));