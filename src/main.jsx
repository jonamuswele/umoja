import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Platform Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FAF9F6',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '480px',
            backgroundColor: '#FFFFFF',
            padding: '36px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            border: '1px solid #E5E7EB'
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A3E26', margin: '0 0 12px' }}>
              Umoja Terra Gateway
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.5 }}>
              A temporary display error was detected. You can safely reload the page or reset your session to enter the login portal.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  localStorage.removeItem('umoja_user');
                  window.location.reload();
                }}
                style={{
                  backgroundColor: '#1A3E26',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Go to Login Page
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
