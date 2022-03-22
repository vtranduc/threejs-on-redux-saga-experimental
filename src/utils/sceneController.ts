import * as THREE from "three";
import { Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class SceneController {
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  private renderer = new THREE.WebGLRenderer();
  private controls = new OrbitControls(this.camera, this.renderer.domElement);

  constructor() {
    this.addGrid();
    this.addLight();
    this.camera.position.set(0, 5, 5);
    this.renderer.setClearColor(0xf0f5f5);
    this.controls.update();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  private addGrid() {
    const grid = new THREE.GridHelper(50, 50);
    this.designateIsSetup(grid);
    this.scene.add(grid);
  }

  private addLight() {
    const ambient = new THREE.AmbientLight(undefined, 0.5);
    const directional = new THREE.DirectionalLight();
    directional.position.set(5, 5, 5);
    this.designateIsSetup(ambient);
    this.designateIsSetup(directional);
    this.scene.add(ambient);
    this.scene.add(directional);
  }

  private animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  private designateIsSetup(object: Object3D) {
    object.userData.isSetup = true;
  }

  public appendToDiv(div: HTMLDivElement) {
    const width = div.clientWidth;
    const height = div.clientHeight;
    const aspect = width / height;
    this.renderer.setSize(width, height);
    this.camera.aspect = aspect;
    div.appendChild(this.renderer.domElement);
  }

  public removeFromDiv(div: HTMLDivElement) {
    div.removeChild(this.renderer.domElement);
  }

  public add(object: THREE.Object3D) {
    this.scene.add(object);
  }

  public remove(object: THREE.Object3D) {
    this.scene.remove(object);
  }

  public clear() {
    this.scene.children
      .filter((object) => !object.userData.isSetup)
      .forEach((object) => this.scene.remove(object));
  }
}
