import { Image } from "expo-image";
import { useRef } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { common } from "styles/common";

const width = Dimensions.get("window").width;

const images = [
  {
    id: 1,
    image: require("../../../assets/slots/Element_1.png"),
  },
  {
    id: 2,
    image: require("../../../assets/slots/Element_2.png"),
  },
  {
    id: 3,
    image: require("../../../assets/slots/Element_3.png"),
  },
  {
    id: 4,
    image: require("../../../assets/slots/Element_4.png"),
  },
  {
    id: 5,
    image: require("../../../assets/slots/Element_5.png"),
  },
];

const SlotItem = ({ item }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          flex: 1,
          width: width / 4,
          height: width / 4,
        }}
        source={item.image}
        contentFit="contain"
      />
    </View>
  );
};
export const SlotMachineApp = () => {
  const slotRefs = useRef<any[]>([]);

  const board = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
  ];
  const spin = () => {
    const boardCopy = [...board];

    slotRefs.current.forEach((roller) => {
      const randNum = Math.floor(Math.random() * images.length);
      const lineID = roller.props.topId;
      const tileID = roller.props.id;
      boardCopy[lineID][tileID] = randNum;
      roller.scrollToIndex({ animated: true, index: "" + randNum });
    });
    let hasWin = false;
    boardCopy.forEach((line) => {
      if (!line.some((x) => x > 0) && !hasWin) {
        alert("win");
        hasWin = true;
      }
    });
  };

  return (
    <>
      <View style={[common.flex, styles.container]}>
        <View style={styles.overlay} />
        {board.map((boardItems, boardItemKey) => (
          <View key={boardItemKey} style={[styles.line]}>
            {boardItems.map((item, index) => (
              <View key={`${boardItemKey}-${item}`} style={[styles.tile]}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  topId={boardItemKey}
                  id={index}
                  ref={(el) => (slotRefs.current[item] = el)}
                  data={images}
                  keyExtractor={(item) => item.id}
                  renderItem={SlotItem}
                />
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={[styles.ctaContainer]}>
        <TouchableOpacity onPress={spin} style={[styles.cta]}>
          <Text style={[styles.ctaText]}>Spin</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flexDirection: "row",
  },
  tile: {
    height: width / 4,
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
  },
});
