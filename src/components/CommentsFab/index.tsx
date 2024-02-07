import { Box, Fab, Icon } from "native-base";
export const CommentsFab = ({ onPress }) => {
  return (
    <Box
      position="absolute" // make the position absolute
      right={2} // stick to the right
      bottom={5} // stick to the bottom
      height="200"
      w="400"
      shadow="2"
      rounded="lg"
      bg="white:alpha.20"
    >
      <Fab
        onPress={onPress}
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={
          <Icon color="white" as={require("react-native-vector-icons/FontAwesome").default} name="comment" size="sm" />
        }
      />
    </Box>
  );
};
