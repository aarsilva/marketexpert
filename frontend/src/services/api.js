import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost/backend"
});

export default Api;
