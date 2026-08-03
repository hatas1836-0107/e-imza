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

    // Scroll listener for parallax
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Mouse move listener for interaction
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize handler
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    isInitialized = true;
    animate();
  }

  function onScroll() {
    scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
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
    const time = clock.getElapsedTime();

    // Update animations
    if (mixer) {
      mixer.update(delta);
    }

    if (model) {
      // SCROLL-BASED POSE TRANSFORMATIONS
      // 0-0.2: Vertical standing (dik duruş)
      // 0.2-0.4: Rotating to horizontal (yatay geçiş)
      // 0.4-0.6: Horizontal spinning (yatay dönüş)
      // 0.6-0.8: Flip animation (takla)
      // 0.8-1.0: Dramatic spin (son poz)
      
      let targetRotX = 0;
      let targetRotY = 0;
      let targetRotZ = 0;
      
      if (scrollProgress < 0.2) {
        // Phase 1: Vertical standing with gentle sway
        const phase = scrollProgress / 0.2;
        targetRotX = Math.PI * 0.5 + Math.sin(time * 0.5) * 0.1; // Dik
        targetRotY = time * 0.2 + phase * Math.PI * 0.5;
        targetRotZ = Math.sin(time * 0.3) * 0.1;
        
      } else if (scrollProgress < 0.4) {
        // Phase 2: Rotating to horizontal
        const phase = (scrollProgress - 0.2) / 0.2;
        const easePhase = 1 - Math.pow(1 - phase, 3); // Ease out cubic
        targetRotX = Math.PI * 0.5 * (1 - easePhase); // 90° to 0°
        targetRotY = time * 0.3 + phase * Math.PI * 2;
        targetRotZ = Math.sin(time * 0.4) * 0.15;
        
      } else if (scrollProgress < 0.6) {
        // Phase 3: Horizontal spinning
        const phase = (scrollProgress - 0.4) / 0.2;
        targetRotX = Math.sin(time * 0.4) * 0.2; // Slight wobble
        targetRotY = time * 0.5 + phase * Math.PI * 4; // Fast spin
        targetRotZ = Math.cos(time * 0.5) * 0.15;
        
      } else if (scrollProgress < 0.8) {
        // Phase 4: Flip animation (takla)
        const phase = (scrollProgress - 0.6) / 0.2;
        const easePhase = phase < 0.5 
          ? 2 * phase * phase 
          : 1 - Math.pow(-2 * phase + 2, 2) / 2; // Ease in-out
        targetRotX = Math.PI * 2 * easePhase; // Full flip
        targetRotY = time * 0.4 + phase * Math.PI * 1.5;
        targetRotZ = Math.sin(phase * Math.PI * 2) * 0.3; // Wobble during flip
        
      } else {
        // Phase 5: Dramatic final spin
        const phase = (scrollProgress - 0.8) / 0.2;
        targetRotX = Math.sin(time * 0.6) * 0.25 + phase * Math.PI * 0.5;
        targetRotY = time * 0.7 + phase * Math.PI * 6; // Very fast spin
        targetRotZ = Math.cos(time * 0.4) * 0.2;
      }
      
      // Smooth interpolation (lerp) for buttery transitions
      const lerpFactor = 0.08;
      model.rotation.x += (targetRotX - model.rotation.x) * lerpFactor;
      model.rotation.y += (targetRotY - model.rotation.y) * lerpFactor;
      model.rotation.z += (targetRotZ - model.rotation.z) * lerpFactor;
      
      // Smooth floating animation (independent of scroll)
      const floatY = Math.sin(time * 0.5) * 0.5 + Math.sin(time * 1.2) * 0.3;
      model.position.y += (floatY - model.position.y) * 0.05;
      
      // Enhanced mouse parallax with depth
      const targetX = mouseX * 2.0 + Math.sin(time * 0.3) * 0.5;
      const targetZ = mouseY * 1.5 + Math.cos(time * 0.4) * 0.5;
      model.position.x += (targetX - model.position.x) * 0.08;
      model.position.z += (targetZ - model.position.z) * 0.08;
      
      // Scroll-based camera choreography
      const cameraY = 2 + Math.sin(scrollProgress * Math.PI * 2) * 1.5;
      const cameraZ = 8 - scrollProgress * 4 + Math.cos(scrollProgress * Math.PI) * 2;
      const cameraX = Math.sin(scrollProgress * Math.PI * 3) * 1.5;
      
      camera.position.x += (cameraX - camera.position.x) * 0.05;
      camera.position.y += (cameraY - camera.position.y) * 0.05;
      camera.position.z += (cameraZ - camera.position.z) * 0.05;
      camera.lookAt(model.position);
      
      // Dynamic scale based on scroll (breathing effect)
      const breathingScale = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.15;
      const baseScale = model.userData.baseScale || 6.0;
      model.scale.setScalar(baseScale * breathingScale);
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
