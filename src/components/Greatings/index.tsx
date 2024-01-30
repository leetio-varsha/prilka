import { Heading, VStack } from "native-base";
import React from "react";
import useUserStore from "store/useUserStore";
import { colors } from "styles/common";

export const Greetings = () => {
  const user = useUserStore((state) => state.user);
  const userName = user.name;

  return (
    <VStack>
      {userName && (
        <Heading mt={5} color={colors.dark.font}>
          Hello, {userName}! 👋
        </Heading>
      )}
      <Heading mt={3} size={"lg"} color={colors.dark.font}>
        Check out new posts!
      </Heading>
    </VStack>
  );
};
