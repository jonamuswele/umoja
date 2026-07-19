import React, { useState, useEffect } from 'react';
import { Compass, Phone, Mail, MapPin, Menu, X } from 'lucide-react';

// Import our subcomponents
import Home from './components/Home';
import ExplorePage from './components/ExplorePage';
import HousesArchitectsPage from './components/HousesArchitectsPage';
import BenefitsInfoPage from './components/BenefitsInfoPage';
import ContactPage from './components/ContactPage';
import LandownerPortal from './landowner/LandownerPortal';
import { apiService } from './services/api';

const DEFAULT_COUNTRIES = [
  {
    id: "kenya",
    name: "Kenya",
    motto: "The Cradle of Humanity & Innovation",
    accent: "#D27D2D",
    desc: "Renowned for its breathtaking Savannahs, the majestic Rift Valley, the vibrant technological ecosystem of Nairobi (Silicon Savannah), and pristine white-sand beaches in Diani. Buying land in Kenya connects you with East Africa's leading economic and tourism powerhouse.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    highlights: ["Silicon Savannah Tech Hub", "Maasai Mara Wild Migration", "Robust Digitized Land Registry"],
    potentialNeighborhoods: [
      { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", caption: "Premium green suburbs of Karen & Runda" },
      { img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80", caption: "Palm-fringed holiday estates in Diani Beach" }
    ],
    cultureInfo: {
      whyLive: "Live here for the perfect balance of a booming tech-driven economy (Silicon Savannah) and world-renowned natural beauty. The local climate is year-round spring-like weather with warm, sunny days.",
      bestBuild: "Coastal Arched Villas in Diani or modern stone-finish ecological lodges in Nanyuki. Rammed earth construction using red volcanic soil is highly sustainable and matches the red African backdrop.",
      culture: "Warm, welcoming, and community-centric. Swahili culture emphasizes hospitality (Karibu) and collective action (Harambee), fostering great neighborhood integration.",
      culturePhotos: [
        { img: "https://images.unsplash.com/photo-1489440543286-a69330151c0b?w=800&q=80", rotate: -3.5, scale: 1, caption: "Community gathering and Swahili traditions" },
        { img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80", rotate: 2.5, scale: 0.9, caption: "Local architectural details & warm earth tones" }
      ]
    },
    plots: [
      {
        id: "ke-nanyuki",
        title: "Nanyuki Savannah Foothills",
        size: "50m x 40m (2,000 SQM)",
        neighborhood: "Located in a secure gated community just 15 minutes outside Nanyuki town. The neighborhood is rich in acacia woodlands, featuring panoramic views of Mt. Kenya's snow peaks and neighbors a local wildlife conservancy. Pre-installed electricity and clean borehole water connections are fully certified.",
        price: 32000,
        photos: [
          { img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80", rotate: -3.5, scale: 1, caption: "Acacia woodlands surrounding the estate" },
          { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", rotate: 2.1, scale: 0.92, caption: "View of the actual flat, surveyed plot" }
        ]
      },
      {
        id: "ke-diani",
        title: "Diani Coastal Breezes",
        size: "30m x 25m (750 SQM)",
        neighborhood: "Situated in a peaceful, upscale residential enclave in Diani, only a 10-minute walk from the world-famous white sandy shores. The surrounding area features lush coconut palms, boutique lodges, and smooth access roads. Perfect for building a premium holiday villa or a retirement sanctuary.",
        price: 48000,
        photos: [
          { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", rotate: 2.8, scale: 1, caption: "Quiet coastal access path to the beach nearby" },
          { img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80", rotate: -1.5, scale: 0.9, caption: "The cleared plot terrain ready for construction" }
        ]
      }
    ]
  },
  {
    id: "drc",
    name: "DRC (Congo)",
    motto: "The Heartbeat of the Continent",
    accent: "#1A3E26",
    desc: "A land of unparalleled natural abundance, from the mighty Congo River to the world's second-largest rainforest. Urban centers like Kinshasa and Lubumbashi are expanding rapidly, presenting exceptional opportunities for residential and commercial real estate development in prime hubs.",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    highlights: ["Kinshasa Urban Expansion", "Congo River Scenic Waterfronts", "Rich Soil & Agricultural Potential"],
    potentialNeighborhoods: [
      { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", caption: "Riverside properties along the Congo River" },
      { img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", caption: "Upscale residential enclaves in Golf, Lubumbashi" }
    ],
    cultureInfo: {
      whyLive: "Unparalleled natural wealth and biodiversity. The Congo River provides a scenic waterfront backdrop, and rapid urban growth presents exceptional investment and agricultural opportunities.",
      bestBuild: "High-thermal-mass Rammed Earth Pavilions or modern brick waterfront residences. Heavy brick structures insulate against the tropical climate, using regional clay for cooling ventilation.",
      culture: "Vibrant, creative, and musically rich. The people of Congo are famous for their unmatched artistic expression, legendary Soukous music, and the elegant Sapeurs fashion culture.",
      culturePhotos: [
        { img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80", rotate: -2.8, scale: 1, caption: "Vibrant Congolese musical rhythm and artistic crafts" },
        { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", rotate: 2.0, scale: 0.92, caption: "Riverside design inspiration using local materials" }
      ]
    },
    plots: [
      {
        id: "drc-kinkole",
        title: "Kinshasa Riverbend Estate",
        size: "40m x 30m (1,200 SQM)",
        neighborhood: "Located in Kinkole's scenic riverside area, offering fresh breezes off the Congo River and a tranquil atmosphere away from Central Kinshasa. The local area features artisanal fish markets, riverside restaurants, and a developing green belt. Soil is highly stable and prepared for multi-story residential building.",
        price: 28000,
        photos: [
          { img: "https://images.unsplash.com/photo-1489440543286-a69330151c0b?w=800&q=80", rotate: -2.2, scale: 1, caption: "Congo River bank and lush canopy close to site" },
          { img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80", rotate: 1.9, scale: 0.91, caption: "The surveyed plot boundary marker" }
        ]
      },
      {
        id: "drc-lubumbashi",
        title: "Lubumbashi Golf Extension",
        size: "35m x 30m (1,050 SQM)",
        neighborhood: "Vetted land in the peaceful, high-end Golf District extension of Lubumbashi. Safe streets, paved road access, and pre-connected grids make this one of the most stable investments in the Katanga province. The neighborhood boasts modern villas, private schools, and recreational parks.",
        price: 35000,
        photos: [
          { img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80", rotate: -3.0, scale: 1, caption: "Modern streetscape in the neighboring residential sector" },
          { img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", rotate: 2.5, scale: 0.88, caption: "Bare land plot showing rich, flat Katanga soil" }
        ]
      }
    ]
  },
  {
    id: "namibia",
    name: "Namibia",
    motto: "Ethereal Landscapes & Absolute Stability",
    accent: "#D27D2D",
    desc: "A country of dramatic contrasts, where the Namib Desert meets the wild Atlantic Ocean. Highly secure land titles, excellent infrastructure, and a quiet, law-abiding lifestyle make Namibia one of the safest hubs for physical land ownership in southern Africa.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    highlights: ["Highly Secure Land Registry", "Swakopmund Coastline Living", "Ecotourism Hub"],
    potentialNeighborhoods: [
      { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", caption: "Mountain valley layouts in Windhoek Estates" },
      { img: "https://images.unsplash.com/photo-1599809228728-5a0eebf9c55b?w=600&q=80", caption: "Clean streets of coastal Swakopmund" }
    ],
    cultureInfo: {
      whyLive: "Unrivaled peace, safety, and absolute legal stability. Perfect for those looking for clean desert breezes, spectacular dune landscapes, and highly developed modern infrastructure.",
      bestBuild: "Rammed Earth Oasis designs using desert sand, or solar-passive desert pavilions. Structures require thick earthen walls to regulate the high desert heat during the day and capture warmth at night.",
      culture: "A peaceful, law-abiding community with a rich tapestry of Nama, Herero, and Ovambo traditions. The local way of life values conservation, quiet wilderness, and peaceful co-existence.",
      culturePhotos: [
        { img: "https://images.unsplash.com/photo-1516026672322-bc52d61a5537?w=800&q=80", rotate: 2.0, scale: 1, caption: "Tranquil desert sandscapes and architecture" },
        { img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80", rotate: -3.0, scale: 0.88, caption: "Ecotourism design using local wood and stone structures" }
      ]
    },
    plots: [
      {
        id: "na-swakop",
        title: "Swakopmund Dunes & Sea Vista",
        size: "30m x 20m (600 SQM)",
        neighborhood: "Located in the quiet suburban coastal zone of Swakopmund, with the Namib dunes on one side and the Atlantic ocean breeze on the other. Extremely clean municipal services, reliable water, paved roads, and walking distance to beachfront boardwalks. Highly attractive for Airbnb developments.",
        price: 42000,
        photos: [
          { img: "https://images.unsplash.com/photo-1516026672322-bc52d61a5537?w=800&q=80", rotate: 2.0, scale: 1, caption: "Namib desert coastal landscape neighboring the suburb" },
          { img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80", rotate: -3.0, scale: 0.88, caption: "Direct view of the cleared plot corner" }
        ]
      },
      {
        id: "na-elisenheim",
        title: "Windhoek Elisenheim Estate",
        size: "25m x 20m (500 SQM)",
        neighborhood: "Nestled in the mountain valleys of Elisenheim Lifestyle Estate, just north of Windhoek. Features 24/7 security patrol, child-friendly parks, a community shopping center, and absolute quietness. An ideal plot for family homes or high-yield rental townhouses.",
        price: 26000,
        photos: [
          { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", rotate: -1.8, scale: 1, caption: "Beautiful mountain views surrounding the valley estate" },
          { img: "https://images.unsplash.com/photo-1533240332313-0db49b439ad3?w=800&q=80", rotate: 2.4, scale: 0.9, caption: "The surveyed plot showing boundary coordinates" }
      ]
      }
    ]
  },
  {
    id: "chad",
    name: "Chad (Tchad)",
    motto: "The Soul of the Sahel",
    accent: "#1A3E26",
    desc: "A nation defined by the stunning Sahara sandstone monoliths of Ennedi, historic trade routes, and a deep culture of community. Investing in Chad offers early-market advantages in the fast-urbanizing capital N'Djamena, where infrastructure development is surging.",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    highlights: ["Early Market Appreciation", "N'Djamena Commercial Core", "Rich Sahelian Heritage"],
    potentialNeighborhoods: [
      { img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80", caption: "Sun-drenched courtyard home designs" },
      { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", caption: "Rapidly expanding residential avenues in Chagoua" }
    ],
    cultureInfo: {
      whyLive: "Live here for an authentic Sahelian experience and early-market investment gains in N'Djamena. A region of historical trans-Saharan trade routes, sandstone monoliths, and vast open skies.",
      bestBuild: "Adobe Earth-block vaults or courtyard-style adobe homesteads. Thick loam walls and central courtyard designs keep houses cool in the dry, warm Sahel climate without active air conditioning.",
      culture: "Deeply collaborative and resilient. The Sahelian heritage is grounded in pastoral community ties, traditional horse racing, and high respect for family and elders.",
      culturePhotos: [
        { img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80", rotate: -3.5, scale: 1, caption: "Sahelian community values and mud architecture" },
        { img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80", rotate: 2.1, scale: 0.92, caption: "Traditional courtyard home styling" }
      ]
    },
    plots: [
      {
        id: "td-chagoua",
        title: "N'Djamena Chagoua Hub",
        size: "30m x 30m (900 SQM)",
        neighborhood: "Situated in N'Djamena's rapidly developing Chagoua district, adjacent to new commercial centers and near the Chari River. Fertile grounds, rising local valuations, and friendly community layout make this plot ideal for a family homestead with structural resilience.",
        price: 18000,
        photos: [
          { img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80", rotate: -3.5, scale: 1, caption: "Lush vegetation near the Chari River green belt" },
          { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80", rotate: 2.1, scale: 0.92, caption: "View of the actual flat, surveyed plot" }
        ]
      }
    ]
  },
  {
    id: "nigeria",
    name: "Nigeria",
    motto: "The Giant of Africa",
    accent: "#D27D2D",
    desc: "Africa's economic heartbeat and largest population. The Lekki-Epe corridor in Lagos and the planned districts of Abuja represent some of the highest-growth land value zones in the world. Secure land titles here guarantee long-term wealth appreciation.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    highlights: ["Epe-Lekki High Appreciation Corridor", "Abuja Serene Diplomatic Enclaves", "High Rental Market Yields"],
    potentialNeighborhoods: [
      { img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80", caption: "Gated estate villas in Lekki-Epe, Lagos" },
      { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", caption: "Modern valley residences in Kuje, Abuja" }
    ],
    cultureInfo: {
      whyLive: "The economic giant of Africa. Live here to tap into the continent's largest digital hub, high-energy trade, and a booming middle-class real estate market with exceptional investment growth.",
      bestBuild: "Contemporary concrete-frame estates or modern eco-pavilions with wide overhanging roofs. Structures must incorporate elevated foundations for seasonal rains and deep solar shading layouts.",
      culture: "Lively, ambitious, and globally influential. Nigeria is the powerhouse of Nollywood, Afrobeat music, and vibrant fashion. The culture is energetic, enterprising, and highly celebratory.",
      culturePhotos: [
        { img: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80", rotate: 2.8, scale: 1, caption: "Vibrant Lagos fashion and energetic Afrobeat spaces" },
        { img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80", rotate: -1.5, scale: 0.9, caption: "Modern tropical villa and shaded balcony architecture" }
      ]
    },
    plots: [
      {
        id: "ng-epe",
        title: "Epe New Horizon Estate",
        size: "30m x 20m (600 SQM)",
        neighborhood: "Vetted dry land situated in a gated layout along the Lekki-Epe corridor, Lagos. The surrounding area is seeing explosive development, including the new Lekki international airport zone. Clean paved roads, streetlights, and 24/7 security. Title: Certificate of Occupancy (C of O).",
        price: 22000,
        photos: [
          { img: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80", rotate: 2.8, scale: 1, caption: "Lush palm-lined boulevard at the estate entrance" },
          { img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80", rotate: -1.5, scale: 0.9, caption: "Flat dry plot terrain with clear beacons" }
        ]
      },
      {
        id: "ng-kuje",
        title: "Abuja Kuje Green Valley",
        size: "40m x 25m (1,000 SQM)",
        neighborhood: "Located in the quiet and scenic valley of Kuje, Abuja. The neighborhood features serene mountain backdrops, fresh air, private security guards, and modern family homesteads. An excellent investment for a spacious luxury home or agricultural garden compound.",
        price: 29000,
        photos: [
          { img: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80", rotate: -2.2, scale: 1, caption: "Panoramic scenic landscape around the Kuje hills" },
          { img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80", rotate: 1.9, scale: 0.91, caption: "The secure plot perimeter boundary" }
        ]
      }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, explore, houses, benefits, contact, admin
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle snap-active class on root html node for scroll snapping only on home and explore pages
  useEffect(() => {
    if (activeTab === 'home' || activeTab === 'explore') {
      document.documentElement.classList.add('snap-active');
    } else {
      document.documentElement.classList.remove('snap-active');
    }
    // Clean up class if component unmounts
    return () => document.documentElement.classList.remove('snap-active');
  }, [activeTab]);

  // Dynamic state loaded from localStorage if exists
  const [countriesData, setCountriesData] = useState(() => {
    const local = localStorage.getItem('umoja_countries_data');

    // Helper to ensure all plots have an owner assigned (derived from countryId_owner)
    const ensureOwners = (data) => {
      if (!Array.isArray(data)) return [];
      return data.map(c => ({
        ...c,
        plots: (c.plots || []).map(p => ({
          owner: p.owner || p.owner_username || (c.id + '_owner'), // e.g. "kenya_owner"
          owner_username: p.owner_username || p.owner || (c.id + '_owner'),
          ...p
        }))
      }));
    };

    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed)) {
          // Merge DEFAULT_COUNTRIES cultureInfo to ensure new fields exist
          const merged = parsed.map(c => {
            const match = DEFAULT_COUNTRIES.find(dc => dc.id === c.id);
            return {
              ...match,
              ...c,
              cultureInfo: c.cultureInfo || match?.cultureInfo
            };
          });
          return ensureOwners(merged);
        }
      } catch (err) {
        console.warn("Failed to parse local storage catalog, fallback to template.", err);
      }
    }
    return ensureOwners(DEFAULT_COUNTRIES);
  });

  // State to pass to contact form when selecting a plot or architect
  const [inquiryData, setInquiryData] = useState(null);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('umoja_countries_data', JSON.stringify(countriesData));
  }, [countriesData]);

  // Fetch directory from backend on mount (supports offline fallback)
  useEffect(() => {
    apiService.getCountries().then(data => {
      if (Array.isArray(data)) setCountriesData(data);
    });
  }, []);

  // Admin Callbacks:
  const handleAddPlot = (countryId, newPlot) => {
    setCountriesData(prev => prev.map(c => {
      if (c.id === countryId) {
        return {
          ...c,
          plots: [...c.plots, newPlot]
        };
      }
      return c;
    }));
  };

  const handleUpdateCountry = (countryId, updatedDetails) => {
    setCountriesData(prev => prev.map(c => {
      if (c.id === countryId) {
        return {
          ...c,
          motto: updatedDetails.motto || c.motto,
          desc: updatedDetails.desc || c.desc,
          highlights: updatedDetails.highlights || c.highlights,
          videoUrl: updatedDetails.videoUrl || c.videoUrl
        };
      }
      return c;
    }));
  };

  const handleDeletePlot = (countryId, plotId) => {
    setCountriesData(prev => prev.map(c => {
      if (c.id === countryId) {
        return {
          ...c,
          plots: c.plots.filter(p => p.id !== plotId)
        };
      }
      return c;
    }));
  };

  const handleResetData = () => {
    setCountriesData(DEFAULT_COUNTRIES);
  };

  // Handle transaction selections from Explore Page
  const handleSelectPlotInquiry = (plot, actionType) => {
    setInquiryData({
      type: 'Plot',
      action: actionType, // 'Buy', 'Negotiate', 'Show Interest'
      title: plot.title,
      size: plot.size,
      price: plot.price,
      id: plot.id
    });
    // Redirect to contact form
    handleNavigate('contact');
  };

  // Handle consultation clicks from Houses and Architects page
  const handleConnectArchitect = (target, type) => {
    if (type === 'Architect Direct Connection') {
      setInquiryData({
        type: 'Architect',
        name: target.name,
        country: target.country
      });
    } else {
      setInquiryData({
        type: 'House Design',
        title: target.title,
        buildCostEstimate: target.buildCostEstimate
      });
    }
    // Redirect to contact form
    handleNavigate('contact');
  };

  // Smooth navigation helper
  const handleNavigate = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#FFFFFF'
    }}>
      
      {/* Floating White Header Bar */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '75px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 6%',
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 2px 10px rgba(26,62,38,0.02)'
      }}>
        {/* Brand signature */}
        <div 
          onClick={() => handleNavigate('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '1.4rem',
            color: 'var(--text-title)',
            letterSpacing: '0.02em',
            fontWeight: 700
          }}
        >
          <Compass size={24} style={{ color: 'var(--accent-gold)' }} />
          <span>UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span></span>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: '24px',
          fontSize: '0.82rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontWeight: 600,
          height: '100%',
          alignItems: 'center'
        }}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'explore', label: 'Explore Plots' },
            { id: 'houses', label: 'Houses & Architects' },
            { id: 'benefits', label: 'Benefits & Info' },
            { id: 'contact', label: 'Contact' },
            { id: 'landowner', label: 'Owner Portal' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => handleNavigate(tab.id)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '8px 0',
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  transition: 'var(--transition-fast)'
                }}
                className={`nav-link-tab ${isActive ? 'active' : ''}`}
              >
                {tab.label}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-25px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--accent)'
                  }} />
                )}
              </span>
            );
          })}
        </nav>

        {/* Quick action button */}
        <div className="header-cta-container" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="btn-primary" 
            onClick={() => handleNavigate('contact')}
            style={{ padding: '10px 20px', fontSize: '0.8rem', borderRadius: '4px' }}
          >
            Get Vetted Land
          </button>
        </div>

        {/* Hamburger Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'none',
            color: 'var(--text-title)',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none'
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} style={{ color: 'var(--accent)' }} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Dropdown Menu */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: '75px',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 6%',
            zIndex: 99,
            gap: '16px'
          }} 
          className="mobile-nav-menu"
        >
          {[
            { id: 'home', label: 'Home' },
            { id: 'explore', label: 'Explore Plots' },
            { id: 'houses', label: 'Houses & Architects' },
            { id: 'benefits', label: 'Benefits & Info' },
            { id: 'contact', label: 'Contact' },
            { id: 'landowner', label: 'Owner Portal' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <span
                key={tab.id}
                onClick={() => {
                  handleNavigate(tab.id);
                  setMenuOpen(false);
                }}
                style={{
                  cursor: 'pointer',
                  padding: '12px 0',
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  borderBottom: '1px solid rgba(0,0,0,0.03)',
                  transition: 'var(--transition-fast)'
                }}
              >
                {tab.label}
              </span>
            );
          })}
          <button 
            className="btn-primary" 
            onClick={() => {
              handleNavigate('contact');
              setMenuOpen(false);
            }}
            style={{ padding: '12px 20px', fontSize: '0.85rem', borderRadius: '4px', marginTop: '8px', width: '100%', textAlign: 'center' }}
          >
            Get Vetted Land
          </button>
        </div>
      )}

      {/* Render active page state */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '75px' }}>
        {activeTab === 'home' && <Home onNavigate={handleNavigate} />}
        {activeTab === 'explore' && <ExplorePage countriesData={countriesData} onSelectPlot={handleSelectPlotInquiry} />}
        {activeTab === 'houses' && <HousesArchitectsPage onConnectArchitect={handleConnectArchitect} />}
        {activeTab === 'benefits' && <BenefitsInfoPage />}
        {activeTab === 'contact' && <ContactPage inquiryData={inquiryData} />}
        {(activeTab === 'landowner' || activeTab === 'admin') && (
          <LandownerPortal 
            countriesData={countriesData} 
            setCountriesData={setCountriesData} 
            onNavigate={handleNavigate} 
          />
        )}
      </main>

      {/* Corporate Light Footer */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '60px 6% 40px',
        color: 'var(--text-body)',
        fontSize: '0.85rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr 1fr',
          gap: '50px'
        }} className="footer-layout">
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', color: 'var(--text-title)', marginBottom: '14px', fontWeight: 700 }}>
              UMOJA <span style={{ fontWeight: 300, color: 'var(--accent)' }}>TERRA</span>
            </h4>
            <p style={{ lineHeight: '1.6', marginBottom: '18px', fontWeight: 300 }}>
              Umoja Terra is a digital pan-African real estate network enabling secure, vetted, cross-border land ownership. Our mission is to promote unity, trust, and structural security, giving every African a clear path to own land anywhere on the continent.
            </p>
            <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>© 2026 Umoja Terra. All rights reserved.</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Site Map</span>
            <span onClick={() => handleNavigate('home')} style={{ cursor: 'pointer' }}>Home</span>
            <span onClick={() => handleNavigate('explore')} style={{ cursor: 'pointer' }}>Explore Plots</span>
            <span onClick={() => handleNavigate('houses')} style={{ cursor: 'pointer' }}>Houses & Architects</span>
            <span onClick={() => handleNavigate('benefits')} style={{ cursor: 'pointer' }}>Benefits & Info</span>
            <span onClick={() => handleNavigate('contact')} style={{ cursor: 'pointer' }}>Contact Hub</span>
            <span onClick={() => handleNavigate('admin')} style={{ cursor: 'pointer' }}>Admin Console</span>
            <span onClick={() => handleNavigate('landowner')} style={{ cursor: 'pointer' }}>Landowner Portal</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ color: 'var(--text-title)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Continental Offices</span>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Phone size={14} style={{ color: 'var(--accent-gold)' }} />
              <strong>+(254) 700 000 000</strong>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Mail size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>inquire@umojaterra.com</span>
            </p>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <MapPin size={14} style={{ color: 'var(--accent-gold)', marginTop: '3px', flexShrink: 0 }} />
              <span>Suite 4B, Silicon Valley Arcade, Kilimani, Nairobi, Kenya.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Navigation styling */}
      <style>{`
        .nav-link-tab:hover {
          color: var(--accent) !important;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .mobile-nav-menu {
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (max-width: 900px) {
          header nav {
            display: none !important;
          }
          .header-cta-container {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .footer-layout {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>

    </div>
  );
}
