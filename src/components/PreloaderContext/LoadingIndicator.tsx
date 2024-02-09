import { usePreloader } from "components/PreloaderContext/index";
import { Box, Spinner } from "native-base";
import React from "react";

export default function LoadingIndicator() {
  const { loading } = usePreloader();
  if (!loading) {
    return null;
  }

  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex={99999}
      justifyContent="center"
      alignItems="center"
      backgroundColor="rgba(0,0,0,.8)"
    >
      <Spinner accessibilityLabel="Loading..." size={"lg"} />
    </Box>
  );
}
