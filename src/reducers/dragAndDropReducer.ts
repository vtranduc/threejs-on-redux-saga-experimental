import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DragAndDropState {
  enabled: boolean;
  blobs: string[];
}

const initialState: DragAndDropState = {
  enabled: true,
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
    /**
     * This is to be called from saga only, and is inaccessible to client components
     * @param state
     * @param param1
     */
    setBlobs(state, { payload }: PayloadAction<string[]>) {
      state.blobs = payload;
    },
  },
});

export const { setDragAndDropEnabled, setFiles, setBlobs } =
  dragAndDropSlice.actions;

export default dragAndDropSlice.reducer;
