import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseConfigStore {
  config: any;
  setConfigStore: (by: any) => void;
  clearConfigStore: () => void;
}

export const useConfigStore = create<IUseConfigStore>()(
  persist(
    (set, get) => ({
      config: {},
      setConfigStore: (by) => {
        const currentConfig = get().config;
        return set(() => ({ config: { ...currentConfig, ...by } }));
      },
      clearConfigStore: () => {
        set(() => ({ config: {} }));
        AsyncStorage.removeItem("config-data-storage");
      },
    }),
    {
      name: "config-data-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useConfigStore;
