////- Importing the goods -///
import * as THREE from "three"; //this loads the main threejs library
import { OBJLoader } from "three/addons/loaders/OBJLoader.js"; //this loads the obj loader plugin

window.addEventListener("load", init);

let scene;
let camera;
let renderer;
let mesh;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 40;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  // const controls = new THREE.OrbitControls(camera)
  // controls.enableZoom = false

  scene.add(new THREE.AmbientLight(0x404040));

  // const loader = new THREE.OBJLoader();
  const loader = new OBJLoader();
  loader.load(
    "models/untitled.obj",
    (obj) => {
      let material = new THREE.PointsMaterial({ color: 0xcccccc, size: 0.25 });
      mesh = new THREE.Points(obj.children[0].geometry, material);
      // mesh.position.y = -5
      scene.add(mesh);

      mesh.scale.set(10, 10, 10);
    },
    (xhr) => {
      console.log(xhr);
    },
    (err) => {
      console.error("loading .obj went wrong, ", err);
    }
  );

  document.body.appendChild(renderer.domElement);
  animationLoop();
}

function animationLoop() {
  renderer.render(scene, camera);
  if (mesh) {
    mesh.rotation.y += 0.002;
  }

  requestAnimationFrame(animationLoop);
}

// //Respond to Window Resizing
// window.addEventListener("resize", onWindowResize);

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
//   animationLoop();
// }
