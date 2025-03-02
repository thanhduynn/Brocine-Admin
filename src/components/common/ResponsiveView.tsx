"use client"

import { DEFAULT_HERO_IMAGE } from "@/constants/images";
import HeroSection from "@/types/hero.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ResponsiveView({
  title,
  subtitle,
  imageUrl,
}: HeroSection) {
  const [image, setImage] = useState(imageUrl || DEFAULT_HERO_IMAGE);

  useEffect(() => {
    setImage(imageUrl || DEFAULT_HERO_IMAGE);
  }, [imageUrl]);
  
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Preview
      </h4>
      <div className="relative">
        <img
          src={image}
          alt="Cover"
          className="w-full border border-gray-200 rounded-xl dark:border-gray-800"
          width={1054}
          height={600}
          onError={() => setImage(DEFAULT_HERO_IMAGE)}
        />
        {/* Overlay Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">{title}</h1>
          <h3 className="text-xl text-white drop-shadow-lg w-4/5">{subtitle}</h3>
        </div>
      </div>
    </div>
  );
}