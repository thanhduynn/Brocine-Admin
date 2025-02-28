import React from "react";
import SmartImage from "./SmartImage";

interface ImageGridProps {
  imageUrls: string[];
}

export default function ImageGrid({imageUrls}: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {imageUrls.map((url, index) => {
        return <SmartImage imageUrl={url} key={index}/>
      })}
    </div>
  );
}