import React, { useState } from 'react';
import { 
  ArrowLeft, Banknote, Calendar, CheckCircle, ShieldCheck, UploadCloud, Paperclip, 
  TrendingUp, Calculator, Clock, CreditCard, ChevronRight, 
  User, Phone, MapPin, Check, Info, AlertCircle, FileText,
  DollarSign, ArrowUpRight, HelpCircle, X, AlertTriangle,
  Search, ShieldAlert, Sparkles, Sliders, Scale
} from 'lucide-react';
import { getStoredServices } from '../utils/userStorage';

export default function RealEstateFinancing({ onBackToHub, customService }) {
  const storedServices = getStoredServices();
  const finService = customService || (storedServices.find(s => s.id === 'financing') || {});
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' | 'analyze-external' | 'advisory-packages' | 'advice'

  // ══════════════════════════════════════════════════════════════════
  // 1. CALCULATOR STATE (FOR OUR PROPERTIES OR BENCHMARKING)
  // ══════════════════════════════════════════════════════════════════
  const [propertyPriceNgn, setPropertyPriceNgn] = useState(30000000); // 30 Million Naira
  const [selectedPlanId, setSelectedPlanId] = useState('plan-6mo'); // 'plan-outright', 'plan-6mo', 'plan-12mo', 'plan-mortgage'

  const PRESET_PRICES = [
    { label: '₦15 Million', val: 15000000 },
    { label: '₦30 Million', val: 30000000 },
    { label: '₦60 Million', val: 60000000 },
    { label: '₦120 Million', val: 12000000 }
  ];

  let downPaymentPct = selectedPlanId === 'plan-outright' ? 100 : (selectedPlanId === 'plan-6mo' ? 30 : (selectedPlanId === 'plan-12mo' ? 25 : 20));
  let monthsCount = selectedPlanId === 'plan-outright' ? 1 : (selectedPlanId === 'plan-6mo' ? 6 : (selectedPlanId === 'plan-12mo' ? 12 : 120));

  const downPaymentAmount = (propertyPriceNgn * downPaymentPct) / 100;
  const remainingBalance = propertyPriceNgn - downPaymentAmount;
  const monthlyInstallment = monthsCount > 1 ? Math.round(remainingBalance / (selectedPlanId === 'plan-mortgage' ? 120 : (monthsCount - 1))) : 0;

  const milestones6Mo = [
    { month: 'Month 1 (Initial)', pct: '30%', amount: downPaymentAmount, milestone: 'Commitment Deposit & Registered Survey Allocation', status: 'Immediate' },
    { month: 'Month 2', pct: '14%', amount: monthlyInstallment, milestone: 'Site Topography & Perimeter Beacon Stones Casting', status: 'Escrow Protected' },
    { month: 'Month 3', pct: '14%', amount: monthlyInstallment, milestone: 'DPC Foundation Slab & Sub-Structure Inspection', status: 'Escrow Protected' },
    { month: 'Month 4', pct: '14%', amount: monthlyInstallment, milestone: 'Super-Structure Blockwork & Decking Preparation', status: 'Escrow Protected' },
    { month: 'Month 5', pct: '14%', amount: monthlyInstallment, milestone: 'Roofing Truss & Exterior Plastering Verification', status: 'Escrow Protected' },
    { month: 'Month 6 (Final)', pct: '14%', amount: monthlyInstallment, milestone: 'Execution of Deed of Assignment & Keys Handover', status: 'Handover & Close' }
  ];

  const milestones12Mo = [
    { month: 'Month 1 (Initial)', pct: '25%', amount: downPaymentAmount, milestone: 'Contract of Sale Signing & Land Allocation', status: 'Immediate' },
    { month: 'Months 2 - 4', pct: '25%', amount: Math.round(propertyPriceNgn * 0.25 / 3), milestone: 'Foundation Excavation, Casting & DPC Completion', status: 'Milestone Verified' },
    { month: 'Months 5 - 8', pct: '25%', amount: Math.round(propertyPriceNgn * 0.25 / 4), milestone: 'Full Blockwork, Floor Decking & Roofing Stage', status: 'Milestone Verified' },
    { month: 'Months 9 - 11', pct: '15%', amount: Math.round(propertyPriceNgn * 0.15 / 3), milestone: 'Piping, Electrical 1st Fix, Plastering & Screeding', status: 'Milestone Verified' },
    { month: 'Month 12 (Final)', pct: '10%', amount: Math.round(propertyPriceNgn * 0.10), milestone: 'Final Finishing, Snagging Audit & Final Deed Delivery', status: 'Handover & Close' }
  ];

  const activeMilestones = selectedPlanId === 'plan-12mo' ? milestones12Mo : milestones6Mo;

  // ══════════════════════════════════════════════════════════════════
  // 2. EXTERNAL PAYMENT PLAN ANALYZER (RIP-OFF CHECKER)
  // ══════════════════════════════════════════════════════════════════
  const [extDeveloperName, setExtDeveloperName] = useState('');
  const [extPropertyPrice, setExtPropertyPrice] = useState('');
  const [extDepositDemanded, setExtDepositDemanded] = useState('50%');
  const [extDuration, setExtDuration] = useState('6 Months');
  const [extHiddenFeesMentioned, setExtHiddenFeesMentioned] = useState(false); // Infrastructure/Development levy
  const [extPriceEscalationMentioned, setExtPriceEscalationMentioned] = useState(false);
  const [extNotes, setExtNotes] = useState('');
  const [extFile, setExtFile] = useState(null); // Uploaded file object or mock
  const [inputMode, setInputMode] = useState('both'); // 'upload' | 'text' | 'both'
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [confirmedExternalReview, setConfirmedExternalReview] = useState(null);

  // ══════════════════════════════════════════════════════════════════
  // 3. PAID ADVISOR PACKAGES STATE
  // ══════════════════════════════════════════════════════════════════
  const [selectedAdvisorPackage, setSelectedAdvisorPackage] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [confirmedAdvisorBooking, setConfirmedAdvisorBooking] = useState(null);

  const ADVISOR_PACKAGES = [
    {
      id: 'pkg-quick-call',
      title: '30-Min Real Estate Financing Strategy Call',
      badge: 'Quick Assessment',
      priceNgn: 10000,
      priceUsd: 7,
      desc: 'Direct phone or WhatsApp video consultation with an accredited real estate finance advisor. Ask specific questions about mortgages, installment plans, or pricing fairness.',
      deliverables: [
        'Review of your target property price',
        'Mortgage vs developer installment recommendation',
        'Check for predatory hidden clauses',
        '30 minutes dedicated 1-on-1 time'
      ]
    },
    {
      id: 'pkg-full-audit',
      title: 'Full Personal Finance Audit & Buying Blueprint',
      badge: 'Most Popular for Buyers',
      priceNgn: 25000,
      priceUsd: 17,
      desc: 'A senior financial advisor takes you through everything. They look through your monthly net income, business cash flow, existing debt, and savings to design your exact custom buying plan.',
      deliverables: [
        'Complete look through your finances & cash flow',
        'Calculation of safe debt-to-income ratio (so you never default)',
        'Exact safe property price bracket recommendation',
        'Personal step-by-step savings & installment roadmap',
        'Written 4-page Personal Real Estate Buying Blueprint'
      ]
    },
    {
      id: 'pkg-concierge',
      title: 'Dedicated Real Estate Wealth Concierge & Escrow Guard',
      badge: 'End-to-End VIP Representation',
      priceNgn: 50000,
      priceUsd: 34,
      desc: 'For buyers and diaspora investors who want a personal finance guard accompanying their purchase from day one until the keys and title papers are handed over.',
      deliverables: [
        'Everything in Full Personal Finance Audit',
        'Vetting of all external developer payment plans before you sign',
        'Milestone construction inspection before payments are released',
        'Direct phone/WhatsApp access to senior wealth advisor for 6 months',
        'Escrow disbursement oversight'
      ]
    }
  ];

  const handleAdvisorSubmit = (e) => {
    e.preventDefault();
    const pkg = ADVISOR_PACKAGES.find(p => p.id === selectedAdvisorPackage) || ADVISOR_PACKAGES[1];
    const ref = `ADV-${Math.floor(100000 + Math.random() * 900000)}`;

    setConfirmedAdvisorBooking({
      ref,
      packageName: pkg.title,
      priceNgn: pkg.priceNgn,
      priceUsd: pkg.priceUsd,
      clientName,
      clientPhone,
      monthlyIncome,
      advisorName: 'Mr. Adeyemi Adeleke (Chartered Wealth & Mortgage Consultant)'
    });
  };

  const handleExternalSubmit = (e) => {
    e.preventDefault();
    const ref = `EXT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedExternalReview({
      ref,
      developerName: extDeveloperName || 'External Developer',
      propertyPrice: extPropertyPrice || '₦35,000,000',
      deposit: extDepositDemanded,
      duration: extDuration,
      fileName: extFile ? extFile.name : null,
      fileSize: extFile ? `${(extFile.size / 1024).toFixed(1)} KB` : null,
      feeNgn: 10000,
      feeUsd: 7
    });
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAF9F6', paddingBottom: '120px' }}>
      
      {/* ══════════════════════════════════════════════════════════════════
          1. TOP SUB-BAR
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
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
          Real Estate Financing &amp; Flexible Mortgages
        </h2>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          2. HERO BANNER
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#070C09',
        color: '#FFFFFF',
        padding: '44px 6% 50px',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: finService?.heroImage ? `linear-gradient(to right, rgba(7, 12, 9, 0.94) 0%, rgba(7, 12, 9, 0.8) 60%, rgba(7, 12, 9, 0.5) 100%), url(${finService.heroImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {!finService?.heroImage && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundImage: 'radial-gradient(circle at right, rgba(210, 125, 45, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
        )}

        <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(210, 125, 45, 0.2)', padding: '5px 12px', borderRadius: '4px', marginBottom: '14px', border: `1px solid ${finService?.badgeColor ? `${finService.badgeColor}66` : 'rgba(210, 125, 45, 0.35)'}` }}>
            <Banknote size={14} style={{ color: finService?.badgeColor || 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.74rem', color: finService?.badgeColor || 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {finService?.badgeText || "Real Estate Finance & Anti-Rip-Off Guard"}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.3rem',
            lineHeight: 1.18,
            margin: '0 0 12px',
            fontWeight: 700,
            color: finService?.textColor || '#FFFFFF'
          }}>
            {finService?.heroHeadline || "Real Estate Payment Plans & Financial Advisory"}
          </h1>

          <p style={{
            fontSize: '0.94rem',
            color: finService?.subtitleColor || 'rgba(255, 255, 255, 0.82)',
            maxWidth: '780px',
            lineHeight: 1.6,
            margin: '0 0 24px',
            fontWeight: 300
          }}>
            {finService?.heroSubtitle || "Whether you are buying from us or from any outside developer or agent, we make sure you do not get ripped off. Speak to an accredited financial advisor to look through your finances and guide you step-by-step, test our benchmark payment plans, or submit an outside payment plan for our analysts to evaluate if it is fair."}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          STICKY FEATURE NAVIGATION TABS (SNAPS TO TOP ON SCROLL)
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'sticky',
        top: '75px',
        zIndex: 900,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        padding: '10px 6%'
      }}>
        <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { id: 'calculator', label: '📊 Installment Calculator & Benchmark Plans' },
            { id: 'analyze-external', label: '🛡️ Outside Plan Analyzer ("Is It a Rip-Off?")' },
            { id: 'advisory-packages', label: '💼 Speak to a Financial Advisor (Personal Audit)' },
            { id: 'advice', label: '💡 Real Estate Financial Advice' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                  backgroundColor: isActive ? 'var(--accent)' : '#FAF9F6',
                  color: isActive ? '#FFFFFF' : 'var(--text-title)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          3. MAIN TAB CONTENT AREA
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1050px', margin: '36px auto 0', padding: '0 6%' }}>

        {/* ══════════════════════════════════════════════════════════════
            TAB 1: BENCHMARK PLANS & INSTALLMENT CALCULATOR
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'calculator' && (
          <div>
            {/* Explanatory Banner: For our properties OR to compare outside deals */}
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '8px',
              padding: '14px 18px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <ShieldAlert size={22} style={{ color: '#D97706', flexShrink: 0 }} />
              <div style={{ fontSize: '0.78rem', color: '#78350F', lineHeight: 1.5 }}>
                <strong>How to use these plans:</strong> You can use these 4 structured plans for Umoja vetted properties, 
                OR use them as a <strong>Gold Standard benchmark</strong> to see if an outside developer is offering you fair terms or a predatory contract!
              </div>
            </div>

            {/* The 4 Payment Plans */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(235px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {[
                {
                  id: 'plan-outright',
                  badge: 'Instant & Cheapest',
                  title: 'Outright Purchase',
                  tag: '100% Upfront (0% Interest)',
                  desc: 'Pay once, receive Deed of Assignment immediately, and enjoy a 5% to 10% cash discount on total cost.',
                  deposit: '100% Down',
                  duration: 'Instant Allocation'
                },
                {
                  id: 'plan-6mo',
                  badge: 'Fair Standard',
                  title: '6-Month Structured Plan',
                  tag: '30% Deposit + 5 Monthly Payments',
                  desc: '30% commitment deposit, remaining 70% split into 5 equal monthly installments with 0% interest.',
                  deposit: '30% Down Payment',
                  duration: '6 Months Duration'
                },
                {
                  id: 'plan-12mo',
                  badge: 'Safe Construction',
                  title: '12-Month Progress Plan',
                  tag: 'Tied to Physical Milestones',
                  desc: '25% initial deposit, then installments released only as foundation, decking, roofing, and plastering are built.',
                  deposit: '25% Down Payment',
                  duration: '12 Months Duration'
                },
                {
                  id: 'plan-mortgage',
                  badge: 'Long-Term Facility',
                  title: 'Primary Mortgage (10 Yrs)',
                  tag: 'National Housing Fund (NHF)',
                  desc: 'Pay 20% to 30% equity contribution. Balance funded by registered mortgage bank at single-digit rates.',
                  deposit: '20% Equity Down',
                  duration: 'Up to 10 - 20 Years'
                }
              ].map(plan => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    style={{
                      backgroundColor: isSelected ? '#FAF9F6' : '#FFFFFF',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                      padding: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isSelected ? '0 6px 20px rgba(26,62,38,0.12)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          fontSize: '0.66rem',
                          backgroundColor: isSelected ? 'var(--accent)' : '#F1F5F9',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          padding: '2px 8px',
                          borderRadius: '3px',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          {plan.badge}
                        </span>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: isSelected ? '5px solid var(--accent)' : '2px solid #CBD5E1',
                          backgroundColor: '#FFFFFF'
                        }} />
                      </div>

                      <h3 style={{ margin: '0 0 4px', fontSize: '1rem', color: isSelected ? 'var(--accent)' : '#1E293B', fontWeight: 700 }}>
                        {plan.title}
                      </h3>
                      <strong style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', display: 'block', marginBottom: '8px' }}>
                        {plan.tag}
                      </strong>
                      <p style={{ margin: '0 0 12px', fontSize: '0.76rem', color: '#64748B', lineHeight: 1.5 }}>
                        {plan.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                      <span style={{ color: '#475569', fontWeight: 600 }}>{plan.deposit}</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{plan.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Calculator Section */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              padding: '28px 32px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
              marginBottom: '36px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '22px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Installment Simulator
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                    Calculate Payment Schedule for Any Property
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    Type the property price below or click a quick preset:
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {PRESET_PRICES.map(p => (
                    <button
                      type="button"
                      key={p.val}
                      onClick={() => setPropertyPriceNgn(p.val)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: propertyPriceNgn === p.val ? '1px solid var(--accent)' : '1px solid #CBD5E1',
                        backgroundColor: propertyPriceNgn === p.val ? '#FAF9F6' : '#FFFFFF',
                        color: propertyPriceNgn === p.val ? 'var(--accent)' : '#475569',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Input & Result */}
              <div style={{
                backgroundColor: '#FAF9F6',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                padding: '18px 22px',
                marginBottom: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Property / Land Price (₦ Naira):
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent)' }}>₦</span>
                    <input
                      type="number"
                      step="1000000"
                      value={propertyPriceNgn}
                      onChange={e => setPropertyPriceNgn(Number(e.target.value))}
                      style={{
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        color: 'var(--accent)',
                        border: 'none',
                        background: 'transparent',
                        outline: 'none',
                        width: '200px',
                        fontFamily: 'var(--font-sans)'
                      }}
                    />
                    <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>
                      (~${Math.round(propertyPriceNgn / 1480).toLocaleString()} USD)
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, display: 'block' }}>Initial Down Payment:</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--accent)', fontWeight: 800 }}>
                      ₦{downPaymentAmount.toLocaleString()} <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>({downPaymentPct}%)</span>
                    </strong>
                  </div>

                  {selectedPlanId !== 'plan-outright' && (
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, display: 'block' }}>Monthly Installment:</span>
                      <strong style={{ fontSize: '1.15rem', color: '#16A34A', fontWeight: 800 }}>
                        ₦{monthlyInstallment.toLocaleString()} / mo
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Installment Schedule Table */}
              {selectedPlanId !== 'plan-outright' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Milestone Schedule ({selectedPlanId === 'plan-12mo' ? '12 Months' : '6 Months'})
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 700 }}>
                      ✓ 0% Hidden Interest • Escrow Protected
                    </span>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                          <th style={{ padding: '10px 14px', color: '#475569', fontWeight: 700 }}>Stage</th>
                          <th style={{ padding: '10px 14px', color: '#475569', fontWeight: 700 }}>Amount Due</th>
                          <th style={{ padding: '10px 14px', color: '#475569', fontWeight: 700 }}>Physical Milestone</th>
                          <th style={{ padding: '10px 14px', color: '#475569', fontWeight: 700 }}>Escrow Release</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeMilestones.map((ms, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                            <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1E293B' }}>{ms.month}</td>
                            <td style={{ padding: '12px 14px', color: 'var(--accent)', fontWeight: 800 }}>
                              ₦{ms.amount.toLocaleString()} <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>({ms.pct})</span>
                            </td>
                            <td style={{ padding: '12px 14px', color: '#475569' }}>{ms.milestone}</td>
                            <td style={{ padding: '12px 14px' }}>
                              <span style={{
                                fontSize: '0.68rem',
                                backgroundColor: ms.status.includes('Immediate') ? '#DCFCE7' : '#F1F5F9',
                                color: ms.status.includes('Immediate') ? '#15803D' : '#334155',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontWeight: 700
                              }}>
                                {ms.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 2: OUTSIDE PAYMENT PLAN ANALYZER (RIP-OFF CHECKER)
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'analyze-external' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            padding: '28px 32px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            marginBottom: '36px'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '4px 10px', borderRadius: '4px', marginBottom: '8px' }}>
                <ShieldAlert size={14} style={{ color: '#DC2626' }} />
                <span style={{ fontSize: '0.72rem', color: '#DC2626', fontWeight: 800, textTransform: 'uppercase' }}>
                  Predatory Developer Protection
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)', margin: '2px 0 4px' }}>
                Submit Any Outside Payment Plan: "Is It a Rip-Off or Fair?"
              </h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                Were you offered an installment deal by an outside real estate developer, marketing company, or agency in Lagos/Abuja? 
                Enter what they gave you below. Our analysts check for hidden development levies, aggressive default penalties, 
                and compound interest traps so you never get blind-sided.
              </p>
            </div>

            <form onSubmit={handleExternalSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Developer / Agency Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Landmark Realty / Lekki Apex Developers"
                    value={extDeveloperName}
                    onChange={e => setExtDeveloperName(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Total Property Price Quoted *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₦35,000,000"
                    value={extPropertyPrice}
                    onChange={e => setExtPropertyPrice(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Initial Deposit They Demanded:
                  </label>
                  <select
                    value={extDepositDemanded}
                    onChange={e => setExtDepositDemanded(e.target.value)}
                    style={{ width: '100%', padding: '9px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option>10% - 20% Down Payment</option>
                    <option>30% Down Payment</option>
                    <option>50% Down Payment (High Upfront Risk)</option>
                    <option>Over 60% Down Payment (Extreme Risk)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Payment Spread / Duration:
                  </label>
                  <select
                    value={extDuration}
                    onChange={e => setExtDuration(e.target.value)}
                    style={{ width: '100%', padding: '9px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>12 Months</option>
                    <option>18 - 24 Months</option>
                  </select>
                </div>
              </div>

              {/* Red Flag Checkboxes */}
              <div style={{ backgroundColor: '#FAF9F6', borderRadius: '8px', border: '1px solid var(--border)', padding: '16px 20px', marginBottom: '16px' }}>
                <strong style={{ fontSize: '0.78rem', color: '#1E293B', display: 'block', marginBottom: '10px' }}>
                  Did they mention any of these red flags in the fine print?
                </strong>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: '#475569', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={extHiddenFeesMentioned}
                      onChange={e => setExtHiddenFeesMentioned(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#DC2626' }}
                    />
                    <span><strong>Separate Development / Infrastructure Levy</strong> (demanding extra millions later)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: '#475569', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={extPriceEscalationMentioned}
                      onChange={e => setExtPriceEscalationMentioned(e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#DC2626' }}
                    />
                    <span><strong>Price Escalation Clause</strong> (developer can increase price if cement/dollar rises)</span>
                  </label>
                </div>
              </div>

              {/* File Upload OR Paste Text */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155' }}>
                    Upload Developer Offer Letter / Contract File OR Paste the Terms:
                  </label>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    Accepts PDF, DOCX, JPG, PNG (Max 25MB)
                  </span>
                </div>

                {/* Drag and Drop / File Input Box */}
                <div style={{
                  border: extFile ? '2px solid #16A34A' : '2px dashed #CBD5E1',
                  borderRadius: '8px',
                  backgroundColor: extFile ? '#F0FDF4' : '#FAF9F6',
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '14px',
                  position: 'relative'
                }}>
                  {extFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '6px', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Paperclip size={18} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <strong style={{ fontSize: '0.84rem', color: '#166534', display: 'block' }}>{extFile.name}</strong>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{(extFile.size / 1024).toFixed(1)} KB • Attached for Analysis</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExtFile(null)}
                        style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #EF4444', backgroundColor: '#FFFFFF', color: '#EF4444', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <div>
                      <UploadCloud size={32} style={{ color: '#94A3B8', margin: '0 auto 8px', display: 'block' }} />
                      <strong style={{ fontSize: '0.84rem', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Click to upload developer payment schedule, offer letter, or flyer
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginBottom: '10px' }}>
                        Supports camera photos from phone, scanned PDFs, or Word documents
                      </span>
                      <input
                        type="file"
                        id="extFileInput"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setExtFile(e.target.files[0]);
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('extFileInput').click()}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '4px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#334155',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Browse Files on Device
                      </button>
                    </div>
                  )}
                </div>

                {/* Optional Text Paste Field */}
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '4px' }}>
                    Or type / paste specific clauses or payment breakdown notes:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 'Customer pays 30% initial deposit of ₦10,500,000 followed by 6 monthly installments. Default attracts 5% daily charge. Infrastructure fee of ₦4,000,000 to be paid before physical allocation...'"
                    value={extNotes}
                    onChange={e => setExtNotes(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'var(--font-sans)' }}
                  />
                </div>
              </div>

              {/* Action Box */}
              <div style={{
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '8px',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#92400E', fontWeight: 800 }}>
                    Official External Plan Analysis & Fairness Report Fee:
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B45309' }}>
                      ₦10,000
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
                      (~$7 USD)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                    ✓ Full 3-page written analyst report with Red Flag score and recommended counter-offer
                  </span>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '12px 28px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#B45309',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <ShieldCheck size={16} style={{ color: '#FDE68A' }} />
                  <span>Submit Plan for Rip-Off Analysis</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 3: SPEAK TO A FINANCIAL ADVISOR (PAID PLANS & PACKAGES)
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'advisory-packages' && (
          <div style={{ marginBottom: '36px' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase' }}>
                Accredited Wealth Advisory
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)', margin: '2px 0 4px' }}>
                Speak with a Personal Real Estate Financial Advisor
              </h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                Get an expert who will look thoroughly through your personal finances, income, savings, and debts, 
                tell you exactly what price range you can safely buy, and guide you through the whole journey so you never overpay:
              </p>
            </div>

            {/* The 3 Advisor Packages */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '18px',
              marginBottom: '32px'
            }}>
              {ADVISOR_PACKAGES.map(pkg => {
                const isSelected = selectedAdvisorPackage === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedAdvisorPackage(pkg.id)}
                    style={{
                      backgroundColor: isSelected ? '#FAF9F6' : '#FFFFFF',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                      padding: '24px 22px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isSelected ? '0 8px 24px rgba(26,62,38,0.14)' : '0 2px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <span style={{
                          fontSize: '0.68rem',
                          backgroundColor: isSelected ? 'var(--accent)' : '#F1F5F9',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          {pkg.badge}
                        </span>

                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: isSelected ? '5px solid var(--accent)' : '2px solid #CBD5E1',
                          backgroundColor: '#FFFFFF'
                        }} />
                      </div>

                      <h3 style={{ margin: '0 0 6px', fontSize: '1.05rem', color: isSelected ? 'var(--accent)' : '#1E293B', fontWeight: 700 }}>
                        {pkg.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--accent)' }}>
                          ₦{pkg.priceNgn.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                          (~${pkg.priceUsd})
                        </span>
                      </div>

                      <p style={{ margin: '0 0 16px', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
                        {pkg.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <strong style={{ fontSize: '0.72rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        What You Get:
                      </strong>
                      {pkg.deliverables.map((d, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.74rem', color: '#334155' }}>
                          <CheckCircle size={13} style={{ color: '#10B981', flexShrink: 0, marginTop: '2px' }} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Booking Form for Selected Package */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '2px solid rgba(26,62,38,0.15)',
              padding: '28px 32px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                Book Your Session
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--accent)', margin: '2px 0 6px' }}>
                Schedule Your Financial Consultation
              </h3>
              <p style={{ margin: '0 0 18px', fontSize: '0.8rem', color: '#64748B' }}>
                Selected: <strong>{ADVISOR_PACKAGES.find(p => p.id === selectedAdvisorPackage)?.title || 'Full Personal Finance Audit & Buying Blueprint (₦25,000)'}</strong>
              </p>

              <form onSubmit={handleAdvisorSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Engr. Chinedu Okafor"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Active WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 456 7890"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Approximate Monthly Income (Confidential):
                    </label>
                    <select
                      value={monthlyIncome}
                      onChange={e => setMonthlyIncome(e.target.value)}
                      style={{ width: '100%', padding: '9px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                    >
                      <option>₦300,000 - ₦750,000 / month</option>
                      <option>₦750,000 - ₦1,500,000 / month</option>
                      <option>₦1,500,000 - ₦3,500,000 / month</option>
                      <option>Above ₦3,500,000 / month</option>
                      <option>Diaspora FX Income (£ / $ / €)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginTop: '16px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: 700 }}>
                    ✓ 100% Confidential • Chartered Mortgage &amp; Wealth Specialist
                  </span>

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
                    <span>Confirm &amp; Book Advisor Session</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 4: EXTENSIVE FREE REAL ESTATE FINANCIAL ADVICE & RESEARCH
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'advice' && (
          <div style={{ marginBottom: '36px' }}>
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(210, 125, 45, 0.15)', padding: '4px 10px', borderRadius: '4px', marginBottom: '8px' }}>
                <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase' }}>
                  100% Free Research Library
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', color: 'var(--accent)', margin: '2px 0 4px' }}>
                Real Estate Financial Advice &amp; Insider Research
              </h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                We conducted deep financial research across the property market. Here is everything you need to know 
                to budget safely, avoid hidden costs, and protect your hard-earned money—completely free:
              </p>
            </div>

            {/* 6 Comprehensive Researched Guides */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '18px' }}>
              
              {/* GUIDE 1 */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border)', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '3px', fontSize: '0.68rem', fontWeight: 800 }}>
                    TRAP #1 EXPOSED
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--accent)' }}>The "Ancillary Cost" Trap</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55, margin: '0 0 10px' }}>
                  Many buyers celebrate paying off an off-plan plot or house, only for the developer to suddenly slap them with <strong>unexpected ancillary fees</strong> before handing over keys!
                </p>
                <div style={{ backgroundColor: '#FAF9F6', borderRadius: '6px', padding: '10px 12px', fontSize: '0.72rem', color: '#334155', lineHeight: 1.5 }}>
                  <strong>The 4 Hidden Fees to Watch For:</strong><br />
                  1. <em>Development / Infrastructure Levy:</em> Road paving, drainage, electrification.<br />
                  2. <em>Deed Documentation Fee:</em> Usually 5% - 10% of purchase price.<br />
                  3. <em>Registered Survey Fee:</em> ₦800k - ₦1.8M in prime corridors.<br />
                  4. <em>Transformer & Energization Fee:</em> ₦500k - ₦1.2M.<br />
                  💡 <strong>How to Protect Yourself:</strong> Always demand an <strong>"All-Inclusive Agreement"</strong> where every single fee is written down before making your initial deposit!
                </div>
              </div>

              {/* GUIDE 2 */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border)', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '3px', fontSize: '0.68rem', fontWeight: 800 }}>
                    FINANCIAL FORMULA
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--accent)' }}>The 30/30/40 Affordability Formula</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55, margin: '0 0 10px' }}>
                  For monthly salary earners in Lagos, Abuja, and Port Harcourt, overextending your budget is the #1 reason for defaulted contracts and forfeited deposits.
                </p>
                <div style={{ backgroundColor: '#FAF9F6', borderRadius: '6px', padding: '10px 12px', fontSize: '0.72rem', color: '#334155', lineHeight: 1.5 }}>
                  <strong>How to Structure Your Income:</strong><br />
                  • <strong>Max 30% on Installments:</strong> Never allow monthly property deductions to exceed 30% of your verified net income.<br />
                  • <strong>30% for Living & Family:</strong> Food, utilities, children's school fees, emergency medicals.<br />
                  • <strong>40% for Liquid Cushion & Business:</strong> Retained liquid savings to weather currency fluctuations or economic headwinds.<br />
                  💡 <em>If an installment requires 50%+ of your income, choose a longer spread tenure!</em>
                </div>
              </div>

              {/* GUIDE 3 */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border)', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '3px', fontSize: '0.68rem', fontWeight: 800 }}>
                    CASH FLOW STRATEGY
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--accent)' }}>Milestone Escrow vs Calendar Trap</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55, margin: '0 0 10px' }}>
                  Why calendar monthly debits are dangerous for off-plan builds: developers often use your January and February monthly payments to pay off bank loans while your site sits abandoned!
                </p>
                <div style={{ backgroundColor: '#FAF9F6', borderRadius: '6px', padding: '10px 12px', fontSize: '0.72rem', color: '#334155', lineHeight: 1.5 }}>
                  <strong>Demand Milestone-Linked Releases:</strong><br />
                  • Deposit (25%) → Released at Land Clearing & Survey.<br />
                  • Tranche 2 (25%) → Released ONLY after DPC Foundation Slab is cast.<br />
                  • Tranche 3 (25%) → Released ONLY after 1st Floor Decking is poured.<br />
                  • Final 25% → Handover of keys, snagging inspection & Deed signing.<br />
                  💡 <em>Never release next funds until the previous physical milestone is verified by photo/drone!</em>
                </div>
              </div>

              {/* GUIDE 4 */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border)', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#F3E8FF', color: '#6B21A8', padding: '2px 8px', borderRadius: '3px', fontSize: '0.68rem', fontWeight: 800 }}>
                    DIASPORA STRATEGY
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--accent)' }}>Diaspora Remittance & Currency Hedging</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55, margin: '0 0 10px' }}>
                  For diaspora buyers in the UK (£), US ($), Canada ($), or Europe (€), currency volatility can either work for you or against you during an installment plan.
                </p>
                <div style={{ backgroundColor: '#FAF9F6', borderRadius: '6px', padding: '10px 12px', fontSize: '0.72rem', color: '#334155', lineHeight: 1.5 }}>
                  <strong>How to Hedge Your Funds:</strong><br />
                  1. <em>Fixed Terms Contract:</em> Lock in transparent pricing and conversion benchmarks before signing.<br />
                  2. <em>Avoid Black-Market Middlemen:</em> Transfer via institutional regulated channels or direct bank accounts.<br />
                  3. <em>Milestone Drone Inspection:</em> Never send money blindly. Use chartered surveyor live video to inspect foundations.
                </div>
              </div>

              {/* GUIDE 5 */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border)', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#CCFBF1', color: '#0F766E', padding: '2px 8px', borderRadius: '3px', fontSize: '0.68rem', fontWeight: 800 }}>
                    MORTGAGE REALITIES
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--accent)' }}>Demystifying Structured Mortgages</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55, margin: '0 0 10px' }}>
                  Commercial bank mortgage interest rates typically hover between 15% and 24%. However, benchmark housing funds offer single-digit fixed rates.
                </p>
                <div style={{ backgroundColor: '#FAF9F6', borderRadius: '6px', padding: '10px 12px', fontSize: '0.72rem', color: '#334155', lineHeight: 1.5 }}>
                  <strong>How to Qualify for Mortgages:</strong><br />
                  • <strong>Contribution:</strong> Maintain consistent verifiable monthly income documentation.<br />
                  • <strong>Borrowing Limit:</strong> Sized based on safe 33% debt-to-income limits.<br />
                  • <strong>Tenure:</strong> Up to 20 to 30 years repayment period.<br />
                  • <strong>Channel:</strong> Processed through an accredited Primary Mortgage Bank with verified title.
                </div>
              </div>

              {/* GUIDE 6 */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--border)', padding: '22px', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '3px', fontSize: '0.68rem', fontWeight: 800 }}>
                    LEGAL SHIELD
                  </span>
                  <strong style={{ fontSize: '0.98rem', color: 'var(--accent)' }}>The Default Buffer Protection</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.55, margin: '0 0 10px' }}>
                  Developer contracts typically contain a clause stating: <em>"Failure to pay within 14 days of due date constitutes default and attracts penalty or termination."</em>
                </p>
                <div style={{ backgroundColor: '#FAF9F6', borderRadius: '6px', padding: '10px 12px', fontSize: '0.72rem', color: '#334155', lineHeight: 1.5 }}>
                  <strong>How to Protect Yourself:</strong><br />
                  1. <em>Negotiate a 60-Day Grace Period:</em> Insist on 60 days cure period in writing before signing the Contract of Sale.<br />
                  2. <em>Hold a 2-Month Installment Cushion:</em> Keep two months of installment money in high-yield treasury bills/mutual funds.<br />
                  3. <em>The Right to Assignment:</em> Ensure contract allows you to resell or assign your contract if financial hardship strikes.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CONFIRMATION MODAL FOR ADVISOR BOOKING */}
        {confirmedAdvisorBooking && (
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
              maxWidth: '520px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              <div style={{
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                padding: '24px 28px',
                position: 'relative'
              }}>
                <button
                  onClick={() => setConfirmedAdvisorBooking(null)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Financial Advisor Consultation Pass
                  </span>
                </div>

                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  Advisor Session Booked
                </h3>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.8)', display: 'block', marginTop: '4px' }}>
                  Reference Code: <strong style={{ color: '#FFFFFF' }}>{confirmedAdvisorBooking.ref}</strong>
                </span>
              </div>

              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: '#334155', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Client Name:</span>
                    <strong>{confirmedAdvisorBooking.clientName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Selected Package:</span>
                    <strong style={{ color: 'var(--accent)', textAlign: 'right', maxWidth: '300px' }}>{confirmedAdvisorBooking.packageName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Assigned Advisor:</span>
                    <strong>{confirmedAdvisorBooking.advisorName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: '#64748B', fontWeight: 700 }}>Advisory Fee:</span>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--accent)' }}>
                      ₦{confirmedAdvisorBooking.priceNgn.toLocaleString()} (${confirmedAdvisorBooking.priceUsd})
                    </strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    What Happens Next?
                  </span>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#14532D', lineHeight: 1.45 }}>
                    Mr. Adeyemi will call you at <strong>{confirmedAdvisorBooking.clientPhone}</strong> to conduct your personal financial audit, 
                    review your cash flow, and deliver your personalized real estate buying strategy.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setConfirmedAdvisorBooking(null);
                    onBackToHub();
                  }}
                  style={{
                    width: '100%',
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
                  Done (Back to Directory)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CONFIRMATION MODAL FOR EXTERNAL PLAN REVIEW */}
        {confirmedExternalReview && (
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
              maxWidth: '520px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              <div style={{
                backgroundColor: '#B45309',
                color: '#FFFFFF',
                padding: '24px 28px',
                position: 'relative'
              }}>
                <button
                  onClick={() => setConfirmedExternalReview(null)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={18} style={{ color: '#FDE68A' }} />
                  <span style={{ fontSize: '0.72rem', color: '#FDE68A', fontWeight: 700, textTransform: 'uppercase' }}>
                    Rip-Off Analysis Order
                  </span>
                </div>

                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  Outside Plan Review Queued
                </h3>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.8)', display: 'block', marginTop: '4px' }}>
                  Case File: <strong style={{ color: '#FFFFFF' }}>{confirmedExternalReview.ref}</strong>
                </span>
              </div>

              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: '#334155', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Developer / Agency:</span>
                    <strong>{confirmedExternalReview.developerName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Property Price:</span>
                    <strong>{confirmedExternalReview.propertyPrice}</strong>
                  </div>
                  {confirmedExternalReview.fileName && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Attached Document:</span>
                      <strong style={{ color: '#16A34A' }}>📎 {confirmedExternalReview.fileName} ({confirmedExternalReview.fileSize})</strong>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Review Fee:</span>
                    <strong style={{ fontSize: '1.05rem', color: '#B45309' }}>
                      ₦{confirmedExternalReview.feeNgn.toLocaleString()} (${confirmedExternalReview.feeUsd})
                    </strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    Analysis Deliverable:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#14532D', lineHeight: 1.45 }}>
                    Our analysts are auditing this developer's terms for hidden levies, unfair balloon payments, 
                    and predatory interest. You will receive an official <strong>Rip-Off / Fairness Audit Report</strong> via WhatsApp within 24 hours.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setConfirmedExternalReview(null);
                    onBackToHub();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    backgroundColor: '#B45309',
                    color: '#FFFFFF',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Done (Back to Directory)
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
