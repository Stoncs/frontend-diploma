import { MenuAction, MenuDetails } from "../types";

const initialState: MenuDetails = {
  visible: false,
};

const menu = (state = initialState, action: MenuAction) => {
  switch (action.type) {
    case "SET_MENU":
      return { ...state, visible: true };
    case "UNSET_MENU":
      return { ...state, visible: false };
    default:
      return { ...state };
  }
};

export default menu;
