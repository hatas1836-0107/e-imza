/**
 * 3D Showcase for Index Page
 * Rotating product models with mouse interaction
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

console.log('🎬 3D Showcase initializing...');

const canvas = document.getElementById('showcaseCanvas');
if (!canvas) {
    console.error('❌ Showcase canvas not found');
}

// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0b0e1a, 5, 15);

// Sizes
const sizes = {
    width: canvas.offsetWidth,
    height: canvas.offsetHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 4;
camera.position.y = 0.5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
mainLight.position.set(3, 3, 2);
scene.add(mainLight);

const rimLight1 = new THREE.DirectionalLight(0x667eea, 0.8);
rimLight1.position.set(-3, 2, -2);
scene.add(rimLight1);

const rimLight2 = new THREE.DirectionalLight(0x764ba2, 0.6);
rimLight2.position.set(0, -2, -3);
scene.add(rimLight2);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
    color: 0x667eea,
    size: 0.025,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Model Group
const modelsGroup = new THREE.Group();
scene.add(modelsGroup);

// Load Models
const loader = new GLTFLoader();
let flashDrive, laptop;
let modelsLoaded = 0;
const totalModels = 2;

canvas.classList.add('loading');

function onModelLoaded() {
    modelsLoaded++;
    if (modelsLoaded === totalModels) {
        canvas.classList.remove('loading');
        canvas.classList.add('loaded');
        console.log('✅ All showcase models loaded');
    }
}

// Load Flash Drive
loader.load(
    'flash_driver_for_relax.glb',
    (gltf) => {
        flashDrive = gltf.scene;
        
        // Scale and position
        const box = new THREE.Box3().setFromObject(flashDrive);
        const size = box.getSize(new THREE.Vector3());
        const scale = 1.2 / Math.max(size.x, size.y, size.z);
        flashDrive.scale.setScalar(scale);
        
        flashDrive.position.x = -1.5;
        flashDrive.rotation.y = Math.PI * 0.3;
        
        // Enhance materials
        flashDrive.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.metalness = 0.7;
                child.material.roughness = 0.3;
            }
        });
        
        modelsGroup.add(flashDrive);
        onModelLoaded();
        console.log('✅ Flash drive loaded');
    },
    undefined,
    (error) => {
        console.error('❌ Flash drive error:', error);
        onModelLoaded();
    }
);

// Load Laptop
loader.load(
    'laptop/scene.gltf',
    (gltf) => {
        laptop = gltf.scene;
        
        // Scale and position
        const box = new THREE.Box3().setFromObject(laptop);
        const size = box.getSize(new THREE.Vector3());
        const scale = 1.5 / Math.max(size.x, size.y, size.z);
        laptop.scale.setScalar(scale);
        
        laptop.position.x = 1.5;
        laptop.rotation.y = Math.PI * -0.2;
        
        // Enhance materials
        laptop.traverse((child) => {
            if (child.isMesh && child.material) {
                child.material.metalness = 0.6;
                child.material.roughness = 0.4;
            }
        });
        
        modelsGroup.add(laptop);
        onModelLoaded();
        console.log('✅ Laptop loaded');
    },
    undefined,
    (error) => {
        console.error('❌ Laptop error:', error);
        onModelLoaded();
    }
);

// Mouse tracking
const mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();
    
    // Rotate models group
    modelsGroup.rotation.y = elapsedTime * 0.15;
    
    // Mouse parallax
    modelsGroup.rotation.x = mouse.y * 0.2;
    modelsGroup.rotation.y += mouse.x * 0.3;
    
    // Individual model animations
    if (flashDrive) {
        flashDrive.position.y = Math.sin(elapsedTime * 0.8) * 0.15;
    }
    
    if (laptop) {
        laptop.position.y = Math.cos(elapsedTime * 0.6) * 0.12;
    }
    
    // Particles rotation
    particles.rotation.y = elapsedTime * 0.03;
    particles.rotation.x = elapsedTime * 0.01;
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Responsive
window.addEventListener('resize', () => {
    sizes.width = canvas.offsetWidth;
    sizes.height = canvas.offsetHeight;
    
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Intersection Observer for performance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            renderer.setAnimationLoop(animate);
        } else {
            renderer.setAnimationLoop(null);
        }
    });
}, { threshold: 0.1 });

observer.observe(canvas);

console.log('✅ 3D Showcase ready');
