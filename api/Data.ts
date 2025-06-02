import axios from "axios";
import { getToken } from "./storage";

export const api = axios.create({
  baseURL: "https://react-bank-project.eapi.joincoded.com/",
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProfile = () => api.get("/mini-project/api/auth/me");

export const getTransaction = () =>
  api.get("/mini-project/api/transactions/my");
export const getAllUsers = () => api.get("/mini-project/api/auth/users");
export const UpdateProfile = () => api.put("/mini-project/api/auth/profile");

export const DepositFunction = async (amount: number) => {
  //console.log("api the amount is", { amount });

  const { data } = await api.put("/mini-project/api/transactions/deposit", {
    amount,
  });
  return data;
};

export const Withdraw = async (amount: number) => {
  console.log("api the amount is", { amount });

  const { data } = await api.put("/mini-project/api/transactions/withdraw", {
    amount,
  });
  return data;
};

export const Transfer = async (username: string, amount: number) => {
  const { data } = await api.put(
    `/mini-project/api/transactions/transfer/${username}`,
    {
      amount,
    }
  );
  return data;
};

export const getUserInfoByID = (userId: string) =>
  api.get(`/mini-project/api/auth/user/${userId}`);
