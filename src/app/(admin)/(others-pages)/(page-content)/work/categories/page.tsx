"use client"
import CategoryCard from "@/components/work/CategoryCard";
import { useWorkStore } from "@/stores/work.store";
import Tag from "@/types/tag.type";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../../../../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_CATEGORIES, FIREBASE_WORK } from "@/constants/firebase";

export default function WorkCategories() {
  const {setWorkStore} = useWorkStore();

  const fetchData = async () => {
    const tagRef = collection(database, FIREBASE_BROSCINE, FIREBASE_WORK, FIREBASE_CATEGORIES);
    const tagSnap = await getDocs(tagRef);

    const tagData = tagSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tag[];

    console.log(tagData);
    setWorkStore('tagData', tagData);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Work - Categories
        </h3>
        <div className="space-y-6">
          <CategoryCard />
        </div>
      </div>
    </div>
  );
}