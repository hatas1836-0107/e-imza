/**
 * Optimized & Cinematic 3D GLB Background Viewer with Three.js
 * Fixed background with multi-stage scroll-reactive transitions
 * Includes micro-mouse parallax & high-fidelity smoothing
 */

(function() {
  'use strict';

  let scene, camera, renderer, model, mixer, clock;
  let container, isInitialized = false;
  let animationFrameId = null;
  let scrollProgress = 0;

  // Yumuşatma katsayısı (Düşük değer = Daha akıcı ve ağır geçişler, 'Cool' etki)
  const LERP_FACTOR = 0.06;

  // Dinamik hedef ve mevcut animasyon değerleri
  const transform = {
    target: { rotX: 0, rotY: 0, rotZ: 0, posX: 0, posY: 0, posZ: 0, camZ: 9 },
    current: { rotX: 0, rotY: 0, rotZ: 0, posX: 0, posY: 0, posZ: 0, camZ: 9 }
  };

  // Mouse takip değişkenleri (Modelin nefes alması gibi hafif etkileşim için)
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Lazy load Three.js with importmap
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

  function init3DViewer(containerId) {
    container = document.getElementById(containerId);
    if (!container || isInitialized) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene & Camera Setup
    scene = new window.THREE.Scene();
    camera = new window.THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2, transform.current.camZ);

    // Renderer Setup
    renderer = new window.THREE.WebGLRenderer({ 
      antialias: window.innerWidth > 768,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = window.THREE.SRGBColorSpace;
    renderer.toneMapping = window.THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Cinematic Lighting (Stüdyo Kalitesi)
    const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new window.THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 5, 4);
    scene.add(mainLight);

    const blueRimLight = new window.THREE.DirectionalLight(0x4f46e5, 1.2);
    blueRimLight.position.set(-5, 3, -3);
    scene.add(blueRimLight);

    const cyanRimLight = new window.THREE.DirectionalLight(0x22d3ee, 0.9);
    cyanRimLight.position.set(0, -5, -5);
    scene.add(cyanRimLight);

    // Load GLB Model
    const loader = new window.GLTFLoader();
    loader.load(
      'assets/models/flash_driver.glb',
      (gltf) => {
        model = gltf.scene;
        
        // Modeli merkeze oturtma
        const box = new window.THREE.Box3().setFromObject(model);
        const center = box.getCenter(new window.THREE.Vector3());
        const size = box.getSize(new window.THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        
        const baseScale = 6.0 / maxDim;
        model.scale.setScalar(baseScale);
        model.position.sub(center.multiplyScalar(baseScale));
        model.userData.baseScale = baseScale;
        
        const wrapper = new window.THREE.Group();
        wrapper.add(model);
        scene.add(wrapper);
        model = wrapper;

        // Animation mixer
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new window.THREE.AnimationMixer(model);
          gltf.animations.forEach(clip => {
            mixer.clipAction(clip).play();
          });
        }

        isInitialized = true;
        console.log('✅ 3D Flash Drive loaded - Cinematic mode active');
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

    // Event Listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onWindowResize, false);

    animate();
  }

  // MÜKEMMEL GEÇİŞ MATRİSİ (Apple Tarzı Scroll Kurgusu)
  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

    // Parçalı Zaman Çizelgesi (4 FAZ Scroll Timeline)
    if (scrollProgress < 0.25) {
      // FAZ 1: Giriş Ekranı - USB connector görünür, yakınlaşma (0% - 25%)
      const localP = scrollProgress / 0.25;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.2, 0.4, localP);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI, Math.PI * 1.5, localP);
      transform.target.rotZ = 0;
      transform.target.posX = 0;
      transform.target.posY = 0;
      transform.target.posZ = 0;
      transform.target.camZ = window.THREE.MathUtils.lerp(9, 7, localP);
    } 
    else if (scrollProgress >= 0.25 && scrollProgress < 0.55) {
      // FAZ 2: Detay Gösterimi - Yan yatıyor, sola kayıyor (25% - 55%)
      const localP = (scrollProgress - 0.25) / 0.30;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.4, 0.7, localP);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 1.5, Math.PI * 2.3, localP);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0, 0.3, localP);
      transform.target.posX = window.THREE.MathUtils.lerp(0, -1.0, localP);
      transform.target.posY = window.THREE.MathUtils.lerp(0, 0.3, localP);
      transform.target.posZ = 0;
      transform.target.camZ = 7;
    } 
    else if (scrollProgress >= 0.55 && scrollProgress < 0.80) {
      // FAZ 3: Dev Takla & Geçiş - USB tam dönüş, sağa kayma (55% - 80%)
      const localP = (scrollProgress - 0.55) / 0.25;
      transform.target.rotX = window.THREE.MathUtils.lerp(0.7, Math.PI * 1.2, localP);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 2.3, Math.PI * 3.5, localP);
      transform.target.rotZ = window.THREE.MathUtils.lerp(0.3, -0.2, localP);
      transform.target.posX = window.THREE.MathUtils.lerp(-1.0, 1.2, localP);
      transform.target.posY = window.THREE.MathUtils.lerp(0.3, -0.3, localP);
      transform.target.posZ = 0;
      transform.target.camZ = window.THREE.MathUtils.lerp(7, 8, localP);
    } 
    else {
      // FAZ 4: Kapanış - Merkeze dönüş, final pose (80% - 100%)
      const localP = (scrollProgress - 0.80) / 0.20;
      transform.target.rotX = window.THREE.MathUtils.lerp(Math.PI * 1.2, 0.3, localP);
      transform.target.rotY = window.THREE.MathUtils.lerp(Math.PI * 3.5, Math.PI * 4, localP);
      transform.target.rotZ = window.THREE.MathUtils.lerp(-0.2, 0, localP);
      transform.target.posX = window.THREE.MathUtils.lerp(1.2, 0, localP);
      transform.target.posY = window.THREE.MathUtils.lerp(-0.3, 0, localP);
      transform.target.posZ = window.THREE.MathUtils.lerp(0, -1, localP);
      transform.target.camZ = window.THREE.MathUtils.lerp(8, 6, localP);
    }
  }

  // Mouse Hareketi (Micro-interaction Parallax)
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

  // Lerp (Kusursuz Yumuşatma) Döngüsü
  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (mixer) mixer.update(delta);

    if (!isInitialized || !model) return;

    // Mouse Değerlerini Yumuşat (Gecikmeli takip etkisi)
    mouse.x += (mouse.targetX - mouse.x) * LERP_FACTOR;
    mouse.y += (mouse.targetY - mouse.y) * LERP_FACTOR;

    // Model Rotasyon ve Pozisyon Değerlerini Lerp ile Yumuşat
    transform.current.rotX += (transform.target.rotX - transform.current.rotX) * LERP_FACTOR;
    transform.current.rotY += (transform.target.rotY - transform.current.rotY) * LERP_FACTOR;
    transform.current.rotZ += (transform.target.rotZ - transform.current.rotZ) * LERP_FACTOR;
    
    transform.current.posX += (transform.target.posX - transform.current.posX) * LERP_FACTOR;
    transform.current.posY += (transform.target.posY - transform.current.posY) * LERP_FACTOR;
    transform.current.posZ += (transform.target.posZ - transform.current.posZ) * LERP_FACTOR;
    
    transform.current.camZ += (transform.target.camZ - transform.current.camZ) * LERP_FACTOR;

    // Değerleri Uygula (Scroll + Hafif Mouse Esnekliği)
    model.rotation.x = transform.current.rotX + (mouse.y * 0.2);
    model.rotation.y = transform.current.rotY + (mouse.x * 0.25);
    model.rotation.z = transform.current.rotZ;

    model.position.x = transform.current.posX;
    model.position.y = transform.current.posY;
    model.position.z = transform.current.posZ;
    
    camera.position.z = transform.current.camZ;
    camera.lookAt(model.position);

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

  // Init function
  function init3DBackground(containerId) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) return;

    loadThreeJS(() => {
      init3DViewer(containerId);
    });
  }

  // Export to global scope
  window.init3DBackground = init3DBackground;
  window.pause3DViewer = pause3DViewer;
  window.resume3DViewer = resume3DViewer;

})();
