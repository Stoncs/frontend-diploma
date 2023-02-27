interface UserState {
  id: Number;
  username: String;
  fullname: String;
  organisation: String;
  phoneNumber: String;
  isAuth: Boolean;
}

const initialState: UserState = {
  id: -1,
  username: "",
  fullname: "",
  organisation: "",
  phoneNumber: "",
  isAuth: false,
};

const user = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        info: { ...action.payload },
      };
    case "SET_IS_AUTH":
      return {
        ...state,
        isAuth: action.payload,
      };
    default:
      return { ...state };
  }
};

export default user;
