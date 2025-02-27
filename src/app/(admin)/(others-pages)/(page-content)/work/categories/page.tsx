"use client"
import CategoryCard from "@/components/work/CategoryCard";
import { GLOBAL_WORK_TYPES } from "@/constants/types";
import { useWorkStore } from "@/stores/work.store";
import Tag from "@/types/tag.type";
import { useEffect } from "react";

export default function WorkCategories() {
  const {setWorkStore} = useWorkStore();

  const placeholder: Tag[] = [
    {
      id: "1",
      tagName: GLOBAL_WORK_TYPES.brandingFilm,
    },
    {
      id: "2",
      tagName: GLOBAL_WORK_TYPES.mv,
    },
    {
      id: "3",
      tagName: GLOBAL_WORK_TYPES.docs,
    },
    {
      id: "4",
      tagName: GLOBAL_WORK_TYPES.talkshow,
    },
    {
      id: "5",
      tagName: GLOBAL_WORK_TYPES.tvc,
    },
    {
      id: "6",
      tagName: GLOBAL_WORK_TYPES.event,
    },
  ]

  useEffect(() => {
    setWorkStore('tagData', placeholder)
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