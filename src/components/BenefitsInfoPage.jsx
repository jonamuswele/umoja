import React, { useState } from 'react';
import { Shield, BookOpen, Map, Landmark, Sun, HelpCircle, ChevronDown, TrendingUp, ShieldAlert, Scale, ArrowRight, X, Heart, Home, GraduationCap, ArrowLeft } from 'lucide-react';

const BENEFITS = [
  {
    icon: <Landmark size={24} style={{ color: 'var(--accent-gold)' }} />,
    title: "Generational Wealth",
    desc: "African land values are appreciating rapidly due to urban migration, young demographic expansions, and new infrastructure projects. Owning a piece of land establishes a concrete, growing financial asset for your descendants.",
    articleTitle: "Securing Generational Wealth through Pan-African Real Estate",
    detailedParagraphs: [
      "Real estate has historically stood as the primary bedrock of long-term wealth preservation. On the African continent, this driver is amplified by a historic demographic shift: the median age is just 19.7 years, and the urban population is expanding faster than anywhere else on earth. By buying land, you acquire a physical, finite asset situated in the path of this inevitable expansion.",
      "As metropolitan boundaries push outward, what was once peripheral farmland quickly transforms into high-value residential suburbs or logistics hubs. Investing early in satellite areas allows you to secure large parcels at a fraction of their future value, protecting your family capital from monetary inflation and currency volatility.",
      "Furthermore, land ownership establishes a borrowable equity base. Your descendants can leverage title deeds to secure construction financing, launch businesses, or fund educational advancements. In a global economy defined by shifting paper assets, secure African land remains a permanent, solid foundation."
    ],
    caseStudy: "The Lekki Corridor in Lagos, Nigeria, serves as a prime example of rapid appreciation. Land parcels purchased in the early 2000s for roughly $3,000 USD now command prices exceeding $150,000 USD due to the construction of Lekki Phase 1, new deep-sea ports, and refinery networks. Suburbs around Windhoek (like Elisenheim) and Nairobi (like Ruiru) are experiencing similar 15-20% annualized equity appreciation."
  },
  {
    icon: <Shield size={24} style={{ color: 'var(--accent-gold)' }} />,
    title: "Vetted Sovereignty & Security",
    desc: "By holding verified title deeds under audited legal framework, you secure a physical boundary that cannot be easily eroded by inflation, currency volatility, or market fluctuations.",
    articleTitle: "Navigating Land Sovereignty and Title Security",
    detailedParagraphs: [
      "Sovereignty and security of title are the primary pillars of property investment. Historically, land acquisitions in emerging markets were complicated by informal deed registries, family inheritance disputes, and boundary overlap. Umoja Terra was founded to eliminate these friction points by enforcing audited, transparent legal guidelines.",
      "A secure title deed establishes absolute, legally protected boundaries recognized by state registries. In Commonwealth nations, this often takes the form of Freehold estates (permanent ownership) or Leasehold contracts (99-year state leases, renewable natively). These instruments guarantee that your physical boundary cannot be devalued or eroded by inflation.",
      "Our platform implements a triple-check due diligence protocol: we cross-reference files at centralized registries, hire independent licensed surveyors to place concrete border beacons on-site, and manage payments using secure attorney-held escrow accounts. This guarantees your land is 100% secure before a single dollar is sent to the seller."
    ],
    caseStudy: "Kenya's digitized land registry platform, 'Ardhisasa', has successfully eliminated duplicate titles and land fraud by transitioning registries to a unified GIS database. Similarly, Rwanda's land administration has mapped 100% of national plots, enabling transparent title deeds to be verified, transferred, and cleared in less than 48 hours."
  },
  {
    icon: <Home size={24} style={{ color: 'var(--accent-gold)' }} />,
    title: "Calling Africa Your Home",
    desc: "For members of the global diaspora and locals alike, owning land in Africa is more than an investment; it is a physical connection to the roots, heritage, and future growth of the continent.",
    articleTitle: "A Cultural Homecoming: Establishing Roots and Calling Your Land Home",
    detailedParagraphs: [
      "For the global African diaspora, acquiring property is far more than an investment—it is a physical and spiritual homecoming. Calling your property home means establishing a permanent sanctuary—a place of belonging, peace, and cultural connection on ancestral soil.",
      "For generations, diaspora families have built wealth in foreign countries, yet often lacked a secure home base on the continent. By buying land and developing custom, climate-resilient architecture, you create a tangible base for repatriation, retirement, or holiday reunions. It is a declaration of trust in the continent's future.",
      "Building a home on the continent also builds local communities. By hiring local masons, utilizing regional materials like rammed earth or Swahili timber, and investing in surrounding infrastructure, you directly contribute to regional integration and economic empowerment."
    ],
    caseStudy: "Ghana's 'Year of Return' campaign led to thousands of diaspora members acquiring land in coastal towns like Prampram and mountainous regions like Aburi. Entire neighborhoods have emerged, bringing together international designers, local builders, and diaspora returnees to co-create sustainable, off-grid eco-villages."
  },
  {
    icon: <Map size={24} style={{ color: 'var(--accent-gold)' }} />,
    title: "High-Yield Hospitality Potential",
    desc: "Developing modern, eco-friendly architecture on beautiful plots in tourism-heavy spots (like Diani, Kenya or Swakopmund, Namibia) yields excellent rental returns through short-term vacation stays.",
    articleTitle: "Unlocking High-Yield Hospitality with Sustainable Architecture",
    detailedParagraphs: [
      "The global demand for authentic, eco-friendly, and culturally immersive travel experiences has created a boom in boutique hospitality rentals. Properties situated in coastal reserves, national park borders, or scenic desert spots command premium pricing from international tourists seeking unique retreats.",
      "By purchasing land in these high-value tourism zones and building sustainable, architecturally striking villa models (such as the Swahili Arched Villa or Sahelian Earth Oasis), you tap directly into high-yield vacation rental markets. These rentals operate in USD or Euros, hedging your yields against local currency drops.",
      "Boutique hospitality properties regularly return annual yields of 12% to 18%, far outperforming the 3% to 5% rental yields typical of mature real estate markets in Western capitals. This cash flow can be used to pay off construction offsets, maintain the estate, or fund further land acquisitions."
    ],
    caseStudy: "Swahili-styled villas in Diani Beach, Kenya, and eco-cabins in Swakopmund, Namibia, regularly see 70% occupancy rates on Airbnb. A boutique 3-bedroom villa costing $90,000 USD to construct can generate $15,000 to $22,000 USD in annual net rental revenue, paying off its initial development capital within 5 to 6 years."
  }
];

const GLOSSARY = [
  {
    term: "Title Deed",
    definition: "The official legal document that proves ownership of a specific tract of land. On Umoja Terra, we assist in checking registry databases to guarantee that the title deed is authentic, clean of liens, and registered under the seller's name."
  },
  {
    term: "Freehold Estate",
    definition: "An ownership structure where the buyer holds complete, permanent ownership of the land and all buildings on it indefinitely, with no expiration date."
  },
  {
    term: "Leasehold Estate",
    definition: "An ownership structure where the land is leased for a specific duration (often 99 years in countries like Kenya and Nigeria) from the national government or local authorities. The lease can usually be renewed upon expiration."
  },
  {
    term: "Cadastral Map & Survey",
    definition: "A highly detailed map showing the surveyed borders, coordinates, and boundaries of land plots. Surveyors use this to place physical concrete markers (beacons) on the ground to map out exact properties."
  },
  {
    term: "Escrow Vetting",
    definition: "A secure transaction method where funds or original title documents are held by a neutral legal third party (such as our local corporate lawyers) until all survey boundaries, deeds, and land registries have been thoroughly vetted."
  }
];

const RECOMMENDED_COUNTRIES = [
  {
    name: "Kenya",
    badge: "E-Registry Leader",
    reason: "Kenya has digitized its land registry system under the 'Ardhisasa' platform, dramatically reducing fraud. The mature real estate market, robust legal protections, and high tourism demand in Diani make it an absolute premium choice for investors."
  },
  {
    name: "Namibia",
    badge: "Infrastructure & Security",
    reason: "Namibia offers a highly stable legal system with absolute respect for property rights. Paved roads, clean city services in Windhoek and Swakopmund, and stunning arid landscapes make it the safest entry point for southern African ownership."
  },
  {
    name: "DRC (Congo)",
    badge: "Highest Growth Margin",
    reason: "With urban populations in Kinshasa and Lubumbashi surging, early investors in well-vetted suburban land can expect massive equity appreciation. The beauty of the Congo River waterfront offers untapped premium residential potential."
  },
  {
    name: "Rwanda",
    badge: "Ease of Registration",
    reason: "Consistently ranked as one of the easiest African countries to register property. Clean streets, high public trust, and a centralized GIS-mapped land registry make buying land in Rwanda simple, swift, and highly transparent."
  }
];

const MARKET_COST_ANALYSIS = [
  {
    country: "Chad (Tchad)",
    startingPrice: "$12,000",
    status: "Cheapest Entry Market",
    metrics: "Ideal for agricultural layouts and eco-lodge designs. Lands are highly fertile near N'Djamena, presenting a massive entry-level value margin for long-term holders."
  },
  {
    country: "Nigeria",
    startingPrice: "$22,000",
    status: "Fastest Appreciating Market",
    metrics: "The Lekki-Epe corridor in Lagos is witnessing explosive capital gains. Plots here appreciate at an estimated 25-35% annually due to major logistics and shipping hub developments."
  },
  {
    country: "Namibia",
    startingPrice: "$26,000",
    status: "Most Stable Infrastructure",
    metrics: "Windhoek and Swakopmund boast reliable electrical grids, clean municipal water, and secure freehold options, offering peaceful residential retirement havens."
  },
  {
    country: "DRC (Congo)",
    startingPrice: "$28,000",
    status: "Surging Urban Sprawl",
    metrics: "Kinshasa suburbs represent high-density residential demand. Scarcity of secure waterfront land along the Congo River drives premium capital yields."
  },
  {
    country: "Kenya",
    startingPrice: "$32,000",
    status: "High Tech & Tourism Hub",
    metrics: "Nanyuki savannah plots and Diani beach reserves command premium vacation rentals. High digital security under digitized title checks supports hands-free management."
  }
];

const TERMS_CONDITIONS = [
  {
    title: "1. Scope of Platform Due Diligence",
    text: "Umoja Terra acts as a vetted listing intermediary. While we employ licensed local land surveyors and property lawyers to verify cadastral boundaries and title registry sheets, all transactions require independent inspection by the buyer's counsel before final execution. We verify to the best of our network's ability, but do not provide direct guarantees on behalf of host ministries."
  },
  {
    title: "2. Escrow Account Framework",
    text: "To ensure buyer security, all payment actions must go through recognized corporate escrow bank accounts managed by our legal partners in the host country. Funds are never paid directly to landowners upfront. Funds are held in neutral escrow trust and are only released to the seller once clean title transfer coordinates have been registered in the buyer's name."
  },
  {
    title: "3. Legal Vetting Standards & Coordinate Beacons",
    text: "Sellers wishing to list land on Umoja Terra must submit absolute proof of registered deeds. We perform physical surveying to place concrete border beacons and check local registry files. Listings will be immediately rejected or removed if boundary conflicts, inherited deed disputes, or government reserves overlap."
  },
  {
    title: "4. User-Driven Co-Creation Suggestions",
    text: "Umoja Terra is a community-driven organization. Any feature suggestions, country recommendations, or architectural blueprint designs submitted to our feedback portal are shared openly to improve platform services. By submitting, users grant Umoja Terra the right to integrate feedback features freely."
  }
];

function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      padding: '20px 0',
      transition: 'all 0.25s ease'
    }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        <h4 style={{
          fontSize: '1.05rem',
          fontWeight: 600,
          color: 'var(--text-title)'
        }}>
          {title}
        </h4>
        <ChevronDown 
          size={18} 
          style={{ 
            color: 'var(--accent-gold)', 
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s ease'
          }} 
        />
      </div>
      
      {isOpen && (
        <div style={{
          marginTop: '12px',
          color: 'var(--text-body)',
          fontSize: '0.88rem',
          lineHeight: '1.65',
          fontWeight: 300,
          animation: 'fadeIn 0.25s ease forwards'
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// Background canvas animation for Benefits & Info page (wealth growth metrics & nodes)
function WealthGrowthCanvas() {
  const canvasRef = React.useRef(null);
  const [scrollY, setScrollY] = React.useState(0);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw faint appreciation sine waves with gradients
      ctx.lineWidth = 1.5;
      const time = Date.now() * 0.0006;

      const drawWave = (amplitude, frequency, speed, color, fillStyle) => {
        ctx.strokeStyle = color;
        ctx.beginPath();
        for (let x = 0; x < w; x += 10) {
          const y = h * 0.82 + Math.sin(x * frequency + time * speed - scrollY * 0.0012) * amplitude - (scrollY * 0.04);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (fillStyle) {
          ctx.lineTo(w, h);
          ctx.lineTo(0, h);
          ctx.closePath();
          ctx.fillStyle = fillStyle;
          ctx.fill();
        }
      };

      // Clay gradient fillwave
      drawWave(25, 0.0028, 1.2, 'rgba(210, 125, 45, 0.05)', 'rgba(210, 125, 45, 0.005)');
      // Green gradient fillwave
      drawWave(40, 0.0015, 0.8, 'rgba(26, 62, 38, 0.04)', 'rgba(26, 62, 38, 0.006)');
      drawWave(15, 0.0045, 1.6, 'rgba(26, 62, 38, 0.025)', null);

      // Draw organic scrolling growth vines
      const drawVine = (sx, sy, maxHeight, index) => {
        ctx.strokeStyle = 'rgba(26, 62, 38, 0.04)';
        ctx.lineWidth = 2;

        // Scroll controls how much of the vine has sprouted
        const scrollFactor = Math.min(1, Math.max(0, (scrollY - (index * 80)) / (h * 0.4)));
        if (scrollFactor <= 0) return;

        const actualHeight = maxHeight * scrollFactor;

        ctx.beginPath();
        ctx.moveTo(sx, sy);

        // Control points for organic bending curve
        const sway = Math.sin(time + index) * 15;
        const cx1 = sx + sway;
        const cy1 = sy - actualHeight * 0.4;
        const cx2 = sx - sway;
        const cy2 = sy - actualHeight * 0.7;
        const ex = sx + sway * 0.5;
        const ey = sy - actualHeight;

        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, ex, ey);
        ctx.stroke();

        // Sprout leaves when vine has grown
        if (scrollFactor > 0.4) {
          ctx.fillStyle = 'rgba(210, 125, 45, 0.12)';
          ctx.beginPath();
          ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Sprout a side leaf
          const leafX = sx + sway * 0.2;
          const leafY = sy - actualHeight * 0.5;
          ctx.fillStyle = 'rgba(26, 62, 38, 0.08)';
          ctx.beginPath();
          ctx.ellipse(leafX, leafY, 5, 2.5, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      // Sprout 6 vines along the bottom
      const vineSpacing = w / 7;
      for (let i = 1; i <= 6; i++) {
        const sx = i * vineSpacing;
        const sy = h * 0.82 - (scrollY * 0.04);
        drawVine(sx, sy, 160 + (i % 3) * 40, i);
      }

      // Draw floating spores
      const particleCount = 15;
      ctx.fillStyle = 'rgba(210, 125, 45, 0.12)';
      ctx.strokeStyle = 'rgba(210, 125, 45, 0.06)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particleCount; i++) {
        const px = (w * (0.1 + 0.8 * Math.sin(i * 3567.89 + 1))) % w;
        const pyInitial = (h * (0.2 + 0.6 * Math.sin(i * 1234.56 + 2))) % h;
        const py = (pyInitial - (scrollY * (0.08 + (i % 3) * 0.04)) + h * 5) % h;
        
        const size = 3.5 + (i % 4);
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes to cursor
        if (mouse.x > 0) {
          const dx = mouse.x - px;
          const dy = mouse.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 185) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(210, 125, 45, ${0.1 * (1 - dist / 185)})`;
            ctx.stroke();
          }
        }
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

export default function BenefitsInfoPage() {
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(null);
  const activeBenefit = activeBenefitIndex !== null ? BENEFITS[activeBenefitIndex] : null;

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

  return (
    <div className="page-view-wrapper animate-fade-in" style={{ width: '100%', backgroundColor: 'transparent', position: 'relative' }}>
      <WealthGrowthCanvas />
      
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        textAlign: 'center',
        padding: '75px 6% 45px',
        borderBottom: '1px solid var(--border)'
      }}>
        <p className="section-subtitle">Empowering Knowledge & Homecoming</p>
        <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '16px' }}>
          Benefits, Guides & Home Ownership
        </h1>
        <p style={{ maxWidth: '820px', margin: '0 auto', color: 'var(--text-body)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.65 }}>
          Building a unified Africa starts with calling property your home. A true home is not just a financial asset; it is the boundary of your sanctuary, the soil where your descendants build their dreams, and your permanent anchor on the continent. Explore our interactive insights and real estate blueprints below.
        </p>
      </section>

      {/* Benefits grid */}
      <section style={{ padding: '80px 6%', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 300, color: 'var(--text-title)' }}>
              Why Call Umoja Land Your Home?
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.92rem', fontWeight: 300, margin: '8px 0 0' }}>
              Click on any benefit card to read detailed analytical articles and real-world examples.
            </p>
            <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--accent)', margin: '15px auto 0' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                onClick={() => {
                  setActiveBenefitIndex(i);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '30px',
                  boxShadow: '0 8px 24px rgba(26,62,38,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease'
                }}
                className="hover-lift reveal-on-scroll"
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border)'
                }}>
                  {b.icon}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{b.title}</span>
                </h4>
                <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: '1.6', fontWeight: 300, flexGrow: 1 }}>
                  {b.desc}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginTop: '10px'
                }}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CORE EDUCATIONAL GUIDE ARTICLE (Core Terms, Process, Residential vs. Commercial)
          ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 6%', borderBottom: '1px solid var(--border)', backgroundColor: '#FFFFFF' }}>
        <div className="reveal-on-scroll" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <GraduationCap size={22} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-gold)' }}>
              Umoja Masterclass
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 400, color: '#1A3E26', marginBottom: '16px', lineHeight: 1.15 }}>
            The Blueprint of African Property Ownership
          </h3>
          
          <p style={{ color: '#475569', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '35px' }}>
            Understanding real estate dynamics is essential before purchasing land to call your home. Below is a structured guide detailing the entire acquisition process, key financial metrics, and layout differences.
          </p>

          <div className="reveal-on-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Guide Step 1: Buying Process */}
            <AccordionItem title="1. The Step-by-Step Purchasing Process">
              <div style={{ padding: '5px 0' }}>
                <p style={{ margin: '0 0 12px' }}>
                  Acquiring secure properties on the continent follows a strict legal and logistical timeline:
                </p>
                <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li>
                    <strong>Registry Verification (Due Diligence):</strong> We inspect cadastral maps and title records at local government registries (e.g. Nairobi's Ardhisasa or Namibia's deeds office) to verify clean boundaries and title history.
                  </li>
                  <li>
                    <strong>Physical Survey & Beaconing:</strong> Licensed surveyors verify the geographical coordinates and place concrete marker beacons to establish the physical boundaries of your property.
                  </li>
                  <li>
                    <strong>Escrow Setup:</strong> The buyer transfers funds into a neutral, legal escrow account. Funds are held safely under attorney backing and are not sent to the seller until registration is finalized.
                  </li>
                  <li>
                    <strong>Deed Transfer & Registration:</strong> Once registry checks are cleared, deed transfers are executed, assigning permanent title records into the buyer's name.
                  </li>
                </ol>
              </div>
            </AccordionItem>

            {/* Guide Step 2: Commercial vs Residential */}
            <AccordionItem title="2. Commercial vs. Residential Real Estate: Finding Your Sanctuary">
              <div style={{ padding: '5px 0' }}>
                <p style={{ margin: '0 0 10px' }}>
                  The structural differences determine the yield, usage, and legal frameworks:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '14px' }} className="specs-grid">
                  <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <h5 style={{ margin: '0 0 8px', color: '#1A3E26', fontWeight: 600 }}>Residential Sanctuaries</h5>
                    <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-body)', lineHeight: 1.5 }}>
                      Focused on family homesteads, private villas, and long-term peace of mind. Key priorities are community safety, natural infrastructure (gardens, shading), and proximity to schools. These establish permanent anchors on the continent.
                    </p>
                  </div>
                  <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '16px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <h5 style={{ margin: '0 0 8px', color: '#1A3E26', fontWeight: 600 }}>Commercial Developments</h5>
                    <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-body)', lineHeight: 1.5 }}>
                      Focused on multi-family apartment complexes, agro-logistics warehouses, and vacation rentals. Layouts emphasize space efficiency, heavy vehicle access, proximity to major transport arteries, and steady rental returns.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionItem>

            {/* Guide Step 3: Financial Concepts */}
            <AccordionItem title="3. Financial Dynamics: Understanding Appreciation, Loans, and APR">
              <div style={{ padding: '5px 0' }}>
                <p style={{ margin: '0 0 12px' }}>
                  Navigating transactions requires familiarity with real estate finance terminology:
                </p>
                <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>
                    <strong>Capital Appreciation:</strong> The rate at which your property's value increases over time. Across developing cities (like Kinshasa suburbs or Lekki, Lagos), appreciation averages 15-30% annually, providing a robust shield against inflation.
                  </li>
                  <li>
                    <strong>Mortgage Loans & APR (Annual Percentage Rate):</strong> When financing a build, the APR represents the complete yearly cost of the loan (interest rates plus service fees). While local currency loans often carry high APRs, borrowing in USD or utilizing owner-financing options significantly stabilizes long-term costs.
                  </li>
                  <li>
                    <strong>Rental Yields:</strong> The annual rental income divided by the purchase value. Tourist-heavy beach zones (like Diani) command high yields through short-term bookings, allowing the building to self-finance its construction loan.
                  </li>
                </ul>
              </div>
            </AccordionItem>

          </div>

        </div>
      </section>

      {/* Market Cost Analysis & Cost comparison */}
      <section style={{ padding: '80px 6%', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
              <TrendingUp size={20} style={{ color: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                Comparative Real Estate Economics
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-title)' }}>
              Market Price Comparison & Analytics
            </h3>
            <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--text-body)', fontWeight: 300, fontSize: '0.9rem' }}>
              Detailed overview of active countries showing starting entry price tiers, regional valuation drivers, and the cheapest continental listings.
            </p>
            <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--accent-gold)', margin: '20px auto 0' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }} className="market-analysis-grid">
            {MARKET_COST_ANALYSIS.map((m, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '24px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-title)' }}>
                    {m.country}
                  </h4>
                  <span style={{
                    backgroundColor: 'rgba(210,125,45,0.08)',
                    color: 'var(--accent-gold)',
                    border: '1px solid rgba(210,125,45,0.2)',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em'
                  }}>
                    {m.status}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-body)', fontWeight: 500 }}>Plots Starting From:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-sans)' }}>
                    {m.startingPrice}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginLeft: '4px' }}>USD</span>
                </div>

                <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: '1.6', fontWeight: 300 }}>
                  {m.metrics}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Terminology Glossary & Recommended Countries Split Grid */}
      <section style={{ padding: '80px 6%', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '70px',
          alignItems: 'start'
        }} className="split-grid">
          
          {/* Glossary Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <BookOpen size={20} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>
                Educational Index
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--text-title)', marginBottom: '14px' }}>
              Land & Legal Glossary
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', fontWeight: 300, marginBottom: '30px', lineHeight: 1.6 }}>
              Real estate legalities across Africa can feel daunting. Umoja Terra believes in absolute transparency. Click on the terms below to expand their definitions.
            </p>
 
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {GLOSSARY.map((item, idx) => (
                <AccordionItem key={idx} title={item.term}>
                  {item.definition}
                </AccordionItem>
              ))}
            </div>
          </div>

          {/* Recommended Countries Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <Map size={20} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>
                Investment Outlook
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 300, color: 'var(--text-title)', marginBottom: '24px' }}>
              Recommended Investment Markets
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {RECOMMENDED_COUNTRIES.map((country, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '24px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.01)',
                    transition: 'all 0.2s ease'
                  }}
                  className="country-card-recommend"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-title)' }}>
                      {country.name}
                    </h4>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                      letterSpacing: '0.05em',
                      backgroundColor: '#FFFFFF',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)'
                    }}>
                      {country.badge}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-body)', fontSize: '0.85rem', lineHeight: '1.6', fontWeight: 300 }}>
                    {country.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section style={{ padding: '80px 6%', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <Scale size={20} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>
              Operating Bylaws
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-title)', marginBottom: '14px' }}>
            Terms & Conditions of Service
          </h3>
          <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', fontWeight: 300, marginBottom: '30px', lineHeight: 1.6 }}>
            Umoja Terra is built on trust, transparency, and pan-African unity. Please review the operational bylaws that govern listing, vetting, and transactions.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TERMS_CONDITIONS.map((tc, idx) => (
              <AccordionItem key={idx} title={tc.title}>
                {tc.text}
              </AccordionItem>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          INTERACTIVE BENEFIT DETAILED FULL-PAGE OVERLAY (Covering Entire Screen)
          ══════════════════════════════════════════════════════════════════════ */}
      {activeBenefit && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#FAF9F6', // Immersive Alabaster light reading background
          zIndex: 3000,
          overflowY: 'auto',
          display: 'block',
          padding: '40px 12%',
          boxSizing: 'border-box',
          textAlign: 'left'
        }}>
          {/* Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(26, 62, 38, 0.1)',
            paddingBottom: '20px',
            marginBottom: '40px'
          }}>
            <button 
              onClick={() => setActiveBenefitIndex(null)}
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
                letterSpacing: '0.05em',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Benefits</span>
            </button>

            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              color: 'var(--accent-gold)',
              fontStyle: 'italic'
            }}>
              Umoja Terra Knowledge Hub
            </span>
          </div>

          {/* Article Reading Frame */}
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Category */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(26, 62, 38, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(26, 62, 38, 0.1)'
              }}>
                {activeBenefit.icon}
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Verified Ownership Insight
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              color: '#1A3E26',
              lineHeight: 1.15,
              fontWeight: 400,
              margin: '0 0 25px'
            }}>
              {activeBenefit.articleTitle}
            </h1>

            {/* Detailed researched paragraphs */}
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: '#2C3E35',
              lineHeight: 1.85,
              fontWeight: 300,
              display: 'flex',
              flexDirection: 'column',
              gap: '22px',
              marginBottom: '40px'
            }}>
              {activeBenefit.detailedParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Case Study Block */}
            <div style={{
              backgroundColor: '#F2F6F3', // Light mint-white
              borderLeft: '4px solid var(--accent)',
              borderRadius: '4px',
              padding: '24px 30px',
              marginBottom: '50px'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                color: '#1A3E26',
                margin: '0 0 10px',
                fontWeight: 600
              }}>
                Real-World Case Study & Strategic Applications
              </h4>
              <p style={{
                fontSize: '0.92rem',
                color: '#2C3E35',
                lineHeight: 1.6,
                fontWeight: 300,
                margin: 0
              }}>
                {activeBenefit.caseStudy}
              </p>
            </div>

            {/* Finished Reading Button */}
            <div style={{ textAlign: 'center', borderTop: '1px solid rgba(26,62,38,0.1)', paddingTop: '30px', paddingBottom: '60px' }}>
              <button
                onClick={() => setActiveBenefitIndex(null)}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '14px 35px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(210,125,45,0.25)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
              >
                Finished Reading & Return
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Dynamic styles */}
      <style>{`
        @media (max-width: 900px) {
          .split-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
        }
      `}</style>

    </div>
  );
}
