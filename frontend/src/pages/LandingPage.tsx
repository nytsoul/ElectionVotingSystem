import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { electionService } from '../services/api';

const LandingPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [electionStatus, setElectionStatus] = useState<'Live' | 'Closed'>('Closed');

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/vote');
      }
    }

    // Fetch election status
    const fetchStatus = async () => {
      try {
        const response = await electionService.getStatus();
        setElectionStatus(response.data.status);
      } catch (error) {
        console.error('Failed to fetch election status:', error);
      }
    };

    fetchStatus();
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="neomorph-container">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="text-5xl">🗳️</div>
          <h1 className="text-3xl font-bold text-text">SmartVote</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold text-text mb-6 leading-tight">
            Secure & Transparent Voting
          </h2>
          <p className="text-xl text-dark mb-8 leading-relaxed">
            Participate in democracy with confidence. SmartVote provides secure, transparent, and easy voting for your organization.
          </p>

          {/* Election Status Card */}
          <div className={`neomorph-card mb-12 transform transition-all duration-300 hover:scale-105 ${
            electionStatus === 'Live' ? 'bg-gradient-to-br from-green-200 to-emerald-200' : 'bg-gradient-to-br from-red-200 to-rose-200'
          }`}>
            <div className="flex items-center justify-center gap-4">
              <span className="text-6xl">{electionStatus === 'Live' ? '🟢' : '🔴'}</span>
              <div className="text-left">
                <p className="text-sm text-dark">Election Status</p>
                <p className="text-3xl font-bold text-text">{electionStatus === 'Live' ? 'LIVE' : 'CLOSED'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl w-full">
          {/* Feature 1 */}
          <div className="neomorph-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">🔐</div>
            <h3 className="text-2xl font-bold text-text mb-3">Secure</h3>
            <p className="text-dark">Login with your unique Voter ID. Your data is encrypted and protected.</p>
          </div>

          {/* Feature 2 */}
          <div className="neomorph-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">✨</div>
            <h3 className="text-2xl font-bold text-text mb-3">Simple</h3>
            <p className="text-dark">Vote for your candidate with just one click. No complicated steps.</p>
          </div>

          {/* Feature 3 */}
          <div className="neomorph-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">📊</div>
            <h3 className="text-2xl font-bold text-text mb-3">Transparent</h3>
            <p className="text-dark">View real-time results and know the winners instantly</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 flex-wrap justify-center mb-12">
          <Link
            to="/login"
            className="neomorph-btn text-text hover:text-accent transform hover:scale-105 transition-all duration-300 font-bold text-lg"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="neomorph-btn bg-gradient-to-br from-blue-200 to-cyan-200 text-text hover:text-accent transform hover:scale-105 transition-all duration-300 font-bold text-lg"
          >
            Create Account
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl w-full mb-12">
          <div className="text-center">
            <p className="text-5xl font-bold text-accent mb-2">100%</p>
            <p className="text-text font-semibold">Secure</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-accent mb-2">1000+</p>
            <p className="text-text font-semibold">Votes Cast</p>
          </div>
          <div className="text-center">
            <p className="text-5xl font-bold text-accent mb-2">24/7</p>
            <p className="text-text font-semibold">Available</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-gray-300">
        <p className="text-dark text-sm">SmartVote System v1.0 | Secure Election Platform</p>
      </div>
    </div>
  );
};

export default LandingPage;
