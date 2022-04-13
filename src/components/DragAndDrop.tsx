import { DragEvent, useCallback, useMemo } from "react";
import { ContainerProps } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setFiles, add } from "../reducers";
// import WebGL from 'three/examples/jsm/capabilities/WebGL.js'

import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// import {} from 'three/examples/jsm/loaders/'

// import { GLTFLoader } from "three-modern/examples/jsm/loaders/GLTFLoader";

// import * as THREEMODERN from "three-modern";

// import { GLTFLoader as ModernLoader } from "three-modern/examples/jsm/loaders/GLTFLoader";

// import {gltfload}

// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// import { LoaderUtils } from "three";

// import {Meshopt}

interface FileMap {
  [path: string]: File;
}

const gltfLoader = new GLTFLoader();

const MANAGER = new THREE.LoadingManager();

// const MANAGER = new THREEMODERN.LoadingManager();

type DragAndDropEvent = DragEvent<HTMLDivElement>;

export function DragAndDrop({ children, style }: ContainerProps) {
  const dispatch = useDispatch();
  const enabled = useSelector((state: RootState) => state.dragAndDrop.enabled);

  const preventDefaultAndStopPrograpagation = useCallback(
    (e: DragAndDropEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const handleDrop = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);

      console.log(
        "show all please ------> ",
        e.dataTransfer.files,
        e.dataTransfer.items
      );

      const file = e.dataTransfer.files[0];

      // ---------------------

      test(e);

      function test(e: DragAndDropEvent) {
        console.log("**********START**********: ", e);
        const items = Array.from(e.dataTransfer.items || []);
        // const abc = items[0]
        // if (!item || !item.length) console.log("browser not compatible!");
        if (!items.length) return;
        const entries = items.map((item) => item.webkitGetAsEntry());
        loadNextFileMap(entries);
      }

      function loadNextFileMap(
        entries: (FileSystemEntry | null)[],
        fileMap: FileMap = {}
      ): void {
        const entry = entries.pop();
        if (entry === undefined) return load(fileMap);
        if (entry === null) return loadNextFileMap(entries, fileMap);
        if (entry.isFile)
          return (entry as FileSystemFileEntry).file((file) => {
            loadNextFileMap(entries, { ...fileMap, [entry.fullPath]: file });
          });
        if (entry.isDirectory)
          return (entry as FileSystemDirectoryEntry)
            .createReader()
            .readEntries((entriesInFolder) => {
              entries.push(...entriesInFolder);
              loadNextFileMap(entries, fileMap);
            });
        loadNextFileMap(entries, fileMap);
      }

      function load(fileMap: FileMap) {
        console.log("this is obtained map:", fileMap);
        const root = Object.entries(fileMap).find(([_, file]) =>
          file.name.match(/\.(gltf|glb)$/)
        );
        console.log("show the abc ---->< ", root);
        if (!root) return console.log("no root found!");
        const rootFile = root[1];
        const rootPath = root[0].replace(rootFile.name, "");
        const rootBlob = window.URL.createObjectURL(rootFile);
        loader(rootBlob, rootPath, fileMap);
      }

      function loader(rootBlob: string, rootPath: string, fileMap: FileMap) {
        console.log("function: loader ", rootBlob, rootPath, fileMap);

        const baseURL = THREE.LoaderUtils.extractUrlBase(rootBlob);
        MANAGER.setURLModifier((url) => {
          if (url === rootBlob) {
            console.log("root detection: ");
            return url;
          }
          const normalizedUrl = rootPath + url.replace(baseURL, "");
          const file = fileMap[normalizedUrl];
          if (!file) {
            console.log("file cannot be found!");
            return "";
          }
          const blob = window.URL.createObjectURL(file);
          console.log("show the object url", blob);
          return blob;
        });
        const loader = new GLTFLoader(MANAGER).setCrossOrigin("anonymous");
        loader.load(rootBlob, (gltf) => {
          console.log("show the end", gltf);

          // const group = new THREE.Group();

          const scene = gltf.scene || gltf.scenes[0];

          console.log("show the validated scene: ", scene);

          // group.add(scene);

          // this.

          // const scene_ = new THREE.Scene();

          const child = scene.children[0];

          console.log("child", child);

          // scene_.add(scene);

          // scene.remove(child);

          const mat = new THREE.MeshPhongMaterial();

          console.log("show the children ------> ", scene.children);

          scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              console.log("show the material66666*************> ", obj);
              obj.material = mat;
              obj.castShadow = true;
              obj.receiveShadow = true;
            }
          });

          const mixer = new THREE.AnimationMixer(child);

          const animationAction = mixer.clipAction(gltf.animations[9]);

          console.log("animations: ", animationAction, gltf.animations);

          animationAction.reset().play();

          setInterval(() => {
            mixer.update(0.1);
          }, 100);

          dispatch(add(child));

          // setTimeout(() => {
          //   console.log("5 seconds!");
          //   dispatch(add(gltf.scene));
          // }, 5000);
        });
      }

      // if (file) {
      //   console.log("test start here -----> ");

      //   const items = e.dataTransfer.items;

      //   // const item = items;

      //   const abc = items[0];

      //   const item = items[0].webkitGetAsEntry();

      //   // const abc = file.web

      //   if (item?.isDirectory) {
      //     // const folder = item as FileSystemDirectoryEntry;
      //     const dirReader = (item as FileSystemDirectoryEntry).createReader();
      //     dirReader.readEntries((entries) => {
      //       console.log("show all ************", entries);
      //       entries.forEach((entry) => {
      //         console.log("show the content in here please!", entry);

      //         if (entry.isFile) {
      //           (entry as FileSystemFileEntry).file((file) => {
      //             console.log("ok sure! ", file);
      //           });
      //         }
      //       });
      //     });
      //   }

      //   // const abc = new FileReader()

      //   console.log("show the item: ", item);

      //   console.log("test ends here --------->");
      // }

      //----------------------

      return;

      if (file) dispatch(setFiles([file]));
      else dispatch(setFiles([]));
    },
    [preventDefaultAndStopPrograpagation, dispatch]
  );

  // https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree

  // function traverseFileTree(item, path) {
  //   path = path || "";
  //   if (item.isFile) {
  //     // Get file
  //     item.file(function(file) {
  //       console.log("File:", path + file.name);
  //     });
  //   } else if (item.isDirectory) {
  //     // Get folder contents
  //     var dirReader = item.createReader();
  //     dirReader.readEntries(function(entries) {
  //       for (var i=0; i<entries.length; i++) {
  //         traverseFileTree(entries[i], path + item.name + "/");
  //       }
  //     });
  //   }
  // }

  // dropArea.addEventListener("drop", function(event) {
  //   event.preventDefault();

  //   var items = event.dataTransfer.items;
  //   for (var i=0; i<items.length; i++) {
  //     // webkitGetAsEntry is where the magic happens
  //     var item = items[i].webkitGetAsEntry();
  //     if (item) {
  //       traverseFileTree(item);
  //     }
  //   }
  // }, false);

  const handleDragOver = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);
    },
    [preventDefaultAndStopPrograpagation]
  );

  const handleDragEnter = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);
    },
    [preventDefaultAndStopPrograpagation]
  );

  const handleDragLeave = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);
    },
    [preventDefaultAndStopPrograpagation]
  );

  const combinedStyle = useMemo(() => {
    return {
      ...{ width: "100%", height: "100%" },
      ...style,
    };
  }, [style]);

  return (
    <div
      style={combinedStyle}
      onDrop={enabled ? handleDrop : undefined}
      onDragOver={enabled ? handleDragOver : undefined}
      onDragEnter={enabled ? handleDragEnter : undefined}
      onDragLeave={enabled ? handleDragLeave : undefined}
    >
      {children}
    </div>
  );
}

// function getAsEntry(item: DataTransferItem) {
//   //

//   const entry = item.webkitGetAsEntry() as
//     | FileSystemEntry
//     | FileSystemDirectoryEntry
//     | null;

//   if (!entry) return entry;
//   else if (entry.isFile) return entry as FileSystemEntry;
//   else if (entry.isDirectory) return entry as FileSystemDirectoryEntry;
//   return null;

//   // return
// }

// interface EntryMap {
//   [path: string]: FileSystemFileEntry;
// }
