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
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-100 via-gray-50 to-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="p-2 rounded-xl neomorph-badge">
            <span className="text-2xl">🗳️</span>
          </div>
          <span className="text-2xl font-bold text-text hidden sm:inline">SmartVote</span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-4 md:gap-8">
          {isAuthenticated ? (
            <>
              {/* Links */}
              <div className="hidden md:flex gap-8">
                <Link
                  to="/vote"
                  className="text-text hover:text-accent font-semibold transition-colors relative group"
                >
                  Vote
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/results"
                  className="text-text hover:text-accent font-semibold transition-colors relative group"
                >
                  Results
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-text hover:text-accent font-semibold transition-colors relative group"
                  >
                    Admin
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </div>

              {/* User Info */}
              <div className="hidden sm:block px-4 py-2 rounded-lg bg-gray-200">
                <p className="text-sm text-text font-semibold">{user?.name}</p>
                <p className="text-xs text-dark capitalize">{user?.role}</p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="neomorph-btn text-text hover:text-accent font-bold py-2 px-5 transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-red-200 to-pink-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Auth Links */}
              <Link
                to="/login"
                className="neomorph-btn text-text hover:text-accent font-bold py-2 px-5 hidden sm:inline-block transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="neomorph-btn bg-gradient-to-br from-blue-200 to-cyan-200 text-text hover:text-accent font-bold py-2 px-5 transform hover:scale-105 transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
