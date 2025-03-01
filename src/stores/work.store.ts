import Project from "@/types/project.type.";
import Tag from "@/types/tag.type";
import { create } from "zustand";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase";
import { FIREBASE_BROSCINE, FIREBASE_CATEGORIES, FIREBASE_PROJECTS, FIREBASE_WORK } from "@/constants/firebase";

interface WorkStore {
  projectData: Project[];
  tagData: Tag[];
  setWorkStore: <T extends keyof WorkStore>(
    key: T, value: WorkStore[T]
  ) => void;
  setProjectData: <K extends keyof WorkStore['projectData']>(
    key: K,
    value: WorkStore['projectData'][K],
  ) => void;
  modifyTag: (
    action: "add" | "update" | "delete", 
    tag: Partial<Tag> & { id: string }
  ) => void;
  modifyProjectData: (
    action: "add" | "update" | "delete",
    project: Project,
  ) => void;
  fUpdateTagData: (newTag: Tag) => Promise<boolean>;
  fAddTagData: (newTagName: string) => Promise<string | null>;
  fAddProjectData: (newProject: Project) => Promise<string | null>;
  fUpdateProjectData: (newProject: Project) => Promise<boolean>;
  fDeleteProjectData: (projectId: string) => Promise<boolean>;
};

export const useWorkStore = create<WorkStore>()((set, get) => ({
  projectData: [],
  tagData: [],
  setWorkStore(key, value) {
    set({
      [key]: value,
    });
  },
  setProjectData(key, value) {
    set({
      projectData: {
        ...get().projectData,
        [key]: value,
      },
    });
  },
  modifyTag: (action, tag) => {
    set((state) => {
      if (action === "add") {
        if (state.tagData.some((t) => t.id === tag.id)) {
          console.warn(`Tag with ID ${tag.id} already exists!`);
          return state; // Return unchanged state
        }
        return { tagData: [...state.tagData, { id: tag.id, tagName: tag.tagName || "New Tag" }] };
      }

      if (action === "update") {
        return { tagData: state.tagData.map((t) => (t.id === tag.id ? { ...t, ...tag } : t)) };
      }

      if (action === "delete") {
        return { tagData: state.tagData.filter((t) => t.id !== tag.id) };
      }

      return state; // Return unchanged state for unknown actions
    });
  },
  modifyProjectData: (action, project) => {
    set((state) => {
      if (action === "add") {
        if (state.projectData.some((t) => t.id === project.id)) {
          console.warn(`Project with ID ${project.id} already exists!`);
          return state;
        }
        return { projectData: [...state.projectData, project] };
      }

      if (action === "update") {
        set({
          projectData: get().projectData.map((oldProject) =>
            oldProject.id === project.id ? project : oldProject
          ),
        });
      }

      if (action === "delete") {
        return { projectData: state.projectData.filter((t) => t.id != project.id) }
      }

      return state;
    });
  },
  fUpdateTagData: async (newTag) => {
    const tagRef = doc(database, FIREBASE_BROSCINE, FIREBASE_WORK, FIREBASE_CATEGORIES, newTag.id);

    try {
      await updateDoc(tagRef, {
        tagName: newTag.tagName,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  fAddTagData: async (newTagName) => {
    const categoryCollectionRef = collection(database, FIREBASE_BROSCINE, FIREBASE_WORK, FIREBASE_CATEGORIES);

    try {
      const tagRef = await addDoc(categoryCollectionRef, {
        tagName: newTagName,
      });
      return tagRef.id;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  fAddProjectData: async (newProject) => {
    const projectsCollectionRef = collection(database, FIREBASE_BROSCINE, FIREBASE_WORK, FIREBASE_PROJECTS);

    try {
      const {id, ...projectData} = newProject;
      const projectRef = await addDoc(projectsCollectionRef, projectData);

      return projectRef.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  fUpdateProjectData: async (newProject) => {
    const { id, ...projectData } = newProject;
    const projectRef = doc(database, FIREBASE_BROSCINE, FIREBASE_WORK, FIREBASE_PROJECTS, id);

    try {
      await updateDoc(projectRef, projectData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  fDeleteProjectData: async (projectId) => {
    try {
      const projectRef = doc(database, FIREBASE_BROSCINE, FIREBASE_WORK, FIREBASE_PROJECTS, projectId);
      await deleteDoc(projectRef);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}));