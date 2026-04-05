import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const styles = {
    success: {
      bg: 'bg-gradient-to-br from-green-200 to-emerald-200',
      text: 'text-green-800',
      icon: '✅',
    },
    error: {
      bg: 'bg-gradient-to-br from-red-200 to-rose-200',
      text: 'text-red-800',
      icon: '❌',
    },
    warning: {
      bg: 'bg-gradient-to-br from-yellow-200 to-orange-200',
      text: 'text-yellow-800',
      icon: '⚠️',
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-200 to-cyan-200',
      text: 'text-blue-800',
      icon: 'ℹ️',
    },
  }[type];

  return (
    <div className={`${styles.bg} ${styles.text} px-6 py-4 rounded-2xl relative animate-in fade-in duration-300 neomorph-card mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{styles.icon}</span>
          <span className="font-semibold text-lg">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-2xl font-bold opacity-70 hover:opacity-100 transition transform hover:scale-110"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
