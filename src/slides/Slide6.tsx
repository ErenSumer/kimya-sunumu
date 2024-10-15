import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Slide6 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const cubeGeometry = new THREE.BoxGeometry(30, 30, 30);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const cube = new THREE.Mesh(cubeGeometry, material);

    cube.position.set(0, 0, -50);

    scene.add(cube);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.0005;
      cube.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-black opacity-50"></div>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <motion.div
        className="relative z-10 max-w-5xl w-full mx-auto px-8 text-center"
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-5xl font-bold mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dinlediğiniz için teşekkürler
        </motion.h2>
        <motion.div variants={containerVariants}>
          <motion.p
            variants={itemVariants}
            className="text-4xl text-white mb-4"
          >
            Eren Sümer
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-3xl text-white mb-4"
          >
            Eren Sümer
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-2xl text-white mb-4"
          >
            Eren Sümer
          </motion.p>
          <motion.p variants={itemVariants} className="text-xl text-white">
            Eren Sümer
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide6;
