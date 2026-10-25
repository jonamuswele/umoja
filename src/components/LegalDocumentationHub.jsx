import React, { useState } from 'react';
import { 
  ArrowLeft, FileText, ShieldCheck, CheckCircle, Scale, 
  Search, AlertTriangle, Calendar, Clock, Bell, User, 
  Phone, CheckSquare, Square, FileCheck, Check, Info,
  HelpCircle, ChevronRight, X, Download, Shield, Eye,
  ShieldAlert, UploadCloud, Paperclip
} from 'lucide-react';
import { getStoredServices } from '../utils/userStorage';

// ══════════════════════════════════════════════════════════════════════
// 1. DATA: REQUIRED LEGAL DOCUMENTS BY PURPOSE
// ══════════════════════════════════════════════════════════════════════
const DOCUMENTS_BY_PURPOSE = [
  {
    id: 'buy-land',
    purpose: 'Buying Dry Land / Plots',
    badge: 'Crucial for Plot Buyers',
    desc: 'Never pay for land without verifying these 5 essential title documents to avoid government demolition or Omonile scams:',
    docs: [
      {
        name: 'Registered Survey Plan (Red Copy)',
        issuer: 'Office of the State Surveyor-General',
        importance: 'Mandatory',
        explanation: 'Shows the exact boundary beacon coordinates of the land. Proves the land is not inside a committed government road, military zone, or agricultural acquisition.'
      },
      {
        name: 'Certificate of Occupancy (C of O) or Gazette',
        issuer: 'State Government (e.g. Lagos State Lands Bureau)',
        importance: 'Primary Root of Title',
        explanation: 'The official state land title granted by the State Governor. A Gazette proves the land was legally excised and granted to the community.'
      },
      {
        name: "Governor's Consent (If Land was Resold)",
        issuer: 'State Ministry of Lands',
        importance: 'Required for Transfer',
        explanation: 'Required under the Land Use Act whenever land with an existing C of O is sold from the first owner to a new buyer.'
      },
      {
        name: 'Deed of Assignment',
        issuer: 'Drafted by Accredited Property Lawyer',
        importance: 'Permanent Ownership Transfer',
        explanation: 'The permanent legal contract stating that the seller has sold and transferred all ownership rights and interest in the land to you.'
      },
      {
        name: 'Contract of Sale & Purchase Receipts',
        issuer: 'Issued by Seller / Developer',
        importance: 'Proof of Payment',
        explanation: 'Legally binding evidence showing the exact amount paid, payment terms, and acknowledging receipt of full payment.'
      }
    ]
  },
  {
    id: 'buy-house',
    purpose: 'Buying a Finished House / Duplex',
    badge: 'Crucial for Home Buyers',
    desc: 'When buying an existing house, terrace, or duplex, ensure the developer or homeowner provides these papers:',
    docs: [
      {
        name: 'Approved Architectural & Structural Building Plan',
        issuer: 'Physical Planning Authority (LASPPPA)',
        importance: 'Zero Demolition Risk',
        explanation: 'Proves the house was built according to government building codes and will not be marked for structural demolition or setback violation.'
      },
      {
        name: "Governor's Consent / Mother Deed of Assignment",
        issuer: 'State Lands Bureau',
        importance: 'Root of Title',
        explanation: 'Proves the developer or seller genuinely owns the land upon which the house is erected.'
      },
      {
        name: 'Deed of Sub-Lease / Deed of Assignment',
        issuer: 'Property Solicitor',
        importance: 'Unit Ownership Document',
        explanation: 'Legally assigns the specific apartment, terrace unit, or detached duplex to you with shared estate rights.'
      },
      {
        name: 'Letter of Allocation & Physical Handover Certificate',
        issuer: 'Estate Developer / Seller',
        importance: 'Possession Proof',
        explanation: 'Certifies that unit keys, parking allocation, and physical possession have been officially handed over to you.'
      }
    ]
  },
  {
    id: 'rent-apartment',
    purpose: 'Renting a House / Apartment',
    badge: 'Crucial for Tenants & Landlords',
    desc: 'Protect yourself from fake caretakers and sudden eviction with these required tenancy papers:',
    docs: [
      {
        name: 'Tenancy Agreement (Sub-Lease Contract)',
        issuer: "Landlord's Legal Counsel",
        importance: 'Mandatory',
        explanation: 'Defines your rent amount, tenancy duration (e.g. 1 year), quit notice rules, and landlord repair obligations.'
      },
      {
        name: 'Official Rent & Caution Deposit Receipt',
        issuer: 'Landlord / Managing Estate Agent',
        importance: 'Financial Proof',
        explanation: 'Acknowledges payment of annual rent, service charges, and refundable caution deposit.'
      },
      {
        name: 'Inventory & Fixture Condition Schedule',
        issuer: 'Both Tenant and Landlord',
        importance: 'Deposit Protection',
        explanation: 'Lists all working light fittings, water heaters, and AC sockets upon move-in so caution money cannot be unfairly deducted.'
      }
    ]
  },
  {
    id: 'build-project',
    purpose: 'Building / Developing on Land',
    badge: 'Crucial for Construction',
    desc: 'Before pouring foundation or buying blocks, these statutory approvals prevent building collapse and government stop-work seals:',
    docs: [
      {
        name: 'Building Plan Approval & Green Seal',
        issuer: 'State Physical Planning Authority (e.g. LASPPPA)',
        importance: 'Mandatory Before Foundation',
        explanation: 'Official government clearance authorizing you to erect the approved number of floors on that specific plot.'
      },
      {
        name: 'Structural Engineering Drawings & COREN Seal',
        issuer: 'Registered Structural Engineer',
        importance: 'Building Safety Guarantee',
        explanation: 'Guarantees the foundation reinforcement, iron rod thickness, and concrete mix will safely carry the building load.'
      },
      {
        name: 'Soil Investigation / Geotechnical Report',
        issuer: 'Certified Material Testing Lab',
        importance: 'Foundation Engineering',
        explanation: 'Determines whether the ground requires raft foundation or deep piling to prevent building sinking.'
      }
    ]
  }
];

export default function LegalDocumentationHub({ onBackToHub, customService }) {
  const [selectedPurposeId, setSelectedPurposeId] = useState('buy-land');
  const [activeTab, setActiveTab] = useState('requirements'); // 'requirements' | 'checklist' | 'external-review' | 'lawyers-pricing' | 'reminders'

  // Interactive Due Diligence Checklist State
  const [checkedItems, setCheckedItems] = useState([0, 1]);

  // External Agreement Rip-Off Review State
  const [extAgreementSeller, setExtAgreementSeller] = useState('');
  const [extAgreementType, setExtAgreementType] = useState('Contract of Sale & Deed of Assignment');
  const [extAgreementText, setExtAgreementText] = useState('');
  const [extAgreementFile, setExtAgreementFile] = useState(null);
  const [extHasForfeitureClause, setExtHasForfeitureClause] = useState(false);
  const [extHasRelocationClause, setExtHasRelocationClause] = useState(false);
  const [confirmedAgreementAudit, setConfirmedAgreementAudit] = useState(null);

  // Lawyer Access Package Selection
  const [selectedLawyerPkg, setSelectedLawyerPkg] = useState('pkg-audit');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [matterNotes, setMatterNotes] = useState('');
  const [confirmedLawyerBooking, setConfirmedLawyerBooking] = useState(null);

  // Expiry Reminders
  const [reminders, setReminders] = useState([
    { title: "Governor's Consent Stamping Period", deadline: 'Within 90 Days of Execution', status: 'Active', daysLeft: '48 Days Left' },
    { title: 'Annual Land Use Charge (LUC) Lagos', deadline: 'Due March 31, 2026', status: 'Upcoming', daysLeft: '21 Days Left' },
    { title: 'Residential Tenancy Agreement Renewal', deadline: 'Due November 15, 2026', status: 'Scheduled', daysLeft: '249 Days Left' }
  ]);

  const activePurpose = DOCUMENTS_BY_PURPOSE.find(p => p.id === selectedPurposeId) || DOCUMENTS_BY_PURPOSE[0];

  const toggleChecklist = (idx) => {
    if (checkedItems.includes(idx)) {
      setCheckedItems(checkedItems.filter(i => i !== idx));
    } else {
      setCheckedItems([...checkedItems, idx]);
    }
  };

  // Read real-time subscriptions & configurations from admin storage
  const storedServices = getStoredServices();
  const legalService = customService || storedServices.find(s => s.id === 'legal-documentation');
  const storedSubs = legalService?.subscriptions || [];

  const BASE_LAWYER_PACKAGES = [
    {
      id: 'pkg-call',
      title: '1-on-1 Legal Strategy & Document Consultation',
      badge: 'Quick Vetting',
      priceNgn: 15000,
      priceUsd: 10,
      desc: '45-minute phone or WhatsApp video consultation with an accredited NBA property lawyer. Discuss land disputes, verify seller legitimacy, and get clear legal advice.',
      deliverables: ['45-min direct legal consultation', 'Preliminary root of title check', 'Clear next-steps advice']
    },
    {
      id: 'pkg-audit',
      title: 'Outside Agreement Rip-Off Audit & Red Flag Report',
      badge: 'Most Popular for Outside Deals',
      priceNgn: 20000,
      priceUsd: 14,
      desc: 'Got an agreement from an outside developer, agent, or family? Our property lawyers read every single clause to protect you from deposit forfeiture traps and fake titles.',
      deliverables: [
        'Line-by-line clause audit of your draft contract',
        'Identification of predatory penalty clauses',
        'Check for seller indemnity and beacon warranty',
        'Formal signed Legal Risk Certificate & counter-draft'
      ]
    },
    {
      id: 'pkg-registry-search',
      title: 'State Land Registry Search & Certified Report',
      badge: 'Physical Archive Search',
      priceNgn: 25000,
      priceUsd: 17,
      desc: 'Physical archive search at Alausa Lands Bureau (Lagos), AGIS / FCDA (Abuja), or Abeokuta. We inspect the root files to confirm genuine ownership and zero bank mortgages.',
      deliverables: ['Physical archive file inspection', 'Search for registered mortgages or court orders', 'Signed official Search Report delivered in 48-72 hrs']
    },
    {
      id: 'pkg-full-closing',
      title: 'Complete Real Estate Legal Representation & Closing',
      badge: 'Full Peace of Mind',
      priceNgn: 75000,
      priceUsd: 50,
      desc: 'Our senior conveyancing solicitor handles the entire transaction from drafting the Deed of Assignment, witnessing the execution, to perfecting the title with the state government.',
      deliverables: ['Custom Deed of Assignment drafting', 'Physical witnessing & NBA seal', "Governor's Consent filing guidance", 'Milestone escrow closing oversight']
    }
  ];

  const LAWYER_PACKAGES = BASE_LAWYER_PACKAGES.map(basePkg => {
    const override = storedSubs.find(s => 
      s.id === basePkg.id ||
      (s.id === 'plan-leg-search' && basePkg.id === 'pkg-registry-search') ||
      (s.id === 'plan-leg-draft' && basePkg.id === 'pkg-full-closing') ||
      (s.id === 'plan-leg-close' && basePkg.id === 'pkg-full-closing') ||
      s.name?.toLowerCase().includes(basePkg.title.toLowerCase().slice(0, 8))
    );
    if (!override) return basePkg;
    return {
      ...basePkg,
      title: override.name || basePkg.title,
      badge: override.badge || basePkg.badge,
      priceNgn: override.priceNgn ?? basePkg.priceNgn,
      priceUsd: override.priceUsd ?? basePkg.priceUsd,
      desc: override.shortDesc || override.desc || basePkg.desc,
      deliverables: (override.offerings && override.offerings.length > 0) ? override.offerings : basePkg.deliverables
    };
  });

  const handleLawyerSubmit = (e) => {
    e.preventDefault();
    const pkg = LAWYER_PACKAGES.find(p => p.id === selectedLawyerPkg) || LAWYER_PACKAGES[1];
    const ref = `LEG-${Math.floor(100000 + Math.random() * 900000)}`;

    setConfirmedLawyerBooking({
      ref,
      packageName: pkg.title,
      priceNgn: pkg.priceNgn,
      priceUsd: pkg.priceUsd,
      clientName,
      clientPhone,
      matterNotes,
      lawyerAssigned: 'Barr. Folake Adeleke (Senior Conveyancer, NBA Property Committee)'
    });
  };

  const handleExternalAgreementSubmit = (e) => {
    e.preventDefault();
    const ref = `AUD-${Math.floor(100000 + Math.random() * 900000)}`;

    setConfirmedAgreementAudit({
      ref,
      sellerName: extAgreementSeller || 'Outside Seller / Developer',
      agreementType: extAgreementType,
      fileName: extAgreementFile ? extAgreementFile.name : null,
      fileSize: extAgreementFile ? `${(extAgreementFile.size / 1024).toFixed(1)} KB` : null,
      feeNgn: 20000,
      feeUsd: 14
    });
  };

  const DUE_DILIGENCE_CHECKLIST = [
    { title: '1. Chart Coordinates with Surveyor-General', desc: 'Cross-check the GPS beacon coordinates at the Ministry of Physical Planning to confirm land is 100% free from government committed road acquisitions or greenbelt reserves.' },
    { title: '2. Search Land Registry Title Files (Alausa / FCDA)', desc: 'Inspect the root register to confirm the seller is the genuine legal registered owner and check if the title is pledged to a bank as loan collateral.' },
    { title: '3. Physical On-Site Inspection & Boundary Beaconing', desc: 'Physically inspect the ground, verify survey beacons on the 4 corners, and speak with neighboring landowners to ensure zero community chieftaincy or family disputes.' },
    { title: '4. High Court Lis Pendens Lawsuit Search', desc: 'Conduct a court registry search to confirm that no pending court injunction, family dispute lawsuit, or inheritance battle affects the property.' },
    { title: '5. Verify Seller Identity & Probate Clearance', desc: 'If buying from family heirs or an estate, confirm Letters of Administration or Probate Grant issued by the High Court authorizing them to sell.' },
    { title: '6. Draft Deed of Assignment with Accredited NBA Solicitor', desc: 'Ensure your Deed of Assignment is drafted and stamped by a licensed property solicitor with active NBA stamp seal.' },
    { title: "7. Title Perfection (Governor's Consent & Stamping)", desc: "Submit the executed Deed of Assignment for Governor's Consent and pay statutory Capital Gains Tax to guarantee indefeasible state title." }
  ];

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
          Legal Documentation &amp; Title Perfection
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
        backgroundImage: legalService?.heroImage ? `linear-gradient(to right, rgba(7, 12, 9, 0.94) 0%, rgba(7, 12, 9, 0.8) 60%, rgba(7, 12, 9, 0.5) 100%), url(${legalService.heroImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {!legalService?.heroImage && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            backgroundImage: 'radial-gradient(circle at right, rgba(139, 69, 19, 0.3) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
        )}

        <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(139, 69, 19, 0.25)', padding: '5px 12px', borderRadius: '4px', marginBottom: '14px', border: `1px solid ${legalService?.badgeColor ? `${legalService.badgeColor}66` : 'rgba(139, 69, 19, 0.4)'}` }}>
            <Scale size={14} style={{ color: legalService?.badgeColor || '#F59E0B' }} />
            <span style={{ fontSize: '0.74rem', color: legalService?.badgeColor || '#F59E0B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {legalService?.badgeText || "Real Estate Legal Guard"}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.3rem',
            lineHeight: 1.18,
            margin: '0 0 12px',
            fontWeight: 700,
            color: legalService?.textColor || '#FFFFFF'
          }}>
            {legalService?.heroHeadline || "Legal Documentation, Title Vetting & Anti-Rip-Off Protection"}
          </h1>

          <p style={{
            fontSize: '0.94rem',
            color: legalService?.subtitleColor || 'rgba(255, 255, 255, 0.82)',
            maxWidth: '780px',
            lineHeight: 1.6,
            margin: '0 0 10px',
            fontWeight: 300
          }}>
            {legalService?.heroSubtitle || "Never sign an agreement or pay for property without legal vetting. See what papers are required, submit any contract from an outside developer or landlord to evaluate if it is a rip-off, or access our accredited property lawyers at clear, transparent prices."}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          STICKY NAVIGATION TABS (SNAPS TO TOP ON SCROLL)
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
            { id: 'requirements', label: '📄 Required Papers by Purpose' },
            { id: 'external-review', label: '🛡️ Outside Contract Rip-Off Audit ("Is It a Rip-Off?")' },
            { id: 'lawyers-pricing', label: '⚖️ Access Our Lawyers (Packages & Prices)' },
            { id: 'checklist', label: '✅ 7-Point Due Diligence Checklist' },
            { id: 'reminders', label: '⏰ Document Expiry Reminders' }
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
          3. MAIN CONTENT TABS
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1050px', margin: '36px auto 0', padding: '0 6%' }}>

        {/* ══════════════════════════════════════════════════════════════
            TAB 1: REQUIRED PAPERS BY PURPOSE
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'requirements' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.72rem', color: '#8B4513', fontWeight: 800, textTransform: 'uppercase' }}>
                Legal Knowledge Guide
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)', margin: '2px 0 4px' }}>
                What Legal Documents Do You Need for Your Purpose?
              </h2>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                Click your purpose below to see the required title documents explained in simple, plain English:
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {DOCUMENTS_BY_PURPOSE.map(p => {
                const isSelected = selectedPurposeId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPurposeId(p.id)}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                      backgroundColor: isSelected ? '#FAF9F6' : '#FFFFFF',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 14px rgba(26,62,38,0.1)' : 'none'
                    }}
                  >
                    <span style={{
                      fontSize: '0.66rem',
                      backgroundColor: isSelected ? 'var(--accent)' : '#F1F5F9',
                      color: isSelected ? '#FFFFFF' : '#475569',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      display: 'inline-block',
                      marginBottom: '6px'
                    }}>
                      {p.badge}
                    </span>
                    <strong style={{ fontSize: '0.94rem', color: isSelected ? 'var(--accent)' : '#1E293B', display: 'block' }}>
                      {p.purpose}
                    </strong>
                  </div>
                );
              })}
            </div>

            {/* Purpose Documents List Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              padding: '28px 32px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}>
              <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '14px', marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 6px', fontSize: '1.25rem', color: 'var(--accent)', fontWeight: 700 }}>
                  Documents Required When {activePurpose.purpose}
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                  {activePurpose.desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activePurpose.docs.map((d, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#FAF9F6',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      padding: '16px 20px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
                      <div>
                        <strong style={{ fontSize: '0.98rem', color: 'var(--accent)' }}>
                          {idx + 1}. {d.name}
                        </strong>
                        <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginTop: '2px' }}>
                          Issued by: <strong>{d.issuer}</strong>
                        </span>
                      </div>
                      <span style={{
                        fontSize: '0.68rem',
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontWeight: 700
                      }}>
                        {d.importance}
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155', lineHeight: 1.5 }}>
                      💡 <strong>Why you need this:</strong> {d.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 2: OUTSIDE CONTRACT RIP-OFF AUDIT
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'external-review' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            padding: '28px 32px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            marginBottom: '36px'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(220, 38, 38, 0.1)', padding: '4px 10px', borderRadius: '4px', marginBottom: '8px' }}>
                <ShieldAlert size={14} style={{ color: '#DC2626' }} />
                <span style={{ fontSize: '0.72rem', color: '#DC2626', fontWeight: 800, textTransform: 'uppercase' }}>
                  Contract Rip-Off & Fraud Prevention
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)', margin: '2px 0 4px' }}>
                Show Us Your Legal Agreement: "Is It a Rip-Off or Legit?"
              </h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                Were you given a draft Deed of Assignment, Contract of Sale, Tenancy agreement, or Joint Venture agreement 
                by an outside developer, family seller, or landlord? <strong>Do not sign blindly!</strong> 
                Submit what they gave you below. Our accredited property lawyers read every single line to catch predatory clauses.
              </p>
            </div>

            {/* Top 4 Traps in Outside Agreements */}
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              padding: '16px 20px',
              marginBottom: '22px'
            }}>
              <strong style={{ fontSize: '0.82rem', color: '#991B1B', display: 'block', marginBottom: '8px' }}>
                ⚠️ The 4 Most Dangerous Clauses We Catch in Outside Real Estate Contracts:
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '0.76rem', color: '#7F1D1D' }}>
                <div>• <strong>Deposit Forfeiture:</strong> Developer seizes 40%-100% of your money if salary is delayed by 14 days.</div>
                <div>• <strong>Unilateral Price Hikes:</strong> Seller reserves right to increase price before handover.</div>
                <div>• <strong>Zero Title Warranty:</strong> If government demolishes, seller has zero refund liability.</div>
                <div>• <strong>Plot Re-Allocation:</strong> Developer can relocate you to an inferior swampy plot at will.</div>
              </div>
            </div>

            <form onSubmit={handleExternalAgreementSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Seller / Landlord / Developer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Balogun / Apex Mega Homes Ltd"
                    value={extAgreementSeller}
                    onChange={e => setExtAgreementSeller(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Type of Agreement Given to You:
                  </label>
                  <select
                    value={extAgreementType}
                    onChange={e => setExtAgreementType(e.target.value)}
                    style={{ width: '100%', padding: '9px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', backgroundColor: '#FFFFFF' }}
                  >
                    <option>Contract of Sale of Land</option>
                    <option>Deed of Assignment (Transfer of Title)</option>
                    <option>Residential / Commercial Tenancy Lease</option>
                    <option>Joint Venture (JV) Development Agreement</option>
                    <option>Off-Plan Developer Subscription Form</option>
                  </select>
                </div>
              </div>

              {/* File Upload OR Paste Text */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155' }}>
                    Upload Agreement / Contract File OR Paste the Clauses:
                  </label>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    Accepts PDF, Word DOCX, Scanned Photos (Max 25MB)
                  </span>
                </div>

                {/* Drag and Drop / File Input Box */}
                <div style={{
                  border: extAgreementFile ? '2px solid #16A34A' : '2px dashed #CBD5E1',
                  borderRadius: '8px',
                  backgroundColor: extAgreementFile ? '#F0FDF4' : '#FAF9F6',
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '14px',
                  position: 'relative'
                }}>
                  {extAgreementFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '6px', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Paperclip size={18} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <strong style={{ fontSize: '0.84rem', color: '#166534', display: 'block' }}>{extAgreementFile.name}</strong>
                          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{(extAgreementFile.size / 1024).toFixed(1)} KB • Attached for Legal Audit</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExtAgreementFile(null)}
                        style={{ padding: '4px 10px', borderRadius: '4px', border: '1px solid #EF4444', backgroundColor: '#FFFFFF', color: '#EF4444', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <div>
                      <UploadCloud size={32} style={{ color: '#94A3B8', margin: '0 auto 8px', display: 'block' }} />
                      <strong style={{ fontSize: '0.84rem', color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Click to upload draft Deed, Contract of Sale, Tenancy agreement, or survey copy
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginBottom: '10px' }}>
                        Supports camera photos from phone, scanned PDFs, or Word documents
                      </span>
                      <input
                        type="file"
                        id="extAgreementFileInput"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setExtAgreementFile(e.target.files[0]);
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('extAgreementFileInput').click()}
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
                    Or type / paste specific problematic clauses:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Paste the agreement clauses, default penalties, terms of payment, or problematic clauses here..."
                    value={extAgreementText}
                    onChange={e => setExtAgreementText(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'var(--font-sans)' }}
                  />
                </div>
              </div>

              {/* Action Box */}
              <div style={{
                backgroundColor: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#8B4513', fontWeight: 800 }}>
                    Official Legal Contract Audit & Red Flag Report Fee:
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#8B4513' }}>
                      ₦20,000
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
                      (~$14 USD)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 700, display: 'block', marginTop: '2px' }}>
                    ✓ Line-by-line clause audit by active NBA Property Solicitor with counter-drafting advice
                  </span>
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '12px 28px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#8B4513',
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
                  <span>Submit Agreement for Rip-Off Review</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 3: ACCESS OUR LAWYERS (PACKAGES & TRANSPARENT PRICING)
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'lawyers-pricing' && (
          <div style={{ marginBottom: '36px' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.72rem', color: '#8B4513', fontWeight: 800, textTransform: 'uppercase' }}>
                Transparent Legal Access
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)', margin: '2px 0 4px' }}>
                {legalService?.heroHeadline || "Access Our Vetted Property Lawyers at Fixed Prices"}
              </h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                {legalService?.heroSubtitle || "Every lawyer on our panel is an accredited member of the Bar Association (NBA) with specialized property conveyancing experience. Pick the exact service you need:"}
              </p>
            </div>

            {/* The 4 Lawyer Packages */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(235px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {LAWYER_PACKAGES.map(pkg => {
                const isSelected = selectedLawyerPkg === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedLawyerPkg(pkg.id)}
                    style={{
                      backgroundColor: isSelected ? '#FAF9F6' : '#FFFFFF',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #8B4513' : '1px solid var(--border)',
                      padding: '20px 18px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: isSelected ? '0 8px 24px rgba(139, 69, 19, 0.15)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          fontSize: '0.66rem',
                          backgroundColor: isSelected ? '#8B4513' : '#F1F5F9',
                          color: isSelected ? '#FFFFFF' : '#475569',
                          padding: '3px 8px',
                          borderRadius: '3px',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          {pkg.badge}
                        </span>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          border: isSelected ? '5px solid #8B4513' : '2px solid #CBD5E1',
                          backgroundColor: '#FFFFFF'
                        }} />
                      </div>

                      <h3 style={{ margin: '0 0 6px', fontSize: '1rem', color: isSelected ? '#8B4513' : '#1E293B', fontWeight: 700 }}>
                        {pkg.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#8B4513' }}>
                          ₦{pkg.priceNgn.toLocaleString()}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                          (~${pkg.priceUsd})
                        </span>
                      </div>

                      <p style={{ margin: '0 0 12px', fontSize: '0.76rem', color: '#475569', lineHeight: 1.5 }}>
                        {pkg.desc}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {pkg.deliverables.map((d, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#334155' }}>
                          <CheckCircle size={12} style={{ color: '#16A34A', flexShrink: 0 }} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Booking Form */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '2px solid rgba(139, 69, 19, 0.2)',
              padding: '28px 32px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}>
              <span style={{ fontSize: '0.72rem', color: '#8B4513', fontWeight: 700, textTransform: 'uppercase' }}>
                Book Your Service
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#8B4513', margin: '2px 0 6px' }}>
                Confirm Lawyer Assignment
              </h3>
              <p style={{ margin: '0 0 18px', fontSize: '0.8rem', color: '#64748B' }}>
                Selected: <strong>{LAWYER_PACKAGES.find(p => p.id === selectedLawyerPkg)?.title}</strong>
              </p>

              <form onSubmit={handleLawyerSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ngozi Okonjo"
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
                      placeholder="e.g. 0803 123 4567"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Describe Your Property Matter / Documents to be Vetted:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. We were given a Deed of Assignment for a plot in Guzape, Abuja. We want the lawyer to verify the FCDA file and ensure no existing bank mortgage..."
                    value={matterNotes}
                    onChange={e => setMatterNotes(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', fontFamily: 'var(--font-sans)' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: 700 }}>
                    ✓ Accredited NBA seal • 100% Client-Lawyer privilege confidentiality
                  </span>

                  <button
                    type="submit"
                    style={{
                      padding: '12px 28px',
                      borderRadius: '4px',
                      border: 'none',
                      backgroundColor: '#8B4513',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(139, 69, 19, 0.25)'
                    }}
                  >
                    <CheckCircle size={16} style={{ color: '#FDE68A' }} />
                    <span>Confirm & Connect with Solicitor</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 4: 7-POINT DUE DILIGENCE CHECKLIST
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'checklist' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            padding: '28px 32px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 800, textTransform: 'uppercase' }}>
                  Scam Prevention Protocol
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                  The 7-Point Property Due Diligence Checklist
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Tick off each step as you verify. Never make payment until all 7 are confirmed!
                </span>
              </div>

              <div style={{
                backgroundColor: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--accent)'
              }}>
                Progress: {checkedItems.length} of 7 Verified
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {DUE_DILIGENCE_CHECKLIST.map((item, idx) => {
                const isChecked = checkedItems.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '14px 18px',
                      borderRadius: '8px',
                      border: isChecked ? '1px solid #16A34A' : '1px solid var(--border)',
                      backgroundColor: isChecked ? '#F0FDF4' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '5px',
                      border: isChecked ? '2px solid #16A34A' : '2px solid #CBD5E1',
                      backgroundColor: isChecked ? '#16A34A' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {isChecked && <Check size={16} />}
                    </div>

                    <div>
                      <strong style={{ fontSize: '0.92rem', color: isChecked ? '#14532D' : '#1E293B', display: 'block', marginBottom: '2px' }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: isChecked ? '#166534' : '#475569', lineHeight: 1.5, display: 'block' }}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 5: DOCUMENT EXPIRY REMINDERS
            ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'reminders' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            padding: '28px 32px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: 800, textTransform: 'uppercase' }}>
                Compliance & Penalty Protection
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)', margin: '2px 0 4px' }}>
                Document Expiry & Statutory Tax Reminders
              </h2>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                Never miss statutory deadlines that can trigger government penalty charges or title invalidation:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '22px' }}>
              {reminders.map((rem, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FAF9F6',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.94rem', color: 'var(--accent)', display: 'block', marginBottom: '2px' }}>
                      {rem.title}
                    </strong>
                    <span style={{ fontSize: '0.76rem', color: '#64748B' }}>
                      Statutory Deadline: <strong>{rem.deadline}</strong>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '0.74rem',
                      backgroundColor: 'rgba(210, 125, 45, 0.15)',
                      color: 'var(--accent-gold)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontWeight: 700
                    }}>
                      ⏰ {rem.daysLeft}
                    </span>
                    <button
                      type="button"
                      onClick={() => alert(`SMS and WhatsApp alert set for ${rem.title}.`)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Set Phone Alert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONFIRMATION MODAL FOR LAWYER BOOKING */}
        {confirmedLawyerBooking && (
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
                backgroundColor: '#8B4513',
                color: '#FFFFFF',
                padding: '24px 28px',
                position: 'relative'
              }}>
                <button
                  onClick={() => setConfirmedLawyerBooking(null)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={18} style={{ color: '#FDE68A' }} />
                  <span style={{ fontSize: '0.72rem', color: '#FDE68A', fontWeight: 700, textTransform: 'uppercase' }}>
                    Accredited Legal Counsel Pass
                  </span>
                </div>

                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  Lawyer Assignment Confirmed
                </h3>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.8)', display: 'block', marginTop: '4px' }}>
                  Legal Case Reference: <strong style={{ color: '#FFFFFF' }}>{confirmedLawyerBooking.ref}</strong>
                </span>
              </div>

              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: '#334155', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Client Name:</span>
                    <strong>{confirmedLawyerBooking.clientName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Service:</span>
                    <strong style={{ color: '#8B4513', textAlign: 'right', maxWidth: '300px' }}>{confirmedLawyerBooking.packageName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Assigned Counsel:</span>
                    <strong>{confirmedLawyerBooking.lawyerAssigned}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: '#64748B', fontWeight: 700 }}>Service Fee:</span>
                    <strong style={{ fontSize: '1.05rem', color: '#8B4513' }}>
                      ₦{confirmedLawyerBooking.priceNgn.toLocaleString()} (${confirmedLawyerBooking.priceUsd})
                    </strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    Next Step:
                  </span>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#14532D', lineHeight: 1.45 }}>
                    Barr. Folake will call you at <strong>{confirmedLawyerBooking.clientPhone}</strong> within 1 hour to review your papers 
                    and issue formal conveyancing guidance.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setConfirmedLawyerBooking(null);
                    onBackToHub();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    backgroundColor: '#8B4513',
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

        {/* CONFIRMATION MODAL FOR OUTSIDE AGREEMENT AUDIT */}
        {confirmedAgreementAudit && (
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
                backgroundColor: '#DC2626',
                color: '#FFFFFF',
                padding: '24px 28px',
                position: 'relative'
              }}>
                <button
                  onClick={() => setConfirmedAgreementAudit(null)}
                  style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldAlert size={18} style={{ color: '#FFFFFF' }} />
                  <span style={{ fontSize: '0.72rem', color: '#FFFFFF', fontWeight: 700, textTransform: 'uppercase' }}>
                    Contract Rip-Off Audit Order
                  </span>
                </div>

                <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  Agreement Audit Queued
                </h3>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.8)', display: 'block', marginTop: '4px' }}>
                  Audit Case Reference: <strong style={{ color: '#FFFFFF' }}>{confirmedAgreementAudit.ref}</strong>
                </span>
              </div>

              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: '#334155', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Seller / Developer:</span>
                    <strong>{confirmedAgreementAudit.sellerName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                    <span style={{ color: '#64748B' }}>Agreement Type:</span>
                    <strong style={{ textAlign: 'right', maxWidth: '300px' }}>{confirmedAgreementAudit.agreementType}</strong>
                  </div>
                  {confirmedAgreementAudit.fileName && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '6px' }}>
                      <span style={{ color: '#64748B' }}>Attached Contract:</span>
                      <strong style={{ color: '#16A34A' }}>📎 {confirmedAgreementAudit.fileName} ({confirmedAgreementAudit.fileSize})</strong>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ color: '#64748B', fontWeight: 700 }}>Audit Fee:</span>
                    <strong style={{ fontSize: '1.05rem', color: '#DC2626' }}>
                      ₦{confirmedAgreementAudit.feeNgn.toLocaleString()} (${confirmedAgreementAudit.feeUsd})
                    </strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '12px 16px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                    What Happens Next?
                  </span>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: '#14532D', lineHeight: 1.45 }}>
                    Our senior property solicitors will scrutinize the clauses of this agreement for hidden forfeiture terms, 
                    price escalation, and title flaws. You will receive an official <strong>Legal Risk & Red Flag Report</strong> within 24 hours.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setConfirmedAgreementAudit(null);
                    onBackToHub();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    backgroundColor: '#DC2626',
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
