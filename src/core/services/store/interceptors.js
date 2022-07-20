import axios from "axios";
import JwtService from "@/core/services/jwt.service";

export default function setup() {
  axios.interceptors.request.use(
    function(config) {
      const token = JwtService.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(err) {
      return Promise.reject(err);
    }
  );
}
