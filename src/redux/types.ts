export type UserDetails = {
  id: Number;
  username: String;
  fullname: String;
  organisation: String;
  phoneNumber: String;
  roles: Array<String>;
  isAuth: Boolean;
};

export type UserAction = {
  type: String;
  payload: UserDetails | Boolean;
};
