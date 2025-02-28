import { create } from "zustand";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

interface SignInForm {
  email: string;
  password: string;
}

interface AuthStore {
  signInForm: SignInForm;
  setAuthStore: <T extends keyof AuthStore>(
    key: T,
    value: AuthStore[T],
  ) => void;
  setSignInForm: <K extends keyof AuthStore['signInForm']>(
    key: K,
    value: AuthStore['signInForm'][K],
  ) => void;
  fSignIn: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  signInForm: {
    email: "",
    password: ""
  },
  setAuthStore(key, value) {
    set({
      [key]: value,
    });
  },
  setSignInForm(key, value) {
    set({
      signInForm: {
        ...get().signInForm,
        [key]: value,
      }
    });
  },
  fSignIn: async () => {
    try {
      const email = get().signInForm.email;
      const password = get().signInForm.password;
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err: any) {
      console.error(err);
      return false;
    }
  },
}));