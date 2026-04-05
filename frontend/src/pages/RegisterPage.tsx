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
      setError('You must be 18 years or older to register.');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
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

      setSuccess('Registration Successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && success) {
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
              <span className="text-4xl">📝</span>
            </div>
            <h1 className="text-3xl font-bold text-text mb-2">Create Account</h1>
            <p className="text-dark">Join SmartVote and participate</p>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}
          {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="neomorph-input text-text"
                placeholder="Your full name"
                required
              />
            </div>

            {/* Age Field */}
            <div>
              <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="neomorph-input text-text"
                placeholder="You must be 18+"
                required
              />
            </div>

            {/* Voter ID Field */}
            <div>
              <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">
                Voter ID
              </label>
              <input
                type="text"
                name="voter_id"
                value={formData.voter_id}
                onChange={handleChange}
                className="neomorph-input text-text"
                placeholder="Create a unique voter ID"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="neomorph-input text-text"
                placeholder="Create a password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="neomorph-input text-text"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="neomorph-btn w-full text-text hover:text-accent font-bold text-lg mt-8 transform hover:scale-105 transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-400"></div>
            <span className="text-dark text-sm">Have an account?</span>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>

          {/* Login Link */}
          <Link
            to="/login"
            className="neomorph-btn w-full text-text hover:text-accent font-bold text-lg block text-center transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-blue-200 to-cyan-200"
          >
            Sign In
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

export default RegisterPage;
