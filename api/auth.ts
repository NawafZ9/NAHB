import axios from "axios";
import { storeToken } from "./storage";
export const api = axios.create({
  baseURL: "https://react-bank-project.eapi.joincoded.com/",
});
export const register = async (userInfo: {
  username: string;
  password: string;
  image: string | null;
}) => {
  const formData = new FormData();
  formData.append("username", userInfo.username);
  formData.append("password", userInfo.password);
  formData.append("image", {
    name: "profile.jpg",
    uri: userInfo.image,
    type: "image/jpeg",
  } as any);

  const { data } = await api.post("/mini-project/api/auth/register", userInfo);

  if (data.token) {
    storeToken(data.token);
  }
  return data;
};
export const login = async (userInfo: {
  username: string;
  password: string;
}) => {
  const { data } = await api.post("/mini-project/api/auth/login", userInfo);
  return data;
};
