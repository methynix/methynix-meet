import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Installing framer-motion is highly recommended for 'beautiful' apps

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="holo-card p-8 w-full max-w-md text-center border-neon-red/30"
        >
          <h2 className="text-2xl font-orbitron text-neon-red mb-4">{title}</h2>
          <p className="text-gray-300 mb-8">{message}</p>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="px-6 py-2 rounded-lg bg-neon-red text-white shadow-[0_0_15px_rgba(255,0,85,0.5)] hover:bg-red-600 transition"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.getElementById('modal-root') // Make sure to add <div id="modal-root"></div> in index.html
  );
};

export default ConfirmModal;