import { get, post } from "@/utils/http";

export const getSunburstData = () => {
  return get("/home/sunburstdata");
};
