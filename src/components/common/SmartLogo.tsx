"use client";

import { useEffect, useState } from "react";
import { deleteDoc, DocumentReference, DocumentData } from "firebase/firestore";
import { Edit, Trash } from "lucide-react"; // Icons for buttons
import { useHomeStore } from "@/stores/home.store";
import Brand from "@/types/brand.type";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Image from "next/image";

interface SmartLogoProps {
  logo: Brand;
  docRef: DocumentReference<DocumentData, DocumentData>;
}

export default function SmartLogo({ logo, docRef }: SmartLogoProps) {
  const [error, setError] = useState(false);
  const [hover, setHover] = useState(false);

  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [newLogoUrl, setNewLogoUrl] = useState(logo.logoUrl);
  const [newLogoName, setNewLogoName] = useState(logo.name);
  
  const { isOpen, openModal, closeModal } = useModal();
  const [ isUpdate, setIsUpdate ] = useState(false);
  
  const { modifyBrands, fUpdateBrand } = useHomeStore();

  const removeSelf = async () => {
    try {
      if (!confirm("Are you sure to delete this logo?")) {
        return;
      } else {
        await deleteDoc(docRef);
        modifyBrands("delete", logo);
        alert("Deleted logo successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete logo!");
    }
  };

  const handleOpen = () => {
    openModal();
    setIsUpdate(true);
  };

  const handleClose = () => {
    closeModal();
    setIsUpdate(false);
  };

  const handleSave = async () => {
    const brandPayload:Brand = {
      id: logo.id,
      name: newLogoName,
      logoUrl: newLogoUrl,
    };
    
    try {
      if (await fUpdateBrand(brandPayload)) {
        alert("Brand updated successfully!");
        modifyBrands("update", brandPayload);
        handleClose();
      } else {
        alert("Failed to update brand!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update brand!");
    }
  };

  useEffect(() => {
    if (newLogoName == "") {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  }, [newLogoName]);

  return (
    <div
      className="relative group overflow-hidden rounded-lg border border-gray-300 flex justify-center h-60"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={logo.logoUrl}
        alt="Preview"
        className="object-cover w-full bg-gray-300 dark:bg-black"
        onError={() => setError(true)}
        loading="lazy"
        width={302}
        height={190}
      />

      {/* Buttons (hidden until hover) */}
      {hover && (
        <div className="absolute inset-0 bg-white/50 dark:bg-white/50 flex items-center justify-center space-x-2">
          {/* View button */}
          <button
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
            onClick={handleOpen}
          >
            <Edit size={16} />
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

        <Modal isOpen={isOpen && isUpdate} onClose={handleClose} className="max-w-[700px] m-4">
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