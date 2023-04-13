import { get, post } from "@/utils/http";

export const getCode = () => {
  return get("/oauth/captcha");
};

export const login = (data) => {
  return post("/oauth/token", data);
};
export const getRoutes = () => {
  return get("/menu/routes");
};
export const getUserInfo = () => {
  return get("/sys/user/getUserInfo");
};
export const getPermCode = () => {
  return get("/sys/permission/getPermCode");
};
export const getUserPermissionByToken = () => {
  return get("/sys/permission/getUserPermissionByToken");
};
