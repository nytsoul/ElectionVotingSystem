import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-b border-cyan-500/20 shadow-neon-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 shadow-neon">
            <span className="text-2xl">🗳️</span>
          </div>
          <span className="text-2xl font-bold text-white hidden sm:inline neon-accent">SmartVote</span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-4 md:gap-8">
          {isAuthenticated ? (
            <>
              {/* Links */}
              <div className="hidden md:flex gap-8">
                <Link
                  to="/vote"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-all text-lg duration-300 relative group"
                >
                  🗳️ Vote
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/results"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-all text-lg duration-300 relative group"
                >
                  📊 Results
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-all text-lg duration-300 relative group"
                  >
                    ⚙️ Admin
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </div>

              {/* User Info */}
              <div className="hidden sm:block px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30">
                <p className="text-sm text-white font-semibold">👤 {user?.name}</p>
                <p className="text-xs text-cyan-300 capitalize">{user?.role === 'admin' ? '👑 Admin' : '✓ Voter'}</p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold hover:shadow-lg transition-all duration-300 text-sm md:text-base"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-cyan-400 border border-cyan-400 hover:bg-cyan-400/10 font-semibold transition-all duration-300"
              >
                🔐 Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-bold hover:shadow-neon transition-all duration-300"
              >
                📝 Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
