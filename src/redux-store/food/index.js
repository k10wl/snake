import { createSlice } from "@reduxjs/toolkit";
import { gridSize } from "../../constants/gamerules";

// eslint-disable-next-line no-unused-vars
const randomCell = () => Math.floor(Math.random() * gridSize);

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foodCoords: [1, 1],
    prevFoodCoords: [1, 1],
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
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
