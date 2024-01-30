import { SearchComponent } from "components/Forms/Search";
import { Greetings } from "components/Greatings";
import { Header } from "components/Header";
import { Box, VStack } from "native-base";
import { common } from "styles/common";

export const Masthead = () => {
  return (
    <VStack height={"100%"}>
      <Box safeArea style={[common.paddingHrL]}>
        <Header />
        <Greetings />
        <SearchComponent />
      </Box>
    </VStack>
  );
};
