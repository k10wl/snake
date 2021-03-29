import { createSlice } from "@reduxjs/toolkit";
import { gridSize } from "../../constants/gamerules";

const randomCell = () => Math.floor(Math.random() * gridSize);

const foodSlice = createSlice({
  name: "food",
  initialState: [1, 1],
  reducers: {
    newPiece: () => [randomCell(), randomCell()],
  },
});

export default foodSlice;

export const { newPiece } = foodSlice.actions;
