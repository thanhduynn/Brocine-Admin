import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import { create } from "zustand";

interface HomeStore {
  content: HeroSection;
  setHomeStore: <T extends keyof HomeStore>(
    key: T,
    value: HomeStore[T],
  ) => void;
  setContent: <K extends keyof HomeStore['content']>(
    key: K,
    value: HomeStore['content'][K],
  ) => void;
}

export const useHomeStore = create<HomeStore>()((set, get) => ({
  content: {
    title: "Title",
    subtitle: "Subtitle",
    imageUrl: DEFAULT_HERO_IMAGE
  },
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
}));