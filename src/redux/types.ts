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
  header: string | null;
  message: string | null;
  type: "normal" | "error" | null;
  page: string | null;
};

export type UserAction = {
  type: String;
  payload: UserDetails | Boolean;
};

export type PopupAction = {
  type: "SET_POPUP" | "UNSET_POPUP";
  payload: PopupDetails | null;
};
