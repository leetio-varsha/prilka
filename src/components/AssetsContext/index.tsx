import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import { createContext, useEffect } from "react";
import { Text, View } from 'react-native';
export const AssetsContext = createContext({
  assets: [],
});

export const AssetsContextProvider = ({ children }) => {
  const [loaded, fontsError] = useFonts({
    Title: require("assets/fonts/Skandal.ttf"),
  });
  const [assets, assetError] = useAssets([require("assets/slots/background-vertical.png")]);

  useEffect(() => {
    if (fontsError || assetError) {
      const error = fontsError || assetError;
      console.log("[LOAD FONTS/Images ERROR]:", error);
      throw error;
    }
  }, [fontsError, assetError]);

  if (!loaded && !assets) {
    return <View style={{backgroundColor: '#fff'}}>
      <Text style={{color: '#000'}}>Loading...</Text>
      <Text style={{color: '#000'}}>{String(fontsError)}</Text>
      <Text style={{color: '#000'}}>{String(assetError)}</Text>
    </View>;
  }

  return <AssetsContext.Provider value={{ assets }}>{children}</AssetsContext.Provider>;
};
