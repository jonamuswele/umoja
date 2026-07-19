import React, { useState, useEffect } from 'react';
import { Compass, Phone, Mail, MapPin, Menu, X } from 'lucide-react';

// Import our subcomponents
import Home from './components/Home';
import ExplorePage from './components/ExplorePage';
import HousesArchitectsPage from './components/HousesArchitectsPage';
import BenefitsInfoPage from './components/BenefitsInfoPage';
import ContactPage from './components/ContactPage';
import LandownerPortal from './landowner/LandownerPortal';
import { apiService } from './services/api';

const DEFAULT_COUNTRIES = [];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, explore, houses, benefits, contact, admin
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle snap-active class on root html node for scroll snapping only on home and explore pages
  useEffect(() => {
    if (activeTab === 'home' || activeTab === 'explore') {
      document.documentElement.classList.add('snap-active');
    } else {
      document.documentElement.classList.remove('snap-active');
    }
    // Clean up class if component unmounts
    return () => document.documentElement.classList.remove('snap-active');
  }, [activeTab]);

  // Dynamic state loaded from localStorage if exists
  const [countriesData, setCountriesData] = useState(() => {
    const local = localStorage.getItem('umoja_countries_data');

    // Helper to ensure all plots have an owner assigned (derived from countryId_owner)
    const ensureOwners = (data) => {
      if (!Array.isArray(data)) return [];
      return data.map(c => ({
        ...c,
        plots: (c.plots || []).map(p => ({
          owner: p.owner || p.owner_username || (c.id + '_owner'), // e.g. "kenya_owner"
          owner_username: p.owner_username || p.owner || (c.id + '_owner'),
          ...p
        }))
      }));
    };

    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          // Merge DEFAULT_COUNTRIES cultureInfo to ensure new fields exist
          const merged = parsed.map(c => {
            const match = DEFAULT_COUNTRIES.find(dc => dc.id === c.id);
            return {
              ...match,
              ...c,
              cultureInfo: c.cultureInfo || match?.cultureInfo
            };
          });
          return ensureOwners(merged);
        }
      } catch (err) {
        console.warn("Failed to parse local storage catalog, fallback to template.", err);
      }
    }
    return ensureOwners(DEFAULT_COUNTRIES);
  });

  // State to pass to contact form when selecting a plot or architect
  const [inquiryData, setInquiryData] = useState(null);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('umoja_countries_data', JSON.stringify(countriesData));
  }, [countriesData]);

  // Fetch directory from backend on mount (supports offline fallback)
  useEffect(() => {
    apiService.getCountries().then(data => {
      if (Array.isArray(data)) setCountriesData(data);
    });
  }, []);

  // Admin Callbacks:
  const handleAddPlot = (countryId, newPlot) => {
    setCountriesData(prev => prev.map(c => {
      if (c.id === countryId) {
        return {
          ...c,
          plots: [...c.plots, newPlot]
        };
      }
      return c;
    }));
  };

  const handleUpdateCountry = (countryId, updatedDetails) => {
    setCountriesData(prev => prev.map(c => {
      if (c.id === countryId) {
        return {
          ...c,
          motto: updatedDetails.motto || c.motto,
          desc: updatedDetails.desc || c.desc,
          highlights: updatedDetails.highlights || c.highlights,
          videoUrl: updatedDetails.videoUrl || c.videoUrl
        };
      }
      return c;
    }));
  };

  const handleDeletePlot = (countryId, plotId) => {
    setCountriesData(prev => prev.map(c => {
      if (c.id === countryId) {
        return {
          ...c,
          plots: c.plots.filter(p => p.id !== plotId)
        };
      }
      return c;
    }));
  };

  const handleResetData = () => {
    setCountriesData(DEFAULT_COUNTRIES);
  };

  // Handle transaction selections from Explore Page
  const handleSelectPlotInquiry = (plot, actionType) => {
    setInquiryData({
      type: 'Plot',
      action: actionType, // 'Buy', 'Negotiate', 'Show Interest'
      title: plot.title,
      size: plot.size,
      price: plot.price,
      id: plot.id
    });
    // Redirect to contact form
    handleNavigate('contact');
  };

  // Handle consultation clicks from Houses and Architects page
  const handleConnectArchitect = (target, type) => {
    if (type === 'Architect Direct Connection') {
      setInquiryData({
        type: 'Architect',
        name: target.name,
        country: target.country
      });
    } else {
      setInquiryData({
        type: 'House Design',
        title: target.title,
        buildCostEstimate: target.buildCostEstimate
      });
    }
    // Redirect to contact form
    handleNavigate('contact');
  };

  // Smooth navigation helper
  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#FFFFFF'
    }}>
      
      {/* Floating White Header Bar */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '75px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 6%',
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 2px 10px rgba(26,62,38,0.02)'
      }}>
        {/* Brand signature */}
        <div 
          onClick={() => handleNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '1.4rem',
            color: 'var(--text-title)',
            letterSpacing: '0.02em',
            fontWeight: 700
          }}
        >
          <Compass size={24} style={{ color: 'var(--accent-gold)' }} />
          <span>UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span></span>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: '24px',
          fontSize: '0.82rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 600,
          height: '100%',
          alignItems: 'center'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'explore', label: 'Explore Plots' },
            { id: 'houses', label: 'Houses & Architects' },
            { id: 'benefits', label: 'Benefits & Info' },
            { id: 'contact', label: 'Contact' },
            { id: 'landowner', label: 'Owner Portal' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleNavigate(tab.id)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '8px 0',
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  transition: 'var(--transition-fast)'
                }}
                className={`nav-link-tab ${isActive ? 'active' : ''}`}
              >
                {tab.label}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-25px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent)'
                  }} />
                )}
              </span>
            );
          })}
        </nav>

        {/* Quick action button */}
        <div className="header-cta-container" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="btn-primary" 
            onClick={() => handleNavigate('contact')}
            style={{ padding: '10px 20px', fontSize: '0.8rem', borderRadius: '4px' }}
          >
            Get Vetted Land
          </button>
        </div>

        {/* Hamburger Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
            color: 'var(--text-title)',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} style={{ color: 'var(--accent)' }} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Dropdown Menu */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '75px',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 6%',
            zIndex: 99,
            gap: '16px'
          }} 
          className="mobile-nav-menu"
        >
          {[
            { id: 'home', label: 'Home' },
            { id: 'explore', label: 'Explore Plots' },
            { id: 'houses', label: 'Houses & Architects' },
            { id: 'benefits', label: 'Benefits & Info' },
            { id: 'contact', label: 'Contact' },
            { id: 'landowner', label: 'Owner Portal' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => {
                  handleNavigate(tab.id);
                  setMenuOpen(false);
                }}
                style={{
                  cursor: 'pointer',
                  padding: '12px 0',
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  borderBottom: '1px solid rgba(0,0,0,0.03)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {tab.label}
              </span>
            );
          })}
          <button 
            className="btn-primary" 
            onClick={() => {
              handleNavigate('contact');
              setMenuOpen(false);
            }}
            style={{ padding: '12px 20px', fontSize: '0.85rem', borderRadius: '4px', marginTop: '8px', width: '100%', textAlign: 'center' }}
          >
            Get Vetted Land
          </button>
        </div>
      )}

      {/* Render active page state */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '75px' }}>
        {activeTab === 'home' && <Home onNavigate={handleNavigate} />}
        {activeTab === 'explore' && <ExplorePage countriesData={countriesData} onSelectPlot={handleSelectPlotInquiry} />}
        {activeTab === 'houses' && <HousesArchitectsPage onConnectArchitect={handleConnectArchitect} />}
        {activeTab === 'benefits' && <BenefitsInfoPage />}
        {activeTab === 'contact' && <ContactPage inquiryData={inquiryData} />}
        {(activeTab === 'landowner' || activeTab === 'admin') && (
          <LandownerPortal 
            countriesData={countriesData} 
            setCountriesData={setCountriesData} 
            onNavigate={handleNavigate} 
          />
        )}
      </main>

      {/* Corporate Light Footer */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '60px 6% 40px',
        color: 'var(--text-body)',
        fontSize: '0.85rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr 1fr',
          gap: '50px'
        }} className="footer-layout">
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', color: 'var(--text-title)', marginBottom: '14px', fontWeight: 700 }}>
              UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span>
            </h4>
            <p style={{ lineHeight: '1.6', marginBottom: '18px', fontWeight: 300 }}>
              Umoja Terra is a digital pan-African real estate network enabling secure, vetted, cross-border land ownership. Our mission is to promote unity, trust, and structural security, giving every African a clear path to own land anywhere on the continent.
            </p>
            <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>© 2026 Umoja Terra. All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Site Map</span>
            <span onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>Home</span>
            <span onClick={() => handleNavigate('explore')} style={{ cursor: 'pointer' }}>Explore Plots</span>
            <span onClick={() => handleNavigate('houses')} style={{ cursor: 'pointer' }}>Houses & Architects</span>
            <span onClick={() => handleNavigate('benefits')} style={{ cursor: 'pointer' }}>Benefits & Info</span>
            <span onClick={() => handleNavigate('contact')} style={{ cursor: 'pointer' }}>Contact Hub</span>
            <span onClick={() => handleNavigate('admin')} style={{ cursor: 'pointer' }}>Admin Console</span>
            <span onClick={() => handleNavigate('landowner')} style={{ cursor: 'pointer' }}>Landowner Portal</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Continental Offices</span>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Phone size={14} style={{ color: 'var(--accent-gold)' }} />
              <strong>+(254) 700 000 000</strong>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Mail size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>inquire@umojaterra.com</span>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <MapPin size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span>Suite 4B, Silicon Valley Arcade, Kilimani, Nairobi, Kenya.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Navigation styling */}
      <style>{`
        .nav-link-tab:hover {
          color: var(--accent) !important;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mobile-nav-menu {
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (max-width: 900px) {
          header nav {
            display: none !important;
          }
          .header-cta-container {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .footer-layout {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>

    </div>
  );
}
