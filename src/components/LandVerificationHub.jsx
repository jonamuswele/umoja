import React, { useState } from 'react';
import { 
  Compass, MapPin, FileText, ShieldCheck, AlertTriangle, 
  CheckCircle2, Layers, Search, UploadCloud, Check, X, 
  ArrowLeft, ChevronRight, Eye, Paperclip, Building2, 
  Navigation, Crosshair, ShieldAlert, FileCheck, AlertCircle, 
  Info, HelpCircle, Map, Maximize2, Zap, Calendar, 
  Phone, User, Download, BadgeCheck, Lock, Activity
} from 'lucide-react';
import { getStoredServices } from '../utils/userStorage';

// ══════════════════════════════════════════════════════════════════════
// DATA & MOCK REGISTRIES
// ══════════════════════════════════════════════════════════════════════
const REGISTRIES = [
  {
    state: 'Lagos State',
    agencies: [
      { name: 'Lands Bureau Alausa (Ikeja)', desc: "Custodians of State Titles, Governor's Consent & C of O Dockets" },
      { name: 'Office of the State Surveyor General (OSSG)', desc: 'Chartings, Red Copy Surveys, Cadastral Maps & Coordinate Databases' },
      { name: 'LASPPPA (Physical Planning Authority)', desc: 'Zoning approvals, layout schemes, road setbacks & master plans' }
    ],
    searchTurnaround: '48 Hours',
    coverage: '100% Digital & Physical Archives'
  },
  {
    state: 'Federal Capital Territory (Abuja)',
    agencies: [
      { name: 'AGIS (Abuja Geographic Information Systems)', desc: 'Cadastral search, R of O, C of O verification & leasehold registers' },
      { name: 'FCDA Land Administration Department', desc: 'Allocation confirmation, file search & developmental compliance' }
    ],
    searchTurnaround: '48 - 72 Hours',
    coverage: 'Central Cadastral & Area Councils'
  },
  {
    state: 'Ogun State',
    agencies: [
      { name: 'Bureau of Lands and Survey (Oke-Mosan, Abeokuta)', desc: 'Ogun GIS, C of O verification, Gazette charting & industrial corridors' },
      { name: "State Surveyor General's Office", desc: 'Boundary records for Mowe, Ibafo, Sagamu, Ota & border frontiers' }
    ],
    searchTurnaround: '48 - 72 Hours',
    coverage: 'Border & Industrial Corridors'
  },
  {
    state: 'Other 33 States (Rivers, Oyo, Edo, Enugu, etc.)',
    agencies: [
      { name: 'State Ministries of Lands & Deeds Registries', desc: 'Direct physical search at state land archives with licensed state solicitors' },
      { name: 'State Cadastral Survey Offices', desc: 'Beacon cross-referencing and communal excision boundary check' }
    ],
    searchTurnaround: '3 - 5 Business Days',
    coverage: 'Nationwide Field Network'
  }
];

const ENCROACHMENT_CORRIDORS = [
  {
    corridor: 'Coastal Highway & Marine Setbacks',
    location: 'Lagos to Calabar Coastal Corridor / Atlantic Shoreline',
    riskLevel: 'HIGH ALERT',
    riskColor: '#EF4444',
    setbackRule: '50m - 100m from high-water mark or highway alignment',
    demolitionRisk: 'Immediate Demolition for committed alignment encroachment',
    guidance: 'Ensure land coordinates are at least 150m clear of the certified Right of Way (RoW).'
  },
  {
    corridor: 'TCN High-Tension Transmission Corridors',
    location: 'Nationwide Power Grid (330kV & 132kV Lines)',
    riskLevel: 'CRITICAL HAZARD',
    riskColor: '#EF4444',
    setbackRule: '50m buffer (25m each side) for 330kV; 30m buffer for 132kV',
    demolitionRisk: 'Structures marked for instant demolition; safety hazard',
    guidance: 'No registered title or building plan approval can be legally issued directly under high-tension power lines.'
  },
  {
    corridor: 'Canal Setbacks & Primary Drainage Basins',
    location: 'Urban Drainages (System 63, Osapa Canal, Alimosho Drainage, etc.)',
    riskLevel: 'HIGH ALERT',
    riskColor: '#F59E0B',
    setbackRule: '15m to 25m clearance from channel banks',
    demolitionRisk: 'Demolition during Ministry of Environment flood mitigation drives',
    guidance: 'Check LASPPPA / Environment canal alignment charts before buying low-lying land.'
  },
  {
    corridor: 'Regional Road & 4th Mainland Bridge Setback',
    location: 'Lekki - Epe Expressway, Ajah, Abraham Adesanya & Badore Axis',
    riskLevel: 'MODERATE / CAUTION',
    riskColor: '#F59E0B',
    setbackRule: 'Varies by gazetted alignment (approx. 60m - 90m)',
    demolitionRisk: 'Compulsory acquisition without compensation if built without valid title prior to alignment',
    guidance: 'Must conduct coordinate charting at OSSG Alausa to confirm plot does not touch the alignment.'
  },
  {
    corridor: 'Agricultural Reserve & Committed Forest Reserves',
    location: 'Epe, Ibeju-Lekki, Sagamu, Ikorodu outskirts',
    riskLevel: 'HIGH RISK',
    riskColor: '#EF4444',
    setbackRule: 'State reserve - Non-excised government property',
    demolitionRisk: 'No private ownership recognized; regularisation may be rejected',
    guidance: 'Avoid buying plots in un-excised reserves even if village head offers family receipt.'
  }
];

const PACKAGES = [
  {
    id: 'fast-charting',
    name: 'Fast GIS Charting & Coordinate Check',
    tagline: 'Ideal for initial quick screening before putting down earnest deposit',
    priceNGN: '₦45,000',
    priceUSD: '$30',
    turnaround: '24 - 48 Hours',
    badge: 'Quick Screening',
    features: [
      'Digital coordinate extraction (Minna Datum & WGS84)',
      'Office of the Surveyor General (OSSG) GIS charting',
      'Government committed acquisition status check',
      'Road / drainage / high-tension setback check',
      'Official preliminary Charting Status Report (PDF)'
    ]
  },
  {
    id: 'full-diligence',
    name: 'Full Due Diligence & Registry Search',
    tagline: 'Comprehensive legal & institutional verification before finalizing land purchase',
    priceNGN: '₦125,000',
    priceUSD: '$85',
    turnaround: '48 - 72 Hours',
    popular: true,
    badge: 'Most Popular & Recommended',
    features: [
      'Everything in Fast GIS Charting',
      'Physical file search at State Lands Bureau (Alausa / AGIS / Ogun)',
      'Underlying title verification (C of O / Gazette / Consent authenticity)',
      'Mortgage & bank encumbrance search (AMCON / Commercial Banks)',
      'Lis Pendens search (Pending court litigation & family disputes)',
      'Historical ownership chain audit (Original allottee to current vendor)',
      'Official Legal Due Diligence Certificate signed by Accredited Solicitor'
    ]
  },
  {
    id: 'field-survey',
    name: 'On-Site Field Survey & Boundary Pegging',
    tagline: 'Physical on-ground surveyor deployment with high-precision RTK GPS',
    priceNGN: '₦185,000',
    priceUSD: '$125',
    turnaround: '3 - 5 Business Days',
    badge: 'Total Field Protection',
    features: [
      'Everything in Full Due Diligence & Registry Search',
      'Licensed NIS Surveyor dispatched to physical plot site',
      'High-precision RTK GPS beacon picking & physical pillar verification',
      'Perimeter boundary mapping & area calculation (Sqm / Acres / Hectares)',
      'Discrepancy check: physical boundary fence vs registered plan',
      'Neighbor encroachment audit (verifying neighbors have not shaved land)',
      'Photographic site inspection dossier with GPS timestamp stamps'
    ]
  }
];

export default function LandVerificationHub({ onBackToHub, customService }) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('survey-upload');

  // Real-time stored service subscriptions and settings
  const storedServices = getStoredServices();
  const lvService = customService || storedServices.find(s => s.id === 'land-verification');
  const storedSubs = lvService?.subscriptions || [];

  const dynamicPackages = PACKAGES.map(basePkg => {
    const override = storedSubs.find(s => 
      s.id === basePkg.id || 
      (s.id === 'plan-lv-basic' && basePkg.id === 'fast-charting') ||
      (s.id === 'plan-lv-standard' && basePkg.id === 'full-diligence') ||
      (s.id === 'plan-lv-deep' && basePkg.id === 'field-survey') ||
      s.name?.toLowerCase().includes(basePkg.name.toLowerCase().slice(0, 8))
    );
    if (!override) return basePkg;
    return {
      ...basePkg,
      name: override.name || basePkg.name,
      badge: override.badge || basePkg.badge,
      tagline: override.shortDesc || basePkg.tagline,
      priceNGN: override.priceNgn != null ? `₦${override.priceNgn.toLocaleString()}` : basePkg.priceNGN,
      priceUSD: override.priceUsd != null ? `$${override.priceUsd}` : basePkg.priceUSD,
      features: (override.offerings && override.offerings.length > 0) ? override.offerings : basePkg.features
    };
  });

  // Survey Plan Upload state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [beaconInput, setBeaconInput] = useState({
    state: 'Lagos',
    lga: 'Ibeju-Lekki',
    town: 'Eleko / Coastal Road Axis',
    planNumber: 'OG/2021/LS/9844',
    surveyorName: 'Surv. Babatunde Adeyemi (fnis)',
    p1: 'SC/LA/9410A',
    p2: 'SC/LA/9410B',
    p3: 'SC/LA/9410C',
    p4: 'SC/LA/9410D',
    eastings: '592314.82',
    northings: '714209.15'
  });
  const [surveyAuditResult, setSurveyAuditResult] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  // Title Verification state
  const [titleForm, setTitleForm] = useState({
    claimedTitle: 'co-fo',
    fileNumber: 'No. 42 Page 42 in Volume 2019A',
    granteeName: 'Chief Olumide Adeleke & Co.',
    stateBureau: 'Lagos Alausa Lands Bureau'
  });
  const [titleAnalysis, setTitleAnalysis] = useState(null);

  // Boundary Mapping interactive shape
  const [plotShape, setPlotShape] = useState('standard'); // standard, corner, double

  // Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(PACKAGES[1]);
  const [bookingFormData, setBookingFormData] = useState({
    buyerName: '',
    buyerPhone: '',
    buyerEmail: '',
    propertyLocation: '',
    claimedTitle: "C of O / Governor's Consent",
    preferredDate: '',
    specialInstructions: ''
  });
  const [bookingSuccessPass, setBookingSuccessPass] = useState(null);

  // Sample Loader for Survey
  const loadSampleSurvey = (type) => {
    if (type === 'lekki') {
      setBeaconInput({
        state: 'Lagos',
        lga: 'Eti-Osa',
        town: 'Lekki Phase 1, Off Admiralty',
        planNumber: 'LA/2018/SURV/5129',
        surveyorName: 'Surv. E. O. Johnson (mnis)',
        p1: 'BC/ET/8921A',
        p2: 'BC/ET/8921B',
        p3: 'BC/ET/8921C',
        p4: 'BC/ET/8921D',
        eastings: '574102.40',
        northings: '712950.80'
      });
      setUploadedFile({ name: 'Lekki_Phase1_RedCopy_Survey_Plan.pdf', size: '2.4 MB' });
    } else {
      setBeaconInput({
        state: 'Lagos',
        lga: 'Ibeju-Lekki',
        town: 'Ibeju Coastal Road, Eleko Corridor',
        planNumber: 'LS/2022/IBJ/7702',
        surveyorName: 'Surv. Adeleke Ibrahim (fnis)',
        p1: 'SC/IB/3310A',
        p2: 'SC/IB/3310B',
        p3: 'SC/IB/3310C',
        p4: 'SC/IB/3310D',
        eastings: '601420.10',
        northings: '715600.40'
      });
      setUploadedFile({ name: 'Ibeju_Coastal_Land_Survey.jpg', size: '1.8 MB' });
    }
    setSurveyAuditResult(null);
  };

  // Run Automated Survey Scan
  const handleRunSurveyAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setSurveyAuditResult({
        status: beaconInput.town.includes('Coastal') ? 'CAUTION' : 'CLEAR',
        confidenceScore: '96.8%',
        closureStatus: 'Perfect Geometric Closure (0.002m tolerance)',
        totalArea: plotShape === 'double' ? '1,320.00 sqm (2.0 Standard Plots)' : '654.20 sqm (1.0 Standard Plot)',
        datum: 'Minna Datum / UTM Zone 31N',
        acquisitionAlert: beaconInput.town.includes('Coastal') 
          ? 'Proximity Alert: Plot is located 140m from the planned Coastal Highway realignment zone. Needs strict OSSG Alausa beacon confirmation before deposit.' 
          : 'Completely FREE from committed acquisition. Zone is categorized as Mixed Residential by LASPPPA.',
        sealCheck: 'Registered Red Copy Surveyor-General seal signature verified on file.'
      });
    }, 800);
  };

  // Run Title Verification Analysis
  const handleRunTitleAnalysis = () => {
    const isCofO = titleForm.claimedTitle === 'co-fo';
    const isGazette = titleForm.claimedTitle === 'gazette';
    const isFreehold = titleForm.claimedTitle === 'freehold-receipt';

    setTitleAnalysis({
      type: titleForm.claimedTitle,
      rating: isFreehold ? 'EXTREME HIGH RISK' : (isCofO ? 'TIER 1 PRISTINE TITLE' : 'TIER 2 CONDITIONAL TITLE'),
      ratingColor: isFreehold ? '#EF4444' : (isCofO ? '#10B981' : '#F59E0B'),
      legalValidity: isFreehold 
        ? "No Legal State Ownership. A family receipt or deed of purchase from local land-owners (Omo-Onile) conveys ZERO legal title under the Land Use Act 1978 without state excision or Governor's consent."
        : (isCofO 
            ? 'Highest State Legal Title. Granted directly by the State Governor for 99 years. Grants exclusive statutory right of occupancy.'
            : 'Gazetted Excision. The land was officially cut out from state acquisition and granted to the host community. Must confirm if individual plot falls inside the excised polygon.'),
      requirementsToConfirm: isCofO 
        ? ['Verify Volume, Page and Number in the Alausa / AGIS physical register', 'Confirm original allottee identity vs current seller', "Confirm no outstanding governor's consent mortgages lodged against file"]
        : (isGazette 
            ? ['Check Gazette Notice Number and Excision Survey Plan number', 'Chart beacon coordinates against excised boundary coordinates', 'Verify if current seller possesses genuine Deed of Assignment from accredited family chiefs']
            : ['Immediate on-site survey charting required at Alausa OSSG', 'Demand root of title documentation', 'Do NOT pay earnest money or sign purchase receipts until verified']),
      warningSigns: [
        'Counterfeit C of O stamp: Ensure physical volume exists in the basement archives, not just a laminated colored printout.',
        'Deceased owner: If the registered title holder is deceased, the seller MUST present Letters of Administration or Probate from the High Court.',
        'AMCON / Bank caveat: Many prime plots were mortgaged to banks; our registry search checks the encumbrance register.'
      ]
    });
  };

  // Open modal with specific package
  const openBookingModal = (pkg) => {
    setSelectedPkg(pkg);
    setIsBookingModalOpen(true);
  };

  // Submit booking
  const handleBookSubmit = (e) => {
    e.preventDefault();
    const passId = 'UMOJA-LV-' + Math.floor(100000 + Math.random() * 900000);
    setBookingSuccessPass({
      passId,
      package: selectedPkg.name,
      price: selectedPkg.priceNGN,
      buyerName: bookingFormData.buyerName || 'Valued Land Buyer',
      propertyLocation: bookingFormData.propertyLocation || (beaconInput.town + ', ' + beaconInput.state),
      leadSurveyor: 'Surv. Emmanuel Balogun, FNIS (Reg. No. 1428/NIS)',
      leadSolicitor: 'Barr. Folashade Adeleke, SAN (NBA Reg. No. 049811)',
      turnaround: selectedPkg.turnaround,
      dateGenerated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
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
          Land &amp; Government Title Verification
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
          background: lvService?.heroImage 
            ? `linear-gradient(180deg, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.96)), url(${lvService.heroImage})`
            : 'radial-gradient(ellipse at top right, rgba(217, 119, 6, 0.15), rgba(15, 23, 42, 0.8) 70%), linear-gradient(180deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          border: `1px solid ${lvService?.badgeColor ? `${lvService.badgeColor}40` : 'rgba(245, 158, 11, 0.25)'}`,
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
              background: 'rgba(245, 158, 11, 0.15)',
              border: `1px solid ${lvService?.badgeColor ? `${lvService.badgeColor}66` : 'rgba(245, 158, 11, 0.3)'}`,
              color: lvService?.badgeColor || '#FBBF24',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <BadgeCheck size={14} /> {lvService?.badgeText || "Certified NIS Chartered Surveyor & Lands Bureau Network"}
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
              100% Zero Demolition Record
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            letterSpacing: '-0.03em',
            color: lvService?.textColor || '#FFFFFF',
            maxWidth: '820px',
            marginBottom: '14px'
          }}>
            {lvService?.heroHeadline || (
              <>Never Buy Land Blindly. <span style={{ color: lvService?.badgeColor || '#FBBF24' }}>Verify Every Beacon &amp; Title</span> Before You Pay.</>
            )}
          </h1>

          <p style={{
            fontSize: '1.02rem',
            lineHeight: 1.6,
            color: lvService?.subtitleColor || '#CBD5E1',
            maxWidth: '780px',
            marginBottom: '26px'
          }}>
            {lvService?.heroSubtitle || "Protect your life savings from Omo-Onile scams, committed government highway acquisitions, fake C of O stamps, and boundary trespassers. Upload a survey plan or beacon IDs to run automated GIS checks, book physical Lands Bureau searches, and map exact coordinates."}
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
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FBBF24' }}>4,200+</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Plots Charted &amp; Verified</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#EF4444' }}>520+</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Fraudulent Plots &amp; Scams Intercepted</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#10B981' }}>48 - 72 hrs</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Official Registry Search Turnaround</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '12px 16px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#60A5FA' }}>36 States</div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Lagos Alausa, AGIS Abuja &amp; Nationwide</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          5 CORE FEATURE TABS (SNAPS TO TOP ON SCROLL)
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '8px',
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '6px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
          {[
            { id: 'survey-upload', label: '1. Survey Plan Upload', icon: UploadCloud, subtitle: 'Scan & Beacon Audit' },
            { id: 'title-verification', label: '2. Title Verification', icon: FileCheck, subtitle: 'C of O, Gazette & Root' },
            { id: 'registry-checks', label: '3. Registry Checks', icon: Building2, subtitle: 'Alausa & AGIS Search' },
            { id: 'boundary-mapping', label: '4. Boundary Mapping', icon: Crosshair, subtitle: 'GIS Coordinates & Area' },
            { id: 'encroachment-alerts', label: '5. Encroachment Alerts', icon: ShieldAlert, subtitle: 'Setback & Risk Radar' },
            { id: 'pricing-packages', label: 'Verification Passes', icon: ShieldCheck, subtitle: 'Transparent Packages' }
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
                  boxShadow: isActive ? '0 4px 12px rgba(217, 119, 6, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? '#FFF' : '#CBD5E1',
                  flexShrink: 0
                }}>
                  <Icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isActive ? '#FFF' : '#E2E8F0', whiteSpace: 'nowrap' }}>
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
          MAIN CONTENT AREA BASED ON TAB
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1280px',
        margin: '24px auto 0',
        padding: '0 4%'
      }}>

        {/* ───────────────────────────────────────────────────────────────
            TAB 1: SURVEY PLAN UPLOAD & BEACON AUDIT
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'survey-upload' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Explanatory banner */}
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
                <UploadCloud size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Upload Survey Plan (Red Copy) or Enter Beacon Numbers
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Every registered land parcel has unique beacon pillars (e.g. <code>SC/LA/9410A</code>) mapped on a Registered Red Copy Survey. Upload the photo or PDF provided by your agent/seller, or enter the beacon numbers below to check for red flags, coordinate closure, and surveyor seal validity.
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => loadSampleSurvey('lekki')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#F8FAFC',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    • Load Sample Lekki Phase 1 Survey
                  </button>
                  <button
                    onClick={() => loadSampleSurvey('coastal')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: 'rgba(245, 158, 11, 0.15)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      color: '#FBBF24',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    • Load Sample Ibeju Coastal Axis (High Risk Area)
                  </button>
                </div>
              </div>
            </div>

            {/* Two Column Grid: Upload Zone + Manual Beacon Entry */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '24px'
            }}>
              {/* Option A: File Drag & Drop / Upload */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.4)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>
                    Method 1: Upload Scanned Plan or Photo
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>PDF, JPG, PNG up to 25MB</span>
                </div>

                <label style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '36px 20px',
                  borderRadius: '12px',
                  border: '2px dashed rgba(245, 158, 11, 0.4)',
                  background: uploadedFile ? 'rgba(245, 158, 11, 0.05)' : 'rgba(15, 23, 42, 0.4)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}>
                  <input
                    type="file"
                    accept=".pdf,image/png,image/jpeg,image/jpg"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const f = e.target.files[0];
                        setUploadedFile({ name: f.name, size: (f.size / (1024 * 1024)).toFixed(1) + ' MB' });
                        setSurveyAuditResult(null);
                      }
                    }}
                  />
                  {uploadedFile ? (
                    <>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(16, 185, 129, 0.2)',
                        color: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px'
                      }}>
                        <FileCheck size={26} />
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '4px' }}>
                        {uploadedFile.name}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginBottom: '12px' }}>
                        {uploadedFile.size} • Ready for automated coordinate verification
                      </div>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#FBBF24',
                        textDecoration: 'underline'
                      }}>
                        Click to replace with a different file
                      </span>
                    </>
                  ) : (
                    <>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'rgba(245, 158, 11, 0.12)',
                        color: '#FBBF24',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px'
                      }}>
                        <UploadCloud size={24} />
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F8FAFC', marginBottom: '4px' }}>
                        Drag &amp; drop Survey Plan or Browse Files
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94A3B8', maxWidth: '280px', lineHeight: 1.4 }}>
                        Upload red copy survey plan showing beacon numbers, surveyor seal, and boundary coordinates.
                      </div>
                    </>
                  )}
                </label>

                {/* Checklist guide */}
                <div style={{ marginTop: '18px', background: 'rgba(15, 23, 42, 0.4)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '8px' }}>
                    What to look for on a genuine Red Copy:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.76rem', color: '#94A3B8', lineHeight: 1.6 }}>
                    <li>Red bordered frame and red beacon coordinates (mandated by OSSG).</li>
                    <li>Surveyor's personal seal (Institution of Surveyors - NIS).</li>
                    <li>Plan Number indicating State, Year, and Cadastral reference.</li>
                    <li>Lodgement record at the State Surveyor General's office.</li>
                  </ul>
                </div>
              </div>

              {/* Option B: Manual Beacon Numbers & Survey Data */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.4)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>
                    Method 2: Enter Beacon IDs &amp; Surveyor Info
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#FBBF24' }}>Instant Geometric Check</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>State</label>
                    <input
                      type="text"
                      value={beaconInput.state}
                      onChange={(e) => setBeaconInput({ ...beaconInput, state: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>LGA / Area</label>
                    <input
                      type="text"
                      value={beaconInput.lga}
                      onChange={(e) => setBeaconInput({ ...beaconInput, lga: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Town / Axis / Neighborhood</label>
                  <input
                    type="text"
                    value={beaconInput.town}
                    onChange={(e) => setBeaconInput({ ...beaconInput, town: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#FFF',
                      fontSize: '0.84rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Survey Plan Number</label>
                    <input
                      type="text"
                      value={beaconInput.planNumber}
                      onChange={(e) => setBeaconInput({ ...beaconInput, planNumber: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Surveyor's Name &amp; NIS Seal</label>
                    <input
                      type="text"
                      value={beaconInput.surveyorName}
                      onChange={(e) => setBeaconInput({ ...beaconInput, surveyorName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                </div>

                {/* 4 Beacon Pillars */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.74rem', color: '#CBD5E1', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                    Boundary Beacons (Pillars on Ground)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Pillar 1</span>
                      <input
                        type="text"
                        value={beaconInput.p1}
                        onChange={(e) => setBeaconInput({ ...beaconInput, p1: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FBBF24',
                          fontSize: '0.76rem',
                          fontWeight: 600
                        }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Pillar 2</span>
                      <input
                        type="text"
                        value={beaconInput.p2}
                        onChange={(e) => setBeaconInput({ ...beaconInput, p2: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FBBF24',
                          fontSize: '0.76rem',
                          fontWeight: 600
                        }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Pillar 3</span>
                      <input
                        type="text"
                        value={beaconInput.p3}
                        onChange={(e) => setBeaconInput({ ...beaconInput, p3: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FBBF24',
                          fontSize: '0.76rem',
                          fontWeight: 600
                        }}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>Pillar 4</span>
                      <input
                        type="text"
                        value={beaconInput.p4}
                        onChange={(e) => setBeaconInput({ ...beaconInput, p4: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          background: 'rgba(15, 23, 42, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#FBBF24',
                          fontSize: '0.76rem',
                          fontWeight: 600
                        }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRunSurveyAudit}
                  disabled={isAuditing}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #D97706, #B45309)',
                    border: 'none',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.3)'
                  }}
                >
                  {isAuditing ? (
                    <>
                      <Activity size={18} className="animate-spin" /> Cross-referencing OSSG Cadastral Database...
                    </>
                  ) : (
                    <>
                      <Crosshair size={18} /> Run Automated Survey &amp; Beacon Audit
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Survey Audit Result Card */}
            {surveyAuditResult && (
              <div style={{
                background: surveyAuditResult.status === 'CLEAR' 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.8))'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(15, 23, 42, 0.8))',
                borderRadius: '16px',
                border: surveyAuditResult.status === 'CLEAR' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.4)',
                padding: '28px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.35)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: surveyAuditResult.status === 'CLEAR' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: surveyAuditResult.status === 'CLEAR' ? '#34D399' : '#F87171',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {surveyAuditResult.status === 'CLEAR' ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF' }}>
                        Automated Survey Audit: {surveyAuditResult.status === 'CLEAR' ? 'COORDINATES CLEAN' : 'CRITICAL SETBACK PROXIMITY ALERT'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                        Confidence Index: {surveyAuditResult.confidenceScore} • Geodetic Projection: {surveyAuditResult.datum}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingModal(PACKAGES[1])}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#FFF',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Request Official Chartered Search
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '14px',
                  marginBottom: '18px'
                }}>
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '12px 14px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Calculated Ground Area</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#FBBF24' }}>{surveyAuditResult.totalArea}</div>
                  </div>
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '12px 14px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Boundary Closure Accuracy</div>
                    <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#34D399' }}>{surveyAuditResult.closureStatus}</div>
                  </div>
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '12px 14px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Surveyor Seal &amp; Lodgement</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>{surveyAuditResult.sealCheck}</div>
                  </div>
                </div>

                <div style={{
                  background: surveyAuditResult.status === 'CLEAR' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.1)',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  borderLeft: surveyAuditResult.status === 'CLEAR' ? '4px solid #10B981' : '4px solid #EF4444',
                  fontSize: '0.85rem',
                  color: '#E2E8F0',
                  lineHeight: 1.5
                }}>
                  <strong>Acquisition &amp; Setback Finding:</strong> {surveyAuditResult.acquisitionAlert}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 2: TITLE VERIFICATION (C of O, Gazette, Excision, Consent)
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'title-verification' && (
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
                <FileCheck size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Verify Land Title: Certificate of Occupancy, Gazette, Excision &amp; Governor's Consent
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Under the statutory Land Use Act, all land in each state is vested in the State Governor. Without a genuine, unencumbered state title, private purchases from local informal channels remain in extreme jeopardy of demolition or uncompensated takeover. Select the seller's claimed title below to inspect its true legal strength.
                </p>
              </div>
            </div>

            {/* Interactive Title Checker Card */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '28px'
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '16px' }}>
                Step 1: What Title is the Seller Claiming?
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
              }}>
                {[
                  { id: 'co-fo', label: 'Certificate of Occupancy (C of O)', badge: 'Pristine Title (99 Yrs)', tier: 'Tier 1' },
                  { id: 'gov-consent', label: "Governor's Consent", badge: 'Mandatory on Resale', tier: 'Tier 1' },
                  { id: 'gazette', label: 'Official Gazette / Excision', badge: 'Community Excision', tier: 'Tier 2' },
                  { id: 'deed-court', label: 'Court Judgement / Supreme Court', badge: 'Legal Vindication', tier: 'Tier 2' },
                  { id: 'freehold-receipt', label: 'Freehold / Family Receipt Only', badge: 'High Risk (No State Title)', tier: 'Dangerous' }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setTitleForm({ ...titleForm, claimedTitle: item.id })}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      background: titleForm.claimedTitle === item.id ? 'rgba(217, 119, 6, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                      border: titleForm.claimedTitle === item.id ? '2px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: item.id === 'freehold-receipt' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                        color: item.id === 'freehold-receipt' ? '#F87171' : '#34D399'
                      }}>
                        {item.tier}
                      </span>
                      {titleForm.claimedTitle === item.id && <Check size={16} color="#F59E0B" />}
                    </div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#FFF', marginBottom: '4px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{item.badge}</div>
                  </div>
                ))}
              </div>

              {/* Title Details Inputs */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '14px' }}>
                  Step 2: Enter Title Reference Numbers for Lands Bureau Cross-Checking
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                      State Lands Bureau / Registry
                    </label>
                    <input
                      type="text"
                      value={titleForm.stateBureau}
                      onChange={(e) => setTitleForm({ ...titleForm, stateBureau: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                      Title Registration Number (e.g. No. 42 Page 42 Vol. 2019A)
                    </label>
                    <input
                      type="text"
                      value={titleForm.fileNumber}
                      onChange={(e) => setTitleForm({ ...titleForm, fileNumber: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.74rem', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
                      Registered Owner / Grantee Name on Title
                    </label>
                    <input
                      type="text"
                      value={titleForm.granteeName}
                      onChange={(e) => setTitleForm({ ...titleForm, granteeName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#FFF',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleRunTitleAnalysis}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  border: 'none',
                  color: '#FFF',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                }}
              >
                <Search size={16} /> Analyze Legal Title Strength &amp; Verification Protocol
              </button>
            </div>

            {/* Title Analysis Output */}
            {titleAnalysis && (
              <div style={{
                background: 'rgba(30, 41, 59, 0.6)',
                borderRadius: '16px',
                border: `1px solid ${titleAnalysis.ratingColor}`,
                padding: '26px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: titleAnalysis.ratingColor + '25',
                      color: titleAnalysis.ratingColor,
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      marginBottom: '6px'
                    }}>
                      {titleAnalysis.rating}
                    </span>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                      Legal Ownership Assessment: {titleForm.fileNumber}
                    </h4>
                  </div>

                  <button
                    onClick={() => openBookingModal(PACKAGES[1])}
                    style={{
                      padding: '9px 18px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                      border: 'none',
                      color: '#0F172A',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    Conduct Official Alausa Physical Title Search
                  </button>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '20px' }}>
                  {titleAnalysis.legalValidity}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '16px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34D399', marginBottom: '8px' }}>
                      Mandatory Verification Checks We Conduct:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                      {titleAnalysis.requirementsToConfirm.map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '16px', borderRadius: '10px' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F87171', marginBottom: '8px' }}>
                      Red Flags to Watch Out For:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                      {titleAnalysis.warningSigns.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 3: GOVERNMENT REGISTRY CHECKS (Alausa, AGIS, Ogun, etc.)
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'registry-checks' && (
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
                background: 'rgba(96, 165, 250, 0.15)',
                color: '#60A5FA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Building2 size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Government Registry Checks: Physical File &amp; Encumbrance Investigation
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Online search slips are not enough. Our accredited property solicitors and licensed search agents physically enter state land archives—such as Alausa Lands Bureau (Lagos), AGIS (Abuja), and Bureau of Lands (Ogun)—to inspect the physical paper jacket, verify bank mortgages, and inspect court caveats.
                </p>
              </div>
            </div>

            {/* 4 Pillars of a Registry Search */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px'
            }}>
              {[
                {
                  title: '1. Root of Title Tracking',
                  desc: "Traces the unbroken chain of ownership from original Governor's grant down to the current vendor, ensuring no severed legal link."
                },
                {
                  title: '2. Bank Mortgages & AMCON Caveats',
                  desc: 'Inspects whether the title was pledged as bank collateral or seized under an asset forfeiture order.'
                },
                {
                  title: '3. Lis Pendens (Active Lawsuits)',
                  desc: 'Searches the High Court registry to confirm the land is not under litigation, family estate disputes, or marital division.'
                },
                {
                  title: '4. Revocation for Public Interest',
                  desc: 'Confirms the state governor has not published an official Gazette notice revoking this parcel for public road or infrastructure works.'
                }
              ].map((pill, idx) => (
                <div key={idx} style={{
                  background: 'rgba(30, 41, 59, 0.4)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FBBF24', marginBottom: '8px' }}>
                    {pill.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.5 }}>
                    {pill.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Registry State Directory */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '28px'
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF', marginBottom: '16px' }}>
                Institutional Land Registry Coverage
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {REGISTRIES.map((reg, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(15, 23, 42, 0.5)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF' }}>{reg.state}</span>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'rgba(96, 165, 250, 0.15)',
                          color: '#60A5FA'
                        }}>
                          {reg.searchTurnaround}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                        {reg.agencies.map((agency, aIdx) => (
                          <div key={aIdx} style={{ fontSize: '0.78rem' }}>
                            <div style={{ fontWeight: 600, color: '#E2E8F0' }}>• {agency.name}</div>
                            <div style={{ color: '#94A3B8', fontSize: '0.72rem', paddingLeft: '10px' }}>{agency.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => openBookingModal(PACKAGES[1])}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#FFF',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Book Registry Search in {reg.state}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 4: BOUNDARY MAPPING & GIS CHARTING
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'boundary-mapping' && (
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
                <Crosshair size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Interactive Boundary Mapping &amp; Cadastral Coordinate Engine
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Cross-reference physical boundary pegs against digital GIS cadastre. Visualize plot polygons, inspect beacon distances and bearings, and verify exact plot square-meterage before making final payment.
                </p>
              </div>
            </div>

            {/* Interactive GIS Simulator Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '24px'
            }}>
              {/* SVG Coordinate Polygon Visualizer */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.7)',
                borderRadius: '16px',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#FFF' }}>
                      Cadastral Plot Polygon Visualizer
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                      UTM Zone 31N • Minna Datum Projection
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setPlotShape('standard')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: plotShape === 'standard' ? '#D97706' : 'rgba(255,255,255,0.06)',
                        border: 'none',
                        color: '#FFF',
                        cursor: 'pointer'
                      }}
                    >
                      Single (650m²)
                    </button>
                    <button
                      onClick={() => setPlotShape('corner')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: plotShape === 'corner' ? '#D97706' : 'rgba(255,255,255,0.06)',
                        border: 'none',
                        color: '#FFF',
                        cursor: 'pointer'
                      }}
                    >
                      Corner Piece
                    </button>
                    <button
                      onClick={() => setPlotShape('double')}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        background: plotShape === 'double' ? '#D97706' : 'rgba(255,255,255,0.06)',
                        border: 'none',
                        color: '#FFF',
                        cursor: 'pointer'
                      }}
                    >
                      Double (1,320m²)
                    </button>
                  </div>
                </div>

                {/* Simulated Cadastral Blueprint SVG */}
                <div style={{
                  width: '100%',
                  height: '280px',
                  background: 'radial-gradient(circle, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 1) 100%)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Grid background */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }} />

                  <svg width="320" height="240" viewBox="0 0 320 240" style={{ zIndex: 1 }}>
                    {/* Compass Rose */}
                    <g transform="translate(280, 40)">
                      <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
                      <line x1="0" y1="-14" x2="0" y2="14" stroke="#F59E0B" strokeWidth="2" />
                      <line x1="-14" y1="0" x2="14" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                      <polygon points="0,-14 -4,-2 4,-2" fill="#F59E0B" />
                      <text x="-4" y="-18" fill="#F59E0B" fontSize="9" fontWeight="bold">N</text>
                    </g>

                    {/* Polygon Boundary Shape */}
                    {plotShape === 'standard' && (
                      <g>
                        <polygon
                          points="60,60 240,60 240,180 60,180"
                          fill="rgba(217, 119, 6, 0.15)"
                          stroke="#F59E0B"
                          strokeWidth="2.5"
                          strokeDasharray="4 2"
                        />
                        {/* Beacons */}
                        <circle cx="60" cy="60" r="6" fill="#EF4444" />
                        <text x="35" y="55" fill="#FFF" fontSize="10" fontWeight="bold">P1</text>
                        <circle cx="240" cy="60" r="6" fill="#EF4444" />
                        <text x="248" y="55" fill="#FFF" fontSize="10" fontWeight="bold">P2</text>
                        <circle cx="240" cy="180" r="6" fill="#EF4444" />
                        <text x="248" y="195" fill="#FFF" fontSize="10" fontWeight="bold">P3</text>
                        <circle cx="60" cy="180" r="6" fill="#EF4444" />
                        <text x="35" y="195" fill="#FFF" fontSize="10" fontWeight="bold">P4</text>
                        {/* Center Area label */}
                        <text x="150" y="125" textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="bold">
                          654.20 m²
                        </text>
                        <text x="150" y="142" textAnchor="middle" fill="#94A3B8" fontSize="9">
                          1 Standard Plot (100% Closed)
                        </text>
                      </g>
                    )}

                    {plotShape === 'corner' && (
                      <g>
                        <polygon
                          points="60,60 210,60 250,110 210,180 60,180"
                          fill="rgba(16, 185, 129, 0.15)"
                          stroke="#10B981"
                          strokeWidth="2.5"
                        />
                        <circle cx="60" cy="60" r="6" fill="#EF4444" />
                        <circle cx="210" cy="60" r="6" fill="#EF4444" />
                        <circle cx="250" cy="110" r="6" fill="#EF4444" />
                        <circle cx="210" cy="180" r="6" fill="#EF4444" />
                        <circle cx="60" cy="180" r="6" fill="#EF4444" />
                        <text x="140" y="125" textAnchor="middle" fill="#A7F3D0" fontSize="12" fontWeight="bold">
                          742.80 m² (Corner)
                        </text>
                      </g>
                    )}

                    {plotShape === 'double' && (
                      <g>
                        <polygon
                          points="40,50 280,50 280,190 40,190"
                          fill="rgba(96, 165, 250, 0.15)"
                          stroke="#60A5FA"
                          strokeWidth="2.5"
                        />
                        <circle cx="40" cy="50" r="6" fill="#EF4444" />
                        <circle cx="280" cy="50" r="6" fill="#EF4444" />
                        <circle cx="280" cy="190" r="6" fill="#EF4444" />
                        <circle cx="40" cy="190" r="6" fill="#EF4444" />
                        <text x="160" y="125" textAnchor="middle" fill="#BFDBFE" fontSize="12" fontWeight="bold">
                          1,320.00 m² (2.0 Plots)
                        </text>
                      </g>
                    )}
                  </svg>
                </div>

                <div style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px',
                  fontSize: '0.74rem',
                  color: '#94A3B8'
                }}>
                  <span>Red dots: Registered Boundary Pillars</span>
                  <span style={{ color: '#FBBF24' }}>Geometric Closure: ±0.002m</span>
                </div>
              </div>

              {/* Coordinate Table & Distance Analysis */}
              <div style={{
                background: 'rgba(30, 41, 59, 0.4)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                    Beacon Coordinate &amp; Bearing Registry
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '14px' }}>
                    Bearings (angles) and ground distances between each beacon pillar:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(15, 23, 42, 0.5)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem'
                    }}>
                      <span style={{ fontWeight: 700, color: '#FFF' }}>P1 → P2 (Front Boundary)</span>
                      <span style={{ color: '#FBBF24', fontFamily: 'monospace' }}>89° 14' 22" • 18.29m (60ft)</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(15, 23, 42, 0.5)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem'
                    }}>
                      <span style={{ fontWeight: 700, color: '#FFF' }}>P2 → P3 (Right Flank)</span>
                      <span style={{ color: '#FBBF24', fontFamily: 'monospace' }}>179° 12' 40" • 36.58m (120ft)</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(15, 23, 42, 0.5)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem'
                    }}>
                      <span style={{ fontWeight: 700, color: '#FFF' }}>P3 → P4 (Rear Boundary)</span>
                      <span style={{ color: '#FBBF24', fontFamily: 'monospace' }}>269° 14' 10" • 18.30m (60ft)</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(15, 23, 42, 0.5)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem'
                    }}>
                      <span style={{ fontWeight: 700, color: '#FFF' }}>P4 → P1 (Left Flank)</span>
                      <span style={{ color: '#FBBF24', fontFamily: 'monospace' }}>359° 10' 05" • 36.57m (120ft)</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  borderLeft: '3px solid #F59E0B',
                  padding: '12px 14px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  color: '#CBD5E1',
                  marginBottom: '16px'
                }}>
                  <strong>On-Site Field Verification:</strong> Our licensed NIS surveyor travels to the plot with an RTK GPS rover to ensure neighbors haven't shifted beacons by a single centimeter.
                </div>

                <button
                  onClick={() => openBookingModal(PACKAGES[2])}
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #D97706, #B45309)',
                    border: 'none',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Navigation size={16} /> Book On-Ground Surveyor Field Pegging
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 5: ENCROACHMENT ALERTS (Setback & Risk Radar)
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'encroachment-alerts' && (
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
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#F87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldAlert size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFF', marginBottom: '6px' }}>
                  Encroachment &amp; Demolition Hazard Radar
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  Hundreds of houses are demolished every year across urban corridors because developers build inside government road expansions, high-tension power grid buffers, or drainage flood paths. Review the high-risk corridors below and request an official clearance report.
                </p>
              </div>
            </div>

            {/* List of Corridors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {ENCROACHMENT_CORRIDORS.map((c, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <AlertTriangle size={20} color={c.riskColor} />
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFF' }}>
                        {c.corridor}
                      </div>
                    </div>

                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: c.riskColor + '22',
                      color: c.riskColor,
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em'
                    }}>
                      {c.riskLevel}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                    <strong>Affected Areas:</strong> {c.location}
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '12px',
                    background: 'rgba(15, 23, 42, 0.4)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem'
                  }}>
                    <div>
                      <span style={{ color: '#94A3B8' }}>Mandatory Setback Buffer:</span>
                      <div style={{ color: '#FBBF24', fontWeight: 600, marginTop: '2px' }}>{c.setbackRule}</div>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8' }}>Demolition Consequence:</span>
                      <div style={{ color: '#F87171', fontWeight: 600, marginTop: '2px' }}>{c.demolitionRisk}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                    <strong>Surveyor Advice:</strong> {c.guidance}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(217, 119, 6, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#FFF' }}>
                  Is Your Target Land Within Any of These Corridors?
                </div>
                <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '2px' }}>
                  Our GIS Charting team verifies the exact setback coordinates against the State Master Plan.
                </div>
              </div>

              <button
                onClick={() => openBookingModal(dynamicPackages[0])}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  border: 'none',
                  color: '#0F172A',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                Run Encroachment Charting Check ({dynamicPackages[0]?.priceNGN || '₦45,000'})
              </button>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 6: PRICING PACKAGES & DIRECT BOOKING
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'pricing-packages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                {lvService?.heroHeadline || "Transparent Land Verification Passes"}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#94A3B8', margin: 0 }}>
                {lvService?.heroSubtitle || "Never rely on verbal assurances from agents or family elders. Choose a certified verification pass backed by a licensed NIS Surveyor and accredited Property Solicitor."}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {dynamicPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    background: pkg.popular 
                      ? 'linear-gradient(180deg, rgba(217, 119, 6, 0.15), rgba(30, 41, 59, 0.7) 30%)'
                      : 'rgba(30, 41, 59, 0.4)',
                    borderRadius: '16px',
                    border: pkg.popular ? '2px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: pkg.popular ? '0 10px 30px rgba(245, 158, 11, 0.2)' : 'none'
                  }}
                >
                  {pkg.popular && (
                    <span style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                      color: '#0F172A',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      Most Popular Pass
                    </span>
                  )}

                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FBBF24', marginBottom: '4px' }}>
                      {pkg.badge}
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF', marginBottom: '6px' }}>
                      {pkg.name}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#94A3B8', minHeight: '38px', lineHeight: 1.4, marginBottom: '18px' }}>
                      {pkg.tagline}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFF' }}>{pkg.priceNGN}</span>
                      <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>/ {pkg.priceUSD}</span>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: '#34D399', fontWeight: 600, marginBottom: '20px' }}>
                      • Turnaround Time: {pkg.turnaround}
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', marginBottom: '24px' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#CBD5E1', marginBottom: '12px' }}>
                        Features Included:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: '#E2E8F0' }}>
                            <Check size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingModal(pkg)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      background: pkg.popular 
                        ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
                        : 'rgba(255, 255, 255, 0.08)',
                      border: pkg.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: pkg.popular ? '#0F172A' : '#FFF',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: pkg.popular ? '0 4px 14px rgba(245, 158, 11, 0.35)' : 'none'
                    }}
                  >
                    Select {pkg.name.split(' ')[0]} Pass
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          BOOKING & VERIFICATION PASS GENERATION MODAL
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
                setBookingSuccessPass(null);
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

            {bookingSuccessPass ? (
              /* Verified Pass Output */
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34D399',
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
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#34D399'
                }}>
                  Verification Docket Registered
                </span>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF', margin: '8px 0 4px' }}>
                  Official Land Verification Pass Issued
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Pass ID: <strong style={{ color: '#FBBF24', fontFamily: 'monospace' }}>{bookingSuccessPass.passId}</strong>
                </div>

                {/* Printable / Docket Pass Card */}
                <div style={{
                  background: 'rgba(30, 41, 59, 0.7)',
                  borderRadius: '14px',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '20px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: '#E2E8F0',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Package Selected:</span>
                      <div style={{ fontWeight: 700, color: '#FFF' }}>{bookingSuccessPass.package}</div>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Pass Fee:</span>
                      <div style={{ fontWeight: 700, color: '#FBBF24' }}>{bookingSuccessPass.price}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Applicant Name:</span>
                    <div style={{ fontWeight: 600 }}>{bookingSuccessPass.buyerName}</div>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Target Property Location:</span>
                    <div style={{ fontWeight: 600 }}>{bookingSuccessPass.propertyLocation}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Assigned NIS Surveyor:</span>
                      <div style={{ fontSize: '0.76rem', color: '#93C5FD' }}>{bookingSuccessPass.leadSurveyor}</div>
                    </div>
                    <div>
                      <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>Assigned Legal Counsel:</span>
                      <div style={{ fontSize: '0.76rem', color: '#93C5FD' }}>{bookingSuccessPass.leadSolicitor}</div>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '20px' }}>
                  Our investigation team has dispatched physical dockets to the Lands Registry. Your verified certificate and GIS clearance report will be delivered within <strong>{bookingSuccessPass.turnaround}</strong>.
                </p>

                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    border: 'none',
                    color: '#FFF',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Done / Return to Verification Suite
                </button>
              </div>
            ) : (
              /* Booking Input Form */
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={20} color="#F59E0B" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#FBBF24', textTransform: 'uppercase' }}>
                    Certified Land Verification Order
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF', marginBottom: '4px' }}>
                  Reserve Your {selectedPkg.name}
                </h3>
                <div style={{ fontSize: '0.84rem', color: '#94A3B8', marginBottom: '18px' }}>
                  Standard Fee: <strong style={{ color: '#FFF' }}>{selectedPkg.priceNGN}</strong> ({selectedPkg.priceUSD}) • Turnaround: <strong>{selectedPkg.turnaround}</strong>
                </div>

                <form onSubmit={handleBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Jonathan Adeleke"
                      value={bookingFormData.buyerName}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, buyerName: e.target.value })}
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
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803 123 4567"
                        value={bookingFormData.buyerPhone}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, buyerPhone: e.target.value })}
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
                        Email (Report Delivery)
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="buyer@example.com"
                        value={bookingFormData.buyerEmail}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, buyerEmail: e.target.value })}
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
                      Land Address / Plot Description &amp; State
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2 Plots behind Lekki Free Trade Zone, Ibeju-Lekki, Lagos"
                      value={bookingFormData.propertyLocation}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, propertyLocation: e.target.value })}
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
                        Seller's Claimed Title
                      </label>
                      <select
                        value={bookingFormData.claimedTitle}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, claimedTitle: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: 'rgba(30, 41, 59, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#FFF',
                          fontSize: '0.84rem'
                        }}
                      >
                        <option value="C of O / Governor's Consent">C of O / Governor's Consent</option>
                        <option value="Government Gazette / Excision">Government Gazette / Excision</option>
                        <option value="Registered Survey Plan Only">Registered Survey Plan Only</option>
                        <option value="Family Receipt / Freehold Claim">Family Receipt / Freehold Claim</option>
                        <option value="Court Judgement / Supreme Court">Court Judgement / Supreme Court</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                        Preferred Inspection Date
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
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                      Survey Plan Upload / Beacon Numbers / Seller Phone
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Paste beacon numbers (e.g. SC/LA/9410A), survey plan number, or seller's contact info for physical pegging access..."
                      value={bookingFormData.specialInstructions}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, specialInstructions: e.target.value })}
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
                    <ShieldCheck size={18} /> Confirm Order &amp; Generate Land Pass ({selectedPkg.priceNGN})
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
