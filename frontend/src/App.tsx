import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VotingPage from './pages/VotingPage';
import VoteDonePage from './pages/VoteDonePage';
import ResultsPage from './pages/ResultsPage';
import AdminDashboard from './pages/AdminDashboard';

import './index.css';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/vote"
            element={
              <ProtectedRoute>
                <VotingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vote-done"
            element={
              <ProtectedRoute>
                <VoteDonePage />
              </ProtectedRoute>
            }
          />

          <Route path="/results" element={<ResultsPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
