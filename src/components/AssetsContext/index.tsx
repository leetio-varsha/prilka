import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import { createContext, useEffect } from "react";
export const AssetsContext = createContext({
  assets: [],
});

export const AssetsContextProvider = ({ children }) => {
  const [loaded, fontsError] = useFonts({
    Title: require("assets/fonts/Skandal.ttf"),
  });
  const [assets, assetError] = useAssets([require("assets/slots/background-vertical.png")]);
  // const [internetConnected, setInternetConnected] = useState<boolean>(false);

  useEffect(() => {
    if (fontsError || assetError) {
      const error = fontsError || assetError;
      console.log("[LOAD FONTS/Images ERROR]:", error);
      throw error;
    }
  }, [fontsError, assetError]);

  if (!loaded && !assets) {
    return null;
  }

  return <AssetsContext.Provider value={{ assets }}>{children}</AssetsContext.Provider>;
};
