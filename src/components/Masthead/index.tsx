import { SearchComponent } from "components/Forms/Search";
import { Greetings } from "components/Greatings";
import { Header } from "components/Header";
import { Highlighted } from "components/Highlighted";
import { Box } from "native-base";
import { common } from "styles/common";

export const Masthead = () => {
  return (
    <Box>
      <Box style={[common.paddingHrL]} backgroundColor={"#1a1d1e"}>
        <Header />
        <Greetings />
        <SearchComponent />
      </Box>
      <Highlighted />
    </Box>
  );
};
