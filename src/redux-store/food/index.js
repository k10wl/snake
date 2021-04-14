import { createSlice } from "@reduxjs/toolkit";

const randomCell = () => Math.floor(Math.random() * 10);

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foodCoords: [1, 1],
    prevFoodCoords: [1, 1],
  },
  reducers: {
    createNewFoodCoords: (state) => {
      state.foodCoords = state.foodCoords.map(() => randomCell());
    },
    storePrevFoodCoords: (state) => {
      state.prevFoodCoords = state.foodCoords;
    },
  },
});

export default foodSlice;

export const { createNewFoodCoords, storePrevFoodCoords } = foodSlice.actions;
