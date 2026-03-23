import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import the specific page components
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePost';
import AdminPage from './pages/AdminPage';

// ==========================================
// NAVIGATION COMPONENT
// ==========================================
const Navbar = ({ isDarkMode, toggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--gold)', letterSpacing: '2px' }}>
        COSMO GUIDE
      </div>
      
      <div className="nav-links">
        <Link to="/home">
          <button className={isActive('/home') ? 'active' : ''}>Home</button>
        </Link>
        <Link to="/about">
          <button className={isActive('/about') ? 'active' : ''}>Simulation</button>
        </Link>
        <Link to="/contact">
          <button className={isActive('/contact') ? 'active' : ''}>Database</button>
        </Link>
        
        {user ? (
          <>
            <Link to="/create-post">
              <button className={isActive('/create-post') ? 'active' : ''}>Write</button>
            </Link>
            <Link to="/profile">
              <button className={isActive('/profile') ? 'active' : ''}>Profile</button>
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin">
                <button className={isActive('/admin') ? 'active' : ''} style={{ color: 'var(--gold)' }}>Admin</button>
              </Link>
            )}
            <button onClick={handleLogout} style={{ color: '#ff4444' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className={isActive('/login') ? 'active' : ''}>Login</button>
            </Link>
            <Link to="/register">
              <button className={isActive('/register') ? 'active' : ''}>Register</button>
            </Link>
          </>
        )}
        
        <button 
          onClick={toggleTheme}
          style={{
            marginLeft: '20px',
            padding: '5px 15px',
            borderRadius: '20px',
            border: '1px solid var(--gold)',
            color: 'var(--gold)',
            fontSize: '0.8rem',
            background: 'none',
            cursor: 'pointer'
          }}
        >
          {isDarkMode ? 'LIGHT MODE' : 'NIGHT MODE'}
        </button>
      </div>
    </nav>
  );
};

// ==========================================
// PROTECTION WRAPPER
// ==========================================
const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/home" replace />;
  return children;
};

// ==========================================
// APP CONTENT (THEME & ROUTING)
// ==========================================
const AppContent = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  // Sync theme state with body class defined in index.css
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  }, [isDarkMode]);

  // Logic to hide splash after initial load
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '') {
      setShowSplash(false);
    }
  }, [location]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // If we are on the root path, show splash or redirect
  if ((location.pathname === '/' || location.pathname === '') && showSplash) {
    return <SplashPage setPage={() => setShowSplash(false)} />;
  }

  return (
    <div className="app-wrapper">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Auth Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/create-post" element={
            <ProtectedRoute>
              <CreatePostPage />
            </ProtectedRoute>
          } />
          
          {/* Admin Protected Routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '60px 20px', 
        opacity: 0.4, 
        fontSize: '0.9rem',
        letterSpacing: '1px'
      }}>
        <p>&copy; 2026 ROHAN COSMO GUIDE | EXPLORING THE FINAL FRONTIER</p>
      </footer>
    </div>
  );
};

export default AppContent;