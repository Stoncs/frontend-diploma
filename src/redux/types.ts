export type UserDetails = {
  id: Number;
  email: String;
  fullname: String;
  organisation: String;
  phoneNumber: String;
  roles: Array<String>;
  isAuth: Boolean;
};
export type PopupDetails = {
  header: string | undefined;
  message: string | undefined;
  type: string | undefined;
};

export type UserAction = {
  type: String;
  payload: UserDetails | Boolean;
};

export type PopupAction = {
  type: String;
  payload: PopupDetails | null;
};
