import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Play, ArrowRight, ArrowLeft, Heart, Sparkles, Building, Landmark, Compass, CheckCircle, X, UserCheck } from 'lucide-react';
import { apiService } from '../services/api';

const FLAGS = {
  kenya: "🇰🇪",
  drc: "🇨🇩",
  namibia: "🇳🇦",
  chad: "🇹🇩",
  nigeria: "🇳🇬"
};

// Photo stack component showing Polaroid style clusters
function PhotoCluster({ photos, accent }) {
  if (!photos || !Array.isArray(photos)) return null;
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '240px',
      margin: '15px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {photos.map((ph, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: i === 0 ? '180px' : '150px',
            top: i === 0 ? '0px' : '40px',
            left: i === 0 ? '10%' : 'auto',
            right: i === 0 ? '10%' : 'auto',
            transform: `rotate(${ph.rotate}deg) scale(${ph.scale})`,
            transformOrigin: 'center center',
            zIndex: 3 - i,
            transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, z-index 0s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = `rotate(0deg) scale(1.06)`;
            e.currentTarget.style.zIndex = 10;
            e.currentTarget.style.boxShadow = `0 18px 45px rgba(0,0,0,0.22)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = `rotate(${ph.rotate}deg) scale(${ph.scale})`;
            e.currentTarget.style.zIndex = 3 - i;
            e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.12)`;
          }}
        >
          {/* Polaroid Frame */}
          <div style={{
            background: '#FAFAF8',
            padding: '8px 8px 24px 8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)',
            borderRadius: '4px',
            border: '1px solid #EAE6DB'
          }}>
            <div style={{ overflow: 'hidden', borderRadius: '2px' }}>
              <img
                src={ph.img}
                alt={ph.caption}
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'contrast(1.02) saturate(0.98)',
                }}
                onError={e => { e.target.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600"; }}
              />
            </div>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.6rem',
              color: '#6E7A72',
              marginTop: '8px',
              textAlign: 'center',
              lineHeight: 1.3,
              fontWeight: 'bold',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {ph.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Inline video player card component with elegant gold-outline picture frame
function InlineVideoPlayer({ videoUrl, placeholderImg, accent }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [videoUrl]);

  return (
    <div 
      style={{
        borderRadius: '8px',
        border: '5px solid #1A3E26', // Thick forest-green frame
        outline: '1px solid var(--accent-gold)', // Outer gold trim outline
        overflow: 'hidden',
        boxShadow: '0 20px 45px rgba(0,0,0,0.3)',
        aspectRatio: '16/10',
        background: '#1A241E',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {isPlaying ? (
        <video
          src={videoUrl}
          controls
          autoPlay
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img 
            src={placeholderImg}
            alt="Scenic view player thumbnail"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.8
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            background: 'linear-gradient(to top, rgba(26,62,38,0.5) 0%, rgba(0,0,0,0.15) 100%)'
          }}
          onClick={() => setIsPlaying(true)}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <Play size={18} style={{ color: 'var(--accent)', marginLeft: '3px' }} />
            </div>
            <span style={{
              color: '#FFFFFF',
              marginTop: '8px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              textShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}>
              Play Drone Tour
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Snapping Country Showcase Card detailing the culture, lifestyle, and build guidance
function CountryShowcaseSection({ country, style, showcaseRef }) {
  const flag = FLAGS[country.id] || "🌍";
  const cult = country.cultureInfo || {
    whyLive: "A rich mixture of high-yield economic potential, scenic natural wonders, and secure land ownership options.",
    bestBuild: "Eco-friendly Rammed Earth villas or solar-passive brick cottages utilizing sustainable local resources.",
    culture: "Warm, collaborative communities grounded in mutual support, vibrant creative arts, and agricultural heritage.",
    culturePhotos: [
      { img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", caption: "Warm local community gatherings" },
      { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", caption: "Sustainable natural architecture" }
    ]
  };

  // Compact photo stack helper for row integration
  const renderCompactPhotos = (photos) => {
    if (!photos || !Array.isArray(photos) || photos.length === 0) return null;
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '110px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {photos.slice(0, 2).map((ph, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: i === 0 ? '120px' : '100px',
              top: i === 0 ? '0px' : '12px',
              left: i === 0 ? '25%' : 'auto',
              right: i === 0 ? 'auto' : '25%',
              transform: `rotate(${i === 0 ? -4 : 5}deg)`,
              zIndex: 3 - i,
              transition: 'transform 0.3s ease'
            }}
          >
            <div style={{
              background: '#FAFAF8',
              padding: '4px 4px 14px 4px',
              boxShadow: '0 5px 12px rgba(0,0,0,0.1)',
              borderRadius: '2px',
              border: '1px solid #EAE6DB'
            }}>
              <img
                src={ph.img}
                alt={ph.caption}
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      ref={showcaseRef}
      style={{ 
        position: 'fixed',
        top: '125px', // Below main header (75px) + sub-nav header (50px)
        left: 0,
        right: 0,
        bottom: 0,
        display: 'block', // Set to block to support native overflow scrolling
        overflowY: 'auto', // Enable vertical scrollbar inside the showcase
        padding: '30px 8%',
        boxSizing: 'border-box',
        pointerEvents: style.pointerEvents,
        opacity: style.opacity,
        transform: `translate3d(0, ${style.translateY}px, 0) scale(${style.scale})`,
        transformOrigin: 'center center',
        transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
        zIndex: 5,
        backgroundColor: '#F2F6F3', // Light mint-white background covering the whole screen
      }}
    >
      <div 
        style={{ 
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          paddingBottom: '60px' // Bottom padding to scroll past comfortably
        }}
      >
        {/* Scroll Indication Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          backgroundColor: 'rgba(210, 125, 45, 0.08)',
          border: '1px solid rgba(210, 125, 45, 0.25)',
          padding: '8px 18px',
          borderRadius: '4px',
          color: 'var(--accent-gold)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          width: 'fit-content',
          margin: '0 auto',
          boxShadow: '0 4px 12px rgba(210, 125, 45, 0.06)'
        }}>
          <span>Scroll to see available plots</span>
          <span style={{ display: 'inline-block', animation: 'umojaFloat 2s infinite ease-in-out' }}>
            <ArrowRight size={14} style={{ transform: 'rotate(90deg)', display: 'block' }} />
          </span>
        </div>

        {/* Profile Header */}
        <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(26,62,38,0.08)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontSize: '1.4rem' }}>{flag}</span>
            <span style={{
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              Discover {country.name}
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontStyle: 'italic',
            color: '#1A3E26',
            margin: 0
          }}>
            {country.motto}
          </p>
        </div>

        {/* Alternating Zig-Zag Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Row 1: Text Left, Video Right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                01 / Why Live Here
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#1A3E26', margin: '0 0 6px', fontWeight: 400 }}>
                Lifestyle & Regional Highlights
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#2C3E35', margin: 0, lineHeight: 1.45, fontWeight: 300 }}>
                {cult.whyLive}
              </p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '280px' }}>
                <InlineVideoPlayer
                  videoUrl={country.videoUrl}
                  placeholderImg={country.potentialNeighborhoods?.[0]?.img || "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"}
                  accent={country.accent}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Image Left, Text Right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '280px' }}>
                {renderCompactPhotos(cult.culturePhotos)}
              </div>
            </div>
            
            <div>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                02 / Architectural Guide
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#1A3E26', margin: '0 0 6px', fontWeight: 400 }}>
                Best Style to Build
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#2C3E35', margin: 0, lineHeight: 1.45, fontWeight: 300 }}>
                {cult.bestBuild}
              </p>
            </div>
          </div>

          {/* Row 3: Text Left, Image Right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                03 / People & Culture
              </span>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#1A3E26', margin: '0 0 6px', fontWeight: 400 }}>
                Community & Shared Values
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#2C3E35', margin: 0, lineHeight: 1.45, fontWeight: 300 }}>
                {cult.culture}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '280px' }}>
                {renderCompactPhotos(country.potentialNeighborhoods)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// SCROLL-LINKED 3D SURVEY TOPOGRAPHY LAND GRID (Unique Explore Animation)
// ══════════════════════════════════════════════════════════════════════
function ScrollLinkedTerrain({ scroll, mouse }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 600;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    const gridRows = 9;
    const gridCols = 9;
    const cellSize = 42;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const rotY = scroll * 0.0016 + mouse.x * 0.006;
      const rotX = 0.65 + scroll * 0.0003 + mouse.y * 0.005;

      const project = (x, y, z) => {
        const cx = x - (gridCols - 1) * cellSize / 2;
        const cy = y - (gridRows - 1) * cellSize / 2;
        
        const x1 = cx * Math.cos(rotY) - cy * Math.sin(rotY);
        const y1 = cx * Math.sin(rotY) + cy * Math.cos(rotY);
        
        const rotatedY = y1 * Math.cos(rotX) - z * Math.sin(rotX);
        const rotatedZ = y1 * Math.sin(rotX) + z * Math.cos(rotX);

        const d = 450;
        const scale = d / (d + rotatedZ);
        return {
          x: centerX + x1 * scale,
          y: centerY + rotatedY * scale,
          z: rotatedZ
        };
      };

      const points = [];
      for (let r = 0; r < gridRows; r++) {
        const rowPoints = [];
        for (let c = 0; c < gridCols; c++) {
          const x = c * cellSize;
          const y = r * cellSize;
          const z = Math.sin(c * 0.45 + scroll * 0.0035) * Math.cos(r * 0.45 + scroll * 0.0022) * 22;
          rowPoints.push({ x, y, z, proj: project(x, y, z) });
        }
        points.push(rowPoints);
      }

      ctx.strokeStyle = 'rgba(210, 125, 45, 0.16)';
      ctx.lineWidth = 1.1;
      for (let r = 0; r < gridRows; r++) {
        ctx.beginPath();
        for (let c = 0; c < gridCols; c++) {
          const pt = points[r][c].proj;
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      for (let c = 0; c < gridCols; c++) {
        ctx.beginPath();
        for (let r = 0; r < gridRows; r++) {
          const pt = points[r][c].proj;
          if (r === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      const beacons = [
        { r: 2, c: 3, label: "GPS-A" },
        { r: 5, c: 6, label: "GPS-B" },
        { r: 7, c: 2, label: "GPS-C" }
      ];

      beacons.forEach(b => {
        const pt = points[b.r][b.c];
        if (pt) {
          const proj = pt.proj;
          const isFront = proj.z < 150;
          const pulse = 6 + Math.sin(Date.now() * 0.004) * 2.5;

          if (isFront) {
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, pulse * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(210, 125, 45, 0.22)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#D27D2D';
            ctx.fill();

            ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
            ctx.font = 'bold 8.5px monospace';
            ctx.fillText(`${b.label} E:36.${b.r} S:-1.${b.c}`, proj.x + 8, proj.y + 3);
          }
        }
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

// Snapping Country Section Component (Description + Video Player next to it)
function CountrySnapSection({ country, style, onSelectCountry }) {
  const flag = FLAGS[country.id] || "🌍";

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: '75px',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 6%',
        boxSizing: 'border-box',
        pointerEvents: style.pointerEvents,
        opacity: style.opacity,
        transform: `translate3d(0, ${style.translateY}px, 0) scale(${style.scale})`,
        transformOrigin: 'center center',
        transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
        zIndex: 5
      }}
    >
      <div 
        style={{ 
          maxWidth: '1100px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '50px',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid rgba(210,125,45,0.28)',
          padding: '40px 5%',
          boxShadow: '0 25px 55px rgba(0,0,0,0.5)'
        }}
      >
        
        {/* Left Column: Title, Description & Action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>{flag}</span>
              <span style={{
                color: 'var(--accent-gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {country.motto}
              </span>
            </div>
            
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.8rem',
              fontWeight: 400,
              color: '#1A3E26',
              margin: '0 0 15px',
              letterSpacing: '-0.01em',
              lineHeight: 1.1
            }}>
              {country.name}
            </h2>
            
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.7,
              color: '#2C3E35',
              margin: 0,
              fontWeight: 300
            }}>
              {country.desc}
            </p>
          </div>

          <button
            onClick={() => onSelectCountry(country.id)}
            className="hero-cta-primary hover-lift"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '14px 28px', 
              fontSize: '0.82rem',
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(26,62,38,0.15)'
            }}
          >
            <span>Browse Plots ({country.plots?.length || 0})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Right Column: Visual Drone Video Tour Player */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <InlineVideoPlayer
            videoUrl={country.videoUrl}
            placeholderImg={country.potentialNeighborhoods?.[0]?.img || "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800"}
            accent={country.accent}
          />
        </div>

      </div>
    </div>
  );
}

// Snapping Plot Section for a Selected Country (Stationary Cross-Fade Layout)
function PlotSnapSection({ plot, country, style, onSelectPlot }) {
  return (
    <div 
      style={{ 
        position: 'fixed',
        top: '125px', // Below main header (75px) + sub-nav header (50px)
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 6%',
        boxSizing: 'border-box',
        pointerEvents: style.pointerEvents,
        opacity: style.opacity,
        transform: `translate3d(0, ${style.translateY}px, 0) scale(${style.scale})`,
        transformOrigin: 'center center',
        transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
        zIndex: 5
      }}
    >
      <div 
        style={{ 
          maxWidth: '1100px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.25fr',
          gap: '40px',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid rgba(210,125,45,0.25)',
          padding: '35px 5%',
          boxShadow: '0 25px 55px rgba(0,0,0,0.5)'
        }}
      >
        
        {/* Left Column: Polaroid photo stack cluster */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <PhotoCluster photos={plot.photos} accent={country.accent} />
        </div>

        {/* Right Column: Title, Specs, Description & CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <MapPin size={14} style={{ color: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {country.name.toUpperCase()} / VETTED BEACON
              </span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.2rem',
              fontWeight: 400,
              color: '#1A3E26',
              margin: '0 0 10px',
              lineHeight: 1.2
            }}>
              {plot.title}
            </h3>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{
                backgroundColor: 'rgba(210, 125, 45, 0.08)',
                border: '1px solid rgba(210, 125, 45, 0.25)',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--accent-gold)'
              }}>
                Size: {plot.size}
              </span>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                <span style={{ fontSize: '0.85rem', color: '#1A3E26', fontWeight: 500 }}>USD</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1A3E26', lineHeight: 1 }}>
                  ${(plot.price || 0).toLocaleString()}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#64748B', fontStyle: 'italic', marginLeft: '6px' }}>
                  * Escrow Secured
                </span>
              </div>
            </div>
          </div>

          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: '#2C3E35',
            margin: 0,
            fontWeight: 300
          }}>
            {plot.neighborhood}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button
              onClick={() => onSelectPlot(plot, 'Buy')}
              style={{
                flex: 1.2,
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 20px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(210, 125, 45, 0.15)'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
            >
              Buy Securely
            </button>

            <button
              onClick={() => onSelectPlot(plot, 'Negotiate')}
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
                padding: '12px 20px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(210, 125, 45, 0.04)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Negotiate
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function ExplorePage({ countriesData, onSelectPlot }) {
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const showcaseRef = useRef(null);

  // Inquiry modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryPlot, setInquiryPlot] = useState(null);
  const [inquiryType, setInquiryType] = useState('Buy'); // 'Buy' or 'Negotiate'
  const [inquiryForm, setInquiryForm] = useState({ fullName: '', email: '', phone: '', currentCity: '', message: '' });

  const handleOpenInquiryModal = (plot, type) => {
    setInquiryPlot(plot);
    setInquiryType(type);
    setIsInquiryModalOpen(true);
  };

  const handleInquiryFormChange = (e) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!inquiryForm.fullName || !inquiryForm.email || !inquiryForm.phone) {
      alert("Please fill out your identity details (Name, Email, Phone).");
      return;
    }

    // Log inquiry to backend database (supports offline fallback)
    apiService.submitInquiry({
      plot_id: inquiryPlot.id,
      fullName: inquiryForm.fullName,
      email: inquiryForm.email,
      phone: inquiryForm.phone,
      currentCity: inquiryForm.currentCity || '',
      message: inquiryForm.message || '',
      type: inquiryType
    });

    const subject = `[Umoja Terra Plot Inquiry] - ${inquiryType} request for ${inquiryPlot.title}`;
    const body = `Hello Umoja Terra Team,

I am interested in the following property on your platform:
- Plot: ${inquiryPlot.title}
- Location: ${inquiryPlot.neighborhood}, ${selectedCountry?.name || ''}
- Size: ${inquiryPlot.size}
- Price: ${inquiryPlot.price}
- Request Type: ${inquiryType} (Buy / Negotiate Inquiry)

My Contact Information:
- Full Name: ${inquiryForm.fullName}
- Email: ${inquiryForm.email}
- Phone: ${inquiryForm.phone}
- My Current Location: ${inquiryForm.currentCity || 'Not Specified'}

My Message / Offer:
${inquiryForm.message}

Thank you,
${inquiryForm.fullName}`;

    const mailtoUrl = `mailto:inquiries@umojaterra.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setIsInquiryModalOpen(false);
    alert("Inquiry recorded! Opening your email client to send this message to our vetting desk.");
  };

  // Auto-scroll window to first plot when showcase scrolls to bottom
  useEffect(() => {
    const container = showcaseRef.current;
    if (!container) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 8;
      if (e.deltaY > 0 && isAtBottom) {
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY; // positive means scrolling down (swiping up)
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 8;

      if (deltaY > 0 && isAtBottom) {
        e.preventDefault();
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [selectedCountryId]);

  // Parallax mouse position state
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const countries = Array.isArray(countriesData) ? countriesData : [];
  const selectedCountry = countries.find(c => c.id === selectedCountryId);
  const plots = Array.isArray(selectedCountry?.plots) ? selectedCountry.plots : [];

  // Track plot views (clicks) when they become active in native scrolling
  useEffect(() => {
    if (selectedCountryId && activeIndex >= 1 && activeIndex <= plots.length) {
      const activePlot = plots[activeIndex - 1];
      if (activePlot) {
        try {
          const viewedPlots = JSON.parse(sessionStorage.getItem('umoja_viewed_plots') || '[]');
          if (Array.isArray(viewedPlots) && !viewedPlots.includes(activePlot.id)) {
            apiService.trackView(activePlot.id);
            viewedPlots.push(activePlot.id);
            sessionStorage.setItem('umoja_viewed_plots', JSON.stringify(viewedPlots));
          }
        } catch (e) {
          console.warn("Failed to parse viewed plots from session storage", e);
        }
      }
    }
  }, [selectedCountryId, activeIndex, plots]);

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

  // Track window scroll coordinates (no event locks to prevent browser freezes)
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectCountry = (countryId) => {
    setSelectedCountryId(countryId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToCountries = () => {
    setSelectedCountryId(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Convert current scrollY position to active index (mapped directly to 100vh intervals)
  const getScrollIndexInfo = () => {
    const viewport = window.innerHeight;
    const rawProgress = scrollPosition / viewport;
    const limit = selectedCountryId ? plots.length : 5;
    return {
      progress: rawProgress,
      activeIndex: Math.min(Math.max(0, Math.round(rawProgress)), limit)
    };
  };

  const { progress, activeIndex } = getScrollIndexInfo();

  // Get layout styles for a given section index based on scroll distance (opacity + zoom + slide transitions)
  const getSectionStyle = (idx) => {
    const diff = progress - idx;
    const dist = Math.abs(diff);
    let opacity = 0;
    let scale = 1;
    let translateY = 0;

    // Plateau Cross-Fade: fully visible within 0.45 units (90% of scroll), cross-fades between 0.45 and 0.55
    if (dist <= 0.45) {
      opacity = 1;
      scale = 1;
      translateY = 0;
    } else if (dist < 0.55) {
      const factor = (dist - 0.45) / 0.1;
      opacity = 1 - factor;
      
      if (diff > 0) {
        // Exiting DOWN (previous section) -> Zoom Out, Scroll Up
        scale = 1 - factor * 0.15; // 1.0 to 0.85
        translateY = -factor * 120; // 0 to -120px
      } else {
        // Entering DOWN (upcoming section) -> Fades in from slight scale/offset
        scale = 0.9 + (1 - factor) * 0.1; // 0.9 to 1.0
        translateY = factor * 80; // 80px to 0px
      }
    } else {
      opacity = 0;
      if (diff > 0) {
        scale = 0.85;
        translateY = -120;
      } else {
        scale = 0.9;
        translateY = 80;
      }
    }

    // Footer Safe Filter: only fade out the last element when scrolling PAST its snapped position to the footer
    const limit = selectedCountryId ? plots.length : 5;
    const viewportHeight = window.innerHeight || 800;
    const targetScrollPos = limit * viewportHeight;

    if (scrollPosition > targetScrollPos + 10 && idx === limit) {
      const overScroll = scrollPosition - targetScrollPos;
      const factor = Math.min(overScroll / 150, 1); // Fade out over 150px of extra scrolling
      opacity = 1 - factor;
      scale = 1 - factor * 0.15;
      translateY = -factor * 120;
    }

    return {
      opacity: opacity,
      scale: scale,
      translateY: translateY,
      pointerEvents: opacity > 0.5 ? 'auto' : 'none'
    };
  };

  // Calculate diagonal fixed position (top & left) based on activeIndex
  const getBackgroundPosition = (idx) => {
    if (idx === 0) {
      return { top: '50%', left: '72%' }; // Hero: Center Right
    } else if (idx === 1) {
      return { top: '65%', left: '15%' }; // First Country: Lower Left
    } else if (idx === 2) {
      return { top: '35%', left: '80%' }; // Second Country: Upper Right
    } else if (idx === 3) {
      return { top: '68%', left: '12%' }; // Third Country: Lower Left
    } else if (idx === 4) {
      return { top: '38%', left: '85%' }; // Fourth Country: Upper Right
    } else {
      return { top: '55%', left: '15%' }; // Fifth Country: Middle Left
    }
  };

  const bgPos = getBackgroundPosition(activeIndex);

  // Coordinate Scanner Sweep calculations
  const viewport = window.innerHeight || 800;
  const scanProgress = (scrollPosition % viewport) / viewport;
  const isTransitioning = scanProgress > 0.05 && scanProgress < 0.95;
  const scanTop = isTransitioning ? `${scanProgress * 100}%` : '-20px';
  const scanOpacity = isTransitioning ? Math.sin(scanProgress * Math.PI) * 0.8 : 0;

  return (
    <div className="page-view-fade-only" style={{ width: '100%', position: 'relative', background: '#030504' }}> {/* Midnight safari black background */}
      
      <style>{`
        .hero-viewport {
          position: relative;
          min-height: calc(100vh - 75px);
          display: flex;
          align-items: center;
          padding: 80px 6%;
          background: transparent;
          box-sizing: border-box;
        }

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

        .instruction-card {
          background: rgba(17, 28, 21, 0.7);
          border: 1px solid rgba(210, 125, 45, 0.25);
          backdrop-filter: blur(10px);
          padding: 24px;
          border-radius: 6px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }

        @media (max-width: 900px) {
          .deck-section {
            padding: 80px 4% !important;
          }
          .instruction-card {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .hero-viewport {
            padding: 100px 6% 40px !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          COORDINATE SCANNER SWEEP (Transition laser line indicator)
          ══════════════════════════════════════════════════════════════════════ */}
      <div 
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          top: scanTop,
          height: '2px',
          background: 'linear-gradient(to right, rgba(210,125,45,0), rgba(210,125,45,0.9), rgba(210,125,45,0))',
          boxShadow: '0 0 18px rgba(210, 125, 45, 0.7), 0 0 6px rgba(210, 125, 45, 0.4)',
          opacity: scanOpacity,
          pointerEvents: 'none',
          zIndex: 15,
          transition: 'opacity 0.2s ease, top 0.05s linear'
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          VIEWPORT-FIXED DIAGONAL TRAVELING BACKGROUND (3D Surveying Terrain Mesh)
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
          opacity: 0.38
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
          <ScrollLinkedTerrain scroll={scrollPosition} mouse={mouseOffset} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          STATE 1: BROWSE COUNTRIES (No Country Chosen)
          ══════════════════════════════════════════════════════════════════════ */}
      {!selectedCountryId ? (
        <>
          {/* Normal Document Flow Targets for native scrolling & snap positions (opacity: 0, no visibility hidden) */}
          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <div id="hero-sec" className="hero-viewport scroll-snap-target" style={{ minHeight: '100vh', opacity: 0, pointerEvents: 'none' }} />
            {(Array.isArray(countriesData) ? countriesData : []).map((c) => c && (
              <div key={c.id} id={`${c.id}-sec`} className="deck-section scroll-snap-target" style={{ minHeight: '100vh', opacity: 0, pointerEvents: 'none' }} />
            ))}
            {/* Footer snap placeholder target */}
            <div id="footer-spacer" className="scroll-snap-target" style={{ minHeight: '100vh', opacity: 0, pointerEvents: 'none' }} />
          </div>

          {/* Explore Hero Header (Stationary at scroll index 0) */}
          <div 
            className="hero-viewport"
            style={{
              position: 'fixed',
              top: '75px',
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: getSectionStyle(0).pointerEvents,
              opacity: getSectionStyle(0).opacity,
              transform: `translate3d(0, ${getSectionStyle(0).translateY}px, 0) scale(${getSectionStyle(0).scale})`,
              transformOrigin: 'center center',
              transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
              zIndex: 4
            }}
          >
            {/* Full screen backdrop showing Africa United */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80"
                alt="United Africa Landscape"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(10,15,12,0.55) 0%, rgba(7,12,9,0.92) 100%)',
                zIndex: 2
              }} />
            </div>

            <div style={{ zIndex: 4, display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
              <div style={{ maxWidth: '720px' }}>
                <div className="tag-pill" style={{ marginBottom: '14px' }}>
                  <Sparkles size={12} style={{ color: 'var(--accent-gold)' }} />
                  <span>Vetted Continental Directory</span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                  color: '#FFFFFF',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: '0 0 15px'
                }}>
                  United African Lands
                </h1>

                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.08rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  Exploring land in different countries is complicated. Umoja Terra simplifies the journey. Here are the available countries where you can buy vetted, legally secure land. Scroll down to explore, or select a country below to jump directly to it.
                </p>
              </div>

              {/* Have you made your mind country selector */}
              <div style={{
                background: 'rgba(17, 28, 21, 0.72)',
                border: '1px solid rgba(210, 125, 45, 0.3)',
                backdropFilter: 'blur(10px)',
                padding: '20px 24px',
                borderRadius: '6px',
                width: '100%',
                maxWidth: '850px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                boxSizing: 'border-box'
              }}>
                <span style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: '12px'
                }}>
                  Have you made your mind? Choose a country to explore:
                </span>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {(Array.isArray(countriesData) ? countriesData : []).map((c, idx) => c && (
                    <button
                      key={c.id}
                      onClick={() => {
                        window.scrollTo({
                          top: (idx + 1) * window.innerHeight,
                          behavior: 'smooth'
                        });
                      }}
                      className="hover-lift"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFFFFF',
                        borderRadius: '4px',
                        padding: '10px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--accent-gold)';
                        e.currentTarget.style.backgroundColor = 'rgba(210, 125, 45, 0.08)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{FLAGS[c.id] || "🌍"}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Instructions steps summary */}
              <div className="instruction-card">
                {[
                  { num: "01", title: "Scroll Countries", desc: "Swipe down to snap from country to country." },
                  { num: "02", title: "Visual Tour", desc: "Play the local visual drone footage in the card." },
                  { num: "03", title: "Select Country", desc: "Tap 'Browse Plots' to enter country inventory." },
                  { num: "04", title: "Show Interest", desc: "Initiate risk-free escrow inquiries at zero cost." }
                ].map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      color: 'var(--accent-gold)'
                    }}>
                      {s.num}
                    </span>
                    <span style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#FFFFFF'
                    }}>
                      {s.title}
                    </span>
                    <span style={{
                      fontSize: '0.78rem',
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.4,
                      fontWeight: 300
                    }}>
                      {s.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Snapped countries list (Simple: Desc on left, small video next to it on right - STATIONARY FADING) */}
          {(Array.isArray(countriesData) ? countriesData : []).map((c, index) => c && (
            <CountrySnapSection
              key={c.id}
              country={c}
              style={getSectionStyle(index + 1)}
              onSelectCountry={handleSelectCountry}
            />
          ))}
        </>
      ) : (
        /* ══════════════════════════════════════════════════════════════════════
           STATE 2: BROWSE PLOTS UNDER CHOSEN COUNTRY (Same Visual Style & Snapping)
           ══════════════════════════════════════════════════════════════════════ */
        <>
          {/* Normal Document Flow Targets for native scrolling & snap positions (opacity: 0, no visibility hidden) */}
          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            {/* Country Showcase target */}
            <div id="showcase-sec" className="plot-snap-target deck-section" style={{ minHeight: '100vh', opacity: 0, pointerEvents: 'none' }} />
            {plots.map((p) => p && (
              <div key={p.id} id={`${p.id}-sec`} className="plot-snap-target deck-section" style={{ minHeight: '100vh', opacity: 0, pointerEvents: 'none' }} />
            ))}
            {/* Footer snap placeholder target for plots */}
            <div id="footer-spacer-plots" className="plot-snap-target deck-section" style={{ minHeight: '100vh', opacity: 0, pointerEvents: 'none' }} />
          </div>

          {/* Floating Back Navigation Bar */}
          <div style={{
            position: 'fixed',
            top: '75px', // Below the main App Header
            left: 0,
            right: 0,
            height: '50px',
            backgroundColor: 'rgba(7, 12, 9, 0.95)',
            borderBottom: '1px solid rgba(210,125,45,0.2)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 6%',
            zIndex: 900,
            backdropFilter: 'blur(10px)',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={handleBackToCountries}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                color: 'var(--accent-gold)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateX(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <ArrowLeft size={16} />
              <span>Back to Countries</span>
            </button>

            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: '#FFFFFF',
              fontStyle: 'italic'
            }}>
              Vetted Plots in {selectedCountry?.name}
            </span>
          </div>

          {/* Plot snapping section list - STATIONARY FADING */}
          {plots.length > 0 ? (
            <>
              {/* Country Showcase Card at index 0 */}
              <CountryShowcaseSection 
                country={selectedCountry}
                style={{
                  ...getSectionStyle(0),
                  pointerEvents: (scrollPosition <= 10 && getSectionStyle(0).opacity > 0.5) ? 'auto' : 'none'
                }}
                showcaseRef={showcaseRef}
              />
              
              {/* Plots starting at index 1 */}
              {plots.map((p, index) => p && (
                <PlotSnapSection
                  key={p.id}
                  plot={p}
                  country={selectedCountry}
                  style={getSectionStyle(index + 1)}
                  onSelectPlot={handleOpenInquiryModal}
                />
              ))}
            </>
          ) : (
            <div 
              style={{ 
                position: 'fixed',
                top: '125px',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#F2F6F3',
                color: '#1A3E26',
                zIndex: 5
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>No vetted plots listed in this country yet.</p>
                <button
                  onClick={handleBackToCountries}
                  className="btn-primary hover-lift"
                  style={{ marginTop: '20px', padding: '10px 20px' }}
                >
                  Return to Countries List
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Inquiry Pop-up Modal Form */}
      {isInquiryModalOpen && inquiryPlot && (
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
              onClick={() => setIsInquiryModalOpen(false)}
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
                  Secure Escrow Inquiry
                </span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: '#1A3E26',
                margin: 0,
                fontWeight: 400
              }}>
                Secure Connection Form
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0', fontWeight: 300 }}>
                Inquiring about: <strong>{inquiryPlot.title} ({inquiryPlot.price})</strong>
              </p>
            </div>

            <form onSubmit={handleSubmitInquiry} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={inquiryForm.fullName}
                  onChange={handleInquiryFormChange}
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
                    value={inquiryForm.email}
                    onChange={handleInquiryFormChange}
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
                    value={inquiryForm.phone}
                    onChange={handleInquiryFormChange}
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

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Your Current Location (City/Country)
                </label>
                <input
                  type="text"
                  name="currentCity"
                  value={inquiryForm.currentCity}
                  onChange={handleInquiryFormChange}
                  placeholder="e.g. Nairobi, Kenya or New York, USA"
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
                  {inquiryType === 'Buy' ? 'Additional Message' : 'Your Proposed Offer & Message'}
                </label>
                <textarea
                  name="message"
                  value={inquiryForm.message}
                  onChange={handleInquiryFormChange}
                  placeholder="Enter details here..."
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
                  onClick={() => setIsInquiryModalOpen(false)}
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
                  Dispatch Inquiry
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
