"use client"
import ImageGrid from "@/components/common/ImageGrid";
import SmartImage from "@/components/common/SmartImage";
import ThreeColumnImageGrid from "@/components/ui/images/ThreeColumnImageGrid";
import { useHomeStore } from "@/stores/home.store";
import { useEffect } from "react";

export default function HomePageHighlights() {
  const {highlights, setHomeStore} = useHomeStore();

  const handleOpen = () => {

  };

  const placeholder = [
    '/images/grid-image/image-04.png',
    '/images/grid-image/image-01.png',
    '/images/grid-image/image-05.png',
    '/images/grid-image/image-03.png',
    '/images/grid-image/image-02.png',
  ];

  const fetchData = async () => {
    // todo!
  };

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Home Page - Highlights
        </h3>
        <div className="space-y-6">
          <ImageGrid imageUrls={placeholder}/>
          <div className="flex justify-end">
            <button
              onClick={handleOpen}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 4.5a.75.75 0 0 1 .75.75V11.25H19.5a.75.75 0 0 1 0 1.5H12.75V19.5a.75.75 0 0 1-1.5 0V12.75H4.5a.75.75 0 0 1 0-1.5H11.25V5.25A.75.75 0 0 1 12 4.5z"
                  clipRule="evenodd"
                />
              </svg>
              Add an image
            </button>
          </div>
      </div>
    </div>
  </div>
  );
}