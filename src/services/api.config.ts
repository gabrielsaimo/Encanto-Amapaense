import axios from "axios";
const api = axios.create({
  baseURL: "https://encanto-backend.vercel.app/",
});
const api2 = axios.create({
  baseURL: "http://192.168.12.11:3020/",
});
export { api, api2 };
