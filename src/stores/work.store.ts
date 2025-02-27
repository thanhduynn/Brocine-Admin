import Project from "@/types/project.type.";
import Tag from "@/types/tag.type";
import { create } from "zustand";

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
}));