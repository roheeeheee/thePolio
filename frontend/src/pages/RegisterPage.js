import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// API configuration targeting your backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    accountType: ''
  });
  
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateAndSubmit = async (e) => {
    e.preventDefault();
    setBackendError('');
    let errs = {};
    let isValid = true;

    if (!form.name.trim()) { errs.name = "Identification required"; isValid = false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) { errs.email = "Invalid cosmic coordinates (email)"; isValid = false; }
    if (form.password.length < 6) { errs.password = "Security passkey too short"; isValid = false; }
    if (form.password !== form.confirmPassword) { errs.confirmPassword = "Passkeys do not match"; isValid = false; }
    if (!form.gender) { errs.gender = "Identity required"; isValid = false; }
    if (!form.accountType) { errs.accountType = "Clearance tier required"; isValid = false; }

    if (!isValid) {
      setErrors(errs);
      return;
    }

    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setBackendError(err.response?.data?.message || 'Registration failed. Check network connection.');
    }
  };

  // Reusable label style following the screenshot instructions
  const labelStyle = {
    display: 'block',
    fontSize: '0.7rem',
    color: 'var(--gold)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    fontWeight: '700',
    opacity: '0.9'
  };

  const errorTextStyle = { 
    color: '#ff4444', 
    fontSize: '0.75rem', 
    marginTop: '6px', 
    display: 'block' 
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '90vh',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      {/* Container uses .form-card from index.css */}
      <div className="form-card" style={{ maxWidth: '520px', width: '100%' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.4rem', 
          marginBottom: '5px', 
          color: 'var(--gold)',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          fontWeight: '800'
        }}>
          Register Node
        </h2>
        <p style={{ 
          textAlign: 'center', 
          color: 'rgba(255,255,255,0.4)', 
          marginBottom: '35px',
          fontSize: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          Protocol Authorization Required
        </p>

        {backendError && (
          <div style={{ 
            background: 'rgba(255, 68, 68, 0.1)', 
            color: '#ff4444', 
            padding: '12px', 
            borderRadius: '10px', 
            marginBottom: '20px', 
            fontSize: '0.9rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 68, 68, 0.2)'
          }}>
            {backendError}
          </div>
        )}

        <form onSubmit={validateAndSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={labelStyle}>Full Name / Callsign</label>
            <input 
              name="name"
              className="form-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              placeholder="Commander John Doe"
              value={form.name} 
              onChange={handleChange}
            />
            {errors.name && <small style={errorTextStyle}>{errors.name}</small>}
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={labelStyle}>Cosmic Identifier (Email)</label>
            <input 
              name="email"
              type="email"
              className="form-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
              placeholder="explorer@galaxy.space"
              value={form.email} 
              onChange={handleChange}
            />
            {errors.email && <small style={errorTextStyle}>{errors.email}</small>}
          </div>

          {/* Grid for two-column password fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={labelStyle}>Passkey</label>
              <input 
                name="password"
                type="password"
                className="form-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                placeholder="••••••••"
                value={form.password} 
                onChange={handleChange}
              />
              {errors.password && <small style={errorTextStyle}>{errors.password}</small>}
            </div>
            <div>
              <label style={labelStyle}>Verify</label>
              <input 
                name="confirmPassword"
                type="password"
                className="form-input"
                style={{ width: '100%', boxSizing: 'border-box' }}
                placeholder="••••••••"
                value={form.confirmPassword} 
                onChange={handleChange}
              />
              {errors.confirmPassword && <small style={errorTextStyle}>{errors.confirmPassword}</small>}
            </div>
          </div>

          {/* Grid for selection tiers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            <div>
              <label style={labelStyle}>Identity</label>
              <select 
                name="gender" 
                className="form-input" 
                style={{ width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                value={form.gender} 
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <small style={errorTextStyle}>{errors.gender}</small>}
            </div>
            <div>
              <label style={labelStyle}>Clearance</label>
              <select 
                name="accountType" 
                className="form-input" 
                style={{ width: '100%', boxSizing: 'border-box', cursor: 'pointer' }}
                value={form.accountType} 
                onChange={handleChange}
              >
                <option value="">Select Tier</option>
                <option value="basic">Standard Access</option>
                <option value="premium">Premium Access</option>
              </select>
              {errors.accountType && <small style={errorTextStyle}>{errors.accountType}</small>}
            </div>
          </div>

          <button 
            type="submit" 
            className="action-btn"
            style={{
              width: '100%',
              padding: '18px',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '900',
              cursor: 'pointer',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              boxShadow: '0 5px 20px rgba(255, 215, 0, 0.15)'
            }}
          >
            Authorize Registration
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '35px', 
          paddingTop: '25px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
            Already registered? 
          </span>
          <Link to="/login" style={{ 
            color: 'var(--gold)', 
            textDecoration: 'none', 
            fontWeight: '700',
            marginLeft: '10px',
            fontSize: '0.9rem',
            textTransform: 'uppercase'
          }}>
            Login to Node
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;