import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserStore {
  user: any;
  updateUserStore: (by: any) => void;
  clearUserStore: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      user: {},
      updateUserStore: (by) => set((state) => (!by ? state : { ...state, user: { ...get().user, ...by } })),
      clearUserStore: () => {
        set(() => ({ user: {} }));
        AsyncStorage.removeItem("user-data-storage");
      },
    }),
    {
      name: "user-data-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserStore;
