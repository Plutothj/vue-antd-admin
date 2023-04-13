import axios from "axios";
import { start, close } from "@/utils/nprogress";
import useUserStore from "@/stores/user";
const User = useUserStore();
const http = axios.create({
  timeout: 5000,
  contentType: "application/json;charset=utf-8",
  withCredentials: true,
  //baseURL: import.meta.env.VITE_RES_URL,
});

// http.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    start();
    if (User.getToken) {
      config.headers["Authorization"] = User.getToken;
      config.headers["X-Access-Token"] = User.getToken;
    }
    if (config.method == "post") {
      config.data = {
        ...config.data,
        _t: Date.parse(new Date()) / 1000,
      };
    } else if (config.method == "get") {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params,
      };
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    console.log(response.data.code);

    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    switch (response.data.code) {
      case 412:
        ElMessage({
          message: response.data.message,
          type: "warning",
        });

        break;

      default:
        close();
        return response;
    }
  },
  function (error) {
    close();
    console.log(error);
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, { params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
  //   return http.get(url, { params });
};
export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    http
      .post(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
};
export const put = (url, data) => {
  return http.put(url, data);
};
export const del = (url, data) => {
  return http.delete(url, data);
};
