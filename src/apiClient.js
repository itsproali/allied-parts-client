import axios from "axios";

const apiClient = axios.create({});

apiClient.interceptors.request.use(
  (req) => {
    req.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default apiClient;
