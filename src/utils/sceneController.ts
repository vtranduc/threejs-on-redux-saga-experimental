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
  private lightAngle = 0;
  private orbitLight: THREE.DirectionalLight;

  constructor() {
    this.addGrid();
    this.addLight();
    this.orbitLight = this.getDirectionalLight();
    this.updateLightAngle();
    this.scene.add(this.orbitLight);
    this.camera.position.set(0, 5, 5);
    this.renderer.setClearColor(0xf0f5f5);
    this.renderer.shadowMap.enabled = true;
    this.controls.update();
    this.animate = this.animate.bind(this);
    this.animate();
  }

  private addGrid() {
    const grid = new THREE.GridHelper(50, 50);
    this.designateIsSetup(grid);
    this.scene.add(grid);
  }

  private getDirectionalLight() {
    const directional = new THREE.DirectionalLight();
    directional.castShadow = true;
    this.designateIsSetup(directional);
    directional.lookAt(0, 0, 0);
    return directional;
  }

  private updateLightAngle() {
    this.lightAngle = (this.lightAngle + 0.01) % (2 * Math.PI);
    this.orbitLight.position.set(
      50 * Math.cos(this.lightAngle),
      25,
      50 * Math.sin(this.lightAngle)
    );
  }

  private addLight() {
    const ambient = new THREE.AmbientLight(undefined, 0.5);
    this.designateIsSetup(ambient);
    this.scene.add(ambient);
  }

  private animate() {
    requestAnimationFrame(this.animate);
    this.updateLightAngle();
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
    console.log("show object being added here: ", object);

    this.scene.add(object);
  }

  public remove(object: THREE.Object3D) {
    this.scene.remove(object);
  }

  public clear() {
    this.scene.children
      .filter((object) => !this.isSetup(object))
      .forEach((object) => this.remove(object));
  }
}
