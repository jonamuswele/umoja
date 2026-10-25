import exteriorVilla from '../assets/exterior_villa.png';
import livingLoungeAfter from '../assets/interior/cdn.jfif';
import kitchenAfter from '../assets/interior/cbp.jfif';
import bathAfter from '../assets/shower_luxury.png';

// Authentic 1:1 Matched Before & After Renovation Photography
import facadeBefore from '../assets/before-after/facade_before.jpg';
import facadeAfter from '../assets/before-after/facade_after.jpg';
import livingBefore from '../assets/before-after/living_before.jpg';
import livingAfter from '../assets/before-after/living_after.jpg';
import kitchenBefore from '../assets/before-after/kitchen_before.jpg';
import kitchenAfterReno from '../assets/before-after/kitchen_after.jpg';
import bathBefore from '../assets/before-after/bath_before.jpg';
import bathAfterReno from '../assets/before-after/bath_after.jpg';
import bedBefore from '../assets/before-after/bed_before.jpg';
import bedAfter from '../assets/before-after/bed_after.jpg';
import deckBefore from '../assets/before-after/deck_before.jpg';
import deckAfter from '../assets/before-after/deck_after.jpg';
import cleanBefore from '../assets/before-after/clean_before.jpg';
import cleanAfter from '../assets/before-after/clean_after.jpg';


export const SERVICES = [
  // ══════════════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════
  // 1. BUY LAND (Product - Snapping Showcase Deck)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "buy-plots",
    kind: "product",
    num: "01",
    title: "Buy Land",
    shortDesc: "Verified residential and commercial land with clean government titles across top locations.",
    category: "Real Estate",
    tag: "Verified Land",
    badge: "Verified Titles",
    icon: "Compass",
    accent: "#1A3E26",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    stats: { totalListings: "84 Plots Available", avgYield: "22.6% Capital Growth", cities: "Lagos, Abuja, PH, Ibadan" },
    items: [
      {
        id: "plot-01",
        title: "Atlantic Bayfront Serviced Residential Plot",
        location: "Epe Lagoon Corridor, Lagos State",
        state: "Lagos State",
        priceNgn: 45000000,
        priceUsd: 28500,
        size: "600 SQM (Full Dry Tableland)",
        titleType: "Governor's Consent & Registered Survey",
        status: "Immediate Allocation",
        mainImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-plot-epe",
        likesCount: 184,
        reactions: { fire: 88, verified: 124 },
        comments: [
          { id: "c1", author: "Engr. Babatunde F.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Vetted this plot coordinate with my private surveyor at Alausa yesterday. Clean gazetted boundary!", time: "2 hours ago", likes: 14 },
          { id: "c2", author: "Dr. Amaka Eze", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100", text: "Prime dry land right along the proposed international airport expansion road.", time: "1 day ago", likes: 8 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", caption: "Perimeter Fenced Plot View with Concrete Beacons", rotate: -2, scale: 0.96 },
          { img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", caption: "Lagoon Waterfront Boundary & Topo Elevation", rotate: 3, scale: 0.94 },
          { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", caption: "Survey Plan with Beacon Coordinates LA/EP/2025/084", rotate: -1, scale: 1.0 }
        ],
        description: "100% dry tableland located 4 minutes off the Lekki-Epe expressway dualization. Fully fenced with concrete drainage, street electrification, and vetted beacon stones. Ideal for luxury residential build or immediate land banking.",
        highlights: [
          "Zero excision risk (Survey Plan No: LA/EP/2025/084)",
          "100% Dry Sand-filled ground, no deep piling required",
          "Dedicated 33KVA transformer access and paved access road",
          "Escrow backed transaction through institutional legal trustees"
        ],
        agentOrProvider: "Umoja Land Trustees (Regional Zonal Office)"
      },
      {
        id: "plot-02",
        title: "Diplomatic Hillside Estate Plot (Guzape)",
        location: "Guzape Diplomatic Zone, Abuja FCT",
        state: "Federal Capital Territory",
        priceNgn: 110000000,
        priceUsd: 70000,
        size: "950 SQM (Hilltop Panoramic Plot)",
        titleType: "FCDA Statutory Certificate of Occupancy",
        status: "Ready for Foundation",
        mainImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-plot-guzape",
        likesCount: 210,
        reactions: { fire: 104, verified: 142 },
        comments: [
          { id: "c1", author: "Arc. Musa Bello", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", text: "AGIS file confirmed spotless. Grade A bedrock foundation with stunning Abuja skyline view.", time: "4 hours ago", likes: 18 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800", caption: "Hilltop Aerial Vista & Access Road", rotate: -1, scale: 0.97 },
          { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", caption: "Demarcated Boundary with Registered FCDA Beacons", rotate: 2, scale: 0.95 }
        ],
        description: "Prestigious elevated hillside plot in Guzape District. Exceptional natural topography overlooking the city center, fully serviced with asphalt roads, central sewage lines, and underground power grid.",
        highlights: [
          "Direct FCDA C of O with clean AGIS legal search certificate",
          "Solid bedrock subsoil reducing foundation construction cost",
          "Surrounded by completed modern ambassadorial residences",
          "Instant building plan approval clearance"
        ],
        agentOrProvider: "Abuja Prime Assets & Survey Advisory"
      },
      {
        id: "plot-03",
        title: "Ibeju-Lekki Commercial Logistics & Light Industrial Plot",
        location: "Free Trade Zone Axis, Ibeju-Lekki, Lagos",
        state: "Lagos State",
        priceNgn: 65000000,
        priceUsd: 41200,
        size: "1,200 SQM (2 Commercial Plots)",
        titleType: "Lekki Free Zone Gazette & Global C of O",
        status: "Commercial Zoning",
        mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-plot-ibeju",
        likesCount: 142,
        reactions: { fire: 65, verified: 96 },
        comments: [
          { id: "c1", author: "Chief Alabi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "5 minutes from the Deep Sea Port gates. High rental appreciation for warehousing.", time: "1 day ago", likes: 11 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", caption: "Commercial Expressway Frontage", rotate: -2, scale: 0.96 },
          { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", caption: "Boundary Clearing & Geotechnical Soil Boring", rotate: 3, scale: 0.94 }
        ],
        description: "Dual-frontage commercial parcel situated in the booming Lekki Free Trade Zone corridor. Engineered for logistics warehousing, container staging, or corporate staff quarters.",
        highlights: [
          "Gazetted under Lagos State Official Gazette No. 19",
          "High bearing capacity sandfill with zero flooding history",
          "Heavy axle truck access directly to dualized arterial expressway"
        ],
        agentOrProvider: "Lekki Industrial Corridor Partners"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 2. BUY HOUSES (Product - Snapping Showcase Deck)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "buy-houses",
    kind: "product",
    num: "02",
    title: "Buy Houses",
    shortDesc: "Explore verified homes, modern terraces, and apartments ready for immediate move-in.",
    category: "Real Estate",
    tag: "Homes & Terraces",
    badge: "Verified Titles",
    icon: "Building",
    accent: "#8B4513",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    stats: { totalListings: "58 Completed Homes", avgYield: "12-16% Rental Yield", cities: "Lagos, Abuja, PH" },
    items: [
      {
        id: "house-01",
        title: "The Diplomatic Terraces (4-Bed + Maid's Room)",
        location: "Maitama Extension, Abuja FCT",
        state: "Federal Capital Territory",
        priceNgn: 240000000,
        priceUsd: 152000,
        size: "450 SQM Built Area",
        titleType: "FCDA Certificate of Occupancy",
        status: "Completed & Ready to Move",
        mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-maitama-terrace",
        likesCount: 265,
        reactions: { fire: 130, verified: 180 },
        comments: [
          { id: "c1", author: "Barr. Chukwuma Obi", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", text: "FCDA file search confirmed clean. No encumbrances on the C of O.", time: "4 hours ago", likes: 19 },
          { id: "c2", author: "Hajiya Fatima Bello", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", text: "The private rooftop lounge view of Maitama hills is breathtaking.", time: "2 days ago", likes: 11 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", caption: "Front Façade & Private Car Port (4 Cars)", rotate: -2, scale: 0.95 },
          { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", caption: "Double Volume Living Room & Floating Marble Staircase", rotate: 3, scale: 0.93 },
          { img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800", caption: "Master Penthouse Suite with Walk-In Closet", rotate: -1, scale: 0.98 }
        ],
        description: "Architect-designed smart terrace duplex nestled in Maitama Hills. Features Italian fitted kitchen with Bosch appliances, private elevator shaft, rooftop lounge, and 24/7 solar-grid hybrid backup.",
        highlights: [
          "Fully automated lighting and biometric keyless access",
          "Direct FCDA regularized title with clean register search",
          "Includes 1-year complimentary estate facility management",
          "Projected rental yield of ₦18,000,000/year"
        ],
        agentOrProvider: "Zuma Luxury Developments FCT"
      },
      {
        id: "house-02",
        title: "Banana Island Waterfront Contemporary Villa (5-Bed)",
        location: "Zone K, Banana Island, Ikoyi, Lagos",
        state: "Lagos State",
        priceNgn: 850000000,
        priceUsd: 538000,
        size: "720 SQM Built Footprint",
        titleType: "Federal C of O & Lagos State Governor's Consent",
        status: "Brand New Handover",
        mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-banana-island-villa",
        likesCount: 395,
        reactions: { fire: 210, verified: 280 },
        comments: [
          { id: "c1", author: "Dr. K. Adeleke", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "The private boat jetty and infinity swimming pool are unparalleled in Lagos.", time: "1 day ago", likes: 32 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", caption: "Waterfront Infinity Pool & Sun Deck", rotate: -2, scale: 0.96 },
          { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", caption: "Chef's Gourmet Kitchen with Marble Island", rotate: 2, scale: 0.94 },
          { img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800", caption: "Primary Suite with Panoramic Lagoon View", rotate: -1, scale: 0.98 }
        ],
        description: "Masterpiece waterfront mansion in an exclusive, prestigious gated community. Features infinity pool, private boat dock, smart home automation by Control4, and soundproof private cinema.",
        highlights: [
          "Deep piling foundation with 25-year structural warranty",
          "Private dedicated 100KVA Perkins silent soundproof generator",
          "24/7 biometric estate access with armed marine police patrol"
        ],
        agentOrProvider: "Ikoyi Elite Estates & Escrow Desk"
      },
      {
        id: "house-03",
        title: "Oakwood 4-Bedroom Semi-Detached Duplex with BQ",
        location: "Chevron Tollgate, Lekki, Lagos State",
        state: "Lagos State",
        priceNgn: 135000000,
        priceUsd: 85500,
        size: "350 SQM Plot & Living Area",
        titleType: "Governor's Consent",
        status: "Newly Completed",
        mainImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-lekki-duplex",
        likesCount: 178,
        reactions: { fire: 82, verified: 120 },
        comments: [
          { id: "c1", author: "Mrs. Nkiru U.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100", text: "Great family neighborhood with 24-hour clean treated water and zero flooding.", time: "2 days ago", likes: 14 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", caption: "Contemporary Exterior & Stamped Concrete Compound", rotate: -1, scale: 0.97 },
          { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", caption: "Spacious Living Room with Ambient Ceiling LED", rotate: 2, scale: 0.95 }
        ],
        description: "Well-appointed family home inside a gated access-controlled estate. Fitted kitchen with smoke extractor, heat-treated security doors, and spacious ensuite bedrooms.",
        highlights: [
          "Clean title verified at Alausa Lands Registry",
          "Dedicated industrial borehole and water purification plant",
          "Includes stamped concrete driveway for 4 vehicles"
        ],
        agentOrProvider: "Lekki Prime Realty Hub"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 3. RENT HOUSES (Product - Snapping Showcase Deck)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "rent-properties",
    kind: "product",
    num: "03",
    title: "Rent Houses",
    shortDesc: "Verified rental homes, serviced apartments, and office spaces with clear agreements.",
    category: "Real Estate",
    tag: "Rentals & Flats",
    badge: "Vetted Landlords",
    icon: "KeyRound",
    accent: "#0E4C33",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    stats: { totalListings: "92 Available Rentals", leaseTerms: "Annual / Quarterly", cities: "Lagos, Abuja, PH" },
    items: [
      {
        id: "rent-01",
        title: "Serviced 3-Bedroom Waterfront Apartment",
        location: "Admiralty Way, Lekki Phase 1, Lagos",
        state: "Lagos State",
        priceNgn: 12000000,
        priceUsd: 7600,
        size: "220 SQM (Annual Rent)",
        titleType: "Institutional Tenancy Lease (1 Year)",
        status: "Available for Move-in",
        mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-lekki-apartment",
        likesCount: 195,
        reactions: { fire: 92, verified: 140 },
        comments: [
          { id: "c1", author: "Dr. Dayo O.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "24/7 uninterrupted power and the gym faces the lagoon. Very quiet floor.", time: "1 day ago", likes: 16 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", caption: "Balcony View of Five Cowries Creek", rotate: -2, scale: 0.96 },
          { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", caption: "Furnished Open Concept Living Space", rotate: 3, scale: 0.94 }
        ],
        description: "Fully serviced luxury waterfront flat with 24-hour uninterrupted generator power, swimming pool, elevator, and uniformed security. Ideal for corporate expatriates and high-profile executives.",
        highlights: [
          "24/7 power backed by dual synchronous generators",
          "Covered designated parking with visitor bays",
          "Service charge audited transparently every quarter"
        ],
        agentOrProvider: "Apex Crest Property Management Lagos"
      },
      {
        id: "rent-02",
        title: "Diplomatic 4-Bed Townhome in Gated Community",
        location: "Wuse 2 Axis, Abuja FCT",
        state: "Federal Capital Territory",
        priceNgn: 18000000,
        priceUsd: 11400,
        size: "380 SQM (Annual Rent)",
        titleType: "Annual Lease with Diplomatic Clause",
        status: "Available Immediately",
        mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-wuse-townhome",
        likesCount: 162,
        reactions: { fire: 75, verified: 115 },
        comments: [
          { id: "c1", author: "Hajia Aisha", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", text: "Very close to international schools and embassies. Excellent security.", time: "3 days ago", likes: 12 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", caption: "Gated Enclave Private Entrance", rotate: -1, scale: 0.97 },
          { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", caption: "Fitted Kitchen & Pantry Space", rotate: 2, scale: 0.95 }
        ],
        description: "Spacious multi-level townhome in central Abuja. Features private garden, self-contained BQ, dedicated solar backup inverter, and perimeter electric fencing.",
        highlights: [
          "Pre-installed 10KVA solar inverter system",
          "Dedicated 2-car garage with motorized shutter",
          "Vetted by institutional diplomatic security desk"
        ],
        agentOrProvider: "Zuma Federal Capital Real Estate"
      },
      {
        id: "rent-03",
        title: "Grade-A Corporate Office Floor (Open Plan)",
        location: "Victoria Island Business District, Lagos",
        state: "Lagos State",
        priceNgn: 32000000,
        priceUsd: 20200,
        size: "350 SQM Usable Office Space",
        titleType: "Commercial Lease (2-5 Years)",
        status: "Fitted Shell Ready",
        mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        droneVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        virtualTourUrl: "https://my.matterport.com/show/?m=sample-vi-office",
        likesCount: 110,
        reactions: { fire: 50, verified: 82 },
        comments: [
          { id: "c1", author: "Bankole Ade", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Fiber optic connection already piped directly to the floor. Central chillers.", time: "2 days ago", likes: 8 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800", caption: "Open Plan Executive Floor Layout", rotate: 1, scale: 0.96 }
        ],
        description: "Turnkey commercial floor ideal for technology companies, financial service firms, and legal chambers. High-speed elevators, central HVAC, and access control.",
        highlights: [
          "Includes 6 reserved basement executive parking spots",
          "Dual fiber-optic broadband feeds (MainOne & MTN)",
          "FM200 clean-agent fire suppression system"
        ],
        agentOrProvider: "Crown Commercial Advisory Lagos"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 4. BUILD YOUR HOUSE (Service - Interactive Engineering & Booking)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "build-from-scratch",
    kind: "service",
    num: "04",
    title: "Build Your House",
    shortDesc: "Turnkey home building with architectural design, engineering approvals, and verified construction under escrow.",
    category: "Construction & Materials",
    tag: "Turnkey Construction",
    badge: "Certified Engineers",
    icon: "Hammer",
    accent: "#8B4513",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=1200&q=80",
    stats: { projectsCompleted: "115+ Completed", safetyRating: "99.8%", engineers: "40+ COREN Certified" },
    adVideo: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-4217-large.mp4",
    beforeAfter: {
      beforeImg: deckBefore,
      afterImg: deckAfter,
      beforeLabel: "Before: Original Single-Story Stilt Structure & Bare Ground",
      afterLabel: "After: Structural Extension with Architectural Timber Deck, Balustrades & Integrated Carport"
    },
    bookingPackages: [
      {
        name: "Turnkey Building Feasibility & Engineering Audit",
        duration: "1-2 Days",
        desc: "Site soil review, structural design assessment, and Bill of Quantities (BOQ) verification."
      },
      {
        name: "Architectural & Structural Engineering Design Package",
        duration: "10-14 Days",
        desc: "Complete 3D architectural elevations, structural rebar drawings, MEP schematics, and LASPPPA approval filing."
      },
      {
        name: "Deep Foundation Piling & Soil Consolidation",
        duration: "3-5 Days",
        desc: "Rotary rig drilling, borehole sampling, Cone Penetrometer Test (CPT), and foundation engineering report."
      },
      {
        name: "Turnkey Milestone Escrow Construction Agreement",
        duration: "Turnkey Build",
        desc: "Excavation, foundation, superstructure formwork, roofing, MEP rough-in, and finishing with independent QS milestone verification."
      }
    ],
    items: [
      {
        id: "const-01",
        title: "Turnkey 4-Bedroom Duplex Construction",
        location: "Lagos, Ogun, Abuja & Ibadan",
        state: "Nationwide Coverage",
        priceNgn: 65000000,
        priceUsd: 41200,
        size: "Typical 450 SQM Footprint",
        titleType: "COREN & NSE Stamped Plan",
        status: "Milestone-Based Escrow",
        mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-4217-large.mp4",
        likesCount: 184,
        reactions: { fire: 89, verified: 120 },
        comments: [
          { id: "c1", author: "Arch. Segun Adeleke", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", text: "Their structural steel formwork and German floor concrete cure testing is top tier.", time: "3 hours ago", likes: 15 },
          { id: "c2", author: "Grace Danjuma (UK Diaspora)", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100", text: "The weekly live drone portal and live site camera made monitoring my build in Magodo effortless from London.", time: "1 day ago", likes: 22 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800", caption: "Heavy Foundation Piling & Soil Consolidation", rotate: -2, scale: 0.97 },
          { img: "https://images.unsplash.com/photo-1533324268742-60b24614f050?w=800", caption: "16mm TMT Steel Rebar Decking Slab Alignment", rotate: 2, scale: 0.95 },
          { img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800", caption: "Delivered Turnkey Contemporary Duplex Handover", rotate: -1, scale: 0.98 }
        ],
        description: "Full end-to-end building package covering excavation, raft/piled foundation, hollow-block walling, concrete deck casting, roofing with Gerard stone-coated tiles, and MEP piping.",
        highlights: [
          "Payment disbursed in 5 milestones verified by independent surveyor",
          "Quality guarantee: Grade 30 concrete with laboratory cube crush tests",
          "Weekly drone video reports and Live Site Camera portal for owners abroad",
          "10-Year structural integrity guarantee"
        ],
        agentOrProvider: "BuildMatrix Engineering Ltd"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════
  // 5. HOME RENOVATION (Service - Interactive Booking)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "home-renovation",
    kind: "service",
    num: "05",
    title: "Home Renovation",
    shortDesc: "Remodel and modernize your home with quality structural work, new finishes, and repairs.",
    category: "Construction & Materials",
    tag: "Remodel & Upgrades",
    badge: "Quality Guaranteed",
    icon: "Hammer",
    accent: "#C25E00",
    heroImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80",
    stats: { homesRenovated: "210+", avgValueBoost: "+48% Appreciation", turnaround: "3-6 Weeks" },
    adVideo: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-4217-large.mp4",
    beforeAfter: {
      beforeImg: facadeBefore,
      afterImg: facadeAfter,
      beforeLabel: "Before: Weathered Brick House Prior to Remodel",
      afterLabel: "After: Contemporary Rendered Façade, New Windows & Interlocking Driveway",
      scenes: [
        {
          id: "facade",
          name: "Exterior Façade",
          beforeImg: facadeBefore,
          afterImg: facadeAfter,
          beforeLabel: "Before: Weathered 1980s Brick Exterior with Overgrown Lawn",
          afterLabel: "After: Contemporary White & Charcoal Render, Sleek Windows & Interlocking Paving"
        },
        {
          id: "living",
          name: "Living Lounge",
          beforeImg: livingBefore,
          afterImg: livingAfter,
          beforeLabel: "Before: Dated Living Room Layout with Worn Finishes",
          afterLabel: "After: Warm Japandi-Nordic Lounge with Cane Daybed & Curated Lighting"
        },
        {
          id: "kitchen",
          name: "Chef's Kitchen",
          beforeImg: kitchenBefore,
          afterImg: kitchenAfterReno,
          beforeLabel: "Before: Outdated Dark Oak Cabinetry & Worn Fixtures",
          afterLabel: "After: Modern Coastal Eggshell Blue Cabinetry with Brushed Brass Hardware"
        },
        {
          id: "bathroom",
          name: "Master Bathroom",
          beforeImg: bathBefore,
          afterImg: bathAfterReno,
          beforeLabel: "Before: Outdated 1980s Pink Tile & Pedestal Sink",
          afterLabel: "After: Crisp Subway Tile Shower, Quartz Vanity & Slate Grey Floor"
        }
      ]
    },
    bookingPackages: [
      {
        name: "Structural Integrity & Renovation Feasibility Audit",
        duration: "1 Business Day",
        desc: "Load-bearing wall assessment, damp-proof course (DPC) inspection, and roofing timber check."
      },
      {
        name: "Complete Exterior Façade Modernization & Stone Cladding",
        duration: "2-3 Weeks",
        desc: "Modern parapet redesign, aluminium composite paneling (ACP), textured paint, and exterior architectural LED."
      },
      {
        name: "Turnkey Whole-House Electrical & Plumbing Overhaul",
        duration: "10-14 Days",
        desc: "Replacing corroded galvanized pipes with PPR, rewiring with certified flame-retardant copper cables, and inverter integration."
      }
    ],
    items: [
      {
        id: "renov-01",
        title: "Full 1990s Duplex to Ultra-Modern Contemporary Transformation",
        location: "Ikeja GRA, Magodo & Victoria Island, Lagos",
        state: "Lagos & Abuja",
        priceNgn: 28000000,
        priceUsd: 17700,
        size: "Complete 450 SQM Duplex Remodel",
        titleType: "LASPPPA Renovation Permit Handled",
        status: "Execution Ready",
        mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-4217-large.mp4",
        likesCount: 145,
        reactions: { fire: 78, verified: 104 },
        comments: [
          { id: "c1", author: "Dr. Olayinka", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Transformed our parents' 30-year-old house in Ikeja GRA into a 2026 luxury rental yielding ₦15M/yr.", time: "2 days ago", likes: 24 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800", caption: "Initial Site Assessment: Dilapidated Facade & Water Seepage", rotate: -2, scale: 0.96 },
          { img: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800", caption: "Demolition, Screeding & Conduit Chasing in Progress", rotate: 2, scale: 0.94 },
          { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", caption: "Final Handover: Modern Stone Cladding & Architectural LED", rotate: -1, scale: 0.97 }
        ],
        description: "Breathe new life into aging residential structures. We dismantle outdated clay roofs, reinforce lintels, replace warped wooden window frames with double-glazed thermal break aluminium, and refinish walls with anti-damp Italian screeding.",
        highlights: [
          "Structural sign-off to ensure load-bearing walls are preserved safely",
          "Includes damp-proofing membrane injection against rising coastal moisture",
          "Fixed price contract with zero surprise cost escalations"
        ],
        agentOrProvider: "Apex Renovation & Retrofitting Ltd"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 6. INTERIOR DESIGN (Service - Interactive Booking)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "interior-finishing",
    kind: "service",
    num: "06",
    title: "Interior Design",
    shortDesc: "Complete interior design, furniture selection, 3D room styling, and finishes.",
    category: "Design & Finishing",
    tag: "Design & Furniture",
    badge: "Design Studio",
    icon: "Palette",
    accent: "#7C3AED",
    heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    stats: { unitsFinished: "320+ Units", precisionRate: "99.7%", warrantyPeriod: "12-Month Workmanship" },
    adVideo: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4",
    beforeAfter: {
      beforeImg: bedBefore,
      afterImg: bedAfter,
      beforeLabel: "Before: Bare Unfinished Room Shell & Outdated Vertical Blinds",
      afterLabel: "After: Finished Hardwood Floor, Modern Dual Casement Windows & Master Suite"
    },
    bookingPackages: [
      {
        name: "Carcass Finishing Assessment & Specification Audit",
        duration: "1 Business Day",
        desc: "Laser wall alignment check, screeding surface moisture measurement, and room takeoff schedule."
      },
      {
        name: "Bespoke Fitted Kitchen & Wardrobe Joinery Package",
        duration: "10-14 Days",
        desc: "High-gloss acrylic / matt cabinetry fabrication, quartz countertops, and soft-close Blum hinges."
      },
      {
        name: "Complete Screeding, POP Suspended Ceiling & Floor Tiling",
        duration: "14-21 Days",
        desc: "Smooth POP plastering, shadow gap recessed lighting channels, and rectified 60x120cm porcelain floor tiles."
      }
    ],
    items: [
      {
        id: "finish-01",
        title: "Full 4-Bedroom Carcass Interior Fit-Out Package",
        location: "Lekki Phase 1, Ikoyi, Maitama & Guzape",
        state: "Lagos & Abuja",
        priceNgn: 16500000,
        priceUsd: 10400,
        size: "Complete 350 SQM Interior Finishing",
        titleType: "1-Year Workmanship Warranty Bond",
        status: "Accepting Projects",
        mainImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4",
        likesCount: 220,
        reactions: { fire: 110, verified: 150 },
        comments: [
          { id: "c1", author: "Engr. Nnamdi", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", text: "The shadow-gap POP ceiling craftsmanship and 45-degree tile mitering is the cleanest I've seen.", time: "1 day ago", likes: 20 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800", caption: "Custom Acrylic Kitchen & Quartz Island", rotate: -2, scale: 0.96 },
          { img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800", caption: "Acoustic Fluted Slat Wall Paneling", rotate: 3, scale: 0.94 }
        ],
        description: "Transform your bare blockwork house into an immaculate contemporary residence. Includes POP suspended ceilings with hidden ambient LED strips, POP wall screeding with Dulux washable emulsion, Spanish rectified porcelain floor tiling, and German sanitaryware.",
        highlights: [
          "Laser-calibrated floor levels with zero uneven tile lips",
          "Includes sanitary fixtures, concealed cisterns, and tempered glass shower screens",
          "Factory-crafted walk-in closets and bespoke kitchen joinery"
        ],
        agentOrProvider: "Maison Terra Luxury Finishing Unit"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 7. BUY BUILDING MATERIALS (Product - Snapping Showcase Deck)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "building-material",
    kind: "product",
    num: "07",
    title: "Building Materials",
    shortDesc: "Direct factory pricing on cement, steel rebar, sand, granite, and roofing materials delivered to your site.",
    category: "Construction & Materials",
    tag: "Cement, Steel & Materials",
    badge: "Factory Direct",
    icon: "Boxes",
    accent: "#C25E00",
    heroImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80",
    stats: { deliveryTime: "Within 24-48 hrs", stockSuppliers: "12 Factories", minOrder: "Zero Minimum" },
    items: [
      {
        id: "mat-01",
        title: "Wholesale Dangote 42.5R Falcon Cement (Trailer Load)",
        location: "Direct Ibese/Obajana Plant Dispatch",
        state: "Direct to Site (Any State)",
        priceNgn: 7900000,
        priceUsd: 5000,
        size: "900 Bags (50kg per bag)",
        titleType: "Factory Certified Waybill",
        status: "In Stock - Instant Dispatch",
        mainImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-4217-large.mp4",
        likesCount: 165,
        reactions: { fire: 94, verified: 130 },
        comments: [
          { id: "c1", author: "Alhaji Musa Dikko", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Waybill arrived stamped directly from Obajana. Genuine fresh batch, zero clumping.", time: "1 day ago", likes: 17 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800", caption: "Factory Palletized High-Grade Cement", rotate: -2, scale: 0.96 }
        ],
        description: "Direct trailer delivery of genuine Dangote 42.5R Portland cement for structural columns, beams, and high-strength casting. Guarantees no adulteration.",
        highlights: [
          "Real-time GPS tracker on delivery haulage truck to your site",
          "Includes offloading assistance at site",
          "Authenticity guarantee with batch testing numbers verified"
        ],
        agentOrProvider: "Dangote Logistics Official Partner Desk"
      },
      {
        id: "mat-02",
        title: "Standard TMT High-Tensile Steel Rebar (16mm & 12mm)",
        location: "Abeokuta Rolling Mills to Lagos/Abuja",
        state: "Nationwide",
        priceNgn: 1450000,
        priceUsd: 920,
        size: "Per Ton (1,000 KG)",
        titleType: "SONCAP Grade 500 Certification",
        status: "Certified Ductility",
        mainImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-4217-large.mp4",
        likesCount: 88,
        reactions: { fire: 39, verified: 65 },
        comments: [
          { id: "c1", author: "Builder Emeka", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100", text: "Bend tests passed with zero fracturing. True British standard.", time: "2 days ago", likes: 9 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800", caption: "Corrosion-Treated TMT Ribbed Rods", rotate: 2, scale: 0.95 }
        ],
        description: "Thermomechanically treated (TMT) steel reinforcement bars compliant with BS4449. Superior bendability and earthquake-resistant yield strength.",
        highlights: [
          "Certified Grade 500B standard with zero brittle fracture",
          "Available sizes: 10mm, 12mm, 16mm, 20mm, and 25mm",
          "Discounted haulage for orders exceeding 15 tons"
        ],
        agentOrProvider: "Tiger Steel Works & Rolling Mills Ltd"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 8. PROPERTY MANAGEMENT (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "property-management",
    kind: "service",
    num: "08",
    title: "Property Management",
    shortDesc: "Tenant vetting, automated rent collection, property maintenance, and transparent reporting.",
    category: "Management & Living",
    tag: "Rental & Estate Care",
    badge: "Professional Care",
    icon: "KeyRound",
    accent: "#1A3E26",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    stats: { unitsManaged: "650+ Homes", diasporaClients: "400+ Landlords", rentRemit: "1st of Month" },
    adVideo: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-house-keys-41617-large.mp4",
    bookingPackages: [
      {
        name: "Tenant Vetting & Due Diligence Inspection",
        duration: "24-48 Hours",
        desc: "Comprehensive tenant background check, credit history, and employer verification."
      },
      {
        name: "Full Facility Condition Audit & Inventory",
        duration: "On-Site Session",
        desc: "Detailed photographic condition report, MEP systems testing, and repair costing."
      },
      {
        name: "Rental Escrow & Facility Management Retainer",
        duration: "Annual Contract",
        desc: "Automated rent collection, dispute resolution, and 24/7 emergency repair hotline."
      }
    ],
    items: [
      {
        id: "pm-01",
        title: "Diaspora Landlord Full-Care Management Plan",
        location: "Lagos (Island & Mainland) & Abuja FCT",
        state: "Lagos & Abuja",
        priceNgn: 150000,
        priceUsd: 95,
        size: "Per Unit / Month (or 8% of Rent)",
        titleType: "Licensed Property Managers (NIESV)",
        status: "Accepting Portfolios",
        mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4",
        likesCount: 140,
        reactions: { fire: 62, verified: 98 },
        comments: [
          { id: "c1", author: "Mrs. Folashade A.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100", text: "Living in Houston, I used to struggle with tenants. Umoja wires the rent to my Chase account on the 1st without fail.", time: "1 day ago", likes: 25 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", caption: "Digital Landlord Portal Dashboard", rotate: -1, scale: 0.97 },
          { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", caption: "Routine Physical Inspection Reports", rotate: 3, scale: 0.94 }
        ],
        description: "Never worry about difficult tenants, unpaid electricity bills, or delayed remittances. We vet tenants via bank statement verification, BVN check, and employer guarantor audits.",
        highlights: [
          "Direct monthly rent wire to your local account or UK/US/Canadian bank",
          "Quarterly 4K photographic inspection reports uploaded to your phone app",
          "Legal tenancy agreement drafted by corporate real estate attorneys",
          "24/7 dedicated tenant emergency repair desk"
        ],
        agentOrProvider: "Apex Crest Property Managers Lagos"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 9. HOME SERVICES (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "home-services",
    kind: "service",
    num: "10",
    title: "Home Services",
    subtitle: "Book Plumbers, Electricians, Cleaners, Painters, AC Techs & More",
    shortDesc: "Book certified deep cleaners, master plumbers, electricians, AC technicians, and carpenters for same-day service.",
    category: "Management & Living",
    tag: "Plumbers, Cleaners & AC",
    badge: "Vetted & Insured",
    icon: "Wrench",
    accent: "#2D5A27",
    heroImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
    stats: { responseTime: "Under 45 mins", vettedArtisans: "320+", satisfaction: "4.9 / 5.0" },
    adVideo: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-cleaning-a-room-41982-large.mp4",
    beforeAfter: {
      beforeImg: cleanBefore,
      afterImg: cleanAfter,
      beforeLabel: "Before Deep Cleaning (Heavy Soil & High-Traffic Grime Build-up)",
      afterLabel: "After Umoja Deep Steam Extraction & Surface Sanitization"
    },
    bookingPackages: [
      {
        name: "Master Plumbing & Pressure Line Inspection",
        duration: "2 Hours",
        desc: "PPR piping pressure test, borehole pump inspection, and leak detection."
      },
      {
        name: "Electrical & Distribution Board Diagnostics",
        duration: "2 Hours",
        desc: "Surge protection review, inverter changeover wiring test, and grounding test."
      },
      {
        name: "HVAC Cooling & Compressor Service",
        duration: "Same Day",
        desc: "Freon gas pressure recharge, coil antibacterial wash, and capacitor diagnostics."
      }
    ],
    items: [
      {
        id: "hs-01",
        title: "Emergency Solar Inverter & Electrical Diagnostic",
        location: "Lagos Mainland & Island, Abuja Core",
        state: "Same-Day Dispatch",
        priceNgn: 25000,
        priceUsd: 16,
        size: "Residential Diagnostic & Fix",
        titleType: "30-Day Workmanship Warranty",
        status: "Available 24/7",
        mainImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-site-with-cranes-4217-large.mp4",
        likesCount: 198,
        reactions: { fire: 96, verified: 140 },
        comments: [
          { id: "c1", author: "Engr. Kunle", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Diagnosed our inverter phase reversal in 20 minutes without ripping open any walls.", time: "1 day ago", likes: 14 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800", caption: "Multimeter Testing on Inverter Busbar", rotate: -1, scale: 0.97 }
        ],
        description: "Certified master electrician dispatched with calibrated diagnostic gear to troubleshoot inverter cutouts, circuit breaker trips, voltage fluctuations, and earthing faults.",
        highlights: [
          "Police background checked and biometric verified technician",
          "Zero callout surprise fees; upfront quotation before repairs",
          "Insurance cover against equipment damage during repairs"
        ],
        agentOrProvider: "Umoja Vetted Artisan Guild"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 10. SMART HOME (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "smart-home",
    kind: "service",
    num: "11",
    title: "Smart Home",
    subtitle: "Smart Locks, Security Cameras, Lighting & Solar Power",
    shortDesc: "Equip your home with biometric smart locks, solar hybrid inverters, phone-monitored cameras, and automatic water sensors.",
    category: "Technology & Security",
    tag: "Solar, Smart Locks & Cameras",
    badge: "App Controlled",
    icon: "Cpu",
    accent: "#006699",
    heroImage: "https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80",
    stats: { installations: "1,240+ Homes", uptimeGuarantee: "99.9%", avgSavings: "₦180k/mo Diesel" },
    items: [
      {
        id: "sh-01",
        title: "5KVA / 10kWh Tier-1 Lithium Solar Hybrid Station",
        location: "Lagos, Abuja, PH & Ibadan",
        state: "Installation in 48 hrs",
        priceNgn: 4200000,
        priceUsd: 2650,
        size: "5KVA Inverter + 10kWh LiFePO4",
        titleType: "5-Year Manufacturer Replacement Warranty",
        status: "Complete Turnkey Setup",
        mainImage: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        likesCount: 310,
        reactions: { fire: 180, verified: 210 },
        comments: [
          { id: "c1", author: "Engr. Femi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Runs our 1.5HP inverter AC, refrigerator, and lighting all night smoothly.", time: "1 day ago", likes: 35 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800", caption: "Wall-Mounted Lithium Iron Phosphate Battery", rotate: -1, scale: 0.97 },
          { img: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800", caption: "Monocrystalline Solar Array on Gerard Roof", rotate: 2, scale: 0.95 }
        ],
        description: "Stop spending millions on diesel fuel. Complete high-efficiency solar package with Canadian Solar monocrystalline panels, Deye smart hybrid inverter, and Grade-A lithium battery cells.",
        highlights: [
          "Powers inverter refrigerator, 1.5HP inverter AC, TV, laptops, and lighting",
          "Direct WiFi mobile app monitoring power generation from your phone",
          "Automatic instant changeover with zero flicker on desktop computers"
        ],
        agentOrProvider: "Helios Clean Power Ltd"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 11. REAL ESTATE INVESTMENT (Product - Snapping Showcase Deck)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "investment-features",
    kind: "product",
    num: "12",
    title: "Real Estate Investment",
    shortDesc: "Co-invest in high-yield commercial projects and development plots with secure returns.",
    category: "Finance & Wealth",
    tag: "Fractional Land & Returns",
    badge: "Trustee Backed",
    icon: "TrendingUp",
    accent: "#1A3E26",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    stats: { totalAUM: "₦4.8 Billion", avgHistoricYield: "21.4% p.a.", diasporaInvestors: "2,200+" },
    items: [
      {
        id: "inv-01",
        title: "Ibeju-Lekki Commercial Logistics Park Syndicate",
        location: "Dangote Refinery Free Zone Axis, Lagos",
        state: "Lagos State",
        priceNgn: 500000,
        priceUsd: 315,
        size: "Unit Share (Target: ₦650M Pool)",
        titleType: "SEC Licensed Custodian & Trustee Deed",
        status: "Funding Round Open (64% Filled)",
        mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        likesCount: 280,
        reactions: { fire: 140, verified: 190 },
        comments: [
          { id: "c1", author: "Dr. Okey N.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Audited returns deposited directly in USD/NGN twice a year. Solid governance.", time: "2 days ago", likes: 28 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", caption: "Logistics Hub Layout Plan", rotate: -1, scale: 0.97 }
        ],
        description: "Invest in prime industrial tableland facing the Lekki Deep Sea Port corridor. Institutional tenancy agreements pre-leased to multinational logistics operators.",
        highlights: [
          "Projected 24.5% annual capital appreciation plus rental dividends",
          "Audited by top-tier chartered accounting firm quarterly",
          "Shares legally registered with legal custodian trustees"
        ],
        agentOrProvider: "Umoja Capital Trustees Ltd"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // ══════════════════════════════════════════════════════════════════════
  // 12. FINANCING & PAYMENT PLANS (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "financing",
    kind: "service",
    num: "13",
    title: "Financing & Payment Plans",
    subtitle: "0% Interest Payment Plans, Milestone Tracking & Mortgages",
    shortDesc: "Flexible 0% interest payment plans, installment tracking, and mortgage guidance.",
    category: "Finance & Wealth",
    tag: "Payment Plans & Mortgages",
    badge: "Bank Backed",
    icon: "Banknote",
    accent: "#1A3E26",
    heroImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    stats: { mortgagesDisbursed: "₦12.5 Billion", lowestRate: "6% - 15% p.a.", preApproval: "48 Hours" },
    bookingPackages: [
      {
        name: "Mortgage Eligibility & NHF Pre-Approval Review",
        duration: "24-48 Hours",
        desc: "Credit check, debt-to-income ratio analysis, and bank verification."
      },
      {
        name: "Diaspora Home Loan Document Structuring",
        duration: "2 Business Days",
        desc: "Foreign credit score integration (Experian/Equifax/TransUnion) with partner commercial banks."
      },
      {
        name: "Developer Milestone Financing Structure",
        duration: "Custom Scope",
        desc: "Escrow account alignment, interest rate lock, and loan disbursement scheduling."
      }
    ],
    items: [
      {
        id: "fin-01",
        title: "Diaspora Fast-Track Mortgage Facility (Up to ₦150M)",
        location: "Lagos, Abuja, PH, Ibadan & Enugu",
        state: "Available to UK, US & Canada Clients",
        priceNgn: 50000,
        priceUsd: 32,
        size: "Pre-Approval & Document Pack",
        titleType: "CBN Regulated Primary Mortgage Bank",
        status: "Pre-Approval within 48 Hours",
        mainImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-house-keys-41617-large.mp4",
        likesCount: 205,
        reactions: { fire: 95, verified: 155 },
        comments: [
          { id: "c1", author: "Chinedu M. (London)", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Got my pre-approval letter in 3 days using my UK payslips and credit rating.", time: "1 day ago", likes: 18 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800", caption: "Mortgage Loan Amortization Schedule", rotate: -1, scale: 0.97 }
        ],
        description: "Get institutional mortgage financing up to 70% loan-to-value (LTV) for verified homes. Use your foreign income or domestic corporate salary with flexible 10 to 20-year repayment windows.",
        highlights: [
          "Direct integration with leading Primary Mortgage Banks (PMBs)",
          "Fixed interest rate options available to hedge currency fluctuations",
          "Full legal review of property title before loan commitment"
        ],
        agentOrProvider: "Umoja Mortgage & Financial Advisory Desk"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 13. LEGAL & DOCUMENTATION (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "legal-documentation",
    kind: "service",
    num: "14",
    title: "Legal & Documentation",
    subtitle: "Required Documents, Due Diligence, Agreements & Lawyer Booking",
    shortDesc: "Understand required documents, generate legal agreements, and connect with vetted property lawyers.",
    category: "Legal & Verification",
    tag: "Title Vetting & Agreements",
    badge: "Accredited Lawyers",
    icon: "FileCheck",
    accent: "#8B4513",
    heroImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=80",
    stats: { titlesPerfected: "2,400+", avgTimeline: "60-90 Days", courtDisputesPrevented: "100%" },
    bookingPackages: [
      {
        name: "Lands Bureau Title Search & Encumbrance Check",
        duration: "2-3 Business Days",
        desc: "Physical register search at Alausa (Lagos) or AGIS (Abuja) for caveats, lis pendens, and court orders."
      },
      {
        name: "Deed of Assignment & Contract of Sale Drafting",
        duration: "24-48 Hours",
        desc: "Legally binding drafting with full indemnity clauses by seasoned accredited property solicitors."
      },
      {
        name: "Complete Governor's Consent & Title Perfection",
        duration: "Full Filing",
        desc: "Stamp duties payment, Capital Gains Tax clearance, and Governor's Consent endorsement file tracking."
      }
    ],
    items: [
      {
        id: "leg-01",
        title: "Alausa Lands Bureau Complete Title Perfection & Consent",
        location: "Alausa Lands Bureau, Ikeja, Lagos",
        state: "Lagos State Lands Registry",
        priceNgn: 350000,
        priceUsd: 220,
        size: "Per Title File Application",
        titleType: "Official Lagos State Seal & Endorsement",
        status: "Fast-Track Processing",
        mainImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        likesCount: 245,
        reactions: { fire: 110, verified: 180 },
        comments: [
          { id: "c1", author: "Barr. Toyin Balogun", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100", text: "Eliminates touts and missing files. Every movement tracked with a verified government query letter.", time: "1 day ago", likes: 21 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800", caption: "Stamped Deed & Official Alausa Receipt", rotate: -1, scale: 0.97 }
        ],
        description: "Avoid stalled applications and extortion at land registries. Our corporate legal counsel ensures your land or house title receives official Governor's Consent, stamp duties assessment, and gazette publication.",
        highlights: [
          "Transparent calculation of state stamp duty and Capital Gains Tax",
          "Dedicated tracking barcode to monitor file progression online",
          "Direct handover of original endorsed title document under escrow"
        ],
        agentOrProvider: "Terra Chambers & Legal Solicitors (Lagos/Abuja)"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 14. LAND VERIFICATION (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "land-verification",
    kind: "service",
    num: "15",
    title: "Land Verification",
    shortDesc: "Check survey plans, GPS coordinates, government acquisition status, and registry records before you buy.",
    category: "Legal & Verification",
    tag: "Survey & Title Verification",
    badge: "100% Verified",
    icon: "Compass",
    accent: "#D27D2D",
    heroImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    stats: { verificationsConducted: "3,800+", fraudulentPlotsCaught: "420+", timeToReport: "48 Hours" },
    adVideo: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
    beforeAfter: {
      beforeImg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
      afterImg: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
      beforeLabel: "Before: Raw Unchecked Bush (High Scam Risk)",
      afterLabel: "After: Officially Charted Coordinates with Certified NIS Report"
    },
    bookingPackages: [
      {
        name: "Alausa / AGIS Masterplan Charting Check",
        duration: "24-48 Hours",
        desc: "Exact GPS coordinate plotting against the Lagos or FCDA state masterplan to confirm zero acquisition."
      },
      {
        name: "On-Site Beacon Stone & Boundary Verification",
        duration: "Same Day Field Visit",
        desc: "Physical boundary survey with dual-frequency RTK GPS and boundary perimeter validation."
      },
      {
        name: "Drone 4K Topographical & Boundary Audit",
        duration: "2 Business Days",
        desc: "High-resolution orthophoto mapping, digital elevation contour model, and certified beacon map."
      }
    ],
    items: [
      {
        id: "verif-01",
        title: "Comprehensive Land Vetting & Surveyor-General Charting",
        location: "All 20 LGAs in Lagos State, Ogun & Abuja",
        state: "Lagos, Ogun & FCT",
        priceNgn: 120000,
        priceUsd: 76,
        size: "Per Plot (Up to 1,000 SQM)",
        titleType: "NIS Certified Survey Charting Report",
        status: "Turnaround: 48 Hours",
        mainImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        likesCount: 290,
        reactions: { fire: 140, verified: 240 },
        comments: [
          { id: "c1", author: "Surv. Kolawole (FNIS)", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Saved a diaspora client from losing ₦40M on land under Lagos State coastal road alignment.", time: "1 day ago", likes: 45 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800", caption: "GPS RTK Rover Coordinate Mapping", rotate: -3, scale: 0.95 },
          { img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800", caption: "Official Surveyor-General Composite Chart", rotate: 2, scale: 0.96 }
        ],
        description: "NEVER pay a seller or family (Omo Onile) without this verification. Our registered surveyors pick coordinates on site with high-precision RTK GPS and chart them against government master plans to confirm if the land falls under government acquisition or road setbacks.",
        highlights: [
          "Instant check: committed acquisition, agricultural zoning, or excision gazette",
          "Verification of physical concrete beacon numbers against registered survey",
          "Full 6-page legal & surveyor advisory certificate issued"
        ],
        agentOrProvider: "Chartered Institute of Surveyors Registered Vetting Unit"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 15. MOVING & RELOCATION (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "moving-services",
    kind: "service",
    num: "16",
    title: "Moving & Relocation",
    shortDesc: "Book moving trucks, professional packing, and secure storage with transit insurance.",
    category: "Management & Living",
    tag: "Trucks, Packing & Storage",
    badge: "Insured Moving",
    icon: "Truck",
    accent: "#B45309",
    heroImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
    stats: { movesCompleted: "3,100+", zeroDamageRate: "99.6%", coverage: "All 36 States" },
    bookingPackages: [
      {
        name: "Inter-State Relocation & Moving Logistics",
        duration: "Door-to-Door",
        desc: "Heavy-duty enclosed haulage trucks across Lagos, Abuja, Port Harcourt, and Ibadan."
      },
      {
        name: "VIP Fragile & Fine Art Packaging Service",
        duration: "Full Packing Day",
        desc: "Double-wall corrugated boxing, shockproof foam wrap, and insured transit."
      },
      {
        name: "Commercial Office Disassembly & Re-installation",
        duration: "Weekend Turnaround",
        desc: "Workstation partitioning, server rack logistics, and safe transport."
      }
    ],
    items: [
      {
        id: "mov-01",
        title: "Interstate VIP Relocation: Lagos to Abuja / Port Harcourt",
        location: "Lagos, Abuja, PH, Ibadan & Enugu",
        state: "Interstate Service",
        priceNgn: 480000,
        priceUsd: 300,
        size: "Full 4-Bedroom Home Package",
        titleType: "Leadway Insurance Transit Policy Included",
        status: "Daily Departures",
        mainImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        likesCount: 165,
        reactions: { fire: 80, verified: 110 },
        comments: [
          { id: "c1", author: "Mrs. Ngozi E.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100", text: "Every wine glass and mirror arrived in Abuja from Victoria Island in 100% mint condition.", time: "2 days ago", likes: 19 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800", caption: "Custom Wooden Crating & Furniture Bubble Padding", rotate: -1, scale: 0.97 }
        ],
        description: "Stress-free residential and corporate relocation. Uniformed movers pack, label, load into GPS-tracked weather-sealed haulage trucks, and unpack at your new address.",
        highlights: [
          "Zero breakage guarantee with verified transit insurance policy",
          "GPS real-time truck position tracker accessible to client on phone",
          "Includes wardrobe boxes, mattress covers, and heavy appliance dollies"
        ],
        agentOrProvider: "Umoja Relocation Logistics Fleet"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 16. HOME MAINTENANCE (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "property-maintenance",
    kind: "service",
    num: "17",
    title: "Home Maintenance",
    shortDesc: "Scheduled servicing for generators, air conditioners, water pumps, and routine home care.",
    category: "Management & Living",
    tag: "Generator, AC & Water Care",
    badge: "Year-Round Service",
    icon: "CalendarCheck",
    accent: "#0E4C33",
    heroImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
    stats: { homesSubscribed: "850+ Homes", uptimeMaintained: "99.8%", emergencyResponse: "Under 1 Hour" },
    bookingPackages: [
      {
        name: "Standard Residential Care Retainer (Monthly)",
        duration: "Monthly Visit",
        desc: "Generator 250-hour servicing, plumbing pressure check, and AC filter disinfection."
      },
      {
        name: "Water Purification & Borehole Chemical Flushing",
        duration: "Quarterly Cycle",
        desc: "Multi-media sand filter backwash, carbon renewal, and microbiological water lab test."
      },
      {
        name: "Comprehensive Estate Villa VIP Maintenance SLA",
        duration: "Annual Retainer",
        desc: "24/7 dedicated rapid response team, swimming pool care, and electrical surge audits."
      }
    ],
    items: [
      {
        id: "pm-ret-01",
        title: "All-Inclusive Executive Home Retainer (Generator + Water + AC)",
        location: "Lekki, Ikoyi, Ikeja GRA, Maitama & Guzape",
        state: "Lagos & Abuja",
        priceNgn: 180000,
        priceUsd: 115,
        size: "Per Month / 4-5 Bed House",
        titleType: "12-Month Facility SLA Contract",
        status: "Instant Onboarding",
        mainImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        likesCount: 185,
        reactions: { fire: 82, verified: 125 },
        comments: [
          { id: "c1", author: "Engr. Patrick", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Prevented a major generator engine seizure by catching dirty diesel filters during routine service.", time: "1 day ago", likes: 16 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800", caption: "Industrial Generator Fluid Diagnostics", rotate: -1, scale: 0.97 }
        ],
        description: "Protect your capital asset. Regular preventive maintenance prevents expensive catastrophic failures. Covers scheduled diesel generator servicing, water treatment chemical balancing, and electrical DB inspections.",
        highlights: [
          "Covers parts, filters, and synthetic engine lubricants",
          "Dedicated 24/7 WhatsApp emergency hotline with 60-minute dispatch",
          "Detailed digital maintenance logbook accessible by property owner"
        ],
        agentOrProvider: "Umoja Facility Services Group"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 17. DISTRESSED PROPERTIES (Product - Snapping Showcase Deck)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "auction-distressed",
    kind: "product",
    num: "18",
    title: "Distressed Properties",
    shortDesc: "Below-market properties and quick-sale opportunities, fully vetted and court cleared.",
    category: "Real Estate",
    tag: "30-50% Below Market",
    badge: "Court & Bank Cleared",
    icon: "Gavel",
    accent: "#991B1B",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    stats: { activeDeals: "14 Foreclosures", avgDiscount: "38.5%", vettedClearance: "100% Court Verified" },
    items: [
      {
        id: "auc-01",
        title: "Bank Distressed 5-Bedroom Detached Carcass with C of O",
        location: "Orchid Road, Lekki Corridor, Lagos",
        state: "Lagos State",
        priceNgn: 85000000,
        priceUsd: 53800,
        size: "900 SQM (Valued at ₦145,000,000)",
        titleType: "Clean Governor's Consent & Court Clearance",
        status: "Liquidation - 14 Days Remaining",
        mainImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        likesCount: 340,
        reactions: { fire: 220, verified: 260 },
        comments: [
          { id: "c1", author: "Chief Alabi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", text: "Incredible price. The land value alone on Orchid road is currently ₦95M.", time: "12 hours ago", likes: 38 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800", caption: "Structure at Lintel & Carcass Level", rotate: -3, scale: 0.95 },
          { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", caption: "Gated Perimeter & Deep Foundation", rotate: 2, scale: 0.96 }
        ],
        description: "Rare liquidation opportunity. Developer urgent cash-flow exit. Structural carcass already completed to roofing level on solid dry land. Independent valuation confirms ₦145M replacement value.",
        highlights: [
          "41% discount off current street open-market price",
          "No litigation: verified with Lagos State High Court probate & mortgage registry",
          "Ideal for immediate finishing and resale or luxury family residence"
        ],
        agentOrProvider: "Asset Recovery & Liquidation Auctioneers"
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════
  // 18. COMMUNITY & GATE PASS (Service)
  // ══════════════════════════════════════════════════════════════════════
  {
    id: "community-features",
    kind: "service",
    num: "19",
    title: "Community & Gate Pass",
    shortDesc: "Digital visitor passes, security alerts, and estate communication in one simple portal.",
    category: "Technology & Security",
    tag: "Resident App & Gate Pass",
    badge: "Secure Community",
    icon: "Users2",
    accent: "#047857",
    heroImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    stats: { activeResidents: "18,500+", estateForums: "45 Estates", securityIncidentsAvoided: "98%" },
    bookingPackages: [
      {
        name: "Gated Estate Resident Association Network Setup",
        duration: "1-Week Onboarding",
        desc: "Digital resident registry, visitor gate-pass QR generation, and AGM voting portal."
      },
      {
        name: "Neighborhood Patrol & Private Security Escrow",
        duration: "Retainer Protocol",
        desc: "Armed security coordination, CCTV perimeter feed access, and panic button response."
      },
      {
        name: "Community Maintenance Levy Escrow Management",
        duration: "Monthly Automated",
        desc: "Automated estate dues collection with transparent digital accounting and expense reports."
      }
    ],
    items: [
      {
        id: "comm-01",
        title: "Estate Community Connect Hub & Security SOS",
        location: "Magodo GRA, Lekki Phase 1, Gwarinpa & Guzape",
        state: "Lagos & Abuja Estates",
        priceNgn: 50000,
        priceUsd: 32,
        size: "Per Household / Year",
        titleType: "Resident Association Endorsement",
        status: "Active Community",
        mainImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4",
        likesCount: 225,
        reactions: { fire: 95, verified: 160 },
        comments: [
          { id: "c1", author: "Tolani Johnson", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", text: "The instant panic SOS alerted our estate gate patrol in under 60 seconds. A true lifesaver.", time: "1 day ago", likes: 29 }
        ],
        photos: [
          { img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800", caption: "Resident App Community Feed & Instant SOS", rotate: 1, scale: 0.96 }
        ],
        description: "Connect with verified neighbors, post items for sale, receive instantaneous security gate SOS alerts, and participate in estate democratic decision-making with verifiable blockchain voting.",
        highlights: [
          "One-touch Panic SOS triggers armed response and alerts estate control room",
          "Peer-reviewed local vendor ratings: reliable nannies, car washers, generator mechanics",
          "Estate financial transparency ledger open to all registered dues-paying members"
        ],
        agentOrProvider: "Umoja Community Networks"
      }
    ]
  }
];
