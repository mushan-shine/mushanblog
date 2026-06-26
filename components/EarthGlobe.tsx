"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EarthGlobe({ size = 300 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Earth sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const texture = new THREE.TextureLoader().load("/earth.png");
    const material = new THREE.MeshPhongMaterial({ map: texture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Atmosphere glow
    const glowGeo = new THREE.SphereGeometry(1.02, 64, 64);
    const glowMat = new THREE.MeshPhongMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.08,
      side: THREE.FrontSide,
    });
    scene.add(new THREE.Mesh(glowGeo, glowMat));

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    // Animation — clockwise when viewed from above (negative Y rotation)
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      earth.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size, display: "inline-block" }}
    />
  );
}
