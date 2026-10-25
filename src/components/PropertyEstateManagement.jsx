import React, { useState } from 'react';
import { 
  ArrowLeft, Building, KeyRound, ShieldCheck, Check, Sparkles, 
  Users, QrCode, CreditCard, Bell, FileText, Wrench, Calendar, 
  Vote, PhoneCall, HelpCircle, Sliders, ChevronRight, X, 
  Send, CheckCircle, Search, AlertTriangle, MapPin, Activity,
  Phone, Mail, User, Shield, Info, DollarSign, PlusCircle, RefreshCw
} from 'lucide-react';
import { getStoredServices } from '../utils/userStorage';

// ══════════════════════════════════════════════════════════════════════
// 1. DATA: 3 PREDEFINED PLANS FOR LANDLORD (SINGLE UNIT) & ESTATES
// ══════════════════════════════════════════════════════════════════════

const SINGLE_UNIT_PLANS = [
  {
    id: 'starter',
    name: 'Essential Rent & Lease Starter',
    badge: 'Self-Serve Landlord',
    ratePerUnitNgn: 25000,
    ratePerUnitUsd: 17,
    desc: 'Perfect for private landlords wanting automated rent collection, tenant credit vetting, and legally binding digital lease agreements with minimal overhead.',
    includedFeatureIds: ['rent-collection', 'rent-reminders', 'digital-leases', 'tenant-management']
  },
  {
    id: 'executive',
    name: 'Executive Full-Care Managed',
    badge: 'Most Popular',
    ratePerUnitNgn: 55000,
    ratePerUnitUsd: 37,
    desc: 'Complete hands-off peace of mind. We collect rent on time, manage 24/7 repair dispatch, audit utilities, and deliver quarterly 4K photographic inspection reports.',
    includedFeatureIds: ['rent-collection', 'rent-reminders', 'digital-leases', 'tenant-management', 'maintenance-requests', 'inspection-scheduling', 'utility-management']
  },
  {
    id: 'turnkey',
    name: 'Turnkey Diaspora Asset Care',
    badge: 'Maximum Protection',
    ratePerUnitNgn: 95000,
    ratePerUnitUsd: 64,
    desc: 'Tailored for property owners in the UK, USA, Canada & abroad. Guarantees zero-confrontation rent wires, legal dispute arbitration, tax yield exports, and instant re-listing before vacancy.',
    includedFeatureIds: ['rent-collection', 'rent-reminders', 'digital-leases', 'tenant-management', 'maintenance-requests', 'inspection-scheduling', 'utility-management', 'expense-tracking', 'complaint-resolution', 'vacancy-tracking']
  }
];

const ESTATE_PLANS = [
  {
    id: 'gate-tech',
    name: 'Smart Gate & Access Control',
    badge: 'Gatehouse Essentials',
    ratePerHouseNgn: 3500,
    ratePerHouseUsd: 2.4,
    desc: 'Eliminates gatehouse congestion and unauthorized entries. Residents issue instant visitor QR passes and 6-digit WhatsApp codes verified on guard tablets with license plate logging.',
    includedFeatureIds: ['visitor-qr', 'gate-passes', 'visitor-mgmt', 'residence-directory']
  },
  {
    id: 'community-ops',
    name: 'Complete Gated Community Operations',
    badge: 'Most Popular for Estates',
    ratePerHouseNgn: 7500,
    ratePerHouseUsd: 5.1,
    desc: 'Full-spectrum community administration. Seamless gate access, automated estate service charge and diesel generator dues collection, security patrol audits, announcements, and facility bookings.',
    includedFeatureIds: ['visitor-qr', 'gate-passes', 'visitor-mgmt', 'residence-directory', 'service-charges', 'security-reporting', 'community-announcements', 'facility-booking', 'central-utilities']
  },
  {
    id: 'megacity',
    name: 'Master-Planned Megacity Plan',
    badge: 'Executive HOA & CDA',
    ratePerHouseNgn: 14000,
    ratePerHouseUsd: 9.5,
    desc: 'Institutional-grade estate ecosystem. Includes everything in community operations plus audited digital AGM elections voting, 24/7 emergency panic dispatch, estate lost & found, and dedicated resident manager.',
    includedFeatureIds: ['visitor-qr', 'gate-passes', 'visitor-mgmt', 'residence-directory', 'service-charges', 'security-reporting', 'community-announcements', 'facility-booking', 'central-utilities', 'estate-voting', 'emergency-contacts', 'lost-and-found']
  }
];

// ══════════════════════════════════════════════════════════════════════
// 2. DATA: FULL CATALOG OF SPECIFICATIONS (WITH SCALING RULES)
// ══════════════════════════════════════════════════════════════════════

// Single Unit / Landlord Features Catalog
const SINGLE_UNIT_SERVICES = [
  {
    id: 'rent-collection',
    name: 'Automated Rent Collection & Remittance',
    desc: 'Direct tenant bank debit & multi-channel payment gateway wired straight to your domestic or diaspora bank.',
    ratePerUnitNgn: 12000,
    category: 'Finance'
  },
  {
    id: 'rent-reminders',
    name: 'Automated WhatsApp & Email Rent Reminders',
    desc: 'Automated friendly alerts at 30, 14, 7 and 1 day before rent due date with zero awkward confrontation.',
    ratePerUnitNgn: 5000,
    category: 'Finance'
  },
  {
    id: 'digital-leases',
    name: 'Digital Legally Binding Lease Agreements',
    desc: 'Drafted by accredited SAN property attorneys with e-signatures, stamped tenancy clauses, and inventory sign-off.',
    ratePerUnitNgn: 9000,
    category: 'Legal'
  },
  {
    id: 'tenant-management',
    name: 'Tenant Screening & KYC Background Vetting',
    desc: 'Bank statement verification, BVN check, employer guarantor authentication, and prior landlord reference audits.',
    ratePerUnitNgn: 10000,
    category: 'Operations'
  },
  {
    id: 'maintenance-requests',
    name: 'Tenant Maintenance Request & Contractor Dispatch',
    desc: '24/7 emergency hotline for plumbing, electrical, and AC issues with pre-vetted artisans under capped rates.',
    ratePerUnitNgn: 8000,
    category: 'Facility'
  },
  {
    id: 'inspection-scheduling',
    name: 'Quarterly Physical Inspection with 4K Photo Reports',
    desc: 'Licensed property officer conducts physical walk-through with photographic condition reports sent to your phone.',
    ratePerUnitNgn: 12000,
    category: 'Facility'
  },
  {
    id: 'utility-management',
    name: 'Utility & Pre-Paid Meter Reconciliation',
    desc: 'Verification of electricity IKEDC/EKEDC tokens, water bills, and local government levies to prevent debt carryover.',
    ratePerUnitNgn: 5000,
    category: 'Operations'
  },
  {
    id: 'expense-tracking',
    name: 'Landlord Expense & Rental Yield Reporting',
    desc: 'Monthly P&L statements, repair deductions, capital depreciation, and year-end tax preparation export.',
    ratePerUnitNgn: 6000,
    category: 'Finance'
  },
  {
    id: 'complaint-resolution',
    name: 'Tenant Dispute & Move-Out Bond Arbitration',
    desc: 'Mediation of tenant disputes, security deposit refund deductions, and legal eviction notice assistance if required.',
    ratePerUnitNgn: 9000,
    category: 'Legal'
  },
  {
    id: 'vacancy-tracking',
    name: 'Vacancy Tracking & Automated Re-Listing',
    desc: 'Immediate promotional listing across diaspora and local portals 60 days before lease expiration to ensure zero downtime.',
    ratePerUnitNgn: 8000,
    category: 'Operations'
  }
];

// Gated Estate Services Catalog (With variable per-house vs fixed infrastructure scaling)
const ESTATE_SERVICES = [
  {
    id: 'visitor-qr',
    name: 'Visitor QR Code Access Pass Generation',
    desc: 'Residents generate encrypted QR passes with auto-expiration for guests and delivery riders.',
    scaling: 'variable',
    ratePerHouseNgn: 950,
    category: 'Gate Security',
    scaleNote: 'Price scales directly with house count (doubles as houses double)'
  },
  {
    id: 'gate-passes',
    name: 'Instant WhatsApp & SMS 6-Digit Gate Codes',
    desc: 'Universal numeric gate passes for visitors without smartphones, verified by gate guards in 5 seconds.',
    scaling: 'variable',
    ratePerHouseNgn: 650,
    category: 'Gate Security',
    scaleNote: 'Price scales directly with house count (doubles as houses double)'
  },
  {
    id: 'visitor-mgmt',
    name: 'Full Visitor Management & Guard Tablet System',
    desc: 'Ruggedized gatehouse guard tablets with camera license plate capture and real-time resident authorization.',
    scaling: 'fixed',
    baseFeeNgn: 55000,
    category: 'Gate Security',
    scaleNote: 'Infrastructure service — remains close to original cost as houses grow'
  },
  {
    id: 'service-charges',
    name: 'Automated Service Charge & Dues Collection',
    desc: 'Direct payment of estate dues (security, waste disposal, streetlights) with automated receipts and defaulter restriction.',
    scaling: 'variable',
    ratePerHouseNgn: 1200,
    category: 'Finance',
    scaleNote: 'Price scales directly with house count (doubles as houses double)'
  },
  {
    id: 'security-reporting',
    name: 'Estate Security Patrol & Incident Reporting',
    desc: 'Armed security liaison, guard tour RFID checkpoint monitoring, perimeter alerts, and weekly police coordination.',
    scaling: 'fixed',
    baseFeeNgn: 85000,
    category: 'Gate Security',
    scaleNote: 'Infrastructure service — remains close to original cost as houses grow'
  },
  {
    id: 'residence-directory',
    name: 'Verified Resident Directory & RFID Decals',
    desc: 'Central digital roster of homeowners, tenants, domestic staff, and vehicle windshield RFID tags.',
    scaling: 'variable',
    ratePerHouseNgn: 500,
    category: 'Administration',
    scaleNote: 'Price scales directly with house count (doubles as houses double)'
  },
  {
    id: 'community-announcements',
    name: 'Broadcast Community Announcements & Push Notices',
    desc: 'Instant broadcast of road closures, fumigation dates, executive committee updates, and security advisories via SMS & App.',
    scaling: 'fixed',
    baseFeeNgn: 30000,
    category: 'Administration',
    scaleNote: 'Infrastructure service — remains close to original cost as houses grow'
  },
  {
    id: 'facility-booking',
    name: 'Facility Booking (Clubhouse, Gym, Sports Court)',
    desc: 'In-app reservation calendar for estate recreation center, event hall bookings, swimming pool passes, and cleaning deposits.',
    scaling: 'fixed',
    baseFeeNgn: 40000,
    category: 'Community',
    scaleNote: 'Infrastructure service — remains close to original cost as houses grow'
  },
  {
    id: 'estate-voting',
    name: 'Digital Estate AGM Voting & Decision Polls',
    desc: 'Secure one-resident-one-vote digital ballots for executive elections, development levies, and estate bylaws with audited results.',
    scaling: 'fixed',
    baseFeeNgn: 35000,
    category: 'Administration',
    scaleNote: 'Infrastructure service — remains close to original cost as houses grow'
  },
  {
    id: 'emergency-contacts',
    name: '24/7 Estate Emergency Panic Dispatch Desk',
    desc: 'One-touch emergency connection to police, ambulance, estate quick response squad, and anti-robbery unit.',
    scaling: 'fixed',
    baseFeeNgn: 50000,
    category: 'Gate Security',
    scaleNote: 'Infrastructure service — remains close to original cost as houses grow'
  },
  {
    id: 'lost-and-found',
    name: 'Estate Lost & Found Board & Community Resolving',
    desc: 'Resident bulletin board for misplaced keys, packages, domestic pet tracking, and community notices.',
    scaling: 'fixed',
    baseFeeNgn: 20000,
    category: 'Community',
    scaleNote: 'Infrastructure service — remains close to original cost as houses grow'
  },
  {
    id: 'central-utilities',
    name: 'Central Utility & Generator Fuel Split Billing',
    desc: 'Split-meter automated billing for centralized 500KVA estate diesel generators and water treatment plants.',
    scaling: 'variable',
    ratePerHouseNgn: 1100,
    category: 'Facility',
    scaleNote: 'Price scales directly with house count (doubles as houses double)'
  }
];

// ══════════════════════════════════════════════════════════════════════
// 3. MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════
export default function PropertyEstateManagement({ onBackToHub, customService }) {
  // Mode: Single-Unit Landlord vs Gated Estate
  const [managementMode, setManagementMode] = useState('estate'); // 'estate' | 'single-unit'

  // Selection view: 'plans' (choose from 3 plans) vs 'custom' (start from $0)
  const [selectionView, setSelectionView] = useState('plans'); // 'plans' | 'custom'

  // Active Predefined Plan
  const [selectedPlanId, setSelectedPlanId] = useState('community-ops');

  // House Count / Unit Slider State
  const [houseCount, setHouseCount] = useState(50); // for estate: 50 houses default; for landlord: 2 units

  // Custom Selection State (starts empty = 0 dollars!)
  const [customSelectedServices, setCustomSelectedServices] = useState({});

  // Custom Quote / Contact Us Modal State
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    fullName: '',
    role: 'Estate Chairman / CDA Executive',
    phone: '',
    email: '',
    estateName: '',
    notes: ''
  });

  // Handle Mode Switch
  const handleSwitchMode = (mode) => {
    setManagementMode(mode);
    setSelectionView('plans');
    setCustomSelectedServices({});
    if (mode === 'single-unit') {
      setSelectedPlanId('executive');
      setHouseCount(2);
      setContactData(prev => ({ ...prev, role: 'Property Owner / Landlord' }));
    } else {
      setSelectedPlanId('community-ops');
      setHouseCount(50);
      setContactData(prev => ({ ...prev, role: 'Estate Chairman / CDA Executive' }));
    }
  };

  // Toggle Custom Service Checkbox (Starts from $0)
  const toggleCustomService = (serviceId) => {
    setCustomSelectedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  // Read real-time service configuration & subscriptions from admin storage
  const storedServices = getStoredServices();
  const pmService = customService || storedServices.find(s => s.id === 'property-management');
  const storedSubs = pmService?.subscriptions || [];

  // Dynamically enrich single unit landlord plans with admin changes
  const dynamicSingleUnitPlans = SINGLE_UNIT_PLANS.map(basePlan => {
    const override = storedSubs.find(s => 
      s.id === basePlan.id || 
      (s.id === 'plan-pm-basic' && basePlan.id === 'starter') ||
      (s.id === 'plan-pm-comprehensive' && basePlan.id === 'executive') ||
      (s.id === 'plan-pm-diaspora' && basePlan.id === 'turnkey') ||
      s.name?.toLowerCase().includes(basePlan.id)
    );
    if (!override) return basePlan;
    return {
      ...basePlan,
      name: override.name || basePlan.name,
      badge: override.badge || basePlan.badge,
      ratePerUnitNgn: override.priceNgn ?? basePlan.ratePerUnitNgn,
      ratePerUnitUsd: override.priceUsd ?? basePlan.ratePerUnitUsd,
      desc: override.shortDesc || override.desc || basePlan.desc,
      offerings: override.offerings || null
    };
  });

  // Dynamically enrich estate plans with admin changes if defined
  const dynamicEstatePlans = ESTATE_PLANS.map(basePlan => {
    const override = storedSubs.find(s => 
      s.id === basePlan.id || 
      (s.id === 'plan-pm-gate' && basePlan.id === 'gate-tech') ||
      (s.id === 'plan-pm-estate' && basePlan.id === 'community-ops') ||
      s.name?.toLowerCase().includes(basePlan.id)
    );
    if (!override) return basePlan;
    return {
      ...basePlan,
      name: override.name || basePlan.name,
      badge: override.badge || basePlan.badge,
      ratePerHouseNgn: override.priceNgn ?? basePlan.ratePerHouseNgn,
      ratePerHouseUsd: override.priceUsd ?? basePlan.ratePerHouseUsd,
      desc: override.shortDesc || override.desc || basePlan.desc,
      offerings: override.offerings || null
    };
  });

  // Calculate pricing
  const currentPlans = managementMode === 'single-unit' ? dynamicSingleUnitPlans : dynamicEstatePlans;
  const currentServices = managementMode === 'single-unit' ? SINGLE_UNIT_SERVICES : ESTATE_SERVICES;
  const activePlan = currentPlans.find(p => p.id === selectedPlanId) || currentPlans[1];

  // Pricing for PLAN VIEW:
  // For Estate: plan ratePerHouse * houseCount (with slight bulk discounts for 100+ houses)
  // For Landlord: ratePerUnit * units
  let planPriceNgn = 0;
  if (managementMode === 'estate') {
    const bulkDiscount = houseCount > 100 ? 0.9 : 1.0;
    planPriceNgn = Math.round(activePlan.ratePerHouseNgn * houseCount * bulkDiscount);
  } else {
    planPriceNgn = activePlan.ratePerUnitNgn * houseCount;
  }
  const planPriceUsd = Math.round(planPriceNgn / 1480);

  // Pricing for CUSTOM (START FROM $0) VIEW:
  let customPriceNgn = 0;
  if (managementMode === 'estate') {
    ESTATE_SERVICES.forEach(s => {
      if (customSelectedServices[s.id]) {
        if (s.scaling === 'variable') {
          // Doubles as houses double!
          customPriceNgn += s.ratePerHouseNgn * houseCount;
        } else {
          // Fixed infrastructure: remains close to original cost even as houses grow
          // Only adds +6% per 50 houses beyond base 50
          const scaleFactor = 1 + Math.max(0, (houseCount - 50) * 0.0015);
          customPriceNgn += Math.round(s.baseFeeNgn * scaleFactor);
        }
      }
    });
  } else {
    // Single Unit Custom
    SINGLE_UNIT_SERVICES.forEach(s => {
      if (customSelectedServices[s.id]) {
        customPriceNgn += s.ratePerUnitNgn * houseCount;
      }
    });
  }
  const customPriceUsd = Math.round(customPriceNgn / 1480);

  // Active pricing to display in the floating dock or summary
  const activeDisplayNgn = selectionView === 'plans' ? planPriceNgn : customPriceNgn;
  const activeDisplayUsd = selectionView === 'plans' ? planPriceUsd : customPriceUsd;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

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
          Property &amp; Estate Management
        </h2>
      </div>

      {/* Mode Switcher Sub-bar */}
      <div style={{ backgroundColor: '#FAF9F6', borderBottom: '1px solid var(--border)', padding: '10px 6%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleSwitchMode('estate')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: managementMode === 'estate' ? '2px solid var(--accent)' : '1px solid var(--border)',
              backgroundColor: managementMode === 'estate' ? 'var(--accent)' : '#FFFFFF',
              color: managementMode === 'estate' ? '#FFFFFF' : 'var(--text-title)',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Building size={13} />
            <span>Gated Estate & Community (Per House)</span>
          </button>

          <button
            onClick={() => handleSwitchMode('single-unit')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: managementMode === 'single-unit' ? '2px solid var(--accent)' : '1px solid var(--border)',
              backgroundColor: managementMode === 'single-unit' ? 'var(--accent)' : '#FFFFFF',
              color: managementMode === 'single-unit' ? '#FFFFFF' : 'var(--text-title)',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <KeyRound size={13} />
            <span>Single-Unit / Landlord Management</span>
          </button>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.78rem', whiteSpace: 'nowrap', marginLeft: 'auto' }}
          >
            Contact Us & Request Custom Scope →
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. HERO BANNER
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#070C09',
        color: '#FFFFFF',
        padding: '50px 6% 60px',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: pmService?.heroImage ? `linear-gradient(to right, rgba(7, 12, 9, 0.94) 0%, rgba(7, 12, 9, 0.8) 60%, rgba(7, 12, 9, 0.5) 100%), url(${pmService.heroImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {!pmService?.heroImage && (
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
            border: `1px solid ${pmService?.badgeColor ? `${pmService.badgeColor}66` : 'rgba(210, 125, 45, 0.4)'}`,
            padding: '4px 14px',
            borderRadius: '4px',
            color: pmService?.badgeColor || '#F4BA74',
            fontSize: '0.74rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '14px'
          }}>
            <ShieldCheck size={14} />
            <span>{pmService?.badgeText || "Institutional Management & Operations Desk"}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
            fontWeight: 400,
            margin: '0 0 16px',
            lineHeight: 1.15,
            color: pmService?.textColor || '#FFFFFF'
          }}>
            {pmService?.heroHeadline || (managementMode === 'estate' 
              ? "Gated Estate & Community Operations" 
              : "Single-Unit & Landlord Property Management")}
          </h1>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: pmService?.subtitleColor || 'rgba(255, 255, 255, 0.85)',
            maxWidth: '820px',
            margin: '0 0 28px',
            fontWeight: 300
          }}>
            {pmService?.heroSubtitle || (managementMode === 'estate'
              ? "Comprehensive operations for residential estates, CDAs, and commercial plazas. In estate management, the pricing is per house: as houses increase, operational features scale smoothly while central infrastructure remains stable."
              : "Complete hands-off protection for private landlords and diaspora property owners. Automated rent collection, tenant screening, legal lease drafting, repair dispatch, and physical inspections.")}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          STICKY LAYOUT SWITCHER BAR (SNAPS TO TOP ON SCROLL)
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'sticky',
        top: '75px',
        zIndex: 900,
        backgroundColor: '#0E1712',
        borderBottom: '1px solid rgba(210, 125, 45, 0.35)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        padding: '12px 6%'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* View Selector: Curated Plans vs Build Your Own from $0 */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '4px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <button
              onClick={() => setSelectionView('plans')}
              style={{
                padding: '9px 20px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: selectionView === 'plans' ? 'var(--accent-gold)' : 'transparent',
                color: selectionView === 'plans' ? '#070C09' : '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>1. Choose from Our Curated Plans</span>
            </button>

            <button
              onClick={() => setSelectionView('custom')}
              style={{
                padding: '9px 20px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: selectionView === 'custom' ? 'var(--accent-gold)' : 'transparent',
                color: selectionView === 'custom' ? '#070C09' : '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <PlusCircle size={14} />
              <span>2. Build Your Own Plan (Start from $0)</span>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Active Mode: <strong style={{ color: 'var(--accent-gold)' }}>{managementMode === 'estate' ? 'Estate Scale' : 'Single-Unit'}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          3. HOUSE COUNT / PORTFOLIO UNITS SCALE SLIDER
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1100px', margin: '30px auto 0', padding: '0 6%' }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid var(--border)',
          padding: '24px 28px',
          marginBottom: '32px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                {managementMode === 'estate' ? 'Estate Scale (Pricing is Calculated Per House)' : 'Portfolio Scale (Calculated Per Unit)'}
              </span>
              <h3 style={{ margin: '2px 0 0', fontSize: '1.15rem', color: 'var(--accent)', fontWeight: 700 }}>
                {managementMode === 'estate' ? "How Many Houses / Residences in the Estate?" : "How Many Rental Units / Houses Managed?"}
              </h3>
            </div>
            <div style={{
              backgroundColor: 'rgba(26, 62, 38, 0.08)',
              color: 'var(--accent)',
              padding: '6px 18px',
              borderRadius: '6px',
              fontWeight: 800,
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '6px'
            }}>
              <span>{houseCount}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{houseCount === 1 ? 'House' : 'Houses'}</span>
            </div>
          </div>

          <input
            type="range"
            min={managementMode === 'estate' ? 10 : 1}
            max={managementMode === 'estate' ? 300 : 25}
            step={managementMode === 'estate' ? 5 : 1}
            value={houseCount}
            onChange={(e) => setHouseCount(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px' }}>
            <span>{managementMode === 'estate' ? '10 Houses (Gated Close)' : '1 Unit (Single Property)'}</span>
            <span>{managementMode === 'estate' ? '80 Houses (Medium Residential Estate)' : '10 Units (Block of Flats)'}</span>
            <span>{managementMode === 'estate' ? '300+ Houses (Mega Community / CDA)' : '25+ Units (Landlord Portfolio)'}</span>
          </div>

          {managementMode === 'estate' && (
            <div style={{
              marginTop: '14px',
              padding: '8px 14px',
              borderRadius: '6px',
              backgroundColor: '#FAF9F6',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.74rem',
              color: '#475569'
            }}>
              <Info size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
              <span>
                <strong>Per-House Pricing Dynamics:</strong> Variable features (QR passes, dues collection, SMS gate codes) scale directly as houses increase, while central infrastructure (guard tablets, security liaison, emergency desk) stays stable.
              </span>
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            VIEW 1: THE 3 PREDEFINED PLANS (WITH CLEAR DESCRIPTIONS)
            ══════════════════════════════════════════════════════════════════ */}
        {selectionView === 'plans' && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Our Standard Package Options
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                  Select One of Our 3 Plans
                </h2>
              </div>

              <button
                onClick={() => setSelectionView('custom')}
                style={{
                  background: 'none',
                  border: '1px dashed var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  padding: '7px 14px',
                  borderRadius: '4px',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Don't fit you? Build custom plan from $0 →</span>
              </button>
            </div>

            {/* 3 Plans Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '20px'
            }}>
              {currentPlans.map(plan => {
                const isSelected = selectedPlanId === plan.id;
                // Compute plan total for the current house count
                const currentPlanTotalNgn = managementMode === 'estate' 
                  ? Math.round(plan.ratePerHouseNgn * houseCount * (houseCount > 100 ? 0.9 : 1.0))
                  : plan.ratePerUnitNgn * houseCount;
                const currentPlanTotalUsd = Math.round(currentPlanTotalNgn / 1480);

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid var(--accent-gold)' : '1px solid var(--border)',
                      padding: '24px',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 12px 30px rgba(210, 125, 45, 0.18)' : '0 2px 10px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <div>
                      {/* Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{
                          backgroundColor: isSelected ? 'var(--accent-gold)' : 'rgba(210, 125, 45, 0.12)',
                          color: isSelected ? '#070C09' : 'var(--accent-gold)',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          textTransform: 'uppercase'
                        }}>
                          {plan.badge}
                        </span>

                        {isSelected && (
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-gold)',
                            color: '#070C09',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 900,
                            fontSize: '0.75rem'
                          }}>
                            ✓
                          </div>
                        )}
                      </div>

                      <h3 style={{ margin: '0 0 6px', fontSize: '1.25rem', color: 'var(--accent)', fontWeight: 700 }}>
                        {plan.name}
                      </h3>

                      {/* Pricing block */}
                      <div style={{ backgroundColor: '#FAF9F6', padding: '12px 14px', borderRadius: '6px', border: '1px solid var(--border)', margin: '10px 0 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent)' }}>
                            ₦{currentPlanTotalNgn.toLocaleString()}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                            / month (~${currentPlanTotalUsd} USD)
                          </span>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, display: 'block', marginTop: '3px' }}>
                          {managementMode === 'estate' 
                            ? `₦${plan.ratePerHouseNgn.toLocaleString()} per house × ${houseCount} houses`
                            : `₦${plan.ratePerUnitNgn.toLocaleString()} per unit × ${houseCount} units`}
                        </span>
                      </div>

                      {/* Clear Description */}
                      <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: '#475569', lineHeight: 1.55 }}>
                        {plan.desc}
                      </p>

                      {/* Included Services / Offerings Checklist */}
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                          What is Included in this Plan:
                        </span>

                        {plan.offerings && plan.offerings.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            {plan.offerings.map((item, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.76rem', color: '#334155' }}>
                                <Check size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            {plan.includedFeatureIds.map(fid => {
                              const s = currentServices.find(item => item.id === fid);
                              if (!s) return null;
                              return (
                                <div key={fid} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.76rem', color: '#334155' }}>
                                  <Check size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                                  <span>{s.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlanId(plan.id);
                        setIsContactModalOpen(true);
                      }}
                      style={{
                        width: '100%',
                        marginTop: '20px',
                        padding: '10px 0',
                        borderRadius: '4px',
                        border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
                        backgroundColor: isSelected ? 'var(--accent)' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : 'var(--text-title)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {isSelected ? 'Proceed with this Plan →' : 'Select Plan'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            VIEW 2: BUILD YOUR OWN CUSTOM PLAN (STARTING FROM $0)
            ══════════════════════════════════════════════════════════════════ */}
        {selectionView === 'custom' && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '2px solid rgba(210, 125, 45, 0.4)',
              padding: '24px 28px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Custom A-La-Carte Scope Builder
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--accent)', margin: '2px 0' }}>
                  Build Your Own Plan (Starts from $0)
                </h2>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                  Pick only the exact services you need. Each service has a transparent monthly price and the total adds up in real-time.
                </p>
              </div>

              <button
                onClick={() => setSelectionView('plans')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid var(--border)',
                  backgroundColor: '#FAF9F6',
                  color: 'var(--text-title)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                ← Back to 3 Predefined Plans
              </button>
            </div>

            {/* Custom Services Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '16px'
            }}>
              {currentServices.map(service => {
                const isChecked = !!customSelectedServices[service.id];
                
                // Calculate item price for current house count:
                let itemTotalNgn = 0;
                if (managementMode === 'estate') {
                  if (service.scaling === 'variable') {
                    itemTotalNgn = service.ratePerHouseNgn * houseCount;
                  } else {
                    const scaleFactor = 1 + Math.max(0, (houseCount - 50) * 0.0015);
                    itemTotalNgn = Math.round(service.baseFeeNgn * scaleFactor);
                  }
                } else {
                  itemTotalNgn = service.ratePerUnitNgn * houseCount;
                }
                const itemTotalUsd = Math.round(itemTotalNgn / 1480);

                return (
                  <div
                    key={service.id}
                    onClick={() => toggleCustomService(service.id)}
                    style={{
                      backgroundColor: isChecked ? '#FAF9F6' : '#FFFFFF',
                      borderRadius: '8px',
                      border: isChecked ? '2px solid var(--accent)' : '1px solid var(--border)',
                      padding: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isChecked ? '0 6px 18px rgba(26, 62, 38, 0.08)' : '0 1px 4px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <span style={{
                          backgroundColor: 'rgba(210, 125, 45, 0.1)',
                          color: 'var(--accent-gold)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          {service.category}
                        </span>

                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          backgroundColor: isChecked ? 'var(--accent)' : '#FFFFFF',
                          border: isChecked ? 'none' : '2px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF'
                        }}>
                          {isChecked && <Check size={16} />}
                        </div>
                      </div>

                      <h4 style={{ fontSize: '0.96rem', color: '#1E293B', margin: '0 0 6px', fontWeight: 700 }}>
                        {service.name}
                      </h4>

                      <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5 }}>
                        {service.desc}
                      </p>

                      {managementMode === 'estate' && (
                        <div style={{
                          fontSize: '0.68rem',
                          color: service.scaling === 'variable' ? 'var(--accent-gold)' : '#10B981',
                          fontWeight: 600,
                          marginBottom: '8px'
                        }}>
                          {service.scaleNote}
                        </div>
                      )}
                    </div>

                    <div style={{
                      paddingTop: '10px',
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline'
                    }}>
                      <span style={{ fontSize: '0.74rem', color: isChecked ? 'var(--accent)' : '#94A3B8', fontWeight: 700 }}>
                        {isChecked ? '✓ Added to Custom Plan' : '+ Click to Add ($0)'}
                      </span>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: isChecked ? 'var(--accent)' : '#475569' }}>
                          +₦{itemTotalNgn.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#94A3B8', display: 'block' }}>
                          (~${itemTotalUsd} USD) / mo
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            4. DYNAMIC PRICING TOTAL BANNER (ADDS UP AS YOU CHOOSE)
            ══════════════════════════════════════════════════════════════════ */}
        <div style={{
          backgroundColor: '#070C09',
          color: '#FFFFFF',
          borderRadius: '12px',
          border: '2px solid rgba(210, 125, 45, 0.4)',
          padding: '28px 32px',
          boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {selectionView === 'plans' ? `Selected Plan: ${activePlan.name}` : 'Custom Configured Scope (Starts from $0)'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '4px 0' }}>
              <span style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', fontWeight: 700 }}>₦</span>
              <span style={{ fontSize: '2.6rem', fontWeight: 900, color: '#FFFFFF' }}>
                {activeDisplayNgn.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                / month (~${activeDisplayUsd.toLocaleString()} USD)
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>
              {selectionView === 'plans' 
                ? `Covers ${houseCount} ${managementMode === 'estate' ? 'houses in the estate' : 'rental units'} under the ${activePlan.name}.`
                : `Custom plan with ${Object.values(customSelectedServices).filter(Boolean).length} selected services for ${houseCount} ${managementMode === 'estate' ? 'houses' : 'units'}.`}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '0.86rem' }}
            >
              Order This Plan & Request Audit →
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                padding: '12px 20px',
                borderRadius: '4px',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Have Specific Custom Requirements? Contact Us
            </button>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          5. POP-UP MODAL: CONTACT US & REQUEST SPECIFIC REQUIREMENTS
          ══════════════════════════════════════════════════════════════════════ */}
      {isContactModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 10, 7, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            maxWidth: '620px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            border: '2px solid var(--accent)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Institutional Operations Desk
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                  Contact Us & Request Custom Proposal
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsContactModalOpen(false);
                  setContactSubmitted(false);
                }}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {!contactSubmitted ? (
              <form onSubmit={handleContactSubmit}>
                <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 16px', lineHeight: 1.5 }}>
                  Tell us specifically what you have in mind for your estate or property portfolio. Our accredited NIESV facility managers will conduct a site audit and send an itemized contract within 24 hours.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Olumide Adeleke"
                      value={contactData.fullName}
                      onChange={e => setContactData({ ...contactData, fullName: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Your Role *
                    </label>
                    <select
                      value={contactData.role}
                      onChange={e => setContactData({ ...contactData, role: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    >
                      <option>Estate Chairman / CDA Executive</option>
                      <option>Property Owner / Landlord</option>
                      <option>Diaspora Property Investor</option>
                      <option>Resident Facility Manager</option>
                      <option>Corporate Real Estate Director</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000"
                      value={contactData.phone}
                      onChange={e => setContactData({ ...contactData, phone: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={contactData.email}
                      onChange={e => setContactData({ ...contactData, email: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Estate / Property Name & Exact Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palms Gated Estate, Lekki Phase 1, Lagos"
                    value={contactData.estateName}
                    onChange={e => setContactData({ ...contactData, estateName: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    What specifically do you have in mind? Any custom specifications?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We have 75 duplexes. We want RFID boom gates, visitor QR passes, automated monthly diesel generator bills, and security reporting."
                    value={contactData.notes}
                    onChange={e => setContactData({ ...contactData, notes: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'var(--font-sans)' }}
                  />
                </div>

                <div style={{
                  backgroundColor: '#FAF9F6',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '12px',
                  marginBottom: '18px',
                  fontSize: '0.78rem'
                }}>
                  <div><strong>Mode:</strong> {managementMode === 'estate' ? 'Gated Estate Operations' : 'Single-Unit Landlord Management'}</div>
                  <div><strong>Scale:</strong> {houseCount} {managementMode === 'estate' ? 'Houses' : 'Units'}</div>
                  <div><strong>Quoted Estimate:</strong> ₦{activeDisplayNgn.toLocaleString()} / month (~${activeDisplayUsd} USD)</div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ flex: 1, padding: '12px 0', fontSize: '0.85rem' }}
                  >
                    Send Specifications & Schedule Site Audit →
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(false)}
                    style={{ padding: '12px 18px', border: '1px solid var(--border)', background: '#FFFFFF', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(26, 62, 38, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'var(--accent)' }}>
                  <Check size={32} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--accent)', margin: '0 0 10px' }}>
                  Custom Scope Received!
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: '0 0 20px' }}>
                  Thank you, <strong>{contactData.fullName}</strong>. A dedicated operations manager will reach you at <strong>{contactData.phone}</strong> and email the itemized proposal to <strong>{contactData.email}</strong>.
                </p>
                <button
                  onClick={() => {
                    setIsContactModalOpen(false);
                    setContactSubmitted(false);
                  }}
                  className="btn-primary"
                  style={{ padding: '10px 24px', fontSize: '0.82rem' }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
