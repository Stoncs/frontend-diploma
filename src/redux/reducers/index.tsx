import { combineReducers } from "@reduxjs/toolkit";

import user from "./user";
import popup from "./popup";
import menu from "./menu";

const rootReducer = combineReducers({
  user,
  popup,
  menu,
});

export default rootReducer;
