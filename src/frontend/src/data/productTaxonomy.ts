export interface ProductType {
  name: string;
}

export interface Subcategory {
  name: string;
  productTypes: ProductType[];
}

export interface ProductCategory {
  name: string;
  slug: string;
  image: string;
  subcategories: Subcategory[];
}

export const productCategories: ProductCategory[] = [
  {
    name: 'Saddles',
    slug: 'saddles',
    image: '/assets/generated/cat-saddles.dim_1200x800.png',
    subcategories: [
      {
        name: 'English Saddles',
        productTypes: [
          { name: 'Dressage Saddle' },
          { name: 'Monoflap Dressage Saddle' },
          { name: 'Jumping Saddle' },
          { name: 'Close Contact Saddle' },
          { name: 'Eventing / Cross Country Saddle' },
          { name: 'All Purpose Saddle' },
          { name: 'Exercise Saddle' },
          { name: 'Baby / Pony Saddle' },
          { name: 'Synthetic English Saddle' },
        ],
      },
      {
        name: 'Western Saddles',
        productTypes: [
          { name: 'Trail Saddle' },
          { name: 'Pleasure Saddle' },
          { name: 'Barrel Racing Saddle' },
          { name: 'Roping Saddle' },
          { name: 'Ranch Saddle' },
          { name: 'Cutting Saddle' },
          { name: 'Reining Saddle' },
          { name: 'Wade Saddle' },
          { name: 'Western Show Saddle' },
          { name: 'Mexican Western Saddle' },
        ],
      },
      {
        name: 'Specialty Saddles',
        productTypes: [
          { name: 'Polo Saddle' },
          { name: 'Endurance Saddle' },
          { name: 'Treeless Saddle' },
          { name: 'Stock Saddle (Australian)' },
          { name: 'Half-Breed Saddle' },
          { name: 'Trooper Saddle' },
          { name: 'Vaquera Saddle' },
          { name: 'Icelandic Saddle' },
        ],
      },
    ],
  },
  {
    name: 'Bridles & Headgear',
    slug: 'bridles-headgear',
    image: '/assets/generated/cat-bridles-headgear.dim_1200x800.png',
    subcategories: [
      {
        name: 'Bridles (By Type)',
        productTypes: [
          { name: 'English Bridle' },
          { name: 'Dressage Bridle' },
          { name: 'Jumping Bridle' },
          { name: 'Snaffle Bridle' },
          { name: 'Double Bridle' },
          { name: 'Hunter Bridle' },
          { name: 'Figure 8 Bridle' },
          { name: 'Anatomical Bridle' },
          { name: 'Spanish Bridle' },
          { name: 'Icelandic Bridle' },
          { name: 'Polo Bridle' },
        ],
      },
      {
        name: 'Bridles (By Material)',
        productTypes: [
          { name: 'Biothane Bridle' },
          { name: 'PVC Bridle' },
          { name: 'Nylon Bridle' },
        ],
      },
      {
        name: 'Bridle Components',
        productTypes: [
          { name: 'Browbands' },
          { name: 'Plain' },
          { name: 'Padded' },
          { name: 'Crystal' },
          { name: 'Stitched' },
          { name: 'Nosebands' },
          { name: 'Cavesson' },
          { name: 'Flash' },
          { name: 'Swedish' },
          { name: 'Anatomical' },
          { name: 'Headstalls' },
        ],
      },
    ],
  },
  {
    name: 'Halters & Leads',
    slug: 'halters-leads',
    image: '/assets/generated/cat-halters-leads.dim_1200x800.png',
    subcategories: [
      {
        name: 'Halters',
        productTypes: [
          { name: 'Leather Halter' },
          { name: 'Nylon Halter' },
          { name: 'Rope Halter' },
          { name: 'PVC Halter' },
          { name: 'Show Halter' },
          { name: 'Horse Head Collar' },
        ],
      },
      {
        name: 'Leads',
        productTypes: [
          { name: 'Lead Rope (Cotton / Nylon / Leather)' },
          { name: 'Lead Line' },
        ],
      },
    ],
  },
  {
    name: 'Girths & Cinches',
    slug: 'girths-cinches',
    image: '/assets/generated/cat-girths-cinches.dim_1200x800.png',
    subcategories: [
      {
        name: 'English Girths',
        productTypes: [
          { name: 'Leather Girth' },
          { name: 'Cotton Girth' },
          { name: 'Nylon Girth' },
          { name: 'Elastic Girth' },
          { name: 'Dressage Girth' },
          { name: 'Stud Girth' },
        ],
      },
      {
        name: 'Western Cinches',
        productTypes: [
          { name: 'Western Cinch' },
          { name: 'Back Cinch' },
        ],
      },
    ],
  },
  {
    name: 'Stirrups & Accessories',
    slug: 'stirrups-accessories',
    image: '/assets/generated/cat-stirrups-accessories.dim_1200x800.png',
    subcategories: [
      {
        name: 'Stirrups (By Material)',
        productTypes: [
          { name: 'Iron Stirrups' },
          { name: 'Stainless Steel Stirrups' },
          { name: 'Aluminum Stirrups' },
          { name: 'Brass Stirrups' },
          { name: 'Fibre / Plastic Stirrups' },
          { name: 'Safety Stirrups' },
        ],
      },
      {
        name: 'Stirrup Accessories',
        productTypes: [
          { name: 'Stirrup Leathers' },
          { name: 'Stirrup Pads' },
          { name: 'Stirrup Belts' },
        ],
      },
    ],
  },
  {
    name: 'Saddle Pads & Blankets',
    slug: 'saddle-pads-blankets',
    image: '/assets/generated/cat-saddle-pads-blankets.dim_1200x800.png',
    subcategories: [
      {
        name: 'English Pads',
        productTypes: [
          { name: 'All Purpose Saddle Pad' },
          { name: 'Dressage Saddle Pad' },
          { name: 'Jumping Saddle Pad' },
          { name: 'Half Pad' },
          { name: 'Bareback Pad' },
        ],
      },
      {
        name: 'Western Pads',
        productTypes: [
          { name: 'Western Saddle Pad' },
          { name: 'Saddle Blanket (Cotton / Wool / Fleece)' },
          { name: 'Studded Western Blankets' },
        ],
      },
    ],
  },
  {
    name: 'Breastplates & Martingales',
    slug: 'breastplates-martingales',
    image: '/assets/generated/cat-breastplates-martingales.dim_1200x800.png',
    subcategories: [
      {
        name: 'Breastplates & Martingales',
        productTypes: [
          { name: 'Breastplate (English / Western)' },
          { name: 'Breast Collar (Western)' },
          { name: 'Running Martingale' },
          { name: 'Standing Martingale' },
        ],
      },
    ],
  },
  {
    name: 'Horse Leg Protection',
    slug: 'horse-leg-protection',
    image: '/assets/generated/cat-horse-leg-protection.dim_1200x800.png',
    subcategories: [
      {
        name: 'Horse Leg Protection',
        productTypes: [
          { name: 'Tendon Boots' },
          { name: 'Fetlock Boots' },
          { name: 'Bell Boots' },
          { name: 'Ankle Boots' },
          { name: 'Leg Wraps' },
          { name: 'Bandages' },
        ],
      },
    ],
  },
  {
    name: 'Horse Rugs & Clothing',
    slug: 'horse-rugs-clothing',
    image: '/assets/generated/cat-horse-rugs-clothing.dim_1200x800.png',
    subcategories: [
      {
        name: 'Rugs & Blankets',
        productTypes: [
          { name: 'Summer Rugs' },
          { name: 'Winter Rugs' },
          { name: 'Stable Rugs' },
          { name: 'Turnout Rugs' },
          { name: 'Fly Rugs' },
          { name: 'Fleece Rugs' },
          { name: 'Horse Blankets' },
        ],
      },
      {
        name: 'Clothing',
        productTypes: [
          { name: 'Horse Clothing' },
        ],
      },
    ],
  },
  {
    name: 'Horse Care & Stable Accessories',
    slug: 'horse-care-stable-accessories',
    image: '/assets/generated/cat-horse-care-stable-accessories.dim_1200x800.png',
    subcategories: [
      {
        name: 'Grooming',
        productTypes: [
          { name: 'Grooming Kits' },
          { name: 'Grooming Brushes' },
          { name: 'Curry Comb' },
          { name: 'Hoof Pick' },
        ],
      },
      {
        name: 'Stable Accessories',
        productTypes: [
          { name: 'Bit Guards' },
          { name: 'Fly Mask' },
          { name: 'Fly Veil' },
          { name: 'Hay Bag' },
          { name: 'Hay Net' },
          { name: 'Feed Bucket' },
          { name: 'Water Tub' },
        ],
      },
    ],
  },
  {
    name: 'Bits, Spurs & Control Gear',
    slug: 'bits-spurs-control-gear',
    image: '/assets/generated/cat-bits-spurs-control-gear.dim_1200x800.png',
    subcategories: [
      {
        name: 'Bits',
        productTypes: [
          { name: 'Snaffle Bit' },
          { name: 'Pelham Bit' },
          { name: 'Double Ring Bit' },
          { name: 'Bit Guards' },
        ],
      },
      {
        name: 'Control Equipment',
        productTypes: [
          { name: 'Spurs' },
          { name: 'Whips (Leather / Plastic)' },
        ],
      },
    ],
  },
  {
    name: 'Harness & Driving Equipment',
    slug: 'harness-driving-equipment',
    image: '/assets/generated/cat-harness-driving-equipment.dim_1200x800.png',
    subcategories: [
      {
        name: 'Harness & Driving Equipment',
        productTypes: [
          { name: 'Horse Harness Set' },
          { name: 'Driving Harness (Single / Pair)' },
          { name: 'Marathon Harness' },
          { name: 'Patent Harness' },
        ],
      },
    ],
  },
  {
    name: 'Rider Equipment',
    slug: 'rider-equipment',
    image: '/assets/generated/cat-rider-equipment.dim_1200x800.png',
    subcategories: [
      {
        name: 'Rider Clothing',
        productTypes: [
          { name: 'Riding Breeches' },
          { name: 'Jodhpurs' },
          { name: 'Riding Tights' },
          { name: 'Riding Jackets' },
          { name: 'Riding Shirts' },
          { name: 'Belts' },
        ],
      },
      {
        name: 'Rider Protection',
        productTypes: [
          { name: 'Riding Helmets' },
          { name: 'Body Protectors' },
          { name: 'Riding Gloves' },
          { name: 'Riding Chaps (Half / Full)' },
          { name: 'Riding Boots (Long / Ankle)' },
        ],
      },
    ],
  },
  {
    name: 'Bags & Leather Goods',
    slug: 'bags-leather-goods',
    image: '/assets/generated/cat-bags-leather-goods.dim_1200x800.png',
    subcategories: [
      {
        name: 'Bags & Leather Goods',
        productTypes: [
          { name: 'Saddle Bags' },
          { name: 'Horn Bags' },
          { name: 'Backpacks' },
          { name: 'Messenger Bags' },
          { name: 'Laptop Bags' },
          { name: 'Tote Bags' },
          { name: 'Waist Bags' },
          { name: 'Wallets' },
          { name: 'Wrist Bands' },
        ],
      },
    ],
  },
];
