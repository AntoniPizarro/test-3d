import { THREE, scene, GLTFLoader } from './THREE.js';
import { degToRad, radToDeg } from './common.js';

const loader = new GLTFLoader();

function addSphere(pos_X, pos_Y, pos_Z, radius) {
    const geometry = new THREE.SphereGeometry(radius, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(pos_X, pos_Y, pos_Z); // El cubo se colocará en (5, 2, -3)

    return sphere;
}

function add_A320(pos_x, pos_y, pos_z, rot_x, rot_y, rot_z) {
    // Retornamos una nueva Promesa
    return new Promise((resolve, reject) => {
        loader.load("./aviones/A320.glb", function (gltf) {
            let model = gltf.scene;

            model.position.set(pos_x, pos_y, pos_z);
            model.rotation.x = degToRad(rot_x);
            model.rotation.y = degToRad(rot_y);
            model.rotation.z = degToRad(rot_z);
            model.scale.set(0.005, 0.005, 0.005);

            model.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0x7575FF,
                        metalness: 0,
                        roughness: 1
                    });
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            scene.add(model);

            // Cuando la carga y configuración terminan, resolvemos la Promesa con el modelo
            resolve(model);

        }, undefined, function (error) {
            console.error(error);
            // Si hay un error, rechazamos la Promesa
            reject(error);
        });
    });
}

export { add_A320, addSphere };