import { all, put, select, takeLatest } from "redux-saga/effects";
import { setFiles, setDragAndDropEnabled, RootState } from "../reducers";
import { PayloadAction } from "@reduxjs/toolkit";
import { setBlobs, setEXT, clearBlobs } from "../reducers/dragAndDropReducer";
import { EXT } from "../types";

function* setDragAndDropEnabledSaga() {
  const enabled: boolean = yield select(
    (state: RootState) => state.dragAndDrop.enabled
  );
  if (!enabled) yield put(clearBlobs());
}

function* setFilesSaga({ payload }: PayloadAction<File[]>) {
  if (!payload.length) {
    yield put(clearBlobs());
    return;
  }
  const file = payload[0];
  const ext = getEXT(file.name);
  if (!ext) {
    yield put(clearBlobs());
    return;
  }
  const blob = window.URL.createObjectURL(file);
  yield put(setBlobs([blob]));
  yield put(setEXT(ext));
}

export function* dragAndDropSaga() {
  yield all([
    takeLatest(setFiles.type, setFilesSaga),
    takeLatest(setDragAndDropEnabled.type, setDragAndDropEnabledSaga),
  ]);
}

function getEXT(name: string): EXT | undefined {
  const lastDot = name.lastIndexOf(".");
  if (lastDot === -1) return undefined;
  const ext = name.substring(lastDot + 1).toLowerCase();
  switch (ext) {
    case "fbx":
      return EXT.fbx;
    case "obj":
      return EXT.obj;
    // case "gltf":
    //   return EXT.gltf;
    case "glb":
      return EXT.glb;
    default:
      return undefined;
  }
}
