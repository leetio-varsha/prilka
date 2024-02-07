import { Card, Center, HStack, Skeleton, VStack } from "native-base";

export const SkeletonCardVertical = ({ width }) => {
  return (
    <Card width={width} borderRadius={10} overflow="visible" marginRight={2} backgroundColor="white">
      <VStack
        space={10}
        overflow="hidden"
        backgroundColor={"white"}
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton h="115" rounded={"md"} />
        <Skeleton.Text px="6" mb="4" />
      </VStack>
    </Card>
  );
};

export const SkeletonCardHorizontal = () => {
  return (
    <Center w="100%" mb={5}>
      <HStack
        w="90%"
        maxW="400"
        borderWidth="1"
        space={8}
        rounded="md"
        backgroundColor={"white"}
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
        p="4"
      >
        <Skeleton flex="1" h="70" rounded="md" startColor="coolGray.100" />
        <VStack flex="3" space="4">
          {/*<Skeleton startColor="amber.300" />*/}
          <Skeleton.Text />
          <HStack space="2" alignItems="center">
            <Skeleton size="5" rounded="full" />
            <Skeleton h="3" flex="2" rounded="full" />
            <Skeleton h="3" flex="1" rounded="full" startColor="indigo.300" />
          </HStack>
        </VStack>
      </HStack>
    </Center>
  );
};
