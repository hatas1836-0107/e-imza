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
      const scrollPhase = scrollProgress * 100;
      
      // SMOOTH FLOATING MOVEMENTS - always active
      const floatX = Math.sin(elapsedTime * 0.3) * 0.6;
      const floatY = Math.cos(elapsedTime * 0.25) * 0.5;
      const floatZ = Math.sin(elapsedTime * 0.2) * 0.4;
      
      // GENTLE ROTATION - show connector side mostly
      const gentleRotX = Math.sin(elapsedTime * 0.15) * 0.3;
      const gentleRotZ = Math.cos(elapsedTime * 0.18) * 0.25;
      
      let rotX, rotY, rotZ, posX, posY, posZ, camZ, scale;
      
      if (scrollPhase < 20) {
        // SCENE 1: Connector facing - elegant floating
        rotX = Math.PI * 0.1 + gentleRotX;
        rotY = Math.PI + scrollPhase * 0.01; // Metal side
        rotZ = gentleRotZ;
        posX = floatX;
        posY = floatY;
        posZ = -1.5 + floatZ * 0.3;
        camZ = 9;
        scale = 1.0 + scrollPhase * 0.01;
        
      } else if (scrollPhase < 40) {
        // SCENE 2: Drift to side - smooth transition
        const local = (scrollPhase - 20) / 20;
        rotX = Math.PI * 0.2 + gentleRotX;
        rotY = Math.PI + Math.PI * 0.3 * local + elapsedTime * 0.08;
        rotZ = Math.PI * 0.15 + gentleRotZ;
        posX = floatX + Math.sin(local * Math.PI) * 0.8;
        posY = floatY + 0.2;
        posZ = -1.3 + floatZ * 0.4;
        camZ = 8.5;
        scale = 1.15;
        
      } else if (scrollPhase < 60) {
        // SCENE 3: Angled view - showing connector detail
        const local = (scrollPhase - 40) / 20;
        rotX = Math.PI * 0.35 + gentleRotX * 1.5;
        rotY = Math.PI * 1.4 + elapsedTime * 0.1;
        rotZ = Math.PI * 0.25 + gentleRotZ * 1.2;
        posX = floatX * 1.2;
        posY = floatY - 0.3;
        posZ = -1.5 + floatZ * 0.5;
        camZ = 8;
        scale = 1.25;
        
      } else if (scrollPhase < 75) {
        // SCENE 4: Close approach - slow rotation
        const local = (scrollPhase - 60) / 15;
        rotX = Math.PI * 0.15 + gentleRotX;
        rotY = Math.PI * 1.1 + elapsedTime * 0.12 + local * Math.PI * 0.5;
        rotZ = gentleRotZ * 1.5;
        posX = floatX * 0.8;
        posY = floatY + Math.sin(local * Math.PI) * 0.5;
        posZ = -2.5 + floatZ * 0.3;
        camZ = 7;
        scale = 1.4;
        
      } else if (scrollPhase < 90) {
        // SCENE 5: Perspective shift - elegant drift
        const local = (scrollPhase - 75) / 15;
        rotX = Math.PI * 0.4 + gentleRotX * 1.8;
        rotY = Math.PI * 1.5 + elapsedTime * 0.09;
        rotZ = Math.PI * 0.35 + gentleRotZ * 1.3;
        posX = floatX * 1.5 + Math.cos(local * Math.PI * 2) * 0.7;
        posY = floatY + 0.4;
        posZ = -2.0 + floatZ * 0.6;
        camZ = 7.5;
        scale = 1.35;
        
      } else {
        // SCENE 6: Final zoom - connector showcase
        const local = (scrollPhase - 90) / 10;
        rotX = Math.PI * 0.2 + gentleRotX * 1.2;
        rotY = Math.PI + elapsedTime * 0.15 + local * Math.PI * 0.8;
        rotZ = gentleRotZ * 1.6;
        posX = floatX * 0.6;
        posY = floatY + Math.sin(local * Math.PI * 3) * 0.6;
        posZ = -3.5 + floatZ * 0.8;
        camZ = 6;
        scale = 1.6 + local * 0.3;
      }
      
      // APPLY DIRECTLY
      model.rotation.x = rotX + mouse.y * 0.2;
      model.rotation.y = rotY + mouse.x * 0.25;
      model.rotation.z = rotZ;
      
      model.position.x = posX;
      model.position.y = posY;
      model.position.z = posZ;
      
      camera.position.z = camZ;
      camera.lookAt(model.position);
      
      const baseScale = model.userData.baseScale || 6.0;
      model.scale.setScalar(baseScale * scale);
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
