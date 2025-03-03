"use client"
import UsefulTable from "@/components/common/UsefulTable";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useWorkStore } from "@/stores/work.store";
import Project from "@/types/project.type.";
import { useCallback, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import Select from "@/components/form/Select";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../../../../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_CATEGORIES, FIREBASE_PROJECTS, FIREBASE_WORK } from "@/constants/firebase";
import Tag from "@/types/tag.type";
import { useContactStore } from "@/stores/contact.store";
import ContactTable from "@/components/common/ContactTable";
import Message from "@/types/message.type";
import TextArea from "@/components/form/input/TextArea";

export default function Contact() {
  const { fGetMessages } = useContactStore();  
  const { isOpen, openModal, closeModal } = useModal();

  const [currentMessage, setCurrentMessage] = useState<Message>({
    id: "null",
    name: "",
    email: "",
    message: "",
  });

  const fetchData = async () => {
    await fGetMessages();
  };

  const handleOpen = () => {
    openModal();
  };

  const handleClose = () => {
    closeModal();
    setCurrentMessage({
      id: "null",
      name: "",
      email: "",
      message: "",
    });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentMessage.id !== "null") {
      handleOpen();
    }
  }, [currentMessage]);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Contacts
        </h3>
        <div className="space-y-6">
          <ContactTable onSelect={setCurrentMessage}/>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              You got a message!
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Best service is when you can help your customers!
            </p>
          </div>
          <div className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Name</Label>
                  <Input name="title" type="text" value={currentMessage.name} disabled={true} className="hover:cursor-text"/>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input name="subtitle" type="text" value={currentMessage.email} disabled={true} className="hover:cursor-text"/>
                </div>
              </div>
              <div>
                  <Label>Message</Label>
                  <TextArea value={currentMessage.message} disabled={true} className="h-36 min-h-36 hover:cursor-text disabled:bg-white"/>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}