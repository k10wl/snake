import { createSlice } from "@reduxjs/toolkit";

const randomCell = () => Math.floor(Math.random() * 10);

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foodCoords: [1, 1],
    prevFoodCoords: [1, 1],
  },
  reducers: {
    newPiece: (state) => {
      state.foodCoords = state.foodCoords.map(() => randomCell());
    },
    preventSpawnOnLastPlace: (state) => {
      state.prevFoodCoords = state.foodCoords;
      state.foodCoords = state.foodCoords.map(() => randomCell());
    },
  },
});

export default foodSlice;

export const { newPiece, preventSpawnOnLastPlace } = foodSlice.actions;
