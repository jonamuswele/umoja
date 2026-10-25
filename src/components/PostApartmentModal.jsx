import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Building, MapPin, DollarSign, Home, Check, 
  Sparkles, Camera, Phone, FileText, ShieldCheck, CheckCircle2, 
  Upload, Trash2, Video, Layers, Image as ImageIcon, Play, AlertCircle
} from 'lucide-react';
import { addUserListing, updateUserListing, addNotification } from '../utils/userStorage';

const AMENITIES_LIST = [
  '24/7 Generator Power',
  'Treated Borehole Water',
  'Uniformed Security & CCTV',
  'Swimming Pool',
  'Dedicated Car Parking',
  'High-Speed Fiber Internet',
  'Elevator Access',
  'Fitted Kitchen & Extractor',
  'Private Balcony'
];

export default function PostApartmentModal({ 
  isOpen, 
  onClose, 
  onListingCreated, 
  currentUser,
  listingToEdit = null 
}) {
  const isEditing = Boolean(listingToEdit);

  // Listing category: 'apartment' | 'plot'
  const [categoryType, setCategoryType] = useState('apartment');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'Apartment',
    listingType: 'For Rent',
    location: '',
    price: '',
    pricePeriod: 'year',
    bedrooms: '3',
    bathrooms: '3',
    furnishing: 'Semi-Furnished',
    selectedAmenities: ['24/7 Generator Power', 'Uniformed Security & CCTV', 'Dedicated Car Parking'],
    plotSize: '600 SQM (Dry Tableland)',
    topography: '100% Dry Tableland',
    titleType: "Governor's Consent & Registered Survey",
    zoning: 'Residential',
    beaconNumber: '',
    images: [],
    videoUrl: '',
    description: '',
    contactPhone: currentUser?.phone || '+234 812 345 6789'
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Initialize form when opening or editing
  useEffect(() => {
    if (listingToEdit) {
      setCategoryType(listingToEdit.categoryType || (listingToEdit.type === 'Land Plot' ? 'plot' : 'apartment'));
      setFormData({
        title: listingToEdit.title || '',
        type: listingToEdit.type || (listingToEdit.categoryType === 'plot' ? 'Land Plot' : 'Apartment'),
        listingType: listingToEdit.listingType || (listingToEdit.categoryType === 'plot' ? 'For Sale' : 'For Rent'),
        location: listingToEdit.location || '',
        price: listingToEdit.price || '',
        pricePeriod: listingToEdit.pricePeriod || 'year',
        bedrooms: String(listingToEdit.bedrooms || '3'),
        bathrooms: String(listingToEdit.bathrooms || '3'),
        furnishing: listingToEdit.furnishing || 'Semi-Furnished',
        selectedAmenities: listingToEdit.amenities || ['24/7 Generator Power', 'Uniformed Security & CCTV'],
        plotSize: listingToEdit.plotSize || '600 SQM (Dry Tableland)',
        topography: listingToEdit.topography || '100% Dry Tableland',
        titleType: listingToEdit.titleType || "Governor's Consent & Registered Survey",
        zoning: listingToEdit.zoning || 'Residential',
        beaconNumber: listingToEdit.beaconNumber || '',
        images: listingToEdit.images || (listingToEdit.image ? [listingToEdit.image] : []),
        videoUrl: listingToEdit.videoUrl || '',
        description: listingToEdit.description || '',
        contactPhone: listingToEdit.contactPhone || currentUser?.phone || '+234 812 345 6789'
      });
    } else {
      setCategoryType('apartment');
      setFormData({
        title: '',
        type: 'Apartment',
        listingType: 'For Rent',
        location: '',
        price: '',
        pricePeriod: 'year',
        bedrooms: '3',
        bathrooms: '3',
        furnishing: 'Semi-Furnished',
        selectedAmenities: ['24/7 Generator Power', 'Uniformed Security & CCTV', 'Dedicated Car Parking'],
        plotSize: '600 SQM (Dry Tableland)',
        topography: '100% Dry Tableland',
        titleType: "Governor's Consent & Registered Survey",
        zoning: 'Residential',
        beaconNumber: '',
        images: [],
        videoUrl: '',
        description: '',
        contactPhone: currentUser?.phone || '+234 812 345 6789'
      });
    }
    setSubmitted(false);
    setError('');
  }, [listingToEdit, isOpen, currentUser]);

  if (!isOpen) return null;

  // Handle Photo Upload from Local Computer (Real file upload into Data URL for slideshow)
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    let loadedCount = 0;
    const newImages = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newImages.push(event.target.result);
        loadedCount += 1;
        if (loadedCount === files.length) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
          }));
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove a specific picture from the slideshow
  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Handle Video Upload or URL
  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Use Object URL for video preview
    const videoObjUrl = URL.createObjectURL(file);
    setFormData(prev => ({
      ...prev,
      videoUrl: videoObjUrl
    }));
  };

  const handleToggleAmenity = (amenity) => {
    setFormData(prev => {
      const exists = prev.selectedAmenities.includes(amenity);
      return {
        ...prev,
        selectedAmenities: exists 
          ? prev.selectedAmenities.filter(a => a !== amenity)
          : [...prev.selectedAmenities, amenity]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.location.trim() || !formData.price) {
      setError('Please provide property title, location, and price.');
      return;
    }

    // Default placeholder if user didn't upload any picture
    const finalImages = formData.images.length > 0 
      ? formData.images 
      : [categoryType === 'plot' 
          ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' 
          : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'];

    const payload = {
      categoryType,
      title: formData.title.trim(),
      type: categoryType === 'plot' ? 'Land Plot' : formData.type,
      listingType: categoryType === 'plot' ? (formData.listingType || 'For Sale') : formData.listingType,
      location: formData.location.trim(),
      price: Number(formData.price) || 0,
      pricePeriod: categoryType === 'plot' ? 'total' : (formData.listingType === 'For Rent' ? formData.pricePeriod : 'total'),
      images: finalImages,
      image: finalImages[0],
      videoUrl: formData.videoUrl.trim(),
      description: formData.description.trim() || (categoryType === 'plot' 
        ? 'Verified dry tableland with perimeter beacons and cleared access road.' 
        : 'Spacious residential property with modern fittings and verified paperwork.'),
      contactPhone: formData.contactPhone
    };

    if (categoryType === 'plot') {
      payload.plotSize = formData.plotSize;
      payload.topography = formData.topography;
      payload.titleType = formData.titleType;
      payload.zoning = formData.zoning;
      payload.beaconNumber = formData.beaconNumber;
    } else {
      payload.bedrooms = Number(formData.bedrooms) || 1;
      payload.bathrooms = Number(formData.bathrooms) || 1;
      payload.furnishing = formData.furnishing;
      payload.amenities = formData.selectedAmenities;
    }

    if (isEditing) {
      updateUserListing(listingToEdit.id, payload);
      addNotification({
        title: 'Listing Updated',
        message: `Your changes to "${formData.title}" have been saved and updated on the platform.`,
        category: 'general'
      });
    } else {
      addUserListing(payload, currentUser);
      addNotification({
        title: categoryType === 'plot' ? 'Land Plot Listing Published' : 'Apartment Listing Published',
        message: `Your listing "${formData.title}" is now active and receiving viewings from verified buyers and tenants.`,
        category: 'inquiry'
      });
    }

    setSubmitted(true);
    if (onListingCreated) {
      onListingCreated();
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2050,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(12, 20, 15, 0.78)',
      backdropFilter: 'blur(8px)',
      padding: '20px'
    }} onClick={handleResetAndClose}>
      
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '92vh',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          border: '1px solid rgba(210, 125, 45, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeInModal 0.25s ease-out'
        }}
      >
        {/* Modal Top Header */}
        <div style={{
          backgroundColor: '#1A3E26',
          padding: '20px 26px',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: 'var(--accent-gold)'
              }}>
                {isEditing ? 'Property Editor' : 'Owner & Landlord Desk'}
              </span>
            </div>
            <h2 style={{
              margin: 0,
              fontSize: '1.3rem',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)'
            }}>
              {isEditing 
                ? `Edit ${categoryType === 'plot' ? 'Land Plot' : 'Apartment'}`
                : `Post Your ${categoryType === 'plot' ? 'Land Plot' : 'Apartment'}`}
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Toggle: Apartment vs Land Plot (Only shown when creating new) */}
        {!isEditing && (
          <div style={{
            display: 'flex',
            backgroundColor: '#FAF9F6',
            borderBottom: '1px solid var(--border)'
          }}>
            <button
              type="button"
              onClick={() => {
                setCategoryType('apartment');
                setFormData(p => ({ ...p, type: 'Apartment', listingType: 'For Rent' }));
              }}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '0.85rem',
                fontWeight: categoryType === 'apartment' ? 700 : 500,
                color: categoryType === 'apartment' ? 'var(--accent)' : 'var(--text-body)',
                background: 'none',
                border: 'none',
                borderBottom: categoryType === 'apartment' ? '2.5px solid var(--accent)' : '2.5px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Building size={16} />
              <span>Apartment / House</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCategoryType('plot');
                setFormData(p => ({ ...p, type: 'Land Plot', listingType: 'For Sale' }));
              }}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '0.85rem',
                fontWeight: categoryType === 'plot' ? 700 : 500,
                color: categoryType === 'plot' ? 'var(--accent)' : 'var(--text-body)',
                background: 'none',
                border: 'none',
                borderBottom: categoryType === 'plot' ? '2.5px solid var(--accent)' : '2.5px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Layers size={16} />
              <span>Plot of Land</span>
            </button>
          </div>
        )}

        {/* Form Body or Success State */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 26px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(26, 62, 38, 0.1)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-title)', margin: '0 0 8px', fontFamily: 'var(--font-serif)' }}>
                {isEditing ? 'Listing Updated Successfully!' : 'Property Posted Successfully!'}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-body)', maxWidth: '420px', margin: '0 auto 24px', lineHeight: '1.5' }}>
                Your {categoryType === 'plot' ? 'land plot' : 'apartment'} <strong>"{formData.title}"</strong> has been saved with your uploaded photos and video.
              </p>
              <button
                onClick={handleResetAndClose}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '11px 24px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Close & View My Listings
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {error && (
                <div style={{
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem'
                }}>
                  {error}
                </div>
              )}

              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                  {categoryType === 'plot' ? 'Plot Title / Description *' : 'Apartment Title *'}
                </label>
                <input
                  type="text"
                  placeholder={categoryType === 'plot' ? "e.g. Atlantic View 600 SQM Serviced Dry Tableland Plot" : "e.g. Luxury 3-Bedroom Serviced Flat with Swimming Pool"}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              {/* Category-Specific Form Fields */}
              {categoryType === 'plot' ? (
                /* LAND PLOT FIELDS */
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Plot Dimensions / Size
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 600 SQM (Full Plot)"
                        value={formData.plotSize}
                        onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Ground Topography
                      </label>
                      <select
                        value={formData.topography}
                        onChange={(e) => setFormData({ ...formData, topography: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <option value="100% Dry Tableland">100% Dry Tableland</option>
                        <option value="Waterfront Lagoon Edge">Waterfront Lagoon Edge</option>
                        <option value="Elevated Hillside Bedrock">Elevated Hillside Bedrock</option>
                        <option value="Sand-Filled Solid Ground">Sand-Filled Solid Ground</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Title / Government Document
                      </label>
                      <select
                        value={formData.titleType}
                        onChange={(e) => setFormData({ ...formData, titleType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <option value="Governor's Consent & Registered Survey">Governor's Consent</option>
                        <option value="Statutory Certificate of Occupancy (C of O)">Certificate of Occupancy (C of O)</option>
                        <option value="Gazette & Registered Survey">Government Gazette</option>
                        <option value="Registered Survey Plan">Registered Survey Plan</option>
                        <option value="Excision in Progress">Excision in Progress</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Zoning Purpose
                      </label>
                      <select
                        value={formData.zoning}
                        onChange={(e) => setFormData({ ...formData, zoning: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <option value="Residential">Residential Development</option>
                        <option value="Commercial">Commercial / Mixed Use</option>
                        <option value="Industrial">Light Industrial / Warehouse</option>
                        <option value="Agricultural">Agricultural / Farming</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                      Beacon Coordinate Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. LA/EP/2026/084"
                      value={formData.beaconNumber}
                      onChange={(e) => setFormData({ ...formData, beaconNumber: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '0.85rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </>
              ) : (
                /* APARTMENT / HOUSE FIELDS */
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Listing Purpose
                      </label>
                      <select
                        value={formData.listingType}
                        onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <option value="For Rent">For Rent (Annual Lease)</option>
                        <option value="For Sale">For Sale (Outright Purchase)</option>
                        <option value="Short-Let">Short-Let (Serviced Daily/Weekly)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Property Category
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.85rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <option value="Apartment">Apartment / Flat</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Studio">Studio / Mini Flat</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Villa">Detached Villa</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Bedrooms
                      </label>
                      <select
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.82rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} Bedroom{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Bathrooms
                      </label>
                      <select
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.82rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} Bath{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                        Furnishing
                      </label>
                      <select
                        value={formData.furnishing}
                        onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 10px',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          fontSize: '0.82rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <option value="Furnished">Fully Furnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '6px' }}>
                      Key Amenities
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {AMENITIES_LIST.map(amenity => {
                        const isChecked = formData.selectedAmenities.includes(amenity);
                        return (
                          <div
                            key={amenity}
                            onClick={() => handleToggleAmenity(amenity)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 8px',
                              borderRadius: '6px',
                              backgroundColor: isChecked ? 'rgba(26, 62, 38, 0.06)' : '#FAF9F6',
                              border: isChecked ? '1px solid var(--accent)' : '1px solid var(--border)',
                              cursor: 'pointer',
                              fontSize: '0.75rem',
                              color: isChecked ? 'var(--accent)' : 'var(--text-body)',
                              fontWeight: isChecked ? 600 : 400
                            }}
                          >
                            <div style={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '3px',
                              border: isChecked ? '1px solid var(--accent)' : '1px solid #D1D5DB',
                              backgroundColor: isChecked ? 'var(--accent)' : '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#FFFFFF'
                            }}>
                              {isChecked && <Check size={10} />}
                            </div>
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {amenity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Location & Price */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                    Location / Area *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input
                      type="text"
                      placeholder="e.g. Lekki Phase 1, Lagos"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 34px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '0.85rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                    Price (₦) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 24000000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>

              {/* ══════════════════════════════════════════════════════════════════
                  PHOTO UPLOAD FOR SLIDESHOW (Genuine user computer file upload)
                  ══════════════════════════════════════════════════════════════════ */}
              <div style={{
                backgroundColor: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Camera size={16} style={{ color: 'var(--accent)' }} />
                    <span>Upload Pictures for the Slideshow</span>
                  </label>
                  <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>
                    {formData.images.length} photo{formData.images.length !== 1 ? 's' : ''} in slideshow
                  </span>
                </div>

                <p style={{ margin: '0 0 12px', fontSize: '0.74rem', color: 'var(--text-body)' }}>
                  Select pictures directly from your computer or phone. Uploaded photos will automatically play in the vertical card slideshow.
                </p>

                {/* Upload Button & Hidden Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed rgba(26, 62, 38, 0.25)',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '14px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(26, 62, 38, 0.25)'}
                >
                  <Upload size={24} style={{ color: 'var(--accent)', margin: '0 auto 6px', display: 'block' }} />
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-title)' }}>
                    {isUploading ? 'Processing images...' : 'Click to Upload Pictures from Device'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '2px' }}>
                    Supports PNG, JPG, JPEG, WebP (Upload multiple photos)
                  </div>
                </div>

                {/* Uploaded Photos Grid with Remove Buttons */}
                {formData.images.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
                    gap: '10px'
                  }}>
                    {formData.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          height: '76px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          border: idx === 0 ? '2px solid var(--accent-gold)' : '1px solid var(--border)'
                        }}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Uploaded ${idx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {idx === 0 && (
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(26,62,38,0.85)',
                            color: 'var(--accent-gold)',
                            fontSize: '0.58rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            padding: '1px 0'
                          }}>
                            Cover
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          style={{
                            position: 'absolute',
                            top: '3px',
                            right: '3px',
                            backgroundColor: 'rgba(220, 38, 38, 0.85)',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Remove picture"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ══════════════════════════════════════════════════════════════════
                  VIDEO ATTACHMENT (Upload Video or Video Link)
                  ══════════════════════════════════════════════════════════════════ */}
              <div style={{
                backgroundColor: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-title)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Video size={16} style={{ color: 'var(--accent-gold)' }} />
                    <span>Add Video Tour / Walkthrough (Optional)</span>
                  </label>
                  {formData.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, videoUrl: '' })}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#DC2626',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <Trash2 size={12} />
                      <span>Remove Video</span>
                    </button>
                  )}
                </div>

                {formData.videoUrl ? (
                  <div style={{ marginTop: '6px' }}>
                    <video 
                      src={formData.videoUrl} 
                      controls 
                      style={{
                        width: '100%',
                        maxHeight: '160px',
                        borderRadius: '6px',
                        backgroundColor: '#000000'
                      }}
                    />
                    <div style={{ fontSize: '0.72rem', color: '#10B981', marginTop: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={12} />
                      <span>Video tour attached successfully!</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input
                      type="file"
                      ref={videoInputRef}
                      onChange={handleVideoUpload}
                      accept="video/*"
                      style={{ display: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid var(--border)',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Upload size={14} />
                        <span>Upload Video File</span>
                      </button>

                      <input
                        type="url"
                        placeholder="Or paste video link (e.g. MP4, YouTube, Matterport)"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid var(--border)',
                          fontSize: '0.78rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                  Property Overview & Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your property highlights, nearby landmarks, estate security, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '0.82rem',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '5px' }}>
                  Owner / Landlord Contact Phone (WhatsApp)
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 34px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      fontSize: '0.84rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '13px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '10px',
                  boxShadow: '0 4px 14px rgba(26,62,38,0.2)'
                }}
              >
                <Sparkles size={16} />
                <span>{isEditing ? 'Save Changes & Update Listing' : 'Publish Property Listing'}</span>
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
