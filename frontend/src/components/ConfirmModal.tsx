import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="dark-card max-w-md w-full mx-4 animate-in zoom-in duration-300 border-cyan-400/50 shadow-neon-lg">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>

        {/* Message */}
        <p className="text-slate-300 text-lg mb-10 leading-relaxed">{message}</p>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border-2 border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 font-bold transform hover:scale-105 transition-all duration-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`font-bold py-3 px-6 transform hover:scale-105 transition-all duration-300 rounded-xl ${
              isDangerous
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg shadow-lg'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 hover:shadow-neon-lg shadow-neon'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
