import { PopupAction, PopupDetails } from "../types";

export const setPopup = (content: PopupDetails): PopupAction => ({
  type: "SET_POPUP",
  payload: content,
});

export const unsetPopup = (content: null): PopupAction => ({
  type: "UNSET_POPUP",
  payload: content,
});
