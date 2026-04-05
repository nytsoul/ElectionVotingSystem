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
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="neomorph-card max-w-md w-full mx-4 animate-in zoom-in duration-300">
        {/* Title */}
        <h2 className="text-3xl font-bold text-text mb-4">{title}</h2>

        {/* Message */}
        <p className="text-dark text-lg mb-8 leading-relaxed">{message}</p>

        {/* Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="neomorph-btn text-text hover:text-accent font-bold py-3 px-6 transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-200 to-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`neomorph-btn font-bold py-3 px-6 transform hover:scale-105 transition-all duration-300 ${
              isDangerous
                ? 'bg-gradient-to-br from-red-200 to-rose-200 text-text hover:text-red-800'
                : 'bg-gradient-to-br from-green-200 to-emerald-200 text-text hover:text-green-800'
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
