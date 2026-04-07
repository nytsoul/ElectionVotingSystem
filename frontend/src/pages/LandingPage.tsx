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
    <div className="dark-container">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl">
          {/* Animated Title */}
          <div className="mb-8 animate-fade-in">
            <div className="text-7xl md:text-9xl mb-4">🗳️</div>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart<span className="neon-accent">Vote</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-cyan-300 mb-8 leading-relaxed font-medium">
            ✨ Secure. Transparent. Democratic. ✨
          </p>

          <p className="text-lg text-slate-300 mb-12 leading-relaxed">
            Participate in democracy with confidence. SmartVote provides secure, transparent, and easy voting for your organization.
          </p>

          {/* Election Status Card */}
          <div className={`dark-card mb-12 transform transition-all duration-300 ${
            electionStatus === 'Live' ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50' : 'bg-gradient-to-br from-red-900/30 to-rose-900/30 border-red-500/50'
          } border`}>
            <div className="flex items-center justify-center gap-6">
              <span className="text-7xl animate-pulse">{electionStatus === 'Live' ? '🟢' : '🔴'}</span>
              <div className="text-left">
                <p className="text-sm text-slate-400 uppercase tracking-widest">Election Status</p>
                <p className={`text-4xl font-bold ${electionStatus === 'Live' ? 'text-green-400 neon-accent' : 'text-red-400'}`}>
                  {electionStatus === 'Live' ? '🟢 LIVE' : '⏸️ CLOSED'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl w-full">
          {/* Feature 1 */}
          <div className="dark-card group hover:shadow-neon transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🔐</div>
            <h3 className="text-2xl font-bold text-white mb-3">Secure</h3>
            <p className="text-slate-300">Login with your unique Voter ID. Your data is encrypted and protected with military-grade security.</p>
          </div>

          {/* Feature 2 */}
          <div className="dark-card group hover:shadow-neon transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">✨</div>
            <h3 className="text-2xl font-bold text-white mb-3">Simple</h3>
            <p className="text-slate-300">Intuitive interface designed for everyone. Cast your vote in just a few clicks with our streamlined process.</p>
          </div>

          {/* Feature 3 */}
          <div className="dark-card group hover:shadow-neon transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50">
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📊</div>
            <h3 className="text-2xl font-bold text-white mb-3">Transparent</h3>
            <p className="text-slate-300">Real-time results and detailed statistics. See how the election progresses as votes are recorded.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <Link
            to="/register"
            className="dark-btn px-10 py-4 text-lg font-bold transform hover:scale-105 transition-transform shadow-neon hover:shadow-neon-lg"
          >
            📝 Create Account
          </Link>
          <Link
            to="/login"
            className="px-10 py-4 text-lg font-bold rounded-xl border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all"
          >
            🔐 Sign In
          </Link>
          <Link
            to="/results"
            className="px-10 py-4 text-lg font-bold rounded-xl border-2 border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 transition-all"
          >
            📊 View Results
          </Link>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl w-full text-center">
          <div className="dark-card py-6">
            <p className="text-4xl font-bold text-cyan-400">247</p>
            <p className="text-slate-400 mt-2">Registered Voters</p>
          </div>
          <div className="dark-card py-6">
            <p className="text-4xl font-bold text-green-400">12</p>
            <p className="text-slate-400 mt-2">Candidates</p>
          </div>
          <div className="dark-card py-6">
            <p className="text-4xl font-bold text-purple-400">100%</p>
            <p className="text-slate-400 mt-2">Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
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
