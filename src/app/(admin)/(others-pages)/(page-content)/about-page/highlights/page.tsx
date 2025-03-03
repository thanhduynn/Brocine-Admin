"use client"
import ImageGrid from "@/components/common/ImageGrid";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../../../../../../firebase";
import { FIREBASE_ABOUT, FIREBASE_BROSCINE, FIREBASE_HIGHLIGHTS } from "@/constants/firebase";
import Highlight from "@/types/highlight.type";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import { useAboutStore } from "@/stores/about.store";

export default function AboutPageHighlights() {
  const {highlights, setAboutStore, fAddHighlight, modifyHighlights} = useAboutStore();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();

  const handleOpen = () => {
    openModal();
  };

  const handleClose = () => {
    closeModal();
    setNewImageUrl("");
  };

  const handleSave = async () => {
    if (newImageUrl === "") {
      alert("URL cannot be null!");
      return;
    }

    if (!isValid) {
      alert("Please make sure your image display in the preview section!");
      return;
    }

    let highlightPayload:Highlight = {
      id: "",
      description: "",
      imageUrl: newImageUrl,
    }

    const newHighlightId = await fAddHighlight(highlightPayload);

    if (newHighlightId !== null) {
      highlightPayload.id = newHighlightId;
      modifyHighlights("add", highlightPayload);
      alert("Image uploaded successfully!");
      setNewImageUrl("");
      closeModal();
    } else {
      alert("Failed to upload image!");
    }
  };

  const fetchData = async () => {
    const highlightsRef = collection(database, FIREBASE_BROSCINE, FIREBASE_ABOUT, FIREBASE_HIGHLIGHTS);
    const highlightsSnap = await getDocs(highlightsRef);

    const highlightsData = highlightsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Highlight[];

    setAboutStore('highlights', highlightsData);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          About Page - Highlights
        </h3>
        <div className="space-y-6">
          <ImageGrid images={highlights} collectionName={FIREBASE_ABOUT} modifyHighlight={modifyHighlights}/>
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
      <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
          <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Upload your image URL
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
                      <Label>URL</Label>
                      <Input 
                        name="name" 
                        type="text" 
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        value={newImageUrl}
                        success={isValid}
                        error={!isValid}
                        hint={!isValid ? "This is an invalid URL!" : "Ready to upload!"}
                        placeholder="https://external-url.com"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Preview</Label>
                    <div className="relative">
                      <div className="overflow-hidden">
                        <Image
                          src={newImageUrl === "" ? "/" : newImageUrl}
                          alt="Invalid image url, please try again!"
                          className="w-full border border-gray-200 rounded-xl dark:border-gray-800"
                          width={1054}
                          height={600}
                          onError={() => setIsValid(false)}
                          onLoad={() => setIsValid(true)}
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
                <Button size="sm" onClick={handleSave} disabled={!isValid}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </Modal>
    </div>
  </div>
  );
}