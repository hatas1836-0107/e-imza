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
      const scrollPct = scrollProgress * 100;
      
      // BIG AMBIENT MOVEMENTS - ALWAYS VISIBLE
      const floatX = Math.sin(elapsedTime * 0.4) * 0.5;
      const floatY = Math.cos(elapsedTime * 0.35) * 0.4;
      const floatRotX = Math.sin(elapsedTime * 0.3) * 0.4;
      const floatRotY = Math.cos(elapsedTime * 0.25) * 0.3;
      const floatRotZ = Math.sin(elapsedTime * 0.28) * 0.35;
      
      let targetRotX, targetRotY, targetRotZ, targetPosX, targetPosY, targetPosZ;
      let targetCamX = 0, targetCamY = 2, targetCamZ = 9;
      let targetScale = 1.0;
      
      // ALWAYS SET BASE VALUES (so it moves even at scroll 0)
      targetRotX = 0.2 + floatRotX;
      targetRotY = Math.PI + floatRotY + elapsedTime * 0.1;
      targetRotZ = floatRotZ;
      targetPosX = floatX;
      targetPosY = floatY;
      targetPosZ = -2.0;
      
      // SCROLL MODIFICATIONS
      if (scrollPct >= 0 && scrollPct < 20) {
        const t = scrollPct / 20;
        targetRotX = 0.2 + floatRotX + t * 0.3;
        targetPosX = floatX + t * 0.5;
        targetPosZ = -2.0 + t * 0.3;
        targetScale = 1.0 + t * 0.2;
        
      } else if (scrollPct >= 20 && scrollPct < 40) {
        const t = (scrollPct - 20) / 20;
        targetRotX = 0.5 + floatRotX;
        targetRotY = Math.PI + Math.PI * 0.4 * t + floatRotY + elapsedTime * 0.1;
        targetRotZ = 0.3 * t + floatRotZ;
        targetPosX = floatX - t * 0.8;
        targetPosY = floatY + t * 0.4;
        targetPosZ = -1.7;
        targetCamX = t * 2;
        targetCamZ = 9 - t * 1;
        targetScale = 1.2 + t * 0.1;
        
      } else if (scrollPct >= 40 && scrollPct < 60) {
        const t = (scrollPct - 40) / 20;
        targetRotX = 0.7 + floatRotX * 1.5;
        targetRotY = Math.PI + Math.PI * (0.4 + t * 0.5) + floatRotY + elapsedTime * 0.08;
        targetRotZ = 0.3 + floatRotZ * 1.2;
        targetPosX = -0.8 + floatX * 1.5 + t * 0.8;
        targetPosY = 0.4 + floatY - t * 0.6;
        targetPosZ = -1.7 + t * 0.2;
        targetCamX = 2 - t * 2;
        targetCamY = 2 + t * 3;
        targetCamZ = 8 - t * 1;
        targetScale = 1.3;
        
      } else if (scrollPct >= 60 && scrollPct < 80) {
        const t = (scrollPct - 60) / 20;
        targetRotX = 0.3 + floatRotX * 0.8;
        targetRotY = Math.PI + Math.PI * 0.2 * t + floatRotY * 0.5 + elapsedTime * 0.12;
        targetRotZ = floatRotZ * 0.5;
        targetPosX = floatX * 0.8;
        targetPosY = -0.2 + floatY * 1.5 + Math.sin(t * Math.PI) * 0.5;
        targetPosZ = -1.5 - t * 1.2;
        targetCamX = 0;
        targetCamY = 5 - t * 2.5;
        targetCamZ = 7 - t * 1.5;
        targetScale = 1.3 + t * 0.3;
        
      } else if (scrollPct >= 80) {
        const t = (scrollPct - 80) / 20;
        targetRotX = 0.2 + floatRotX * 1.3;
        targetRotY = Math.PI + Math.PI * (0.2 + t * 0.4) + floatRotY + elapsedTime * 0.15;
        targetRotZ = 0.2 * t + floatRotZ * 1.5;
        targetPosX = floatX * 1.2 + t * 0.6;
        targetPosY = 0.3 + floatY * 1.8;
        targetPosZ = -2.7 - t * 1.0;
        targetCamX = t * 1;
        targetCamY = 2.5 - t * 0.5;
        targetCamZ = 5.5 - t * 1;
        targetScale = 1.6 + t * 0.4;
      }
      
      // DIRECT APPLY - IMMEDIATE RESPONSE
      model.rotation.x = targetRotX + mouse.y * 0.3;
      model.rotation.y = targetRotY + mouse.x * 0.4;
      model.rotation.z = targetRotZ;
      
      model.position.x = targetPosX;
      model.position.y = targetPosY;
      model.position.z = targetPosZ;
      
      camera.position.set(targetCamX, targetCamY, targetCamZ);
      camera.lookAt(model.position);
      
      const baseScale = model.userData.baseScale || 6.0;
      model.scale.setScalar(baseScale * targetScale);
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
