import React, { useState, useEffect } from 'react';
import { 
  User, Settings as SettingsIcon, Heart, Building, Bell, MessageSquare, 
  ShieldCheck, MapPin, Phone, Mail, Edit3, Trash2, PlusCircle, ExternalLink, 
  Check, ArrowRight, LogOut, DollarSign, Sparkles, AlertCircle, Home, CheckCircle2,
  Layers, Video, Camera, Play, Image as ImageIcon
} from 'lucide-react';
import { 
  getUser, 
  saveUser, 
  getInterested, 
  removeInterested, 
  getUserListings, 
  deleteUserListing, 
  getNotifications, 
  getMessages,
  ensureThreadForOwner 
} from '../utils/userStorage';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
];

export default function SettingsPage({ 
  currentUser, 
  onUpdateUser, 
  onLogout, 
  onOpenPostApartment, 
  onOpenNotifications,
  onOpenThread,
  onEditListing,
  onNavigateToService,
  onBackToExplore 
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'interested' | 'listings' | 'activity' | 'security'
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || 'Jonathan K.',
    email: currentUser?.email || 'jonathan.k@umoja.com',
    phone: currentUser?.phone || '+234 812 345 6789',
    location: currentUser?.location || 'Lekki Phase 1, Lagos',
    role: currentUser?.role || 'Verified Investor & Landlord',
    currency: currentUser?.currency || 'NGN',
    bio: currentUser?.bio || 'Private real estate investor looking for prime dry land and residential developments.',
    avatar: currentUser?.avatar || AVATAR_PRESETS[0]
  });

  const [interestedItems, setInterestedItems] = useState(getInterested());
  const [userListings, setUserListings] = useState(getUserListings());
  const [notifications, setNotifications] = useState(getNotifications());
  const [messages, setMessages] = useState(getMessages());
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Sync state when storage changes
  useEffect(() => {
    setInterestedItems(getInterested());
    setUserListings(getUserListings());
  }, []);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      ...profileForm
    };
    saveUser(updated);
    if (onUpdateUser) onUpdateUser(updated);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleChatWithOwner = (item) => {
    const threadId = ensureThreadForOwner({
      ownerName: item.ownerName,
      ownerAvatar: item.ownerAvatar,
      ownerRole: item.ownerRole,
      ownerThreadId: item.ownerThreadId
    }, item.title);
    if (onOpenThread) {
      onOpenThread(threadId);
    } else if (onOpenNotifications) {
      onOpenNotifications('messages');
    }
  };

  const handleRemoveInterested = (id, e) => {
    e.stopPropagation();
    const updated = removeInterested(id);
    setInterestedItems(updated);
  };

  const handleDeleteListing = (id) => {
    if (window.confirm("Are you sure you want to remove this apartment listing?")) {
      const updated = deleteUserListing(id);
      setUserListings(updated);
    }
  };

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const unreadMsgs = messages.reduce((acc, m) => acc + (m.unreadCount || 0), 0);

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 75px)',
      backgroundColor: '#FAF9F6',
      paddingBottom: '80px'
    }}>
      
      {/* ══════════════════════════════════════════════════════════════════════
          HERO PROFILE & ACCOUNT BANNER
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#1A3E26',
        color: '#FFFFFF',
        padding: '48px 6% 40px',
        position: 'relative',
        borderBottom: '1px solid rgba(210, 125, 45, 0.3)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          {/* User Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={profileForm.avatar} 
                alt={profileForm.name}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--accent-gold)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'var(--accent-gold)',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #1A3E26'
              }}>
                <ShieldCheck size={14} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h1 style={{
                  margin: 0,
                  fontSize: '1.75rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700
                }}>
                  {profileForm.name}
                </h1>
                <span style={{
                  fontSize: '0.66rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  backgroundColor: 'rgba(210, 125, 45, 0.22)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}>
                  Verified User
                </span>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Mail size={14} style={{ color: 'var(--accent-gold)' }} />
                  {profileForm.email}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={14} style={{ color: 'var(--accent-gold)' }} />
                  {profileForm.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Phone size={14} style={{ color: 'var(--accent-gold)' }} />
                  {profileForm.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions Header Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onOpenPostApartment}
              style={{
                backgroundColor: 'var(--accent-gold)',
                color: '#FFFFFF',
                border: 'none',
                padding: '11px 20px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <PlusCircle size={16} />
              <span>Post Your Apartment</span>
            </button>

            <button
              onClick={onLogout}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '11px 16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Sign Out"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* 4 Stat KPI Metric Chips */}
        <div style={{
          maxWidth: '1200px',
          margin: '28px auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px'
        }}>
          {[
            { 
              label: 'Things You Were Interested In', 
              count: interestedItems.length, 
              icon: <Heart size={18} style={{ color: 'var(--accent-gold)' }} />,
              tab: 'interested'
            },
            { 
              label: 'My Posted Apartments', 
              count: userListings.length, 
              icon: <Building size={18} style={{ color: '#10B981' }} />,
              tab: 'listings'
            },
            { 
              label: 'Direct Messages', 
              count: `${unreadMsgs} unread`, 
              icon: <MessageSquare size={18} style={{ color: '#60A5FA' }} />,
              onClick: () => onOpenNotifications('messages')
            },
            { 
              label: 'Activity Notifications', 
              count: `${unreadNotifs} active`, 
              icon: <Bell size={18} style={{ color: '#F59E0B' }} />,
              onClick: () => onOpenNotifications('notifications')
            }
          ].map((stat, i) => (
            <div
              key={i}
              onClick={() => {
                if (stat.onClick) stat.onClick();
                else if (stat.tab) setActiveTab(stat.tab);
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
            >
              <div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                  {stat.count}
                </div>
              </div>
              {stat.icon}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PAGE CONTENT & TABS
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1200px', margin: '32px auto 0', padding: '0 6%' }}>
        
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          marginBottom: '28px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'profile', label: 'Profile Management', icon: <User size={16} /> },
            { id: 'interested', label: `Things You Were Interested In (${interestedItems.length})`, icon: <Heart size={16} /> },
            { id: 'listings', label: `My Posted Apartments (${userListings.length})`, icon: <Building size={16} /> },
            { id: 'activity', label: 'Activity & Messages', icon: <Bell size={16} /> }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#FFFFFF' : 'var(--text-title)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 1: PROFILE MANAGEMENT
            ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'profile' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            maxWidth: '820px'
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)' }}>
                Manage Your Profile
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-body)' }}>
                Keep your investor and landlord information updated for official property escrows and site inspections.
              </p>
            </div>

            {saveSuccessMsg && (
              <div style={{
                backgroundColor: 'rgba(26, 62, 38, 0.08)',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <CheckCircle2 size={18} />
                <span>Profile details saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Avatar Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '8px' }}>
                  Choose Your Profile Avatar
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                  {AVATAR_PRESETS.map((av, idx) => {
                    const isSelected = profileForm.avatar === av;
                    return (
                      <img 
                        key={idx}
                        src={av}
                        alt="Avatar choice"
                        onClick={() => setProfileForm({ ...profileForm, avatar: av })}
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          cursor: 'pointer',
                          border: isSelected ? '3px solid var(--accent)' : '2px solid transparent',
                          transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                          transition: 'all 0.15s ease'
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Phone & Location Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                    Phone Number (WhatsApp Ready)
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                    Primary Location / Base City
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Role & Currency */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                    Platform Role / Identity
                  </label>
                  <select
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Verified Investor & Landlord">Verified Investor & Landlord</option>
                    <option value="Property Investor & Buyer">Property Investor & Buyer</option>
                    <option value="Landlord / Apartment Owner">Landlord / Apartment Owner</option>
                    <option value="Diaspora Client">Diaspora Client</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                    Preferred Display Currency
                  </label>
                  <select
                    value={profileForm.currency}
                    onChange={(e) => setProfileForm({ ...profileForm, currency: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="NGN">Nigerian Naira (₦ NGN)</option>
                    <option value="USD">United States Dollar ($ USD)</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                  Investor & Landlord Bio / Notes
                </label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.86rem',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(26,62,38,0.2)'
                  }}
                >
                  Save Profile Changes
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 2: THINGS YOU WERE INTERESTED IN
            ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'interested' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)' }}>
                  Things You Were Interested In
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-body)' }}>
                  All properties and plots you have bookmarked, inquired about, or marked as interested.
                </p>
              </div>

              <button
                onClick={onBackToExplore}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent)',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Find More Properties</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {interestedItems.length === 0 ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                padding: '50px 20px',
                textAlign: 'center'
              }}>
                <Heart size={44} style={{ color: '#D1D5DB', margin: '0 auto 14px', strokeWidth: 1.5 }} />
                <h3 style={{ margin: '0 0 6px', color: 'var(--text-title)', fontSize: '1.1rem' }}>No interested properties yet</h3>
                <p style={{ margin: '0 0 20px', color: 'var(--text-body)', fontSize: '0.84rem' }}>
                  Browse our verified houses, land plots, or apartments and click "Interested" or the Bookmark icon to save them here.
                </p>
                <button
                  onClick={onBackToExplore}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '11px 22px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer'
                  }}
                >
                  Explore Verified Directory
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '22px'
              }}>
                {interestedItems.map(item => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '14px',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                      boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 18px rgba(0,0,0,0.04)';
                    }}
                  >
                    {/* Image Cover */}
                    <div style={{ position: 'relative', height: '200px', backgroundColor: '#1A3E26' }}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(26, 62, 38, 0.85)',
                        backdropFilter: 'blur(4px)',
                        color: 'var(--accent-gold)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {item.type}
                      </div>

                      <button
                        onClick={(e) => handleRemoveInterested(item.id, e)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          backdropFilter: 'blur(4px)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        title="Remove from interested"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h4 style={{
                        margin: '0 0 6px',
                        fontSize: '1rem',
                        color: 'var(--text-title)',
                        fontWeight: 700,
                        lineHeight: 1.35
                      }}>
                        {item.title}
                      </h4>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-body)', fontSize: '0.78rem', marginBottom: '12px' }}>
                        <MapPin size={13} style={{ color: 'var(--accent)' }} />
                        <span>{item.location}</span>
                      </div>

                      <div style={{
                        padding: '10px 12px',
                        backgroundColor: '#FAF9F6',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        marginBottom: '16px'
                      }}>
                        <div style={{ fontSize: '0.68rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Verified Valuation
                        </div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent)', marginTop: '2px' }}>
                          ₦{(item.priceNgn || 0).toLocaleString()}
                          <span style={{ fontSize: '0.76rem', color: '#6B7280', fontWeight: 400, marginLeft: '6px' }}>
                            (${ (item.priceUsd || Math.round((item.priceNgn || 0) / 1600)).toLocaleString() })
                          </span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', marginTop: '4px', fontWeight: 600 }}>
                          Title: {item.titleType}
                        </div>
                      </div>

                      {/* Owner Details Pill */}
                      {item.ownerName && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 10px',
                          backgroundColor: '#FAF9F6',
                          borderRadius: '6px',
                          marginBottom: '14px',
                          border: '1px solid var(--border)'
                        }}>
                          <img 
                            src={item.ownerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'} 
                            alt={item.ownerName}
                            style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-title)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.ownerName}
                            </div>
                            <div style={{ fontSize: '0.64rem', color: 'var(--accent-gold)' }}>
                              {item.ownerRole || 'Verified Property Owner'}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Card Actions */}
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => onNavigateToService(item.serviceId || 'explore')}
                          style={{
                            flex: 1,
                            backgroundColor: 'var(--accent)',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '9px 12px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>View Details</span>
                          <ExternalLink size={13} />
                        </button>

                        <button
                          onClick={() => handleChatWithOwner(item)}
                          style={{
                            backgroundColor: 'rgba(210, 125, 45, 0.12)',
                            color: 'var(--accent-gold)',
                            border: '1px solid rgba(210, 125, 45, 0.4)',
                            padding: '9px 14px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            whiteSpace: 'nowrap'
                          }}
                          title="Chat directly with the property owner"
                        >
                          <MessageSquare size={14} style={{ color: 'var(--accent-gold)' }} />
                          <span>Chat with Owner</span>
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 3: MY POSTED APARTMENTS & PLOTS
            ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'listings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)' }}>
                  My Posted Apartments & Land Plots
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-body)' }}>
                  Manage your listings, edit specifications, upload slideshow photos or video tours, and chat with interested buyers/tenants.
                </p>
              </div>

              <button
                onClick={onOpenPostApartment}
                style={{
                  backgroundColor: 'var(--accent-gold)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(210, 125, 45, 0.3)'
                }}
              >
                <PlusCircle size={16} />
                <span>Post Plot or Apartment</span>
              </button>
            </div>

            {userListings.length === 0 ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                padding: '50px 20px',
                textAlign: 'center'
              }}>
                <Building size={44} style={{ color: '#D1D5DB', margin: '0 auto 14px', strokeWidth: 1.5 }} />
                <h3 style={{ margin: '0 0 6px', color: 'var(--text-title)', fontSize: '1.1rem' }}>No listings posted yet</h3>
                <p style={{ margin: '0 0 20px', color: 'var(--text-body)', fontSize: '0.84rem' }}>
                  Have an apartment, house, or land plot? List it directly to reach thousands of verified tenants and buyers.
                </p>
                <button
                  onClick={onOpenPostApartment}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '11px 22px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer'
                  }}
                >
                  Post Your First Listing
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {userListings.map(listing => {
                  const isPlot = listing.categoryType === 'plot' || listing.type === 'Land Plot';
                  const photosCount = (listing.images && listing.images.length) || (listing.image ? 1 : 0);
                  const hasVideo = Boolean(listing.videoUrl);

                  return (
                    <div
                      key={listing.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        padding: '18px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', minWidth: '320px', flex: '1 1 340px' }}>
                        <div style={{ position: 'relative', width: '110px', height: '85px', flexShrink: 0 }}>
                          <img 
                            src={listing.image || (listing.images && listing.images[0])} 
                            alt={listing.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '8px',
                              objectFit: 'cover'
                            }}
                          />
                          {photosCount > 1 && (
                            <span style={{
                              position: 'absolute',
                              bottom: '4px',
                              right: '4px',
                              backgroundColor: 'rgba(0,0,0,0.7)',
                              color: '#FFFFFF',
                              fontSize: '0.62rem',
                              fontWeight: 700,
                              padding: '2px 5px',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '3px'
                            }}>
                              <Camera size={10} />
                              {photosCount}
                            </span>
                          )}
                          {hasVideo && (
                            <span style={{
                              position: 'absolute',
                              top: '4px',
                              left: '4px',
                              backgroundColor: 'var(--accent-gold)',
                              color: '#FFFFFF',
                              fontSize: '0.58rem',
                              fontWeight: 800,
                              padding: '1px 5px',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '2px'
                            }}>
                              <Play size={8} fill="#FFFFFF" />
                              VIDEO
                            </span>
                          )}
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{
                              backgroundColor: isPlot ? 'var(--accent)' : '#10B981',
                              color: '#FFFFFF',
                              fontSize: '0.66rem',
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}>
                              {isPlot ? 'Land Plot' : 'Apartment'}
                            </span>
                            <span style={{
                              backgroundColor: listing.status === 'Pending' ? 'rgba(245, 158, 11, 0.15)' : (listing.status === 'Suspended' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(26, 62, 38, 0.1)'),
                              color: listing.status === 'Pending' ? '#D97706' : (listing.status === 'Suspended' ? '#DC2626' : 'var(--accent)'),
                              fontSize: '0.66rem',
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: '4px',
                              border: `1px solid ${listing.status === 'Pending' ? '#F59E0B' : (listing.status === 'Suspended' ? '#EF4444' : 'var(--accent)')}`
                            }}>
                              {listing.status === 'Pending' ? 'Pending Admin Approval' : (listing.status === 'Suspended' ? 'Suspended' : 'Live')}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>
                              {listing.listingType} • {isPlot ? (listing.plotSize || 'Full Plot') : `${listing.bedrooms || 1} Beds`}
                            </span>
                          </div>

                          <h4 style={{ margin: '0 0 4px', fontSize: '0.98rem', color: 'var(--text-title)', fontWeight: 700, lineHeight: '1.3' }}>
                            {listing.title}
                          </h4>

                          <div style={{ fontSize: '0.78rem', color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={13} style={{ color: 'var(--accent)' }} />
                            <span>{listing.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price, Inquiries & Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ fontSize: '0.68rem', color: '#6B7280', textTransform: 'uppercase' }}>
                            Listed Price
                          </div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)' }}>
                            ₦{(Number(listing.price) || 0).toLocaleString()}
                            {listing.pricePeriod && listing.pricePeriod !== 'total' && (
                              <span style={{ fontSize: '0.72rem', fontWeight: 400, color: '#6B7280' }}>
                                /{listing.pricePeriod}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Inquiries Button */}
                        {listing.inquiriesCount > 0 ? (
                          <button
                            onClick={() => {
                              const threadId = (listing.inquiryThreadIds && listing.inquiryThreadIds[0]) || (isPlot ? 'thread-plot-inquiry' : 'thread-2');
                              if (onOpenThread) onOpenThread(threadId);
                              else if (onOpenNotifications) onOpenNotifications('messages');
                            }}
                            style={{
                              backgroundColor: 'rgba(210, 125, 45, 0.1)',
                              color: 'var(--accent-gold)',
                              border: '1px solid rgba(210, 125, 45, 0.35)',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                            title="View messages from interested buyers/tenants"
                          >
                            <MessageSquare size={14} />
                            <span>{listing.inquiriesCount} Inquir{listing.inquiriesCount !== 1 ? 'ies' : 'y'} • View Chat</span>
                          </button>
                        ) : (
                          <div style={{ fontSize: '0.76rem', color: '#9CA3AF' }}>
                            0 inquiries yet
                          </div>
                        )}

                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            if (onEditListing) onEditListing(listing);
                          }}
                          style={{
                            backgroundColor: '#FAF9F6',
                            color: 'var(--accent)',
                            border: '1px solid var(--accent)',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Edit Information, Photos or Video"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteListing(listing.id)}
                          style={{
                            backgroundColor: '#FEE2E2',
                            color: '#DC2626',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Delete listing"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 4: ACTIVITY & MESSAGES
            ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'activity' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            
            {/* Notifications Box */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={18} style={{ color: 'var(--accent)' }} />
                  <span>Recent Notifications</span>
                </h3>
                <button
                  onClick={() => onOpenNotifications('notifications')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  View All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {notifications.slice(0, 4).map(item => (
                  <div 
                    key={item.id}
                    onClick={() => onOpenNotifications('notifications')}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: item.read ? '#FAF9F6' : 'rgba(26,62,38,0.04)',
                      border: '1px solid var(--border)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)', marginBottom: '2px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-body)', lineHeight: '1.4' }}>
                      {item.message}
                    </div>
                    <div style={{ fontSize: '0.66rem', color: '#9CA3AF', marginTop: '4px' }}>
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages Box */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} style={{ color: 'var(--accent-gold)' }} />
                  <span>Direct Messages</span>
                </h3>
                <button
                  onClick={() => onOpenNotifications('messages')}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Open Inbox
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map(thread => {
                  const lastMsg = thread.messages[thread.messages.length - 1];
                  return (
                    <div 
                      key={thread.id}
                      onClick={() => onOpenNotifications('messages')}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        backgroundColor: '#FAF9F6',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <img 
                        src={thread.contactAvatar} 
                        alt={thread.contactName}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)' }}>
                            {thread.contactName}
                          </span>
                          <span style={{ fontSize: '0.66rem', color: '#9CA3AF' }}>{thread.time}</span>
                        </div>
                        <p style={{
                          margin: '2px 0 0',
                          fontSize: '0.74rem',
                          color: 'var(--text-body)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {lastMsg ? lastMsg.text : 'Start conversation...'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
