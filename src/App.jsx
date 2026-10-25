import React, { useState, useEffect } from 'react';
import { Compass, Phone, Mail, MapPin, Menu, X, ShieldCheck, Sparkles, Bell, Settings, PlusCircle, LogIn, User as UserIcon, LogOut, Shield, Edit3, Eye } from 'lucide-react';

// Import our core components
import Home from './components/Home';
import ExploreHub from './components/ExploreHub';
import HouseFeaturesConfigurator from './components/HouseFeaturesConfigurator';
import ServiceShowcasePage from './components/ServiceShowcasePage';
import ServiceBookingPage from './components/ServiceBookingPage';
import SellerPortalPage from './components/SellerPortalPage';
import BuildingMaterialMarketplace from './components/BuildingMaterialMarketplace';
import PropertyEstateManagement from './components/PropertyEstateManagement';
import HomeServicesMarketplace from './components/HomeServicesMarketplace';
import SmartHomeIntegration from './components/SmartHomeIntegration';
import RealEstateFinancing from './components/RealEstateFinancing';
import LegalDocumentationHub from './components/LegalDocumentationHub';
import LandVerificationHub from './components/LandVerificationHub';
import InteriorDesignHub from './components/InteriorDesignHub';
import MovingRelocationHub from './components/MovingRelocationHub';
import AuthModal from './components/AuthModal';
import NotificationModal from './components/NotificationModal';
import PostApartmentModal from './components/PostApartmentModal';
import SettingsPage from './components/SettingsPage';
import AdminPortalPage from './components/AdminPortalPage';
import LoginPage from './components/LoginPage';
import { SERVICES } from './data/servicesData';
import { getUser, saveUser, getNotifications, getMessages, getUserListings, getStoredServices, DEMO_USER, DEMO_ADMIN } from './utils/userStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [adminEditingServiceId, setAdminEditingServiceId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // User Authentication & Session State - Login page comes first if not logged in
  const [user, setUser] = useState(() => getUser() || null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationModalTab, setNotificationModalTab] = useState('notifications');
  const [isPostApartmentOpen, setIsPostApartmentOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [activeThreadIdForModal, setActiveThreadIdForModal] = useState(null);

  // Dynamic services catalog
  const [storedServices, setStoredServices] = useState(getStoredServices);

  // Pending listings count for admin notification badge
  const calculatePendingCount = () => {
    try {
      const list = getUserListings();
      return list.filter(l => (l.status || '').toLowerCase() === 'pending').length;
    } catch (e) {
      return 0;
    }
  };
  const [pendingListingsCount, setPendingListingsCount] = useState(calculatePendingCount);

  // Login success handler: routes directly to Admin Portal for admin, or Home for user
  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser);
    refreshBadgeCount();
    if (loggedUser?.role === 'admin') {
      handleNavigate('admin');
    } else {
      handleNavigate('home');
    }
  };

  // Logout handler: resets user and brings them straight to the Login page
  const handleLogout = () => {
    saveUser(null);
    setUser(null);
    setActiveTab('login');
    setSelectedServiceId(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Modal navigation handlers
  const handleOpenThread = (threadId) => {
    setActiveThreadIdForModal(threadId);
    setNotificationModalTab('messages');
    setIsNotificationModalOpen(true);
  };

  const handleEditListing = (listing) => {
    setEditingListing(listing);
    setIsPostApartmentOpen(true);
  };

  const handleOpenPostApartment = () => {
    setEditingListing(null);
    setIsPostApartmentOpen(true);
  };

  // Calculate unread badge count from notifications and messages
  const calculateUnreadCount = () => {
    try {
      const notifs = getNotifications();
      const msgs = getMessages();
      const unreadNotifs = notifs.filter(n => !n.read).length;
      const unreadMsgs = msgs.reduce((acc, m) => acc + (m.unreadCount || 0), 0);
      return unreadNotifs + unreadMsgs;
    } catch (e) {
      return 0;
    }
  };

  const [badgeCount, setBadgeCount] = useState(calculateUnreadCount);

  const refreshBadgeCount = () => {
    setBadgeCount(calculateUnreadCount());
    setPendingListingsCount(calculatePendingCount());
    setStoredServices(getStoredServices());
  };

  // Disable automatic scroll restoration so page transitions always start at the top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Auto-scroll to top whenever page route or selected service changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    return () => cancelAnimationFrame(rafId);
  }, [activeTab, selectedServiceId]);

  // Navigation helper
  const handleNavigate = (tabId, serviceId = null) => {
    setActiveTab(tabId);
    setSelectedServiceId(serviceId);
    setMenuOpen(false);
    refreshBadgeCount();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const activeService = storedServices.find(s => s.id === selectedServiceId);

  // When no user is authenticated or activeTab is explicitly 'login', display the Login Gateway first!
  if (!user || activeTab === 'login') {
    return (
      <LoginPage
        currentUser={user}
        onLoginSuccess={handleLoginSuccess}
        onBackToPlatform={user ? () => handleNavigate(user.role === 'admin' ? 'admin' : 'home') : null}
      />
    );
  }

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#FFFFFF'
    }}>
      
      {/* ══════════════════════════════════════════════════════════════════════
          TOP FIXED HEADER (Home & Explore Only)
          ══════════════════════════════════════════════════════════════════════ */}
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
        boxShadow: '0 2px 10px rgba(26,62,38,0.03)'
      }}>
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '1.35rem',
            color: 'var(--text-title)',
            letterSpacing: '0.02em',
            fontWeight: 700
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '6px',
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)'
          }}>
            <Compass size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span></span>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700, marginTop: '-3px' }}>
              Infrastructure Platform
            </span>
          </div>
        </div>

        {/* Navigation Tabs (Home and Explore Centered) */}
        <nav style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '36px',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 600,
          height: '100%',
          alignItems: 'center'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'explore', label: 'Explore' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleNavigate(tab.id, null)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '10px 0',
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  transition: 'var(--transition-fast)'
                }}
                className={`nav-link-tab ${isActive ? 'active' : ''}`}
              >
                {tab.label}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-22px',
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

        {/* User Account & Actions Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10
        }} className="header-user-actions">
          
          {user ? (
            <>
              {/* Admin Console Shortcut (Only visible when logged in as Admin) */}
              {user.role === 'admin' && (
                <button
                  onClick={() => handleNavigate('admin')}
                  style={{
                    backgroundColor: activeTab === 'admin' ? 'var(--accent-gold)' : '#0A150E',
                    color: activeTab === 'admin' ? '#0A150E' : 'var(--accent-gold)',
                    border: '1.5px solid var(--accent-gold)',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                    transition: 'all 0.2s ease'
                  }}
                  title="Open Admin Operations Console"
                >
                  <Shield size={15} />
                  <span>Admin Portal</span>
                  {pendingListingsCount > 0 && (
                    <span style={{
                      backgroundColor: '#EF4444',
                      color: '#FFFFFF',
                      borderRadius: '10px',
                      padding: '1px 6px',
                      fontSize: '0.64rem',
                      fontWeight: 800
                    }}>
                      {pendingListingsCount}
                    </span>
                  )}
                </button>
              )}

              {/* 1. Post Apartment Button */}
              <button
                onClick={handleOpenPostApartment}
                style={{
                  backgroundColor: 'rgba(210, 125, 45, 0.12)',
                  color: 'var(--accent-gold)',
                  border: '1px solid rgba(210, 125, 45, 0.4)',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.02em'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(210, 125, 45, 0.12)';
                  e.currentTarget.style.color = 'var(--accent-gold)';
                }}
                title="Post your apartment or plot"
              >
                <PlusCircle size={15} />
                <span className="post-apt-text">Post Plot / Apt</span>
              </button>

              {/* 2. Notification Icon (Handles Notifications & Messages) */}
              <button
                onClick={() => {
                  setNotificationModalTab('notifications');
                  setActiveThreadIdForModal(null);
                  setIsNotificationModalOpen(true);
                }}
                style={{
                  position: 'relative',
                  backgroundColor: isNotificationModalOpen ? 'rgba(26, 62, 38, 0.1)' : '#FAF9F6',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-title)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(26, 62, 38, 0.08)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = isNotificationModalOpen ? 'rgba(26, 62, 38, 0.1)' : '#FAF9F6';
                  e.currentTarget.style.color = 'var(--text-title)';
                }}
                title="Notifications & Messages"
                aria-label="Notifications and messages"
              >
                <Bell size={18} />
                {badgeCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    backgroundColor: 'var(--accent-gold)',
                    color: '#FFFFFF',
                    borderRadius: '10px',
                    minWidth: '17px',
                    height: '17px',
                    padding: '0 4px',
                    fontSize: '0.64rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}>
                    {badgeCount}
                  </span>
                )}
              </button>

              {/* 3. Settings Icon & Profile */}
              <button
                onClick={() => handleNavigate('settings')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: activeTab === 'settings' ? 'rgba(26, 62, 38, 0.12)' : 'transparent',
                  border: activeTab === 'settings' ? '1px solid var(--accent)' : '1px solid transparent',
                  padding: '4px 10px 4px 5px',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(26, 62, 38, 0.06)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = activeTab === 'settings' ? 'rgba(26, 62, 38, 0.12)' : 'transparent'}
                title="Settings & Profile"
                aria-label="Settings and profile"
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} 
                    alt={user.name}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: user.role === 'admin' ? '2px solid var(--accent-gold)' : '1.5px solid var(--accent)'
                    }}
                  />
                  {user.role === 'admin' && (
                    <div style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      backgroundColor: 'var(--accent-gold)',
                      borderRadius: '50%',
                      width: '12px',
                      height: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000'
                    }}>
                      <Shield size={8} />
                    </div>
                  )}
                </div>
                <Settings size={17} style={{ color: activeTab === 'settings' ? 'var(--accent)' : 'var(--text-body)' }} />
              </button>

              {/* 4. Direct Sign Out Button */}
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  color: '#DC2626',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#DC2626';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)';
                  e.currentTarget.style.color = '#DC2626';
                }}
                title="Sign Out to Login Page"
              >
                <LogOut size={13} />
                <span className="signout-text">Sign Out</span>
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handleNavigate('login')}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--accent)',
                  border: '1px solid var(--border)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Switch Account
              </button>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(26,62,38,0.2)'
                }}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
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
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN CONTENT VIEW AREA
          ══════════════════════════════════════════════════════════════════════ */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '75px' }}>
        
        {/* Page: Admin Operations & Moderation Console */}
        {activeTab === 'admin' && (
          <AdminPortalPage
            currentAdmin={user}
            onLogout={handleLogout}
            onNavigateToPublic={(tab) => handleNavigate(tab, null)}
            onSelectService={(serviceId) => handleNavigate('explore', serviceId)}
            initialEditingServiceId={adminEditingServiceId}
          />
        )}

        {/* Page: Dual Access Login & Account Switcher Portal */}
        {activeTab === 'login' && (
          <LoginPage
            onLoginSuccess={(loggedUser) => {
              setUser(loggedUser);
              refreshBadgeCount();
              if (loggedUser.role === 'admin') {
                handleNavigate('admin');
              } else {
                handleNavigate('home');
              }
            }}
            onBackToPlatform={() => handleNavigate('home')}
          />
        )}

        {/* Page: Settings & Profile Management */}
        {activeTab === 'settings' && (
          <SettingsPage
            currentUser={user}
            onUpdateUser={(updated) => setUser(updated)}
            onLogout={handleLogout}
            onOpenPostApartment={handleOpenPostApartment}
            onOpenNotifications={(tab) => {
              setNotificationModalTab(tab);
              setActiveThreadIdForModal(null);
              setIsNotificationModalOpen(true);
            }}
            onOpenThread={handleOpenThread}
            onEditListing={handleEditListing}
            onNavigateToService={(serviceId) => handleNavigate('explore', serviceId)}
            onBackToExplore={() => handleNavigate('explore', null)}
          />
        )}

        {/* Page: Seller & Landowner Portal */}
        {(activeTab === 'seller-portal' || selectedServiceId === 'seller-portal') && (
          <SellerPortalPage
            onBack={() => handleNavigate('explore', null)}
            onNavigateToExplore={() => handleNavigate('explore', null)}
          />
        )}

        {/* Page 1: Home Page (Centric on Real Estate & Infrastructure) */}
        {activeTab === 'home' && selectedServiceId !== 'seller-portal' && (
          <Home 
            onNavigate={(dest) => {
              handleNavigate('explore', null);
            }}
            onSelectService={(serviceId) => {
              handleNavigate('explore', serviceId);
            }}
          />
        )}

        {/* Page 2: Explore Hub (Showcasing Products & Services Directory) */}
        {activeTab === 'explore' && !selectedServiceId && activeTab !== 'seller-portal' && (
          <ExploreHub 
            services={storedServices}
            onSelectService={(serviceId) => {
              handleNavigate('explore', serviceId);
            }} 
          />
        )}

        {/* Building Material -> Dedicated Marketplace Page */}
        {activeTab === 'explore' && selectedServiceId === 'building-material' && (
          <BuildingMaterialMarketplace
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Property & Estate Management -> Dedicated Interactive Configurator */}
        {activeTab === 'explore' && (selectedServiceId === 'property-management' || selectedServiceId === 'estate-management') && (
          <PropertyEstateManagement
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Home Services Marketplace -> Dedicated 12-Trades On-Demand Suite */}
        {activeTab === 'explore' && selectedServiceId === 'home-services' && (
          <HomeServicesMarketplace
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Smart Home Integration -> Dedicated Customization & Survey Suite */}
        {activeTab === 'explore' && selectedServiceId === 'smart-home' && (
          <SmartHomeIntegration
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Real Estate Financing -> Payment Plans & Installment Tracking */}
        {activeTab === 'explore' && selectedServiceId === 'financing' && (
          <RealEstateFinancing
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Legal Documentation -> Documents by Purpose, Lawyer Vetting & Due Diligence */}
        {activeTab === 'explore' && selectedServiceId === 'legal-documentation' && (
          <LegalDocumentationHub
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Land Verification -> Survey Plan Upload, Title Verification, Registry Checks, Boundary Mapping & Encroachment Alerts */}
        {activeTab === 'explore' && selectedServiceId === 'land-verification' && (
          <LandVerificationHub
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Interior Design -> Room Visualization, Furniture Shopping, AI Redesign, Designer Booking & Budget Planner */}
        {activeTab === 'explore' && (selectedServiceId === 'interior-finishing' || selectedServiceId === 'interior-design') && (
          <InteriorDesignHub
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Moving & Relocation -> Truck Booking, Packing Services, Storage Units, Relocation Assistance, Move Checklist, Utility Transfer */}
        {activeTab === 'explore' && (selectedServiceId === 'moving-services' || selectedServiceId === 'relocation') && (
          <MovingRelocationHub
            onBackToHub={() => handleNavigate('explore', null)}
          />
        )}

        {/* Products -> Snapping Showcase Deck | Services -> Calendar Reservation Page */}
        {activeTab === 'explore' && selectedServiceId && selectedServiceId !== 'seller-portal' && selectedServiceId !== 'building-material' && selectedServiceId !== 'property-management' && selectedServiceId !== 'estate-management' && selectedServiceId !== 'home-services' && selectedServiceId !== 'smart-home' && selectedServiceId !== 'financing' && selectedServiceId !== 'legal-documentation' && selectedServiceId !== 'land-verification' && selectedServiceId !== 'interior-finishing' && selectedServiceId !== 'interior-design' && selectedServiceId !== 'moving-services' && selectedServiceId !== 'relocation' && (
          activeService?.kind === 'service' ? (
            <ServiceBookingPage
              service={activeService}
              onBackToHub={() => handleNavigate('explore', null)}
            />
          ) : (
            <ServiceShowcasePage
              service={activeService || SERVICES[0]}
              allServices={SERVICES}
              onBackToHub={() => handleNavigate('explore', null)}
              onSelectService={(serviceId) => handleNavigate('explore', serviceId)}
            />
          )
        )}

        {/* Floating Admin Inspection & Quick Edit Bar when viewing services as Admin */}
        {user?.role === 'admin' && activeTab === 'explore' && selectedServiceId && activeService && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '12px',
            boxShadow: '0 10px 35px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            border: '1.5px solid #D4AF37'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.7rem', color: '#D4AF37', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                👑 Administrator View
              </div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#F8FAFC' }}>
                Viewing "{activeService.title}"
              </div>
            </div>

            <button
              onClick={() => {
                setAdminEditingServiceId(selectedServiceId);
                handleNavigate('admin');
              }}
              style={{
                backgroundColor: '#D4AF37',
                color: '#1A3E26',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(212,175,55,0.3)'
              }}
            >
              <Edit3 size={14} />
              ✏️ Edit Writings on this Page
            </button>
          </div>
        )}

      </main>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER (Institutional Alignment)
          ══════════════════════════════════════════════════════════════════════ */}
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
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.45rem', color: 'var(--text-title)', marginBottom: '14px', fontWeight: 700 }}>
              UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span>
            </h4>
            <p style={{ lineHeight: '1.65', marginBottom: '18px', fontWeight: 300 }}>
              Umoja Terra is a digital real estate platform enabling verified land purchases, home construction, factory building materials, and trusted property management.
            </p>
            <span style={{ fontSize: '0.75rem', opacity: 0.65 }}>© 2026 Umoja Terra Ltd. All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Quick Directory</span>
            <span onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>Home</span>
            <span onClick={() => handleNavigate('explore', null)} style={{ cursor: 'pointer', color: 'var(--accent-gold)', fontWeight: 600 }}>Explore Properties &amp; Services</span>
            <span onClick={() => handleNavigate('explore', 'buy-houses')} style={{ cursor: 'pointer' }}>Buy Houses</span>
            <span onClick={() => handleNavigate('explore', 'buy-plots')} style={{ cursor: 'pointer' }}>Buy Land</span>
            <span onClick={() => handleNavigate('explore', 'build-from-scratch')} style={{ cursor: 'pointer', color: 'var(--accent-gold)', fontWeight: 600 }}>Build Your House</span>
            <span onClick={() => handleNavigate('explore', 'land-verification')} style={{ cursor: 'pointer' }}>Verify Land</span>
            <span onClick={() => handleNavigate('explore', 'home-services')} style={{ cursor: 'pointer' }}>Home Services</span>
            <span onClick={() => handleNavigate('explore', 'building-material')} style={{ cursor: 'pointer' }}>Building Materials</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Regional Offices</span>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Phone size={14} style={{ color: 'var(--accent-gold)' }} />
              <strong>+234 (0) 803 000 0000 / +234 1 234 5678</strong>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Mail size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>contact@umojaterra.com</span>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <MapPin size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span>Suite 7, Admiralty Waterfront Towers, Victoria Island.</span>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <MapPin size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span>Plot 402, Constitution Avenue, Central Business District.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════════════════
          AUTHENTICATION, NOTIFICATIONS & POST APARTMENT MODALS
          ══════════════════════════════════════════════════════════════════════ */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          refreshBadgeCount();
          if (loggedUser.role === 'admin') {
            handleNavigate('admin');
          }
        }}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => {
          setIsNotificationModalOpen(false);
          setActiveThreadIdForModal(null);
        }}
        initialTab={notificationModalTab}
        initialThreadId={activeThreadIdForModal}
        onNotificationCountChange={(newCnt) => setBadgeCount(newCnt)}
      />

      <PostApartmentModal
        isOpen={isPostApartmentOpen}
        onClose={() => {
          setIsPostApartmentOpen(false);
          setEditingListing(null);
        }}
        onListingCreated={() => {
          refreshBadgeCount();
          setEditingListing(null);
        }}
        currentUser={user}
        listingToEdit={editingListing}
      />

      {/* Global CSS overrides */}
      <style>{`
        .nav-link-tab:hover {
          color: var(--accent) !important;
        }
        @keyframes fadeInModal {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @media (max-width: 680px) {
          .post-apt-text {
            display: none !important;
          }
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
