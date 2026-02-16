#!/usr/bin/env node

/**
 * Static Assets Verification Script
 * 
 * This script lists all required static assets and optionally verifies their existence.
 * Run with: node frontend/scripts/list-required-static-assets.mjs
 * Run with verification: node frontend/scripts/list-required-static-assets.mjs --verify
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the required assets from the TypeScript file
const utilsPath = join(__dirname, '../src/utils/requiredStaticAssets.ts');
const utilsContent = readFileSync(utilsPath, 'utf-8');

// Extract asset paths using regex (simple parser for this specific format)
const pathMatches = utilsContent.matchAll(/path: ['"]([^'"]+)['"]/g);
const assetPaths = Array.from(pathMatches).map(match => match[1]);

// Check if verification is requested
const shouldVerify = process.argv.includes('--verify');

console.log('\n📋 Required Static Assets for MeghRaj Exports\n');
console.log('=' .repeat(60));

if (shouldVerify) {
  console.log('\n🔍 Verification Mode: Checking file existence...\n');
}

// Group assets by type
const assetGroups = {
  'Logo': assetPaths.filter(p => p.includes('Screenshot_2026')),
  'Hero Images': assetPaths.filter(p => p.includes('home-hero')),
  'Category Banners': assetPaths.filter(p => p.includes('cat-')),
  'Product Placeholders': assetPaths.filter(p => p.includes('prod-placeholder')),
};

let totalAssets = 0;
let missingAssets = 0;

for (const [groupName, paths] of Object.entries(assetGroups)) {
  console.log(`\n${groupName} (${paths.length}):`);
  console.log('-'.repeat(60));
  
  paths.forEach(path => {
    totalAssets++;
    const publicPath = join(__dirname, '../public', path);
    const exists = existsSync(publicPath);
    
    if (shouldVerify) {
      const status = exists ? '✅' : '❌';
      console.log(`${status} ${path}`);
      if (!exists) missingAssets++;
    } else {
      console.log(`   ${path}`);
    }
  });
}

console.log('\n' + '='.repeat(60));
console.log(`\nTotal required assets: ${totalAssets}`);

if (shouldVerify) {
  console.log(`Found: ${totalAssets - missingAssets}`);
  console.log(`Missing: ${missingAssets}`);
  
  if (missingAssets > 0) {
    console.log('\n⚠️  Warning: Some assets are missing!');
    console.log('Please ensure all required assets are present in frontend/public/assets/generated/');
    process.exit(1);
  } else {
    console.log('\n✅ All required assets are present!');
  }
}

console.log('\n💡 Tip: Run with --verify flag to check if files exist');
console.log('   Example: node frontend/scripts/list-required-static-assets.mjs --verify\n');
