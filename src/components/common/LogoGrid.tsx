import { doc } from "firebase/firestore";
import { database } from "../../../firebase";
import { FIREBASE_BRANDS, FIREBASE_BROSCINE, FIREBASE_HOME } from "@/constants/firebase";
import Brand from "@/types/brand.type";
import SmartLogo from "./SmartLogo";

interface ImageGridProps {
  brands: Brand[];
  collectionName: string; 
}

export default function LogoGrid({brands, collectionName}: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {brands.map((brand) => {
        return (
          <SmartLogo 
            logo={brand}
            key={brand.id} 
            docRef={doc(database, FIREBASE_BROSCINE, FIREBASE_HOME, collectionName, brand.id)}
          />
        );
      })}
      {brands.length === 0 ? <div className="dark:text-white">There is nothing at all!</div> : <></>}
    </div>
  );
}