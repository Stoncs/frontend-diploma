type UserDetails = {
  token: String;
  id: Number;
  username: String;
  fullname: String;
  organisation: String;
  phoneNumber: String;
};

type UserAction = {
  type: String;
  payload: UserDetails | Boolean;
};
