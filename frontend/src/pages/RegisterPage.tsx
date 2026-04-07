import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    voter_id: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validation
    if (parseInt(formData.age) < 18) {
      setError('❌ You must be 18 years or older to register.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await authService.register({
        name: formData.name,
        age: parseInt(formData.age),
        voter_id: formData.voter_id,
        password: formData.password,
      });

      setSuccess('✅ Registration Successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || '❌ Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && success) {
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-neon mx-auto">
              <span className="text-5xl">📝</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400 text-lg">Join SmartVote today! 🗳️</p>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}
          {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm uppercase tracking-widest">
                👤 Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="dark-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Age Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm uppercase tracking-widest">
                🎂 Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="dark-input"
                placeholder="Must be 18 or older"
                required
                min="18"
              />
            </div>

            {/* Voter ID Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm uppercase tracking-widest">
                🆔 Voter ID
              </label>
              <input
                type="text"
                name="voter_id"
                value={formData.voter_id}
                onChange={handleChange}
                className="dark-input"
                placeholder="Enter your unique Voter ID"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm uppercase tracking-widest">
                🔑 Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="dark-input"
                placeholder="Create a strong password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-white font-bold mb-2 text-sm uppercase tracking-widest">
                🔒 Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="dark-input"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="dark-btn w-full text-slate-900 font-bold text-lg mt-8 transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? '⏳ Creating Account...' : '✅ Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500/30"></div>
            <span className="text-slate-400">OR</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-500/30"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
            >
              🔐 Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 mt-8 text-sm">
          🔒 Your data is secure and encrypted.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
