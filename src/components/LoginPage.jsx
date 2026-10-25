import React, { useState } from 'react';
import { 
  Shield, ShieldCheck, User, Lock, Mail, Phone, CheckCircle2, ArrowRight, 
  Sparkles, Compass, Building, Check, KeyRound, AlertCircle, ArrowLeft 
} from 'lucide-react';
import { DEMO_USER, DEMO_ADMIN, saveUser } from '../utils/userStorage';
import { apiService } from '../services/api';

export default function LoginPage({ currentUser = null, onLoginSuccess, onBackToPlatform }) {
  const [activeMode, setActiveMode] = useState('demo'); // 'demo' | 'email' | 'register'
  const [emailForm, setEmailForm] = useState({
    email: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Verified Investor & Landlord'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectDemo = async (accountType) => {
    setIsLoading(true);
    setError('');
    try {
      const username = accountType === 'admin' ? 'admin' : 'jonathan.k@umoja.com';
      const password = accountType === 'admin' ? 'admin' : 'umoja';
      const authenticated = await apiService.login(username, password);
      saveUser(authenticated);
      onLoginSuccess(authenticated);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!emailForm.email) {
      setError('Please enter your email address.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const pwd = emailForm.password || (emailForm.email.toLowerCase().includes('admin') ? 'admin' : 'umoja');
      const authenticated = await apiService.login(emailForm.email, pwd);
      saveUser(authenticated);
      onLoginSuccess(authenticated);
    } catch (err) {
      setError(err.message || 'Incorrect credentials or account suspended.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email) {
      setError('Please fill in your name and email address.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const registered = await apiService.register({
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        password: registerForm.password || 'umoja',
        roleTitle: registerForm.role
      });
      saveUser(registered);
      onLoginSuccess(registered);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#FAF9F6',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '80px'
    }}>

      {/* Top Bar */}
      <div style={{
        padding: '20px 6%',
        borderBottom: '1px solid var(--border)',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {currentUser && onBackToPlatform ? (
          <button
            onClick={onBackToPlatform}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-title)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Platform</span>
          </button>
        ) : (
          <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600 }}>
            Welcome to Umoja Terra • Select an account to enter
          </span>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)'
          }}>
            <Compass size={18} />
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-title)' }}>
            UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span>
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1050px',
        margin: '40px auto 0',
        padding: '0 20px',
        width: '100%',
        boxSizing: 'border-box'
      }}>

        {/* Page Heading */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(210, 125, 45, 0.12)',
            color: 'var(--accent-gold)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.74rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '12px'
          }}>
            <Sparkles size={13} />
            <span>Dual Access Portal</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '2.2rem',
            fontWeight: 800,
            color: 'var(--text-title)',
            margin: '0 0 10px 0',
            letterSpacing: '-0.02em'
          }}>
            Sign In to Umoja Terra
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#6B7280', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
            Choose between the <strong>Investor &amp; Landlord Account</strong> to post properties and chat with owners, or the <strong>Admin Account</strong> to manage services and approve listings.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '32px'
        }}>
          {[
            { id: 'demo', label: 'Instant Role Access' },
            { id: 'email', label: 'Email Sign In' },
            { id: 'register', label: 'Create New Account' }
          ].map(tab => {
            const isSel = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveMode(tab.id);
                  setError('');
                }}
                style={{
                  padding: '9px 18px',
                  borderRadius: '24px',
                  border: isSel ? '1.5px solid var(--accent)' : '1px solid var(--border)',
                  backgroundColor: isSel ? 'var(--accent)' : '#FFFFFF',
                  color: isSel ? '#FFFFFF' : 'var(--text-body)',
                  fontSize: '0.82rem',
                  fontWeight: isSel ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSel ? '0 4px 12px rgba(26,62,38,0.15)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {error && (
          <div style={{
            maxWidth: '500px',
            margin: '0 auto 20px',
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '0.82rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            MODE 1: VERIFIED ACCESS ROLES (SIDE-BY-SIDE CARDS)
            ══════════════════════════════════════════════════════════════════════ */}
        {activeMode === 'demo' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            alignItems: 'stretch'
          }}>

            {/* INVESTOR & LANDLORD ACCOUNT */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '2px solid rgba(26, 62, 38, 0.2)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(26, 62, 38, 0.1)',
                color: 'var(--accent)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                User Role
              </div>

              {/* Avatar & Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <img 
                  src={DEMO_USER.avatar} 
                  alt={DEMO_USER.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2.5px solid var(--accent)'
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-title)', margin: '0 0 2px 0' }}>
                    {DEMO_USER.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                    {DEMO_USER.roleTitle || DEMO_USER.role}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>
                    {DEMO_USER.email}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, marginBottom: '20px' }}>
                Standard user experience for buyers, tenants, and landlords who want to post apartments and plots.
              </p>

              {/* What this account can do */}
              <div style={{
                backgroundColor: '#FAF9F6',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '28px',
                flex: 1
              }}>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: '#6B7280', marginBottom: '10px' }}>
                  User Capabilities:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.82rem', color: 'var(--text-title)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>Browse verified plots, houses &amp; services</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>Post apartments &amp; plots (submits for admin review)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>Upload slideshow pictures from your device</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>Chat directly with property owners &amp; inquirers</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    <span>Manage profile, preferences, and notifications</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectDemo('user')}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(26,62,38,0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#122D1B'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
              >
                <span>Sign In as Investor / Landlord</span>
                <ArrowRight size={16} />
              </button>

            </div>

            {/* DEMO ACCOUNT 2: PLATFORM DIRECTOR (ADMIN) */}
            <div style={{
              backgroundColor: '#0A150E',
              borderRadius: '16px',
              border: '2px solid var(--accent-gold)',
              boxShadow: '0 8px 30px rgba(210,125,45,0.12)',
              padding: '32px 28px',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(210, 125, 45, 0.25)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(210, 125, 45, 0.5)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '0.72rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Shield size={12} />
                <span>Super Admin</span>
              </div>

              {/* Avatar & Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <img 
                  src={DEMO_ADMIN.avatar} 
                  alt={DEMO_ADMIN.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2.5px solid var(--accent-gold)'
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 2px 0' }}>
                    {DEMO_ADMIN.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                    {DEMO_ADMIN.roleTitle}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#9CA3AF' }}>
                    {DEMO_ADMIN.email}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#D1D5DB', lineHeight: 1.5, marginBottom: '20px' }}>
                Full operational control across services catalog, listing moderation, and platform security.
              </p>

              {/* What this account can do */}
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '28px',
                flex: 1,
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '10px' }}>
                  Super Admin Powers:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.82rem', color: '#F3F4F6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span><strong>Approve &amp; verify</strong> submitted plots &amp; apartments</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span><strong>Suspend or restore</strong> flagged listings with audit notes</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span><strong>Edit service descriptions</strong> &amp; upload new pictures</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span><strong>Disable or enable</strong> platform services with 1 click</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span>Access dedicated <strong>Admin Operations Console</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectDemo('admin')}
                style={{
                  backgroundColor: 'var(--accent-gold)',
                  color: '#0A150E',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 18px rgba(210,125,45,0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'none'}
              >
                <Shield size={16} />
                <span>Sign In as Admin (Open Control Center)</span>
                <ArrowRight size={16} />
              </button>

            </div>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            MODE 2: EMAIL SIGN IN FORM
            ══════════════════════════════════════════════════════════════════════ */}
        {activeMode === 'email' && (
          <div style={{
            maxWidth: '460px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid var(--border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="email"
                    placeholder="e.g. admin@umojaterra.com or jonathan.k@umoja.com"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 12px 11px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                <div style={{ fontSize: '0.74rem', color: '#6B7280', marginTop: '4px' }}>
                  Tip: Type <em>admin@umojaterra.com</em> to log in as Administrator.
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={emailForm.password}
                    onChange={(e) => setEmailForm({ ...emailForm, password: e.target.value })}
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
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  boxShadow: '0 4px 14px rgba(26,62,38,0.2)'
                }}
              >
                <span>Continue to Platform</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            MODE 3: REGISTER NEW ACCOUNT
            ══════════════════════════════════════════════════════════════════════ */}
        {activeMode === 'register' && (
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid var(--border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
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
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box'
                    }}
                    required
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
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box'
                    }}
                    required
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
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
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
                  value={registerForm.role}
                  onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.85rem',
                    backgroundColor: '#FFFFFF',
                    color: 'var(--text-title)'
                  }}
                >
                  <option value="Property Investor & Landlord">Property Investor &amp; Landlord</option>
                  <option value="Land Plot Owner">Land Plot Owner (Post Land for Sale)</option>
                  <option value="Apartment Landlord">Apartment Landlord (Post Rentals)</option>
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
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
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
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px',
                  boxShadow: '0 4px 14px rgba(26,62,38,0.2)'
                }}
              >
                <span>Create Account</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
