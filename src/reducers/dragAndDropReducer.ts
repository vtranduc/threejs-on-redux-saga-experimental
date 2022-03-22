import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EXT } from "../types";

export interface DragAndDropState {
  enabled: boolean;
  ext: EXT | null;
  blobs: string[];
}

const initialState: DragAndDropState = {
  enabled: true,
  ext: null,
  blobs: [],
};

const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    setDragAndDropEnabled(state, { payload }: PayloadAction<boolean>) {
      state.enabled = payload;
    },
    setFiles(state, action: PayloadAction<File[]>) {},

    // The following are to be called from saga only, and is inaccessible to client components

    setBlobs(state, { payload }: PayloadAction<string[]>) {
      state.blobs = payload;
    },
    setEXT(state, { payload }: PayloadAction<EXT>) {
      state.ext = payload;
    },
    clearBlobs(state) {
      state.ext = null;
      state.blobs = [];
    },
  },
});

export const { setDragAndDropEnabled, setFiles, setBlobs, setEXT, clearBlobs } =
  dragAndDropSlice.actions;

export default dragAndDropSlice.reducer;
