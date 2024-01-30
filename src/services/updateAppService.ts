// import * as Updates from "expo-updates";
// import { Alert } from "react-native";
// export const updateAppService = () => {
//   const eventListener = async (event) => {
//     if (event.type === Updates.UpdateEventType.ERROR) {
//       // Handle the error here
//       console.error("An error occurred while updating the app:", event.message);
//     } else if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
//       // Handle the case when no update is available
//     } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
//       // Handle the case when an update is available
//       Alert.alert("Update Available", "A new version of the app is available. Would you like to update now?", [
//         {
//           text: "Update Now",
//           onPress: async () => {
//             await Updates.fetchUpdateAsync();
//             await Updates.reloadAsync();
//           },
//         },
//         {
//           text: "Update Later",
//           onPress: () => {}, // Do nothing if the user wants to update later
//           style: "cancel",
//         },
//       ]);
//     }
//   };
//   Updates.useUpdateEvents(eventListener);
// };
