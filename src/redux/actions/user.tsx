export const setUser = (user: UserDetails) => ({
  type: "SET_USER",
  payload: user,
});

export const setIsAuth = (isAuth: Boolean) => ({
  type: "SET_IS_AUTH",
  payload: isAuth,
});
