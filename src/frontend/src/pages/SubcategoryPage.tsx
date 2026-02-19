import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { productCategories } from '../data/productTaxonomy';
import { toSlug } from '../utils/slug';
import { ArrowLeft } from 'lucide-react';
import SubcategoryCard from '../components/SubcategoryCard';
import ProductQuickViewModal from '../components/ProductQuickViewModal';

// Saddle images
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

// Bridle images
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


// Halters & Leads images
import Halter_1 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/1_leather.png";
import Halter_2 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/2_nylon.png";
import Halter_3 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/3_rope.png";
import Halter_4 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/4_pvc.png";
import Halter_5 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/5_show.png";
import Halter_6 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/HALTERS/6_head_collar.png";

import Lead_1 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/LEADS/1_rope.png";
import Lead_2 from "../assets/generated/SUBCATEGORY/HALTERS_LEADS/LEADS/2_line.png";

// Girth & Cinches images
import Girth_1 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/1_leather.png";
import Girth_2 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/2_cotton.png";
import Girth_3 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/3_nylon.png";
import Girth_4 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/4_elastic.png";
import Girth_5 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/5_dressage.png";
import Girth_6 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/GIRTHS/6_stud.png";

import Cinch_1 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/CINCHES/1_western.png";
import Cinch_2 from "../assets/generated/SUBCATEGORY/GIRTHS_CINCHES/CINCHES/2_back.png";

// Stirrups & Accessories images
import Stirrups_1 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/1_iron.png";
import Stirrups_2 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/2_steel.png";
import Stirrups_3 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/3_aluminium.png";
import Stirrups_4 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/4_brass.png";
import Stirrups_5 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/5_plastic.png";
import Stirrups_6 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/STIRRUPS/6_safety.png";

import Accessory_1 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/1_stirrup_leather.png";
import Accessory_2 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/2_stirrup_pads.png";
import Accessory_3 from "../assets/generated/SUBCATEGORY/STIRRUPS_ACCESSORIES/ACCESSORIES/3_stirrup_belt.png";

// Saddle Pads & Blankets images
import Pad_1 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/1_all_purpose.png";
import Pad_2 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/2_dressage.png";
import Pad_3 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/3_jumping.png";
import Pad_4 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/4_Half.png";
import Pad_5 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/5_bareback.png";
import Pad_6 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/PADS/6_Western.png";

import Blanket_1 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/BLANKETS/1_western.png";
import Blanket_2 from "../assets/generated/SUBCATEGORY/SADDLE_PADS_BLANKETS/BLANKETS/2_studded.png";

// Breastplates & Martingales images
import Bp_Mg_1 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/1_breastplate.png";
import Bp_Mg_2 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/2_breastcollar.png";
import Bp_Mg_3 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/3_running.png";
import Bp_Mg_4 from "../assets/generated/SUBCATEGORY/BREASTPLATES_MARTINGALES/4_standing.png";

// Horse Leg Protection images
import Leg_1 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/1_tendonboot.png";
import Leg_2 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/2_fetlockboot.png";
import Leg_3 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/3_bellboot.png";
import Leg_4 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/4_ankleboot.png";
import Leg_5 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/5_wraps.png";
import Leg_6 from "../assets/generated/SUBCATEGORY/HORSE_LEG_PROTECTION/6_bandage.png";

// Rugs, Blankets and Clothing images
import Rug_1 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/1_summer.png";
import Rug_2 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/2_winter.png";
import Rug_3 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/3_stable.png";
import Rug_4 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/4_turnout.png";
import Rug_5 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/5_fly.png";
import Rug_6 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/6_fleece.png";
import Rug_7 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/RUGS_BLANKETS/7_blanket.png";

import Clothing_1 from "../assets/generated/SUBCATEGORY/RUGS_BLANKETS_CLOTHING/CLOTHING/1_clothing.png";

// Horse Care & Stable Accessories images
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

// Bits, Spurs & Control Gear images
import Bit_1 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/1_.snaffleBit.png";
import Bit_2 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/2_pelhamBit.png";
import Bit_3 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/3_doubleJointBit.png";
import Bit_4 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/BITS/4_bitGuards.png";

import Control_1 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/CONTROL_EQUIPMENT/1_spurs.png";
import Control_2 from "../assets/generated/SUBCATEGORY/BITS_SPURS_CONTROL_GEAR/CONTROL_EQUIPMENT/2_whips.png";

// Harness & Driving Equipment images
import Harness_1 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/1_harnessSet.png";
import Harness_2 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/2_drivingHarness.png";
import Harness_3 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/3_marathonHarness.png";
import Harness_4 from "../assets/generated/SUBCATEGORY/HARNESS_DRIVING_EQUIPMENT/4_patentHarness.png";

// Rider Equipment images
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

// Bags & Leather Goods images
import Bag_1 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/1_saddleBag.png";
import Bag_2 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/2_hornBag.png";
import Bag_3 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/3_backpack.png";
import Bag_4 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/4_messengerBag.png";
import Bag_5 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/5_laptopBag.png";
import Bag_6 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/6_toteBag.png";
import Bag_7 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/7_waistBag.png";
import Bag_8 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/8_wallets.png";
import Bag_9 from "../assets/generated/SUBCATEGORY/BAGS_LEATHER_GOODS/9_wristBands.png";

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
    console.log('Open product quick view', { productName, productSlug, resolvedImage: product.image });
    if (!product.image) console.warn('Product image missing for', productName, productSlug);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-page-wrapper pb-32 md:pb-40">
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
              Send Inquiry
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
                const generatedSlug = productType.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[\/()]/g, "");
                const effectiveSlug = productType.slug || generatedSlug;
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

// Helper to generate product details for modal
function getProductDetails(productName: string, categorySlug: string, productSlug?: string): {
  name: string;
  description: string;
  features: string[];
  image: string;
} {
  // Get image based on slug and category
  let imageSource = '/assets/generated/prod-placeholder-saddle.dim_1200x800.png';
  if (categorySlug === 'saddles') {
    imageSource = '/assets/generated/prod-placeholder-saddle.dim_1200x800.png';
    if (productSlug && saddleImageMap[productSlug]) {
      imageSource = saddleImageMap[productSlug];
    }
  } else if (categorySlug === 'bridles-headgear') {
    imageSource = '/assets/generated/prod-placeholder-bridle.dim_1200x800.png';
    if (productSlug) {
      imageSource = bridleImageMapByType[productSlug]
        || bridleImageMapByMaterial[productSlug]
        || bridleImageMapComponents[productSlug]
        || halterImageMap[productSlug]
        || leadImageMap[productSlug]
        || imageSource;
    }
  } else if (categorySlug === 'halters-leads') {
    imageSource = '/assets/generated/prod-placeholder-bridle.dim_1200x800.png';
    if (productSlug) {
      imageSource = halterImageMap[productSlug] || leadImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'girths-cinches') {
    imageSource = '/assets/generated/prod-placeholder-saddle.dim_1200x800.png';
    if (productSlug) {
      imageSource = englishGirthImageMap[productSlug] || westernCinchImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'stirrups-accessories') {
    imageSource = '/assets/generated/prod-placeholder-saddle.dim_1200x800.png';
    if (productSlug) {
      imageSource = stirrupsImageMap[productSlug] || stirrupsAccessoriesImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'saddle-pads-blankets') {
    imageSource = '/assets/generated/prod-placeholder-textile.dim_1200x800.png';
    if (productSlug) {
      imageSource = saddlePadsImageMap[productSlug] || saddleBlanketsImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'breastplates-martingales') {
    imageSource = '/assets/generated/prod-placeholder-leather.dim_1200x800.png';
    if (productSlug) {
      imageSource = breastplatesMartingalesImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'horse-leg-protection') {
    imageSource = '/assets/generated/prod-placeholder-hardware.dim_1200x800.png';
    if (productSlug) {
      imageSource = horseLegProtectionImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'horse-rugs-clothing') {
    imageSource = '/assets/generated/prod-placeholder-textile.dim_1200x800.png';
    if (productSlug) {
      imageSource = rugsBlanketsImageMap[productSlug] || horseClothingImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'horse-care-stable-accessories') {
    imageSource = '/assets/generated/prod-placeholder-grooming.dim_1200x800.png';
    if (productSlug) {
      imageSource = horseCareGroomingImageMap[productSlug] || horseCareStableAccessoriesImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'bits-spurs-control-gear') {
    imageSource = '/assets/generated/prod-placeholder-hardware.dim_1200x800.png';
    if (productSlug) {
      imageSource = bitsImageMap[productSlug] || controlGearImageMap[productSlug] || imageSource;
    }
  } else if (categorySlug === 'harness-driving-equipment') {
    imageSource = '/assets/generated/prod-placeholder-hardware.dim_1200x800.png';
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
    'Dressage Saddle': 'Our dressage saddles are precision-crafted to provide optimal rider position and enhance communication with your horse. Designed with a deep seat and long, straight flaps, these saddles support the classical dressage seat while allowing freedom of movement for both horse and rider.',
    'Monoflap Dressage Saddle': 'Experience closer contact and enhanced feel with our monoflap dressage saddles. The streamlined single-flap design eliminates bulk between rider and horse, offering superior communication and a more refined riding experience for advanced dressage work.',
    'Jumping Saddle': 'Built for security and balance over fences, our jumping saddles feature forward-cut flaps and knee rolls that support the rider in a forward position. Premium leather construction ensures durability through countless training sessions and competitions.',
    'Close Contact Saddle': 'Designed for riders who demand maximum feel and direct communication, our close contact saddles feature minimal padding and a flat seat. Perfect for show jumping and equitation, these saddles allow precise aids and exceptional balance.',
    'Eventing / Cross Country Saddle': 'Versatile by design, our eventing saddles combine the security needed for cross-country with the balance required for show jumping and the comfort for dressage. Built to withstand the rigors of three-phase competition.',
    'All Purpose Saddle': 'The ultimate multi-discipline saddle, suitable for flatwork, jumping, and trail riding. Our all-purpose saddles offer moderate knee rolls and a balanced seat, making them ideal for riders who enjoy variety in their riding activities.',
    'Exercise Saddle': 'Lightweight and practical, our exercise saddles are perfect for daily training and conditioning work. Durable construction withstands frequent use while providing comfort for both horse and rider during extended training sessions.',
    'Baby / Pony Saddle': 'Specially scaled for young riders and ponies, these saddles feature proportions that ensure proper fit and balance. Quality construction means they can be passed down through multiple young riders while maintaining their integrity.',
    'Synthetic English Saddle': 'Weather-resistant and easy to maintain, our synthetic English saddles offer excellent value without compromising on design. Perfect for everyday riding, these saddles resist moisture and require minimal upkeep.',
    'Trail Saddle': 'Engineered for comfort during long hours on the trail, our trail saddles feature deep, secure seats and multiple attachment points for gear. Durable construction ensures reliability on extended wilderness adventures.',
    'Pleasure Saddle': 'Combining comfort with elegance, our pleasure saddles are perfect for leisurely rides and show ring presentations. Luxurious padding and refined styling make every ride a pleasure.',
    'Barrel Racing Saddle': 'Built for speed and agility, our barrel racing saddles feature deep seats and high cantles that keep riders secure through tight turns. Reinforced construction withstands the intense demands of competitive barrel racing.',
  };

  const features: Record<string, string[]> = {
    'Dressage Saddle': [
      'Deep seat for optimal rider position',
      'Long, straight flaps for extended leg contact',
      'Premium leather construction',
      'Adjustable girth straps',
      'Available in multiple sizes and colors'
    ],
    'Jumping Saddle': [
      'Forward-cut flaps for jumping position',
      'Padded knee rolls for security',
      'Reinforced stirrup bars',
      'Premium quality leather',
      'Custom sizing available'
    ],
  };

  return {
    name: productName,
    description: descriptions[productName] || `Premium ${productName.toLowerCase()} crafted with quality materials and expert attention to detail. Our manufacturing process ensures durability and performance that meets international standards.`,
    features: features[productName] || [
      'Premium quality materials',
      'Expert craftsmanship',
      'Customization available',
      'International quality standards',
      'Competitive pricing for bulk orders'
    ],
    image: imageSource
  };
}
