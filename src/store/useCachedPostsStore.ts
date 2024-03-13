import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUseCachedPostsStore {
  cachedPosts: any[];
  cachedHotPosts: any[];
  setCachedPostsStore: (by: any) => void;
  setCachedHotPostsStore: (by: any) => void;
  clearCachedPostsStore: () => void;
}

export const useCachedPostsStore = create<IUseCachedPostsStore>()(
  persist(
    (set, get) => ({
      cachedPosts: [],
      cachedHotPosts: [],
      setCachedPostsStore: (by) => {
        return set(() => ({ cachedPosts: by }));
      },
      setCachedHotPostsStore: (by) => {
        return set(() => ({ cachedHotPosts: by }));
      },
      clearCachedPostsStore: () => {
        set(() => ({ cachedPosts: [], cachedHotPosts: [] }));
        AsyncStorage.removeItem("cached-posts-storage");
      },
    }),
    {
      name: "cached-posts-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCachedPostsStore;
