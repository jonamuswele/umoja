import React, { useState } from 'react';
import { 
  Building, Hammer, Boxes, KeyRound, Shield, Wrench, Cpu, TrendingUp, 
  Banknote, FileCheck, Compass, Palette, Truck, CalendarCheck, Gavel, 
  Users2, Sparkles, Search, ArrowRight, ShieldCheck, MapPin
} from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { getStoredServices } from '../utils/userStorage';

// Map icon string to Lucide icon component
const ICON_MAP = {
  Building: Building,
  Hammer: Hammer,
  Boxes: Boxes,
  KeyRound: KeyRound,
  Shield: Shield,
  Wrench: Wrench,
  Cpu: Cpu,
  TrendingUp: TrendingUp,
  Banknote: Banknote,
  FileCheck: FileCheck,
  Compass: Compass,
  Palette: Palette,
  Truck: Truck,
  CalendarCheck: CalendarCheck,
  Gavel: Gavel,
  Users2: Users2
};

export default function ExploreHub({ onSelectService, services: propServices = null }) {
  const [selectedType, setSelectedType] = useState("all"); // 'all' | 'products' | 'services'
  const [searchQuery, setSearchQuery] = useState("");
  const allServices = propServices || getStoredServices();

  const filteredServices = allServices.filter(s => {
    if (s.status === 'disabled') return false;
    const matchesType = selectedType === "all" ||
                        (selectedType === "products" && s.kind === "product") ||
                        (selectedType === "services" && s.kind === "service");
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.tag && s.tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#FAF9F6',
      paddingBottom: '90px'
    }}>

      {/* ══════════════════════════════════════════════════════════════════════
          1. EXPLORE HERO BANNER
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#070C09',
        position: 'relative',
        overflow: 'hidden',
        padding: '70px 6% 80px',
        color: '#FFFFFF'
      }}>
        {/* Subtle background ambient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(210, 125, 45, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(210, 125, 45, 0.15)',
            border: '1px solid rgba(210, 125, 45, 0.3)',
            padding: '4px 14px',
            borderRadius: '4px',
            color: '#F4BA74',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '16px'
          }}>
            <Sparkles size={13} />
            <span>Verified Real Estate & Infrastructure</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
            fontWeight: 400
          }}>
            Explore Properties & Services
          </h1>

          <p style={{
            fontSize: '1.08rem',
            lineHeight: 1.65,
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '750px',
            margin: '0 0 35px',
            fontWeight: 300
          }}>
            Find verified land, homes, building services, and materials in one place. Explore properties or book professional services with complete confidence.
          </p>

          {/* Search Bar & Stats Counter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            maxWidth: '650px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(8px)',
            borderRadius: '6px',
            padding: '8px 16px',
            boxSizing: 'border-box'
          }}>
            <Search size={18} style={{ color: 'var(--accent-gold)' }} />
            <input
              type="text"
              placeholder="Search, e.g. 'Houses', 'Land', 'Cement', 'Solar'..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-sans)',
                width: '100%'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>



      {/* ══════════════════════════════════════════════════════════════════════
          2. PRIMARY TYPE SELECTOR: PRODUCTS VS SERVICES
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1200px',
        margin: '28px auto 0',
        padding: '0 6%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setSelectedType('all')}
          style={{
            padding: '10px 22px',
            borderRadius: '6px',
            border: selectedType === 'all' ? '2px solid var(--accent)' : '1px solid var(--border)',
            backgroundColor: selectedType === 'all' ? 'var(--accent)' : '#FFFFFF',
            color: selectedType === 'all' ? '#FFFFFF' : 'var(--text-title)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: selectedType === 'all' ? '0 4px 14px rgba(26, 62, 38, 0.18)' : 'none'
          }}
        >
          All
        </button>

        <button
          onClick={() => setSelectedType('products')}
          style={{
            padding: '10px 22px',
            borderRadius: '6px',
            border: selectedType === 'products' ? '2px solid var(--accent)' : '1px solid var(--border)',
            backgroundColor: selectedType === 'products' ? 'var(--accent)' : '#FFFFFF',
            color: selectedType === 'products' ? '#FFFFFF' : 'var(--text-title)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: selectedType === 'products' ? '0 4px 14px rgba(26, 62, 38, 0.18)' : 'none'
          }}
        >
          <span>📦 Properties & Materials</span>
        </button>

        <button
          onClick={() => setSelectedType('services')}
          style={{
            padding: '10px 22px',
            borderRadius: '6px',
            border: selectedType === 'services' ? '2px solid var(--accent)' : '1px solid var(--border)',
            backgroundColor: selectedType === 'services' ? 'var(--accent)' : '#FFFFFF',
            color: selectedType === 'services' ? '#FFFFFF' : 'var(--text-title)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            boxShadow: selectedType === 'services' ? '0 4px 14px rgba(26, 62, 38, 0.18)' : 'none'
          }}
        >
          <span>🛡️ Services</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          4. CARDS GRID
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1200px',
        margin: '30px auto 0',
        padding: '0 6%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {filteredServices.map(service => {
            const IconComponent = ICON_MAP[service.icon] || Building;
            const isProduct = service.kind === 'product';
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  position: 'relative'
                }}
                className="explore-service-card"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(26, 62, 38, 0.12)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                {/* Card Visual Header with Image */}
                <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden' }}>
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.04)',
                      transition: 'transform 0.4s ease'
                    }}
                    className="card-image-zoom"
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(10,20,14,0.7) 100%)'
                  }} />

                  {/* Top Badge: Product vs Service */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '14px',
                    zIndex: 3
                  }}>
                    <span style={{
                      backgroundColor: isProduct ? 'rgba(16, 185, 129, 0.95)' : 'rgba(7, 12, 9, 0.88)',
                      color: isProduct ? '#FFFFFF' : 'var(--accent-gold)',
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: isProduct ? 'none' : '1px solid rgba(210, 125, 45, 0.4)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}>
                      {isProduct ? 'Product' : 'Service'}
                    </span>
                  </div>

                  {/* Floating Icon Circle */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-18px',
                    left: '20px',
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
                    zIndex: 3
                  }}>
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Card Body */}
                <div style={{
                  padding: '28px 20px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.45rem',
                      color: '#1A3E26',
                      margin: '0 0 10px',
                      lineHeight: 1.25,
                      fontWeight: 600
                    }}>
                      {service.title}
                    </h3>

                    <p style={{
                      fontSize: '0.85rem',
                      lineHeight: 1.55,
                      color: '#55635B',
                      margin: '0 0 16px',
                      fontWeight: 300
                    }}>
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Action CTA */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#FAF9F6',
                      padding: '10px 14px',
                      borderRadius: '4px',
                      border: '1px solid #EAE6DB',
                      transition: 'background-color 0.2s ease'
                    }}>
                      <span style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--accent)'
                      }}>
                        {isProduct ? 'Explore Showcase Deck' : 'Contact Us & Reserve'}
                      </span>
                      <ArrowRight size={15} style={{ color: 'var(--accent-gold)' }} />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredServices.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            marginTop: '20px'
          }}>
            <p style={{ fontSize: '1.1rem', color: '#64748B', marginBottom: '14px' }}>
              No services matched your search "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedType("all"); }}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.8rem' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          4. INFRASTRUCTURE SECURITY PLEDGE
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1200px',
        margin: '60px auto 0',
        padding: '0 6%'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid rgba(210, 125, 45, 0.3)',
          padding: '36px 5%',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '35px',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
        }} className="security-pledge-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                The Umoja Security Standard
              </span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              color: 'var(--accent)',
              margin: '0 0 12px',
              fontWeight: 400
            }}>
              Direct Institutional Backing Across All Regions
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#4A564E', lineHeight: 1.65, margin: 0, fontWeight: 300 }}>
              Whether you are acquiring prime residential land, commissioning piling, ordering factory cement trailer loads, or subscribing to home maintenance, Umoja holds all payments in accredited banking escrow until independent verification milestones are fulfilled.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            {[
              { title: "LASRERA Registered", sub: "Lagos State Regulatory Compliance" },
              { title: "NIS Certified Surveyors", sub: "RTK GPS Coordinate Charting" },
              { title: "COREN & NSE Engineers", sub: "Tested Structural Concrete & Steel" },
              { title: "Escrow Banking Trust", sub: "Zero Upfront Financial Vulnerability" }
            ].map((p, i) => (
              <div key={i} style={{
                backgroundColor: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '14px'
              }}>
                <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '4px' }}>
                  {p.title}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: 1.4 }}>
                  {p.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .security-pledge-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>

    </div>
  );
}
