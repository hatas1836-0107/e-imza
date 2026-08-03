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
      // CINEMATIC SCROLL-BASED CHOREOGRAPHY
      // Each 20% scroll = different dramatic view
      
      let targetRotX = 0, targetRotY = 0, targetRotZ = 0;
      let targetPosX = 0, targetPosY = 0, targetPosZ = 0;
      let targetCamZ = 8, targetCamY = 2, targetCamX = 0;
      
      if (scrollProgress < 0.2) {
        // Phase 1: FRONT VIEW - Close up, gentle reveal
        targetRotX = Math.sin(time * 0.4) * 0.1;
        targetRotY = time * 0.15; // Slow spin to show front
        targetRotZ = Math.cos(time * 0.3) * 0.05;
        targetPosX = Math.sin(time * 0.5) * 0.3;
        targetPosY = Math.sin(time * 0.7) * 0.4;
        targetPosZ = 0;
        targetCamZ = 7 - (scrollProgress / 0.2) * 2; // Zoom in
        targetCamY = 2;
        
      } else if (scrollProgress < 0.4) {
        // Phase 2: SIDE PROFILE - Rotate to show side, move to left
        const phase = (scrollProgress - 0.2) / 0.2;
        targetRotX = Math.sin(time * 0.5) * 0.15;
        targetRotY = Math.PI * 0.5 + time * 0.2; // 90° side view
        targetRotZ = Math.cos(time * 0.4) * 0.1;
        targetPosX = -2 + Math.sin(time * 0.6) * 0.5; // Move left
        targetPosY = Math.sin(time * 0.8) * 0.6;
        targetPosZ = Math.cos(time * 0.5) * 0.4;
        targetCamZ = 6;
        targetCamY = 2 + phase * 1;
        targetCamX = 1;
        
      } else if (scrollProgress < 0.6) {
        // Phase 3: ZOOM OUT + TOP VIEW - Show from above, spin fast
        const phase = (scrollProgress - 0.4) / 0.2;
        targetRotX = -Math.PI * 0.3 + Math.sin(time * 0.6) * 0.2; // Tilt down
        targetRotY = time * 0.8 + phase * Math.PI * 4; // Fast 360° spin
        targetRotZ = Math.sin(time * 0.7) * 0.15;
        targetPosX = Math.sin(time * 0.4) * 1.5;
        targetPosY = 1 + Math.cos(time * 0.9) * 0.7;
        targetPosZ = -1;
        targetCamZ = 10 + phase * 3; // Zoom out dramatically
        targetCamY = 5; // High angle
        targetCamX = Math.sin(phase * Math.PI) * 2;
        
      } else if (scrollProgress < 0.8) {
        // Phase 4: DIAGONAL FLIP - Show back, flip 180°
        const phase = (scrollProgress - 0.6) / 0.2;
        const easePhase = phase < 0.5 ? 4 * phase * phase * phase : 1 - Math.pow(-2 * phase + 2, 3) / 2;
        targetRotX = Math.PI * easePhase + Math.sin(time * 0.5) * 0.2; // Flip
        targetRotY = Math.PI + time * 0.3; // Show back side
        targetRotZ = Math.sin(phase * Math.PI * 2) * 0.4; // Wobble
        targetPosX = 2 - phase * 4; // Move right to left
        targetPosY = Math.sin(time * 1.1) * 0.8 + phase * 2; // Go up
        targetPosZ = Math.cos(time * 0.6) * 0.6;
        targetCamZ = 5 + Math.sin(phase * Math.PI) * 3;
        targetCamY = 2 + phase * 3;
        targetCamX = -2 + phase * 4;
        
      } else {
        // Phase 5: DRAMATIC FINALE - Ultra close, full 360° showcase
        const phase = (scrollProgress - 0.8) / 0.2;
        targetRotX = Math.sin(time * 0.8) * 0.3 + phase * Math.PI * 0.5;
        targetRotY = time * 1.2 + phase * Math.PI * 8; // Very fast spin
        targetRotZ = Math.cos(time * 0.9) * 0.25;
        targetPosX = Math.sin(time * 0.7) * 0.4;
        targetPosY = Math.cos(time * 1.3) * 0.5;
        targetPosZ = Math.sin(time * 0.8) * 0.3;
        targetCamZ = 4 - phase * 1; // Very close
        targetCamY = 2 + Math.sin(phase * Math.PI * 2) * 1.5;
        targetCamX = Math.cos(phase * Math.PI * 3) * 1;
      }
      
      // Ultra-smooth interpolation with different lerp factors
      const rotLerp = 0.06;
      const posLerp = 0.08;
      const camLerp = 0.05;
      
      // Model rotation
      model.rotation.x += (targetRotX - model.rotation.x) * rotLerp;
      model.rotation.y += (targetRotY - model.rotation.y) * rotLerp;
      model.rotation.z += (targetRotZ - model.rotation.z) * rotLerp;
      
      // Model position with enhanced mouse parallax
      const mouseInfluenceX = mouseX * 1.5;
      const mouseInfluenceY = mouseY * 1.0;
      model.position.x += (targetPosX + mouseInfluenceX - model.position.x) * posLerp;
      model.position.y += (targetPosY + mouseInfluenceY - model.position.y) * posLerp;
      model.position.z += (targetPosZ - model.position.z) * posLerp;
      
      // Dynamic camera movement
      camera.position.x += (targetCamX - camera.position.x) * camLerp;
      camera.position.y += (targetCamY - camera.position.y) * camLerp;
      camera.position.z += (targetCamZ - camera.position.z) * camLerp;
      
      // Always look at model
      camera.lookAt(model.position);
      
      // Dynamic scale with breathing
      const breathingScale = 1 + Math.sin(time * 0.6) * 0.08 + Math.cos(scrollProgress * Math.PI * 3) * 0.12;
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
