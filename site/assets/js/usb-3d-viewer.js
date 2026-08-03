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
  const LERP_FACTOR = 0.035; // Lower = smoother, more "cinematic float"

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
        
        // Scale to fit viewport nicely (slightly larger for impact)
        const targetScale = 5.5 / maxDim;
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

  // 🎬 APPLE-STYLE PREMIUM SCROLL CHOREOGRAPHY - 8 PHASES
  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

    // PHASE 1: DRAMATIC ENTRANCE (0% - 12%)
    // USB emerges from distance, rotating gracefully
    if (scrollProgress < 0.12) {
      const p = scrollProgress / 0.12;
      const easeOut = 1 - Math.pow(1 - p, 3); // Cubic ease-out
      transform.target.rotX = window.THREE.MathUtils.lerp(-0.2, 0.3, easeOut);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 0.5, Math.PI * 1.2, easeOut);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0.1, 0, easeOut);
      transform.target.posX = 0;
      transform.target.posY = window.THREE.MathUtils.lerp(2, 0, easeOut);
      transform.target.posZ = window.THREE.MathUtils.lerp(-5, 0, easeOut);
      transform.target.scale = window.THREE.MathUtils.lerp(0.5, 1, easeOut);
      transform.target.camZ = window.THREE.MathUtils.lerp(18, 10, easeOut);
      transform.target.camY = 2;
      transform.target.camX = 0;
    }
    // PHASE 2: TOP CORNER CLOSEUP (12% - 24%)
    // Zoom to top-right corner, showcase USB connector detail
    else if (scrollProgress >= 0.12 && scrollProgress < 0.24) {
      const p = (scrollProgress - 0.12) / 0.12;
      const easeInOut = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.3, -0.4, easeInOut);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 1.2, Math.PI * 1.6, easeInOut);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0, 0.3, easeInOut);
      transform.target.posX = window.THREE.MathUtils.lerp(0, -2, easeInOut);
      transform.target.posY = window.THREE.MathUtils.lerp(0, 1.5, easeInOut);
      transform.target.posZ = window.THREE.MathUtils.lerp(0, 1, easeInOut);
      transform.target.scale = window.THREE.MathUtils.lerp(1, 1.4, easeInOut);
      transform.target.camZ = window.THREE.MathUtils.lerp(10, 6, easeInOut);
      transform.target.camY = window.THREE.MathUtils.lerp(2, 1, easeInOut);
      transform.target.camX = window.THREE.MathUtils.lerp(0, 1.5, easeInOut);
    }
    // PHASE 3: HORIZONTAL GLIDE (24% - 36%)
    // Smooth horizontal movement, USB glides left to right
    else if (scrollProgress >= 0.24 && scrollProgress < 0.36) {
      const p = (scrollProgress - 0.24) / 0.12;
      transform.target.rotX = window.THREE.MathUtils.lerp(-0.4, 0, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 1.6, Math.PI * 2.5, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0.3, -0.2, p);
      transform.target.posX = window.THREE.MathUtils.lerp(-2, 2.5, p);
      transform.target.posY = window.THREE.MathUtils.lerp(1.5, 0, p);
      transform.target.posZ = window.THREE.MathUtils.lerp(1, 0, p);
      transform.target.scale = window.THREE.MathUtils.lerp(1.4, 1.1, p);
      transform.target.camZ = window.THREE.MathUtils.lerp(6, 8, p);
      transform.target.camY = window.THREE.MathUtils.lerp(1, 2, p);
      transform.target.camX = window.THREE.MathUtils.lerp(1.5, -1, p);
    }
    // PHASE 4: VERTICAL RISE (36% - 48%)
    // USB rises up, rotating to showcase bottom view
    else if (scrollProgress >= 0.36 && scrollProgress < 0.48) {
      const p = (scrollProgress - 0.36) / 0.12;
      const easeOut = 1 - Math.pow(1 - p, 2);
      transform.target.rotX = window.THREE.MathUtils.lerp(0, 0.8, easeOut);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 2.5, Math.PI * 3.2, easeOut);
      transform.target.rotZ = window.THREE.MathUtils.lerp(-0.2, 0.1, easeOut);
      transform.target.posX = window.THREE.MathUtils.lerp(2.5, 0, easeOut);
      transform.target.posY = window.THREE.MathUtils.lerp(0, -2, easeOut);
      transform.target.posZ = window.THREE.MathUtils.lerp(0, -0.5, easeOut);
      transform.target.scale = window.THREE.MathUtils.lerp(1.1, 1.3, easeOut);
      transform.target.camZ = window.THREE.MathUtils.lerp(8, 7, easeOut);
      transform.target.camY = window.THREE.MathUtils.lerp(2, 3.5, easeOut);
      transform.target.camX = window.THREE.MathUtils.lerp(-1, 0, easeOut);
    }
    // PHASE 5: BOTTOM CORNER DETAIL (48% - 60%)
    // Focus on bottom-left corner, close inspection
    else if (scrollProgress >= 0.48 && scrollProgress < 0.60) {
      const p = (scrollProgress - 0.48) / 0.12;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.8, 0.5, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 3.2, Math.PI * 4, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0.1, -0.3, p);
      transform.target.posX = window.THREE.MathUtils.lerp(0, 1.8, p);
      transform.target.posY = window.THREE.MathUtils.lerp(-2, -1, p);
      transform.target.posZ = window.THREE.MathUtils.lerp(-0.5, 1, p);
      transform.target.scale = window.THREE.MathUtils.lerp(1.3, 1.2, p);
      transform.target.camZ = window.THREE.MathUtils.lerp(7, 6.5, p);
      transform.target.camY = window.THREE.MathUtils.lerp(3.5, 1.5, p);
      transform.target.camX = window.THREE.MathUtils.lerp(0, -1.5, p);
    }
    // PHASE 6: FULL ROTATION SHOWCASE (60% - 72%)
    // Complete 360° rotation, all angles visible
    else if (scrollProgress >= 0.60 && scrollProgress < 0.72) {
      const p = (scrollProgress - 0.60) / 0.12;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.5, -0.3, p);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 4, Math.PI * 5.2, p);
      transform.target.rotZ = window.THREE.MathUtils.lerp(-0.3, 0.2, p);
      transform.target.posX = window.THREE.MathUtils.lerp(1.8, -1.5, p);
      transform.target.posY = window.THREE.MathUtils.lerp(-1, 0.5, p);
      transform.target.posZ = window.THREE.MathUtils.lerp(1, -1, p);
      transform.target.scale = window.THREE.MathUtils.lerp(1.2, 1, p);
      transform.target.camZ = window.THREE.MathUtils.lerp(6.5, 9, p);
      transform.target.camY = window.THREE.MathUtils.lerp(1.5, 2, p);
      transform.target.camX = window.THREE.MathUtils.lerp(-1.5, 1, p);
    }
    // PHASE 7: ZOOM OUT REVEAL (72% - 84%)
    // Pull back to see full USB in context
    else if (scrollProgress >= 0.72 && scrollProgress < 0.84) {
      const p = (scrollProgress - 0.72) / 0.12;
      const easeIn = p * p;
      transform.target.rotX = window.THREE.MathUtils.lerp(-0.3, 0.2, easeIn);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 5.2, Math.PI * 5.8, easeIn);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0.2, 0, easeIn);
      transform.target.posX = window.THREE.MathUtils.lerp(-1.5, 0, easeIn);
      transform.target.posY = window.THREE.MathUtils.lerp(0.5, 0, easeIn);
      transform.target.posZ = window.THREE.MathUtils.lerp(-1, 0, easeIn);
      transform.target.scale = window.THREE.MathUtils.lerp(1, 0.9, easeIn);
      transform.target.camZ = window.THREE.MathUtils.lerp(9, 12, easeIn);
      transform.target.camY = window.THREE.MathUtils.lerp(2, 2.5, easeIn);
      transform.target.camX = window.THREE.MathUtils.lerp(1, 0, easeIn);
    }
    // PHASE 8: HERO FINALE (84% - 100%)
    // Final position, perfect presentation angle
    else {
      const p = (scrollProgress - 0.84) / 0.16;
      const easeOut = 1 - Math.pow(1 - p, 3);
      transform.target.rotX = window.THREE.MathUtils.lerp(0.2, 0.25, easeOut);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 5.8, Math.PI * 6, easeOut);
      transform.target.rotZ = 0;
      transform.target.posX = 0;
      transform.target.posY = 0;
      transform.target.posZ = 0;
      transform.target.scale = 1;
      transform.target.camZ = window.THREE.MathUtils.lerp(12, 10, easeOut);
      transform.target.camY = 2;
      transform.target.camX = 0;
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
