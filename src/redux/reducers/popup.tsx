import { PopupDetails, PopupAction } from "./../types";

const initialState: PopupDetails = {
  header: undefined,
  message: undefined,
  type: undefined,
};

const popup = (state = initialState, action: PopupAction) => {
  switch (action.type) {
    case "SET_POPUP":
      return {
        ...action.payload,
      };
    case "UNSET_POPUP":
      return {
        initialState,
      };
    default:
      return { ...state };
  }
};

export default popup;
