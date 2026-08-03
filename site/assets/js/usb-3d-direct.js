/**
 * DIRECT SCROLL CONTROL - NO LERP TEST
 * Immediate response to scroll
 */

(function() {
  'use strict';

  let scene, camera, renderer, usbModel, mixer, clock;
  let isReady = false;

  function loadThreeJS(callback) {
    if (window.THREE) return callback();

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

  function initDirectViewer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return console.error('Container not found');

    console.log('🚀 DIRECT USB VIEWER STARTING...');

    const width = window.innerWidth;
    const height = window.innerHeight;

    scene = new window.THREE.Scene();
    camera = new window.THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2, 12);

    renderer = new window.THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = window.THREE.SRGBColorSpace;
    renderer.toneMapping = window.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new window.THREE.AmbientLight(0xffffff, 0.8));
    const keyLight = new window.THREE.DirectionalLight(0xffffff, 2);
    keyLight.position.set(8, 6, 5);
    scene.add(keyLight);
    const rimLight1 = new window.THREE.DirectionalLight(0x4f46e5, 1.5);
    rimLight1.position.set(-6, 2, -4);
    scene.add(rimLight1);
    const rimLight2 = new window.THREE.DirectionalLight(0x06b6d4, 1.2);
    rimLight2.position.set(6, -3, -5);
    scene.add(rimLight2);

    // Load model
    const loader = new window.GLTFLoader();
    loader.load(
      'assets/models/usb-stick_animation.glb?v=5',
      (gltf) => {
        usbModel = gltf.scene;
        
        const box = new window.THREE.Box3().setFromObject(usbModel);
        const center = box.getCenter(new window.THREE.Vector3());
        const size = box.getSize(new window.THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        const scale = 5 / maxDim;
        usbModel.scale.setScalar(scale);
        usbModel.position.sub(center.multiplyScalar(scale));
        
        scene.add(usbModel);

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new window.THREE.AnimationMixer(usbModel);
          gltf.animations.forEach(clip => mixer.clipAction(clip).play());
        }

        isReady = true;
        console.log('✅ USB MODEL LOADED!');
        updatePosition(); // Initial position
      },
      (xhr) => console.log('Loading:', (xhr.loaded / xhr.total * 100).toFixed(0) + '%'),
      (err) => console.error('Error:', err)
    );

    clock = new window.THREE.Clock();

    // SCROLL EVENT - DIRECT UPDATE
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
  }

  // DIRECT POSITION UPDATE - NO INTERPOLATION
  function updatePosition() {
    if (!isReady || !usbModel) return;

    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    console.log('🎯 DIRECT UPDATE - Scroll:', (progress * 100).toFixed(1) + '%');

    // DIRECT ROTATION - IMMEDIATE
    if (progress < 0.2) {
      // Standing upright
      usbModel.rotation.x = Math.PI * 0.5;
      usbModel.rotation.y = progress * Math.PI;
      usbModel.rotation.z = 0;
      usbModel.position.set(0, 0, 0);
      camera.position.z = 12;
    }
    else if (progress < 0.4) {
      // Tilting forward
      const p = (progress - 0.2) / 0.2;
      usbModel.rotation.x = Math.PI * (0.5 - p * 0.3);
      usbModel.rotation.y = Math.PI * (1 + p);
      usbModel.rotation.z = p * 0.3;
      usbModel.position.set(p * 2, 0, 0);
      camera.position.z = 12 - p * 3;
    }
    else if (progress < 0.6) {
      // Laying flat
      const p = (progress - 0.4) / 0.2;
      usbModel.rotation.x = Math.PI * (0.2 - p * 0.2);
      usbModel.rotation.y = Math.PI * (2 + p * 2);
      usbModel.rotation.z = 0.3 - p * 0.3;
      usbModel.position.set(2 - p * 4, 0, 0);
      camera.position.z = 9;
    }
    else if (progress < 0.8) {
      // Standing again
      const p = (progress - 0.6) / 0.2;
      usbModel.rotation.x = Math.PI * (0 + p * 0.5);
      usbModel.rotation.y = Math.PI * (4 + p);
      usbModel.rotation.z = p * 0.2;
      usbModel.position.set(-2 + p * 2, 0, 0);
      camera.position.z = 9 + p * 2;
    }
    else {
      // Final pose
      const p = (progress - 0.8) / 0.2;
      usbModel.rotation.x = Math.PI * 0.5;
      usbModel.rotation.y = Math.PI * (5 + p);
      usbModel.rotation.z = 0;
      usbModel.position.set(0, 0, 0);
      camera.position.z = 11;
    }

    camera.lookAt(usbModel.position);
  }

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (isReady) renderer.render(scene, camera);
  }

  window.initUSBDirect = function(id) {
    loadThreeJS(() => initDirectViewer(id));
  };

})();
