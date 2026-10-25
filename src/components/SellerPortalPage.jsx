import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Building, KeyRound, Compass, CheckCircle, ShieldCheck, 
  MapPin, Camera, Video, FileText, Upload, Sparkles, Phone, Mail, 
  User, Check, AlertCircle, Eye, ChevronRight, Layers, Award
} from 'lucide-react';

export default function SellerPortalPage({ onBack, onNavigateToExplore }) {
  const [listingType, setListingType] = useState('plot'); // 'plot' | 'house' | 'rental'
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState(null);
  const [gpsError, setGpsError] = useState(null);

  // Auto-scroll to top when page opens or form submission occurs
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [formSubmitted]);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    title: '',
    location: '',
    state: 'Lagos State',
    sizeOrBeds: '',
    askingPriceNgn: '',
    titleType: "Governor's Consent",
    description: '',
    requestDroneScan: true,
    requestVirtualTour: true,
    inspectionSchedule: 'This Week',
    bankVerificationAllowed: true
  });

  const handleDetectGps = () => {
    setIsDetectingGps(true);
    setGpsError(null);

    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      setIsDetectingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude.toFixed(5),
          lng: position.coords.longitude.toFixed(5),
          accuracy: Math.round(position.coords.accuracy)
        };
        setGpsCoordinates(coords);
        setIsDetectingGps(false);
        if (!formData.location.trim()) {
          setFormData(prev => ({
            ...prev,
            location: "GPS Pin: " + coords.lat + "° N, " + coords.lng + "° E"
          }));
        }
      },
      () => {
        setIsDetectingGps(false);
        setGpsError("GPS permission denied or unavailable. Please type your property address.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleFillDemo = () => {
    if (listingType === 'plot') {
      setFormData({
        fullName: 'Chief Babatunde Balogun',
        phone: '+234 803 555 4321',
        email: 'babatunde.balogun@gmail.com',
        title: '600 SQM Dry Residential Tableland in Sangotedo / Monastery Road',
        location: 'Monastery Road Axis, Sangotedo, Lekki Corridor',
        state: 'Lagos State',
        sizeOrBeds: '600 SQM (Plot 14, Block 6)',
        askingPriceNgn: '55,000,000',
        titleType: "Governor's Consent",
        description: '100% dry sandy tableland, completely fenced with concrete gatehouse. Registered survey plan ready for Alausa charting.',
        requestDroneScan: true,
        requestVirtualTour: true,
        inspectionSchedule: 'Immediate / Tomorrow Morning',
        bankVerificationAllowed: true
      });
    } else if (listingType === 'house') {
      setFormData({
        fullName: 'Engr. Kenneth Adeleke',
        phone: '+234 812 777 9820',
        email: 'k.adeleke@luxurylagos.com',
        title: 'Brand New 5-Bedroom Fully-Detached Duplex with Swimming Pool',
        location: 'Chevy View Estate, Chevron Tollgate, Lekki',
        state: 'Lagos State',
        sizeOrBeds: '5 Bedrooms + BQ (480 SQM)',
        askingPriceNgn: '175,000,000',
        titleType: 'Certificate of Occupancy (C of O)',
        description: 'Turnkey architectural masterpiece. Includes fitted Italian kitchen with marble island, 20KVA solar inverter, and private pool.',
        requestDroneScan: true,
        requestVirtualTour: true,
        inspectionSchedule: 'Thursday Afternoon',
        bankVerificationAllowed: true
      });
    } else {
      setFormData({
        fullName: 'Mrs. Folashade Adeyemi',
        phone: '+234 802 334 1190',
        email: 'folashade.adeyemi@yahoo.com',
        title: 'Serviced 3-Bedroom Waterfront Flat with Lagoon View & 24/7 Power',
        location: 'Admiralty Way, Lekki Phase 1',
        state: 'Lagos State',
        sizeOrBeds: '3 Ensuite Bedrooms + BQ (210 SQM)',
        askingPriceNgn: '14,000,000 / Year',
        titleType: 'Registered Leasehold Title',
        description: 'Immaculately maintained waterfront flat on the 4th floor. Swimming pool, modern gym, lift, and dedicated dual generators.',
        requestDroneScan: true,
        requestVirtualTour: true,
        inspectionSchedule: 'Weekend Anytime',
        bankVerificationAllowed: true
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAF9F6', paddingBottom: '90px' }}>
      
      {/* 1. TOP SUB-BAR NAVIGATION */}
      <div style={{
        position: 'sticky',
        top: '75px',
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        padding: '12px 6%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '0.82rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            padding: '6px 0'
          }}
        >
          <ArrowLeft size={16} />
          <span>← Back</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            backgroundColor: 'rgba(210, 125, 45, 0.1)',
            color: 'var(--accent-gold)',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            Seller & Landlord Listing Portal
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
            Institutional Escrow Vetting
          </span>
        </div>
      </div>

      {/* 2. HERO BANNER */}
      <div style={{
        backgroundColor: '#070C09',
        color: '#FFFFFF',
        padding: '55px 6% 65px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.16,
          filter: 'blur(3px)'
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(210, 125, 45, 0.2)',
            border: '1px solid rgba(210, 125, 45, 0.4)',
            padding: '4px 14px',
            borderRadius: '20px',
            color: '#F4BA74',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '14px'
          }}>
            <Sparkles size={14} />
            <span>List with 100% Institutional Credibility</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.3rem, 4.8vw, 3.6rem)',
            fontWeight: 400,
            margin: '0 0 16px',
            lineHeight: 1.15
          }}>
            Sell or Rent Your Property on Umoja
          </h1>

          <p style={{
            fontSize: '1.08rem',
            lineHeight: 1.65,
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '820px',
            margin: '0 0 28px',
            fontWeight: 300
          }}>
            Are you a landowner, verified property developer, or landlord? Submit your property for institutional due diligence. We dispatch our crew with <strong>4K aerial drones</strong> and <strong>3D virtual tour cameras</strong> to showcase your property on our snapping deck to thousands of local and diaspora buyers.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            maxWidth: '900px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <Camera size={20} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block' }}>Free 4K Drone Footage</strong>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>Boundary and aerial vista</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <Eye size={20} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block' }}>3D Virtual Tour Scan</strong>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>Matterport 360 walkthrough</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.08)', padding: '12px 16px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block' }}>Escrow Buyer Trust</strong>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>Zero Omo-Onile or touts</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. MAIN FORM CONTAINER */}
      <div style={{ maxWidth: '950px', margin: '40px auto 0', padding: '0 6%' }}>
        
        {formSubmitted ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '2px solid #1A3E26',
            padding: '50px 30px',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(26, 62, 38, 0.1)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle size={40} />
            </div>

            <span style={{
              backgroundColor: 'rgba(210, 125, 45, 0.15)',
              color: 'var(--accent-gold)',
              padding: '5px 14px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              Application Reference: UMJ-SELL-829104
            </span>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.2rem',
              color: 'var(--accent)',
              margin: '18px 0 12px'
            }}>
              Property Listing Application Received!
            </h2>

            <p style={{
              fontSize: '1rem',
              color: '#475569',
              maxWidth: '650px',
              margin: '0 auto 24px',
              lineHeight: 1.65
            }}>
              Thank you, <strong>{formData.fullName}</strong>. Our senior surveyor and valuation desk have received your submission for <strong>"{formData.title || formData.location}"</strong>.
            </p>

            <div style={{
              backgroundColor: '#FAF9F6',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '20px',
              maxWidth: '600px',
              margin: '0 auto 30px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Next Verification Steps:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: '#334155', lineHeight: 1.7 }}>
                <li>A licensed surveyor will call you at <strong>{formData.phone}</strong> within 4 business hours.</li>
                <li>Site inspection &amp; 4K drone perimeter capture scheduled for: <strong>{formData.inspectionSchedule}</strong>.</li>
                <li>Title records check will be initiated with the State Lands Bureau (Alausa / AGIS).</li>
                <li>Upon approval, your listing goes live on the high-traffic snapping showcase deck.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setFormSubmitted(false)}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent)',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Submit Another Property
              </button>

              <button
                onClick={onNavigateToExplore}
                className="btn-primary"
                style={{ padding: '12px 26px', fontSize: '0.85rem' }}
              >
                Browse Current Listings →
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            padding: '40px 5%',
            boxShadow: '0 10px 35px rgba(0,0,0,0.04)'
          }}>
            
            {/* Quick Demo Fill Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              marginBottom: '28px',
              borderBottom: '1px solid var(--border)',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--accent)',
                  margin: '0 0 4px'
                }}>
                  Step 1: Choose Property Type
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Select whether you are selling land, a completed house, or renting out.
                </span>
              </div>

              <button
                type="button"
                onClick={handleFillDemo}
                style={{
                  backgroundColor: 'rgba(210, 125, 45, 0.1)',
                  color: 'var(--accent-gold)',
                  border: '1px solid rgba(210, 125, 45, 0.35)',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={13} />
                <span>Fill Demo Sample</span>
              </button>
            </div>

            {/* Type Selector Tabs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              marginBottom: '32px'
            }}>
              {[
                { id: 'plot', label: 'Land / Plot for Sale', icon: Compass, sub: 'Dry tableland, plots, commercial' },
                { id: 'house', label: 'House / Duplex for Sale', icon: Building, sub: 'Duplexes, terraces, penthouses' },
                { id: 'rental', label: 'House / Apartment for Rent', icon: KeyRound, sub: 'Serviced flats, leases, offices' }
              ].map(t => {
                const isSelected = listingType === t.id;
                const IconComponent = t.icon;
                return (
                  <div
                    key={t.id}
                    onClick={() => setListingType(t.id)}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                      backgroundColor: isSelected ? 'rgba(26, 62, 38, 0.05)' : '#FAF9F6',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 15px rgba(26, 62, 38, 0.08)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <IconComponent size={18} style={{ color: isSelected ? 'var(--accent)' : 'var(--accent-gold)' }} />
                      <strong style={{ fontSize: '0.88rem', color: isSelected ? 'var(--accent)' : '#1E293B' }}>
                        {t.label}
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>
                      {t.sub}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Section 1: Contact Details */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                  1. Seller / Owner Contact Info
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Babatunde Adeleke"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Property Specifications */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                  2. Property Specifications &amp; Location
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        listingType === 'plot' 
                          ? "e.g. 600 SQM Dry Residential Tableland in Sangotedo" 
                          : (listingType === 'house' ? "e.g. Contemporary 4-Bed Terrace with BQ in Maitama" : "e.g. Serviced 3-Bed Waterfront Apartment in Lekki Phase 1")
                      }
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  {/* Dual Precision Location Input: Manual Address + GPS Coordinates */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569' }}>
                        Physical Address / Street / Estate *
                      </label>
                      
                      <button
                        type="button"
                        onClick={handleDetectGps}
                        disabled={isDetectingGps}
                        style={{
                          backgroundColor: 'rgba(210, 125, 45, 0.08)',
                          color: 'var(--accent-gold)',
                          border: '1px solid rgba(210, 125, 45, 0.3)',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <MapPin size={12} />
                        <span>{isDetectingGps ? "Detecting Satellite..." : "📍 Pin Current Device GPS"}</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot 14, Block 8, Admiralty Way, Lekki Phase 1, Lagos"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />

                    {gpsCoordinates && (
                      <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#166534', backgroundColor: '#F0FDF4', padding: '6px 10px', borderRadius: '4px', border: '1px solid #BBF7D0' }}>
                        <CheckCircle size={14} />
                        <span><strong>GPS Lat/Long:</strong> {gpsCoordinates.lat}° N, {gpsCoordinates.lng}° E (±{gpsCoordinates.accuracy}m satellite radius)</span>
                      </div>
                    )}
                    {gpsError && (
                      <span style={{ fontSize: '0.72rem', color: '#DC2626', display: 'block', marginTop: '4px' }}>
                        {gpsError}
                      </span>
                    )}
                  </div>

                  {/* State, Size, Asking Price, Title Type */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                        State / Territory *
                      </label>
                      <select
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          backgroundColor: '#FFFFFF',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Lagos State">Lagos State</option>
                        <option value="Federal Capital Territory">Federal Capital Territory (Abuja)</option>
                        <option value="Rivers State">Rivers State (Port Harcourt)</option>
                        <option value="Ogun State">Ogun State</option>
                        <option value="Oyo State">Oyo State (Ibadan)</option>
                        <option value="Enugu State">Enugu State</option>
                        <option value="Other State / Region">Other State / Region</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                        {listingType === 'plot' ? 'Plot Size (SQM / Acres) *' : (listingType === 'house' ? 'Built Footprint / Bedrooms *' : 'Bedrooms / Size *')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={listingType === 'plot' ? "e.g. 600 SQM or 2 Plots" : "e.g. 4-Bed + BQ (450 SQM)"}
                        value={formData.sizeOrBeds}
                        onChange={e => setFormData({ ...formData, sizeOrBeds: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                        {listingType === 'rental' ? 'Annual Asking Rent (₦) *' : 'Asking Price (₦) *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 75,000,000"
                        value={formData.askingPriceNgn}
                        onChange={e => setFormData({ ...formData, askingPriceNgn: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                        Title Registry Status *
                      </label>
                      <select
                        value={formData.titleType}
                        onChange={e => setFormData({ ...formData, titleType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          fontSize: '0.85rem',
                          backgroundColor: '#FFFFFF',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                        <option value="Governor's Consent">Governor's Consent</option>
                        <option value="Government Gazette / Excision">Government Gazette / Excision</option>
                        <option value="Registered Deed of Assignment">Registered Deed of Assignment</option>
                        <option value="FCDA Right of Occupancy (R of O)">FCDA Right of Occupancy (R of O)</option>
                        <option value="Letter of Administration / Probate">Letter of Administration / Probate</option>
                        <option value="Under Processing">Under Processing / Survey Only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                      Detailed Description &amp; Highlights
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Mention road access, electricity transformer status, drainage, security, borehole water, or any standout architectural finishings..."
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        outline: 'none',
                        resize: 'vertical',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Drone Video, 3D Virtual Tour & Inspection */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
                  3. Media Capture &amp; On-Site Survey Scheduling
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    backgroundColor: formData.requestDroneScan ? 'rgba(210, 125, 45, 0.08)' : '#FAF9F6',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.requestDroneScan}
                      onChange={e => setFormData({ ...formData, requestDroneScan: e.target.checked })}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: '#1E293B', display: 'block' }}>
                        Dispatch 4K Drone Aerial Video Crew
                      </strong>
                      <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                        High-altitude 360 boundary flyover and estate approach footage.
                      </span>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    backgroundColor: formData.requestVirtualTour ? 'rgba(210, 125, 45, 0.08)' : '#FAF9F6',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData.requestVirtualTour}
                      onChange={e => setFormData({ ...formData, requestVirtualTour: e.target.checked })}
                      style={{ marginTop: '3px' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: '#1E293B', display: 'block' }}>
                        Generate 3D Interactive Virtual Tour (Matterport)
                      </strong>
                      <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                        Allows diaspora clients to walk through room-by-room remotely.
                      </span>
                    </div>
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                      Preferred Field Inspection Window *
                    </label>
                    <select
                      value={formData.inspectionSchedule}
                      onChange={e => setFormData({ ...formData, inspectionSchedule: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="This Week">This Week (Earliest Available)</option>
                      <option value="Within 48 Hours">Within 48 Hours (Urgent)</option>
                      <option value="Weekend (Saturday / Sunday)">Weekend (Saturday / Sunday)</option>
                      <option value="Next Week">Next Week</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', marginBottom: '6px' }}>
                      Upload Survey Plan / Proof of Title
                    </label>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      border: '1px dashed var(--border)',
                      borderRadius: '4px',
                      backgroundColor: '#FAF9F6',
                      color: '#64748B',
                      fontSize: '0.78rem'
                    }}>
                      <Upload size={16} style={{ color: 'var(--accent-gold)' }} />
                      <span>Attach PDF / JPEG (Optional at this stage)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Submit Action Strip */}
              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#64748B' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--accent)' }} />
                  <span>Your property documents remain strictly protected under attorney confidentiality.</span>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '14px 34px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    boxShadow: '0 4px 15px rgba(26, 62, 38, 0.25)'
                  }}
                >
                  Submit Property for Vetting &amp; Drone Listing →
                </button>
              </div>

            </form>

          </div>
        )}

      </div>

    </div>
  );
}
