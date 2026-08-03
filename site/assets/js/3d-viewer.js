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
  let mouseX = 0, mouseY = 0;
  
  // Mouse object for showcase-style interaction
  const mouse = { x: 0, y: 0 };

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

    // Update animations
    if (mixer) {
      mixer.update(delta);
    }

    if (model) {
      // DRAMATIC CINEMATIC ROTATION SEQUENCE
      // Her 8 saniyede bir fase değişir
      const phase = Math.floor(elapsedTime / 8) % 5;
      const phaseTime = elapsedTime % 8;
      const progress = phaseTime / 8;
      
      // Smooth transitions between phases
      const easeInOut = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      switch(phase) {
        case 0: // FAST SPIN - Hızlı dönüş
          model.rotation.y = elapsedTime * 1.2;
          model.rotation.x = Math.sin(elapsedTime * 0.8) * 0.3;
          model.rotation.z = Math.cos(elapsedTime * 0.9) * 0.4;
          model.position.y = Math.sin(elapsedTime * 2) * 0.5;
          model.position.x = Math.cos(elapsedTime * 1.5) * 0.4;
          model.position.z = Math.sin(elapsedTime * 1.2) * 0.3;
          break;
          
        case 1: // FRONT FACING - USB ucu ekrana bakıyor
          model.rotation.y = Math.PI * 0.5 + Math.sin(phaseTime * 0.5) * 0.2;
          model.rotation.x = Math.sin(phaseTime * 0.3) * 0.15;
          model.rotation.z = 0;
          model.position.y = Math.sin(phaseTime * 1.5) * 0.3;
          model.position.x = 0;
          model.position.z = -1 + Math.sin(phaseTime * 0.8) * 0.3;
          break;
          
        case 2: // TUMBLING - Takla atıyor
          model.rotation.x = elapsedTime * 0.8;
          model.rotation.y = elapsedTime * 0.5;
          model.rotation.z = elapsedTime * 0.6;
          model.position.y = Math.sin(elapsedTime * 1.8) * 0.6;
          model.position.x = Math.cos(elapsedTime * 1.2) * 0.5;
          model.position.z = Math.sin(elapsedTime * 0.9) * 0.4;
          break;
          
        case 3: // SIDE VIEW - Yan görünüm, yavaş sallanma
          model.rotation.y = Math.PI + Math.sin(phaseTime * 0.4) * 0.3;
          model.rotation.x = Math.sin(phaseTime * 0.5) * 0.4;
          model.rotation.z = Math.PI * 0.5 + Math.cos(phaseTime * 0.3) * 0.2;
          model.position.y = Math.sin(phaseTime * 1.2) * 0.4;
          model.position.x = Math.sin(phaseTime * 0.6) * 0.3;
          model.position.z = Math.cos(phaseTime * 0.5) * 0.2;
          break;
          
        case 4: // ZOOM & SPIN - Yaklaşıp dönüyor
          model.rotation.y = elapsedTime * 0.9;
          model.rotation.x = Math.sin(elapsedTime * 1.5) * 0.5;
          model.rotation.z = Math.cos(elapsedTime * 1.3) * 0.5;
          model.position.y = Math.sin(elapsedTime * 2.2) * 0.5;
          model.position.x = Math.cos(elapsedTime * 1.8) * 0.4;
          model.position.z = -1.5 + Math.sin(phaseTime * 1.5) * 1.2; // Yaklaşma efekti
          break;
      }
      
      // MOUSE PARALLAX - her fase için aktif
      model.rotation.x += mouse.y * 0.4;
      model.rotation.y += mouse.x * 0.5;
      
      // DYNAMIC SCALE - Zoom in/out efekti
      const breathScale = 1 + Math.sin(elapsedTime * 1.2) * 0.2;
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
