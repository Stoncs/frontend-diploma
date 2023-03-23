import { PopupDetails, PopupAction } from "./../types";

const initialState: PopupDetails = {
  header: null,
  message: null,
  type: null,
  page: null,
};

const popup = (state = initialState, action: PopupAction) => {
  switch (action.type) {
    case "SET_POPUP":
      return {
        ...state,
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
