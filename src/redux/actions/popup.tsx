import { PopupDetails } from "../types";

export const setPopup = (content: PopupDetails) => ({
  type: "SET_POPUP",
  payload: content,
});

export const unsetPopup = (content: null) => ({
  type: "UNSET_POPUP",
  payload: content,
});
