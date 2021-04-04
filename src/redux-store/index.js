import { configureStore, combineReducers } from "@reduxjs/toolkit";
import foodSlice from "./food";
import snakeSlice from "./snake";
import scoreSlice from "./score";
import gameRulesSlice from "./gamerules";
import scoreboardSlice from "./scoreboard";

const reducer = combineReducers({
  gameRules: gameRulesSlice.reducer,
  food: foodSlice.reducer,
  snake: snakeSlice.reducer,
  score: scoreSlice.reducer,
  scoreboard: scoreboardSlice.reducer,
});

export default configureStore({
  reducer,
});
