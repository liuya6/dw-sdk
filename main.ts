import { DwSdk } from "./src/dwsdk";
import { DwSdkProps } from "./typings";

function useDwSdk(params: DwSdkProps) {
  return DwSdk.getInstance(params);
}

export { useDwSdk };
