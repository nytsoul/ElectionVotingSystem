import React, { useEffect, useState } from 'react';
import { resultsService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

interface Result {
  id: number;
  name: string;
  party: string;
  symbol: string;
  votes: number;
}

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [winner, setWinner] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await resultsService.getResults();
        setResults(response.data.results || []);
        setWinner(response.data.winner || null);
      } catch (err) {
        setError('Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    const interval = setInterval(fetchResults, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);

  return (
    <div className="neomorph-container min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text mb-3 flex items-center justify-center gap-3">
            <span className="text-6xl">📊</span> Election Results
          </h1>
          <p className="text-dark text-lg">Real-time voting results - Updated every 5 seconds</p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Winner Announcement */}
        {winner && (
          <div className="neomorph-card bg-gradient-to-br from-yellow-200 to-amber-200 mb-12 transform animate-bounce">
            <div className="text-center">
              <div className="inline-block p-6 rounded-2xl neomorph-badge mb-6 text-7xl">
                🏆
              </div>
              <h2 className="text-4xl font-bold text-yellow-900 mb-3">{winner.name}</h2>
              <p className="text-xl text-yellow-800 font-semibold">
                {winner.party} • <span className="text-3xl">{winner.votes} votes</span>
              </p>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {results.map((result) => {
            const percentage = totalVotes > 0 ? ((result.votes / totalVotes) * 100).toFixed(1) : '0';

            return (
              <div
                key={result.id}
                className={`neomorph-card transition-all duration-300 hover:shadow-lg ${
                  winner?.id === result.id
                    ? 'bg-gradient-to-br from-yellow-200 to-amber-200 ring-4 ring-yellow-400'
                    : 'hover:-translate-y-2'
                }`}
              >
                {/* Candidate Info */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{result.symbol || '🎭'}</div>
                  <h3 className="text-2xl font-bold text-text">{result.name}</h3>
                  <p className="text-dark font-semibold text-lg">{result.party}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500 flex items-center justify-center text-white font-bold text-xs"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Vote Stats */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent mb-1">{result.votes}</p>
                  <p className="text-dark font-semibold">votes ({percentage}%)</p>
                </div>

                {/* Winner Badge */}
                {winner?.id === result.id && (
                  <div className="mt-4 text-center text-yellow-600 font-bold">
                    ⭐ Current Leader
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Election Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-4xl font-bold text-primary">{totalVotes}</p>
              <p className="text-gray-600">Total Votes</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">{results.length}</p>
              <p className="text-gray-600">Candidates</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">
                {winner ? winner.votes : 0}
              </p>
              <p className="text-gray-600">Leading Votes</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">
                {winner ? ((winner.votes / totalVotes) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-gray-600">Leading %</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
