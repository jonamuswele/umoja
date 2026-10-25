import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Check, Sparkles, Building, Layers, Eye, 
  ChevronRight, Compass, ShieldCheck, Share2, Printer, 
  CheckCircle2, Phone, Calendar, RefreshCw, Home, Sofa,
  Utensils, Bed, Paintbrush, Trees, Lamp, ShowerHead,
  MapPin, DollarSign
} from 'lucide-react';
import { 
  SECTIONS_CONSTRUCTION, 
  SECTIONS_INTERIOR, 
  RENOVATION_SPACES 
} from '../data/houseCharacteristicsData';

// ── Slideshow Image with Hover Pause ───────────────────────────────────────
function SlideshowImg({ imgs, style, onError }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    if (!imgs || imgs.length <= 1) return;
    const interval = setInterval(() => {
      if (paused.current) return;
      setFading(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % imgs.length);
        setFading(false);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [imgs]);

  if (!imgs || imgs.length === 0) return null;

  return (
    <img
      src={imgs[idx]}
      alt=""
      style={{
        ...style,
        opacity: fading ? 0.3 : 1,
        transition: 'opacity 0.35s ease',
      }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onError={onError}
    />
  );
}

// ── Renovation Scope to Sections Mapping ───────────────────────────────────
// If user selects "bath", only show bathroom options.
// If user selects "flooring", only show flooring options.
// Do NOT force them through unrelated parts.
const RENOVATION_MAP = {
  bath: {
    key: 'sdb_style',
    section: SECTIONS_INTERIOR.sdb_style,
    estMin: 2200000,
    estMax: 4500000
  },
  flooring: {
    key: 'sols',
    section: SECTIONS_CONSTRUCTION.sols,
    estMin: 3000000,
    estMax: 6500000
  },
  kitchen: {
    key: 'cuisine_style',
    section: SECTIONS_INTERIOR.cuisine_style,
    estMin: 3500000,
    estMax: 7800000
  },
  living: {
    key: 'ambiance_salon',
    section: SECTIONS_INTERIOR.ambiance_salon,
    estMin: 2000000,
    estMax: 4800000
  },
  bedroom: {
    key: 'chambre_atmo',
    section: SECTIONS_INTERIOR.chambre_atmo,
    estMin: 1800000,
    estMax: 3900000
  },
  walls: {
    key: 'structure',
    section: SECTIONS_CONSTRUCTION.structure,
    estMin: 1500000,
    estMax: 3200000
  },
  ceilings: {
    key: 'plafond',
    section: SECTIONS_CONSTRUCTION.plafond,
    estMin: 1600000,
    estMax: 3600000
  },
  facade: {
    key: 'facade',
    section: SECTIONS_CONSTRUCTION.facade,
    estMin: 4000000,
    estMax: 9000000
  },
  outdoor: {
    key: 'exterieur',
    section: SECTIONS_CONSTRUCTION.exterieur,
    estMin: 2500000,
    estMax: 5500000
  },
  lighting: {
    key: 'luminaires',
    section: SECTIONS_INTERIOR.luminaires,
    estMin: 900000,
    estMax: 2200000
  }
};

const SPACE_ICON_MAP = {
  bath: ShowerHead,
  flooring: Layers,
  kitchen: Utensils,
  living: Sofa,
  bedroom: Bed,
  walls: Paintbrush,
  ceilings: Sparkles,
  facade: Home,
  outdoor: Trees,
  lighting: Lamp
};

// ── Main House & Interior Features Configurator ────────────────────────────
export default function HouseFeaturesConfigurator({ 
  mode = 'construction', // 'construction' | 'interior' | 'renovation'
  serviceTitle = 'House Characteristics',
  onBack,
  onComplete
}) {
  // Screen state: 'renov_spaces' (renovation only), 'sections', 'visionboard', 'done'
  const [screen, setScreen] = useState(mode === 'renovation' ? 'renov_spaces' : 'sections');
  // For renovation, default to bathroom & flooring as initial suggestions
  const [selectedRenovSpaces, setSelectedRenovSpaces] = useState(['bath', 'flooring']);

  // Current section index & selections
  const [sectionIdx, setSectionIdx] = useState(0);
  const [selections, setSelections] = useState({});
  const [hoveredOpt, setHoveredOpt] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine section list based on mode
  // In renovation mode: strictly filter based on selectedRenovSpaces!
  const activeSectionEntries = mode === 'renovation'
    ? selectedRenovSpaces
        .map(id => RENOVATION_MAP[id])
        .filter(Boolean)
        .map(item => [item.key, item.section])
    : Object.entries(mode === 'interior' ? SECTIONS_INTERIOR : SECTIONS_CONSTRUCTION);

  const sectionMap = Object.fromEntries(activeSectionEntries);
  const sectionKeys = Object.keys(sectionMap);
  const totalSections = Math.max(sectionKeys.length, 1);
  const currentSectionKey = sectionKeys[sectionIdx] || sectionKeys[0];
  const currentSection = sectionMap[currentSectionKey];

  const currentOptions = currentSection ? [
    ...currentSection.options,
    {
      id: `${currentSectionKey}_custom`,
      label: "Custom Specification (Discuss with Architect)",
      desc: "Specify tailored materials or a hybrid aesthetic during direct architectural review.",
      img: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"]
    }
  ] : [];

  const previewImg = currentOptions[hoveredOpt]?.img?.[0];

  useEffect(() => {
    setHoveredOpt(0);
  }, [currentSectionKey]);

  // If sectionIdx gets out of bounds when switching spaces
  useEffect(() => {
    if (sectionIdx >= sectionKeys.length && sectionKeys.length > 0) {
      setSectionIdx(0);
    }
  }, [sectionKeys.length, sectionIdx]);

  // Auto-scroll to top when screen or section changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [screen, sectionIdx]);

  const progressPct = screen === 'sections' 
    ? Math.round(((sectionIdx + 1) / totalSections) * 100)
    : screen === 'visionboard' ? 100 : 15;

  const handleSelectOption = (optId) => {
    setSelections(prev => ({
      ...prev,
      [currentSectionKey]: optId
    }));
  };

  const handleNextSection = () => {
    if (sectionIdx < totalSections - 1) {
      setSectionIdx(i => i + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setScreen('visionboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    if (sectionIdx > 0) {
      setSectionIdx(i => i - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (mode === 'renovation') {
      setScreen('renov_spaces');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onBack) {
      onBack();
    }
  };

  // Price calculations based on mode and scope
  let priceMinNgn = 0;
  let priceMaxNgn = 0;

  if (mode === 'renovation') {
    priceMinNgn = selectedRenovSpaces.reduce((acc, id) => acc + (RENOVATION_MAP[id]?.estMin || 2000000), 0);
    priceMaxNgn = selectedRenovSpaces.reduce((acc, id) => acc + (RENOVATION_MAP[id]?.estMax || 4500000), 0);
    if (priceMinNgn === 0) {
      priceMinNgn = 2500000;
      priceMaxNgn = 5000000;
    }
  } else if (mode === 'construction') {
    priceMinNgn = 85000000;
    priceMaxNgn = 135000000;
  } else {
    // Interior
    priceMinNgn = 14000000;
    priceMaxNgn = 28000000;
  }

  const priceMinUsd = Math.round(priceMinNgn / 1480);
  const priceMaxUsd = Math.round(priceMaxNgn / 1480);

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    const summaryData = {
      mode,
      renovationSpaces: selectedRenovSpaces,
      estimatedRangeNgn: `₦${priceMinNgn.toLocaleString()} – ₦${priceMaxNgn.toLocaleString()}`,
      estimatedRangeUsd: `~$${priceMinUsd.toLocaleString()} – $${priceMaxUsd.toLocaleString()}`,
      selections: Object.entries(selections).map(([key, optId]) => {
        const sec = sectionMap[key];
        const opt = sec?.options.find(o => o.id === optId);
        return {
          section: sec?.label || key,
          choice: opt?.label || 'Custom Specification'
        };
      })
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setScreen('done');
      if (onComplete) onComplete(summaryData);
    }, 600);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#FAF9F6',
      color: '#1E293B',
      fontFamily: 'var(--font-sans)',
      paddingBottom: '80px'
    }}>
      
      {/* ══════════════════════════════════════════════════════════════════
          TOP PERSISTENT CONTROL BAR
          ══════════════════════════════════════════════════════════════════ */}
      <header style={{
        position: 'sticky',
        top: '75px',
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        padding: '0 5%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                backgroundColor: '#FFFFFF',
                color: 'var(--text-title)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <ArrowLeft size={16} />
              <span>Back to Overview</span>
            </button>
          )}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)', fontWeight: 700 }}>
              {mode === 'construction' ? 'House Characteristics Configurator' : mode === 'interior' ? 'Interior Finishes Configurator' : 'Renovation Style Configurator'}
            </span>
            <h2 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-title)', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
              {serviceTitle}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Progress Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '120px', height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: 'var(--accent)', transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
              {screen === 'sections' ? `Step ${sectionIdx + 1}/${totalSections}` : screen === 'visionboard' ? 'Summary Dossier' : '100%'}
            </span>
          </div>

          {screen === 'sections' && (
            <button
              onClick={() => setScreen('visionboard')}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--accent-gold)',
                color: 'var(--accent-gold)',
                padding: '7px 14px',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              View Summary Dossier →
            </button>
          )}
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════════
          SCREEN: RENOVATION SCOPE SELECTOR (Mode === 'renovation' only)
          ══════════════════════════════════════════════════════════════════ */}
      {screen === 'renov_spaces' && (
        <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 5%' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ display: 'inline-block', fontSize: '0.76rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Step 1: Choose What You Want to Renovate
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--accent)', margin: '0 0 12px' }}>
              Select the Specific Spaces to Remodel
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
              Choose only the areas you wish to upgrade. If you choose <strong>Bathrooms</strong>, you will only see bathroom options; if you choose <strong>Flooring</strong>, you will only see flooring options. You will never be forced through unrelated sections.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {RENOVATION_SPACES.map(space => {
              const isSelected = selectedRenovSpaces.includes(space.id);
              const IconComp = SPACE_ICON_MAP[space.id] || Building;
              return (
                <div
                  key={space.id}
                  onClick={() => {
                    setSelectedRenovSpaces(prev => {
                      if (prev.includes(space.id)) {
                        // Keep at least one selected
                        if (prev.length === 1) return prev;
                        return prev.filter(x => x !== space.id);
                      }
                      return [...prev, space.id];
                    });
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                    padding: '22px',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isSelected ? '0 8px 24px rgba(26, 62, 38, 0.12)' : '0 2px 10px rgba(0,0,0,0.02)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? 'var(--accent)' : 'rgba(210, 125, 45, 0.12)',
                      color: isSelected ? '#FFFFFF' : 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComp size={20} />
                    </div>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: isSelected ? 'none' : '2px solid var(--border)',
                      backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700
                    }}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.02rem', color: isSelected ? 'var(--accent)' : 'var(--text-title)', fontWeight: 700, margin: '0 0 6px' }}>
                    {space.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                    {space.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.84rem', color: '#64748B' }}>
              {selectedRenovSpaces.length} {selectedRenovSpaces.length === 1 ? 'Space Selected' : 'Spaces Selected'}
            </span>
            <button
              onClick={() => {
                setSectionIdx(0);
                setScreen('sections');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{ padding: '14px 36px', fontSize: '0.9rem' }}
            >
              Continue to Customize Finishes for Selected Spaces →
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SCREEN: SECTIONS STEP-BY-STEP
          ══════════════════════════════════════════════════════════════════ */}
      {screen === 'sections' && currentSection && (
        <div>
          {/* Horizontal Step Navigation Bar */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border)',
            padding: '0 5%',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            height: '52px'
          }}>
            {mode === 'renovation' && (
              <button
                onClick={() => setScreen('renov_spaces')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#F1F5F9',
                  color: '#475569',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Edit Spaces
              </button>
            )}

            {sectionKeys.map((key, i) => {
              const sec = sectionMap[key];
              const isSelected = !!selections[key];
              const isActive = i === sectionIdx;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSectionIdx(i);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '20px',
                    border: isActive ? '1px solid var(--accent)' : isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border)',
                    backgroundColor: isActive ? 'var(--accent)' : isSelected ? 'rgba(210, 125, 45, 0.08)' : 'transparent',
                    color: isActive ? '#FFFFFF' : isSelected ? 'var(--accent)' : '#64748B',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.18s'
                  }}
                >
                  <span>{sec.icon}</span>
                  <span>{sec.label}</span>
                  {isSelected && <Check size={13} style={{ color: isActive ? '#FFFFFF' : 'var(--accent-gold)' }} />}
                </button>
              );
            })}
          </div>

          {/* Large Hero Preview Banner */}
          <div style={{
            position: 'relative',
            height: '320px',
            overflow: 'hidden',
            backgroundColor: '#0F172A'
          }}>
            {previewImg && (
              <img
                src={previewImg}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.65)',
                  transition: 'opacity 0.4s ease'
                }}
              />
            )}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(7, 12, 9, 0.9) 0%, rgba(7, 12, 9, 0.2) 60%, transparent 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '36px 5%'
            }}>
              <div style={{ maxWidth: '850px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Step {sectionIdx + 1} of {totalSections} &bull; {currentSection.label}
                </span>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.8vw, 2.7rem)', color: '#FFFFFF', margin: '6px 0', lineHeight: 1.15 }}>
                  {currentSection.title}
                </h1>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.82)', fontWeight: 300, lineHeight: 1.5 }}>
                  {currentSection.subtitle}
                </p>
              </div>
            </div>

            {selections[currentSectionKey] && (
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '5%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '6px 14px',
                borderRadius: '4px',
                color: 'var(--accent)',
                fontSize: '0.78rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Check size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>Selected: {currentOptions.find(o => o.id === selections[currentSectionKey])?.label}</span>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          <div style={{ maxWidth: '1280px', margin: '36px auto 0', padding: '0 5%' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {currentOptions.map((opt, i) => {
                const isSelected = selections[currentSectionKey] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    onMouseEnter={() => setHoveredOpt(i)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSelected ? '0 10px 28px rgba(26, 62, 38, 0.15)' : '0 2px 8px rgba(0,0,0,0.03)',
                      transform: isSelected ? 'translateY(-4px)' : 'none',
                      position: 'relative'
                    }}
                  >
                    {/* Image Slideshow Frame */}
                    <div style={{ height: '170px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
                      <SlideshowImg
                        imgs={opt.img}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
                        }}>
                          <Check size={16} />
                        </div>
                      )}
                    </div>

                    <div style={{ padding: '16px' }}>
                      <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', color: isSelected ? 'var(--accent)' : 'var(--text-title)', fontWeight: 700, lineHeight: 1.3 }}>
                        {opt.label}
                      </h4>
                      {opt.desc && (
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: 1.45 }}>
                          {opt.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Navigation Buttons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border)',
              paddingTop: '24px'
            }}>
              <button
                onClick={handlePrevSection}
                style={{
                  padding: '11px 22px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--text-title)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {sectionIdx === 0 && mode === 'renovation' ? '← Back to Space Selector' : '← Previous Section'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  {selections[currentSectionKey] ? 'Choice recorded ✓' : 'Select an option or proceed'}
                </span>
                <button
                  onClick={handleNextSection}
                  className="btn-primary"
                  style={{ padding: '12px 28px', fontSize: '0.86rem' }}
                >
                  {sectionIdx < totalSections - 1 ? 'Next Section →' : 'Review Specification Dossier →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SCREEN: SUMMARY DOSSIER / VISION BOARD + PRICE RANGE + LAND VISIT
          ══════════════════════════════════════════════════════════════════ */}
      {screen === 'visionboard' && (
        <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 5%' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Architectural Concept &amp; Pricing Dossier
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--accent)', margin: '6px 0' }}>
              Your Custom House Specification Dossier
            </h1>
            <p style={{ fontSize: '0.94rem', color: '#64748B', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
              Review your customized finishes, estimated turnkey price range, and next steps below. Our chartered engineers and architects confirm all specifications with an on-site visit.
            </p>
          </div>

          {/* Dynamic Price Range Banner */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '2px solid rgba(210, 125, 45, 0.45)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            padding: '24px 28px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '18px',
            background: 'linear-gradient(135deg, #FAF9F6 0%, #FFFFFF 100%)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <DollarSign size={16} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {mode === 'renovation' ? 'Estimated Renovation Price Range' : mode === 'construction' ? 'Estimated Turnkey Build Price Range' : 'Estimated Interior Fit-Out Range'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '4px 0' }}>
                <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--accent)' }}>
                  ₦{priceMinNgn.toLocaleString()} – ₦{priceMaxNgn.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.92rem', color: '#64748B', fontWeight: 600 }}>
                  (~${priceMinUsd.toLocaleString()} – ${priceMaxUsd.toLocaleString()} USD)
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                {mode === 'renovation'
                  ? `*Accurately estimated for your selected ${sectionKeys.length} renovation ${sectionKeys.length === 1 ? 'space' : 'spaces'} based on current Lagos & Abuja material costs.`
                  : '*Covers architectural drawings, foundation, superstructure, roofing, your custom finishes, labor, and COREN supervision.'}
              </span>
            </div>

            <div style={{
              backgroundColor: 'rgba(26, 62, 38, 0.08)',
              border: '1px solid rgba(26, 62, 38, 0.15)',
              borderRadius: '8px',
              padding: '12px 18px',
              textAlign: 'right'
            }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                Scope Configured
              </span>
              <strong style={{ fontSize: '1.15rem', color: 'var(--accent)' }}>
                {sectionKeys.length} {sectionKeys.length === 1 ? 'Component' : 'Components'} Selected
              </strong>
            </div>
          </div>

          {/* Selected Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '40px'
          }}>
            {sectionKeys.map(key => {
              const sec = sectionMap[key];
              const optId = selections[key];
              const opt = sec?.options.find(o => o.id === optId) || sec?.options[0];
              return (
                <div
                  key={key}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={opt?.img?.[0]}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '8px 12px',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
                      color: '#FFFFFF'
                    }}>
                      <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{sec.icon} {sec.label}</span>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>{opt?.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* On-Site Land / Property Inspection Callout & Action Bar */}
          <div style={{
            backgroundColor: '#111C15',
            borderRadius: '12px',
            padding: '32px 30px',
            color: '#FFFFFF',
            border: '1px solid rgba(210, 125, 45, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            boxShadow: '0 16px 36px rgba(0,0,0,0.2)'
          }}>
            <div style={{ maxWidth: '680px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {mode === 'construction' ? 'Next Step: On-Site Land Inspection' : mode === 'renovation' ? 'Next Step: On-Site Property Evaluation' : 'Next Step: On-Site Spatial Audit'}
                </span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.45rem', fontFamily: 'var(--font-serif)', color: '#FFFFFF' }}>
                {mode === 'construction' 
                  ? 'Physical Land Inspection & Geotechnical Soil Survey'
                  : mode === 'renovation'
                  ? 'Physical On-Site Inspection & Technical Measurements'
                  : 'On-Site Spatial Audit & Precision Laser Measurements'}
              </h3>
              <p style={{ margin: '8px 0 0', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.55 }}>
                {mode === 'construction'
                  ? 'Our registered civil engineers and architects will physically visit your land to inspect soil bearing capacity, survey site topography, verify boundary coordinates, and confirm your final approved Bill of Quantities (BOQ).'
                  : mode === 'renovation'
                  ? 'Our certified renovation team will visit your home to inspect current plumbing and electrical lines, evaluate structural walls, take laser measurements, and deliver your confirmed fixed quotation.'
                  : 'Our lead interior architects will visit your space to verify dimensions, assess natural illumination, and produce your final custom fit-out contract.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setScreen('sections')}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#FFFFFF',
                  padding: '12px 20px',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                ← Adjust Selections
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="btn-primary"
                style={{ padding: '13px 28px', fontSize: '0.88rem', whiteSpace: 'nowrap' }}
              >
                {isSubmitting 
                  ? 'Recording Specifications...' 
                  : mode === 'construction'
                  ? 'Schedule Land Inspection & Confirm Finishes →'
                  : mode === 'renovation'
                  ? 'Schedule On-Site Inspection & Confirm Scope →'
                  : 'Confirm Specifications & Proceed →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SCREEN: DONE & CONFIRMED
          ══════════════════════════════════════════════════════════════════ */}
      {screen === 'done' && (
        <div style={{ maxWidth: '650px', margin: '60px auto 0', padding: '0 5%', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            color: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Specification Dossier Recorded
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--accent)', margin: '8px 0 14px' }}>
            Your House Characteristics Have Been Saved
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
            We have integrated your selected finishes and estimated price range of <strong>₦{priceMinNgn.toLocaleString()} – ₦{priceMaxNgn.toLocaleString()}</strong> into your {serviceTitle} file.
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '32px' }}>
            Our engineering team will reach out immediately to confirm the schedule for the physical on-site visit to your {mode === 'construction' ? 'land/plot' : 'property'}.
          </p>

          <button
            onClick={onBack}
            className="btn-primary"
            style={{ padding: '13px 32px', fontSize: '0.88rem' }}
          >
            Return to Service Overview →
          </button>
        </div>
      )}

    </div>
  );
}
