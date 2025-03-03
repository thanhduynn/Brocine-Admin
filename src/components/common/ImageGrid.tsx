import SmartImage from "./SmartImage";
import Highlight from "@/types/highlight.type";
import { doc } from "firebase/firestore";
import { database } from "../../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_HIGHLIGHTS } from "@/constants/firebase";

interface ImageGridProps {
  images: Highlight[];
  collectionName: string;
  modifyHighlight: (action: "add" | "delete", image: Highlight) => void;
}

export default function ImageGrid({images, collectionName, modifyHighlight}: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => {
        return (
          <SmartImage 
            image={image}
            key={image.id} 
            docRef={doc(database, FIREBASE_BROSCINE, collectionName, FIREBASE_HIGHLIGHTS, image.id)}
            modifyHighlights={modifyHighlight}
          />
        );
      })}
      {images.length === 0 ? <div className="dark:text-white">There is nothing at all!</div> : <></>}
    </div>
  );
}