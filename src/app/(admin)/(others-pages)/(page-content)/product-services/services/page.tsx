"use client"
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../../../../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_SERVICES_COLL, FIREBASE_SERVICES_DOCS } from "@/constants/firebase";
import { useServiceStore } from "@/stores/service.store";
import Service from "@/types/service.type";
import ServiceCard from "@/components/service/ServiceCard";

export default function WorkCategories() {
  const {setServiceStore} = useServiceStore();

  const fetchData = async () => {
    const serviceRef = collection(database, FIREBASE_BROSCINE, FIREBASE_SERVICES_COLL, FIREBASE_SERVICES_DOCS);
    const serviceSnap = await getDocs(serviceRef);

    const serviceData = serviceSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Service[];

    console.log(serviceData);

    setServiceStore('services', serviceData);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Product service - Services
        </h3>
        <div className="space-y-6">
          <ServiceCard />
        </div>
      </div>
    </div>
  );
}