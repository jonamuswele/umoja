import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Edit, 
  Users, 
  TrendingUp, 
  Save, 
  LogOut, 
  MapPin, 
  Eye, 
  Mail, 
  Phone, 
  Clock, 
  ArrowUpRight, 
  Lock,
  Sparkles,
  CheckCircle,
  HelpCircle,
  PlusCircle,
  Building
} from 'lucide-react';
import { apiService } from '../services/api';
import './LandownerPortal.css';

// Mini internal Polaroid cluster component for real-time preview (matching ExplorePage styling)
function PreviewPhotoCluster({ photos, accent }) {
  if (!photos || photos.length === 0) return null;
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '220px',
      margin: '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {photos.map((ph, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: i === 0 ? '160px' : '130px',
            top: i === 0 ? '0px' : '30px',
            transform: `rotate(${i === 0 ? -3.5 : 2.5}deg) scale(${i === 0 ? 1 : 0.9})`,
            zIndex: 3 - i,
            cursor: 'pointer'
          }}
        >
          <div style={{
            background: '#FAFAF8',
            padding: '6px 6px 18px 6px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            borderRadius: '4px',
            border: '1px solid #EAE6DB'
          }}>
            <div style={{ overflow: 'hidden', borderRadius: '2px' }}>
              <img
                src={ph.img}
                alt={ph.caption}
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  display: 'block'
                }}
                onError={e => { e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600"; }}
              />
            </div>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.55rem',
              color: '#6E7A72',
              marginTop: '6px',
              textAlign: 'center',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {ph.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LandownerPortal({ countriesData, setCountriesData, onNavigate }) {
  // Current Logged-In User Profile State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('umoja_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn("Failed to parse user profile from session storage", e);
      return null;
    }
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Portal Navigation State
  const [activePortalTab, setActivePortalTab] = useState('dashboard'); // dashboard, customize, inquiries
  
  // Customizer view: 'edit' (Edit Existing Plot) vs 'add' (Add New Plot)
  const [customizerMode, setCustomizerMode] = useState('edit'); 
  const [selectedAddCountryId, setSelectedAddCountryId] = useState('kenya');

  // Customizer Edit/Add Form State
  const [selectedPlotId, setSelectedPlotId] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
    size: '',
    price: 0,
    neighborhood: '',
    photo1Url: '',
    photo1Caption: '',
    photo2Url: '',
    photo2Caption: ''
  });
  
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Dashboard Stats State loaded dynamically from backend/localStorage
  const [dashboardStats, setDashboardStats] = useState({
    totalViews: 0,
    totalInquiries: 0,
    conversionRate: "0.0",
    leads: [],
    viewsChart: []
  });
  
  // Fetch stats from backend whenever user, catalog or saves change
  useEffect(() => {
    if (currentUser) {
      apiService.getDashboardStats(currentUser, countriesData).then(stats => {
        if (stats) setDashboardStats(stats);
      });
    }
  }, [currentUser, countriesData, saveSuccess, activePortalTab]);

  // Filtered plots based on the logged-in landowner
  const getFilteredPlots = () => {
    const list = [];
    if (!currentUser || !Array.isArray(countriesData)) return list;

    countriesData.forEach(country => {
      if (country && Array.isArray(country.plots)) {
        country.plots.forEach(plot => {
          if (currentUser.role === 'admin' || plot.owner === currentUser.username || plot.owner_username === currentUser.username) {
            list.push({
              ...plot,
              countryId: country.id,
              countryName: country.name
            });
          }
        });
      }
    });
    return list;
  };

  const filteredPlotsList = getFilteredPlots();

  // Set default selected plot on loading or landowner login change
  useEffect(() => {
    if (filteredPlotsList.length > 0) {
      setSelectedPlotId(filteredPlotsList[0].id);
    } else {
      setSelectedPlotId('');
    }
  }, [currentUser, countriesData]);

  // Update edit form when selected plot changes or customizer mode resets
  useEffect(() => {
    if (customizerMode === 'edit') {
      if (selectedPlotId) {
        const foundPlot = filteredPlotsList.find(p => p.id === selectedPlotId);
        if (foundPlot) {
          setEditForm({
            title: foundPlot.title || '',
            size: foundPlot.size || '',
            price: foundPlot.price || 0,
            neighborhood: foundPlot.neighborhood || '',
            photo1Url: foundPlot.photos?.[0]?.img || '',
            photo1Caption: foundPlot.photos?.[0]?.caption || '',
            photo2Url: foundPlot.photos?.[1]?.img || '',
            photo2Caption: foundPlot.photos?.[1]?.caption || ''
          });
        }
      } else {
        setEditForm({
          title: '',
          size: '',
          price: 0,
          neighborhood: '',
          photo1Url: '',
          photo1Caption: '',
          photo2Url: '',
          photo2Caption: ''
        });
      }
    } else {
      // Add mode defaults
      setEditForm({
        title: '',
        size: '30m x 20m (600 SQM)',
        price: 25000,
        neighborhood: 'Located in a secure gated area with access roads, water, and certified beacon boundaries.',
        photo1Url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        photo1Caption: 'Cleared plot terrain',
        photo2Url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
        photo2Caption: 'Scenic neighborhood borders'
      });
    }
  }, [selectedPlotId, customizerMode, countriesData]);

  // Handle Login Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const profile = await apiService.login(username, password);
      setCurrentUser(profile);
      sessionStorage.setItem('umoja_current_user', JSON.stringify(profile));
    } catch (err) {
      setLoginError(err.message || 'Authentication failed.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('umoja_current_user');
  };

  // Handle Form field changes
  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  // Handle Save Customization (Edit Plot OR Add Plot)
  const handleSaveCustomization = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const plotData = {
      title: editForm.title,
      size: editForm.size,
      price: editForm.price,
      neighborhood: editForm.neighborhood,
      photos: [
        { img: editForm.photo1Url, rotate: -3.5, scale: 1, caption: editForm.photo1Caption },
        { img: editForm.photo2Url, rotate: 2.1, scale: 0.92, caption: editForm.photo2Caption }
      ]
    };

    try {
      if (customizerMode === 'edit') {
        if (!selectedPlotId) return;
        const targetPlot = filteredPlotsList.find(p => p.id === selectedPlotId);
        if (!targetPlot) return;

        // Call backend API
        const updatedPlot = await apiService.updatePlot(selectedPlotId, plotData, currentUser, targetPlot.countryId);

        setCountriesData(prevData => prevData.map(country => {
          if (country.id === targetPlot.countryId) {
            return {
              ...country,
              plots: country.plots.map(plot => {
                if (plot.id === selectedPlotId) {
                  return { ...plot, ...updatedPlot };
                }
                return plot;
              })
            };
          }
          return country;
        }));

        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);

      } else {
        // Add New Plot Mode
        const newPlot = await apiService.addPlot({
          ...plotData,
          country_id: selectedAddCountryId
        }, currentUser);

        setCountriesData(prevData => prevData.map(country => {
          if (country.id === selectedAddCountryId) {
            return {
              ...country,
              plots: [...(country.plots || []), newPlot]
            };
          }
          return country;
        }));

        setSaveSuccess(true);
        
        // Auto switch back to edit mode and select the newly added plot
        setTimeout(() => {
          setSelectedPlotId(newPlot.id);
          setCustomizerMode('edit');
          setSaveSuccess(false);
        }, 1500);
      }
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  // Find country name of currently selected plot
  const getSelectedPlotCountryName = () => {
    if (customizerMode === 'edit') {
      const found = filteredPlotsList.find(p => p.id === selectedPlotId);
      return found ? found.countryName : 'Africa';
    } else {
      const countryObj = (Array.isArray(countriesData) ? countriesData : []).find(c => c.id === selectedAddCountryId);
      return countryObj ? countryObj.name : 'Africa';
    }
  };

  // Render Login screen if not authenticated
  if (!currentUser) {
    return (
      <div className="landowner-portal-wrapper">
        <div className="portal-login-container animate-fade-in">
          <div className="portal-login-card">
            <div className="portal-login-header">
              <span className="portal-login-subtitle">Tenant Hub</span>
              <h2 className="portal-login-title">Landowner Portal</h2>
              <p style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '6px' }}>
                Secure multi-tenant database workspace. Access metrics and customize specifications for your listings.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="portal-input-label">User Account / Username</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. kenya_owner or nigeria_owner"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="portal-input"
                />
              </div>

              <div>
                <label className="portal-input-label">Console Access Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="portal-input"
                />
              </div>

              {loginError && (
                <div style={{ color: '#EF4444', fontSize: '0.78rem', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px', borderRadius: '4px' }}>
                  {loginError}
                </div>
              )}

              <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} className="portal-btn-save">
                <Lock size={16} />
                <span>Verify Credentials & Enter</span>
              </button>
            </form>

            <div style={{ marginTop: '20px', backgroundColor: 'rgba(210, 125, 45, 0.06)', border: '1px solid rgba(210, 125, 45, 0.15)', borderRadius: '4px', padding: '14px', fontSize: '0.74rem', color: 'var(--accent-gold)' }}>
              <strong>Credential Guidelines:</strong><br />
              • Global Admin: <code style={{ color: '#FFFFFF' }}>admin</code> / <code style={{ color: '#FFFFFF' }}>admin</code><br />
              • Kenya Landowner: <code style={{ color: '#FFFFFF' }}>kenya_owner</code> / <code style={{ color: '#FFFFFF' }}>umoja</code><br />
              • Nigeria Landowner: <code style={{ color: '#FFFFFF' }}>nigeria_owner</code> / <code style={{ color: '#FFFFFF' }}>umoja</code><br />
              • Register New: Enter any username & password <code style={{ color: '#FFFFFF' }}>umoja</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="landowner-portal-wrapper animate-fade-in">
      
      {/* Sidebar Navigation */}
      <aside className="portal-sidebar">
        <div className="portal-sidebar-header">
          <Sparkles size={20} style={{ color: 'var(--accent-gold)' }} />
          <span className="portal-sidebar-title">Umoja Tenant</span>
        </div>

        <nav className="portal-sidebar-menu">
          <button 
            onClick={() => setActivePortalTab('dashboard')}
            className={`portal-sidebar-item ${activePortalTab === 'dashboard' ? 'active' : ''}`}
            style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
          >
            <LayoutDashboard size={16} />
            <span>Dashboard Overview</span>
          </button>

          <button 
            onClick={() => setActivePortalTab('customize')}
            className={`portal-sidebar-item ${activePortalTab === 'customize' ? 'active' : ''}`}
            style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
          >
            <Edit size={16} />
            <span>Customize Listings</span>
          </button>

          <button 
            onClick={() => setActivePortalTab('inquiries')}
            className={`portal-sidebar-item ${activePortalTab === 'inquiries' ? 'active' : ''}`}
            style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
          >
            <Users size={16} />
            <span>My Inquiries ({dashboardStats.totalInquiries})</span>
          </button>
        </nav>

        <div className="portal-sidebar-footer">
          <div className="portal-user-card">
            <div className="portal-user-avatar">
              {currentUser.username[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                {currentUser.label}
              </div>
              <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>
                {currentUser.role === 'admin' ? 'System Administrator' : 'Verified Landowner'}
              </div>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#EF4444',
              borderRadius: '4px',
              padding: '10px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.06)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="portal-content">

        {/* 1. TAB: DASHBOARD OVERVIEW */}
        {activePortalTab === 'dashboard' && (
          <div>
            <div className="portal-section-header">
              <div>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                  {currentUser.role === 'admin' ? 'Administrative Workspace' : 'Tenant Workspace'}
                </p>
                <h1 className="portal-section-title">
                  {currentUser.role === 'admin' ? 'Continental Performance Analytics' : `Analytics for ${currentUser.username}`}
                </h1>
              </div>
              
              <button 
                onClick={() => onNavigate('explore')}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(210,125,45,0.3)',
                  color: 'var(--accent-gold)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>View Public Explore Page</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Stat Cards Grid */}
            <div className="portal-stats-grid">
              <div className="portal-stat-card">
                <div className="portal-stat-header">
                  <span>Listing Traffic (Clicks)</span>
                  <Eye size={16} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div className="portal-stat-value">{dashboardStats.totalViews}</div>
                <div className="portal-stat-change positive">
                  <TrendingUp size={12} />
                  <span>Only counting your plots</span>
                </div>
              </div>

              <div className="portal-stat-card">
                <div className="portal-stat-header">
                  <span>Leads & Inquiries</span>
                  <Users size={16} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div className="portal-stat-value">{dashboardStats.totalInquiries}</div>
                <div className="portal-stat-change positive">
                  <TrendingUp size={12} />
                  <span>{dashboardStats.conversionRate}% Conversion Rate</span>
                </div>
              </div>

              <div className="portal-stat-card">
                <div className="portal-stat-header">
                  <span>My Assets Value</span>
                  <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div className="portal-stat-value">
                  ${filteredPlotsList.reduce((acc, p) => acc + p.price, 0).toLocaleString()}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                  {filteredPlotsList.length} registered vetted plots
                </div>
              </div>
            </div>

            {/* Double column details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }} className="customizer-split-grid">
              
              {/* Left Column: Recent leads */}
              <div className="portal-card" style={{ marginBottom: 0 }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>Recent Escrow Proposals</h3>
                  <button 
                    onClick={() => setActivePortalTab('inquiries')}
                    style={{ border: 'none', background: 'none', color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    View All
                  </button>
                </div>
                
                <div style={{ padding: '10px 0' }}>
                  {dashboardStats.leads.length > 0 ? (
                    dashboardStats.leads.slice(0, 4).map((lead, idx) => (
                      <div 
                        key={lead.id} 
                        style={{ 
                          padding: '16px 24px', 
                          borderBottom: idx === 3 || idx === dashboardStats.leads.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.03)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          gap: '15px'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.85rem' }}>{lead.fullName}</span>
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                            Referencing <strong>{lead.plotTitle}</strong> ({lead.countryName})
                          </span>
                          <p style={{ margin: '6px 0 0', fontSize: '0.78rem', color: '#CBD5E1', fontStyle: 'italic', lineHeight: 1.4 }}>
                            "{lead.message.length > 85 ? lead.message.substring(0, 85) + '...' : lead.message}"
                          </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: '6px', flexShrink: 0 }}>
                          <span className={`lead-status-pill ${lead.type.toLowerCase() === 'buy' ? 'buy' : 'negotiate'}`}>
                            {lead.type}
                          </span>
                          <span style={{ fontSize: '0.65rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={10} />
                            {new Date(lead.timestamp).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontStyle: 'italic' }}>
                      No inquiries or clicks registered for your listings yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Mini traffic chart */}
              <div className="portal-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: 0 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>Weekly Listing Visits</h3>
                
                <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', height: '160px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {dashboardStats.viewsChart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <div 
                        style={{ 
                          width: '18px', 
                          height: `${item.count > 0 ? Math.min((item.count / (dashboardStats.totalViews || 1)) * 250, 120) : 4}px`, 
                          background: item.active 
                            ? 'linear-gradient(to top, var(--accent-gold) 0%, #F59E0B 100%)' 
                            : 'linear-gradient(to top, var(--accent) 0%, #10B981 100%)',
                          borderRadius: '3px 3px 0 0',
                          position: 'relative',
                          transition: 'height 0.5s ease',
                          cursor: 'pointer'
                        }}
                        className="hover-lift"
                        title={`${item.count} views`}
                      >
                        {item.active && item.count > 0 && (
                          <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent-gold)', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 'bold', padding: '2px 4px', borderRadius: '2px', whiteSpace: 'nowrap' }}>
                            {item.count}
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>{item.day}</span>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94A3B8' }}>Listings Active:</span>
                    <strong style={{ color: '#FFFFFF' }}>{filteredPlotsList.length} Plots</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94A3B8' }}>Verification:</span>
                    <strong style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={12} />
                      <span>Certified Escrow</span>
                    </strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. TAB: CUSTOMIZE PLOT DETAILS (SPLIT SCREEN VIEW WITH ADD OPTION) */}
        {activePortalTab === 'customize' && (
          <div>
            <div className="portal-section-header">
              <div>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Customization Desk</p>
                <h1 className="portal-section-title">
                  {customizerMode === 'edit' ? 'Modify Existing Specifications' : 'Publish New Land Listing'}
                </h1>
              </div>

              {/* Toggle Customizer Modes */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setCustomizerMode('edit')}
                  style={{
                    backgroundColor: customizerMode === 'edit' ? 'var(--accent)' : 'transparent',
                    border: '1px solid var(--accent)',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Edit size={14} />
                  <span>Edit Plot ({filteredPlotsList.length})</span>
                </button>

                <button
                  onClick={() => setCustomizerMode('add')}
                  style={{
                    backgroundColor: customizerMode === 'add' ? 'var(--accent)' : 'transparent',
                    border: '1px solid var(--accent)',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <PlusCircle size={14} />
                  <span>Add New Plot</span>
                </button>
              </div>
            </div>

            <div className="customizer-split-grid">
              
              {/* Left Column: Form Editor */}
              <div className="portal-card" style={{ marginBottom: 0 }}>
                <form onSubmit={handleSaveCustomization} className="customizer-form-section">
                  
                  {customizerMode === 'edit' ? (
                    <div>
                      <label className="portal-input-label">Select Owned Plot to Modify</label>
                      {filteredPlotsList.length > 0 ? (
                        <select
                          value={selectedPlotId}
                          onChange={(e) => setSelectedPlotId(e.target.value)}
                          className="portal-select"
                        >
                          {(Array.isArray(countriesData) ? countriesData : []).map(country => {
                            const countryOwnedPlots = (country.plots || []).filter(p => currentUser.role === 'admin' || p.owner_username === currentUser.username || p.owner === currentUser.username);
                            if (countryOwnedPlots.length === 0) return null;
                            return (
                              <optgroup key={country.id} label={`${country.name} Listings`}>
                                {countryOwnedPlots.map(plot => (
                                  <option key={plot.id} value={plot.id}>
                                    {plot.title} (${(plot.price || 0).toLocaleString()})
                                  </option>
                                ))}
                              </optgroup>
                            );
                          })}
                        </select>
                      ) : (
                        <div style={{ color: '#EF4444', fontSize: '0.8rem', fontStyle: 'italic', padding: '10px 0' }}>
                          You do not own any listings yet. Click 'Add New Plot' to list land.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="portal-input-label">Target Listing Country</label>
                      <select
                        value={selectedAddCountryId}
                        onChange={(e) => setSelectedAddCountryId(e.target.value)}
                        className="portal-select"
                      >
                        {(Array.isArray(countriesData) ? countriesData : []).map(country => (
                          <option key={country.id} value={country.id}>
                            {country.name} ({country.motto})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <hr style={{ borderColor: 'rgba(210,125,45,0.12)', margin: '5px 0' }} />

                  <div>
                    <label className="portal-input-label">Commercial Listing Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleFormFieldChange}
                      required
                      placeholder="e.g. Diani Palm Holiday Resort"
                      className="portal-input"
                    />
                  </div>

                  <div className="form-group-grid">
                    <div>
                      <label className="portal-input-label">Dimension Specs (Size)</label>
                      <input
                        type="text"
                        name="size"
                        value={editForm.size}
                        onChange={handleFormFieldChange}
                        required
                        placeholder="e.g. 30m x 25m (750 SQM)"
                        className="portal-input"
                      />
                    </div>

                    <div>
                      <label className="portal-input-label">Vetted Price (USD) *</label>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleFormFieldChange}
                        required
                        placeholder="35000"
                        className="portal-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="portal-input-label">Neighborhood & Vetting narrative</label>
                    <textarea
                      name="neighborhood"
                      value={editForm.neighborhood}
                      onChange={handleFormFieldChange}
                      required
                      rows={4}
                      placeholder="Provide neighborhood information, infrastructure access (water, power), escrow certifications, and terrain quality details..."
                      className="portal-textarea"
                    />
                  </div>

                  <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                      Polaroid Photo Cluster (Optional Custom Links)
                    </span>
                    
                    <div className="form-group-grid" style={{ marginBottom: '12px' }}>
                      <div>
                        <label className="portal-input-label" style={{ fontSize: '0.65rem' }}>Photo 1 Image Link</label>
                        <input
                          type="text"
                          name="photo1Url"
                          value={editForm.photo1Url}
                          onChange={handleFormFieldChange}
                          placeholder="https://images.unsplash.com/..."
                          className="portal-input"
                        />
                      </div>
                      <div>
                        <label className="portal-input-label" style={{ fontSize: '0.65rem' }}>Photo 1 Polaroid Caption</label>
                        <input
                          type="text"
                          name="photo1Caption"
                          value={editForm.photo1Caption}
                          onChange={handleFormFieldChange}
                          placeholder="e.g. Surveyed boundaries"
                          className="portal-input"
                        />
                      </div>
                    </div>

                    <div className="form-group-grid">
                      <div>
                        <label className="portal-input-label" style={{ fontSize: '0.65rem' }}>Photo 2 Image Link</label>
                        <input
                          type="text"
                          name="photo2Url"
                          value={editForm.photo2Url}
                          onChange={handleFormFieldChange}
                          placeholder="https://images.unsplash.com/..."
                          className="portal-input"
                        />
                      </div>
                      <div>
                        <label className="portal-input-label" style={{ fontSize: '0.65rem' }}>Photo 2 Polaroid Caption</label>
                        <input
                          type="text"
                          name="photo2Caption"
                          value={editForm.photo2Caption}
                          onChange={handleFormFieldChange}
                          placeholder="e.g. Neighborhood access road"
                          className="portal-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <button type="submit" disabled={customizerMode === 'edit' && filteredPlotsList.length === 0} style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="portal-btn-save">
                      <Save size={16} />
                      <span>{customizerMode === 'edit' ? 'Save Listing Changes' : 'Create Listing'}</span>
                    </button>

                    {saveSuccess && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981', fontSize: '0.8rem', fontWeight: 600 }} className="animate-fade-in">
                        <CheckCircle size={16} />
                        <span>{customizerMode === 'edit' ? 'Synced to Explore page!' : 'Created and synced successfully!'}</span>
                      </span>
                    )}
                  </div>

                </form>
              </div>

              {/* Right Column: Real-Time Preview Panel */}
              <div className="preview-pane-container">
                <div className="preview-pane-header">
                  <span>Interactive Live Preview</span>
                  <div className="preview-pane-badge">Real-Time Sync</div>
                </div>

                <div className="preview-content-box">
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', color: '#2C3E35', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
                    
                    {/* Polaroid cluster simulation */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '5px 0' }}>
                      <PreviewPhotoCluster 
                        photos={[
                          { img: editForm.photo1Url, caption: editForm.photo1Caption },
                          { img: editForm.photo2Url, caption: editForm.photo2Caption }
                        ]} 
                        accent="#D27D2D" 
                      />
                    </div>

                    {/* Metadata Header */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <MapPin size={12} style={{ color: 'var(--accent-gold)' }} />
                        <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {getSelectedPlotCountryName().toUpperCase()} / VETTED LAND LISTING
                        </span>
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.6rem',
                        fontWeight: 400,
                        color: '#1A3E26',
                        margin: '0 0 8px',
                        lineHeight: 1.2
                      }}>
                        {editForm.title || "Untitled Listing"}
                      </h3>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{
                          backgroundColor: 'rgba(210, 125, 45, 0.08)',
                          border: '1px solid rgba(210, 125, 45, 0.25)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          color: 'var(--accent-gold)'
                        }}>
                          Size: {editForm.size || "Not specified"}
                        </span>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                          <span style={{ fontSize: '0.75rem', color: '#1A3E26', fontWeight: 500 }}>USD</span>
                          <span style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1A3E26', lineHeight: 1 }}>
                            ${editForm.price ? editForm.price.toLocaleString() : '0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p style={{
                      fontSize: '0.82rem',
                      lineHeight: 1.5,
                      color: '#4A564E',
                      margin: 0,
                      fontWeight: 300,
                      maxHeight: '120px',
                      overflowY: 'auto'
                    }}>
                      {editForm.neighborhood || "No description provided."}
                    </p>

                    {/* Action buttons preview */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                      <button
                        type="button"
                        disabled
                        style={{
                          flex: 1.2,
                          backgroundColor: 'var(--accent)',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '10px',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          borderRadius: '4px',
                          opacity: 0.85
                        }}
                      >
                        Buy Securely
                      </button>

                      <button
                        type="button"
                        disabled
                        style={{
                          flex: 1,
                          backgroundColor: 'transparent',
                          color: 'var(--accent)',
                          border: '1px solid var(--accent)',
                          padding: '10px',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          borderRadius: '4px',
                          opacity: 0.85
                        }}
                      >
                        Negotiate
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 3. TAB: ALL INQUIRIES & LEADS MANAGER */}
        {activePortalTab === 'inquiries' && (
          <div>
            <div className="portal-section-header">
              <div>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Buyer Network</p>
                <h1 className="portal-section-title">
                  {currentUser.role === 'admin' ? 'All Global Escrow Proposals' : `Buyer Inquiries for ${currentUser.username}`}
                </h1>
              </div>
            </div>

            <div className="portal-card">
              <div className="portal-table-container">
                <table className="portal-table">
                  <thead>
                    <tr>
                      <th>Buyer Details</th>
                      <th>Acquisition Property</th>
                      <th>Location / Country</th>
                      <th>Date Received</th>
                      <th>Inquiry Type</th>
                      <th>Message / Proposal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardStats.leads.length > 0 ? (
                      dashboardStats.leads.map(lead => (
                        <tr key={lead.id}>
                          <td>
                            <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.85rem' }}>{lead.fullName}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px', fontSize: '0.75rem', color: '#94A3B8' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Mail size={12} />
                                <a href={`mailto:${lead.email}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>{lead.email}</a>
                              </span>
                              {lead.phone && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Phone size={12} />
                                  <span>{lead.phone}</span>
                                </span>
                              )}
                            </div>
                          </td>
                          <td>
                            <strong style={{ color: '#FFFFFF' }}>{lead.plotTitle}</strong>
                            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>ID: {lead.plotId}</div>
                          </td>
                          <td>
                            <div>{lead.currentCity || lead.countryName}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>Listing: {lead.countryName}</div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Clock size={12} style={{ color: 'var(--accent-gold)' }} />
                              <span>{new Date(lead.timestamp).toLocaleDateString()}</span>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>
                              {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </td>
                          <td>
                            <span className={`lead-status-pill ${lead.type.toLowerCase() === 'buy' ? 'buy' : 'negotiate'}`}>
                              {lead.type}
                            </span>
                          </td>
                          <td>
                            <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.4, color: '#CBD5E1', maxWidth: '320px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                              {lead.message}
                            </p>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ padding: '60px', textAlign: 'center', color: '#64748B', fontStyle: 'italic' }}>
                          No inquiries are currently registered.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Vetting Process Alert */}
            <div style={{
              backgroundColor: 'rgba(210,125,45,0.06)',
              border: '1px solid rgba(210,125,45,0.2)',
              borderRadius: '6px',
              padding: '24px',
              display: 'flex',
              gap: '12px',
              alignItems: 'start'
            }}>
              <HelpCircle size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px' }}>
                  Tenant Escrow Protocol
                </h5>
                <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5, fontWeight: 300, margin: 0 }}>
                  Proposals are verified by the regional Escrow Agent. As a landowner, you can initiate title checking directly from your dashboard contacts. Do not execute external transfers. All continental real estate transaction funding must stay in escrow until the Land Registry verifies transfer.
                </p>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
