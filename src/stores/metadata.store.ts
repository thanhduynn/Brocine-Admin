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
    addressLine: "241A/1 Huynh Van Banh, Phuong 12, Quan Phu Nhuan",
    city: "Ho Chi Minh",
    country: "Vietnam",
    postalCode: "700000"
  },
  companyInformation: {
    email: "company@example.com",
    name: "VieMind",
    phone: "0123456789",
    taxId: "VN0025412",
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