export interface Subcategory {
  id: string;
  name: string;
  desc: string;
  useCases: string[];
  materials: string;
  moq: string;
  images: string[];
  bgColor: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  subcategories: Subcategory[];
}

export const phase1Categories: Category[] = [
  {
    id: 'backpacks',
    name: 'Backpacks & Laptop Bags',
    slug: '/backpacks',
    tagline: 'Business · School · Everyday · Laptop Bags',
    description: 'OEM manufacturing of business backpacks, school backpacks, everyday backpacks and laptop bags for brands, distributors and private label clients worldwide.',
    subcategories: [
      {
        id: 'business',
        name: 'Business Backpacks',
        desc: 'Sleek, professional carry designed for daily commuters and business travellers.',
        useCases: ['Corporate', 'Gifting', 'Premium retail'],
        materials: 'Canvas, faux leather trim, polyester',
        moq: 'From 100 units',
        bgColor: '#f2f0ed',
        images: [
          '/images/bags/backpacks/business/1.png',
          '/images/bags/backpacks/business/2.png',
          '/images/bags/backpacks/business/3.png',
          '/images/bags/backpacks/business/4.png',
        ],
      },
      {
        id: 'school',
        name: 'School Backpacks',
        desc: 'Lightweight, durable and ergonomic bags designed for children and students.',
        useCases: ['School stores', 'Retail chains', 'Brand programmes'],
        materials: 'Lightweight polyester, EVA back panel',
        moq: 'From 100 units',
        bgColor: '#f3f1ee',
        images: [
          '/images/bags/backpacks/school/1.png',
          '/images/bags/backpacks/school/2.png',
          '/images/bags/backpacks/school/3.png',
          '/images/bags/backpacks/school/4.png',
        ],
      },
      {
        id: 'everyday',
        name: 'Everyday Backpacks',
        desc: 'Versatile lifestyle backpacks for casual use, gym, and everyday carry.',
        useCases: ['Fashion retail', 'Brand promotions', 'Lifestyle brands'],
        materials: '600D polyester, mesh panels',
        moq: 'From 100 units',
        bgColor: '#f3f1ee',
        images: [
          '/images/bags/backpacks/everyday/1.png',
          '/images/bags/backpacks/everyday/2.png',
          '/images/bags/backpacks/everyday/3.png',
          '/images/bags/backpacks/everyday/4.png',
        ],
      },
      {
        id: 'laptop',
        name: 'Laptop Bags',
        desc: 'Professional bags with dedicated laptop sleeves, organiser panels and padded back support.',
        useCases: ['Corporate gifts', 'Tech brands', 'Retail'],
        materials: 'Premium polyester, water-resistant coating',
        moq: 'From 100 units',
        bgColor: '#f2f0ed',
        images: [
          '/images/bags/backpacks/laptop/1.png',
          '/images/bags/backpacks/laptop/2.png',
          '/images/bags/backpacks/laptop/3.png',
          '/images/bags/backpacks/laptop/4.png',
        ],
      },
    ],
  },
  {
    id: 'duffel-gym',
    name: 'Duffel & Gym Bags',
    slug: '/duffel-gym',
    tagline: 'Travel · Gym · Overnight · Convertible',
    description: 'Bulk duffel and gym bag manufacturing for sports retailers, fitness brands and wholesale distributors.',
    subcategories: [
      {
        id: 'travel-duffel',
        name: 'Travel Duffel Bags',
        desc: 'Roomy travel bags with shoulder strap, top handle, and multiple compartments.',
        useCases: ['Travel retail', 'Airline merchandise', 'Corporate gifts'],
        materials: '600D polyester, nylon, canvas',
        moq: 'From 100 units',
        bgColor: '#f3f1ee',
        images: [
          '/images/bags/duffel-gym/travel/1.png',
          '/images/bags/duffel-gym/travel/2.png',
          '/images/bags/duffel-gym/travel/3.png',
          '/images/bags/duffel-gym/travel/4.png',
        ],
      },
      {
        id: 'gym',
        name: 'Gym Bags',
        desc: 'Purpose-built gym bags with shoe compartments, wet pockets and durable zippers.',
        useCases: ['Gym chains', 'Fitness brands', 'Sports retail'],
        materials: 'Polyester, PU trim, ventilated mesh',
        moq: 'From 100 units',
        bgColor: '#f3f1ee',
        images: [
          '/images/bags/duffel-gym/gym/1.png',
          '/images/bags/duffel-gym/gym/2.png',
          '/images/bags/duffel-gym/gym/3.png',
          '/images/bags/duffel-gym/gym/4.png',
        ],
      },
      {
        id: 'cabin',
        name: 'Cabin / Overnight Bags',
        desc: 'Compact overnight bags sized for cabin luggage with premium finishes.',
        useCases: ['Premium retail', 'Airlines', 'Hotel merchandise'],
        materials: 'Polyester, canvas, faux leather handles',
        moq: 'From 100 units',
        bgColor: '#f3f1ee',
        images: [
          '/images/bags/duffel-gym/cabin/1.png',
          '/images/bags/duffel-gym/cabin/2.png',
          '/images/bags/duffel-gym/cabin/3.png',
        ],
      },
      {
        id: 'convertible',
        name: 'Convertible Duffel Backpacks',
        desc: 'Dual-mode bags that convert between duffel and backpack carry.',
        useCases: ['Outdoor brands', 'Travel retail', 'Sports brands'],
        materials: '900D polyester, reinforced stitching',
        moq: 'From 100 units',
        bgColor: '#f3f1ee',
        images: [
          '/images/bags/duffel-gym/convertible/1.png',
          '/images/bags/duffel-gym/convertible/2.png',
          '/images/bags/duffel-gym/convertible/3.png',
          '/images/bags/duffel-gym/convertible/4.png',
          '/images/bags/duffel-gym/convertible/5.png',
        ],
      },
    ],
  },
  {
    id: 'sports-bags',
    name: 'Sports Bags',
    slug: '/sports-bags',
    tagline: 'Cricket · Hockey',
    description: 'Specialist sports kit bags manufactured for teams, clubs, academies and sports equipment brands.',
    subcategories: [
      {
        id: 'cricket',
        name: 'Cricket Kit Bags',
        desc: 'Full-size cricket kit bags with bat sleeves, padded pockets and team branding options.',
        useCases: ['Cricket clubs', 'Sports brands', 'Team merchandise'],
        materials: 'Heavy-duty polyester, reinforced base',
        moq: 'From 100 units',
        bgColor: '#f2f1ed',
        images: [
          '/images/bags/sports/cricket/1.png',
          '/images/bags/sports/cricket/2.png',
          '/images/bags/sports/cricket/3.png',
          '/images/bags/sports/cricket/4.png',
          '/images/bags/sports/cricket/5.png',
          '/images/bags/sports/cricket/6.png',
          '/images/bags/sports/cricket/7.png',
        ],
      },
      {
        id: 'hockey',
        name: 'Hockey Kit Bags',
        desc: 'Long-body bags designed for hockey sticks and full team kit.',
        useCases: ['Hockey clubs', 'Sports retailers', 'School sports'],
        materials: 'Oxford polyester, padded dividers',
        moq: 'From 100 units',
        bgColor: '#ffffff',
        images: [
          '/images/bags/sports/hockey/1.png',
          '/images/bags/sports/hockey/2.png',
        ],
      },
    ],
  },
];

export const allCategoryNames = phase1Categories.map((c) => c.name);
