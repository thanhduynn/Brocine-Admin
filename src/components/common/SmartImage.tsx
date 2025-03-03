"use client";

import { useEffect, useState } from "react";
import { deleteDoc, DocumentReference, DocumentData } from "firebase/firestore";
import { Eye, Trash } from "lucide-react"; // Icons for buttons
import { useHomeStore } from "@/stores/home.store";
import Highlight from "@/types/highlight.type";
import Image from "next/image";

interface SmartImageProps {
  image: Highlight;
  docRef: DocumentReference<DocumentData, DocumentData>;
}

export default function SmartImage({ image, docRef }: SmartImageProps) {
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);
  const { modifyHighlights } = useHomeStore();

  const removeSelf = async () => {
    try {
      if (!confirm("Are you sure to delete this image?")) {
        return;
      } else {
        await deleteDoc(docRef);
        modifyHighlights("delete", image);
        alert("Deleted image successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete image!");
    }
  };

  return (
    <div
      className="relative group overflow-hidden rounded-lg border border-gray-300 flex justify-center h-60"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={error ? "/images/grid-image/image-01.png" : image.imageUrl}
        alt="Preview"
        className="object-cover w-full"
        onError={() => setError(true)}
        loading="lazy"
        width={302}
        height={192}
      />

      {/* Buttons (hidden until hover) */}
      {hover && (
        <div className="absolute inset-0 bg-black/50 dark:bg-white/50 flex items-center justify-center space-x-2">
          {/* View button */}
          <button
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
            onClick={() => window.open(image.imageUrl, "_blank")}
          >
            <Eye size={16} />
          </button>

          {/* Delete button */}
          <button
            className="bg-red-500 p-2 rounded-full shadow-lg text-white hover:bg-red-600 transition"
            onClick={removeSelf}
          >
            <Trash size={16} />
          </button>
        </div>
      )}
    </div>
  );
}