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
      // MASTER SCROLL-BASED ANIMATION SYSTEM
      // scrollProgress (0-1) scroll pozisyonunu temsil eder
      
      // Easing function
      const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      
      // BASE ROTATION - Scroll ile sürekli artan değer (tekrar etmeyen)
      const baseRotationY = scrollProgress * Math.PI * 12; // 12 tam tur - daha dinamik
      const baseRotationX = Math.sin(scrollProgress * Math.PI * 6) * Math.PI * 1.2;
      const baseRotationZ = Math.cos(scrollProgress * Math.PI * 5) * Math.PI * 0.8;
      
      // POSITION - Scroll'a göre unique pozisyonlar
      const posX = Math.sin(scrollProgress * Math.PI * 8) * 1.5;
      const posY = Math.cos(scrollProgress * Math.PI * 7) * 1.0;
      const posZ = -scrollProgress * 4 + Math.sin(scrollProgress * Math.PI * 6) * 2.0; // Daha agresif zoom
      
      // CAMERA CHOREOGRAPHY - Farklı açılardan bakmak için
      let camX = Math.sin(scrollProgress * Math.PI * 4) * 3;
      let camY = 2 + Math.cos(scrollProgress * Math.PI * 3) * 2;
      let camZ = 8 - scrollProgress * 5; // Scroll'da kamera yaklaşıyor
      
      // MICRO MOVEMENTS - Sadece hafif canlılık için elapsedTime
      const microRotX = Math.sin(elapsedTime * 0.4) * 0.08;
      const microRotY = Math.cos(elapsedTime * 0.3) * 0.08;
      const microRotZ = Math.sin(elapsedTime * 0.5) * 0.05;
      
      const microPosX = Math.sin(elapsedTime * 0.6) * 0.12;
      const microPosY = Math.cos(elapsedTime * 0.8) * 0.15;
      const microPosZ = Math.sin(elapsedTime * 0.4) * 0.08;
      
      // DRAMATIC MOMENTS - Belirli scroll noktalarında özel efektler
      let dramaticMultiplier = 1.0;
      let speedBoost = 1.0;
      
      if (scrollProgress < 0.12) {
        // AÇILIŞ: USB ucu DOĞRUDAN ekrana bakıyor (0-12%)
        const localProgress = scrollProgress / 0.12;
        targetRotation.x = easeInOutQuad(localProgress) * 0.1;
        targetRotation.y = 0; // Straight on
        targetRotation.z = 0;
        targetPosition.x = 0;
        targetPosition.y = 0;
        targetPosition.z = -1.5 + microPosZ;
        camX = 0;
        camY = 2;
        camZ = 10 - localProgress * 2; // Yaklaşıyor
        dramaticMultiplier = 1.2;
        
      } else if (scrollProgress >= 0.12 && scrollProgress < 0.25) {
        // MOMENT 1: Hızlı 360° spin + zoom out (12-25%)
        const localProgress = (scrollProgress - 0.12) / 0.13;
        speedBoost = 1.0 + localProgress * 5.0; // 6x hızlanma
        targetRotation.x = baseRotationX * speedBoost;
        targetRotation.y = baseRotationY * speedBoost * 2;
        targetRotation.z = baseRotationZ * speedBoost;
        targetPosition.z = -1.5 + localProgress * 3; // Zoom out
        dramaticMultiplier = 1.0 + easeInOutQuad(localProgress) * 0.5;
        camZ = 8 + localProgress * 2; // Kamera da geri gidiyor
        
      } else if (scrollProgress >= 0.25 && scrollProgress < 0.40) {
        // MOMENT 2: Side profile showcase - USB yan tarafı (25-40%)
        const localProgress = (scrollProgress - 0.25) / 0.15;
        targetRotation.x = Math.PI * 0.15;
        targetRotation.y = Math.PI * 0.5 + easeInOutQuad(localProgress) * Math.PI * 0.5;
        targetRotation.z = Math.PI * 0.25;
        targetPosition.x = Math.sin(localProgress * Math.PI * 2) * 0.8;
        targetPosition.y = 0.3;
        targetPosition.z = -1.0;
        camX = 2 + Math.sin(localProgress * Math.PI) * 2; // Kamera yandan yaklaşıyor
        camY = 2.5;
        camZ = 7;
        speedBoost = 0.5; // Yavaş elegant
        
      } else if (scrollProgress >= 0.40 && scrollProgress < 0.55) {
        // MOMENT 3: TOP VIEW - Yukarıdan bakış (40-55%)
        const localProgress = (scrollProgress - 0.40) / 0.15;
        targetRotation.x = Math.PI * 0.5 + easeInOutQuad(localProgress) * Math.PI * 0.3;
        targetRotation.y = baseRotationY * 0.8;
        targetRotation.z = Math.sin(localProgress * Math.PI * 3) * 0.6;
        targetPosition.y = -0.5;
        camX = Math.sin(localProgress * Math.PI * 2) * 1.5;
        camY = 5 + localProgress * 2; // Kamera yukarı çıkıyor
        camZ = 6;
        dramaticMultiplier = 1.1;
        
      } else if (scrollProgress >= 0.55 && scrollProgress < 0.72) {
        // MOMENT 4: EXTREME TUMBLING - Çılgın dönüşler (55-72%)
        const localProgress = (scrollProgress - 0.55) / 0.17;
        speedBoost = 3.0 + Math.sin(localProgress * Math.PI * 6) * 3.0; // Variable 0-6x speed
        dramaticMultiplier = 1.4 + Math.sin(localProgress * Math.PI * 4) * 0.4;
        
        // Chaotic multi-axis rotation
        targetRotation.x = baseRotationX * 2.5 + Math.sin(scrollProgress * Math.PI * 20) * 2.0;
        targetRotation.y = baseRotationY * 2.0 + Math.cos(scrollProgress * Math.PI * 25) * 1.8;
        targetRotation.z = baseRotationZ * 3.0 + Math.sin(scrollProgress * Math.PI * 15) * 1.5;
        
        // Wild position changes
        targetPosition.x = Math.sin(localProgress * Math.PI * 8) * 1.2;
        targetPosition.y = Math.cos(localProgress * Math.PI * 6) * 1.0;
        targetPosition.z = -2.0 + Math.sin(localProgress * Math.PI * 10) * 1.5;
        
        // Kamera da çılgınca hareket ediyor
        camX = Math.sin(localProgress * Math.PI * 5) * 3;
        camY = 2 + Math.cos(localProgress * Math.PI * 4) * 2;
        camZ = 6 + Math.sin(localProgress * Math.PI * 3) * 2;
        
      } else if (scrollProgress >= 0.72 && scrollProgress < 0.85) {
        // MOMENT 5: FRONT CLOSE-UP - USB ucu tekrar ekrana (72-85%)
        const localProgress = (scrollProgress - 0.72) / 0.13;
        targetRotation.x = Math.sin(localProgress * Math.PI) * 0.2;
        targetRotation.y = Math.PI * 0.08 + Math.sin(localProgress * Math.PI * 2) * 0.15;
        targetRotation.z = 0;
        targetPosition.x = 0;
        targetPosition.y = Math.sin(localProgress * Math.PI) * 0.3;
        targetPosition.z = -3.5; // Çok yakın!
        camX = 0;
        camY = 2;
        camZ = 4; // Kamera çok yakın
        speedBoost = 0.3; // Çok yavaş, dramatik
        dramaticMultiplier = 1.5;
        
      } else {
        // MOMENT 6: GRAND FINALE - Explosive zoom + multi-axis spin (85-100%)
        const localProgress = (scrollProgress - 0.85) / 0.15;
        speedBoost = 2.0 + localProgress * 5.0; // 7x'e kadar hızlanıyor
        
        targetRotation.x = Math.sin(localProgress * Math.PI * 8) * Math.PI;
        targetRotation.y = baseRotationY * speedBoost;
        targetRotation.z = Math.cos(localProgress * Math.PI * 6) * Math.PI * 0.8;
        
        targetPosition.x = Math.cos(localProgress * Math.PI * 10) * 1.5;
        targetPosition.y = Math.sin(localProgress * Math.PI * 12) * 1.2;
        targetPosition.z = -5.0 + Math.sin(localProgress * Math.PI * 15) * 3.0; // Extreme zoom
        
        camX = Math.sin(localProgress * Math.PI * 8) * 4;
        camY = 2 + Math.cos(localProgress * Math.PI * 6) * 3;
        camZ = 3 + localProgress * 2; // Kamera geri çekiliyor
        
        dramaticMultiplier = 1.3 + localProgress * 1.2;
      }
      
      // SMOOTH LERP INTERPOLATION
      const lerpSpeed = 0.08; // Responsive ama smooth
      currentRotation.x += (targetRotation.x - currentRotation.x) * lerpSpeed;
      currentRotation.y += (targetRotation.y - currentRotation.y) * lerpSpeed;
      currentRotation.z += (targetRotation.z - currentRotation.z) * lerpSpeed;
      
      currentPosition.x += (targetPosition.x - currentPosition.x) * lerpSpeed;
      currentPosition.y += (targetPosition.y - currentPosition.y) * lerpSpeed;
      currentPosition.z += (targetPosition.z - currentPosition.z) * lerpSpeed;
      
      // APPLY TO MODEL
      model.rotation.x = currentRotation.x + mouse.y * 0.3;
      model.rotation.y = currentRotation.y + mouse.x * 0.4;
      model.rotation.z = currentRotation.z + mouse.x * 0.1;
      
      model.position.x = currentPosition.x;
      model.position.y = currentPosition.y;
      model.position.z = currentPosition.z;
      
      // CAMERA MOVEMENT - Farklı açılardan bakmak için
      camera.position.x += (camX - camera.position.x) * 0.06;
      camera.position.y += (camY - camera.position.y) * 0.06;
      camera.position.z += (camZ - camera.position.z) * 0.06;
      camera.lookAt(model.position);
      
      // DYNAMIC SCALE - Scroll + dramatic moments
      const baseScale = model.userData.baseScale || 6.0;
      const scrollZoom = 1.0 + scrollProgress * 0.6; // Scroll'da %60 büyüyor
      const breathe = 1.0 + Math.sin(elapsedTime * 0.7) * 0.06;
      const dramatic = dramaticMultiplier;
      model.scale.setScalar(baseScale * scrollZoom * breathe * dramatic);
      
      // Reset targets for next frame
      if (!targetPosition.z || targetPosition.z > -0.5) {
        targetPosition = { x: posX + microPosX, y: posY + microPosY, z: posZ + microPosZ };
      }
      if (!targetRotation.y) {
        targetRotation = { 
          x: baseRotationX + microRotX, 
          y: baseRotationY * speedBoost + microRotY, 
          z: baseRotationZ + microRotZ 
        };
      }
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
