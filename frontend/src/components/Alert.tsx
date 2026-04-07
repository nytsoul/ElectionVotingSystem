import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const styles = {
    success: {
      bg: 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/50',
      text: 'text-green-300',
      icon: '✅',
    },
    error: {
      bg: 'bg-gradient-to-br from-red-900/40 to-rose-900/40 border border-red-500/50',
      text: 'text-red-300',
      icon: '❌',
    },
    warning: {
      bg: 'bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-500/50',
      text: 'text-yellow-300',
      icon: '⚠️',
    },
    info: {
      bg: 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-500/50',
      text: 'text-blue-300',
      icon: 'ℹ️',
    },
  }[type];

  return (
    <div className={`${styles.bg} ${styles.text} px-6 py-4 rounded-2xl relative animate-in fade-in duration-300 dark-card mb-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{styles.icon}</span>
          <span className="font-semibold text-lg">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-2xl font-bold text-slate-400 hover:text-white transition transform hover:scale-110"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
