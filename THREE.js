import * as THREE from 'three'; // Importa todo el núcleo de Three.js bajo el namespace THREE
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.0001, 1000);
const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.AmbientLight(0xffffff, 0.55);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

// Configurar la escena
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x303030);

// Añadir controles para que el usuario pueda interactuar
controls.enableDamping = true; // Para un movimiento más suave
controls.dampingFactor = 0.05;

// Iluminación
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
directionalLight.position.set(1, 10, 2);

scene.add(light);
scene.add(directionalLight);

export {
    THREE,
    OrbitControls,
    GLTFLoader,
    scene,
    camera,
    renderer,
    raycaster,
    pointer,
    controls,
    light,
    directionalLight
};