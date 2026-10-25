import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, MapPin, CheckCircle, Shield, Phone, Mail, Sparkles, 
  ExternalLink, Calendar, ChevronRight, ChevronLeft, X, User, Send, Building, 
  Award, Clock, DollarSign, Tag, Layers, Share2, Check, Play, ShieldCheck,
  Heart, MessageSquare, Flame, Bookmark, Image as ImageIcon, Video, Info,
  Eye, Compass, KeyRound, Camera
} from 'lucide-react';
import { addInterested, removeInterested, getInterested } from '../utils/userStorage';


// ══════════════════════════════════════════════════════════════════════
// 1. SCROLL-LINKED 3D SURVEY TOPOGRAPHY CANVAS (Background Animation)
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

      ctx.strokeStyle = 'rgba(210, 125, 45, 0.18)';
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
        { r: 2, c: 3, label: "NG-GPS-1" },
        { r: 5, c: 6, label: "NG-GPS-2" },
        { r: 7, c: 2, label: "NG-GPS-3" }
      ];

      beacons.forEach(b => {
        const pt = points[b.r]?.[b.c];
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

            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = 'bold 8.5px monospace';
            ctx.fillText(`${b.label} N:6.5° E:3.3°`, proj.x + 8, proj.y + 3);
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

// ══════════════════════════════════════════════════════════════════════
// 2A. INTERACTIVE 3D VIRTUAL TOUR VIEWER (360 Simulation)
// ══════════════════════════════════════════════════════════════════════
function InteractiveVirtualTourViewer({ virtualTourUrl, title, location }) {
  const [activeRoom, setActiveRoom] = useState('Living Room');
  const [rotationDeg, setRotationDeg] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const ROOMS = [
    { name: 'Front Entrance & Driveway', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80' },
    { name: 'Double Volume Living Room', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80' },
    { name: 'Italian Fitted Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=80' },
    { name: 'Master Penthouse Suite', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80' },
    { name: 'Rooftop Panoramic Terrace', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80' }
  ];

  const currentRoom = ROOMS.find(r => r.name === activeRoom) || ROOMS[0];

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setRotationDeg(prev => (prev + 0.15) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  return (
    <div style={{
      borderRadius: '8px',
      border: '2px solid rgba(210, 125, 45, 0.4)',
      backgroundColor: '#0A120D',
      overflow: 'hidden',
      boxShadow: '0 20px 45px rgba(0,0,0,0.4)',
      position: 'relative'
    }}>
      {/* 360 Viewport */}
      <div 
        style={{
          position: 'relative',
          height: '420px',
          overflow: 'hidden',
          cursor: 'grab'
        }}
        onMouseDown={() => setIsAutoRotating(false)}
        onMouseUp={() => setIsAutoRotating(true)}
      >
        <div style={{
          width: '120%',
          height: '100%',
          backgroundImage: `url(${currentRoom.img})`,
          backgroundSize: 'cover',
          backgroundPosition: `${rotationDeg}% center`,
          transition: isAutoRotating ? 'none' : 'background-position 0.1s ease',
          filter: 'brightness(0.95)'
        }} />

        {/* 360 HUD Overlay */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(7, 12, 9, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '6px 14px',
          borderRadius: '20px',
          border: '1px solid rgba(210, 125, 45, 0.4)',
          color: '#FFFFFF',
          fontSize: '0.74rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em'
        }}>
          <Eye size={14} style={{ color: 'var(--accent-gold)' }} />
          <span>Interactive 3D Virtual Tour • {currentRoom.name}</span>
        </div>

        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          color: 'rgba(255,255,255,0.85)',
          padding: '4px 10px',
          borderRadius: '4px',
          fontSize: '0.72rem',
          fontWeight: 600
        }}>
          {isAutoRotating ? '🔄 360° Auto-Panning' : '✋ Drag to Pan'}
        </div>

        {/* Hotspot Simulation Nodes */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(7, 12, 9, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '30px',
          padding: '6px 16px',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          maxWidth: '90%',
          overflowX: 'auto'
        }}>
          {ROOMS.map(r => (
            <button
              key={r.name}
              onClick={() => {
                setActiveRoom(r.name);
                setIsAutoRotating(true);
              }}
              style={{
                background: activeRoom === r.name ? 'var(--accent-gold)' : 'transparent',
                color: activeRoom === r.name ? '#000000' : '#FFFFFF',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 2. INLINE VIDEO PLAYER COMPONENT
// ══════════════════════════════════════════════════════════════════════
function InlineVideoPlayer({ videoUrl, placeholderImg }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [videoUrl]);

  return (
    <div 
      style={{
        borderRadius: '8px',
        border: '4px solid #1A3E26',
        outline: '1px solid var(--accent-gold)',
        overflow: 'hidden',
        boxShadow: '0 20px 45px rgba(0,0,0,0.35)',
        aspectRatio: '16/9',
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
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img 
            src={placeholderImg}
            alt="Drone video thumbnail"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              background: 'linear-gradient(to top, rgba(26,62,38,0.7) 0%, rgba(0,0,0,0.25) 100%)'
            }}
            onClick={() => setIsPlaying(true)}
          >
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <Play size={24} style={{ color: 'var(--accent)', marginLeft: '3px' }} />
            </div>
            <span style={{
              color: '#FFFFFF',
              marginTop: '10px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)'
            }}>
              Play Official Drone & Site Video Tour
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 3. REMODELED VERTICAL RECTANGULAR CARD (Phone-adequate, TikTok-style)
// ══════════════════════════════════════════════════════════════════════
function VerticalProductCard({ 
  item, 
  service, 
  style, 
  onViewFurtherInfo, 
  onInquire 
}) {
  const [fireCount, setFireCount] = useState(item.fireCount || item.likesCount || 64);
  const [hasFired, setHasFired] = useState(false);
  const [isSaved, setIsSaved] = useState(() => {
    try {
      return getInterested().some(i => i.id === item.id || (item.title && i.title === item.title));
    } catch (e) {
      return false;
    }
  });
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState(item.comments || []);
  const [newComment, setNewComment] = useState("");
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const photos = item.photos && item.photos.length > 0 
    ? item.photos.map(p => p.img) 
    : [item.mainImage || service.heroImage];

  // Automatic slideshow transition between images (no arrows needed)
  useEffect(() => {
    if (!photos || photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [photos]);

  const handleToggleFire = () => {
    if (hasFired) {
      setFireCount(prev => prev - 1);
      setHasFired(false);
    } else {
      setFireCount(prev => prev + 1);
      setHasFired(true);
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const added = {
      id: `c-${Date.now()}`,
      author: "Verified Investor (You)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      text: newComment.trim(),
      time: "Just now",
      likes: 1
    };
    setCommentsList([added, ...commentsList]);
    setNewComment("");
  };

  return (
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
        padding: '10px 4%',
        boxSizing: 'border-box',
        pointerEvents: style.pointerEvents,
        opacity: style.opacity,
        transform: `translate3d(0, ${style.translateY}px, 0) scale(${style.scale})`,
        transformOrigin: 'center center',
        transition: 'opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
        zIndex: 5
      }}
    >
      {/* 
        VERTICAL RECTANGULAR CARD:
        - Adequate for a phone screen
        - Almost fills the viewport height
        - Leaves generous edges showing background animations!
      */}
      <div 
        style={{ 
          width: 'min(430px, 90vw)',
          height: 'min(730px, calc(100vh - 145px))',
          backgroundColor: '#0C140F',
          borderRadius: '16px',
          border: '1px solid rgba(210, 125, 45, 0.35)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        
        {/* UPPER IMAGE SECTION: Automatic Slideshow Showcase (fills ~82% of card, no arrows) */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            flex: '1 1 82%',
            minHeight: 0,
            overflow: 'hidden',
            backgroundColor: '#050A07',
            cursor: photos.length > 1 ? 'pointer' : 'default'
          }}
          onClick={() => {
            if (photos.length > 1) {
              setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
            }
          }}
          title={photos.length > 1 ? "Click to skip to next image" : undefined}
        >
          {/* Photos rendered with smooth crossfade */}
          {photos.map((photoUrl, idx) => (
            <img
              key={idx}
              src={photoUrl}
              alt={`${item.title} - view ${idx + 1}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.05) saturate(1.03)',
                opacity: idx === currentPhotoIdx ? 1 : 0,
                transform: idx === currentPhotoIdx ? 'scale(1)' : 'scale(1.04)',
                transition: 'opacity 0.8s ease-in-out, transform 1.2s ease-out'
              }}
            />
          ))}
          
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 45%, rgba(12,20,15,0.85) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Slideshow Story Progress Bars (Top) */}
          {photos.length > 1 && (
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '12px',
              right: '12px',
              display: 'flex',
              gap: '4px',
              zIndex: 5
            }}>
              {photos.map((_, i) => (
                <div 
                  key={i}
                  style={{
                    flex: 1,
                    height: '2.5px',
                    backgroundColor: i === currentPhotoIdx ? 'var(--accent-gold)' : (i < currentPhotoIdx ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)'),
                    borderRadius: '2px',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          )}

          {/* TOP LEFT: Location Badge */}
          <div style={{
            position: 'absolute',
            top: photos.length > 1 ? '18px' : '12px',
            left: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            backgroundColor: 'rgba(7, 12, 9, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '4px 11px',
            borderRadius: '20px',
            border: '1px solid rgba(210, 125, 45, 0.4)',
            color: '#FFFFFF',
            fontSize: '0.72rem',
            fontWeight: 600,
            zIndex: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}>
            <MapPin size={12} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.location}
            </span>
          </div>



          {/* TIKTOK-STYLE FLOATING REACTION RAIL: FIRE, COMMENT & FAVORITE */}
          <div style={{
            position: 'absolute',
            right: '12px',
            bottom: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            zIndex: 6
          }}>
            {/* 1. Fire Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFire();
              }}
              style={{
                background: hasFired ? 'rgba(245, 158, 11, 0.25)' : 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                border: hasFired ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: hasFired ? '#F59E0B' : '#FFFFFF',
                boxShadow: hasFired ? '0 0 14px rgba(245, 158, 11, 0.45)' : '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
              title="Hot / Fire"
            >
              <Flame size={19} fill={hasFired ? '#F59E0B' : 'none'} />
            </button>
            <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#FFFFFF', marginTop: '-8px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              {fireCount}
            </span>

            {/* 2. Comment Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(!showComments);
              }}
              style={{
                background: showComments ? 'rgba(210, 125, 45, 0.25)' : 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                border: showComments ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: showComments ? 'var(--accent-gold)' : '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
              title="Comments"
            >
              <MessageSquare size={17} />
            </button>
            <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#FFFFFF', marginTop: '-8px', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
              {commentsList.length}
            </span>

            {/* 3. Favorite / Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isSaved) {
                  removeInterested(item.id);
                  setIsSaved(false);
                } else {
                  addInterested({ ...item, serviceId: service.id });
                  setIsSaved(true);
                }
              }}
              style={{
                background: isSaved ? 'rgba(210, 125, 45, 0.25)' : 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                border: isSaved ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isSaved ? 'var(--accent-gold)' : '#FFFFFF',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
              title={isSaved ? "Saved to Interested" : "Save Favorite"}
            >
              <Bookmark size={17} fill={isSaved ? 'var(--accent-gold)' : 'none'} />
            </button>
          </div>
        </div>

        {/* 
          LOWER COMPACT DETAILS DOCK:
          - Distinct background surface (#131F17)
          - Compact size leaving maximum height for the image
          - Location is on top left of image; price removed
          - Displays: Title, Small More button, Interested button
        */}
        <div style={{
          backgroundColor: '#131F17',
          borderTop: '1px solid rgba(210, 125, 45, 0.28)',
          padding: '11px 16px 13px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flex: '0 0 auto',
          boxSizing: 'border-box'
        }}>
          
          {/* Title Row (Price removed as requested) */}
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.14rem',
            fontWeight: 600,
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {item.title}
          </h3>

          {/* Action Row: Small "More" Button & "Interested" Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Small "More" Button */}
            <button
              onClick={() => onViewFurtherInfo(item)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.07)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(210, 125, 45, 0.4)',
                padding: '7px 12px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(210, 125, 45, 0.2)';
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.borderColor = 'rgba(210, 125, 45, 0.4)';
              }}
              title="View full specs, photos & drone tour"
            >
              <span>More</span>
              <ArrowRight size={11} />
            </button>

            {/* "Interested" Button */}
            <button
              onClick={() => onInquire(item, 'Interested')}
              style={{
                flex: 1,
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                border: '1px solid rgba(210, 125, 45, 0.4)',
                padding: '7px 14px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
            >
              <Sparkles size={12} />
              <span>Interested</span>
            </button>
          </div>

        </div>

        {/* SLIDE-UP COMMENTS DRAWER OVERLAY (Within the card) */}
        {showComments && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(10, 18, 13, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            padding: '18px',
            boxSizing: 'border-box'
          }}>
            {/* Drawer Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(210,125,45,0.2)', paddingBottom: '10px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={16} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Comments ({commentsList.length})
                </span>
              </div>
              <button
                onClick={() => setShowComments(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Comments List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
              {commentsList.map(c => (
                <div key={c.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
                  <img
                    src={c.avatar}
                    alt={c.author}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{c.author}</span>
                      <span style={{ fontSize: '0.64rem', color: '#94A3B8' }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: '0.76rem', color: '#E2E8F0', margin: '3px 0 0', lineHeight: 1.4 }}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handlePostComment} style={{ display: 'flex', gap: '8px', marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
              <input
                type="text"
                placeholder="Ask a question or comment..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '4px',
                  border: '1px solid rgba(210,125,45,0.3)',
                  fontSize: '0.8rem',
                  outline: 'none',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--accent-gold)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 14px',
                  borderRadius: '4px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Post
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 4. MAIN COMPONENT: SERVICESHOWCASEPAGE
// ══════════════════════════════════════════════════════════════════════
export default function ServiceShowcasePage({ 
  service: rawService, 
  customService,
  allServices, 
  onBackToHub, 
  onSelectService 
}) {
  const service = customService || rawService;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  
  // When detailedItem is set, user is viewing the full information & media page
  const [detailedItem, setDetailedItem] = useState(null);
  
  // Inquiry form modal state
  const [inquiryItem, setInquiryItem] = useState(null);
  const [inquiryActionType, setInquiryActionType] = useState('Inquire');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const items = Array.isArray(service?.items) ? service.items : [];

  // Toggle snap-active on documentElement only when NOT on detailed view
  useEffect(() => {
    if (!detailedItem) {
      document.documentElement.classList.add('snap-active');
    } else {
      document.documentElement.classList.remove('snap-active');
    }
    return () => document.documentElement.classList.remove('snap-active');
  }, [detailedItem]);

  // Auto-scroll to top when service changes or when toggling item details
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [detailedItem, service?.id]);

  // Track window scroll coordinates
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse coordinates for background depth
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

  // Compute active scroll index info (100vh intervals)
  const getScrollIndexInfo = () => {
    const viewport = window.innerHeight || 800;
    const rawProgress = scrollPosition / viewport;
    const limit = Math.max(0, items.length - 1);
    return {
      progress: rawProgress,
      activeIndex: Math.min(Math.max(0, Math.round(rawProgress)), limit)
    };
  };

  const { progress, activeIndex } = getScrollIndexInfo();

  // Plateau Cross-Fade styles for each snapping index
  const getSectionStyle = (idx) => {
    const diff = progress - idx;
    const dist = Math.abs(diff);
    let opacity = 0;
    let scale = 1;
    let translateY = 0;

    if (dist <= 0.45) {
      opacity = 1;
      scale = 1;
      translateY = 0;
    } else if (dist < 0.55) {
      const factor = (dist - 0.45) / 0.1;
      opacity = 1 - factor;
      if (diff > 0) {
        scale = 1 - factor * 0.12;
        translateY = -factor * 100;
      } else {
        scale = 0.92 + (1 - factor) * 0.08;
        translateY = factor * 70;
      }
    } else {
      opacity = 0;
      if (diff > 0) {
        scale = 0.88;
        translateY = -100;
      } else {
        scale = 0.92;
        translateY = 70;
      }
    }

    return {
      opacity: opacity,
      scale: scale,
      translateY: translateY,
      pointerEvents: opacity > 0.5 ? 'auto' : 'none'
    };
  };

  // 3D Canvas Background Diagonal Positioning
  const getBackgroundPosition = (idx) => {
    if (idx === 0) return { top: '50%', left: '80%' };
    if (idx === 1) return { top: '45%', left: '16%' };
    return { top: '65%', left: '82%' };
  };

  const bgPos = getBackgroundPosition(activeIndex);

  // Coordinate Scanner Sweep calculations
  const viewport = window.innerHeight || 800;
  const scanProgress = (scrollPosition % viewport) / viewport;
  const isTransitioning = scanProgress > 0.05 && scanProgress < 0.95;
  const scanTop = isTransitioning ? `${scanProgress * 100}%` : '-20px';
  const scanOpacity = isTransitioning ? Math.sin(scanProgress * Math.PI) * 0.8 : 0;

  // Handlers
  const handleOpenInquiry = (item, type = 'Inquire') => {
    addInterested({ ...item, serviceId: service.id });
    setInquiryItem(item);
    setInquiryActionType(type);
    setFormSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      message: `Hello Umoja Terra, I am interested in ${type} for "${item.title}".`
    });
  };

  const handleFillDemoData = () => {
    setFormData({
      fullName: 'Dr. Olumide Adeleke',
      email: 'olumide.adeleke@gmail.com',
      phone: '+234 803 452 9811',
      location: 'Victoria Island / Lekki, Lagos',
      message: `I am interested in this verified offer (${inquiryItem?.title || detailedItem?.title || service.title}). Please arrange an immediate inspection / consultation under the Umoja Escrow protocol.`
    });
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please enter your name, email, and phone number.");
      return;
    }
    setFormSubmitted(true);
  };

  // ══════════════════════════════════════════════════════════════════════
  // VIEW MODE: FURTHER INFORMATION & MEDIA (Videos, Full Gallery, Specs)
  // ══════════════════════════════════════════════════════════════════════
  if (detailedItem) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAF9F6', paddingBottom: '90px' }}>
        
        {/* Sticky Details Sub-Bar */}
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
            onClick={() => {
              setDetailedItem(null);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
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

        {/* Detailed Media & Information Content Container */}
        <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 6%' }}>
          
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            padding: '40px 5%',
            boxShadow: '0 10px 35px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}>
            
            {/* Header info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  backgroundColor: 'rgba(210, 125, 45, 0.1)',
                  color: 'var(--accent-gold)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {service.tag}
                </span>
                <span style={{
                  backgroundColor: 'rgba(26, 62, 38, 0.08)',
                  color: 'var(--accent)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {detailedItem.status}
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                color: 'var(--accent)',
                margin: '0 0 16px',
                fontWeight: 400,
                lineHeight: 1.15
              }}>
                {detailedItem.title}
              </h1>

              {/* Pricing & Dimensions Card */}
              <div style={{
                backgroundColor: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
                    Verified Offer Price (Escrow Protected)
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-gold)' }}>₦</span>
                    <span style={{ fontSize: '2.4rem', fontWeight: 700, color: '#1A3E26' }}>
                      {(detailedItem.priceNgn || 0).toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#64748B', marginLeft: '6px' }}>
                      (${(detailedItem.priceUsd || 0).toLocaleString()} USD)
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
                    Scope / Specification
                  </span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent)' }}>
                    {detailedItem.size}
                  </span>
                </div>
              </div>
            </div>

            {/* 0. INTERACTIVE 3D VIRTUAL TOUR */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={18} style={{ color: 'var(--accent-gold)' }} />
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--accent)',
                    margin: 0
                  }}>
                    3D Virtual Reality Tour (Room-by-Room Walkthrough)
                  </h3>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                  High-Precision Photogrammetry Scan
                </span>
              </div>
              <InteractiveVirtualTourViewer 
                virtualTourUrl={detailedItem.virtualTourUrl}
                title={detailedItem.title}
                location={detailedItem.location}
              />
            </div>

            {/* 1. DRONE VIDEO TOUR & CINEMATIC PREVIEW */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Video size={18} style={{ color: 'var(--accent-gold)' }} />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--accent)',
                  margin: 0
                }}>
                  Official Video & Site Footage Tour
                </h3>
              </div>
              <InlineVideoPlayer
                videoUrl={detailedItem.videoUrl}
                placeholderImg={detailedItem.mainImage || detailedItem.photos?.[0]?.img}
              />
            </div>

            {/* 2. FULL MULTI-ANGLE PHOTO GALLERY */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <ImageIcon size={18} style={{ color: 'var(--accent-gold)' }} />
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--accent)',
                  margin: 0
                }}>
                  Full Photo Gallery & Structural Views
                </h3>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px'
              }}>
                {(detailedItem.photos || []).map((ph, i) => (
                  <div key={i} style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img
                      src={ph.img}
                      alt={ph.caption}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ padding: '8px 12px', fontSize: '0.75rem', color: '#4A564E', backgroundColor: '#FAF9F6', fontWeight: 600 }}>
                      {ph.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. DETAILED TECHNICAL OVERVIEW & SPECS */}
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent)', marginBottom: '10px' }}>
                Comprehensive Description & Verification Details
              </h3>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#4A564E', margin: '0 0 20px', fontWeight: 300 }}>
                {detailedItem.description}
              </p>

              <div style={{
                backgroundColor: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '24px'
              }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent)', marginBottom: '14px' }}>
                  Technical Specifications & Legal Guarantees
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                  {(detailedItem.highlights || []).map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#2C3E35' }}>
                      <CheckCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. ACCREDITED TRUSTEE & ACTION STRIP */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              backgroundColor: 'rgba(26, 62, 38, 0.04)',
              borderRadius: '6px',
              border: '1px solid rgba(26, 62, 38, 0.12)',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Shield size={26} style={{ color: 'var(--accent-gold)' }} />
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                    Accredited Partner / Trustee
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent)' }}>
                    {detailedItem.agentOrProvider}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => handleOpenInquiry(detailedItem, 'Proceed with Offer')}
                  className="btn-primary"
                  style={{ padding: '12px 28px', fontSize: '0.84rem' }}
                >
                  Inquire / Book Now →
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Inquiry Modal */}
        {inquiryItem && (
          <InquiryModal
            item={inquiryItem}
            service={service}
            type={inquiryActionType}
            formData={formData}
            setFormData={setFormData}
            formSubmitted={formSubmitted}
            onFillDemo={handleFillDemoData}
            onSubmit={handleSubmitInquiry}
            onClose={() => setInquiryItem(null)}
          />
        )}

      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // VIEW MODE: REMODELED VERTICAL PHONE-LIKE SNAPPING CARDS
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div style={{ width: '100%', position: 'relative', background: '#030504', minHeight: '100vh' }}>
      
      {/* Laser Coordinate Scanner Sweep Line */}
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

      {/* 3D Animated Topography Canvas in Background */}
      <div 
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
        <ScrollLinkedTerrain scroll={scrollPosition} mouse={mouseOffset} />
      </div>

      {/* Fixed Clean Sub-Bar */}
      <div style={{
        position: 'fixed',
        top: '75px',
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
          onClick={onBackToHub}
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
          <span>← Back to Services</span>
        </button>

        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.15rem',
          color: '#FFFFFF',
          fontStyle: 'italic'
        }}>
          {service.title}
        </span>

        <span style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--accent-gold)',
          backgroundColor: 'rgba(210, 125, 45, 0.12)',
          padding: '3px 10px',
          borderRadius: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {service.tag}
        </span>
      </div>

      {/* Normal Document Flow Targets for native 100vh CSS scroll snapping */}
      <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        {items.map((item) => (
          <div key={item.id} id={`${item.id}-sec`} className="plot-snap-target deck-section" style={{ minHeight: '100vh', opacity: 0, pointerEvents: 'none' }} />
        ))}
        <div id="footer-spacer-service" className="plot-snap-target deck-section" style={{ minHeight: '100vh', opacity: 0, pointerEvents: 'none' }} />
      </div>

      {/* Snapping Sections List - ONLY VERTICAL RECTANGULAR CARDS (No description top) */}
      <>
        {items.map((item, idx) => (
          <VerticalProductCard
            key={item.id}
            item={item}
            service={service}
            style={getSectionStyle(idx)}
            onViewFurtherInfo={(it) => {
              setDetailedItem(it);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onInquire={handleOpenInquiry}
          />
        ))}
      </>

      {/* Inquiry Pop-up Modal */}
      {inquiryItem && (
        <InquiryModal
          item={inquiryItem}
          service={service}
          type={inquiryActionType}
          formData={formData}
          setFormData={setFormData}
          formSubmitted={formSubmitted}
          onFillDemo={handleFillDemoData}
          onSubmit={handleSubmitInquiry}
          onClose={() => setInquiryItem(null)}
        />
      )}

    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// 5. INQUIRY MODAL (1-Click Demo Fill for Presentation)
// ══════════════════════════════════════════════════════════════════════
function InquiryModal({ 
  item, 
  service, 
  type, 
  formData, 
  setFormData, 
  formSubmitted, 
  onFillDemo, 
  onSubmit, 
  onClose 
}) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(7, 12, 9, 0.8)',
      backdropFilter: 'blur(6px)',
      zIndex: 2500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        maxWidth: '560px',
        width: '100%',
        padding: '32px',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        border: '1px solid rgba(210, 125, 45, 0.35)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748B'
          }}
        >
          <X size={22} />
        </button>

        {!formSubmitted ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-gold)'
              }}>
                {type} • {service.title}
              </span>

              {/* 1-Click Presentation Autofill Button */}
              <button
                type="button"
                onClick={onFillDemo}
                style={{
                  backgroundColor: 'rgba(210, 125, 45, 0.1)',
                  border: '1px dashed var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Autofill realistic dummy data for presentation"
              >
                <Sparkles size={11} />
                <span>Fill Demo Data (Presentation)</span>
              </button>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              color: 'var(--accent)',
              margin: '0 0 6px',
              fontWeight: 400
            }}>
              {item.title}
            </h3>

            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 20px' }}>
              Price: ₦{(item.priceNgn || 0).toLocaleString()} • Escrow Secured by Umoja Terra.
            </p>

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#1A3E26', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Dr. Olumide Adeleke"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-sans)',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#1A3E26', marginBottom: '4px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="olumide@example.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-sans)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#1A3E26', marginBottom: '4px' }}>
                    Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234 803 000 0000"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-sans)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#1A3E26', marginBottom: '4px' }}>
                  Current City / State
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Lagos, Abuja, London UK, Atlanta US"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-sans)',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#1A3E26', marginBottom: '4px' }}>
                  Inquiry Details / Specific Requests
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify inspection schedule or title verification queries..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    fontSize: '0.88rem',
                    fontFamily: 'var(--font-sans)',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    color: '#64748B',
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
                    flex: 1.5,
                    padding: '12px',
                    backgroundColor: 'var(--accent)',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#FFFFFF',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(26, 62, 38, 0.2)'
                  }}
                >
                  Submit Inquiry Request →
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(26, 62, 38, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle size={32} style={{ color: 'var(--accent)' }} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--accent)', margin: '0 0 10px' }}>
              Inquiry Dispatched Successfully!
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#4A564E', lineHeight: 1.6, marginBottom: '20px' }}>
              Thank you, <strong>{formData.fullName}</strong>. Your request for <strong>{item.title}</strong> has been logged into the Umoja Terra Escrow Queue. Our regional advisor will reach out at <strong>{formData.phone}</strong>.
            </p>

            <div style={{
              backgroundColor: '#FAF9F6',
              border: '1px solid var(--border)',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '0.78rem',
              color: '#64748B',
              marginBottom: '24px'
            }}>
              Escrow Verification Docket Ref: <strong>UMOJA-NG-{(Date.now() % 1000000).toString().padStart(6, '0')}</strong>
            </div>

            <button
              onClick={onClose}
              style={{
                padding: '12px 30px',
                backgroundColor: 'var(--accent)',
                border: 'none',
                borderRadius: '4px',
                color: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              Done & Return
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
