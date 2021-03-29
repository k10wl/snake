import { createSlice } from "@reduxjs/toolkit";

const snakeSlice = createSlice({
  name: "snake",
  initialState: {
    bodyPosition: [
      [7, 5],
      [6, 5],
      [5, 5],
    ],
    tail: [],
    moveDirection: "RIGHT",
  },
  reducers: {
    moveDirectionUp: (state) => {
      state.moveDirection = "UP";
    },
    moveDirectionRight: (state) => {
      state.moveDirection = "RIGHT";
    },
    moveDirectionDown: (state) => {
      state.moveDirection = "DOWN";
    },
    moveDirectionLeft: (state) => {
      state.moveDirection = "LEFT";
    },
    startMovement: (state) => {
      let [[x, y]] = state.bodyPosition;

      const direction = state.moveDirection;
      if (direction === "LEFT") x -= 1;
      if (direction === "UP") y -= 1;
      if (direction === "RIGHT") x += 1;
      if (direction === "DOWN") y += 1;

      state.bodyPosition.splice(0, 0, [x, y]);
      state.tail = state.bodyPosition[state.bodyPosition.length - 1];
      state.bodyPosition.pop();
    },
    consumeFood: (state) => {
      state.bodyPosition.push(state.tail);
    },
  },
});

export default snakeSlice;

export const {
  moveDirectionUp,
  moveDirectionRight,
  moveDirectionDown,
  moveDirectionLeft,
  startMovement,
  consumeFood,
} = snakeSlice.actions;
