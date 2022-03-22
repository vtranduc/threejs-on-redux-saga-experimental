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
    this.designateIsSetup(ambient);
    this.scene.add(ambient);

    const directional1 = new THREE.DirectionalLight();
    directional1.position.set(50, 50, 50);
    this.designateIsSetup(directional1);
    directional1.lookAt(0, 0, 0);
    this.scene.add(directional1);

    const directional2 = new THREE.DirectionalLight();
    directional2.position.set(-50, 50, 50);
    this.designateIsSetup(directional2);
    directional2.lookAt(0, 0, 0);
    this.scene.add(directional2);

    const directional3 = new THREE.DirectionalLight();
    directional3.position.set(50, 50, -50);
    this.designateIsSetup(directional3);
    directional3.lookAt(0, 0, 0);
    this.scene.add(directional3);

    const directional4 = new THREE.DirectionalLight();
    directional4.position.set(-50, 50, -50);
    this.designateIsSetup(directional4);
    directional4.lookAt(0, 0, 0);
    this.scene.add(directional4);
  }

  private animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  private designateIsSetup(object: Object3D) {
    object.userData.isSetup = true;
  }

  private isSetup(object: Object3D) {
    return !!object.userData.isSetup;
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
      .filter((object) => !this.isSetup(object))
      .forEach((object) => this.scene.remove(object));
  }
}
