import { all } from "redux-saga/effects";
import { sceneSaga } from "./sceneSaga";
import { dragAndDropSaga } from "./dragAndDropSaga";

export default function* saga() {
  yield all([dragAndDropSaga(), sceneSaga()]);
}
