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
    <div className="neomorph-container flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-dark hover:text-text font-semibold mb-8 transition-colors">
          <span className="text-2xl">←</span>
          <span>Back</span>
        </Link>

        {/* Card */}
        <div className="neomorph-card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-2xl mb-4 neomorph-badge">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-3xl font-bold text-text mb-2">Welcome Back</h1>
            <p className="text-dark">Sign in to cast your vote</p>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Voter ID Field */}
            <div>
              <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">
                Voter ID
              </label>
              <input
                type="text"
                value={voter_id}
                onChange={(e) => setVoterId(e.target.value)}
                className="neomorph-input text-text"
                placeholder="Enter your voter ID"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="neomorph-input text-text"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="neomorph-btn w-full text-text hover:text-accent font-bold text-lg mt-8 transform hover:scale-105 transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-400"></div>
            <span className="text-dark text-sm">New to SmartVote?</span>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>

          {/* Register Link */}
          <Link
            to="/register"
            className="neomorph-btn w-full text-text hover:text-accent font-bold text-lg block text-center transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-200 to-cyan-200"
          >
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-dark text-sm">SmartVote System | Secure Voting Platform</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
