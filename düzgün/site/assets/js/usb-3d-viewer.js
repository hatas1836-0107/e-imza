/**
 * 🎬 ULTRA PROFESSIONAL USB STICK 3D VIEWER
 * Cinematic scroll-reactive animations with Hollywood-grade transitions
 * Features: Multi-phase choreography, dynamic lighting, micro-interactions
 */

(function() {
  'use strict';

  let scene, camera, renderer, usbModel, mixer, clock;
  let container, isInitialized = false;
  let animationFrameId = null;
  let scrollProgress = 0;

  // Smoothing coefficient for buttery-smooth transitions
  const LERP_FACTOR = 0.045; // Lower = smoother, more "cinematic float"

  // Dynamic transform targets and current values
  const transform = {
    target: { 
      rotX: 0, rotY: 0, rotZ: 0, 
      posX: 0, posY: 0, posZ: 0, 
      scale: 1,
      camZ: 12, camY: 2, camX: 0 
    },
    current: { 
      rotX: 0, rotY: 0, rotZ: 0, 
      posX: 0, posY: 0, posZ: 0, 
      scale: 1,
      camZ: 12, camY: 2, camX: 0 
    }
  };

  // Mouse interaction for subtle parallax
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Lazy load Three.js library
  function loadThreeJS(callback) {
    if (window.THREE) {
      callback();
      return;
    }

    const importMap = document.createElement('script');
    importMap.type = 'importmap';
    importMap.textContent = JSON.stringify({
      imports: {
        'three': 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
        'three/addons/': 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/'
      }
    });
    document.head.appendChild(importMap);

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

  function initViewer(containerId) {
    container = document.getElementById(containerId);
    if (!container || isInitialized) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    scene = new window.THREE.Scene();
    
    // Camera with cinematic field of view
    camera = new window.THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(
      transform.current.camX, 
      transform.current.camY, 
      transform.current.camZ
    );

    // WebGL Renderer with premium settings
    renderer = new window.THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = window.THREE.SRGBColorSpace;
    renderer.toneMapping = window.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = window.THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 🎨 HOLLYWOOD-GRADE LIGHTING SETUP
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Key Light (Main illumination)
    const keyLight = new window.THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(8, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill Light (Soften shadows)
    const fillLight = new window.THREE.DirectionalLight(0xb8c5ff, 0.7);
    fillLight.position.set(-5, 3, 4);
    scene.add(fillLight);

    // Rim Light 1 (Blue edge glow - brand color)
    const rimLight1 = new window.THREE.DirectionalLight(0x4f46e5, 1.5);
    rimLight1.position.set(-6, 2, -4);
    scene.add(rimLight1);

    // Rim Light 2 (Cyan accent)
    const rimLight2 = new window.THREE.DirectionalLight(0x06b6d4, 1.2);
    rimLight2.position.set(6, -3, -5);
    scene.add(rimLight2);

    // Accent Light (Gold highlight)
    const accentLight = new window.THREE.SpotLight(0xfbbf24, 0.8);
    accentLight.position.set(0, 8, 3);
    accentLight.angle = Math.PI / 6;
    accentLight.penumbra = 0.3;
    scene.add(accentLight);

    // Load GLB Model
    const loader = new window.GLTFLoader();
    loader.load(
      'assets/models/usb-stick_animation.glb?v=3', // Path to your GLB file (cache busting)
      (gltf) => {
        usbModel = gltf.scene;
        
        // Center and scale the model perfectly
        const box = new window.THREE.Box3().setFromObject(usbModel);
        const center = box.getCenter(new window.THREE.Vector3());
        const size = box.getSize(new window.THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        // Scale to fit viewport nicely
        const targetScale = 4.5 / maxDim;
        usbModel.scale.setScalar(targetScale);
        usbModel.position.sub(center.multiplyScalar(targetScale));
        usbModel.userData.baseScale = targetScale;
        
        // Enable shadows for realism
        usbModel.traverse((node) => {
          if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            
            // Enhance materials for premium look
            if (node.material) {
              node.material.metalness = 0.7;
              node.material.roughness = 0.3;
            }
          }
        });
        
        // Wrap in group for easier manipulation
        const wrapper = new window.THREE.Group();
        wrapper.add(usbModel);
        scene.add(wrapper);
        usbModel = wrapper;

        // Load and play animations if available
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new window.THREE.AnimationMixer(usbModel);
          gltf.animations.forEach(clip => {
            const action = mixer.clipAction(clip);
            action.play();
          });
        }

        isInitialized = true;
        console.log('✅ USB 3D Model loaded - Cinematic mode activated');
      },
      (progress) => {
        const percent = (progress.loaded / progress.total * 100).toFixed(0);
        console.log(`📦 Loading USB model: ${percent}%`);
      },
      (error) => {
        console.error('❌ Error loading 3D model:', error);
      }
    );

    clock = new window.THREE.Clock();

    // Event listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onWindowResize, false);

    animate();
  }

  // 🎬 CINEMATIC SCROLL CHOREOGRAPHY - 6 PHASES
  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

    // PHASE 1: HERO ENTRANCE (0% - 15%)
    // USB appears from darkness, gentle rotation reveal
    if (scrollProgress < 0.15) {
      const p = scrollProgress / 0.15;
      transform.target.rotX = window.THREE.MathUtils.lerp(-0.3, 0.1, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 0.8, Math.PI * 1.2, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(-0.15, 0, p);
      transform.target.posX = window.THREE.MathUtils.lerp(2.5, 0, p);
      transform.target.posY = window.THREE.MathUtils.lerp(-1, 0, p);
      transform.target.posZ = window.THREE.MathUtils.lerp(-2, 0, p);
      transform.target.scale = window.THREE.MathUtils.lerp(0.7, 1, p);
      transform.target.camZ = window.THREE.MathUtils.lerp(14, 10, p);
      transform.target.camY = 2;
      transform.target.camX = 0;
    }
    // PHASE 2: CONNECTOR SHOWCASE (15% - 30%)
    // Close-up on USB connector, slow orbit
    else if (scrollProgress >= 0.15 && scrollProgress < 0.30) {
      const p = (scrollProgress - 0.15) / 0.15;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.1, 0.4, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 1.2, Math.PI * 1.8, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0, 0.2, p);
      transform.target.posX = window.THREE.MathUtils.lerp(0, -1.5, p);
      transform.target.posY = window.THREE.MathUtils.lerp(0, 0.5, p);
      transform.target.posZ = 0;
      transform.target.scale = window.THREE.MathUtils.lerp(1, 1.2, p);
      transform.target.camZ = window.THREE.MathUtils.lerp(10, 7, p);
      transform.target.camY = window.THREE.MathUtils.lerp(2, 1.5, p);
      transform.target.camX = 0;
    }
    // PHASE 3: DRAMATIC FLIP (30% - 45%)
    // Dynamic 360° rotation with lateral movement
    else if (scrollProgress >= 0.30 && scrollProgress < 0.45) {
      const p = (scrollProgress - 0.30) / 0.15;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.4, Math.PI * 0.7, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 1.8, Math.PI * 2.8, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0.2, -0.3, p);
      transform.target.posX = window.THREE.MathUtils.lerp(-1.5, 1.8, p);
      transform.target.posY = window.THREE.MathUtils.lerp(0.5, -0.3, p);
      transform.target.posZ = window.THREE.MathUtils.lerp(0, -1, p);
      transform.target.scale = window.THREE.MathUtils.lerp(1.2, 1, p);
      transform.target.camZ = window.THREE.MathUtils.lerp(7, 9, p);
      transform.target.camY = window.THREE.MathUtils.lerp(1.5, 2.5, p);
      transform.target.camX = window.THREE.MathUtils.lerp(0, -1, p);
    }
    // PHASE 4: FLOATING DISPLAY (45% - 60%)
    // Gentle levitation with slow spin
    else if (scrollProgress >= 0.45 && scrollProgress < 0.60) {
      const p = (scrollProgress - 0.45) / 0.15;
      transform.target.rotX = window.THREE.MathUtils.lerp(Math.PI * 0.7, 0.2, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 2.8, Math.PI * 3.5, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(-0.3, 0.1, p);
      transform.target.posX = window.THREE.MathUtils.lerp(1.8, -0.8, p);
      transform.target.posY = window.THREE.MathUtils.lerp(-0.3, 0.8, p);
      transform.target.posZ = window.THREE.MathUtils.lerp(-1, 0.5, p);
      transform.target.scale = 1;
      transform.target.camZ = window.THREE.MathUtils.lerp(9, 8, p);
      transform.target.camY = window.THREE.MathUtils.lerp(2.5, 1.8, p);
      transform.target.camX = window.THREE.MathUtils.lerp(-1, 0.5, p);
    }
    // PHASE 5: BARREL ROLL (60% - 75%)
    // Aggressive tumble with zoom
    else if (scrollProgress >= 0.60 && scrollProgress < 0.75) {
      const p = (scrollProgress - 0.60) / 0.15;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.2, Math.PI * 1.3, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 3.5, Math.PI * 5, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0.1, Math.PI * 0.5, p);
      transform.target.posX = window.THREE.MathUtils.lerp(-0.8, 2, p);
      transform.target.posY = window.THREE.MathUtils.lerp(0.8, -0.5, p);
      transform.target.posZ = window.THREE.MathUtils.lerp(0.5, -1.5, p);
      transform.target.scale = window.THREE.MathUtils.lerp(1, 1.15, p);
      transform.target.camZ = window.THREE.MathUtils.lerp(8, 10, p);
      transform.target.camY = window.THREE.MathUtils.lerp(1.8, 3, p);
      transform.target.camX = window.THREE.MathUtils.lerp(0.5, -1.5, p);
    }
    // PHASE 6: FINAL POSE (75% - 100%)
    // Elegant return to center, hero position
    else {
      const p = (scrollProgress - 0.75) / 0.25;
      transform.target.rotX = window.THREE.MathUtils.lerp(Math.PI * 1.3, 0.15, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 5, Math.PI * 5.8, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(Math.PI * 0.5, 0, p);
      transform.target.posX = window.THREE.MathUtils.lerp(2, 0, p);
      transform.target.posY = window.THREE.MathUtils.lerp(-0.5, 0, p);
      transform.target.posZ = window.THREE.MathUtils.lerp(-1.5, 0, p);
      transform.target.scale = window.THREE.MathUtils.lerp(1.15, 1, p);
      transform.target.camZ = window.THREE.MathUtils.lerp(10, 11, p);
      transform.target.camY = window.THREE.MathUtils.lerp(3, 2, p);
      transform.target.camX = window.THREE.MathUtils.lerp(-1.5, 0, p);
    }
  }

  // Mouse parallax (micro-interaction)
  function onMouseMove(event) {
    mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function onWindowResize() {
    if (!camera || !renderer) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // Animation loop with buttery-smooth lerp
  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Update embedded animations
    if (mixer) mixer.update(delta);

    if (!isInitialized || !usbModel) return;

    // Smooth mouse tracking
    mouse.x += (mouse.targetX - mouse.x) * LERP_FACTOR * 1.5;
    mouse.y += (mouse.targetY - mouse.y) * LERP_FACTOR * 1.5;

    // Lerp all transform values for cinematic smoothness
    transform.current.rotX += (transform.target.rotX - transform.current.rotX) * LERP_FACTOR;
    transform.current.rotY += (transform.target.rotY - transform.current.rotY) * LERP_FACTOR;
    transform.current.rotZ += (transform.target.rotZ - transform.current.rotZ) * LERP_FACTOR;
    
    transform.current.posX += (transform.target.posX - transform.current.posX) * LERP_FACTOR;
    transform.current.posY += (transform.target.posY - transform.current.posY) * LERP_FACTOR;
    transform.current.posZ += (transform.target.posZ - transform.current.posZ) * LERP_FACTOR;
    
    transform.current.scale += (transform.target.scale - transform.current.scale) * LERP_FACTOR;
    
    transform.current.camZ += (transform.target.camZ - transform.current.camZ) * LERP_FACTOR;
    transform.current.camY += (transform.target.camY - transform.current.camY) * LERP_FACTOR;
    transform.current.camX += (transform.target.camX - transform.current.camX) * LERP_FACTOR;

    // Apply transformations with subtle mouse parallax
    usbModel.rotation.x = transform.current.rotX + (mouse.y * 0.15);
    usbModel.rotation.y = transform.current.rotY + (mouse.x * 0.2);
    usbModel.rotation.z = transform.current.rotZ + (mouse.x * 0.05);

    usbModel.position.x = transform.current.posX + (mouse.x * 0.3);
    usbModel.position.y = transform.current.posY + (mouse.y * 0.25);
    usbModel.position.z = transform.current.posZ;
    
    usbModel.scale.setScalar(transform.current.scale);
    
    camera.position.x = transform.current.camX;
    camera.position.y = transform.current.camY;
    camera.position.z = transform.current.camZ;
    camera.lookAt(usbModel.position);

    renderer.render(scene, camera);
  }

  // Performance optimization
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

  // Initialize function
  function initUSB3DViewer(containerId) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) return;

    loadThreeJS(() => {
      initViewer(containerId);
    });
  }

  // Export to global scope
  window.initUSB3DViewer = initUSB3DViewer;
  window.pauseUSB3DViewer = pause3DViewer;
  window.resumeUSB3DViewer = resume3DViewer;

})();
