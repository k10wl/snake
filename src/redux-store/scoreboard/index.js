import { createSlice } from "@reduxjs/toolkit";

const scoreboardSlice = createSlice({
  name: "scoreboard",
  initialState: [],
  reducers: {
    addToScoreboard: (state, action) => {
      state.push(action.payload);
      state.sort((a, b) => b - a);
      if (state.length > 10) state.pop();
    },
  },
});

export default scoreboardSlice;

export const { addToScoreboard } = scoreboardSlice.actions;
