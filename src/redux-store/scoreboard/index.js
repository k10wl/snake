import { createSlice } from "@reduxjs/toolkit";

const scoreboardSlice = createSlice({
  name: "scoreboard",
  initialState: [],
  reducers: {
    addToScoreboard: (state, action) => {
      state.push([state.length + 1, action.payload]);
    },
  },
});

export default scoreboardSlice;

export const { addToScoreboard } = scoreboardSlice.actions;
