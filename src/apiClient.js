import axios from "axios";

const apiClient = axios.create({});

apiClient.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default apiClient;
