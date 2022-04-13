import React, { useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as THREE from "three";
import { DragAndDrop } from "./components";
import { RootState, add, clear } from "./reducers";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EXT, LoaderType } from "./types";
import { useAppendToDiv } from "./customHooks";

function App() {
  const dispatch = useDispatch();
  const blobs = useSelector((state: RootState) => state.dragAndDrop.blobs);
  const ext = useSelector((state: RootState) => state.dragAndDrop.ext);
  const sceneContainer = useRef<HTMLDivElement>(null);
  const loaders = useMemo(() => {
    return {
      fbx: new FBXLoader(),
      obj: new OBJLoader(),
      // gltf: new GLTFLoader(),
      glb: new GLTFLoader(),
    } as Record<EXT, LoaderType>;
  }, []);

  useAppendToDiv(sceneContainer);

  useEffect(() => {
    if (!ext) return;
    const blob = blobs[0];
    dispatch(clear());
    const onError = () => console.log("Error loading the file!");
    const onLoad = (model: THREE.Group | GLTF) => {
      const object = model instanceof THREE.Group ? model : model.scene;
      object.traverse((obj) => {
        obj.receiveShadow = true;
        obj.castShadow = true;
      });
      dispatch(add(object));
    };
    loaders[ext].load(blob, onLoad, undefined, onError);
  }, [blobs, loaders, dispatch, ext]);

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
