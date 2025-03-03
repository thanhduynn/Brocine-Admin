import { create } from "zustand";
import Message from "@/types/message.type";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../firebase";

interface ContactStore {
  messages: Message[];
  setContactStore: <T extends keyof ContactStore>(
    key: T,
    value: ContactStore[T],
  ) => void;
  fGetMessages: () => Promise<boolean>;
};

export const useContactStore = create<ContactStore>((set, get) => ({
  messages: [],
  setContactStore(key, value) {
    set({
      [key]: value
    });
  },
  fGetMessages: async () => {
    const contactsCollectionRef = collection(database, "contacts");
    
    try {
      const contactsSnapshot = await getDocs(contactsCollectionRef);

      const contactsData = contactsSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as Message;
      });

      set({ messages: contactsData });
      return true;
    } catch (error) {
      console.error("Error getting messages: ", error);
      return false;
    }
  },
}));