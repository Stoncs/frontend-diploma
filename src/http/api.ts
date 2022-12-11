import jwt_decode from "jwt-decode";
import { $host } from ".";

export const logIn = async (username: String, password: String) => {
  const { data } = await $host.post("/api/auth/signin", { username, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const sendEmail = async (username: String) => {
  const { data } = await $host.post("/api/forgot_password", { username });
  return data;
};

export const changePassword = async (newPassword: String, token: String) => {
  const { data } = await $host.post("/api/reset_password", {
    newPassword,
    token,
  });
  return data;
};
