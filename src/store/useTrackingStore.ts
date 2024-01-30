import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface IUseTracking {
  target: string;
  camp: string;
  dpl: string;
  subFString: string;
  stid: string;
  params: string;
  trusted: string;
}
interface IUseTrackingStore {
  tracking: IUseTracking | null;
  setTrackingStore: (by: any) => void;
  clearTrackingStore: () => void;
}

export const useTrackingStore = create<IUseTrackingStore>()(
  persist(
    (set, get) => ({
      tracking: null,
      setTrackingStore: (by) => set(() => by),
      clearTrackingStore: () => {
        set(() => ({ tracking: null }));
        AsyncStorage.removeItem("tracking-data-storage");
      },
    }),
    {
      name: "tracking-data-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTrackingStore;
