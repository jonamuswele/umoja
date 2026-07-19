import React, { useState, useEffect, useRef } from 'react';
import { Compass, ShieldCheck, Map, Users, ArrowRight, Sparkles, MapPin, Globe, CheckCircle, Lightbulb, Landmark, Building, MessagesSquare, ArrowUpRight, X, UserCheck } from 'lucide-react';

const STATS = [
  { val: "5 Nations", label: "Active land hubs" },
  { val: "100% Vetted", label: "Professional lawyer check" },
  { val: "No Upfront Cost", label: "Verify proof first" },
  { val: "Regional Legal Hubs", label: "Smooth asset transfer" },
];

const PARTNERS = [
  "Verified Surveyor Network",
  "Local Ministry Land Registries",
  "African Legal Advisory Council",
  "Escrow Trust Banking Group",
  "Pan-African Architects Collective"
];

// Interactive Transnational Notifications for the Canvas Ticker
const SIMULATED_TX = [
  { from: "Lagos, Nigeria", to: "Nairobi, Kenya", action: "secured a 2,000 SQM savannah plot" },
  { from: "Kinshasa, DRC", to: "Swakopmund, Namibia", action: "registered an ocean-view estate" },
  { from: "Windhoek, Namibia", to: "Lubumbashi, DRC", action: "vetted a golf course extension lot" },
  { from: "N'Djamena, Chad", to: "Diani Beach, Kenya", action: "locked a coastal eco-villa parcel" },
  { from: "Nairobi, Kenya", to: "Lekki, Nigeria", action: "transferred a gated avenue deed" }
];

// Curated Background Slideshow Images for the Hero Section
const HERO_IMAGES = [
  { url: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80", caption: "Savannah Foothills - Nanyuki, Kenya" },
  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", caption: "White Sand Beach Reserves - Diani, Kenya" },
  { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80", caption: "Riverside Suburbs - Kinshasa, DRC" },
  { url: "https://images.unsplash.com/photo-1599809228728-5a0eebf9c55b?w=1200&q=80", caption: "Atlantic Coastline Enclaves - Swakopmund, Namibia" }
];

// ══════════════════════════════════════════════════════════════════════
// SCROLL-LINKED BRIGHT 3D CANVAS GLOBE
// ══════════════════════════════════════════════════════════════════════
function ScrollLinkedGlobe({ scroll, mouse }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const width = 600;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 175;

    // Build wireframe points of parallels (rings of latitude)
    const parallels = [];
    for (let i = 1; i < 6; i++) {
      const lat = (Math.PI / 6) * i - Math.PI / 2;
      const r = radius * Math.cos(lat);
      const y = radius * Math.sin(lat);
      const ringPoints = [];
      for (let j = 0; j <= 36; j++) {
        const lon = (Math.PI * 2 / 36) * j;
        ringPoints.push({
          x: r * Math.cos(lon),
          y: y,
          z: r * Math.sin(lon)
        });
      }
      parallels.push(ringPoints);
    }

    // Build wireframe points of meridians (rings of longitude)
    const meridians = [];
    for (let i = 0; i < 6; i++) {
      const lon = (Math.PI / 6) * i;
      const ringPoints = [];
      for (let j = 0; j <= 36; j++) {
        const lat = (Math.PI * 2 / 36) * j;
        ringPoints.push({
          x: radius * Math.cos(lat) * Math.cos(lon),
          y: radius * Math.sin(lat),
          z: radius * Math.cos(lat) * Math.sin(lon)
        });
      }
      meridians.push(ringPoints);
    }

    // Cities to plot on the 3D grid
    const cities = [
      { name: "Lagos", lat: 0.11, lon: -0.25 },
      { name: "N'Djamena", lat: 0.23, lon: 0.12 },
      { name: "Kinshasa", lat: -0.08, lon: 0.22 },
      { name: "Nairobi", lat: -0.02, lon: 0.65 },
      { name: "Windhoek", lat: -0.38, lon: 0.32 }
    ];

    const cityNodes = cities.map(c => {
      const cosLat = Math.cos(c.lat);
      return {
        name: c.name,
        x: radius * cosLat * Math.sin(c.lon),
        y: radius * Math.sin(c.lat),
        z: radius * cosLat * Math.cos(c.lon)
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate globe based on Scroll Position (Y) & Mouse coordinates (X/Y)
      const rotY = scroll * 0.0022 + mouse.x * 0.008;
      const rotX = scroll * 0.0006 + mouse.y * 0.008;

      const project = (pt) => {
        const x1 = pt.x * Math.cos(rotY) - pt.z * Math.sin(rotY);
        const z1 = pt.x * Math.sin(rotY) + pt.z * Math.cos(rotY);
        const y2 = pt.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = pt.y * Math.sin(rotX) + z1 * Math.cos(rotX);
        
        const d = 500;
        const f = d / (d + z2);
        return {
          x: centerX + x1 * f,
          y: centerY + y2 * f,
          z: z2
        };
      };

      // Draw parallels
      ctx.strokeStyle = 'rgba(210, 125, 45, 0.28)';
      ctx.lineWidth = 1.2;
      parallels.forEach(ring => {
        ctx.beginPath();
        ring.forEach((pt, idx) => {
          const p = project(pt);
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      });

      // Draw meridians
      meridians.forEach(ring => {
        ctx.beginPath();
        ring.forEach((pt, idx) => {
          const p = project(pt);
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      });

      // Project City nodes
      const projectedCities = cityNodes.map(c => ({
        ...c,
        proj: project(c)
      }));

      // Draw glowing lines between Front nodes
      ctx.strokeStyle = 'rgba(210, 125, 45, 0.72)';
      ctx.lineWidth = 2.2;
      ctx.setLineDash([6, 5]);

      const lagos = projectedCities.find(c => c.name === "Lagos");
      const nairobi = projectedCities.find(c => c.name === "Nairobi");
      const kinshasa = projectedCities.find(c => c.name === "Kinshasa");
      const windhoek = projectedCities.find(c => c.name === "Windhoek");
      const ndjamena = projectedCities.find(c => c.name === "N'Djamena");

      const drawLink = (c1, c2) => {
        if (c1 && c2 && c1.proj.z < 0 && c2.proj.z < 0) {
          ctx.beginPath();
          ctx.moveTo(c1.proj.x, c1.proj.y);
          ctx.quadraticCurveTo(
            (c1.proj.x + c2.proj.x) / 2 - 15,
            (c1.proj.y + c2.proj.y) / 2 - 15,
            c2.proj.x,
            c2.proj.y
          );
          ctx.stroke();
        }
      };

      drawLink(lagos, nairobi);
      drawLink(kinshasa, windhoek);
      drawLink(ndjamena, windhoek);
      ctx.setLineDash([]); 

      // Draw City Nodes & labels
      projectedCities.forEach(c => {
        const p = c.proj;
        const isFront = p.z < 0;
        const opacity = isFront ? 1 : 0.35;

        if (isFront) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10 + Math.sin(Date.now() * 0.004) * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(210, 125, 45, 0.38)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = isFront ? '#FFFFFF' : 'rgba(255, 255, 255, 0.35)';
        ctx.strokeStyle = `rgba(210, 125, 45, ${opacity})`;
        ctx.lineWidth = 2.5;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isFront ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.3)';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText(c.name.toUpperCase(), p.x + 10, p.y - 2);
      });
    };

    let animationFrameId;
    const tick = () => {
      render();
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scroll, mouse]);

  return (
    <canvas 
      ref={canvasRef} 
      width={600} 
      height={600} 
      style={{ width: '100%', height: '100%' }} 
    />
  );
}

export default function Home({ onNavigate }) {
  const [activeTxIdx, setActiveTxIdx] = useState(0);
  const [txVisible, setTxVisible] = useState(true);

  // Sell Land modal state
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [sellForm, setSellForm] = useState({ fullName: '', email: '', phone: '', landCountry: 'Kenya', landSize: '', deedStatus: 'Clean Title', details: '' });

  // Platform Suggestions modal state
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);
  const [suggestionsForm, setSuggestionsForm] = useState({ fullName: '', email: '', category: 'Feature Request', message: '' });

  const handleSellFormChange = (e) => {
    const { name, value } = e.target;
    setSellForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSuggestionsFormChange = (e) => {
    const { name, value } = e.target;
    setSuggestionsForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitSell = (e) => {
    e.preventDefault();
    if (!sellForm.fullName || !sellForm.email || !sellForm.phone) {
      alert("Please fill out your identity details (Name, Email, Phone).");
      return;
    }

    const subject = `[Umoja Terra Seller Application] - Land listing request in ${sellForm.landCountry}`;
    const body = `Hello Umoja Terra Team,

I would like to list my land plot on your pan-African platform. Here are the details of my property:

- Land Location (Country): ${sellForm.landCountry}
- Plot Size / Dimensions: ${sellForm.landSize}
- Title Registry Deed Status: ${sellForm.deedStatus}

My Contact Details:
- Name: ${sellForm.fullName}
- Email: ${sellForm.email}
- Phone: ${sellForm.phone}

Additional Details & Boundaries:
${sellForm.details}

I understand that Umoja Terra conducts rigorous cadastral boundary surveys and registry audits before approving lists.

Thank you,
${sellForm.fullName}`;

    const mailtoUrl = `mailto:listings@umojaterra.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setIsSellModalOpen(false);
    alert("Application recorded! Opening your email client to dispatch your request to the listing desk.");
  };

  const handleSubmitSuggestions = (e) => {
    e.preventDefault();
    if (!suggestionsForm.fullName || !suggestionsForm.email || !suggestionsForm.message) {
      alert("Please fill out your details and suggestions.");
      return;
    }

    const subject = `[Umoja Terra Platform Suggestion] - ${suggestionsForm.category}`;
    const body = `Hello Umoja Terra Team,

I have a feedback suggestion to share regarding the platform experience:

- Category: ${suggestionsForm.category}
- Message:
${suggestionsForm.message}

My Contact Details:
- Name: ${suggestionsForm.fullName}
- Email: ${suggestionsForm.email}

Thank you,
${suggestionsForm.fullName}`;

    const mailtoUrl = `mailto:feedback@umojaterra.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setIsSuggestionsModalOpen(false);
    alert("Feedback recorded! Opening your email client to dispatch your suggestions to our team.");
  };

  // Hero background slideshow image index
  const [heroImageIdx, setHeroImageIdx] = useState(0);

  // Parallax mouse position state
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll position state
  const [scrollPosition, setScrollPosition] = useState(0);

  // Section visibility state (Scroll-Spy)
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    mission: false,
    partners: false,
    proofs: false,
    sell: false,
    community: false
  });

  // Track mouse coordinates for background depth effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 25;
      const y = (clientY - window.innerHeight / 2) / 25;
      setMouseOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track window scroll coordinates for traveling background & active section spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero-sec', 'mission-sec', 'partners-sec', 'proofs-sec', 'sell-sec', 'community-sec'];
      let activeSectionId = 'hero';
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            activeSectionId = id.replace('-sec', '');
          }
        }
      });

      const visibility = {};
      sections.forEach(id => {
        const key = id.replace('-sec', '');
        visibility[key] = (key === activeSectionId);
      });

      setVisibleSections(visibility);
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate simulated transactions
  useEffect(() => {
    const interval = setInterval(() => {
      setTxVisible(false);
      setTimeout(() => {
        setActiveTxIdx(prev => (prev + 1) % SIMULATED_TX.length);
        setTxVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Rotate Hero Background Images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIdx(prev => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Calculate diagonal fixed position (top & left) based on scroll height
  const getBackgroundPosition = (y) => {
    if (y < 400) {
      return { top: '50%', left: '72%' }; // Hero: Center Right
    } else if (y < 1100) {
      return { top: '65%', left: '15%' }; // Mission: Lower Left
    } else if (y < 1900) {
      return { top: '35%', left: '80%' }; // Partners: Upper Right
    } else if (y < 2700) {
      return { top: '68%', left: '12%' }; // Vetting: Lower Left
    } else if (y < 3500) {
      return { top: '38%', left: '85%' }; // Sell Land: Upper Right
    } else {
      return { top: '55%', left: '15%' }; // Community: Middle Left
    }
  };

  const currentTx = SIMULATED_TX[activeTxIdx];
  const bgPos = getBackgroundPosition(scrollPosition);

  return (
    <div 
      style={{ 
        width: '100%', 
        position: 'relative', 
        background: '#070C09', // Deep dark backdrop
        color: '#FFFFFF'
      }}
    >

      <style>{`
        .pulse-ring {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: var(--accent-gold);
          opacity: 0.6;
          animation: pulseGlow 2.5s infinite ease-in-out;
          transform: translate(-50%, -50%);
        }

        .hero-viewport {
          position: relative;
          min-height: calc(100vh - 75px);
          display: flex;
          align-items: center;
          padding: 60px 6%;
          background: transparent;
          box-sizing: border-box;
        }

        /* Full Page Deck Sections */
        .deck-section {
          min-height: calc(100vh - 75px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 6%;
          background: transparent;
          position: relative;
          box-sizing: border-box;
        }

        /* Dynamic Pop-Up Scroll transitions */
        .scroll-trigger-section {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
        }

        .scroll-trigger-section.active {
          opacity: 1;
          transform: translateY(0);
        }

        /* Typography settings */
        .title-large {
          font-family: var(--font-serif);
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }

        .title-medium {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.5vw, 2.4rem);
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 15px;
        }

        .paragraph-large {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .hero-viewport {
            flex-direction: column !important;
            justify-content: center !important;
            padding: 80px 6% 40px !important;
            text-align: center !important;
          }
          .hero-content-wrapper {
            margin-right: 0 !important;
            max-width: 100% !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .fixed-bg-canvas {
            width: 400px !important;
            height: 400px !important;
            opacity: 0.18 !important;
            left: 50% !important;
            top: 50% !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          VIEWPORT-FIXED DIAGONAL TRAVELING BACKGROUND (b-egg.farm Style)
          ══════════════════════════════════════════════════════════════════════ */}
      <div 
        className="fixed-bg-canvas"
        style={{
          position: 'fixed',
          width: '600px',
          height: '600px',
          top: bgPos.top,
          left: bgPos.left,
          transform: `translate3d(calc(-50% + ${mouseOffset.x}px), calc(-50% + ${mouseOffset.y}px), 0)`,
          transition: 'left 1.4s cubic-bezier(0.25, 1, 0.5, 1), top 1.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none',
          zIndex: 3,
          opacity: 0.45
        }}
      >
        <div 
          className="umoja-background-float"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%'
          }}
        >
          <ScrollLinkedGlobe scroll={scrollPosition} mouse={mouseOffset} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO SECTION (id: hero-sec) WITH FULLY VISIBLE BACKGROUND SLIDESHOW
          ══════════════════════════════════════════════════════════════════════ */}
      <div id="hero-sec" className="hero-viewport scroll-snap-target">
        
        {/* Full Viewport Background Image Sequence Slideshow */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
          {HERO_IMAGES.map((img, idx) => {
            const isActive = idx === heroImageIdx;
            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: isActive ? 0.65 : 0,
                  transform: isActive ? 'scale(1)' : 'scale(1.05)',
                  transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out'
                }}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            );
          })}
          {/* Dark Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,15,12,0.45) 0%, rgba(7,12,9,0.85) 100%)',
            zIndex: 2
          }} />
        </div>

        {/* Hero Left Content Column (Progressive staggered fade-in) */}
        <div className={`hero-content-wrapper scroll-trigger-section ${visibleSections.hero ? 'active' : ''}`} style={{ zIndex: 4, maxWidth: '680px' }}>
          <div className="tag-pill" style={{ marginBottom: '18px' }}>
            <Sparkles size={12} style={{ animation: 'spin 5s linear infinite', color: 'var(--accent-gold)' }} />
            <span>Interactive Pan-African Land Hub</span>
          </div>

          <h1 className="title-large">
            Uniting Africa<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>One Vetted Plot</span> at a Time.
          </h1>

          <p className="paragraph-large" style={{ maxWidth: '560px', color: 'rgba(255, 255, 255, 0.88)' }}>
            A digital borderless network enabling Africans to buy verified land in Kenya, DRC, Namibia, Chad, and Nigeria. Pay zero upfront; inspect certified deeds, legal clearances, and physical boundaries first.
          </p>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button className="hero-cta-primary hover-lift" onClick={() => onNavigate('explore')}>
              Explore Available Plots
              <ArrowRight size={14} />
            </button>
            <button className="hero-cta-ghost hover-lift" onClick={() => onNavigate('houses')}>
              Browse Blueprints
            </button>
          </div>
        </div>

        {/* Floating Transaction Ticker Card */}
        <div 
          style={{
            position: 'absolute',
            bottom: '36px',
            right: '6%',
            width: '300px',
            backgroundColor: '#111C15',
            border: '1px solid rgba(210, 125, 45, 0.35)',
            borderRadius: '6px',
            padding: '12px 16px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            opacity: txVisible ? 1 : 0,
            transform: txVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            zIndex: 10
          }}
          className="float-animation"
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(210,125,45,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Compass size={14} style={{ color: 'var(--accent-gold)' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.6rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              LIVE BORDERLESS TRANSACTION
            </span>
            <p style={{ fontSize: '0.75rem', color: '#FFFFFF', fontWeight: 500, lineHeight: 1.35, margin: 0 }}>
              A buyer in <strong>{currentTx.from}</strong> has {currentTx.action} in <strong>{currentTx.to}</strong>.
            </p>
          </div>
        </div>

      </div>

      {/* Stats strip anchored below hero */}
      <div style={{
        background: 'rgba(10, 15, 12, 0.95)',
        borderTop: '1px solid rgba(210,125,45,0.2)',
        borderBottom: '1px solid rgba(210,125,45,0.1)',
        padding: '24px 6%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        position: 'relative',
        zIndex: 5
      }}>
        {STATS.map((s, i) => (
          <div 
            key={i} 
            className="stat-pill"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              flex: '1',
              minWidth: '180px',
              padding: '2px 20px',
              borderLeft: i === 0 ? 'none' : '1px solid rgba(210, 125, 45, 0.15)'
            }}
          >
            <span className="hero-stat-val" style={{
              fontFamily: "var(--font-serif)",
              fontSize: '1.7rem',
              fontWeight: 600,
              color: 'var(--accent-gold)',
              lineHeight: 1.1,
              display: 'block'
            }}>
              {s.val}
            </span>
            <span className="hero-stat-label" style={{
              fontFamily: "var(--font-sans)",
              fontSize: '0.68rem',
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'block'
            }}>
              {s.label}
            </span>
          </div>
        ))}
        <div 
          style={{ 
            marginLeft: 'auto', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '5px 20px',
            borderLeft: '1px solid rgba(210, 125, 45, 0.15)'
          }} 
          className="hero-scroll-hint"
        >
          <Globe size={14} style={{ color: 'var(--accent-gold)' }} />
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>
            Pan-African Vetted Infrastructure
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MISSION & VISION SECTION (id: mission-sec) -> Green / Beige Alternation
          ══════════════════════════════════════════════════════════════════════ */}
      <section id="mission-sec" className="deck-section scroll-snap-target" style={{ zIndex: 5 }}>
        <div className={`scroll-trigger-section ${visibleSections.mission ? 'active' : ''}`} style={{ maxWidth: '1100px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }} className="narrative-grid">
            
            {/* 1. Mission Statement Card: CURRENT GREEN COLOR */}
            <div className="hover-lift" style={{
              backgroundColor: '#111C15',
              border: '1px solid rgba(210,125,45,0.25)',
              borderRadius: '6px',
              padding: '30px 28px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(26,62,38,0.25)',
                border: '1px solid rgba(26,62,38,0.4)',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '16px'
              }}>
                <Compass size={14} style={{ color: '#57B570' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#57B570', letterSpacing: '0.1em' }}>
                  Our Mission
                </span>
              </div>
              <h3 className="title-medium" style={{ color: '#FFFFFF' }}>
                Uniting Africa Through Common Ground
              </h3>
              <p className="paragraph-large" style={{ color: 'rgba(255,255,255,0.72)', marginBottom: 0 }}>
                Our mission is to build a pan-African organization that unites the continent, bringing Africans closer together through shared land ownership and cross-border communities. We enable Africans from the diaspora and across regions to live, collaborate, and invest in each other's spaces, building a united continent together rather than living divided.
              </p>
            </div>

            {/* 2. Vision Statement Card: NEW BEIGE/WARM-WHITE COLOR */}
            <div className="hover-lift" style={{
              backgroundColor: '#FAF6EE',
              border: '1px solid rgba(210,125,45,0.35)',
              borderRadius: '6px',
              padding: '30px 28px',
              boxShadow: '0 15px 35px rgba(26,62,38,0.06)'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(210,125,45,0.08)',
                border: '1px solid rgba(210,125,45,0.2)',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '16px'
              }}>
                <Lightbulb size={14} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)', letterSpacing: '0.1em' }}>
                  Our Vision
                </span>
              </div>
              <h3 className="title-medium" style={{ color: '#1A3E26' }}>
                Purchasing Made Easiest
              </h3>
              <p className="paragraph-large" style={{ color: '#2C3E35', marginBottom: 0 }}>
                Our vision is to make purchasing land and property across the African continent the easiest, most accessible, and most secure process it has ever been. By integrating local legal protections, registered surveying grids, and transparent digital escrow flows, we remove the friction of real estate transactions, creating seamless pathways to continental ownership.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          ESTABLISHED NETWORKS (id: partners-sec) -> Green Card (NO LOCAL SCROLLBAR)
          ══════════════════════════════════════════════════════════════════════ */}
      <section id="partners-sec" className="deck-section scroll-snap-target" style={{ zIndex: 5 }}>
        <div className={`scroll-trigger-section ${visibleSections.partners ? 'active' : ''}`} style={{ maxWidth: '1100px' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            gap: '30px',
            alignItems: 'center',
            backgroundColor: '#111C15',
            border: '1px solid rgba(210,125,45,0.2)',
            borderRadius: '6px',
            padding: '30px 4%',
            boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
          }} className="narrative-grid">
            
            <div>
              <p className="section-subtitle" style={{ fontSize: '0.85rem', marginBottom: '8px', color: 'var(--accent-gold)' }}>Absolute Transition Security</p>
              <h2 className="title-medium" style={{ color: '#FFFFFF' }}>
                Established Networks <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>In Every Country</span>
              </h2>
              <p className="paragraph-large" style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '18px' }}>
                To ensure that land purchases result in secure, legally binding title registrations, we work with a dedicated, **established network of professionals** in each host nation. We partner with surveyors, property lawyers, and corporate notary publics in Kenya, DRC, Namibia, Chad, and Nigeria.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {[
                  "Established networks of surveyors and property lawyers in 5 nations.",
                  "Smooth legal transition of titles directly into the buyer's name.",
                  "Strict local compliance checking against cadastral and registry records."
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={15} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.72)', fontWeight: 300 }}>{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('explore')}
                className="btn-primary hover-lift"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.85rem' }}
              >
                <span>Explore Vetted Lands</span>
                <ArrowUpRight size={12} />
              </button>
            </div>

            <div style={{
              position: 'relative',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
              maxHeight: '220px',
              aspectRatio: '16/10'
            }} className="float-animation">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&q=80"
                alt="Professional Surveyor and Land check"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                backgroundColor: 'rgba(10, 15, 12, 0.95)',
                padding: '10px 14px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Landmark style={{ color: 'var(--accent-gold)', flexShrink: 0 }} size={18} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500, lineHeight: 1.35 }}>
                  Escrow bank accounts ensure that payments are held securely until titles are transition coordinate stamped.
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          VERIFY BEFORE YOU PAY FLOW (id: proofs-sec) -> Beige Card (NO LOCAL SCROLLBAR)
          ══════════════════════════════════════════════════════════════════════ */}
      <section id="proofs-sec" className="deck-section scroll-snap-target" style={{ zIndex: 5 }}>
        <div className={`scroll-trigger-section ${visibleSections.proofs ? 'active' : ''}`} style={{ maxWidth: '950px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <p className="section-subtitle" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)' }}>Zero Risk. Absolute Proof.</p>
            <h2 className="title-medium" style={{ color: '#FFFFFF' }}>
              Get All Proofs Before You Pay
            </h2>
            <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent-gold)', margin: '8px auto 0' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            gap: '30px',
            alignItems: 'center',
            backgroundColor: '#FAF6EE',
            border: '1px solid rgba(210,125,45,0.35)',
            borderRadius: '6px',
            padding: '30px 4%',
            boxShadow: '0 15px 35px rgba(26,62,38,0.06)',
            backdropFilter: 'blur(4px)'
          }} className="credibility-grid hover-lift">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', textAlign: 'center' }}>
              <ShieldCheck size={60} style={{ color: 'var(--accent)' }} className="float-animation" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, color: '#1A3E26' }}>
                Risk-Free Inquiry
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontFamily: "'Courier New', monospace", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Verify First, Transact Later
              </p>
            </div>

            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1A3E26', marginBottom: '10px', fontWeight: 400 }}>
                How We Make Purchasing Effortless
              </h4>
              <p className="paragraph-large" style={{ color: '#2C3E35', marginBottom: '16px' }}>
                We believe you should never pay a single cent without absolute, unshakeable proof of the property's validity. Under our risk-free purchasing flow:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  "Show Interest: Select a plot and register interest with zero commitment.",
                  "Receive Proofs: Get survey plans, beacon layouts, and registry records.",
                  "Independent Check: You check coordinates and registries directly with offices.",
                  "Secure Escrow: Release transaction funds only when title transfer completes."
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
                    <CheckCircle size={14} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: '#2C3E35', fontWeight: 300 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SELLING LAND DUE DILIGENCE (id: sell-sec) -> Green Card (NO LOCAL SCROLLBAR)
          ══════════════════════════════════════════════════════════════════════ */}
      <section id="sell-sec" className="deck-section scroll-snap-target" style={{ zIndex: 5 }}>
        <div className={`scroll-trigger-section ${visibleSections.sell ? 'active' : ''}`} style={{ maxWidth: '1100px' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.25fr',
            gap: '30px',
            alignItems: 'center',
            backgroundColor: '#111C15',
            border: '1px solid rgba(210,125,45,0.2)',
            borderRadius: '6px',
            padding: '30px 4%',
            boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
          }} className="narrative-grid">
            
            <div style={{
              position: 'relative',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
              maxHeight: '220px',
              aspectRatio: '16/10'
            }} className="float-animation">
              <img
                src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=1000&q=80"
                alt="Verified land plot survey map"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,25,20,0.85) 0%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '20px'
              }}>
                <span style={{ color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 550, lineHeight: 1.4 }}>
                  "We do not compromise. If the boundary line is off by a single millimeter, we do not list it."
                </span>
              </div>
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(210,125,45,0.2)',
                border: '1px solid rgba(210,125,45,0.3)',
                padding: '4px 10px',
                borderRadius: '4px',
                marginBottom: '16px'
              }}>
                <Building size={14} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-gold)', letterSpacing: '0.15em' }}>
                  For Land Owners
                </span>
              </div>
              
              <h2 className="title-medium" style={{ color: '#FFFFFF' }}>
                Wish to Sell Land? <br/><span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>List with Umoja Terra</span>
              </h2>
              
              <p className="paragraph-large" style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '16px' }}>
                We seek verified plots in Kenya, DRC, Namibia, Chad, and Nigeria. If you own registered land and want to list it for pan-African buyers, contact us.
              </p>
              
              <p className="paragraph-large" style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '24px' }}>
                **Important Vetting Notice**: We perform **strict and uncompromising due diligence** on all seller requests. We send licensed surveyors to inspect borders and verify registry title records to ensure absolute safety.
              </p>

              <button
                onClick={() => setIsSellModalOpen(true)}
                className="btn-secondary hover-lift"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '10px 22px', fontSize: '0.85rem' }}
              >
                <span>Contact to Sell Land</span>
                <ArrowUpRight size={12} />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          COMMUNITY SUGGESTIONS (id: community-sec) -> Beige Card (NO LOCAL SCROLLBAR)
          ══════════════════════════════════════════════════════════════════════ */}
      <section id="community-sec" className="deck-section scroll-snap-target" style={{ zIndex: 5 }}>
        <div className={`scroll-trigger-section ${visibleSections.community ? 'active' : ''}`} style={{ maxWidth: '950px', textAlign: 'center' }}>
          
          <div style={{
            backgroundColor: '#FAF6EE',
            border: '1px solid rgba(210,125,45,0.35)',
            borderRadius: '6px',
            padding: '40px 6%',
            boxShadow: '0 15px 35px rgba(26,62,38,0.06)',
            backdropFilter: 'blur(4px)'
          }} className="hover-lift">
            <div style={{ display: 'flex', alignItems: 'center', justifycontent: 'center', gap: '8px', marginBottom: '12px', justifyContent: 'center' }}>
              <MessagesSquare size={22} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                User-Driven Growth
              </span>
            </div>

            <h2 className="title-medium" style={{ color: '#1A3E26' }}>
              Building Our Community <span style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>Together</span>
            </h2>
            
            <p className="paragraph-large" style={{ maxWidth: '750px', margin: '0 auto 25px', color: '#2C3E35' }}>
              We don't build this platform in isolation. We want to co-create a strong community around Umoja Terra. We rely on active suggestions from the people using our tools to know what to improve. Tell us what features you need, which countries you would like listed next, or what architectural styles you desire. Let us build the future of unified land ownership together.
            </p>

            <button
              onClick={() => setIsSuggestionsModalOpen(true)}
              className="btn-primary hover-lift"
              style={{ padding: '12px 24px', fontSize: '0.85rem' }}
            >
              Submit Platform Suggestions
            </button>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PARTNERS MARQUEE
          ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'transparent', padding: '40px 6%', position: 'relative', zIndex: 5 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            Vetting Partners & Networks
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '30px'
          }} className="partners-showcase">
            {PARTNERS.map((partner, index) => (
              <div
                key={index}
                className="hover-lift"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.45)',
                  fontStyle: 'italic',
                  padding: '8px 16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '4px',
                  backgroundColor: '#111C15',
                  cursor: 'default',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                }}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive layout CSS */}
      <style>{`
        @media (max-width: 900px) {
          .narrative-grid {
            grid-template-columns: 1fr !important;
            gap: 25px !important;
          }
          .credibility-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 20px 4% !important;
          }
          .partners-showcase {
            gap: 15px !important;
          }
        }
      `}</style>

      {/* Sell Land Pop-up Modal */}
      {isSellModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 15, 12, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(210,125,45,0.25)',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '480px',
            padding: '30px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
            position: 'relative',
            boxSizing: 'border-box',
            textAlign: 'left'
          }}>
            <button 
              onClick={() => setIsSellModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <UserCheck size={18} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Seller Vetting Hub
                </span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: '#1A3E26',
                margin: 0,
                fontWeight: 400
              }}>
                List Land For Sale
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0', fontWeight: 300 }}>
                Submit details to begin boundary audits & surveys.
              </p>
            </div>

            <form onSubmit={handleSubmitSell} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={sellForm.fullName}
                  onChange={handleSellFormChange}
                  placeholder="e.g. Jonathan K."
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={sellForm.email}
                    onChange={handleSellFormChange}
                    placeholder="name@domain.com"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={sellForm.phone}
                    onChange={handleSellFormChange}
                    placeholder="+(Country Code) ..."
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Land Location *
                  </label>
                  <select
                    name="landCountry"
                    value={sellForm.landCountry}
                    onChange={handleSellFormChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      boxSizing: 'border-box',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Kenya">Kenya</option>
                    <option value="DRC">DRC (Congo)</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Chad">Chad</option>
                    <option value="Nigeria">Nigeria</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Plot size / specs *
                  </label>
                  <input
                    type="text"
                    name="landSize"
                    value={sellForm.landSize}
                    onChange={handleSellFormChange}
                    placeholder="e.g. 50x100 ft or 1.5 Acres"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Deed / Title Registry Status *
                </label>
                <select
                  name="deedStatus"
                  value={sellForm.deedStatus}
                  onChange={handleSellFormChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Clean Title">Registered Deed (Clean Title)</option>
                  <option value="Leasehold Deed">Leasehold (99-Year State Lease)</option>
                  <option value="Inherited/Letter of Admin">Inherited (Letter of Admin / Probate)</option>
                  <option value="Unregistered Ancestral">Ancestral / Unregistered Deed</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Boundaries & Property Details
                </label>
                <textarea
                  name="details"
                  value={sellForm.details}
                  onChange={handleSellFormChange}
                  placeholder="Describe location, key features, and any landmarks..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    minHeight: '80px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsSellModalOpen(false)}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    color: '#64748B',
                    border: '1px solid #CBD5E1',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    flex: 1.5,
                    backgroundColor: 'var(--accent)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer'
                  }}
                >
                  Apply to List
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Platform Suggestions Pop-up Modal */}
      {isSuggestionsModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 15, 12, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(210,125,45,0.25)',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '480px',
            padding: '30px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
            position: 'relative',
            boxSizing: 'border-box',
            textAlign: 'left'
          }}>
            <button 
              onClick={() => setIsSuggestionsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Lightbulb size={18} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Community Co-Creation
                </span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: '#1A3E26',
                margin: 0,
                fontWeight: 400
              }}>
                Platform Feedback
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0', fontWeight: 300 }}>
                Suggest features, countries, or styles to co-develop Umoja Terra.
              </p>
            </div>

            <form onSubmit={handleSubmitSuggestions} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={suggestionsForm.fullName}
                  onChange={handleSuggestionsFormChange}
                  placeholder="e.g. Jonathan K."
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={suggestionsForm.email}
                  onChange={handleSuggestionsFormChange}
                  placeholder="name@domain.com"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Category of Suggestion *
                </label>
                <select
                  name="category"
                  value={suggestionsForm.category}
                  onChange={handleSuggestionsFormChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Feature Request">New Platform Feature / Tool</option>
                  <option value="Country Request">List New Destination Country</option>
                  <option value="Architecture Style">New Blueprint Model Suggestion</option>
                  <option value="General Feedback">General Usability / Bug Report</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Your Suggestion & Message *
                </label>
                <textarea
                  name="message"
                  value={suggestionsForm.message}
                  onChange={handleSuggestionsFormChange}
                  placeholder="Describe your idea or request in detail..."
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    minHeight: '100px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsSuggestionsModalOpen(false)}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    color: '#64748B',
                    border: '1px solid #CBD5E1',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    flex: 1.5,
                    backgroundColor: 'var(--accent)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: 'pointer'
                  }}
                >
                  Send Suggestions
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
