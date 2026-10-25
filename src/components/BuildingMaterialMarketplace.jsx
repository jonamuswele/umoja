import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Truck, MapPin, CheckCircle, ShieldCheck, 
  Sparkles, Check, ChevronRight, Package, Box, Layers, 
  Clock, Phone, Navigation, ArrowRight, Shield, Sliders, 
  Award, X, Calendar, FileText, AlertCircle, ShoppingCart
} from 'lucide-react';
import { getStoredServices } from '../utils/userStorage';

import carreauxTile from '../assets/carreaux.jfif';
import graniteTile from '../assets/granite.jfif';
import toleRoofing from '../assets/tole.jfif';
import windowCasement from '../assets/window.jfif';
import paverDrive from '../assets/drivegardin.jfif';
import screedWall from '../assets/crepi.jfif';
import brickMasonry from '../assets/expobrick.jfif';
import luxuryShower from '../assets/shower_luxury.png';
import sectionalSofa from '../assets/interior/cdn.jfif';
import vanityUnit from '../assets/interior/sbapn.jfif';
import modernKitchen from '../assets/interior/cbp.jfif';
import diningSuite from '../assets/interior/fon.jfif';

// ══════════════════════════════════════════════════════════════════════
// 1. DATA: 14 MATERIAL CATEGORIES & THEIR ITEM SPECIFICATIONS
// ══════════════════════════════════════════════════════════════════════
const MATERIAL_CATEGORIES = [
  {
    id: 'cement',
    name: 'Cement & Binders',
    icon: '🏗️',
    heroImg: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Cement_bags.jpg',
    desc: 'Factory-direct Grade 42.5R & 32.5N cement bags from Dangote, BUA, and Lafarge.',
    priceRange: 'From ₦8,200 / bag',
    specsSummary: 'Dangote 42.5R, BUA Supaset, Lafarge Elephant, White Cement',
    items: [
      {
        id: 'dangote-425r',
        name: 'Dangote 42.5R Falcon Portland Cement',
        priceNgn: 8500,
        unit: '50kg Bag',
        img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Cement_MOCNY_CEM_IIA-V_42%2C5_R.png',
        brand: 'Dangote Cement PLC',
        specs: ['Grade 42.5R Rapid Hardening', 'NIS 444-1:2014 Compliant', '50kg Moisture-Proof Bag', 'Ideal for High-Rise Columns & Decking'],
        variants: ['Single Bags (Retail)', 'Pallet (40 Bags)', 'Half Trailer (450 Bags)', 'Full Trailer (900 Bags)']
      },
      {
        id: 'bua-extra',
        name: 'BUA Extra PortLand Composite Cement',
        priceNgn: 8200,
        unit: '50kg Bag',
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Cement_bags.jpg',
        brand: 'BUA Cement PLC',
        specs: ['Grade 32.5N & 42.5R Options', 'Superior Workability & Setting Time', 'Low Heat of Hydration', 'Mass Concreting & Plastering'],
        variants: ['Grade 32.5N', 'Grade 42.5R', 'Trailer Load (900 Bags)']
      },
      {
        id: 'lafarge-elephant',
        name: 'Lafarge Elephant Supaset Cement',
        priceNgn: 8400,
        unit: '50kg Bag',
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Cement_bags.jpg',
        brand: 'Lafarge Africa PLC',
        specs: ['Fast Setting High Strength', 'Hydraulic Setting Agents', 'Enhanced Durability', 'Concrete Pre-Casting & Piles'],
        variants: ['Standard 50kg Bag', 'Bulk Trailer Delivery (900 Bags)']
      },
      {
        id: 'super-white-cement',
        name: 'Super White Architectural Portland Cement',
        priceNgn: 16500,
        unit: '50kg Bag',
        img: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Cement_MOCNY_CEM_IIA-V_42%2C5_R.png',
        brand: 'Aalborg White Certified',
        specs: ['Pure High Whiteness (90%+)', 'Architectural Terrazzo & Precast', 'Tile Grouting & Screeding', 'Weather Resistant'],
        variants: ['25kg Bag', '50kg Bag', 'Pallet (30 Bags)']
      }
    ]
  },
  {
    id: 'iron-rods',
    name: 'Iron Rods & Steel Rebar',
    icon: '⛓️',
    heroImg: 'https://upload.wikimedia.org/wikipedia/commons/5/59/A_bunch_of_rebar_up_close.jpg',
    desc: 'Certified high-yield TMT steel reinforcement bars, BRC mesh, and binding wire.',
    priceRange: 'From ₦1,250,000 / ton',
    specsSummary: '16mm, 12mm, 10mm, 20mm, 25mm, BRC Mesh, Binding Wire',
    items: [
      {
        id: 'rebar-16mm',
        name: '16mm High-Yield TMT Steel Rebar (Grade 500)',
        priceNgn: 1250000,
        unit: 'Ton (~53 Lengths of 12m)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/5/59/A_bunch_of_rebar_up_close.jpg',
        brand: 'Tiger / Landcraft TMT Certified',
        specs: ['16mm Diameter x 12m Standard Length', 'Yield Strength 500 N/mm²', 'Earthquake & Thermal Resistant', 'Primary Beam & Column Reinforcement'],
        variants: ['1 Ton (53 lengths)', '5 Tons Bundle', 'Full Trailer Flatbed (30 Tons)']
      },
      {
        id: 'rebar-12mm',
        name: '12mm High-Tensile TMT Steel Rebar',
        priceNgn: 1250000,
        unit: 'Ton (~94 Lengths of 12m)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Baustahl_-_construction_steel.jpg',
        brand: 'Universal Steel / Mayor TMT',
        specs: ['12mm Diameter x 12m Length', 'High Ductility Ribbed Profile', 'Decking Slab & Cantilever Mesh', 'COREN Registered Mill'],
        variants: ['1 Ton (94 lengths)', '10 Tons Flatbed', '30 Tons Full Trailer']
      },
      {
        id: 'rebar-10mm',
        name: '10mm Ring Stirrups Rebar',
        priceNgn: 1280000,
        unit: 'Ton (~135 Lengths of 12m)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/5/59/A_bunch_of_rebar_up_close.jpg',
        brand: 'Federated Steel TMT',
        specs: ['10mm Diameter x 12m Length', 'Column Stirrups & Shear Links', 'High Tensile Ribbed Surface', 'Cold Bending Certified'],
        variants: ['1 Ton (135 lengths)', '5 Tons Delivery']
      },
      {
        id: 'rebar-20mm',
        name: '20mm Heavy Foundation & Piling Rebar',
        priceNgn: 1260000,
        unit: 'Ton (~34 Lengths of 12m)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Baustahl_-_construction_steel.jpg',
        brand: 'Premium Grade 500 TMT',
        specs: ['20mm Diameter x 12m Length', 'Bored Piling Cages & Deep Raft', 'Heavy Structural Load Bearing', 'Mill Test Certificate Included'],
        variants: ['1 Ton (34 lengths)', '15 Tons Split Load', '30 Tons Direct Factory']
      },
      {
        id: 'brc-mesh',
        name: 'BRC Galvanized Concrete Wire Mesh (6mm)',
        priceNgn: 48000,
        unit: 'Roll (2.4m x 48m)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Baustahl_-_construction_steel.jpg',
        brand: 'Premier Wire & Cable',
        specs: ['6mm Wire Gauge Thickness', '200mm x 200mm Mesh Grid', 'Anti-Crack Concrete Reinforcement', 'Ground Slab & German Floor'],
        variants: ['Standard Roll (2.4m x 48m)', 'Flat Sheet Panels (2.4m x 4.8m)']
      }
    ]
  },
  {
    id: 'blocks',
    name: 'Blocks & Interlocks',
    icon: '🧱',
    heroImg: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Concreteblocks.jpg',
    desc: 'Hydraulically vibrated sandcrete solid & hollow blocks and interlocking stones.',
    priceRange: 'From ₦520 / block',
    specsSummary: '9-inch Solid, 9-inch Hollow, 6-inch Solid, Heavy Interlocking Pavers',
    items: [
      {
        id: 'block-9-solid',
        name: '9-Inch Solid Vibrated Sandcrete Block',
        priceNgn: 650,
        unit: 'Per Block',
        img: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Concrete_Masonry_blocks.jpg',
        brand: 'Umoja Certified Automated Yard',
        specs: ['9" x 9" x 18" Dimensions', 'Hydraulic Machine Compressed', 'Sharp River Sand + Dangote 42.5R', 'Load Bearing Foundation & Perimeter'],
        variants: ['500 Blocks (Tipper Load)', '1,000 Blocks Load', '2,500 Blocks Site Direct']
      },
      {
        id: 'block-9-hollow',
        name: '9-Inch Hollow Sandcrete Block',
        priceNgn: 580,
        unit: 'Per Block',
        img: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Concreteblocks.jpg',
        brand: 'Umoja Industrial Yard',
        specs: ['9" x 9" x 18" with Dual Hollow Cores', 'Reinforced Cavity Filling Ready', 'Lightweight Superstructure Block', 'Thermal Insulation Profile'],
        variants: ['500 Blocks Load', '1,200 Blocks Load']
      },
      {
        id: 'block-6-solid',
        name: '6-Inch Solid Partition Block',
        priceNgn: 520,
        unit: 'Per Block',
        img: brickMasonry,
        brand: 'Standard Yard Certified',
        specs: ['6" x 9" x 18" Partition Thickness', 'Vibrated Clean Edges', 'Room Demarcation & Internal Walls', 'High Compressive Strength'],
        variants: ['700 Blocks Load', '1,500 Blocks Load']
      },
      {
        id: 'interlock-paver',
        name: 'Heavy-Duty Interlocking Paving Stones (60mm / 80mm)',
        priceNgn: 4800,
        unit: 'Per Square Meter (~35 Units)',
        img: paverDrive,
        brand: 'Cobblestone Hydraulic Paving',
        specs: ['60mm for Residential Driveway, 80mm for Heavy Trucks', 'Grade 35 Concrete Strength', 'Pigmented Red, Charcoal & Grey Mix', 'Frost & Oil Resistant'],
        variants: ['Zig-Zag 60mm', 'Colosseum 60mm', 'Heavy-Duty 80mm Industrial']
      }
    ]
  },
  {
    id: 'tiles',
    name: 'Tiles & Surface Finishes',
    icon: '🔲',
    heroImg: carreauxTile,
    desc: 'Spanish porcelain, Italian marble slabs, vitrified wall tiles & exterior anti-slip pavers.',
    priceRange: 'From ₦5,200 / sqm',
    specsSummary: '60x120cm Porcelain, Calacatta Marble, 40x40cm Floor, Exterior Anti-Slip',
    items: [
      {
        id: 'tile-spanish-60120',
        name: 'Spanish 60x120cm Vitrified High-Gloss Porcelain Tile',
        priceNgn: 14500,
        unit: 'Per SQM (~1.44 SQM / Box)',
        img: carreauxTile,
        brand: 'Porcelanosa Spain Certified',
        specs: ['600mm x 1200mm Large Format', 'Rectified Precision Cut Edges', 'Zero Water Absorption (<0.1%)', 'Stain & Scratch Resistant Glaze'],
        variants: ['Calacatta Gold', 'Armani Grey Gloss', 'Statuary Pure White', 'Nero Marquina Black']
      },
      {
        id: 'tile-italian-marble',
        name: 'Italian Calacatta White Marble-Look Slab Tile',
        priceNgn: 18000,
        unit: 'Per SQM (~2.88 SQM / Box)',
        img: carreauxTile,
        brand: 'Marazzi Italy Certified',
        specs: ['1200mm x 2400mm Bookmatch Slab', 'Continuous Vein Flow Matching', 'Honed Matte or Mirror High Gloss', 'Living Room & Penthouse Luxury Floors'],
        variants: ['Mirror High Gloss', 'Satin Honed Matte', 'Bookmatch A+B Pair']
      },
      {
        id: 'tile-royal-4040',
        name: 'Royal 40x40cm Floor Ceramic Tile',
        priceNgn: 5200,
        unit: 'Per SQM (~1.92 SQM / Box)',
        img: graniteTile,
        brand: 'Royal Ceramics',
        specs: ['400mm x 400mm Standard Dimension', 'Durable Ceramic Glaze', 'Bedrooms, Hallways & Rentals', 'High Scratch Resistance'],
        variants: ['Beige Granite', 'Grey Slate', 'Warm Wood Grain']
      },
      {
        id: 'tile-outdoor-antislip',
        name: 'Outdoor Anti-Slip Textured Veranda Tile (30x60cm)',
        priceNgn: 7800,
        unit: 'Per SQM (~1.44 SQM / Box)',
        img: graniteTile,
        brand: 'Umoja Stone Tech',
        specs: ['300mm x 600mm x 12mm Heavy Thickness', 'R11 Anti-Slip Wet Grip Rating', 'Swimming Pool Decks, Balconies & Verandas', 'Weather & Algae Resistant'],
        variants: ['Rustic Grey', 'Travertine Tan', 'Charcoal Basalt']
      }
    ]
  },
  {
    id: 'paint',
    name: 'Paints & Screeding Putty',
    icon: '🎨',
    heroImg: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Castorama_aux_Ulis_le_19_avril_2017_-_20.jpg',
    desc: 'Exterior weather-shield silicone, washable interior satin silk, and pre-mixed screeding putty.',
    priceRange: 'From ₦18,000 / drum',
    specsSummary: 'Dulux Weathershield, Meyer Satin Silk, Texcote Heavy, Acrylic Putty',
    items: [
      {
        id: 'paint-dulux-weather',
        name: 'Dulux Weathershield Exterior Acrylic Silicone Paint',
        priceNgn: 55000,
        unit: '20-Litre Drum',
        img: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/A_paint_can_and_brush_rest_on_the_concrete.jpg',
        brand: 'Dulux / AkzoNobel',
        specs: ['10-Year All-Weather Protection', 'Fungus & Alkali Resistant', 'Sun Reflective Heat Reduction', 'Covers ~140 SQM per 20L Drum'],
        variants: ['Off-White / Brilliant White', 'Warm Ivory', 'Charcoal Slate', 'Safari Beige']
      },
      {
        id: 'paint-satin-silk',
        name: 'Meyer Luxury Washable Satin Silk Interior Paint',
        priceNgn: 48000,
        unit: '20-Litre Drum',
        img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Castorama_aux_Ulis_le_19_avril_2017_-_20.jpg',
        brand: 'DN Meyer PLC',
        specs: ['100% Washable Stain Repellent', 'Silky Pearl Sheen Reflection', 'Zero Toxic VOC Odor', 'Living Rooms & Executive Suites'],
        variants: ['Pure White Satin', 'Cream Whisper', 'Executive Grey', 'Soft Olive']
      },
      {
        id: 'screeding-putty',
        name: 'Pre-Mixed Acrylic Wall Screeding Putty',
        priceNgn: 18000,
        unit: '20kg Weatherproof Drum',
        img: screedWall,
        brand: 'ProScreed',
        specs: ['Ultra-Smooth Mirror Wall Finish', 'Crack-Resistant Polymer Formula', 'Ready-To-Use No Lumps', 'Interior & Exterior POP Screeding'],
        variants: ['Fine Smooth White (20kg)', 'Exterior Weather Putty (25kg)']
      }
    ]
  },
  {
    id: 'roofing-sheets',
    name: 'Roofing Sheets & Systems',
    icon: '🏠',
    heroImg: toleRoofing,
    desc: '50-year warranty Gerard stone-coated shingles, aluminum step-tiles, and longspan sheets.',
    priceRange: 'From ₦4,900 / meter',
    specsSummary: 'Gerard Stone-Coated, Aluminum Step-Tiles 0.55mm, Metcopo Longspan',
    items: [
      {
        id: 'roof-gerard-classic',
        name: 'Gerard Classic Stone-Coated Steel Shingle Panel',
        priceNgn: 6800,
        unit: 'Per Panel (1320mm x 370mm)',
        img: toleRoofing,
        brand: 'Gerard Genuine New Zealand / AHI',
        specs: ['50-Year Written Guarantee', 'Natural Volcanic Stone Chip Coat', 'Zinc-Aluminum Corrosion Barrier', 'Noise Deadening in Heavy Rain'],
        variants: ['Charcoal Black', 'Burgundy Wine', 'Coffee Brown', 'Forest Green']
      },
      {
        id: 'roof-step-tiles-055',
        name: 'Heavy-Gauge 0.55mm Aluminum Step-Tiles',
        priceNgn: 5400,
        unit: 'Per Meter Run (1.0m Width)',
        img: toleRoofing,
        brand: 'Tower Aluminum PLC',
        specs: ['0.55mm Certified True Thickness', 'Step-Tile Architectural Profile', 'Oven-Baked PVDF Paint Coating', 'Zero Rust Coastal Grade'],
        variants: ['Dark Grey 0.55mm', 'Nut Brown 0.55mm', 'Royal Blue 0.55mm']
      }
    ]
  },
  {
    id: 'doors',
    name: 'Doors & Security Entrances',
    icon: '🚪',
    heroImg: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Very_Modern_Wooden_Door%2C_Salamanca_%28Madrid%29.JPG',
    desc: 'Armored Turkish security doors, biometric smart pivot entrances, and engineered flush doors.',
    priceRange: 'From ₦95,000 / unit',
    specsSummary: 'Turkish Armored Steel, Pivot Smart Door, Engineered Solid Flush Wood',
    items: [
      {
        id: 'door-turkish-security',
        name: 'Turkish Multi-Lock Armored Security Steel Door (4.5ft)',
        priceNgn: 280000,
        unit: 'Complete Door Unit with Frame & Locks',
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Very_Modern_Wooden_Door%2C_Salamanca_%28Madrid%29.JPG',
        brand: 'KALE Kilit Turkey Certified',
        specs: ['4.5ft x 7ft Entrance Dimension', '14-Point Heavy Steel Locking Bolts', 'Anti-Drill & Bullet-Resistant Plate', 'Rockwool Sound & Thermal Core'],
        variants: ['Walnut Wood Grain', 'Antracite Grey Metallic', 'Titanium Black Gold Accents']
      },
      {
        id: 'door-pivot-smart',
        name: 'Architectural Oversized Pivot Entrance Door with Smart Biometric Lock',
        priceNgn: 650000,
        unit: 'Complete Custom Pivot Set (5.5ft x 8ft)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Very_Modern_Wooden_Door%2C_Salamanca_%28Madrid%29.JPG',
        brand: 'Lusso Architectural Entrances',
        specs: ['Heavy-Duty Floor Pivot Hinge (500kg Load)', 'Integrated Tuya Biometric Fingerprint + PIN + RFID', 'Tempered Safety Glass Side Lite', 'Sleek Minimalist Black Aluminum & Teak'],
        variants: ['Teak Wood & Black Steel', 'Dark Sintered Slate Finish']
      },
      {
        id: 'door-flush-wood',
        name: 'Solid Engineered Waterproof Wood Internal Flush Door',
        priceNgn: 95000,
        unit: 'Complete with Architrave & Magnetic Lock',
        img: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Old_Wooden_Door_in_New_Glass_Wall_-_geograph.org.uk_-_1212708.jpg',
        brand: 'EuroWood Precision',
        specs: ['3ft x 7ft Standard Bedroom/Bath Size', 'Waterproof PVC Polymer Skin', 'Magnetic Silent Latch Mechanism', 'Includes Handles, Hinges & Architrave'],
        variants: ['Nordic White Oak', 'Smoked Ash Grey', 'Milano Pure White']
      }
    ]
  },
  {
    id: 'windows',
    name: 'Windows & Glazing',
    icon: '🪟',
    heroImg: windowCasement,
    desc: 'Heavy-gauge aluminum casement double-glazed windows, acoustic sliding, and security tinting.',
    priceRange: 'From ₦85,000 / sqm',
    specsSummary: 'Double Glazed Casement, Thermal Break Acoustic Sliding, French Windows',
    items: [
      {
        id: 'window-casement-double',
        name: 'Heavy Aluminum Casement Window with Double Glazing (6mm+12A+6mm)',
        priceNgn: 85000,
        unit: 'Per Square Meter (Custom Sized)',
        img: windowCasement,
        brand: 'Schüco / Alumaco Certified',
        specs: ['Double Tempered Safety Glass with Argon Gas Gap', 'Integrated Stainless Steel Bug Mesh', 'Multi-Point Security Casement Handles', '50% Sound & Heat Reduction'],
        variants: ['Charcoal Black Powder Coat', 'Champagne Bronze', 'White Gloss']
      },
      {
        id: 'window-sliding-acoustic',
        name: 'Thermal-Break Acoustic Sliding Patio Glass Window',
        priceNgn: 110000,
        unit: 'Per Square Meter',
        img: windowCasement,
        brand: 'Reynaers Aluminum Spec',
        specs: ['Heavy-Duty Stainless Steel Roller Track', 'Acoustic Laminated Security Glass', 'Weatherproof Double Brush Seals', 'Large Vista Unobstructed Panoramas'],
        variants: ['2-Panel Slide', '3-Panel Multi-Slide', 'Corner Glass System']
      }
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical Materials & Wiring',
    icon: '⚡',
    heroImg: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/ModernConsumerUnitHager.JPG',
    desc: 'Coleman 100% pure copper single-core cables, Schneider distribution boards, and modular switches.',
    priceRange: 'From ₦6,500 / point',
    specsSummary: 'Coleman Pure Copper 1.5/2.5/4mm, Schneider DB, Luxury Sockets',
    items: [
      {
        id: 'elec-coleman-25',
        name: 'Coleman 2.5mm Single-Core Pure Copper Cable (100% Fire Retardant)',
        priceNgn: 38000,
        unit: '100-Meter Coil',
        img: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/ModernConsumerUnitHager.JPG',
        brand: 'Coleman Technical Industries (NIS Certified)',
        specs: ['100% Pure Oxygen-Free Annealed Copper', 'Socket Outlet & Power Circuit Wiring', 'Flame Retardant PVC Insulation (70°C)', 'Guaranteed 100-Meter Roll Length'],
        variants: ['Red (Live)', 'Black (Neutral)', 'Green/Yellow (Earth)']
      },
      {
        id: 'elec-schneider-db',
        name: 'Schneider Electric 12-Way Distribution Board with MCBs & RCD',
        priceNgn: 78000,
        unit: 'Complete Pre-Wired Set',
        img: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/ModernConsumerUnitHager.JPG',
        brand: 'Schneider Electric France',
        specs: ['12 Outgoing Ways with 100A Main Switch', 'Residual Current Device (RCD) Surge Protection', 'Metal Enclosure Fireproof Casing', 'Includes Complete MCB Breakers Set'],
        variants: ['12-Way Flush Mount', '18-Way Duplex Board', '24-Way Industrial']
      }
    ]
  },
  {
    id: 'plumbing',
    name: 'Plumbing & Water Piping',
    icon: '🚰',
    heroImg: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/PVC_plumbing_fittings_in_Awka.jpg',
    desc: 'PPR heat-fused hot/cold water pipes, pressure valves, PVC drainage, and distribution manifolds.',
    priceRange: 'From ₦4,800 / length',
    specsSummary: 'PPR Hot/Cold Pipes, PVC 4-Inch Drainage, Brass Regulators, Manifolds',
    items: [
      {
        id: 'plumb-ppr-pipe',
        name: 'PPR 25mm Hot & Cold High-Pressure Water Pipe',
        priceNgn: 4800,
        unit: '4-Meter Length',
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/PVC_plumbing_fittings_in_Awka.jpg',
        brand: 'Wavin / Kalde German Standard',
        specs: ['Heat-Fusion Leakproof Welded Joints', 'Operating Temp -20°C to 95°C', 'Corrosion Free 50-Year Lifespan', 'Potable Drinking Water Certified'],
        variants: ['20mm (1/2")', '25mm (3/4")', '32mm (1")', 'Bundle of 10 Lengths']
      },
      {
        id: 'plumb-pvc-drain',
        name: 'Heavy-Gauge PVC 4-Inch Waste & Soil Drainage Pipe',
        priceNgn: 6500,
        unit: '4-Meter Length',
        img: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/PVC_plumbing_fittings_in_Awka.jpg',
        brand: 'Pestan / Interplast Pipes',
        specs: ['110mm (4-Inch) Outer Diameter', 'High Impact Heavy Wall Thickness', 'Smooth Internal Bore Anti-Clogging', 'Underground & Suspended Waste Lines'],
        variants: ['Standard 4-Inch', 'Heavy 6-Inch Main Sewer']
      }
    ]
  },
  {
    id: 'kitchen-fittings',
    name: 'Kitchen Fittings & Islands',
    icon: '🍳',
    heroImg: modernKitchen,
    desc: 'Nanotech undermount double sinks, pull-down chef faucets, and soft-close acrylic cabinetry modules.',
    priceRange: 'From ₦55,000 / unit',
    specsSummary: 'Quartz Waterfall Sinks, Chef Faucets, Pull-Out Pantries, Acrylic Modules',
    items: [
      {
        id: 'kitchen-sink-nano',
        name: 'Nanotech Black Stainless Steel Double-Bowl Undermount Sink',
        priceNgn: 95000,
        unit: 'Complete Set with Colander & Waste Trap',
        img: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Stainless_Steel_Sink.jpg',
        brand: 'Franke / Blanco Certified',
        specs: ['16-Gauge SUS304 Stainless Steel', 'Nano-Coated Oil & Scratch Resistant', 'Sound Dampening Underside Pads', 'Includes Wooden Cutting Board & Basket'],
        variants: ['Black Matte Nano', 'Gunmetal Grey', 'Brushed Stainless']
      },
      {
        id: 'kitchen-faucet-chef',
        name: '360° Pull-Down Spring Chef Mixer Faucet with Filter Outlet',
        priceNgn: 55000,
        unit: 'Faucet Set with Braided Hoses',
        img: modernKitchen,
        brand: 'Grohe / Kohler Design',
        specs: ['Solid Brass Core with Matte Black Finish', 'Dual Spray Patterns (Stream & Jet)', 'Magnetic Docking Spray Head', 'Sedal Ceramic Disc Cartridge (500k Cycles)'],
        variants: ['Matte Black', 'Brushed Gold', 'Chrome Silver']
      }
    ]
  },
  {
    id: 'bathroom-accessories',
    name: 'Bathroom Accessories & Sanitory Ware',
    icon: '🚿',
    heroImg: luxuryShower,
    desc: 'Frameless glass shower cubicles, thermostatic rain showers, smart wall-hung WCs, and vanity units.',
    priceRange: 'From ₦38,000 / unit',
    specsSummary: 'Frameless Shower Cubicles, Matte Black Rain Showers, Smart WCs, Floating Vanities',
    items: [
      {
        id: 'bath-cubicle-glass',
        name: 'Frameless 10mm Tempered Glass Shower Cubicle with Gold Hardware',
        priceNgn: 240000,
        unit: 'Complete Enclosure (1000mm x 1000mm x 2000mm)',
        img: luxuryShower,
        brand: 'VitrA Luxury Bathrooms',
        specs: ['10mm Ultra-Clear Tempered Safety Glass', 'Solid Brass Anti-Rust Hinges & Handle', 'Easy-Clean Nano Protective Glass Coating', 'Magnetic Water-Tight Door Seals'],
        variants: ['Brushed Gold Hardware', 'Matte Black Hardware', 'Polished Chrome']
      },
      {
        id: 'bath-rain-shower',
        name: 'Matte Black Thermostatic Rain Shower System & Handset',
        priceNgn: 125000,
        unit: 'Complete Shower Column Set',
        img: luxuryShower,
        brand: 'Hansgrohe / Toto Spec',
        specs: ['12-Inch Oversized Air-Injected Rain Head', 'Anti-Scald Thermostatic Temperature Lock at 38°C', 'Solid Brass Diverter Valve & Body', '3-Mode Handheld Wand with Flexible Hose'],
        variants: ['Matte Black', 'Brushed Champagne Gold', 'Gunmetal Grey']
      },
      {
        id: 'bath-smart-toilet',
        name: 'Smart Dual-Flush Rimless Wall-Hung WC Toilet with Bidet Function',
        priceNgn: 175000,
        unit: 'Complete Pan with Soft-Close Seat & In-Wall Carrier',
        img: vanityUnit,
        brand: 'Geberit / Duravit Germany',
        specs: ['Tornado Rimless Flushing Technology', 'Soft-Close Quick-Release Antibacterial Seat', 'Dual Flush Water Saving (3L / 4.5L)', 'Includes Geberit In-Wall Concealed Cistern Frame'],
        variants: ['Wall-Hung Pan with In-Wall Cistern', 'Back-To-Wall Floor Mount']
      },
      {
        id: 'bath-vanity-unit',
        name: 'Floating Solid Wood Vanity Unit with Sintered Stone Basin & LED Mirror',
        priceNgn: 210000,
        unit: '1000mm Vanity + Stone Basin + Smart Mirror',
        img: vanityUnit,
        brand: 'Lusso Modern Bathrooms',
        specs: ['Seamless Sintered Stone Integrated Basin', 'Solid Moisture-Proof Plywood Cabinetry', 'Soft-Close Blum Slide Drawers', 'Touch-Sensor Anti-Fog Warm LED Mirror'],
        variants: ['1000mm Single Basin', '1200mm Executive Single', '1500mm Master Double Basin']
      },
      {
        id: 'bath-brass-tap',
        name: 'Solid Brushed Brass Monobloc Basin Mixer Tap',
        priceNgn: 38000,
        unit: 'Mixer Tap with Braided Flexi Pipes',
        img: vanityUnit,
        brand: 'Vado UK Standard',
        specs: ['Heavy Cast Brass Construction', 'Neoperl Aerator Splash-Free Water Flow', 'PVD Vacuum Coating Scratch Resistance', 'Includes Click-Clack Pop-Up Waste'],
        variants: ['Brushed Brass', 'Matte Black', 'Polished Chrome']
      }
    ]
  },
  {
    id: 'solar-products',
    name: 'Solar Energy & Inverters',
    icon: '☀️',
    heroImg: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Dji_fly_20230602_13826_PM_27_1719032149374_photo_optimized.jpg',
    desc: 'Tier-1 550W monocrystalline solar panels, Felicity hybrid inverters, and LiFePO4 lithium batteries.',
    priceRange: 'From ₦88,000 / panel',
    specsSummary: '550W Mono PV Panels, 5KVA-10KVA Inverters, 5.12KWh Lithium Batteries',
    items: [
      {
        id: 'solar-panel-550w',
        name: 'Tier-1 Jinko / JA Solar 550W Monocrystalline PV Panel',
        priceNgn: 88000,
        unit: 'Per Panel (550W)',
        img: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Dji_fly_20230602_13826_PM_27_1719032149374_photo_optimized.jpg',
        brand: 'Jinko Solar (Tier-1 Bloomberg)',
        specs: ['550W Half-Cell MBB Technology', '21.5% High Conversion Efficiency', '25-Year Linear Power Output Warranty', 'Anodized Aluminum Sturdy Frame'],
        variants: ['Single Panel (550W)', 'Pallet of 31 Panels (Wholesale)']
      },
      {
        id: 'solar-inverter-5kva',
        name: 'Felicity Solar 5KVA 48V Hybrid Pure Sine Wave Inverter',
        priceNgn: 620000,
        unit: 'Complete Inverter Unit with Built-in MPPT',
        img: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Sunny_Boy_3000.jpg',
        brand: 'Felicity Solar Certified',
        specs: ['5000W Continuous Output Surge to 10000W', '100A MPPT Charge Controller', 'Wi-Fi Remote Cloud Monitoring App', 'Seamless 10ms Auto Generator / Grid Switch'],
        variants: ['5KVA 48V Single Phase', '10KVA 48V Split Phase']
      },
      {
        id: 'solar-battery-lithium',
        name: '48V 100Ah 5.12KWh Wall-Mounted LiFePO4 Lithium Battery',
        priceNgn: 1350000,
        unit: '5.12KWh Battery Unit',
        img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Blades_in_LFP_battery_pack.jpg',
        brand: 'Felicity / Pylontech Certified',
        specs: ['6,000+ Deep Cycles at 80% DOD (10+ Year Life)', 'Grade-A Smart BMS with LCD Screen', 'Parallel Expandable up to 15 Units', 'Zero Maintenance Wall-Mount Enclosure'],
        variants: ['5.12KWh (48V 100Ah)', '10KWh (48V 200Ah)']
      }
    ]
  },
  {
    id: 'furniture',
    name: 'Luxury Furniture & Joinery',
    icon: '🛋️',
    heroImg: sectionalSofa,
    desc: 'Curated contemporary living sectional sofas, sintered stone dining tables, and luxury king beds.',
    priceRange: 'From ₦280,000 / unit',
    specsSummary: 'Modular Sectional Sofas, 8-Seater Dining Suites, King Beds, Media Consoles',
    items: [
      {
        id: 'furn-sofa-sectional',
        name: 'Bespoke Contemporary L-Shaped Modular Velvet Sectional Sofa',
        priceNgn: 850000,
        unit: '6-Seater Modular Set with Ottoman',
        img: sectionalSofa,
        brand: 'Umoja Home Atelier',
        specs: ['High-Density Orthopedic Foam (35D)', 'Stain-Resistant Imported Microfiber Velvet', 'Kiln-Dried Hardwood Internal Skeleton', 'Modular Reversible Left/Right Configuration'],
        variants: ['Emerald Green Velvet', 'Warm Taupe Beige', 'Charcoal Slate']
      },
      {
        id: 'furn-dining-set',
        name: '8-Seater Sintered Stone Dining Table with Italian Leather Chairs',
        priceNgn: 780000,
        unit: 'Table (2.4m) + 8 Ergonomic Chairs',
        img: diningSuite,
        brand: 'Milan Home Collection',
        specs: ['12mm Sintered Stone Scratch & Heat Proof Top', 'Architectural Carbon Steel Base Structure', 'Breathable Saddle Leather Upholstered Chairs', 'Spacious 2400mm x 1000mm Dimension'],
        variants: ['Pandora White Sintered Stone', 'Laurent Black Gold Vein']
      }
    ]
  }
];

// ══════════════════════════════════════════════════════════════════════
// 2. MAIN COMPONENT: BUILDING MATERIAL MARKETPLACE
// ══════════════════════════════════════════════════════════════════════
export default function BuildingMaterialMarketplace({ onBackToHub, customService }) {
  const bmService = customService || (getStoredServices().find(s => s.id === 'building-material') || {});
  // Navigation State
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'bulk-order' | 'tracking'
  const [selectedCategory, setSelectedCategory] = useState(null); // null = overview of all categories; object = viewing specific category
  const [searchQuery, setSearchQuery] = useState('');
  
  // Specification Customization Modal State
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(10);
  const [deliveryState, setDeliveryState] = useState('Lagos State');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [requiresOffloading, setRequiresOffloading] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  // Tracking Simulation State
  const [trackWaybill, setTrackWaybill] = useState('NG-MAT-89241');
  const [isSearchingWaybill, setIsSearchingWaybill] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState({
    waybill: 'NG-MAT-89241',
    status: 'In Transit on Lagos-Ibadan Expressway',
    driver: 'Malam Idris Garba (Mack 40-Ton Flatbed - Reg: APP-492-XA)',
    cargo: '900 Bags Dangote 42.5R Falcon Portland Cement',
    origin: 'Dangote Cement Factory, Ibese Depot, Ogun State',
    destination: 'Plot 14, Block 8, Admiralty Way, Lekki Phase 1, Lagos',
    eta: 'Arriving Today at 3:30 PM WAT (in ~2 hrs 15 mins)',
    sealCode: 'NG-SEAL-774921 (Tamper Evident)',
    progressPercent: 68
  });

  // Bulk Order Form State
  const [bulkData, setBulkData] = useState({
    companyOrName: '',
    phone: '',
    email: '',
    materialType: 'Dangote Cement 42.5R (Full Trailers)',
    estimatedQuantity: '2 Trailers (1,800 Bags)',
    siteLocation: 'Epe-Ibeju Lekki Expressway Site',
    dateNeeded: 'Next Week Monday',
    needsCrane: true
  });
  const [bulkSubmitted, setBulkSubmitted] = useState(false);

  // Initialize variant when item is opened
  useEffect(() => {
    if (customizingItem) {
      setSelectedVariant(customizingItem.variants[0] || 'Standard');
      setQuantity(customizingItem.unit.includes('Bag') ? 50 : customizingItem.unit.includes('Ton') ? 2 : 10);
    }
  }, [customizingItem]);

  // Auto-scroll to top when changing tab or selecting a material category
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [activeTab, selectedCategory]);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const refCode = `NG-MAT-${Math.floor(10000 + Math.random() * 90000)}`;
    const totalNgn = (customizingItem.priceNgn * quantity) + (deliveryState === 'Lagos State' ? 25000 : 45000);
    
    setOrderConfirmed({
      orderRef: refCode,
      item: customizingItem,
      variant: selectedVariant,
      quantity,
      totalNgn,
      deliveryState,
      deliveryAddress: deliveryAddress || 'Specified Site Delivery',
      requiresOffloading
    });

    // Update tracking simulation with this new order
    setTrackedOrder({
      waybill: refCode,
      status: 'Order Confirmed & Factory Dispatch Scheduled',
      driver: 'Assigned Haulage Fleet Driver',
      cargo: `${quantity} x ${customizingItem.name} (${selectedVariant})`,
      origin: customizingItem.brand + ' Zonal Depot',
      destination: deliveryAddress || `${deliveryState} Construction Site`,
      eta: 'Estimated Delivery in 24 - 48 Hours',
      sealCode: `NG-SEAL-${Math.floor(100000 + Math.random() * 900000)}`,
      progressPercent: 15
    });

    setCustomizingItem(null);
  };

  const handleTrackSearch = (e) => {
    e.preventDefault();
    setIsSearchingWaybill(true);
    setTimeout(() => {
      setIsSearchingWaybill(false);
    }, 600);
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    setBulkSubmitted(true);
  };

  // Filter categories
  const filteredCategories = MATERIAL_CATEGORIES.filter(cat => {
    const q = searchQuery.toLowerCase();
    return cat.name.toLowerCase().includes(q) || 
           cat.desc.toLowerCase().includes(q) || 
           cat.specsSummary.toLowerCase().includes(q) ||
           cat.items.some(item => item.name.toLowerCase().includes(q));
  });

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#FAF9F6', paddingBottom: '100px' }}>
      
      {/* ══════════════════════════════════════════════════════════════════════
          1. STICKY TOP NAVIGATION SUB-BAR
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
            if (selectedCategory) {
              setSelectedCategory(null);
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
          <span>{selectedCategory ? '← Back to All Materials' : '← Back'}</span>
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
          Building Materials Marketplace
        </h2>
      </div>

      {/* Top Feature Switcher Tabs (Snaps to top on scroll) */}
      <div style={{
        position: 'sticky',
        top: '75px',
        zIndex: 900,
        backgroundColor: '#FAF9F6',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        padding: '10px 6%'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setActiveTab('catalog');
              setSelectedCategory(null);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: activeTab === 'catalog' ? '2px solid var(--accent)' : '1px solid var(--border)',
              backgroundColor: activeTab === 'catalog' ? 'var(--accent)' : '#FFFFFF',
              color: activeTab === 'catalog' ? '#FFFFFF' : 'var(--text-title)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Package size={14} />
            <span>Materials Catalog</span>
          </button>

          <button
            onClick={() => setActiveTab('bulk-order')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: activeTab === 'bulk-order' ? '2px solid var(--accent-gold)' : '1px solid var(--border)',
              backgroundColor: activeTab === 'bulk-order' ? 'rgba(210, 125, 45, 0.15)' : '#FFFFFF',
              color: activeTab === 'bulk-order' ? 'var(--accent-gold)' : 'var(--text-title)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Box size={14} style={{ color: 'var(--accent-gold)' }} />
            <span>🚛 Bulk Ordering (Trailers)</span>
          </button>

          <button
            onClick={() => setActiveTab('tracking')}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: activeTab === 'tracking' ? '2px solid var(--accent)' : '1px solid var(--border)',
              backgroundColor: activeTab === 'tracking' ? 'var(--accent)' : '#FFFFFF',
              color: activeTab === 'tracking' ? '#FFFFFF' : 'var(--text-title)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Truck size={14} />
            <span>📍 Live Delivery Tracking</span>
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
        backgroundImage: bmService?.heroImage ? `linear-gradient(to right, rgba(7, 12, 9, 0.94) 0%, rgba(7, 12, 9, 0.8) 60%, rgba(7, 12, 9, 0.5) 100%), url(${bmService.heroImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {!bmService?.heroImage && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(210, 125, 45, 0.2) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />
        )}

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(210, 125, 45, 0.2)',
            border: `1px solid ${bmService?.badgeColor ? `${bmService.badgeColor}66` : 'rgba(210, 125, 45, 0.4)'}`,
            padding: '4px 14px',
            borderRadius: '4px',
            color: bmService?.badgeColor || '#F4BA74',
            fontSize: '0.74rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '14px'
          }}>
            <ShieldCheck size={14} />
            <span>{bmService?.badgeText || "Institutional Factory-Direct Wholesale & Retail Hub"}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
            fontWeight: 400,
            margin: '0 0 16px',
            lineHeight: 1.15,
            color: bmService?.textColor || '#FFFFFF'
          }}>
            {bmService?.heroHeadline || bmService?.title || "Building Material Marketplace"}
          </h1>

          <p style={{
            fontSize: '1.05rem',
            lineHeight: 1.6,
            color: bmService?.subtitleColor || 'rgba(255, 255, 255, 0.85)',
            maxWidth: '820px',
            margin: '0 0 28px',
            fontWeight: 300
          }}>
            {bmService?.heroSubtitle || bmService?.shortDesc || "Procure authentic Dangote cement, certified TMT steel rebar, precision machine blocks, luxury Spanish porcelain tiles, paint, doors, windows, and solar equipment with verified manufacturer warranty, escrow protection, and flatbed trailer haulage to your site nationwide."}
          </p>

          {/* Search bar inside hero */}
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
              placeholder="Search cement, 16mm rebar, blocks, tiles, solar, bathroom accessories..."
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
          3. MAIN CONTENT: BASED ON ACTIVE TAB
          ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: '1200px', margin: '36px auto 0', padding: '0 6%' }}>

        {/* ══════════════════════════════════════════════════════════════════
            TAB 1: CATALOG OF MATERIAL CATEGORIES OR SPECIFIC CATEGORY ITEMS
            ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'catalog' && (
          <div>
            
            {/* VIEW A: OVERVIEW OF ALL 14 CATEGORIES */}
            {!selectedCategory && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Material Categories Directory
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                      Select a Material Category to Choose Specifications
                    </h2>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Click any material card below to configure grades, sizes & site delivery.
                  </span>
                </div>

                {/* Grid of Categories */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                  gap: '22px'
                }}>
                  {filteredCategories.map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat);
                        window.scrollTo({ top: 260, behavior: 'smooth' });
                      }}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        overflow: 'hidden',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)';
                      }}
                    >
                      <div>
                        {/* Image Header */}
                        <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                          <img
                            src={cat.heroImg}
                            alt={cat.name}
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
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            <span>{cat.icon}</span>
                            <span>{cat.items.length} Products</span>
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
                            {cat.priceRange}
                          </span>
                        </div>

                        {/* Text Details */}
                        <div style={{ padding: '18px 18px 14px' }}>
                          <h3 style={{ margin: '0 0 6px', fontSize: '1.08rem', color: 'var(--accent)', fontWeight: 700 }}>
                            {cat.name}
                          </h3>
                          <p style={{ margin: '0 0 10px', fontSize: '0.78rem', color: '#64748B', lineHeight: 1.5 }}>
                            {cat.desc}
                          </p>

                          <div style={{
                            backgroundColor: '#FAF9F6',
                            border: '1px solid var(--border)',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            fontSize: '0.72rem',
                            color: '#475569'
                          }}>
                            <strong>Included:</strong> {cat.specsSummary}
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
                          Browse Items & Specs
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
                  ))}
                </div>
              </div>
            )}

            {/* VIEW B: INDIVIDUAL ITEMS IN SELECTED CATEGORY */}
            {selectedCategory && (
              <div>
                {/* Category Header */}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(26, 62, 38, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem'
                    }}>
                      {selectedCategory.icon}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                        Configurable Products
                      </span>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', color: 'var(--accent)', margin: '2px 0' }}>
                        {selectedCategory.name}
                      </h2>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>
                        {selectedCategory.desc}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => setActiveTab('bulk-order')}
                      style={{
                        padding: '9px 16px',
                        borderRadius: '4px',
                        border: '1px solid var(--accent-gold)',
                        color: 'var(--accent-gold)',
                        backgroundColor: 'rgba(210, 125, 45, 0.08)',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Request Bulk Trailer Load →
                    </button>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      style={{
                        padding: '9px 16px',
                        borderRadius: '4px',
                        border: '1px solid var(--border)',
                        backgroundColor: '#FFFFFF',
                        color: 'var(--text-title)',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      All Categories
                    </button>
                  </div>
                </div>

                {/* Items Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px'
                }}>
                  {selectedCategory.items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        overflow: 'hidden',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        {/* Item Photo Stage */}
                        <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                          <img
                            src={item.img}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <span style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            backgroundColor: 'rgba(26, 62, 38, 0.9)',
                            color: '#FFFFFF',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}>
                            {item.brand}
                          </span>
                        </div>

                        {/* Item Specs Body */}
                        <div style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>
                              ₦{item.priceNgn.toLocaleString()}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                              / {item.unit}
                            </span>
                          </div>

                          <h3 style={{ fontSize: '1.05rem', color: '#1E293B', margin: '0 0 12px', fontWeight: 700 }}>
                            {item.name}
                          </h3>

                          {/* Specifications Bullets */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                            {item.specs.map((sp, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.76rem', color: '#475569' }}>
                                <Check size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '2px' }} />
                                <span>{sp}</span>
                              </div>
                            ))}
                          </div>

                          {/* Available Variants */}
                          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                            <span style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                              Available Specifications & Grades:
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {item.variants.map((v, i) => (
                                <span
                                  key={i}
                                  style={{
                                    backgroundColor: '#FAF9F6',
                                    border: '1px solid var(--border)',
                                    padding: '3px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.7rem',
                                    color: 'var(--accent)',
                                    fontWeight: 600
                                  }}
                                >
                                  {v}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', backgroundColor: '#FAF9F6' }}>
                        <button
                          onClick={() => setCustomizingItem(item)}
                          className="btn-primary"
                          style={{
                            width: '100%',
                            padding: '10px 0',
                            fontSize: '0.82rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          <Sliders size={14} />
                          <span>Choose Specifications & Order →</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 2: BULK ORDERING FEATURE (Wholesale Trailers & Site Dispatch)
            ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'bulk-order' && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '2px solid rgba(210, 125, 45, 0.4)',
            boxShadow: '0 10px 35px rgba(0,0,0,0.06)',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#070C09',
              color: '#FFFFFF',
              padding: '28px 32px',
              borderBottom: '1px solid rgba(210, 125, 45, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Institutional Wholesale Logistics
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: 0, fontWeight: 400 }}>
                Direct Factory Trailer-Load Bulk Ordering
              </h2>
              <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', maxWidth: '750px' }}>
                For estate developers, contractors, and institutional buyers. We dispatch sealed 30-ton flatbed trailers and tippers directly from factory depots with discounted factory-gate pricing.
              </p>
            </div>

            <div style={{ padding: '36px 32px' }}>
              {/* Wholesale Savings Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#FAF9F6', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>Cement Trailers</span>
                  <h4 style={{ margin: '4px 0 2px', fontSize: '1.1rem', color: 'var(--accent)' }}>600 or 900 Bags per Truck</h4>
                  <p style={{ margin: 0, fontSize: '0.76rem', color: '#64748B' }}>Direct dispatch with factory weighbridge certificate.</p>
                </div>

                <div style={{ backgroundColor: '#FAF9F6', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>TMT Steel Flatbeds</span>
                  <h4 style={{ margin: '4px 0 2px', fontSize: '1.1rem', color: 'var(--accent)' }}>15 to 30 Tons Flatbed</h4>
                  <p style={{ margin: 0, fontSize: '0.76rem', color: '#64748B' }}>Mixed sizes (16mm, 12mm, 20mm) strapped with mill tags.</p>
                </div>

                <div style={{ backgroundColor: '#FAF9F6', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>Escrow Guarantee</span>
                  <h4 style={{ margin: '4px 0 2px', fontSize: '1.1rem', color: 'var(--accent)' }}>100% Secure Payment</h4>
                  <p style={{ margin: 0, fontSize: '0.76rem', color: '#64748B' }}>Funds released to driver only upon physical offload sign-off.</p>
                </div>
              </div>

              {/* Bulk Request Form */}
              {!bulkSubmitted ? (
                <form onSubmit={handleBulkSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--accent)', marginBottom: '18px' }}>
                    Request Official Proforma Wholesale Quotation
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Company / Contractor Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Julius Berger Subcontractor / Adeleke Homes"
                        value={bulkData.companyOrName}
                        onChange={(e) => setBulkData({ ...bulkData, companyOrName: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.84rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Phone / WhatsApp Contact *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803 000 0000"
                        value={bulkData.phone}
                        onChange={(e) => setBulkData({ ...bulkData, phone: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.84rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Material Type *
                      </label>
                      <select
                        value={bulkData.materialType}
                        onChange={(e) => setBulkData({ ...bulkData, materialType: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.84rem' }}
                      >
                        <option>Dangote Cement 42.5R (Full Trailers - 900 Bags)</option>
                        <option>BUA Cement Extra (Full Trailers - 900 Bags)</option>
                        <option>High-Yield TMT Steel Rebars (30-Ton Flatbed)</option>
                        <option>Sandcrete Blocks (2,500 Units Site Delivery)</option>
                        <option>Spanish Porcelain Tiles (Full Container Pallets)</option>
                        <option>Gerard Stone-Coated Roofing (Estate Package)</option>
                        <option>Solar Inverters & Lithium Batteries (Multi-Unit)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                        Estimated Volume Required *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2 Trailers (1,800 Bags) or 30 Tons"
                        value={bulkData.estimatedQuantity}
                        onChange={(e) => setBulkData({ ...bulkData, estimatedQuantity: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.84rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                      Exact Construction Site Address & State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot 22, Lekki Free Trade Zone Expressway, Lagos"
                      value={bulkData.siteLocation}
                      onChange={(e) => setBulkData({ ...bulkData, siteLocation: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.84rem' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
                    <input
                      type="checkbox"
                      id="needsCrane"
                      checked={bulkData.needsCrane}
                      onChange={(e) => setBulkData({ ...bulkData, needsCrane: e.target.checked })}
                    />
                    <label htmlFor="needsCrane" style={{ fontSize: '0.8rem', color: '#475569', cursor: 'pointer' }}>
                      Include Hiab crane / automated offloader truck for heavy steel & pallets
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setBulkData({
                          companyOrName: 'Adeleke Infrastructure Ltd',
                          phone: '+234 803 452 9811',
                          email: 'olumide.adeleke@gmail.com',
                          materialType: 'Dangote Cement 42.5R (Full Trailers - 900 Bags)',
                          estimatedQuantity: '2 Trailers (1,800 Bags)',
                          siteLocation: 'Atlantic Bay Axis, Epe Corridor, Lagos State',
                          dateNeeded: 'This Thursday',
                          needsCrane: true
                        });
                      }}
                      style={{ background: 'none', border: '1px dashed var(--accent-gold)', color: 'var(--accent-gold)', padding: '8px 14px', borderRadius: '4px', fontSize: '0.76rem', cursor: 'pointer' }}
                    >
                      Fill Demo Order
                    </button>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ padding: '12px 28px', fontSize: '0.85rem' }}
                    >
                      Generate Wholesale Proforma & Dispatch Slot →
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '30px 20px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(26, 62, 38, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--accent)' }}>
                    <CheckCircle size={32} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--accent)', margin: '0 0 10px' }}>
                    Wholesale Order Ticket Registered!
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.6, margin: '0 0 20px' }}>
                    Thank you, <strong>{bulkData.companyOrName}</strong>. Our logistics dispatcher will call you at <strong>{bulkData.phone}</strong> within 30 minutes with the factory-gate quotation and confirm weighbridge slots for <strong>{bulkData.estimatedQuantity}</strong>.
                  </p>
                  <button
                    onClick={() => setBulkSubmitted(false)}
                    className="btn-primary"
                    style={{ padding: '9px 22px', fontSize: '0.8rem' }}
                  >
                    Create Another Bulk Request
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB 3: DELIVERY TRACKING FEATURE (Real-Time GPS Site Telemetry)
            ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'tracking' && (
          <div>
            {/* Search Box */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              padding: '24px 28px',
              marginBottom: '28px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Haulage Logistics Radar
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                    Live GPS Material Delivery Tracking
                  </h3>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                  Track 30-ton flatbed trucks & tippers from factory weighbridge to your site.
                </span>
              </div>

              <form onSubmit={handleTrackSearch} style={{ display: 'flex', gap: '10px', maxWidth: '600px' }}>
                <input
                  type="text"
                  placeholder="Enter Waybill Ref (e.g. NG-MAT-89241)"
                  value={trackWaybill}
                  onChange={(e) => setTrackWaybill(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    fontSize: '0.85rem',
                    fontFamily: 'monospace'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                >
                  {isSearchingWaybill ? 'Locating...' : 'Track Delivery →'}
                </button>
              </form>
            </div>

            {/* Tracking Status Card Stage */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '2px solid rgba(26, 62, 38, 0.2)',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.06)'
            }}>
              {/* Map & Telemetry Header */}
              <div style={{
                backgroundColor: '#070C09',
                color: '#FFFFFF',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
                borderBottom: '1px solid rgba(210, 125, 45, 0.3)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {trackedOrder.status}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: 'var(--accent-gold)' }}>
                    Waybill #{trackedOrder.waybill}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', display: 'block' }}>Estimated Arrival</span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>{trackedOrder.eta}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ backgroundColor: '#FAF9F6', padding: '16px 28px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748B', marginBottom: '8px' }}>
                  <span>Origin: Factory Weighbridge</span>
                  <span>En-Route Transit ({trackedOrder.progressPercent}%)</span>
                  <span>Destination: Offload Site</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${trackedOrder.progressPercent}%`, height: '100%', backgroundColor: 'var(--accent)', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Waybill Details Grid */}
              <div style={{ padding: '28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                  <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '14px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                      Cargo Specification
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#1E293B', display: 'block', margin: '3px 0' }}>
                      {trackedOrder.cargo}
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      Security Seal: {trackedOrder.sealCode}
                    </span>
                  </div>

                  <div style={{ borderLeft: '3px solid var(--accent-gold)', paddingLeft: '14px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                      Driver & Vehicle Telemetry
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#1E293B', display: 'block', margin: '3px 0' }}>
                      {trackedOrder.driver}
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: '#10B981', fontWeight: 600 }}>
                      Speed: 52 km/h • GPS Satellite Link Active
                    </span>
                  </div>

                  <div style={{ borderLeft: '3px solid #6366F1', paddingLeft: '14px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
                      Site Destination
                    </span>
                    <strong style={{ fontSize: '0.92rem', color: '#1E293B', display: 'block', margin: '3px 0' }}>
                      {trackedOrder.destination}
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: '#64748B' }}>
                      Offload Coordinator Contacted
                    </span>
                  </div>
                </div>

                {/* Timeline Checkpoints */}
                <h4 style={{ fontSize: '0.84rem', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '14px' }}>
                  Haulage Journey Checkpoints
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { time: '07:45 AM', event: 'Factory Order Verified & Loading Authorized', done: true },
                    { time: '09:20 AM', event: 'Tare & Gross Weighbridge Verification (NIS Certified)', done: true },
                    { time: '11:10 AM', event: 'Tamper-Evident Cargo Seal Affixed (#NG-SEAL-774921)', done: true },
                    { time: '01:35 PM', event: 'Departed Sagamu Interchange onto Lagos Corridor', done: true },
                    { time: '03:30 PM (Est)', event: 'Arrival at Lekki Site for Offloading & Escrow Release', done: false }
                  ].map((chk, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8rem' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: chk.done ? 'var(--accent)' : '#E2E8F0',
                        color: chk.done ? '#FFFFFF' : '#94A3B8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        flexShrink: 0
                      }}>
                        {chk.done ? '✓' : '•'}
                      </div>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: chk.done ? 'var(--accent)' : '#94A3B8', width: '100px' }}>
                        {chk.time}
                      </span>
                      <span style={{ color: chk.done ? '#1E293B' : '#94A3B8', fontWeight: chk.done ? 600 : 400 }}>
                        {chk.event}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          4. POP-UP MODAL: CHOOSE SPECIFICATIONS & CONFIGURE ORDER
          ══════════════════════════════════════════════════════════════════════ */}
      {customizingItem && (
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
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {customizingItem.brand}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--accent)', margin: '2px 0 0' }}>
                  {customizingItem.name}
                </h3>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit}>
              {/* 1. Choose Specification Variant */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  1. Choose Specification / Grade Variant *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                  {customizingItem.variants.map((v, i) => {
                    const isSelected = selectedVariant === v;
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setSelectedVariant(v)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: '4px',
                          border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                          backgroundColor: isSelected ? '#FAF9F6' : '#FFFFFF',
                          color: isSelected ? 'var(--accent)' : 'var(--text-title)',
                          fontSize: '0.76rem',
                          fontWeight: isSelected ? 800 : 500,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        {isSelected ? '● ' : '○ '} {v}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Quantity Selector */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                    2. Quantity ({customizingItem.unit}) *
                  </label>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    ₦{(customizingItem.priceNgn * quantity).toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 5))}
                    style={{ width: '38px', height: '38px', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: '#F1F5F9', fontWeight: 800, cursor: 'pointer' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: '100px', textAlign: 'center', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', fontWeight: 700 }}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => prev + 5)}
                    style={{ width: '38px', height: '38px', borderRadius: '4px', border: '1px solid var(--border)', backgroundColor: '#F1F5F9', fontWeight: 800, cursor: 'pointer' }}
                  >
                    +
                  </button>
                  <span style={{ fontSize: '0.76rem', color: '#64748B' }}>
                    Units ({customizingItem.unit})
                  </span>
                </div>
              </div>

              {/* 3. Delivery Location */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                  3. Site Delivery Location (State / Region) *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                  <select
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                  >
                    <option>Lagos State</option>
                    <option>Abuja FCT</option>
                    <option>Ogun State</option>
                    <option>Oyo State (Ibadan)</option>
                    <option>Rivers State (Port Harcourt)</option>
                    <option>Edo State (Benin)</option>
                    <option>Anambra State (Awka / Onitsha)</option>
                    <option>Delta State (Asaba / Warri)</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Street / Site Address *"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    style={{ padding: '8px 10px', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="offloadCheck"
                    checked={requiresOffloading}
                    onChange={(e) => setRequiresOffloading(e.target.checked)}
                  />
                  <label htmlFor="offloadCheck" style={{ fontSize: '0.76rem', color: '#475569', cursor: 'pointer' }}>
                    Include on-site manual offloading crew (+₦10,000)
                  </label>
                </div>
              </div>

              {/* Order Summary & Submit */}
              <div style={{
                backgroundColor: '#FAF9F6',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '14px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span>Material Subtotal:</span>
                  <strong>₦{(customizingItem.priceNgn * quantity).toLocaleString()}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span>Haulage Delivery to {deliveryState}:</span>
                  <span>{deliveryState === 'Lagos State' ? '₦25,000' : '₦45,000'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.94rem', fontWeight: 800, color: 'var(--accent)', paddingTop: '6px', borderTop: '1px solid var(--border)' }}>
                  <span>Estimated Total (Escrow Protected):</span>
                  <span>₦{((customizingItem.priceNgn * quantity) + (deliveryState === 'Lagos State' ? 25000 : 45000) + (requiresOffloading ? 10000 : 0)).toLocaleString()}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px 0', fontSize: '0.86rem' }}
                >
                  Confirm Specifications & Request Dispatch →
                </button>
                <button
                  type="button"
                  onClick={() => setCustomizingItem(null)}
                  style={{ padding: '12px 18px', border: '1px solid var(--border)', background: '#FFFFFF', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          5. POP-UP MODAL: ORDER CONFIRMATION
          ══════════════════════════════════════════════════════════════════════ */}
      {orderConfirmed && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(5, 10, 7, 0.88)',
          backdropFilter: 'blur(10px)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            maxWidth: '560px',
            width: '100%',
            padding: '32px 28px',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
            border: '2px solid var(--accent)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(26, 62, 38, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              border: '2px solid var(--accent)'
            }}>
              <Check size={32} style={{ color: 'var(--accent)' }} />
            </div>

            <span style={{
              display: 'inline-block',
              backgroundColor: 'rgba(210, 125, 45, 0.12)',
              color: 'var(--accent-gold)',
              fontWeight: 700,
              fontSize: '0.76rem',
              padding: '4px 12px',
              borderRadius: '4px',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Waybill Ref: {orderConfirmed.orderRef}
            </span>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', color: 'var(--accent)', margin: '0 0 10px' }}>
              Material Dispatch Booked!
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: '0 0 18px' }}>
              Your order for <strong>{orderConfirmed.quantity} x {orderConfirmed.item.name}</strong> ({orderConfirmed.variant}) has been routed to the regional dispatch depot for delivery to <strong>{orderConfirmed.deliveryAddress}</strong> ({orderConfirmed.deliveryState}).
            </p>

            <div style={{
              backgroundColor: '#FAF9F6',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '14px',
              textAlign: 'left',
              fontSize: '0.8rem',
              marginBottom: '20px'
            }}>
              <div style={{ marginBottom: '4px' }}><strong>Estimated Total:</strong> ₦{orderConfirmed.totalNgn.toLocaleString()}</div>
              <div style={{ marginBottom: '4px' }}><strong>Payment:</strong> Held in Umoja Escrow (Released upon physical offload)</div>
              <div><strong>Live Tracking:</strong> Waybill #{orderConfirmed.orderRef} is active on the Tracking Radar</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setTrackWaybill(orderConfirmed.orderRef);
                  setOrderConfirmed(null);
                  setActiveTab('tracking');
                }}
                className="btn-primary"
                style={{ padding: '10px 22px', fontSize: '0.82rem' }}
              >
                Track This Delivery Now →
              </button>
              <button
                onClick={() => setOrderConfirmed(null)}
                style={{ padding: '10px 18px', border: '1px solid var(--border)', background: '#FFFFFF', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
