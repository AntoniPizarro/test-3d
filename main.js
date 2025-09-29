import { THREE, controls, GLTFLoader, scene, camera, renderer, light, directionalLight } from './THREE.js';
import { add_A320, addSphere } from './3d_objects.js';

document.addEventListener("wheel", function () { console.log(camera.position.x, camera.position.y, camera.position.z) });

// Añadir controles para que el usuario pueda interactuar
controls.enableDamping = true;

// Cargar modelos GLTF
const loader = new GLTFLoader();

loader.load("./PMI/pmi_huecos.glb", function (gltf) {
    let model = gltf.scene;

    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color: 0x158F00,
                metalness: 0,
                roughness: 1
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});
loader.load("./PMI/pmi_finguers.glb", function (gltf) {
    let model = gltf.scene;

    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color: 0xf0f0f0,
                metalness: 0,
                roughness: 1
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});
loader.load("./PMI/pmi_infrastructura.glb", function (gltf) {
    let model = gltf.scene;

    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color: 0xc0c0c0,
                metalness: 0,
                roughness: 1
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});
loader.load("./PMI/pmi_pista.glb", function (gltf) {
    let model = gltf.scene;

    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    model.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color: 0x404040,
                metalness: 0,
                roughness: 1
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(model);
}, undefined, function (error) {
    console.error(error);
});

add_A320(
    0.025,  // p_x
    0,  // p_y
    0.2,    // p_z
    0,      // r_x
    270,    // r_x
    0       // r_x
);
add_A320(
    0.025,  // p_x
    0,  // p_y
    0.125,  // p_z
    0,      // r_x
    270,    // r_x
    0       // r_x
);
add_A320(
    -0.56,  // p_x
    0,  // p_y
    0.475,    // p_z
    0,      // r_x
    180,    // r_x
    0       // r_x
);
add_A320(
    -0.731,  // p_x
    0,  // p_y
    0.475,    // p_z
    0,      // r_x
    180,    // r_x
    0       // r_x
);

// Aviones que se moverán
var aircrafts = [];

for (let index = 0; index < 50; index++) {
    aircrafts.push(await add_A320(0, 0, 0, 0, 0, 0));

}

// Posicionar la cámara
camera.position.x = 1.0734145097796197;
camera.position.y = 0.25597402526762036;
camera.position.z = 1.001128657357727;

// Posiciones
let pathPositions = [
    [
        -0.34,
        0,
        0.3
    ],
    [
        -0.34,
        0,
        0.5
    ],
    [
        0.13,
        0,
        0.5
    ],
    [
        0.13,
        0,
        0.39
    ],
    [
        0.24,
        0,
        0.39
    ],
    [
        0.24,
        0,
        -0.63
    ],
    [
        1.1,
        0,
        -0.63
    ],
    [
        1.35,
        0,
        -0.8
    ],
    [
        1.3,
        0,
        -0.86
    ],
    [
        -0.6,
        0,
        -0.86
    ],
    [
        -0.7,
        0.01,
        -0.86
    ],
    [
        -4,
        1,
        -0.86
    ],
    [
        -4,
        1,
        2.5
    ],
    [
        5,
        1,
        2.5
    ],
    [
        5,
        1,
        0.86
    ],
    [
        1.3,
        0.01,
        0.86
    ],
    [
        0.9,
        0,
        0.86
    ],
    [
        0,
        0,
        0.86
    ],
    [
        -0.3,
        0,
        0.65
    ]
];
const points = [];
pathPositions.forEach(xyz => {
    points.push(new THREE.Vector3(xyz[0], xyz[1], xyz[2]));
    //scene.add(addSphere(xyz[0], xyz[1], xyz[2], 0.01))
});
const path = new THREE.CatmullRomCurve3(points, true); // 'true' para cerrar la curva y hacerla circular/cíclica
path.curveType = "catmullrom";
path.tension = 0;

function animate() {
    requestAnimationFrame(animate);

    // Calcula el progreso 't' (valor entre 0 y 1 que cambia con el tiempo)
    const time = Date.now();
    const speed = 100000; // Por ejemplo, 5000 ms (5 segundos) para dar una vuelta completa
    var t = (time % speed) / speed; // Esto asegura que 't' sea siempre entre 0 y 1

    let iteration = 0;
    aircrafts.forEach(a320 => {
        t = (t + iteration) % 1;

        // Asumiendo que 'a320' es el objeto que se mueve y 'a320Position' es su nueva posición calculada.
        var a320Position = path.getPointAt(t);
        a320.position.copy(a320Position);

        // Aplica la posición al objeto (e.g., una malla llamada 'a320')
        var position = path.getPointAt(t);
        // Obtiene la posición en la curva para el valor 't'
        a320.position.copy(position);

        // Opcional: Orientar el objeto para que mire en la dirección del camino (tangente)
        var tangent = path.getTangentAt(t).normalize();
        var lookAtPoint = position.clone().add(tangent);
        a320.lookAt(lookAtPoint);
        iteration += 1 / aircrafts.length;
    });

    controls.update();

    renderer.render(scene, camera);
}
animate();