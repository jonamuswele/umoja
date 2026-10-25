import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

// ── PROJECT DATA ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    year: "2023",
    title: "La Villa Obsidian",
    category: "Architecture",
    location: "Kinshasa, Gombe",
    sqm: 650,
    client: "Privé",
    materials: "Marbre Noir Impérial, Béton Brut, Profilés Laiton",
    description: "Conception architecturale et réalisation complète d'une villa contemporaine de prestige. Volumes géométriques audacieux, baies vitrées de grande portée et finitions intérieures en marbre noir veiné d'or. Un manifeste architectural au cœur de Gombe.",
    pull: "« Une résidence qui redéfinit ce que signifie habiter à Kinshasa. »",
    themePreset: "obsidian",
    accent: "#1c1c1c",
    photos: [
      { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=85", rotate: -3.5, scale: 1,   caption: "Façade principale, orientation sud" },
      { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=85", rotate:  2.1, scale: 0.92, caption: "Grand salon, finitions laiton" },
      { img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=85", rotate: -1.8, scale: 0.88, caption: "Suite parentale, marbre noir" },
    ]
  },
  {
    id: 2,
    year: "2023",
    title: "Penthouse Alabaster Heights",
    category: "Design d'Intérieur",
    location: "Kinshasa, Ngaliema",
    sqm: 320,
    client: "Privé",
    materials: "Marbre Blanc Alabastre, Bois de Chêne, Laiton Doré",
    description: "Aménagement d'intérieur complet d'un appartement de standing. Travail minutieux sur les contrastes thermiques naturels, habillages muraux en chêne blanc flûté et dalles de marbre blanc extra-large format. Un appartement qui respire le calme.",
    pull: "« La lumière de Kinshasa entre ici comme nulle part ailleurs. »",
    themePreset: "alabaster",
    accent: "#b8956a",
    photos: [
      { img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=85", rotate:  2.8, scale: 1,   caption: "Séjour principal, dalles 120×60" },
      { img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=85", rotate: -1.5, scale: 0.9, caption: "Suite parentale, bois flûté" },
      { img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=700&q=85", rotate:  3.2, scale: 0.85, caption: "Salle de bain prestige" },
    ]
  },
  {
    id: 3,
    year: "2022",
    title: "Résidence Japandi Clay",
    category: "Architecture",
    location: "Lubumbashi",
    sqm: 420,
    client: "Privé",
    materials: "Enduits d'Argile, Bois de Frêne, Pierre Volcanique",
    description: "Projet de modélisation 3D et construction écologique. Alliance harmonieuse entre la sérénité du style japonais et la fonctionnalité scandinave. Plâtres d'argile naturelle cuite, mobiliers épurés en frêne massif et jardin zen intérieur.",
    pull: "« La première résidence Japandi de Lubumbashi — construite avec la terre du Katanga. »",
    themePreset: "terracotta",
    accent: "#c4714a",
    photos: [
      { img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=85", rotate: -2.2, scale: 1,   caption: "Séjour, enduit argile naturelle" },
      { img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=85", rotate:  1.9, scale: 0.91, caption: "Façade extérieure, Lubumbashi" },
      { img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=85", rotate: -3.1, scale: 0.87, caption: "Salon cour intérieure" },
    ]
  },
  {
    id: 4,
    year: "2022",
    title: "Skyline Metropolitan Loft",
    category: "Design d'Intérieur",
    location: "Kinshasa, Gombe",
    sqm: 280,
    client: "Bespoke Corp",
    materials: "Béton Ciré, Tissus Velours Bleu Nuit, Acier Brossé",
    description: "Rénovation et agencement de style loft industriel pour un client institutionnel. Dalles en micro-ciment ciré, revêtements de canapés en velours indigo profond, luminaires architecturaux intégrés et grandes ouvertures vitrées sur le fleuve Congo.",
    pull: "« Un loft qui regarde le fleuve et ne ressemble à rien d'autre dans la ville. »",
    themePreset: "velvet",
    accent: "#2c3e6b",
    photos: [
      { img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=85", rotate:  1.5, scale: 1,   caption: "Vue sur le fleuve Congo" },
      { img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=700&q=85", rotate: -2.7, scale: 0.93, caption: "Espace bureau, acier brossé" },
      { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=85", rotate:  3.5, scale: 0.86, caption: "Salon velours indigo" },
    ]
  },
  {
    id: 5,
    year: "2021",
    title: "Boulevard National du Congo",
    category: "Travaux Publics (BTP)",
    location: "Kinshasa",
    sqm: 125000,
    client: "Ministère des Infrastructures (RDC)",
    materials: "Béton Armé Haute Densité, Aciers Soudés, Bitume",
    description: "Travaux publics d'envergure nationale. Terrassement lourd sur 12,5 km linéaires, stabilisation géotechnique des sols argileux, pose d'enrobés bitumineux haute densité et installation complète du réseau de drainage pluvial souterrain.",
    pull: "« 125 000 m² de chaussée posée en 8 mois — un record sur le corridor de Kinshasa. »",
    themePreset: "obsidian",
    accent: "#475569",
    photos: [
      { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85", rotate: -1.8, scale: 1,   caption: "Chantier terrassement, km 4" },
      { img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=85", rotate:  2.4, scale: 0.9, caption: "Drainage pluvial, section nord" },
    ]
  },
  {
    id: 6,
    year: "2021",
    title: "Tour Administrative Nelwan",
    category: "Travaux Publics (BTP)",
    location: "Kinshasa, Gombe",
    sqm: 15400,
    client: "Groupe Sonal",
    materials: "Verre Réfléchissant Low-E, Acier Structurel, Béton Précontraint",
    description: "Étude et gros œuvre d'un bâtiment de bureaux de 12 étages. Intégration de verres Low-E haute performance thermique, charpente métallique porteuse sur fondations profondes et cages d'ascenseurs en béton banché haute résistance.",
    pull: "« La première tour certifiée Low-E de la Gombe — 12 niveaux, 18 mois de chantier. »",
    themePreset: "obsidian",
    accent: "#0F2C59",
    photos: [
      { img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=85", rotate:  2.0, scale: 1,   caption: "Structure, niveau 8" },
      { img: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=700&q=85", rotate: -3.0, scale: 0.88, caption: "Façade rideau, verre Low-E" },
    ]
  },
];

const filters = ['All', 'Architecture', "Design d'Intérieur", 'Travaux Publics (BTP)'];

const CATEGORY_ROMAN = {
  'Architecture': 'I',
  "Design d'Intérieur": 'II',
  'Travaux Publics (BTP)': 'III',
};

// ── PHOTO CLUSTER COMPONENT ─────────────────────────────────────────────────
function PhotoCluster({ photos, side, accent }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '320px',
      flexShrink: 0,
    }}>
      {photos.map((ph, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: i === 0 ? '230px' : i === 1 ? '195px' : '170px',
            top: i === 0 ? '0px' : i === 1 ? '60px' : '30px',
            left: side === 'left'
              ? i === 0 ? '0px' : i === 1 ? '40px' : '80px'
              : i === 0 ? 'auto' : i === 1 ? 'auto' : 'auto',
            right: side === 'right'
              ? i === 0 ? '0px' : i === 1 ? '30px' : '60px'
              : 'auto',
            transform: `rotate(${ph.rotate}deg) scale(${ph.scale})`,
            transformOrigin: 'center center',
            zIndex: 3 - i,
            transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, z-index 0s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = `rotate(0deg) scale(1.06)`;
            e.currentTarget.style.zIndex = 10;
            e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.28)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = `rotate(${ph.rotate}deg) scale(${ph.scale})`;
            e.currentTarget.style.zIndex = 3 - i;
            e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.14)`;
          }}
        >
          {/* Polaroid frame */}
          <div style={{
            background: '#FAFAF8',
            padding: '8px 8px 28px 8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.08)',
            borderRadius: '2px',
          }}>
            <div style={{ overflow: 'hidden', lineHeight: 0 }}>
              <img
                src={ph.img}
                alt={ph.caption}
                style={{
                  width: '100%',
                  aspectRatio: i === 0 ? '4/3' : '3/4',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'sepia(0.08) contrast(1.04)',
                }}
                onError={e => { e.target.parentNode.parentNode.style.display = 'none'; }}
              />
            </div>
            <p style={{
              fontFamily: "'Courier New', monospace",
              fontSize: '0.6rem',
              color: '#888',
              marginTop: '8px',
              textAlign: 'center',
              lineHeight: 1.3,
              letterSpacing: '0.02em',
            }}>
              {ph.caption}
            </p>
          </div>
          {/* Red corner mark on first photo */}
          {i === 0 && (
            <div style={{
              position: 'absolute', top: 0, right: 0,
              width: 0, height: 0,
              borderStyle: 'solid',
              borderWidth: '0 20px 20px 0',
              borderColor: `transparent ${accent} transparent transparent`,
              opacity: 0.7,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── ARTICLE ROW ─────────────────────────────────────────────────────────────
function ArticleRow({ project, index, onSelectPreset }) {
  const isEven = index % 2 === 0;
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2px 1fr',
        gap: '0',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 6%',
        borderBottom: '1px solid #E8E4DC',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        transitionDelay: '0.05s',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      {/* ── LEFT COLUMN ── */}
      <div style={{ order: isEven ? 1 : 3 }}>
        {isEven ? (
          <PhotoCluster photos={project.photos} side="left" accent={project.accent} />
        ) : (
          <ArticleText project={project} align="right" onSelectPreset={onSelectPreset} />
        )}
      </div>

      {/* ── SPINE ── */}
      <div style={{
        order: 2,
        width: '2px',
        alignSelf: 'stretch',
        background: `linear-gradient(to bottom, transparent, ${project.accent}44 30%, ${project.accent}44 70%, transparent)`,
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Year stamp on spine */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#FAFAF8',
          border: `1px solid ${project.accent}55`,
          borderRadius: '50%',
          width: '52px',
          height: '52px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0px',
        }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: '0.55rem', color: '#999', letterSpacing: '0.05em' }}>ANNO</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '0.9rem', fontWeight: 600, color: project.accent, lineHeight: 1 }}>{project.year}</span>
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div style={{ order: isEven ? 3 : 1 }}>
        {isEven ? (
          <ArticleText project={project} align="left" onSelectPreset={onSelectPreset} />
        ) : (
          <PhotoCluster photos={project.photos} side="right" accent={project.accent} />
        )}
      </div>
    </article>
  );
}

// ── ARTICLE TEXT ─────────────────────────────────────────────────────────────
function ArticleText({ project, align, onSelectPreset }) {
  const isLeft = align === 'left';
  return (
    <div style={{ textAlign: isLeft ? 'left' : 'right' }}>

      {/* Category + Roman numeral */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '18px',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.4rem',
          fontWeight: 300,
          color: project.accent,
          opacity: 0.5,
          fontStyle: 'italic',
        }}>
          {CATEGORY_ROMAN[project.category] || 'I'}
        </span>
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: project.accent,
          fontWeight: 600,
        }}>
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
        fontWeight: 300,
        color: '#0F172A',
        lineHeight: 1.08,
        marginBottom: '6px',
        letterSpacing: '-0.02em',
      }}>
        {project.title}
      </h2>

      {/* Location */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        marginBottom: '22px',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
      }}>
        <MapPin size={11} style={{ color: project.accent }} />
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '0.72rem',
          color: '#94A3B8',
          letterSpacing: '0.06em',
        }}>
          {project.location}
        </span>
      </div>

      {/* Decorative rule */}
      <div style={{
        width: '48px',
        height: '1px',
        background: `linear-gradient(to right, ${project.accent}, transparent)`,
        marginBottom: '20px',
        marginLeft: isLeft ? 0 : 'auto',
        transform: isLeft ? 'none' : 'scaleX(-1)',
      }} />

      {/* Body text */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: '0.9rem',
        color: '#475569',
        lineHeight: 1.8,
        fontWeight: 300,
        marginBottom: '22px',
      }}>
        {project.description}
      </p>

      {/* Pull quote */}
      <blockquote style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.05rem',
        fontStyle: 'italic',
        fontWeight: 400,
        color: project.accent,
        borderLeft: isLeft ? `3px solid ${project.accent}55` : 'none',
        borderRight: !isLeft ? `3px solid ${project.accent}55` : 'none',
        paddingLeft: isLeft ? '16px' : '0',
        paddingRight: !isLeft ? '16px' : '0',
        marginBottom: '28px',
        lineHeight: 1.5,
      }}>
        {project.pull}
      </blockquote>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '28px',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'Superficie', val: `${project.sqm.toLocaleString()} m²` },
          { label: 'Client', val: project.client },
        ].map(s => (
          <div key={s.label} style={{ textAlign: isLeft ? 'left' : 'right' }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94A3B8', marginBottom: '2px' }}>{s.label}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', fontWeight: 500, color: '#0F172A' }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Materials strip */}
      <p style={{
        fontFamily: "'Courier New', monospace",
        fontSize: '0.65rem',
        color: '#94A3B8',
        letterSpacing: '0.08em',
        marginBottom: '28px',
        lineHeight: 1.6,
        textTransform: 'uppercase',
      }}>
        {project.materials}
      </p>

      {/* CTA */}
      {onSelectPreset && (
        <button
          onClick={() => onSelectPreset(project.themePreset)}
          style={{
            background: 'transparent',
            border: `1px solid ${project.accent}`,
            color: project.accent,
            padding: '10px 22px',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'all 0.22s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = project.accent;
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = project.accent;
          }}
        >
          Visualiser ce style →
        </button>
      )}
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PortfolioPage({ onSelectPreset }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="animate-fade-in" style={{ width: '100%', background: '#FAFAF8' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Outfit:wght@200;300;400;500;600&display=swap');

        .pf-filter-btn {
          background: transparent;
          border: 1px solid #E2E8F0;
          color: #475569;
          padding: 9px 22px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s ease;
        }
        .pf-filter-btn:hover {
          border-color: #0F2C59;
          color: #0F2C59;
        }
        .pf-filter-btn.active {
          background: #0F2C59;
          border-color: #0F2C59;
          color: #FFFFFF;
        }

        .pf-masthead-bg {
          background: #FAFAF8;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 59px, #E8E4DC 59px, #E8E4DC 60px),
            repeating-linear-gradient(90deg, transparent, transparent 59px, #E8E4DC 59px, #E8E4DC 60px);
          background-size: 60px 60px;
        }

        .pf-year-badge {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
        }

        .pf-category-divider {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 32px 6%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .pf-category-divider::before, .pf-category-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #C5A880, transparent);
        }
      `}</style>

      {/* ── MASTHEAD ──────────────────────────────────────────────────── */}
      <header className="pf-masthead-bg" style={{
        padding: '90px 6% 60px',
        borderBottom: '1px solid #E8E4DC',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Large background numeral */}
        <div style={{
          position: 'absolute',
          right: '6%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(120px, 18vw, 220px)',
          fontWeight: 600,
          color: 'rgba(15,44,89,0.04)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          fontStyle: 'italic',
        }}>
          {filtered.length}
        </div>

        <div style={{ maxWidth: '700px' }}>
          {/* Publication line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <div style={{ width: '32px', height: '1px', background: '#C5A880' }} />
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.68rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#C5A880',
              fontWeight: 600,
            }}>
              Nelwan SARL · Archive des Réalisations
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 300,
            color: '#0F172A',
            lineHeight: 1.0,
            marginBottom: '20px',
            letterSpacing: '-0.03em',
          }}>
            Nos<br />
            <span style={{ fontStyle: 'italic', color: '#C5A880' }}>Réalisations</span>
          </h1>

          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1rem',
            color: '#64748B',
            lineHeight: 1.75,
            fontWeight: 300,
            maxWidth: '520px',
            marginBottom: '40px',
          }}>
            Chaque projet est une histoire. De la fondation au dernier détail de finition — voici les résidences, espaces et infrastructures que nos équipes ont livrés à travers la RDC.
          </p>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                className={`pf-filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f === 'All' ? 'Tous' : f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── ARTICLES ──────────────────────────────────────────────────── */}
      <main>
        {/* Group by category if showing all */}
        {activeFilter === 'All' ? (
          filters.slice(1).map(cat => {
            const catProjects = projects.filter(p => p.category === cat);
            if (!catProjects.length) return null;
            return (
              <div key={cat}>
                {/* Category divider */}
                <div className="pf-category-divider">
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '0.8rem',
                    fontStyle: 'italic',
                    color: '#C5A880',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    {CATEGORY_ROMAN[cat]} — {cat}
                  </span>
                </div>
                {catProjects.map((p, i) => (
                  <ArticleRow key={p.id} project={p} index={i} onSelectPreset={onSelectPreset} />
                ))}
              </div>
            );
          })
        ) : (
          filtered.map((p, i) => (
            <ArticleRow key={p.id} project={p} index={i} onSelectPreset={onSelectPreset} />
          ))
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 6%', color: '#94A3B8', fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 300 }}>
            Aucun projet dans cette catégorie pour le moment.
          </div>
        )}
      </main>

      {/* ── COLOPHON ──────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid #E8E4DC',
        padding: '40px 6%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: '#F5F2EC',
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: '#0F172A',
          fontWeight: 300,
        }}>
          NELWAN <span style={{ color: '#C5A880' }}>SARL</span>
        </span>
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '0.62rem',
          color: '#94A3B8',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Kinshasa, RDC · Construction · Architecture · Design
        </span>
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: '0.62rem',
          color: '#94A3B8',
          letterSpacing: '0.06em',
        }}>
          +(243) 819 919 338
        </span>
      </footer>

    </div>
  );
}