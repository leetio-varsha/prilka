import { Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import { Box, Icon, Input, Pressable, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(["some result"]);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      // Replace this with your actual search logic
      const results = []; // Search for the term and get results
      setSearchResults(results);
    }, 500);

    debouncedSearch();

    // Cleanup function to cancel the debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  return (
    <Box mt={2}>
      <Input
        variant="outline"
        placeholder="Search"
        color="#fff"
        _dark={{
          placeholderTextColor: "blueGray.400",
          backgroundColor: "blueGray.50",
          borderColor: "blueGray.300",
        }}
        value={searchTerm}
        onChangeText={setSearchTerm}
        height={12}
        fontSize="md"
        InputLeftElement={<Icon as={Ionicons} name="search" size="md" ml={2} color="blueGray.400" />}
      />
      {searchResults.length > 0 && (
        <VStack>
          {searchResults.map((result, index) => (
            <Pressable key={index} onPress={() => setSearchTerm(result)}>
              <Box
                backgroundColor="blueGray.50"
                borderColor="blueGray.300"
                borderWidth={1}
                borderRadius={5}
                p={2}
                mt={1}
              >
                <Text>{result}</Text>
              </Box>
            </Pressable>
          ))}
        </VStack>
      )}
    </Box>
  );
};
