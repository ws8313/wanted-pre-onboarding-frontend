import axios from "axios";

const BASE_URL = "https://pre-onboarding-selection-task.shop/";
const access_token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
  },
});

export default instance;
