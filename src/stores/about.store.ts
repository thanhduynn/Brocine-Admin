import HeroSection from "@/types/hero.type";

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