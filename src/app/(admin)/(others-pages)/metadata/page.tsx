"use client"

import CompanyAddressCard from "@/components/metadata/CompanyAddressCard";
import CompanyInformationCard from "@/components/metadata/CompanyInformationCard";
import SocialMediaCard from "@/components/metadata/SocialMediaCard";
import SocialLink from "@/types/social.type";
import { useEffect } from "react";
import { useMetadataStore } from "@/stores/metadata.store";
import { database } from "../../../../../firebase";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import Company from "@/types/company.type";
import Address from "@/types/address.type";

export default function Metadata() {
  const { setMetadataStore } = useMetadataStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const docRef = doc(database, "brocines", "metadata");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const companyData = docSnap.data()['companyInformation'] as Company;
      setMetadataStore('companyInformation', companyData);

      const socialLinkRef = collection(database, "brocines", "metadata", "socialLink");
      const addressRef = collection(database, "brocines", "metadata", "address");

      const socialLinkSnap = await getDocs(socialLinkRef);
      const addressSnap = await getDocs(addressRef);

      const addressData = addressSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const address01 = addressData[0] as Address;

      const socialLinkData = socialLinkSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SocialLink[];

      setMetadataStore('companyLink', socialLinkData);
      setMetadataStore('companyAddress', address01);
    }
    else {
      console.log("NOTHING")
    }
  };

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