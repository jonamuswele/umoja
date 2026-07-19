import React, { useState } from 'react';
import { Compass, Sparkles, User, Hammer, MapPin, Award, CheckCircle, ChevronRight, X, UserCheck, Briefcase, ArrowLeft } from 'lucide-react';

const HOUSE_MODELS = [
  {
    id: "apartment-complex",
    title: "Eco-Modular Urban Block",
    type: "Apartment Complex",
    desc: "A modern multi-family development designed for high-density tropical urban areas. Built using pre-cast modular concrete and locally manufactured clay bricks, it features natural convective wind shafts, shared solar micro-grids, and vertical green gardens that reduce ambient city temperatures.",
    specs: ["8-24 Units Scalable", "Shared Solar Micro-Grid", "Integrated Rainwater Recycling", "Passive Ventilation Chutes", "Eco-Clay Brick Finishes"],
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
  },
  {
    id: "family-home",
    title: "Rammed Earth Sahelian Oasis",
    type: "Family Home",
    desc: "A warm, climate-resilient homestead built with compressed local soil (rammed earth) and structured timber. The massive thermal insulation of clay walls keeps the interior cool during boiling Sahelian days and warm during cold nights without active air conditioning.",
    specs: ["3 Bedrooms", "3 Bathrooms", "240 SQM Living Area", "100% Local Loam & Stone", "Natural Cooling Vaults"],
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
  },
  {
    id: "sanctuary-villa",
    title: "Savannah Panoramic Pavilion",
    type: "Sanctuary (Villa & Big Yard)",
    desc: "A luxurious sanctuary villa layout featuring expansive panoramic glass panes, soaring vaulted ceilings, and a vast wrap-around hardwood deck. Specially designed to sit in the center of a spacious acreage plot, merging indoor luxury with the surrounding African wild landscape.",
    specs: ["5 Bedrooms", "5.5 Bathrooms", "450 SQM Living Area", "1.5 Acre Landscape Integration", "Bespoke Rooftop Sunset Deck"],
    img: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80"
  },
  {
    id: "industrial-complex",
    title: "Sustainable Agro-Logistics Center",
    type: "Industrial Complex",
    desc: "A high-durability commercial warehouse designed for food processing and regional distribution. Features raw steel structural frames, elevated concrete loading docks, insulated metal roofs, and integrated brick sorting silos using regional masonry techniques.",
    specs: ["1,200 SQM Floor Space", "Heavy Loading Dock Infrastructure", "High Heat Reflection Roofs", "Brick Sorghum Silos", "Office Mezzanine Integrated"],
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  }
];

const ARCHITECTS = [
  {
    id: "amara-drc",
    name: "Mbuya Amara",
    country: "DRC (Congo)",
    specialty: "Sustainable Clay & Rammed Earth Systems",
    bio: "Graduated from the Kinshasa Academy of Fine Arts and specialized in eco-materials in Brussels. Mbuya is passionate about building structural marvels using local African clays and bamboos, merging vernacular traditions with contemporary designs.",
    experience: "8 Projects designed",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    pastProjects: [
      {
        title: "Kinshasa Eco-District Apartments",
        year: "2024",
        desc: "A 24-unit affordable housing block built using compressed local clay blocks and structural bamboo columns, reducing structural carbon footprints by 65%.",
        img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80"
      },
      {
        title: "Lubumbashi Clay Vaults",
        year: "2023",
        desc: "An educational center featuring beautiful self-supporting catenary clay brick vaults that naturally circulate cold air through geothermal tubes.",
        img: "https://images.unsplash.com/photo-1590725140246-20acae4430d2?w=600&q=80"
      }
    ]
  },
  {
    id: "mwangi-kenya",
    name: "David Mwangi",
    country: "Kenya",
    specialty: "High-End Residential & Steel Cantilevers",
    bio: "Based in Nairobi, David has designed and managed modern luxury homes in Runda, Karen, and Nanyuki. His projects leverage clean geometric shapes, smart energy setups, and double-height ceilings to let in East Africa's glorious natural light.",
    experience: "12 Projects designed",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    pastProjects: [
      {
        title: "Nairobi Runda Cantilever Residences",
        year: "2025",
        desc: "A luxury private estate utilizing cantilevered steel spans and double-height panoramic glass envelopes to frame views of the Karura Forest.",
        img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80"
      },
      {
        title: "Nanyuki Acacia Terraces",
        year: "2024",
        desc: "Off-grid homes positioned at the foothills of Mount Kenya, featuring locally-sourced cedar cladding, smart solar battery configurations, and greywater recycling.",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
      }
    ]
  },
  {
    id: "kavango-namibia",
    name: "Ndeutala Kavango",
    country: "Namibia",
    specialty: "Desert Thermal Regulation & Passive Cooling",
    bio: "Ndeutala specializes in arid architecture that withstands extreme Namibian desert heat and freezing winter nights. Her designs use deep overhangs, rock ballast, and low-energy cooling loops to ensure comfortable and sustainable living.",
    experience: "6 Projects designed",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
    pastProjects: [
      {
        title: "Swakopmund Dunes Ecotourism Pavilion",
        year: "2024",
        desc: "A low-impact coastal desert pavilion using rock ballast foundations and deep shading pergolas, naturally cooled by Atlantic fog paths.",
        img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80"
      },
      {
        title: "Windhoek Mountain Valley Terraces",
        year: "2023",
        desc: "Residential homesteads built on steep topography, integrating solar shingles, water harvesting cisterns, and local slate stone floors.",
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
      }
    ]
  },
  {
    id: "olasupo-nigeria",
    name: "Tunde Olasupo",
    country: "Nigeria",
    specialty: "Industrial Complexes & Urban Developments",
    bio: "Tunde leads design projects out of Lagos and Abuja. He specializes in steel framing layouts, structural resilience for delta climates, and large-scale industrial sorting blocks, combining logistics efficiency with sustainable brick work.",
    experience: "15 Projects designed",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
    pastProjects: [
      {
        title: "Lagos Lekki Agro-Sorting Warehouses",
        year: "2025",
        desc: "An 8,000 SQM regional sorting facility utilizing natural ventilation monitors, heavy-duty concrete slab logistics bays, and localized brick facades.",
        img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
      },
      {
        title: "Abuja Kuje Courtyard Homesteads",
        year: "2024",
        desc: "A series of cluster houses connected by central open courtyards, utilizing regional mud-masonry techniques with modern light steel roofing.",
        img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
      }
    ]
  }
];

// Background canvas animation for Houses & Architects page (blueprint schematic wireframe)
function BlueprintSchematicCanvas() {
  const canvasRef = React.useRef(null);
  const [scrollY, setScrollY] = React.useState(0);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid settings
    const gridSpacing = 45;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw faint grid lines
      ctx.strokeStyle = 'rgba(26, 62, 38, 0.035)';
      ctx.lineWidth = 1;
      
      const scrollOffset = (scrollY * 0.12) % gridSpacing;
      
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = -scrollOffset; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw mathematical 3D perspective wireframe cubes
      const draw3DBox = (cx, cy, size, rx, ry, rz) => {
        const s = size / 2;
        // 8 points of a 3D box
        const vertices = [
          {x: -s, y: -s, z: -s},
          {x: s, y: -s, z: -s},
          {x: s, y: s, z: -s},
          {x: -s, y: s, z: -s},
          {x: -s, y: -s, z: s},
          {x: s, y: -s, z: s},
          {x: s, y: s, z: s},
          {x: -s, y: s, z: s}
        ];

        const cosX = Math.cos(rx), sinX = Math.sin(rx);
        const cosY = Math.cos(ry), sinY = Math.sin(ry);
        const cosZ = Math.cos(rz), sinZ = Math.sin(rz);

        // Project 3D coordinate array to 2D screen coordinates
        const projected = vertices.map(v => {
          // Rotate around Y
          let x1 = v.x * cosY - v.z * sinY;
          let z1 = v.x * sinY + v.z * cosY;

          // Rotate around X
          let y2 = v.y * cosX - z1 * sinX;
          let z2 = v.y * sinX + z1 * cosX;

          // Rotate around Z
          let x3 = x1 * cosZ - y2 * sinZ;
          let y3 = x1 * sinZ + y2 * cosZ;

          // Perspective translation
          const dist = 500;
          const scale = dist / (dist + z2);
          return {
            x: cx + x3 * scale,
            y: cy + y3 * scale,
            z: z2
          };
        });

        // Edges array index links
        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0], // back
          [4, 5], [5, 6], [6, 7], [7, 4], // front
          [0, 4], [1, 5], [2, 6], [3, 7]  // connectors
        ];

        edges.forEach(([p1, p2]) => {
          const pt1 = projected[p1];
          const pt2 = projected[p2];
          const isBackEdge = pt1.z < 0 && pt2.z < 0;

          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);

          if (isBackEdge) {
            ctx.strokeStyle = 'rgba(210, 125, 45, 0.035)'; // faint gold
            ctx.setLineDash([2, 4]);
          } else {
            ctx.strokeStyle = 'rgba(210, 125, 45, 0.08)'; // solid gold
            ctx.setLineDash([]);
          }
          ctx.stroke();
        });
        ctx.setLineDash([]);

        // Joint nodes
        projected.forEach(pt => {
          ctx.fillStyle = pt.z >= 0 ? 'rgba(210, 125, 45, 0.15)' : 'rgba(210, 125, 45, 0.08)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      };

      const rotationAngle = (Date.now() * 0.00008) + (scrollY * 0.0006);
      draw3DBox(w * 0.12, h * 0.45 + (scrollY * 0.1), 110, rotationAngle, rotationAngle * 0.5, rotationAngle * 0.8);
      draw3DBox(w * 0.88, h * 0.72 - (scrollY * 0.09), 140, -rotationAngle, -rotationAngle * 0.6, -rotationAngle * 0.4);

      // Draw high-tech blueprint reticle at mouse position
      if (mouse.x > 0) {
        ctx.strokeStyle = 'rgba(210, 125, 45, 0.07)';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(210, 125, 45, 0.04)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 35, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(210, 125, 45, 0.08)';
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.moveTo(mouse.x - 60, mouse.y);
        ctx.lineTo(mouse.x + 60, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 60);
        ctx.lineTo(mouse.x, mouse.y + 60);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(26, 62, 38, 0.22)';
        ctx.font = '8px monospace';
        ctx.fillText(`X:${Math.round(mouse.x)}`, mouse.x + 40, mouse.y + 3);
        ctx.fillText(`Y:${Math.round(mouse.y)}`, mouse.x - 30, mouse.y - 45);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY, mouse]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: '#FAF9F6' // Alabaster background
      }}
    />
  );
}

export default function HousesArchitectsPage({ onConnectArchitect }) {
  const [selectedModel, setSelectedModel] = useState(HOUSE_MODELS[0]);
  const [selectedArchitectId, setSelectedArchitectId] = useState(null);
  
  // Trigger reveal on scroll transitions
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Popup modal state
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    userLocation: '',
    plotLocation: 'Kenya'
  });

  const selectedArchitect = ARCHITECTS.find(a => a.id === selectedArchitectId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitPopup = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill out your identity details (Name, Email, Phone).");
      return;
    }

    const titleInfo = selectedArchitectId 
      ? `Architect Connect - ${selectedArchitect?.name}`
      : `${selectedModel.type} - ${selectedModel.title}`;

    alert(`Success! We have recorded your request to connect for ${titleInfo}. Our corporate representative and local partner architect will reach out to you within 24 hours.`);
    
    onConnectArchitect({
      title: selectedArchitectId ? selectedArchitect?.name : selectedModel.title,
      buildCostEstimate: "N/A",
      customMessage: `Hello, I am ${formData.fullName} based in ${formData.userLocation || 'N/A'}. I am interested in building a plot layout in ${formData.plotLocation} and want to collaborate with ${selectedArchitectId ? selectedArchitect?.name : 'the regional architect for ' + selectedModel.title}.`
    }, 'Architect Connect');
    
    setIsPopupOpen(false);
  };

  return (
    <div className="page-view-wrapper animate-fade-in" style={{ width: '100%', backgroundColor: 'transparent', position: 'relative' }}>
      <BlueprintSchematicCanvas />
      
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        textAlign: 'center',
        padding: '70px 6% 45px',
        borderBottom: '1px solid var(--border)'
      }}>
        <p className="section-subtitle">Architectural Networks</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '16px' }}>
          Pan-African Blueprints & Vetted Masters
        </h1>
        <p style={{ maxWidth: '820px', margin: '0 auto', color: 'var(--text-body)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.65 }}>
          Linking you up with the biggest architects on the continent, by price, by expertise and by location. Some you'll need to take to the country of designation and some will already be there. Explore our modular concepts, pick a blueprint style, and let us connect you instantly.
        </p>
      </section>

      {/* House Archetypes Showroom */}
      <section style={{ padding: '80px 6%', borderBottom: '1px solid var(--border)' }}>
        <div className="reveal-on-scroll" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1.5fr', gap: '50px', alignItems: 'start' }} className="visualizer-grid">
            
            {/* Left Column: Selector list */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-title)', marginBottom: '24px', fontWeight: 300 }}>
                Select a Blueprint Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {HOUSE_MODELS.map((model) => {
                  const isSelected = selectedModel.id === model.id;
                  return (
                    <div
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      style={{
                        padding: '20px 24px',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? 'var(--bg-secondary)' : '#FFFFFF',
                        transition: 'all 0.25s ease'
                      }}
                      className="model-select-card"
                    >
                      <span style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: isSelected ? 'var(--accent-gold)' : '#94A3B8',
                        marginBottom: '6px',
                        letterSpacing: '0.05em'
                      }}>
                        {model.type}
                      </span>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: 'var(--text-title)'
                      }}>
                        {model.title}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Middle Spine spacer */}
            <div style={{
              width: '2px',
              backgroundColor: 'var(--border)',
              alignSelf: 'stretch'
            }} className="desktop-spine" />

            {/* Right Column: Model display details (NO PRICE SHOWN) */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0,0,0,0.03)'
            }}>
              <img
                src={selectedModel.img}
                alt={selectedModel.title}
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div style={{ padding: '36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'baseline', gap: '15px', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-title)', fontWeight: 400 }}>
                    {selectedModel.title}
                  </h3>
                  <span style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)'
                  }}>
                    {selectedModel.type}
                  </span>
                </div>

                <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '24px', fontWeight: 300 }}>
                  {selectedModel.desc}
                </p>

                {/* Blueprints specs checklist */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-title)', letterSpacing: '0.05em', marginBottom: '14px' }}>
                    Features & Specifications
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="specs-grid">
                    {selectedModel.specs.map((spec, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-body)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--accent)' }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button triggers Pop-up modal */}
                <button
                  onClick={handleOpenPopup}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--accent)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 8px 24px rgba(26,62,38,0.1)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                >
                  Select Concept & Consult An Architect
                </button>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Architect Directory or Detailed Portfolio Sub-Page */}
      <section style={{ padding: '80px 6%', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {!selectedArchitectId ? (
            /* ══════════════════════════════════════════════════════════════════════
               ARCHITECTS DIRECTORY VIEW
               ══════════════════════════════════════════════════════════════════════ */
            <>
              <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <p className="section-subtitle">Continental Network</p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-title)' }}>
                  Partner Architects & Vetted Portfolios
                </h3>
                <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--text-body)', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Connect with vetted local architects who understand building regulations, soil testing, and construction logistics. Click any card to view detailed past projects.
                </p>
                <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--accent-gold)', margin: '20px auto 0' }} />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '30px'
              }}>
                {ARCHITECTS.map((arch) => (
                  <div
                    key={arch.id}
                    onClick={() => {
                      setSelectedArchitectId(arch.id);
                    }}
                    className="reveal-on-scroll"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '30px',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      transition: 'transform 0.25s ease, border-color 0.25s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = 'var(--accent-gold)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--border)';
                    }}
                  >
                    
                    {/* Architect Header Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '18px' }}>
                      <img
                        src={arch.img}
                        alt={arch.name}
                        style={{
                          width: '74px',
                          height: '74px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid var(--accent-gold)'
                        }}
                        onError={e => { e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"; }}
                      />
                      <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                          {arch.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)' }}>
                          <MapPin size={12} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {arch.country}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Specialty tag */}
                    <div style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border)',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-title)',
                      marginBottom: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Award size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                      <span>{arch.specialty}</span>
                    </div>

                    {/* Bio */}
                    <p style={{
                      color: 'var(--text-body)',
                      fontSize: '0.85rem',
                      lineHeight: '1.6',
                      fontWeight: 300,
                      marginBottom: '18px',
                      flexGrow: 1
                    }}>
                      {arch.bio}
                    </p>

                    {/* Vetted Past Projects (Mini List) */}
                    <div style={{
                      backgroundColor: '#F8FAFC',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '16px',
                      marginBottom: '20px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <Briefcase size={14} style={{ color: 'var(--accent-gold)' }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>
                          Portfolios ({arch.pastProjects.length})
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 400 }}>
                        Click to view detailed past projects & images
                      </span>
                    </div>

                    {/* Project count and CTA */}
                    <div style={{
                      borderTop: '1px solid var(--border)',
                      paddingTop: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: "'Courier New', monospace" }}>
                        {arch.experience.toUpperCase()}
                      </span>
                      
                      <div style={{
                        color: 'var(--accent)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span>View Portfolio</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </>
          ) : (
            /* ══════════════════════════════════════════════════════════════════════
               DETAILED ARCHITECT PORTFOLIO VIEW (Opens when card is clicked)
               ══════════════════════════════════════════════════════════════════════ */
            <div className="animate-fade-in" style={{ textAlign: 'left' }}>
              
              {/* Back Breadcrumb */}
              <button 
                onClick={() => setSelectedArchitectId(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginBottom: '35px',
                  padding: 0,
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <ArrowLeft size={16} />
                <span>Back to Architect Directory</span>
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '40px', alignItems: 'start' }} className="visualizer-grid">
                
                {/* Left Profile Panel */}
                <div style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '30px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', marginBottom: '22px' }}>
                    <img
                      src={selectedArchitect?.img}
                      alt={selectedArchitect?.name}
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid var(--accent-gold)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                      }}
                    />
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1A3E26', margin: '0 0 6px', fontWeight: 500 }}>
                        {selectedArchitect?.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: 'var(--accent)' }}>
                        <MapPin size={14} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {selectedArchitect?.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-title)',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center'
                  }}>
                    <Award size={16} style={{ color: 'var(--accent-gold)' }} />
                    <span>{selectedArchitect?.specialty}</span>
                  </div>

                  <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: '1.65', fontWeight: 300, margin: '0 0 25px' }}>
                    {selectedArchitect?.bio}
                  </p>

                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        plotLocation: selectedArchitect?.country.includes('DRC') ? 'DRC' : selectedArchitect?.country
                      }));
                      handleOpenPopup();
                    }}
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--accent)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      boxShadow: '0 6px 16px rgba(210,125,45,0.15)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                  >
                    Connect & Consult
                  </button>
                </div>

                {/* Right Portfolio Display Panel */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2rem',
                    color: '#1A3E26',
                    margin: '0 0 10px',
                    fontWeight: 400
                  }}>
                    Vetted Portfolio & Achievements
                  </h3>
                  <p style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 300, margin: '0 0 30px' }}>
                    Below is a detailed breakdown of vetted structural works completed by {selectedArchitect?.name} in regional conditions.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {selectedArchitect?.pastProjects.map((proj, idx) => (
                      <div 
                        key={idx}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          display: 'grid',
                          gridTemplateColumns: '1.2fr 2fr',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.02)'
                        }}
                        className="visualizer-grid"
                      >
                        <img 
                          src={proj.img} 
                          alt={proj.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            minHeight: '160px',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h4 style={{ fontSize: '1.15rem', color: '#1A3E26', fontWeight: 600, margin: 0 }}>
                              {proj.title}
                            </h4>
                            <span style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              color: 'var(--accent-gold)',
                              backgroundColor: 'var(--bg-secondary)',
                              padding: '2px 8px',
                              borderRadius: '4px'
                            }}>
                              {proj.year}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0, fontWeight: 300 }}>
                            {proj.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FORM CONTACT POP-UP OVERLAY MODAL (Identity, Location, Plot Location)
          ══════════════════════════════════════════════════════════════════════ */}
      {isPopupOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 15, 12, 0.72)', // Dark forest charcoal overlay
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
            boxSizing: 'border-box'
          }}>
            {/* Close Button */}
            <button 
              onClick={handleClosePopup}
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

            {/* Header */}
            <div style={{ marginBottom: '22px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <UserCheck size={18} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Secure Connection Hub
                </span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: '#1A3E26',
                margin: 0,
                fontWeight: 400
              }}>
                Consult Designated Architect
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '4px 0 0', fontWeight: 300 }}>
                Category: <strong>{selectedArchitectId ? `Architect Connection (${selectedArchitect?.name})` : `${selectedModel.type} (${selectedModel.title})`}</strong>
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmitPopup} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
              
              {/* Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
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
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Email & Phone grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
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
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              {/* User Current Location */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Your Current Location (City/Country)
                </label>
                <input
                  type="text"
                  name="userLocation"
                  value={formData.userLocation}
                  onChange={handleInputChange}
                  placeholder="e.g. London, UK or Lagos, Nigeria"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Plot Target Destination Country Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#475569', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Location of Your Plot (Target Country) *
                </label>
                <select
                  name="plotLocation"
                  value={formData.plotLocation}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Kenya">Kenya</option>
                  <option value="DRC">DRC (Congo)</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Chad">Chad</option>
                  <option value="Nigeria">Nigeria</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={handleClosePopup}
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
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
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
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(210, 125, 45, 0.15)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
                >
                  Connect Me
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* CSS adjustments */}
      <style>{`
        @media (max-width: 900px) {
          .visualizer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .desktop-spine {
            display: none !important;
          }
          .specs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
