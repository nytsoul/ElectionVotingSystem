import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage: React.FC = () => {
  const [voter_id, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(voter_id, password);
      const { user, token } = response.data;
      
      login(user, token);
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/vote');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dark-container flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold mb-8 transition-colors text-lg">
          <span className="text-2xl">⬅️</span>
          <span>Back to Home</span>
        </Link>

        {/* Card */}
        <div className="dark-card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 mb-6 shadow-neon mx-auto">
              <span className="text-5xl">🔐</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 neon-accent">Welcome Back!</h1>
            <p className="text-slate-400 text-lg">Sign in to cast your vote</p>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Voter ID Field */}
            <div>
              <label className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">
                🆔 Voter ID
              </label>
              <input
                type="text"
                value={voter_id}
                onChange={(e) => setVoterId(e.target.value)}
                className="dark-input"
                placeholder="Enter your Voter ID"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">
                🔑 Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark-input"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="dark-btn w-full text-slate-900 font-bold text-lg mt-8 transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? '⏳ Signing in...' : '✅ Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-cyan-500/30"></div>
            <span className="text-slate-400">OR</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-cyan-500/30"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
            >
              📝 Register here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 mt-8 text-sm">
          ✨ Your vote matters. Make it count!
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
