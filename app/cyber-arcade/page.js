"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CyberArcadePage() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let animationFrameId = null;

    // Load Three.js dynamically to ensure SSR safety
    let THREE;
    let GLTFLoader;
    let RGBELoader;

    const initThree = async () => {
      try {
        THREE = await import('three');
        const gltfModule = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const rgbeModule = await import('three/examples/jsm/loaders/RGBELoader.js');

        GLTFLoader = gltfModule.GLTFLoader;
        RGBELoader = rgbeModule.RGBELoader;

        runScene();
      } catch (err) {
        console.error("Failed to load Three.js dependencies:", err);
      }
    };

    const runScene = () => {
      if (!mounted || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 3.0;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0.5, 3.4);
      camera.lookAt(0, 0.1, 0);

      // HDR ENVIRONMENT
      const loadHDR = () => {
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load(
          'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/evening_road_01_1k.hdr',
          (hdrTexture) => {
            if (!mounted) return;
            hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = hdrTexture;
            applySceneValues();
          },
          undefined,
          (err) => {
            console.error("Failed to load HDR environment texture:", err);
            // Call applySceneValues anyway to run lighting setups
            applySceneValues();
          }
        );
      };

      // Fallback lighting in case HDR environment fails to load
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
      scene.add(hemisphereLight);

      const rimLight = new THREE.DirectionalLight(0xf15a24, 0.0);
      rimLight.position.set(-4, 1.5, -5);
      scene.add(rimLight);

      const keyLight = new THREE.DirectionalLight(0xf15a24, 1.0);
      keyLight.position.set(5, 10, 5);
      keyLight.castShadow = true;
      scene.add(keyLight);
      const keyLightTarget = new THREE.Object3D();
      scene.add(keyLightTarget);
      keyLight.target = keyLightTarget;

      // NETWORK BACKGROUND
      const nodeCount = 280;
      const maxLinkDist = 9.0;
      const networkNodes = [];
      const networkGroup = new THREE.Group();
      scene.add(networkGroup);
      networkGroup.position.z = -2;

      for (let i = 0; i < nodeCount; i++) {
        networkNodes.push({
          pos: new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 50 - 25),
          vel: new THREE.Vector3((Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.012, (Math.random() - 0.5) * 0.012)
        });
      }

      const nodeGeom = new THREE.BufferGeometry();
      const nodeMat = new THREE.PointsMaterial({ 
        color: 0x00dbff, size: 0.12, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending 
      });
      const nodePoints = new THREE.Points(nodeGeom, nodeMat);
      networkGroup.add(nodePoints);

      const linkGeom = new THREE.BufferGeometry();
      const linkMat = new THREE.LineBasicMaterial({ 
        color: 0x0099ff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending 
      });
      const networkLinks = new THREE.LineSegments(linkGeom, linkMat);
      networkGroup.add(networkLinks);

      const updateNetwork = (scrollParallax) => {
        const nodePosArray = new Float32Array(nodeCount * 3);
        const linkPosArray = [];

        for (let i = 0; i < nodeCount; i++) {
          const n = networkNodes[i];
          n.pos.add(n.vel);

          if (Math.abs(n.pos.x) > 25) n.vel.x *= -1;
          if (Math.abs(n.pos.y) > 15) n.vel.y *= -1;
          if (Math.abs(n.pos.z + 15) > 10) n.vel.z *= -1;

          nodePosArray[i*3]   = n.pos.x;
          nodePosArray[i*3+1] = n.pos.y;
          nodePosArray[i*3+2] = n.pos.z;

          for (let j = i + 1; j < nodeCount; j++) {
            const dist = n.pos.distanceTo(networkNodes[j].pos);
            if (dist < maxLinkDist) {
              linkPosArray.push(n.pos.x, n.pos.y, n.pos.z, networkNodes[j].pos.x, networkNodes[j].pos.y, networkNodes[j].pos.z);
            }
          }
        }

        nodeGeom.setAttribute('position', new THREE.BufferAttribute(nodePosArray, 3));
        linkGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linkPosArray), 3));
        networkGroup.position.y = scrollParallax * 0.002;
      };

      // LOAD MODEL
      let car = null;
      let carLoaded = false;
      const modelUrl = '/models/cyber-arcade/steam_deck_console.glb';

      loadHDR();
      if (modelUrl) {
        const loader = new GLTFLoader();

        loader.load(
          modelUrl,
          (gltf) => {
            if (!mounted) return;
            car = gltf.scene;

            const box = new THREE.Box3().setFromObject(car);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.8 / maxDim;
            car.scale.setScalar(scale);

            car.position.x = -center.x * scale;
            car.position.y = -center.y * scale;
            car.position.z = -center.z * scale;

            car.traverse(child => {
              if (child.isMesh) {
                const name = child.name.toLowerCase();
                if (name.includes('valve') || name.includes('logo') || name.includes('branding')) {
                  child.visible = false;
                }

                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                  const mats = Array.isArray(child.material) ? child.material : [child.material];
                  mats.forEach(m => {
                    m.envMapIntensity = sceneValues.hdrIntensity;
                  });
                }
              }
            });

            // Add INNVIKTA text
            const labelCanvas = document.createElement('canvas');
            labelCanvas.width = 1024;
            labelCanvas.height = 256;
            const ctx = labelCanvas.getContext('2d');
            ctx.fillStyle = '#0f0f0f';
            ctx.fillRect(0, 0, 1024, 256);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; 
            ctx.font = '900 120px "Barlow Condensed"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('INNVIKTA', 512, 128);

            const labelTex = new THREE.CanvasTexture(labelCanvas);
            const labelMat = new THREE.MeshStandardMaterial({ 
              map: labelTex,
              transparent: false,
              roughness: 0.2,
              metalness: 0.9
            });
            const labelGeo = new THREE.PlaneGeometry(2.0, 0.7);
            const labelMesh = new THREE.Mesh(labelGeo, labelMat);
            
            labelMesh.position.set(center.x, center.y + 0.22, center.z - size.z/2 - 0.015); 
            labelMesh.rotation.y = Math.PI; 
            car.add(labelMesh);

            scene.add(car);
            carLoaded = true;
          },
          (xhr) => {
            if (xhr.total) {
              console.log(`Model: ${(xhr.loaded / xhr.total * 100).toFixed(2)}% loaded`);
            }
          },
          (err) => {
            console.error("Failed to load 3D GLTF model:", err);
          }
        );
      }

      const keyframes = [
        { x: 0.46, z: 2.69, cx: 2.06, cy: 0.01, cz: 4.8, lx: -2.23, ly: 0.0, lz: 0.0, fov: 45.0, yaw: 0.0 }, // Hero
        { x: -0.11, z: 4.53, cx: 1.66, cy: -0.12, cz: 6.05, lx: -0.23, ly: 0.05, lz: 2.35, fov: 15.0, yaw: 3.138 }, // Overview
        { x: -1.5, z: 0.4, cx: -5.1, cy: 1.21, cz: 0.5, lx: -0.57, ly: -0.5, lz: 0.0, fov: 30.0, yaw: 0.8 }, // Specs
        { x: -0.46, z: -0.63, cx: 0.23, cy: 6.02, cz: 0.6, lx: 0.06, ly: -3.13, lz: 0.17, fov: 21.5, yaw: 1.858 }, // Features
        { x: 0.0, z: 0.0, cx: 0.0, cy: 0.1, cz: 3.5, lx: 0.0, ly: 0.0, lz: 0.0, fov: 15.0, yaw: 0.0 }, // Games
        { x: 0.0,   z: 0.0, cx: -0.03, cy: 0.81, cz: 3.1, lx: 0.0,  ly: -0.81, lz: 0.99, fov: 32.5, yaw: 0.0 }, // Quote
        { x: -0.5, z: -0.2, cx: 3.87, cy: -0.12, cz: 3.65, lx: -0.4, ly: -0.04, lz: 0.06, fov: 18.5, yaw: 0.0 }, // CTA
      ];

      const sceneValues = {
        exposure:        3.0,
        keyIntensity:    1.0,
        keyColorR:       241, keyColorG: 90, keyColorB: 36,
        rimIntensity:    0.0,
        rimColorR:       241, rimColorG: 90,  rimColorB: 36,
        hdrIntensity:    1.19,
        envRotation:     0.0,
      };

      const applySceneValues = () => {
        renderer.toneMappingExposure = sceneValues.exposure;
        keyLight.intensity           = sceneValues.keyIntensity;
        keyLight.color.setRGB(sceneValues.keyColorR / 255, sceneValues.keyColorG / 255, sceneValues.keyColorB / 255);
        rimLight.intensity           = sceneValues.rimIntensity;
        rimLight.color.setRGB(sceneValues.rimColorR / 255, sceneValues.rimColorG / 255, sceneValues.rimColorB / 255);

        if (scene.environment) {
          scene.environment.rotation = sceneValues.envRotation;
        }
        if (car) {
          car.traverse(child => {
            if (child.isMesh && child.material) {
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach(m => { if (m.envMapIntensity !== undefined) m.envMapIntensity = sceneValues.hdrIntensity; });
            }
          });
        }
      };

      applySceneValues();

      const sections = document.querySelectorAll('.section');
      let dragYaw = 0;
      let targetDragYaw = 0;

      let targetX = 0.46, currentX = 0.46;
      let targetZ = 2.69, currentZ = 2.69;

      let currentCX = 2.06, targetCX  = 2.06;
      let currentCY = 0.01, targetCY  = 0.01;
      let currentCZ = 4.8, targetCZ  = 4.8;
      let currentLX = -2.23, targetLX  = -2.23;
      let currentLY = 0.0, targetLY  = 0.0;
      let currentLZ = 0.0, targetLZ  = 0.0;
      let currentFOV = 45, targetFOV = 45;

      const lerp = (a, b, t) => a + (b - a) * t;
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const getSectionScrollData = () => {
        const tops = Array.from(sections).map(s => s.offsetTop);
        const bottoms = tops.map((t, i) => i < tops.length - 1 ? tops[i + 1] : document.body.scrollHeight);

        for (let i = 0; i < tops.length - 1; i++) {
          if (window.scrollY < bottoms[i]) {
            const segLen = bottoms[i] - tops[i];
            const segProgress = Math.max(0, window.scrollY - tops[i]);
            const t = segLen > 0 ? Math.min(segProgress / segLen, 1) : 0;
            return { sectionIdx: i, sectionT: easeOutCubic(t), sectionProgress: i + t };
          }
        }
        return { sectionIdx: tops.length - 1, sectionT: 1, sectionProgress: tops.length - 1 };
      };

      const tick = () => {
        if (!mounted) return;
        animationFrameId = requestAnimationFrame(tick);

        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollFrac = totalHeight > 0 ? Math.min(window.scrollY / totalHeight, 1) : 0;

        const progressBar = document.getElementById('progress-bar');
        if (progressBar) progressBar.style.width = (scrollFrac * 100) + '%';

        const { sectionIdx, sectionT, sectionProgress } = getSectionScrollData();

        const clampedIdx = Math.min(sectionIdx, keyframes.length - 1);
        const kA = keyframes[clampedIdx];
        const kB = keyframes[Math.min(clampedIdx + 1, keyframes.length - 1)];

        targetX  = lerp(kA.x,  kB.x,  sectionT);
        targetZ  = lerp(kA.z,  kB.z,  sectionT);
        targetCX = lerp(kA.cx, kB.cx, sectionT);
        targetCY   = lerp(kA.cy, kB.cy, sectionT);
        targetCZ   = lerp(kA.cz, kB.cz, sectionT);
        targetLX   = lerp(kA.lx, kB.lx, sectionT);
        targetLY   = lerp(kA.ly, kB.ly, sectionT);
        targetLZ   = lerp(kA.lz, kB.lz, sectionT);
        targetFOV     = lerp(kA.fov, kB.fov, sectionT);
        targetDragYaw = lerp(kA.yaw, kB.yaw, sectionT);

        const lerpSpeed = 0.045;
        if (car) {
          currentX = lerp(currentX, targetX, lerpSpeed);
          currentZ = lerp(currentZ, targetZ, lerpSpeed);
          car.position.x = currentX;
          car.position.z = currentZ;
        }

        currentCX = lerp(currentCX, targetCX, lerpSpeed);
        currentCY = lerp(currentCY, targetCY, lerpSpeed);
        currentCZ = lerp(currentCZ, targetCZ, lerpSpeed);
        currentLX = lerp(currentLX, targetLX, lerpSpeed);
        currentLY = lerp(currentLY, targetLY, lerpSpeed);
        currentLZ = lerp(currentLZ, targetLZ, lerpSpeed);
        currentFOV = lerp(currentFOV, targetFOV, lerpSpeed);

        const mobileBoost = window.innerWidth < 768 ? 15 : 0;
        camera.fov = currentFOV + mobileBoost;
        camera.updateProjectionMatrix();

        dragYaw = lerp(dragYaw, targetDragYaw, 0.045);
        const lookAt = new THREE.Vector3(currentLX, currentLY, currentLZ);
        const baseOffset = new THREE.Vector3(currentCX - currentLX, currentCY - currentLY, currentCZ - currentLZ);
        const orbitMat = new THREE.Matrix4().makeRotationY(dragYaw);
        const rotatedOffset = baseOffset.clone().applyMatrix4(orbitMat);
        const finalCamPos = lookAt.clone().add(rotatedOffset);
        camera.position.copy(finalCamPos);
        camera.lookAt(lookAt);

        const lightRadius = 12;
        const LIGHT_ANGLE = Math.PI * 0.18;
        keyLight.position.set(
          currentX + Math.sin(LIGHT_ANGLE) * lightRadius,
          14,
          currentZ + Math.cos(LIGHT_ANGLE) * lightRadius
        );
        keyLightTarget.position.set(currentX, 0, currentZ);
        keyLightTarget.updateMatrixWorld();

        rimLight.position.set(currentX - 4, 3.5, currentZ - 5);

        updateNetwork(window.scrollY);

        // Horizontal games scroll interpolation (desktop)
        if (window.innerWidth > 900) {
          const gSection   = document.getElementById('section-games');
          const gTrack     = document.getElementById('horizontal-carousel');
          const gContainer = document.getElementById('games-scroll-area');
          if (gSection && gTrack && gContainer) {
            const runwayPx  = gSection.offsetHeight - window.innerHeight;
            const rawProg   = window.scrollY - gSection.offsetTop;
            const t = Math.max(0, Math.min(rawProg / runwayPx, 1));
            const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const maxShift = gTrack.scrollWidth - gContainer.clientWidth;
            gTrack.style.transform = `translateX(-${easedT * maxShift}px)`;
          }
        }

        renderer.render(scene, camera);
      };

      tick();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // Clean up resize and rendering frame on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    };

    initThree();

    return () => {
      mounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    // Mobile arrows implementation
    const carouselArea = document.getElementById('games-scroll-area');
    const btnPrev      = document.getElementById('game-prev');
    const btnNext      = document.getElementById('game-next');

    if (!carouselArea || !btnPrev || !btnNext) return;

    const getScrollStep = () => 274;

    const goNext = (e) => {
      e.preventDefault();
      carouselArea.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    };

    const goPrev = (e) => {
      e.preventDefault();
      carouselArea.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    };

    btnNext.addEventListener('click', goNext);
    btnPrev.addEventListener('click', goPrev);

    const updateArrows = () => {
      if (window.innerWidth > 900) return;
      const sl = carouselArea.scrollLeft;
      const cw = carouselArea.clientWidth;
      const sw = carouselArea.scrollWidth;

      const atStart = sl <= 20;
      const atEnd   = sl + cw >= sw - 20;

      btnPrev.style.opacity       = atStart ? '0.2' : '1';
      btnPrev.style.pointerEvents = atStart ? 'none' : 'auto';
      btnNext.style.opacity       = atEnd   ? '0.2' : '1';
      btnNext.style.pointerEvents = atEnd   ? 'none' : 'auto';
    };

    carouselArea.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    updateArrows();

    return () => {
      btnNext.removeEventListener('click', goNext);
      btnPrev.removeEventListener('click', goPrev);
      carouselArea.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className="scroll-progress" id="progress-bar"></div>

      {/* DRAG HINT */}
      <div id="drag-hint">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 9h10M4 9l3-3M4 9l3 3M14 9l-3-3M14 9l-3 3" stroke="#888" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Drag to rotate</span>
      </div>

      {/* THREE.JS CANVAS */}
      <div id="canvas-wrapper">
        <canvas id="three-canvas" ref={canvasRef}></canvas>
      </div>
      <div id="vignette-overlay"></div>

      {/* SCROLL CONTAINER */}
      <div id="scroll-container">
        {/* HERO */}
        <section className="section" id="section-hero">
          <div className="hero-main-group">
            <h1 className="hero-headline">
              <span className="line highlight">INNVIKTA</span>
              <span className="line"><span className="stroke">ARC</span>ADE</span>
            </h1>
            <p className="hero-description">A gamified platform</p>
            <a href="https://innvikta.com/contact/" target="_blank" rel="noopener noreferrer" className="hero-cta-btn">
              Book A Demo
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className="hero-sub">
            <p className="year">Powered by Innvikta</p>
            <p>Cyber Security Awareness</p>
            <p>Training, Reimagined.</p>
            <div className="scroll-indicator">
              <div className="scroll-line"></div>
              <span>Scroll</span>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="section" id="section-overview">
          <div className="overview-content">
            <div className="section-tag">Overview</div>
            <h2 className="section-title"><span style={{ color: 'var(--accent)' }}>Security</span><br />Through Play</h2>
            <p className="section-body">
              Innvikta Turned Gamified transforms traditional security awareness training into an immersive experience. We use gaming psychology to drive retention, engagement, and behavior change across your organization.
            </p>
            <div className="stat-row">
              <div className="stat">
                <span className="stat-val">LIVE</span>
                <span className="stat-label">LEADERBOARDS</span>
              </div>
              <div className="stat">
                <span className="stat-val">100%</span>
                <span className="stat-label">SCORM READY</span>
              </div>
              <div className="stat">
                <span className="stat-val">ADMIN</span>
                <span className="stat-label">HUB CONTROL</span>
              </div>
            </div>
          </div>
        </section>

        {/* SPECS */}
        <section className="section" id="section-specs">
          <div className="specs-content">
            <div className="section-tag" style={{ justifyContent: 'flex-end' }}>Technical</div>
            <h2 className="section-title"><span style={{ color: 'var(--accent)' }}>Enterprise</span><br />Ready</h2>
            <ul className="specs-list">
              <li><span className="spec-name">Compliance</span><span className="spec-val">SCORM 1.2 & 2004 READY</span></li>
              <li><span className="spec-name">Engagement</span><span className="spec-val">LIVE LEADERBOARDS</span></li>
              <li><span className="spec-name">Reporting</span><span className="spec-val">ADMIN DASHBOARD</span></li>
              <li><span className="spec-name">Engine</span><span className="spec-val">REAL-TIME ANALYTICS</span></li>
              <li><span className="spec-name">Integration</span><span className="spec-val">SSO & LMS COMPATIBLE</span></li>
              <li><span className="spec-name">Interface</span><span className="spec-val">WHITE-LABEL THEMEABLE</span></li>
              <li><span className="spec-name">Modality</span><span className="spec-val">GAME LIBRARY ACCESS</span></li>
            </ul>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section" id="section-features">
          <div>
            <div className="section-tag">Features</div>
            <h2 className="section-title"><span style={{ color: 'var(--accent)' }}>Play.</span> Learn.<br />Protect.</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-num">01</div>
                <div className="feature-name">Cyber Games</div>
                <div className="feature-desc">Engaging, scenario-based games covering Phishing, Social Engineering, and Data Security.</div>
              </div>
              <div className="feature-item">
                <div className="feature-num">02</div>
                <div className="feature-name">Live Competition</div>
                <div className="feature-desc">Interactive leaderboards drive engagement and track progress across your organization.</div>
              </div>
              <div className="feature-item">
                <div className="feature-num">03</div>
                <div className="feature-name">Admin Panel</div>
                <div className="feature-desc">Assign modules, manage users, and view deep-dive compliance and performance reports.</div>
              </div>
              <div className="feature-item">
                <div className="feature-num">04</div>
                <div className="feature-name">SCORM Compliant</div>
                <div className="feature-desc">Seamlessly import our game modules directly into your existing LMS for easy tracking.</div>
              </div>
            </div>
          </div>
        </section>

        {/* GAMES SECTION */}
        <section className="section" id="section-games">
          <div className="games-sticky">
            <div className="games-content">
              <div className="games-info">
                <div className="section-tag">Game Library</div>
                <h2 className="section-title"><span style={{ color: 'var(--accent)' }}>Explore</span> Our<br />Universe</h2>
                <p className="section-body">
                  Dive into our high-fidelity educational games. Each module is designed to maximize engagement while teaching critical security concepts through interactive storytelling.
                </p>
              </div>
              <div className="games-carousel-container" id="games-scroll-area">
                <div className="games-carousel" id="horizontal-carousel">
                  {/* Poster: Dash Car */}
                  <div className="game-poster-card">
                    <img src="/images/cyber-arcade/dashcar.png" alt="Dash Car" />
                    <div className="poster-overlay">
                      <div className="poster-title">Dash Car</div>
                    </div>
                  </div>
                  {/* Poster: Inbox */}
                  <div className="game-poster-card">
                    <img src="/images/cyber-arcade/inbox.png" alt="Secure Inbox" />
                    <div className="poster-overlay">
                      <div className="poster-title">Secure Inbox</div>
                    </div>
                  </div>
                  {/* Poster: Crystal Planet */}
                  <div className="game-poster-card">
                    <img src="/images/cyber-arcade/crystalplanet.png" alt="Crystal Planet" />
                    <div className="poster-overlay">
                      <div className="poster-title">Crystal Planet</div>
                    </div>
                  </div>
                  {/* Poster: Escape Room */}
                  <div className="game-poster-card">
                    <img src="/images/cyber-arcade/escaperoom.png" alt="Escape Room" />
                    <div className="poster-overlay">
                      <div className="poster-title">Escape Room</div>
                    </div>
                  </div>
                  {/* More Games Hook */}
                  <div className="more-games-card">
                    <div className="section-tag" style={{ marginBottom: 0 }}>Full Library</div>
                    <h3 className="more-title">And Many<br /><span style={{ color: 'var(--accent)' }}>More</span> Games</h3>
                    <p className="more-desc">Want to explore our full interactive library of security awareness games?</p>
                    <a href="https://innvikta.com/contact/" target="_blank" rel="noopener noreferrer" className="more-cta-btn">
                      Book A Demo
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <button className="game-nav-btn prev" id="game-prev" aria-label="Previous Game">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="game-nav-btn next" id="game-next" aria-label="Next Game">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </section>

        {/* QUOTE */}
        <section className="section" id="section-quote">
          <div className="quote-mark">&quot;</div>
          <p className="quote-text">&quot;Finally, security awareness training that employees actually want to complete. Innvikta has turned boring compliance into a highlight of our week.&quot;</p>
          <p className="quote-attr"><strong>Industry Standard</strong> — Verified Review</p>
        </section>

        {/* CTA */}
        <section className="section" id="section-cta">
          <div className="cta-content">
            <div className="cta-label">Ready to start?</div>
            <h2 className="cta-headline">
              <span className="line">Launch</span>
              <span className="line" style={{ WebkitTextStroke: '1px var(--accent)', color: 'transparent' }}>Platform</span>
            </h2>
            <div className="cta-bottom">
              <a href="https://innvikta.com/contact/" target="_blank" rel="noopener noreferrer" className="cta-btn">
                Get a Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <div className="footer-copy">
                <p>Innvikta Turned Gamified</p>
                <p>All rights reserved</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
