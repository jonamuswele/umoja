import React, { useState } from 'react';
import { 
  Sparkles, Check, ArrowRight, MapPin, Send, 
  ShieldCheck, Eye, Phone, Mail, User, CheckCircle2,
  Building, Layers, Hammer, Compass, FileText, Home,
  Wrench, CheckSquare, MessageSquare
} from 'lucide-react';

// 9 Specific Construction Stages / Scopes
const CONSTRUCTION_PARTS = [
  {
    id: 'architectural',
    title: 'Architectural Design & 3D Drawings',
    badge: 'Design & Approvals',
    icon: Compass,
    desc: 'Complete architectural floor plans, photorealistic 3D external & interior renders, elevations, and building permit processing (LASPPPA, FCDA, Ogun State).'
  },
  {
    id: 'structural',
    title: 'COREN Structural Engineering & Calculations',
    badge: 'Structural Engineering',
    icon: ShieldCheck,
    desc: 'Soil load-bearing calculations, reinforced concrete structural framing, beam/column specifications, and certified COREN engineer seals.'
  },
  {
    id: 'soil_survey',
    title: 'Land Survey & Geotechnical Soil Testing',
    badge: 'Survey & Testing',
    icon: MapPin,
    desc: 'Registered GPS beacon boundary survey, topographic contour mapping, and rotary borehole / cone penetrometer test (CPT) soil report.'
  },
  {
    id: 'foundation',
    title: 'Foundation & Deep Piling Works',
    badge: 'Substructure',
    icon: Layers,
    desc: 'Rotary rig foundation piling for coastal/marshy soils, reinforced concrete raft foundations, ground beams, hardcore filling, and DPM damp-proofing.'
  },
  {
    id: 'superstructure',
    title: 'Superstructure, Columns & First Floor Decking',
    badge: 'Superstructure',
    icon: Building,
    desc: 'High-yield 16mm TMT rebar reinforcement, cast concrete columns, suspended floor decking slab casting, and 9-inch solid sandcrete block walls.'
  },
  {
    id: 'roofing',
    title: 'Gerard Roofing & Parapet Fascia',
    badge: 'Roofing',
    icon: Home,
    desc: 'Hardwood timber roof trusses, 50-year warranty Gerard stone-coated steel shingles or longspan aluminum sheets with concealed parapet gutters.'
  },
  {
    id: 'mep',
    title: 'Plumbing, Electrical & MEP Conduits',
    badge: 'Conduits & Piping',
    icon: Wrench,
    desc: 'Pressure-tested PPR hot/cold water pipes, concealed electrical PVC conduits, distribution panels, soakaway pit, and modern bio-digester.'
  },
  {
    id: 'finishing',
    title: 'Interior Plastering, POP Ceilings & Tiling',
    badge: 'Finishing & POP',
    icon: Hammer,
    desc: 'Smooth screeding, suspended gypsum POP ceiling trays with indirect LED coves, Spanish/Italian floor tiles, and heavy-gauge casement windows.'
  },
  {
    id: 'turnkey',
    title: 'Complete Turnkey Construction (Full Build)',
    badge: 'End-to-End Delivery',
    icon: CheckSquare,
    desc: 'Comprehensive end-to-end delivery from virgin land clearing to keys handover under chartered resident engineer supervision and milestone escrow protection.'
  }
];

export default function ConstructionSuite({ onOpenVisualizer }) {
  // Selected construction stages
  const [selectedParts, setSelectedParts] = useState([]);

  // Inquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    landStatus: 'owned',
    timeline: '1-3months',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const togglePart = (id) => {
    setSelectedParts(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        ...formData,
        parts: selectedParts.map(id => CONSTRUCTION_PARTS.find(p => p.id === id)?.title).filter(Boolean),
        refId: 'UMJ-ENG-' + Math.floor(100000 + Math.random() * 900000)
      });
      window.scrollTo({ top: document.getElementById('inquiry-section')?.offsetTop - 80 || 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '40px' }}>
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. THE WAY TO THE VISUALIZER (HERO BANNER & LAUNCH PORTAL)
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#070C09',
        borderRadius: '14px',
        border: '2px solid rgba(210, 125, 45, 0.45)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
        padding: '36px 36px',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          backgroundColor: 'rgba(210, 125, 45, 0.12)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              House Visualizer
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', margin: '0 0 10px', color: '#FFFFFF', fontWeight: 400 }}>
            Design &amp; Customize Your House
          </h2>
          <p style={{ margin: 0, fontSize: '0.94rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 300 }}>
            Customize your dream home with real materials: roofing, flooring, ceilings, staircases, and outdoor spaces. Get an instant price estimate and schedule a land inspection.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.9)' }}>
              <Check size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Real Photo Finishes</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.9)' }}>
              <Check size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Instant Price Estimate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.9)' }}>
              <Check size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>On-Site Land Inspection</span>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <button
            onClick={onOpenVisualizer}
            className="btn-primary"
            style={{
              padding: '16px 32px',
              fontSize: '0.92rem',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 24px rgba(210, 125, 45, 0.35)',
              cursor: 'pointer'
            }}
          >
            <Eye size={18} />
            <span>Launch House Visualizer →</span>
          </button>
          <span style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginTop: '8px', textAlign: 'center' }}>
            Opens visualizer in full screen
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. CHOOSE WHAT PART OF CONSTRUCTION YOU MAY NEED HELP WITH
          ══════════════════════════════════════════════════════════════════════ */}
      <div>
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Wrench size={16} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Construction Stages
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: 'var(--accent)', margin: '0 0 8px' }}>
            What Part of Construction Do You Need Help With?
          </h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', maxWidth: '760px', lineHeight: 1.55 }}>
            Choose the stages where you need help — architectural plans, foundation, roofing, or full construction.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '16px'
        }}>
          {CONSTRUCTION_PARTS.map((part) => {
            const isSelected = selectedParts.includes(part.id);
            const IconComp = part.icon;
            return (
              <div
                key={part.id}
                onClick={() => togglePart(part.id)}
                style={{
                  backgroundColor: isSelected ? '#FAF9F6' : '#FFFFFF',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 8px 24px rgba(26, 62, 38, 0.12)' : '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{
                      backgroundColor: isSelected ? 'var(--accent)' : 'rgba(210, 125, 45, 0.12)',
                      color: isSelected ? '#FFFFFF' : 'var(--accent-gold)',
                      padding: '3px 10px',
                      borderRadius: '4px',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      {part.badge}
                    </span>

                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '4px',
                      border: isSelected ? 'none' : '2px solid var(--border)',
                      backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>

                  <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', color: isSelected ? 'var(--accent)' : 'var(--text-title)', fontWeight: 700 }}>
                    {part.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
                    {part.desc}
                  </p>
                </div>

                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.74rem', color: isSelected ? 'var(--accent)' : '#94A3B8', fontWeight: 700 }}>
                    {isSelected ? '✓ Included in your inquiry' : '+ Click to select this part'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3. WRITE AN INQUIRY (DIRECT INQUIRY FORM)
          ══════════════════════════════════════════════════════════════════ */}
      <div id="inquiry-section" style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
        padding: '36px 36px',
        overflow: 'hidden'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <MessageSquare size={16} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Direct Engineering Consultation
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: 'var(--accent)', margin: '0 0 8px' }}>
            Write a Construction Inquiry
          </h3>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.55 }}>
            Send your project details or questions directly to our chartered engineering team. We will review your selected construction stages and reach out with technical advice and an on-site feasibility schedule.
          </p>
        </div>

        {/* Selected Construction Parts Feedback Chips */}
        {selectedParts.length > 0 && (
          <div style={{
            backgroundColor: 'rgba(210, 125, 45, 0.08)',
            border: '1px solid rgba(210, 125, 45, 0.25)',
            borderRadius: '8px',
            padding: '14px 18px',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Selected Construction Stages ({selectedParts.length}):
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedParts.map(id => {
                const part = CONSTRUCTION_PARTS.find(p => p.id === id);
                return (
                  <span
                    key={id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--accent)',
                      color: 'var(--accent)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{part?.title}</span>
                    <button
                      type="button"
                      onClick={() => togglePart(id)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 0, fontSize: '0.8rem', fontWeight: 700 }}
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Submission Success Confirmation */}
        {submittedData ? (
          <div style={{
            backgroundColor: '#FAF9F6',
            border: '2px solid var(--accent)',
            borderRadius: '10px',
            padding: '30px',
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
              Inquiry Logged &bull; Ref: {submittedData.refId}
            </span>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--accent)', margin: '6px 0 12px' }}>
              Thank You, {submittedData.name}!
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', maxWidth: '620px', margin: '0 auto 20px', lineHeight: 1.6 }}>
              Our chartered civil engineers have received your inquiry for <strong>{submittedData.location || 'your project'}</strong>. We are reviewing your selected construction stages and will contact you via WhatsApp / Phone at <strong>{submittedData.phone}</strong> within 24 hours to coordinate on-site land inspection and discuss your project.
            </p>

            <button
              onClick={() => {
                setSubmittedData(null);
                setSelectedParts([]);
                setFormData({ name: '', phone: '', email: '', location: '', landStatus: 'owned', timeline: '1-3months', message: '' });
              }}
              style={{
                padding: '10px 22px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                backgroundColor: '#FFFFFF',
                color: 'var(--text-title)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ← Write Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Adeyemi"
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
                  placeholder="e.g. +234 803 123 4567"
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
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. adeyemi@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                  Land / Project Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lekki Phase 1, Victoria Island or Central Business District"
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

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  Current Land Status
                </label>
                <select
                  value={formData.landStatus}
                  onChange={e => setFormData({ ...formData, landStatus: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    fontSize: '0.86rem',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="owned">I already own the land (have deed / CofO / Governor's Consent)</option>
                  <option value="needs_verification">I have land but need survey / legal verification</option>
                  <option value="purchasing">Currently negotiating to buy land</option>
                  <option value="looking_for_land">Looking to purchase land through Umoja</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  Estimated Target Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={e => setFormData({ ...formData, timeline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    fontSize: '0.86rem',
                    backgroundColor: '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="immediate">Immediate (Ready to break ground in next 30 days)</option>
                  <option value="1-3months">1 - 3 Months</option>
                  <option value="3-6months">3 - 6 Months</option>
                  <option value="planning">Planning / Budgeting Stage</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                Inquiry Details &amp; Project Description
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about the house you want to build (e.g. number of bedrooms, duplex or bungalow), land topography, foundation concerns, or specific questions..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  fontSize: '0.86rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                All consultations conducted under registered chartered civil engineer oversight.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  padding: '13px 32px',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                <Send size={16} />
                <span>{isSubmitting ? 'Sending Inquiry...' : 'Send Construction Inquiry →'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
