import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const GameTopBar = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        {/*// @ts-ignore*/}
        <TouchableOpacity onPress={() => navigation.push("GameLobbyScreen")}>
          <Text style={[styles.text]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.text]}>Points: 0</Text>
      </View>
      <Text style={[styles.title]}>Princess of Deserts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  text: {
    color: "white",
  },
  title: {
    color: "white",
    fontFamily: "Title",
    fontSize: 26,
    textAlign: "center",
    marginTop: 20,
  },
});
