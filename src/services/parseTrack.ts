import api from "api";
import * as ExpoTrackingTransparency from "expo-tracking-transparency";
import { Platform } from "react-native";
export const parseTrack = async (str: string) => {
  const init = str?.split("//")[1];
  const par = init?.split("__");
  const t = par?.[0];
  const dpl = par?.[1];
  const c = par?.[2];
  const subFString = par?.[3]
    .split("_")
    .slice(1)
    .map((param, index) => `af_sub${index + 1}=${param}`)
    .join("&");

  const uts = 0;
  const ucmp = 0;
  const ucnt = 0;
  const lid = 0;
  const aid = "6477542235"; // AppsFlyer ID
  const stid = "";
  const cid = ExpoTrackingTransparency.getAdvertisingId();
  let params = `${c}?uts=${uts}&ucmp=${ucmp}&ucnt=${ucnt}&lid=${lid}&aid=${""}&stid=${stid}&cid=${cid}&dplnk=${dpl}&${subFString}`;
  if (Platform.OS === "ios") {
    params += `&aid=${aid}`;
  }
  const trustedName = await api.getTrusted(t);
  return { target: t, camp: c, subFString, stid, dpl, params, trusted: trustedName.name };
};
