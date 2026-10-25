const notifyServicesUpdated = () => { if (typeof window !== 'undefined') window.dispatchEvent(new Event('umoja_services_updated')); };
import { SERVICES } from '../data/servicesData';
import { apiService } from '../services/api';

const STORAGE_KEYS = {
  USER: 'umoja_user',
  INTERESTED: 'umoja_interested',
  NOTIFICATIONS: 'umoja_notifications',
  MESSAGES: 'umoja_messages',
  LISTINGS: 'umoja_user_listings',
  SERVICES: 'umoja_services',
  ADMIN_LOGS: 'umoja_admin_logs'
};

// Default Demo User (Client / Investor / Landlord)
export const DEMO_USER = {
  id: 'usr-001',
  name: 'Jonathan K.',
  email: 'jonathan.k@umoja.com',
  phone: '+234 812 345 6789',
  location: 'Lekki Phase 1, Lagos',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  role: 'user',
  roleTitle: 'Verified Investor & Landlord',
  currency: 'NGN',
  bio: 'Private real estate investor looking for prime dry land in Lagos and residential rental developments.',
  memberSince: 'January 2025'
};

// Default Demo Admin (Platform Director & Super Admin)
export const DEMO_ADMIN = {
  id: 'usr-admin-001',
  name: 'Victoria Adeleke',
  email: 'admin@umojaterra.com',
  phone: '+234 802 111 9900',
  location: 'Headquarters, Victoria Island, Lagos',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  role: 'admin',
  roleTitle: 'Chief Platform Director & Super Admin',
  currency: 'NGN',
  bio: 'Platform Administrator overseeing services catalog, plot verification approvals, and institutional escrow security.',
  memberSince: 'March 2024'
};

// Initial Seed for Interested Properties with Verified Owners
export const DEFAULT_INTERESTED = [
  {
    id: 'plot-01',
    serviceId: 'buy-plots',
    title: 'Atlantic Bayfront Serviced Residential Plot',
    location: 'Epe Lagoon Corridor, Lagos State',
    priceNgn: 45000000,
    priceUsd: 28500,
    type: 'Land Plot',
    size: '600 SQM',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    dateAdded: '2 days ago',
    titleType: "Governor's Consent & Registered Survey",
    ownerName: 'Engr. Babatunde F.',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    ownerRole: 'Plot Owner Trustee & Lead Surveyor',
    ownerThreadId: 'thread-1'
  },
  {
    id: 'rent-01',
    serviceId: 'rent-properties',
    title: 'Serviced 3-Bedroom Waterfront Apartment',
    location: 'Admiralty Way, Lekki Phase 1, Lagos',
    priceNgn: 12000000,
    priceUsd: 7600,
    type: 'Rental Apartment',
    size: '3 Beds • 3 Baths',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    dateAdded: 'Yesterday',
    titleType: 'Institutional Tenancy Lease (1 Year)',
    ownerName: 'Chief Alhaji Danjuma',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    ownerRole: 'Apartment Property Owner',
    ownerThreadId: 'thread-rent-01'
  },
  {
    id: 'house-03',
    serviceId: 'buy-houses',
    title: 'Oakwood 4-Bedroom Semi-Detached Duplex with BQ',
    location: 'Chevron Tollgate, Lekki, Lagos State',
    priceNgn: 135000000,
    priceUsd: 85500,
    type: 'Duplex House',
    size: '4 Beds • 5 Baths',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    dateAdded: '5 days ago',
    titleType: "Governor's Consent",
    ownerName: 'Mrs. Nkiru Utomi',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    ownerRole: 'Chevron Duplex Owner',
    ownerThreadId: 'thread-house-03'
  }
];

// Initial Seed for Notifications
export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Inspection Confirmed',
    message: 'Your private site inspection for Atlantic Bayfront Plot is scheduled for Friday at 10:00 AM with Surveyor Babatunde.',
    time: '35 minutes ago',
    read: false,
    category: 'inspection'
  },
  {
    id: 'notif-2',
    title: 'Price Update Alert',
    message: 'The 4-Bedroom Semi-Detached Duplex in Chevron Tollgate you showed interest in has an updated payment plan.',
    time: '4 hours ago',
    read: false,
    category: 'price'
  },
  {
    id: 'notif-3',
    title: 'Title Verification Cleared',
    message: 'Cadastral search LA/EP/2025/084 confirmed clean title with zero government excision conflict.',
    time: 'Yesterday',
    read: true,
    category: 'legal'
  },
  {
    id: 'notif-4',
    title: 'New Inquiry on Your Apartment',
    message: 'Dr. Amaka Eze sent a message inquiring about move-in dates for your Lekki Phase 1 Luxury Flat.',
    time: '2 days ago',
    read: false,
    category: 'inquiry'
  },
  {
    id: 'notif-5',
    title: 'Plot Inquiry Received',
    message: 'Chief Emeka Okonkwo messaged you regarding beacon coordinates for your Alaro City Plot.',
    time: '3 hours ago',
    read: false,
    category: 'inquiry'
  }
];

// Initial Seed for Messages (Includes Owners and Interested Inquirers)
export const DEFAULT_MESSAGES = [
  {
    id: 'thread-1',
    contactName: 'Engr. Babatunde F.',
    contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    contactRole: 'Plot Owner Trustee & Lead Surveyor',
    propertyTitle: 'Atlantic Bayfront Serviced Residential Plot',
    unreadCount: 1,
    time: '18m ago',
    messages: [
      {
        id: 'msg-1',
        sender: 'other',
        text: 'Good day Jonathan! I am the verified trustee & surveyor for the Atlantic Bayfront Plot. I reviewed the coordinate beacon for the Epe corridor plot you liked.',
        time: '10:15 AM'
      },
      {
        id: 'msg-2',
        sender: 'me',
        text: 'Thanks Babatunde. Are the concrete beacons verified with Alausa Lands Bureau?',
        time: '10:20 AM'
      },
      {
        id: 'msg-3',
        sender: 'other',
        text: 'Yes, 100% verified dry tableland with Registered Survey LA/EP/2025/084. I can accompany you for physical boundary pegging anytime this Friday.',
        time: '10:28 AM'
      }
    ]
  },
  {
    id: 'thread-rent-01',
    contactName: 'Chief Alhaji Danjuma',
    contactAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    contactRole: 'Apartment Property Owner',
    propertyTitle: 'Serviced 3-Bedroom Waterfront Apartment',
    unreadCount: 1,
    time: '1 hour ago',
    messages: [
      {
        id: 'msg-d1',
        sender: 'other',
        text: 'Hello Jonathan, peace be unto you! I am Alhaji Danjuma, the owner of the Serviced 3-Bedroom waterfront flat on Admiralty Way. I saw you showed interest in the apartment.',
        time: '11:20 AM'
      },
      {
        id: 'msg-d2',
        sender: 'other',
        text: 'The lease agreement is ready with 24-hour backup generator power and elevator access. Would you like an official walkthrough inspection this week?',
        time: '11:25 AM'
      }
    ]
  },
  {
    id: 'thread-house-03',
    contactName: 'Mrs. Nkiru Utomi',
    contactAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    contactRole: 'Chevron Duplex Owner',
    propertyTitle: 'Oakwood 4-Bedroom Semi-Detached Duplex with BQ',
    unreadCount: 0,
    time: 'Yesterday',
    messages: [
      {
        id: 'msg-u1',
        sender: 'other',
        text: 'Hello Jonathan! Thank you for your interest in our Chevron duplex. The Governor’s Consent is fully stamped and verified.',
        time: '3:10 PM'
      },
      {
        id: 'msg-u2',
        sender: 'me',
        text: 'Hello Mrs. Utomi, does the compound accommodate up to 4 SUVs?',
        time: '3:30 PM'
      },
      {
        id: 'msg-u3',
        sender: 'other',
        text: 'Yes! The stamped concrete driveway has space for 4 large vehicles, plus dedicated generator housing.',
        time: '3:45 PM'
      }
    ]
  },
  {
    id: 'thread-2',
    contactName: 'Dr. Amaka Eze (Interested Tenant)',
    contactAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    contactRole: 'Prospective Tenant Candidate',
    propertyTitle: 'Executive 3-Bedroom Luxury Apartment (Your Listing)',
    unreadCount: 1,
    time: '2 hours ago',
    messages: [
      {
        id: 'msg-201',
        sender: 'other',
        text: 'Hello! I saw your posted 3-Bedroom apartment on Umoja Terra. Is it ready for immediate move-in?',
        time: '2:40 PM'
      },
      {
        id: 'msg-202',
        sender: 'me',
        text: 'Hello Dr. Eze, yes it is fully serviced with 24/7 power, treated water, and dedicated parking.',
        time: '3:05 PM'
      },
      {
        id: 'msg-203',
        sender: 'other',
        text: 'Wonderful! Can we schedule a viewing this Saturday morning?',
        time: '3:20 PM'
      }
    ]
  },
  {
    id: 'thread-plot-inquiry',
    contactName: 'Chief Emeka Okonkwo (Interested Buyer)',
    contactAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
    contactRole: 'Commercial Land Investor',
    propertyTitle: 'Prime 600 SQM Dry Residential Plot (Your Listing)',
    unreadCount: 1,
    time: '3 hours ago',
    messages: [
      {
        id: 'msg-301',
        sender: 'other',
        text: 'Good day! I saw your posted 600 SQM plot in the Alaro City Corridor. I want to confirm if the survey beacons are planted on site?',
        time: '9:45 AM'
      },
      {
        id: 'msg-302',
        sender: 'other',
        text: 'I am ready to inspect and pay if the title documents match with the surveyor coordinates.',
        time: '9:50 AM'
      }
    ]
  }
];

// Initial Seed for User-Posted Listings (Both Apartments and Land Plots)
export const DEFAULT_LISTINGS = [
  {
    id: 'listing-01',
    categoryType: 'apartment', // 'apartment' | 'plot'
    title: 'Executive 3-Bedroom Luxury Apartment',
    type: 'Apartment',
    listingType: 'For Rent',
    location: 'Freedom Way, Lekki Phase 1, Lagos',
    price: 9500000,
    pricePeriod: 'year',
    bedrooms: 3,
    bathrooms: 3.5,
    furnishing: 'Semi-Furnished',
    amenities: ['24/7 Electricity', 'Treated Water', 'Uniformed Security', 'Swimming Pool', 'Dedicated Parking'],
    images: [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-living-room-41551-large.mp4',
    description: 'Impeccable serviced 3-bedroom flat on the 2nd floor with elevator access, fitted Italian kitchen, and scenic city views. 24-hour backup generator power guaranteed.',
    contactPhone: '+234 812 345 6789',
    postedBy: 'Jonathan K.',
    postedByRole: 'Verified Investor & Landlord',
    status: 'Active',
    viewsCount: 142,
    inquiriesCount: 2,
    inquiryThreadIds: ['thread-2'],
    datePosted: '3 days ago'
  },
  {
    id: 'listing-02',
    categoryType: 'plot', // 'apartment' | 'plot'
    title: 'Prime 600 SQM Dry Residential Plot',
    type: 'Land Plot',
    listingType: 'For Sale',
    location: 'Alaro City Corridor, Epe Expressway, Lagos',
    price: 24500000,
    pricePeriod: 'total',
    plotSize: '600 SQM (Full Dry Tableland)',
    topography: '100% Dry Tableland',
    titleType: "Governor's Consent & Registered Survey",
    zoning: 'Residential',
    beaconNumber: 'LA/EP/2026/102',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-4672-large.mp4',
    description: '100% dry tableland with perimeter beacons and cleared access road. Spotless cadastral file at Alausa Lands Bureau with zero excision disputes. Ready for immediate construction.',
    contactPhone: '+234 812 345 6789',
    postedBy: 'Jonathan K.',
    postedByRole: 'Verified Investor & Landlord',
    status: 'Active',
    viewsCount: 98,
    inquiriesCount: 1,
    inquiryThreadIds: ['thread-plot-inquiry'],
    datePosted: '1 day ago'
  },
  {
    id: 'listing-pending-01',
    categoryType: 'apartment',
    title: 'Green Park 2-Bedroom Serviced Terrace',
    type: 'Terrace House',
    listingType: 'For Rent',
    location: 'Orchid Road, Lekki Conservation Corridor, Lagos',
    price: 5500000,
    pricePeriod: 'year',
    bedrooms: 2,
    bathrooms: 2,
    furnishing: 'Fully Furnished',
    amenities: ['24/7 Power', 'Swimming Pool', 'CCTV Security', 'Dedicated Parking'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    description: 'Contemporary 2-bedroom furnished terrace apartment with fully fitted smart kitchen, dedicated power inverter, and private courtyard.',
    contactPhone: '+234 803 444 8811',
    postedBy: 'Chief Olatunji M.',
    postedByRole: 'Landlord & Developer',
    status: 'Pending',
    viewsCount: 0,
    inquiriesCount: 0,
    inquiryThreadIds: [],
    datePosted: '2 hours ago'
  },
  {
    id: 'listing-pending-02',
    categoryType: 'plot',
    title: 'Ibeju-Lekki Coastal Front 800 SQM Plot',
    type: 'Land Plot',
    listingType: 'For Sale',
    location: 'Coastal Road Extension, Ibeju-Lekki, Lagos',
    price: 38000000,
    pricePeriod: 'total',
    plotSize: '800 SQM (Coastal Tableland)',
    topography: 'Dry Sandy Tableland',
    titleType: 'Certificate of Occupancy (C of O)',
    zoning: 'Mixed Residential & Commercial',
    beaconNumber: 'LA/IBJ/2026/044',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    description: '800 SQM prime parcel facing the ongoing Coastal Highway link. Ideal for commercial boutique hotel or waterfront luxury duplex.',
    contactPhone: '+234 805 777 2200',
    postedBy: 'Dr. Kelechi Nwosu',
    postedByRole: 'Plot Owner Trustee',
    status: 'Pending',
    viewsCount: 0,
    inquiriesCount: 0,
    inquiryThreadIds: [],
    datePosted: '5 hours ago'
  },
  {
    id: 'listing-suspended-01',
    categoryType: 'plot',
    title: 'Subdivided Lekki Phase 2 Corner Plot',
    type: 'Land Plot',
    listingType: 'For Sale',
    location: 'Lekki Phase 2, Ikate Axis, Lagos',
    price: 29000000,
    pricePeriod: 'total',
    plotSize: '500 SQM',
    topography: 'Partially Cleared',
    titleType: 'Family Deed of Conveyance',
    zoning: 'Residential',
    beaconNumber: 'UNVERIFIED-09',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    description: 'Corner plot located off the primary arterial road without excision clearance.',
    contactPhone: '+234 802 999 1100',
    postedBy: 'Adeyemi Properties Ltd',
    postedByRole: 'Commercial Agent',
    status: 'Suspended',
    suspensionReason: 'Cadastral search flag: Boundary overlap with neighboring Lagos State road acquisition reservation. Requires surveyor re-certification.',
    viewsCount: 45,
    inquiriesCount: 0,
    inquiryThreadIds: [],
    datePosted: '1 week ago'
  }
];

// Helper functions for LocalStorage management
export const getUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const saveUser = (user) => {
  try {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to save user', e);
  }
};

export const getInterested = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INTERESTED);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.INTERESTED, JSON.stringify(DEFAULT_INTERESTED));
      return DEFAULT_INTERESTED;
    }
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_INTERESTED;
  }
};

export const addInterested = (item) => {
  try {
    const current = getInterested();
    const exists = current.some(i => i.id === item.id || (item.title && i.title === item.title));
    if (exists) return current;

    const newItem = {
      id: item.id || `int-${Date.now()}`,
      serviceId: item.serviceId || 'explore',
      title: item.title || 'Untitled Property',
      location: item.location || 'Lagos, Nigeria',
      priceNgn: item.priceNgn || item.price || 0,
      priceUsd: item.priceUsd || Math.round((item.priceNgn || item.price || 0) / 1600),
      type: item.type || 'Property',
      size: item.size || item.plotSize || 'Standard',
      image: item.mainImage || item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      images: item.images || [item.mainImage || item.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'],
      videoUrl: item.videoUrl || '',
      dateAdded: 'Just now',
      titleType: item.titleType || 'Verified Title',
      ownerName: item.ownerName || item.agentOrProvider || 'Verified Property Owner',
      ownerAvatar: item.ownerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      ownerRole: item.ownerRole || 'Property Owner Representative',
      ownerThreadId: item.ownerThreadId || `thread-${item.id || Date.now()}`
    };

    const updated = [newItem, ...current];
    localStorage.setItem(STORAGE_KEYS.INTERESTED, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return DEFAULT_INTERESTED;
  }
};

export const removeInterested = (itemId) => {
  try {
    const current = getInterested();
    const updated = current.filter(i => i.id !== itemId);
    localStorage.setItem(STORAGE_KEYS.INTERESTED, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

let hasSyncedNotifications = false;
export const getNotifications = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const cached = data ? JSON.parse(data) : DEFAULT_NOTIFICATIONS;

    // Background sync with Hono backend
    if (!hasSyncedNotifications) {
      hasSyncedNotifications = true;
      apiService.getNotificationsList(getUser()).then(remote => {
        if (Array.isArray(remote) && remote.length > 0) {
          localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(remote));
        }
      }).catch(() => {});
    }

    return cached;
  } catch (e) {
    return DEFAULT_NOTIFICATIONS;
  }
};

export const markAllNotificationsRead = () => {
  try {
    const current = getNotifications();
    const updated = current.map(n => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    apiService.markAllNotificationsRead(getUser()).catch(() => {});
    return updated;
  } catch (e) {
    return [];
  }
};

export const markNotificationRead = (notifId) => {
  try {
    const current = getNotifications();
    const updated = current.map(n => n.id === notifId ? { ...n, read: true } : n);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    apiService.markNotificationRead(notifId, getUser()).catch(() => {});
    return updated;
  } catch (e) {
    return [];
  }
};

export const addNotification = (notif) => {
  try {
    const current = getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: notif.title,
      message: notif.message,
      time: 'Just now',
      read: false,
      category: notif.category || 'general'
    };
    const updated = [newNotif, ...current];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

let hasSyncedMessages = false;
export const getMessages = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    const cached = data ? JSON.parse(data) : DEFAULT_MESSAGES;

    // Background sync with Hono backend
    if (!hasSyncedMessages) {
      hasSyncedMessages = true;
      apiService.getThreads(getUser()).then(remote => {
        if (Array.isArray(remote) && remote.length > 0) {
          localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(remote));
        }
      }).catch(() => {});
    }

    return cached;
  } catch (e) {
    return DEFAULT_MESSAGES;
  }
};

export const sendMessageToThread = (threadId, text) => {
  try {
    const threads = getMessages();
    const updated = threads.map(t => {
      if (t.id === threadId) {
        const newMsg = {
          id: `msg-${Date.now()}`,
          sender: 'me',
          text,
          time: 'Just now'
        };
        return {
          ...t,
          time: 'Just now',
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    });
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
    
    // Async backend call
    apiService.sendMessage(threadId, text, getUser()).then(res => {
      if (res?.threadMessages) {
        const currentThreads = getMessages();
        const synced = currentThreads.map(t => {
          if (t.id === threadId) {
            return { ...t, messages: res.threadMessages, time: 'Just now' };
          }
          return t;
        });
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(synced));
      }
    }).catch(() => {});

    return updated;
  } catch (e) {
    return DEFAULT_MESSAGES;
  }
};

export const markThreadRead = (threadId) => {
  try {
    const threads = getMessages();
    const updated = threads.map(t => {
      if (t.id === threadId) {
        return { ...t, unreadCount: 0 };
      }
      return t;
    });
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
    apiService.markThreadRead(threadId, getUser()).catch(() => {});
    return updated;
  } catch (e) {
    return [];
  }
};

// Ensure thread exists for a property owner when clicking "Chat with Owner"
export const ensureThreadForOwner = (ownerDetails, propertyTitle = '') => {
  try {
    const threads = getMessages();
    const existing = threads.find(t => 
      t.id === ownerDetails.ownerThreadId || 
      t.id === ownerDetails.threadId || 
      t.contactName === ownerDetails.ownerName
    );

    if (existing) {
      return existing.id;
    }

    // Create a new thread
    const newThreadId = ownerDetails.ownerThreadId || `thread-owner-${Date.now()}`;
    const newThread = {
      id: newThreadId,
      contactName: ownerDetails.ownerName || 'Property Owner',
      contactAvatar: ownerDetails.ownerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      contactRole: ownerDetails.ownerRole || 'Verified Property Owner',
      propertyTitle: propertyTitle || ownerDetails.title || 'Verified Property',
      unreadCount: 0,
      time: 'Just now',
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          sender: 'other',
          text: `Hello! I am the verified owner of "${propertyTitle || ownerDetails.title || 'this property'}". Thank you for showing interest! Feel free to ask about inspections, title documentation, or offers.`,
          time: 'Just now'
        }
      ]
    };

    const updated = [newThread, ...threads];
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
    apiService.ensureThread(ownerDetails, getUser()).catch(() => {});
    return newThreadId;
  } catch (e) {
    return 'thread-1';
  }
};

let hasSyncedListings = false;
export const getUserListings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LISTINGS);
    const cached = data ? JSON.parse(data) : DEFAULT_LISTINGS;

    // Background sync with Hono backend
    if (!hasSyncedListings) {
      hasSyncedListings = true;
      apiService.getListings(getUser()).then(remote => {
        if (Array.isArray(remote) && remote.length > 0) {
          localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(remote));
        }
      }).catch(() => {});
    }

    return cached;
  } catch (e) {
    return DEFAULT_LISTINGS;
  }
};

export const addUserListing = (listing, currentUser = null) => {
  try {
    const current = getUserListings();
    const isAdmin = currentUser?.role === 'admin';
    const newListing = {
      ...listing,
      id: listing.id || `listing-${Date.now()}`,
      postedBy: currentUser?.name || 'Jonathan K.',
      postedByRole: isAdmin ? 'Platform Administrator' : (currentUser?.roleTitle || currentUser?.role || 'Verified Member'),
      status: isAdmin ? 'Active' : 'Pending', // Pending approval for regular users!
      viewsCount: 1,
      inquiriesCount: 0,
      inquiryThreadIds: [],
      datePosted: 'Just now'
    };
    const updated = [newListing, ...current];
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(updated));

    if (!isAdmin) {
      addNotification({
        title: 'Listing Submitted for Verification',
        message: `"${listing.title || 'Your property'}" has been queued for admin verification and title check before going live.`,
        category: 'inspection'
      });
      addAdminLog(`New listing submitted by ${newListing.postedBy}: "${newListing.title}" (Pending Approval)`);
    } else {
      addAdminLog(`Admin ${currentUser?.name || 'Admin'} published new live listing: "${newListing.title}"`);
    }

    // Persist to backend database
    apiService.addListing(newListing, currentUser).catch(err => {
      console.warn('Backend addListing failed', err);
    });

    return updated;
  } catch (e) {
    return DEFAULT_LISTINGS;
  }
};

export const updateUserListing = (listingId, updatedFields) => {
  try {
    const current = getUserListings();
    const updated = current.map(item => {
      if (item.id === listingId) {
        return {
          ...item,
          ...updatedFields,
          lastEdited: 'Just now'
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(updated));
    apiService.updateListing(listingId, updatedFields, getUser()).catch(err => {
      console.warn('Backend updateListing failed', err);
    });
    return updated;
  } catch (e) {
    return [];
  }
};

export const deleteUserListing = (listingId) => {
  try {
    const current = getUserListings();
    const target = current.find(l => l.id === listingId);
    const updated = current.filter(l => l.id !== listingId);
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(updated));
    if (target) {
      addAdminLog(`Deleted listing "${target.title}" (${target.id})`);
    }
    apiService.deleteListing(listingId, getUser()).catch(err => {
      console.warn('Backend deleteListing failed', err);
    });
    return updated;
  } catch (e) {
    return [];
  }
};

// ══════════════════════════════════════════════════════════════════════
// ADMIN LISTING MODERATION FUNCTIONS
// ══════════════════════════════════════════════════════════════════════

export const approveListing = (listingId, adminName = 'Victoria Adeleke') => {
  try {
    const current = getUserListings();
    let approvedListing = null;
    const updated = current.map(item => {
      if (item.id === listingId) {
        approvedListing = item;
        return {
          ...item,
          status: 'Active',
          approvedAt: 'Just now',
          approvedBy: adminName,
          suspensionReason: null
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(updated));
    if (approvedListing) {
      addNotification({
        title: 'Listing Approved & Live!',
        message: `Your listing "${approvedListing.title}" was verified and approved by the platform administrator. It is now live on Umoja Terra.`,
        category: 'legal'
      });
      addAdminLog(`Approved listing "${approvedListing.title}" (${approvedListing.id})`, adminName);
    }
    // Sync to backend Hono API
    apiService.approveListing(listingId, { username: adminName, role: 'admin' }).catch(err => {
      console.warn('Backend approveListing failed', err);
    });
    return updated;
  } catch (e) {
    return [];
  }
};

export const suspendListing = (listingId, reason = 'Administrative review', adminName = 'Victoria Adeleke') => {
  try {
    const current = getUserListings();
    let suspendedItem = null;
    const updated = current.map(item => {
      if (item.id === listingId) {
        suspendedItem = item;
        return {
          ...item,
          status: 'Suspended',
          suspensionReason: reason,
          suspendedAt: 'Just now',
          suspendedBy: adminName
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(updated));
    if (suspendedItem) {
      addNotification({
        title: 'Listing Suspended by Admin',
        message: `Your listing "${suspendedItem.title}" was suspended. Reason: ${reason}`,
        category: 'legal'
      });
      addAdminLog(`Suspended listing "${suspendedItem.title}" - Reason: ${reason}`, adminName);
    }
    // Sync to backend Hono API
    apiService.suspendListing(listingId, reason, { username: adminName, role: 'admin' }).catch(err => {
      console.warn('Backend suspendListing failed', err);
    });
    return updated;
  } catch (e) {
    return [];
  }
};

export const reactivateListing = (listingId, adminName = 'Victoria Adeleke') => {
  try {
    const current = getUserListings();
    let reactivatedItem = null;
    const updated = current.map(item => {
      if (item.id === listingId) {
        reactivatedItem = item;
        return {
          ...item,
          status: 'Active',
          suspensionReason: null,
          reactivatedAt: 'Just now'
        };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(updated));
    if (reactivatedItem) {
      addNotification({
        title: 'Listing Re-activated',
        message: `Your listing "${reactivatedItem.title}" has been restored to Active status by the administrator.`,
        category: 'legal'
      });
      addAdminLog(`Re-activated listing "${reactivatedItem.title}"`, adminName);
    }
    // Sync to backend Hono API
    apiService.reactivateListing(listingId, { username: adminName, role: 'admin' }).catch(err => {
      console.warn('Backend reactivateListing failed', err);
    });
    return updated;
  } catch (e) {
    return [];
  }
};

// ══════════════════════════════════════════════════════════════════════
// SERVICES & PRODUCTS STORE (PERSISTENT EDITING FOR ADMIN)
// ══════════════════════════════════════════════════════════════════════

// Default Subscriptions and Appearance Configurations for Services & Products
export const DEFAULT_SERVICE_ENRICHMENTS = {
  'property-management': {
    accentColor: '#1A3E26',
    layoutStyle: 'card-modern',
    heroHeadline: 'Institutional Real Estate & Asset Care',
    heroSubtitle: 'Complete hands-off peace of mind for diaspora investors, single-unit landlords, and residential gated communities.',
    badgeText: 'Verified Operations',
    ctaLabel: 'Select Management Plan',
    highlights: [
      'Automated tenant rent collections with zero confrontation',
      'Quarterly physical 4K photographic inspection reports',
      '24/7 emergency artisan dispatch with pre-negotiated labor rates',
      'Digital legal leases drafted by accredited SAN property attorneys'
    ],
    subscriptions: [
      {
        id: 'plan-pm-basic',
        name: 'Basic Rent Collection & Tenant Ops',
        badge: 'Single Landlord',
        priceNgn: 45000,
        priceUsd: 30,
        billingPeriod: 'unit/month',
        shortDesc: 'Ideal for independent landlords with 1 to 5 rental properties.',
        offerings: [
          'Direct tenant bank debit & multi-channel payment gateway',
          'Digital legally binding lease agreements with e-signatures',
          'Automated WhatsApp & email payment reminders',
          'Quarterly PDF financial yield and expense statements'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-pm-comprehensive',
        name: 'Comprehensive Landlord Asset Care',
        badge: 'Most Popular',
        priceNgn: 75000,
        priceUsd: 50,
        billingPeriod: 'unit/month',
        shortDesc: 'Hands-off peace of mind with complete tenant management and maintenance dispatch.',
        offerings: [
          'All features from Basic Tier',
          '24/7 emergency hotline & artisan dispatch for plumbing and power',
          'Quarterly physical walk-through with 4K photo condition reports',
          'Tenant KYC vetting, BVN checks & guarantor authentications',
          'Pre-paid utility meter reconciliation to prevent tenant debt'
        ],
        active: true,
        highlighted: true
      },
      {
        id: 'plan-pm-diaspora',
        name: 'Turnkey Diaspora Asset Care',
        badge: 'VIP Protection',
        priceNgn: 95000,
        priceUsd: 64,
        billingPeriod: 'unit/month',
        shortDesc: 'Tailored for property owners living in the UK, USA, Canada, and Europe.',
        offerings: [
          'All features from Comprehensive Tier',
          'Direct overseas rent remittance in USD, GBP, or EUR',
          'Legal tenancy dispute arbitration and eviction defense insurance',
          'Automated property re-listing and staging 45 days before vacancy',
          'Annual property valuation and capital appreciation audit'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-pm-gate',
        name: 'Smart Gate & Access Control (Estates)',
        badge: 'Gatehouse Essentials',
        priceNgn: 3500,
        priceUsd: 2.4,
        billingPeriod: 'house/month',
        shortDesc: 'Modernize estate security and eradicate gatehouse congestion.',
        offerings: [
          'Visitor QR passes and 6-digit WhatsApp gate codes',
          'Guard tablet software with automated vehicle license plate logging',
          'Real-time resident arrival notifications'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-pm-estate',
        name: 'Complete Gated Community Operations',
        badge: 'Executive HOA & CDA',
        priceNgn: 7500,
        priceUsd: 5.1,
        billingPeriod: 'house/month',
        shortDesc: 'Full-spectrum community administration for residential estates and plazas.',
        offerings: [
          'Smart Gate & Access Control included',
          'Automated estate service charge & diesel dues collection',
          'Patrol tracking and security incident reporting',
          'Digital community broadcast announcements and facility booking',
          'Annual General Meeting (AGM) digital voting'
        ],
        active: true,
        highlighted: false
      }
    ]
  },
  'land-verification': {
    accentColor: '#D27D2D',
    layoutStyle: 'card-modern',
    heroHeadline: 'Accredited Land Verification Passes',
    heroSubtitle: 'Eliminate excision fraud, boundary disputes, and fake C of O risks before paying any land seller.',
    badgeText: 'NIS Licensed Surveyors',
    ctaLabel: 'Book Verification Pass',
    highlights: [
      'Dual-frequency GNSS RTK satellite boundary coordinate confirmation',
      'Surveyor General Alausa / AGIS cadastral charting check',
      'Official written legal opinion signed by certified property solicitor'
    ],
    subscriptions: [
      {
        id: 'plan-lv-basic',
        name: 'Fast-Track GPS Boundary & Beacon Pass',
        badge: 'Preliminary Check',
        priceNgn: 85000,
        priceUsd: 55,
        billingPeriod: 'one-time pass',
        shortDesc: 'Quick on-site verification of beacons and physical topography.',
        offerings: [
          'On-site physical inspection by licensed NIS surveyor',
          'Dual-frequency GNSS RTK satellite beacon coordinates check',
          '4K aerial drone photo and perimeter contour inspection',
          '48-hour turn-around certificate'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-lv-standard',
        name: 'Comprehensive Title & Registry Clearance',
        badge: 'Most Popular',
        priceNgn: 195000,
        priceUsd: 125,
        billingPeriod: 'one-time pass',
        shortDesc: 'Full cadastral search to ensure zero government acquisition or dispute.',
        offerings: [
          'All features of Fast-Track Pass',
          'Physical file search at State Lands Bureau (Alausa / AGIS)',
          'Charting check against government committed acquisitions',
          'Official Certificate of Occupancy & Excision status check',
          'Written legal clearance certificate signed by SAN counsel'
        ],
        active: true,
        highlighted: true
      },
      {
        id: 'plan-lv-deep',
        name: 'Full Institutional Due Diligence Pass',
        badge: 'Total Security',
        priceNgn: 380000,
        priceUsd: 245,
        billingPeriod: 'one-time pass',
        shortDesc: 'Deep vetting including family lineage, court records, and physical beacon planting.',
        offerings: [
          'All features of Comprehensive Clearance',
          'In-person community elder & Omo-Onile chieftaincy tree interview',
          'Litigation check across High Court and Court of Appeal dockets',
          'Soil test & swamp foundation elevation survey',
          'Umoja Terra 100% Escrow Acquisition Backing'
        ],
        active: true,
        highlighted: false
      }
    ]
  },
  'legal-documentation': {
    accentColor: '#1A3E26',
    layoutStyle: 'card-modern',
    heroHeadline: 'Fixed-Price Property Conveyancing & Title Perfection',
    heroSubtitle: 'Direct access to senior property advocates and Nigerian Bar Association (NBA) conveyancing specialists.',
    badgeText: 'NBA Accredited Solicitors',
    ctaLabel: 'Retain Legal Counsel',
    highlights: [
      'Zero hidden lawyer percentages or inflated legal fees',
      'Legally binding escrow documentation protecting buyer funds',
      'Governor\'s Consent and Stamp Duty processing tracking'
    ],
    subscriptions: [
      {
        id: 'plan-leg-search',
        name: 'Deed & Title Registry Search Report',
        badge: 'Quick Vetting',
        priceNgn: 65000,
        priceUsd: 42,
        billingPeriod: 'per search',
        shortDesc: 'Independent review of title documents and land registry files.',
        offerings: [
          'Registry search at State Land Bureau',
          'Verification of power of attorney & letters of administration',
          'Written legal advisory memorandum highlighting red flags'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-leg-draft',
        name: 'Deed of Assignment & Contract Drafting',
        badge: 'Most Popular',
        priceNgn: 150000,
        priceUsd: 95,
        billingPeriod: 'per contract',
        shortDesc: 'Comprehensive custom agreements protecting buyer rights and warranties.',
        offerings: [
          'Drafting of airtight Deed of Assignment & Contract of Sale',
          'Indemnity and seller breach warranty clauses',
          'Remote video witnessing or in-person execution signing',
          'Official stamping guidelines pack'
        ],
        active: true,
        highlighted: true
      },
      {
        id: 'plan-leg-consent',
        name: 'Governor\'s Consent & Title Perfection Retainer',
        badge: 'Full Perfection',
        priceNgn: 320000,
        priceUsd: 200,
        billingPeriod: 'per title',
        shortDesc: 'Professional liaison to secure Governor\'s Consent and registered title.',
        offerings: [
          'Preparation and filing of Form 1C at Ministry of Lands',
          'Assessment fee reconciliation and capital gains tax advisory',
          'Direct follow-up through all stages of approval',
          'Handover of sealed registered title deed'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-leg-corporate',
        name: 'Institutional Real Estate Counsel Retainer',
        badge: 'Corporate / Estate',
        priceNgn: 750000,
        priceUsd: 480,
        billingPeriod: 'quarterly retainer',
        shortDesc: 'Dedicated counsel for estate developers, commercial acquisitions, and syndicates.',
        offerings: [
          'Dedicated senior conveyancing partner assignment',
          'Unlimited contract reviews and title due diligence',
          'Corporate joint-venture structuring & escrow governance',
          '24/7 priority legal advisory access'
        ],
        active: true,
        highlighted: false
      }
    ]
  },
  'home-services': {
    accentColor: '#0F172A',
    layoutStyle: 'card-modern',
    heroHeadline: 'Verified Home Maintenance & Artisan Subscriptions',
    heroSubtitle: 'Never scramble for untrusted artisans. Pre-vetted plumbers, electricians, and HVAC engineers on monthly retainer.',
    badgeText: 'Pre-Vetted Artisans',
    ctaLabel: 'Choose Maintenance Plan',
    highlights: [
      'Guaranteed 2-hour response time for emergency plumbing and power leaks',
      'Zero contractor markup on genuine replacement parts',
      'All artisans background-checked with insured labor guarantee'
    ],
    subscriptions: [
      {
        id: 'plan-hs-essential',
        name: 'Essential Home Maintenance Retainer',
        badge: 'Standard Home',
        priceNgn: 25000,
        priceUsd: 16,
        billingPeriod: 'monthly',
        shortDesc: 'Proactive upkeep for 2-3 bedroom residential apartments.',
        offerings: [
          'Monthly plumbing inspection & water pressure test',
          'Air conditioning filter clean and gas top-up audit',
          'Electrical DB breaker & inverter load check',
          '2 free artisan emergency call-outs per month'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-hs-pro',
        name: 'Complete Home & Artisan Care Plan',
        badge: 'Most Popular',
        priceNgn: 55000,
        priceUsd: 35,
        billingPeriod: 'monthly',
        shortDesc: 'Full coverage for duplexes and luxury residential properties.',
        offerings: [
          'All Essential Care features included',
          'Unlimited artisan callouts (Plumbing, Electrical, Carpentry)',
          'Bi-monthly exterior high-pressure washing of driveway & drains',
          'Solar inverter & lithium battery cell maintenance check',
          'Priority 1-hour emergency artisan dispatch'
        ],
        active: true,
        highlighted: true
      },
      {
        id: 'plan-hs-master',
        name: 'Executive Villa & Estate Maintenance',
        badge: 'Maximum Care',
        priceNgn: 120000,
        priceUsd: 75,
        billingPeriod: 'monthly',
        shortDesc: 'Industrial-grade care for large luxury villas, swimming pools, and generators.',
        offerings: [
          'All Complete Care features included',
          'Diesel generator routine servicing and oil filter changes',
          'Swimming pool water testing and chemical balancing',
          'Water treatment plant filter replacement and flushing',
          'Dedicated facility manager contact'
        ],
        active: true,
        highlighted: false
      }
    ]
  },
  'interior-finishing': {
    accentColor: '#9A3412',
    layoutStyle: 'card-modern',
    heroHeadline: 'Architectural Interior Design & Staging Subscriptions',
    heroSubtitle: 'From single-room 3D concepts to full turnkey luxury staging for Airbnb and diaspora homes.',
    badgeText: 'Curated Finishes',
    ctaLabel: 'Book Design Package',
    highlights: [
      '1:1 Before & After spatial visualizers and photorealistic 3D renders',
      'Direct factory procurement discounts on imported Italian tiles and sanitaryware',
      'White-glove delivery, assembly, and turnkey staging'
    ],
    subscriptions: [
      {
        id: 'plan-int-consult',
        name: 'Concept & 3D Spatial Blueprint',
        badge: 'Design Concept',
        priceNgn: 120000,
        priceUsd: 78,
        billingPeriod: 'per room',
        shortDesc: 'Full 3D visualization and furniture schedule before purchasing materials.',
        offerings: [
          '1-on-1 interior architect video consultation',
          '4K photorealistic 3D room renders from 4 angles',
          'Curated paint, tile, and lighting specification sheet',
          'Procurement shopping list with discounted trade prices'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-int-turnkey',
        name: 'Turnkey Renovation & Installation Retainer',
        badge: 'Most Popular',
        priceNgn: 350000,
        priceUsd: 220,
        billingPeriod: 'per project',
        shortDesc: 'Hands-off design execution supervised on site by licensed architects.',
        offerings: [
          'All 3D Spatial Blueprint features included',
          'Dedicated site project architect overseeing tile & joinery installation',
          'Custom fluted wall paneling and acoustic ceiling integration',
          'Factory delivery coordination and quality inspection sign-off'
        ],
        active: true,
        highlighted: true
      },
      {
        id: 'plan-int-staging',
        name: 'Luxury Staging & Airbnb Turnkey Package',
        badge: 'Shortlet Ready',
        priceNgn: 650000,
        priceUsd: 410,
        billingPeriod: 'full home',
        shortDesc: 'Complete furnishing, bedding, artwork, and hospitality staging.',
        offerings: [
          'Full turnkey living, dining, and bedroom furnishing staging',
          'Curated afro-modern artwork and ambient LED illumination',
          'Professional high-definition architectural photography for Airbnb listing',
          'Immediate handover ready for tenant or guest move-in'
        ],
        active: true,
        highlighted: false
      }
    ]
  },
  'building-material': {
    accentColor: '#1A3E26',
    layoutStyle: 'card-modern',
    heroHeadline: 'Direct Factory-Gate Material Supply Memberships',
    heroSubtitle: 'Guaranteed genuine Dangote/BUA cement, certified TMT high-yield rebar, and granite shipped straight from depots.',
    badgeText: 'Factory Depot Direct',
    ctaLabel: 'Join Supply Network',
    highlights: [
      'Eliminate compromised fake rebar and sub-standard hollow block risks',
      'Flatbed 30-ton trailer direct dispatch with digital weighbridge receipts',
      'Escrow payment settlement upon verified site delivery'
    ],
    subscriptions: [
      {
        id: 'plan-bm-retail',
        name: 'Private Homebuilder Supply Pass',
        badge: 'Individual Builder',
        priceNgn: 20000,
        priceUsd: 13,
        billingPeriod: 'annual access',
        shortDesc: 'Direct wholesale rates on cement, sand, and granite for private home builders.',
        offerings: [
          'Guaranteed factory-gate cement and rebar prices',
          'On-site delivery within 24 to 48 hours across major corridors',
          'Escrow payment release only after you inspect delivered materials'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-bm-developer',
        name: 'Contractor & Estate Wholesale Account',
        badge: 'Most Popular',
        priceNgn: 90000,
        priceUsd: 58,
        billingPeriod: 'annual access',
        shortDesc: 'Priority logistics for contractors, estate developers, and civil engineers.',
        offerings: [
          'All Private Homebuilder features included',
          'Priority dispatch of 30-ton flatbed trailers and tippers',
          'Laboratory tensile strength and slump test certificates provided',
          'Dedicated logistics account manager'
        ],
        active: true,
        highlighted: true
      }
    ]
  },
  'moving-services': {
    accentColor: '#0F172A',
    layoutStyle: 'card-modern',
    heroHeadline: 'Insured Relocation & Fleet Dispatch Packages',
    heroSubtitle: 'Safe, stress-free home and office relocations with live GPS tracking and Goods-In-Transit insurance.',
    badgeText: 'Goods-In-Transit Insured',
    ctaLabel: 'Book Relocation Fleet',
    highlights: [
      'Trained packing crew with heavy-duty bubble wrap and corner guards',
      'Sealed weatherproof haulage trucks with hydraulic tail-lifts',
      'Zero damage guarantee backed by institutional insurance'
    ],
    subscriptions: [
      {
        id: 'plan-mov-city',
        name: 'Intra-City Apartment Move Pass',
        badge: 'City Move',
        priceNgn: 80000,
        priceUsd: 50,
        billingPeriod: 'per move',
        shortDesc: 'Smooth apartment relocations within Lagos, Abuja, or Port Harcourt.',
        offerings: [
          'Sealed 5-ton box truck with 3-person professional packing crew',
          'Protective furniture blankets and heavy-duty bubble wrapping',
          'Same-day pickup and delivery with furniture placement at new home'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-mov-interstate',
        name: 'Interstate Executive Relocation',
        badge: 'Most Popular',
        priceNgn: 250000,
        priceUsd: 160,
        billingPeriod: 'per move',
        shortDesc: 'Cross-country relocations between states with real-time GPS tracking.',
        offerings: [
          'Dedicated 30-ton padded haulage truck with satellite GPS tracking',
          'Goods-in-Transit insurance coverage up to ₦50 Million',
          'Full dismantling, secure crating, and reassembly at destination'
        ],
        active: true,
        highlighted: true
      }
    ]
  },
  'smart-home': {
    accentColor: '#0369A1',
    layoutStyle: 'card-modern',
    heroHeadline: 'Smart Automation & Solar Hybrid Integration',
    heroSubtitle: 'Elevate your property with biometric access, remote CCTV surveillance, and intelligent solar load balancing.',
    badgeText: 'Certified Smart Integrators',
    ctaLabel: 'Order Smart Package',
    highlights: [
      'Biometric fingerprint and smartphone remote door locking',
      'AI security cameras with perimeter motion tripwires and human recognition',
      'Intelligent inverter energy management saving up to 40% battery capacity'
    ],
    subscriptions: [
      {
        id: 'plan-sh-security',
        name: 'Smart Access & Security Starter',
        badge: 'Smart Security',
        priceNgn: 180000,
        priceUsd: 115,
        billingPeriod: 'installed package',
        shortDesc: 'Keyless biometric entry and smart doorbell video monitoring.',
        offerings: [
          'Biometric digital deadbolt smart lock (Fingerprint, Passcode, Card, Key)',
          '1080p Smart Video Doorbell with 2-way audio and phone chime',
          'Remote smartphone unlock and temporary visitor code generation',
          'Professional installation and 1-year hardware warranty'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-sh-complete',
        name: 'Full Home Automation & Energy Suite',
        badge: 'Most Popular',
        priceNgn: 450000,
        priceUsd: 290,
        billingPeriod: 'installed package',
        shortDesc: 'Whole-house smart lighting, motorized blinds, and solar inverter sync.',
        offerings: [
          'All Smart Security features included',
          'Smart touch glass wall switches and automated lighting scenes',
          'Solar inverter & battery monitor with auto-load shedding',
          'Voice assistant integration (Alexa / Google Home)',
          '4 Outdoor AI perimeter security cameras with night vision'
        ],
        active: true,
        highlighted: true
      }
    ]
  },
  'financing': {
    accentColor: '#047857',
    layoutStyle: 'card-modern',
    heroHeadline: 'Real Estate Financing & Installment Advisory',
    heroSubtitle: 'Navigate mortgage qualification, flexible developer milestone payments, and diaspora currency exchange safely.',
    badgeText: 'Accredited Financial Advisory',
    ctaLabel: 'Book Finance Session',
    highlights: [
      'Transparent interest rate and hidden fee audits on bank mortgages',
      'Structured 24 to 60-month direct developer payment plans',
      'Foreign exchange escrow safeguards for diaspora buyers'
    ],
    subscriptions: [
      {
        id: 'plan-fin-prequal',
        name: 'Mortgage Pre-Qualification & Credit Review',
        badge: 'Consultation',
        priceNgn: 45000,
        priceUsd: 28,
        billingPeriod: 'per session',
        shortDesc: '1-on-1 financial diagnostic with an accredited real estate finance specialist.',
        offerings: [
          'Comprehensive debt-to-income and equity capacity analysis',
          'Multi-bank mortgage rate comparison (NHF vs Commercial Mortgages)',
          'Official lender pre-qualification recommendation letter'
        ],
        active: true,
        highlighted: false
      },
      {
        id: 'plan-fin-plan',
        name: 'Developer Milestone Installment Structuring',
        badge: 'Most Popular',
        priceNgn: 120000,
        priceUsd: 75,
        billingPeriod: 'per plan',
        shortDesc: 'Airtight payment plan contracts tied directly to verified building milestones.',
        offerings: [
          'Structuring of 12 to 36-month developer installment contracts',
          'Milestone-linked escrow release schedule (foundation, lintel, roofing, finishing)',
          'Inflation and currency adjustment risk clauses protecting buyer capital'
        ],
        active: true,
        highlighted: true
      }
    ]
  }
};

// Helper: Enrich raw service with default subscriptions and page appearance
const enrichService = (rawService) => {
  const enrich = DEFAULT_SERVICE_ENRICHMENTS[rawService.id] || {
    accentColor: rawService.accent || '#1A3E26',
    layoutStyle: 'card-modern',
    heroHeadline: rawService.title,
    heroSubtitle: rawService.shortDesc,
    badgeText: rawService.badge || 'Verified Platform Service',
    ctaLabel: rawService.kind === 'service' ? 'Reserve Consultation' : 'Inquire Now',
    highlights: [
      'Accredited verification and direct field operations',
      'Escrow backed transaction through institutional trustees',
      'Transparent pricing with zero hidden contractor markup'
    ],
    subscriptions: [
      {
        id: `plan-${rawService.id}-std`,
        name: `${rawService.title} - Standard Plan`,
        badge: 'Standard Access',
        priceNgn: 50000,
        priceUsd: 32,
        billingPeriod: rawService.kind === 'service' ? 'per visit' : 'total',
        shortDesc: `Direct access to verified ${rawService.title.toLowerCase()} operations.`,
        offerings: [
          'Complete initial evaluation and inspection',
          'Official stamped documentation and summary report',
          'Direct customer support and coordination'
        ],
        active: true,
        highlighted: false
      },
      {
        id: `plan-${rawService.id}-prem`,
        name: `${rawService.title} - Priority Executive`,
        badge: 'Most Popular',
        priceNgn: 120000,
        priceUsd: 75,
        billingPeriod: rawService.kind === 'service' ? 'priority' : 'total',
        shortDesc: `Fast-track priority turnaround and dedicated operations manager.`,
        offerings: [
          'Everything in Standard Plan',
          'Fast-track 24-hour priority dispatch',
          'Dedicated senior operations manager contact',
          'Extended post-service warranty'
        ],
        active: true,
        highlighted: true
      }
    ]
  };

  return {
    ...rawService,
    status: rawService.status || 'active',
    accentColor: rawService.accentColor || enrich.accentColor,
    textColor: rawService.textColor || '#FFFFFF',
    subtitleColor: rawService.subtitleColor || 'rgba(255, 255, 255, 0.85)',
    badgeColor: rawService.badgeColor || '#D4AF37',
    layoutStyle: rawService.layoutStyle || enrich.layoutStyle,
    heroHeadline: rawService.heroHeadline || enrich.heroHeadline || rawService.title,
    heroSubtitle: rawService.heroSubtitle || enrich.heroSubtitle || rawService.shortDesc,
    badgeText: rawService.badgeText || enrich.badgeText || rawService.badge,
    ctaLabel: rawService.ctaLabel || enrich.ctaLabel,
    highlights: rawService.highlights || enrich.highlights,
    subscriptions: Array.isArray(rawService.subscriptions) && rawService.subscriptions.length > 0
      ? rawService.subscriptions
      : enrich.subscriptions
  };
};

let hasSyncedServices = false;
export const getStoredServices = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const cached = data ? JSON.parse(data).map(enrichService) : SERVICES.map(enrichService);

    // Background sync with Hono backend
    if (!hasSyncedServices) {
      hasSyncedServices = true;
      apiService.getServices().then(remote => {
        if (Array.isArray(remote) && remote.length > 0) {
          const enriched = remote.map(enrichService);
          localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(enriched));
          if (typeof window !== 'undefined') window.dispatchEvent(new Event('umoja_services_updated'));
        }
      }).catch(() => {});
    }

    return cached;
  } catch (e) {
    return SERVICES.map(enrichService);
  }
};

export const updateStoredService = (serviceId, updatedFields, adminName = 'Victoria Adeleke') => {
  try {
    const current = getStoredServices();
    let updatedTitle = serviceId;
    let fullTargetService = null;
    const updated = current.map(s => {
      if (s.id === serviceId) {
        updatedTitle = updatedFields.title || s.title;
        fullTargetService = {
          ...s,
          ...updatedFields,
          lastModified: 'Just now'
        };
        return fullTargetService;
      }
      return s;
    });
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated)); notifyServicesUpdated();
    addAdminLog(`Updated service/product "${updatedTitle}" (${serviceId})`, adminName);

    // Sync to backend Hono API
    if (fullTargetService) {
      apiService.updateService(serviceId, fullTargetService, { username: adminName, role: 'admin' }).catch(err => {
        console.warn('Backend updateService failed', err);
      });
    }

    return updated;
  } catch (e) {
    return [];
  }
};

export const updateServiceSubscription = (serviceId, planId, updatedPlan, adminName = 'Victoria Adeleke') => {
  try {
    const current = getStoredServices();
    let serviceTitle = serviceId;
    let fullTargetService = null;
    const updated = current.map(s => {
      if (s.id === serviceId) {
        serviceTitle = s.title;
        const existingPlans = s.subscriptions || [];
        const nextPlans = existingPlans.map(p => {
          if (p.id === planId) {
            return { ...p, ...updatedPlan };
          }
          return p;
        });
        fullTargetService = { ...s, subscriptions: nextPlans, lastModified: 'Just now' };
        return fullTargetService;
      }
      return s;
    });
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated)); notifyServicesUpdated();
    addAdminLog(`Updated subscription plan "${updatedPlan.name || planId}" in "${serviceTitle}"`, adminName);

    if (fullTargetService) {
      apiService.updateService(serviceId, fullTargetService, { username: adminName, role: 'admin' }).catch(() => {});
    }

    return updated;
  } catch (e) {
    return [];
  }
};

export const addServiceSubscription = (serviceId, newPlan, adminName = 'Victoria Adeleke') => {
  try {
    const current = getStoredServices();
    let serviceTitle = serviceId;
    const planWithId = {
      id: newPlan.id || `plan-${Date.now()}`,
      name: newPlan.name || 'New Subscription Tier',
      badge: newPlan.badge || 'Standard',
      priceNgn: Number(newPlan.priceNgn) || 50000,
      priceUsd: Number(newPlan.priceUsd) || Math.round((Number(newPlan.priceNgn) || 50000) / 1600),
      billingPeriod: newPlan.billingPeriod || 'monthly',
      shortDesc: newPlan.shortDesc || 'Subscription plan description.',
      offerings: Array.isArray(newPlan.offerings) ? newPlan.offerings : ['Included feature'],
      active: newPlan.active !== false,
      highlighted: !!newPlan.highlighted
    };

    let fullTargetService = null;
    const updated = current.map(s => {
      if (s.id === serviceId) {
        serviceTitle = s.title;
        const existingPlans = s.subscriptions || [];
        fullTargetService = { ...s, subscriptions: [...existingPlans, planWithId], lastModified: 'Just now' };
        return fullTargetService;
      }
      return s;
    });
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated)); notifyServicesUpdated();
    addAdminLog(`Added new subscription plan "${planWithId.name}" to "${serviceTitle}"`, adminName);

    if (fullTargetService) {
      apiService.updateService(serviceId, fullTargetService, { username: adminName, role: 'admin' }).catch(() => {});
    }

    return updated;
  } catch (e) {
    return [];
  }
};

export const deleteServiceSubscription = (serviceId, planId, adminName = 'Victoria Adeleke') => {
  try {
    const current = getStoredServices();
    let serviceTitle = serviceId;
    let deletedName = planId;
    let fullTargetService = null;
    const updated = current.map(s => {
      if (s.id === serviceId) {
        serviceTitle = s.title;
        const existingPlans = s.subscriptions || [];
        const filteredPlans = existingPlans.filter(p => {
          if (p.id === planId) {
            deletedName = p.name || planId;
            return false;
          }
          return true;
        });
        fullTargetService = { ...s, subscriptions: filteredPlans, lastModified: 'Just now' };
        return fullTargetService;
      }
      return s;
    });
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated)); notifyServicesUpdated();
    addAdminLog(`Deleted subscription plan "${deletedName}" from "${serviceTitle}"`, adminName);

    if (fullTargetService) {
      apiService.updateService(serviceId, fullTargetService, { username: adminName, role: 'admin' }).catch(() => {});
    }

    return updated;
  } catch (e) {
    return [];
  }
};

export const toggleServiceSubscription = (serviceId, planId, adminName = 'Victoria Adeleke') => {
  try {
    const current = getStoredServices();
    let serviceTitle = serviceId;
    let nextState = true;
    let planName = planId;
    let fullTargetService = null;
    const updated = current.map(s => {
      if (s.id === serviceId) {
        serviceTitle = s.title;
        const existingPlans = s.subscriptions || [];
        const nextPlans = existingPlans.map(p => {
          if (p.id === planId) {
            nextState = !p.active;
            planName = p.name;
            return { ...p, active: nextState };
          }
          return p;
        });
        fullTargetService = { ...s, subscriptions: nextPlans, lastModified: 'Just now' };
        return fullTargetService;
      }
      return s;
    });
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated)); notifyServicesUpdated();
    addAdminLog(`${nextState ? 'Activated' : 'Paused'} subscription "${planName}" in "${serviceTitle}"`, adminName);

    if (fullTargetService) {
      apiService.updateService(serviceId, fullTargetService, { username: adminName, role: 'admin' }).catch(() => {});
    }

    return updated;
  } catch (e) {
    return [];
  }
};

export const toggleServiceStatus = (serviceId, adminName = 'Victoria Adeleke') => {
  try {
    const current = getStoredServices();
    let serviceTitle = '';
    let nextStatus = 'active';
    const updated = current.map(s => {
      if (s.id === serviceId) {
        serviceTitle = s.title;
        nextStatus = s.status === 'disabled' ? 'active' : 'disabled';
        return {
          ...s,
          status: nextStatus
        };
      }
      return s;
    });
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated)); notifyServicesUpdated();
    addAdminLog(`${nextStatus === 'disabled' ? 'Disabled' : 'Enabled'} service "${serviceTitle}" (${serviceId})`, adminName);

    // Sync to backend Hono API
    apiService.toggleService(serviceId, { username: adminName, role: 'admin' }).catch(() => {});

    return updated;
  } catch (e) {
    return [];
  }
};

export const resetStoredServices = (adminName = 'Victoria Adeleke') => {
  try {
    const initialized = SERVICES.map(enrichService);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialized));
    addAdminLog(`Reset entire services catalog & subscriptions to factory defaults`, adminName);
    return initialized;
  } catch (e) {
    return SERVICES.map(enrichService);
  }
};

// ══════════════════════════════════════════════════════════════════════
// ADMIN AUDIT LOGS
// ══════════════════════════════════════════════════════════════════════

let hasSyncedAdminLogs = false;
export const getAdminLogs = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ADMIN_LOGS);
    const cached = data ? JSON.parse(data) : [
      { id: 'log-1', action: 'Cadastral database synced with Lagos State Lands Bureau', time: '1 day ago', admin: 'Victoria Adeleke' },
      { id: 'log-2', action: 'Verified and approved listing "Executive 3-Bedroom Luxury Apartment"', time: '3 days ago', admin: 'Victoria Adeleke' },
      { id: 'log-3', action: 'Flagged listing "Subdivided Lekki Phase 2 Corner Plot" for title check', time: '1 week ago', admin: 'Victoria Adeleke' }
    ];

    if (!hasSyncedAdminLogs) {
      hasSyncedAdminLogs = true;
      apiService.getAdminAuditLogs(getUser()).then(remote => {
        if (Array.isArray(remote) && remote.length > 0) {
          localStorage.setItem(STORAGE_KEYS.ADMIN_LOGS, JSON.stringify(remote));
        }
      }).catch(() => {});
    }

    return cached;
  } catch (e) {
    return [];
  }
};

export const addAdminLog = (action, adminName = 'Victoria Adeleke') => {
  try {
    const current = getAdminLogs();
    const newLog = {
      id: `log-${Date.now()}`,
      action,
      time: 'Just now',
      admin: adminName
    };
    const updated = [newLog, ...current.slice(0, 49)];
    localStorage.setItem(STORAGE_KEYS.ADMIN_LOGS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};
