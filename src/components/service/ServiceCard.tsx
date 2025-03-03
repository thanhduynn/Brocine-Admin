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
import Service from "@/types/service.type";
import { useServiceStore } from "@/stores/service.store";

export default function ServiceCard() {
  const { services, modifyService, fUpdateService, fAddService } = useServiceStore();
  const { isOpen, openModal, closeModal } = useModal();

  const [isCreate, setIsCreate] = useState(false);
  const [newService, setNewService] = useState("");

  const [wantToDelete, setWantToDelete] = useState(false);
  const [modifyServiceData, setModifyServiceData] = useState<Service>({id: "123", serviceName: "Init"});
  const updateServiceName = (newServiceName: string) => {
    setModifyServiceData((modifyServiceData) => ({
      ...modifyServiceData, // Keep existing properties (id)
      serviceName: newServiceName, // Update only tagName
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
      setNewService("");
      setIsCreate(false);
    }
    closeModal();
    setWantToDelete(false);
  };

  const handleSaveNewType = async () => {
    if (newService === "") {
      alert("Cannot add a null into database!");
      return;
    }

    const newId = await fAddService(newService);

    if (newId !== null) {
      alert("Service created successfully!");
      modifyService("add", {
        id: newId,
        serviceName: newService,
      });
      closeModal();
      setNewService("");
    } else {
      alert("Failed to create service!");
      return;
    }

  };

  const handleUpdate = async () => {
    if(await fUpdateService(modifyServiceData)) {
      alert("Modified service successfully!");
      modifyService("update", modifyServiceData);
      closeModal();
      setWantToDelete(false);
    } else {
      alert("Failed to modify service!");
      setWantToDelete(false);
    }
  };

  const handleDelete = () => {
    modifyService("delete", modifyServiceData);
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
              {services.map((service) => (
                <Tag variant="solid" color="dark" key={service.id} onClick={() => {
                  setModifyServiceData({
                    id: service.id,
                    serviceName: service.serviceName,
                  })
                  handleOpen();
                }}>
                  {service.serviceName}
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
                Service controller
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
                        updateServiceName(e.target.value)
                        if (!wantToDelete) {
                          setWantToDelete(true);
                        }
                      }} 
                      value={modifyServiceData.serviceName}
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
                      onChange={(e) => setNewService(e.target.value)}
                      value={newService}
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