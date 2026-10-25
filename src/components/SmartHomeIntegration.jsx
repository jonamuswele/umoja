import React, { useState } from 'react';
import { 
  ArrowLeft, Cpu, ShieldCheck, CheckCircle, Lock, Camera, 
  Lightbulb, Droplets, Bell, KeyRound, MapPin, Calendar, 
  Check, Phone, User, Info, ArrowRight, Shield, Zap, 
  CheckSquare, Square, X, Sliders, Smartphone, Home
} from 'lucide-react';
import { getStoredServices } from '../utils/userStorage';

// ══════════════════════════════════════════════════════════════════════
// 1. SMART HOME FEATURES AVAILABLE TO CHOOSE
// ══════════════════════════════════════════════════════════════════════
const SMART_FEATURES = [
  {
    id: 'smart-lock',
    name: 'Smart Biometric Door Locks',
    icon: Lock,
    badge: 'Popular for Front & Master Doors',
    shortDesc: 'Unlock your doors with fingerprint, secret PIN, RFID card, physical key, or smartphone app from anywhere. Create temporary codes for visitors or housemaids.',
    benefits: ['Zero keys needed', 'Sends alert when door opens', 'Auto-deadbolts after closing']
  },
  {
    id: 'cctv-viewing',
    name: 'CCTV Live Phone Viewing',
    icon: Camera,
    badge: '24/7 Security Coverage',
    shortDesc: 'View crystal-clear video of your gates, compound, and parlor live on your phone while at work or abroad. Includes 2-way microphone talk and night vision.',
    benefits: ['Works on iPhone & Android', 'Full color at night', 'Motion recording on phone']
  },
  {
    id: 'smart-lighting',
    name: 'Smart Lighting & Automatic Switches',
    icon: Lightbulb,
    badge: 'Energy Saving & Luxury',
    shortDesc: 'Lights turn on automatically when you enter a room and turn off when empty. Schedule parlor lights to come on at 7:00 PM sunset, or control all rooms with your phone.',
    benefits: ['Saves generator fuel/NEPA bill', 'Voice control with Alexa/Google', 'Custom mood colors']
  },
  {
    id: 'water-monitoring',
    name: 'Automatic Water Tank Level Monitoring',
    icon: Droplets,
    badge: 'Prevents Overflow & Pump Burnout',
    shortDesc: 'Ultrasound wireless sensor installed on your overhead water tank. Shows exact water percentage on your phone and automatically cuts off the water pump before it overflows.',
    benefits: ['No more overflowing tanks', 'Stops pump dry-run burnouts', 'Low-water warning alert']
  },
  {
    id: 'motion-alerts',
    name: 'Motion Sensors & Perimeter Intrusion Alerts',
    icon: Bell,
    badge: 'Instant Break-In Warning',
    shortDesc: 'Discrete motion sensors installed at doors, windows, and compound fences. If someone climbs in at night, a loud siren sounds and an instant alert rings on your smartphone.',
    benefits: ['Pet-immune smart sensors', 'Instant push notification', 'Integrates with alarm siren']
  },
  {
    id: 'remote-gate',
    name: 'Remote Motorized Gate Access',
    icon: KeyRound,
    badge: 'Comfort & Rain Protection',
    shortDesc: 'Never come out in heavy rain to push heavy gates. Press a button in your car, use a wireless clicker, or tap your smartphone to smoothly slide open your compound gate.',
    benefits: ['Obstacle safety auto-reverse', 'Car battery backup during blackout', 'Pedestrian half-open mode']
  }
];

export default function SmartHomeIntegration({ onBackToHub, customService }) {
  const storedServices = getStoredServices();
  const shService = customService || storedServices.find(s => s.id === 'smart-home');
  // Selected features state (Default: Smart Lock + CCTV + Water Monitoring)
  const [selectedFeatureIds, setSelectedFeatureIds] = useState(['smart-lock', 'cctv-viewing', 'water-monitoring']);
  const [customFeatureNotes, setCustomFeatureNotes] = useState('');

  // Location & Contact State
  const [stateName, setStateName] = useState('Lagos State');
  const [address, setAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('Tomorrow Morning (9:00 AM - 12:00 PM)');

  // Confirmation Modal
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const surveyFeeNgn = 10000;
  const surveyFeeUsd = 6.8;

  const toggleFeature = (id) => {
    if (selectedFeatureIds.includes(id)) {
      if (selectedFeatureIds.length > 1) {
        setSelectedFeatureIds(selectedFeatureIds.filter(f => f !== id));
      }
    } else {
      setSelectedFeatureIds([...selectedFeatureIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedFeatureIds.length === SMART_FEATURES.length) {
      setSelectedFeatureIds(['smart-lock']);
    } else {
      setSelectedFeatureIds(SMART_FEATURES.map(f => f.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `SH-${Math.floor(100000 + Math.random() * 900000)}`;
    const selectedNames = SMART_FEATURES.filter(f => selectedFeatureIds.includes(f.id)).map(f => f.name);

    setConfirmedBooking({
      ref,
      selectedNames,
      customNotes: customFeatureNotes,
      stateName,
      address: address || `${stateName} Site`,
      fullName,
      phone,
      timeWindow: preferredDate,
      costNgn: surveyFeeNgn,
      costUsd: surveyFeeUsd,
      engineerName: 'Engr. Dapo Alabi',
      engineerTitle: 'Senior Smart Systems & IoT Automation Engineer'
    });
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAF9F6', paddingBottom: '120px' }}>
      
      {/* ══════════════════════════════════════════════════════════════════
          1. STICKY TOP SUB-BAR
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'sticky',
        top: '75px',
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        padding: '14px 6%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <button
          onClick={onBackToHub}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            padding: '6px 0'
          }}
        >
          <ArrowLeft size={16} />
          <span>← Back</span>
        </button>

        <h2 style={{
          margin: 0,
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--text-title)',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.02em',
          textAlign: 'right'
        }}>
          Smart Home &amp; Automation Suite
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          2. HERO BANNER
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#070C09',
        color: '#FFFFFF',
        padding: '44px 6% 50px',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: shService?.heroImage ? `linear-gradient(to right, rgba(7, 12, 9, 0.94) 0%, rgba(7, 12, 9, 0.8) 60%, rgba(7, 12, 9, 0.5) 100%), url(${shService.heroImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {!shService?.heroImage && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundImage: 'radial-gradient(circle at right, rgba(0, 102, 153, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
        )}

        <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0, 102, 153, 0.25)', padding: '5px 12px', borderRadius: '4px', marginBottom: '14px', border: `1px solid ${shService?.badgeColor ? `${shService.badgeColor}66` : 'rgba(0, 102, 153, 0.4)'}` }}>
            <Cpu size={14} style={{ color: shService?.badgeColor || '#38BDF8' }} />
            <span style={{ fontSize: '0.74rem', color: shService?.badgeColor || '#38BDF8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {shService?.badgeText || "Smart Living Made Simple"}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.3rem',
            lineHeight: 1.18,
            margin: '0 0 12px',
            fontWeight: 700,
            color: shService?.textColor || '#FFFFFF'
          }}>
            {shService?.heroHeadline || "Upgrade Your House to a Smart Home"}
          </h1>

          <p style={{
            fontSize: '0.94rem',
            color: shService?.subtitleColor || 'rgba(255, 255, 255, 0.82)',
            maxWidth: '740px',
            lineHeight: 1.6,
            margin: '0 0 20px',
            fontWeight: 300
          }}>
            {shService?.heroSubtitle || (
              <>Select what you want to put in your home. You pay a modest site surveying fee of <strong>₦10,000 ($6.8)</strong>, our engineer comes over to survey your doors, gates, water tank, and wiring, and then gives you an exact installation quotation. Once you approve, they come and install everything!</>
            )}
          </p>

          {/* Simple 3 Steps for Average Person */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
            marginTop: '22px'
          }}>
            {[
              { step: '1', title: 'Pick Features You Want', desc: 'Tick smart locks, CCTV, water sensors, lighting or gates below.' },
              { step: '2', title: 'Pay ₦10,000 Survey Fee', desc: 'An engineer visits your property to inspect doors and wiring.' },
              { step: '3', title: 'They Come & Install', desc: 'Receive your exact price. Once approved, our team installs and trains you.' }
            ].map(s => (
              <div key={s.step} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#070C09',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {s.step}
                </div>
                <div>
                  <strong style={{ fontSize: '0.84rem', color: '#FFFFFF', display: 'block', marginBottom: '2px' }}>{s.title}</strong>
                  <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.4, display: 'block' }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          3. INTERACTIVE FEATURE SELECTOR & SURVEY FORM
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1050px', margin: '36px auto 0', padding: '0 6%' }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          padding: '32px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
        }}>
          
          {/* STEP 1: PICK FEATURES */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#006699', fontWeight: 800, textTransform: 'uppercase' }}>
                  Step 1 of 2
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                  What Would You Like to Install in Your Home?
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Tick one or more features below. Our engineer will inspect all selected areas during the survey visit.
                </span>
              </div>

              <button
                type="button"
                onClick={handleSelectAll}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FAF9F6',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--accent)'
                }}
              >
                {selectedFeatureIds.length === SMART_FEATURES.length ? 'Clear Selection' : 'Select All 6 Features'}
              </button>
            </div>

            {/* Features Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '16px'
            }}>
              {SMART_FEATURES.map(feat => {
                const isSelected = selectedFeatureIds.includes(feat.id);
                const IconComponent = feat.icon;
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    style={{
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #006699' : '1px solid var(--border)',
                      backgroundColor: isSelected ? '#F0F9FF' : '#FFFFFF',
                      padding: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 4px 14px rgba(0, 102, 153, 0.12)' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <div style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#006699' : '#F1F5F9',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <IconComponent size={20} />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            fontSize: '0.66rem',
                            backgroundColor: isSelected ? 'rgba(0, 102, 153, 0.15)' : '#F1F5F9',
                            color: isSelected ? '#006699' : '#64748B',
                            padding: '2px 8px',
                            borderRadius: '3px',
                            fontWeight: 700
                          }}>
                            {feat.badge}
                          </span>

                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: isSelected ? '2px solid #006699' : '2px solid #CBD5E1',
                            backgroundColor: isSelected ? '#006699' : '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF'
                          }}>
                            {isSelected && <Check size={14} />}
                          </div>
                        </div>
                      </div>

                      <h3 style={{ margin: '0 0 6px', fontSize: '1.02rem', color: isSelected ? '#006699' : 'var(--accent)', fontWeight: 700 }}>
                        {feat.name}
                      </h3>

                      <p style={{ margin: '0 0 12px', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
                        {feat.shortDesc}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {feat.benefits.map((b, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#64748B' }}>
                          <CheckCircle size={12} style={{ color: '#10B981', flexShrink: 0 }} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Notes / Extra Smart Requests */}
            <div style={{ marginTop: '16px' }}>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                Any other smart gadget or specific requirements? (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. We also need smart curtains for the living room, video intercom doorbell at the gatehouse, or inverter battery percentage integration..."
                value={customFeatureNotes}
                onChange={e => setCustomFeatureNotes(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'var(--font-sans)' }}
              />
            </div>
          </div>

          {/* STEP 2: WHERE DO WE SEND THE ENGINEER? */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '26px', marginBottom: '28px' }}>
            <span style={{ fontSize: '0.72rem', color: '#006699', fontWeight: 800, textTransform: 'uppercase' }}>
              Step 2 of 2
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--accent)', margin: '2px 0 6px' }}>
              Where Should We Send the Smart Home Engineer?
            </h2>
            <p style={{ margin: '0 0 18px', fontSize: '0.8rem', color: '#64748B' }}>
              Our engineer comes to inspect your physical premises, check door locks, test Wi-Fi signal range, inspect the overhead tank, and give you an exact price list.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  State / Region *
                </label>
                <select
                  value={stateName}
                  onChange={e => setStateName(e.target.value)}
                  style={{ width: '100%', padding: '9px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                >
                  <option>Lagos State</option>
                  <option>Abuja FCT</option>
                  <option>Ogun State</option>
                  <option>Oyo State (Ibadan)</option>
                  <option>Rivers State (Port Harcourt)</option>
                  <option>Edo State (Benin)</option>
                  <option>Delta State (Asaba / Warri)</option>
                  <option>Enugu State</option>
                  <option>Kaduna State</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Biodun Lawson"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Active Phone Number (WhatsApp / Calls) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0802 345 6789"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  House / Site Street Address & Landmark *
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 14 Admiralty Way, Lekki Phase 1, Lagos"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setAddress('Admiralty Way, Lekki Phase 1, Lagos (GPS Verified)')}
                    style={{
                      padding: '0 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--accent)',
                      backgroundColor: '#FAF9F6',
                      color: 'var(--accent)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <MapPin size={12} />
                    GPS
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Preferred Survey Time:
                </label>
                <select
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  style={{ width: '100%', padding: '9px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                >
                  <option>Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                  <option>Tomorrow Afternoon (1:00 PM - 4:00 PM)</option>
                  <option>This Saturday Morning (10:00 AM)</option>
                  <option>Next Available Business Day</option>
                </select>
              </div>
            </div>
          </div>

          {/* SUMMARY & SUBMISSION */}
          <div style={{
            backgroundColor: '#F0F9FF',
            borderRadius: '8px',
            border: '1px solid #BAE6FD',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#0369A1', fontWeight: 800 }}>
                Smart Systems Site Survey Fee:
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#006699' }}>
                  ₦{surveyFeeNgn.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
                  (~${surveyFeeUsd})
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                ✓ {selectedFeatureIds.length} Smart features selected • Survey fee credited to final bill if you install
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={onBackToHub}
                style={{
                  padding: '12px 20px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--text-title)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  padding: '12px 28px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#006699',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 102, 153, 0.25)'
                }}
              >
                <CheckCircle size={16} style={{ color: '#BAE6FD' }} />
                <span>Confirm & Request Smart Home Survey</span>
              </button>
            </div>
          </div>

        </form>

        {/* CONFIRMATION PASS MODAL */}
        {confirmedBooking && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(7, 12, 9, 0.85)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '520px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              <div style={{
                backgroundColor: '#006699',
                color: '#FFFFFF',
                padding: '24px 28px',
                position: 'relative'
              }}>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={18} style={{ color: '#38BDF8' }} />
                  <span style={{ fontSize: '0.72rem', color: '#38BDF8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Smart Home Survey Pass
                  </span>
                </div>

                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  Smart Survey Booked
                </h3>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.8)', display: 'block', marginTop: '4px' }}>
                  Booking Reference: <strong style={{ color: '#FFFFFF' }}>{confirmedBooking.ref}</strong>
                </span>
              </div>

              <div style={{ padding: '24px 28px' }}>
                <div style={{
                  backgroundColor: '#F0F9FF',
                  borderRadius: '8px',
                  border: '1px solid #BAE6FD',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '18px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#006699',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    DA
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.92rem', color: '#0F172A' }}>{confirmedBooking.engineerName}</strong>
                    <span style={{ fontSize: '0.74rem', color: '#475569', display: 'block' }}>{confirmedBooking.engineerTitle}</span>
                    <span style={{ fontSize: '0.72rem', color: '#0284C7', fontWeight: 700 }}>Certified Smart Locks, CCTV & Tank Sensors</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: '#334155', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Selected Features:</span>
                    <strong style={{ textAlign: 'right', maxWidth: '300px' }}>{confirmedBooking.selectedNames.join(', ')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Site Address:</span>
                    <strong style={{ textAlign: 'right', maxWidth: '300px' }}>{confirmedBooking.address}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Arrival Window:</span>
                    <strong style={{ color: '#006699' }}>{confirmedBooking.timeWindow}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: '#64748B', fontWeight: 700 }}>Survey Fee:</span>
                    <strong style={{ fontSize: '1.05rem', color: '#006699' }}>
                      ₦{confirmedBooking.costNgn.toLocaleString()} (${confirmedBooking.costUsd})
                    </strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    What Happens Next?
                  </span>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#14532D', lineHeight: 1.45 }}>
                    The engineer will call you before arrival, inspect your doors, gate, water tank, and electrical switchboard, 
                    and present you with an exact quotation. Once you approve, the equipment is delivered and installed!
                  </p>
                </div>

                <button
                  onClick={() => {
                    setConfirmedBooking(null);
                    onBackToHub();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    backgroundColor: '#006699',
                    color: '#FFFFFF',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Done (Back to Directory)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
