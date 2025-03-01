"use client";

import { useEffect, useState } from "react";
import { deleteDoc, DocumentReference, DocumentData } from "firebase/firestore";
import { Eye, Trash } from "lucide-react"; // Icons for buttons
import { useHomeStore } from "@/stores/home.store";
import Highlight from "@/types/highlight.type";

interface SmartImageProps {
  image: Highlight;
  docRef: DocumentReference<DocumentData, DocumentData>;
}

export default function SmartImage({ image, docRef }: SmartImageProps) {
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);

  const removeSelf = async () => {
    try {
      // await deleteDoc(docRef);
      alert("Deleted image successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete image!");
    }
  };

  return (
    <div
      className="relative group overflow-hidden rounded-lg border border-gray-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image with onError fallback */}
      <img
        src={error ? "/images/grid-image/image-04.png" : imageUrl}
        alt="Preview"
        className="w-full h-full object-cover"
        onError={() => setError(true)}
        width={338}
        height={192}
      />

      {/* Buttons (hidden until hover) */}
      {hover && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2">
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