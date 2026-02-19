import Product_1 from "../assets/generated/OUR_PRODUCTS/product_1_saddle.png";
import Product_2 from "../assets/generated/OUR_PRODUCTS/product_2_bridles.png";
import Product_3 from "../assets/generated/OUR_PRODUCTS/product_3_halters.png";
import Product_4 from "../assets/generated/OUR_PRODUCTS/product_4_girth.png";
import Product_5 from "../assets/generated/OUR_PRODUCTS/product_5_stirrup.png";
import Product_6 from "../assets/generated/OUR_PRODUCTS/product_6_saddlepad.png";
import Product_7 from "../assets/generated/OUR_PRODUCTS/product_7_breastplate.png";
import Product_8 from "../assets/generated/OUR_PRODUCTS/product_8_protection.png";
import Product_9 from "../assets/generated/OUR_PRODUCTS/product_9_rugs.png";
import Product_10 from "../assets/generated/OUR_PRODUCTS/product_10_stable.png";
import Product_11 from "../assets/generated/OUR_PRODUCTS/product_11_bits.png";
import Product_12 from "../assets/generated/OUR_PRODUCTS/product_12_harness.png";
import Product_13 from "../assets/generated/OUR_PRODUCTS/product_13_rider.png";
import Product_14 from "../assets/generated/OUR_PRODUCTS/product_14_bags.png";
export interface ProductType {
  name: string;
  slug?: string;
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
    image: Product_1,
    subcategories: [
      {
        name: 'English Saddles',
        productTypes: [
          { name: 'Dressage Saddle', slug: 'dual-flap-dressage' },
          { name: 'Monoflap Dressage Saddle', slug: 'monoflap-dressage' },
          { name: 'Jumping Saddle', slug: 'jumping' },
          { name: 'Close Contact Saddle', slug: 'close-contact' },
          { name: 'Eventing / Cross Country Saddle', slug: 'eventing' },
          { name: 'All Purpose Saddle', slug: 'all-purpose' },
          { name: 'Exercise Saddle', slug: 'exercise' },
          { name: 'Baby / Pony Saddle', slug: 'pony' },
          { name: 'Synthetic English Saddle', slug: 'synthetic' },
        ],
      },
      {
        name: 'Western Saddles',
        productTypes: [
          { name: 'Trail Saddle', slug: 'trail' },
          { name: 'Pleasure Saddle', slug: 'pleasure' },
          { name: 'Barrel Racing Saddle', slug: 'barrel' },
          { name: 'Roping Saddle', slug: 'roping' },
          { name: 'Ranch Saddle', slug: 'ranch' },
          { name: 'Cutting Saddle', slug: 'cutting' },
          { name: 'Reining Saddle', slug: 'reining' },
          { name: 'Wade Saddle', slug: 'wade' },
          { name: 'Western Show Saddle', slug: 'show' },
          { name: 'Mexican Western Saddle', slug: 'mexican' },
        ],
      },
      {
        name: 'Specialty Saddles',
        productTypes: [
          { name: 'Polo Saddle', slug: 'polo' },
          { name: 'Endurance Saddle', slug: 'endurance' },
          { name: 'Treeless Saddle', slug: 'treeless' },
          { name: 'Stock Saddle (Australian)', slug: 'stock' },
          { name: 'Half-Breed Saddle', slug: 'half-breed' },
          { name: 'Trooper Saddle', slug: 'trooper' },
          { name: 'Vaquera Saddle', slug: 'vaquera' },
          { name: 'Icelandic Saddle', slug: 'icelandic' },
        ],
      },
    ],
  },
  {
    name: 'Bridles & Headgear',
    slug: 'bridles-headgear',
    image: Product_2,
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
          { name: 'Crownpiece', slug: 'crownpiece' },
          { name: 'Browband', slug: 'browband' },
          { name: 'Throatlatch', slug: 'throatlatch' },
          { name: 'Cheekpiece(s)', slug: 'cheekpieces' },
          { name: 'Noseband', slug: 'noseband' },
          { name: 'Flash Strap', slug: 'flash-strap' },
          { name: 'Reins', slug: 'reins' },
        ],
      },
    ],
  },
  {
    name: 'Halters & Leads',
    slug: 'halters-leads',
    image: Product_3,
    subcategories: [
      {
        name: 'Halters',
        productTypes: [
          { name: 'Leather Halter', slug: 'leather-halter' },
          { name: 'Nylon Halter', slug: 'nylon-halter' },
          { name: 'Rope Halter', slug: 'rope-halter' },
          { name: 'PVC Halter', slug: 'pvc-halter' },
          { name: 'Show Halter', slug: 'show-halter' },
          { name: 'Horse Head Collar', slug: 'horse-head-collar' },
        ],
      },
      {
        name: 'Leads',
        productTypes: [
          { name: 'Lead Rope (Cotton / Nylon / Leather)', slug: 'lead-rope' },
          { name: 'Lead Line', slug: 'lead-line' },
        ],
      },
    ],
  },
  {
    name: 'Girths & Cinches',
    slug: 'girths-cinches',
    image: Product_4,
    subcategories: [
      {
        name: 'English Girths',
        productTypes: [
          { name: 'Leather Girth', slug: 'leather-girth' },
          { name: 'Cotton Girth', slug: 'cotton-girth' },
          { name: 'Nylon Girth', slug: 'nylon-girth' },
          { name: 'Elastic Girth', slug: 'elastic-girth' },
          { name: 'Dressage Girth', slug: 'dressage-girth' },
          { name: 'Stud Girth', slug: 'stud-girth' },
        ],
      },
      {
        name: 'Western Cinches',
        productTypes: [
          { name: 'Western Cinch', slug: 'western-cinch' },
          { name: 'Back Cinch', slug: 'back-cinch' },
        ],
      },
    ],
  },
  {
    name: 'Stirrups & Accessories',
    slug: 'stirrups-accessories',
    image: Product_5,
    subcategories: [
      {
        name: 'Stirrups (By Material)',
        productTypes: [
          { name: 'Iron Stirrups', slug: 'iron-stirrups' },
          { name: 'Stainless Steel Stirrups', slug: 'stainless-steel-stirrups' },
          { name: 'Aluminum Stirrups', slug: 'aluminum-stirrups' },
          { name: 'Brass Stirrups', slug: 'brass-stirrups' },
          { name: 'Fibre / Plastic Stirrups', slug: 'fibre-plastic-stirrups' },
          { name: 'Safety Stirrups', slug: 'safety-stirrups' },
        ],
      },
      {
        name: 'Stirrup Accessories',
        productTypes: [
          { name: 'Stirrup Leathers', slug: 'stirrup-leathers' },
          { name: 'Stirrup Pads', slug: 'stirrup-pads' },
          { name: 'Stirrup Belts', slug: 'stirrup-belts' },
        ],
      },
    ],
  },
  {
    name: 'Saddle Pads & Blankets',
    slug: 'saddle-pads-blankets',
    image: Product_6,
    subcategories: [
      {
        name: 'Pads',
        productTypes: [
          { name: 'All Purpose Saddle Pad', slug: 'all-purpose-saddle-pad' },
          { name: 'Dressage Saddle Pad', slug: 'dressage-saddle-pad' },
          { name: 'Jumping Saddle Pad', slug: 'jumping-saddle-pad' },
          { name: 'Half Pad', slug: 'half-pad' },
          { name: 'Bareback Pad', slug: 'bareback-pad' },
          { name: 'Western Saddle Pad', slug: 'western-saddle-pad' },
        ],
      },
      {
        name: 'Blankets',
        productTypes: [
          { name: 'Saddle Blanket (Cotton / Wool / Fleece)', slug: 'saddle-blanket' },
          { name: 'Studded Western Blankets', slug: 'studded-western-blankets' },
        ],
      },
    ],
  },
  {
    name: 'Breastplates & Martingales',
    slug: 'breastplates-martingales',
    image: Product_7,
    subcategories: [
      {
        name: 'Breastplates & Martingales',
        productTypes: [
          { name: 'Breastplate (English / Western)', slug: 'breastplate-english-western' },
          { name: 'Breast Collar (Western)', slug: 'breast-collar-western' },
          { name: 'Running Martingale', slug: 'running-martingale' },
          { name: 'Standing Martingale', slug: 'standing-martingale' },
        ],
      },
    ],
  },
  {
    name: 'Horse Leg Protection',
    slug: 'horse-leg-protection',
    image: Product_8,
    subcategories: [
      {
        name: 'Horse Leg Protection',
        productTypes: [
          { name: 'Tendon Boots', slug: 'tendon-boots' },
          { name: 'Fetlock Boots', slug: 'fetlock-boots' },
          { name: 'Bell Boots', slug: 'bell-boots' },
          { name: 'Ankle Boots', slug: 'ankle-boots' },
          { name: 'Leg Wraps', slug: 'leg-wraps' },
          { name: 'Bandages', slug: 'bandages' },
        ],
      },
    ],
  },
  {
    name: 'Horse Rugs & Clothing',
    slug: 'horse-rugs-clothing',
    image: Product_9,
    subcategories: [
      {
        name: 'Rugs & Blankets',
        productTypes: [
          { name: 'Summer Rugs', slug: 'summer-rugs' },
          { name: 'Winter Rugs', slug: 'winter-rugs' },
          { name: 'Stable Rugs', slug: 'stable-rugs' },
          { name: 'Turnout Rugs', slug: 'turnout-rugs' },
          { name: 'Fly Rugs', slug: 'fly-rugs' },
          { name: 'Fleece Rugs', slug: 'fleece-rugs' },
          { name: 'Horse Blankets', slug: 'horse-blankets' },
        ],
      },
      {
        name: 'Clothing',
        productTypes: [
          { name: 'Horse Clothing', slug: 'horse-clothing' },
        ],
      },
    ],
  },
  {
    name: 'Horse Care & Stable Accessories',
    slug: 'horse-care-stable-accessories',
    image: Product_10,
    subcategories: [
      {
        name: 'Grooming',
        productTypes: [
          { name: 'Grooming Kits', slug: 'grooming-kits' },
          { name: 'Grooming Brushes', slug: 'grooming-brushes' },
          { name: 'Curry Comb', slug: 'curry-comb' },
          { name: 'Hoof Pick', slug: 'hoof-pick' },
        ],
      },
      {
        name: 'Stable Accessories',
        productTypes: [
          { name: 'Bit Guards', slug: 'bit-guards' },
          { name: 'Fly Mask', slug: 'fly-mask' },
          { name: 'Fly Veil', slug: 'fly-veil' },
          { name: 'Hay Bag', slug: 'hay-bag' },
          { name: 'Hay Net', slug: 'hay-net' },
          { name: 'Feed Bucket', slug: 'feed-bucket' },
          { name: 'Water Tub', slug: 'water-tub' },
        ],
      },
    ],
  },
  {
    name: 'Bits, Spurs & Control Gear',
    slug: 'bits-spurs-control-gear',
    image: Product_11,
    subcategories: [
      {
        name: 'Bits',
        productTypes: [
          { name: 'Snaffle Bit', slug: 'snaffle-bit' },
          { name: 'Pelham Bit', slug: 'pelham-bit' },
          { name: 'Double Ring Bit', slug: 'double-ring-bit' },
          { name: 'Bit Guards', slug: 'bit-guards-bits' },
        ],
      },
      {
        name: 'Control Equipment',
        productTypes: [
          { name: 'Spurs', slug: 'spurs' },
          { name: 'Whips (Leather / Plastic)', slug: 'whips-leather-plastic' },
        ],
      },
    ],
  },
  {
    name: 'Harness & Driving Equipment',
    slug: 'harness-driving-equipment',
    image: Product_12,
    subcategories: [
      {
        name: 'Harness & Driving Equipment',
        productTypes: [
          { name: 'Horse Harness Set', slug: 'horse-harness-set' },
          { name: 'Driving Harness (Single / Pair)', slug: 'driving-harness-single-pair' },
          { name: 'Marathon Harness', slug: 'marathon-harness' },
          { name: 'Patent Harness', slug: 'patent-harness' },
        ],
      },
    ],
  },
  {
    name: 'Rider Equipment',
    slug: 'rider-equipment',
    image: Product_13,
    subcategories: [
      {
        name: 'Rider Clothing',
        productTypes: [
          { name: 'Riding Breeches', slug: 'riding-breeches' },
          { name: 'Jodhpurs', slug: 'jodhpurs' },
          { name: 'Riding Tights', slug: 'riding-tights' },
          { name: 'Riding Jackets', slug: 'riding-jackets' },
          { name: 'Riding Shirts', slug: 'riding-shirts' },
          { name: 'Belts', slug: 'rider-belts' },
        ],
      },
      {
        name: 'Rider Protection',
        productTypes: [
          { name: 'Riding Helmets', slug: 'riding-helmets' },
          { name: 'Body Protectors', slug: 'body-protectors' },
          { name: 'Riding Gloves', slug: 'riding-gloves' },
          { name: 'Riding Chaps (Half / Full)', slug: 'riding-chaps-half-full' },
          { name: 'Riding Boots (Long / Ankle)', slug: 'riding-boots-long-ankle' },
        ],
      },
    ],
  },
  {
    name: 'Bags & Leather Goods',
    slug: 'bags-leather-goods',
    image: Product_14,
    subcategories: [
      {
        name: 'Bags & Leather Goods',
        productTypes: [
          { name: 'Saddle Bags', slug: 'saddle-bags' },
          { name: 'Horn Bags', slug: 'horn-bags' },
          { name: 'Backpacks', slug: 'backpacks' },
          { name: 'Messenger Bags', slug: 'messenger-bags' },
          { name: 'Laptop Bags', slug: 'laptop-bags' },
          { name: 'Tote Bags', slug: 'tote-bags' },
          { name: 'Waist Bags', slug: 'waist-bags' },
          { name: 'Wallets', slug: 'wallets' },
          { name: 'Wrist Bands', slug: 'wrist-bands' },
        ],
      },
    ],
  },
];
