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

    // Update animations
    if (mixer) {
      mixer.update(delta);
    }

    if (model) {
      // SCROLL-BASED CINEMATIC POSES
      // Sayfa 5 bölüme ayrılıyor, her bölümde farklı bir poz
      const section = scrollProgress * 5; // 0-5 arası değer
      
      // Easing function for smooth transitions
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      // Calculate target pose based on scroll position
      if (section < 1) {
        // POSE 1: İlk bakış - USB diagonal duruş, hafif dönüyor
        const t = easeInOutCubic(section);
        targetRotation.x = 0.3 + Math.sin(elapsedTime * 0.5) * 0.1;
        targetRotation.y = Math.PI * 0.25 + elapsedTime * 0.1;
        targetRotation.z = 0.2;
        targetPosition.x = 0;
        targetPosition.y = Math.sin(elapsedTime * 0.8) * 0.3;
        targetPosition.z = 0;
        
      } else if (section < 2) {
        // POSE 2: USB ucu ekrana bakıyor (front view) - YAKINLAŞIYOR
        const t = easeInOutCubic(section - 1);
        targetRotation.x = 0 + Math.sin(elapsedTime * 0.3) * 0.08;
        targetRotation.y = Math.PI * 0.5 + Math.sin(elapsedTime * 0.4) * 0.15;
        targetRotation.z = 0;
        targetPosition.x = 0;
        targetPosition.y = Math.sin(elapsedTime * 1.0) * 0.2;
        targetPosition.z = -1.2; // Yaklaşma
        
      } else if (section < 3) {
        // POSE 3: Hızlı 360° spin - TAM DÖNÜş
        const t = easeInOutCubic(section - 2);
        const spinSpeed = 2.5;
        targetRotation.x = Math.sin(elapsedTime * 0.6) * 0.4;
        targetRotation.y = elapsedTime * spinSpeed; // Hızlı dönüş
        targetRotation.z = Math.cos(elapsedTime * 0.7) * 0.3;
        targetPosition.x = Math.cos(elapsedTime * 1.2) * 0.4;
        targetPosition.y = Math.sin(elapsedTime * 1.5) * 0.5;
        targetPosition.z = Math.sin(elapsedTime * 0.8) * 0.3;
        
      } else if (section < 4) {
        // POSE 4: Yan görünüm (side profile) - USB yatık
        const t = easeInOutCubic(section - 3);
        targetRotation.x = Math.PI * 0.15 + Math.sin(elapsedTime * 0.4) * 0.1;
        targetRotation.y = Math.PI + Math.sin(elapsedTime * 0.3) * 0.2;
        targetRotation.z = Math.PI * 0.4 + Math.cos(elapsedTime * 0.35) * 0.15;
        targetPosition.x = Math.sin(elapsedTime * 0.5) * 0.3;
        targetPosition.y = Math.cos(elapsedTime * 0.7) * 0.4;
        targetPosition.z = 0;
        
      } else {
        // POSE 5: Büyük finale - ZOOM + DRAMATIC ROTATION
        const t = easeInOutCubic(section - 4);
        const dramaticSpin = 1.8;
        targetRotation.x = Math.sin(elapsedTime * 1.0) * 0.6;
        targetRotation.y = elapsedTime * dramaticSpin;
        targetRotation.z = Math.cos(elapsedTime * 1.1) * 0.5;
        targetPosition.x = Math.cos(elapsedTime * 1.3) * 0.5;
        targetPosition.y = Math.sin(elapsedTime * 1.8) * 0.6;
        targetPosition.z = -2.0 + Math.sin(elapsedTime * 1.5) * 0.8; // Çok yakın
      }
      
      // SMOOTH INTERPOLATION - Yumuşak geçişler (lerp)
      const lerpFactor = 0.05; // Ne kadar düşükse o kadar yumuşak
      currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor;
      currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor;
      currentRotation.z += (targetRotation.z - currentRotation.z) * lerpFactor;
      
      currentPosition.x += (targetPosition.x - currentPosition.x) * lerpFactor;
      currentPosition.y += (targetPosition.y - currentPosition.y) * lerpFactor;
      currentPosition.z += (targetPosition.z - currentPosition.z) * lerpFactor;
      
      // Apply interpolated values
      model.rotation.x = currentRotation.x + mouse.y * 0.3;
      model.rotation.y = currentRotation.y + mouse.x * 0.4;
      model.rotation.z = currentRotation.z;
      
      model.position.x = currentPosition.x;
      model.position.y = currentPosition.y;
      model.position.z = currentPosition.z;
      
      // DYNAMIC SCALE - Scroll bazlı zoom
      const baseScale = model.userData.baseScale || 6.0;
      const scrollZoom = 1 + scrollProgress * 0.3; // Scroll'da büyüyor
      const breathe = 1 + Math.sin(elapsedTime * 0.8) * 0.08; // Hafif nefes
      model.scale.setScalar(baseScale * scrollZoom * breathe);
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
