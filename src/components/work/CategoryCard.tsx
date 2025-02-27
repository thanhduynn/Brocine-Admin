"use client"
import { useModal } from "@/hooks/useModal";
import { useWorkStore } from "@/stores/work.store";
import Tag from "../common/Tag";
import { Modal } from "../ui/modal";
import { PlusIcon } from "@/icons";
import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import TagType from "@/types/tag.type";

export default function CategoryCard() {
  const { tagData, modifyTag } = useWorkStore();
  const { isOpen, openModal, closeModal } = useModal();

  const [isCreate, setIsCreate] = useState(false);
  const [newType, setNewType] = useState("");

  const [wantToDelete, setWantToDelete] = useState(false);
  const [modifyType, setModifyType] = useState<TagType>({id: "123", tagName: "Init"});
  const updateTagName = (newTagName: string) => {
    setModifyType((modifyType) => ({
      ...modifyType, // Keep existing properties (id)
      tagName: newTagName, // Update only tagName
    }));
  };

  const handleOpen = () => {
    openModal();
  };

  const handleAdd = () => {
    setIsCreate(true);
    openModal();
  };

  const handleClose = () => {
    if (isCreate) {
      setNewType("");
      setIsCreate(false);
    }
    closeModal();
    setWantToDelete(false);
  };

  const handleSaveNewType = () => {
    if (newType === "") {
      alert("Cannot add a null into database!");
      return;
    }
    modifyTag("add", {
      id: "12",
      tagName: newType,
    });
    closeModal();
    setNewType("");
  };

  const handleUpdate = () => {
    modifyTag("update", modifyType);
    closeModal();
    setWantToDelete(false);
  };

  const handleDelete = () => {
    modifyTag("delete", modifyType);
    closeModal();
    setWantToDelete(false);
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Categories
            </h4>
            <div className="flex gap-2">
              {tagData.map((tag) => (
                <Tag variant="solid" color="dark" key={tag.id} onClick={() => {
                  setModifyType({
                    id: tag.id,
                    tagName: tag.tagName,
                  })
                  handleOpen();
                }}>
                  {tag.tagName}
                </Tag>
              ))}
              <Tag 
                variant="solid" 
                color="warning" 
                key="add-on" 
                onClick={handleAdd}
                startIcon=<PlusIcon />
              >
                Add a new type?
              </Tag>
            </div>  
        </div>
        
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
          <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Type controller
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Change the text to edit, or proceed with deletion.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="px-2 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <Input 
                      name="name" 
                      type="text" 
                      onChange={(e) => {
                        updateTagName(e.target.value)
                        if (!wantToDelete) {
                          setWantToDelete(true);
                        }
                      }} 
                      value={modifyType.tagName}
                    />
                  </div>
                </div>
                
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={handleClose}>
                  Close
                </Button>
                {wantToDelete ? 
                  <Button size="sm" onClick={handleUpdate}>
                    Save Changes
                  </Button>
                : 
                  <Button size="sm" variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                }
              </div>
            </div>
          </div>
        </Modal>

        <Modal isOpen={isOpen && isCreate} onClose={handleClose} className="max-w-[700px] m-4">
          <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Create type
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Enhance your profile by adding details.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="px-2 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <Input 
                      name="name" 
                      type="text" 
                      onChange={(e) => setNewType(e.target.value)}
                      value={newType}
                    />
                  </div>
                </div>
                
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button size="sm" onClick={handleSaveNewType}>
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