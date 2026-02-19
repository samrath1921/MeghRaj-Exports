import { useState } from 'react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import { useReducedMotion } from '../hooks/useReducedMotion';

import English_Saddle_1 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/1_dual_dressage.png";
import English_Saddle_2 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/2_mono_dressage.png";
import English_Saddle_3 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/3_jumping.png";
import English_Saddle_4 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/4_close_contact.png";
import English_Saddle_5 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/5_eventing.png";
import English_Saddle_6 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/6_all_purpose.png";
import English_Saddle_7 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/7_exercise.png";
import English_Saddle_8 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/8_pony.png";
import English_Saddle_9 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/9_synthetic.png";

import Western_Saddle_1 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/1_trail.png";
import Western_Saddle_2 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/2_pleasure.png";
import Western_Saddle_3 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/3_barrel.png";
import Western_Saddle_4 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/4_roping.png";
import Western_Saddle_5 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/5_ranch.png";
import Western_Saddle_6 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/6_cutting.png";
import Western_Saddle_7 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/7_reining.png";
import Western_Saddle_8 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/8_wade.png";
import Western_Saddle_9 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/9_show.png";
import Western_Saddle_10 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/10_mexican.png";

import Speciality_Saddle_1 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/1_polo.png";
import Speciality_Saddle_2 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/2_endurance.png";
import Speciality_Saddle_3 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/3_treeless.png";
import Speciality_Saddle_4 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/4_stock.png";
import Speciality_Saddle_5 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/5_half_breed.png";
import Speciality_Saddle_6 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/6_trooper.png";
import Speciality_Saddle_7 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/7_vaquera.png";
import Speciality_Saddle_8 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/8_icelandic.png";

import Bridle_byType_1 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/1_english.png";
import Bridle_byType_2 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/2_dressage.png";
import Bridle_byType_3 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/3_jumping.png";
import Bridle_byType_4 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/4_snaffle.png";
import Bridle_byType_5 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/5_double.png";
import Bridle_byType_6 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/6_hunter.png";
import Bridle_byType_7 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/7_fig8.png";
import Bridle_byType_8 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/8_anatomical.png";
import Bridle_byType_9 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/9_spanish.png";
import Bridle_byType_10 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/10_icelandic.png";
import Bridle_byType_11 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/11_polo.png";

import Bridle_byMaterial_1 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_MATERIAL/1_biothane.png";
import Bridle_byMaterial_2 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_MATERIAL/2_pvc.png";
import Bridle_byMaterial_3 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_MATERIAL/3_nylon.png";

import Bridle_Component_1 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/1_browband.png";
import Bridle_Component_2 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/2_crownpiece.png";
import Bridle_Component_3 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/3_throatlatch.png";
import Bridle_Component_4 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/4_cheekpiece.png";
import Bridle_Component_5 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/5_noseband.png";
import Bridle_Component_6 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/6_flashstrap.png";
import Bridle_Component_7 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/7_reins.png";

import Halter_1 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/1_leather.png";
import Halter_2 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/2_nylon.png";
import Halter_3 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/3_rope.png";
import Halter_4 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/4_pvc.png";
import Halter_5 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/5_show.png";
import Halter_6 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/6_head_collar.png";

import Lead_1 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/LEADS/1_rope.png";
import Lead_2 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/LEADS/2_line.png";

import Girth_1 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/1_leather.png";
import Girth_2 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/2_cotton.png";
import Girth_3 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/3_nylon.png";
import Girth_4 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/4_elastic.png";
import Girth_5 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/5_dressage.png";
import Girth_6 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/6_stud.png";

import Cinch_1 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/CINCHES/1_western.png";
import Cinch_2 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/CINCHES/2_back.png";

import Stirrups_1 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/1_iron.png";
import Stirrups_2 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/2_steel.png";
import Stirrups_3 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/3_aluminium.png";
import Stirrups_4 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/4_brass.png";
import Stirrups_5 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/5_plastic.png";
import Stirrups_6 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/6_safety.png";

import Accessory_1 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/1_stirrup_leather.png";
import Accessory_2 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/2_stirrup_pads.png";
import Accessory_3 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/3_stirrup_belt.png";

import Pad_1 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/1_all_purpose.png";
import Pad_2 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/2_dressage.png";
import Pad_3 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/3_jumping.png";
import Pad_4 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/4_Half.png";
import Pad_5 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/5_bareback.png";
import Pad_6 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/6_Western.png";

import Blanket_1 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/BLANKETS/1_western.png";
import Blanket_2 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/BLANKETS/2_studded.png";

import Bp_Mg_1 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/1_breastplate.png";
import Bp_Mg_2 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/2_breastcollar.png";
import Bp_Mg_3 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/3_running.png";
import Bp_Mg_4 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/4_standing.png";

import Leg_1 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/1_tendonboot.png";
import Leg_2 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/2_fetlockboot.png";
import Leg_3 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/3_bellboot.png";
import Leg_4 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/4_ankleboot.png";
import Leg_5 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/5_wraps.png";
import Leg_6 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/6_bandage.png";

import Rug_1 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/1_summer.png";
import Rug_2 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/2_winter.png";
import Rug_3 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/3_stable.png";
import Rug_4 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/4_turnout.png";
import Rug_5 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/5_fly.png";
import Rug_6 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/6_fleece.png";
import Rug_7 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/7_blanket.png";

import Clothing_1 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/CLOTHING/1_clothing.png";

import Grooming_1 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/GROOMING/1_kit.png";
import Grooming_2 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/GROOMING/2_brushes.png";
import Grooming_3 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/GROOMING/3_comb.png";
import Grooming_4 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/GROOMING/4_hoof.png";

import Stable_1 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/1_bitGuards.png";
import Stable_2 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/2_flyMask.png";
import Stable_3 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/3_flyVeil.png";
import Stable_4 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/4_hayBag.png";
import Stable_5 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/5_hayNet.png";
import Stable_6 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/6_feedBucket.png";
import Stable_7 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/7_waterTub.png";

import Bit_1 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/1_.snaffleBit.png";
import Bit_2 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/2_pelhamBit.png";
import Bit_3 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/3_doubleJointBit.png";
import Bit_4 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/4_bitGuards.png";

import Control_1 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/CONTROL_EQUIPMENT/1_spurs.png";
import Control_2 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/CONTROL_EQUIPMENT/2_whips.png";

import Harness_1 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/1_harnessSet.png";
import Harness_2 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/2_drivingHarness.png";
import Harness_3 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/3_marathonHarness.png";
import Harness_4 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/4_patentHarness.png";

import RiderClothing_1 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/1_ridingBreeches.png";
import RiderClothing_2 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/2_jodhpurs.png";
import RiderClothing_3 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/3_ridingTights.png";
import RiderClothing_4 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/4_ridingJackets.png";
import RiderClothing_5 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/5_ridingShirts.png";
import RiderClothing_6 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/6_belts.png";

import RiderProtection_1 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/1_helmet.png";
import RiderProtection_2 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/2_bodyProtector.png";
import RiderProtection_3 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/3_gloves.png";
import RiderProtection_4 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/4_chaps.png";
import RiderProtection_5 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/5_shoes.png";

import Bag_1 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/1_saddleBag.png";
import Bag_2 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/2_hornBag.png";
import Bag_3 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/3_backpack.png";
import Bag_4 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/4_messengerBag.png";
import Bag_5 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/5_laptopBag.png";
import Bag_6 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/6_toteBag.png";
import Bag_7 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/7_waistBag.png";
import Bag_8 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/8_wallets.png";
import Bag_9 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/9_wristBands.png";


interface SubcategoryCardProps {
  title: string;
  categorySlug: string;
  subcategorySlug: string;
  onClick?: () => void;
}

// Helper to generate professional one-line descriptions
function getProductDescription(title: string): string {
  const descriptions: Record<string, string> = {
    // Saddles
    'Dressage Saddle': 'Precision-crafted for optimal rider position and horse movement in dressage disciplines',
    'Monoflap Dressage Saddle': 'Streamlined design offering closer contact and enhanced communication',
    'Jumping Saddle': 'Forward-cut design engineered for security and balance over fences',
    'Close Contact Saddle': 'Minimal padding for maximum feel and direct communication with your horse',
    'Eventing / Cross Country Saddle': 'Versatile design combining jumping security with dressage comfort',
    'All Purpose Saddle': 'Multi-discipline versatility for everyday riding and training',
    'Exercise Saddle': 'Lightweight construction ideal for daily training and conditioning',
    'Baby / Pony Saddle': 'Scaled proportions designed specifically for young riders and ponies',
    'Synthetic English Saddle': 'Weather-resistant alternative offering easy maintenance and durability',
    'Trail Saddle': 'Comfort-focused design for extended hours on the trail',
    'Pleasure Saddle': 'Luxurious comfort for leisurely rides and show ring presentations',
    'Barrel Racing Saddle': 'Secure deep seat engineered for high-speed turns and agility',
    'Roping Saddle': 'Reinforced construction built to withstand the demands of ranch work',
    'Ranch Saddle': 'Durable all-day comfort for working cattle and ranch operations',
    'Cutting Saddle': 'Specialized design allowing freedom of movement for cutting maneuvers',
    'Reining Saddle': 'Deep seat and high cantle for precision control in reining patterns',
    'Wade Saddle': 'Traditional working saddle with exceptional balance and durability',
    'Western Show Saddle': 'Ornate craftsmanship combining function with stunning visual appeal',
    'Mexican Western Saddle': 'Authentic traditional styling with intricate hand-tooled details',
    'Polo Saddle': 'Lightweight agile design for fast-paced polo competition',
    'Endurance Saddle': 'Ergonomic construction for rider and horse comfort over long distances',
    'Treeless Saddle': 'Flexible design conforming to your horse\'s unique back shape',
    'Stock Saddle (Australian)': 'Distinctive Australian design for stock work and trail riding',
    'Half-Breed Saddle': 'Unique hybrid combining English and Western saddle features',
    'Trooper Saddle': 'Military-inspired design offering durability and all-day comfort',
    'Vaquera Saddle': 'Traditional Spanish working saddle with elegant styling',
    'Icelandic Saddle': 'Specialized design for the unique gaits of Icelandic horses',
    'Racing Saddle': 'Ultra-lightweight construction for maximum speed and minimal interference',
  };

  // Return specific description or generate a generic professional one
  return descriptions[title] || `Premium ${title.toLowerCase()} crafted with quality materials and expert attention to detail`;
}

const saddleImageMap: Record<string, string> = {
  // English
  "dual-flap-dressage": English_Saddle_1,
  "monoflap-dressage": English_Saddle_2,
  "jumping": English_Saddle_3,
  "close-contact": English_Saddle_4,
  "eventing": English_Saddle_5,
  "all-purpose": English_Saddle_6,
  "exercise": English_Saddle_7,
  "pony": English_Saddle_8,
  "synthetic": English_Saddle_9,

  // Western
  "trail": Western_Saddle_1,
  "pleasure": Western_Saddle_2,
  "barrel": Western_Saddle_3,
  "roping": Western_Saddle_4,
  "ranch": Western_Saddle_5,
  "cutting": Western_Saddle_6,
  "reining": Western_Saddle_7,
  "wade": Western_Saddle_8,
  "show": Western_Saddle_9,
  "mexican": Western_Saddle_10,

  // Speciality
  "polo": Speciality_Saddle_1,
  "endurance": Speciality_Saddle_2,
  "treeless": Speciality_Saddle_3,
  "stock": Speciality_Saddle_4,
  "half-breed": Speciality_Saddle_5,
  "trooper": Speciality_Saddle_6,
  "vaquera": Speciality_Saddle_7,
  "icelandic": Speciality_Saddle_8,
};

const bridleByTypeMap: Record<string, string> = {
  'english-bridle': Bridle_byType_1,
  'dressage-bridle': Bridle_byType_2,
  'jumping-bridle': Bridle_byType_3,
  'snaffle-bridle': Bridle_byType_4,
  'double-bridle': Bridle_byType_5,
  'hunter-bridle': Bridle_byType_6,
  'figure-8-bridle': Bridle_byType_7,
  'anatomical-bridle': Bridle_byType_8,
  'spanish-bridle': Bridle_byType_9,
  'icelandic-bridle': Bridle_byType_10,
  'polo-bridle': Bridle_byType_11,
};

const bridleByMaterialMap: Record<string, string> = {
  'biothane-bridle': Bridle_byMaterial_1,
  'pvc-bridle': Bridle_byMaterial_2,
  'nylon-bridle': Bridle_byMaterial_3,
};

const bridleComponentMap: Record<string, string> = {
  'browband': Bridle_Component_1,
  'crownpiece': Bridle_Component_2,
  'throatlatch': Bridle_Component_3,
  'cheekpieces': Bridle_Component_4,
  'noseband': Bridle_Component_5,
  'flash-strap': Bridle_Component_6,
  'reins': Bridle_Component_7,
};

const halterMap: Record<string, string> = {
  'leather-halter': Halter_1,
  'nylon-halter': Halter_2,
  'rope-halter': Halter_3,
  'pvc-halter': Halter_4,
  'show-halter': Halter_5,
  'horse-head-collar': Halter_6,
};

const leadMap: Record<string, string> = {
  'lead-rope': Lead_1,
  'lead-line': Lead_2,
};

const englishGirthMap: Record<string, string> = {
  'leather-girth': Girth_1,
  'cotton-girth': Girth_2,
  'nylon-girth': Girth_3,
  'elastic-girth': Girth_4,
  'dressage-girth': Girth_5,
  'stud-girth': Girth_6,
};

const westernCinchMap: Record<string, string> = {
  'western-cinch': Cinch_1,
  'back-cinch': Cinch_2,
};

const stirrupsMap: Record<string, string> = {
  'iron-stirrups': Stirrups_1,
  'stainless-steel-stirrups': Stirrups_2,
  'aluminum-stirrups': Stirrups_3,
  'brass-stirrups': Stirrups_4,
  'fibre-plastic-stirrups': Stirrups_5,
  'safety-stirrups': Stirrups_6,
};

const stirrupsAccessoriesMap: Record<string, string> = {
  'stirrup-leathers': Accessory_1,
  'stirrup-pads': Accessory_2,
  'stirrup-belts': Accessory_3,
};

const saddlePadsMap: Record<string, string> = {
  'all-purpose-saddle-pad': Pad_1,
  'dressage-saddle-pad': Pad_2,
  'jumping-saddle-pad': Pad_3,
  'half-pad': Pad_4,
  'bareback-pad': Pad_5,
  'western-saddle-pad': Pad_6,
};

const saddleBlanketsMap: Record<string, string> = {
  'saddle-blanket': Blanket_1,
  'studded-western-blankets': Blanket_2,
};

const breastplatesMartingalesMap: Record<string, string> = {
  'breastplate-english-western': Bp_Mg_1,
  'breast-collar-western': Bp_Mg_2,
  'running-martingale': Bp_Mg_3,
  'standing-martingale': Bp_Mg_4,
};

const horseLegProtectionMap: Record<string, string> = {
  'tendon-boots': Leg_1,
  'fetlock-boots': Leg_2,
  'bell-boots': Leg_3,
  'ankle-boots': Leg_4,
  'leg-wraps': Leg_5,
  'bandages': Leg_6,
};

const rugsBlanketsMap: Record<string, string> = {
  'summer-rugs': Rug_1,
  'winter-rugs': Rug_2,
  'stable-rugs': Rug_3,
  'turnout-rugs': Rug_4,
  'fly-rugs': Rug_5,
  'fleece-rugs': Rug_6,
  'horse-blankets': Rug_7,
};

const horseClothingMap: Record<string, string> = {
  'horse-clothing': Clothing_1,
};

const horseCareGroomingMap: Record<string, string> = {
  'grooming-kits': Grooming_1,
  'grooming-brushes': Grooming_2,
  'curry-comb': Grooming_3,
  'hoof-pick': Grooming_4,
};

const horseCareStableAccessoriesMap: Record<string, string> = {
  'bit-guards': Stable_1,
  'fly-mask': Stable_2,
  'fly-veil': Stable_3,
  'hay-bag': Stable_4,
  'hay-net': Stable_5,
  'feed-bucket': Stable_6,
  'water-tub': Stable_7,
};

const bitsMap: Record<string, string> = {
  'snaffle-bit': Bit_1,
  'pelham-bit': Bit_2,
  'double-ring-bit': Bit_3,
  'bit-guards-bits': Bit_4,
};

const controlGearMap: Record<string, string> = {
  'spurs': Control_1,
  'whips-leather-plastic': Control_2,
};

const harnessDrivingMap: Record<string, string> = {
  'horse-harness-set': Harness_1,
  'driving-harness-single-pair': Harness_2,
  'marathon-harness': Harness_3,
  'patent-harness': Harness_4,
};

const riderClothingMap: Record<string, string> = {
  'riding-breeches': RiderClothing_1,
  'jodhpurs': RiderClothing_2,
  'riding-tights': RiderClothing_3,
  'riding-jackets': RiderClothing_4,
  'riding-shirts': RiderClothing_5,
  'rider-belts': RiderClothing_6,
};

const riderProtectionMap: Record<string, string> = {
  'riding-helmets': RiderProtection_1,
  'body-protectors': RiderProtection_2,
  'riding-gloves': RiderProtection_3,
  'riding-chaps-half-full': RiderProtection_4,
  'riding-boots-long-ankle': RiderProtection_5,
};

const bagsLeatherGoodsMap: Record<string, string> = {
  'saddle-bags': Bag_1,
  'horn-bags': Bag_2,
  'backpacks': Bag_3,
  'messenger-bags': Bag_4,
  'laptop-bags': Bag_5,
  'tote-bags': Bag_6,
  'waist-bags': Bag_7,
  'wallets': Bag_8,
  'wrist-bands': Bag_9,
};


export default function SubcategoryCard({ title, categorySlug, subcategorySlug, onClick }: SubcategoryCardProps) {
  const [imageError, setImageError] = useState(false);
  const { ref: cardRef, isRevealed } = useRevealOnce(0.1);
  const prefersReducedMotion = useReducedMotion();
  const description = getProductDescription(title);
  let productImage: string | undefined;
  if (categorySlug === 'saddles') {
    productImage = saddleImageMap[subcategorySlug];
  } else if (categorySlug === 'bridles-headgear') {
    productImage = bridleByTypeMap[subcategorySlug] || bridleByMaterialMap[subcategorySlug] || bridleComponentMap[subcategorySlug];
  } else if (categorySlug === 'halters-leads') {
    productImage = halterMap[subcategorySlug] || leadMap[subcategorySlug];
  } else if (categorySlug === 'girths-cinches') {
    productImage = englishGirthMap[subcategorySlug] || westernCinchMap[subcategorySlug];
  } else if (categorySlug === 'stirrups-accessories') {
    productImage = stirrupsMap[subcategorySlug] || stirrupsAccessoriesMap[subcategorySlug];
  } else if (categorySlug === 'saddle-pads-blankets') {
    productImage = saddlePadsMap[subcategorySlug] || saddleBlanketsMap[subcategorySlug];
  } else if (categorySlug === 'breastplates-martingales') {
    productImage = breastplatesMartingalesMap[subcategorySlug];
  } else if (categorySlug === 'horse-leg-protection') {
    productImage = horseLegProtectionMap[subcategorySlug];
  } else if (categorySlug === 'horse-rugs-clothing') {
    productImage = rugsBlanketsMap[subcategorySlug] || horseClothingMap[subcategorySlug];
  } else if (categorySlug === 'horse-care-stable-accessories') {
    productImage = horseCareGroomingMap[subcategorySlug] || horseCareStableAccessoriesMap[subcategorySlug];
  } else if (categorySlug === 'bits-spurs-control-gear') {
    productImage = bitsMap[subcategorySlug] || controlGearMap[subcategorySlug];
  } else if (categorySlug === 'harness-driving-equipment') {
    productImage = harnessDrivingMap[subcategorySlug];
  } else if (categorySlug === 'rider-equipment') {
    productImage = riderClothingMap[subcategorySlug] || riderProtectionMap[subcategorySlug];
  } else if (categorySlug === 'bags-leather-goods') {
    productImage = bagsLeatherGoodsMap[subcategorySlug];
  }

  const handleClick = () => {
    if (onClick) {
      console.log('SubcategoryCard click', { title, categorySlug, subcategorySlug, productImage });
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className={`product-luxury-card group relative overflow-hidden cursor-pointer ${!prefersReducedMotion && !isRevealed ? 'product-card-reveal' : ''
        } ${!prefersReducedMotion && isRevealed ? 'product-card-revealed' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      {/* Image Container with Zoom Effect */}
      <div className="aspect-[4/3] overflow-hidden" style={{ background: 'rgba(199, 154, 82, 0.05)' }}>
        <img
          src={
            imageError || !productImage
              ? (categorySlug === 'saddles'
                  ? English_Saddle_1
                  : categorySlug === 'bridles-headgear'
                  ? Bridle_byType_1
                  : categorySlug === 'halters-leads'
                  ? Halter_1
                  : categorySlug === 'girths-cinches'
                  ? Girth_1
                  : categorySlug === 'stirrups-accessories'
                  ? Stirrups_1
                  : categorySlug === 'saddle-pads-blankets'
                  ? Pad_1
                  : categorySlug === 'breastplates-martingales'
                  ? Bp_Mg_1
                  : categorySlug === 'horse-leg-protection'
                  ? Leg_1
                  : categorySlug === 'horse-rugs-clothing'
                  ? Rug_1
                  : categorySlug === 'horse-care-stable-accessories'
                  ? Grooming_1
                  : categorySlug === 'bits-spurs-control-gear'
                  ? Bit_1
                  : categorySlug === 'harness-driving-equipment'
                  ? Harness_1
                  : categorySlug === 'rider-equipment'
                  ? RiderClothing_1
                  : categorySlug === 'bags-leather-goods'
                  ? Bag_1
                  : English_Saddle_1)
              : productImage
          }
          alt={title}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-3 text-center text-lg md:text-xl font-serif font-semibold text-foreground product-luxury-card-title">
          {title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
