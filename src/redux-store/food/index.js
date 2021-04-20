import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foodCoords: [],
  },
  reducers: {
    newFood: (state, action) => {
      state.foodCoords = action.payload;
    },
  },
});

export default foodSlice;

export const { newFood } = foodSlice.actions;
