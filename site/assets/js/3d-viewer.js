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
      // Calculate phase-specific time (resets each phase)
      let phaseTime = 0;
      let phase = 0;
      
      if (scrollProgress < 0.2) {
        phase = 0;
        phaseTime = (scrollProgress / 0.2) * 5; // 0-5 seconds
      } else if (scrollProgress < 0.4) {
        phase = 1;
        phaseTime = ((scrollProgress - 0.2) / 0.2) * 5;
      } else if (scrollProgress < 0.6) {
        phase = 2;
        phaseTime = ((scrollProgress - 0.4) / 0.2) * 5;
      } else if (scrollProgress < 0.8) {
        phase = 3;
        phaseTime = ((scrollProgress - 0.6) / 0.2) * 5;
      } else {
        phase = 4;
        phaseTime = ((scrollProgress - 0.8) / 0.2) * 5;
      }
      
      let targetRotX = 0, targetRotY = 0, targetRotZ = 0;
      let targetPosX = 0, targetPosY = 0, targetPosZ = 0;
      let targetCamZ = 8, targetCamY = 2, targetCamX = 0;
      
      if (phase === 0) {
        // PHASE 1: Front close-up, subtle movement
        targetRotX = 0;
        targetRotY = phaseTime * 0.3; // Slow reveal
        targetRotZ = Math.sin(phaseTime * 2) * 0.05;
        targetPosX = 0;
        targetPosY = Math.sin(phaseTime * 1.5) * 0.3;
        targetPosZ = 0;
        targetCamZ = 7 - (scrollProgress / 0.2) * 2; // 7→5 zoom in
        targetCamY = 2;
        targetCamX = 0;
        
      } else if (phase === 1) {
        // PHASE 2: Rotate to SIDE, move left
        targetRotX = Math.sin(phaseTime) * 0.1;
        targetRotY = Math.PI * 0.5 * (scrollProgress - 0.2) / 0.2; // 0→90° smooth
        targetRotZ = 0;
        targetPosX = -2.5 * ((scrollProgress - 0.2) / 0.2); // Slide left
        targetPosY = Math.sin(phaseTime * 2) * 0.4;
        targetPosZ = 0;
        targetCamZ = 6;
        targetCamY = 2.5;
        targetCamX = 1.5;
        
      } else if (phase === 2) {
        // PHASE 3: TOP VIEW zoom out + fast spin
        const p = (scrollProgress - 0.4) / 0.2;
        targetRotX = -Math.PI * 0.4; // Look down
        targetRotY = Math.PI * 0.5 + phaseTime * 2; // Continue from 90° + fast spin
        targetRotZ = Math.sin(phaseTime * 3) * 0.2;
        targetPosX = -2.5 + Math.sin(phaseTime * 1.5) * 1.5;
        targetPosY = 1 + Math.cos(phaseTime * 2) * 0.6;
        targetPosZ = -1;
        targetCamZ = 6 + p * 6; // 6→12 zoom out
        targetCamY = 2.5 + p * 3; // 2.5→5.5 go up
        targetCamX = 1.5 - p * 3; // 1.5→-1.5 swing
        
      } else if (phase === 3) {
        // PHASE 4: FLIP 180° + show BACK
        const p = (scrollProgress - 0.6) / 0.2;
        const easeP = p < 0.5 ? 4*p*p*p : 1 - Math.pow(-2*p+2, 3)/2; // Ease in-out
        targetRotX = Math.PI * easeP; // 0→180° flip
        targetRotY = Math.PI * 0.5 + Math.PI * easeP; // 90°→270° (show back)
        targetRotZ = Math.sin(p * Math.PI * 4) * 0.3; // Wobble during flip
        targetPosX = 2 - p * 4; // Right→Left sweep
        targetPosY = p * 2 + Math.sin(phaseTime * 2) * 0.5; // Go up
        targetPosZ = Math.cos(p * Math.PI * 2) * 1;
        targetCamZ = 12 - p * 7; // 12→5 zoom back in
        targetCamY = 5.5 - p * 2.5; // 5.5→3 come down
        targetCamX = -1.5 + p * 1.5; // -1.5→0 center
        
      } else {
        // PHASE 5: ULTRA CLOSE finale + 360° showcase
        const p = (scrollProgress - 0.8) / 0.2;
        targetRotX = Math.PI + Math.sin(phaseTime * 1.5) * 0.4;
        targetRotY = Math.PI * 1.5 + phaseTime * 3; // Full 360° fast
        targetRotZ = Math.cos(phaseTime * 2) * 0.3;
        targetPosX = Math.sin(phaseTime * 1.2) * 0.6;
        targetPosY = Math.cos(phaseTime * 1.8) * 0.7;
        targetPosZ = Math.sin(phaseTime * 1.4) * 0.5;
        targetCamZ = 5 - p * 2; // 5→3 very close
        targetCamY = 3 + Math.sin(p * Math.PI * 4) * 1.5;
        targetCamX = Math.cos(p * Math.PI * 6) * 1.2;
      }
      
      // Smooth lerp
      model.rotation.x += (targetRotX - model.rotation.x) * 0.06;
      model.rotation.y += (targetRotY - model.rotation.y) * 0.06;
      model.rotation.z += (targetRotZ - model.rotation.z) * 0.06;
      
      // Position with mouse parallax
      model.position.x += (targetPosX + mouseX * 1.2 - model.position.x) * 0.08;
      model.position.y += (targetPosY + mouseY * 0.8 - model.position.y) * 0.08;
      model.position.z += (targetPosZ - model.position.z) * 0.08;
      
      // Camera movement
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.lookAt(model.position);
      
      // Scale breathing
      const breathScale = 1 + Math.sin(time * 0.6) * 0.08;
      const baseScale = model.userData.baseScale || 6.0;
      model.scale.setScalar(baseScale * breathScale);
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
