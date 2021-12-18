import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { app } from "../pages/_app";

const _axios = axios.create({
  baseURL: "/api",
});

_axios.interceptors.request.use((config) => {
  const params = new URLSearchParams(window.location.search);
  config.params = {
    shop: params.get("shop"),
  };
  return getSessionToken(app).then((token) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  });
});

export default _axios;
