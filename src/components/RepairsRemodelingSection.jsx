import React, { useState } from 'react';
import { 
  Wrench, Hammer, Send, CheckCircle2, 
  Sparkles, Eye, Check, Phone, User, MapPin
} from 'lucide-react';

export default function RepairsRemodelingSection({ onOpenVisualizer }) {
  // Option choice: 'renovate' | 'repair'
  const [serviceType, setServiceType] = useState('renovate');

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.description) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        ...formData,
        type: serviceType,
        refId: 'UMJ-' + (serviceType === 'renovate' ? 'REN' : 'REP') + '-' + Math.floor(100000 + Math.random() * 900000)
      });
      window.scrollTo({ top: document.getElementById('renovate-repair-box')?.offsetTop - 80 || 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div id="renovate-repair-box" style={{ marginTop: '48px', marginBottom: '40px' }}>
      
      {/* ── Visualizer Direct Route Callout Banner ──────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #111C15 0%, #1A3E26 100%)',
        borderRadius: '12px',
        border: '2px solid rgba(210, 125, 45, 0.45)',
        padding: '26px 30px',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '32px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.15)'
      }}>
        <div style={{ maxWidth: '680px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Interactive Visualizer
            </span>
          </div>
          <h3 style={{ margin: 0, fontSize: '1.35rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF' }}>
            Want to Visualize Your Remodeling in 3D?
          </h3>
          <p style={{ margin: '6px 0 0', fontSize: '0.86rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.5 }}>
            Pick only the spaces you want to remodel (bathrooms, flooring, kitchen, living room) and customize real materials in our dedicated full-screen visualizer.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenVisualizer}
          className="btn-primary"
          style={{
            padding: '13px 26px',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <Eye size={16} />
          <span>Launch Remodeling Visualizer →</span>
        </button>
      </div>

      {/* ── Main Form Container ─────────────────────────────────────────── */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        padding: '36px 32px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '0.74rem',
            color: 'var(--accent-gold)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '6px'
          }}>
            Quick Service Request
          </span>
          <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--accent)' }}>
            Choose Renovate or Repair
          </h3>
          <p style={{ margin: '0 auto', fontSize: '0.9rem', color: '#64748B', maxWidth: '580px', lineHeight: 1.55 }}>
            Select whether you need a full renovation/remodel or a specific repair, and describe what you want our certified team to do.
          </p>
        </div>

        {submittedData ? (
          <div style={{
            backgroundColor: '#FAF9F6',
            border: '2px solid var(--accent)',
            borderRadius: '10px',
            padding: '36px 28px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle2 size={32} />
            </div>

            <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Request Received &bull; Ref: {submittedData.refId}
            </span>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--accent)', margin: '6px 0 12px' }}>
              Thank You, {submittedData.name}!
            </h4>
            <p style={{ fontSize: '0.92rem', color: '#475569', maxWidth: '580px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              We have received your <strong>{submittedData.type === 'renovate' ? 'Renovation' : 'Repair'}</strong> request for <strong>{submittedData.location || 'your property'}</strong>. Our engineering team will review what you described and reach out via WhatsApp / Phone at <strong>{submittedData.phone}</strong> within 24 hours.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmittedData(null);
                setFormData({ name: '', phone: '', location: '', description: '' });
              }}
              style={{
                padding: '10px 24px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                backgroundColor: '#FFFFFF',
                color: 'var(--text-title)',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ← Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: '780px', margin: '0 auto' }}>
            
            {/* ── 1. Choose Renovate or Repair ────────────────────────────── */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                1. What do you need help with? *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                
                {/* Renovate Option */}
                <div
                  onClick={() => setServiceType('renovate')}
                  style={{
                    border: serviceType === 'renovate' ? '2px solid var(--accent)' : '1px solid var(--border)',
                    backgroundColor: serviceType === 'renovate' ? '#FAF9F6' : '#FFFFFF',
                    borderRadius: '10px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: serviceType === 'renovate' ? '0 6px 20px rgba(26, 62, 38, 0.12)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      backgroundColor: serviceType === 'renovate' ? 'var(--accent)' : 'rgba(210, 125, 45, 0.12)',
                      color: serviceType === 'renovate' ? '#FFFFFF' : 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Hammer size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: serviceType === 'renovate' ? 'var(--accent)' : 'var(--text-title)', fontWeight: 700 }}>
                        Renovate
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Room makeovers &amp; upgrades
                      </span>
                    </div>
                  </div>

                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: serviceType === 'renovate' ? 'none' : '2px solid var(--border)',
                    backgroundColor: serviceType === 'renovate' ? 'var(--accent)' : 'transparent',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}>
                    {serviceType === 'renovate' && <Check size={14} />}
                  </div>
                </div>

                {/* Repair Option */}
                <div
                  onClick={() => setServiceType('repair')}
                  style={{
                    border: serviceType === 'repair' ? '2px solid var(--accent)' : '1px solid var(--border)',
                    backgroundColor: serviceType === 'repair' ? '#FAF9F6' : '#FFFFFF',
                    borderRadius: '10px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: serviceType === 'repair' ? '0 6px 20px rgba(26, 62, 38, 0.12)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      backgroundColor: serviceType === 'repair' ? 'var(--accent)' : 'rgba(210, 125, 45, 0.12)',
                      color: serviceType === 'repair' ? '#FFFFFF' : 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Wrench size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', color: serviceType === 'repair' ? 'var(--accent)' : 'var(--text-title)', fontWeight: 700 }}>
                        Repair
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Fixes, leaks &amp; maintenance
                      </span>
                    </div>
                  </div>

                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: serviceType === 'repair' ? 'none' : '2px solid var(--border)',
                    backgroundColor: serviceType === 'repair' ? 'var(--accent)' : 'transparent',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px'
                  }}>
                    {serviceType === 'repair' && <Check size={14} />}
                  </div>
                </div>

              </div>
            </div>

            {/* ── 2. Describe What You Want Us to Do ────────────────────────── */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                2. Describe what you want us to do *
              </label>
              <textarea
                required
                rows={5}
                placeholder={
                  serviceType === 'renovate'
                    ? "Describe what you want to renovate (e.g., I want to renovate 2 bathrooms with walk-in showers and change all living room floor tiles to Spanish porcelain, repaint the interior, and add drop POP ceilings with LED lights)..."
                    : "Describe what you want repaired (e.g., We have an active roof leak over the master bedroom, damp patches on the ground floor wall, and popping floor tiles that need to be re-laid)..."
                }
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* ── 3. Contact & Location Information ─────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Olufunke Adeleke"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    fontSize: '0.86rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +234 802 345 6789"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    fontSize: '0.86rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  Property Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ikeja GRA, Victoria Island or Central Business District"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    fontSize: '0.86rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* ── Submit Button ─────────────────────────────────────────────── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                All work assessed by certified engineers with a 12-month workmanship warranty.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  padding: '13px 32px',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Submitting Request...' : `Submit ${serviceType === 'renovate' ? 'Renovation' : 'Repair'} Request →`}</span>
              </button>
            </div>

          </form>
        )}
      </div>

    </div>
  );
}
