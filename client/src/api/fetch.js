import axios from "axios";

const publicFetch = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL: "/",
});

export { publicFetch };
