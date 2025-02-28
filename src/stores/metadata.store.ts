import Address from "@/types/address.type";
import Company from "@/types/company.type";
import SocialLink from "@/types/social.type";
import { create } from 'zustand';

interface MetadataStore {
  companyAddress: Address;
  companyInformation: Company;
  companyLink: SocialLink[];
  setMetadataStore: <T extends keyof MetadataStore>(
    key: T,
    value: MetadataStore[T]
  ) => void;
  setCompanyAddress: <K extends keyof MetadataStore['companyAddress']>(
    key: K,
    value: MetadataStore['companyAddress'][K]
  ) => void;
  setCompanyInformation: <K extends keyof MetadataStore['companyInformation']>(
    key: K,
    value: MetadataStore['companyInformation'][K]
  ) => void;
  setSocialLink: (platform: SocialLink['platform'], newUrl: string) => void;
}

export const useMetadataStore = create<MetadataStore>()((set, get) => ({
  companyAddress: {
    id: "null",
    addressLine: "null",
    city: "null",
    country: "null",
    postalCode: "null"
  },
  companyInformation: {
    email: "null",
    name: "null",
    phone: "null",
    taxId: "null",
    logoUrl: "/images/user/owner.jpg"
  },
  companyLink: [],
  setMetadataStore(key, value) {
    set({
      [key]: value
    });
  },
  setCompanyAddress(key, value) {
    set({
      companyAddress: {
        ...get().companyAddress,
        [key]: value
      }
    });
  },
  setCompanyInformation(key, value) {
    set({
      companyInformation: {
        ...get().companyInformation,
        [key]: value
      }
    });
  },
  setSocialLink(platform, newUrl) {
    set((state) => ({
      companyLink: state.companyLink.map((link) =>
        link.platform === platform ? { ...link, url: newUrl } : link
      ),
    }))
  },
}));