import { Greetings } from "components/Greatings";
import { Header } from "components/Header";
import { Highlighted } from "components/Highlighted";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "native-base";
import { common } from "styles/common";

export const Masthead = () => {
  return (
    <Box>
      <LinearGradient
        colors={["#563029", "#563029", "#362426", "#1e1d24", "#10131e", "#191b23", "#191b23"]}
        // Define the start and end points of the gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <Box style={[common.paddingHrL]}>
          <Header />
          <Greetings />
        </Box>
        <Highlighted />
      </LinearGradient>
    </Box>
  );
};
