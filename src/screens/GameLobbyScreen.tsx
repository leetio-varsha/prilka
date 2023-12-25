import { AssetsContext } from "components/AssetsContext";
import { Image, ImageBackground } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { common } from "styles/common";

export default function GameLobbyScreen({ navigation }) {
  const { assets } = useContext(AssetsContext);
  const background = assets[0] ? assets[0].localUri : null;
  return (
    <ImageBackground source={background} style={[common.flex]} contentFit={"cover"}>
      <SafeAreaView style={[common.flex]}>
        <View style={[styles.titleContainer]}>
          <Image source={require("assets/slots/Element_1.png")} style={[styles.logo]} contentFit="contain" />
          <Text style={[styles.title]}>Princess of Deserts</Text>
        </View>
        <View style={[common.flex, styles.ctaContainer]}>
          <TouchableOpacity style={[styles.cta]} onPress={() => navigation.push("GameScreen")}>
            <Text style={[styles.ctaText]}>Play</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity style={[styles.cta]} onPress={() => {}}>*/}
          {/*  <Text style={[styles.ctaText]}>Points history</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      </SafeAreaView>
      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontFamily: "Title",
    fontSize: 36,
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  ctaContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cta: {
    backgroundColor: "rgba(109,42,17,0.5)",
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    width: "100%",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  ctaText: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
  },
});
