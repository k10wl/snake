import { createSlice } from "@reduxjs/toolkit";

const gameRulesSlice = createSlice({
  name: "gameRules",
  initialState: { gameSpeed: 500 },
  reducers: {
    changeGameSpeed: (state, action) => {
      state.gameSpeed = action.payload;
    },
  },
});

export default gameRulesSlice;

export const { changeGameSpeed } = gameRulesSlice.actions;
