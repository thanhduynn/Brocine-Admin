"use client"
import LogoGrid from "@/components/common/LogoGrid";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../../../../../firebase";
import { FIREBASE_BRANDS, FIREBASE_BROSCINE, FIREBASE_HOME } from "@/constants/firebase";
import { useEffect, useState } from "react";
import { useHomeStore } from "@/stores/home.store";
import Brand from "@/types/brand.type";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Image from "next/image";

export default function HomePageBrands() {
  const { brands, setHomeStore, fAddBrand, modifyBrands } = useHomeStore();
  const { isOpen, closeModal, openModal } = useModal();
  
  const [isCreate, setIsCreate] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [newLogoName, setNewLogoName] = useState("");

  const fetchData = async () => {
    const brandsCollectionRef = collection(database, FIREBASE_BROSCINE, FIREBASE_HOME, FIREBASE_BRANDS);
    const brandsSnap = await getDocs(brandsCollectionRef);

    const brandsData = brandsSnap.docs.map((brand) => ({
      id: brand.id,
      ...brand.data(),
    })) as Brand[];

    setHomeStore("brands", brandsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (newLogoName == "") {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  }, [newLogoName]);

  const handleOpen = () => {
    openModal();
    setIsCreate(true);
  };

  const handleClose = () => {
    closeModal();
    setIsCreate(false);
    setNewLogoUrl("");
    setNewLogoName("");
  }

  const handleSave = async () => {
    let brandPayload:Brand = {
      id: "",
      name: newLogoName,
      logoUrl: newLogoUrl,
    }
    try {
      const brandRefId = await fAddBrand(brandPayload);
      if (brandRefId !== null) {
        brandPayload.id = brandRefId;
        modifyBrands("add", brandPayload);
        alert("Brand created successfully!");
        handleClose();
      } else {
        alert("Failed to create new brand!");
      }
    } catch (error) {
      alert("Failed to create new brand!");
    }
  };
  
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Home Page - Brands
        </h3>
        <div className="flex flex-col space-y-6">
          <LogoGrid brands={brands} collectionName={FIREBASE_BRANDS}/>
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
      <Modal isOpen={isOpen && isCreate} onClose={handleClose} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create a new brand
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Make sure your image load successfully on the preview panel!
            </p>
          </div>
          <div className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="flex flex-col space-y-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <Input 
                      name="name" 
                      type="text" 
                      onChange={(e) => setNewLogoName(e.target.value)}
                      value={newLogoName}
                      success={isValidName}
                      error={!isValidName}
                      hint={!isValidName ? "This is an invalid name!" : "Ready to upload!"}
                      placeholder="https://external-url.com"
                    />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input 
                      name="url" 
                      type="text" 
                      onChange={(e) => setNewLogoUrl(e.target.value)}
                      value={newLogoUrl}
                      success={isValidUrl}
                      error={!isValidUrl}
                      hint={!isValidUrl ? "This is an invalid URL!" : "Ready to upload!"}
                      placeholder="https://external-url.com"
                    />
                  </div>
                </div>
                <div>
                  <Label>Preview</Label>
                  <div className="relative">
                    <div className="overflow-hidden">
                      <Image
                        src={newLogoUrl === "" ? "/" : newLogoUrl}
                        alt="Invalid image url, please try again!"
                        className="w-full border border-gray-200 rounded-xl dark:border-white bg-gray-300 dark:bg-black"
                        width={1054}
                        height={600}
                        onError={() => setIsValidUrl(false)}
                        onLoad={() => setIsValidUrl(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={handleClose}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave} disabled={!isValidUrl || !isValidName}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}