import React, { useState } from 'react';
import { 
  Truck, Package, Boxes, Warehouse, ClipboardCheck, Zap, 
  Check, CheckCircle2, MapPin, Calendar, ShieldCheck, 
  ArrowLeft, ChevronRight, Info, Phone, User, Clock, 
  Plus, Trash2, HelpCircle, Activity, Wifi, Droplets, 
  Tv, Search, Award, FileText, X, AlertTriangle, CheckSquare,
  Square, Shield, Navigation, Key, Sparkles, RefreshCw
} from 'lucide-react';
import { getStoredServices } from '../utils/userStorage';

// ══════════════════════════════════════════════════════════════════════
// 1. DATA: TRUCK FLEET & ROUTES
// ══════════════════════════════════════════════════════════════════════
const FLEET_TYPES = [
  {
    id: 'truck-1.5t',
    name: '1.5-Ton Covered Van / Hiace',
    tag: 'Studio & 1-Bed Flat',
    capacity: 'Up to 35 Boxes & Small Furniture',
    payload: '1,500 KG Payload',
    dimensions: '3.0m L x 1.7m W x 1.8m H',
    basePriceNGN: 65000,
    basePriceUSD: 42,
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    features: ['Weather-sealed cargo box', 'GPS real-time tracking link', '1 Driver + 1 Porter included']
  },
  {
    id: 'truck-3t',
    name: '3-Ton Medium Covered Canter',
    tag: '2 to 3-Bed Apartment',
    popular: true,
    capacity: 'Sofa sets, 6-seater dining, 2 beds & appliances',
    payload: '3,000 KG Payload',
    dimensions: '4.5m L x 2.1m W x 2.2m H',
    basePriceNGN: 110000,
    basePriceUSD: 72,
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
    features: ['Hydraulic tail-lift for heavy items', 'Heavy-duty cargo straps', '1 Driver + 2 Porters included']
  },
  {
    id: 'truck-5t',
    name: '5-Ton Heavy-Duty Enclosed Box Truck',
    tag: '3 to 4-Bed Duplex',
    capacity: 'Complete 4-bedroom house contents & garden items',
    payload: '5,000 KG Payload',
    dimensions: '6.2m L x 2.3m W x 2.4m H',
    basePriceNGN: 185000,
    basePriceUSD: 120,
    img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=80',
    features: ['Padded interior walls', 'Goods-in-Transit Insurance policy', '1 Driver + 4 Porters included']
  },
  {
    id: 'truck-10t',
    name: '10-Ton / 30-Ton Interstate Haulage Container',
    tag: 'Whole Villa / Corporate Office',
    capacity: 'Full 5-bed mansion, 2 cars, or 30-person office setup',
    payload: '10,000 - 30,000 KG Payload',
    dimensions: '20ft / 40ft High-Cube Shipping Container',
    basePriceNGN: 380000,
    basePriceUSD: 245,
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
    features: ['Military-grade container seals', 'Interstate escort & security tracking', 'Dedicated logistics coordinator']
  }
];

const ROUTE_PRESETS = [
  { id: 'within-lagos-island', label: 'Within Lagos (Island ⇄ Mainland)', multiplier: 1.0, estTime: '2 - 4 Hours' },
  { id: 'within-abuja', label: 'Within Abuja (City Centre ⇄ Suburbs)', multiplier: 0.9, estTime: '1 - 3 Hours' },
  { id: 'lagos-ibadan', label: 'Lagos ⇄ Ibadan Corridor', multiplier: 1.6, estTime: '4 - 6 Hours' },
  { id: 'lagos-abuja', label: 'Lagos ⇄ Abuja Interstate (VIP Haulage)', multiplier: 3.8, estTime: '24 - 36 Hours' },
  { id: 'lagos-ph', label: 'Lagos ⇄ Port Harcourt / Asaba Corridor', multiplier: 4.2, estTime: '24 - 48 Hours' }
];

// ══════════════════════════════════════════════════════════════════════
// 2. DATA: PACKING SERVICES & MATERIALS
// ══════════════════════════════════════════════════════════════════════
const PACKING_TIERS = [
  {
    id: 'pack-diy',
    name: 'Self-Pack Heavy-Duty Material Kit',
    tag: 'Materials Delivered to Your Door',
    priceNGN: 45000,
    priceUSD: 30,
    desc: 'Everything you need to pack safely yourself. Delivered 48h before move day.',
    items: [
      '20 Double-Wall Corrugated Boxes (S, M, L)',
      '2 Heavy-Duty Wardrobe Boxes with Hanging Bars',
      '100-Meter Industrial Bubble Wrap Roll',
      '4 Heavy-Duty Packing Tape Rolls + Dispenser Gun',
      '1 Pack of Fragile Room Identification Stickers'
    ]
  },
  {
    id: 'pack-fragile',
    name: 'Fragile-Only White-Glove Packing',
    tag: 'Delicate Items, TVs & Glassware',
    popular: true,
    priceNGN: 85000,
    priceUSD: 55,
    desc: 'Expert packing crew handles all delicate, high-value, and breakable possessions.',
    items: [
      'Custom wooden crating for large OLED TVs (up to 85")',
      'Foam-lined partition boxes for crystal & wine cellars',
      'Shockproof corner protectors for marble dining & glass tables',
      'Acid-free archival tissue wrapping for framed art & mirrors',
      'Zero-Breakage replacement insurance warranty'
    ]
  },
  {
    id: 'pack-turnkey',
    name: 'Full VIP Turnkey Packing & Unpacking',
    tag: '100% Hands-Off Total Service',
    priceNGN: 175000,
    priceUSD: 115,
    desc: 'Our uniformed team packs your entire home, labels every room, loads, unloads, and reassembles furniture.',
    items: [
      'Complete packing of every room, cupboard, and kitchen pantry',
      'Clothes transferred directly into hanging wardrobe boxes without folding',
      'Hygienic anti-dust wrap for mattresses, sofas, and headboards',
      'Dismantling and reassembly of bed frames and dining tables',
      'Complete box unpacking and removal of all empty cartons/debris'
    ]
  }
];

// ══════════════════════════════════════════════════════════════════════
// 3. DATA: STORAGE UNITS (LAGOS & ABUJA)
// ══════════════════════════════════════════════════════════════════════
const STORAGE_UNITS = [
  {
    id: 'unit-small',
    size: '5 SQM (Lockbox Bay)',
    capacity: 'Holds up to 40 boxes, suitcases, seasonal decor & personal electronics',
    dimensions: '2.2m L x 2.3m W x 2.4m H',
    monthlyPriceNGN: 45000,
    monthlyPriceUSD: 30,
    tag: 'Boxes & Luggage',
    ideal: 'Renovation storage, students, travel safekeeping'
  },
  {
    id: 'unit-med',
    size: '15 SQM (Standard Room Unit)',
    capacity: 'Full contents of a 2 to 3-bedroom apartment (sofas, beds, fridge, dining)',
    dimensions: '4.5m L x 3.3m W x 2.8m H',
    monthlyPriceNGN: 95000,
    monthlyPriceUSD: 65,
    popular: true,
    tag: '2-3 Bed Apartment',
    ideal: 'Diaspora temporary storage, in-between lease gap'
  },
  {
    id: 'unit-large',
    size: '35 SQM (Executive Warehouse Vault)',
    capacity: 'Complete 4 to 5-bedroom duplex, luxury furniture, or commercial office stock',
    dimensions: '7.0m L x 5.0m W x 3.2m H',
    monthlyPriceNGN: 180000,
    monthlyPriceUSD: 120,
    tag: 'Full Mansion / Commercial',
    ideal: 'Long-term corporate storage, whole home relocation'
  }
];

// ══════════════════════════════════════════════════════════════════════
// 4. DATA: RELOCATION CONCIERGE ASSISTANCE
// ══════════════════════════════════════════════════════════════════════
const RELOCATION_SERVICES = [
  {
    id: 'relo-cleaning',
    title: 'Pre-Move Deep Cleaning & Hospital-Grade Fumigation',
    desc: 'Thorough sanitization of floors, kitchen grease-traps, bathroom descaling, and odor-free pest eradication before your furniture enters.',
    priceNGN: '₦45,000 – ₦85,000',
    turnaround: '1 Day Before Move'
  },
  {
    id: 'relo-artisan',
    title: 'Certified Artisan Decommission & Remounting',
    desc: 'Qualified technicians safely unmount and re-install split-unit air conditioners (with gas top-up), DSTV dish, solar inverters, and generator switchover.',
    priceNGN: '₦35,000 / Appliance Cluster',
    turnaround: 'Move-Day Synchronized'
  },
  {
    id: 'relo-gatepass',
    title: 'Estate Security Gate Pass & Clearance Concierge',
    desc: 'We interface directly with your outgoing and incoming estate facility managers (e.g. Lekki, Ikoyi, Victoria Garden City, Guzape) to secure move-in permits and prevent gate impoundment.',
    priceNGN: 'Included with Truck Booking',
    turnaround: '48h Prior to Arrival'
  },
  {
    id: 'relo-neighborhood',
    title: 'Neighborhood Orientation & School District Dossier',
    desc: 'Detailed relocation briefing pack: nearest certified clinics, 24/7 pharmacies, reliable fuel/gas stations, estate security contacts, and top private schools.',
    priceNGN: '100% Free Relocation Dossier',
    turnaround: 'Instant Digital PDF'
  }
];

// ══════════════════════════════════════════════════════════════════════
// 5. DATA: INTERACTIVE MOVE CHECKLIST (STEP-BY-STEP)
// ══════════════════════════════════════════════════════════════════════
const INITIAL_CHECKLIST = [
  { id: 'chk-1', phase: '4 Weeks Before Move', text: 'Sort belongings, sell or donate unused items, and take inventory of high-value assets.', checked: true },
  { id: 'chk-2', phase: '4 Weeks Before Move', text: 'Book your relocation truck and confirm preferred moving date on UMOJA.', checked: true },
  { id: 'chk-3', phase: '4 Weeks Before Move', text: 'Notify current landlord and review lease termination / security deposit refund terms.', checked: false },
  { id: 'chk-4', phase: '2 Weeks Before Move', text: 'Order moving boxes and start packing non-essential books, winter clothes, and decor.', checked: false },
  { id: 'chk-5', phase: '2 Weeks Before Move', text: 'Schedule pre-move deep cleaning and pest fumigation at the new house.', checked: false },
  { id: 'chk-6', phase: '2 Weeks Before Move', text: 'Book AC technician and solar engineer to inspect decommissioning requirements.', checked: false },
  { id: 'chk-7', phase: '1 Week Before Move', text: 'Request outgoing and incoming estate security gate passes to avoid move-day gate delays.', checked: false },
  { id: 'chk-8', phase: '1 Week Before Move', text: 'Empty and defrost refrigerator and deep freezer 24 hours before loading.', checked: false },
  { id: 'chk-9', phase: 'Move Day', text: 'Pack an "Essentials Box" with toiletries, chargers, bedsheets, medication, and keys.', checked: false },
  { id: 'chk-10', phase: 'Move Day', text: 'Inspect truck lock seal, verify Goods-in-Transit insurance slip, and track truck via GPS.', checked: false },
  { id: 'chk-11', phase: 'Post-Move / Day 1', text: 'Take water and electricity meter readings and verify prepaid meter token balance.', checked: false }
];

// ══════════════════════════════════════════════════════════════════════
// 6. DATA: UTILITY TRANSFER CONCIERGE
// ══════════════════════════════════════════════════════════════════════
const UTILITY_SERVICES = [
  {
    id: 'util-disco',
    name: 'Prepaid Electricity (DisCo) Account Transition',
    provider: 'EKEDC / IKEDC / AEDC / IBEDC',
    desc: 'Audit old meter for unbilled legacy debts, deregister account, and link your NIN to activate the prepaid smart meter at your new address.',
    icon: Zap,
    color: '#F59E0B'
  },
  {
    id: 'util-internet',
    name: 'Fixed Fiber Internet & Starlink Relocation',
    provider: 'Starlink / FibreOne / ipNX / Spectranet / MTN 5G',
    desc: 'Transfer your active high-speed fiber line without cancellation penalties, re-route optical cabling, or remount your Starlink dish with roof brackets.',
    icon: Wifi,
    color: '#38BDF8'
  },
  {
    id: 'util-water-waste',
    name: 'Estate Water Supply & PSP Waste Management',
    provider: 'Lagos LAWMA / PSP & Abuja AEPB',
    desc: 'Enroll your new home with accredited local waste disposal operators, acquire new bins, and verify private estate water booster pump pressure.',
    icon: Droplets,
    color: '#10B981'
  },
  {
    id: 'util-solar',
    name: 'Solar Inverter & Lithium Battery Safe Reconnection',
    provider: 'Certified Renewable Energy Team',
    desc: 'High-voltage inverter safety shutdown, careful battery transportation, roof solar panel unbolting, and seamless reconnection at your new home.',
    icon: Activity,
    color: '#8B5CF6'
  }
];

export default function MovingRelocationHub({ onBackToHub, customService }) {
  const storedServices = getStoredServices();
  const movService = customService || (storedServices.find(s => s.id === 'moving-services' || s.id === 'relocation') || {});
  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState('truck-booking');

  // 1. Truck Booking State
  const [selectedFleetId, setSelectedFleetId] = useState('truck-3t');
  const [selectedRouteId, setSelectedRouteId] = useState('within-lagos-island');
  const [extraPorters, setExtraPorters] = useState(2);

  const selectedFleet = FLEET_TYPES.find(f => f.id === selectedFleetId) || FLEET_TYPES[1];
  const selectedRoute = ROUTE_PRESETS.find(r => r.id === selectedRouteId) || ROUTE_PRESETS[0];

  const calculatedTruckPriceNGN = Math.round((selectedFleet.basePriceNGN * selectedRoute.multiplier) + (extraPorters * 10000));
  const calculatedTruckPriceUSD = Math.round(calculatedTruckPriceNGN / 1550);

  // 2. Storage Units State
  const [selectedStorageId, setSelectedStorageId] = useState('unit-med');
  const [storageMonths, setStorageMonths] = useState(3);
  const selectedStorage = STORAGE_UNITS.find(u => u.id === selectedStorageId) || STORAGE_UNITS[1];

  const discountRate = storageMonths >= 6 ? 0.85 : (storageMonths >= 3 ? 0.90 : 1.0);
  const totalStoragePriceNGN = Math.round(selectedStorage.monthlyPriceNGN * storageMonths * discountRate);

  // 3. Move Checklist State
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  const toggleChecklist = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const completedCount = checklist.filter(c => c.checked).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  // 4. Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState('Truck & Move Booking');
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pickupAddress: 'Block 12, Admiralty Way, Lekki Phase 1, Lagos',
    dropoffAddress: 'Plot 4, Guzape Diplomatic Zone, Abuja',
    preferredDate: '',
    notes: ''
  });
  const [bookingPass, setBookingPass] = useState(null);

  const openBookingModal = (type) => {
    setBookingType(type);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const trackingCode = 'MOV-UMOJA-' + Math.floor(100000 + Math.random() * 900000);
    setBookingPass({
      trackingCode,
      serviceType: bookingType,
      clientName: bookingFormData.name || 'Valued Relocator',
      pickup: bookingFormData.pickupAddress,
      dropoff: bookingFormData.dropoffAddress,
      truck: selectedFleet.name,
      route: selectedRoute.label,
      date: bookingFormData.preferredDate || 'Within 48 Hours',
      estPrice: `₦${calculatedTruckPriceNGN.toLocaleString()} (~$${calculatedTruckPriceUSD})`,
      leadDriver: 'Alhaji Musa Danladi (Licence No. LAG-901844)',
      assignedDispatcher: 'Engr. Kenneth Adeleke (Logistics Operations Lead)'
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-main, #0F172A)',
      color: 'var(--text-main, #F8FAFC)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: '100px'
    }}>
      {/* ══════════════════════════════════════════════════════════════════
          TOP NAVIGATION BAR
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        background: '#0F172A',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '14px 6%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}>
        <button
          onClick={onBackToHub}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#F59E0B',
            fontSize: '0.85rem',
            fontWeight: 700,
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
          color: '#FFFFFF',
          letterSpacing: '0.02em',
          textAlign: 'right'
        }}>
          Moving, Relocation &amp; Logistics Hub
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO BANNER & VALUE PROPOSITION
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1280px',
        margin: '24px auto 0',
        padding: '0 4%'
      }}>
        <div style={{
          background: movService?.heroImage 
            ? `linear-gradient(180deg, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.96)), url(${movService.heroImage})`
            : 'radial-gradient(ellipse at top right, rgba(217, 119, 6, 0.18), rgba(15, 23, 42, 0.8) 70%), linear-gradient(180deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          border: `1px solid ${movService?.badgeColor ? `${movService.badgeColor}40` : 'rgba(217, 119, 6, 0.25)'}`,
          padding: '36px 32px',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(217, 119, 6, 0.15)',
              border: `1px solid ${movService?.badgeColor ? `${movService.badgeColor}66` : 'rgba(217, 119, 6, 0.3)'}`,
              color: movService?.badgeColor || '#FBBF24',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <ShieldCheck size={14} /> {movService?.badgeText || "Goods-in-Transit Insured Relocation Fleet"}
            </span>
            <span style={{
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              99.6% Zero-Damage Track Record
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            letterSpacing: '-0.03em',
            color: movService?.textColor || '#FFFFFF',
            maxWidth: '840px',
            marginBottom: '14px'
          }}>
            {movService?.heroHeadline || (
              <>Relocate Without the Stress. <span style={{ color: movService?.badgeColor || '#FBBF24' }}>Move, Pack, Store &amp; Settle In.</span></>
            )}
          </h1>

          <p style={{
            fontSize: '1.02rem',
            lineHeight: 1.6,
            color: movService?.subtitleColor || '#CBD5E1',
            maxWidth: '780px',
            marginBottom: '26px'
          }}>
            {movService?.heroSubtitle || "Our premier full-stack moving ecosystem. Heavy-duty GPS-tracked moving trucks, white-glove fragile packing, secure climate-controlled storage units, step-by-step interactive move planner, and complete electricity & fiber internet transfer concierge."}
          </p>

          {/* Key Stat Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FBBF24' }}>3,100+</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Successful Relocations</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#38BDF8' }}>Real-Time GPS</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Live Truck Tracking Link</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#34D399' }}>24/7 Security</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>CCTV Monitored Storage</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#A78BFA' }}>36 States</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Nationwide Haulage Reach</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          6 CORE FEATURE TABS (SNAPS TO TOP ON SCROLL)
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'sticky',
        top: '75px',
        zIndex: 900,
        backgroundColor: '#0F172A',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        padding: '10px 4%'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '8px',
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '6px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
          {[
            { id: 'truck-booking', label: '1. Truck Booking', icon: Truck, subtitle: 'Fleet Sizing & Quotes' },
            { id: 'packing-services', label: '2. Packing Services', icon: Package, subtitle: 'Boxes & Fragile Crating' },
            { id: 'storage-units', label: '3. Storage Units', icon: Warehouse, subtitle: 'Short & Long Term' },
            { id: 'relocation-assistance', label: '4. Relocation Assist', icon: Sparkles, subtitle: 'Artisans & Estate Passes' },
            { id: 'move-checklist', label: '5. Move Checklist', icon: ClipboardCheck, subtitle: 'Interactive Timeline' },
            { id: 'utility-transfer', label: '6. Utility Transfer', icon: Zap, subtitle: 'Power, Fiber & Water' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'linear-gradient(135deg, #D97706, #B45309)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 14px rgba(217, 119, 6, 0.35)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#FFF' : '#CBD5E1',
                  flexShrink: 0
                }}>
                  <Icon size={17} />
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isActive ? '#FFF' : '#E2E8F0', whiteSpace: 'nowrap' }}>
                    {tab.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: isActive ? '#FEF3C7' : '#64748B', whiteSpace: 'nowrap' }}>
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MAIN CONTENT AREA
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1280px',
        margin: '24px auto 0',
        padding: '0 4%'
      }}>

        {/* ───────────────────────────────────────────────────────────────
            TAB 1: TRUCK BOOKING
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'truck-booking' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(217, 119, 6, 0.15)',
                color: '#FBBF24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Truck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Select Your Relocation Truck &amp; Calculate Route Estimate
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Choose from our weather-sealed box fleet. Every booking includes experienced uniformed porters, fuel, highway tolls, goods-in-transit insurance, and a live WhatsApp GPS tracking link.
                </p>
              </div>
            </div>

            {/* Fleet Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {FLEET_TYPES.map((truck) => {
                const isSelected = selectedFleetId === truck.id;
                return (
                  <div
                    key={truck.id}
                    onClick={() => setSelectedFleetId(truck.id)}
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(180deg, rgba(217, 119, 6, 0.15), rgba(30, 41, 59, 0.7) 40%)' 
                        : 'rgba(30, 41, 59, 0.4)',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 10px 30px rgba(217, 119, 6, 0.25)' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ position: 'relative', width: '100%', height: '170px' }}>
                        <img src={truck.img} alt={truck.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.85)',
                          color: '#FDE68A',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}>
                          {truck.tag}
                        </span>
                        {isSelected && (
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: '#F59E0B',
                            color: '#0F172A',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Check size={16} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <div style={{ padding: '18px 18px 10px' }}>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '6px' }}>
                          {truck.name}
                        </h4>
                        <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '12px', lineHeight: 1.4 }}>
                          {truck.capacity}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.72rem', color: '#CBD5E1', marginBottom: '14px' }}>
                          <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '6px 8px', borderRadius: '6px' }}>
                            <strong>Payload:</strong> {truck.payload}
                          </div>
                          <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '6px 8px', borderRadius: '6px' }}>
                            <strong>Dimensions:</strong> {truck.dimensions.split(' ')[0]}
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                          {truck.features.map((feat, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#E2E8F0' }}>
                              <Check size={13} color="#F59E0B" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '0 18px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF' }}>
                          ₦{truck.basePriceNGN.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>/ ${truck.basePriceUSD} Base</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Route & Pricing Estimator Bar */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '640px' }}>
                <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#FFF' }}>
                  Select Transit Corridor &amp; Porter Crew
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {ROUTE_PRESETS.map((route) => (
                    <button
                      key={route.id}
                      onClick={() => setSelectedRouteId(route.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: selectedRouteId === route.id ? '#D97706' : 'rgba(15, 23, 42, 0.6)',
                        border: selectedRouteId === route.id ? '1px solid #FBBF24' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFF',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {route.label.split('(')[0]}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                  <span>Est. Transit: <strong style={{ color: '#FFF' }}>{selectedRoute.estTime}</strong></span>
                  <span>&bull;</span>
                  <span>Additional Porters:</span>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    {[0, 2, 4].map(n => (
                      <button
                        key={n}
                        onClick={() => setExtraPorters(n)}
                        style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: extraPorters === n ? '#F59E0B' : 'rgba(255,255,255,0.06)',
                          border: 'none',
                          color: extraPorters === n ? '#0F172A' : '#FFF',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        +{n} (+₦{(n * 10000).toLocaleString()})
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Book Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Total Estimated Trip Fare:</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FBBF24', letterSpacing: '-0.02em' }}>
                    ₦{calculatedTruckPriceNGN.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>&asymp; ${calculatedTruckPriceUSD} USD (All Tolls Included)</div>
                </div>

                <button
                  onClick={() => openBookingModal(`Truck: ${selectedFleet.name} (${selectedRoute.label})`)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    border: 'none',
                    color: '#0F172A',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
                  }}
                >
                  Book This Truck
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 2: PACKING SERVICES
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'packing-services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Package size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Professional Packing Services &amp; Heavy-Duty Material Boxes
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Prevent transit breakages and scratches. Whether you want to pack yourself using our double-wall boxes or have our white-glove crew crate your chandeliers and wine glasses, we have the exact right tier.
                </p>
              </div>
            </div>

            {/* 3 Packing Tiers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {PACKING_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  style={{
                    background: tier.popular 
                      ? 'linear-gradient(180deg, rgba(56, 189, 248, 0.15), rgba(30, 41, 59, 0.7) 35%)' 
                      : 'rgba(30, 41, 59, 0.4)',
                    borderRadius: '16px',
                    border: tier.popular ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  {tier.popular && (
                    <span style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #38BDF8, #0284C7)',
                      color: '#0F172A',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      Most Requested
                    </span>
                  )}

                  <div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#38BDF8' }}>
                      {tier.tag}
                    </span>
                    <h4 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#FFF', margin: '4px 0 8px' }}>
                      {tier.name}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.4, minHeight: '36px', marginBottom: '16px' }}>
                      {tier.desc}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFF' }}>
                        ₦{tier.priceNGN.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.84rem', color: '#94A3B8' }}>/ ${tier.priceUSD}</span>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', marginBottom: '20px' }}>
                      <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '10px' }}>
                        Kit &amp; Service Inclusions:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {tier.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.76rem', color: '#E2E8F0' }}>
                            <Check size={14} color="#38BDF8" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingModal(`Packing Service: ${tier.name}`)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      background: tier.popular ? 'linear-gradient(135deg, #38BDF8, #0284C7)' : 'rgba(255, 255, 255, 0.08)',
                      border: tier.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: tier.popular ? '#0F172A' : '#FFF',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Select {tier.name.split(' ')[0]} Packing
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 3: STORAGE UNITS
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'storage-units' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Warehouse size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Secure Climate-Controlled Storage Facilities (Lagos &amp; Abuja)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Need a secure space for your furniture while waiting for your new house lease to start or traveling abroad? Store your belongings in our 24/7 CCTV-monitored, dehumidified storage vaults with biometric entry.
                </p>
              </div>
            </div>

            {/* Units Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {STORAGE_UNITS.map((unit) => {
                const isSelected = selectedStorageId === unit.id;
                return (
                  <div
                    key={unit.id}
                    onClick={() => setSelectedStorageId(unit.id)}
                    style={{
                      background: isSelected 
                        ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.15), rgba(30, 41, 59, 0.7) 40%)' 
                        : 'rgba(30, 41, 59, 0.4)',
                      borderRadius: '16px',
                      border: isSelected ? '2px solid #10B981' : '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '24px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#34D399' }}>{unit.tag}</span>
                        {isSelected && <Check size={18} color="#10B981" />}
                      </div>

                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF', marginBottom: '6px' }}>
                        {unit.size}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '14px', lineHeight: 1.4 }}>
                        {unit.capacity}
                      </div>

                      <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.74rem', color: '#CBD5E1', marginBottom: '16px' }}>
                        <div><strong>Dimensions:</strong> {unit.dimensions}</div>
                        <div style={{ marginTop: '4px' }}><strong>Ideal For:</strong> {unit.ideal}</div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '1.55rem', fontWeight: 800, color: '#FFF' }}>
                          ₦{unit.monthlyPriceNGN.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>/ Month (${unit.monthlyPriceUSD})</span>
                      </div>
                      <span style={{ fontSize: '0.7rem', color: '#34D399' }}>&bull; Month-to-Month Flexible Lease</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Storage Duration Calculator */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div>
                <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                  Select Storage Duration (Lekki or Abuja Facility)
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[
                    { m: 1, label: '1 Month' },
                    { m: 3, label: '3 Months (10% Off)' },
                    { m: 6, label: '6 Months (15% Off)' },
                    { m: 12, label: '12 Months (20% Off)' }
                  ].map((dur) => (
                    <button
                      key={dur.m}
                      onClick={() => setStorageMonths(dur.m)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        background: storageMonths === dur.m ? '#10B981' : 'rgba(15, 23, 42, 0.6)',
                        border: storageMonths === dur.m ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: storageMonths === dur.m ? '#0F172A' : '#FFF',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Total {storageMonths}-Month Rental:</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34D399' }}>
                    ₦{totalStoragePriceNGN.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#CBD5E1' }}>Includes 24/7 Security &amp; Insurance</div>
                </div>

                <button
                  onClick={() => openBookingModal(`Storage Unit: ${selectedStorage.size} (${storageMonths} Months)`)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    border: 'none',
                    color: '#FFF',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer'
                  }}
                >
                  Reserve Unit Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 4: RELOCATION ASSISTANCE
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'relocation-assistance' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(167, 139, 250, 0.15)',
                color: '#A78BFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Sparkles size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Full Relocation Concierge: Artisans, Cleaning &amp; Gate Permits
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Moving is more than just hauling boxes. Our relocation concierge takes care of AC technician dismounting, new estate security access gate passes, pre-move deep sanitization, and local neighborhood orientation.
                </p>
              </div>
            </div>

            {/* Relocation Service Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {RELOCATION_SERVICES.map((serv) => (
                <div
                  key={serv.id}
                  style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                      {serv.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '16px' }}>
                      {serv.desc}
                    </p>

                    <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: '10px 12px', borderRadius: '8px', fontSize: '0.74rem', marginBottom: '18px' }}>
                      <div style={{ color: '#FBBF24', fontWeight: 700 }}>Fee: {serv.priceNGN}</div>
                      <div style={{ color: '#94A3B8', marginTop: '2px' }}>Timeline: {serv.turnaround}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingModal(`Concierge Service: ${serv.title}`)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      background: 'rgba(124, 58, 237, 0.15)',
                      border: '1px solid #7C3AED',
                      color: '#C4B5FD',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    Request this Assistance
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 5: MOVE CHECKLIST
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'move-checklist' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '4px' }}>
                  Interactive Relocation Timeline &amp; Checklist
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#94A3B8', margin: 0 }}>
                  Never forget a single step. Check off completed items as you countdown to move day.
                </p>
              </div>

              {/* Progress meter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>{progressPercent}% Complete</div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{completedCount} of {checklist.length} tasks done</div>
                </div>
                <div style={{ width: '120px', height: '10px', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: '#10B981', transition: 'width 0.3s' }} />
                </div>
              </div>
            </div>

            {/* Checklist Items Grouped */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: item.checked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(15, 23, 42, 0.5)',
                    border: item.checked ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      background: item.checked ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                      color: item.checked ? '#0F172A' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={15} strokeWidth={3} />
                    </div>

                    <div>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: item.checked ? '#34D399' : '#FBBF24',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        {item.phase}
                      </span>
                      <div style={{
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: item.checked ? '#94A3B8' : '#FFF',
                        textDecoration: item.checked ? 'line-through' : 'none',
                        marginTop: '2px'
                      }}>
                        {item.text}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 6: UTILITY TRANSFER ASSISTANCE
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'utility-transfer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(30, 41, 59, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#FBBF24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Zap size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Utility Transfer &amp; Connection Concierge
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Never move into a dark house or get hit by unpaid electricity bills left by prior tenants. We manage your DisCo smart prepaid meter registration, fiber broadband transfer, estate water, and solar inverter reinstallations.
                </p>
              </div>
            </div>

            {/* Utility Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {UTILITY_SERVICES.map((util) => {
                const Icon = util.icon;
                return (
                  <div
                    key={util.id}
                    style={{
                      background: 'rgba(30, 41, 59, 0.4)',
                      borderRadius: '14px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: util.color + '20',
                          color: util.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#FFF' }}>{util.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{util.provider}</div>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '18px' }}>
                        {util.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => openBookingModal(`Utility Transfer: ${util.name}`)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      Request Connection Setup
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════════
          BOOKING & RELOCATION PASS GENERATION MODAL
          ══════════════════════════════════════════════════════════════════ */}
      {isBookingModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-main, #0F172A)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            maxWidth: '620px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
          }}>
            <button
              onClick={() => {
                setIsBookingModalOpen(false);
                setBookingPass(null);
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {bookingPass ? (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(217, 119, 6, 0.2)',
                  color: '#FBBF24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <ShieldCheck size={32} />
                </div>

                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: 'rgba(217, 119, 6, 0.15)',
                  color: '#FBBF24'
                }}>
                  Relocation Docket Confirmed
                </span>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF', margin: '8px 0 4px' }}>
                  Official Relocation Pass Issued
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Tracking Code: <strong style={{ color: '#FBBF24', fontFamily: 'monospace' }}>{bookingPass.trackingCode}</strong>
                </div>

                <div style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  borderRadius: '14px',
                  border: '1px solid rgba(217, 119, 6, 0.3)',
                  padding: '20px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: '#E2E8F0',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Booking Type:</span>
                      <div style={{ fontWeight: 700, color: '#FFF' }}>{bookingPass.serviceType}</div>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Estimated Trip Fare:</span>
                      <div style={{ fontWeight: 700, color: '#FBBF24' }}>{bookingPass.estPrice}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Pickup:</span>
                    <div style={{ fontWeight: 600 }}>{bookingPass.pickup}</div>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Destination:</span>
                    <div style={{ fontWeight: 600 }}>{bookingPass.dropoff}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Assigned Lead Driver:</span>
                      <div style={{ fontSize: '0.76rem', color: '#93C5FD' }}>{bookingPass.leadDriver}</div>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Operations Lead:</span>
                      <div style={{ fontSize: '0.76rem', color: '#93C5FD' }}>{bookingPass.assignedDispatcher}</div>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '20px' }}>
                  A live GPS tracking link and logistics dispatch schedule will be sent to your WhatsApp number 24 hours before departure.
                </p>

                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #D97706, #B45309)',
                    border: 'none',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Done / Return to Relocation Suite
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Truck size={20} color="#F59E0B" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FBBF24', textTransform: 'uppercase' }}>
                    Relocation Fleet Reservation
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF', marginBottom: '4px' }}>
                  {bookingType}
                </h3>
                <div style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '18px' }}>
                  Estimated Rate: <strong style={{ color: '#FFF' }}>₦{calculatedTruckPriceNGN.toLocaleString()}</strong> (~${calculatedTruckPriceUSD}) &bull; Fleet: <strong>{selectedFleet.name}</strong>
                </div>

                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ngozi Adeleke"
                      value={bookingFormData.name}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                        Phone / WhatsApp (GPS Tracking)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803 000 0000"
                        value={bookingFormData.phone}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(30, 41, 59, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFF',
                          fontSize: '0.84rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@example.com"
                        value={bookingFormData.email}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(30, 41, 59, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFF',
                          fontSize: '0.84rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                      Pickup Address &amp; State
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingFormData.pickupAddress}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, pickupAddress: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                      Destination Address &amp; State
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingFormData.dropoffAddress}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, dropoffAddress: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                      Preferred Move Date
                    </label>
                    <input
                      type="date"
                      value={bookingFormData.preferredDate}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, preferredDate: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                      Inventory Details &amp; Special Fragile Items
                    </label>
                    <textarea
                      rows={3}
                      placeholder="List fragile items (e.g. 85-inch TV, piano, marble table) or building access notes (e.g. 3rd floor apartment with elevator)..."
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.84rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                      border: 'none',
                      color: '#0F172A',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
                    }}
                  >
                    <Truck size={18} /> Confirm Reservation &amp; Generate Move Pass
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
