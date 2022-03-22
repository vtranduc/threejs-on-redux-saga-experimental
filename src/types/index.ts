import { CSSProperties } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export type Children = React.ReactChild | React.ReactChild[] | null;

export type LoaderType = FBXLoader | OBJLoader | GLTFLoader;

export interface ContainerProps {
  children?: Children;
  style?: CSSProperties;
}

export enum EXT {
  fbx = "fbx",
  obj = "obj",
  // gltf = "gltf",
  glb = "glb",
}
