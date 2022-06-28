import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV == "development"
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}`
      : "",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
