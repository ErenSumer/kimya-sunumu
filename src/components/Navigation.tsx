import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface NavigationProps {
  onNext: () => void;
  onPrev: () => void;
  currentSlide: number;
  totalSlides: number;
}

const Navigation = ({
  onNext,
  onPrev,
  currentSlide,
  totalSlides,
}: NavigationProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-8 left-0 right-0 mx-auto w-max flex items-center space-x-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-full px-8 py-4 shadow-lg"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrev}
        className="text-white opacity-75 hover:opacity-100 transition-opacity focus:outline-none"
      >
        <FiChevronLeft size={28} />
      </motion.button>

      <div className="text-white font-semibold">
        {currentSlide + 1} / {totalSlides}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="text-white opacity-75 hover:opacity-100 transition-opacity focus:outline-none"
      >
        <FiChevronRight size={28} />
      </motion.button>
    </motion.nav>
  );
};

export default Navigation;
