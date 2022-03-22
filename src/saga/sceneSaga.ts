import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { appendToDiv, removeFromDiv, add, remove, clear } from "../reducers";
import { SceneController } from "../utils";
import * as THREE from "three";

function appendToDivSaga(controller: SceneController) {
  return function ({ payload }: PayloadAction<HTMLDivElement>) {
    controller.appendToDiv(payload);
  };
}

function removeFromDivSaga(controller: SceneController) {
  return function ({ payload }: PayloadAction<HTMLDivElement>) {
    controller.removeFromDiv(payload);
  };
}

function addSaga(controller: SceneController) {
  return function ({ payload }: PayloadAction<THREE.Object3D>) {
    controller.add(payload);
  };
}

function removeSaga(controller: SceneController) {
  return function ({ payload }: PayloadAction<THREE.Object3D>) {
    controller.remove(payload);
  };
}

function clearSaga(controller: SceneController) {
  return function () {
    controller.clear();
  };
}

export function* sceneSaga() {
  const controller = new SceneController();
  yield all([
    takeEvery(appendToDiv.type, appendToDivSaga(controller)),
    takeEvery(removeFromDiv.type, removeFromDivSaga(controller)),
    takeEvery(add.type, addSaga(controller)),
    takeEvery(remove.type, removeSaga(controller)),
    takeLatest(clear.type, clearSaga(controller)),
  ]);
}
