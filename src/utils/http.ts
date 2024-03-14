import axios from "axios";

export const http = axios.create({
  baseURL: "http://api.valantis.store:40000/",
});
