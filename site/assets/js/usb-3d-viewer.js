/**
 * 🎬 USB STICK 3D SHOWCASE WITH REAL SCROLL ANIMATIONS
 * Professional product presentation with dynamic movements
 */

(function() {
  'use strict';

  let scene, camera, renderer, usbModel, mixer, clock;
  let container, isInitialized = false;
  let animationFrameId = null;

  // Ultra smooth interpolation
  const LERP = 0.08;

  // Current animation state
  const state = {
    scroll: 0,
    target: { rotX: 0, rotY: 0, rotZ: 0, posX: 0, posY: 0, posZ: 0, scale: 1, camZ: 12 },
    current: { rotX: 0, rotY: 0, rotZ: 0, posX: 0, posY: 0, posZ: 0, scale: 1, camZ: 12 }
  };

  // Mouse parallax
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Load Three.js
  function loadThreeJS(callback) {
    if (window.THREE) {
      callback();
      return;
    }

    const importMap = document.createElement('script');
    importMap.type = 'importmap';
    importMap.textContent = JSON.stringify({
      imports: {
        'three': 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
        'three/addons/': 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/'
      }
    });
    document.head.appendChild(importMap);

    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import * as THREE from 'three';
      import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
      window.THREE = THREE;
      window.GLTFLoader = GLTFLoader;
      window.dispatchEvent(new Event('threeLoaded'));
    `;
    document.head.appendChild(script);
    
    window.addEventListener('threeLoaded', callback, { once: true });
  }

  function initViewer(containerId) {
    container = document.getElementById(containerId);
    if (!container || isInitialized) return;

    console.log('🎬 USB 3D Viewer initializing...');

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    scene = new window.THREE.Scene();
    
    // Camera
    camera = new window.THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2, state.current.camZ);

    // Renderer
    renderer = new window.THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = window.THREE.SRGBColorSpace;
    renderer.toneMapping = window.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new window.THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(8, 6, 5);
    scene.add(keyLight);

    const rimLight1 = new window.THREE.DirectionalLight(0x4f46e5, 1.5);
    rimLight1.position.set(-6, 2, -4);
    scene.add(rimLight1);

    const rimLight2 = new window.THREE.DirectionalLight(0x06b6d4, 1.2);
    rimLight2.position.set(6, -3, -5);
    scene.add(rimLight2);

    // Load GLB
    const loader = new window.GLTFLoader();
    loader.load(
      'assets/models/usb-stick_animation.glb?v=4',
      (gltf) => {
        usbModel = gltf.scene;
        
        // Center model
        const box = new window.THREE.Box3().setFromObject(usbModel);
        const center = box.getCenter(new window.THREE.Vector3());
        const size = box.getSize(new window.THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        const scale = 6 / maxDim;
        usbModel.scale.setScalar(scale);
        usbModel.position.sub(center.multiplyScalar(scale));
        
        // Initial rotation - STANDING UPRIGHT
        usbModel.rotation.x = Math.PI * 0.5;  // 90 degrees - standing up
        usbModel.rotation.y = 0;
        usbModel.rotation.z = 0;
        
        scene.add(usbModel);

        // Animations
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new window.THREE.AnimationMixer(usbModel);
          gltf.animations.forEach(clip => {
            mixer.clipAction(clip).play();
          });
        }

        isInitialized = true;
        console.log('✅ USB 3D Model loaded and STANDING!');
        
        // Force initial scroll calculation
        updateScrollAnimation();
      },
      (progress) => {
        console.log(`📦 Loading: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
      },
      (error) => {
        console.error('❌ Error loading model:', error);
      }
    );

    clock = new window.THREE.Clock();

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onWindowResize, false);

    animate();
  }

  // SCROLL ANIMATION - MODERN PRODUCT SHOWCASE
  function updateScrollAnimation() {
    const scroll = state.scroll;
    
    // PHASE 1: DISTANT INTRO - Far away, slowly approaching (0-15%)
    if (scroll < 0.15) {
      const p = scroll / 0.15;
      const ease = 1 - Math.pow(1 - p, 3); // Ease out cubic
      state.target.rotX = window.THREE.MathUtils.lerp(1.6, 1.5, ease);
      state.target.rotY = window.THREE.MathUtils.lerp(-0.5, 0, ease);
      state.target.rotZ = window.THREE.MathUtils.lerp(0, 0, ease);
      state.target.posX = 0;
      state.target.posY = 0;
      state.target.posZ = window.THREE.MathUtils.lerp(-8, 0, ease);
      state.target.scale = window.THREE.MathUtils.lerp(0.6, 1, ease);
      state.target.camZ = window.THREE.MathUtils.lerp(22, 14, ease);
    }
    // PHASE 2: SLIDE RIGHT + ROTATE - Moving to right side (15-28%)
    else if (scroll < 0.28) {
      const p = (scroll - 0.15) / 0.13;
      const ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      state.target.rotX = window.THREE.MathUtils.lerp(1.5, 0.8, ease);
      state.target.rotY = window.THREE.MathUtils.lerp(0, 1.8, ease);
      state.target.rotZ = window.THREE.MathUtils.lerp(0, 0.3, ease);
      state.target.posX = window.THREE.MathUtils.lerp(0, 3, ease);
      state.target.posY = window.THREE.MathUtils.lerp(0, 0.5, ease);
      state.target.posZ = 0;
      state.target.scale = 1;
      state.target.camZ = window.THREE.MathUtils.lerp(14, 10, ease);
    }
    // PHASE 3: VERTICAL CLIMB - Rising upward dramatically (28-40%)
    else if (scroll < 0.40) {
      const p = (scroll - 0.28) / 0.12;
      state.target.rotX = window.THREE.MathUtils.lerp(0.8, 2.2, p);
      state.target.rotY = window.THREE.MathUtils.lerp(1.8, 2.5, p);
      state.target.rotZ = window.THREE.MathUtils.lerp(0.3, -0.2, p);
      state.target.posX = window.THREE.MathUtils.lerp(3, 1, p);
      state.target.posY = window.THREE.MathUtils.lerp(0.5, 3, p);
      state.target.posZ = window.THREE.MathUtils.lerp(0, 1, p);
      state.target.scale = window.THREE.MathUtils.lerp(1, 1.3, p);
      state.target.camZ = window.THREE.MathUtils.lerp(10, 8, p);
    }
    // PHASE 4: CENTER SPIN - Spinning in center (40-52%)
    else if (scroll < 0.52) {
      const p = (scroll - 0.40) / 0.12;
      state.target.rotX = window.THREE.MathUtils.lerp(2.2, 1.57, p);
      state.target.rotY = window.THREE.MathUtils.lerp(2.5, 4.5, p);
      state.target.rotZ = window.THREE.MathUtils.lerp(-0.2, 0, p);
      state.target.posX = window.THREE.MathUtils.lerp(1, 0, p);
      state.target.posY = window.THREE.MathUtils.lerp(3, 0, p);
      state.target.posZ = window.THREE.MathUtils.lerp(1, 0, p);
      state.target.scale = window.THREE.MathUtils.lerp(1.3, 1, p);
      state.target.camZ = window.THREE.MathUtils.lerp(8, 11, p);
    }
    // PHASE 5: SLIDE LEFT - Gliding to left side (52-64%)
    else if (scroll < 0.64) {
      const p = (scroll - 0.52) / 0.12;
      state.target.rotX = window.THREE.MathUtils.lerp(1.57, 0.7, p);
      state.target.rotY = window.THREE.MathUtils.lerp(4.5, 5.5, p);
      state.target.rotZ = window.THREE.MathUtils.lerp(0, -0.4, p);
      state.target.posX = window.THREE.MathUtils.lerp(0, -3.5, p);
      state.target.posY = window.THREE.MathUtils.lerp(0, -0.5, p);
      state.target.posZ = 0;
      state.target.scale = 1;
      state.target.camZ = window.THREE.MathUtils.lerp(11, 9, p);
    }
    // PHASE 6: VERTICAL DROP - Descending smoothly (64-76%)
    else if (scroll < 0.76) {
      const p = (scroll - 0.64) / 0.12;
      state.target.rotX = window.THREE.MathUtils.lerp(0.7, 0.2, p);
      state.target.rotY = window.THREE.MathUtils.lerp(5.5, 6.3, p);
      state.target.rotZ = window.THREE.MathUtils.lerp(-0.4, 0.1, p);
      state.target.posX = window.THREE.MathUtils.lerp(-3.5, -1, p);
      state.target.posY = window.THREE.MathUtils.lerp(-0.5, -3, p);
      state.target.posZ = window.THREE.MathUtils.lerp(0, -1, p);
      state.target.scale = window.THREE.MathUtils.lerp(1, 1.2, p);
      state.target.camZ = window.THREE.MathUtils.lerp(9, 7, p);
    }
    // PHASE 7: RETURN CENTER - Coming back to center (76-88%)
    else if (scroll < 0.88) {
      const p = (scroll - 0.76) / 0.12;
      const ease = p * p * (3 - 2 * p); // Smooth step
      state.target.rotX = window.THREE.MathUtils.lerp(0.2, 1.57, ease);
      state.target.rotY = window.THREE.MathUtils.lerp(6.3, 6.8, ease);
      state.target.rotZ = window.THREE.MathUtils.lerp(0.1, 0, ease);
      state.target.posX = window.THREE.MathUtils.lerp(-1, 0, ease);
      state.target.posY = window.THREE.MathUtils.lerp(-3, 0, ease);
      state.target.posZ = window.THREE.MathUtils.lerp(-1, 0, ease);
      state.target.scale = window.THREE.MathUtils.lerp(1.2, 1, ease);
      state.target.camZ = window.THREE.MathUtils.lerp(7, 12, ease);
    }
    // PHASE 8: HERO FINALE - Perfect showcase position (88-100%)
    else {
      const p = (scroll - 0.88) / 0.12;
      state.target.rotX = window.THREE.MathUtils.lerp(1.57, 1.57, p);
      state.target.rotY = window.THREE.MathUtils.lerp(6.8, Math.PI * 2.22, p);
      state.target.rotZ = 0;
      state.target.posX = 0;
      state.target.posY = 0;
      state.target.posZ = 0;
      state.target.scale = 1;
      state.target.camZ = window.THREE.MathUtils.lerp(12, 11, p);
    }
  }

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    state.scroll = Math.max(0, Math.min(1, scrollTop / maxScroll));
    
    console.log('📜 Scroll:', (state.scroll * 100).toFixed(1) + '%');
    updateScrollAnimation();
  }

  function onMouseMove(event) {
    mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    if (!isInitialized || !usbModel) return;

    // Smooth mouse
    mouse.x += (mouse.targetX - mouse.x) * LERP * 2;
    mouse.y += (mouse.targetY - mouse.y) * LERP * 2;

    // Smooth all transforms
    state.current.rotX += (state.target.rotX - state.current.rotX) * LERP;
    state.current.rotY += (state.target.rotY - state.current.rotY) * LERP;
    state.current.rotZ += (state.target.rotZ - state.current.rotZ) * LERP;
    state.current.posX += (state.target.posX - state.current.posX) * LERP;
    state.current.posY += (state.target.posY - state.current.posY) * LERP;
    state.current.posZ += (state.target.posZ - state.current.posZ) * LERP;
    state.current.scale += (state.target.scale - state.current.scale) * LERP;
    state.current.camZ += (state.target.camZ - state.current.camZ) * LERP;

    // Apply with minimal mouse influence
    usbModel.rotation.x = state.current.rotX + (mouse.y * 0.05);
    usbModel.rotation.y = state.current.rotY + (mouse.x * 0.08);
    usbModel.rotation.z = state.current.rotZ + (mouse.x * 0.02);

    usbModel.position.x = state.current.posX + (mouse.x * 0.1);
    usbModel.position.y = state.current.posY + (mouse.y * 0.08);
    usbModel.position.z = state.current.posZ;
    
    usbModel.scale.setScalar(state.current.scale);
    
    camera.position.z = state.current.camZ;
    camera.lookAt(usbModel.position);

    renderer.render(scene, camera);
  }

  function initUSB3DViewer(containerId) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) {
      console.error('❌ Container not found:', containerId);
      return;
    }

    loadThreeJS(() => {
      initViewer(containerId);
    });
  }

  // Export
  window.initUSB3DViewer = initUSB3DViewer;

})();
