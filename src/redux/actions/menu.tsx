import { MenuAction } from "../types";

export const setMenu = (): MenuAction => ({
  type: "SET_MENU",
});

export const unsetMenu = (): MenuAction => ({
  type: "UNSET_MENU",
});
