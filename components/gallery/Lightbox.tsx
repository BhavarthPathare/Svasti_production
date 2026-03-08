import { motion, AnimatePresence } from 'framer-motion';
import ImageWithBlur from '@/components/ui/ImageWithBlur';

export default function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="relative w-[90vw] max-w-5xl h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <ImageWithBlur src={src} alt="Selected image" fill className="object-contain" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}