import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearch } from '@tanstack/react-router';
import { productCategories, type ProductType } from '../data/productTaxonomy';
import { toSlug } from '../utils/slug';
import { ArrowLeft } from 'lucide-react';
import SubcategoryCard from '../components/SubcategoryCard';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import PageMeta from '../components/PageMeta';

// Saddle images
import English_Saddle_1 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/1_dual_dressage.jpg";
import English_Saddle_2 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/2_mono_dressage.jpg";
import English_Saddle_3 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/3_jumping.jpg";
import English_Saddle_4 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/4_close_contact.jpg";
import English_Saddle_5 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/5_eventing.jpg";
import English_Saddle_6 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/6_all_purpose.jpg";
import English_Saddle_7 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/7_exercise.jpg";
import English_Saddle_8 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/8_pony.jpg";
import English_Saddle_9 from "../assets/generated/SUBCATEGORY/SADDLE/ENGLISH_SADDLE/9_synthetic.jpg";

import Western_Saddle_1 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/1_trail.jpg";
import Western_Saddle_2 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/2_pleasure.jpg";
import Western_Saddle_3 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/3_barrel.jpg";
import Western_Saddle_4 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/4_roping.jpg";
import Western_Saddle_5 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/5_ranch.jpg";
import Western_Saddle_6 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/6_cutting.jpg";
import Western_Saddle_7 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/7_reining.jpg";
import Western_Saddle_8 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/8_wade.jpg";
import Western_Saddle_9 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/9_show.jpg";
import Western_Saddle_10 from "../assets/generated/SUBCATEGORY/SADDLE/WESTERN_SADDLE/10_mexican.jpg";

import Speciality_Saddle_1 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/1_polo.jpg";
import Speciality_Saddle_2 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/2_endurance.jpg";
import Speciality_Saddle_3 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/3_treeless.jpg";
import Speciality_Saddle_4 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/4_stock.jpg";
import Speciality_Saddle_5 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/5_half_breed.jpg";
import Speciality_Saddle_6 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/6_trooper.jpg";
import Speciality_Saddle_7 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/7_vaquera.jpg";
import Speciality_Saddle_8 from "../assets/generated/SUBCATEGORY/SADDLE/SPECIALITY_SADDLE/8_icelandic.jpg";

// Bridle images
import Bridle_byType_1 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/1_english.jpg";
import Bridle_byType_2 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/2_dressage.jpg";
import Bridle_byType_3 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/3_jumping.jpg";
import Bridle_byType_4 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/4_snaffle.jpg";
import Bridle_byType_5 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/5_double.jpg";
import Bridle_byType_6 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/6_hunter.jpg";
import Bridle_byType_7 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/7_fig8.jpg";
import Bridle_byType_8 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/8_anatomical.jpg";
import Bridle_byType_9 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/9_spanish.jpg";
import Bridle_byType_10 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/10_icelandic.jpg";
import Bridle_byType_11 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_TYPE/11_polo.jpg";

import Bridle_byMaterial_1 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_MATERIAL/1_biothane.jpg";
import Bridle_byMaterial_2 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_MATERIAL/2_pvc.jpg";
import Bridle_byMaterial_3 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/BY_MATERIAL/3_nylon.jpg";

import Bridle_Component_1 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/1_browband.jpg";
import Bridle_Component_2 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/2_crownpiece.jpg";
import Bridle_Component_3 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/3_throatlatch.jpg";
import Bridle_Component_4 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/4_cheekpiece.jpg";
import Bridle_Component_5 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/5_noseband.jpg";
import Bridle_Component_6 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/6_flashstrap.jpg";
import Bridle_Component_7 from "../assets/generated/SUBCATEGORY/BRIDLES_HEADGEAR/COMPONENTS/7_reins.jpg";


// Halters & Leads images
import Halter_1 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/1_leather.jpg";
import Halter_2 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/2_nylon.jpg";
import Halter_3 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/3_rope.jpg";
import Halter_4 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/4_pvc.jpg";
import Halter_5 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/5_show.jpg";
import Halter_6 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/6_head_collar.jpg";

import Lead_1 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/LEADS/1_rope.jpg";
import Lead_2 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/LEADS/2_line.jpg";

// Girth & Cinches images
import Girth_1 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/1_leather.jpg";
import Girth_2 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/2_cotton.jpg";
import Girth_3 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/3_nylon.jpg";
import Girth_4 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/4_elastic.jpg";
import Girth_5 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/5_dressage.jpg";
import Girth_6 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/6_stud.jpg";

import Cinch_1 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/CINCHES/1_western.jpg";
import Cinch_2 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/CINCHES/2_back.jpg";

// Stirrups & Accessories images
import Stirrups_1 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/1_iron.jpg";
import Stirrups_2 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/2_steel.jpg";
import Stirrups_3 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/3_aluminium.jpg";
import Stirrups_4 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/4_brass.jpg";
import Stirrups_5 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/5_plastic.jpg";
import Stirrups_6 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/6_safety.jpg";

import Accessory_1 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/1_stirrup_leather.jpg";
import Accessory_2 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/2_stirrup_pads.jpg";
import Accessory_3 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/3_stirrup_belt.jpg";

// Saddle Pads & Blankets images
import Pad_1 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/1_all_purpose.jpg";
import Pad_2 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/2_dressage.jpg";
import Pad_3 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/3_jumping.jpg";
import Pad_4 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/4_Half.jpg";
import Pad_5 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/5_bareback.jpg";
import Pad_6 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/6_Western.jpg";

import Blanket_1 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/BLANKETS/1_western.jpg";
import Blanket_2 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/BLANKETS/2_studded.jpg";

// Breastplates & Martingales images
import Bp_Mg_1 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/1_breastplate.jpg";
import Bp_Mg_2 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/2_breastcollar.jpg";
import Bp_Mg_3 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/3_running.jpg";
import Bp_Mg_4 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/4_standing.jpg";

// Horse Leg Protection images
import Leg_1 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/1_tendonboot.jpg";
import Leg_2 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/2_fetlockboot.jpg";
import Leg_3 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/3_bellboot.jpg";
import Leg_4 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/4_ankleboot.jpg";
import Leg_5 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/5_wraps.jpg";
import Leg_6 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/6_bandage.jpg";

// Rugs, Blankets and Clothing images
import Rug_1 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/1_summer.jpg";
import Rug_2 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/2_winter.jpg";
import Rug_3 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/3_stable.jpg";
import Rug_4 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/4_turnout.jpg";
import Rug_5 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/5_fly.jpg";
import Rug_6 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/6_fleece.jpg";
import Rug_7 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/7_blanket.jpg";

import Clothing_1 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/CLOTHING/1_clothing.jpg";

// Horse Care & Stable Accessories images
import Grooming_1 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/GROOMING/1_kit.jpg";
import Grooming_2 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/GROOMING/2_brushes.jpg";
import Grooming_3 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/GROOMING/3_comb.jpg";
import Grooming_4 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/GROOMING/4_hoof.jpg";

import Stable_1 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/1_bitGuards.jpg";
import Stable_2 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/2_flyMask.jpg";
import Stable_3 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/3_flyVeil.jpg";
import Stable_4 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/4_hayBag.jpg";
import Stable_5 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/5_hayNet.jpg";
import Stable_6 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/6_feedBucket.jpg";
import Stable_7 from "../assets/generated/SUBCATEGORY/HORSE_CARE_STABLE/STABLE_ACCESSORIES/7_waterTub.jpg";

// Bits, Spurs & Control Gear images
import Bit_1 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/1_.snaffleBit.jpg";
import Bit_2 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/2_pelhamBit.jpg";
import Bit_3 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/3_doubleJointBit.jpg";
import Bit_4 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/4_bitGuards.jpg";

import Control_1 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/CONTROL_EQUIPMENT/1_spurs.jpg";
import Control_2 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/CONTROL_EQUIPMENT/2_whips.jpg";

// Harness & Driving Equipment images
import Harness_1 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/1_harnessSet.jpg";
import Harness_2 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/2_drivingHarness.jpg";
import Harness_3 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/3_marathonHarness.jpg";
import Harness_4 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/4_patentHarness.jpg";

// Rider Equipment images
import RiderClothing_1 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/1_ridingBreeches.jpg";
import RiderClothing_2 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/2_jodhpurs.jpg";
import RiderClothing_3 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/3_ridingTights.jpg";
import RiderClothing_4 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/4_ridingJackets.jpg";
import RiderClothing_5 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/5_ridingShirts.jpg";
import RiderClothing_6 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_CLOTHING/6_belts.jpg";

import RiderProtection_1 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/1_helmet.jpg";
import RiderProtection_2 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/2_bodyProtector.jpg";
import RiderProtection_3 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/3_gloves.jpg";
import RiderProtection_4 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/4_chaps.jpg";
import RiderProtection_5 from "../assets/generated/SUBCATEGORY/RIDER_EQUIPMENTS/RIDER_PROTECTION/5_shoes.jpg";

// Bags & Leather Goods images
import Bag_1 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/1_saddleBag.jpg";
import Bag_2 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/2_hornBag.jpg";
import Bag_3 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/3_backpack.jpg";
import Bag_4 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/4_messengerBag.jpg";
import Bag_5 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/5_laptopBag.jpg";
import Bag_6 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/6_toteBag.jpg";
import Bag_7 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/7_waistBag.jpg";
import Bag_8 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/8_wallets.jpg";
import Bag_9 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/9_wristBands.jpg";

const bridleImageMapByType: Record<string, string> = {
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

const bridleImageMapByMaterial: Record<string, string> = {
  'biothane-bridle': Bridle_byMaterial_1,
  'pvc-bridle': Bridle_byMaterial_2,
  'nylon-bridle': Bridle_byMaterial_3,
};

const bridleImageMapComponents: Record<string, string> = {
  'browband': Bridle_Component_1,
  'crownpiece': Bridle_Component_2,
  'throatlatch': Bridle_Component_3,
  'cheekpieces': Bridle_Component_4,
  'noseband': Bridle_Component_5,
  'flash-strap': Bridle_Component_6,
  'reins': Bridle_Component_7,
};


const halterImageMap: Record<string, string> = {
  'leather-halter': Halter_1,
  'nylon-halter': Halter_2,
  'rope-halter': Halter_3,
  'pvc-halter': Halter_4,
  'show-halter': Halter_5,
  'horse-head-collar': Halter_6,
};

const leadImageMap: Record<string, string> = {
  'lead-rope': Lead_1,
  'lead-line': Lead_2,
};

const englishGirthImageMap: Record<string, string> = {
  'leather-girth': Girth_1,
  'cotton-girth': Girth_2,
  'nylon-girth': Girth_3,
  'elastic-girth': Girth_4,
  'dressage-girth': Girth_5,
  'stud-girth': Girth_6,
};

const westernCinchImageMap: Record<string, string> = {
  'western-cinch': Cinch_1,
  'back-cinch': Cinch_2,
};

const stirrupsImageMap: Record<string, string> = {
  'iron-stirrups': Stirrups_1,
  'stainless-steel-stirrups': Stirrups_2,
  'aluminum-stirrups': Stirrups_3,
  'brass-stirrups': Stirrups_4,
  'fibre-plastic-stirrups': Stirrups_5,
  'safety-stirrups': Stirrups_6,
};

const stirrupsAccessoriesImageMap: Record<string, string> = {
  'stirrup-leathers': Accessory_1,
  'stirrup-pads': Accessory_2,
  'stirrup-belts': Accessory_3,
};

const saddlePadsImageMap: Record<string, string> = {
  'all-purpose-saddle-pad': Pad_1,
  'dressage-saddle-pad': Pad_2,
  'jumping-saddle-pad': Pad_3,
  'half-pad': Pad_4,
  'bareback-pad': Pad_5,
  'western-saddle-pad': Pad_6,
};

const saddleBlanketsImageMap: Record<string, string> = {
  'saddle-blanket': Blanket_1,
  'studded-western-blankets': Blanket_2,
};

const breastplatesMartingalesImageMap: Record<string, string> = {
  'breastplate-english-western': Bp_Mg_1,
  'breast-collar-western': Bp_Mg_2,
  'running-martingale': Bp_Mg_3,
  'standing-martingale': Bp_Mg_4,
};

const horseLegProtectionImageMap: Record<string, string> = {
  'tendon-boots': Leg_1,
  'fetlock-boots': Leg_2,
  'bell-boots': Leg_3,
  'ankle-boots': Leg_4,
  'leg-wraps': Leg_5,
  'bandages': Leg_6,
};

const rugsBlanketsImageMap: Record<string, string> = {
  'summer-rugs': Rug_1,
  'winter-rugs': Rug_2,
  'stable-rugs': Rug_3,
  'turnout-rugs': Rug_4,
  'fly-rugs': Rug_5,
  'fleece-rugs': Rug_6,
  'horse-blankets': Rug_7,
};

const horseClothingImageMap: Record<string, string> = {
  'horse-clothing': Clothing_1,
};

const horseCareGroomingImageMap: Record<string, string> = {
  'grooming-kits': Grooming_1,
  'grooming-brushes': Grooming_2,
  'curry-comb': Grooming_3,
  'hoof-pick': Grooming_4,
};

const horseCareStableAccessoriesImageMap: Record<string, string> = {
  'bit-guards': Stable_1,
  'fly-mask': Stable_2,
  'fly-veil': Stable_3,
  'hay-bag': Stable_4,
  'hay-net': Stable_5,
  'feed-bucket': Stable_6,
  'water-tub': Stable_7,
};

const bitsImageMap: Record<string, string> = {
  'snaffle-bit': Bit_1,
  'pelham-bit': Bit_2,
  'double-ring-bit': Bit_3,
  'bit-guards-bits': Bit_4,
};

const controlGearImageMap: Record<string, string> = {
  'spurs': Control_1,
  'whips-leather-plastic': Control_2,
};

const harnessDrivingImageMap: Record<string, string> = {
  'horse-harness-set': Harness_1,
  'driving-harness-single-pair': Harness_2,
  'marathon-harness': Harness_3,
  'patent-harness': Harness_4,
};

const riderClothingImageMap: Record<string, string> = {
  'riding-breeches': RiderClothing_1,
  'jodhpurs': RiderClothing_2,
  'riding-tights': RiderClothing_3,
  'riding-jackets': RiderClothing_4,
  'riding-shirts': RiderClothing_5,
  'rider-belts': RiderClothing_6,
};

const riderProtectionImageMap: Record<string, string> = {
  'riding-helmets': RiderProtection_1,
  'body-protectors': RiderProtection_2,
  'riding-gloves': RiderProtection_3,
  'riding-chaps-half-full': RiderProtection_4,
  'riding-boots-long-ankle': RiderProtection_5,
};

const bagsLeatherGoodsImageMap: Record<string, string> = {
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

export default function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams({
    from: '/products/$categorySlug/$subcategorySlug'
  });
  const search = useSearch({ from: '/products/$categorySlug/$subcategorySlug' });
  const preselectedProductSlug = ((search as { product?: string })?.product || '').toLowerCase();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    description: string;
    features: string[];
    image: string;
  } | null>(null);

  const category = productCategories.find((cat) => cat.slug === categorySlug);
  const subcategory = category?.subcategories.find(
    (sub) => toSlug(sub.name) === subcategorySlug
  );

  if (!category || !subcategory) {
    return (
      <div className="product-page-wrapper py-32 md:py-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 font-serif font-bold text-foreground">
              Subcategory Not Found
            </h1>
            <p className="mb-10 text-lg md:text-xl text-muted-foreground leading-relaxed">
              The subcategory you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate({ to: '/products' })}
              className="btn-primary"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSendInquiry = () => {
    navigate({ to: '/contact', search: { category: category.name } });
  };

  const handleProductClick = (productName: string, productSlug?: string) => {
    const product = getProductDetails(productName, categorySlug, productSlug);
    setSelectedProduct(product);
  };

  useEffect(() => {
    if (!preselectedProductSlug || !subcategory) return;

    const matchedProduct = subcategory.productTypes.find(
      (productType) => getProductSlug(productType).toLowerCase() === preselectedProductSlug
    );

    if (!matchedProduct) return;

    setSelectedProduct(getProductDetails(matchedProduct.name, categorySlug, preselectedProductSlug));
  }, [categorySlug, preselectedProductSlug, subcategory]);

  const handleCloseModal = () => {
    setSelectedProduct(null);

    if (preselectedProductSlug) {
      navigate({
        to: '/products/$categorySlug/$subcategorySlug',
        params: { categorySlug, subcategorySlug },
        search: {},
      });
    }
  };

  const subcategoryHeading =
    subcategory.name === category.name
      ? subcategory.name
      : `${subcategory.name} — ${category.name}`;

  return (
    <div className="product-page-wrapper pb-32 md:pb-40">
      <PageMeta
        title={subcategoryHeading}
        description={`${subcategory.name} from Meghraj Exports' ${category.name} range — part of our equestrian and saddlery manufacturing line from Punjab, India.`}
        path={`/products/${categorySlug}/${subcategorySlug}`}
      />

      {/* Category Banner Image with Cinematic Overlay */}
      <div className="relative h-72 md:h-96 overflow-hidden product-banner-fade-in">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 product-banner-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground text-white product-banner-heading">
              {subcategory.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          {/* Navigation and CTA */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => navigate({ to: '/products/$categorySlug', params: { categorySlug } })}
              className="inline-flex items-center text-muted-foreground transition-colors hover:text-primary font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {category.name}
            </button>
            <button
              onClick={handleSendInquiry}
              className="btn-primary"
            >
              Send Enquiry
            </button>
          </div>

          {/* Products Grid */}
          <div>
            <div className="mb-10 flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
                Products
              </h2>
              <div className="flex-1 gold-divider-muted" />
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subcategory.productTypes.map((productType, index) => {
                const effectiveSlug = getProductSlug(productType);
                return (
                  <SubcategoryCard
                    key={index}
                    title={productType.name}
                    categorySlug={categorySlug}
                    subcategorySlug={effectiveSlug}
                    onClick={() => handleProductClick(productType.name, effectiveSlug)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickViewModal
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
          product={selectedProduct}
          onSendInquiry={handleSendInquiry}
        />
      )}
    </div>
  );
}

// Helper to normalize product slug
function getProductSlug(productType: ProductType): string {
  return productType.slug || toSlug(productType.name);
}

// Helper to generate product details for modal
function getProductDetails(productName: string, categorySlug: string, productSlug?: string): {
  name: string;
  description: string;
  features: string[];
  image: string;
} {
  // Get image based on slug and category
  let imageSource = English_Saddle_1;
  if (categorySlug === 'saddles') {
    imageSource = English_Saddle_1;
    if (productSlug && saddleImageMap[productSlug]) {
      imageSource = saddleImageMap[productSlug];
    }
  } else if (categorySlug === 'bridles-headgear') {
    imageSource = Bridle_byType_1;
    if (productSlug) {
      imageSource = bridleImageMapByType[productSlug]
        || bridleImageMapByMaterial[productSlug]
        || bridleImageMapComponents[productSlug]
        || halterImageMap[productSlug]
        || leadImageMap[productSlug]
        || imageSource;
    }
  } else if (categorySlug === 'halters-leads') {
    imageSource = Halter_1;
    if (productSlug) {
      imageSource = halterImageMap[productSlug] || leadImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'girths-cinches') {
    imageSource = Girth_1;
    if (productSlug) {
      imageSource = englishGirthImageMap[productSlug] || westernCinchImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'stirrups-accessories') {
    imageSource = Stirrups_1;
    if (productSlug) {
      imageSource = stirrupsImageMap[productSlug] || stirrupsAccessoriesImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'saddle-pads-blankets') {
    imageSource = Pad_1;
    if (productSlug) {
      imageSource = saddlePadsImageMap[productSlug] || saddleBlanketsImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'breastplates-martingales') {
    imageSource = Bp_Mg_1;
    if (productSlug) {
      imageSource = breastplatesMartingalesImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'horse-leg-protection') {
    imageSource = Leg_1;
    if (productSlug) {
      imageSource = horseLegProtectionImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'horse-rugs-clothing') {
    imageSource = Rug_1;
    if (productSlug) {
      imageSource = rugsBlanketsImageMap[productSlug] || horseClothingImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'horse-care-stable-accessories') {
    imageSource = Grooming_1;
    if (productSlug) {
      imageSource = horseCareGroomingImageMap[productSlug] || horseCareStableAccessoriesImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'bits-spurs-control-gear') {
    imageSource = Bit_1;
    if (productSlug) {
      imageSource = bitsImageMap[productSlug] || controlGearImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'harness-driving-equipment') {
    imageSource = Harness_1;
    if (productSlug) {
      imageSource = harnessDrivingImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'rider-equipment') {
    imageSource = RiderClothing_1;
    if (productSlug) {
      imageSource = riderClothingImageMap[productSlug] || riderProtectionImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'bags-leather-goods') {
    imageSource = Bag_1;
    if (productSlug) {
      imageSource = bagsLeatherGoodsImageMap[productSlug] || imageSource;
    }
  }

  const descriptions: Record<string, string> = {
    // Saddles
    'Dressage Saddle': 'Our Dressage Saddles are expertly handcrafted to support correct rider alignment and refined communication between horse and rider. Engineered for balance, stability, and close contact, these saddles promote a classical dressage position while ensuring maximum comfort for long training sessions and competitive performance. Built with precision shaping and superior leather quality, the saddle allows unrestricted shoulder movement for the horse while offering a secure, centered seat for the rider.',
    'Monoflap Dressage Saddle': 'Engineered for riders who demand precision and refined contact, our Monoflap Dressage Saddle delivers an exceptionally close connection between horse and rider. The single-flap construction reduces bulk beneath the leg, enhancing feel, stability, and subtle communication during advanced dressage movements. Designed for professional training and competitive performance, this saddle ensures optimal balance while allowing unrestricted shoulder movement for the horse.',
    'Jumping Saddle': 'Designed for precision, balance, and confidence over fences, our Jumping Saddle is crafted to support the forward riding position required for show jumping and cross-country performance. The forward-cut flaps and strategically placed knee blocks provide secure leg support, allowing the rider to stay centered during take-off and landing. Constructed from premium-grade leather with reinforced stress points, this saddle is built to withstand intensive training and competitive environments.',
    'Close Contact Saddle': 'Crafted for riders who value precision and responsiveness, our Close Contact Saddle delivers an exceptional connection between horse and rider. Designed with a flatter seat and minimal bulk beneath the leg, it allows subtle aids, improved balance, and refined control during jumping and equitation work. The streamlined construction enhances rider feel while maintaining comfort and stability through training and competition.',
    'Eventing / Cross Country Saddle': 'Engineered for the demands of three-phase competition, our Eventing / Cross Country Saddle delivers the perfect balance of security, flexibility, and endurance. Designed to support riders through dressage precision, show jumping control, and the intensity of cross-country terrain, this saddle offers stability without restricting movement. Built with reinforced construction and performance-focused design, it ensures durability under rigorous training and competitive conditions.',
    'All Purpose Saddle': 'Designed for versatility and everyday performance, our All Purpose Saddle seamlessly adapts to flatwork, light jumping, and leisure riding. The balanced seat and moderately forward flaps provide a secure yet flexible position, making it ideal for riders who enjoy a variety of disciplines. Built for comfort and durability, this saddle offers dependable performance whether in the arena or out on the trail.',
    'Exercise Saddle': 'Designed for daily training and conditioning, our Exercise Saddle offers a lightweight and practical solution for consistent performance work. Its streamlined construction reduces bulk while maintaining rider stability and horse comfort during extended sessions. Built to endure frequent use, this saddle combines durability with balanced support — making it ideal for schooling, fitness routines, and everyday riding programs.',
    'Baby / Pony Saddle': 'Thoughtfully designed for young riders and ponies, our Baby / Pony Saddle offers the correct proportions for balanced riding and growing confidence. Scaled to ensure proper fit, it promotes a secure seat and stable leg position while maintaining comfort for the pony. Crafted with the same attention to quality as our full-sized saddles, this model is built to withstand regular use and can be reliably passed down through multiple young riders.',
    'Synthetic English Saddle': 'Designed for practicality and everyday performance, our Synthetic English Saddle offers a lightweight, weather-resistant alternative without compromising comfort or structure. Ideal for schooling, riding schools, and leisure riders, this saddle is easy to maintain and built to perform in varying conditions. The moisture-resistant material ensures durability through regular use, making it a dependable choice for riders seeking convenience and reliability.',
    'Trail Saddle': 'Built for endurance and all-day comfort, our Trail Saddle is designed to support riders during extended rides across varied terrain. The deep, secure seat enhances stability, while the balanced construction reduces fatigue for both horse and rider over long hours in the saddle. Equipped with practical attachment points for carrying gear, this saddle combines comfort, functionality, and durability — making it ideal for trail riding, trekking, and outdoor exploration.',
    'Pleasure Saddle': 'Designed to blend comfort with refined presentation, our Pleasure Saddle offers a smooth, balanced ride ideal for leisure riding and show ring performance. The thoughtfully contoured seat and elegant profile enhance rider posture while delivering exceptional comfort during extended rides. Crafted with attention to detail and sophisticated styling, this saddle brings together functionality and visual appeal — ensuring every ride feels effortless and distinguished.',
    'Barrel Racing Saddle': 'Engineered for speed, balance, and control, our Barrel Racing Saddle is designed to keep riders secure during fast accelerations and tight, high-impact turns. The deep seat and high cantle provide maximum stability, allowing riders to stay centered and confident through every run. Built with reinforced construction and precision craftsmanship, this saddle is made to withstand the intense demands of competitive barrel racing while maintaining comfort and responsiveness.',
    'Roping Saddle': 'Built for strength and control, our Roping Saddle is engineered to withstand the intense demands of ranch work and competitive roping. Designed with a sturdy tree and reinforced rigging, it provides the stability and durability required when handling powerful pulls. The balanced seat and secure positioning allow riders to maintain control and confidence, whether heading, heeling, or working cattle in demanding conditions.',
    'Ranch Saddle': 'Built for long hours and demanding ranch work, our Ranch Saddle combines durability, comfort, and dependable performance. Designed to handle daily tasks from cattle work to open-range riding, it offers a secure seat and balanced structure for extended use. Crafted with reinforced construction and practical design features, this saddle delivers long-lasting reliability while ensuring comfort for both horse and rider throughout the workday.',
    'Cutting Saddle': 'Designed for precision and responsiveness, our Cutting Saddle is built to support the rider during quick stops, sharp turns, and close cattle work. The deep pocket seat and forward-hung stirrups promote balance and freedom of movement, allowing riders to stay centered while the horse works independently. Crafted for competitive performance and demanding ranch environments, this saddle delivers stability, close contact, and long-lasting durability.',
    'Reining Saddle': 'Engineered for precision and fluid movement, our Reining Saddle is designed to support riders through sliding stops, fast spins, and controlled transitions. The close-contact fit and balanced seat promote stability while allowing subtle cues and refined communication with the horse. Built for performance and durability, this saddle delivers the control and comfort required for competitive reining and intensive training sessions.',
    'Wade Saddle': 'Rooted in traditional ranch craftsmanship, our Wade Saddle is built for durability, balance, and dependable working performance. Known for its distinctive wood post horn and clean, functional design, the Wade style offers strength and simplicity trusted by working cowboys and ranch professionals. Designed for long hours in the saddle, it provides a secure, comfortable seat and a sturdy build capable of handling demanding ranch tasks.',
    'Western Show Saddle': 'Designed to make a statement in the show ring, our Western Show Saddle combines refined craftsmanship with eye-catching detail. The elegant profile, intricate tooling, and polished finish create a distinguished appearance while maintaining rider balance and comfort. Crafted for presentation and performance, this saddle offers a secure seat and balanced structure, ensuring confidence and poise under competitive conditions.',
    'Mexican Western Saddle': 'Inspired by traditional craftsmanship and bold design heritage, our Mexican Western Saddle combines striking visual detail with dependable performance. Known for its distinctive tooling, decorative accents, and commanding profile, this saddle is crafted to stand out while delivering rider stability and comfort. Built with durable construction and balanced structure, it is suitable for ranch work, traditional riding styles, and show presentation.',
    'Polo Saddle': 'Designed for speed, agility, and precision, our Polo Saddle is crafted to meet the fast-paced demands of competitive polo. Its lightweight construction and close-contact design allow riders to maintain balance and control during rapid turns, quick accelerations, and powerful strokes. Built for performance and durability, this saddle ensures stability without restricting movement — making it ideal for both professional and training environments.',
    'Endurance Saddle': 'Engineered for long-distance comfort and efficiency, our Endurance Saddle is designed to reduce fatigue during extended rides. Its lightweight construction and balanced structure promote proper rider alignment while ensuring even weight distribution for the horse. Built for demanding terrain and prolonged use, this saddle delivers stability, breathability, and durability — making it ideal for competitive endurance riding and trail challenges.',
    'Treeless Saddle': 'Designed to promote flexibility and natural movement, our Treeless Saddle offers a close-contact riding experience without the rigid structure of a traditional tree. The adaptive design allows the saddle to conform more closely to the horse’s back, enhancing comfort and freedom of motion. Lightweight and responsive, it provides riders with improved feel and communication while maintaining balanced support for various riding disciplines.',
    'Stock Saddle (Australian)': 'Designed for stability and security across varied terrain, our Australian Stock Saddle offers exceptional rider support for long hours in the saddle. Featuring a deep seat and prominent knee pads (poleys), it provides enhanced balance and confidence during demanding rides. Built for durability and comfort, this saddle is ideal for stock work, trail riding, and endurance-style riding where stability and rider control are essential.',
    'Half-Breed Saddle': 'Combining the security of a stock saddle with the versatility of a traditional riding saddle, our Half-Breed Saddle offers stability, balance, and all-day comfort. Designed with supportive knee pads and a close-contact feel, it provides riders with confidence across varied terrain and working conditions. Its balanced construction and durable build make it ideal for stock work, trail riding, and everyday riding environments where control and comfort are equally important.',
    'Trooper Saddle': 'Inspired by traditional military-style design, our Trooper Saddle is built for stability, endurance, and long hours in the saddle. Featuring a secure seat and supportive structure, it provides rider confidence across varied terrain and extended rides. Designed for durability and balanced weight distribution, this saddle delivers reliable performance whether used for trekking, patrol-style riding, or everyday work.',
    'Vaquera Saddle': 'Inspired by traditional Spanish riding heritage, our Vaquera Saddle blends refined craftsmanship with functional design. Characterized by its deep seat and distinctive profile, it provides exceptional rider stability and balance for working and classical riding disciplines. Designed for comfort during extended hours in the saddle, this model offers both elegance and durability — making it suitable for traditional riding styles, exhibitions, and working environments.',
    'Icelandic Saddle': 'Designed specifically to support the unique gaits of the Icelandic horse, our Icelandic Saddle offers a forward-balanced seat and lightweight construction for optimal rider alignment and comfort. The design promotes freedom of shoulder movement while allowing the rider to maintain a centered position during tolting and other smooth gait transitions. Crafted for performance and long-distance comfort, this saddle delivers close contact, stability, and durability suited to both training and competitive environments.',
    'English Bridle': 'Crafted for precision, comfort, and refined control, our English Bridle is designed to enhance communication between horse and rider. With a balanced design and attention to detail, it ensures a secure yet comfortable fit for schooling, competition, and everyday riding. Made from premium-grade leather with meticulous finishing, this bridle offers durability while maintaining a classic and elegant appearance suitable for multiple English disciplines.',
    'Dressage Bridle': 'Designed for precision and elegance, our Dressage Bridle enhances subtle communication while ensuring superior comfort for the horse. The refined design supports correct head carriage and promotes a balanced, distraction-free fit during training and competition. Crafted from premium-grade leather with meticulous detailing, this bridle delivers both durability and a sophisticated appearance suitable for competitive dressage environments.',
    'Jumping Bridle': 'Engineered for speed, control, and reliability, our Jumping Bridle is designed to support riders during dynamic movements and high-intensity rounds. The secure fit and balanced design enhance communication, allowing precise aids during take-off, landing, and tight turns. Crafted from premium-grade leather with reinforced stitching and durable hardware, this bridle is built to withstand demanding training sessions and competitive environments.',
    'Snaffle Bridle': 'Designed for clarity of contact and everyday performance, our Snaffle Bridle offers balanced control and reliable comfort across a variety of English disciplines. Its straightforward construction promotes direct communication through a snaffle bit, making it ideal for training, schooling, and competition. Crafted from premium-grade leather with refined finishing, this bridle combines durability, proper fit, and classic design for consistent performance.',
    'Double Bridle': 'Designed for advanced training and high-level competition, our Double Bridle offers refined control and precision through the use of both a snaffle and curb bit. Engineered for experienced riders, it enhances subtle communication and supports correct head carriage during demanding dressage work. Crafted from premium-grade leather with meticulous detailing, this bridle delivers balance, durability, and an elegant presentation suitable for competitive arenas.',
    'Hunter Bridle': 'Crafted with timeless elegance and clean lines, our Hunter Bridle is designed for traditional show ring presentation. With its simple, refined profile and balanced construction, it complements the classic hunter style while ensuring comfort and clear communication between horse and rider. Made from premium-grade leather with meticulous finishing, this bridle offers durability, proper fit, and an understated look ideal for competition and schooling.',
    'Figure 8 Bridle': 'Designed for high-performance disciplines, our Figure 8 Bridle provides enhanced stability and control during fast-paced riding. The crossed noseband design helps prevent excessive mouth movement while allowing improved airflow, making it ideal for jumping, eventing, and cross-country work. Crafted from premium-grade leather with reinforced stitching and durable hardware, this bridle delivers both security and comfort in demanding conditions.',
    'Anatomical Bridle': 'Designed with advanced comfort and ergonomic precision, our Anatomical Bridle is crafted to reduce pressure and enhance freedom of movement. The contoured headpiece and strategically shaped components are developed to accommodate the horse’s natural anatomy, promoting relaxation and improved responsiveness. Blending modern design with premium craftsmanship, this bridle supports clear communication while prioritizing long-term comfort during training and competition.',
    'Spanish Bridle': 'Inspired by classical Spanish riding traditions, our Spanish Bridle combines refined craftsmanship with distinctive detailing. Characterized by its elegant design and decorative accents, it enhances presentation while maintaining balanced control and rider communication. Crafted from premium-grade leather with meticulous finishing, this bridle delivers both durability and heritage-inspired style — making it ideal for exhibitions, traditional riding disciplines, and show presentation.',
    'Icelandic Bridle': 'Designed to complement the unique gaits of the Icelandic horse, our Icelandic Bridle offers lightweight comfort and balanced control. Its streamlined construction supports clear communication while allowing freedom of movement during tolting and other smooth gait transitions. Crafted with precision and durability in mind, this bridle ensures a secure yet comfortable fit for both everyday riding and competitive environments.',
    'Polo Bridle': 'Engineered for speed and agility, our Polo Bridle is designed to deliver precise control during fast-paced play. Its streamlined construction minimizes bulk while ensuring a secure fit, allowing riders to maintain balance and responsiveness through rapid turns and powerful strokes. Built for durability under intense conditions, this bridle combines lightweight performance with dependable strength — ideal for competitive and training environments.',
    'Biothane Bridle': 'Built for durability and convenience, our Biothane Bridle offers a modern, weather-resistant alternative to traditional leather. Designed to withstand moisture, sweat, and demanding riding conditions, it maintains flexibility and strength without cracking or stretching. Lightweight and easy to clean, this bridle is ideal for endurance riding, trail work, riding schools, and everyday use where performance and practicality are essential.',
    'PVC Bridle': 'Designed for durability and easy maintenance, our PVC Bridle offers a practical and cost-effective alternative to traditional leather. Resistant to moisture and everyday wear, it maintains its shape and performance even under frequent use. Lightweight and simple to clean, this bridle is ideal for riding schools, beginner riders, and everyday training environments where convenience and reliability are essential.',
    'Nylon Bridle': 'Designed for everyday practicality and durability, our Nylon Bridle offers a lightweight and dependable solution for training, schooling, and casual riding. The strong woven construction ensures flexibility and strength, while maintaining comfort for regular use. Easy to maintain and resistant to moisture, this bridle is ideal for riding schools, beginner riders, and environments requiring frequent cleaning and reliable performance.',
    'Crownpiece': 'Designed for optimal comfort and balanced pressure distribution, our Crownpiece is crafted to enhance bridle fit and reduce poll pressure. Its contoured shape follows the natural anatomy of the horse’s head, promoting freedom of ear movement and improved overall comfort. Constructed from premium-grade materials with refined finishing, this component ensures durability while supporting precise rein contact and stable positioning.',
    'Browband': 'Designed to provide both stability and refined presentation, our Browband ensures proper bridle positioning while enhancing the overall appearance. Crafted for comfort and durability, it helps maintain balanced alignment across the horse’s forehead without causing pressure. Available in a variety of styles — from classic plain designs to decorative finishes — this browband complements both everyday training bridles and competition setups.',
    'Throatlatch': 'Designed to provide secure bridle positioning without restricting natural movement, our Throatlatch ensures stability and comfort during riding. It helps prevent the bridle from shifting while allowing sufficient flexibility for the horse’s throat and jaw. Crafted from premium-grade materials with durable stitching and reliable hardware, this component offers dependable performance for both training and competition use.',
    'Cheekpiece(s)': 'Designed for precise bit alignment and consistent rein contact, our Cheekpieces ensure balanced positioning within the bridle system. Their adjustable construction allows accurate length customisation, supporting clear communication between horse and rider. Crafted from premium-grade materials with reinforced stitching and durable hardware, these components provide reliability and long-term performance across training and competitive use.',
    'Noseband': 'Designed to enhance stability and refined communication, our Noseband supports balanced rein contact while maintaining comfort for the horse. Carefully shaped for proper fit, it helps ensure correct positioning without causing unnecessary pressure. Crafted from premium-grade materials with precise stitching and durable hardware, this noseband delivers long-lasting performance suitable for both training and competition use.',
    'Flash Strap': 'Designed to provide additional stability and controlled rein contact, our Flash Strap works in combination with a cavesson noseband to help maintain proper bit positioning. It supports consistent communication while allowing balanced comfort when correctly adjusted. Crafted from premium-grade materials with durable stitching and secure hardware, this component ensures reliable performance for training and competitive disciplines.',
    'Reins': 'Designed for precision and consistent contact, our Reins provide riders with reliable control and balanced communication. Crafted for durability and comfort, they offer a secure grip and responsive feel suitable for both training and competition. Available in various styles — including plain leather, rubber grip, web, and laced designs — these reins are built to perform across multiple riding disciplines.',
    'Leather Halter': 'Crafted for strength, comfort, and refined presentation, our Leather Halter offers dependable control during handling, training, and show preparation. Designed with balanced proportions and smooth finishing, it provides a secure yet comfortable fit for the horse. Constructed from premium-grade leather with reinforced stitching and durable hardware, this halter delivers long-lasting performance while maintaining a classic and professional appearance.',
    'Nylon Halter': 'Designed for strength and everyday reliability, our Nylon Halter offers a lightweight and durable solution for handling and stable use. The strong woven construction provides dependable control while maintaining comfort for regular wear. Easy to maintain and resistant to moisture and wear, this halter is ideal for daily handling, turnout, and training environments.',
    'Rope Halter': 'Designed for effective groundwork and clear communication, our Rope Halter offers a lightweight and streamlined solution for training and everyday handling. Its knot-based construction provides precise pressure cues while maintaining flexibility and durability. Crafted from high-quality rope with strong finishing, this halter ensures reliability and performance for training sessions, groundwork exercises, and stable use.',
    'Show Halter': 'Designed for refined presentation and show-ring excellence, our Show Halter combines elegant styling with dependable strength. Crafted to enhance the horse’s appearance, it offers a balanced fit and polished finish suitable for exhibitions, competitions, and professional showcases. Made from premium-grade materials with meticulous attention to detail, this halter delivers both durability and distinguished visual appeal.',
    'Horse Head Collar': 'Designed for secure handling and everyday reliability, our Horse Head Collar offers a balanced combination of strength, comfort, and durability. Suitable for stable use, turnout, transport, and general handling, it provides a secure fit while ensuring comfort for the horse. Crafted from high-quality materials with reinforced stitching and durable hardware, this head collar is built to withstand regular use while maintaining dependable performance.',
    'PVC Halter': 'Designed for durability and easy maintenance, our PVC Halter offers a weather-resistant solution for everyday handling and stable use. The smooth, moisture-resistant material ensures reliable performance while requiring minimal upkeep. Lightweight yet strong, this halter is ideal for riding schools, transport, turnout, and environments where convenience and practicality are essential.',
    'Lead Rope (Cotton / Nylon / Leather)': 'Designed for secure handling and dependable performance, our Lead Ropes are available in cotton, nylon, and leather to suit various preferences and working environments. Whether for stable use, training, transport, or show preparation, these lead ropes provide reliable control and comfortable handling. Crafted with durable materials and reinforced attachments, each rope is built to withstand regular use while ensuring a balanced and secure connection.',
    'Lead Line': 'Designed for controlled handling and groundwork training, our Lead Line provides extended reach and dependable performance. Its durable construction ensures strength and reliability while maintaining a comfortable grip for precise control. Ideal for training sessions, lunging assistance, and stable handling, this lead line delivers consistent performance in both professional and everyday environments.',
    'Leather Girth': 'Designed for secure saddle stability and balanced pressure distribution, our Leather Girth offers strength, comfort, and refined performance. Crafted to contour naturally to the horse’s shape, it promotes even tension while reducing the risk of pressure points. Made from premium-grade leather with reinforced stitching and durable hardware, this girth delivers long-lasting reliability for both training and competitive use.',
    'Cotton Girth': 'Designed for comfort and breathability, our Cotton Girth provides a soft and flexible solution for everyday riding. The natural cotton construction promotes airflow and helps reduce irritation, making it ideal for regular training and schooling sessions. Lightweight yet durable, this girth ensures secure saddle positioning while maintaining comfort for extended use.',
    'Nylon Girth': 'Built for strength and everyday durability, our Nylon Girth offers a reliable solution for training, schooling, and stable environments. The sturdy woven construction resists moisture and wear, making it ideal for regular use in varied conditions. Lightweight yet strong, this girth provides secure saddle positioning while maintaining flexibility and comfort during riding sessions.',
    'Elastic Girth': 'Designed to provide flexibility and enhanced comfort, our Elastic Girth allows controlled stretch for improved freedom of movement. The elastic components help maintain consistent tension while reducing pressure points, supporting a more comfortable riding experience. Built for durability and balanced saddle stability, this girth combines secure fastening with responsive flexibility — making it suitable for training and everyday riding.',
    'Dressage Girth': 'Designed specifically for dressage saddles, our Dressage Girth offers a contoured shape to support correct saddle positioning and even pressure distribution. Its ergonomic design promotes comfort while allowing unrestricted movement during collected and extended work. Crafted from premium-grade materials with reinforced stitching and durable buckles, this girth delivers stability, balance, and long-term performance suitable for training and competition environments.',
    'Stud Girth': 'Designed for high-impact jumping disciplines, our Stud Girth provides enhanced protection and stability during take-off and landing. The extended central panel shields the horse’s underside from studs and impact, while maintaining balanced pressure distribution. Crafted for durability and secure saddle positioning, this girth combines reinforced construction with comfort-focused shaping — making it ideal for show jumping and cross-country performance.',
    'Western Cinch': 'Built for strength and dependable saddle security, our Western Cinch is designed to withstand the demands of ranch work and performance riding. Its balanced construction ensures even pressure distribution while maintaining a secure fit during movement and high-intensity tasks. Crafted from durable materials with reinforced stitching and heavy-duty hardware, this cinch delivers reliability and comfort for extended riding sessions.',
    'Back Cinch': 'Designed to enhance saddle stability during demanding Western riding, our Back Cinch provides additional security and balance. It helps prevent saddle lift during quick stops, sharp turns, and rugged terrain, ensuring a more controlled and stable riding experience. Crafted from durable materials with reinforced stitching and reliable hardware, this back cinch delivers dependable performance for ranch work and competitive disciplines.',
    'Iron Stirrups': 'Built for strength and reliable performance, our Iron Stirrups provide stability and balanced support during riding. Designed for durability and consistent weight distribution, they help maintain secure foot positioning across training and competitive disciplines. Crafted from high-quality metal with precision finishing, these stirrups offer long-lasting performance and dependable structure suitable for everyday riding and show use.',
    'Stainless Steel Stirrups': 'Crafted for durability and refined performance, our Stainless Steel Stirrups offer strength, stability, and resistance to corrosion. Designed to maintain their polished appearance and structural integrity over time, they provide reliable support for both training and competitive riding. Precision-engineered for balanced weight distribution and secure foot positioning, these stirrups deliver consistent performance across various riding disciplines.',
    'Brass Stirrups': 'Crafted for timeless appeal and dependable strength, our Brass Stirrups combine classic design with durable construction. The distinctive finish adds a refined touch while providing balanced support and secure footing during riding. Designed for stability and long-term performance, these stirrups offer both functionality and traditional elegance suitable for training, exhibitions, and show presentation.',
    'Fibre / Plastic Stirrups': 'Designed for lightweight performance and everyday practicality, our Fibre / Plastic Stirrups offer dependable support with reduced weight. The durable synthetic construction resists moisture and wear, making them ideal for schooling, riding schools, and regular training use. Comfortable and easy to maintain, these stirrups provide stable foot positioning while ensuring long-lasting reliability.',
    'Safety Stirrups': 'Engineered with rider protection in mind, our Safety Stirrups are designed to reduce the risk of foot entrapment during falls. Featuring an integrated release mechanism or flexible outer branch (depending on design), they provide added security without compromising stability or performance. Built from high-quality materials with precision construction, these stirrups offer dependable strength while enhancing rider confidence across training and competition environments.',
    'Aluminum Stirrups': 'Engineered for lightweight performance and durability, our Aluminum Stirrups provide enhanced rider comfort and responsiveness. The reduced weight minimizes strain during extended rides while maintaining strength and structural stability. Designed for balanced support and secure foot positioning, these stirrups deliver reliable performance across training and competitive disciplines.',
    'Stirrup Leathers': 'Designed for strength and long-term reliability, our Stirrup Leathers provide secure attachment and balanced rider support. Crafted to withstand consistent weight-bearing use, they ensure stability and dependable performance across training and competitive disciplines. Constructed from premium-grade leather with reinforced stitching and durable buckles, these stirrup leathers deliver both flexibility and durability while maintaining a refined finish.',
    'Stirrup Pads': 'Designed to enhance grip and rider stability, our Stirrup Pads provide secure footing and improved control during riding. Engineered for durability and reliable traction, they help reduce slippage while maintaining comfort in various riding conditions. Crafted from high-quality materials, these pads are built to withstand regular use while ensuring consistent performance in both training and competition environments.',
    'Stirrup Belts': 'Designed for secure attachment and adjustable support, our Stirrup Belts provide reliable performance in training and saddle configurations. Built to withstand consistent tension and movement, they ensure stability and balanced positioning during use. Crafted from durable materials with reinforced stitching and dependable hardware, these stirrup belts deliver long-lasting strength while maintaining flexibility and ease of adjustment.',
    'All Purpose Saddle Pad': 'Designed for versatility and everyday performance, our All Purpose Saddle Pad provides balanced cushioning and reliable protection for both horse and saddle. Its contoured shape ensures proper fit under all-purpose saddles while promoting comfort during flatwork, light jumping, and leisure riding. Crafted with durable outer fabric and soft inner lining, this pad helps absorb shock, reduce friction, and maintain saddle stability throughout riding sessions.',
    'Dressage Saddle Pad': 'Designed specifically for dressage saddles, our Dressage Saddle Pad offers a contoured fit and refined profile for a clean, professional appearance. Its shape accommodates longer saddle flaps while providing balanced cushioning and reliable protection during training and competition. Crafted with durable outer fabric and breathable inner lining, this pad promotes comfort, shock absorption, and stable saddle positioning throughout collected and extended work.',
    'Half Pad': 'Designed to provide additional cushioning and improved saddle fit, our Half Pad enhances comfort and shock absorption during riding. Placed between the saddle and saddle pad, it helps distribute pressure more evenly while supporting balanced saddle positioning. Crafted with durable materials and performance-focused padding, this half pad offers reliable comfort for both training and competitive use.',
    'Jumping Saddle Pad': 'Engineered for dynamic performance, our Jumping Saddle Pad is designed to provide shock absorption and secure saddle positioning during take-off and landing. The forward-cut shape accommodates jumping saddles while maintaining a close, balanced fit. Crafted with durable outer fabric and breathable inner lining, this pad helps reduce friction, absorb impact, and support comfort through intense training sessions and competitive rounds.',
    'Bareback Pad': 'Designed to provide the natural feel of bareback riding with added comfort and security, our Bareback Pad offers close contact while delivering cushioning and stability. Its contoured shape helps distribute pressure evenly while maintaining direct communication between horse and rider. Crafted with durable outer materials and soft inner padding, this pad ensures comfort and grip during leisure rides, training sessions, and groundwork.',
    'Western Saddle Pad': 'Designed for durability and long-hour comfort, our Western Saddle Pad provides substantial cushioning and reliable protection under Western saddles. Its robust construction helps absorb shock, distribute weight evenly, and reduce pressure during ranch work, trail riding, and performance disciplines. Crafted with high-quality outer materials and dense padding, this pad is built to withstand demanding use while maintaining comfort and stability.',
    'Saddle Blanket (Cotton / Wool / Fleece)': 'Designed to provide cushioning, protection, and versatility, our Saddle Blankets are available in cotton, wool, and fleece to suit various riding styles and conditions. Whether used under Western saddles or layered for additional comfort, these blankets help distribute pressure evenly while enhancing overall saddle stability. Crafted with durable materials and reinforced finishing, each blanket is built for long-term reliability and consistent performance.',
    'Studded Western Blankets': 'Designed to combine rugged functionality with distinctive Western styling, our Studded Western Blankets offer both protection and visual impact. Featuring decorative stud accents and durable construction, they enhance saddle presentation while providing reliable cushioning and weight distribution. Crafted from high-quality materials with reinforced finishing, these blankets are built for performance use while maintaining bold Western character.',
    'Breastplate (English / Western)': 'Engineered for stability, balance, and refined presentation, our Breastplates (English / Western) are designed to keep the saddle securely in position while enhancing the overall aesthetic of the tack setup. Suitable for both performance and everyday riding, they provide essential support during jumping, eventing, endurance, trail, and Western disciplines. Crafted from premium-grade leather and durable hardware, each breastplate is built for strength, flexibility, and long-term reliability. Thoughtfully designed with adjustable fittings and reinforced stitching, they ensure optimal comfort for the horse without compromising on style or performance.',
    'Breast Collar (Western)': 'Built for strength, balance, and unmistakable Western character, our Western Breast Collars are designed to keep the saddle securely in place during demanding rides. Ideal for ranch work, barrel racing, roping, trail riding, and performance disciplines, they provide dependable stability while elevating the overall tack appearance. Crafted from premium-grade leather and fitted with durable hardware, each breast collar combines rugged construction with refined detailing. From classic clean finishes to tooled, studded, or concho-accented designs, our pieces are engineered to withstand heavy use while maintaining authentic Western appeal.',
    'Running Martingale': 'Designed to promote controlled head carriage and improved rider communication, our Running Martingales provide reliable support without restricting natural movement. Commonly used in jumping, eventing, hunting, and training disciplines, they assist in maintaining consistent rein contact while allowing freedom when the horse responds correctly. Crafted from premium-grade leather with carefully finished edges and durable fittings, each piece is engineered for strength, flexibility, and long-term use. Reinforced stitching and balanced strap placement ensure stability under pressure while prioritizing horse comfort and performance efficiency.',
    'Standing Martingale': 'Engineered for enhanced control and consistent head positioning, our Standing Martingales are designed to help maintain balanced carriage while preventing excessive upward head movement. Commonly used in show jumping, hunting, and traditional English disciplines, they provide reliable support without compromising comfort when correctly adjusted. Crafted from premium-grade leather and reinforced at key stress points, each standing martingale offers durability, stability, and refined presentation. With precise stitching and high-quality hardware, the design ensures long-term performance under demanding riding conditions while maintaining a clean, classic appearance.',
    'Tendon Boots': 'Designed to provide essential leg protection during high-impact activity, our Tendon Boots offer reliable support and shock absorption for performance horses. Commonly used in jumping, eventing, and training disciplines, they help protect the tendons and ligaments from strikes, impact, and brushing injuries. Engineered with durable outer shells and cushioned inner lining, these boots combine strength with comfort. The ergonomic design ensures a secure fit that stays in place during movement while allowing natural flexibility. Built for both daily training and competitive use, they deliver dependable protection without adding unnecessary weight.',
    'Fetlock Boots': 'Designed to protect the sensitive fetlock area from impact and brushing injuries, our Fetlock Boots provide essential support during high-performance riding. Commonly used in jumping, eventing, and training disciplines, they help safeguard the hind legs from strikes caused by overreach or tight turns. Constructed with a durable protective shell and cushioned inner lining, these boots combine impact resistance with ergonomic comfort. Their lightweight structure allows natural movement while maintaining secure positioning throughout intense activity. Built for both competition and daily training, they deliver reliable protection without compromising flexibility.',
    'Bell Boots': 'Designed to protect the heel bulbs and coronet band from overreach injuries, our Bell Boots provide essential lower hoof protection during training and competition. Ideal for jumping, eventing, turnout, and general riding, they help prevent impact caused by the hind hooves striking the front hooves during movement. Crafted from durable, shock-absorbing materials, these boots offer reliable coverage while maintaining flexibility and comfort. The contoured shape ensures a secure fit around the hoof, while reinforced edges enhance longevity under repeated use. Built for both professional riders and everyday training environments, they combine protection, practicality, and clean presentation.',
    'Ankle Boots': 'Designed to protect the lower leg and ankle area from brushing, impact, and interference injuries, our Ankle Boots provide dependable support during training and competition. Suitable for both front and hind legs depending on design, they are widely used in jumping, flatwork, schooling, and general riding disciplines. Constructed from durable outer materials with cushioned inner lining, these boots deliver effective shock absorption while maintaining flexibility for natural movement. The ergonomic contour ensures a secure, comfortable fit, while reinforced stitching and strong fastening systems enhance long-term durability under regular use.',
    'Leg Wraps': 'Designed to provide controlled support and protection during training, recovery, and stable use, our Leg Wraps offer reliable compression and comfort for performance horses. Commonly used for schooling, transport, and post-exercise care, they help reduce strain while supporting tendons and ligaments. Crafted from high-quality, breathable materials, these wraps ensure flexibility and even pressure distribution without restricting natural movement. With strong hook-and-loop closures and reinforced stitching, they are built for repeated use while maintaining consistent performance and durability.',
    'Bandages': 'Designed to provide consistent support and protection for tendons and ligaments, our Bandages are ideal for training, recovery, and stable management. Whether used during light exercise, transport, or post-work care, they help promote stability while maintaining comfort and flexibility. Manufactured from premium-quality, breathable fabrics, these bandages ensure even pressure distribution without restricting natural movement. The soft texture prevents irritation, while durable construction and secure fastening systems allow repeated use with dependable performance.',
    'Summer Rugs': 'Designed for lightweight protection and maximum breathability, our Summer Rugs provide essential coverage during warmer months without causing overheating. Ideal for turnout, travel, and stable use, they help shield horses from dust, insects, and sun exposure while maintaining optimal airflow. Crafted from high-quality, breathable fabrics, these rugs are engineered for comfort, durability, and ease of movement. Reinforced stitching and secure fastening systems ensure a reliable fit, while the lightweight structure keeps horses cool and comfortable even in warm conditions. Built for both daily use and professional yard environments, they combine practicality with refined presentation.',
    'Winter Rugs': 'Designed to provide superior warmth and protection during cold weather conditions, our Winter Rugs offer reliable insulation without restricting natural movement. Ideal for turnout, stable use, and travel in colder climates, they help maintain body temperature while shielding against wind, moisture, and harsh environmental elements. Constructed from durable outer fabric with insulated inner filling, these rugs combine weather resistance with comfort. Reinforced stitching, secure fastening systems, and thoughtfully designed fit ensure long-term durability and consistent performance. Built for both professional yards and demanding winter environments, they deliver dependable protection with refined presentation.',
    'Stable Rugs': 'Designed for indoor warmth and everyday stable management, our Stable Rugs provide dependable insulation and comfort without the bulk required for outdoor turnout. Ideal for use in barns and covered environments, they help maintain body temperature during cooler conditions while allowing freedom of movement. Crafted from durable yet breathable fabrics with carefully balanced insulation, these rugs are built for consistent indoor performance. Reinforced stitching, secure chest closures, and adjustable fittings ensure a stable, comfortable fit. With a focus on comfort and longevity, they offer reliable protection while maintaining a clean, professional appearance.',
    'Turnout Rugs': 'Engineered for outdoor durability and all-weather protection, our Turnout Rugs are designed to withstand challenging environmental conditions while keeping horses dry, warm, and comfortable. Ideal for pasture use and extended turnout, they provide dependable shielding against rain, wind, mud, and fluctuating temperatures. Constructed with a strong, waterproof outer shell and breathable inner lining, these rugs offer optimal weather resistance without compromising airflow. Reinforced seams, secure fastening systems, and thoughtfully contoured design ensure a stable fit and long-lasting performance in demanding outdoor environments. Built for professional yards and harsh climates, they combine resilience with refined craftsmanship.',
    'Fly Rugs': 'Designed to provide effective protection against flies, insects, and summer irritants, our Fly Rugs offer lightweight coverage without compromising breathability. Ideal for turnout during warmer months, they help reduce irritation while allowing maximum airflow to keep horses cool and comfortable. Crafted from high-quality mesh fabrics, these rugs ensure optimal ventilation while maintaining durability for daily outdoor use. Reinforced stitching, secure fastening systems, and ergonomic design provide a stable fit, ensuring reliable protection during movement. Built for professional yards and performance environments, they combine practicality with refined presentation.',
    'Fleece Rugs': 'Designed for warmth, moisture management, and everyday comfort, our Fleece Rugs provide lightweight insulation while maintaining breathability. Ideal for use after exercise, during travel, or in cooler stable environments, they help wick away moisture while keeping horses dry and comfortable. Crafted from high-quality anti-pill fleece, these rugs offer a soft feel against the coat while ensuring durability for repeated use. The lightweight construction allows natural movement, while reinforced stitching and secure fastenings provide reliable fit and long-term performance. Combining functionality with clean presentation, they are a staple in professional and competition stables.',
    'Horse Blankets': 'Designed to provide reliable protection, comfort, and seasonal adaptability, our Horse Blankets combine functional performance with refined craftsmanship. Suitable for a wide range of climates and management needs, they offer dependable coverage whether used in stable environments, turnout conditions, travel, or recovery. Crafted from high-quality fabrics with reinforced construction, our horse blankets are engineered for durability, comfort, and long-term use. Thoughtfully designed with secure fastening systems, balanced weight distribution, and ergonomic fitting, they ensure freedom of movement while maintaining consistent protection. Built to meet international standards, they serve professional riders, equestrian facilities, and wholesale buyers worldwide.',
    'Horse Clothing': 'Designed to deliver comfort, protection, and performance across all seasons, our Horse Clothing collection combines functional innovation with refined craftsmanship. From protective rugs and blankets to cooling sheets and stable essentials, each piece is developed to support the horse’s well-being while maintaining professional presentation. Crafted using premium-grade fabrics and reinforced construction techniques, our products ensure durability, breathability, and optimal fit. Whether for training, turnout, travel, or stable management, our horse clothing solutions are engineered to meet international quality standards while offering versatility for diverse equestrian disciplines.',
    'Grooming Kits': 'Designed for complete coat care and daily stable management, our Grooming Kits combine essential tools in one organised, durable solution. Ideal for professional riders, stable environments, and everyday horse care, these kits support hygiene, coat health, and presentation before and after training or competition. Each kit is assembled using high-quality materials and ergonomic designs to ensure comfort, durability, and ease of use. From body brushes and curry combs to hoof picks and mane combs, every component is crafted for long-term performance and efficient grooming routines.',
    'Grooming Brushes': 'Designed for effective cleaning, coat conditioning, and everyday stable care, our Grooming Brushes combine durability with ergonomic comfort. Suitable for professional yards, competition preparation, and daily grooming routines, they help remove dust, dirt, and loose hair while enhancing coat shine and overall presentation. Crafted from high-quality bristles and sturdy back materials, each brush is built for consistent performance and long-term use. The ergonomic design ensures comfortable handling, allowing efficient grooming without causing strain. Whether used for deep cleaning or finishing touches, our brushes deliver reliable results in every setting.',
    'Curry Comb': 'Designed for deep cleaning and effective loosening of dirt, mud, and loose hair, our Curry Combs are an essential tool in every grooming routine. Ideal for use before brushing, they stimulate circulation while helping remove debris from the coat, ensuring a cleaner and healthier finish. Crafted from high-quality, flexible materials, these curry combs provide durability while remaining gentle on the horse’s skin. The ergonomic grip ensures comfortable handling, allowing controlled pressure during grooming sessions. Built for daily stable use, they deliver consistent performance and long-lasting reliability.',
    'Hoof Pick': 'Designed for effective and safe hoof cleaning, our Hoof Picks are essential tools for maintaining hoof hygiene and overall hoof health. Ideal for daily stable use, they help remove dirt, mud, stones, and debris from the hoof cavity, reducing the risk of infection and discomfort. Crafted from high-quality, durable materials, each hoof pick is built for strength and longevity. The ergonomic handle ensures a secure and comfortable grip, allowing precise control during cleaning. Whether for professional stable management or everyday grooming routines, our hoof picks deliver reliability and consistent performance.',
    'Bit Guards': 'Designed to enhance comfort and protect sensitive areas of the mouth, our Bit Guards help prevent pinching and rubbing at the corners of the lips during riding. Suitable for use with a variety of bit types, they provide added cushioning while supporting steady and consistent rein contact. Crafted from high-quality, flexible materials, these guards offer durability without compromising softness. Their secure fit ensures stability throughout training and competition, making them ideal for both young horses and experienced performance mounts. Built with a focus on comfort and welfare, they combine practicality with professional finishing.',
    'Fly Mask': 'Designed to provide reliable protection against flies, insects, and airborne irritants, our Fly Masks help safeguard sensitive facial areas including the eyes and ears. Ideal for turnout during warmer months, they reduce irritation and support overall comfort without obstructing vision or natural movement. Crafted from durable, breathable mesh fabric, these masks ensure optimal airflow while maintaining structured coverage. Soft edging and ergonomic contouring provide a secure, comfortable fit that minimizes rubbing. Built for daily outdoor use, they combine effective insect protection with long-lasting durability and professional presentation.',
    'Fly Veil': 'Designed to protect the horse’s ears from flies and airborne distractions, our Fly Veils provide comfort and focus during training and competition. Ideal for dressage, jumping, and eventing disciplines, they help reduce irritation while enhancing the overall presentation of the tack setup. Crafted from breathable crochet fabric combined with soft, flexible ear material, these veils ensure optimal airflow and a secure, comfortable fit. The contoured design sits neatly beneath the bridle without causing pressure, making them suitable for extended use in performance environments. Built for both practicality and style, they offer dependable protection with a refined finish.',
    'Hay Bag': 'Designed for convenient and controlled feeding, our Hay Bags provide a practical solution for stable, travel, and competition environments. They help reduce hay waste while promoting organised feeding, making them ideal for barns, trailers, and paddock use. Constructed from durable, high-quality materials, these hay bags are built to withstand regular handling and long-term use. Reinforced stitching and strong hanging straps ensure stability, while thoughtfully designed openings allow easy access for feeding without excessive spillage. Combining functionality with robust construction, they offer dependable performance in professional and everyday stable settings.',
    'Hay Net': 'Designed to promote controlled feeding and reduce hay waste, our Hay Nets provide an efficient solution for stable, pasture, and travel use. By encouraging slower consumption, they support better digestion while keeping feeding areas organised and clean. Crafted from high-strength, durable netting material, these hay nets are built to withstand regular use in demanding stable environments. Reinforced knot construction and sturdy hanging loops ensure reliable performance, while thoughtfully designed mesh sizes allow controlled access to forage. Built for both professional yards and everyday management, they combine practicality with long-lasting durability.',
    'Feed Bucket': 'Designed for convenient and hygienic feeding, our Feed Buckets provide a reliable solution for daily stable management. Suitable for grains, concentrates, supplements, and water, they are built to withstand regular use in demanding barn and paddock environments. Manufactured from high-quality, durable materials, these buckets offer strength and impact resistance while remaining easy to handle and clean. Reinforced rims and sturdy handles ensure secure carrying and hanging, making them practical for both fixed and portable feeding setups. Engineered for longevity and efficiency, they deliver dependable performance in professional and everyday equestrian settings.',
    'Water Tub': 'Designed for reliable hydration in stable, paddock, and pasture environments, our Water Tubs provide a durable and practical solution for daily water management. Built to withstand outdoor conditions and regular handling, they ensure consistent access to clean water in professional and everyday equestrian settings. Manufactured from high-quality, impact-resistant materials, these water tubs offer strength, stability, and long-term performance. Reinforced rims and sturdy construction help prevent cracking or deformation, while smooth interior surfaces allow easy cleaning and maintenance. Engineered for durability and efficiency, they combine functionality with dependable design.',
    'Snaffle Bit': 'Designed to provide direct and balanced communication between horse and rider, our Snaffle Bits offer reliable control with gentle action when used correctly. Suitable for training, schooling, and competition across various English and Western disciplines, they promote clear rein contact while supporting comfort and responsiveness. Crafted from high-quality, durable materials, each snaffle bit is engineered for strength, smooth finish, and long-term performance. The carefully designed mouthpiece ensures even pressure distribution across the bars and tongue, encouraging acceptance and consistent contact. Built to meet international quality standards, our snaffle bits combine precision engineering with refined craftsmanship.',
    'Pelham Bit': 'Designed to provide a balanced combination of snaffle and curb action, our Pelham Bits offer enhanced control and refined communication for experienced riders. Commonly used in show jumping, hunting, and show disciplines, they allow dual rein contact for precise adjustment of pressure and responsiveness. Crafted from high-quality, durable metals with a smooth, polished finish, each pelham bit is engineered for strength, comfort, and consistent performance. The carefully designed mouthpiece ensures even pressure distribution across the bars, tongue, and poll when engaged, while the curb chain mechanism provides controlled leverage when required. Built to meet international standards, our pelham bits combine precision engineering with dependable craftsmanship.',
    'Double Ring Bit': 'Designed to offer adjustable control and enhanced communication, our Double Ring Bits provide riders with versatile rein placement options to fine-tune responsiveness. Commonly used in jumping and training disciplines, they allow varying degrees of leverage depending on rein position, making them suitable for horses requiring additional control without excessive severity. Crafted from high-quality, durable metals with a smooth, polished finish, each double ring bit is engineered for strength, balance, and consistent performance. The thoughtfully designed mouthpiece ensures even pressure distribution, while the multiple ring configuration enables controlled leverage action when engaged. Built to meet international standards, they combine technical precision with dependable craftsmanship.',
    'Spurs': 'Designed to refine rider communication and enhance subtle leg aids, our Spurs provide precise and controlled cues during training and competition. Suitable for dressage, jumping, and various performance disciplines, they support improved responsiveness while maintaining balanced contact when used correctly. Crafted from high-quality, durable metals with smooth finishing, each pair of spurs is engineered for strength, comfort, and long-term reliability. Thoughtfully contoured for secure fit and stability, they ensure consistent positioning without causing discomfort. Built to meet international standards, our spurs combine precision craftsmanship with dependable performance.',
    'Whips (Leather / Plastic)': 'Designed to support clear and effective rider communication, our Whips (Leather / Plastic) provide balanced responsiveness for training and competition across various disciplines. Whether used in dressage, jumping, schooling, or general riding, they assist in reinforcing subtle leg aids without compromising control or comfort. Crafted from high-quality materials with durable construction, each whip is engineered for flexibility, strength, and long-term performance. Leather-covered variants offer a refined, classic appearance with enhanced grip, while plastic options provide lightweight practicality and everyday durability. Built to meet international standards, they combine functional precision with dependable craftsmanship.',
    'Horse Harness Set': 'Designed for strength, balance, and refined presentation, our Horse Harness Sets combine durability with traditional craftsmanship. Suitable for carriage driving, ceremonial use, training, and recreational driving disciplines, each set is engineered to deliver reliable performance while maintaining an elegant appearance. Crafted from premium-grade leather with reinforced stitching and high-quality hardware, our harness sets are built to withstand demanding use. Every component is carefully constructed to ensure proper weight distribution, comfort, and secure fitting. From breast collars and bridles to traces and backbands, each element works cohesively to provide stability, control, and long-term reliability. Built to meet international quality standards, they reflect precision engineering and expert craftsmanship.',
    'Driving Harness (Single / Pair)': 'Engineered for strength, balance, and controlled performance, our Driving Harness (Single / Pair) sets are designed to meet the demands of carriage driving, training, and ceremonial use. Whether configured for a single horse or a matched pair, each harness system ensures secure fitting, proper weight distribution, and dependable communication between horse and driver. Crafted from premium-grade leather with reinforced stitching and high-quality hardware, these harnesses are built for durability and long-term reliability. Every component — from the bridle and breast collar to traces, reins, and backband — is carefully designed to work in harmony, ensuring stability, comfort, and performance under varied driving conditions. Manufactured to meet international standards, they combine traditional craftsmanship with modern precision.',
    'Marathon Harness': 'Engineered for demanding driving competitions and endurance challenges, our Marathon Harness is designed to deliver maximum stability, strength, and performance under high-intensity conditions. Built specifically for marathon and combined driving events, it ensures secure fitting, balanced weight distribution, and reliable control during fast-paced maneuvers and obstacle navigation. Crafted from premium-grade leather and reinforced synthetic components, the harness combines durability with flexibility to withstand rigorous use. High-strength stitching, robust hardware, and strategically positioned support elements provide enhanced safety and long-term reliability. Designed to meet international standards, it reflects precision craftsmanship tailored for competitive driving environments.',
    'Patent Harness': 'Designed to deliver a refined and distinguished appearance, our Patent Harness combines traditional craftsmanship with high-gloss presentation. Ideal for ceremonial carriage driving, formal events, and show environments, it enhances visual impact while maintaining reliable structure and balance. Crafted from premium-grade leather with patent-finish detailing, this harness reflects elegance without compromising durability. Reinforced stitching and high-quality hardware ensure dependable performance, while carefully designed components provide balanced weight distribution and secure fitting. Manufactured to meet international standards, it represents both aesthetic excellence and functional strength.',
    'Riding Breeches': 'Designed for comfort, flexibility, and performance in the saddle, our Riding Breeches combine technical fabric innovation with refined tailoring. Suitable for training, competition, and everyday riding, they offer optimal freedom of movement while maintaining a professional and elegant appearance. Crafted from high-quality stretch materials, these breeches provide a secure yet comfortable fit that adapts to the rider’s movement. Breathable construction and moisture-management properties ensure all-day comfort, while reinforced stitching enhances durability for long-term use. Built to meet international standards, they deliver dependable performance across disciplines.',
    'Jodhpurs': 'Designed for comfort, flexibility, and everyday riding performance, our Jodhpurs combine traditional equestrian styling with modern fabric technology. Suitable for training, schooling, and competition environments, they provide a secure fit while allowing unrestricted movement in and out of the saddle. Crafted from premium stretch fabrics, these jodhpurs offer durability, breathability, and long-lasting shape retention. The tailored cut ensures a clean, professional appearance, while reinforced stitching enhances strength in high-movement areas. Built to meet international standards, they deliver dependable performance for riders of all levels.',
    'Riding Tights': 'Designed for maximum flexibility and lightweight comfort, our Riding Tights combine athletic performance with equestrian functionality. Ideal for training, schooling, and everyday riding, they provide a close, second-skin fit while allowing unrestricted movement in and out of the saddle. Crafted from premium stretch fabrics with advanced moisture-wicking properties, these tights ensure breathability and all-day comfort. The ergonomic construction supports natural movement, while strategically placed grip panels enhance stability during riding. Built to meet international standards, they deliver performance, durability, and modern styling for active riders.',
    'Riding Jackets': 'Designed to combine performance, protection, and refined presentation, our Riding Jackets deliver comfort and functionality across training and competition environments. Whether used for daily riding, outdoor schooling, or show settings, they provide a tailored fit that supports unrestricted movement in the saddle. Crafted from premium technical fabrics, these jackets offer breathability, durability, and weather resistance where required. Thoughtfully engineered with ergonomic paneling and reinforced stitching, they ensure long-term performance while maintaining a professional appearance. Built to meet international standards, they blend modern athletic innovation with classic equestrian styling.',
    'Riding Shirts': 'Designed for comfort, breathability, and active performance, our Riding Shirts combine modern technical fabrics with refined equestrian styling. Suitable for training, competition, and everyday stable wear, they offer a tailored fit that supports unrestricted movement in the saddle. Crafted from premium moisture-wicking materials, these shirts help regulate body temperature while ensuring all-day comfort. The lightweight construction allows maximum flexibility, while reinforced stitching enhances durability for regular use. Built to meet international standards, they deliver reliable performance with a polished appearance.',
    'Belts': 'Designed to combine functionality with refined style, our Belts offer a perfect balance of durability and presentation. Suitable for riding, competition attire, and everyday wear, they complement both traditional and modern equestrian outfits. Crafted from premium-quality leather and durable materials, each belt is constructed with reinforced stitching and high-grade hardware for long-lasting performance. The ergonomic design ensures a secure and comfortable fit, while clean finishing enhances overall appearance. Built to meet international standards, our belts reflect expert craftsmanship and reliable durability.',
    'Riding Helmets': 'Designed to provide advanced head protection without compromising comfort or style, our Riding Helmets combine safety innovation with modern equestrian design. Suitable for training, competition, and everyday riding, they offer reliable impact resistance while maintaining lightweight balance and ventilation. Engineered with durable outer shells and shock-absorbing inner liners, each helmet is built to support rider safety and long-term performance. The ergonomic design ensures a secure and comfortable fit, while integrated ventilation systems promote airflow during extended use. Manufactured to align with international quality standards, our riding helmets reflect precision construction and performance reliability.',
    'Body Protectors': 'Designed to provide enhanced upper-body protection during riding, our Body Protectors combine advanced impact absorption with ergonomic comfort. Suitable for cross-country, jumping, training, and high-intensity disciplines, they offer reliable coverage for the torso while maintaining flexibility and freedom of movement. Engineered with shock-absorbing multi-layer foam construction and durable outer materials, these protectors are built to reduce the impact of falls and collisions. The contoured panel design ensures a close, secure fit without restricting natural riding posture. Manufactured to align with international quality standards, they deliver dependable safety performance with long-term durability.',
    'Riding Gloves': 'Designed to enhance grip, comfort, and rider control, our Riding Gloves provide dependable performance across training and competition environments. Whether used for daily schooling, jumping, or dressage, they ensure secure rein contact while protecting the hands from friction and fatigue. Crafted from premium-quality materials with flexible construction, these gloves offer an ergonomic fit that adapts naturally to hand movement. Reinforced palm panels improve durability and grip, while breathable fabrics promote comfort during extended use. Manufactured to meet international standards, they combine precision craftsmanship with reliable performance.',
    'Riding Chaps (Half / Full)': 'Designed to enhance leg stability, comfort, and protection in the saddle, our Riding Chaps (Half / Full) combine durability with refined craftsmanship. Suitable for training, competition, and everyday riding, they provide improved grip and support while protecting the rider’s lower leg from friction and wear. Crafted from premium-grade leather and high-performance synthetic materials, these chaps offer flexibility without compromising structure. Half chaps deliver lightweight coverage and easy wear, ideal for schooling and casual riding, while full chaps provide extended protection and a traditional, polished appearance suited for advanced disciplines. Built to meet international standards, they reflect precision construction and long-term reliability.',
    'Riding Boots (Long / Ankle)': 'Designed to deliver stability, comfort, and refined presentation, our Riding Boots (Long / Ankle) combine performance functionality with expert craftsmanship. Suitable for training, competition, and everyday riding, they provide secure support while maintaining flexibility for natural movement in the saddle. Crafted from premium-grade leather and high-performance materials, these boots are engineered for durability and long-term wear. Long boots offer extended leg support with a classic, polished appearance ideal for dressage and show disciplines, while ankle boots provide lightweight versatility suited for schooling and casual riding. Reinforced soles and secure closures ensure reliable grip and stability in varied riding conditions.',
    'Saddle Bags': 'Designed for convenience and secure storage during riding and travel, our Saddle Bags combine functionality with durable craftsmanship. Ideal for trail riding, endurance disciplines, and long-distance rides, they provide easy access to essentials without compromising balance or comfort. Crafted from high-quality leather and durable synthetic materials, these saddle bags are built to withstand regular outdoor use. Reinforced stitching, secure fastening systems, and balanced weight distribution ensure stability during movement. Thoughtfully designed compartments offer organised storage while maintaining a clean and professional appearance. Manufactured to meet international standards, they reflect reliable performance and long-term durability.',
    'Horn Bags': 'Designed for convenience and accessibility during Western riding, our Horn Bags provide practical storage solutions that attach securely to the saddle horn. Ideal for trail riding, ranch work, and endurance activities, they allow riders to carry essentials without compromising balance or comfort. Crafted from premium leather and durable synthetic materials, these horn bags are built to withstand demanding outdoor conditions. Reinforced stitching, secure fastening straps, and balanced dual-pocket designs ensure stability during movement. Thoughtfully structured compartments provide organised storage while maintaining a clean Western aesthetic. Manufactured to meet international standards, they combine rugged durability with refined craftsmanship.',
    'Backpacks': 'Designed for functionality, organisation, and everyday performance, our Backpacks combine durable construction with refined design. Suitable for stable visits, travel, competitions, and daily use, they provide practical storage solutions while maintaining a clean and professional appearance. Crafted from high-quality, long-lasting materials, these backpacks are engineered to withstand regular handling and outdoor environments. Reinforced stitching, sturdy zippers, and thoughtfully arranged compartments ensure secure storage and easy organisation. Whether used for riding gear, personal essentials, or travel accessories, they deliver reliability and structured comfort. Manufactured to meet international standards, they reflect dependable craftsmanship and modern practicality.',
    'Messenger Bags': 'Designed for practicality and refined everyday use, our Messenger Bags combine structured organisation with durable construction. Suitable for travel, stable visits, competitions, and daily routines, they offer convenient storage while maintaining a clean and professional appearance. Crafted from premium-quality leather and high-performance materials, these bags are engineered for strength and long-term reliability. Reinforced stitching, secure closures, and thoughtfully designed compartments ensure safe storage of essentials, documents, and accessories. The adjustable shoulder strap provides comfortable carrying, making them ideal for riders and professionals alike. Manufactured to meet international standards, they reflect dependable craftsmanship with modern functionality.',
    'Laptop Bags': 'Designed for secure protection and organised portability, our Laptop Bags combine durability with refined presentation. Suitable for business travel, daily office use, and professional environments, they provide reliable storage while maintaining a clean, structured appearance. Crafted from premium-quality leather and high-performance materials, these bags are engineered for long-term use and everyday functionality. Padded laptop compartments offer enhanced protection against impact, while thoughtfully arranged interior sections ensure efficient organisation of documents and accessories. Reinforced stitching and durable hardware enhance strength and reliability. Manufactured to meet international standards, they reflect expert craftsmanship and dependable performance.',
    'Tote Bags': 'Designed for everyday practicality with refined presentation, our Tote Bags combine spacious functionality with durable construction. Suitable for travel, shopping, stable visits, and daily routines, they offer convenient open-access storage while maintaining a polished appearance. Crafted from premium-quality leather and high-performance materials, these tote bags are engineered for strength and long-term use. Reinforced stitching and sturdy handles ensure reliability under regular load, while thoughtfully structured interiors provide organised storage. Built to meet international standards, they reflect expert craftsmanship with modern versatility.',
    'Waist Bags': 'Designed for hands-free convenience and organised storage, our Waist Bags combine compact functionality with durable craftsmanship. Ideal for travel, outdoor activities, stable visits, and daily use, they provide secure access to essentials while allowing unrestricted movement. Crafted from premium-quality leather and high-performance materials, these waist bags are engineered for durability and long-term reliability. Reinforced stitching, secure zipper systems, and adjustable straps ensure a stable and comfortable fit. Thoughtfully designed compartments offer efficient organisation without adding bulk. Manufactured to meet international standards, they reflect dependable construction with modern practicality.',
    'Wallets': 'Designed to combine elegance with everyday functionality, our Wallets reflect refined craftsmanship and durable construction. Suitable for professional, travel, and daily use, they offer organised storage while maintaining a sleek and timeless appearance. Crafted from premium-grade leather and high-quality materials, each wallet is engineered for long-term durability and structured performance. Precision stitching, smooth finishing, and thoughtfully arranged compartments ensure both practicality and sophisticated presentation. Manufactured to meet international standards, they represent dependable quality with modern design sensibility.',
    'Wrist Bands': 'Designed to combine subtle style with everyday durability, our Wrist Bands offer a refined accessory option for casual, lifestyle, and equestrian-inspired wear. Whether worn as a statement piece or a minimal accent, they provide comfort, structure, and long-lasting quality. Crafted from premium-grade leather and durable materials, each wrist band is carefully constructed with reinforced stitching and smooth finishing. The ergonomic fit ensures comfortable wear throughout the day, while adjustable closures provide secure positioning. Manufactured to meet international standards, they reflect expert craftsmanship and dependable durability.',
  };

  const features: Record<string, string[]> = {
    'Dressage Saddle': [
      'Deep, supportive seat for enhanced rider stability',
      'Long, straight flaps for improved leg positioning',
      'Close-contact panel design for better horse connection',
      'Premium-grade leather with durable stitching',
      'Adjustable girthing system for secure fit',
      'Available in multiple seat sizes and leather finishes'
    ],
    'Jumping Saddle': [
      'Forward-cut flaps for optimal jumping position',
      'Supportive knee blocks for enhanced rider security',
      'Balanced seat for stability over fences',
      'Reinforced stirrup bars for added durability',
      'High-quality leather with precision stitching',
      'Anatomically designed panels for horse comfort',
      'Custom seat sizes and leather finishes available'
    ],
    'Monoflap Dressage Saddle': [
      'Streamlined single-flap design for closer leg contact',
      'Deep, balanced seat for secure rider position',
      'Anatomically shaped panels for enhanced horse comfort',
      'Premium-grade leather with reinforced stitching',
      'Lightweight construction for improved responsiveness',
      'Custom sizing and leather finish options available',
      'Manufactured to international quality standards'
    ],
    'Close Contact Saddle': [
      'Close-contact panel design for maximum rider feel',
      'Flatter seat for freedom of movement',
      'Forward-cut flaps for jumping performance',
      'Lightweight construction for improved responsiveness',
      'Premium-grade leather with reinforced stitching',
      'Anatomically contoured panels for horse comfort',
      'Custom sizing and leather finish options available'
    ],
    'Eventing / Cross Country Saddle': [
      'Forward-balanced design for cross-country security',
      'Close-contact feel for refined rider communication',
      'Supportive knee and thigh blocks for stability',
      'Lightweight yet reinforced structure for durability',
      'Premium-grade leather with precision stitching',
      'Anatomically contoured panels for horse comfort',
      'Custom sizing and leather finish options available'
    ],
    'All Purpose Saddle': [
      'Balanced seat for stability across disciplines',
      'Moderately forward flaps for flatwork and light jumping',
      'Supportive knee rolls for added rider confidence',
      'Lightweight yet durable construction',
      'Premium-grade leather with precision stitching',
      'Anatomically shaped panels for even weight distribution',
      'Custom seat sizes and leather finishes available'
    ],
    'Exercise Saddle': [
      'Lightweight design for ease during daily training',
      'Balanced seat for rider stability',
      'Minimal bulk for improved responsiveness',
      'Durable construction for high-frequency use',
      'Premium-grade leather with reinforced stitching',
      'Comfortable panel design for even weight distribution',
      'Custom sizing and leather finish options available'
    ],
    'Baby / Pony Saddle': [
      'Scaled design for young riders and ponies',
      'Balanced seat for improved stability and confidence',
      'Lightweight construction for easier handling',
      'Supportive knee rolls for added security',
      'Durable build for long-term use',
      'Premium-grade leather with precision stitching',
      'Available in multiple seat sizes and leather finishes'
    ],
    'Synthetic English Saddle': [
      'Lightweight, weather-resistant construction',
      'Low-maintenance and easy-to-clean material',
      'Balanced seat for everyday riding comfort',
      'Durable synthetic finish resistant to moisture',
      'Supportive knee rolls for added stability',
      'Anatomically shaped panels for even weight distribution',
      'Available in multiple seat sizes and colour options'
    ],
    'Trail Saddle': [
      'Deep, secure seat for long-hour comfort',
      'Ergonomic design to reduce rider fatigue',
      'Multiple attachment rings for gear and accessories',
      'Durable construction for rugged terrain use',
      'Balanced weight distribution for horse comfort',
      'Premium-grade materials with reinforced stitching',
      'Custom sizing and leather finish options available'
    ],
    'Pleasure Saddle': [
      'Deep, cushioned seat for superior comfort',
      'Refined cantle and elegant profile for show presentation',
      'Balanced design for smooth, relaxed riding',
      'Lightweight yet durable construction',
      'Premium-grade leather with detailed stitching',
      'Even weight distribution for horse comfort',
      'Custom seat sizes and leather finishes available'
    ],
    'Barrel Racing Saddle': [
      'Deep seat for enhanced rider security',
      'High cantle for added stability during sharp turns',
      'Lightweight, forward-balanced design for speed',
      'Reinforced tree and rigging for high-impact performance',
      'Close-contact feel for improved control',
      'Premium-grade leather with durable stitching',
      'Custom seat sizes and leather finishes available'
    ],
    'Roping Saddle': [
      'Heavy-duty tree construction for maximum strength',
      'Reinforced rigging to handle strong pulls',
      'Deep, secure seat for rider stability',
      'High-quality horn designed for roping performance',
      'Durable leather with reinforced stitching',
      'Balanced weight distribution for long working hours',
      'Custom seat sizes and leather finish options available'
    ],
    'Ranch Saddle': [
      'Durable tree construction for everyday ranch work',
      'Secure, balanced seat for long riding hours',
      'Reinforced rigging for added strength and stability',
      'Functional design suited for varied ranch tasks',
      'Premium-grade leather with heavy-duty stitching',
      'Even weight distribution for horse comfort',
      'Custom seat sizes and leather finish options available'
    ],
    'Cutting Saddle': [
      'Deep pocket seat for secure positioning',
      'Forward-hung stirrups for improved balance',
      'Close-contact design for enhanced control',
      'Reinforced tree for quick stops and turns',
      'Lightweight yet durable construction',
      'Premium-grade leather with precision stitching',
      'Custom seat sizes and leather finish options available'
    ],
    'Reining Saddle': [
      'Balanced seat for stability during spins and slides',
      'Close-contact design for precise rider communication',
      'Forward-positioned stirrups for improved alignment',
      'Reinforced tree for high-performance maneuvers',
      'Lightweight yet durable construction',
      'Premium-grade leather with refined detailing',
      'Custom seat sizes and leather finish options available'
    ],
    'Wade Saddle': [
      'Traditional Wade-style tree construction',
      'Wood post horn designed for strength and durability',
      'Deep, secure seat for long working hours',
      'Clean, functional design with minimal bulk',
      'Reinforced rigging for reliable performance',
      'Premium-grade leather with heavy-duty stitching',
      'Custom seat sizes and leather finish options available'
    ],
    'Western Show Saddle': [
      'Elegant show-ring profile with refined cantle design',
      'Intricate tooling and detailed craftsmanship',
      'Balanced seat for confident presentation',
      'Lightweight yet durable construction',
      'Precision-finished premium-grade leather',
      'Reinforced structure for performance stability',
      'Custom tooling patterns, seat sizes, and leather finishes available'
    ],
    'Mexican Western Saddle': [
      'Traditional Mexican-inspired tooling and detailing',
      'Deep, secure seat for enhanced rider stability',
      'Strong tree construction for reliable performance',
      'Decorative accents with precision craftsmanship',
      'Premium-grade leather with reinforced stitching',
      'Balanced weight distribution for rider and horse comfort',
      'Custom tooling patterns, seat sizes, and leather finishes available'
    ],
    'Polo Saddle': [
      'Lightweight design for enhanced agility',
      'Close-contact structure for improved rider control',
      'Forward seat positioning for balanced play',
      'Minimal bulk for maximum responsiveness',
      'Reinforced construction for high-intensity use',
      'Premium-grade leather with durable stitching',
      'Custom seat sizes and leather finish options available'
    ],
    'Endurance Saddle': [
      'Lightweight design for long-distance efficiency',
      'Ergonomic seat to reduce rider fatigue',
      'Close-contact structure for refined control',
      'Even weight distribution for horse comfort',
      'Reinforced construction for rugged terrain use',
      'Premium-grade materials with durable stitching',
      'Custom seat sizes and leather finish options available'
    ],
    'Treeless Saddle': [
      'Treeless construction for enhanced flexibility',
      'Close-contact design for improved rider feel',
      'Lightweight build for greater comfort',
      'Even pressure distribution to support horse movement',
      'Streamlined profile with minimal bulk',
      'Premium-grade materials with reinforced stitching',
      'Custom seat sizes and finish options available'
    ],
    'Stock Saddle (Australian)': [
      'Deep seat for improved rider security',
      'Prominent knee pads (poleys) for added stability',
      'Balanced design for varied terrain riding',
      'Durable tree construction for long-term reliability',
      'Even weight distribution for horse comfort',
      'Premium-grade leather with reinforced stitching',
      'Custom seat sizes and leather finish options available'
    ],
    'Half-Breed Saddle': [
      'Hybrid design blending stock and traditional saddle elements',
      'Supportive knee pads for enhanced rider stability',
      'Deep, balanced seat for long-hour comfort',
      'Durable tree construction for reliable performance',
      'Even weight distribution for horse comfort',
      'Premium-grade leather with reinforced stitching',
      'Custom seat sizes and leather finish options available'
    ],
    'Trooper Saddle': [
      'Secure, balanced seat for extended riding',
      'Supportive structure for enhanced stability',
      'Durable tree construction for long-term reliability',
      'Designed for varied terrain and endurance use',
      'Even weight distribution for horse comfort',
      'Premium-grade leather with reinforced stitching',
      'Custom seat sizes and leather finish options available'
    ],
    'Vaquera Saddle': [
      'Traditional Vaquera-style design',
      'Deep seat for enhanced rider security',
      'Balanced structure for classical riding posture',
      'Durable tree construction for long-term performance',
      'Even weight distribution for horse comfort',
      'Premium-grade leather with refined detailing',
      'Custom seat sizes and leather finish options available'
    ],
    'Icelandic Saddle': [
      'Forward-balanced seat for gait support',
      'Lightweight construction for enhanced responsiveness',
      'Close-contact design for improved rider feel',
      'Compact panel structure for freedom of movement',
      'Even weight distribution for horse comfort',
      'Premium-grade leather with reinforced stitching',
      'Custom seat sizes and leather finish options available'
    ],
    'English Bridle': [
      'Anatomically designed headpiece for enhanced comfort',
      'Soft, durable leather with refined stitching',
      'Adjustable cheekpieces and noseband for precise fit',
      'Balanced rein attachment for improved communication',
      'Elegant, discipline-appropriate design',
      'Reinforced hardware for long-lasting performance',
      'Custom sizing and leather finish options available'
    ],
    'Dressage Bridle': [
      'Anatomically shaped headpiece for enhanced comfort',
      'Padded browband and noseband for even pressure distribution',
      'Refined noseband design for controlled performance',
      'Soft, high-quality leather with precision stitching',
      'Durable, corrosion-resistant hardware',
      'Elegant finish suitable for competition presentation',
      'Custom sizing and leather finish options available'
    ],
    'Jumping Bridle': [
      'Secure, performance-focused design for jumping disciplines',
      'Padded headpiece and noseband for enhanced comfort',
      'Adjustable cheekpieces for precise fit',
      'Durable, reinforced stitching for high-impact use',
      'Corrosion-resistant hardware for long-lasting reliability',
      'Lightweight construction for improved responsiveness',
      'Custom sizing and leather finish options available'
    ],
    'Snaffle Bridle': [
      'Designed for use with snaffle bits',
      'Balanced construction for clear rider communication',
      'Padded headpiece and noseband for enhanced comfort',
      'Adjustable cheekpieces for precise fit',
      'Durable hardware with reinforced stitching',
      'Suitable for training and competition use',
      'Custom sizing and leather finish options available'
    ],
    'Double Bridle': [
      'Designed for use with snaffle and curb bits',
      'Anatomically shaped headpiece for enhanced comfort',
      'Padded browband and noseband for even pressure distribution',
      'Dual rein system for refined rider communication',
      'Durable, corrosion-resistant hardware',
      'Elegant finish suitable for competition use',
      'Custom sizing and leather finish options available'
    ],
    'Hunter Bridle': [
      'Traditional, clean-lined hunter design',
      'Plain browband and cavesson noseband for classic appearance',
      'Soft, durable leather with refined stitching',
      'Adjustable cheekpieces for precise fit',
      'Balanced construction for clear rein contact',
      'Corrosion-resistant hardware for long-term reliability',
      'Custom sizing and leather finish options available'
    ],
    'Figure 8 Bridle': [
      'Figure 8 (Grackle) noseband for enhanced stability',
      'Improved airflow and reduced pressure on the nasal passages',
      'Secure fit for high-intensity riding',
      'Padded headpiece for added comfort',
      'Reinforced stitching for durability',
      'Corrosion-resistant hardware',
      'Custom sizing and leather finish options available'
    ],
    'Anatomical Bridle': [
      'Ergonomically shaped headpiece to reduce poll pressure',
      'Contoured design to allow greater ear freedom',
      'Padded noseband for even pressure distribution',
      'Precision stitching with durable hardware',
      'Balanced rein contact for improved communication',
      'Lightweight construction for enhanced comfort',
      'Custom sizing and leather finish options available'
    ],
    'Spanish Bridle': [
      'Traditional Spanish-inspired design',
      'Decorative detailing with refined craftsmanship',
      'Balanced construction for controlled performance',
      'Soft, durable leather with precision stitching',
      'Reinforced hardware for long-lasting reliability',
      'Comfortable fit designed for extended riding',
      'Custom sizing and leather finish options available'
    ],
    'Icelandic Bridle': [
      'Lightweight design for enhanced comfort',
      'Balanced rein contact for clear communication',
      'Streamlined construction for minimal bulk',
      'Soft, durable leather with refined stitching',
      'Adjustable components for precise fit',
      'Reinforced hardware for long-term reliability',
      'Custom sizing and leather finish options available'
    ],
    'Polo Bridle': [
      'Lightweight, streamlined design for enhanced agility',
      'Secure fit for high-speed performance',
      'Close-contact rein positioning for precise control',
      'Durable leather with reinforced stitching',
      'Corrosion-resistant hardware for long-term use',
      'Balanced construction for rider stability',
      'Custom sizing and leather finish options available'
    ],
    'Biothane Bridle': [
      'Durable Biothane construction resistant to moisture and sweat',
      'Low-maintenance and easy-to-clean surface',
      'Lightweight design for enhanced comfort',
      'Flexible yet strong material for reliable performance',
      'Corrosion-resistant hardware',
      'Suitable for varied weather and riding conditions',
      'Custom sizing and colour options available'
    ],
    'PVC Bridle': [
      'Durable PVC construction resistant to moisture',
      'Low-maintenance and easy-to-clean surface',
      'Lightweight design for everyday use',
      'Strong, reinforced stitching for added durability',
      'Corrosion-resistant hardware',
      'Suitable for riding schools and training environments',
      'Available in multiple sizes and colour options'
    ],
    'Nylon Bridle': [
      'Strong woven nylon construction for durability',
      'Lightweight design for everyday comfort',
      'Flexible material for ease of use',
      'Adjustable components for proper fit',
      'Rust-resistant hardware for long-term reliability',
      'Low-maintenance and easy to clean',
      'Available in multiple sizes and colour options'
    ],
    'Crownpiece': [
      'Anatomically contoured design for reduced poll pressure',
      'Soft padding for enhanced comfort',
      'Even weight distribution across the head',
      'Durable leather with precision stitching',
      'Reinforced attachment points for stability',
      'Compatible with multiple bridle configurations',
      'Custom sizing and leather finish options available'
    ],
    'Browband': [
      'Designed for secure and balanced bridle positioning',
      'Smooth, durable leather construction',
      'Soft lining for enhanced comfort',
      'Precision stitching for long-term durability',
      'Available in plain, padded, or decorative styles',
      'Compatible with various bridle configurations',
      'Custom sizing and finish options available'
    ],
    'Throatlatch': [
      'Designed for secure bridle stability',
      'Adjustable fit for proper positioning',
      'Smooth, durable leather construction',
      'Flexible design for unrestricted movement',
      'Reinforced stitching for long-term durability',
      'Corrosion-resistant hardware',
      'Compatible with various bridle configurations'
    ],
    'Cheekpiece(s)': [
      'Adjustable design for accurate bit positioning',
      'Durable leather construction with precision stitching',
      'Balanced length for consistent rein contact',
      'Reinforced buckle and hardware attachments',
      'Smooth finish for enhanced comfort',
      'Compatible with various bridle styles',
      'Custom sizing and leather finish options available'
    ],
    'Noseband': [
      'Designed for secure and balanced positioning',
      'Adjustable fit for accurate pressure control',
      'Smooth, durable leather construction',
      'Soft padding for enhanced comfort',
      'Reinforced stitching for long-term reliability',
      'Corrosion-resistant hardware',
      'Available in various styles and sizes'
    ],
    'Flash Strap': [
      'Designed for use with cavesson nosebands',
      'Supports improved bit stability',
      'Adjustable fit for controlled pressure',
      'Smooth, durable leather construction',
      'Reinforced stitching for long-term durability',
      'Secure hardware for reliable fastening',
      'Available in multiple sizes and finishes'
    ],
    'Reins': [
      'Designed for balanced and responsive rein contact',
      'Durable leather and reinforced stitching',
      'Secure grip options for enhanced control',
      'Even weight distribution for steady handling',
      'Strong buckle or hook attachments',
      'Suitable for training and competitive use',
      'Custom lengths, widths, and finish options available'
    ],
    'Leather Halter': [
      'Strong, durable leather construction',
      'Adjustable crown and noseband for precise fit',
      'Smooth finish for enhanced comfort',
      'Reinforced stitching for added durability',
      'Solid, corrosion-resistant hardware',
      'Suitable for everyday handling and show use',
      'Custom sizing and leather finish options available'
    ],
    'Nylon Halter': [
      'Strong woven nylon construction',
      'Adjustable crown and noseband for proper fit',
      'Lightweight design for everyday comfort',
      'Reinforced stitching for added durability',
      'Rust-resistant hardware for long-term use',
      'Easy to clean and maintain',
      'Available in multiple sizes and colour options'
    ],
    'Rope Halter': [
      'Lightweight, knot-based rope construction',
      'Designed for groundwork and training applications',
      'Provides clear and responsive pressure cues',
      'Durable material resistant to wear',
      'Minimal bulk for improved control',
      'Suitable for daily handling and training',
      'Available in multiple sizes and colour options'
    ],
    'Show Halter': [
      'Elegant, show-ring focused design',
      'Refined leather finish with precision stitching',
      'Adjustable crown and noseband for tailored fit',
      'Durable, polished hardware for enhanced presentation',
      'Balanced structure for secure positioning',
      'Suitable for competitions and exhibitions',
      'Custom sizing and decorative finish options available'
    ],
    'Horse Head Collar': [
      'Strong, durable construction for daily handling',
      'Adjustable crown and noseband for accurate fit',
      'Comfortable design for extended wear',
      'Reinforced stitching for long-term reliability',
      'Corrosion-resistant hardware',
      'Suitable for stable, transport, and turnout use',
      'Available in multiple sizes and material options'
    ],
    'PVC Halter': [
      'Durable PVC construction resistant to moisture',
      'Smooth, easy-to-clean surface',
      'Adjustable crown and noseband for proper fit',
      'Reinforced stitching for added strength',
      'Corrosion-resistant hardware',
      'Suitable for stable, transport, and turnout use',
      'Available in multiple sizes and colour options'
    ],
    'Lead Rope (Cotton / Nylon / Leather)': [
      'Available in cotton, nylon, and leather options',
      'Strong, durable construction for daily handling',
      'Comfortable grip for secure control',
      'Reinforced stitching and secure snap attachments',
      'Suitable for stable use, transport, and training',
      'Designed for long-term reliability',
      'Custom lengths, finishes, and hardware options available'
    ],
    'Lead Line': [
      'Extended length for controlled training use',
      'Strong, durable construction for reliable performance',
      'Comfortable grip for secure handling',
      'Reinforced stitching for added strength',
      'Secure snap or attachment options available',
      'Suitable for groundwork, training, and stable use',
      'Custom lengths and material options available'
    ],
    'Leather Girth': [
      'Contoured design for even pressure distribution',
      'Soft, durable leather construction',
      'Smooth finish to reduce friction',
      'Reinforced stitching for enhanced durability',
      'Strong, corrosion-resistant buckles',
      'Elastic or non-elastic options available',
      'Custom sizes and leather finishes available'
    ],
    'Cotton Girth': [
      'Breathable cotton construction for enhanced comfort',
      'Soft, flexible material to reduce friction',
      'Even pressure distribution for stable saddle fit',
      'Durable stitching for long-term reliability',
      'Strong buckle attachments for secure fastening',
      'Suitable for daily training and schooling',
      'Available in multiple sizes and lengths'
    ],
    'Nylon Girth': [
      'Strong woven nylon construction for durability',
      'Moisture-resistant and easy to maintain',
      'Even pressure distribution for stable saddle fit',
      'Reinforced stitching for long-term reliability',
      'Durable buckle attachments for secure fastening',
      'Suitable for training, schooling, and stable use',
      'Available in multiple sizes and lengths'
    ],
    'Elastic Girth': [
      'Integrated elastic sections for controlled flexibility',
      'Promotes even pressure distribution',
      'Supports natural movement and comfort',
      'Durable construction with reinforced stitching',
      'Strong buckle attachments for secure fastening',
      'Suitable for schooling and regular riding use',
      'Available in multiple sizes and configurations'
    ],
    'Dressage Girth': [
      'Anatomically contoured design for improved fit',
      'Even pressure distribution for enhanced comfort',
      'Designed for use with dressage saddles',
      'Soft, durable construction to reduce friction',
      'Reinforced stitching for long-lasting reliability',
      'Strong, corrosion-resistant buckles',
      'Custom sizes and material options available'
    ],
    'Stud Girth': [
      'Extended protective panel for added safety',
      'Designed for jumping and eventing disciplines',
      'Even pressure distribution for stable saddle fit',
      'Durable construction with reinforced stitching',
      'Smooth interior surface to reduce friction',
      'Strong, corrosion-resistant buckles',
      'Custom sizes and material options available'
    ],
    'Western Cinch': [
      'Designed for Western saddle compatibility',
      'Strong, durable construction for demanding use',
      'Even pressure distribution for horse comfort',
      'Reinforced stitching for long-term durability',
      'Heavy-duty hardware for secure fastening',
      'Suitable for ranch, roping, and performance riding',
      'Available in multiple materials and sizes'
    ],
    'Back Cinch': [
      'Designed for Western saddle stability',
      'Helps prevent saddle lift during intense movement',
      'Durable construction for long-term reliability',
      'Even pressure distribution for added comfort',
      'Reinforced stitching for enhanced strength',
      'Secure hardware attachments',
      'Available in multiple sizes and material options'
    ],
    'Iron Stirrups': [
      'Durable iron construction for long-term reliability',
      'Balanced weight distribution for rider stability',
      'Secure foot support for improved control',
      'Smooth, precision-finished edges',
      'Compatible with various stirrup leathers',
      'Suitable for training and competition use',
      'Available in multiple sizes and finishes'
    ],
    'Stainless Steel Stirrups': [
      'Corrosion-resistant stainless steel construction',
      'Polished finish for refined appearance',
      'Balanced weight distribution for rider stability',
      'Secure foot support for improved control',
      'Smooth, precision-finished edges',
      'Compatible with various stirrup leathers',
      'Available in multiple sizes and designs'
    ],
    'Brass Stirrups': [
      'Solid brass construction for durability and strength',
      'Classic finish for refined appearance',
      'Balanced weight distribution for rider stability',
      'Secure foot support for improved control',
      'Smooth, precision-finished edges',
      'Compatible with various stirrup leathers',
      'Available in multiple sizes and designs'
    ],
    'Fibre / Plastic Stirrups': [
      'Lightweight fibre / plastic construction',
      'Durable and moisture-resistant material',
      'Balanced design for rider stability',
      'Secure foot support for improved control',
      'Low-maintenance and easy to clean',
      'Suitable for training and everyday riding',
      'Available in multiple sizes and colours'
    ],
    'Safety Stirrups': [
      'Designed to help reduce risk of foot entrapment',
      'Integrated safety release or flexible branch design',
      'Durable construction for long-term reliability',
      'Balanced weight distribution for rider stability',
      'Secure foot support for improved control',
      'Suitable for jumping, eventing, and general riding',
      'Available in multiple sizes and finishes'
    ],
    'Aluminum Stirrups': [
      'Lightweight aluminum construction for improved comfort',
      'Strong and durable design for long-term reliability',
      'Balanced structure for rider stability',
      'Secure foot support for enhanced control',
      'Corrosion-resistant finish',
      'Compatible with various stirrup leathers',
      'Available in multiple sizes and styles'
    ],
    'Stirrup Leathers': [
      'Strong, weight-bearing leather construction',
      'Reinforced stitching for enhanced durability',
      'Smooth finish for reduced wear and friction',
      'Adjustable buckle system for precise length setting',
      'Designed for secure stirrup attachment',
      'Suitable for training and competition use',
      'Custom lengths and leather finishes available'
    ],
    'Stirrup Pads': [
      'Anti-slip surface for improved grip',
      'Durable construction for long-term use',
      'Designed to fit various stirrup styles',
      'Shock-absorbing properties for added comfort',
      'Resistant to wear and weather exposure',
      'Easy to install and replace',
      'Available in multiple sizes and materials'
    ],
    'Stirrup Belts': [
      'Strong, tension-resistant construction',
      'Adjustable design for precise positioning',
      'Reinforced stitching for added durability',
      'Secure buckle or fastening system',
      'Designed for stable stirrup attachment',
      'Suitable for training and practical riding setups',
      'Custom lengths and material options available'
    ],
    'All Purpose Saddle Pad': [
      'Contoured design for all-purpose saddle compatibility',
      'Shock-absorbing padding for enhanced comfort',
      'Breathable construction to promote airflow',
      'Durable outer material for long-term use',
      'Soft lining to reduce friction and irritation',
      'Reinforced girth straps for secure positioning',
      'Available in multiple sizes, colours, and quilt patterns'
    ],
    'Dressage Saddle Pad': [
      'Contoured shape designed for dressage saddles',
      'Extended cut to fit long, straight flaps',
      'Shock-absorbing padding for enhanced comfort',
      'Breathable construction to promote airflow',
      'Soft inner lining to reduce friction',
      'Reinforced girth loops for secure placement',
      'Available in multiple sizes, colours, and quilt patterns'
    ],
    'Half Pad': [
      'Additional cushioning for enhanced comfort',
      'Promotes even pressure distribution',
      'Supports improved saddle fit and balance',
      'Shock-absorbing construction',
      'Breathable materials for better airflow',
      'Lightweight and easy to position',
      'Available in multiple sizes and material options'
    ],
    'Jumping Saddle Pad': [
      'Forward-cut design for jumping saddle compatibility',
      'Shock-absorbing padding for impact protection',
      'Breathable construction to promote airflow',
      'Contoured shape for secure saddle fit',
      'Soft lining to minimize friction',
      'Reinforced girth straps for stability',
      'Available in multiple sizes, colours, and quilt styles'
    ],
    'Bareback Pad': [
      'Close-contact design for enhanced rider feel',
      'Cushioned padding for improved comfort',
      'Non-slip underside for added stability',
      'Lightweight construction for ease of use',
      'Secure girth attachment system',
      'Soft lining to reduce friction',
      'Available in multiple sizes and finishes'
    ],
    'Western Saddle Pad': [
      'Designed specifically for Western saddle compatibility',
      'Thick, shock-absorbing construction',
      'Even weight distribution for enhanced comfort',
      'Durable outer material for rugged use',
      'Contoured shape for secure positioning',
      'Reinforced wear areas for extended durability',
      'Available in multiple sizes, materials, and designs'
    ],
    'Saddle Blanket (Cotton / Wool / Fleece)': [
      'Available in cotton, wool, and fleece options',
      'Provides cushioning and pressure distribution',
      'Breathable construction for enhanced comfort',
      'Durable stitching for long-term use',
      'Suitable for Western and general riding applications',
      'Easy to maintain and clean',
      'Available in multiple sizes, colours, and patterns'
    ],
    'Studded Western Blankets': [
      'Decorative stud detailing for authentic Western style',
      'Durable construction for long-term use',
      'Provides cushioning and pressure distribution',
      'Suitable for Western saddle compatibility',
      'Reinforced edges for enhanced durability',
      'Breathable material options available',
      'Custom sizes, colours, and stud patterns available'
    ],
    'Breastplate (English / Western)': [
      'High-quality leather with smooth, refined finish',
      'Designed for saddle stability and secure fit',
      'Suitable for English and Western disciplines',
      'Reinforced stitching for enhanced strength',
      'Adjustable straps for customised fitting',
      'Durable metal hardware with corrosion resistance',
      'Comfort-focused design to reduce pressure points',
      'Available in multiple styles, colours, and custom configurations'
    ],
    'Breast Collar (Western)': [
      'Premium quality leather with durable finishing',
      'Designed for enhanced saddle stability during active riding',
      'Strong center ring and reinforced stress points',
      'Heavy-duty hardware for long-term performance',
      'Comfort-focused design to prevent restriction',
      'Available in plain, tooled, studded, and concho styles',
      'Custom sizes, colours, tooling patterns, and hardware options available',
      'Suitable for professional and everyday Western use',
      'Competitive pricing for bulk and export orders'
    ],
    'Running Martingale': [
      'Premium quality leather with smooth, refined finish',
      'Supports balanced head carriage without over-restriction',
      'Reinforced stitching at high-stress points',
      'Durable, corrosion-resistant metal fittings',
      'Adjustable straps for precise and secure fitting',
      'Designed for jumping, eventing, and training disciplines',
      'Comfort-focused construction to prevent pressure buildup',
      'Available in multiple sizes, colours, and custom configurations',
      'Competitive pricing for bulk and export orders'
    ],
    'Standing Martingale': [
      'Premium quality leather with refined finish',
      'Helps maintain steady head position and rider control',
      'Strong, reinforced stitching at pressure points',
      'Durable, corrosion-resistant metal fittings',
      'Adjustable design for secure and accurate fitting',
      'Suitable for jumping, hunting, and English disciplines',
      'Comfort-focused construction to reduce restriction',
      'Available in multiple sizes, colours, and custom options',
      'Competitive pricing for bulk and export orders'
    ],
    'Tendon Boots': [
      'Durable outer shell for impact resistance',
      'Shock-absorbing inner padding for tendon protection',
      'Lightweight construction for unrestricted movement',
      'Secure fastening system for stable fit',
      'Breathable lining to prevent heat buildup',
      'Designed for jumping, training, and performance use',
      'Easy to clean and maintain',
      'Available in multiple sizes, colours, and custom branding options',
      'Competitive pricing for bulk and export orders'
    ],
    'Fetlock Boots': [
      'Impact-resistant outer shell for fetlock protection',
      'Shock-absorbing inner padding for enhanced safety',
      'Lightweight construction for unrestricted movement',
      'Ergonomic design for secure and comfortable fit',
      'Breathable lining to minimize heat buildup',
      'Secure fastening system for stability during performance',
      'Suitable for jumping, eventing, and training disciplines',
      'Available in multiple sizes, colours, and custom branding options',
      'Competitive pricing for bulk and export orders'
    ],
    'Bell Boots': [
      'Durable outer construction for impact resistance',
      'Shock-absorbing design to protect heel bulbs and coronet area',
      'Flexible structure for natural movement',
      'Secure fastening system for stable positioning',
      'Reinforced edges for enhanced durability',
      'Suitable for training, turnout, and competition use',
      'Easy to clean and maintain',
      'Available in multiple materials, sizes, and colour options',
      'Custom branding and bulk order options available',
      'Competitive pricing for export and wholesale buyers'
    ],
    'Ankle Boots': [
      'Durable outer construction for impact protection',
      'Shock-absorbing inner padding for enhanced safety',
      'Ergonomic design for secure and comfortable fit',
      'Lightweight structure allowing natural movement',
      'Reinforced stitching for added strength',
      'Secure fastening system for stability during performance',
      'Suitable for training, schooling, and competition use',
      'Available in various materials, sizes, and colour options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Leg Wraps': [
      'High-quality, durable fabric construction',
      'Provides controlled compression and tendon support',
      'Breathable material to minimize heat buildup',
      'Soft inner lining for enhanced comfort',
      'Strong hook-and-loop fastening for secure fit',
      'Suitable for training, transport, and stable use',
      'Easy to apply and maintain',
      'Available in multiple lengths, colours, and fabric options',
      'Custom branding and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Bandages': [
      'High-quality, soft yet durable fabric construction',
      'Provides consistent support and controlled compression',
      'Even pressure distribution for tendon protection',
      'Breathable material to reduce heat accumulation',
      'Strong fastening system for secure application',
      'Suitable for training, recovery, transport, and stable use',
      'Easy to apply, wash, and maintain',
      'Available in various lengths, widths, and colour options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Summer Rugs': [
      'Lightweight, breathable fabric construction',
      'Designed for warm weather comfort',
      'Provides protection against dust, insects, and sun exposure',
      'Reinforced stitching for enhanced durability',
      'Secure chest straps and adjustable fittings',
      'Soft inner lining for added comfort',
      'Allows natural movement without restriction',
      'Available in multiple sizes, colours, and fabric options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Winter Rugs': [
      'Durable outer shell with weather-resistant properties',
      'Insulated filling for optimal warmth retention',
      'Breathable design to prevent moisture buildup',
      'Reinforced stitching for enhanced strength',
      'Secure chest straps and adjustable fastening systems',
      'Tail flap and leg straps for improved coverage and stability',
      'Comfort-focused lining to prevent rubbing',
      'Available in various fill weights, sizes, and colours',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Stable Rugs': [
      'Breathable outer fabric designed for indoor use',
      'Insulated filling for controlled warmth',
      'Lightweight construction for comfortable daily wear',
      'Reinforced stitching for long-term durability',
      'Secure chest straps and adjustable fastenings',
      'Soft inner lining to reduce rubbing',
      'Tail cord for added stability',
      'Available in multiple fill weights, sizes, and colours',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Turnout Rugs': [
      'Waterproof and wind-resistant outer fabric',
      'Breathable construction to prevent moisture buildup',
      'Durable ripstop or high-denier fabric options available',
      'Reinforced stitching and sealed seams for enhanced strength',
      'Insulated and non-insulated variants available',
      'Secure chest closures with adjustable straps',
      'Tail flap and leg straps for improved coverage and stability',
      'Designed for long-term outdoor use',
      'Available in multiple fill weights, sizes, and colour options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Fly Rugs': [
      'Lightweight, breathable mesh construction',
      'Provides protection against flies and biting insects',
      'Allows maximum airflow for summer comfort',
      'Durable fabric suitable for daily turnout use',
      'Reinforced stitching for enhanced longevity',
      'Secure chest closures and adjustable fittings',
      'Tail flap and optional neck cover for extended protection',
      'Soft lining at sensitive areas to prevent rubbing',
      'Available in multiple sizes, colours, and mesh densities',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Fleece Rugs': [
      'Premium anti-pill fleece fabric',
      'Excellent moisture-wicking properties',
      'Lightweight warmth without bulk',
      'Soft texture for enhanced comfort',
      'Breathable construction to prevent overheating',
      'Reinforced stitching for durability',
      'Secure chest closures and adjustable fittings',
      'Suitable for post-exercise, travel, and stable use',
      'Available in multiple weights, sizes, and colours',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Horse Blankets': [
      'Premium-quality outer and inner materials',
      'Engineered for comfort, protection, and durability',
      'Available in lightweight, medium, and heavyweight options',
      'Breathable construction to support temperature regulation',
      'Reinforced stitching for long-term performance',
      'Secure chest closures and adjustable fittings',
      'Designed for stable, turnout, travel, and recovery use',
      'Available in multiple sizes, colours, and fabric variations',
      'Customisation, private labelling, and branding options available',
      'Competitive pricing for bulk and export orders'
    ],
    'Horse Clothing': [
      'Premium-quality fabrics and durable construction',
      'Designed for comfort, protection, and seasonal adaptability',
      'Breathable and moisture-managing material options',
      'Reinforced stitching for long-term performance',
      'Secure fastening systems for stable fit',
      'Available in lightweight to heavy-duty variants',
      'Suitable for stable, turnout, travel, and performance use',
      'Wide range of sizes, colours, and functional designs',
      'Customisation, private labelling, and branding options available',
      'Competitive pricing for bulk and export orders'
    ],
    'Grooming Kits': [
      'Comprehensive set of essential grooming tools',
      'Durable construction for regular stable use',
      'Ergonomic designs for comfortable handling',
      'High-quality bristles and materials for effective cleaning',
      'Easy-to-carry storage case or bag options available',
      'Suitable for daily grooming and competition preparation',
      'Available in multiple configurations and colour options',
      'Custom kit combinations available',
      'Private labelling and branding options offered',
      'Competitive pricing for bulk and export orders'
    ],
    'Grooming Brushes': [
      'High-quality bristles for effective dust and dirt removal',
      'Durable brush backs designed for long-term use',
      'Ergonomic grip for comfortable handling',
      'Available in soft, medium, and hard bristle options',
      'Suitable for body, face, and finishing applications',
      'Designed for daily grooming and competition preparation',
      'Easy to clean and maintain',
      'Available in multiple sizes, materials, and colour options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Curry Comb': [
      'Durable, flexible construction for effective cleaning',
      'Helps loosen dirt, mud, and shedding hair',
      'Stimulates circulation for healthy coat maintenance',
      'Ergonomic design for comfortable grip',
      'Suitable for daily grooming routines',
      'Available in rubber, plastic, and metal variants',
      'Easy to clean and maintain',
      'Multiple sizes and designs available',
      'Customisation and private labelling options offered',
      'Competitive pricing for bulk and export orders'
    ],
    'Hoof Pick': [
      'Strong, durable construction for long-term use',
      'Effectively removes dirt, stones, and debris',
      'Ergonomic handle for secure and comfortable grip',
      'Designed for safe and precise hoof cleaning',
      'Suitable for daily stable and competition use',
      'Available with brush attachment options',
      'Multiple material and design variations available',
      'Easy to clean and maintain',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Bit Guards': [
      'Soft, flexible material for enhanced comfort',
      'Helps prevent pinching and lip irritation',
      'Supports stable and consistent rein contact',
      'Durable construction for long-term use',
      'Easy to fit and remove',
      'Compatible with multiple bit styles',
      'Suitable for training and competition environments',
      'Available in multiple sizes, thicknesses, and material options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Fly Mask': [
      'Breathable mesh construction for maximum airflow',
      'Provides protection for eyes and sensitive facial areas',
      'Lightweight design for comfortable extended wear',
      'Soft edging to prevent rubbing and irritation',
      'Secure fastening system for stable fit',
      'Clear visibility without vision obstruction',
      'Optional ear and extended nose coverage variants available',
      'Durable stitching for long-term outdoor use',
      'Available in multiple sizes, colours, and mesh densities',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Fly Veil': [
      'Breathable crochet body for enhanced airflow',
      'Soft, flexible ear fabric for comfort and noise reduction',
      'Lightweight construction for competition use',
      'Ergonomic fit designed to sit securely under the bridle',
      'Reduces irritation from flies and insects',
      'Enhances presentation in dressage and jumping disciplines',
      'Durable stitching for long-term performance',
      'Available in multiple colours, trims, and decorative options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Hay Bag': [
      'Durable fabric construction for long-term use',
      'Helps reduce hay waste and maintain feeding efficiency',
      'Reinforced stitching for enhanced strength',
      'Strong hanging straps for secure placement',
      'Designed for stable, travel, and trailer use',
      'Easy to fill and maintain',
      'Available in various sizes and mesh configurations',
      'Breathable material options available',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Hay Net': [
      'High-strength, durable net construction',
      'Promotes controlled, slow feeding',
      'Helps reduce hay waste and maintain cleanliness',
      'Reinforced knots for enhanced durability',
      'Strong hanging loops for secure attachment',
      'Available in multiple mesh sizes for feeding control',
      'Suitable for stable, paddock, and travel use',
      'Easy to fill and maintain',
      'Available in various sizes and colour options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Feed Bucket': [
      'Durable, impact-resistant construction',
      'Suitable for feed, supplements, and water use',
      'Reinforced rim for added strength',
      'Sturdy handle for easy carrying and hanging',
      'Smooth interior surface for easy cleaning',
      'Designed for stable, paddock, and travel use',
      'Available in multiple capacities and colour options',
      'Stackable design for convenient storage',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Water Tub': [
      'Heavy-duty, impact-resistant construction',
      'Suitable for stable, paddock, and outdoor use',
      'Reinforced rim for enhanced strength',
      'Weather-resistant material for long-term durability',
      'Smooth interior surface for easy cleaning',
      'Stable base design to prevent tipping',
      'Available in multiple capacities and shapes',
      'Stackable options for convenient storage',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Snaffle Bit': [
      'High-quality stainless steel and alloy material options',
      'Designed for direct, balanced rein communication',
      'Smooth, polished finish for enhanced comfort',
      'Even pressure distribution for improved responsiveness',
      'Available in single-joint, double-joint, and mullen mouth designs',
      'Suitable for training and competition use',
      'Corrosion-resistant construction for long-term durability',
      'Available in multiple sizes, ring styles, and thickness options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Pelham Bit': [
      'High-quality stainless steel and alloy material options',
      'Combines snaffle and curb action for refined control',
      'Smooth, polished finish for enhanced comfort',
      'Even pressure distribution for balanced communication',
      'Compatible with curb chain and dual rein setup',
      'Available in single-joint, double-joint, and mullen mouth designs',
      'Corrosion-resistant construction for long-term durability',
      'Suitable for show jumping, hunting, and performance disciplines',
      'Available in multiple sizes, shank lengths, and ring styles',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Double Ring Bit': [
      'High-quality stainless steel and alloy material options',
      'Multiple ring configuration for adjustable control',
      'Smooth, polished finish for enhanced comfort',
      'Even pressure distribution across contact points',
      'Suitable for jumping and advanced training disciplines',
      'Corrosion-resistant construction for long-term durability',
      'Available in single-joint, double-joint, and mullen mouth designs',
      'Various ring sizes and rein placement options available',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Spurs': [
      'High-quality stainless steel and alloy material options',
      'Smooth, polished finish for refined contact',
      'Designed for precise and controlled rider aids',
      'Ergonomic shape for secure and comfortable fit',
      'Available in various neck lengths and styles',
      'Rowel and non-rowel design options available',
      'Corrosion-resistant construction for durability',
      'Suitable for dressage, jumping, and performance disciplines',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Whips (Leather / Plastic)': [
      'High-quality leather and durable plastic material options',
      'Balanced flexibility for controlled rider communication',
      'Ergonomic handle design for secure grip',
      'Lightweight yet strong construction',
      'Suitable for dressage, jumping, and schooling use',
      'Available in multiple lengths and styles',
      'Reinforced lash or popper for durability',
      'Weather-resistant material options available',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Horse Harness Set': [
      'Premium-quality leather with durable finishing',
      'Complete harness set for driving disciplines',
      'Reinforced stitching for enhanced strength',
      'High-quality, corrosion-resistant metal hardware',
      'Designed for balanced weight distribution and comfort',
      'Suitable for carriage driving and ceremonial use',
      'Available in multiple styles and configurations',
      'Various sizes, colours, and hardware finishes available',
      'Customisation and private labelling options offered',
      'Competitive pricing for bulk and export orders'
    ],
    'Driving Harness (Single / Pair)': [
      'Premium-quality leather with durable finishing',
      'Available in single-horse and pair configurations',
      'Reinforced stitching for enhanced strength and longevity',
      'High-quality, corrosion-resistant metal fittings',
      'Designed for balanced weight distribution and comfort',
      'Suitable for carriage driving, training, and ceremonial use',
      'Adjustable straps for precise fitting',
      'Multiple style, colour, and hardware finish options available',
      'Customisation and private labelling options offered',
      'Competitive pricing for bulk and export orders'
    ],
    'Marathon Harness': [
      'Premium-grade leather and reinforced material options',
      'Designed specifically for marathon and combined driving',
      'Enhanced stability for high-speed maneuvering',
      'Reinforced stitching at critical stress points',
      'Heavy-duty, corrosion-resistant metal hardware',
      'Balanced weight distribution for improved comfort',
      'Adjustable components for precise and secure fitting',
      'Suitable for professional competition use',
      'Available in multiple sizes, configurations, and finishes',
      'Customisation and private labelling options available',
      'Competitive pricing for bulk and export orders'
    ],
    'Patent Harness': [
      'Premium leather with high-gloss patent finish',
      'Designed for ceremonial and show presentation',
      'Reinforced stitching for structural durability',
      'High-quality, corrosion-resistant metal fittings',
      'Balanced construction for secure and comfortable fit',
      'Suitable for formal carriage and parade use',
      'Available in multiple styles and configurations',
      'Various sizes, colours, and hardware finishes available',
      'Customisation and private labelling options offered',
      'Competitive pricing for bulk and export orders'
    ],
    'Riding Breeches': [
      'Premium stretch fabric for enhanced flexibility',
      'Breathable and moisture-wicking material options',
      'Ergonomic tailoring for secure and comfortable fit',
      'Full seat and knee patch grip options available',
      'Reinforced stitching for durability',
      'Designed for training and competition use',
      'Elastic ankle panels for seamless boot fit',
      'Available in multiple sizes, colours, and fabric variations',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Jodhpurs': [
      'Premium stretch fabric for flexibility and comfort',
      'Breathable and moisture-managing material options',
      'Ergonomic design for natural movement',
      'Reinforced stitching for enhanced durability',
      'Elastic or reinforced ankle design for secure fit',
      'Full seat and knee patch options available',
      'Suitable for training, schooling, and competition use',
      'Available in multiple sizes, colours, and fabric variations',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Riding Tights': [
      'Premium four-way stretch fabric for superior flexibility',
      'Lightweight and breathable construction',
      'Moisture-wicking technology for all-day comfort',
      'Full seat and knee grip options available',
      'High-rise waistband for secure and supportive fit',
      'Flatlock seams to reduce chafing',
      'Designed for training and everyday riding use',
      'Side pockets for convenience and practicality',
      'Available in multiple sizes, colours, and fabric variations',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Riding Jackets': [
      'Premium technical fabric construction',
      'Breathable and moisture-managing material options',
      'Lightweight yet durable design',
      'Ergonomic tailoring for freedom of movement',
      'Weather-resistant variants available',
      'Reinforced stitching for long-term durability',
      'Secure zipper and fastening systems',
      'Suitable for training and competition environments',
      'Available in multiple styles, sizes, and colour options',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Riding Shirts': [
      'Premium breathable and moisture-wicking fabrics',
      'Lightweight construction for enhanced comfort',
      'Stretch material for unrestricted movement',
      'Ergonomic fit designed for riding posture',
      'Quick-dry fabric options available',
      'Reinforced stitching for durability',
      'Competition collar and casual variants available',
      'Suitable for training and show environments',
      'Available in multiple sizes, colours, and fabric styles',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Belts': [
      'Premium-quality leather and durable material options',
      'Reinforced stitching for enhanced strength',
      'High-quality metal buckles and hardware',
      'Designed for riding and everyday use',
      'Comfortable and secure fit',
      'Classic and contemporary style variations available',
      'Available in multiple sizes, colours, and finishes',
      'Customisation and private labelling options offered',
      'Competitive pricing for bulk and export orders'
    ],
    'Riding Helmets': [
      'High-impact resistant outer shell construction',
      'Shock-absorbing inner liner for enhanced protection',
      'Lightweight design for rider comfort',
      'Ventilation system for improved airflow',
      'Adjustable fit mechanism for secure positioning',
      'Soft, removable, and washable inner padding',
      'Suitable for training and competition environments',
      'Available in multiple sizes, finishes, and design variations',
      'Customisation and private labelling options available',
      'Competitive pricing for bulk and export orders'
    ],
    'Body Protectors': [
      'Multi-layer impact-absorbing foam construction',
      'Durable outer shell for long-lasting performance',
      'Ergonomic panel design for flexible movement',
      'Lightweight structure for rider comfort',
      'Adjustable straps for precise and secure fit',
      'Breathable inner lining for temperature regulation',
      'Suitable for cross-country, jumping, and training use',
      'Available in multiple sizes and configurations',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Riding Gloves': [
      'Premium-quality leather and synthetic material options',
      'Enhanced grip panels for secure rein control',
      'Flexible construction for natural hand movement',
      'Breathable fabric for all-day comfort',
      'Reinforced palm areas for durability',
      'Secure wrist closure for stable fit',
      'Suitable for training and competition use',
      'Available in multiple sizes, colours, and styles',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Riding Chaps (Half / Full)': [
      'Premium leather and durable synthetic material options',
      'Available in half and full chap configurations',
      'Enhanced grip for improved leg stability',
      'Flexible construction for natural movement',
      'Reinforced inner panels for durability',
      'Secure zipper and fastening systems',
      'Comfort-focused ergonomic design',
      'Suitable for training and competition use',
      'Available in multiple sizes, colours, and finishes',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Riding Boots (Long / Ankle)': [
      'Premium leather and durable material options',
      'Available in long and ankle boot styles',
      'Reinforced sole construction for enhanced grip',
      'Ergonomic design for comfort and stability',
      'Breathable lining for improved comfort',
      'Durable stitching for long-term performance',
      'Secure zipper and fastening systems',
      'Suitable for training and competition use',
      'Available in multiple sizes, colours, and finishes',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Saddle Bags': [
      'Premium leather and durable synthetic material options',
      'Designed for trail riding and endurance use',
      'Secure attachment system for stable positioning',
      'Reinforced stitching for enhanced strength',
      'Multiple compartments for organised storage',
      'Weather-resistant material options available',
      'Lightweight construction for balanced weight distribution',
      'Suitable for long-distance and recreational riding',
      'Available in multiple sizes, colours, and styles',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Horn Bags': [
      'Premium leather and heavy-duty material options',
      'Designed specifically for Western saddle horn attachment',
      'Balanced dual-pocket configuration for stability',
      'Reinforced stitching for enhanced strength',
      'Secure fastening straps for reliable positioning',
      'Weather-resistant material options available',
      'Suitable for trail riding, ranch work, and endurance use',
      'Lightweight design for balanced weight distribution',
      'Available in multiple sizes, colours, and styles',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Backpacks': [
      'Durable, high-quality fabric construction',
      'Spacious main compartment with organised storage sections',
      'Reinforced stitching for long-term durability',
      'Strong zipper systems for secure closure',
      'Ergonomic shoulder straps for comfortable carrying',
      'Suitable for stable, competition, and travel use',
      'Lightweight yet sturdy design',
      'Available in multiple sizes, colours, and styles',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Messenger Bags': [
      'Premium leather and durable material options',
      'Spacious main compartment with organised interior sections',
      'Reinforced stitching for enhanced durability',
      'Secure zipper or flap closure systems',
      'Adjustable shoulder strap for comfortable carrying',
      'Suitable for travel, stable, and daily use',
      'Structured design for professional presentation',
      'Available in multiple sizes, colours, and finishes',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Laptop Bags': [
      'Premium leather and durable material options',
      'Padded laptop compartment for impact protection',
      'Organized interior sections for documents and accessories',
      'Reinforced stitching for enhanced durability',
      'Strong zipper and secure closure systems',
      'Comfortable handles and adjustable shoulder strap',
      'Suitable for business travel and daily office use',
      'Available in multiple sizes and finishes',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Tote Bags': [
      'Premium leather and durable material options',
      'Spacious main compartment for versatile use',
      'Reinforced stitching for enhanced strength',
      'Sturdy handles for comfortable carrying',
      'Organized interior pockets for added convenience',
      'Suitable for travel, daily use, and lifestyle needs',
      'Lightweight yet durable construction',
      'Available in multiple sizes, colours, and finishes',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Waist Bags': [
      'Premium leather and durable material options',
      'Compact design for hands-free convenience',
      'Secure zipper closures for safe storage',
      'Adjustable waist strap for comfortable fit',
      'Reinforced stitching for enhanced durability',
      'Multiple compartments for organised storage',
      'Lightweight yet sturdy construction',
      'Suitable for travel, outdoor, and daily use',
      'Available in various sizes, colours, and finishes',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Wallets': [
      'Premium leather and durable material options',
      'Structured design with organised card and cash compartments',
      'Reinforced stitching for enhanced longevity',
      'Slim and compact profile for comfortable carrying',
      'Smooth finishing for refined appearance',
      'Secure closure options available',
      'Suitable for everyday and professional use',
      'Available in multiple styles, sizes, and finishes',
      'Customisation, embossing, and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
    'Wrist Bands': [
      'Premium leather and durable material options',
      'Comfortable and ergonomic fit',
      'Reinforced stitching for long-term durability',
      'Secure buckle or snap closure systems',
      'Smooth finishing for refined presentation',
      'Lightweight design for everyday wear',
      'Available in multiple sizes, colours, and finishes',
      'Decorative, embossed, and studded options available',
      'Customisation and private labelling available',
      'Competitive pricing for bulk and export orders'
    ],
  };

  return {
    name: productName,
    description: descriptions[productName] || `Premium ${productName.toLowerCase()} crafted with quality materials and expert attention to detail. Our manufacturing process ensures durability and performance that meets international standards.`,
    features: features[productName] || [
      'Premium quality materials',
      'Expert craftsmanship',
      'Customisation available',
      'International quality standards',
      'Competitive pricing for bulk orders'
    ],
    image: imageSource
  };
}
