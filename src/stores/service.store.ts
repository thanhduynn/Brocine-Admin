import HeroSection from "@/types/hero.type";

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