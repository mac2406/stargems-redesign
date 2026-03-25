import * as THREE from 'https://cdn.skypack.dev/three@0.133.1/build/three.module';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls';
import * as BufferGeometryUtils from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/utils/BufferGeometryUtils.js';

let renderer, scene, camera, controls, clock;
let ringGroup, textureCrystal, textureRing;
let isInitialized = false;

// Configuration
const CONFIG = {
    ringGeom: new THREE.TorusGeometry(0.5, 0.15, 16, 100),
    mirrorSize: 0.08,
    crystalMatcap: 'https://assets.codepen.io/959327/matcap-crystal.png'
};

export function init3D(canvasEl, ringImgSrc) {
    if (isInitialized) return;

    renderer = new THREE.WebGLRenderer({
        canvas: canvasEl,
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    scene = new THREE.Scene();
    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(45, canvasEl.clientWidth / canvasEl.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 2.5);

    controls = new OrbitControls(camera, canvasEl);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 4;

    const loader = new THREE.TextureLoader();
    
    // Load Matcap and Ring Texture
    Promise.all([
        new Promise((resolve, reject) => loader.load(CONFIG.crystalMatcap, resolve, undefined, reject)),
        new Promise((resolve, reject) => loader.load(ringImgSrc, resolve, undefined, reject))
    ]).then(([crystal, ring]) => {
        textureCrystal = crystal;
        textureRing = ring;
        
        createRingScene();
        isInitialized = true;
        
        // Final layout force
        onResize();
        animate();
        console.log("3D Viewer Initialized");
    }).catch(err => {
        console.error("Three.js Texture Load Error:", err);
    });

    window.addEventListener('resize', onResize);
    // Self-correct after a short delay for CSS transitions
    setTimeout(onResize, 100);
}

function createRingScene() {
    ringGroup = new THREE.Group();
    
    // The Core - The Ring Image
    // We use a high-fidelity plane to display the actual product photography
    const coreMat = new THREE.MeshBasicMaterial({
        map: textureRing,
        transparent: true,
        side: THREE.DoubleSide
    });
    
    // Slightly larger for better detail visible in the fixed hero area
    const coreGeom = new THREE.PlaneGeometry(1.6, 1.6);
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    
    ringGroup.add(coreMesh);
    scene.add(ringGroup);
    
    // Set background to match page
    scene.background = new THREE.Color(0xf8f6f3);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (ringGroup) {
        const delta = clock.getDelta();
        // ringGroup.rotateY(delta * 0.2); 
    }
    
    controls.update();
    renderer.render(scene, camera);
}

function onResize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
}

// Handle Auto-Rotate from external buttons
window.addEventListener('toggleThreeRotate', (e) => {
    if (controls) controls.autoRotate = e.detail.active;
});
