import { UserDetails, UserAction } from "./../types";

const initialState: UserDetails = {
  id: -1,
  username: "",
  fullname: "",
  organisation: "",
  phoneNumber: "",
  roles: [],
  isAuth: false,
};

const user = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
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
