import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const canvas = document.querySelector('.webgl');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 8);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2.2;

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.8, 1.2, 0.4
));

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 6);
keyLight.position.set(15, 15, 12);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x6366f1, 5);
fillLight.position.set(-12, 10, -10);
scene.add(fillLight);

const rimLight = new THREE.SpotLight(0x8b5cf6, 10);
rimLight.position.set(0, 18, -15);
scene.add(rimLight);

const accentLight1 = new THREE.PointLight(0xec4899, 8, 25);
scene.add(accentLight1);

const accentLight2 = new THREE.PointLight(0x22d3ee, 6, 20);
scene.add(accentLight2);

// USB Model + Delivery Journey
let usb = null;
let terrarium = null;
let spaceship = null;
let motorcycle = null;
let scooter = null;
let terem = null;
let scooterMixer = null;
let motorcycleMixer = null;

const manager = new THREE.LoadingManager();
const gltfLoader = new GLTFLoader(manager);
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load('flash_driver_for_relax.glb', (gltf) => {
    usb = gltf.scene;
    const box = new THREE.Box3().setFromObject(usb);
    const center = box.getCenter(new THREE.Vector3());
    usb.position.sub(center);
    const size = box.getSize(new THREE.Vector3());
    const scale = 1 / Math.max(size.x, size.y, size.z);
    usb.scale.setScalar(scale);
    usb.position.set(0, 0, 0);
    usb.rotation.z = Math.PI * 0.5;
    usb.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.metalness = 0.95;
            child.material.roughness = 0.05;
            child.material.envMapIntensity = 5;
            child.material.needsUpdate = true;
        }
    });
    scene.add(usb);
    console.log('✓ USB LOADED');
});

// SECTION 1: Terrarium packaging
gltfLoader.load('smol_ame_in_an_upcycled_terrarium_hololiveen.glb', (gltf) => {
    terrarium = gltf.scene;
    const box = new THREE.Box3().setFromObject(terrarium);
    const size = box.getSize(new THREE.Vector3());
    const scale = 2 / Math.max(size.x, size.y, size.z);
    terrarium.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3());
    terrarium.position.sub(center);
    terrarium.position.set(-5, 0, -2);
    terrarium.visible = false;
    scene.add(terrarium);
    console.log('✓ TERRARIUM LOADED');
});

// SECTION 2: Spaceship warehouse
gltfLoader.load('star_citizen_workflow_to_sketchfab__-_decals_3.glb', (gltf) => {
    spaceship = gltf.scene;
    const box = new THREE.Box3().setFromObject(spaceship);
    const size = box.getSize(new THREE.Vector3());
    const scale = 3 / Math.max(size.x, size.y, size.z);
    spaceship.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3());
    spaceship.position.sub(center);
    spaceship.position.set(0, 5, -5);
    spaceship.rotation.x = -Math.PI * 0.2;
    spaceship.visible = false;
    scene.add(spaceship);
    console.log('✓ SPACESHIP LOADED');
});

// SECTION 3: Motorcycle courier
gltfLoader.load('scooter_motorcycle.glb', (gltf) => {
    motorcycle = gltf.scene;
    const box = new THREE.Box3().setFromObject(motorcycle);
    const size = box.getSize(new THREE.Vector3());
    const scale = 1.5 / Math.max(size.x, size.y, size.z);
    motorcycle.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3());
    motorcycle.position.sub(center);
    motorcycle.position.set(-8, -1, -2);
    motorcycle.rotation.y = Math.PI * 0.3;
    motorcycle.visible = false;
    if (gltf.animations && gltf.animations.length > 0) {
        motorcycleMixer = new THREE.AnimationMixer(motorcycle);
        gltf.animations.forEach((clip) => {
            const action = motorcycleMixer.clipAction(clip);
            action.play();
        });
    }
    scene.add(motorcycle);
    console.log('✓ MOTORCYCLE LOADED');
});

// SECTION 4: Scooter delivery
gltfLoader.load('low-poly_honda_motocompo.glb', (gltf) => {
    scooter = gltf.scene;
    const box = new THREE.Box3().setFromObject(scooter);
    const size = box.getSize(new THREE.Vector3());
    const scale = 1.2 / Math.max(size.x, size.y, size.z);
    scooter.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3());
    scooter.position.sub(center);
    scooter.position.set(-8, -2, -1);
    scooter.rotation.y = Math.PI * 0.25;
    scooter.visible = false;
    if (gltf.animations && gltf.animations.length > 0) {
        scooterMixer = new THREE.AnimationMixer(scooter);
        gltf.animations.forEach((clip) => {
            const action = scooterMixer.clipAction(clip);
            action.play();
        });
    }
    scene.add(scooter);
    console.log('✓ SCOOTER LOADED');
});

// SECTION 5: Final delivery house
gltfLoader.load('terem.glb', (gltf) => {
    terem = gltf.scene;
    const box = new THREE.Box3().setFromObject(terem);
    const size = box.getSize(new THREE.Vector3());
    const scale = 2.5 / Math.max(size.x, size.y, size.z);
    terem.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3());
    terem.position.sub(center);
    terem.position.set(3, -3, -4);
    terem.visible = false;
    scene.add(terem);
    console.log('✓ HOUSE LOADED');
});

// Scroll & Mouse
let currentScroll = 0;
let targetScroll = 0;
const mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetScroll = window.scrollY / maxScroll;
    
    // ORYZO-style: Each section has unique entrance animation
    document.querySelectorAll('.section').forEach((section, sectionIndex) => {
        const rect = section.getBoundingClientRect();
        const content = section.querySelector('.content');
        const h1 = content.querySelector('h1');
        const p = content.querySelector('p');
        
        // Calculate section visibility progress (0 = offscreen, 1 = center)
        const viewportCenter = window.innerHeight / 2;
        const sectionCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);
        const progress = Math.max(0, 1 - distanceFromCenter / (window.innerHeight * 0.8));
        
        // Different entrance style per section
        if (h1 && p) {
            switch(sectionIndex) {
                case 0: // SLIDE FROM RIGHT + FADE
                    const slideX = (1 - progress) * 200;
                    h1.style.transform = `translateX(${slideX}px) scale(${0.8 + progress * 0.2})`;
                    p.style.transform = `translateX(${slideX * 0.7}px)`;
                    h1.style.opacity = progress;
                    p.style.opacity = progress * 0.9;
                    break;
                    
                case 1: // SCALE UP FROM CENTER
                    const scale1 = 0.5 + progress * 0.5;
                    h1.style.transform = `scale(${scale1}) rotateZ(${(1 - progress) * 10}deg)`;
                    p.style.transform = `scale(${scale1 * 0.9})`;
                    h1.style.opacity = progress;
                    p.style.opacity = progress;
                    break;
                    
                case 2: // SLIDE FROM LEFT + ROTATE
                    const slideX2 = -(1 - progress) * 200;
                    const rotate2 = (1 - progress) * -15;
                    h1.style.transform = `translateX(${slideX2}px) rotateY(${rotate2}deg)`;
                    p.style.transform = `translateX(${slideX2 * 0.8}px)`;
                    h1.style.opacity = progress;
                    p.style.opacity = progress * 0.85;
                    break;
                    
                case 3: // FADE + VERTICAL SLIDE
                    const slideY = (1 - progress) * 150;
                    h1.style.transform = `translateY(${slideY}px) scale(${0.9 + progress * 0.1})`;
                    p.style.transform = `translateY(${slideY * 1.2}px)`;
                    h1.style.opacity = progress;
                    p.style.opacity = progress * 0.8;
                    break;
                    
                case 4: // BLUR TO FOCUS
                    const scale4 = 0.7 + progress * 0.3;
                    const blur = (1 - progress) * 10;
                    h1.style.transform = `scale(${scale4})`;
                    p.style.transform = `scale(${scale4 * 1.05})`;
                    h1.style.filter = `blur(${blur}px)`;
                    p.style.filter = `blur(${blur * 0.7}px)`;
                    h1.style.opacity = progress;
                    p.style.opacity = progress;
                    break;
            }
            
            // Mark as visible for initial animation
            if (progress > 0.1) {
                content.classList.add('visible');
            }
        }
    });
});

// Per-section delivery journey with CINEMATIC composition
const deliveryStory = [
    {
        // Section 0: USB SHOWCASE - Center stage spotlight
        usb: { scale: 0.015, posX: 0, posY: 0, posZ: 2, rotSpeedY: 0.8, visible: true },
        camera: { x: 0, y: 0, z: 8 },
        lights: { keyIntensity: 8, fillColor: 0x6366f1, accentColor: 0xec4899 }
    },
    {
        // Section 1: TERRARIUM PACKAGING - Side by side
        usb: { scale: 0.010, posX: 1.5, posY: 0.3, posZ: 0, rotSpeedY: 0.5, visible: true },
        terrarium: { posX: -1.5, posY: 0, posZ: 0, rotY: 0.5, scale: 1.8, visible: true },
        camera: { x: 0, y: 0.5, z: 7 },
        lights: { keyIntensity: 10, fillColor: 0x22d3ee, accentColor: 0x10b981 }
    },
    {
        // Section 2: SPACESHIP LAUNCH - USB loading, ship taking off
        usb: { scale: 0.006, posX: 0, posY: -1, posZ: -2, rotSpeedY: 2, visible: true },
        spaceship: { posX: 0, posY: 2, posZ: -3, rotX: -0.3, rotZ: 0.1, scale: 2.5, visible: true },
        camera: { x: 2, y: 1, z: 6 },
        lights: { keyIntensity: 12, fillColor: 0x8b5cf6, accentColor: 0x3b82f6 }
    },
    {
        // Section 3: MOTORCYCLE ARRIVAL - Bike enters, USB waiting
        usb: { scale: 0.008, posX: 2, posY: -0.5, posZ: -1, rotSpeedY: 1, visible: true },
        motorcycle: { posX: -3, posY: -1, posZ: 0, rotY: 0.3, scale: 1.3, visible: true },
        camera: { x: -1, y: 0, z: 7 },
        lights: { keyIntensity: 9, fillColor: 0xf59e0b, accentColor: 0xef4444 }
    },
    {
        // Section 4: SCOOTER DELIVERY - USB on scooter, moving forward
        usb: { scale: 0.009, posX: -2, posY: -1, posZ: 0, rotSpeedY: 0.8, visible: true },
        scooter: { posX: -2.5, posY: -1.8, posZ: 0, rotY: 0.2, scale: 1.0, visible: true },
        camera: { x: 1, y: -0.5, z: 6 },
        lights: { keyIntensity: 10, fillColor: 0x06b6d4, accentColor: 0x8b5cf6 }
    },
    {
        // Section 5: DELIVERED TO HOUSE - USB at door, house in back
        usb: { scale: 0.012, posX: 1, posY: -2, posZ: -1, rotSpeedY: 0.3, visible: true },
        terem: { posX: -1, posY: -2.5, posZ: -5, rotY: 0.2, scale: 2.0, visible: true },
        camera: { x: 0, y: -1, z: 5 },
        lights: { keyIntensity: 8, fillColor: 0x10b981, accentColor: 0xfbbf24 }
    }
];

// Smooth interpolated values for cinematic transitions
let currentPos = { x: 0, y: 0, z: 0 };
let currentRot = { x: 0, y: 0, z: 0 };
let currentScale = 1;
let currentCameraPos = { x: 0, y: 0, z: 8 };

// Animation
const tick = () => {
    // SUPER SMOOTH scroll interpolation
    currentScroll += (targetScroll - currentScroll) * 0.05;
    
    const clock = performance.now() * 0.001;
    
    // Update animation mixers
    if (scooterMixer) scooterMixer.update(0.016);
    if (motorcycleMixer) motorcycleMixer.update(0.016);
    
    // Calculate current section and progress
    const totalSections = deliveryStory.length;
    const sectionIndex = Math.min(Math.floor(currentScroll * totalSections), totalSections - 1);
    const nextIndex = Math.min(sectionIndex + 1, totalSections - 1);
    const sectionProgress = (currentScroll * totalSections) % 1;
    
    const currentStory = deliveryStory[sectionIndex];
    const nextStory = deliveryStory[nextIndex];
    
    // Smooth easing
    const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const t = ease(sectionProgress);
    
    // USB ANIMATION
    if (usb && currentStory.usb) {
        const usbCurrent = currentStory.usb;
        const usbNext = nextStory.usb || usbCurrent;
        
        // Smooth transitions
        const targetScale = THREE.MathUtils.lerp(usbCurrent.scale, usbNext.scale, t);
        const targetPosX = THREE.MathUtils.lerp(usbCurrent.posX, usbNext.posX, t);
        const targetPosY = THREE.MathUtils.lerp(usbCurrent.posY, usbNext.posY, t);
        const targetPosZ = THREE.MathUtils.lerp(usbCurrent.posZ, usbNext.posZ, t);
        
        currentScale += (targetScale - currentScale) * 0.08;
        currentPos.x += (targetPosX - currentPos.x) * 0.08;
        currentPos.y += (targetPosY - currentPos.y) * 0.08;
        currentPos.z += (targetPosZ - currentPos.z) * 0.08;
        
        usb.scale.setScalar(currentScale);
        usb.position.set(currentPos.x, currentPos.y, currentPos.z);
        
        // Rotation
        usb.rotation.y = clock * usbCurrent.rotSpeedY + mouse.x * 0.5;
        usb.rotation.x = Math.sin(clock * 0.5) * 0.2 + mouse.y * 0.3;
        usb.rotation.z = Math.PI * 0.5 + Math.cos(clock * 0.3) * 0.1;
        
        usb.visible = usbCurrent.visible;
    }
    
    // TERRARIUM - Section 1
    if (terrarium) {
        const show = currentStory.terrarium?.visible;
        terrarium.visible = show || false;
        
        if (show && currentStory.terrarium) {
            const config = currentStory.terrarium;
            terrarium.position.x = config.posX + Math.sin(clock * 0.8) * 0.1;
            terrarium.position.y = config.posY + Math.cos(clock * 1.2) * 0.08;
            terrarium.position.z = config.posZ;
            terrarium.rotation.y = clock * 0.3 + config.rotY;
            terrarium.scale.setScalar(config.scale);
        }
    }
    
    // SPACESHIP - Section 2 (taking off)
    if (spaceship) {
        const show = currentStory.spaceship?.visible;
        spaceship.visible = show || false;
        
        if (show && currentStory.spaceship) {
            const config = currentStory.spaceship;
            const takeoffProgress = sectionProgress;
            
            spaceship.position.x = config.posX + takeoffProgress * 2;
            spaceship.position.y = config.posY + takeoffProgress * 6; // Flying up
            spaceship.position.z = config.posZ - takeoffProgress * 5;
            spaceship.rotation.x = config.rotX + Math.sin(clock) * 0.05;
            spaceship.rotation.z = config.rotZ + takeoffProgress * 0.3;
            spaceship.scale.setScalar(config.scale);
            
            // Engine glow effect
            spaceship.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.emissive = new THREE.Color(0x3b82f6);
                    child.material.emissiveIntensity = 0.5 + takeoffProgress * 1.5;
                }
            });
        }
    }
    
    // MOTORCYCLE - Section 3 (driving in)
    if (motorcycle) {
        const show = currentStory.motorcycle?.visible;
        motorcycle.visible = show || false;
        
        if (show && currentStory.motorcycle) {
            const config = currentStory.motorcycle;
            const driveProgress = sectionProgress;
            
            motorcycle.position.x = THREE.MathUtils.lerp(-6, config.posX, driveProgress);
            motorcycle.position.y = config.posY + Math.sin(clock * 4) * 0.08; // Bounce
            motorcycle.position.z = config.posZ;
            motorcycle.rotation.y = config.rotY + Math.sin(clock * 2) * 0.03;
            motorcycle.rotation.z = Math.sin(clock * 3) * 0.02;
            motorcycle.scale.setScalar(config.scale);
            
            // Headlight glow
            motorcycle.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.emissive = new THREE.Color(0xfbbf24);
                    child.material.emissiveIntensity = 0.3;
                }
            });
        }
    }
    
    // SCOOTER - Section 4 (delivering)
    if (scooter) {
        const show = currentStory.scooter?.visible;
        scooter.visible = show || false;
        
        if (show && currentStory.scooter) {
            const config = currentStory.scooter;
            const deliverProgress = sectionProgress;
            
            scooter.position.x = THREE.MathUtils.lerp(-5, config.posX, deliverProgress);
            scooter.position.y = config.posY + Math.sin(clock * 5) * 0.06;
            scooter.position.z = config.posZ;
            scooter.rotation.y = config.rotY + Math.cos(clock * 1.5) * 0.02;
            scooter.scale.setScalar(config.scale);
            
            // Tail light
            scooter.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.emissive = new THREE.Color(0xef4444);
                    child.material.emissiveIntensity = 0.4;
                }
            });
        }
    }
    
    // HOUSE - Section 5 (destination)
    if (terem) {
        const show = currentStory.terem?.visible;
        terem.visible = show || false;
        
        if (show && currentStory.terem) {
            const config = currentStory.terem;
            terem.position.set(config.posX, config.posY, config.posZ);
            terem.rotation.y = config.rotY + Math.sin(clock * 0.3) * 0.02;
            terem.scale.setScalar(config.scale);
            
            // Warm house lights
            terem.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.emissive = new THREE.Color(0xfbbf24);
                    child.material.emissiveIntensity = 0.2;
                }
            });
        }
    }
    
    // CINEMATIC CAMERA
    if (currentStory.camera) {
        const camCurrent = currentStory.camera;
        const camNext = nextStory.camera || camCurrent;
        
        const targetCamX = THREE.MathUtils.lerp(camCurrent.x, camNext.x, t);
        const targetCamY = THREE.MathUtils.lerp(camCurrent.y, camNext.y, t);
        const targetCamZ = THREE.MathUtils.lerp(camCurrent.z, camNext.z, t);
        
        currentCameraPos.x += (targetCamX - currentCameraPos.x) * 0.05;
        currentCameraPos.y += (targetCamY - currentCameraPos.y) * 0.05;
        currentCameraPos.z += (targetCamZ - currentCameraPos.z) * 0.05;
        
        camera.position.set(
            currentCameraPos.x + mouse.x * 0.3,
            currentCameraPos.y + mouse.y * 0.3,
            currentCameraPos.z
        );
        camera.lookAt(0, 0, 0);
    }
    
    // DYNAMIC LIGHTS per story
    if (currentStory.lights) {
        const lights = currentStory.lights;
        keyLight.intensity = lights.keyIntensity;
        fillLight.color = new THREE.Color(lights.fillColor);
        accentLight1.color = new THREE.Color(lights.accentColor);
        
        // Pulsing
        rimLight.intensity = 8 + Math.sin(clock * 2) * 3;
        accentLight1.position.set(
            Math.sin(clock * 1.2) * 5,
            Math.cos(clock * 1.5) * 4,
            3
        );
        accentLight2.position.set(
            Math.cos(clock * 1.8) * 4,
            Math.sin(clock * 1.4) * 5,
            2
        );
    }
    
    composer.render();
    requestAnimationFrame(tick);
};

tick();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
});
