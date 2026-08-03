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
      // SCROLL-BASED SCENES + CONTINUOUS ROTATION
      const scrollPhase = scrollProgress * 100; // 0-100 for easier math
      
      // BASE CONTINUOUS ROTATION - ALWAYS SPINNING
      const continuousY = elapsedTime * 0.2 + scrollProgress * Math.PI * 8;
      
      // BIG MOVEMENTS for visibility
      const waveX = Math.sin(elapsedTime * 0.6) * 0.4;
      const waveY = Math.cos(elapsedTime * 0.5) * 0.3;
      const waveZ = Math.sin(elapsedTime * 0.4) * 0.3;
      
      let finalRotX, finalRotY, finalRotZ, finalPosX, finalPosY, finalPosZ, finalCamZ, finalScale;
      
      if (scrollPhase < 20) {
        // SCENE 1: Opening spin - front view
        finalRotX = 0.2 + waveX;
        finalRotY = continuousY;
        finalRotZ = waveZ * 0.5;
        finalPosX = waveX;
        finalPosY = waveY;
        finalPosZ = -1.5;
        finalCamZ = 9;
        finalScale = 1.0 + scrollPhase * 0.01;
        
      } else if (scrollPhase < 35) {
        // SCENE 2: Side profile + fast spin
        const local = (scrollPhase - 20) / 15;
        finalRotX = Math.PI * 0.3 + waveX;
        finalRotY = continuousY + Math.PI * 0.5;
        finalRotZ = Math.PI * 0.2 + waveZ;
        finalPosX = Math.sin(local * Math.PI * 4) * 1.2;
        finalPosY = waveY;
        finalPosZ = -1.0;
        finalCamZ = 8;
        finalScale = 1.2;
        
      } else if (scrollPhase < 50) {
        // SCENE 3: Top view spinning
        const local = (scrollPhase - 35) / 15;
        finalRotX = Math.PI * 0.6 + waveX;
        finalRotY = continuousY + local * Math.PI * 4;
        finalRotZ = waveZ;
        finalPosX = Math.sin(elapsedTime * 0.8) * 0.6;
        finalPosY = -0.3 + waveY;
        finalPosZ = -1.2;
        finalCamZ = 7;
        finalScale = 1.1;
        
      } else if (scrollPhase < 70) {
        // SCENE 4: Crazy tumble
        const local = (scrollPhase - 50) / 20;
        finalRotX = continuousY * 1.5 + Math.sin(elapsedTime * 1.2) * 1.0;
        finalRotY = continuousY * 2.0;
        finalRotZ = continuousY * 0.8 + Math.cos(elapsedTime * 1.5) * 0.8;
        finalPosX = Math.sin(elapsedTime * 1.0) * 1.5;
        finalPosY = Math.cos(elapsedTime * 1.2) * 1.0;
        finalPosZ = -2.0 + Math.sin(elapsedTime * 0.8) * 0.8;
        finalCamZ = 6 + Math.sin(elapsedTime * 0.5) * 1;
        finalScale = 1.3 + Math.sin(elapsedTime * 2) * 0.2;
        
      } else if (scrollPhase < 85) {
        // SCENE 5: Close-up front
        finalRotX = 0.1 + waveX * 0.5;
        finalRotY = continuousY * 0.3;
        finalRotZ = waveZ * 0.3;
        finalPosX = waveX * 0.5;
        finalPosY = waveY;
        finalPosZ = -3.0;
        finalCamZ = 5;
        finalScale = 1.5;
        
      } else {
        // SCENE 6: Grand finale
        const local = (scrollPhase - 85) / 15;
        finalRotX = continuousY * 2 + Math.sin(elapsedTime * 2) * 1.5;
        finalRotY = continuousY * 3;
        finalRotZ = Math.cos(elapsedTime * 2.5) * Math.PI;
        finalPosX = Math.cos(elapsedTime * 1.5) * 2.0;
        finalPosY = Math.sin(elapsedTime * 2.0) * 1.5;
        finalPosZ = -4.0 + Math.sin(elapsedTime * 1.8) * 2.0;
        finalCamZ = 4 + local * 2;
        finalScale = 1.6 + local * 0.6;
      }
      
      // DIRECT APPLY - NO LERP (immediate response)
      model.rotation.x = finalRotX + mouse.y * 0.3;
      model.rotation.y = finalRotY + mouse.x * 0.4;
      model.rotation.z = finalRotZ;
      
      model.position.x = finalPosX;
      model.position.y = finalPosY;
      model.position.z = finalPosZ;
      
      camera.position.z = finalCamZ;
      camera.lookAt(model.position);
      
      const baseScale = model.userData.baseScale || 6.0;
      model.scale.setScalar(baseScale * finalScale);
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
