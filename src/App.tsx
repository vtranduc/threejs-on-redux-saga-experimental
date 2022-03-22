import React, { useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as THREE from "three";
import { DragAndDrop } from "./components";
import { RootState, appendToDiv, removeFromDiv, add, clear } from "./reducers";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

function App() {
  const dispatch = useDispatch();
  const loader = useMemo(() => new FBXLoader(), []);
  const blobs = useSelector((state: RootState) => state.dragAndDrop.blobs);
  const sceneContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = sceneContainer.current;
    if (!div) return;
    dispatch(appendToDiv(div));
    return () => {
      dispatch(removeFromDiv(div));
    };
  }, [sceneContainer, dispatch]);

  useEffect(() => {
    const blob = blobs[0];
    if (!blob) return;
    dispatch(clear());
    const onError = () => {
      console.log("Error loading the file!");
    };
    const onLoad = (fbx: THREE.Group) => {
      dispatch(add(fbx));
    };
    loader.load(blob, onLoad, undefined, onError);
  }, [blobs, loader, dispatch]);

  return (
    <DragAndDrop
      style={{
        width: "800px",
        height: "500px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
        ref={sceneContainer}
      />
    </DragAndDrop>
  );
}

export default App;
