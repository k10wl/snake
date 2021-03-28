import { configureStore, combineReducers } from "@reduxjs/toolkit";
import foodSlice from "./food";
import snakeSlice from "./snake";

const reducer = combineReducers({
  food: foodSlice.reducer,
  snake: snakeSlice.reducer,
});

export default configureStore({
  reducer,
});
