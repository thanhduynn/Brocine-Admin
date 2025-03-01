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
import { database } from "../../../../../../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_CATEGORIES, FIREBASE_PROJECTS, FIREBASE_WORK } from "@/constants/firebase";
import Tag from "@/types/tag.type";

const projectData: Project[] = [
  {
    "id": "101",
    "title": "Project Alpha",
    "subtitle": "A journey through innovation",
    "type": "Branding Film",
    "videoUrl": "https://example.com/alpha.mp4",
    "brand": "Tech Corp",
    "productionCompany": "Vision Films",
    "execusiveProducer": "Bob Smith",
    "director": ["Alice Johnson", "Charlie Davis",]
  },
  {
    "id": "102",
    "title": "Project Beta",
    "subtitle": "Exploring the unknown",
    "type": "Event Video",
    "videoUrl": "https://example.com/beta.mp4",
    "brand": "Future Industries",
    "productionCompany": "Nova Studios",
    "execusiveProducer": "Bob Smith",
    "director": ["Alice Johnson", "Charlie Davis",]
  },
  {
    "id": "103",
    "title": "Project Gamma",
    "subtitle": "Breaking boundaries",
    "type": "TVC",
    "videoUrl": "https://example.com/gamma.mp4",
    "brand": "NextGen",
    "productionCompany": "Skyline Pictures",
    "execusiveProducer": "Bob Smith",
    "director": ["Alice Johnson", "Charlie Davis",]
  },
  {
    "id": "104",
    "title": "Project Delta",
    "subtitle": "A vision for tomorrow",
    "type": "TVC",
    "videoUrl": "https://example.com/delta.mp4",
    "brand": "InnovateX",
    "productionCompany": "Cinematic Arts",
    "execusiveProducer": "Bob Smith",
    "director": ["Alice Johnson", "Charlie Davis",]
  },
  {
    "id": "105",
    "title": "REALME C75 EVERYTHING PROOF",
    "subtitle": "Built to endure with IP69 dust and water resistance. Stay powered with 6000mAh massive battery. Smart at your fingertip with advanced AI features.",
    "type": "TVC",
    "videoUrl": "https://example.com/epsilon.mp4",
    "brand": "StoryWorks",
    "productionCompany": "Luminary Studios",
    "execusiveProducer": "Bob Smith",
    "director": ["Alice Johnson", "Charlie Davis",]
  }
];

const defaultProject: Project = {
  "id": "null",
  "title": "",
  "subtitle": "",
  "type": "",
  "videoUrl": "",
  "brand": "",
  "productionCompany": "",
  "execusiveProducer": "",
  "director": [],
};

export default function WorkWorkDetail() {
  const { tagData, setWorkStore, fAddProjectData, fUpdateProjectData, fDeleteProjectData, modifyProjectData } = useWorkStore();
  const { isOpen, openModal, closeModal } = useModal();

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [type, setType] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [productionCompany, setProductionCompany] = useState("");
  const [execusiveProducer, setExecusiveProducer] = useState("");
  const [director, setDirector] = useState("");
  const [wantToDelete, setWantToDelete] = useState(true);

  let [project, setProject] = useState<Project>(defaultProject);

  const fetchData = async () => {
    const tagRef = collection(database, FIREBASE_BROSCINE, FIREBASE_WORK, FIREBASE_CATEGORIES);
    const projectRef = collection(database, FIREBASE_BROSCINE, FIREBASE_WORK, FIREBASE_PROJECTS);
    const tagSnap = await getDocs(tagRef);
    const projectSnap = await getDocs(projectRef);

    const tagData = tagSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tag[];

    const projectData = projectSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];

    console.log(tagData);
    setWorkStore('tagData', tagData);
    setWorkStore('projectData', projectData);
  };

  const handleOpen = () => {
    setWantToDelete(false);
    openModal();
  };

  const clearState = () => {
    setTitle("");
    setSubTitle("");
    setType("");
    setVideoUrl("");
    setBrand("");
    setProductionCompany("");
    setExecusiveProducer("");
    setDirector("");
  };

  const handleChangeInput = useCallback(
    (e: { target: { name: any; value: any } }) => {
      const { name, value } = e.target;
      if (project !== null) {
        const updatedProject = {
          ...project,
          [name as keyof Project]: value,
        };

        console.log(name, value);

        setProject(updatedProject);

        if (project.id != "null") {
          setWantToDelete(false);
        }
      }
    },
    [project],
  );

  const splitDirector = () => {
    return director.split(",").map((name) => name.trim());
  }

  const handleClose = () => {
    closeModal();
    setProject(defaultProject);
    setWantToDelete(true);
    clearState();
  };

  const handleCreate = async () => {
    let { id, ...projectData} = project;
    
    const projectPayload = {
      ...projectData,
      ["director"]: splitDirector(),
      ["type"]: type,
    };
    
    const newProjectId = await fAddProjectData({id, ...projectPayload});

    if (newProjectId !== null) {
      id = newProjectId;
      modifyProjectData("add", { id, ...projectPayload});
      alert("Project created successfully!");
      handleClose();
    } else {
      alert("Failed to create project!");
      return;
    }
  };

  const handleUpdate = async () => {
    const projectPayload:Project = {
      ...project,
      director: splitDirector(),
      type: type,
    };
    
    if (await fUpdateProjectData(projectPayload)) {
      modifyProjectData("update", projectPayload);
      alert("Updated project successfully!");
      handleClose();
    } else {
      alert("Failed to update project!");
      return;
    }
  };

  const handleDelete = async () => {
    if (project.id != "null" && await fDeleteProjectData(project.id)) {
      alert("Deleted project successfully!");
      modifyProjectData("delete", project);
      handleClose();
    } else {
      alert("Failed to delete project!");
      return;
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (project !== null && project.id != "null") {
      setType(project.type);
      setDirector(project.director.join(", "));
      openModal();
    }
  }, [project?.id]);

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Work - Work detail
        </h3>
        <div className="space-y-6">
          <UsefulTable onSelect={setProject}/>
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
              Add a new project
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {project.id != "null" ? "Project controller" : "Create a new project"}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {project.id != "null" ? "Change the text to edit, or proceed with deletion." : "Let the world about your work!"}
            </p>
          </div>
          <div className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Title</Label>
                  <Input name="title" type="text" onChange={handleChangeInput} value={project?.title}/>
                </div>

                <div>
                  <Label>Subtitle</Label>
                  <Input name="subtitle" type="text" onChange={handleChangeInput} value={project?.subtitle}/>
                </div>

                <div>
                  <Label>Type</Label>
                  <Select
                    options={tagData.map((tag) => ({
                      value: tag.tagName,
                      label: tag.tagName,
                    }))}
                    placeholder="Select an option"
                    onChange={(value) => {
                      setType(value);
                      if (project.id != "null") {
                        setWantToDelete(false);
                      }
                    }}
                    className="dark:bg-dark-900"
                    defaultValue={type != "" ? type : ""}
                  />
                </div>
                <div>
                  <Label>Video URL</Label>
                  <Input name="videoUrl" type="text" onChange={handleChangeInput} value={project?.videoUrl}/>
                </div>
                <div>
                  <Label>Brand</Label>
                  <Input name="brand" type="text" onChange={handleChangeInput} value={project?.brand}/>
                </div>
                <div>
                  <Label>Prod. Company</Label>
                  <Input name="productionCompany" type="text" onChange={handleChangeInput} value={project?.productionCompany}/>
                </div>
                <div>
                  <Label>Exec. Producer</Label>
                  <Input name="execusiveProducer" type="text" onChange={handleChangeInput} value={project?.execusiveProducer}/>
                </div>
                <div>
                  <Label>Director</Label>
                  <Input name="director" type="text" onChange={(e) => {
                      setDirector(e.target.value);
                      if (project.id != "null") {
                        setWantToDelete(false);
                      }
                    }} 
                    value={director}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={handleClose}>
                Close
              </Button>
              {!wantToDelete ? 
                <Button size="sm" onClick={project.id == "null" ? handleCreate : handleUpdate}>
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
    </div>
  );
}