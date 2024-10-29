import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Session {
  accessToken: string;
  role: "user" | "organization";
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
  setRole: (role: "user" | "organization") => void;
  clearRole: () => void;
}

export const useSessionStore = create<Session>()(
  persist(
    (set) => ({
      accessToken: "",
      role: "user",
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clearAccessToken: () => set({ accessToken: "" }),
      setRole: (role: "user" | "organization") => set({ role }),
      clearRole: () => set({ role: "user" }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
