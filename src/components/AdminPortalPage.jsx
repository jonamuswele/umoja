import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Search, Filter, 
  Edit3, Trash2, PlusCircle, Check, X, RefreshCw, Eye, Image as ImageIcon, 
  Upload, Video, Layers, Building, MapPin, DollarSign, ExternalLink, 
  ArrowRight, Ban, Play, Sparkles, SlidersHorizontal, ToggleLeft, ToggleRight, 
  FileText, ChevronRight, LogOut, Compass, Info, Clock, AlertCircle,
  Palette, CreditCard, Plus, Trash, CheckSquare, Tag, Layout, ChevronLeft, Save, Sliders, ChevronDown,
  Users, UserCheck, UserX
} from 'lucide-react';
import BuildingMaterialMarketplace from './BuildingMaterialMarketplace';
import PropertyEstateManagement from './PropertyEstateManagement';
import LandVerificationHub from './LandVerificationHub';
import LegalDocumentationHub from './LegalDocumentationHub';
import SmartHomeIntegration from './SmartHomeIntegration';
import RealEstateFinancing from './RealEstateFinancing';
import InteriorDesignHub from './InteriorDesignHub';
import MovingRelocationHub from './MovingRelocationHub';
import HomeServicesMarketplace from './HomeServicesMarketplace';
import ServiceBookingPage from './ServiceBookingPage';
import ServiceShowcasePage from './ServiceShowcasePage';
import { apiService } from '../services/api';
import { 
  getStoredServices, 
  updateStoredService, 
  updateServiceSubscription,
  addServiceSubscription,
  deleteServiceSubscription,
  toggleServiceSubscription,
  toggleServiceStatus, 
  resetStoredServices,
  getUserListings, 
  approveListing, 
  suspendListing, 
  reactivateListing, 
  updateUserListing, 
  deleteUserListing, 
  getAdminLogs 
} from '../utils/userStorage';

// Curated High-Resolution Real Estate & Architecture Photos for 1-Click Page Customization
const CURATED_SERVICE_IMAGES = [
  { label: 'Modern Luxury Villa', category: 'Houses & Estates', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80' },
  { label: 'Prime Tableland Plot', category: 'Land & Plots', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80' },
  { label: 'Highrise Residential Flat', category: 'Apartments', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80' },
  { label: 'Contemporary Residence', category: 'Houses & Estates', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80' },
  { label: 'Executive Commercial Plaza', category: 'Commercial & Legal', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80' },
  { label: 'Luxury Living & Staging', category: 'Interior Design', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80' },
  { label: 'Smart Home Automation', category: 'Smart Tech', url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80' },
  { label: 'Building Materials & Site', category: 'Construction', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80' }
];

export default function AdminPortalPage({ 
  currentAdmin, 
  onLogout, 
  onNavigateToPublic, 
  onSelectService,
  initialEditingServiceId = null
}) {
  const [activeMainTab, setActiveMainTab] = useState('listings'); // 'listings' | 'services' | 'users' | 'logs'
  
  // Data states
  const [services, setServices] = useState(getStoredServices());
  const [listings, setListings] = useState(getUserListings());
  const [adminLogs, setAdminLogs] = useState(getAdminLogs());
  const [users, setUsers] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all'); // 'all' | 'active' | 'suspended' | 'pending'

  // Listings Tab Filters
  const [listingStatusFilter, setListingStatusFilter] = useState('pending'); // 'pending' | 'active' | 'suspended' | 'all'
  const [listingSearchQuery, setListingSearchQuery] = useState('');
  const [listingCategoryFilter, setListingCategoryFilter] = useState('all'); // 'all' | 'apartment' | 'plot'

  // Services Tab Filters & Sub-views
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');
  const [serviceKindFilter, setServiceKindFilter] = useState('all'); // 'all' | 'product' | 'service'
  const [serviceStatusFilter, setServiceStatusFilter] = useState('all'); // 'all' | 'active' | 'disabled'
  const [servicesSubView, setServicesSubView] = useState('catalog'); // 'catalog' | 'pages' | 'subscriptions'
  const [subscriptionSearchQuery, setSubscriptionSearchQuery] = useState('');

  // Modals state & Service Studio / Live Page Customizer
  const [editingService, setEditingService] = useState(null);
  const [serviceEditForm, setServiceEditForm] = useState(null);
  const [serviceImageFilePreview, setServiceImageFilePreview] = useState('');
  const [serviceStudioTab, setServiceStudioTab] = useState('presentation'); // 'presentation' | 'subscriptions' | 'info'
  const [presentationMode, setPresentationMode] = useState('view'); // 'view' (shows original page) | 'edit' (edit writings, colors, pictures)
  const [editorDrawerTab, setEditorDrawerTab] = useState('writings'); // 'writings' | 'colors' | 'photos' | 'subscriptions'
  const [editingPlanIndex, setEditingPlanIndex] = useState(null);
  const [isAddingNewPlan, setIsAddingNewPlan] = useState(false);
  const [newPlanForm, setNewPlanForm] = useState({
    name: '',
    badge: 'Standard Tier',
    priceNgn: 45000,
    priceUsd: 28,
    billingPeriod: 'monthly',
    shortDesc: 'Comprehensive coverage and dedicated execution.',
    offerings: [
      'Verified service deliverables included',
      'Direct customer support and priority coordination'
    ],
    highlighted: false,
    active: true
  });
  const [newPlanOfferingInput, setNewPlanOfferingInput] = useState('');
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [activePlanAccordion, setActivePlanAccordion] = useState(0);
  const [newOfferingInput, setNewOfferingInput] = useState('');
  const [newHighlightInput, setNewHighlightInput] = useState('');
  const serviceFileInputRef = useRef(null);

  const [editingListing, setEditingListing] = useState(null);
  const [listingEditForm, setListingEditForm] = useState(null);

  const [suspendingListing, setSuspendingListing] = useState(null);
  const [suspensionReasonText, setSuspensionReasonText] = useState('Cadastral title clarification required');

  const [previewMediaModal, setPreviewMediaModal] = useState(null); // { type: 'image'|'video', url, title }

  const [toastMessage, setToastMessage] = useState('');

  // Identify pages that have the TikTok-style vertical snapping scrolling
  const isTikTokPage = (service) => {
    if (!service) return false;
    return (
      service.id === 'buy-plots' ||
      service.id === 'buy-houses' ||
      service.id === 'rent-properties' ||
      service.id === 'investment-features' ||
      service.id === 'auction-distressed' ||
      (service.kind === 'product' && service.id !== 'building-material')
    );
  };

  useEffect(() => {
    if (initialEditingServiceId) {
      const targetSvc = services.find(s => s.id === initialEditingServiceId && !isTikTokPage(s));
      if (targetSvc) {
        handleOpenEditService(targetSvc, 'presentation', 'view');
      } else {
        const fallback = services.find(s => !isTikTokPage(s));
        if (fallback) handleOpenEditService(fallback, 'presentation', 'view');
      }
    }
  }, [initialEditingServiceId]);

  useEffect(() => {
    if (servicesSubView === 'pages') {
      const editableList = services.filter(s => !isTikTokPage(s));
      if (!editingService || isTikTokPage(editingService)) {
        if (editableList.length > 0) {
          handleOpenEditService(editableList[0], 'presentation', 'view');
        }
      }
    }
  }, [servicesSubView, editingService, services]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3800);
  };

  const refreshAllData = async () => {
    setServices(getStoredServices());
    setListings(getUserListings());
    setAdminLogs(getAdminLogs());
    try {
      const uRes = await apiService.getUsers(currentAdmin);
      if (Array.isArray(uRes)) {
        setUsers(uRes);
      }
    } catch (e) {
      console.warn('Failed to load users from backend', e);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // ══════════════════════════════════════════════════════════════════════
  // USER MODERATION & SECURITY ACTIONS
  // ══════════════════════════════════════════════════════════════════════

  const handleToggleSuspendUser = async (user) => {
    const action = user.isSuspended ? 'unsuspend' : 'suspend';
    if (window.confirm(`Are you sure you want to ${action} ${user.name} (${user.email || user.username})?`)) {
      const res = await apiService.toggleSuspendUser(user.email || user.username || user.name, currentAdmin);
      if (res && res.success) {
        showToast(res.message || `User account ${action}ed successfully.`);
        await refreshAllData();
      } else {
        showToast(`Failed to update suspension for ${user.name}.`);
      }
    }
  };

  const handleApproveUser = async (user) => {
    const res = await apiService.approveUser(user.email || user.username || user.name, currentAdmin);
    if (res && res.success) {
      showToast(`User ${user.name} approved as verified partner!`);
      await refreshAllData();
    } else {
      showToast(`Failed to approve ${user.name}.`);
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm(`WARNING: Are you sure you want to permanently delete account ${user.name} (${user.email})? This action cannot be undone.`)) {
      const res = await apiService.deleteUser(user.email || user.username || user.name, currentAdmin);
      if (res && res.success) {
        showToast(`User account ${user.name} permanently deleted.`);
        await refreshAllData();
      } else {
        showToast(`Failed to delete ${user.name}.`);
      }
    }
  };

  // ══════════════════════════════════════════════════════════════════════
  // LISTING MODERATION ACTIONS
  // ══════════════════════════════════════════════════════════════════════

  const handleApproveListing = (listing) => {
    approveListing(listing.id, currentAdmin?.name || 'Victoria Adeleke');
    refreshAllData();
    showToast(`Approved listing: "${listing.title}" is now LIVE!`);
  };

  const handleOpenSuspendModal = (listing) => {
    setSuspendingListing(listing);
    setSuspensionReasonText('Cadastral title clearance required with Alausa Lands Bureau');
  };

  const handleConfirmSuspension = () => {
    if (!suspendingListing) return;
    suspendListing(suspendingListing.id, suspensionReasonText, currentAdmin?.name || 'Victoria Adeleke');
    refreshAllData();
    showToast(`Suspended listing: "${suspendingListing.title}"`);
    setSuspendingListing(null);
  };

  const handleReactivateListing = (listing) => {
    reactivateListing(listing.id, currentAdmin?.name || 'Victoria Adeleke');
    refreshAllData();
    showToast(`Restored listing: "${listing.title}" to LIVE status.`);
  };

  const handleDeleteListing = (listingId, title) => {
    if (window.confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      deleteUserListing(listingId);
      refreshAllData();
      showToast(`Deleted listing: "${title}"`);
    }
  };

  const handleOpenEditListing = (listing) => {
    setEditingListing(listing);
    setListingEditForm({
      title: listing.title || '',
      price: listing.price || '',
      location: listing.location || '',
      categoryType: listing.categoryType || 'apartment',
      plotSize: listing.plotSize || '',
      topography: listing.topography || '',
      titleType: listing.titleType || '',
      zoning: listing.zoning || '',
      beaconNumber: listing.beaconNumber || '',
      bedrooms: listing.bedrooms || '',
      bathrooms: listing.bathrooms || '',
      description: listing.description || '',
      contactPhone: listing.contactPhone || ''
    });
  };

  const handleSaveListingEdit = (e) => {
    e.preventDefault();
    if (!editingListing || !listingEditForm) return;

    updateUserListing(editingListing.id, {
      ...listingEditForm,
      price: Number(listingEditForm.price) || listingEditForm.price
    });
    refreshAllData();
    setEditingListing(null);
    setListingEditForm(null);
    showToast(`Successfully updated listing details!`);
  };

  // ══════════════════════════════════════════════════════════════════════
  // SERVICES & SUBSCRIPTIONS STUDIO ACTIONS
  // ══════════════════════════════════════════════════════════════════════

  const handleToggleService = (serviceId) => {
    toggleServiceStatus(serviceId, currentAdmin?.name || 'Victoria Adeleke');
    refreshAllData();
    const target = services.find(s => s.id === serviceId);
    const willBeDisabled = target?.status !== 'disabled';
    showToast(`${willBeDisabled ? 'Disabled' : 'Enabled'} service: "${target?.title}"`);
  };

  const handleOpenEditService = (service, initialStudioTab = 'presentation', initialPresentationMode = 'view') => {
    if (isTikTokPage(service)) {
      showToast(`"${service.title}" has a TikTok-style snapping layout and cannot be customized here.`);
      return;
    }
    setActiveMainTab('services');
    setServicesSubView('pages');
    setPresentationMode(initialPresentationMode);
    setEditingService(service);
    setServiceImageFilePreview(service.heroImage || service.image || '');
    setServiceStudioTab(initialStudioTab);
    setEditingPlanIndex(null);
    setIsAddingNewPlan(false);
    setIsImagePickerOpen(false);
    setActivePlanAccordion(0);
    setNewOfferingInput('');
    setNewHighlightInput('');
    setNewPlanOfferingInput('');
    setNewPlanForm({
      name: '',
      badge: 'Standard Tier',
      priceNgn: 45000,
      priceUsd: 28,
      billingPeriod: service.kind === 'service' ? 'monthly' : 'total',
      shortDesc: 'Comprehensive coverage and dedicated execution.',
      offerings: [
        'Verified service deliverables included',
        'Direct customer support and priority coordination'
      ],
      highlighted: false,
      active: true
    });
    setServiceEditForm({
      id: service.id,
      title: service.title || '',
      shortDesc: service.shortDesc || '',
      category: service.category || '',
      tag: service.tag || '',
      heroImage: service.heroImage || service.image || '',
      kind: service.kind || 'service',
      accentColor: service.accentColor || '#1A3E26',
      textColor: service.textColor || '#FFFFFF',
      subtitleColor: service.subtitleColor || '#F1F5F9',
      badgeColor: service.badgeColor || '#FDE68A',
      layoutStyle: service.layoutStyle || 'card-modern',
      heroHeadline: service.heroHeadline || service.title || '',
      heroSubtitle: service.heroSubtitle || service.shortDesc || service.description || '',
      badgeText: service.badgeText || service.badge || 'Verified Service',
      ctaLabel: service.ctaLabel || (service.kind === 'service' ? 'Reserve Consultation' : 'Inquire Now'),
      highlights: Array.isArray(service.highlights) ? [...service.highlights] : [],
      subscriptions: Array.isArray(service.subscriptions) ? JSON.parse(JSON.stringify(service.subscriptions)) : []
    });
  };

  const handleSwitchCustomizerService = (serviceId) => {
    const nextService = services.find(s => s.id === serviceId && !isTikTokPage(s));
    if (nextService) {
      handleOpenEditService(nextService, serviceStudioTab, presentationMode);
    }
  };

  const handleNavigateAdjacentService = (direction = 1) => {
    const editableList = services.filter(s => !isTikTokPage(s));
    const currentIndex = editableList.findIndex(s => s.id === editingService?.id);
    if (currentIndex === -1) {
      if (editableList.length > 0) handleOpenEditService(editableList[0], serviceStudioTab, presentationMode);
      return;
    }
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = editableList.length - 1;
    if (nextIndex >= editableList.length) nextIndex = 0;
    handleOpenEditService(editableList[nextIndex], serviceStudioTab, presentationMode);
  };

  const handleSelectCuratedImage = (imageUrl) => {
    setServiceImageFilePreview(imageUrl);
    setServiceEditForm(prev => ({ ...prev, heroImage: imageUrl }));
    showToast('Applied curated hero photo to page presentation!');
  };

  const handleServiceImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setServiceImageFilePreview(dataUrl);
      setServiceEditForm(prev => ({ ...prev, heroImage: dataUrl }));
      showToast('Uploaded custom photo to page presentation!');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveServiceEdit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingService || !serviceEditForm) return;

    updateStoredService(editingService.id, serviceEditForm, currentAdmin?.name || 'Victoria Adeleke');
    refreshAllData();
    setEditingService(serviceEditForm);
    showToast(`Saved full updates, writings, colors & subscriptions for "${serviceEditForm.title}"!`);
  };

  const renderLivePageComponent = () => {
    if (!editingService || !serviceEditForm) return null;
    const svcId = editingService.id;

    if (svcId === 'building-material') {
      return <BuildingMaterialMarketplace customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (svcId === 'property-management' || svcId === 'estate-management') {
      return <PropertyEstateManagement customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (svcId === 'land-verification') {
      return <LandVerificationHub customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (svcId === 'legal-documentation') {
      return <LegalDocumentationHub customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (svcId === 'smart-home') {
      return <SmartHomeIntegration customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (svcId === 'financing') {
      return <RealEstateFinancing customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (svcId === 'interior-finishing' || svcId === 'interior-design') {
      return <InteriorDesignHub customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (svcId === 'moving-services' || svcId === 'relocation') {
      return <MovingRelocationHub customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (svcId === 'home-services') {
      return <HomeServicesMarketplace customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    if (serviceEditForm.kind === 'service') {
      return <ServiceBookingPage service={serviceEditForm} customService={serviceEditForm} onBackToHub={() => setServicesSubView('catalog')} />;
    }
    return (
      <ServiceShowcasePage 
        service={serviceEditForm} 
        customService={serviceEditForm} 
        allServices={services} 
        onBackToHub={() => setServicesSubView('catalog')} 
        onSelectService={(id) => handleSwitchCustomizerService(id)} 
      />
    );
  };

  // Subscription plan handlers inside Studio
  const handleUpdateSubscriptionField = (planIndex, field, value) => {
    setServiceEditForm(prev => {
      const nextSubs = [...prev.subscriptions];
      nextSubs[planIndex] = { ...nextSubs[planIndex], [field]: value };
      if (field === 'priceNgn') {
        const numNgn = Number(value) || 0;
        nextSubs[planIndex].priceUsd = Math.round(numNgn / 1600);
      }
      return { ...prev, subscriptions: nextSubs };
    });
  };

  const handleAddOfferingToPlan = (planIndex, offeringText) => {
    if (!offeringText || !offeringText.trim()) return;
    setServiceEditForm(prev => {
      const nextSubs = [...prev.subscriptions];
      const curPlan = nextSubs[planIndex];
      const offerings = Array.isArray(curPlan.offerings) ? [...curPlan.offerings, offeringText.trim()] : [offeringText.trim()];
      nextSubs[planIndex] = { ...curPlan, offerings };
      return { ...prev, subscriptions: nextSubs };
    });
    setNewOfferingInput('');
  };

  const handleRemoveOfferingFromPlan = (planIndex, offeringIdx) => {
    setServiceEditForm(prev => {
      const nextSubs = [...prev.subscriptions];
      const curPlan = nextSubs[planIndex];
      const offerings = (curPlan.offerings || []).filter((_, idx) => idx !== offeringIdx);
      nextSubs[planIndex] = { ...curPlan, offerings };
      return { ...prev, subscriptions: nextSubs };
    });
  };

  const handleAddNewPlanOffering = (offeringText) => {
    if (!offeringText || !offeringText.trim()) return;
    setNewPlanForm(prev => ({
      ...prev,
      offerings: [...(prev.offerings || []), offeringText.trim()]
    }));
    setNewPlanOfferingInput('');
  };

  const handleRemoveNewPlanOffering = (idx) => {
    setNewPlanForm(prev => ({
      ...prev,
      offerings: (prev.offerings || []).filter((_, i) => i !== idx)
    }));
  };

  const handleSaveNewPlanToService = () => {
    if (!newPlanForm.name.trim()) {
      showToast('Please enter a name for the new subscription plan.');
      return;
    }
    const newPlan = {
      id: `plan-${Date.now()}`,
      name: newPlanForm.name.trim(),
      badge: newPlanForm.badge.trim() || 'New Tier',
      priceNgn: Number(newPlanForm.priceNgn) || 0,
      priceUsd: Number(newPlanForm.priceUsd) || Math.round((Number(newPlanForm.priceNgn) || 0) / 1600),
      billingPeriod: newPlanForm.billingPeriod || 'monthly',
      shortDesc: newPlanForm.shortDesc.trim() || 'Complete deliverables and service coverage.',
      offerings: (newPlanForm.offerings && newPlanForm.offerings.length > 0) ? newPlanForm.offerings : ['Verified service deliverable'],
      highlighted: !!newPlanForm.highlighted,
      active: true
    };
    setServiceEditForm(prev => ({
      ...prev,
      subscriptions: [...(prev.subscriptions || []), newPlan]
    }));
    setIsAddingNewPlan(false);
    setNewPlanForm({
      name: '',
      badge: 'Standard Tier',
      priceNgn: 45000,
      priceUsd: 28,
      billingPeriod: 'monthly',
      shortDesc: 'Comprehensive coverage and dedicated execution.',
      offerings: [
        'Verified service deliverables included',
        'Direct customer support and priority coordination'
      ],
      highlighted: false,
      active: true
    });
    showToast(`Added new subscription tier: "${newPlan.name}"!`);
  };

  const handleDeleteSubscriptionPlanDirect = (planIndex) => {
    const planName = serviceEditForm?.subscriptions?.[planIndex]?.name || 'Plan';
    setServiceEditForm(prev => {
      const nextSubs = prev.subscriptions.filter((_, idx) => idx !== planIndex);
      return { ...prev, subscriptions: nextSubs };
    });
    if (editingPlanIndex === planIndex) {
      setEditingPlanIndex(null);
    }
    showToast(`Removed subscription tier: "${planName}".`);
  };

  const handleToggleSubscriptionPlanActive = (planIndex) => {
    setServiceEditForm(prev => {
      const nextSubs = [...prev.subscriptions];
      nextSubs[planIndex] = { ...nextSubs[planIndex], active: !nextSubs[planIndex].active };
      return { ...prev, subscriptions: nextSubs };
    });
  };

  const handleToggleSubscriptionPlanHighlight = (planIndex) => {
    setServiceEditForm(prev => {
      const nextSubs = prev.subscriptions.map((p, idx) => ({
        ...p,
        highlighted: idx === planIndex ? !p.highlighted : false
      }));
      return { ...prev, subscriptions: nextSubs };
    });
  };

  const handleAddPageHighlight = (highlightText) => {
    if (!highlightText || !highlightText.trim()) return;
    setServiceEditForm(prev => ({
      ...prev,
      highlights: [...(prev.highlights || []), highlightText.trim()]
    }));
    setNewHighlightInput('');
  };

  const handleRemovePageHighlight = (highlightIdx) => {
    setServiceEditForm(prev => ({
      ...prev,
      highlights: (prev.highlights || []).filter((_, idx) => idx !== highlightIdx)
    }));
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset all service titles, descriptions, page styles, and subscriptions to factory defaults?')) {
      resetStoredServices(currentAdmin?.name || 'Victoria Adeleke');
      refreshAllData();
      showToast('All services & subscriptions reset to factory defaults.');
    }
  };

  // ══════════════════════════════════════════════════════════════════════
  // FILTERING COMPUTATIONS
  // ══════════════════════════════════════════════════════════════════════

  const pendingListingsCount = listings.filter(l => (l.status || '').toLowerCase() === 'pending').length;
  const activeListingsCount = listings.filter(l => (l.status || '').toLowerCase() === 'active').length;
  const suspendedListingsCount = listings.filter(l => (l.status || '').toLowerCase() === 'suspended').length;

  const filteredListings = listings.filter(l => {
    const status = (l.status || 'Active').toLowerCase();
    const matchesStatus = 
      listingStatusFilter === 'all' ||
      (listingStatusFilter === 'pending' && status === 'pending') ||
      (listingStatusFilter === 'active' && status === 'active') ||
      (listingStatusFilter === 'suspended' && status === 'suspended');

    const matchesCategory = 
      listingCategoryFilter === 'all' ||
      l.categoryType === listingCategoryFilter;

    const query = listingSearchQuery.toLowerCase();
    const matchesQuery = 
      (l.title || '').toLowerCase().includes(query) ||
      (l.location || '').toLowerCase().includes(query) ||
      (l.postedBy || '').toLowerCase().includes(query) ||
      (l.beaconNumber || '').toLowerCase().includes(query);

    return matchesStatus && matchesCategory && matchesQuery;
  });

  const activeServicesCount = services.filter(s => s.status !== 'disabled').length;
  const disabledServicesCount = services.filter(s => s.status === 'disabled').length;

  // Filter out pages that have TikTok snapping so they are completely removed from editable catalog
  const editableServices = services.filter(s => !isTikTokPage(s));
  const activeEditableServicesCount = editableServices.filter(s => s.status !== 'disabled').length;
  const disabledEditableServicesCount = editableServices.filter(s => s.status === 'disabled').length;

  const filteredServices = editableServices.filter(s => {
    const isServiceDisabled = s.status === 'disabled';
    const matchesStatus = 
      serviceStatusFilter === 'all' ||
      (serviceStatusFilter === 'active' && !isServiceDisabled) ||
      (serviceStatusFilter === 'disabled' && isServiceDisabled);

    const matchesKind = 
      serviceKindFilter === 'all' || 
      s.kind === serviceKindFilter;

    const query = serviceSearchQuery.toLowerCase();
    const matchesQuery = 
      (s.title || '').toLowerCase().includes(query) ||
      (s.shortDesc || '').toLowerCase().includes(query) ||
      (s.category || '').toLowerCase().includes(query) ||
      (s.tag || '').toLowerCase().includes(query);

    return matchesStatus && matchesKind && matchesQuery;
  });

  const suspendedUsersCount = users.filter(u => u.isSuspended).length;
  const pendingUsersCount = users.filter(u => !u.isApproved).length;

  const filteredUsers = users.filter(u => {
    const matchesFilter = 
      userFilter === 'all' ||
      (userFilter === 'active' && !u.isSuspended && u.isApproved) ||
      (userFilter === 'suspended' && u.isSuspended) ||
      (userFilter === 'pending' && !u.isApproved);

    const query = userSearchQuery.toLowerCase();
    const matchesQuery = 
      (u.name || '').toLowerCase().includes(query) ||
      (u.email || '').toLowerCase().includes(query) ||
      (u.role || '').toLowerCase().includes(query) ||
      (u.phone || '').toLowerCase().includes(query);

    return matchesFilter && matchesQuery;
  });

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#FAF9F6',
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '80px'
    }}>

      {/* ══════════════════════════════════════════════════════════════════════
          ADMIN TOP NAVIGATION BANNER
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        backgroundColor: '#0A150E',
        borderBottom: '1px solid rgba(210, 125, 45, 0.3)',
        color: '#FFFFFF',
        padding: '24px 6%'
      }}>
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* Admin Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={currentAdmin?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'} 
                alt="Admin"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-gold)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                backgroundColor: 'var(--accent-gold)',
                color: '#0A150E',
                borderRadius: '50%',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Shield size={12} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  Admin Operations Console
                </h1>
                <span style={{
                  backgroundColor: 'rgba(210, 125, 45, 0.25)',
                  color: 'var(--accent-gold)',
                  border: '1px solid rgba(210, 125, 45, 0.5)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Super Admin
                </span>
              </div>
              <p style={{ margin: '3px 0 0 0', fontSize: '0.82rem', color: '#9CA3AF' }}>
                Logged in as <strong>{currentAdmin?.name || 'Victoria Adeleke'}</strong> ({currentAdmin?.email || 'admin@umojaterra.com'})
              </p>
            </div>
          </div>

          {/* Quick Platform Metrics & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateToPublic('home')}
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
            >
              <ExternalLink size={14} />
              <span>View Public Platform</span>
            </button>

            <button
              onClick={onLogout}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#FCA5A5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <LogOut size={14} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          METRICS BAR & MAIN NAVIGATION TABS
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1300px',
        margin: '24px auto 0',
        padding: '0 6%',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Metric Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {/* Card 1: Pending Approvals (Non-interactive Summary) */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '16px 20px',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none'
            }}
          >
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280', fontWeight: 700 }}>
                Pending Review
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: pendingListingsCount > 0 ? '#D97706' : 'var(--text-title)', marginTop: '2px' }}>
                {pendingListingsCount}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                Plots &amp; Apartments awaiting approval
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(217, 119, 6, 0.1)',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={22} />
            </div>
          </div>

          {/* Card 2: Live Listings (Non-interactive Summary) */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '16px 20px',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none'
            }}
          >
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280', fontWeight: 700 }}>
                Live On Platform
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', marginTop: '2px' }}>
                {activeListingsCount}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                Verified active properties
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(26, 62, 38, 0.1)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={22} />
            </div>
          </div>

          {/* Card 3: Suspended Listings (Non-interactive Summary) */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '16px 20px',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none'
            }}
          >
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280', fontWeight: 700 }}>
                Suspended Plots
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: suspendedListingsCount > 0 ? '#EF4444' : 'var(--text-title)', marginTop: '2px' }}>
                {suspendedListingsCount}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                Flagged or paused listings
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Ban size={22} />
            </div>
          </div>

          {/* Card 4: Services Catalog (Non-interactive Summary) */}
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '16px 20px',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none'
            }}
          >
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6B7280', fontWeight: 700 }}>
                Platform Services
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-title)', marginTop: '2px' }}>
                {activeServicesCount} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#9CA3AF' }}>/ {services.length}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: disabledServicesCount > 0 ? '#D97706' : '#9CA3AF' }}>
                {disabledServicesCount > 0 ? `${disabledServicesCount} disabled by admin` : 'All services active'}
              </div>
            </div>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(210, 125, 45, 0.1)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Compass size={22} />
            </div>
          </div>
        </div>

        {/* Primary Tab Navigation Buttons */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid var(--border)',
          gap: '12px',
          marginBottom: '28px'
        }}>
          <button
            onClick={() => setActiveMainTab('listings')}
            style={{
              padding: '12px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeMainTab === 'listings' ? '3px solid var(--accent)' : '3px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.92rem',
              color: activeMainTab === 'listings' ? 'var(--accent)' : 'var(--text-body)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease'
            }}
          >
            <Building size={18} />
            <span>User Plots &amp; Apartments Moderation</span>
            {pendingListingsCount > 0 && (
              <span style={{
                backgroundColor: '#D97706',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '2px 7px',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {pendingListingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMainTab('services')}
            style={{
              padding: '12px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeMainTab === 'services' ? '3px solid var(--accent)' : '3px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.92rem',
              color: activeMainTab === 'services' ? 'var(--accent)' : 'var(--text-body)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease'
            }}
          >
            <Compass size={18} />
            <span>Services &amp; Products Catalog</span>
            {disabledServicesCount > 0 && (
              <span style={{
                backgroundColor: '#9CA3AF',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '2px 7px',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {disabledServicesCount} off
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMainTab('logs')}
            style={{
              padding: '12px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeMainTab === 'logs' ? '3px solid var(--accent)' : '3px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.92rem',
              color: activeMainTab === 'logs' ? 'var(--accent)' : 'var(--text-body)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease'
            }}
          >
            <ShieldCheck size={18} />
            <span>Audit Trail &amp; Logs</span>
          </button>

          <button
            onClick={() => setActiveMainTab('users')}
            style={{
              padding: '12px 20px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeMainTab === 'users' ? '3px solid var(--accent)' : '3px solid transparent',
              marginBottom: '-2px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.92rem',
              color: activeMainTab === 'users' ? 'var(--accent)' : 'var(--text-body)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease'
            }}
          >
            <Users size={18} />
            <span>Security &amp; Members</span>
            {(suspendedUsersCount > 0 || pendingUsersCount > 0) && (
              <span style={{
                backgroundColor: suspendedUsersCount > 0 ? '#EF4444' : '#D97706',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '2px 7px',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {suspendedUsersCount > 0 ? `${suspendedUsersCount} suspended` : `${pendingUsersCount} pending`}
              </span>
            )}
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 1: USER PLOTS & APARTMENTS MODERATION
            ══════════════════════════════════════════════════════════════════════ */}
        {activeMainTab === 'listings' && (
          <div>
            {/* Search & Sub-Filter Bar */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              padding: '18px 20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              border: '1px solid var(--border)',
              marginBottom: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {/* Status Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { id: 'pending', label: 'Needs Approval', count: pendingListingsCount, color: '#D97706' },
                  { id: 'active', label: 'Live / Active', count: activeListingsCount, color: 'var(--accent)' },
                  { id: 'suspended', label: 'Suspended', count: suspendedListingsCount, color: '#EF4444' },
                  { id: 'all', label: 'All Listings', count: listings.length, color: '#4B5563' }
                ].map(tab => {
                  const isSel = listingStatusFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setListingStatusFilter(tab.id)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '20px',
                        border: isSel ? `1.5px solid ${tab.color}` : '1px solid var(--border)',
                        backgroundColor: isSel ? (tab.color === 'var(--accent)' ? 'rgba(26,62,38,0.08)' : `${tab.color}15`) : '#FFFFFF',
                        color: isSel ? tab.color : 'var(--text-body)',
                        fontSize: '0.8rem',
                        fontWeight: isSel ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{tab.label}</span>
                      <span style={{
                        fontSize: '0.72rem',
                        backgroundColor: isSel ? tab.color : '#E5E7EB',
                        color: isSel ? '#FFFFFF' : '#4B5563',
                        padding: '1px 6px',
                        borderRadius: '10px',
                        fontWeight: 700
                      }}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Category Filter & Search Box */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: '1 1 300px', maxWidth: '500px' }}>
                <select
                  value={listingCategoryFilter}
                  onChange={(e) => setListingCategoryFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.82rem',
                    color: 'var(--text-title)',
                    backgroundColor: '#FFFFFF',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="plot">Land Plots Only</option>
                  <option value="apartment">Apartments &amp; Houses</option>
                </select>

                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="text"
                    placeholder="Search by title, location, poster..."
                    value={listingSearchQuery}
                    onChange={(e) => setListingSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px 8px 32px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.82rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length === 0 ? (
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '60px 20px',
                textAlign: 'center',
                border: '1px dashed var(--border)'
              }}>
                <CheckCircle2 size={42} style={{ color: 'var(--accent)', margin: '0 auto 12px', opacity: 0.7 }} />
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', marginBottom: '6px' }}>
                  No Listings in this View
                </h3>
                <p style={{ color: '#6B7280', fontSize: '0.85rem' }}>
                  {listingStatusFilter === 'pending' 
                    ? 'All user submitted plots and apartments have been reviewed and approved!'
                    : 'No property listings match the selected filters.'}
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredListings.map(listing => {
                  const isPending = (listing.status || '').toLowerCase() === 'pending';
                  const isSuspended = (listing.status || '').toLowerCase() === 'suspended';
                  const isLive = !isPending && !isSuspended;
                  const isPlot = listing.categoryType === 'plot';

                  return (
                    <div
                      key={listing.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: isPending ? '1.5px solid #F59E0B' : (isSuspended ? '1.5px solid #EF4444' : '1px solid var(--border)'),
                        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                        overflow: 'hidden',
                        display: 'grid',
                        gridTemplateColumns: '260px 1fr auto',
                        gap: '20px',
                        padding: '18px 20px',
                        alignItems: 'center'
                      }}
                      className="admin-listing-card"
                    >
                      {/* Left: Thumbnail Gallery & Video Preview */}
                      <div style={{ position: 'relative' }}>
                        <img 
                          src={listing.image || (listing.images && listing.images[0]) || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600'} 
                          alt={listing.title}
                          style={{
                            width: '100%',
                            height: '160px',
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1px solid var(--border)',
                            cursor: 'pointer'
                          }}
                          onClick={() => setPreviewMediaModal({
                            type: 'image',
                            url: listing.image || (listing.images && listing.images[0]),
                            title: listing.title
                          })}
                        />

                        {/* Category badge */}
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          backgroundColor: isPlot ? '#065F46' : 'var(--accent)',
                          color: '#FFFFFF',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}>
                          {isPlot ? 'Land Plot' : 'Apartment / House'}
                        </div>

                        {/* Photo count indicator */}
                        {listing.images && listing.images.length > 0 && (
                          <div style={{
                            position: 'absolute',
                            bottom: '8px',
                            left: '8px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: '#FFFFFF',
                            padding: '2px 7px',
                            borderRadius: '4px',
                            fontSize: '0.68rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <ImageIcon size={11} />
                            <span>{listing.images.length} photos</span>
                          </div>
                        )}

                        {/* Video tour badge */}
                        {listing.videoUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewMediaModal({
                                type: 'video',
                                url: listing.videoUrl,
                                title: `${listing.title} (Video Tour)`
                              });
                            }}
                            style={{
                              position: 'absolute',
                              bottom: '8px',
                              right: '8px',
                              backgroundColor: 'rgba(210, 125, 45, 0.9)',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '3px 7px',
                              borderRadius: '4px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <Play size={10} fill="#FFFFFF" />
                            <span>Video</span>
                          </button>
                        )}
                      </div>

                      {/* Middle: Details & Specs */}
                      <div>
                        {/* Status Pill & Submitted Timestamp */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span style={{
                            backgroundColor: isPending ? 'rgba(245, 158, 11, 0.15)' : (isSuspended ? 'rgba(239, 68, 68, 0.15)' : 'rgba(26, 62, 38, 0.1)'),
                            color: isPending ? '#D97706' : (isSuspended ? '#EF4444' : 'var(--accent)'),
                            border: `1px solid ${isPending ? '#F59E0B' : (isSuspended ? '#EF4444' : 'var(--accent)')}`,
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {isPending && <Clock size={11} />}
                            {isLive && <CheckCircle2 size={11} />}
                            {isSuspended && <AlertCircle size={11} />}
                            {isPending ? 'Pending Admin Approval' : (isSuspended ? 'Suspended by Admin' : 'Live on Platform')}
                          </span>

                          <span style={{ fontSize: '0.74rem', color: '#6B7280' }}>
                            Submitted by <strong>{listing.postedBy || 'User'}</strong> • {listing.datePosted || 'Recently'}
                          </span>
                        </div>

                        {/* Title & Location */}
                        <h3 style={{ fontSize: '1.12rem', fontWeight: 700, color: 'var(--text-title)', margin: '0 0 4px 0' }}>
                          {listing.title}
                        </h3>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#6B7280', fontSize: '0.82rem', margin: '0 0 10px 0' }}>
                          <MapPin size={13} style={{ color: 'var(--accent-gold)' }} />
                          <span>{listing.location}</span>
                        </p>

                        {/* Key Attributes Pills */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                          <span style={{ backgroundColor: '#F3F4F6', color: '#1F2937', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                            ₦{Number(listing.price).toLocaleString()} {listing.pricePeriod ? `/${listing.pricePeriod}` : ''}
                          </span>

                          {isPlot ? (
                            <>
                              {listing.plotSize && (
                                <span style={{ backgroundColor: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                                  📐 {listing.plotSize}
                                </span>
                              )}
                              {listing.topography && (
                                <span style={{ backgroundColor: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                                  🌱 {listing.topography}
                                </span>
                              )}
                              {listing.titleType && (
                                <span style={{ backgroundColor: 'rgba(26,62,38,0.08)', color: 'var(--accent)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                                  📜 {listing.titleType}
                                </span>
                              )}
                              {listing.beaconNumber && (
                                <span style={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                  📍 Beacon: {listing.beaconNumber}
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              {listing.bedrooms && (
                                <span style={{ backgroundColor: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                                  🛏️ {listing.bedrooms} Beds
                                </span>
                              )}
                              {listing.bathrooms && (
                                <span style={{ backgroundColor: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                                  🚿 {listing.bathrooms} Baths
                                </span>
                              )}
                              {listing.furnishing && (
                                <span style={{ backgroundColor: '#F3F4F6', color: '#374151', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>
                                  🛋️ {listing.furnishing}
                                </span>
                              )}
                            </>
                          )}
                        </div>

                        {/* Description excerpt */}
                        {listing.description && (
                          <p style={{
                            fontSize: '0.8rem',
                            color: '#4B5563',
                            margin: 0,
                            lineHeight: 1.45,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {listing.description}
                          </p>
                        )}

                        {/* Suspension Note if any */}
                        {isSuspended && listing.suspensionReason && (
                          <div style={{
                            marginTop: '8px',
                            backgroundColor: '#FEF2F2',
                            border: '1px solid #FCA5A5',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            color: '#991B1B'
                          }}>
                            <strong>Suspension Reason:</strong> {listing.suspensionReason}
                          </div>
                        )}
                      </div>

                      {/* Right: Moderator Control Buttons */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        minWidth: '150px'
                      }}>
                        {/* Approve button (if pending) */}
                        {isPending && (
                          <button
                            onClick={() => handleApproveListing(listing)}
                            style={{
                              backgroundColor: 'var(--accent)',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              boxShadow: '0 2px 6px rgba(26,62,38,0.2)'
                            }}
                          >
                            <Check size={14} />
                            <span>Approve Listing</span>
                          </button>
                        )}

                        {/* Suspend button (if active) */}
                        {isLive && (
                          <button
                            onClick={() => handleOpenSuspendModal(listing)}
                            style={{
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              color: '#DC2626',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <Ban size={14} />
                            <span>Suspend Listing</span>
                          </button>
                        )}

                        {/* Reactivate button (if suspended) */}
                        {isSuspended && (
                          <button
                            onClick={() => handleReactivateListing(listing)}
                            style={{
                              backgroundColor: 'var(--accent)',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <CheckCircle2 size={14} />
                            <span>Restore to Live</span>
                          </button>
                        )}

                        {/* Edit details button */}
                        <button
                          onClick={() => handleOpenEditListing(listing)}
                          style={{
                            backgroundColor: '#F3F4F6',
                            color: '#374151',
                            border: '1px solid #D1D5DB',
                            padding: '7px 12px',
                            borderRadius: '6px',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <Edit3 size={13} />
                          <span>Edit Details</span>
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDeleteListing(listing.id, listing.title)}
                          style={{
                            backgroundColor: 'transparent',
                            color: '#9CA3AF',
                            border: 'none',
                            padding: '6px',
                            fontSize: '0.74rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 2: SERVICES & SUBSCRIPTIONS STUDIO & CATALOG
            ══════════════════════════════════════════════════════════════════════ */}
        {activeMainTab === 'services' && (() => {
          // Pre-compute all subscriptions across services for directory view
          const allPlatformSubscriptions = services.flatMap(s => 
            (s.subscriptions || []).map(p => ({
              ...p,
              serviceId: s.id,
              serviceTitle: s.title,
              serviceKind: s.kind,
              serviceCategory: s.category,
              serviceAccent: s.accentColor || '#1A3E26'
            }))
          );

          const filteredSubscriptions = allPlatformSubscriptions.filter(sub => {
            const q = (subscriptionSearchQuery || '').toLowerCase();
            return (
              (sub.name || '').toLowerCase().includes(q) ||
              (sub.serviceTitle || '').toLowerCase().includes(q) ||
              (sub.badge || '').toLowerCase().includes(q) ||
              (sub.shortDesc || '').toLowerCase().includes(q)
            );
          });

          return (
            <div>
              {/* Sub-View Switcher: Catalog vs Subscriptions Directory */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', gap: '8px', backgroundColor: '#FFFFFF', padding: '5px', borderRadius: '12px', border: '1px solid var(--border)', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setServicesSubView('catalog')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: servicesSubView === 'catalog' ? 'var(--accent)' : 'transparent',
                      color: servicesSubView === 'catalog' ? '#FFFFFF' : 'var(--text-body)',
                      fontWeight: servicesSubView === 'catalog' ? 700 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Layers size={15} />
                    <span>Catalog Grid ({editableServices.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setServicesSubView('pages');
                      if (!editingService || isTikTokPage(editingService)) {
                        const first = services.find(s => !isTikTokPage(s));
                        if (first) handleOpenEditService(first, 'presentation', 'view');
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: servicesSubView === 'pages' ? 'var(--accent)' : 'transparent',
                      color: servicesSubView === 'pages' ? '#FFFFFF' : 'var(--text-body)',
                      fontWeight: servicesSubView === 'pages' ? 800 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Layout size={15} />
                    <span>Page Management &amp; Live Editor (All Pages)</span>
                  </button>

                  <button
                    onClick={() => setServicesSubView('subscriptions')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: servicesSubView === 'subscriptions' ? 'var(--accent-gold)' : 'transparent',
                      color: servicesSubView === 'subscriptions' ? '#000000' : 'var(--text-body)',
                      fontWeight: servicesSubView === 'subscriptions' ? 800 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <CreditCard size={15} />
                    <span>All Subscriptions Directory ({allPlatformSubscriptions.length})</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    onClick={handleResetCatalog}
                    title="Reset all descriptions & pictures to original state"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#4B5563',
                      border: '1px solid #D1D5DB',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <RefreshCw size={13} />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </div>

              {/* ══════════════════════════════════════════════════════════════════
                  SUB-VIEW A: SERVICES CATALOG GRID
                  ══════════════════════════════════════════════════════════════════ */}
              {servicesSubView === 'catalog' && (
                <>
                  {/* Filters Bar */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    border: '1px solid var(--border)',
                    marginBottom: '24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <select
                        value={serviceKindFilter}
                        onChange={(e) => setServiceKindFilter(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.82rem',
                          color: 'var(--text-title)',
                          backgroundColor: '#FFFFFF',
                          outline: 'none'
                        }}
                      >
                        <option value="all">All Types (Products &amp; Services)</option>
                        <option value="product">Products (Building Materials)</option>
                        <option value="service">Services (Construction, Legal, Survey)</option>
                      </select>

                      <select
                        value={serviceStatusFilter}
                        onChange={(e) => setServiceStatusFilter(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.82rem',
                          color: 'var(--text-title)',
                          backgroundColor: '#FFFFFF',
                          outline: 'none'
                        }}
                      >
                        <option value="all">All States</option>
                        <option value="active">Active Only ({activeEditableServicesCount})</option>
                        <option value="disabled">Disabled Only ({disabledEditableServicesCount})</option>
                      </select>
                    </div>

                    <div style={{ position: 'relative', width: '280px' }}>
                      <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                      <input
                        type="text"
                        placeholder="Search services & products..."
                        value={serviceSearchQuery}
                        onChange={(e) => setServiceSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px 8px 32px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.82rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Services Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '22px'
                  }}>
                    {filteredServices.map(service => {
                      const isDisabled = service.status === 'disabled';
                      const subs = service.subscriptions || [];
                      const activeSubs = subs.filter(s => s.active !== false);
                      const minPrice = activeSubs.length > 0 
                        ? Math.min(...activeSubs.map(s => s.priceNgn || 0))
                        : 0;

                      return (
                        <div
                          key={service.id}
                          onClick={() => handleOpenEditService(service, 'presentation', 'view')}
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '14px',
                            border: isDisabled ? '1px dashed #9CA3AF' : '1px solid var(--border)',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            opacity: isDisabled ? 0.75 : 1,
                            transition: 'all 0.2s ease',
                            borderTop: `4px solid ${service.accentColor || 'var(--accent)'}`,
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.03)';
                          }}
                        >
                          {/* Service Hero Cover Image */}
                          <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                            <img 
                              src={service.heroImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'} 
                              alt={service.title}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)'
                            }} />

                            {/* Kind & Category Badges */}
                            <div style={{
                              position: 'absolute',
                              top: '12px',
                              left: '12px',
                              display: 'flex',
                              gap: '6px'
                            }}>
                              <span style={{
                                backgroundColor: service.kind === 'product' ? 'var(--accent)' : 'var(--accent-gold)',
                                color: service.kind === 'product' ? '#FFFFFF' : '#000000',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.66rem',
                                fontWeight: 800,
                                textTransform: 'uppercase'
                              }}>
                                {service.kind}
                              </span>
                              <span style={{
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                color: '#FFFFFF',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.66rem'
                              }}>
                                {service.category}
                              </span>
                            </div>

                            {/* Status Toggle Switch Overlay */}
                            <button
                              onClick={(e) => { e.stopPropagation(); handleToggleService(service.id); }}
                              style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                backgroundColor: isDisabled ? '#EF4444' : 'var(--accent)',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '4px 10px',
                                borderRadius: '16px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                              }}
                              title={isDisabled ? "Click to enable service" : "Click to disable service"}
                            >
                              {isDisabled ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                              <span>{isDisabled ? 'Disabled' : 'Active'}</span>
                            </button>

                            {/* Title on cover */}
                            <div style={{
                              position: 'absolute',
                              bottom: '12px',
                              left: '14px',
                              right: '14px',
                              color: '#FFFFFF'
                            }}>
                              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                {service.title}
                              </h4>
                              <div style={{ fontSize: '0.72rem', color: '#FCD34D', fontWeight: 600 }}>
                                {service.badgeText || service.badge || 'Verified Service'}
                              </div>
                            </div>
                          </div>

                          {/* Content Details */}
                          <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <p style={{
                              fontSize: '0.84rem',
                              color: 'var(--text-body)',
                              lineHeight: 1.5,
                              margin: '0 0 14px 0',
                              flex: 1
                            }}>
                              {service.shortDesc}
                            </p>

                            {/* Subscriptions Pill Summary */}
                            <div style={{
                              backgroundColor: '#FAF9F6',
                              border: '1px solid var(--border)',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              marginBottom: '14px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CreditCard size={15} style={{ color: 'var(--accent)' }} />
                                <div>
                                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-title)' }}>
                                    {subs.length} Subscription {subs.length === 1 ? 'Tier' : 'Tiers'}
                                  </div>
                                  <div style={{ fontSize: '0.7rem', color: '#6B7280' }}>
                                    {minPrice > 0 ? `Starting from ₦${minPrice.toLocaleString()}` : 'Configurable prices'}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleOpenEditService(service, 'subscriptions', 'edit'); }}
                                style={{
                                  backgroundColor: 'rgba(26, 62, 38, 0.08)',
                                  color: 'var(--accent)',
                                  border: '1px solid rgba(26, 62, 38, 0.2)',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  cursor: 'pointer'
                                }}
                              >
                                Edit Plans →
                              </button>
                            </div>

                            {/* Action buttons */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              paddingTop: '12px',
                              borderTop: '1px solid var(--border)',
                              gap: '8px'
                            }}>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleOpenEditService(service, 'presentation', 'view'); }}
                                style={{
                                  backgroundColor: 'var(--accent)',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  padding: '8px 14px',
                                  borderRadius: '6px',
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  boxShadow: '0 2px 6px rgba(26,62,38,0.2)'
                                }}
                              >
                                <Eye size={14} />
                                <span>👁️ View Page &amp; Edit Writings</span>
                              </button>

                              <button
                                onClick={() => handleToggleService(service.id)}
                                style={{
                                  backgroundColor: isDisabled ? 'rgba(26,62,38,0.1)' : 'rgba(239,68,68,0.1)',
                                  color: isDisabled ? 'var(--accent)' : '#DC2626',
                                  border: 'none',
                                  padding: '7px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.76rem',
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                              >
                                {isDisabled ? 'Re-enable' : 'Disable'}
                              </button>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* ══════════════════════════════════════════════════════════════════
                  SUB-VIEW B: PAGE MANAGEMENT & LIVE EDITOR (ALL PAGES)
                  ══════════════════════════════════════════════════════════════════ */}
              {servicesSubView === 'pages' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                  {/* TOP EXECUTIVE SERVICE SWITCHER & CONTROL CONSOLE */}
                  <div style={{
                    position: 'sticky',
                    top: '75px',
                    zIndex: 40,
                    backgroundColor: '#0F172A',
                    borderRadius: '16px',
                    border: '1.5px solid #334155',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    color: '#FFFFFF',
                    overflow: 'hidden'
                  }}>
                    {/* Top Bar: Navigation, Dropdown, Mode Toggle, and Save */}
                    <div style={{
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                      borderBottom: '1px solid #1E293B'
                    }}>
                      {/* Left: Back to Catalog, Prev/Next & Dropdown */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => setServicesSubView('catalog')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: '#1E293B',
                            color: '#94A3B8',
                            border: '1px solid #334155',
                            padding: '7px 12px',
                            borderRadius: '8px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                          title="Back to Catalog Grid"
                        >
                          <Layers size={13} />
                          <span>Catalog</span>
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1E293B', borderRadius: '8px', border: '1px solid #334155', padding: '2px' }}>
                          <button
                            type="button"
                            onClick={() => handleNavigateAdjacentService(-1)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#F8FAFC',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: '6px'
                            }}
                            title="Previous Service Page"
                          >
                            <ChevronLeft size={16} />
                          </button>

                          <select
                            value={editingService?.id || ''}
                            onChange={(e) => handleSwitchCustomizerService(e.target.value)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#F8FAFC',
                              padding: '6px 10px',
                              fontSize: '0.84rem',
                              fontWeight: 700,
                              outline: 'none',
                              cursor: 'pointer',
                              maxWidth: '280px'
                            }}
                          >
                            {services
                              .filter(s => !isTikTokPage(s))
                              .map(s => (
                                <option key={s.id} value={s.id} style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }}>
                                  {s.title} ({s.kind === 'service' ? 'Service' : 'Product'}) • {s.subscriptions?.length || 0} plans
                                </option>
                              ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => handleNavigateAdjacentService(1)}
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: '#F8FAFC',
                              padding: '6px 10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              borderRadius: '6px'
                            }}
                            title="Next Service Page"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>

                        {editingService && (
                          <span style={{
                            backgroundColor: editingService.kind === 'product' ? 'var(--accent)' : 'var(--accent-gold)',
                            color: editingService.kind === 'product' ? '#FFFFFF' : '#000000',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            textTransform: 'uppercase'
                          }}>
                            {editingService.kind}
                          </span>
                        )}
                      </div>

                      {/* Right: Mode Toggle (View vs Edit) and Save Button */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', backgroundColor: '#1E293B', borderRadius: '8px', padding: '3px', border: '1px solid #334155' }}>
                          <button
                            type="button"
                            onClick={() => setPresentationMode('view')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: presentationMode === 'view' ? '#10B981' : 'transparent',
                              color: presentationMode === 'view' ? '#FFFFFF' : '#94A3B8',
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <Eye size={13} />
                            <span>Original View</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPresentationMode('edit')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: presentationMode === 'edit' ? '#D4AF37' : 'transparent',
                              color: presentationMode === 'edit' ? '#1A3E26' : '#94A3B8',
                              border: 'none',
                              padding: '6px 14px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <Edit3 size={13} />
                            <span>Edit Page &amp; Writings</span>
                          </button>
                        </div>

                        {/* Save Button */}
                        <button
                          type="button"
                          onClick={handleSaveServiceEdit}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            backgroundColor: '#10B981',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '8px 18px',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <Check size={15} strokeWidth={3} />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>

                    {/* Horizontal Pill Bar of all 16 Editable Services */}
                    <div style={{
                      padding: '8px 16px',
                      backgroundColor: '#090D16',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      overflowX: 'auto',
                      whiteSpace: 'nowrap'
                    }}>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginRight: '6px', flexShrink: 0 }}>
                        All Pages:
                      </span>
                      {services
                        .filter(s => !isTikTokPage(s))
                        .map(s => {
                          const isSelected = editingService?.id === s.id;
                          const subCount = (s.subscriptions || []).length;
                          return (
                            <button
                              key={s.id}
                              type="button"
                              onClick={() => handleSwitchCustomizerService(s.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: isSelected ? 'rgba(212,175,55,0.2)' : '#1E293B',
                                color: isSelected ? '#FDE68A' : '#94A3B8',
                                border: isSelected ? '1.5px solid #D4AF37' : '1px solid #334155',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                fontSize: '0.72rem',
                                fontWeight: isSelected ? 800 : 500,
                                cursor: 'pointer',
                                flexShrink: 0,
                                transition: 'all 0.15s ease'
                              }}
                            >
                              <span>{s.title}</span>
                              {subCount > 0 && (
                                <span style={{
                                  backgroundColor: isSelected ? '#D4AF37' : '#334155',
                                  color: isSelected ? '#000000' : '#E2E8F0',
                                  fontSize: '0.62rem',
                                  fontWeight: 800,
                                  padding: '1px 5px',
                                  borderRadius: '10px'
                                }}>
                                  {subCount}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* DEDICATED EDITOR PANEL (Shown when in 'edit' mode - NON-STICKY, CANNOT OVERLAP PAGE VIEW) */}
                  {presentationMode === 'edit' && serviceEditForm && (
                    <div 
                      id="admin-service-editor-panel"
                      style={{
                        backgroundColor: '#1E293B',
                        borderRadius: '16px',
                        border: '1.5px solid #334155',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        padding: '18px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        position: 'relative'
                      }}
                    >
                      {/* Editor Panel Header Bar */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #334155', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Edit3 size={17} style={{ color: '#D4AF37' }} />
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#F8FAFC' }}>
                            Edit Page Writings &amp; Content: <span style={{ color: '#D4AF37' }}>{editingService?.title}</span>
                          </span>
                          <span style={{ backgroundColor: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: 700 }}>
                            ✓ Non-overlapping Live Preview Below
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              const el = document.getElementById('live-page-component-preview');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              backgroundColor: '#0F172A',
                              color: '#94A3B8',
                              border: '1px solid #334155',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <span>Jump to Page View ↓</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPresentationMode('view')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              backgroundColor: 'transparent',
                              color: '#94A3B8',
                              border: '1px solid #334155',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.74rem',
                              cursor: 'pointer'
                            }}
                            title="Hide Editor Panel and view original page clean"
                          >
                            <Eye size={13} />
                            <span>Hide Editor</span>
                          </button>
                        </div>
                      </div>
                        {/* Segmented Category Tabs for Editor */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                          {[
                            { id: 'writings', label: '✍️ Writings & Content' },
                            { id: 'colors', label: '🎨 Text Colors & Accents' },
                            { id: 'photos', label: '🖼️ Cover Photo & Media' },
                            { id: 'subscriptions', label: `💳 Subscriptions (${serviceEditForm.subscriptions?.length || 0})` }
                          ].map(cat => {
                            const isCatSel = editorDrawerTab === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => setEditorDrawerTab(cat.id)}
                                style={{
                                  backgroundColor: isCatSel ? '#0F172A' : 'transparent',
                                  color: isCatSel ? '#FDE68A' : '#94A3B8',
                                  border: isCatSel ? '1.5px solid #D4AF37' : '1px solid #334155',
                                  padding: '7px 14px',
                                  borderRadius: '8px',
                                  fontSize: '0.78rem',
                                  fontWeight: isCatSel ? 800 : 600,
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <span>{cat.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* TAB 1: WRITINGS */}
                        {editorDrawerTab === 'writings' && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#D4AF37', textTransform: 'uppercase', marginBottom: '4px' }}>
                                Trust Badge Text:
                              </label>
                              <input
                                type="text"
                                value={serviceEditForm.badgeText || ''}
                                onChange={(e) => setServiceEditForm(prev => ({ ...prev, badgeText: e.target.value }))}
                                placeholder="e.g. Verified Premium Service"
                                style={{
                                  width: '100%',
                                  backgroundColor: '#0F172A',
                                  color: '#F8FAFC',
                                  border: '1px solid #334155',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  outline: 'none'
                                }}
                              />
                            </div>

                            <div>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>
                                Button Label (CTA):
                              </label>
                              <input
                                type="text"
                                value={serviceEditForm.ctaLabel || ''}
                                onChange={(e) => setServiceEditForm(prev => ({ ...prev, ctaLabel: e.target.value }))}
                                placeholder="e.g. Reserve Consultation, Inquire Now"
                                style={{
                                  width: '100%',
                                  backgroundColor: '#0F172A',
                                  color: '#F8FAFC',
                                  border: '1px solid #334155',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.8rem',
                                  outline: 'none'
                                }}
                              />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>
                                Main Page Headline (Rewrite title displayed on page):
                              </label>
                              <input
                                type="text"
                                value={serviceEditForm.heroHeadline || ''}
                                onChange={(e) => setServiceEditForm(prev => ({ ...prev, heroHeadline: e.target.value }))}
                                placeholder="Main headline on page..."
                                style={{
                                  width: '100%',
                                  backgroundColor: '#0F172A',
                                  color: '#F8FAFC',
                                  border: '1px solid #334155',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.9rem',
                                  fontWeight: 700,
                                  outline: 'none'
                                }}
                              />
                            </div>

                            <div style={{ gridColumn: '1 / -1' }}>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>
                                Subtitle &amp; Value Proposition Pitch:
                              </label>
                              <textarea
                                rows={2}
                                value={serviceEditForm.heroSubtitle || ''}
                                onChange={(e) => setServiceEditForm(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                                placeholder="Comprehensive description displayed on the page..."
                                style={{
                                  width: '100%',
                                  backgroundColor: '#0F172A',
                                  color: '#F8FAFC',
                                  border: '1px solid #334155',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  fontSize: '0.82rem',
                                  outline: 'none',
                                  resize: 'vertical'
                                }}
                              />
                            </div>

                            {/* Guarantees & Highlights List */}
                            <div style={{ gridColumn: '1 / -1' }}>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '6px' }}>
                                Key Guarantees &amp; Highlights on Page:
                              </label>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                                {(serviceEditForm.highlights || []).map((hl, i) => (
                                  <span
                                    key={i}
                                    style={{
                                      backgroundColor: '#0F172A',
                                      color: '#F1F5F9',
                                      border: '1px solid #334155',
                                      borderRadius: '16px',
                                      padding: '4px 10px',
                                      fontSize: '0.74rem',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '6px'
                                    }}
                                  >
                                    <CheckCircle2 size={12} style={{ color: '#10B981' }} />
                                    <span>{hl}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemovePageHighlight(i)}
                                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 0 }}
                                      title="Remove"
                                    >
                                      ✕
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <div style={{ display: 'flex', gap: '8px', maxWidth: '500px' }}>
                                <input
                                  type="text"
                                  value={newHighlightInput}
                                  onChange={(e) => setNewHighlightInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      handleAddPageHighlight(newHighlightInput);
                                    }
                                  }}
                                  placeholder="Type guarantee & press Enter..."
                                  style={{
                                    flex: 1,
                                    backgroundColor: '#0F172A',
                                    color: '#F8FAFC',
                                    border: '1px solid #334155',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem'
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleAddPageHighlight(newHighlightInput)}
                                  style={{
                                    backgroundColor: '#334155',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    fontSize: '0.76rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  + Add
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 2: TEXT COLORS & ACCENTS */}
                        {editorDrawerTab === 'colors' && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
                            {/* Heading Text Color */}
                            <div style={{ backgroundColor: '#0F172A', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '6px' }}>
                                👑 Headline Text Color:
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <input
                                  type="color"
                                  value={serviceEditForm.textColor || '#FFFFFF'}
                                  onChange={(e) => setServiceEditForm(prev => ({ ...prev, textColor: e.target.value }))}
                                  style={{ width: '36px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: 0 }}
                                />
                                <input
                                  type="text"
                                  value={serviceEditForm.textColor || '#FFFFFF'}
                                  onChange={(e) => setServiceEditForm(prev => ({ ...prev, textColor: e.target.value }))}
                                  style={{ flex: 1, backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.78rem' }}
                                />
                              </div>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                {['#FFFFFF', '#0F172A', '#1A3E26', '#D4AF37', '#10B981', '#38BDF8', '#F59E0B'].map(hex => (
                                  <button
                                    key={hex}
                                    type="button"
                                    onClick={() => setServiceEditForm(prev => ({ ...prev, textColor: hex }))}
                                    style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: hex, border: '1px solid #64748B', cursor: 'pointer' }}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Subtitle Text Color */}
                            <div style={{ backgroundColor: '#0F172A', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '6px' }}>
                                📄 Subtitle Text Color:
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <input
                                  type="color"
                                  value={serviceEditForm.subtitleColor || '#F1F5F9'}
                                  onChange={(e) => setServiceEditForm(prev => ({ ...prev, subtitleColor: e.target.value }))}
                                  style={{ width: '36px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: 0 }}
                                />
                                <input
                                  type="text"
                                  value={serviceEditForm.subtitleColor || '#F1F5F9'}
                                  onChange={(e) => setServiceEditForm(prev => ({ ...prev, subtitleColor: e.target.value }))}
                                  style={{ flex: 1, backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.78rem' }}
                                />
                              </div>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                {['#F1F5F9', '#CBD5E1', '#94A3B8', '#FDE68A', '#E2E8F0', '#334155', '#FFFFFF'].map(hex => (
                                  <button
                                    key={hex}
                                    type="button"
                                    onClick={() => setServiceEditForm(prev => ({ ...prev, subtitleColor: hex }))}
                                    style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: hex, border: '1px solid #64748B', cursor: 'pointer' }}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Badge Text Color */}
                            <div style={{ backgroundColor: '#0F172A', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '6px' }}>
                                ⭐ Badge Text Color:
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <input
                                  type="color"
                                  value={serviceEditForm.badgeColor || '#FDE68A'}
                                  onChange={(e) => setServiceEditForm(prev => ({ ...prev, badgeColor: e.target.value }))}
                                  style={{ width: '36px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: 0 }}
                                />
                                <input
                                  type="text"
                                  value={serviceEditForm.badgeColor || '#FDE68A'}
                                  onChange={(e) => setServiceEditForm(prev => ({ ...prev, badgeColor: e.target.value }))}
                                  style={{ flex: 1, backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.78rem' }}
                                />
                              </div>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                {['#FDE68A', '#D4AF37', '#FFFFFF', '#10B981', '#38BDF8', '#F43F5E', '#1A3E26'].map(hex => (
                                  <button
                                    key={hex}
                                    type="button"
                                    onClick={() => setServiceEditForm(prev => ({ ...prev, badgeColor: hex }))}
                                    style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: hex, border: '1px solid #64748B', cursor: 'pointer' }}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Accent Theme Color */}
                            <div style={{ backgroundColor: '#0F172A', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '6px' }}>
                                🎨 Theme Accent Color:
                              </label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <input
                                  type="color"
                                  value={serviceEditForm.accentColor || '#1A3E26'}
                                  onChange={(e) => setServiceEditForm(prev => ({ ...prev, accentColor: e.target.value }))}
                                  style={{ width: '36px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: 0 }}
                                />
                                <input
                                  type="text"
                                  value={serviceEditForm.accentColor || '#1A3E26'}
                                  onChange={(e) => setServiceEditForm(prev => ({ ...prev, accentColor: e.target.value }))}
                                  style={{ flex: 1, backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.78rem' }}
                                />
                              </div>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                {['#1A3E26', '#D4AF37', '#1E3A8A', '#B45309', '#10B981', '#374151', '#4338CA'].map(hex => (
                                  <button
                                    key={hex}
                                    type="button"
                                    onClick={() => setServiceEditForm(prev => ({ ...prev, accentColor: hex }))}
                                    style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: hex, border: '1px solid #64748B', cursor: 'pointer' }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 3: PHOTO & MEDIA */}
                        {editorDrawerTab === 'photos' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '0.76rem', color: '#94A3B8', fontWeight: 700 }}>
                                8 Architectural Presets (1-Click Apply) or Upload / Link Custom Photo:
                              </span>
                              <span style={{ fontSize: '0.72rem', color: '#D4AF37' }}>
                                Updates hero photo live
                              </span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                              {CURATED_SERVICE_IMAGES.map((img, i) => {
                                const isCur = (serviceEditForm.heroImage || serviceEditForm.image) === img.url;
                                return (
                                  <div
                                    key={i}
                                    onClick={() => handleSelectCuratedImage(img.url)}
                                    style={{
                                      cursor: 'pointer',
                                      borderRadius: '8px',
                                      overflow: 'hidden',
                                      border: isCur ? '3px solid #D4AF37' : '2px solid #334155',
                                      position: 'relative',
                                      transition: 'all 0.15s ease'
                                    }}
                                  >
                                    <img src={img.url} alt={img.label} style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }} />
                                    <div style={{ padding: '4px 6px', backgroundColor: '#0F172A', color: '#F1F5F9', fontSize: '0.66rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {img.label}
                                    </div>
                                    {isCur && (
                                      <div style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: '#D4AF37', color: '#000000', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Check size={11} strokeWidth={3} />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', borderTop: '1px solid #334155', paddingTop: '12px' }}>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', marginBottom: '4px' }}>
                                  📁 Upload from Local Disk:
                                </label>
                                <input
                                  ref={serviceFileInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={handleServiceImageUpload}
                                  style={{ fontSize: '0.75rem', color: '#CBD5E1' }}
                                />
                              </div>
                              <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#94A3B8', marginBottom: '4px' }}>
                                  🔗 Or Web Image URL:
                                </label>
                                <input
                                  type="url"
                                  value={serviceEditForm.heroImage || ''}
                                  onChange={(e) => {
                                    setServiceEditForm(prev => ({ ...prev, heroImage: e.target.value }));
                                    setServiceImageFilePreview(e.target.value);
                                  }}
                                  placeholder="https://..."
                                  style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '0.75rem' }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 4: SUBSCRIPTIONS */}
                        {editorDrawerTab === 'subscriptions' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                              <div>
                                <h5 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#F8FAFC' }}>
                                  Subscriptions for "{serviceEditForm.title}" ({serviceEditForm.subscriptions?.length || 0})
                                </h5>
                                <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                                  Edit prices, change deliverables, remove packages, or create new tiers.
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setIsAddingNewPlan(!isAddingNewPlan)}
                                style={{
                                  backgroundColor: '#D4AF37',
                                  color: '#1A3E26',
                                  border: 'none',
                                  padding: '6px 14px',
                                  borderRadius: '6px',
                                  fontSize: '0.76rem',
                                  fontWeight: 800,
                                  cursor: 'pointer'
                                }}
                              >
                                {isAddingNewPlan ? 'Cancel New Plan' : '+ Add New Subscription Tier'}
                              </button>
                            </div>

                            {/* Add New Plan Sub-form */}
                            {isAddingNewPlan && (
                              <div style={{ backgroundColor: '#0F172A', padding: '16px', borderRadius: '8px', border: '1.5px solid #D4AF37', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4AF37' }}>
                                  ✨ Create New Subscription Tier
                                </div>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700 }}>Templates:</span>
                                  {[
                                    { name: 'Starter Tier', priceNgn: 25000, priceUsd: 16, cycle: 'monthly', desc: 'Ideal for early-stage clients and individuals.' },
                                    { name: 'Professional Tier', priceNgn: 75000, priceUsd: 47, cycle: 'monthly', desc: 'Full-featured package with priority.' },
                                    { name: 'VIP Enterprise', priceNgn: 200000, priceUsd: 125, cycle: 'monthly', desc: 'Dedicated executive management.' }
                                  ].map((preset, pIdx) => (
                                    <button
                                      key={pIdx}
                                      type="button"
                                      onClick={() => setNewPlanForm(prev => ({ ...prev, name: preset.name, priceNgn: preset.priceNgn, priceUsd: preset.priceUsd, billingPeriod: preset.cycle, shortDesc: preset.desc }))}
                                      style={{ backgroundColor: '#1E293B', color: '#CBD5E1', border: '1px solid #334155', borderRadius: '12px', padding: '3px 8px', fontSize: '0.68rem', cursor: 'pointer' }}
                                    >
                                      {preset.name} (₦{preset.priceNgn.toLocaleString()})
                                    </button>
                                  ))}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700, marginBottom: '3px' }}>Plan Name:</label>
                                    <input
                                      type="text"
                                      value={newPlanForm.name}
                                      onChange={(e) => setNewPlanForm(prev => ({ ...prev, name: e.target.value }))}
                                      placeholder="e.g. Executive Retainer"
                                      style={{ width: '100%', backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.76rem' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700, marginBottom: '3px' }}>Badge (e.g. Popular):</label>
                                    <input
                                      type="text"
                                      value={newPlanForm.badge}
                                      onChange={(e) => setNewPlanForm(prev => ({ ...prev, badge: e.target.value }))}
                                      placeholder="e.g. Recommended"
                                      style={{ width: '100%', backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.76rem' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700, marginBottom: '3px' }}>Price (NGN):</label>
                                    <input
                                      type="number"
                                      value={newPlanForm.priceNgn}
                                      onChange={(e) => {
                                        const val = Number(e.target.value) || 0;
                                        setNewPlanForm(prev => ({ ...prev, priceNgn: val, priceUsd: Math.round(val / 1600) }));
                                      }}
                                      style={{ width: '100%', backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.76rem' }}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700, marginBottom: '3px' }}>Price (USD):</label>
                                    <input
                                      type="number"
                                      value={newPlanForm.priceUsd}
                                      onChange={(e) => setNewPlanForm(prev => ({ ...prev, priceUsd: Number(e.target.value) || 0 }))}
                                      style={{ width: '100%', backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.76rem' }}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label style={{ display: 'block', fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700, marginBottom: '3px' }}>Description:</label>
                                  <input
                                    type="text"
                                    value={newPlanForm.shortDesc}
                                    onChange={(e) => setNewPlanForm(prev => ({ ...prev, shortDesc: e.target.value }))}
                                    placeholder="Short summary of what this tier includes..."
                                    style={{ width: '100%', backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '6px 8px', borderRadius: '4px', fontSize: '0.76rem' }}
                                  />
                                </div>

                                <div>
                                  <label style={{ display: 'block', fontSize: '0.68rem', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>Offerings &amp; Deliverables:</label>
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '6px' }}>
                                    {(newPlanForm.offerings || []).map((off, oIdx) => (
                                      <span key={oIdx} style={{ backgroundColor: '#1E293B', color: '#E2E8F0', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                        ✓ {off}
                                        <button type="button" onClick={() => handleRemoveNewPlanOffering(oIdx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: 0 }}>✕</button>
                                      </span>
                                    ))}
                                  </div>
                                  <div style={{ display: 'flex', gap: '6px', maxWidth: '420px' }}>
                                    <input
                                      type="text"
                                      value={newPlanOfferingInput}
                                      onChange={(e) => setNewPlanOfferingInput(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault();
                                          handleAddNewPlanOffering(newPlanOfferingInput);
                                        }
                                      }}
                                      placeholder="Add deliverable & press enter..."
                                      style={{ flex: 1, backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '5px 8px', borderRadius: '4px', fontSize: '0.74rem' }}
                                    />
                                    <button type="button" onClick={() => handleAddNewPlanOffering(newPlanOfferingInput)} style={{ backgroundColor: '#334155', color: '#FFFFFF', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}>+ Add</button>
                                  </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                  <button type="button" onClick={() => setIsAddingNewPlan(false)} style={{ backgroundColor: '#1E293B', color: '#94A3B8', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '0.74rem', cursor: 'pointer' }}>Cancel</button>
                                  <button type="button" onClick={handleSaveNewPlanToService} style={{ backgroundColor: '#10B981', color: '#FFFFFF', border: 'none', padding: '6px 14px', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 800, cursor: 'pointer' }}>✓ Save Tier to Page</button>
                                </div>
                              </div>
                            )}

                            {/* Existing Subscriptions Cards */}
                            {(!serviceEditForm.subscriptions || serviceEditForm.subscriptions.length === 0) ? (
                              <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#0F172A', borderRadius: '8px', border: '1px dashed #334155', color: '#94A3B8', fontSize: '0.8rem' }}>
                                No subscription tiers configured for this service yet. Click "+ Add New Subscription Tier" above.
                              </div>
                            ) : (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                                {serviceEditForm.subscriptions.map((plan, pIdx) => (
                                  <div
                                    key={pIdx}
                                    style={{
                                      backgroundColor: '#0F172A',
                                      borderRadius: '8px',
                                      border: plan.highlighted ? '1.5px solid #D4AF37' : '1px solid #334155',
                                      padding: '14px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'space-between',
                                      gap: '10px'
                                    }}
                                  >
                                    <div>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <input
                                          type="text"
                                          value={plan.name}
                                          onChange={(e) => handleUpdateSubscriptionField(pIdx, 'name', e.target.value)}
                                          style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px dashed #64748B', color: '#F8FAFC', fontSize: '0.88rem', fontWeight: 800, outline: 'none', width: '70%' }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteSubscriptionPlanDirect(pIdx)}
                                          style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                                          title="Delete this subscription tier"
                                        >
                                          <Trash size={12} />
                                          <span>Remove</span>
                                        </button>
                                      </div>

                                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>₦</span>
                                        <input
                                          type="number"
                                          value={plan.priceNgn || 0}
                                          onChange={(e) => handleUpdateSubscriptionField(pIdx, 'priceNgn', e.target.value)}
                                          style={{ width: '100px', backgroundColor: '#1E293B', color: '#D4AF37', border: '1px solid #334155', padding: '3px 6px', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 800 }}
                                        />
                                        <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                                          (${plan.priceUsd || Math.round((plan.priceNgn || 0) / 1600)})
                                        </span>
                                        <span style={{ fontSize: '0.72rem', color: '#64748B' }}>/ {plan.billingPeriod || 'mo'}</span>
                                      </div>

                                      {/* Deliverables list */}
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '6px' }}>
                                        {(plan.offerings || []).map((off, oIdx) => (
                                          <div key={oIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#CBD5E1' }}>
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>✓ {off}</span>
                                            <button
                                              type="button"
                                              onClick={() => handleRemoveOfferingFromPlan(pIdx, oIdx)}
                                              style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '0 2px' }}
                                            >
                                              ✕
                                            </button>
                                          </div>
                                        ))}
                                      </div>

                                      <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                                        <input
                                          type="text"
                                          placeholder="+ Add benefit & press Enter..."
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              e.preventDefault();
                                              handleAddOfferingToPlan(pIdx, e.target.value);
                                              e.target.value = '';
                                            }
                                          }}
                                          style={{ flex: 1, backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #334155', padding: '3px 6px', borderRadius: '4px', fontSize: '0.7rem' }}
                                        />
                                      </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #1E293B', paddingTop: '6px' }}>
                                      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: '#94A3B8', cursor: 'pointer' }}>
                                        <input
                                          type="checkbox"
                                          checked={!!plan.highlighted}
                                          onChange={() => handleToggleSubscriptionPlanHighlight(pIdx)}
                                        />
                                        <span>Highlight as Popular</span>
                                      </label>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                  {/* LIVE ORIGINAL COMPONENT RENDERER */}
                  <div 
                    id="live-page-component-preview"
                    style={{
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid #CBD5E1',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                      position: 'relative'
                    }}
                  >
                    {/* Live Synchronized Header Banner */}
                    <div style={{
                      padding: '10px 20px',
                      backgroundColor: '#0F172A',
                      color: '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.76rem',
                      borderBottom: '1px solid #1E293B',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                        <span>ORIGINAL COMPONENT VIEW: <strong style={{ color: '#F8FAFC' }}>{editingService?.title}</strong></span>
                        <span style={{ color: '#D4AF37' }}>({editingService?.id})</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {presentationMode === 'edit' && (
                          <button
                            type="button"
                            onClick={() => {
                              const el = document.getElementById('admin-service-editor-panel');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                              backgroundColor: '#1E293B',
                              color: '#D4AF37',
                              border: '1px solid #334155',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            ↑ Back to Writings Editor
                          </button>
                        )}
                        <span style={{ color: '#64748B' }}>100% Original Section Positions &amp; Interactive Features Preserved</span>
                        <button
                          type="button"
                          onClick={handleSaveServiceEdit}
                          style={{
                            backgroundColor: '#10B981',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          💾 Save Page
                        </button>
                      </div>
                    </div>

                    {/* The Actual Component */}
                    {renderLivePageComponent()}
                  </div>
                </div>
              )}

              {/* ══════════════════════════════════════════════════════════════════
                  SUB-VIEW C: ALL SUBSCRIPTIONS & PLANS DIRECTORY
                  ══════════════════════════════════════════════════════════════════ */}
              {servicesSubView === 'subscriptions' && (
                <div>
                  {/* Search and Summary */}
                  <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    border: '1px solid var(--border)',
                    marginBottom: '24px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-title)' }}>
                        All Active Subscription Plans &amp; Packages
                      </h3>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#6B7280' }}>
                        Manage subscription prices, deliverables offered, billing cycles, and active status across all products &amp; services.
                      </p>
                    </div>

                    <div style={{ position: 'relative', width: '300px' }}>
                      <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                      <input
                        type="text"
                        placeholder="Search plans by name, service or price..."
                        value={subscriptionSearchQuery}
                        onChange={(e) => setSubscriptionSearchQuery(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px 8px 32px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.82rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Subscriptions Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '20px'
                  }}>
                    {filteredSubscriptions.map(sub => {
                      const parentService = services.find(s => s.id === sub.serviceId);

                      return (
                        <div
                          key={`${sub.serviceId}-${sub.id}`}
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            border: sub.highlighted ? '2px solid var(--accent-gold)' : '1px solid var(--border)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: sub.highlighted ? '0 8px 24px rgba(210,125,45,0.15)' : '0 2px 10px rgba(0,0,0,0.03)',
                            position: 'relative'
                          }}
                        >
                          <div>
                            {/* Top Badge & Parent Service */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{
                                backgroundColor: 'rgba(26,62,38,0.1)',
                                color: 'var(--accent)',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.68rem',
                                fontWeight: 700
                              }}>
                                {sub.serviceTitle}
                              </span>

                              {sub.badge && (
                                <span style={{
                                  backgroundColor: sub.highlighted ? 'var(--accent-gold)' : '#F3F4F6',
                                  color: sub.highlighted ? '#000000' : '#4B5563',
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  fontSize: '0.68rem',
                                  fontWeight: 800
                                }}>
                                  {sub.badge}
                                </span>
                              )}
                            </div>

                            <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-title)' }}>
                              {sub.name}
                            </h4>

                            {/* Price */}
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
                              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>
                                ₦{Number(sub.priceNgn || 0).toLocaleString()}
                              </span>
                              <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                                (~${sub.priceUsd}) / {sub.billingPeriod}
                              </span>
                            </div>

                            <p style={{ fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.45, marginBottom: '14px' }}>
                              {sub.shortDesc}
                            </p>

                            {/* What We Offer Preview */}
                            <div style={{
                              backgroundColor: '#FAF9F6',
                              borderRadius: '8px',
                              padding: '12px',
                              marginBottom: '16px',
                              border: '1px solid #F3F4F6'
                            }}>
                              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280', marginBottom: '8px' }}>
                                Deliverables Included ({sub.offerings?.length || 0}):
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {(sub.offerings || []).slice(0, 3).map((off, oIdx) => (
                                  <div key={oIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.75rem', color: 'var(--text-title)' }}>
                                    <Check size={12} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                                    <span>{off}</span>
                                  </div>
                                ))}
                                {(sub.offerings || []).length > 3 && (
                                  <div style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 600 }}>
                                    + {(sub.offerings.length - 3)} more deliverables
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                            <button
                              onClick={() => {
                                if (parentService) {
                                  handleOpenEditService(parentService, 'subscriptions');
                                }
                              }}
                              style={{
                                flex: 1,
                                backgroundColor: 'var(--accent)',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '8px',
                                borderRadius: '6px',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px'
                              }}
                            >
                              <Edit3 size={13} />
                              <span>Edit in Studio</span>
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 3: PLATFORM AUDIT TRAIL & LOGS
            ══════════════════════════════════════════════════════════════════════ */}
        {activeMainTab === 'logs' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-title)', margin: 0 }}>
                  Administrative Audit Trail
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '4px 0 0 0' }}>
                  Complete historical log of listing approvals, suspensions, edits, and service state changes.
                </p>
              </div>
              <span style={{ fontSize: '0.76rem', color: '#9CA3AF' }}>
                {adminLogs.length} events logged
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {adminLogs.map(log => (
                <div 
                  key={log.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: '#FAF9F6',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(26,62,38,0.1)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <ShieldCheck size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-title)' }}>
                      {log.action}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#9CA3AF', marginTop: '2px' }}>
                      Executed by <strong>{log.admin || 'Admin'}</strong> • {log.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════
            TAB 4: SECURITY & USER ACCESS CONTROL
            ══════════════════════════════════════════════════════════════════════ */}
        {activeMainTab === 'users' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            border: '1px solid var(--border)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-title)', margin: 0 }}>
                  Security &amp; Member Management
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#6B7280', margin: '4px 0 0 0' }}>
                  Manage platform members, approve verified property partners, and execute instant account suspensions.
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={refreshAllData}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    backgroundColor: '#FAF9F6',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: 'var(--text-title)'
                  }}
                >
                  <RefreshCw size={14} />
                  <span>Sync Backend</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '20px',
              padding: '14px 16px',
              backgroundColor: '#FAF9F6',
              borderRadius: '10px',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: '1 1 280px', position: 'relative' }}>
                <Search size={16} style={{ color: '#9CA3AF', position: 'absolute', left: '12px' }} />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, role..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { key: 'all', label: `All (${users.length})` },
                  { key: 'active', label: `Active (${users.filter(u => !u.isSuspended && u.isApproved).length})` },
                  { key: 'suspended', label: `Suspended (${suspendedUsersCount})` },
                  { key: 'pending', label: `Pending (${pendingUsersCount})` }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setUserFilter(tab.key)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: userFilter === tab.key ? 'var(--accent)' : '#FFFFFF',
                      color: userFilter === tab.key ? '#FFFFFF' : 'var(--text-body)',
                      boxShadow: userFilter === tab.key ? '0 2px 6px rgba(26,62,38,0.2)' : '0 1px 2px rgba(0,0,0,0.05)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Table / Cards */}
            {filteredUsers.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '48px 20px',
                color: '#9CA3AF',
                fontSize: '0.9rem'
              }}>
                <Users size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                <div>No users match the selected filters or search query.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredUsers.map(u => (
                  <div
                    key={u.id || u.email || u.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px',
                      padding: '16px 20px',
                      backgroundColor: u.isSuspended ? '#FEF2F2' : !u.isApproved ? '#FFFBEB' : '#FFFFFF',
                      border: `1px solid ${u.isSuspended ? '#FCA5A5' : !u.isApproved ? '#FDE68A' : 'var(--border)'}`,
                      borderRadius: '10px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {/* User Identity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px' }}>
                      <img
                        src={u.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100`}
                        alt={u.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: u.isSuspended ? '2px solid #EF4444' : '2px solid var(--accent)'
                        }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-title)' }}>
                            {u.name}
                          </span>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            backgroundColor: u.role === 'admin' ? 'rgba(210,125,45,0.15)' : u.role === 'owner' ? 'rgba(26,62,38,0.1)' : 'rgba(107,114,128,0.1)',
                            color: u.role === 'admin' ? 'var(--accent-gold)' : u.role === 'owner' ? 'var(--accent)' : '#4B5563'
                          }}>
                            {u.roleTitle || u.role}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px' }}>
                          {u.email} {u.phone ? `• ${u.phone}` : ''}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '1px' }}>
                          Member since: {u.memberSince || 'Recent'}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {u.isSuspended ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626',
                          fontSize: '0.76rem',
                          fontWeight: 700
                        }}>
                          <UserX size={14} />
                          Suspended
                        </span>
                      ) : !u.isApproved ? (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#FEF3C7',
                          color: '#D97706',
                          fontSize: '0.76rem',
                          fontWeight: 700
                        }}>
                          <Clock size={14} />
                          Pending Review
                        </span>
                      ) : (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#DCFCE7',
                          color: '#15803D',
                          fontSize: '0.76rem',
                          fontWeight: 700
                        }}>
                          <UserCheck size={14} />
                          Active
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {!u.isApproved && (
                        <button
                          onClick={() => handleApproveUser(u)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'var(--accent)',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Check size={14} />
                          <span>Approve</span>
                        </button>
                      )}

                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleToggleSuspendUser(u)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: u.isSuspended ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                            color: u.isSuspended ? '#15803D' : '#DC2626',
                            border: `1px solid ${u.isSuspended ? '#86EFAC' : '#FCA5A5'}`,
                            borderRadius: '6px',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {u.isSuspended ? <UserCheck size={14} /> : <Ban size={14} />}
                          <span>{u.isSuspended ? 'Unsuspend' : 'Suspend'}</span>
                        </button>
                      )}

                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u)}
                          style={{
                            padding: '6px 10px',
                            backgroundColor: 'transparent',
                            color: '#9CA3AF',
                            border: '1px solid transparent',
                            borderRadius: '6px',
                            fontSize: '0.76rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.color = '#EF4444';
                            e.currentTarget.style.borderColor = '#FCA5A5';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.color = '#9CA3AF';
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: EDIT LISTING (FOR ADMIN)
          ══════════════════════════════════════════════════════════════════════ */}
      {editingListing && listingEditForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(12, 20, 15, 0.75)',
          backdropFilter: 'blur(6px)',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '90vh'
          }}>
            <div style={{
              backgroundColor: '#1A3E26',
              padding: '18px 24px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
                  Admin Edit Listing
                </h3>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)' }}>
                  {editingListing.categoryType === 'plot' ? 'Land Plot' : 'Apartment'} • Submitted by {editingListing.postedBy}
                </span>
              </div>
              <button 
                onClick={() => setEditingListing(null)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveListingEdit} style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                  Property / Plot Title
                </label>
                <input
                  type="text"
                  value={listingEditForm.title}
                  onChange={(e) => setListingEditForm({ ...listingEditForm, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.86rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                    Price (NGN)
                  </label>
                  <input
                    type="number"
                    value={listingEditForm.price}
                    onChange={(e) => setListingEditForm({ ...listingEditForm, price: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={listingEditForm.location}
                    onChange={(e) => setListingEditForm({ ...listingEditForm, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.86rem',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Conditional plot vs apartment fields */}
              {editingListing.categoryType === 'plot' ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                        Plot Size (SQM)
                      </label>
                      <input
                        type="text"
                        value={listingEditForm.plotSize}
                        onChange={(e) => setListingEditForm({ ...listingEditForm, plotSize: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                        Survey Beacon Number
                      </label>
                      <input
                        type="text"
                        value={listingEditForm.beaconNumber}
                        onChange={(e) => setListingEditForm({ ...listingEditForm, beaconNumber: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                      Title Document
                    </label>
                    <input
                      type="text"
                      value={listingEditForm.titleType}
                      onChange={(e) => setListingEditForm({ ...listingEditForm, titleType: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                      Bedrooms
                    </label>
                    <input
                      type="text"
                      value={listingEditForm.bedrooms}
                      onChange={(e) => setListingEditForm({ ...listingEditForm, bedrooms: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                      Bathrooms
                    </label>
                    <input
                      type="text"
                      value={listingEditForm.bathrooms}
                      onChange={(e) => setListingEditForm({ ...listingEditForm, bathrooms: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.86rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  value={listingEditForm.description}
                  onChange={(e) => setListingEditForm({ ...listingEditForm, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.84rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setEditingListing(null)}
                  style={{ backgroundColor: '#F3F4F6', color: '#4B5563', border: '1px solid #D1D5DB', padding: '9px 16px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF', border: 'none', padding: '9px 20px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Save Updates
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL: SUSPEND LISTING REASON
          ══════════════════════════════════════════════════════════════════════ */}
      {suspendingListing && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(12, 20, 15, 0.75)',
          backdropFilter: 'blur(6px)',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626', marginBottom: '14px' }}>
              <AlertTriangle size={24} />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
                Suspend Property Listing
              </h3>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, marginBottom: '16px' }}>
              Are you sure you want to suspend <strong>"{suspendingListing.title}"</strong>? It will immediately be taken off public search results and the poster will be notified.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                Reason for Suspension
              </label>
              <textarea
                rows={3}
                value={suspensionReasonText}
                onChange={(e) => setSuspensionReasonText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  fontSize: '0.84rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSuspendingListing(null)}
                style={{
                  backgroundColor: '#F3F4F6',
                  color: '#4B5563',
                  border: '1px solid #D1D5DB',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSuspension}
                style={{
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MEDIA PREVIEW MODAL (PHOTO / VIDEO)
          ══════════════════════════════════════════════════════════════════════ */}
      {previewMediaModal && (
        <div 
          onClick={() => setPreviewMediaModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            padding: '24px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '850px',
              width: '100%',
              backgroundColor: '#111827',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div style={{
              padding: '14px 18px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                {previewMediaModal.title}
              </span>
              <button
                onClick={() => setPreviewMediaModal(null)}
                style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', backgroundColor: '#000000' }}>
              {previewMediaModal.type === 'video' ? (
                <video 
                  controls 
                  autoPlay 
                  src={previewMediaModal.url}
                  style={{ width: '100%', maxHeight: '500px', borderRadius: '8px' }}
                />
              ) : (
                <img 
                  src={previewMediaModal.url} 
                  alt={previewMediaModal.title}
                  style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '8px' }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          LIVE TOAST NOTIFICATION
          ══════════════════════════════════════════════════════════════════════ */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0A150E',
          color: '#FFFFFF',
          padding: '12px 18px',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 3000,
          border: '1px solid var(--accent-gold)',
          animation: 'fadeInModal 0.2s ease-out'
        }}>
          <CheckCircle2 size={18} style={{ color: 'var(--accent-gold)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{toastMessage}</span>
        </div>
      )}

      {/* Responsive Style */}
      <style>{`
        @media (max-width: 860px) {
          .admin-listing-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
}
