"use client"

import CompanyAddressCard from "@/components/metadata/CompanyAddressCard";
import CompanyInformationCard from "@/components/metadata/CompanyInformationCard";
import SocialMediaCard from "@/components/metadata/SocialMediaCard";
import SocialLink from "@/types/social.type";
import { useEffect } from "react";
import { useMetadataStore } from "@/stores/metadata.store";

export default function Metadata() {
  const { setMetadataStore } = useMetadataStore();

  const placeholderAddress = {
    "country": "Vietnam",
    "city": "Ho Chi Minh",
    "addressLine": "241A/1 Huynh Van Banh, Phuong 12, Quan Phu Nhuan",
    "postalCode": "720523",
  };

  const placeholderLinks: SocialLink[] = [
    {
      platform: "facebook",
      url: "https://www.facebook.com/profile.php?id=61573103499980"
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/viemind-ai-consulting"
    },
    {
      platform: "website",
      url: "https://viemind.ai/"
    },
  ];

  const placeholderInformation = {
    name: "VieMind Tech Consultant",
    email: "viemind@contact.vn",
    phone: "0147852369",
    taxId: "2520212423",
    logoUrl: "/images/user/owner.jpg"
  }

  useEffect(() => {
    setMetadataStore('companyAddress', placeholderAddress);
    setMetadataStore('companyInformation', placeholderInformation);
    setMetadataStore('companyLink', placeholderLinks);
  }, []);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Metadata
        </h3>
        <div className="space-y-6">
          <SocialMediaCard />
          <CompanyInformationCard />
          <CompanyAddressCard />
        </div>
      </div>
    </div>
  );
}