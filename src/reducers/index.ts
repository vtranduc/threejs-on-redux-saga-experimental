import { combineReducers } from "redux";
import dragAndDropReducer, {
  DragAndDropState,
  setDragAndDropEnabled,
  setFiles,
} from "./dragAndDropReducer";
import sceneReducer, {
  SceneState,
  appendToDiv,
  removeFromDiv,
  add,
  remove,
  clear,
} from "./sceneReducer";

export default combineReducers({
  scene: sceneReducer,
  dragAndDrop: dragAndDropReducer,
});

export interface RootState {
  scene: SceneState;
  dragAndDrop: DragAndDropState;
}

// Only reducers that are publicly accessible to client components are listed here

export {
  setDragAndDropEnabled,
  setFiles,
  appendToDiv,
  removeFromDiv,
  add,
  remove,
  clear,
};
