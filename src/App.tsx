import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.3,
};
function App() {
  const [slides, setSlides] = useState<React.ComponentType[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const importSlides = async () => {
      const slideModules = import.meta.glob("./slides/*.tsx");
      const loadedSlides = await Promise.all(
        Object.values(slideModules).map((importSlide) => importSlide())
      );
      setSlides(loadedSlides.map((module: any) => module.default));
    };
    importSlides();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <Layout
      onNext={nextSlide}
      onPrev={prevSlide}
      currentSlide={currentSlide}
      totalSlides={slides.length}
    >
      <AnimatePresence mode="wait">
        {slides[currentSlide] && (
          <motion.div
            key={currentSlide}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="h-full w-full"
          >
            {React.createElement(slides[currentSlide])}
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
