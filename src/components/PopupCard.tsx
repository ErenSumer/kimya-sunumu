import { motion } from "framer-motion";

interface PopupCardProps {
  innovation: {
    title: string;
    image: string;
    fullDescription: string;
  };
  onClose: () => void;
}

const PopupCard: React.FC<PopupCardProps> = ({ innovation, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-black rounded-3xl p-8 shadow-2xl border border-black border-opacity-30 max-w-2xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-green-300">{innovation.title}</h2>
        <img src={innovation.image} alt={innovation.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <p className="text-gray-200 text-lg">{innovation.fullDescription}</p>
        <button
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          onClick={onClose}
        >
          Kapat
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PopupCard;
