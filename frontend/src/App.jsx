import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Public customer-facing pages imported directly for instant first-paint
import CustomerMenu from './pages/CustomerMenu';
import LandingPage from './pages/LandingPage';

// Code-split admin / staff routes for on-demand loading
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const QrCenter = lazy(() => import('./pages/QrCenter'));
const Categories = lazy(() => import('./pages/Categories'));
const Dishes = lazy(() => import('./pages/Dishes'));
const Offers = lazy(() => import('./pages/Offers'));
const Orders = lazy(() => import('./pages/Orders'));

const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-2 p-6 text-slate-100">
    <div className="w-8 h-8 rounded-full border-4 border-slate-800 border-t-brand-500 animate-spin"></div>
    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading...</span>
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Crunch Republic Brand Website Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Main Admin Dashboard & Staff Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Auth Views */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Public Crunch Republic Customer Menu (for QR codes & customers) */}
              <Route path="/menu" element={<CustomerMenu />} />
              <Route path="/menu/:restaurantId" element={<CustomerMenu />} />
              <Route path="/table/:tableNumber" element={<CustomerMenu />} />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pos"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dishes"
                element={
                  <ProtectedRoute>
                    <Dishes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/qr-center"
                element={
                  <ProtectedRoute>
                    <QrCenter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/offers"
                element={
                  <ProtectedRoute>
                    <Offers />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect to Customer Menu */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
