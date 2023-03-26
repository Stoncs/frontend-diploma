import { combineReducers } from "@reduxjs/toolkit";

import user from "./user";
import popup from "./popup";

const rootReducer = combineReducers({
  user,
  popup,
});

export default rootReducer;
