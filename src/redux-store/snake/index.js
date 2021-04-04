import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bodyPosition: [
    [4, 5],
    [3, 5],
    [2, 5],
  ],
  tail: [],
  moveDirection: "RIGHT",
  lastStep: "RIGHT",
  alive: true,
};

const snakeSlice = createSlice({
  name: "snake",
  initialState,
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

      state.lastStep = state.moveDirection;
    },
    consumeFood: (state) => {
      state.bodyPosition.push(state.tail);
    },
    killSnake: (state) => {
      state.alive = false;
    },
    resetGame: () => initialState,
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
  killSnake,
  resetGame,
} = snakeSlice.actions;
