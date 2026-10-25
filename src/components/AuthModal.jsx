import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, CheckCircle, ShieldCheck, ArrowRight, Zap, Building, Shield } from 'lucide-react';
import { DEMO_USER, DEMO_ADMIN, saveUser } from '../utils/userStorage';
import { apiService } from '../services/api';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Verified Investor'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (error) setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setError('Please enter your email address.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const pwd = formData.password || (formData.email.toLowerCase().includes('admin') ? 'admin' : 'umoja');
      const authenticated = await apiService.login(formData.email, pwd);
      saveUser(authenticated);
      onLoginSuccess(authenticated);
      onClose();
    } catch (err) {
      setError(err.message || 'Incorrect credentials or account suspended.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please enter your full name and email address.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const registered = await apiService.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password || 'umoja',
        roleTitle: formData.role || 'Verified Member'
      });
      saveUser(registered);
      onLoginSuccess(registered);
      onClose();
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleUserLogin = async () => {
    setIsLoading(true);
    try {
      const user = await apiService.login('jonathan.k@umoja.com', 'umoja');
      saveUser(user);
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleAdminLogin = async () => {
    setIsLoading(true);
    try {
      const admin = await apiService.login('admin', 'admin');
      saveUser(admin);
      onLoginSuccess(admin);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(12, 20, 15, 0.75)',
      backdropFilter: 'blur(8px)',
      padding: '20px'
    }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(210, 125, 45, 0.25)',
          animation: 'fadeInModal 0.25s ease-out'
        }}
      >
        {/* Modal Top Header */}
        <div style={{
          backgroundColor: '#1A3E26',
          padding: '24px 28px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                fontWeight: 700,
                color: 'var(--accent-gold)',
                backgroundColor: 'rgba(210, 125, 45, 0.2)',
                padding: '3px 8px',
                borderRadius: '4px'
              }}>
                Umoja Account
              </span>
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '1.4rem',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.01em'
            }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p style={{
              margin: '6px 0 0',
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 300
            }}>
              {mode === 'login' 
                ? 'Sign in to access your notifications, messages, and saved properties.' 
                : 'Join Umoja Terra to post apartments, save properties, and verify documents.'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          backgroundColor: '#FAF9F6'
        }}>
          <button
            onClick={() => { setMode('login'); setError(''); }}
            style={{
              flex: 1,
              padding: '13px',
              fontSize: '0.85rem',
              fontWeight: mode === 'login' ? 700 : 500,
              color: mode === 'login' ? 'var(--accent)' : 'var(--text-body)',
              background: 'none',
              border: 'none',
              borderBottom: mode === 'login' ? '2.5px solid var(--accent)' : '2.5px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); }}
            style={{
              flex: 1,
              padding: '13px',
              fontSize: '0.85rem',
              fontWeight: mode === 'register' ? 700 : 500,
              color: mode === 'register' ? 'var(--accent)' : 'var(--text-body)',
              background: 'none',
              border: 'none',
              borderBottom: mode === 'register' ? '2.5px solid var(--accent)' : '2.5px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Register
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '24px 28px' }}>
          
          {/* Instant Role Access */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '20px'
          }}>
            {/* Demo 1: Investor / Landlord (Jonathan K.) */}
            <div style={{
              backgroundColor: 'rgba(26, 62, 38, 0.05)',
              border: '1px solid rgba(26, 62, 38, 0.2)',
              borderRadius: '10px',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img 
                  src={DEMO_USER.avatar} 
                  alt="Jonathan" 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent)' }} 
                />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)' }}>
                    Verified Investor & Landlord
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#6B7280' }}>
                    Jonathan K. • Post apartments &amp; chat
                  </div>
                </div>
              </div>
              <button
                onClick={handleRoleUserLogin}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Log In</span>
                <ArrowRight size={11} />
              </button>
            </div>

            {/* Demo 2: Platform Director (Victoria Adeleke) */}
            <div style={{
              backgroundColor: '#0A150E',
              border: '1px solid var(--accent-gold)',
              borderRadius: '10px',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              color: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img 
                  src={DEMO_ADMIN.avatar} 
                  alt="Victoria" 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-gold)' }} 
                />
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>Chief Platform Director & Admin</span>
                    <Shield size={11} style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#D1D5DB' }}>
                    Victoria A. • Approve plots &amp; edit services
                  </div>
                </div>
              </div>
              <button
                onClick={handleRoleAdminLogin}
                style={{
                  backgroundColor: 'var(--accent-gold)',
                  color: '#0A150E',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>Admin In</span>
                <ArrowRight size={11} />
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="email"
                    placeholder="e.g. jonathan.k@umoja.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)' }}>
                    Password
                  </label>
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}>
                    Forgot password?
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  boxShadow: '0 4px 14px rgba(26,62,38,0.2)'
                }}
              >
                <span>Sign In to Account</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="text"
                    placeholder="e.g. Jonathan Kalu"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                  Phone Number
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="tel"
                    placeholder="+234 812 345 6789"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                  Account Intent
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--text-title)'
                  }}
                >
                  <option value="Property Investor & Buyer">Property Investor & Buyer</option>
                  <option value="Landlord / Apartment Owner">Landlord / Apartment Owner (Post Rentals)</option>
                  <option value="Home Builder & Architect">Home Builder & Architect</option>
                  <option value="Diaspora Client">Diaspora Client (Remote Inspections)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  boxShadow: '0 4px 14px rgba(26,62,38,0.2)'
                }}
              >
                <span>Create Free Account</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Institutional Trust Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)',
            color: '#6B7280',
            fontSize: '0.72rem'
          }}>
            <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
            <span>Protected by Umoja Institutional Escrow & Encryption</span>
          </div>

        </div>
      </div>
    </div>
  );
}
