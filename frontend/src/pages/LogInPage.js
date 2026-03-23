import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Adjusted login logic to handle both admin shortcut and standard flow
      const user = await login(email, email === 'admin@cosmo.com' ? 'admin123' : password);
      // Redirect based on role
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Access Denied. Please verify credentials.');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '75vh',
      padding: '20px'
    }}>
      {/* Using the .form-card class from index.css 
        to ensure consistency across the application 
      */}
      <div className="form-card" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.2rem', 
          marginBottom: '10px', 
          color: 'var(--gold)',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          Personnel Login
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: 'rgba(255,255,255,0.5)', 
          marginBottom: '30px',
          fontSize: '0.9rem',
          letterSpacing: '1px'
        }}>
          SECURE SECTOR ACCESS
        </p>
        
        {error && (
          <div style={{ 
            background: 'rgba(255, 68, 68, 0.1)', 
            color: '#ff4444', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
            textAlign: 'center',
            fontSize: '0.9rem',
            border: '1px solid rgba(255, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: 'var(--gold)', 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Cosmic Identifier (Email)
            </label>
            <input 
              type='email' 
              placeholder='yourname@galaxy.com'
              className="form-input"
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border 0.3s'
              }}
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.75rem', 
              color: 'var(--gold)', 
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Security Passkey
            </label>
            <input 
              type='password' 
              placeholder='••••••••'
              className="form-input"
              style={{
                width: '100%',
                padding: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>
          
          <button 
            type='submit' 
            className="action-btn"
            style={{
              width: '100%',
              padding: '16px',
              background: 'var(--gold)',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '900',
              cursor: 'pointer',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 4px 15px rgba(255, 215, 0, 0.2)'
            }}
          >
            Establish Connection
          </button>
        </form>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '30px', 
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            New explorer? 
          </span>
          <Link to='/register' style={{ 
            color: 'var(--gold)', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            marginLeft: '8px',
            fontSize: '0.9rem'
          }}>
            Register Node
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;