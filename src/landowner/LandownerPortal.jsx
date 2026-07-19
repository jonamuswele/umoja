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
  Building,
  Globe
} from 'lucide-react';
import { apiService } from '../services/api';
import './LandownerPortal.css';

const ALL_AFRICAN_COUNTRIES = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", 
  "Central African Republic", "Chad", "Comoros", "Congo (Brazzaville)", "DRC (Congo)", "Djibouti", 
  "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", 
  "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", 
  "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", 
  "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", 
  "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
];

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
  const [regLabel, setRegLabel] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccessMsg, setRegistrationSuccessMsg] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin data states
  const [pendingUsers, setPendingUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Portal Navigation State
  const [activePortalTab, setActivePortalTab] = useState('dashboard');
  
  // Customizer view: 'edit' (Edit Existing Plot) vs 'add' (Add New Plot)
  const [customizerMode, setCustomizerMode] = useState('edit'); 
  const [selectedAddCountryId, setSelectedAddCountryId] = useState('');

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

  // Admin Country Customization State
  const [selectedAdminCountryId, setSelectedAdminCountryId] = useState('');
  const [adminCountryForm, setAdminCountryForm] = useState({
    motto: '',
    desc: '',
    videoUrl: '',
    accent: '#1A3E26',
    flag: '🌍',
    highlights: '',
    whyLive: '',
    bestBuild: '',
    culture: '',
    potentialNeighborhoods: [],
    culturePhotos: []
  });

  const [newCountryName, setNewCountryName] = useState('');
  const [newCountryFlag, setNewCountryFlag] = useState('');

  // Populate admin country form when selectedAdminCountryId or countriesData changes
  useEffect(() => {
    if (currentUser?.role === 'admin' && Array.isArray(countriesData) && countriesData.length > 0) {
      const activeId = selectedAdminCountryId || countriesData[0].id;
      if (!selectedAdminCountryId) {
        setSelectedAdminCountryId(activeId);
      }
      const countryObj = countriesData.find(c => c.id === activeId);
      if (countryObj) {
        const cult = countryObj.cultureInfo || {};
        setAdminCountryForm({
          motto: countryObj.motto || '',
          desc: countryObj.desc || '',
          videoUrl: countryObj.videoUrl || '',
          accent: countryObj.accent || '#1A3E26',
          flag: countryObj.flag || '🌍',
          highlights: Array.isArray(countryObj.highlights) ? countryObj.highlights.join(', ') : '',
          whyLive: cult.whyLive || '',
          bestBuild: cult.bestBuild || '',
          culture: cult.culture || '',
          potentialNeighborhoods: countryObj.potentialNeighborhoods || [],
          culturePhotos: cult.culturePhotos || []
        });
      }
    }
  }, [selectedAdminCountryId, countriesData, currentUser]);
  
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
    setRegistrationSuccessMsg('');
    try {
      const profile = await apiService.login(username, password);
      setCurrentUser(profile);
      sessionStorage.setItem('umoja_current_user', JSON.stringify(profile));
    } catch (err) {
      setLoginError(err.message || 'Authentication failed.');
    }
  };

  // Handle Landowner Registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setRegistrationSuccessMsg('');
    try {
      if (!username || !password || !regLabel) {
        setLoginError('All registration fields are required.');
        return;
      }
      await apiService.register(username, password, regLabel);
      setRegistrationSuccessMsg('Registration request submitted! Please wait for Admin approval before logging in.');
      setIsRegistering(false);
      setPassword('');
      setRegLabel('');
    } catch (err) {
      setLoginError(err.message || 'Registration failed.');
    }
  };

  // Fetch admin approval queue and notifications
  const fetchAdminData = async () => {
    if (currentUser?.role === 'admin') {
      try {
        const pending = await apiService.getPendingUsers(currentUser);
        setPendingUsers(pending);
        const notifs = await apiService.getNotifications(currentUser);
        setNotifications(notifs);
      } catch (err) {
        console.error("Failed to load admin verification data", err);
      }
    }
  };

  // Trigger admin data load
  useEffect(() => {
    fetchAdminData();
  }, [currentUser]);

  // Handle Owner Approval
  const handleApproveUser = async (userToApprove) => {
    try {
      await apiService.approveUser(userToApprove, currentUser);
      alert(`User ${userToApprove} has been approved!`);
      fetchAdminData(); // Refresh queue
    } catch (err) {
      console.error("Approve failed", err);
      alert("Failed to approve user");
    }
  };

  // Handle Mark Notification Read
  const handleReadNotification = async (notifId) => {
    try {
      await apiService.readNotification(notifId, currentUser);
      fetchAdminData(); // Refresh notifications
    } catch (err) {
      console.error("Read notification failed", err);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('umoja_current_user');
    setUsername('');
    setPassword('');
    setIsRegistering(false);
    setRegistrationSuccessMsg('');
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
        if (!selectedAddCountryId || !selectedAddCountryId.trim()) {
          alert("Please enter a country name for this listing.");
          return;
        }

        const newPlot = await apiService.addPlot({
          ...plotData,
          country_id: selectedAddCountryId.trim()
        }, currentUser);

        // Re-fetch the catalog from the backend so that any dynamically created countries sync instantly
        const freshCountries = await apiService.getCountries();
        if (Array.isArray(freshCountries)) {
          setCountriesData(freshCountries);
        }

        setSaveSuccess(true);
        
        // Auto switch back to edit mode and select the newly added plot
        setTimeout(() => {
          setSelectedPlotId(newPlot.id);
          setCustomizerMode('edit');
          setSaveSuccess(false);
          setSelectedAddCountryId('');
        }, 1500);
      }
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  // Admin Country Metadata Customization Handler
  const handleSaveCountrySpecs = async (e) => {
    e.preventDefault();
    if (!selectedAdminCountryId) {
      alert("Please select a country to update.");
      return;
    }

    try {
      const formattedHighlights = adminCountryForm.highlights
        .split(',')
        .map(h => h.trim())
        .filter(Boolean);

      const countryData = {
        motto: adminCountryForm.motto,
        desc: adminCountryForm.desc,
        videoUrl: adminCountryForm.videoUrl,
        accent: adminCountryForm.accent,
        flag: adminCountryForm.flag,
        highlights: formattedHighlights,
        potentialNeighborhoods: adminCountryForm.potentialNeighborhoods,
        cultureInfo: {
          whyLive: adminCountryForm.whyLive,
          bestBuild: adminCountryForm.bestBuild,
          culture: adminCountryForm.culture,
          culturePhotos: adminCountryForm.culturePhotos
        }
      };

      const updatedCountry = await apiService.updateCountry(selectedAdminCountryId, countryData, currentUser);
      
      // Sync local state
      setCountriesData(prevData => prevData.map(c => {
        if (c.id === selectedAdminCountryId) {
          return {
            ...c,
            ...updatedCountry
          };
        }
        return c;
      }));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      alert("Country specifications updated successfully!");
    } catch (err) {
      console.error("Failed to save country specs", err);
      alert("Failed to update country specifications.");
    }
  };

  // Admin Create New Country Page Handler
  const handleCreateCountry = async (e) => {
    e.preventDefault();
    if (!newCountryName.trim()) {
      alert("Please enter a country name.");
      return;
    }
    try {
      const added = await apiService.addCountry({
        name: newCountryName.trim(),
        flag: newCountryFlag.trim() || '🌍'
      }, currentUser);
      
      alert(`Country ${added.name} ${added.flag} added successfully!`);
      setNewCountryName('');
      setNewCountryFlag('');
      
      // Re-fetch database countries list
      const freshCountries = await apiService.getCountries();
      if (Array.isArray(freshCountries)) {
        setCountriesData(freshCountries);
        setSelectedAdminCountryId(added.id); // Focus the admin editor on this country
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add country page.");
    }
  };

  // Landowner Delete Plot Handler
  const handleDeletePlotClick = async () => {
    if (!selectedPlotId) return;
    const targetPlot = filteredPlotsList.find(p => p.id === selectedPlotId);
    if (!targetPlot) return;

    const confirmDelete = window.confirm(`Are you sure you want to permanently delete "${targetPlot.title}"?`);
    if (!confirmDelete) return;

    try {
      await apiService.deletePlot(selectedPlotId, currentUser, targetPlot.countryId);
      
      // Update local state catalog by removing this plot
      setCountriesData(prevData => prevData.map(country => {
        if (country.id === targetPlot.countryId) {
          return {
            ...country,
            plots: (country.plots || []).filter(p => p.id !== selectedPlotId)
          };
        }
        return country;
      }));

      alert("Plot listing deleted successfully!");
      setSelectedPlotId('');
      
      // Refresh dashboard analytics
      apiService.getDashboardStats(currentUser, countriesData).then(stats => {
        if (stats) setDashboardStats(stats);
      });
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete the listing.");
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

  // Render Login / Registration screen if not authenticated
  if (!currentUser) {
    return (
      <div className="landowner-portal-wrapper">
        <div className="portal-login-container animate-fade-in">
          <div className="portal-login-card">
            
            {/* Toggle header title */}
            <div className="portal-login-header">
              <span className="portal-login-subtitle">Tenant Hub</span>
              <h2 className="portal-login-title">
                {isRegistering ? 'Register Owner Account' : 'Landowner Portal'}
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '6px' }}>
                {isRegistering 
                  ? 'Submit your landowner account details. System Admin approval is required before logging in.'
                  : 'Secure multi-tenant database workspace. Access metrics and customize specifications for your listings.'}
              </p>
            </div>

            {registrationSuccessMsg && (
              <div style={{ color: '#10B981', fontSize: '0.78rem', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '4px', marginBottom: '15px', lineHeight: '1.4' }}>
                {registrationSuccessMsg}
              </div>
            )}

            {isRegistering ? (
              /* REGISTRATION FORM */
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="portal-input-label">Request Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. rwanda_owner"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                    className="portal-input"
                  />
                </div>

                <div>
                  <label className="portal-input-label">Full Name / Organization Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kigali Real Estate Ltd"
                    value={regLabel}
                    onChange={(e) => setRegLabel(e.target.value)}
                    className="portal-input"
                  />
                </div>

                <div>
                  <label className="portal-input-label">Access Password</label>
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
                  <Sparkles size={16} />
                  <span>Submit Registration Request</span>
                </button>

                <button 
                  type="button" 
                  onClick={() => { setIsRegistering(false); setLoginError(''); }}
                  style={{ border: 'none', background: 'none', color: 'var(--accent-gold)', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'center', marginTop: '5px' }}
                >
                  Already have an account? Login here
                </button>
              </form>
            ) : (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="portal-input-label">User Account / Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. admin or landowner_name"
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

                <button 
                  type="button" 
                  onClick={() => { setIsRegistering(true); setLoginError(''); setRegistrationSuccessMsg(''); }}
                  style={{ border: 'none', background: 'none', color: 'var(--accent-gold)', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'center', marginTop: '5px' }}
                >
                  New landowner? Register account for approval
                </button>
              </form>
            )}

            <div style={{ marginTop: '20px', backgroundColor: 'rgba(210, 125, 45, 0.06)', border: '1px solid rgba(210, 125, 45, 0.15)', borderRadius: '4px', padding: '14px', fontSize: '0.74rem', color: 'var(--accent-gold)' }}>
              <strong>Verification Guidelines:</strong><br />
              • System Administrator: <code style={{ color: '#FFFFFF' }}>admin</code> / <code style={{ color: '#FFFFFF' }}>admin</code><br />
              • Landowners: Submit a registration request. The Admin can review and activate your login immediately from the Pending Approvals list.
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
            onClick={() => { setActivePortalTab('listings'); setCustomizerMode('edit'); }}
            className={`portal-sidebar-item ${activePortalTab === 'listings' ? 'active' : ''}`}
            style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
          >
            <Edit size={16} />
            <span>My Listings</span>
          </button>

          <button 
            onClick={() => { setActivePortalTab('addplot'); setCustomizerMode('add'); }}
            className={`portal-sidebar-item ${activePortalTab === 'addplot' ? 'active' : ''}`}
            style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
          >
            <PlusCircle size={16} />
            <span>Add New Plot</span>
          </button>

          <button 
            onClick={() => setActivePortalTab('inquiries')}
            className={`portal-sidebar-item ${activePortalTab === 'inquiries' ? 'active' : ''}`}
            style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
          >
            <Users size={16} />
            <span>My Inquiries ({dashboardStats.totalInquiries})</span>
          </button>

          {currentUser.role === 'admin' && (
            <>
              <button 
                onClick={() => setActivePortalTab('countries')}
                className={`portal-sidebar-item ${activePortalTab === 'countries' ? 'active' : ''}`}
                style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
              >
                <Globe size={16} />
                <span>Manage Country Pages</span>
              </button>

              <button 
                onClick={() => setActivePortalTab('approvals')}
                className={`portal-sidebar-item ${activePortalTab === 'approvals' ? 'active' : ''}`}
                style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
              >
                <CheckCircle size={16} />
                <span>Pending Approvals ({pendingUsers.length})</span>
              </button>
            </>
          )}
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

            {/* System Notifications Alert Queue (Admin Only) */}
            {currentUser.role === 'admin' && notifications.filter(n => !n.read).length > 0 && (
              <div className="portal-card" style={{ border: '1px solid rgba(210,125,45,0.4)', background: 'linear-gradient(135deg, rgba(210,125,45,0.08) 0%, rgba(26,62,38,0.15) 100%)', marginBottom: '25px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Sparkles size={18} style={{ color: 'var(--accent-gold)' }} />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    System Alerts & Tasks ({notifications.filter(n => !n.read).length} Unread)
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {notifications.filter(n => !n.read).map(notif => (
                    <div key={notif.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '10px 14px', borderRadius: '6px', gap: '15px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: '1.4' }}>
                        {notif.message}
                        <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block', marginTop: '2px' }}>
                          {new Date(notif.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                        {notif.message.includes('customization') || notif.message.includes('added') ? (
                          <button
                            onClick={() => {
                              handleReadNotification(notif.id);
                              // Auto select the added country in admin country list
                              const match = notif.message.match(/'([^']+)'/);
                              if (match && match[1]) {
                                const cName = match[1];
                                const foundCountry = (countriesData || []).find(c => c.name.toLowerCase() === cName.toLowerCase());
                                if (foundCountry) setSelectedAdminCountryId(foundCountry.id);
                              }
                              setActivePortalTab('countries');
                            }}
                            className="portal-btn-save"
                            style={{ padding: '6px 12px', fontSize: '0.72rem', width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Globe size={12} />
                            <span>Customize Page</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleReadNotification(notif.id);
                              setActivePortalTab('approvals');
                            }}
                            className="portal-btn-save"
                            style={{ padding: '6px 12px', fontSize: '0.72rem', width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <CheckCircle size={12} />
                            <span>Manage Approvals</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleReadNotification(notif.id)}
                          style={{
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'none',
                            color: '#94A3B8',
                            borderRadius: '4px',
                            padding: '4px 10px',
                            fontSize: '0.72rem',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                          onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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

        {/* 2. TAB: CUSTOMIZE PLOT DETAILS (SPLIT SCREEN VIEW) */}
        {(activePortalTab === 'listings' || activePortalTab === 'addplot') && (
          <div>
            <div className="portal-section-header">
              <div>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Customization Desk</p>
                <h1 className="portal-section-title">
                  {activePortalTab === 'listings' ? 'Modify Existing Specifications' : 'Publish New Land Listing'}
                </h1>
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
                        required
                      >
                        <option value="">-- Select Target Country --</option>
                        {ALL_AFRICAN_COUNTRIES.map(cName => (
                          <option key={cName} value={cName}>
                            {cName}
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

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" disabled={customizerMode === 'edit' && filteredPlotsList.length === 0} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: 'auto' }} className="portal-btn-save">
                        <Save size={16} />
                        <span>{customizerMode === 'edit' ? 'Save Listing Changes' : 'Create Listing'}</span>
                      </button>

                      {customizerMode === 'edit' && filteredPlotsList.length > 0 && (
                        <button
                          type="button"
                          onClick={handleDeletePlotClick}
                          style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#EF4444',
                            borderRadius: '4px',
                            padding: '8px 16px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                        >
                          Delete Listing
                        </button>
                      )}
                    </div>

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

        {/* 4. TAB: ADMIN COUNTRY PAGE CUSTOMIZATION MANAGER */}
        {activePortalTab === 'countries' && currentUser.role === 'admin' && (
          <div>
            <div className="portal-section-header">
              <div>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>System Management</p>
                <h1 className="portal-section-title">Manage & Customize Country Pages</h1>
              </div>
            </div>

            <div className="portal-card" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }}>
              
              {/* Left Column: Select Country */}
              <div style={{ borderRight: '1px solid rgba(255,255,255,0.08)', paddingRight: '20px' }}>
                <label className="portal-input-label">Select Country to Customize</label>
                <select
                  value={selectedAdminCountryId}
                  onChange={(e) => setSelectedAdminCountryId(e.target.value)}
                  className="portal-select"
                  style={{ width: '100%', marginBottom: '20px' }}
                >
                  {(Array.isArray(countriesData) ? countriesData : []).map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>

                <div style={{ backgroundColor: 'rgba(210,125,45,0.06)', border: '1px solid rgba(210,125,45,0.15)', borderRadius: '6px', padding: '15px' }}>
                  <p style={{ fontSize: '0.75rem', color: '#CBD5E1', lineHeight: 1.4, margin: 0 }}>
                    <strong>Admin Note:</strong> Changing this info updates what is written on the top public explore page and the drone video tour. Landowners cannot edit these fields.
                  </p>
                </div>

                <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '20px 0' }} />

                <form onSubmit={handleCreateCountry} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                    Add New Country Page
                  </h4>
                  
                  <div>
                    <label className="portal-input-label" style={{ fontSize: '0.7rem' }}>Country Name</label>
                    <input
                      type="text"
                      value={newCountryName}
                      onChange={(e) => setNewCountryName(e.target.value)}
                      placeholder="e.g. Uganda"
                      className="portal-input"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      required
                    />
                  </div>

                  <div>
                    <label className="portal-input-label" style={{ fontSize: '0.7rem' }}>Flag Emoji (Optional)</label>
                    <input
                      type="text"
                      value={newCountryFlag}
                      onChange={(e) => setNewCountryFlag(e.target.value)}
                      placeholder="e.g. 🇺🇬"
                      className="portal-input"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="portal-btn-save hover-lift"
                    style={{ fontSize: '0.75rem', padding: '8px 12px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <PlusCircle size={12} />
                    <span>Create Country</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Specifications Form */}
              <form onSubmit={handleSaveCountrySpecs} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.6fr', gap: '20px' }}>
                  <div>
                    <label className="portal-input-label">Motto / Tagline</label>
                    <input
                      type="text"
                      value={adminCountryForm.motto}
                      onChange={(e) => setAdminCountryForm({ ...adminCountryForm, motto: e.target.value })}
                      required
                      placeholder="e.g. The Cradle of Humanity & Innovation"
                      className="portal-input"
                    />
                  </div>

                  <div>
                    <label className="portal-input-label">Accent Theme Color</label>
                    <input
                      type="text"
                      value={adminCountryForm.accent}
                      onChange={(e) => setAdminCountryForm({ ...adminCountryForm, accent: e.target.value })}
                      required
                      placeholder="e.g. #D27D2D or #1A3E26"
                      className="portal-input"
                    />
                  </div>

                  <div>
                    <label className="portal-input-label">Flag Emoji</label>
                    <input
                      type="text"
                      value={adminCountryForm.flag}
                      onChange={(e) => setAdminCountryForm({ ...adminCountryForm, flag: e.target.value })}
                      required
                      placeholder="e.g. 🇰🇪"
                      className="portal-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="portal-input-label">Public Overview Description</label>
                  <textarea
                    value={adminCountryForm.desc}
                    onChange={(e) => setAdminCountryForm({ ...adminCountryForm, desc: e.target.value })}
                    required
                    rows={4}
                    placeholder="Enter country overview copy here..."
                    className="portal-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                  <div>
                    <label className="portal-input-label">Drone Tour Video URL (Direct Video Source Link)</label>
                    <input
                      type="url"
                      value={adminCountryForm.videoUrl}
                      onChange={(e) => setAdminCountryForm({ ...adminCountryForm, videoUrl: e.target.value })}
                      required
                      placeholder="e.g. https://www.w3schools.com/html/mov_bbb.mp4"
                      className="portal-input"
                    />
                  </div>

                  <div>
                    <label className="portal-input-label">Highlights (Comma-Separated)</label>
                    <input
                      type="text"
                      value={adminCountryForm.highlights}
                      onChange={(e) => setAdminCountryForm({ ...adminCountryForm, highlights: e.target.value })}
                      required
                      placeholder="Highlight A, Highlight B, Highlight C"
                      className="portal-input"
                    />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', borderBottom: '1px solid rgba(210,125,45,0.15)', paddingBottom: '6px', margin: '15px 0 5px 0', fontWeight: 600 }}>Culture & Topography Guidelines</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label className="portal-input-label">Why Live Here</label>
                    <textarea
                      value={adminCountryForm.whyLive}
                      onChange={(e) => setAdminCountryForm({ ...adminCountryForm, whyLive: e.target.value })}
                      required
                      rows={3}
                      className="portal-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div>
                    <label className="portal-input-label">Best Architectural Style to Build</label>
                    <textarea
                      value={adminCountryForm.bestBuild}
                      onChange={(e) => setAdminCountryForm({ ...adminCountryForm, bestBuild: e.target.value })}
                      required
                      rows={3}
                      className="portal-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="portal-input-label">Community & Shared Values</label>
                  <textarea
                    value={adminCountryForm.culture}
                    onChange={(e) => setAdminCountryForm({ ...adminCountryForm, culture: e.target.value })}
                    required
                    rows={2}
                    className="portal-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="submit" className="portal-btn-save hover-lift" style={{ width: 'auto', padding: '12px 35px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Save size={16} />
                    <span>Save Country Specifications</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* 5. TAB: ADMIN APPROVALS MANAGER */}
        {activePortalTab === 'approvals' && currentUser.role === 'admin' && (
          <div>
            <div className="portal-section-header">
              <div>
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>System Management</p>
                <h1 className="portal-section-title">Pending Landowner Approvals</h1>
              </div>
            </div>

            <div className="portal-card">
              {pendingUsers.length > 0 ? (
                <div className="portal-table-container">
                  <table className="portal-table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>User Role</th>
                        <th>Account Label / Full Name</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingUsers.map(user => (
                        <tr key={user.username}>
                          <td style={{ fontWeight: 600, color: '#FFFFFF' }}>{user.username}</td>
                          <td>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                              {user.role}
                            </span>
                          </td>
                          <td style={{ color: '#CBD5E1' }}>{user.label || user.username}</td>
                          <td>
                            <span style={{
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              color: '#EF4444',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 600
                            }}>
                              Awaiting Approval
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              onClick={() => handleApproveUser(user.username)}
                              className="portal-btn-save hover-lift"
                              style={{ padding: '6px 14px', fontSize: '0.75rem', width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <CheckCircle size={12} />
                              <span>Approve & Activate</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px', color: '#64748B', fontStyle: 'italic' }}>
                  No landowners are currently awaiting approval. All accounts are active!
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
