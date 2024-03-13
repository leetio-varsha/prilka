import { Greetings } from "components/Greatings";
import { Header } from "components/Header";
import { Highlighted } from "components/Highlighted";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Text, VStack } from "native-base";
import { Animated, Dimensions } from "react-native";
import { colors, common } from "styles/common";

const screenWidth = Dimensions.get("window").width;
export const Masthead = ({ offset }) => {
  const backgroundOpacity = offset?.interpolate({
    inputRange: [30, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const greetingsHeight = offset?.interpolate({
    inputRange: [30, 100],
    outputRange: [70, 0],
    extrapolate: "clamp",
  });
  return (
    <VStack>
      <Box safeAreaTop style={[common.paddingHrL]}>
        <Header />
        <Animated.View style={{ overflow: "hidden", height: greetingsHeight }}>
          <Greetings />
          <Text fontSize="xl" paddingX={0} bold marginBottom={4} color={"white"} style={[common.paddingHrL]}>
            Highlighted
          </Text>
        </Animated.View>
      </Box>
      {/*<Animated.View style={{ flex: 1, height: cardImageHeight, overflow: "hidden" }}>*/}

      <Highlighted offset={offset} />
      <Animated.View
        style={{
          position: "absolute",
          width: screenWidth,
          height: "100%",
          backgroundColor: colors.light.background,
          bottom: 0,
          opacity: backgroundOpacity,
          zIndex: -1,
        }}
      >
        <LinearGradient
          colors={["#563029", "#563029", "#362426", "#1e1d24", "#10131e", "#191b23", "#191b23"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </VStack>
  );
};
