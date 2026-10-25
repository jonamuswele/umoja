import React, { useState, useEffect, useMemo } from 'react';
import { 
  Palette, Maximize2, Eye, ShoppingBag, Sparkles, Wand2, 
  Users, Calendar, Calculator, Sliders, Layers, Compass, 
  Check, CheckCircle2, X, ArrowLeft, ChevronRight, UploadCloud, 
  Camera, DollarSign, Clock, Star, Home, Bed, Armchair, 
  Lamp, Sofa, ShieldCheck, Download, Phone, User, Info,
  Plus, Minus, Trash2, Heart, Award, ArrowRight, RefreshCw,
  Search, SlidersHorizontal, CalendarCheck, Package, Tag, Filter, CheckSquare, Grid, SplitSquareVertical
} from 'lucide-react';
import HouseFeaturesConfigurator from './HouseFeaturesConfigurator';
import { getStoredServices } from '../utils/userStorage';

// Authentic 1:1 Matched Before & After Renovation Photography
import livingBefore from '../assets/before-after/living_before.jpg';
import livingAfter from '../assets/before-after/living_after.jpg';
import bedBefore from '../assets/before-after/bed_before.jpg';
import bedAfter from '../assets/before-after/bed_after.jpg';
import kitchenBefore from '../assets/before-after/kitchen_before.jpg';
import kitchenAfterReno from '../assets/before-after/kitchen_after.jpg';
import bathBefore from '../assets/before-after/bath_before.jpg';
import bathAfterReno from '../assets/before-after/bath_after.jpg';
import facadeBefore from '../assets/before-after/facade_before.jpg';
import facadeAfter from '../assets/before-after/facade_after.jpg';
import deckBefore from '../assets/before-after/deck_before.jpg';
import deckAfter from '../assets/before-after/deck_after.jpg';

// Architectural High-End Materials & Finishes Photography
import livingAlabaster from '../assets/living_alabaster.png';
import livingObsidian from '../assets/living_obsidian.png';
import livingTerracotta from '../assets/living_terracotta.png';
import livingVelvet from '../assets/living_velvet.png';
import showerLuxury from '../assets/shower_luxury.png';
import exteriorVilla from '../assets/exterior_villa.png';
import cbpKitchen from '../assets/interior/cbp.jfif';

// ══════════════════════════════════════════════════════════════════════
// 1. DATA: ROOM VISUALIZATION PRESETS (Configurator)
// ══════════════════════════════════════════════════════════════════════
const ROOM_PRESETS = [
  {
    id: 'living-room',
    name: 'Executive Living & Dining Lounge',
    sqm: '65 SQM',
    tag: 'Primary Entertaining Space',
    beforeImg: livingBefore,
    beforeLabel: 'Original Living Room (Before)',
    afterImg: livingAfter,
    afterLabel: 'Contemporary Japanese-Nordic (After)',
    wallOptions: [
      { id: 'fluted-wood', label: 'Acoustic Fluted Walnut Slat Paneling', color: '#5C3826' },
      { id: 'venetian-plaster', label: 'Warm Travertine Venetian Plaster', color: '#D4C3B3' },
      { id: 'matte-cream', label: 'Matte Washable Architectural Cream', color: '#EFEAE1' }
    ],
    floorOptions: [
      { id: 'spanish-porcelain', label: 'Spanish 60x120 Rectified Light Cream Porcelain', desc: 'Gloss finish, seamless epoxy grout' },
      { id: 'chevron-oak', label: 'French Smoked Oak Chevron Engineered Hardwood', desc: 'Moisture-sealed for tropical humidity' },
      { id: 'white-terrazzo', label: 'Polished Dolomite & Quartz White Terrazzo', desc: 'Ultra-durable seamless modern terrazzo' }
    ],
    lightingOptions: [
      { id: 'shadow-gap', label: 'Recessed Shadow-Gap 3000K Ambient LED Coves' },
      { id: 'magnetic-track', label: 'Magnetic Architectural Black Track Lights' },
      { id: 'brass-chandelier', label: 'Sculptural Brushed Brass Cluster Pendant' }
    ]
  },
  {
    id: 'master-bedroom',
    name: 'Master Sanctuary & Walk-in Dressing',
    sqm: '48 SQM',
    tag: 'Private Luxury Suite',
    beforeImg: bedBefore,
    beforeLabel: 'Unfinished Room Shell (Before)',
    afterImg: bedAfter,
    afterLabel: 'Bespoke Curated Master Suite (After)',
    wallOptions: [
      { id: 'padded-fabric', label: 'Upholstered Vertical Linen Fluted Headboard Wall', color: '#C2B69D' },
      { id: 'smoked-mirror', label: 'Smoked Bronze Mirror & Dark Oak Dividers', color: '#4A3B32' },
      { id: 'cashmere-paint', label: 'Dulux Cashmere Matte Washable Finish', color: '#E8E3DC' }
    ],
    floorOptions: [
      { id: 'chevron-oak', label: 'Herringbone European White Oak Timber', desc: 'Warm tactile feel for bare feet' },
      { id: 'spanish-porcelain', label: 'Spanish Calacatta Gold Matte Porcelain Tile', desc: 'Cool surface, easy maintenance' },
      { id: 'silk-carpet', label: 'Bespoke Hand-Knotted Bamboo Silk Inset Rug', desc: 'Plush sound-dampening comfort' }
    ],
    lightingOptions: [
      { id: 'shadow-gap', label: 'Concealed Bed-Head Floating Ambient Glow' },
      { id: 'brass-chandelier', label: 'Low-Drop Minimalist Reading Pendants' },
      { id: 'magnetic-track', label: 'Warm Spot Accent on Wardrobe Glass Paneling' }
    ]
  },
  {
    id: 'chef-kitchen',
    name: 'Island Show Kitchen & Scullery',
    sqm: '38 SQM',
    tag: 'Gourmet Culinary Hub',
    beforeImg: kitchenBefore,
    beforeLabel: 'Original Dated Oak Cabinetry (Before)',
    afterImg: kitchenAfterReno,
    afterLabel: 'Modern Coastal Painted Cabinetry & Brass (After)',
    wallOptions: [
      { id: 'quartz-slab', label: 'Full-Height Calacatta Gold Seamless Quartz Backsplash', color: '#EAE8E3' },
      { id: 'matte-acrylic', label: 'Anti-Fingerprint Soft-Touch Matte Charcoal Cabinets', color: '#2B2D2F' },
      { id: 'warm-fluted', label: 'Natural Fluted White Oak Slats on Island Face', color: '#C8A882' }
    ],
    floorOptions: [
      { id: 'spanish-porcelain', label: 'Anti-Slip Spanish Large-Format Porcelain (80x160cm)', desc: 'Stain-resistant and heavy-duty' },
      { id: 'white-terrazzo', label: 'Poured Epoxy Terrazzo with Brass Inlay Dividers', desc: 'Zero grout lines, seamless cleaning' },
      { id: 'chevron-oak', label: 'Commercial-Grade Sealed Engineered Timber', desc: 'High moisture resistance' }
    ],
    lightingOptions: [
      { id: 'magnetic-track', label: 'Under-Cabinet High-CRI LED Task Lighting' },
      { id: 'shadow-gap', label: 'Continuous Shadow-Gap Floating Ceiling Coves' },
      { id: 'brass-chandelier', label: 'Cylinder Linear Brass Island Suspension Light' }
    ]
  },
  {
    id: 'master-bath',
    name: 'Spa Ensuite & Master Bathroom',
    sqm: '24 SQM',
    tag: 'Wellness & Wetroom Retreat',
    beforeImg: bathBefore,
    beforeLabel: 'Outdated 1980s Tile & Pedestal (Before)',
    afterImg: bathAfterReno,
    afterLabel: 'Crisp Subway Tile & Quartz Vanity (After)',
    wallOptions: [
      { id: 'acoustic-slat', label: 'Moisture-Treated Calacatta Subway Tile Surround', color: '#EAE8E3' },
      { id: 'dark-navy', label: 'Smoked Charcoal Fluted Accent Wall', color: '#2B2D2F' },
      { id: 'warm-sand', label: 'Warm Neutral Venetian Microcement', color: '#DED6C9' }
    ],
    floorOptions: [
      { id: 'spanish-porcelain', label: 'Textured Slate Grey Anti-Slip Porcelain (60x60cm)', desc: 'Wetroom-certified grip' },
      { id: 'chevron-oak', label: 'Teak Slatted Shower Floor Insert', desc: 'Organic spa warmth' },
      { id: 'white-terrazzo', label: 'Polished Quartz Micro-Terrazzo Slab', desc: 'Seamless luxury feel' }
    ],
    lightingOptions: [
      { id: 'magnetic-track', label: 'Recessed 3000K Soft Shower Niche Backlight' },
      { id: 'shadow-gap', label: 'Backlit Frameless LED Vanity Mirror' },
      { id: 'brass-chandelier', label: 'Low-Voltage Warm Brass Ceiling Spotlights' }
    ]
  }
];

// ══════════════════════════════════════════════════════════════════════
// 2. DATA: FURNITURE & HOME ACCESSORIES CATALOG (24+ Items)
// ══════════════════════════════════════════════════════════════════════
const FURNITURE_ITEMS = [
  // ── LIVING ROOM ──
  {
    id: 'furn-01',
    category: 'living',
    name: 'The Lekki Cloud 6-Seater Modular Sectional',
    priceNGN: 1850000,
    priceUSD: 1200,
    badge: 'Bestseller',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    dimensions: '340cm W x 180cm D x 78cm H',
    materials: 'Waterproof Performance Bouclé Fabric, Kiln-Dried Teak Frame',
    leadTime: 'In Stock (48h Delivery Lagos & Abuja)'
  },
  {
    id: 'furn-05',
    category: 'living',
    name: 'Sculptural Travertine Stone Coffee Table (Double Tier)',
    priceNGN: 580000,
    priceUSD: 380,
    badge: 'Statement Piece',
    img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?w=800&q=80',
    dimensions: '120cm L x 75cm W x 42cm H',
    materials: 'Natural Honed Italian Travertine Stone Slab',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-06',
    category: 'living',
    name: 'Terracotta Swivel Accent Armchair',
    priceNGN: 380000,
    priceUSD: 250,
    badge: 'Cozy Accent',
    img: 'https://images.unsplash.com/photo-1580481077195-c328a37db71a?w=800&q=80',
    dimensions: '82cm W x 84cm D x 76cm H',
    materials: 'Textured Wool-Bouclé Fabric, 360-Degree Heavy Duty Metal Swivel Base',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-08',
    category: 'living',
    name: 'Acoustic Fluted Timber Floating TV Console (3 Meters)',
    priceNGN: 680000,
    priceUSD: 440,
    badge: 'Media Storage',
    img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    dimensions: '300cm L x 45cm D x 40cm H',
    materials: 'Solid Fluted Ashwood, Soft-Close Push Latches, Cable Management Ducting',
    leadTime: '5-7 Days Fabrication'
  },
  {
    id: 'furn-living-05',
    category: 'living',
    name: 'Bouclé Sculptural Lounge Occasional Chair',
    priceNGN: 420000,
    priceUSD: 270,
    badge: 'Sculptural Form',
    img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    dimensions: '78cm W x 82cm D x 74cm H',
    materials: 'Ivory Curly Bouclé Weave, Champagne Gold Swivel Base',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-living-06',
    category: 'living',
    name: 'Minimalist Fluted Round Walnut Side Table',
    priceNGN: 195000,
    priceUSD: 130,
    badge: 'Handcrafted',
    img: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80',
    dimensions: '48cm Diameter x 52cm H',
    materials: 'Solid Black Walnut Timber with Fluted Pedestal',
    leadTime: 'In Stock'
  },

  // ── DINING ROOM ──
  {
    id: 'furn-02',
    category: 'dining',
    name: 'Nordic Monolith Quartz 8-Seater Dining Table',
    priceNGN: 1450000,
    priceUSD: 950,
    badge: 'Luxury Stone',
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    dimensions: '240cm L x 100cm W x 76cm H',
    materials: 'Calacatta Gold Engineered Quartz, Fluted Matte Oak Pedestals',
    leadTime: '5-7 Days Fabrication'
  },
  {
    id: 'furn-03',
    category: 'dining',
    name: 'Fluted Velvet & Brass Dining Chairs (Set of 6)',
    priceNGN: 720000,
    priceUSD: 470,
    badge: 'Dining Set (6pcs)',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    dimensions: '54cm W x 58cm D x 82cm H',
    materials: 'Stain-Resistant Olive Green Velvet, Brushed Brass Legs',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-dining-03',
    category: 'dining',
    name: 'Contemporary Smoked Oak Sideboard Buffet Credenza',
    priceNGN: 850000,
    priceUSD: 550,
    badge: 'Storage Credenza',
    img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80',
    dimensions: '190cm L x 45cm D x 80cm H',
    materials: 'Smoked European White Oak with Brass Push-Latch Handles',
    leadTime: '7-10 Days Fabrication'
  },
  {
    id: 'furn-dining-04',
    category: 'dining',
    name: 'Sculptural Brass & Cognac Leather Counter Barstools (Set of 3)',
    priceNGN: 410000,
    priceUSD: 265,
    badge: 'Island Barstools (3pcs)',
    img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80',
    dimensions: '46cm W x 48cm D x 65cm Seat Height',
    materials: 'Top-Grain Cognac Saddle Leather, Matte Brass Frame',
    leadTime: 'In Stock'
  },

  // ── BEDROOM ──
  {
    id: 'furn-04',
    category: 'bedroom',
    name: 'Milano Floating Bed Frame with Integrated Nightstands',
    priceNGN: 1200000,
    priceUSD: 780,
    badge: 'Master Suite',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    dimensions: 'King Size (210cm x 220cm)',
    materials: 'Padded Linen Upholstery, Fluted Dark Walnut Wood with Under-Glow LEDs',
    leadTime: '7-10 Days Custom Fit'
  },
  {
    id: 'furn-bed-02',
    category: 'bedroom',
    name: 'Fluted White Oak 6-Drawer Dresser',
    priceNGN: 620000,
    priceUSD: 400,
    badge: 'Storage Dresser',
    img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
    dimensions: '160cm L x 50cm D x 85cm H',
    materials: 'Natural White Oak with Fluted Drawer Fronts and Soft-Close Hardware',
    leadTime: '5-7 Days Fabrication'
  },
  {
    id: 'furn-bed-03',
    category: 'bedroom',
    name: 'Japandi Woven Natural Cane Bed-End Bench',
    priceNGN: 245000,
    priceUSD: 160,
    badge: 'Bed-End Accent',
    img: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=800&q=80',
    dimensions: '140cm L x 42cm W x 45cm H',
    materials: 'Solid Teak Hardwood Frame with Natural Handwoven Rattan Cane',
    leadTime: 'In Stock'
  },

  // ── ACCESSORIES & HOME DECOR ──
  {
    id: 'furn-acc-01',
    category: 'accessories',
    name: 'Handcrafted Wabi-Sabi Ceramic Vases (Curated Trio)',
    priceNGN: 120000,
    priceUSD: 78,
    badge: 'Artisanal Decor',
    img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80',
    dimensions: 'Heights: 32cm, 24cm, 18cm',
    materials: 'Coarse Sand-Textured Stoneware Ceramic with Matte Unglazed Finish',
    leadTime: 'In Stock (Ready to Ship)'
  },
  {
    id: 'furn-acc-02',
    category: 'accessories',
    name: 'Honed Nero Marquina Marble Vanity Tray & Bowls',
    priceNGN: 85000,
    priceUSD: 55,
    badge: 'Natural Stone',
    img: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=800&q=80',
    dimensions: '35cm L x 20cm W x 4cm H',
    materials: 'Solid Spanish Nero Marquina Black Marble with White Veining',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-acc-03',
    category: 'accessories',
    name: 'Textured Woven Raffia & Raw Linen Throw Pillows (Set of 4)',
    priceNGN: 95000,
    priceUSD: 62,
    badge: 'Textiles Set (4pcs)',
    img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80',
    dimensions: '50cm x 50cm (4 Cushions)',
    materials: 'Natural Raffia Fiber Face, French Flax Linen Back, Feather Insert',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-acc-04',
    category: 'accessories',
    name: 'Sculptural Fluted Ceramic Floor Planter with Fiddle Leaf',
    priceNGN: 140000,
    priceUSD: 90,
    badge: 'Botanical Accent',
    img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
    dimensions: '40cm Diameter x 70cm H',
    materials: 'Heavyweight Fluted Terracotta Ceramic with Matte White Glaze',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-acc-05',
    category: 'accessories',
    name: 'Minimalist Full-Length Arch Brass Floor Mirror (190cm)',
    priceNGN: 280000,
    priceUSD: 180,
    badge: 'Statement Mirror',
    img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80',
    dimensions: '80cm W x 190cm H',
    materials: 'High-Definition Shatterproof Mirror, Brushed Brass Aluminum Arch Frame',
    leadTime: 'In Stock'
  },

  // ── LIGHTING ──
  {
    id: 'furn-07',
    category: 'lighting',
    name: 'Architectural 12-Light Frosted Glass & Gold Branch Chandelier',
    priceNGN: 420000,
    priceUSD: 275,
    badge: 'Designer Lighting',
    img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
    dimensions: '140cm Diameter x 60cm Drop (Adjustable)',
    materials: 'Mouth-Blown Frosted Glass Globes, Electroplated Brass Arms',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-light-02',
    category: 'lighting',
    name: 'Brushed Brass Arc Overarching Floor Lamp with Marble Base',
    priceNGN: 290000,
    priceUSD: 190,
    badge: 'Lounge Floor Lamp',
    img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    dimensions: '210cm Reach x 205cm H',
    materials: 'Heavy Carrara Marble Base, Solid Brushed Brass Telescopic Arc',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-light-03',
    category: 'lighting',
    name: 'Hand-Cast Travertine & Natural Linen Cylinder Table Lamp',
    priceNGN: 135000,
    priceUSD: 88,
    badge: 'Bedside Table Lamp',
    img: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80',
    dimensions: '28cm Diameter x 48cm H',
    materials: 'Honed Italian Travertine Base, Natural Textured Oatmeal Linen Shade',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-light-04',
    category: 'lighting',
    name: 'Smoked Fluted Glass Kitchen Island Pendants (Pair)',
    priceNGN: 180000,
    priceUSD: 115,
    badge: 'Pendant Pair (2pcs)',
    img: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80',
    dimensions: '22cm Diameter x 35cm H per pendant (Set of 2)',
    materials: 'Ribbed Smoked Grey Glass, Antique Brass Ceiling Canopy',
    leadTime: 'In Stock'
  },

  // ── RUGS & WALL ART ──
  {
    id: 'furn-rug-01',
    category: 'rugs-art',
    name: 'Hand-Knotted High-Low Wool Geometric Area Rug (300x400cm)',
    priceNGN: 650000,
    priceUSD: 420,
    badge: 'Large Area Rug',
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
    dimensions: '300cm x 400cm (Large Lounge Fit)',
    materials: '100% New Zealand High-Pile Wool, Organic Cotton Warp',
    leadTime: 'In Stock'
  },
  {
    id: 'furn-art-01',
    category: 'rugs-art',
    name: 'Minimalist Textured Plaster Relief Canvas Diptych',
    priceNGN: 320000,
    priceUSD: 210,
    badge: 'Gallery Canvas Art',
    img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80',
    dimensions: 'Two Panels (100cm x 150cm each)',
    materials: 'Architectural Microcement Plaster on Stretched Heavyweight Linen',
    leadTime: 'In Stock'
  }
];

// ══════════════════════════════════════════════════════════════════════
// 3. DATA: AUTHENTIC ROOM REDESIGN SPACES (5 Spaces with Matching Pics)
// ══════════════════════════════════════════════════════════════════════
const REDESIGN_SPACES = [
  {
    id: 'living-lounge',
    name: 'Executive Living & Dining Lounge',
    category: 'Living Space',
    sqm: '65 SQM',
    tag: 'Primary Entertaining',
    beforeImg: livingBefore,
    beforeLabel: 'Original Dated / Unfinished Living Room (Before)',
    afterImg: livingAfter,
    afterLabel: 'Contemporary Japanese-Nordic Finished Lounge (After)',
    styles: [
      { key: 'japandi', label: 'Modern Japandi', img: livingAfter, desc: 'Light oak fluted slats, recessed 3000K LEDs, organic bouclé curves' },
      { key: 'alabaster', label: 'Alabaster Luxe', img: livingAlabaster, desc: 'Honed Italian travertine, alabaster plaster walls, warm cove glow' },
      { key: 'obsidian', label: 'Obsidian Minimalist', img: livingObsidian, desc: 'Smoked timber, blackened steel accents, magnetic track spots' },
      { key: 'terracotta', label: 'Warm Terracotta', img: livingTerracotta, desc: 'Warm desert clay wash, natural linen upholstery, brass trim' },
      { key: 'velvet', label: 'Velvet Jewel', img: livingVelvet, desc: 'Jewel-tone emerald velvet, polished brass, chevron smoked oak' }
    ],
    specs: {
      flooring: 'Spanish 60x120cm Calacatta rectified porcelain & herringbone white oak',
      walls: 'Acoustic fluted walnut slat paneling with Venetian microcement screed',
      lighting: 'Concealed 3000K shadow-gap ambient ceiling coves + magnetic architectural tracks',
      joinery: 'Custom floating fluted media console with concealed cable conduits',
      estBudget: '₦6.5M – ₦11.8M ($4,200 – $7,600)'
    },
    shopLookIds: ['furn-01', 'furn-05', 'furn-06', 'furn-rug-01', 'furn-07', 'furn-acc-01']
  },
  {
    id: 'chef-kitchen',
    name: 'Island Show Kitchen & Scullery',
    category: 'Culinary Hub',
    sqm: '38 SQM',
    tag: 'Gourmet Culinary Hub',
    beforeImg: kitchenBefore,
    beforeLabel: 'Original Dated Oak Cabinetry & Cramped Island (Before)',
    afterImg: kitchenAfterReno,
    afterLabel: 'Modern Coastal Painted Cabinetry & Quartz Island (After)',
    styles: [
      { key: 'coastal', label: 'Crisp White & Brass', img: kitchenAfterReno, desc: 'Calacatta quartz backsplash, brushed brass handles, soft-close joinery' },
      { key: 'warm-slat', label: 'Warm Fluted Oak Island', img: cbpKitchen, desc: 'Fluted white oak island base, matte charcoal full-height pantry' }
    ],
    specs: {
      flooring: 'Anti-slip large format Spanish porcelain tile (80x160cm)',
      walls: 'Full-height Calacatta Gold engineered quartz seamless slab backsplash',
      lighting: 'Under-cabinet continuous high-CRI LED task lighting + smoked glass pendants',
      joinery: 'Anti-fingerprint matte acrylic soft-touch drawers with Blum hardware',
      estBudget: '₦8.2M – ₦14.5M ($5,300 – $9,400)'
    },
    shopLookIds: ['furn-02', 'furn-dining-04', 'furn-light-04', 'furn-acc-01', 'furn-acc-02']
  },
  {
    id: 'master-suite',
    name: 'Master Sanctuary & Walk-in Dressing',
    category: 'Private Suite',
    sqm: '48 SQM',
    tag: 'Private Luxury Suite',
    beforeImg: bedBefore,
    beforeLabel: 'Raw Blockwork Concrete Shell with Exposed Brick (Before)',
    afterImg: bedAfter,
    afterLabel: 'Curated Bespoke Master Suite with Fluted Bedhead (After)',
    styles: [
      { key: 'curated', label: 'Bespoke Curated Suite', img: bedAfter, desc: 'Upholstered linen flutes, warm timber floors, concealed bedhead glow' }
    ],
    specs: {
      flooring: 'French engineered white oak chevron timber parquet',
      walls: 'Vertical padded linen headboard accent wall with Dulux cashmere wash',
      lighting: 'Low-voltage floating bedhead cove lighting and low-drop reading pendants',
      joinery: 'Floor-to-ceiling smoked bronze mirror wardrobe with integrated LED profile',
      estBudget: '₦5.8M – ₦9.6M ($3,700 – $6,200)'
    },
    shopLookIds: ['furn-04', 'furn-bed-02', 'furn-bed-03', 'furn-light-03', 'furn-acc-05']
  },
  {
    id: 'spa-bath',
    name: 'Spa Ensuite & Wetroom Sanctuary',
    category: 'Bathroom & Spa',
    sqm: '24 SQM',
    tag: 'Wellness Wetroom',
    beforeImg: bathBefore,
    beforeLabel: 'Dated 1980s Yellow Tile & Pedestal Sink (Before)',
    afterImg: bathAfterReno,
    afterLabel: 'Crisp Subway Tile & Double Quartz Vanity (After)',
    styles: [
      { key: 'crisp', label: 'Modern Subway & Brass', img: bathAfterReno, desc: 'Gloss subway wall tile, brushed brass mixers, quartz double vanity' },
      { key: 'marble-wet', label: 'Ultra-Luxury Marble Wetroom', img: showerLuxury, desc: 'Bookmatched floor-to-ceiling marble, rainfall shower, frameless glass' }
    ],
    specs: {
      flooring: 'Textured slate grey anti-slip wetroom porcelain tile (60x60cm)',
      walls: 'Moisture-sealed subway tile and Venetian microcement wetroom screed',
      lighting: 'Backlit frameless oval LED smart vanity mirror with anti-fog heating',
      joinery: 'Floating fluted teak double vanity with undermount quartz basins',
      estBudget: '₦3.8M – ₦7.2M ($2,500 – $4,600)'
    },
    shopLookIds: ['furn-acc-01', 'furn-acc-02', 'furn-acc-05']
  },
  {
    id: 'facade-terrace',
    name: 'Façade, Terrace & Sunken Pool Deck',
    category: 'Exterior & Deck',
    sqm: '95 SQM',
    tag: 'Outdoor Oasis',
    beforeImg: deckBefore,
    beforeLabel: 'Weathered Unfinished Outdoor Decking (Before)',
    afterImg: deckAfter,
    afterLabel: 'Restored Marine Teak Decking with Plunge Pool (After)',
    styles: [
      { key: 'teak-deck', label: 'Teak Terrace & Pool', img: deckAfter, desc: 'Weather-sealed teak deck, recessed warm step lighting, plunge pool' },
      { key: 'villa-exterior', label: 'Mediterranean Villa Façade', img: exteriorVilla, desc: 'Smooth alabaster stucco, black architectural frames, facade sconces' },
      { key: 'facade-reno', label: 'Contemporary Home Exterior', img: facadeAfter, desc: 'Complete facade restoration, modern glass railings, architectural portico' }
    ],
    specs: {
      flooring: 'Kiln-dried marine-grade teak decking with hidden stainless clip fasteners',
      walls: 'Alabaster silicone-enhanced exterior weatherproof stucco coating',
      lighting: 'IP67 submersible LED pool lighting and architectural bronze step lights',
      joinery: 'Frameless 12mm tempered safety glass balustrades in recessed floor channel',
      estBudget: '₦7.5M – ₦15.0M ($4,800 – $9,700)'
    },
    shopLookIds: ['furn-acc-04', 'furn-living-05', 'furn-light-02']
  }
];

// ══════════════════════════════════════════════════════════════════════
// 4. DATA: INTERIOR DESIGNERS & PACKAGES
// ══════════════════════════════════════════════════════════════════════
const DESIGNERS = [
  {
    id: 'des-01',
    name: 'Studio Maison Terra (Arc. Folashade Alabi)',
    specialty: 'Ultra-Luxury Contemporary & Penthouse Fit-Out',
    rating: '4.98',
    reviewsCount: 84,
    location: 'Victoria Island, Lagos & Maitama, Abuja',
    experience: '12 Years Practice',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    portfolioImgs: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400'
    ]
  },
  {
    id: 'des-02',
    name: 'Nordic & Lagos Design Atelier (Tunde Adeyemi)',
    specialty: 'Minimalist Japandi & Smart Home Space Planning',
    rating: '4.95',
    reviewsCount: 62,
    location: 'Lekki Phase 1, Lagos',
    experience: '9 Years Practice',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    portfolioImgs: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400'
    ]
  },
  {
    id: 'des-03',
    name: 'Kigali & Abuja Heritage Interiors (Zainab Bello)',
    specialty: 'Contemporary African Luxe & Bespoke Joinery',
    rating: '4.92',
    reviewsCount: 47,
    location: 'Guzape & Wuse 2, Abuja FCT',
    experience: '11 Years Practice',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    portfolioImgs: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400',
      'https://images.unsplash.com/photo-1505409859467-3a796fd5798e?w=400'
    ]
  }
];

const DESIGN_PACKAGES = [
  {
    id: 'pkg-consult',
    name: '60-Minute Virtual Design Advisory',
    priceNGN: '₦35,000',
    priceUSD: '$25',
    duration: '1 Hour Live Video Call',
    desc: 'One-on-one layout review, color scheme diagnosis, and furniture arrangement advice with an accredited interior architect.',
    features: [
      'Live review of your floor plans or room photos',
      'Color palette recommendation report (PDF)',
      'Lighting and electrical rough-in advice',
      'Quick shoppable furniture suggestions'
    ]
  },
  {
    id: 'pkg-concept',
    name: 'Full 3D Room Concept & Spec Package',
    priceNGN: '₦125,000',
    priceUSD: '$85',
    duration: '5 - 7 Business Days',
    popular: true,
    desc: 'Complete photorealistic 3D visualization, 2D architectural furniture layout with precise dimensions, and itemized shopping list.',
    features: [
      '3 High-definition 4K ray-traced 3D room renders',
      'Scaled 2D furniture layout plan with dimensions',
      'Complete Bill of Quantities (BOQ) with verified store links',
      'Material & paint swatch codes (Dulux & Berger)',
      '2 rounds of layout revisions included'
    ]
  },
  {
    id: 'pkg-turnkey',
    name: 'Turnkey Fit-Out & Site Supervision',
    priceNGN: '₦450,000+',
    priceUSD: '$300+ Retainer',
    duration: 'Full Project Lifecycle',
    desc: 'Hands-off turnkey interior delivery. Our lead interior architects supervise screeders, carpenters, and electricians on-site.',
    features: [
      'Everything in Full 3D Room Concept',
      'Physical on-site weekly supervision & quality control',
      'Direct material procurement at wholesale trade discount',
      'Defect snagging audit and 1-year workmanship warranty bond'
    ]
  }
];

export default function InteriorDesignHub({ onBackToHub, customService }) {
  const storedServices = getStoredServices();
  const idService = customService || (storedServices.find(s => s.id === 'interior-finishing' || s.id === 'interior-design') || {});
  // Navigation: Set initial tab to furniture-shopping so the studio is immediately rich & stocked!
  const [activeTab, setActiveTab] = useState('furniture-shopping');
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  // Auto-scroll to top whenever configurator opens/closes or active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [isConfiguratorOpen, activeTab]);

  // 1. Furniture & Accessories Shopping State
  const [furnitureCategory, setFurnitureCategory] = useState('all');
  const [furnitureSearch, setFurnitureSearch] = useState('');
  const [furnitureSort, setFurnitureSort] = useState('featured');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing && existing.qty > 1) {
        return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const deleteFromCart = (id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const totalCartNGN = cart.reduce((acc, curr) => acc + (curr.priceNGN * curr.qty), 0);
  const totalCartUSD = cart.reduce((acc, curr) => acc + (curr.priceUSD * curr.qty), 0);

  // Filtered & Sorted Furniture Catalog
  const filteredFurniture = useMemo(() => {
    let list = [...FURNITURE_ITEMS];
    if (furnitureCategory !== 'all') {
      list = list.filter(item => item.category === furnitureCategory);
    }
    if (furnitureSearch.trim()) {
      const q = furnitureSearch.toLowerCase();
      list = list.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.materials.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
    }
    if (furnitureSort === 'price-asc') {
      list.sort((a, b) => a.priceNGN - b.priceNGN);
    } else if (furnitureSort === 'price-desc') {
      list.sort((a, b) => b.priceNGN - a.priceNGN);
    }
    return list;
  }, [furnitureCategory, furnitureSearch, furnitureSort]);

  // 2. Room Redesign Studio State
  const [activeRedesignSpaceId, setActiveRedesignSpaceId] = useState('living-lounge');
  const [activeStyleKey, setActiveStyleKey] = useState({
    'living-lounge': 'japandi',
    'chef-kitchen': 'coastal',
    'master-suite': 'curated',
    'spa-bath': 'crisp',
    'facade-terrace': 'teak-deck'
  });
  const [redesignViewMode, setRedesignViewMode] = useState('slider'); // 'slider' | 'side-by-side' | 'after-only' | 'before-only'
  const [sliderPosition, setSliderPosition] = useState(50);

  const activeRedesignSpace = REDESIGN_SPACES.find(s => s.id === activeRedesignSpaceId) || REDESIGN_SPACES[0];
  const currentSelectedStyleKey = activeStyleKey[activeRedesignSpace.id] || activeRedesignSpace.styles[0]?.key;
  const currentStyleObj = activeRedesignSpace.styles.find(s => s.key === currentSelectedStyleKey) || activeRedesignSpace.styles[0];
  const activeAfterImage = currentStyleObj?.img || activeRedesignSpace.afterImg;

  // AI Custom Generator in Redesign
  const [customPhotoName, setCustomPhotoName] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const handleGenerateAi = () => {
    setIsGeneratingAi(true);
    setAiResult(null);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setAiResult({
        img: activeAfterImage,
        space: activeRedesignSpace.name,
        style: currentStyleObj?.label || 'Contemporary Architectural Fit-Out',
        summary: `Photorealistic spatial redesign applied to ${activeRedesignSpace.name}. Featuring ${currentStyleObj?.label} aesthetics, calibrated LED lighting, and bespoke joinery takeoff.`,
        suggestedItems: activeRedesignSpace.shopLookIds.map(id => FURNITURE_ITEMS.find(i => i.id === id)?.name).filter(Boolean),
        estBudget: activeRedesignSpace.specs.estBudget
      });
    }, 1200);
  };

  // 3. Room Finishes Configurator State
  const [activeRoomId, setActiveRoomId] = useState('living-room');
  const activeRoom = ROOM_PRESETS.find(r => r.id === activeRoomId) || ROOM_PRESETS[0];

  // 4. Designer Booking State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(DESIGN_PACKAGES[1]);
  const [selectedDesigner, setSelectedDesigner] = useState(DESIGNERS[0]);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '4-Bedroom Duplex',
    targetRoom: 'Living Room & Dining Lounge',
    targetBudget: 'Executive Premium (₦15M - ₦25M)',
    preferredDate: '',
    notes: ''
  });
  const [bookingPass, setBookingPass] = useState(null);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const passCode = 'ID-UMOJA-' + Math.floor(100000 + Math.random() * 900000);
    setBookingPass({
      passCode,
      designer: selectedDesigner.name,
      package: selectedPkg.name,
      fee: selectedPkg.priceNGN,
      clientName: bookingFormData.name || 'Valued Homeowner',
      targetRoom: bookingFormData.targetRoom,
      date: bookingFormData.preferredDate || 'Within 48 Hours',
      propertyType: bookingFormData.propertyType
    });
  };

  // 5. Budget Planner State
  const [budgetPropertySize, setBudgetPropertySize] = useState('4-bed-duplex');
  const [budgetFinishTier, setBudgetFinishTier] = useState('executive');
  const [budgetModules, setBudgetModules] = useState({
    popCeiling: true,
    flooringWalls: true,
    kitchenJoinery: true,
    wardrobes: true,
    bathrooms: true,
    furnitureDecor: true
  });

  const calculateBudget = () => {
    const sizeMultiplier = {
      '1-bed-studio': 0.35,
      '2-bed-flat': 0.60,
      '3-bed-terrace': 0.85,
      '4-bed-duplex': 1.0,
      '5-bed-mansion': 1.55
    }[budgetPropertySize] || 1.0;

    const tierMultiplier = {
      'standard': 0.65,
      'executive': 1.0,
      'ultra-luxury': 1.85
    }[budgetFinishTier] || 1.0;

    let materialBase = 0;
    let laborBase = 0;

    if (budgetModules.popCeiling) { materialBase += 1800000; laborBase += 750000; }
    if (budgetModules.flooringWalls) { materialBase += 3200000; laborBase += 1100000; }
    if (budgetModules.kitchenJoinery) { materialBase += 4500000; laborBase += 850000; }
    if (budgetModules.wardrobes) { materialBase += 2800000; laborBase += 600000; }
    if (budgetModules.bathrooms) { materialBase += 2400000; laborBase += 700000; }
    if (budgetModules.furnitureDecor) { materialBase += 4800000; laborBase += 400000; }

    const scaledMaterials = Math.round(materialBase * sizeMultiplier * tierMultiplier);
    const scaledLabor = Math.round(laborBase * sizeMultiplier * tierMultiplier);
    const designFee = Math.round((scaledMaterials + scaledLabor) * 0.08);
    const contingency = Math.round((scaledMaterials + scaledLabor) * 0.05);
    const total = scaledMaterials + scaledLabor + designFee + contingency;

    return {
      materials: scaledMaterials,
      labor: scaledLabor,
      designFee,
      contingency,
      total,
      totalUSD: Math.round(total / 1550)
    };
  };

  const calculatedBudget = calculateBudget();

  // If user launched the dedicated interior configurator, render it full page
  if (isConfiguratorOpen) {
    return (
      <HouseFeaturesConfigurator
        mode="interior"
        serviceTitle="Interior Architecture & Finishes Studio"
        onBack={() => setIsConfiguratorOpen(false)}
        onComplete={(dossier) => {
          setIsConfiguratorOpen(false);
          setIsBookingModalOpen(true);
        }}
      />
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAF9F6',
      color: '#1E293B',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: '100px'
    }}>
      {/* ══════════════════════════════════════════════════════════════════
          TOP NAVIGATION BAR
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        background: '#FFFFFF',
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
          color: 'var(--text-title)',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.02em',
          textAlign: 'right'
        }}>
          Interior Architecture, Furniture &amp; Redesign Studio
        </h2>
      </div>

      {/* Sub-bar Actions: Cart & Quick Booking */}
      <div style={{ backgroundColor: '#FAF9F6', borderBottom: '1px solid var(--border)', padding: '10px 6%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                borderRadius: '4px',
                background: cart.length > 0 ? 'rgba(210, 125, 45, 0.15)' : '#FFFFFF',
                border: cart.length > 0 ? '1px solid var(--accent-gold)' : '1px solid var(--border)',
                color: cart.length > 0 ? 'var(--accent-gold)' : 'var(--text-title)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <span>Project Cart ({cart.reduce((a, c) => a + c.qty, 0)})</span>
            </button>

            <button
              onClick={() => {
                setSelectedPkg(DESIGN_PACKAGES[1]);
                setIsBookingModalOpen(true);
              }}
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                fontSize: '0.8rem'
              }}
            >
              <span>Book Designer</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO BANNER & TWO PROMINENT DIRECT ACCESS CARDS
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1280px',
        margin: '24px auto 0',
        padding: '0 4%'
      }}>
        <div style={{
          background: idService?.heroImage 
            ? `linear-gradient(180deg, rgba(7, 12, 9, 0.92), rgba(7, 12, 9, 0.96)), url(${idService.heroImage})`
            : '#070C09',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '14px',
          border: `1px solid ${idService?.badgeColor ? `${idService.badgeColor}40` : 'rgba(210, 125, 45, 0.35)'}`,
          padding: '36px 32px',
          color: '#FFFFFF',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)'
        }}>
          {idService?.badgeText && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(210, 125, 45, 0.2)', padding: '4px 12px', borderRadius: '4px', marginBottom: '12px', border: `1px solid ${idService?.badgeColor ? `${idService.badgeColor}66` : 'rgba(210, 125, 45, 0.35)'}` }}>
              <Palette size={14} style={{ color: idService?.badgeColor || 'var(--accent-gold)' }} />
              <span style={{ fontSize: '0.74rem', color: idService?.badgeColor || 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {idService.badgeText}
              </span>
            </div>
          )}

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 3.2vw, 2.7rem)',
            fontWeight: 400,
            lineHeight: 1.18,
            letterSpacing: '-0.02em',
            color: idService?.textColor || '#FFFFFF',
            maxWidth: '840px',
            marginBottom: '14px'
          }}>
            {idService?.heroHeadline || (
              <>Shop Luxury Furniture &amp; <span style={{ color: idService?.badgeColor || 'var(--accent-gold)' }}>Redesign Any Room with Real Visuals.</span></>
            )}
          </h1>

          <p style={{
            fontSize: '1.02rem',
            lineHeight: 1.6,
            color: idService?.subtitleColor || 'rgba(255, 255, 255, 0.82)',
            maxWidth: '780px',
            marginBottom: 0,
            fontWeight: 300
          }}>
            {idService?.heroSubtitle || "Explore our curated furniture & accessories marketplace with transparent pricing, or step into the interactive Room Redesign Studio to compare authentic 1:1 camera-matched Before & After spatial transformations."}
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          5 CORE FEATURE TABS (SNAPS TO TOP ON SCROLL)
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'sticky',
        top: '75px',
        zIndex: 900,
        backgroundColor: '#FAF9F6',
        padding: '10px 4%',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '8px',
          background: '#FFFFFF',
          padding: '8px',
          borderRadius: '10px',
          border: '1px solid var(--border)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}>
          {[
            { id: 'furniture-shopping', label: '1. Buy Furniture & Accessories', icon: Sofa },
            { id: 'ai-redesign', label: '2. Room Redesign Studio', icon: Wand2 },
            { id: 'interior-configurator', label: '3. Interior Finishes Configurator', icon: Sparkles },
            { id: 'designer-booking', label: '4. Book Interior Designer', icon: Users },
            { id: 'budget-planner', label: '5. Fit-Out Budget & BOQ', icon: Calculator }
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
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid transparent',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#64748B',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? '0 4px 14px rgba(26, 62, 38, 0.25)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'rgba(26, 62, 38, 0.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: isActive ? 'rgba(210, 125, 45, 0.25)' : '#FAF9F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isActive ? 'var(--accent-gold)' : 'var(--accent)',
                  flexShrink: 0
                }}>
                  <Icon size={16} />
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isActive ? '#FFFFFF' : '#1E293B', whiteSpace: 'nowrap' }}>
                  {tab.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        maxWidth: '1280px',
        margin: '24px auto 0',
        padding: '0 4%'
      }}>

        {/* ───────────────────────────────────────────────────────────────
            TAB 1: BUY FURNITURE, ACCESSORIES & LIGHTING
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'furniture-shopping' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Header, Search & Filter Bar */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              padding: '24px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <ShoppingBag size={18} style={{ color: 'var(--accent-gold)' }} />
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Curated Furniture &amp; Accessories Marketplace
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--accent)', margin: 0 }}>
                    Bespoke &amp; Imported Pieces for Luxury Homes
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#64748B', margin: '4px 0 0' }}>
                    Select furniture, decor, lighting, and rugs crafted for tropical resilience. Add items directly to your project docket with direct doorstep delivery.
                  </p>
                </div>

                {/* Search & Sort Row */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <Search size={15} style={{ position: 'absolute', left: '12px', color: '#94A3B8' }} />
                    <input
                      type="text"
                      placeholder="Search sofas, tables, mirrors, lighting..."
                      value={furnitureSearch}
                      onChange={(e) => setFurnitureSearch(e.target.value)}
                      style={{
                        padding: '8px 12px 8px 34px',
                        borderRadius: '6px',
                        border: '1px solid var(--border)',
                        background: '#FAF9F6',
                        fontSize: '0.82rem',
                        color: '#1E293B',
                        width: '240px'
                      }}
                    />
                    {furnitureSearch && (
                      <button
                        onClick={() => setFurnitureSearch('')}
                        style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0 }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <select
                    value={furnitureSort}
                    onChange={(e) => setFurnitureSort(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      background: '#FAF9F6',
                      fontSize: '0.82rem',
                      color: '#1E293B',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                {[
                  { id: 'all', label: 'All Items', count: FURNITURE_ITEMS.length },
                  { id: 'living', label: 'Living Room', count: FURNITURE_ITEMS.filter(i => i.category === 'living').length },
                  { id: 'dining', label: 'Dining', count: FURNITURE_ITEMS.filter(i => i.category === 'dining').length },
                  { id: 'bedroom', label: 'Bedroom', count: FURNITURE_ITEMS.filter(i => i.category === 'bedroom').length },
                  { id: 'accessories', label: 'Home Accessories', count: FURNITURE_ITEMS.filter(i => i.category === 'accessories').length },
                  { id: 'lighting', label: 'Lighting', count: FURNITURE_ITEMS.filter(i => i.category === 'lighting').length },
                  { id: 'rugs-art', label: 'Rugs & Art', count: FURNITURE_ITEMS.filter(i => i.category === 'rugs-art').length }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFurnitureCategory(cat.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '6px',
                      background: furnitureCategory === cat.id ? 'var(--accent)' : '#FAF9F6',
                      border: furnitureCategory === cat.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                      color: furnitureCategory === cat.id ? '#FFFFFF' : '#475569',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s'
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{
                      padding: '1px 6px',
                      borderRadius: '10px',
                      background: furnitureCategory === cat.id ? 'rgba(210, 125, 45, 0.4)' : 'rgba(0,0,0,0.06)',
                      color: furnitureCategory === cat.id ? '#FFF' : '#64748B',
                      fontSize: '0.7rem'
                    }}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Status Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
              <div style={{ fontSize: '0.84rem', color: '#64748B' }}>
                Showing <strong style={{ color: 'var(--accent)' }}>{filteredFurniture.length}</strong> verified pieces
                {furnitureCategory !== 'all' && <span> in <span style={{ textTransform: 'capitalize' }}>{furnitureCategory}</span></span>}
              </div>
              {cart.length > 0 && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-gold)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <ShoppingBag size={14} />
                  <span>View Project Docket ({cart.reduce((a, c) => a + c.qty, 0)} items) &rarr;</span>
                </button>
              )}
            </div>

            {/* Product Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '22px'
            }}>
              {filteredFurniture.map((item) => {
                const inCart = cart.find(i => i.id === item.id);
                return (
                  <div
                    key={item.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                  >
                    <div>
                      {/* Product Image */}
                      <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden', background: '#F1F5F9' }}>
                        <img
                          src={item.img}
                          alt={item.name}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        />
                        <span style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: 'rgba(26, 62, 38, 0.9)',
                          color: 'var(--accent-gold)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          backdropFilter: 'blur(4px)'
                        }}>
                          {item.badge}
                        </span>
                        <span style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'rgba(0, 0, 0, 0.65)',
                          color: '#FFFFFF',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}>
                          {item.category}
                        </span>
                      </div>

                      {/* Product Specs */}
                      <div style={{ padding: '16px 18px 12px' }}>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px', lineHeight: 1.3, minHeight: '42px' }}>
                          {item.name}
                        </h4>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                            ₦{item.priceNGN.toLocaleString()}
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                            / ${item.priceUSD}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.74rem', color: '#475569', marginBottom: '4px' }}>
                          <strong>Dimensions:</strong> {item.dimensions}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#64748B', marginBottom: '8px', lineHeight: 1.4 }}>
                          <strong>Materials:</strong> {item.materials}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 600 }}>
                          &bull; {item.leadTime}
                        </div>
                      </div>
                    </div>

                    {/* Add to Project Cart Actions */}
                    <div style={{ padding: '0 18px 18px' }}>
                      {inCart ? (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'rgba(210, 125, 45, 0.1)',
                          border: '1px solid var(--accent-gold)',
                          borderRadius: '6px',
                          padding: '6px 12px'
                        }}>
                          <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                            In Project: {inCart.qty}
                          </span>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                background: '#E2E8F0',
                                border: 'none',
                                borderRadius: '4px',
                                color: '#1E293B',
                                padding: '3px 8px',
                                cursor: 'pointer',
                                fontWeight: 700
                              }}
                            >
                              -
                            </button>
                            <span style={{ fontSize: '0.82rem', fontWeight: 800, minWidth: '16px', textAlign: 'center' }}>
                              {inCart.qty}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              style={{
                                background: 'var(--accent-gold)',
                                border: 'none',
                                borderRadius: '4px',
                                color: '#070C09',
                                fontWeight: 800,
                                padding: '3px 8px',
                                cursor: 'pointer'
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="btn-primary"
                          style={{
                            width: '100%',
                            padding: '9px',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <ShoppingBag size={14} />
                          <span>+ Add to Project Order</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 2: ROOM REDESIGN STUDIO (5 SPACES WITH REAL BEFORE/AFTER)
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'ai-redesign' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            {/* Header Callout */}
            <div style={{
              background: '#070C09',
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              padding: '24px 28px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ maxWidth: '780px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Wand2 size={18} color="#FBBF24" />
                  <span style={{ fontSize: '0.74rem', color: '#FBBF24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Authentic Room Redesign Studio
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#34D399', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
                    1:1 Camera-Matched Renovation Photography
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 400, color: '#FFF', margin: '0 0 6px' }}>
                  Interactive Spatial Transformations with Material Takeoffs
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.5 }}>
                  Drag the interactive slider below to reveal raw blockwork shells transformed into finished Japanese-Nordic and contemporary African sanctuaries. Switch style variants, inspect architectural finishes, and shop the exact furniture pieces used in the room.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    setSelectedPkg(DESIGN_PACKAGES[1]);
                    setIsBookingModalOpen(true);
                  }}
                  className="btn-primary"
                  style={{ padding: '10px 18px', fontSize: '0.84rem' }}
                >
                  <CalendarCheck size={15} />
                  <span>Execute with an Architect</span>
                </button>
              </div>
            </div>

            {/* Room Space Selector Tabs (5 Spaces) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px'
            }}>
              {REDESIGN_SPACES.map((space) => {
                const isSelected = activeRedesignSpaceId === space.id;
                return (
                  <div
                    key={space.id}
                    onClick={() => {
                      setActiveRedesignSpaceId(space.id);
                      setAiResult(null);
                    }}
                    style={{
                      background: isSelected ? 'var(--accent)' : '#FFFFFF',
                      border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 4px 14px rgba(26, 62, 38, 0.2)' : 'none'
                    }}
                  >
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border)'
                    }}>
                      <img src={space.afterImg} alt={space.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: isSelected ? '#FFFFFF' : '#1E293B' }}>
                        {space.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: isSelected ? 'var(--accent-gold)' : '#64748B' }}>
                        {space.sqm} &bull; {space.styles.length} Styles
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary Interactive Redesign Workspace */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
            }}>
              {/* Space Title & View Mode Controls */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '18px',
                flexWrap: 'wrap',
                gap: '14px',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '16px'
              }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {activeRedesignSpace.category} Transformation
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                    {activeRedesignSpace.name}
                  </h3>
                </div>

                {/* View Mode Toggle Buttons */}
                <div style={{ display: 'flex', gap: '6px', background: '#FAF9F6', padding: '4px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  {[
                    { mode: 'slider', label: 'Interactive Split Slider' },
                    { mode: 'side-by-side', label: 'Side-by-Side View' },
                    { mode: 'after-only', label: 'Finished Render (After)' },
                    { mode: 'before-only', label: 'Original Shell (Before)' }
                  ].map((v) => (
                    <button
                      key={v.mode}
                      onClick={() => setRedesignViewMode(v.mode)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: redesignViewMode === v.mode ? 'var(--accent)' : 'transparent',
                        color: redesignViewMode === v.mode ? '#FFFFFF' : '#64748B',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Switcher Selector */}
              {activeRedesignSpace.styles.length > 1 && (
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '0.76rem', color: '#475569', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Select Architectural Aesthetic Variant:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {activeRedesignSpace.styles.map((style) => {
                      const isStyleActive = currentSelectedStyleKey === style.key;
                      return (
                        <button
                          key={style.key}
                          onClick={() => {
                            setActiveStyleKey(prev => ({ ...prev, [activeRedesignSpace.id]: style.key }));
                            setAiResult(null);
                          }}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '6px',
                            border: isStyleActive ? '1px solid var(--accent-gold)' : '1px solid var(--border)',
                            background: isStyleActive ? 'rgba(210, 125, 45, 0.12)' : '#FAF9F6',
                            color: isStyleActive ? 'var(--accent)' : '#475569',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.15s'
                          }}
                        >
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isStyleActive ? 'var(--accent-gold)' : '#CBD5E1' }} />
                          <span>{style.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '6px', fontStyle: 'italic' }}>
                    &bull; {currentStyleObj?.desc}
                  </div>
                </div>
              )}

              {/* ── PHOTO VISUALIZATION CANVAS ── */}
              <div style={{ marginBottom: '22px' }}>
                {/* 1. SLIDER MODE */}
                {redesignViewMode === 'slider' && (
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(320px, 50vw, 540px)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    userSelect: 'none',
                    border: '1px solid var(--border)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                  }}>
                    {/* Background: AFTER image */}
                    <img
                      src={activeAfterImage}
                      alt={activeRedesignSpace.afterLabel}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />

                    {/* Foreground: BEFORE image clipped to slider position */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: `${sliderPosition}%`,
                      height: '100%',
                      overflow: 'hidden',
                      borderRight: '2px solid #FFFFFF'
                    }}>
                      <img
                        src={activeRedesignSpace.beforeImg}
                        alt={activeRedesignSpace.beforeLabel}
                        style={{
                          minWidth: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          maxWidth: 'none',
                          width: `${100 / (sliderPosition / 100)}%`
                        }}
                      />
                    </div>

                    {/* Divider Handle Line */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: `${sliderPosition}%`,
                      width: '4px',
                      background: '#FFFFFF',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                      transform: 'translateX(-50%)',
                      pointerEvents: 'none'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#FFFFFF',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                        fontWeight: 800,
                        fontSize: '0.75rem'
                      }}>
                        &harr;
                      </div>
                    </div>

                    {/* Overlaid Badges */}
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: 'rgba(15, 23, 42, 0.85)',
                      color: '#F87171',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em'
                    }}>
                      BEFORE (ORIGINAL)
                    </div>

                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      background: 'rgba(26, 62, 38, 0.9)',
                      color: 'var(--accent-gold)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.04em'
                    }}>
                      AFTER ({currentStyleObj?.label || 'FINISHED'})
                    </div>

                    {/* Slider Range Input Controller */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '5%',
                        width: '90%',
                        zIndex: 10,
                        accentColor: 'var(--accent-gold)',
                        cursor: 'ew-resize'
                      }}
                    />
                  </div>
                )}

                {/* 2. SIDE-BY-SIDE MODE */}
                {redesignViewMode === 'side-by-side' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                    <div style={{ position: 'relative', height: '360px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                      <img src={activeRedesignSpace.beforeImg} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(15, 23, 42, 0.85)', color: '#F87171', padding: '4px 10px', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 800 }}>
                        BEFORE: {activeRedesignSpace.beforeLabel}
                      </div>
                    </div>
                    <div style={{ position: 'relative', height: '360px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                      <img src={activeAfterImage} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(26, 62, 38, 0.9)', color: 'var(--accent-gold)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 800 }}>
                        AFTER: {currentStyleObj?.label || 'Contemporary Makeover'}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. AFTER ONLY */}
                {redesignViewMode === 'after-only' && (
                  <div style={{ position: 'relative', height: '460px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img src={activeAfterImage} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(26, 62, 38, 0.9)', color: 'var(--accent-gold)', padding: '5px 12px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
                      FULL MAKEOVER: {currentStyleObj?.label} ({activeRedesignSpace.name})
                    </div>
                  </div>
                )}

                {/* 4. BEFORE ONLY */}
                {redesignViewMode === 'before-only' && (
                  <div style={{ position: 'relative', height: '460px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img src={activeRedesignSpace.beforeImg} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(15, 23, 42, 0.85)', color: '#F87171', padding: '5px 12px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 800 }}>
                      ORIGINAL CONDITION: {activeRedesignSpace.beforeLabel}
                    </div>
                  </div>
                )}
              </div>

              {/* ── MATERIAL TAKEOFF & SPECIFICATIONS CARD ── */}
              <div style={{
                background: '#FAF9F6',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                padding: '20px 22px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckSquare size={16} style={{ color: 'var(--accent-gold)' }} />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Renovation Scope &amp; Material Takeoff ({activeRedesignSpace.name})
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10B981' }}>
                    Estimated Fit-Out: {activeRedesignSpace.specs.estBudget}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                  <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Flooring &amp; Substrates</div>
                    <div style={{ fontSize: '0.8rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>{activeRedesignSpace.specs.flooring}</div>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Wall Paneling &amp; Finishes</div>
                    <div style={{ fontSize: '0.8rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>{activeRedesignSpace.specs.walls}</div>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Architectural Lighting</div>
                    <div style={{ fontSize: '0.8rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>{activeRedesignSpace.specs.lighting}</div>
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Custom Joinery / Fixtures</div>
                    <div style={{ fontSize: '0.8rem', color: '#1E293B', marginTop: '2px', fontWeight: 500 }}>{activeRedesignSpace.specs.joinery}</div>
                  </div>
                </div>
              </div>

              {/* ── "SHOP THIS LOOK" CORRESPONDING FURNITURE PIECES ── */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShoppingBag size={16} style={{ color: 'var(--accent-gold)' }} />
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--accent)', margin: 0 }}>
                        Shop This Redesigned Look
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0' }}>
                      Exact and complementary furniture, lighting &amp; decor pieces featured in this room render.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('furniture-shopping')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--accent-gold)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    View All 24+ Pieces in Catalog &rarr;
                  </button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '16px'
                }}>
                  {activeRedesignSpace.shopLookIds.map((furnId) => {
                    const item = FURNITURE_ITEMS.find(i => i.id === furnId);
                    if (!item) return null;
                    const inCart = cart.find(i => i.id === item.id);
                    return (
                      <div
                        key={item.id}
                        style={{
                          background: '#FFFFFF',
                          borderRadius: '8px',
                          border: '1px solid var(--border)',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ position: 'relative', height: '140px' }}>
                            <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(26,62,38,0.9)', color: 'var(--accent-gold)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>
                              {item.badge}
                            </span>
                          </div>
                          <div style={{ padding: '12px' }}>
                            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.3, marginBottom: '6px', minHeight: '34px' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '4px' }}>
                              ₦{item.priceNGN.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                              {item.dimensions}
                            </div>
                          </div>
                        </div>

                        <div style={{ padding: '0 12px 12px' }}>
                          {inCart ? (
                            <div style={{ background: 'rgba(210,125,45,0.1)', border: '1px solid var(--accent-gold)', borderRadius: '4px', padding: '5px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700 }}>In Docket ({inCart.qty})</span>
                              <button onClick={() => addToCart(item)} style={{ background: 'var(--accent-gold)', border: 'none', borderRadius: '3px', color: '#070C09', fontWeight: 800, padding: '1px 6px', cursor: 'pointer' }}>+</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              style={{
                                width: '100%',
                                padding: '7px',
                                borderRadius: '4px',
                                background: 'var(--accent)',
                                border: 'none',
                                color: '#FFFFFF',
                                fontSize: '0.74rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px'
                              }}
                            >
                              <Plus size={12} /> Add to Project Order
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── CUSTOM ROOM PHOTO UPLOAD & AI SIMULATOR ── */}
            <div style={{
              background: '#070C09',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '28px',
              color: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Camera size={18} color="#FBBF24" />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Have Your Own Room or Carcass Photo?
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: '#FFF', margin: '0 0 8px' }}>
                Upload Your Site Photo for Instant Architectural Redesign
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', margin: '0 0 20px', maxWidth: '720px' }}>
                Snap a picture of your current living room, bedroom shell, or kitchen, and our design studio will generate an instant concept styling with recommended materials and BOQ cost estimate.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {/* Upload Box */}
                <div>
                  <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '30px 20px',
                    borderRadius: '10px',
                    border: '2px dashed rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCustomPhotoName(e.target.files[0].name);
                          setAiResult(null);
                        }
                      }}
                    />
                    <UploadCloud size={28} color={customPhotoName ? '#34D399' : '#94A3B8'} />
                    <div style={{ fontSize: '0.84rem', fontWeight: 600, color: customPhotoName ? '#34D399' : '#CBD5E1' }}>
                      {customPhotoName ? `Selected: ${customPhotoName}` : 'Click to Upload Room Photo (JPG, PNG)'}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                      Max file size: 25MB &bull; High resolution recommended
                    </div>
                  </label>

                  <div style={{ marginTop: '14px' }}>
                    <input
                      type="text"
                      placeholder="Optional styling instructions (e.g. Warm Japandi oak, travertine floors)..."
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: '#FFF',
                        fontSize: '0.82rem'
                      }}
                    />
                  </div>

                  <button
                    onClick={handleGenerateAi}
                    disabled={isGeneratingAi}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '0.86rem',
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {isGeneratingAi ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Rendering Architectural AI Transformation...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>Generate Instant Room Makeover</span>
                      </>
                    )}
                  </button>
                </div>

                {/* AI Output / Result Display */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  {aiResult ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.76rem', color: '#34D399', fontWeight: 700 }}>&bull; AI Spatial Transformation Ready</span>
                        <span style={{ fontSize: '0.74rem', color: '#FBBF24' }}>{aiResult.style}</span>
                      </div>
                      <div style={{ height: '180px', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                        <img src={aiResult.img} alt="Render" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 10px' }}>
                        {aiResult.summary}
                      </p>
                      <div style={{ fontSize: '0.78rem', color: '#34D399', fontWeight: 700 }}>
                        Estimated Budget: {aiResult.estBudget}
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%', padding: '20px 0' }}>
                      <Wand2 size={32} color="#64748B" style={{ marginBottom: '10px' }} />
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                        Awaiting Your Room Photo
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#94A3B8', maxWidth: '260px' }}>
                        Upload a photo on the left and click Generate to see your space transformed in seconds.
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedPkg(DESIGN_PACKAGES[1]);
                      setIsBookingModalOpen(true);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFF',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Users size={14} />
                    <span>Have an Architect Refine This Concept</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 3: INTERIOR FINISHES CONFIGURATOR PREVIEW
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'interior-configurator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #111C15 0%, #1A3E26 100%)',
              borderRadius: '12px',
              border: '2px solid rgba(210, 125, 45, 0.45)',
              padding: '32px 34px',
              color: '#FFFFFF',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px'
            }}>
              <div style={{ maxWidth: '750px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Dedicated Interior Finishing Configurator
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', margin: '0 0 10px', fontWeight: 400, color: '#FFFFFF' }}>
                  Choose Your Interior Characteristics With Real Visuals
                </h2>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.85)', fontWeight: 300 }}>
                  Customize your living spaces, show kitchen joinery, master sanctuary bedroom, and spa bathrooms with verified high-resolution project photography. Select from Italian Calacatta marble, French smoked oak parquet, acoustic fluted timber slats, suspended POP ceilings, and bespoke architectural finishes.
                </p>
              </div>

              <button
                onClick={() => setIsConfiguratorOpen(true)}
                className="btn-primary"
                style={{
                  padding: '14px 28px',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.35)'
                }}
              >
                <Sparkles size={16} />
                <span>Launch Dedicated Configurator &rarr;</span>
              </button>
            </div>

            {/* Room Characteristics Selector Grid */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Key Architectural Spaces
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                    Select Space to Customize Finishes
                  </h3>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Clicking opens the dedicated full-page configurator
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
                {[
                  {
                    id: 'living',
                    title: 'Executive Living & Dining Lounge',
                    area: '65 m² Area',
                    tag: 'Primary Entertaining',
                    img: livingAfter,
                    features: ['Spanish 60x120 Calacatta Porcelain', 'Acoustic Fluted Walnut Slat Wall', 'Recessed 3000K Shadow-Gap LEDs']
                  },
                  {
                    id: 'kitchen',
                    title: 'Island Show Kitchen & Joinery',
                    area: '38 m² Area',
                    tag: 'Culinary Showpiece',
                    img: kitchenAfterReno,
                    features: ['Matte Acrylic Soft-Touch Cabinets', 'Calacatta Gold Seamless Quartz Island', 'Concealed Shadow-Gap Task Lighting']
                  },
                  {
                    id: 'bedroom',
                    title: 'Master Sanctuary & Dressing Suite',
                    area: '48 m² Area',
                    tag: 'Private Luxury Suite',
                    img: bedAfter,
                    features: ['Herringbone Smoked Oak Parquet', 'Upholstered Linen Fluted Bedhead', 'Warm Concealed Floating Bed Coves']
                  },
                  {
                    id: 'bathroom',
                    title: 'Spa En-Suites & Powder Rooms',
                    area: '24 m² Area',
                    tag: 'Wellness & Sanitaries',
                    img: bathAfterReno,
                    features: ['Anti-Slip Spanish Large-Format Tile', 'Wall-Hung Rimless Smart WC', 'Brushed Brass Concealed Thermostatic Mixers']
                  }
                ].map((space) => (
                  <div
                    key={space.id}
                    onClick={() => setIsConfiguratorOpen(true)}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <div style={{ position: 'relative', height: '175px', overflow: 'hidden' }}>
                      <img
                        src={space.img}
                        alt={space.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: 'rgba(26, 62, 38, 0.9)',
                        color: '#FFFFFF',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}>
                        {space.tag}
                      </span>
                      <span style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: '#FFFFFF',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}>
                        {space.area}
                      </span>
                    </div>

                    <div style={{ padding: '16px 18px' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.08rem', color: 'var(--accent)', margin: '0 0 10px' }}>
                        {space.title}
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '16px' }}>
                        {space.features.map((feat, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#64748B' }}>
                            <Check size={12} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsConfiguratorOpen(true);
                        }}
                        style={{
                          width: '100%',
                          padding: '9px 0',
                          borderRadius: '4px',
                          border: '1px solid var(--accent)',
                          backgroundColor: '#FAF9F6',
                          color: 'var(--accent)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Sparkles size={13} style={{ color: 'var(--accent-gold)' }} />
                        <span>Customize {space.title.split(' ')[0]} Finishes &rarr;</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 4: INTERIOR DESIGNER BOOKING
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'designer-booking' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '8px' }}>
                Book Verified Interior Architects &amp; Designers
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#64748B', margin: 0 }}>
                Every studio in our network is vetted for structural building code alignment, precision BOQ estimates, and verified real-world deliveries in Lagos and Abuja.
              </p>
            </div>

            {/* Design Service Packages */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {DESIGN_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: pkg.popular ? '2px solid var(--accent-gold)' : '1px solid var(--border)',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: pkg.popular ? '0 10px 30px rgba(210, 125, 45, 0.15)' : '0 4px 14px rgba(0,0,0,0.03)'
                  }}
                >
                  {pkg.popular && (
                    <span style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--accent)',
                      border: '1px solid var(--accent-gold)',
                      color: 'var(--accent-gold)',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      Most Popular Package
                    </span>
                  )}

                  <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '6px' }}>
                      {pkg.name}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4, minHeight: '38px', marginBottom: '16px' }}>
                      {pkg.desc}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{pkg.priceNGN}</span>
                      <span style={{ fontSize: '0.88rem', color: '#64748B' }}>/ {pkg.priceUSD}</span>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: '#10B981', fontWeight: 600, marginBottom: '20px' }}>
                      &bull; Delivery Time: {pkg.duration}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginBottom: '24px' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1E293B', marginBottom: '12px' }}>
                        What's Included:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem', color: '#475569' }}>
                            <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPkg(pkg);
                      setIsBookingModalOpen(true);
                    }}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '0.88rem'
                    }}
                  >
                    Book {pkg.name.split(' ')[0]} Package
                  </button>
                </div>
              ))}
            </div>

            {/* Featured Designers Directory */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              padding: '28px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '18px' }}>
                Featured Accredited Interior Studios
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
                {DESIGNERS.map((des) => (
                  <div
                    key={des.id}
                    style={{
                      background: '#FAF9F6',
                      borderRadius: '12px',
                      padding: '20px',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <img src={des.avatar} alt={des.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent)' }}>{des.name}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--accent-gold)' }}>{des.specialty}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.74rem', color: '#64748B', marginBottom: '14px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#F59E0B', fontWeight: 700 }}>
                          <Star size={13} fill="#F59E0B" /> {des.rating} ({des.reviewsCount})
                        </span>
                        <span>&bull; {des.location}</span>
                        <span>&bull; {des.experience}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                        {des.portfolioImgs.map((pImg, pIdx) => (
                          <img key={pIdx} src={pImg} alt="Portfolio" style={{ width: '100%', height: '85px', borderRadius: '6px', objectFit: 'cover' }} />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedDesigner(des);
                        setIsBookingModalOpen(true);
                      }}
                      className="btn-secondary"
                      style={{
                        width: '100%',
                        padding: '9px',
                        fontSize: '0.8rem'
                      }}
                    >
                      Book Consultation with this Studio
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────
            TAB 5: FIT-OUT BUDGET PLANNER & BOQ ESTIMATOR
            ─────────────────────────────────────────────────────────────── */}
        {activeTab === 'budget-planner' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              padding: '24px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Calculator size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  Interactive Fit-Out Budget Planner &amp; BOQ Estimator
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  Calculate your total interior finishing investment down to the last kobo. Adjust your property layout, select your luxury finishing tier, and toggle individual finish trades to see instant live estimates for materials, artisan labor, and design oversight.
                </p>
              </div>
            </div>

            {/* Budget Configuration Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '24px'
            }}>
              {/* Controls Column */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
              }}>
                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent)', display: 'block', marginBottom: '10px' }}>
                    1. Select Property Type &amp; Size
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                    {[
                      { id: '1-bed-studio', label: '1-Bed Studio (60 sqm)' },
                      { id: '2-bed-flat', label: '2-Bed Flat (110 sqm)' },
                      { id: '3-bed-terrace', label: '3-Bed Terrace (200 sqm)' },
                      { id: '4-bed-duplex', label: '4-Bed Duplex (320 sqm)' },
                      { id: '5-bed-mansion', label: '5-Bed Villa (500+ sqm)' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setBudgetPropertySize(p.id)}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          background: budgetPropertySize === p.id ? 'var(--accent)' : '#FAF9F6',
                          border: budgetPropertySize === p.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                          color: budgetPropertySize === p.id ? '#FFF' : '#64748B',
                          fontSize: '0.76rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent)', display: 'block', marginBottom: '10px' }}>
                    2. Select Finish Quality Tier
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {[
                      { id: 'standard', name: 'Contemporary Standard', desc: 'Good local tiles, clean POP & neat paint' },
                      { id: 'executive', name: 'Executive Premium', desc: 'Spanish porcelain, quartz island, shadow gaps' },
                      { id: 'ultra-luxury', name: 'Ultra-Luxury Bespoke', desc: 'Italian marble, acoustic slats, smart lighting' }
                    ].map((tier) => (
                      <div
                        key={tier.id}
                        onClick={() => setBudgetFinishTier(tier.id)}
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          background: budgetFinishTier === tier.id ? 'rgba(16, 185, 129, 0.1)' : '#FAF9F6',
                          border: budgetFinishTier === tier.id ? '2px solid #10B981' : '1px solid var(--border)',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '4px' }}>
                          {tier.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{tier.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent)', display: 'block', marginBottom: '10px' }}>
                    3. Scope of Works (Toggle Modules)
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { key: 'popCeiling', label: 'Suspended POP Ceiling & Ambient Shadow-Gap Lighting' },
                      { key: 'flooringWalls', label: 'Floor Porcelain Tiling & Wall Screeding / Paneling' },
                      { key: 'kitchenJoinery', label: 'Fitted Kitchen Cabinetry, Quartz Countertops & Appliances' },
                      { key: 'wardrobes', label: 'Custom Walk-In Closets & Wardrobe Joinery' },
                      { key: 'bathrooms', label: 'Sanitary Fixtures, Concealed Cisterns & Glass Screens' },
                      { key: 'furnitureDecor', label: 'Complete Living & Bedroom Furniture + Window Drapes' }
                    ].map((mod) => (
                      <label
                        key={mod.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: budgetModules[mod.key] ? 'rgba(26, 62, 38, 0.06)' : '#FAF9F6',
                          border: '1px solid var(--border)',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          color: '#1E293B'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={budgetModules[mod.key]}
                          onChange={(e) => setBudgetModules({ ...budgetModules, [mod.key]: e.target.checked })}
                          style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                        />
                        <span>{mod.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Cost Breakdown Card */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.05)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent)' }}>
                      Projected Interior Investment
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#059669'
                    }}>
                      Live BOQ Calculation
                    </span>
                  </div>

                  {/* Big Total */}
                  <div style={{
                    background: '#FAF9F6',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', marginBottom: '4px' }}>
                      Estimated Total Turnkey Budget:
                    </div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#059669', letterSpacing: '-0.03em' }}>
                      ₦{calculatedBudget.total.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '2px' }}>
                      &asymp; ${calculatedBudget.totalUSD.toLocaleString()} USD
                    </div>
                  </div>

                  {/* Itemized breakdown rows */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: '#64748B' }}>Materials, Porcelain &amp; Fixtures</span>
                      <span style={{ fontWeight: 700, color: '#1E293B' }}>₦{calculatedBudget.materials.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: '#64748B' }}>Master Artisan Labor &amp; Installation</span>
                      <span style={{ fontWeight: 700, color: '#1E293B' }}>₦{calculatedBudget.labor.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: '#64748B' }}>Architectural Design &amp; Oversight (8%)</span>
                      <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>₦{calculatedBudget.designFee.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ color: '#64748B' }}>Inflation &amp; Contingency Reserve (5%)</span>
                      <span style={{ fontWeight: 700, color: '#F59E0B' }}>₦{calculatedBudget.contingency.toLocaleString()}</span>
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(210, 125, 45, 0.08)',
                    borderRadius: '8px',
                    padding: '12px',
                    borderLeft: '3px solid var(--accent-gold)',
                    fontSize: '0.76rem',
                    color: '#64748B',
                    lineHeight: 1.5
                  }}>
                    <strong>Transparent Pricing Guarantee:</strong> Our bill of quantities includes direct vendor procurement discounts with zero inflated contractor markup.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button
                    onClick={() => {
                      setSelectedPkg(DESIGN_PACKAGES[1]);
                      setIsBookingModalOpen(true);
                    }}
                    className="btn-primary"
                    style={{
                      flex: 1,
                      padding: '12px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <CheckCircle2 size={16} /> Book Designer to Execute this Budget
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MODAL: DESIGNER CONSULTATION BOOKING
          ══════════════════════════════════════════════════════════════════ */}
      {isBookingModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            maxWidth: '620px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            color: '#1E293B'
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
                background: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
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
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Award size={32} />
                </div>

                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#059669'
                }}>
                  Design Consultation Docket Confirmed
                </span>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)', margin: '8px 0 4px' }}>
                  Official Interior Design Pass Issued
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '20px' }}>
                  Pass ID: <strong style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>{bookingPass.passCode}</strong>
                </div>

                <div style={{
                  background: '#FAF9F6',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  padding: '20px',
                  textAlign: 'left',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                  color: '#1E293B',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ color: '#64748B', fontSize: '0.74rem' }}>Selected Package:</span>
                      <div style={{ fontWeight: 700, color: 'var(--accent)' }}>{bookingPass.package}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', fontSize: '0.74rem' }}>Package Fee:</span>
                      <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{bookingPass.fee}</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#64748B', fontSize: '0.74rem' }}>Assigned Lead Designer:</span>
                    <div style={{ fontWeight: 600, color: 'var(--accent)' }}>{bookingPass.designer}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                    <div>
                      <span style={{ color: '#64748B', fontSize: '0.74rem' }}>Target Room:</span>
                      <div style={{ fontSize: '0.76rem', color: 'var(--accent)' }}>{bookingPass.targetRoom}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', fontSize: '0.74rem' }}>Session Timeline:</span>
                      <div style={{ fontSize: '0.76rem', color: 'var(--accent)' }}>{bookingPass.date}</div>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '20px' }}>
                  Our lead architect will contact you via WhatsApp and email to confirm your preferred session time and share the video meeting link.
                </p>

                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="btn-primary"
                  style={{ padding: '10px 24px', fontSize: '0.85rem' }}
                >
                  Done / Return to Design Studio
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Palette size={20} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                    Interior Design Reservation
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '4px' }}>
                  Reserve: {selectedPkg.name}
                </h3>
                <div style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: '18px' }}>
                  Fee: <strong style={{ color: 'var(--accent-gold)' }}>{selectedPkg.priceNGN}</strong> ({selectedPkg.priceUSD}) &bull; Assigned Studio: <strong>{selectedDesigner.name.split(' ')[0]} {selectedDesigner.name.split(' ')[1]}</strong>
                </div>

                <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#475569', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arc. Nnamdi Eze"
                      value={bookingFormData.name}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        background: '#FAF9F6',
                        border: '1px solid var(--border)',
                        color: '#1E293B',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.76rem', color: '#475569', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 802 000 0000"
                        value={bookingFormData.phone}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          background: '#FAF9F6',
                          border: '1px solid var(--border)',
                          color: '#1E293B',
                          fontSize: '0.84rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.76rem', color: '#475569', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
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
                          borderRadius: '6px',
                          background: '#FAF9F6',
                          border: '1px solid var(--border)',
                          color: '#1E293B',
                          fontSize: '0.84rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.76rem', color: '#475569', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                        Room(s) to Design
                      </label>
                      <input
                        type="text"
                        value={bookingFormData.targetRoom}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, targetRoom: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          background: '#FAF9F6',
                          border: '1px solid var(--border)',
                          color: '#1E293B',
                          fontSize: '0.84rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.76rem', color: '#475569', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                        Preferred Consultation Date
                      </label>
                      <input
                        type="date"
                        value={bookingFormData.preferredDate}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, preferredDate: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          background: '#FAF9F6',
                          border: '1px solid var(--border)',
                          color: '#1E293B',
                          fontSize: '0.84rem'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.76rem', color: '#475569', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
                      Design Preferences &amp; Special Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your style (e.g. Modern Japandi with warm fluted wood, specific color ideas, or existing furniture you want to keep)..."
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        background: '#FAF9F6',
                        border: '1px solid var(--border)',
                        color: '#1E293B',
                        fontSize: '0.84rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '0.92rem',
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Award size={18} /> Confirm Reservation ({selectedPkg.priceNGN})
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          MODAL / SLIDE-OVER: PROJECT FURNITURE CART
          ══════════════════════════════════════════════════════════════════ */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            background: '#FFFFFF',
            width: '100%',
            maxWidth: '480px',
            height: '100%',
            overflowY: 'auto',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderLeft: '1px solid var(--border)',
            boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.15)',
            color: '#1E293B'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShoppingBag size={22} style={{ color: 'var(--accent-gold)' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent)', margin: 0 }}>
                    Selected Project Furniture
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  style={{
                    background: '#FAF9F6',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: '#64748B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
                  <Sofa size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '4px' }}>
                    Your project furniture list is empty
                  </div>
                  <div style={{ fontSize: '0.78rem' }}>
                    Browse the furniture tab and add sofas, dining sets, or beds to your project.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: '#FAF9F6',
                        borderRadius: '10px',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: '1px solid var(--border)'
                      }}
                    >
                      <img src={item.img} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.3 }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 700, marginTop: '2px' }}>
                          ₦{(item.priceNGN * item.qty).toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          Qty: {item.qty} &bull; ₦{item.priceNGN.toLocaleString()} each
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <button onClick={() => removeFromCart(item.id)} style={{ background: '#E2E8F0', border: 'none', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer', fontWeight: 700 }}>-</button>
                          <span style={{ fontSize: '0.76rem', fontWeight: 700 }}>{item.qty}</span>
                          <button onClick={() => addToCart(item)} style={{ background: 'var(--accent-gold)', border: 'none', borderRadius: '3px', color: '#070C09', padding: '2px 6px', cursor: 'pointer', fontWeight: 700 }}>+</button>
                        </div>
                        <button
                          onClick={() => deleteFromCart(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '0.68rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px'
                          }}
                        >
                          <Trash2 size={11} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.88rem', color: '#64748B' }}>Total Furniture Value:</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    ₦{totalCartNGN.toLocaleString()}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', textAlign: 'right', marginBottom: '16px' }}>
                  &asymp; ${totalCartUSD.toLocaleString()} USD
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setSelectedPkg(DESIGN_PACKAGES[1]);
                    setIsBookingModalOpen(true);
                  }}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={18} /> Send Furniture List to Designer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
