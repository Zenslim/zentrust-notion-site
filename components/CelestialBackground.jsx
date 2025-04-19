
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CelestialBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const starVertices = [];

    for (let i = 0; i < 10000; i++) {
      starVertices.push((Math.random() - 0.5) * 2000);
      starVertices.push((Math.random() - 0.5) * 2000);
      starVertices.push((Math.random() - 0.5) * 2000);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const animate = function () {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0 }} />;
}
