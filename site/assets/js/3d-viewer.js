/**
 * Optimized 3D GLB Viewer with Three.js
 * Responsive, mobile-friendly, performant
 */

(function() {
  'use strict';

  let scene, camera, renderer, model, mixer, clock;
  let container, isInitialized = false;
  let animationFrameId = null;

  // Lazy load Three.js when needed
  function loadThreeJS(callback) {
    if (window.THREE) {
      callback();
      return;
    }

    // Load Three.js from CDN
    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    script1.onload = () => {
      // Load GLTFLoader
      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/js/loaders/GLTFLoader.js';
      script2.onload = callback;
      document.head.appendChild(script2);
    };
    document.head.appendChild(script1);
  }

  function init3DViewer(containerId) {
    container = document.getElementById(containerId);
    if (!container || isInitialized) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer with optimizations
    renderer = new THREE.WebGLRenderer({ 
      antialias: window.innerWidth > 768, // Sadece desktop'ta antialiasing
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Max 2x
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x4f46e5, 0.3);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // Load GLB Model
    const loader = new THREE.GLTFLoader();
    loader.load(
      'assets/models/flash_driver.glb',
      (gltf) => {
        model = gltf.scene;
        
        // Center and scale model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        
        scene.add(model);

        // Animation mixer (if model has animations)
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach(clip => {
            mixer.clipAction(clip).play();
          });
        }

        console.log('✅ 3D Model loaded successfully');
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
    clock = new THREE.Clock();

    // Resize handler
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    isInitialized = true;
    animate();
  }

  function onWindowResize() {
    if (!container || !camera || !renderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();

    // Update animations
    if (mixer) {
      mixer.update(delta);
    }

    // Auto-rotate model
    if (model) {
      model.rotation.y += 0.005; // Slow rotation
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

  // Intersection Observer for lazy rendering
  function setup3DViewerWithObserver(containerId) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isInitialized) {
            loadThreeJS(() => {
              init3DViewer(containerId);
            });
          } else {
            resume3DViewer();
          }
        } else {
          pause3DViewer();
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(targetContainer);
  }

  // Export to global scope
  window.init3DViewer = setup3DViewerWithObserver;
  window.pause3DViewer = pause3DViewer;
  window.resume3DViewer = resume3DViewer;

})();
