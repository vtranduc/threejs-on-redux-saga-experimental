import { all, put, select, takeLatest } from "redux-saga/effects";
import { setFiles, setDragAndDropEnabled, RootState } from "../reducers";
import { PayloadAction } from "@reduxjs/toolkit";
import { setBlobs } from "../reducers/dragAndDropReducer";

function* setDragAndDropEnabledSaga() {
  const enabled: boolean = yield select(
    (state: RootState) => state.dragAndDrop.enabled
  );
  if (enabled) return;
  yield put(setBlobs([]));
}

function* setFilesSaga({ payload }: PayloadAction<File[]>) {
  if (!payload.length) yield put(setBlobs([]));
  else {
    const file = payload[0];
    const blob = window.URL.createObjectURL(file);
    yield put(setBlobs([blob]));
  }
}

export function* dragAndDropSaga() {
  yield all([
    takeLatest(setFiles.type, setFilesSaga),
    takeLatest(setDragAndDropEnabled.type, setDragAndDropEnabledSaga),
  ]);
}
