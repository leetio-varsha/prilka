import { AssetsContext } from "components/AssetsContext";
import { GameTopBar } from "components/GameTopBar";
import { SlotMachineApp } from "components/SlotMachine";
import { ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { common } from "styles/common";
export default function GameScreen() {
  const { assets } = useContext(AssetsContext);
  const background = assets[0] ? assets[0].localUri : null;
  return (
    <ImageBackground source={background} style={[common.flex]} contentFit={"cover"}>
      <SafeAreaView style={[common.flex]}>
        <GameTopBar />
        <SlotMachineApp />
      </SafeAreaView>
      <StatusBar style="light" />
    </ImageBackground>
  );
}
