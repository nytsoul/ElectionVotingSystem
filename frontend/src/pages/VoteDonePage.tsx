import React from 'react';
import { Link } from 'react-router-dom';

const VoteDonePage: React.FC = () => {
  return (
    <div className="neomorph-container flex items-center justify-center min-h-screen px-4">
      <div className="max-w-md w-full">
        <div className="neomorph-card text-center">
          {/* Success Icon */}
          <div className="inline-block p-6 rounded-2xl neomorph-badge mb-8 text-6xl">
            ✅
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold text-text mb-4">Thank You!</h1>

          {/* Message */}
          <p className="text-dark text-lg mb-10 leading-relaxed">
            Your vote has been successfully submitted. You have completed your civic duty.
          </p>

          {/* Buttons */}
          <div className="space-y-4">
            <Link
              to="/results"
              className="neomorph-btn block w-full text-text hover:text-accent font-bold py-4 text-lg transform hover:scale-105 transition-all duration-300"
            >
              View Results
            </Link>

            <Link
              to="/"
              className="neomorph-btn block w-full bg-gradient-to-br from-blue-200 to-cyan-200 text-text hover:text-accent font-bold py-4 text-lg transform hover:scale-105 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>

          {/* Footer */}
          <p className="text-dark mt-8 text-sm">
            ✨ Your vote has been recorded and verified
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoteDonePage;
