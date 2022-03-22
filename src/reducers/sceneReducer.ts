import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as THREE from "three";

export interface SceneState {}

const initialState: SceneState = {};

const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    appendToDiv(state, action: PayloadAction<HTMLDivElement>) {},

    removeFromDiv(state, action: PayloadAction<HTMLDivElement>) {},

    add(state, action: PayloadAction<THREE.Object3D>) {},

    remove(state, action: PayloadAction<THREE.Object3D>) {},

    clear() {},
  },
});

export const { appendToDiv, removeFromDiv, add, remove, clear } =
  dragAndDropSlice.actions;

export default dragAndDropSlice.reducer;
