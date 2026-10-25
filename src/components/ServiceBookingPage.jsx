import ConstructionSuite from './ConstructionSuite';
import HouseFeaturesConfigurator from './HouseFeaturesConfigurator';
import RepairsRemodelingSection from './RepairsRemodelingSection';
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, Clock, MapPin, CheckCircle, Shield, 
  Send, Sparkles, Phone, Mail, User, Check, CalendarCheck, 
  Building, ChevronLeft, ChevronRight, FileText, AlertCircle,
  Play, Crosshair, Navigation, X, Image as ImageIcon,
  Layers, Hammer, CheckSquare, Truck, ShieldCheck, Award
} from 'lucide-react';

import exteriorVilla from '../assets/exterior_villa.png';
import livingLoungeImg from '../assets/interior/cdn.jfif';
import kitchenImg from '../assets/interior/cbp.jfif';
import carreauxImg from '../assets/carreaux.jfif';
import facadeBefore from '../assets/before-after/facade_before.jpg';
import facadeAfter from '../assets/before-after/facade_after.jpg';

// ══════════════════════════════════════════════════════════════════════
// 1. DICTIONARY OF ACTIVITY PHOTOS & TAILORED SERVICE DATA
// ══════════════════════════════════════════════════════════════════════
const SERVICE_ACTIVITIES = {
  'build-from-scratch': [
    { img: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=1000&q=80", caption: "Rotary rig driving reinforced concrete foundation piles into waterlogged Lagos terrain", label: "Deep Piling" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Baustahl_-_construction_steel.jpg", caption: "High-yield 16mm/12mm TMT rebar reinforcement and suspended slab decking alignment", label: "Decking Slab" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Concrete_Masonry_blocks.jpg", caption: "On-site slump test and laboratory Grade 30 concrete cube crush verification", label: "Crush Test" },
    { img: exteriorVilla, caption: "Completed contemporary 4-bedroom detached duplex delivered under escrow", label: "Turnkey Finish" }
  ],
  'home-renovation': [
    { img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80", caption: "Controlled structural masonry knock-down and steel lintel reinforcement", label: "Wall Removal" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/PVC_plumbing_fittings_in_Awka.jpg", caption: "Complete rip-out and replacement of dated plumbing with pressure-tested PPR manifolds", label: "Re-Plumbing" },
    { img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1000&q=80", caption: "Precision drywall alignment, Italian damp-proof screeding putty, and architectural finishes", label: "Interior Framing" },
    { img: exteriorVilla, caption: "Fully upgraded contemporary facade with dark stone cladding, glass balconies & warm LEDs", label: "Turnkey Handover" }
  ],
  'interior-finishing': [
    { img: carreauxImg, caption: "Precision laser leveling for Spanish 120x60cm high-gloss porcelain tiles", label: "Laser Tiling" },
    { img: kitchenImg, caption: "Custom soft-close acrylic kitchen cabinetry with quartz waterfall island", label: "Fitted Kitchen" },
    { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80", caption: "Acoustic fluted wall paneling with integrated recessed warm LED architectural lighting", label: "Wall Paneling" },
    { img: livingLoungeImg, caption: "Turnkey staged master penthouse with curated luxury furnishing and artwork", label: "Staging" }
  ],
  'home-services': [
    { img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&q=80", caption: "Industrial high-gloss marble buffing and tile scrubbing on-site in Lekki", label: "Floor Polishing" },
    { img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1000&q=80", caption: "Full post-construction deep clean team sanitizing windows, tracks & cabinetry", label: "Deep Sanitizing" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/1/1d/PVC_plumbing_fittings_in_Awka.jpg", caption: "Certified master plumber running digital hydrostatic pressure line audit", label: "Plumbing Audit" },
    { img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&q=80", caption: "HVAC cooling technician testing compressor gas pressure and coils", label: "AC Servicing" },
    { img: livingLoungeImg, caption: "Completed pristine luxury living room ready for immediate handover", label: "Final Result" }
  ],
  'land-verification': [
    { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80", caption: "Licensed surveyor setting up dual-frequency GNSS RTK rover on site", label: "GPS Surveying" },
    { img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1000&q=80", caption: "Drone boundary perimeter sweep capturing 4K aerial orthophoto map", label: "Drone Mapping" },
    { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80", caption: "Surveyor General charting room checking coordinates against state masterplan", label: "Alausa Charting" },
    { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80", caption: "Demarcated concrete beacon stone with official registered registration stamp", label: "Beacon Verification" }
  ],
  'construction-services': [
    { img: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=1000&q=80", caption: "Hydraulic rotary rig driving reinforced concrete foundation piles into swamp soil", label: "Deep Piling" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Baustahl_-_construction_steel.jpg", caption: "Reinforced steel rebar decking and formwork alignment before casting", label: "Superstructure" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Concrete_Masonry_blocks.jpg", caption: "Laboratory concrete crush testing verifying Grade 30 load-bearing compliance", label: "Lab Crush Test" },
    { img: exteriorVilla, caption: "Completed contemporary 4-bedroom terrace duplex delivered under escrow", label: "Completed Build" }
  ],
  'interior-design': [
    { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1000&q=80", caption: "Architect dimensioning bare apartment shell for 3D photorealistic render", label: "3D Space Planning" },
    { img: kitchenImg, caption: "Precision installation of custom Italian acrylic fitted kitchen & island", label: "Kitchen Joinery" },
    { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=80", caption: "Acoustic fluted wall paneling with integrated recessed warm LED architectural lighting", label: "Wall Finishes" },
    { img: livingLoungeImg, caption: "Fully staged penthouse lounge with bespoke curated Afro-modern furnishings", label: "Final Staging" }
  ],
  'legal-documentation': [
    { img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1000&q=80", caption: "Accredited SAN legal counsel stamping official Deed of Assignment", label: "Deed Stamping" },
    { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80", caption: "Lands registry physical file search to certify zero litigation or government caveat", label: "Title Search" },
    { img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&q=80", caption: "Official Lagos State Governor's Consent endorsement certificate with seal", label: "Governor's Consent" }
  ],
  'moving-services': [
    { img: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1000&q=80", caption: "Professional packing crew wrapping fragile glassware and electronics in bubble wrap", label: "Secure Packing" },
    { img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80", caption: "Loading sealed weatherproof 30-ton haulage truck with padded furniture blankets", label: "Truck Loading" },
    { img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1000&q=80", caption: "Direct interstate door-to-door delivery with live GPS route tracking", label: "Transit Dispatch" }
  ],
  'property-maintenance': [
    { img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1000&q=80", caption: "Routine diesel generator diagnostics & servicing by certified technician", label: "Generator Care" },
    { img: "https://upload.wikimedia.org/wikipedia/commons/3/31/Dji_fly_20230602_13826_PM_27_1719032149374_photo_optimized.jpg", caption: "Solar hybrid inverter load balancing and lithium battery cell diagnostics", label: "Solar Inverter" },
    { img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&q=80", caption: "Industrial power pressure washing of exterior paving and perimeter drainage", label: "Facility Wash" }
  ]
};

// ══════════════════════════════════════════════════════════════════════
// 2. INTERACTIVE BEFORE & AFTER SLIDER (Draggable Vertical Line + Multi-Scene)
// ══════════════════════════════════════════════════════════════════════
function BeforeAfterSlider({ beforeImg, afterImg, beforeLabel, afterLabel, scenes }) {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const hasScenes = Array.isArray(scenes) && scenes.length > 0;
  const currentScene = hasScenes ? scenes[activeSceneIdx] : null;

  const currentBeforeImg = currentScene ? currentScene.beforeImg : beforeImg;
  const currentAfterImg = currentScene ? currentScene.afterImg : afterImg;
  const currentBeforeLabel = currentScene ? currentScene.beforeLabel : (beforeLabel || "BEFORE");
  const currentAfterLabel = currentScene ? currentScene.afterLabel : (afterLabel || "AFTER");

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Interactive Proof: Before vs After Transformation
        </span>
        <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
          Drag or click the vertical bar to compare
        </span>
      </div>

      {/* Multi-Scene Selector Pill Buttons */}
      {hasScenes && scenes.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {scenes.map((scene, idx) => {
            const isSelected = activeSceneIdx === idx;
            return (
              <button
                key={scene.id || idx}
                onClick={() => {
                  setActiveSceneIdx(idx);
                  setSliderPos(50);
                }}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                  backgroundColor: isSelected ? 'var(--accent)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-title)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isSelected ? '0 2px 8px rgba(26, 62, 38, 0.2)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{scene.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '390px',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
          userSelect: 'none',
          cursor: 'ew-resize',
          border: '2px solid rgba(210, 125, 45, 0.4)',
          backgroundColor: '#070C09'
        }}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onMouseMove={(e) => isDragging.current && updatePosition(e.clientX)}
        onTouchMove={(e) => e.touches?.[0] && updatePosition(e.touches[0].clientX)}
        onClick={(e) => updatePosition(e.clientX)}
      >
        {/* AFTER (Bottom Layer) */}
        <img
          src={currentAfterImg}
          alt="After Transformation"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        <span style={{
          position: 'absolute',
          top: '14px',
          right: '16px',
          backgroundColor: 'rgba(26, 62, 38, 0.92)',
          color: '#FFFFFF',
          padding: '5px 12px',
          borderRadius: '4px',
          fontSize: '0.74rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          zIndex: 2
        }}>
          {currentAfterLabel}
        </span>

        {/* BEFORE (Top Layer clipped by sliderPos width) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: `${sliderPos}%`,
          overflow: 'hidden',
          borderRight: '3px solid #FFFFFF'
        }}>
          <img
            src={currentBeforeImg}
            alt="Before Transformation"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw',
              maxWidth: 'none',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        <span style={{
          position: 'absolute',
          top: '14px',
          left: '16px',
          backgroundColor: 'rgba(7, 12, 9, 0.92)',
          color: 'var(--accent-gold)',
          padding: '5px 12px',
          borderRadius: '4px',
          fontSize: '0.74rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          zIndex: 2
        }}>
          {currentBeforeLabel}
        </span>

        {/* DRAGGABLE DIVIDER LINE & CIRCULAR HANDLE */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sliderPos}%`,
          width: '4px',
          backgroundColor: '#FFFFFF',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 4,
          boxShadow: '0 0 14px rgba(0,0,0,0.6)'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-gold)',
            border: '3px solid #FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#131F17',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            fontSize: '0.82rem',
            fontWeight: 900
          }}>
            ⇄
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 3. PILED / STACKED PHOTO COLLAGE WIDGET (Clickable Pop-Up Trigger)
// ══════════════════════════════════════════════════════════════════════
function PiledPhotoStack({ photos, title, onOpenGallery }) {
  if (!photos || photos.length === 0) return null;
  const previewList = photos.slice(0, 4);

  const rotations = [-5, 4, -2, 3];
  const translates = [
    { x: -16, y: 6 },
    { x: 18, y: -6 },
    { x: -6, y: -4 },
    { x: 0, y: 0 }
  ];

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Activity Photos Stack (Field Proof)
        </span>
        <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
          Click pile to open pop-up album ({photos.length} Photos)
        </span>
      </div>

      <div 
        onClick={onOpenGallery}
        style={{
          position: 'relative',
          height: '270px',
          width: '100%',
          maxWidth: '440px',
          margin: '0 auto',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px'
        }}
        className="photo-pile-container"
      >
        {previewList.map((item, idx) => {
          const rot = rotations[idx % rotations.length];
          const tr = translates[idx % translates.length];
          const isTop = idx === previewList.length - 1;

          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                width: '82%',
                height: '210px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                padding: '7px 7px 22px',
                boxShadow: isTop 
                  ? '0 20px 45px rgba(0,0,0,0.3)' 
                  : '0 10px 24px rgba(0,0,0,0.18)',
                border: '1px solid rgba(0,0,0,0.1)',
                transform: `rotate(${rot}deg) translate(${tr.x}px, ${tr.y}px)`,
                transition: 'all 0.3s cubic-bezier(0.2, 1, 0.3, 1)',
                zIndex: idx + 1,
                overflow: 'hidden'
              }}
              className="piled-photo-card"
            >
              <img
                src={item.img}
                alt={item.caption || title}
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  filter: 'contrast(1.05)'
                }}
              />
              <span style={{
                display: 'block',
                marginTop: '4px',
                fontSize: '0.7rem',
                color: '#475569',
                fontWeight: 600,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.label || item.caption}
              </span>
            </div>
          );
        })}

        {/* Floating Clickable Badge */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          backgroundColor: 'rgba(7, 12, 9, 0.92)',
          color: 'var(--accent-gold)',
          border: '1px solid rgba(210, 125, 45, 0.4)',
          borderRadius: '20px',
          padding: '6px 16px',
          fontSize: '0.76rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          zIndex: 10,
          boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(6px)'
        }}>
          <ImageIcon size={14} />
          <span>Tap Pile to View {photos.length} Activity Photos</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 4. ACTIVITY GALLERY LIGHTBOX POP-UP MODAL
// ══════════════════════════════════════════════════════════════════════
function ActivityGalleryModal({ photos, title, initialIndex = 0, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIdx(prev => (prev + 1) % photos.length);
      if (e.key === 'ArrowLeft') setCurrentIdx(prev => (prev - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photos.length, onClose]);

  if (!photos || photos.length === 0) return null;
  const currentPhoto = photos[currentIdx];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 10, 7, 0.92)',
      backdropFilter: 'blur(10px)',
      zIndex: 1200,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <div>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Official Activity Album • {title}
          </span>
          <h4 style={{ margin: 0, color: '#FFFFFF', fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>
            Photo {currentIdx + 1} of {photos.length}
          </h4>
        </div>

        <button
          onClick={onClose}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Close (Esc)"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px 0',
        overflow: 'hidden'
      }}>
        <img
          src={currentPhoto.img}
          alt={currentPhoto.caption}
          style={{
            maxWidth: '100%',
            maxHeight: 'calc(100vh - 200px)',
            objectFit: 'contain',
            borderRadius: '8px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
          }}
        />

        {/* Carousel Controls */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIdx(prev => (prev - 1 + photos.length) % photos.length)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.65)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => setCurrentIdx(prev => (prev + 1) % photos.length)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.65)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Caption & Thumbnails */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <p style={{
          color: '#E2E8F0',
          fontSize: '0.9rem',
          maxWidth: '750px',
          margin: '0 auto 14px',
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: '6px 16px',
          borderRadius: '20px',
          display: 'inline-block'
        }}>
          {currentPhoto.caption}
        </p>

        {/* Thumbnail row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px'
        }}>
          {photos.map((p, i) => (
            <img
              key={i}
              src={p.img}
              alt=""
              onClick={() => setCurrentIdx(i)}
              style={{
                width: '52px',
                height: '38px',
                objectFit: 'cover',
                borderRadius: '4px',
                cursor: 'pointer',
                border: i === currentIdx ? '2px solid var(--accent-gold)' : '2px solid transparent',
                opacity: i === currentIdx ? 1 : 0.5,
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 5. RESERVATION FORM AS A POP-UP MODAL (Clean, Frictionless)
// ══════════════════════════════════════════════════════════════════════
function ReservationModal({ 
  service, 
  packages, 
  onClose, 
  onSuccess 
}) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("11:30 AM - 01:30 PM");
  const [selectedPackage, setSelectedPackage] = useState(packages[0]?.name || "Standard Consultation");

  // Location (Manual + GPS)
  const [location, setLocation] = useState("");
  const [stateName, setStateName] = useState("Lagos State");
  const [gpsCoordinates, setGpsCoordinates] = useState(null);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsError, setGpsError] = useState(null);

  // Contact info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const timeSlots = [
    "09:00 AM - 11:00 AM (Morning)",
    "11:30 AM - 01:30 PM (Midday)",
    "02:00 PM - 04:00 PM (Afternoon)",
    "04:30 PM - 06:30 PM (Evening)"
  ];

  const quickLocations = [
    "Plot 14, Admiralty Way, Lekki Phase 1, Lagos",
    "Atlantic Bay Corridor, Epe, Lagos",
    "Maitama Extension, Abuja FCT",
    "GRA Phase 2, Port Harcourt",
    "Banana Island, Ikoyi, Lagos"
  ];

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
        if (!location.trim()) {
          setLocation(`Site Pin: ${coords.lat}° N, ${coords.lng}° E`);
        }
      },
      () => {
        setIsDetectingGps(false);
        setGpsError("GPS permission denied or unavailable. You can type your street address.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleFillDemo = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow);
    setSelectedTimeSlot("11:30 AM - 01:30 PM");
    setLocation("Plot 14, Block 8, Admiralty Way, Lekki Phase 1");
    setStateName("Lagos State");
    setGpsCoordinates({ lat: "6.4281", lng: "3.4219", accuracy: 4 });
    setFullName("Dr. Olumide Adeleke");
    setEmail("olumide.adeleke@gmail.com");
    setPhone("+234 803 452 9811");
    setNotes("Gate pass authorized with estate guardhouse. Survey beacon coordinates ready.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !location) {
      alert("Please enter your name, email, and location.");
      return;
    }
    const ref = `UMJ-${Math.floor(100000 + Math.random() * 900000)}`;
    onSuccess({
      bookingRef: ref,
      fullName,
      email,
      phone,
      location,
      stateName,
      gpsCoordinates,
      selectedDate,
      selectedTimeSlot,
      selectedPackage
    });
  };

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 10, 7, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        maxWidth: '780px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
        border: '1px solid rgba(210,125,45,0.3)',
        padding: '28px 24px',
        boxSizing: 'border-box',
        position: 'relative'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Service Reservation Modal
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--accent)', margin: '2px 0 0' }}>
              Reserve: {service.title}
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleFillDemo}
              style={{
                backgroundColor: 'rgba(210, 125, 45, 0.1)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(210, 125, 45, 0.4)',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Sparkles size={12} />
              <span>Fill Demo</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 1. Package Select */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              1. Choose Option
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {packages.map((pkg, idx) => {
                const isChosen = selectedPackage === pkg.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedPackage(pkg.name)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      border: isChosen ? '2px solid var(--accent)' : '1px solid var(--border)',
                      backgroundColor: isChosen ? 'rgba(26, 62, 38, 0.04)' : '#FAF9F6',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: isChosen ? 'var(--accent)' : '#1E293B', display: 'block' }}>
                        {pkg.name}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{pkg.desc}</span>
                    </div>
                    {isChosen && <CheckCircle size={16} style={{ color: 'var(--accent)' }} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Location: Address + Device GPS */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                2. Put Location (Address + GPS Precision) *
              </label>
              <button
                type="button"
                onClick={handleDetectGps}
                disabled={isDetectingGps}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-gold)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Crosshair size={12} />
                <span>{isDetectingGps ? "Detecting..." : (gpsCoordinates ? `GPS: ${gpsCoordinates.lat}, ${gpsCoordinates.lng}` : "📍 Use Device GPS")}</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', marginBottom: '6px' }}>
              <input
                type="text"
                required
                placeholder="Type street address, estate, or landmark"
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{
                  padding: '9px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '0.84rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
              <select
                value={stateName}
                onChange={e => setStateName(e.target.value)}
                style={{
                  padding: '9px 8px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  fontSize: '0.84rem',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Lagos State">Lagos State</option>
                <option value="Abuja FCT">Abuja FCT</option>
                <option value="Rivers State">Rivers State</option>
                <option value="Ogun State">Ogun State</option>
                <option value="Oyo State">Oyo State</option>
              </select>
            </div>

            {/* Quick chips */}
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {quickLocations.map((loc, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLocation(loc)}
                  style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: location === loc ? 'var(--accent)' : '#F1F5F9',
                    color: location === loc ? '#FFFFFF' : '#334155',
                    cursor: 'pointer'
                  }}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Calendar & Time Window */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              3. Select Calendar Date & Time Slot *
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
              {/* Mini Calendar */}
              <div style={{ backgroundColor: '#FAF9F6', padding: '12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', display: 'block', marginBottom: '6px' }}>
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', textAlign: 'center' }}>
                  {Array.from({ length: firstDayIndex }).map((_, i) => <div key={i} />)}
                  {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
                    const dayNumber = dayIndex + 1;
                    const dateObj = new Date(currentYear, currentMonth, dayNumber);
                    const isPast = dateObj.setHours(0,0,0,0) < today.setHours(0,0,0,0);
                    const isSelected = selectedDate && selectedDate.getDate() === dayNumber;

                    return (
                      <button
                        key={dayNumber}
                        type="button"
                        disabled={isPast}
                        onClick={() => setSelectedDate(new Date(currentYear, currentMonth, dayNumber))}
                        style={{
                          aspectRatio: '1',
                          borderRadius: '3px',
                          border: isSelected ? '1px solid var(--accent-gold)' : 'none',
                          backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                          color: isSelected ? '#FFFFFF' : (isPast ? '#CBD5E1' : '#1E293B'),
                          fontSize: '0.74rem',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: isPast ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {dayNumber}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {timeSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '4px',
                      border: selectedTimeSlot === slot ? '2px solid var(--accent)' : '1px solid var(--border)',
                      backgroundColor: selectedTimeSlot === slot ? 'rgba(26,62,38,0.06)' : '#FAF9F6',
                      color: selectedTimeSlot === slot ? 'var(--accent)' : '#334155',
                      fontSize: '0.75rem',
                      fontWeight: selectedTimeSlot === slot ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Contact Details (Email confirmation) */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              4. Contact Info (We Will Email You Immediately) *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '8px' }}>
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                style={{ padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
              />
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
              />
              <input
                type="tel"
                required
                placeholder="Phone / WhatsApp *"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
              />
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
              📧 Instant email confirmation & calendar pass sent upon booking.
            </span>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.85rem' }}
            >
              Confirm Reservation & Send Pass
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 6. MAIN SERVICE BOOKING PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════
export default function ServiceBookingPage({ service: rawService, customService, onBackToHub }) {
  const service = customService || rawService;
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [isRenovationConfiguratorOpen, setIsRenovationConfiguratorOpen] = useState(false);
  const [isConstructionVisualizerOpen, setIsConstructionVisualizerOpen] = useState(false);

  // Auto-scroll to top whenever visualizer opens/closes or service changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [isConstructionVisualizerOpen, isRenovationConfiguratorOpen, service?.id]);

  // If user launched the dedicated construction visualizer, render it as its own full page
  if (isConstructionVisualizerOpen) {
    return (
      <HouseFeaturesConfigurator
        mode="construction"
        serviceTitle="Build Your House - Finishes Visualizer"
        onBack={() => setIsConstructionVisualizerOpen(false)}
        onComplete={(dossier) => {
          setIsConstructionVisualizerOpen(false);
          setIsReservationOpen(true);
        }}
      />
    );
  }

  // If user launched the dedicated renovation configurator, render it full page
  if (isRenovationConfiguratorOpen) {
    return (
      <HouseFeaturesConfigurator
        mode="renovation"
        serviceTitle="Home Renovation & Remodeling"
        onBack={() => setIsRenovationConfiguratorOpen(false)}
        onComplete={(dossier) => {
          setIsRenovationConfiguratorOpen(false);
          setIsReservationOpen(true);
        }}
      />
    );
  }

  const isBuildFromScratch = service.id === 'build-from-scratch' || service.id === 'construction-services';

  // Dedicated layout for "Build Your House From Scratch":
  // A way to the visualizer, and under it choosing what part of construction you need help with or write an inquiry.
  // NOTHING ELSE (no packages strip, no templates of houses, no generic reservation banner).
  if (isBuildFromScratch) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAF9F6', paddingBottom: '120px' }}>
        {/* Sticky Top Sub-Bar */}
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
            {service.title}
          </h2>
        </div>

        {/* Core Content: Way to Visualizer + Construction Scope Selection + Inquiry Form */}
        <div style={{ maxWidth: '1140px', margin: '36px auto 0', padding: '0 5%' }}>
          <ConstructionSuite
            onOpenVisualizer={() => setIsConstructionVisualizerOpen(true)}
          />
        </div>

        {/* Pop-up modal if requested */}
        {isReservationOpen && (
          <ReservationModal
            service={service}
            onClose={() => setIsReservationOpen(false)}
            onConfirm={(data) => {
              setIsReservationOpen(false);
              setConfirmationData(data);
            }}
          />
        )}
      </div>
    );
  }

  // Activity photos for this service
  const activityPhotos = SERVICE_ACTIVITIES[service.id] || [
    { img: service.heroImage, caption: `${service.title} accredited on-ground execution`, label: "Field Operations" },
    { img: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=1000&q=80", caption: "Certified engineering equipment on site", label: "Equipment" },
    { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&q=80", caption: "Direct site survey with registered coordinates", label: "Coordinates" },
    { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80", caption: "Completed project sign-off under Umoja escrow", label: "Sign-Off" }
  ];

  const packages = service.bookingPackages || [
    { name: `${service.title} - Full On-Site Assessment`, desc: "Comprehensive physical visit and official report.", duration: "Standard Visit" },
    { name: `${service.title} - Priority Express (24-Hour)`, desc: "Expedited execution with dedicated team.", duration: "24-Hour Turnaround" }
  ];

  const beforeAfter = service.beforeAfter || {
    beforeImg: facadeBefore,
    afterImg: facadeAfter,
    beforeLabel: "Before Certified Umoja Service",
    afterLabel: "After Completion & Handover"
  };

  const adVideoUrl = service.adVideo || "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-cleaning-a-room-41982-large.mp4";

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAF9F6', paddingBottom: '120px' }}>
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. STICKY TOP SUB-BAR
          ══════════════════════════════════════════════════════════════════════ */}
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
          {service.title}
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. SERVICE HERO BANNER
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#070C09',
        color: '#FFFFFF',
        padding: '55px 6% 65px',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: service?.heroImage ? `linear-gradient(to right, rgba(7, 12, 9, 0.94) 0%, rgba(7, 12, 9, 0.8) 60%, rgba(7, 12, 9, 0.5) 100%), url(${service.heroImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {!service?.heroImage && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(210, 125, 45, 0.2) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />
        )}

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(210, 125, 45, 0.2)',
            border: `1px solid ${service?.badgeColor ? `${service.badgeColor}66` : 'rgba(210, 125, 45, 0.4)'}`,
            padding: '4px 14px',
            borderRadius: '20px',
            color: service?.badgeColor || '#F4BA74',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '14px'
          }}>
            <ShieldCheck size={14} />
            <span>{service.badgeText || service.badge || 'Verified Platform Service'}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.3rem, 4.8vw, 3.6rem)',
            fontWeight: 400,
            margin: '0 0 16px',
            lineHeight: 1.15,
            color: service?.textColor || '#FFFFFF'
          }}>
            {service.heroHeadline || service.title}
          </h1>

          <p style={{
            fontSize: '1.08rem',
            lineHeight: 1.65,
            color: service?.subtitleColor || 'rgba(255, 255, 255, 0.88)',
            maxWidth: '820px',
            margin: '0 0 28px',
            fontWeight: 300
          }}>
            {service.heroSubtitle || service.shortDesc}
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            {service.id === 'home-renovation' ? (
              <button
                onClick={() => setIsRenovationConfiguratorOpen(true)}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Sparkles size={16} />
                <span>Launch Remodeling Visualizer (Full Page) →</span>
              </button>
            ) : (
              <button
                onClick={() => setIsReservationOpen(true)}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <CalendarCheck size={16} />
                <span>Open Reservation Form (Pop-Up)</span>
              </button>
            )}

            <button
              onClick={() => setIsGalleryOpen(true)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.25)',
                padding: '12px 20px',
                borderRadius: '4px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ImageIcon size={16} />
              <span>See Activity Photos ({activityPhotos.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3. DISTINCTIVE SERVICE LAYOUT & ACTIVITIES SHOWCASE
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 6%' }}>
        
        {/* TWO-COLUMN GRID: VIDEO ADVERTISEMENT + PILED PHOTO COLLAGE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>
          {/* Column 1: Video Advertisement */}
          <div>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
              Service Video Advertisement & Overview
            </span>
            <div style={{
              borderRadius: '10px',
              border: '2px solid rgba(210, 125, 45, 0.4)',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0,0,0,0.25)',
              aspectRatio: '16/9',
              background: '#070C09',
              width: '100%',
              position: 'relative'
            }}>
              <video
                src={adVideoUrl}
                controls
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '8px', lineHeight: 1.4 }}>
              Watch how our certified team conducts on-site operations across regions.
            </p>
          </div>

          {/* Column 2: Piled Activity Photos Stack (Opens Gallery Pop-Up) */}
          <div>
            <PiledPhotoStack
              photos={activityPhotos}
              title={service.title}
              onOpenGallery={() => setIsGalleryOpen(true)}
            />
          </div>
        </div>

                {/* DISTINCTIVE HOUSE CHARACTERISTICS VISUALIZER FOR BUILD-FROM-SCRATCH */}
        {(service.id === 'build-from-scratch' || service.id === 'construction-services') && (
          <ConstructionSuite
            onRequestConsultation={() => setIsReservationOpen(true)}
          />
        )}

        {/* DISTINCTIVE SELECTIVE RENOVATION CONFIGURATOR CALLOUT */}
        {service.id === 'home-renovation' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '2px solid rgba(210, 125, 45, 0.4)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            marginBottom: '40px',
            padding: '30px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF9F6 100%)'
          }}>
            <div style={{ maxWidth: '740px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Dedicated Selective Renovation Visualizer
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', color: 'var(--accent)', margin: '0 0 8px' }}>
                Choose Your Renovation Spaces &amp; Finishes
              </h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                Select only the spaces you wish to remodel (Bathrooms, Flooring, Kitchen, Living Lounge, Bedrooms, or Exterior Façade). You will only configure options for the specific spaces you select. We provide an instant price range, followed by an on-site property evaluation by our certified engineers. Opens in a dedicated full page.
              </p>
            </div>
            <button
              onClick={() => setIsRenovationConfiguratorOpen(true)}
              className="btn-primary"
              style={{
                padding: '14px 28px',
                fontSize: '0.88rem',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(26, 62, 38, 0.25)'
              }}
            >
              <Sparkles size={16} />
              <span>Launch Dedicated Renovation Visualizer →</span>
            </button>
          </div>
        )}

        {/* DISTINCTIVE FEATURE 1: BEFORE & AFTER SLIDER (For cleaning, interior, land, etc.) */}
        {(service.id === 'home-services' || service.id === 'interior-design' || service.id === 'interior-finishing' || service.id === 'home-renovation' || service.id === 'land-verification' || service.id === 'construction-services') && (
          <BeforeAfterSlider
            beforeImg={beforeAfter.beforeImg}
            afterImg={beforeAfter.afterImg}
            beforeLabel={beforeAfter.beforeLabel}
            afterLabel={beforeAfter.afterLabel}
            scenes={beforeAfter.scenes}
          />
        )}

        {/* DISTINCTIVE FEATURE 2: SERVICE-SPECIFIC PROTOCOL DETAILS */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid var(--border)',
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          marginBottom: '36px'
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Verified Delivery Protocol
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)', margin: '4px 0 16px' }}>
            How We Execute "{service.title}"
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '14px' }}>
              <strong style={{ fontSize: '0.88rem', color: '#1E293B', display: 'block', marginBottom: '4px' }}>
                1. Location & GPS Coordinate Dispatch
              </strong>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                Our field operations coordinator verifies your physical address and satellite pin before dispatching our certified crew.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '14px' }}>
              <strong style={{ fontSize: '0.88rem', color: '#1E293B', display: 'block', marginBottom: '4px' }}>
                2. On-Site Physical Execution
              </strong>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                Professional equipment (RTK GPS, industrial buffers, soil testing probes) deployed under strict safety and quality standards.
              </p>
            </div>

            <div style={{ borderLeft: '3px solid #10B981', paddingLeft: '14px' }}>
              <strong style={{ fontSize: '0.88rem', color: '#1E293B', display: 'block', marginBottom: '4px' }}>
                3. Certified Report & Handover
              </strong>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                Receive immediate digital photographic proof, official registry documents, or project completion certificates via email and WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* RENDER REPAIRS & REMODELING SECTION FOR HOME RENOVATION */}
        {service.id === 'home-renovation' && (
          <RepairsRemodelingSection
            onOpenVisualizer={() => setIsRenovationConfiguratorOpen(true)}
          />
        )}

        {/* PACKAGES PREVIEW STRIP (Hidden for home-renovation as requested) */}
        {service.id !== 'home-renovation' && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.84rem', fontWeight: 800, color: service.accentColor || 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  Available Subscriptions &amp; Service Packages
                </span>
                <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                  Transparent rates with guaranteed deliverables and direct artisan / specialist assignment.
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '18px' }}>
              {packages.map((pkg, idx) => {
                const hasOfferings = Array.isArray(pkg.offerings) && pkg.offerings.length > 0;
                const isHighlighted = !!pkg.highlighted;
                const priceFormatted = pkg.priceNgn ? `₦${Number(pkg.priceNgn).toLocaleString()}` : null;

                return (
                  <div
                    key={pkg.id || idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: isHighlighted ? `2px solid ${service.accentColor || 'var(--accent-gold)'}` : '1px solid var(--border)',
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isHighlighted ? '0 8px 24px rgba(0,0,0,0.08)' : '0 4px 14px rgba(0,0,0,0.03)',
                      position: 'relative'
                    }}
                  >
                    <div>
                      {/* Top Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        {pkg.badge && (
                          <span style={{
                            backgroundColor: isHighlighted ? (service.accentColor || 'var(--accent)') : '#F3F4F6',
                            color: isHighlighted ? '#FFFFFF' : '#4B5563',
                            padding: '3px 9px',
                            borderRadius: '10px',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em'
                          }}>
                            {pkg.badge}
                          </span>
                        )}
                        {pkg.billingPeriod && (
                          <span style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: 600 }}>
                            {pkg.billingPeriod}
                          </span>
                        )}
                      </div>

                      <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                        {pkg.name}
                      </h3>

                      {/* Pricing Display */}
                      {priceFormatted && (
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                          <span style={{ fontSize: '1.45rem', fontWeight: 800, color: service.accentColor || 'var(--accent)' }}>
                            {priceFormatted}
                          </span>
                          {pkg.priceUsd && (
                            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                              (~${pkg.priceUsd})
                            </span>
                          )}
                        </div>
                      )}

                      <p style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: 1.5, margin: '0 0 14px' }}>
                        {pkg.shortDesc || pkg.desc}
                      </p>

                      {/* Offerings Checklist */}
                      {hasOfferings && (
                        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px', marginBottom: '16px' }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280', marginBottom: '8px' }}>
                            What's Included:
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {pkg.offerings.map((off, oIdx) => (
                              <div key={oIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.76rem', color: 'var(--text-title)' }}>
                                <Check size={13} style={{ color: service.accentColor || 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                                <span>{off}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                        {pkg.duration || pkg.billingPeriod || 'Instant Booking'}
                      </span>
                      <button
                        onClick={() => setIsReservationOpen(true)}
                        style={{
                          backgroundColor: service.accentColor || 'var(--accent)',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                        }}
                      >
                        <span>{service.ctaLabel || 'Select & Reserve'} →</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BOTTOM INTEREST BANNER (Hidden for home-renovation as requested) */}
        {service.id !== 'home-renovation' && (
          <div style={{
            backgroundColor: '#111C15',
            borderRadius: '10px',
            border: '1px solid rgba(210, 125, 45, 0.35)',
            padding: '28px 32px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Sparkles size={15} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Interested in this service?
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 400 }}>
                Reserve our accredited team for your property.
              </h3>
              <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>
                Open our pop-up booking form to enter your location and pick a date.
              </span>
            </div>

            <button
              onClick={() => setIsReservationOpen(true)}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '0.88rem' }}
            >
              Make a Reservation (Pop-Up)
            </button>
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          4. POP-UP MODALS: RESERVATION & ACTIVITY GALLERY
          ══════════════════════════════════════════════════════════════════════ */}
      {isReservationOpen && (
        <ReservationModal
          service={service}
          packages={packages}
          onClose={() => setIsReservationOpen(false)}
          onSuccess={(data) => {
            setIsReservationOpen(false);
            setConfirmationData(data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {isGalleryOpen && (
        <ActivityGalleryModal
          photos={activityPhotos}
          title={service.title}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}

      {/* SUCCESS CONFIRMATION MODAL IF RESERVED */}
      {confirmationData && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 10, 7, 0.88)',
          backdropFilter: 'blur(10px)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            maxWidth: '600px',
            width: '100%',
            padding: '36px 30px',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            border: '2px solid var(--accent)'
          }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: 'rgba(26, 62, 38, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid var(--accent)'
            }}>
              <Check size={36} style={{ color: 'var(--accent)' }} />
            </div>

            <span style={{
              display: 'inline-block',
              backgroundColor: 'rgba(210, 125, 45, 0.12)',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              fontSize: '0.76rem',
              padding: '4px 12px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Booking Ref: {confirmationData.bookingRef}
            </span>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--accent)', margin: '0 0 12px' }}>
              Reservation Confirmed!
            </h3>

            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.55, margin: '0 0 20px' }}>
              Thank you, <strong>{confirmationData.fullName}</strong>. A formal confirmation and calendar pass have been emailed to <strong>{confirmationData.email}</strong>. Our field team will contact you via WhatsApp / phone at <strong>{confirmationData.phone}</strong>.
            </p>

            <div style={{
              backgroundColor: '#FAF9F6',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '16px',
              textAlign: 'left',
              fontSize: '0.82rem',
              marginBottom: '24px'
            }}>
              <div style={{ marginBottom: '6px' }}><strong>Service:</strong> {service.title} ({confirmationData.selectedPackage})</div>
              <div style={{ marginBottom: '6px' }}><strong>Date & Time:</strong> {confirmationData.selectedDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })} at {confirmationData.selectedTimeSlot}</div>
              <div><strong>Location:</strong> {confirmationData.location} ({confirmationData.stateName})</div>
              {confirmationData.gpsCoordinates && (
                <div style={{ color: 'var(--accent-gold)', marginTop: '4px', fontWeight: 600 }}>
                  📍 GPS Satellite Pin: {confirmationData.gpsCoordinates.lat}° N, {confirmationData.gpsCoordinates.lng}° E (±{confirmationData.gpsCoordinates.accuracy}m)
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => setConfirmationData(null)}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.82rem' }}
              >
                Done
              </button>
              <button
                onClick={() => {
                  setConfirmationData(null);
                  onBackToHub();
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Return to Directory
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
