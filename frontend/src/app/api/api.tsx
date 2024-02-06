import axios from "axios";

export const api = axios.create({
  baseURL: "https://prod-global-webapp-proxy.nubank.com.br/api/proxy/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiNubank = axios.create({
  baseURL: "https://prod-global-webapp-proxy.nubank.com.br/api/proxy/",
  headers: {
    "Content-Type": "application/json",
    "Authorization" : "Bearer " + localStorage.getItem("access_token")
  },
});



