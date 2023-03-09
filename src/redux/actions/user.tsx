import { UserDetails } from "../types";

export const setUser = (user: any) => ({
  type: "SET_USER",
  payload: user,
});

export const setIsAuth = (isAuth: Boolean) => ({
  type: "SET_IS_AUTH",
  payload: isAuth,
});
