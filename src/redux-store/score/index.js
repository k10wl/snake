import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "score",
  initialState: 0,
  reducers: {
    addOneToScore: (state) => state + 1,
    resetScore: () => 0,
  },
});

export default scoreSlice;

export const { addOneToScore, resetScore } = scoreSlice.actions;
