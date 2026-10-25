import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Wrench, Sparkles, ShieldCheck, Check, 
  CheckCircle, Phone, Clock, MapPin, Calendar, AlertCircle, 
  X, ChevronRight, Sliders, User, Award, Zap, Droplets, 
  Truck, Bug, Camera, Sun, Wifi, Wind, Palette, Shield, Info,
  FileText, Navigation, PhoneCall, Trees, HardHat, RefreshCw,
  Compass, Hammer, CheckSquare, Layers
} from 'lucide-react';
import { getStoredServices } from '../utils/userStorage';

// ══════════════════════════════════════════════════════════════════════
// 1. DATA: 12 CERTIFIED HOME SERVICES & TRADES
// ══════════════════════════════════════════════════════════════════════

const HOME_SERVICES = [
  {
    id: 'plumbers',
    name: 'Plumbers & Leak Engineers',
    icon: Droplets,
    badge: '24/7 Leak & Pressure Desk',
    heroImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    shortDesc: 'Leak detection, slab pipe rerouting, water heater descaling, pump repairs, and sanitary fitting.',
    diagFeeNgn: 7500,
    surveyFeeNgn: 10000,
    constructionSurveyFeeNgn: 12500,
    commonConcerns: [
      'Burst pipe leaking under floor slab or ceiling',
      'Blocked toilet, kitchen drain, or slow soakaway drainage',
      'Water pump running continuously or not pumping water',
      'Low water pressure across master bathroom & showers',
      'Smelly water / rusty tank sediments requiring descaling',
      'Water heater (Ariston) trip switch or not heating',
      'Others (Describe your specific plumbing concern below)'
    ],
    replacementScopes: [
      { title: 'Whole-House PPR Re-Piping & Concealed Conduits', desc: 'Complete conduit replacement of corroded galvanized or brittle PVC lines with PN20 hot/cold PPR pipes.' },
      { title: 'Bathroom Sanitary Overhaul & Mixer Fitting', desc: 'Replacing toilets, concealed shower mixers, freestanding bathtubs, and vanity cabinets.' },
      { title: 'Main Overhead Tank Tower & Automatic Booster Pump System', desc: 'Installing high-capacity storage tanks, pressure control switch, and surge valves.' },
      { title: 'Central Drainage & Soakaway Chamber Re-Engineering', desc: 'Replacing collapsed inspection chambers, gully traps, and bio-digester connections.' }
    ],
    constructionScopes: [
      { title: 'Stage 1: Ground Floor Underground Soil Drainage & Inspection Chambers', desc: 'Laying 4-inch/6-inch underground pipes, slope grading, and casting heavy concrete manholes.' },
      { title: 'Stage 2: 1st Fix PPR Water Supply Conduit Chasing & Slab Drops', desc: 'Chasing brickwork, pressure welding PPR pipes into walls before plastering, and pressure testing.' },
      { title: 'Stage 3: 2nd Fix Sanitary Fitting & Pressure Pump Commissioning', desc: 'Installing faucets, wall-hung toilets, water heaters, and booster pump connection.' }
    ]
  },
  {
    id: 'electricians',
    name: 'Certified Electricians & Power Engineers',
    icon: Zap,
    badge: 'COREN & NEMSA Certified',
    heroImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    shortDesc: 'Short circuit diagnosis, distribution board balancing, inverter changeovers, and architectural wiring.',
    diagFeeNgn: 7500,
    surveyFeeNgn: 10000,
    constructionSurveyFeeNgn: 12500,
    commonConcerns: [
      'Frequent tripping of circuit breakers or RCD safety switch',
      'Burnt smell or sparked socket outlets in rooms',
      'Generator / Inverter automatic changeover switch failed',
      'Low voltage / fluctuating phase across specific appliances',
      'Whole house partial blackouts with single active phase',
      'Chandelier, recessed ceiling LED lights installation',
      'Others (Describe your specific electrical concern below)'
    ],
    replacementScopes: [
      { title: 'Complete House Re-Wiring with 100% Pure Copper Fire-Retardant Cables', desc: 'Replacing old aged wiring with certified Coleman/Nigerchin flame-retardant copper conductors.' },
      { title: 'Distribution Board (DB) Complete Modernization & RCD Breakers', desc: 'Installing modern circuit breakers, surge protection devices (SPD), and phase balancing.' },
      { title: 'Microcontroller Automatic Transfer Switch (ATS) System', desc: 'Automatic generator start/stop, grid sensing, and seamless inverter transfer panel.' }
    ],
    constructionScopes: [
      { title: 'Stage 1: Slab Conduiting, Pipe Chasing & Wall Back-Box Setting', desc: 'Laying PVC conduit pipes across decking before concrete pouring, wall pipe chases.' },
      { title: 'Stage 2: 1st Fix Cable Pulling & Earth Rod Grounding Installation', desc: 'Pulling 1.5mm, 2.5mm, 4.0mm, and 6.0mm cables, earth pit boring and copper rod bonding.' },
      { title: 'Stage 3: 2nd Fix Light Fittings, Switches, DB Termination & Energizing', desc: 'Mounting sockets, architectural strip lights, chandeliers, and testing with electric utility.' }
    ]
  },
  {
    id: 'cleaners',
    name: 'Deep Cleaners & Post-Construction Sanitation',
    icon: Sparkles,
    badge: 'Hospital-Grade Sanitizing',
    heroImg: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    shortDesc: 'Post-construction paint & cement scrub, high-gloss marble buffing, and move-in fumigation.',
    diagFeeNgn: 5000,
    surveyFeeNgn: 8000,
    constructionSurveyFeeNgn: 10000,
    commonConcerns: [
      'Newly built or renovated house covered in paint splatters and cement',
      'Dull, scratched marble or granite floors needing industrial buffing',
      'Move-in / move-out full sanitizing before tenancy handover',
      'Deep stain extraction for luxury upholstery, sofas, and carpets',
      'Greasy kitchen hood, oven, and tile grout buildup',
      'Others (Describe your specific cleaning requirements below)'
    ],
    replacementScopes: [
      { title: 'Complete Multi-Unit Move-Out Restoration & Deep Sanitizing', desc: 'Full restoration cleaning for multi-flat buildings, windows, and exterior compound.' },
      { title: 'Industrial Italian Marble Crystallization & Diamond Pad Grinding', desc: 'Grinding surface scratches and chemical buffing for a mirror-like glass reflection.' }
    ],
    constructionScopes: [
      { title: 'Post-Construction Builder Clean (Debris & Cement Film Stripping)', desc: 'Removing cement splatter, masking tape residue, chemical wash of glass windows and window frames.' },
      { title: 'Pre-Handover Sparkle Clean & Move-In Polishing', desc: 'Sterilizing kitchen cabinetry, polishing bathroom sanitaryware, and waxing tiles for client handover.' }
    ]
  },
  {
    id: 'painters',
    name: 'Professional Painters & Screeders',
    icon: Palette,
    badge: 'Dulux Certified Applicators',
    heroImg: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    shortDesc: 'Mirror-finish wall screeding, moisture-barrier treatment, and exterior weather-shield painting.',
    diagFeeNgn: 7500,
    surveyFeeNgn: 10000,
    constructionSurveyFeeNgn: 12500,
    commonConcerns: [
      'Peeling or damp bubbling paint caused by rising moisture',
      'Uneven, bumpy plaster requiring smooth acrylic wall screeding',
      'Faded exterior facade requiring all-weather UV protection',
      'Color makeover for interior rooms, accent walls, and woodwork',
      'Stucco marble texture & Italian decorative wall effects',
      'Others (Describe your specific painting concern below)'
    ],
    replacementScopes: [
      { title: 'Complete Interior Wall Stripping, Damp Proofing & Smooth Screeding', desc: 'Scraping old defective paint to bare plaster, anti-damp chemical coating, and double-putty screed.' },
      { title: 'Total Exterior Facade Silicone Weathershield Paint Upgrade', desc: 'Pressure-washing exterior, filling expansion gaps, and multi-coat silicone elastomer paint.' }
    ],
    constructionScopes: [
      { title: 'New Building Plaster Assessment & Acrylic Wall Screeding', desc: 'Measuring square meters of fresh plaster, testing curing moisture, and applying multi-layer acrylic screed.' },
      { title: 'Complete Interior & Exterior Priming and Emulsion Coat Application', desc: 'Applying anti-fungal primer, undercoat, and top-tier satin/matte washable architectural coats.' }
    ]
  },
  {
    id: 'movers',
    name: 'Relocation & Heavy Haulage Movers',
    icon: Truck,
    badge: 'Zero-Damage Guarantee',
    heroImg: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&q=80',
    shortDesc: 'Interstate & local house moving with covered box trucks, protective bubble wrap, and furniture assembly.',
    diagFeeNgn: 5000,
    surveyFeeNgn: 8000,
    constructionSurveyFeeNgn: 10000,
    commonConcerns: [
      'Moving house from Island to Mainland or interstate (Lagos to Abuja)',
      'Fragile luxury chandeliers, glass dining tables, and TVs needing crating',
      'Heavy fireproof safes, pianos, and gym equipment requiring hoist',
      'Dismantling and re-assembling wardrobes and king beds',
      'Temporary storage and secure warehousing',
      'Others (Describe your specific moving requirements below)'
    ],
    replacementScopes: [
      { title: 'Whole-House White-Glove Packing, Crating & Interstate Haulage', desc: 'Comprehensive packing of all glassware, clothes, artwork, and transit insurance.' },
      { title: 'Multi-Floor Heavy Item Crane & Hoist Elevation', desc: 'Specialized hydraulic rigging for oversized furniture that cannot fit stairs or elevators.' }
    ],
    constructionScopes: [
      { title: 'Pre-Handover Architectural Furniture Delivery & Room Staging', desc: 'Receiving imported luxury furniture containers, uncrating, assembling, and placing in newly built property.' }
    ]
  },
  {
    id: 'gardeners',
    name: 'Landscape Gardeners & Tree Surgeons',
    icon: Trees,
    badge: 'Horticultural Specialists',
    heroImg: 'https://images.unsplash.com/photo-1558904541-efa8c4a5c962?w=800&q=80',
    shortDesc: 'Lawn manicuring, hedge sculpting, irrigation systems, tree pruning, and tropical landscaping.',
    diagFeeNgn: 5000,
    surveyFeeNgn: 8000,
    constructionSurveyFeeNgn: 10000,
    commonConcerns: [
      'Overgrown wild grass, weeds, and untamed perimeter hedges',
      'Dying lawn grass requiring Bermuda/Carpet grass sod replacement',
      'Dangerous tree branches threatening electric wires or roof gutters',
      'Compound green landscaping with exotic ornamental palms and flowers',
      'Automated pop-up garden sprinkler irrigation installation',
      'Others (Describe your specific gardening concern below)'
    ],
    replacementScopes: [
      { title: 'Complete Compound Turf Removal & Fresh Carpet Grass Laying', desc: 'Excavating dead soil, laying fertilized loamy topsoil, and roll-out Bermuda sod.' },
      { title: 'Dangerous Old Tree Felling, Trunk Dismantling & Root Grinding', desc: 'Precision sectional felling near boundary walls with zero impact.' }
    ],
    constructionScopes: [
      { title: 'New Site Compound Grading & Landscape Masterplan Execution', desc: 'Topographic contouring, planting royal palm trees, hedge borders, and exterior pathway pavers.' },
      { title: 'Automated Pop-Up Sprinkler Irrigation System Installation', desc: 'Underground conduit pipe laying, solenoid zone valves, and digital rain sensor timer.' }
    ]
  },
  {
    id: 'pest-control',
    name: 'Fumigation & Pest Exterminators',
    icon: Bug,
    badge: 'Environmental Health Certified',
    heroImg: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80',
    shortDesc: 'Anti-termite deep foundation barriers, bedbug heat treatments, and snake/rodent repelling.',
    diagFeeNgn: 6000,
    surveyFeeNgn: 8500,
    constructionSurveyFeeNgn: 12000,
    commonConcerns: [
      'Termites eating wooden door frames, roofs, and kitchen cabinets',
      'Severe bedbug infestation in mattresses and bedroom upholstery',
      'Cockroach, mosquito, and rodent invasion in kitchens & drains',
      'Snake and reptile sightings in compound perimeter gardens',
      'Periodic routine non-toxic preventative fumigation',
      'Others (Describe your specific pest control problem below)'
    ],
    replacementScopes: [
      { title: 'Sub-Slab Anti-Termite Chemical Reticulation & Foundation Barrier', desc: 'Drilling perimeter floor slabs with high-pressure fipronil chemical barrier with 5-year warranty.' },
      { title: 'Complete Estate Perimeter Snake & Rodent Repellent Perimeter Grid', desc: 'Eco-safe chemical border granules and ultrasonic pest repellent traps.' }
    ],
    constructionScopes: [
      { title: 'Pre-Construction Soil Anti-Termite Drenching (Before Hardcore & DPM)', desc: 'Heavy chemical soaking of foundation trenches and blinded sand before laying damp-proof membrane.' },
      { title: 'Roof Truss & Timber Chemical Vacuum Impregnation', desc: 'Treating all wooden purlins, rafters, and ceiling fascia boards against dry-wood woodborers.' }
    ]
  },
  {
    id: 'borehole-drilling',
    name: 'Borehole Drilling & Water Treatment Plants',
    icon: Wrench,
    badge: 'Licensed Water Engineers',
    heroImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?w=800&q=80',
    shortDesc: 'Deep aquifer rotary borehole drilling, submersible Sumo pumps, and multistage reverse osmosis plants.',
    diagFeeNgn: 15000,
    surveyFeeNgn: 20000,
    constructionSurveyFeeNgn: 25000,
    commonConcerns: [
      'Existing borehole bringing brown, muddy, or iron-heavy water',
      'Submersible pump burned out or stuck at bottom of casing',
      'Need brand new heavy-yield borehole on newly acquired land',
      'Water has bad odor or stains bathroom tiles with rust',
      'Overhead water tank automatic sensor float switch broken',
      'Others (Describe your specific borehole or water issue below)'
    ],
    replacementScopes: [
      { title: 'Submersible Pump Overhaul (Sumo / Pedrollo / Grundfos) & Marine Cable', desc: 'Pulling pump from deep casing, testing motor winding, and replacing control starter box.' },
      { title: 'Industrial Multistage Iron-Removal & Carbon Aeration Treatment Plant', desc: 'Aeration tower, manganese greensand iron filter, activated carbon, and sediment polishing.' }
    ],
    constructionScopes: [
      { title: 'Geophysical Vertical Electrical Sounding (VES Test) & Site Survey', desc: 'Testing subterranean strata resistivity to determine exact aquifer depth and potable water yield.' },
      { title: 'Deep Aquifer Rotary Rig Drilling & High-Pressure PVC Casing (150-300ft)', desc: 'Drilling through clay/shale/sandstone, gravel packing, air compressor flushing, and yield testing.' }
    ]
  },
  {
    id: 'cctv-installation',
    name: 'CCTV Security & Smart Surveillance',
    icon: Camera,
    badge: 'Hikvision & Dahua Certified',
    heroImg: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80',
    shortDesc: '4K ColorVu night vision cameras, phone live-view streaming, motion alerts, and video doorbells.',
    diagFeeNgn: 7500,
    surveyFeeNgn: 10000,
    constructionSurveyFeeNgn: 12500,
    commonConcerns: [
      'Need complete 24/7 security camera coverage for house compound and gate',
      'Existing cameras showing black screens or blurry fuzzy footage',
      'Want to view live site cameras on phone while traveling in UK/USA',
      'Hard drive not recording playback history',
      'Smart intercom video doorbell not ringing on phone',
      'Others (Describe your specific CCTV/security requirement below)'
    ],
    replacementScopes: [
      { title: 'Full Migration from Analog Coaxial to 4K ColorVu PoE IP Cameras', desc: 'Upgrading old fuzzy camera cabling to Cat6 Gigabit IP cameras with live smartphone sound & video.' },
      { title: 'Central Network Video Recorder (NVR) & Redundant Cloud Backup', desc: 'Installing 16-channel 4K NVR with surveillance-grade Western Digital Purple hard drives.' }
    ],
    constructionScopes: [
      { title: 'New Site Security Camera Pre-Wiring & Conduit Route Survey', desc: 'Planning blind-spot-free angles, running weatherproof Cat6 cables in ceiling conduits during construction.' },
      { title: 'Live 4G Solar Construction Camera Setup for Remote Owner Monitoring', desc: 'Mounting solar-powered 360-degree PTZ cameras on site mast for remote diasporan supervision.' }
    ]
  },
  {
    id: 'solar-installation',
    name: 'Solar Inverters & Battery Engineers',
    icon: Sun,
    badge: 'Tier-1 Certified Clean Energy',
    heroImg: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800&q=80',
    shortDesc: 'Lithium battery upgrades, hybrid inverter installations, and solar panel roof array mounting.',
    diagFeeNgn: 10000,
    surveyFeeNgn: 15000,
    constructionSurveyFeeNgn: 15000,
    commonConcerns: [
      'Inverter batteries dying quickly after only 1 or 2 hours of power outage',
      'Inverter showing overload error code or continuous red alarm beep',
      'Want to switch from noisy expensive diesel generator to 24/7 solar',
      'Solar panels not charging batteries during sunny afternoons',
      'Upgrading old tubular batteries to modern wall-mounted Lithium LiFePO4',
      'Others (Describe your specific solar/power problem below)'
    ],
    replacementScopes: [
      { title: 'Upgrading Tubular Lead-Acid Batteries to Wall-Mounted Lithium LiFePO4', desc: 'Replacing failing batteries with 5.12KWh - 15KWh lithium batteries with BMS smart display.' },
      { title: 'Complete Inverter System Replacement (Pure Sine Wave Hybrid Inverter)', desc: 'Replacing dated modified sine-wave inverter with high-efficiency MPPT solar hybrid system.' }
    ],
    constructionScopes: [
      { title: 'Building Carcass Solar Load Audit & Roof Weight/Angle Engineering Survey', desc: 'Surveying roof truss orientation (South/North), designing dedicated inverter room conduits.' },
      { title: 'Heavy DC Solar Cable Trunking & Roof Aluminum Rail Installation', desc: 'Mounting anti-rust rail brackets on standing seam or stone-coated roof tiles with surge arresters.' }
    ]
  },
  {
    id: 'internet-providers',
    name: 'Home & Estate Internet Broadband',
    icon: Wifi,
    badge: 'Fiber & Starlink Specialists',
    heroImg: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    shortDesc: 'Starlink precision satellite roof mounting, fiber optic FTTH drops, and whole-house mesh Wi-Fi.',
    diagFeeNgn: 6000,
    surveyFeeNgn: 8500,
    constructionSurveyFeeNgn: 10000,
    commonConcerns: [
      'Dead Wi-Fi zones in bedrooms, backyard, or upstairs penthouse',
      'Starlink satellite dish needs professional obstruction-free roof mounting',
      'Slow internet buffering during Zoom calls or streaming',
      'Need dedicated gigabit fiber connection dropped to the residence',
      'Estate Wi-Fi distribution across compound and gatehouse',
      'Others (Describe your internet/networking requirement below)'
    ],
    replacementScopes: [
      { title: 'Whole-House Tri-Band Seamless Mesh Wi-Fi 6 Replacement Network', desc: 'Replacing single weak router with ceiling-mounted access points across all floors.' },
      { title: 'Starlink Heavy-Duty Galvanized Ridge Mount & Weatherproof Conduit Grommet', desc: 'Securing satellite dish against tropical windstorms with zero cable intrusion leaks.' }
    ],
    constructionScopes: [
      { title: 'Structured Cat6 Network Cabling Chasing & Server Rack Design', desc: 'Running dedicated network cables to each bedroom, living room TV console, and access point drops.' },
      { title: 'Gatehouse & Compound Fiber Optic Drop Conduit Planning', desc: 'Laying underground PVC conduit for fiber optic broadband before paving driveways.' }
    ]
  },
  {
    id: 'ac-technicians',
    name: 'Air Conditioning Technicians (HVAC)',
    icon: Wind,
    badge: 'Certified Inverter AC Technicians',
    heroImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    shortDesc: 'Chemical coil jet wash, R410a refrigerant gas refilling, compressor replacement, and new AC installs.',
    diagFeeNgn: 7500,
    surveyFeeNgn: 10000,
    constructionSurveyFeeNgn: 12500,
    commonConcerns: [
      'AC is blowing normal fan air but not cooling the room at all',
      'Water continuously leaking or dripping from indoor unit onto wall',
      'AC making loud grinding noise or outdoor compressor shaking',
      'Unpleasant dusty or musty smell coming from blower vents',
      'Need brand new inverter AC installed or uninstalled for relocation',
      'Others (Describe your specific AC/cooling concern below)'
    ],
    replacementScopes: [
      { title: 'Complete AC Unit De-Installation & Re-Installation of Inverter Systems', desc: 'Removing dated energy-wasting units, installing modern 1.5HP / 2HP energy-efficient inverter units.' },
      { title: 'Copper Pipe Rerouting & Concealed Drain Pipe Replacement', desc: 'Replacing pinched, leaking, or oxidized copper pipes and installing insulated condensation drainage.' }
    ],
    constructionScopes: [
      { title: 'Building Carcass AC Pre-Installation Copper Piping (Pre-Plastering)', desc: 'Chasing walls, laying insulated copper refrigerant tubes, and drainage lines before plastering walls.' },
      { title: 'Outdoor AC Condenser Compressor Platform & Ledge Engineering', desc: 'Designing secure condenser ledge brackets or rooftop central rack for tidy exterior aesthetics.' }
    ]
  }
];

// ══════════════════════════════════════════════════════════════════════
// 2. MAIN COMPONENT: HOME SERVICES MARKETPLACE
// ══════════════════════════════════════════════════════════════════════
export default function HomeServicesMarketplace({ onBackToHub, customService }) {
  const storedServices = getStoredServices();
  const hsService = customService || (storedServices.find(s => s.id === 'home-services') || {});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null); // null = browsing grid; object = configuring service order
  
  // High-Level Service Mode:
  // 1. 'repair': Fault diagnosis & repairs on existing home (someone comes to see problem & give invoice)
  // 2. 'replacement': Full replacement / turnkey overhaul (someone comes to survey at a fee, no arbitrary price, gives quote)
  // 3. 'construction': Building in Progress (someone comes to survey carcass/drawings, then gives project rates)
  const [serviceMode, setServiceMode] = useState('repair'); 

  // Construction stage if building in progress
  const [constructionStage, setConstructionStage] = useState('Carcass & Blockwork (Roofing Ongoing)');
  
  // Concerns & Notes
  const [selectedConcern, setSelectedConcern] = useState('');
  const [customConcernNotes, setCustomConcernNotes] = useState('');
  
  // Replacement / Construction Scope Selection (Survey targets)
  const [selectedScopeTarget, setSelectedScopeTarget] = useState('');

  // Location & Arrival State
  const [address, setAddress] = useState('');
  const [stateName, setStateName] = useState('Lagos State');
  const [preferredDate, setPreferredDate] = useState('Tomorrow Morning (9:00 AM - 12:00 PM)');
  const [isEmergency, setIsEmergency] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // Confirmation Modal State
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Auto-scroll to top when opening a service or returning to catalog
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [selectedService]);

  // Initialize service booking state when clicked
  const handleOpenService = (service, defaultMode = 'repair') => {
    setSelectedService(service);
    setServiceMode(defaultMode);
    setSelectedConcern(service.commonConcerns[0] || '');
    setCustomConcernNotes('');
    setSelectedScopeTarget(
      defaultMode === 'construction' 
        ? service.constructionScopes[0]?.title || ''
        : service.replacementScopes[0]?.title || ''
    );
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const modePrefix = serviceMode === 'repair' ? 'REP' : (serviceMode === 'replacement' ? 'OVR' : 'CNST');
    const ref = `HS-${modePrefix}-${selectedService.id.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    let baseFee = selectedService.diagFeeNgn;
    let feeLabel = 'Diagnostic Inspection Call-Out Fee';
    
    if (serviceMode === 'replacement') {
      baseFee = selectedService.surveyFeeNgn || 10000;
      feeLabel = 'Full Replacement Site Survey & Measurement Fee';
    } else if (serviceMode === 'construction') {
      baseFee = selectedService.constructionSurveyFeeNgn || 12500;
      feeLabel = 'Building in Progress Site Assessment Fee';
    }

    const costNgn = baseFee + (isEmergency && serviceMode === 'repair' ? 5000 : 0);

    let summaryDetail = selectedConcern;
    if (serviceMode === 'replacement') {
      summaryDetail = selectedScopeTarget || 'Full System Replacement Survey';
    } else if (serviceMode === 'construction') {
      summaryDetail = `Construction Stage: ${constructionStage} | Focus: ${selectedScopeTarget}`;
    }

    if (customConcernNotes) {
      summaryDetail += ` — Notes: ${customConcernNotes}`;
    }

    setConfirmedBooking({
      ref,
      serviceName: selectedService.name,
      serviceMode,
      feeLabel,
      technicianName: 'Engr. Rasheed Balogun',
      technicianTitle: serviceMode === 'construction' 
        ? `Lead Project Site Engineer (${selectedService.name.split(' ')[0]})`
        : `Senior Accredited Master ${selectedService.name.split(' ')[0]}`,
      rating: '4.9 ★ (240+ Verified Jobs)',
      concern: summaryDetail,
      address: address || `${stateName} Site`,
      timeWindow: isEmergency && serviceMode === 'repair' 
        ? '⚡ Emergency Dispatch (Arriving in 45 Minutes)' 
        : preferredDate,
      costNgn,
      costUsd: Math.round(costNgn / 1480)
    });
  };

  const filteredServices = HOME_SERVICES.filter(s => {
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || 
           s.shortDesc.toLowerCase().includes(q) ||
           s.commonConcerns.some(c => c.toLowerCase().includes(q));
  });

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
          onClick={() => {
            if (selectedService) {
              setSelectedService(null);
            } else {
              onBackToHub();
            }
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
          <span>{selectedService ? '← Back to All Services' : '← Back'}</span>
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
          {selectedService ? selectedService.name : 'Home Services & Maintenance'}
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. HERO BANNER
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#070C09',
        color: '#FFFFFF',
        padding: '48px 6% 54px',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: hsService?.heroImage ? `linear-gradient(to right, rgba(7, 12, 9, 0.94) 0%, rgba(7, 12, 9, 0.8) 60%, rgba(7, 12, 9, 0.5) 100%), url(${hsService.heroImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {!hsService?.heroImage && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundImage: 'radial-gradient(circle at right, rgba(210, 125, 45, 0.16) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
        )}

        <div style={{ maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(210, 125, 45, 0.2)', padding: '5px 12px', borderRadius: '4px', marginBottom: '14px', border: `1px solid ${hsService?.badgeColor ? `${hsService.badgeColor}66` : 'rgba(210, 125, 45, 0.35)'}` }}>
            <Wrench size={14} style={{ color: hsService?.badgeColor || 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.74rem', color: hsService?.badgeColor || 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {hsService?.badgeText || "On-Demand Artisan & Engineering Desk"}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.4rem',
            lineHeight: 1.15,
            margin: '0 0 12px',
            fontWeight: 700,
            maxWidth: '850px',
            color: hsService?.textColor || '#FFFFFF'
          }}>
            {hsService?.heroHeadline || "Order Certified Home Services & Trades"}
          </h1>

          <p style={{
            fontSize: '0.94rem',
            color: hsService?.subtitleColor || 'rgba(255, 255, 255, 0.82)',
            maxWidth: '780px',
            lineHeight: 1.6,
            margin: '0 0 24px',
            fontWeight: 300
          }}>
            {hsService?.heroSubtitle || "Order certified plumbers, electricians, AC techs, borehole drillers, solar engineers, painters, and more. Whether you need a quick fault repair, a full system replacement, or specialists for your building in progress."}
          </p>

          {/* Quick Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '650px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            padding: '10px 18px',
            backdropFilter: 'blur(8px)'
          }}>
            <Search size={18} style={{ color: 'var(--accent-gold)' }} />
            <input
              type="text"
              placeholder="Search e.g. 'Burst pipe', 'AC leaking', 'Electrician', 'Borehole', 'CCTV', 'Solar'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3. MAIN CONTENT: DIRECTORY OR DEDICATED CONCERN WORKFLOW
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1150px', margin: '36px auto 0', padding: '0 6%' }}>

        {/* ══════════════════════════════════════════════════════════════════
            VIEW A: BROWSE THE 12 HOME SERVICES CARDS
            ══════════════════════════════════════════════════════════════════ */}
        {!selectedService && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Available Trades
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                  Choose the Service You Need
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#64748B' }}>
                <span>• Fault Repairs</span>
                <span>• Full Overhauls</span>
                <span>• Buildings in Progress</span>
              </div>
            </div>

            {/* Grid of 12 Trades */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '22px'
            }}>
              {filteredServices.map(service => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    onClick={() => handleOpenService(service, 'repair')}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
                    }}
                  >
                    <div>
                      {/* Photo Banner */}
                      <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                        <img
                          src={service.heroImg}
                          alt={service.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: 'rgba(7, 12, 9, 0.85)',
                          backdropFilter: 'blur(6px)',
                          color: '#FFFFFF',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <IconComponent size={13} style={{ color: 'var(--accent-gold)' }} />
                          <span>{service.badge}</span>
                        </div>

                        <span style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          backgroundColor: 'var(--accent-gold)',
                          color: '#070C09',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: 800
                        }}>
                          Call-Out: ₦{service.diagFeeNgn.toLocaleString()}
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '18px 18px 14px' }}>
                        <h3 style={{ margin: '0 0 6px', fontSize: '1.08rem', color: 'var(--accent)', fontWeight: 700 }}>
                          {service.name}
                        </h3>
                        <p style={{ margin: '0 0 12px', fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5 }}>
                          {service.shortDesc}
                        </p>

                        {/* Options Badges */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                          <span style={{ fontSize: '0.68rem', backgroundColor: '#F1F5F9', color: '#334155', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                            🔧 Repair & Diagnostic
                          </span>
                          <span style={{ fontSize: '0.68rem', backgroundColor: '#F1F5F9', color: '#334155', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                            🔄 Full Replacement
                          </span>
                          <span style={{ fontSize: '0.68rem', backgroundColor: 'rgba(210, 125, 45, 0.1)', color: 'var(--accent-gold)', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                            🏗️ Building in Progress
                          </span>
                        </div>

                        {/* Top Common Concerns Tag */}
                        <div style={{
                          backgroundColor: '#FAF9F6',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          padding: '8px 10px',
                          fontSize: '0.72rem',
                          color: '#475569'
                        }}>
                          <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '2px' }}>Common Concerns:</strong>
                          <span>• {service.commonConcerns[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      padding: '12px 18px',
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#FCFCFB'
                    }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--accent)', fontWeight: 700 }}>
                        Select & Detail Your Concern
                      </span>
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            VIEW B: THE SERVICE OPENS WITH HOUSE DETAILS & CONCERN SELECTOR!
            ══════════════════════════════════════════════════════════════════ */}
        {selectedService && (
          <div>
            {/* Header for Selected Trade */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              padding: '24px 28px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    backgroundColor: 'rgba(210, 125, 45, 0.12)',
                    color: 'var(--accent-gold)',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {selectedService.badge}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: '#10B981', fontWeight: 700 }}>
                    ● Certified Crew Available
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--accent)', margin: '2px 0 4px' }}>
                  Request {selectedService.name}
                </h2>
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748B' }}>
                  Tell us about your property and requirements. We send an accredited professional to inspect the site and provide exact rates.
                </p>
              </div>

              <button
                onClick={() => setSelectedService(null)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#FFFFFF',
                  color: 'var(--text-title)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Change Trade
              </button>
            </div>

            {/* Interactive Form Stage */}
            <form onSubmit={handleBookingSubmit} style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '2px solid rgba(26, 62, 38, 0.15)',
              padding: '32px',
              boxShadow: '0 12px 35px rgba(0,0,0,0.05)',
              marginBottom: '36px'
            }}>
              
              {/* ═════════════════════════════════════════════════════════════
                  STEP 1: SELECT SERVICE INTENT / CATEGORY
                  ═════════════════════════════════════════════════════════════ */}
              <div style={{ marginBottom: '32px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Step 1: What is the Nature of this Request?
                </span>
                <h3 style={{ margin: '2px 0 14px', fontSize: '1.25rem', color: 'var(--accent)', fontWeight: 700 }}>
                  Choose Your Service Requirement:
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  
                  {/* Mode 1: Fault Repair & Diagnosis */}
                  <div
                    onClick={() => {
                      setServiceMode('repair');
                      
                    }}
                    style={{
                      borderRadius: '8px',
                      border: serviceMode === 'repair' ? '2px solid var(--accent-gold)' : '1px solid var(--border)',
                      backgroundColor: serviceMode === 'repair' ? '#FAF9F6' : '#FFFFFF',
                      padding: '18px',
                      cursor: 'pointer',
                      boxShadow: serviceMode === 'repair' ? '0 6px 20px rgba(210, 125, 45, 0.14)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        backgroundColor: serviceMode === 'repair' ? 'var(--accent-gold)' : '#F1F5F9',
                        color: serviceMode === 'repair' ? '#070C09' : '#475569',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        textTransform: 'uppercase'
                      }}>
                        🔧 Fault Repair
                      </span>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent)' }}>
                        ₦{selectedService.diagFeeNgn.toLocaleString()} <span style={{ fontSize: '0.72rem', fontWeight: 500, color: '#64748B' }}>Call-Out</span>
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', color: 'var(--accent)', fontWeight: 700 }}>
                      Send Someone to See the Problem & Give Invoice
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5 }}>
                      For an existing home where a pipe burst, breaker trips, AC isn't cooling, or pests appear. 
                      An artisan visits to inspect the problem and issues an on-site labor & materials invoice.
                    </p>
                  </div>

                  {/* Mode 2: Full Replacement / System Overhaul */}
                  <div
                    onClick={() => {
                      setServiceMode('replacement');
                      
                    }}
                    style={{
                      borderRadius: '8px',
                      border: serviceMode === 'replacement' ? '2px solid var(--accent)' : '1px solid var(--border)',
                      backgroundColor: serviceMode === 'replacement' ? '#FAF9F6' : '#FFFFFF',
                      padding: '18px',
                      cursor: 'pointer',
                      boxShadow: serviceMode === 'replacement' ? '0 6px 20px rgba(26, 62, 38, 0.14)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        backgroundColor: serviceMode === 'replacement' ? 'var(--accent)' : '#F1F5F9',
                        color: serviceMode === 'replacement' ? '#FFFFFF' : '#475569',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        textTransform: 'uppercase'
                      }}>
                        🔄 Full Replacement
                      </span>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent)' }}>
                        ₦{(selectedService.surveyFeeNgn || 10000).toLocaleString()} <span style={{ fontSize: '0.72rem', fontWeight: 500, color: '#64748B' }}>Survey Fee</span>
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', color: 'var(--accent)', fontWeight: 700 }}>
                      Site Survey for Complete Replacement / Overhaul
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5 }}>
                      Not a minor repair. An engineer comes to inspect, take accurate measurements (conduit routes, pipe lengths, surface areas), and gives an official quote after surveying.
                    </p>
                  </div>

                  {/* Mode 3: Building in Progress (NEW!) */}
                  <div
                    onClick={() => {
                      setServiceMode('construction');
                      
                    }}
                    style={{
                      borderRadius: '8px',
                      border: serviceMode === 'construction' ? '2px solid #D97706' : '1px solid var(--border)',
                      backgroundColor: serviceMode === 'construction' ? '#FFFBEB' : '#FFFFFF',
                      padding: '18px',
                      cursor: 'pointer',
                      boxShadow: serviceMode === 'construction' ? '0 6px 20px rgba(217, 119, 6, 0.15)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{
                        backgroundColor: '#D97706',
                        color: '#FFFFFF',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        textTransform: 'uppercase'
                      }}>
                        🏗️ Building in Progress
                      </span>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#B45309' }}>
                        ₦{(selectedService.constructionSurveyFeeNgn || 12500).toLocaleString()} <span style={{ fontSize: '0.72rem', fontWeight: 500, color: '#64748B' }}>Site Survey</span>
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 6px', fontSize: '0.98rem', color: '#92400E', fontWeight: 700 }}>
                      Send Someone for Ongoing Construction Site
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5 }}>
                      For houses or projects currently being built. We send a master artisan or project engineer over to survey the building carcass and drawings, then provide stage rates.
                    </p>
                  </div>
                </div>
              </div>

              {/* (Property type removed: not needed since on-site survey and physical assessment will be done) */}

              {/* ═════════════════════════════════════════════════════════════
                  STEP 3: CONCERNS, PROBLEMS OR SURVEY SCOPES
                  ═════════════════════════════════════════════════════════════ */}
              <div style={{ marginBottom: '28px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Step 2: What Do You Need Done?
                </span>

                {/* SUB-VIEW 1: REPAIR MODE (Select problem with "Others") */}
                {serviceMode === 'repair' && (
                  <div>
                    <h3 style={{ margin: '2px 0 8px', fontSize: '1.2rem', color: 'var(--accent)', fontWeight: 700 }}>
                      What Problem Are You Experiencing?
                    </h3>
                    <p style={{ margin: '0 0 14px', fontSize: '0.78rem', color: '#64748B' }}>
                      Select a problem from the list or choose <strong>"Others"</strong> to describe your exact concern:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      {selectedService.commonConcerns.map((concern, idx) => {
                        const isSelected = selectedConcern === concern;
                        const isOther = concern.startsWith('Others');
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedConcern(concern)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '10px 14px',
                              borderRadius: '6px',
                              border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                              backgroundColor: isSelected ? '#FAF9F6' : '#FFFFFF',
                              cursor: 'pointer',
                              fontSize: '0.82rem',
                              color: isSelected ? 'var(--accent)' : (isOther ? '#B45309' : '#334155'),
                              fontWeight: isSelected ? 700 : (isOther ? 600 : 500)
                            }}
                          >
                            <div style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              border: isSelected ? '5px solid var(--accent)' : '2px solid #CBD5E1',
                              backgroundColor: '#FFFFFF',
                              flexShrink: 0
                            }} />
                            <span>{concern}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                        {selectedConcern.startsWith('Others') ? 'Describe Your Problem in Detail (Required):' : 'Additional Notes / Problem Description (Optional):'}
                      </label>
                      <textarea
                        rows={3}
                        required={selectedConcern.startsWith('Others')}
                        placeholder={selectedConcern.startsWith('Others') ? 'Please describe exactly what is happening in the house, where the issue is, when it started, etc...' : 'e.g. Started leaking yesterday morning, pipe is behind the guest toilet tiles...'}
                        value={customConcernNotes}
                        onChange={(e) => setCustomConcernNotes(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '4px',
                          border: selectedConcern.startsWith('Others') ? '2px solid var(--accent-gold)' : '1px solid var(--border)',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-sans)',
                          backgroundColor: selectedConcern.startsWith('Others') ? '#FFFDF8' : '#FFFFFF'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* SUB-VIEW 2: FULL REPLACEMENT MODE (Site Survey Target, NO blind fixed price) */}
                {serviceMode === 'replacement' && (
                  <div>
                    <h3 style={{ margin: '2px 0 8px', fontSize: '1.2rem', color: 'var(--accent)', fontWeight: 700 }}>
                      What System Are You Looking to Completely Replace?
                    </h3>
                    <p style={{ margin: '0 0 14px', fontSize: '0.78rem', color: '#64748B' }}>
                      An engineer visits to survey your property, take measurements, and prepare a customized itemized quote. Select your replacement target:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                      {selectedService.replacementScopes.map((scope, idx) => {
                        const isSelected = selectedScopeTarget === scope.title;
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedScopeTarget(scope.title)}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '6px',
                              border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                              backgroundColor: isSelected ? '#FAF9F6' : '#FFFFFF',
                              cursor: 'pointer'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                border: isSelected ? '5px solid var(--accent)' : '2px solid #CBD5E1',
                                backgroundColor: '#FFFFFF',
                                flexShrink: 0
                              }} />
                              <strong style={{ fontSize: '0.88rem', color: isSelected ? 'var(--accent)' : '#1E293B' }}>
                                {scope.title}
                              </strong>
                            </div>
                            <span style={{ fontSize: '0.76rem', color: '#64748B', paddingLeft: '24px', display: 'block' }}>
                              {scope.desc}
                            </span>
                          </div>
                        );
                      })}

                      {/* Others Option for Replacement */}
                      <div
                        onClick={() => setSelectedScopeTarget('Other Custom Full Overhaul Scope')}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '6px',
                          border: selectedScopeTarget === 'Other Custom Full Overhaul Scope' ? '2px solid var(--accent)' : '1px solid var(--border)',
                          backgroundColor: selectedScopeTarget === 'Other Custom Full Overhaul Scope' ? '#FAF9F6' : '#FFFFFF',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: selectedScopeTarget === 'Other Custom Full Overhaul Scope' ? '5px solid var(--accent)' : '2px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            flexShrink: 0
                          }} />
                          <strong style={{ fontSize: '0.86rem', color: '#B45309' }}>
                            Others (Custom Full Replacement / Renovation Project)
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '12px 16px', marginBottom: '14px' }}>
                      <span style={{ fontSize: '0.74rem', color: '#334155', fontWeight: 600 }}>
                        💡 <strong>Transparent Pricing Guarantee:</strong> Full replacements vary significantly based on house layout and material grade. Our surveyor will inspect on-site and present you with brand options and exact labor rates.
                      </span>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                        Replacement Details & Specific Preferences:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. We want to convert all old galvanized pipes to hot/cold PPR and replace all 4 master bathroom showers..."
                        value={customConcernNotes}
                        onChange={(e) => setCustomConcernNotes(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'var(--font-sans)' }}
                      />
                    </div>
                  </div>
                )}

                {/* SUB-VIEW 3: BUILDING IN PROGRESS MODE (Site Survey for Ongoing Construction) */}
                {serviceMode === 'construction' && (
                  <div>
                    <h3 style={{ margin: '2px 0 8px', fontSize: '1.2rem', color: '#92400E', fontWeight: 700 }}>
                      What Trade Work Does Your Construction Site Require?
                    </h3>
                    <p style={{ margin: '0 0 14px', fontSize: '0.78rem', color: '#64748B' }}>
                      We dispatch a master technician or licensed MEP engineer to your ongoing construction site. After assessing physical structure and building plans, they give full project rates:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                      {selectedService.constructionScopes.map((scope, idx) => {
                        const isSelected = selectedScopeTarget === scope.title;
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedScopeTarget(scope.title)}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '6px',
                              border: isSelected ? '2px solid #D97706' : '1px solid var(--border)',
                              backgroundColor: isSelected ? '#FFFBEB' : '#FFFFFF',
                              cursor: 'pointer'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                border: isSelected ? '5px solid #D97706' : '2px solid #CBD5E1',
                                backgroundColor: '#FFFFFF',
                                flexShrink: 0
                              }} />
                              <strong style={{ fontSize: '0.88rem', color: isSelected ? '#92400E' : '#1E293B' }}>
                                {scope.title}
                              </strong>
                            </div>
                            <span style={{ fontSize: '0.76rem', color: '#64748B', paddingLeft: '24px', display: 'block' }}>
                              {scope.desc}
                            </span>
                          </div>
                        );
                      })}

                      {/* Others Option for Construction */}
                      <div
                        onClick={() => setSelectedScopeTarget('Other Construction Site Requirement')}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '6px',
                          border: selectedScopeTarget === 'Other Construction Site Requirement' ? '2px solid #D97706' : '1px solid var(--border)',
                          backgroundColor: selectedScopeTarget === 'Other Construction Site Requirement' ? '#FFFBEB' : '#FFFFFF',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: selectedScopeTarget === 'Other Construction Site Requirement' ? '5px solid #D97706' : '2px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            flexShrink: 0
                          }} />
                          <strong style={{ fontSize: '0.86rem', color: '#B45309' }}>
                            Others (Specialist Construction Trade Requirement)
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                        Site Specifics / Architectural Notes:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Carcass is roofed, architectural and MEP drawings available on site. We need complete 1st fix and decking conduit piping..."
                        value={customConcernNotes}
                        onChange={(e) => setCustomConcernNotes(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'var(--font-sans)' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ═════════════════════════════════════════════════════════════
                  STEP 4: ADDRESS, CONTACT & ARRIVAL TIME
                  ═════════════════════════════════════════════════════════════ */}
              <div style={{ marginBottom: '28px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Step 3: Location & Arrival Schedule
                </span>
                <h3 style={{ margin: '2px 0 14px', fontSize: '1.2rem', color: 'var(--accent)', fontWeight: 700 }}>
                  Where and When Should We Send the Professional?
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      State / Region *
                    </label>
                    <select
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      style={{ width: '100%', padding: '9px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                    >
                      <option>Lagos State</option>
                      <option>Abuja FCT</option>
                      <option>Ogun State</option>
                      <option>Oyo State (Ibadan)</option>
                      <option>Rivers State (Port Harcourt)</option>
                      <option>Edo State (Benin)</option>
                      <option>Delta State (Asaba / Warri)</option>
                      <option>Enugu State</option>
                      <option>Kaduna State</option>
                      <option>Kano State</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Olumide Adeleke"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Active Phone Number (WhatsApp / Calls) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Preferred Arrival Window:
                    </label>
                    <select
                      value={preferredDate}
                      onChange={e => setPreferredDate(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    >
                      <option>Today Afternoon (2:00 PM - 5:00 PM)</option>
                      <option>Tomorrow Morning (9:00 AM - 12:00 PM)</option>
                      <option>Tomorrow Afternoon (1:00 PM - 4:00 PM)</option>
                      <option>This Weekend (Saturday Morning 10:00 AM)</option>
                      <option>Custom Date (Discuss via Phone)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Street Address / Estate Name / Landmark: *
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 4B, Richmond Gate Estate 2, Meadow Hall Way, Ikate Lekki"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      style={{ flex: 1, padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setAddress('Richmond Gate Estate 2, Ikate Lekki, Lagos (GPS Verified)')}
                      style={{
                        padding: '0 14px',
                        borderRadius: '4px',
                        border: '1px solid var(--accent)',
                        backgroundColor: '#FAF9F6',
                        color: 'var(--accent)',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <MapPin size={13} />
                      Use GPS
                    </button>
                  </div>
                </div>

                {/* Emergency Dispatch Option (For Repairs) */}
                {serviceMode === 'repair' && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: isEmergency ? 'rgba(239, 68, 68, 0.08)' : '#FAF9F6',
                    border: isEmergency ? '1px solid #EF4444' : '1px solid var(--border)',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }} onClick={() => setIsEmergency(!isEmergency)}>
                    <input
                      type="checkbox"
                      checked={isEmergency}
                      onChange={() => {}}
                      style={{ width: '16px', height: '16px', accentColor: '#EF4444' }}
                    />
                    <div>
                      <strong style={{ fontSize: '0.82rem', color: isEmergency ? '#B91C1C' : '#1E293B', display: 'block' }}>
                        ⚡ Emergency Rapid Dispatch (+₦5,000 Surcharge)
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Tick this for active water burst flooding, sparks, or urgent breakdown. Nearest artisan dispatched within 45 mins.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* ═════════════════════════════════════════════════════════════
                  SUBMIT ACTION & PRICE TRANSPARENCY
                  ═════════════════════════════════════════════════════════════ */}
              <div style={{
                backgroundColor: '#FAF9F6',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>
                    {serviceMode === 'repair' 
                      ? 'Diagnostic Inspection Call-Out Fee:' 
                      : (serviceMode === 'replacement' ? 'Comprehensive Site Survey & Measurement Fee:' : 'Building in Progress Site Assessment Fee:')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)' }}>
                      ₦{((serviceMode === 'repair' ? selectedService.diagFeeNgn : (serviceMode === 'replacement' ? (selectedService.surveyFeeNgn || 10000) : (selectedService.constructionSurveyFeeNgn || 12500))) + (isEmergency && serviceMode === 'repair' ? 5000 : 0)).toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.84rem', color: '#64748B', fontWeight: 600 }}>
                      (~${Math.round(((serviceMode === 'repair' ? selectedService.diagFeeNgn : (serviceMode === 'replacement' ? (selectedService.surveyFeeNgn || 10000) : (selectedService.constructionSurveyFeeNgn || 12500))) + (isEmergency && serviceMode === 'repair' ? 5000 : 0)) / 1480)})
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                    ✓ Vetted artisan arrives with ID • Survey fee credited to project if approved
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    style={{
                      padding: '12px 20px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                      backgroundColor: '#FFFFFF',
                      color: 'var(--text-title)',
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
                      padding: '12px 28px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: 'var(--accent)',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(26,62,38,0.2)'
                    }}
                  >
                    <CheckCircle size={16} style={{ color: 'var(--accent-gold)' }} />
                    <span>Confirm & Dispatch Professional</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            CONFIRMATION DISPATCH PASS MODAL
            ══════════════════════════════════════════════════════════════════ */}
        {confirmedBooking && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(7, 12, 9, 0.85)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '540px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              {/* Modal Header */}
              <div style={{
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                padding: '24px 28px',
                position: 'relative'
              }}>
                <button
                  onClick={() => setConfirmedBooking(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {confirmedBooking.serviceMode === 'repair' 
                      ? 'Diagnostic Dispatch Pass' 
                      : (confirmedBooking.serviceMode === 'replacement' ? 'Full Replacement Site Survey Pass' : 'Building in Progress Site Assessment Pass')}
                  </span>
                </div>

                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  Order Confirmed: {confirmedBooking.serviceName}
                </h3>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.75)', display: 'block', marginTop: '4px' }}>
                  Booking Reference: <strong style={{ color: '#FFFFFF' }}>{confirmedBooking.ref}</strong>
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '24px 28px' }}>
                {/* Artisan Profile Card */}
                <div style={{
                  backgroundColor: '#FAF9F6',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  marginBottom: '18px'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    RB
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '0.92rem', color: '#1E293B' }}>{confirmedBooking.technicianName}</strong>
                      <span style={{ fontSize: '0.68rem', backgroundColor: '#DCFCE7', color: '#15803D', padding: '1px 6px', borderRadius: '3px', fontWeight: 700 }}>
                        ✓ Vetted
                      </span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#64748B', display: 'block' }}>{confirmedBooking.technicianTitle}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700 }}>{confirmedBooking.rating}</span>
                  </div>
                </div>

                {/* Details Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: '#334155', marginBottom: '20px' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Requirement:</span>
                    <strong style={{ textAlign: 'right', maxWidth: '300px' }}>{confirmedBooking.concern}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Site Address:</span>
                    <strong style={{ textAlign: 'right', maxWidth: '300px' }}>{confirmedBooking.address}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Arrival Window:</span>
                    <strong style={{ color: 'var(--accent)' }}>{confirmedBooking.timeWindow}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: '#64748B', fontWeight: 700 }}>{confirmedBooking.feeLabel}:</span>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--accent)' }}>
                      ₦{confirmedBooking.costNgn.toLocaleString()} (${confirmedBooking.costUsd})
                    </strong>
                  </div>
                </div>

                {/* What Happens Next Box */}
                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    What Happens Next?
                  </span>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#14532D', lineHeight: 1.45 }}>
                    {confirmedBooking.serviceMode === 'repair' 
                      ? 'The technician will call your phone before departing, inspect the fault on-site with testing instruments, and issue an itemized repair invoice.'
                      : (confirmedBooking.serviceMode === 'replacement'
                        ? 'The engineer will arrive to take exact physical measurements, audit conduit paths, and present an official replacement quotation.'
                        : 'Our construction site engineer will inspect your ongoing building, review structural/MEP plans, and submit formal milestone project rates.')}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                      setSelectedService(null);
                    }}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--accent)',
                      color: '#FFFFFF',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Done (Back to Home Services)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
