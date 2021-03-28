import { createSlice } from "@reduxjs/toolkit";

const snakeSlice = createSlice({
  name: "snake",
  initialState: {
    bodyPosition: [
      [5, 5],
      [6, 5],
      [7, 5],
    ],
    moveDirection: "right",
  },
  reducers: {
    moveUp: (state) => state,
    moveRight: (state) => state,
    moveDown: (state) => state,
    moveLeft: (state) => state,
  },
});

export default snakeSlice;

export const { moveUp, moveRight, moveDown, moveLeft } = snakeSlice.actions;
