/**
 * Optimized 3D GLB Background Viewer with Three.js
 * Fixed background with scroll-reactive parallax
 * Responsive, mobile-friendly, performant
 */

(function() {
  'use strict';

  let scene, camera, renderer, model, mixer, clock;
  let container, isInitialized = false;
  let animationFrameId = null;
  let scrollProgress = 0;
  let mouseX = 0, mouseY = 0;
  
  // Mouse object for showcase-style interaction
  const mouse = { x: 0, y: 0 };
  
  // Target values for smooth interpolation
  let targetRotation = { x: 0, y: 0, z: 0 };
  let currentRotation = { x: 0, y: 0, z: 0 };
  let targetPosition = { x: 0, y: 0, z: 0 };
  let currentPosition = { x: 0, y: 0, z: 0 };

  // Lazy load Three.js with importmap
  function loadThreeJS(callback) {
    if (window.THREE) {
      callback();
      return;
    }

    // Add import map first
    const importMap = document.createElement('script');
    importMap.type = 'importmap';
    importMap.textContent = JSON.stringify({
      imports: {
        'three': 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
        'three/addons/': 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/'
      }
    });
    document.head.appendChild(importMap);

    // Then load the module
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

  function init3DViewer(containerId) {
    container = document.getElementById(containerId);
    if (!container || isInitialized) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    scene = new window.THREE.Scene();

    // Camera - closer for better visibility
    camera = new window.THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Renderer with optimizations
    renderer = new window.THREE.WebGLRenderer({ 
      antialias: window.innerWidth > 768,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = window.THREE.SRGBColorSpace;
    renderer.toneMapping = window.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Enhanced Lights for better visibility
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const directionalLight1 = new window.THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight1.position.set(10, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new window.THREE.DirectionalLight(0x4f46e5, 0.8);
    directionalLight2.position.set(-10, 5, -10);
    scene.add(directionalLight2);

    const rimLight = new window.THREE.DirectionalLight(0x22d3ee, 1.0);
    rimLight.position.set(0, -10, -10);
    scene.add(rimLight);

    // Point light for glow effect
    const pointLight = new window.THREE.PointLight(0x8b5cf6, 1.2, 50);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // Load GLB Model
    const loader = new window.GLTFLoader();
    loader.load(
      'assets/models/flash_driver.glb',
      (gltf) => {
        model = gltf.scene;
        
        // Center and scale model
        const box = new window.THREE.Box3().setFromObject(model);
        const center = box.getCenter(new window.THREE.Vector3());
        const size = box.getSize(new window.THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Base scale for normalization
        const baseScale = 6.0 / maxDim;
        model.scale.setScalar(baseScale);
        model.position.sub(center.multiplyScalar(baseScale));
        
        // Start at center of screen
        model.position.set(0, 0, 0);
        
        // Store base scale for breathing animation
        model.userData.baseScale = baseScale;
        
        scene.add(model);

        // Animation mixer
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new window.THREE.AnimationMixer(model);
          gltf.animations.forEach(clip => {
            mixer.clipAction(clip).play();
          });
        }

        console.log('✅ 3D Flash Drive loaded - Cinematic animations active');
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(0);
        console.log(`📦 Loading 3D model: ${percent}%`);
      },
      (error) => {
        console.error('❌ Error loading 3D model:', error);
      }
    );

    // Clock for animations
    clock = new window.THREE.Clock();
    
    // Scroll listener
    window.addEventListener('scroll', () => {
      scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    }, { passive: true });
    
    // Mouse move listener - showcase style
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });

    // Resize handler
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    isInitialized = true;
    animate();
  }

  function onWindowResize() {
    if (!camera || !renderer) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (mixer) mixer.update(delta);

    if (model) {
      // Easing
      const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      
      // Micro movements for life
      const microX = Math.sin(elapsedTime * 0.5) * 0.1;
      const microY = Math.cos(elapsedTime * 0.4) * 0.1;
      const microZ = Math.sin(elapsedTime * 0.6) * 0.08;
      
      // DIRECT ASSIGNMENT - NO TARGET/CURRENT SYSTEM
      let rotX, rotY, rotZ, posX, posY, posZ, camX, camY, camZ, scale;
      
      if (scrollProgress < 0.15) {
        // SCENE 1: FRONT FACING - USB ucu ekrana bakıyor
        const t = ease(scrollProgress / 0.15);
        rotX = 0.1 + microX * 0.5;
        rotY = 0 + microY * 0.5;
        rotZ = 0;
        posX = 0;
        posY = microY * 2;
        posZ = -2.0;
        camX = 0;
        camY = 2;
        camZ = 9 - t * 1;
        scale = 1.0 + t * 0.3;
        
      } else if (scrollProgress < 0.30) {
        // SCENE 2: FAST SPIN 360° - Hızlı dönüş
        const t = (scrollProgress - 0.15) / 0.15;
        const spin = t * Math.PI * 4; // 4 tam tur
        rotX = Math.sin(spin * 1.3) * 0.8;
        rotY = spin;
        rotZ = Math.cos(spin * 0.9) * 0.6;
        posX = Math.sin(spin * 2) * 0.8;
        posY = Math.cos(spin * 1.5) * 0.6;
        posZ = -1.0 + Math.sin(spin) * 0.5;
        camX = Math.sin(t * Math.PI * 2) * 2;
        camY = 2 + Math.cos(t * Math.PI * 3) * 1;
        camZ = 8;
        scale = 1.0 + Math.sin(spin * 2) * 0.2;
        
      } else if (scrollProgress < 0.45) {
        // SCENE 3: SIDE VIEW - Yan görünüm showcase
        const t = ease((scrollProgress - 0.30) / 0.15);
        rotX = Math.PI * 0.2;
        rotY = Math.PI * 0.5 + t * Math.PI * 0.8 + microY;
        rotZ = Math.PI * 0.3;
        posX = Math.sin(t * Math.PI * 2) * 1.0;
        posY = 0.2;
        posZ = -1.5;
        camX = 3 - t * 2;
        camY = 2.5;
        camZ = 7;
        scale = 1.2;
        
      } else if (scrollProgress < 0.60) {
        // SCENE 4: TOP VIEW - Yukarıdan bakış + spin
        const t = (scrollProgress - 0.45) / 0.15;
        const topSpin = t * Math.PI * 3;
        rotX = Math.PI * 0.6 + Math.sin(topSpin) * 0.3;
        rotY = topSpin + microY;
        rotZ = Math.cos(topSpin * 0.7) * 0.4;
        posX = 0;
        posY = -0.5;
        posZ = -1.0;
        camX = Math.sin(t * Math.PI * 4) * 2;
        camY = 6;
        camZ = 6;
        scale = 1.1;
        
      } else if (scrollProgress < 0.75) {
        // SCENE 5: CRAZY TUMBLE - Çılgın takla
        const t = (scrollProgress - 0.60) / 0.15;
        const chaos = t * Math.PI * 6;
        rotX = chaos * 1.5 + Math.sin(chaos * 3) * 1.0;
        rotY = chaos * 2.0 + Math.cos(chaos * 2.5) * 0.8;
        rotZ = chaos * 1.2 + Math.sin(chaos * 4) * 1.2;
        posX = Math.sin(chaos * 3) * 1.5;
        posY = Math.cos(chaos * 2.5) * 1.2;
        posZ = -2.0 + Math.sin(chaos * 2) * 1.0;
        camX = Math.sin(chaos) * 3;
        camY = 2 + Math.cos(chaos * 1.5) * 2;
        camZ = 7 + Math.sin(chaos * 0.8) * 2;
        scale = 1.2 + Math.sin(chaos * 5) * 0.3;
        
      } else if (scrollProgress < 0.88) {
        // SCENE 6: CLOSE-UP FRONT - Tekrar ekrana yakın
        const t = ease((scrollProgress - 0.75) / 0.13);
        rotX = Math.sin(t * Math.PI) * 0.2 + microX;
        rotY = Math.PI * 0.1 + microY * 2;
        rotZ = 0;
        posX = 0;
        posY = Math.sin(t * Math.PI * 2) * 0.4;
        posZ = -3.5;
        camX = 0;
        camY = 2;
        camZ = 5;
        scale = 1.5;
        
      } else {
        // SCENE 7: GRAND FINALE - Explosive ending
        const t = (scrollProgress - 0.88) / 0.12;
        const finale = t * Math.PI * 8;
        rotX = finale * 2 + Math.sin(finale * 5) * 1.5;
        rotY = finale * 3;
        rotZ = Math.cos(finale * 3) * Math.PI;
        posX = Math.cos(finale * 4) * 2.0;
        posY = Math.sin(finale * 5) * 1.5;
        posZ = -5.0 + Math.sin(finale * 3) * 2.0;
        camX = Math.sin(finale * 2) * 4;
        camY = 2 + Math.cos(finale * 3) * 3;
        camZ = 4 + t * 3;
        scale = 1.3 + t * 0.8;
      }
      
      // APPLY WITH LERP
      const lerp = 0.1;
      model.rotation.x += (rotX - model.rotation.x) * lerp + mouse.y * 0.2;
      model.rotation.y += (rotY - model.rotation.y) * lerp + mouse.x * 0.3;
      model.rotation.z += (rotZ - model.rotation.z) * lerp;
      
      model.position.x += (posX - model.position.x) * lerp;
      model.position.y += (posY - model.position.y) * lerp;
      model.position.z += (posZ - model.position.z) * lerp;
      
      camera.position.x += (camX - camera.position.x) * 0.08;
      camera.position.y += (camY - camera.position.y) * 0.08;
      camera.position.z += (camZ - camera.position.z) * 0.08;
      camera.lookAt(model.position);
      
      const baseScale = model.userData.baseScale || 6.0;
      const targetScale = baseScale * scale * (1.0 + scrollProgress * 0.4);
      model.scale.setScalar(targetScale);
    }

    renderer.render(scene, camera);
  }

  // Pause/Resume for performance
  function pause3DViewer() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function resume3DViewer() {
    if (isInitialized && !animationFrameId) {
      animate();
    }
  }

  // Simple init without observer (always visible as background)
  function init3DBackground(containerId) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) return;

    // Immediate load
    loadThreeJS(() => {
      init3DViewer(containerId);
    });
  }

  // Export to global scope
  window.init3DBackground = init3DBackground;
  window.pause3DViewer = pause3DViewer;
  window.resume3DViewer = resume3DViewer;

})();
