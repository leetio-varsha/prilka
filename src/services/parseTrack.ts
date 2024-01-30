import api from "api";
import * as ExpoTrackingTransparency from "expo-tracking-transparency";
export const parseTrack = async (str: string) => {
  const init = str?.split("//")[1];
  const full = init?.split("/");
  const dpl = full[1];
  const par = full[2]?.split("__");
  const t = par?.[0];
  const c = par?.[1];
  const subFString = par?.[2]
    .split("_")
    .slice(1)
    .map((param, index) => `af_sub${index + 1}=${param}`)
    .join("&");
  const uts = 0;
  const ucmp = 0;
  const ucnt = 0;
  const lid = 0;
  // const aid = 0;
  const stid = "";
  const cid = ExpoTrackingTransparency.getAdvertisingId();
  const params = `${c}?uts=${uts}&ucmp=${ucmp}&ucnt=${ucnt}&lid=${lid}&aid=${""}&stid=${stid}&cid=${cid}&dplnk=${dpl}&${subFString}`;
  const trustedName = await api.getTrusted(t);

  return {
    tracking: { target: t, camp: c, subFString, stid, dpl, params, trusted: trustedName.name },
  };
};
