import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Session {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
}

export const useSessionStore = create<Session>()(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clearAccessToken: () => set({ accessToken: "" }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
