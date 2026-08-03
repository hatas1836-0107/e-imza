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

  // Animation scripts - modern approach
  const animationScripts = [];
  
  // LERP utility
  function lerp(start, end, progress) {
    return start + (end - start) * progress;
  }
  
  // Scale scroll percent to specific range
  function scalePercent(start, end, current) {
    return Math.max(0, Math.min(1, (current - start) / (end - start)));
  }
  
  // Easing functions
  const ease = {
    inOut: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    out: (t) => 1 - Math.pow(1 - t, 3),
    in: (t) => t * t * t
  };

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (mixer) mixer.update(delta);

    if (model) {
      const scrollPct = scrollProgress * 100;
      
      // Ambient floating (always active)
      const ambientX = Math.sin(elapsedTime * 0.25) * 0.08;
      const ambientY = Math.cos(elapsedTime * 0.2) * 0.06;
      const ambientRotY = elapsedTime * 0.05;
      
      // ANIMATION 1: Opening (0-20%) - Show connector, gentle approach
      if (scrollPct >= 0 && scrollPct < 20) {
        const t = ease.out(scalePercent(0, 20, scrollPct));
        model.rotation.x = lerp(0.1, 0.2, t) + ambientX;
        model.rotation.y = Math.PI + ambientRotY;
        model.rotation.z = lerp(0, 0.1, t);
        model.position.x = lerp(0, 0.3, t) + ambientX * 2;
        model.position.y = ambientY;
        model.position.z = lerp(-2.5, -1.8, t);
        camera.position.set(0, 2, lerp(10, 9, t));
        const baseScale = model.userData.baseScale || 6.0;
        model.scale.setScalar(baseScale * lerp(0.9, 1.1, t));
      }
      
      // ANIMATION 2: Tilt reveal (20-40%) - Show from angle
      else if (scrollPct >= 20 && scrollPct < 40) {
        const t = ease.inOut(scalePercent(20, 40, scrollPct));
        model.rotation.x = lerp(0.2, 0.5, t) + ambientX * 1.5;
        model.rotation.y = Math.PI + lerp(0, Math.PI * 0.3, t) + ambientRotY;
        model.rotation.z = lerp(0.1, 0.3, t);
        model.position.x = lerp(0.3, -0.5, t) + ambientX * 2;
        model.position.y = lerp(0, 0.3, t) + ambientY;
        model.position.z = lerp(-1.8, -1.5, t);
        camera.position.set(
          lerp(0, 1.5, t),
          lerp(2, 2.5, t),
          lerp(9, 8, t)
        );
        const baseScale = model.userData.baseScale || 6.0;
        model.scale.setScalar(baseScale * lerp(1.1, 1.25, t));
      }
      
      // ANIMATION 3: Top-down view (40-60%) - Dramatic angle
      else if (scrollPct >= 40 && scrollPct < 60) {
        const t = ease.inOut(scalePercent(40, 60, scrollPct));
        model.rotation.x = lerp(0.5, 0.8, t) + ambientX;
        model.rotation.y = Math.PI + lerp(Math.PI * 0.3, Math.PI * 0.8, t) + ambientRotY;
        model.rotation.z = lerp(0.3, 0.2, t);
        model.position.x = lerp(-0.5, 0, t) + ambientX * 3;
        model.position.y = lerp(0.3, -0.2, t) + ambientY;
        model.position.z = lerp(-1.5, -1.3, t);
        camera.position.set(
          lerp(1.5, 0, t),
          lerp(2.5, 5, t),
          lerp(8, 7, t)
        );
        const baseScale = model.userData.baseScale || 6.0;
        model.scale.setScalar(baseScale * lerp(1.25, 1.15, t));
      }
      
      // ANIMATION 4: Close-up connector (60-80%) - Zoom in
      else if (scrollPct >= 60 && scrollPct < 80) {
        const t = ease.out(scalePercent(60, 80, scrollPct));
        model.rotation.x = lerp(0.8, 0.3, t) + ambientX * 0.5;
        model.rotation.y = Math.PI + lerp(Math.PI * 0.8, Math.PI * 0.1, t) + ambientRotY * 0.5;
        model.rotation.z = lerp(0.2, 0, t);
        model.position.x = lerp(0, -0.2, t) + ambientX;
        model.position.y = lerp(-0.2, 0.1, t) + ambientY * 2;
        model.position.z = lerp(-1.3, -2.5, t);
        camera.position.set(
          lerp(0, 0, t),
          lerp(5, 2.5, t),
          lerp(7, 5.5, t)
        );
        const baseScale = model.userData.baseScale || 6.0;
        model.scale.setScalar(baseScale * lerp(1.15, 1.5, t));
      }
      
      // ANIMATION 5: Final showcase (80-100%) - Elegant finish
      else if (scrollPct >= 80) {
        const t = ease.inOut(scalePercent(80, 100, scrollPct));
        model.rotation.x = lerp(0.3, 0.15, t) + ambientX * 1.2;
        model.rotation.y = Math.PI + lerp(Math.PI * 0.1, Math.PI * 0.5, t) + ambientRotY;
        model.rotation.z = lerp(0, 0.15, t);
        model.position.x = lerp(-0.2, 0.4, t) + ambientX * 2;
        model.position.y = lerp(0.1, 0.3, t) + ambientY * 1.5;
        model.position.z = lerp(-2.5, -3.5, t);
        camera.position.set(
          lerp(0, 0.5, t),
          lerp(2.5, 2, t),
          lerp(5.5, 4.5, t)
        );
        const baseScale = model.userData.baseScale || 6.0;
        model.scale.setScalar(baseScale * lerp(1.5, 1.8, t));
      }
      
      // Mouse parallax
      model.rotation.x += mouse.y * 0.15;
      model.rotation.y += mouse.x * 0.2;
      
      // Camera always looks at model
      camera.lookAt(model.position);
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
