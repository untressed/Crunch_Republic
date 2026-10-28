import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Public customer-facing pages imported directly for instant first-paint
import CustomerMenu from './pages/CustomerMenu';
import LandingPage from './pages/LandingPage';
import LegalPages from './pages/LegalPages';

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

// Subdomain Detection (supports menu.thecrunchrepublic.com, admin.thecrunchrepublic.com, and local test subdomains)
const getSubdomain = () => {
  if (typeof window === 'undefined') return 'main';
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.startsWith('menu.')) return 'menu';
  if (hostname.startsWith('admin.')) return 'admin';
  return 'main';
};

const App = () => {
  const subdomain = getSubdomain();

  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            {subdomain === 'menu' ? (
              // -------------------------------------------------------------
              // 1. MENU SUBDOMAIN (menu.thecrunchrepublic.com)
              // -------------------------------------------------------------
              <Routes>
                {/* Root on menu subdomain is the Customer Menu directly */}
                <Route path="/" element={<CustomerMenu />} />
                <Route path="/menu" element={<CustomerMenu />} />
                <Route path="/menu/:restaurantId" element={<CustomerMenu />} />
                <Route path="/table/:tableNumber" element={<CustomerMenu />} />

                {/* Consumer Policies */}
                <Route path="/legal" element={<LegalPages />} />
                <Route path="/contact" element={<LegalPages />} />
                <Route path="/terms" element={<LegalPages />} />
                <Route path="/privacy" element={<LegalPages />} />
                <Route path="/refund-policy" element={<LegalPages />} />
                <Route path="/shipping-policy" element={<LegalPages />} />

                {/* Catch-all redirect to menu root */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            ) : subdomain === 'admin' ? (
              // -------------------------------------------------------------
              // 2. ADMIN SUBDOMAIN (admin.thecrunchrepublic.com)
              // -------------------------------------------------------------
              <Routes>
                {/* Root on admin subdomain lands directly on Dashboard (or redirects to /login) */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
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

                {/* Catch-all redirect to admin root */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            ) : (
              // -------------------------------------------------------------
              // 3. MAIN WEBSITE (www.thecrunchrepublic.com, thecrunchrepublic.com, localhost)
              // -------------------------------------------------------------
              <Routes>
                {/* Main Crunch Republic Landing Page */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/legal" element={<LegalPages />} />
                <Route path="/contact" element={<LegalPages />} />
                <Route path="/terms" element={<LegalPages />} />
                <Route path="/privacy" element={<LegalPages />} />
                <Route path="/refund-policy" element={<LegalPages />} />
                <Route path="/shipping-policy" element={<LegalPages />} />

                {/* Public Customer Menu fallback on main domain */}
                <Route path="/menu" element={<CustomerMenu />} />
                <Route path="/menu/:restaurantId" element={<CustomerMenu />} />
                <Route path="/table/:tableNumber" element={<CustomerMenu />} />

                {/* Admin Views fallback on main domain */}
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
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
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

                {/* Catch-all redirect to Landing Page */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </Suspense>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
