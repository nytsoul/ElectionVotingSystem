import React from 'react';
import { Link } from 'react-router-dom';

const VoteDonePage: React.FC = () => {
  return (
    <div className="dark-container flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full">
        <div className="dark-card text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 mb-8 shadow-neon-lg mx-auto">
            <span className="text-6xl">✅</span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-bold text-white mb-4">Thank You! 🙏</h1>

          {/* Message */}
          <p className="text-yellow-300 text-xl mb-4 font-semibold">
            ✨ Your vote has been successfully submitted! ✨
          </p>

          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            You have completed your civic duty. Your voice matters and helps shape our future! 🗳️
          </p>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

          {/* Buttons */}
          <div className="space-y-4">
            <Link
              to="/results"
              className="dark-btn block w-full text-slate-900 font-bold py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-neon hover:shadow-neon-lg"
            >
              📊 View Results
            </Link>

            <Link
              to="/"
              className="px-8 py-4 block w-full text-lg font-bold rounded-xl border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
            >
              🏠 Back to Home
            </Link>
          </div>

          {/* Footer */}
          <p className="text-slate-400 mt-12 text-sm flex items-center justify-center gap-2">
            <span>🔒</span>
            <span>Your vote has been recorded and verified securely</span>
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-3">
              <p className="text-sm text-green-300 font-bold">✔️ Verified</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg p-3">
              <p className="text-sm text-blue-300 font-bold">🔐 Secure</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-lg p-3">
              <p className="text-sm text-purple-300 font-bold">📝 Recorded</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteDonePage;
