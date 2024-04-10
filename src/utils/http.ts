import axios from "axios";

export const http = axios.create({
  baseURL: "https://sirojabdumavlonov.jprq.app/",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
