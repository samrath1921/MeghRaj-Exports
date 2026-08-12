#!/usr/bin/env node
/**
 * One-off image optimization pass over public/images (Phase 1 SEO fix, Objective 5).
 *
 * Not wired into the build — this processes checked-in source assets once; there's no
 * need to re-run sharp transforms on every deploy. Re-run manually if new large images
 * are added: `node scripts/optimize-images.mjs`.
 *
 * What it does, and why:
 *  - public/images/factory/*.jpg (opaque photos, up to 5.4MB): resized to a 2200px long
 *    edge and re-encoded at JPEG quality 80, in place. Same filename/format, so no code
 *    references change.
 *  - public/images/bags/**\/*.png: sharp reports 41 of 42 of these have no alpha channel
 *    — they're opaque product photos stored losslessly as PNG, which is a poor fit for
 *    photographic content. Those 41 are converted to .jpg (quality 82, 1800px long edge
 *    cap) and the one genuinely transparent file is kept as PNG, just recompressed and
 *    capped at the same dimension. Every literal "/images/bags/..." path referenced from
 *    src/**\/*.{ts,tsx} is rewritten to match (see rewriteReferences()) — these are all
 *    plain string paths into public/, not ES module imports, so no import statements need
 *    touching.
 *  - src/assets/generated/**\/*.png (equestrian imagery, ES-module imports referenced in
 *    ~90+ places across SubcategoryPage.tsx/productTaxonomy.ts/etc.): 155 of 158 files have
 *    no alpha channel, same story as the bags images above. Converted to .jpg in place;
 *    every import statement referencing a renamed file is rewritten by matching on a
 *    "<parent-dir>/<filename>" suffix (verified collision-free across the whole tree —
 *    plain basenames are NOT unique, e.g. multiple subfolders have a "1_leather.png"), so
 *    a plain substring replace across src/**\/*.{ts,tsx} is safe. The 3 alpha files are
 *    recompressed in place as PNG, unchanged extension, no import changes needed.
 */

import { readFileSync, writeFileSync, statSync, unlinkSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, '..');
const PUBLIC_IMAGES = path.join(FRONTEND_ROOT, 'public/images');
const SRC_DIR = path.join(FRONTEND_ROOT, 'src');
const GENERATED_ASSETS = path.join(FRONTEND_ROOT, 'src/assets/generated');

const FACTORY_MAX_EDGE = 2200;
const FACTORY_QUALITY = 80;
const BAGS_MAX_EDGE = 1800;
const BAGS_QUALITY = 82;
const GENERATED_MAX_EDGE = 1600;
const GENERATED_QUALITY = 82;

function walk(dir, exts) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, exts));
    else if (exts.some((e) => entry.name.toLowerCase().endsWith(e))) out.push(full);
  }
  return out;
}

async function resizeIfNeeded(sharpInstance, maxEdge) {
  const meta = await sharpInstance.metadata();
  if (meta.width > maxEdge || meta.height > maxEdge) {
    return sharpInstance.resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true });
  }
  return sharpInstance;
}

async function optimizeFactoryJpgs(report) {
  const files = walk(path.join(PUBLIC_IMAGES, 'factory'), ['.jpg', '.jpeg']);
  for (const file of files) {
    const before = statSync(file).size;
    let img = sharp(file);
    img = await resizeIfNeeded(img, FACTORY_MAX_EDGE);
    const buffer = await img.jpeg({ quality: FACTORY_QUALITY, mozjpeg: true }).toBuffer();
    writeFileSync(file, buffer);
    const after = statSync(file).size;
    report.push({ file: path.relative(FRONTEND_ROOT, file), before, after });
  }
}

async function optimizeFactoryPngs(report, rewriteMap) {
  const files = walk(path.join(PUBLIC_IMAGES, 'factory'), ['.png']);
  for (const file of files) {
    const before = statSync(file).size;
    const meta = await sharp(file).metadata();
    let img = sharp(file);
    img = await resizeIfNeeded(img, FACTORY_MAX_EDGE);
    const relFromImages = '/images/' + path.relative(PUBLIC_IMAGES, file).split(path.sep).join('/');

    if (meta.hasAlpha) {
      const buffer = await img.png({ compressionLevel: 9, palette: true }).toBuffer();
      writeFileSync(file, buffer);
      report.push({ file: path.relative(FRONTEND_ROOT, file), before, after: statSync(file).size });
    } else {
      const jpgPath = file.replace(/\.png$/i, '.jpg');
      const buffer = await img.jpeg({ quality: FACTORY_QUALITY, mozjpeg: true }).toBuffer();
      writeFileSync(jpgPath, buffer);
      unlinkSync(file);
      rewriteMap.set(relFromImages, relFromImages.replace(/\.png$/i, '.jpg'));
      report.push({ file: path.relative(FRONTEND_ROOT, jpgPath), before, after: statSync(jpgPath).size, renamedFrom: path.relative(FRONTEND_ROOT, file) });
    }
  }
}

async function optimizeBagsPngs(report, rewriteMap) {
  const files = walk(path.join(PUBLIC_IMAGES, 'bags'), ['.png']);
  for (const file of files) {
    const before = statSync(file).size;
    const meta = await sharp(file).metadata();
    let img = sharp(file);
    img = await resizeIfNeeded(img, BAGS_MAX_EDGE);

    const relFromImages = '/images/' + path.relative(PUBLIC_IMAGES, file).split(path.sep).join('/');

    if (meta.hasAlpha) {
      const buffer = await img.png({ compressionLevel: 9, palette: true }).toBuffer();
      writeFileSync(file, buffer);
      report.push({ file: path.relative(FRONTEND_ROOT, file), before, after: statSync(file).size, keptAsPngAlpha: true });
    } else {
      const jpgFile = file.replace(/\.png$/i, '.jpg');
      const buffer = await img.jpeg({ quality: BAGS_QUALITY, mozjpeg: true }).toBuffer();
      writeFileSync(jpgFile, buffer);
      unlinkSync(file);
      const newRel = relFromImages.replace(/\.png$/i, '.jpg');
      rewriteMap.set(relFromImages, newRel);
      report.push({ file: path.relative(FRONTEND_ROOT, jpgFile), before, after: statSync(jpgFile).size, renamedFrom: path.relative(FRONTEND_ROOT, file) });
    }
  }
}

async function optimizeGeneratedAssets(report, rewriteMap) {
  const files = walk(GENERATED_ASSETS, ['.png']);
  for (const file of files) {
    const before = statSync(file).size;
    const meta = await sharp(file).metadata();
    let img = sharp(file);
    img = await resizeIfNeeded(img, GENERATED_MAX_EDGE);

    // "<parent-dir>/<filename>" — verified unique across the whole generated-assets tree,
    // unlike bare basenames (see file header comment).
    const suffixKey = path.join(path.basename(path.dirname(file)), path.basename(file)).split(path.sep).join('/');

    if (meta.hasAlpha) {
      const buffer = await img.png({ compressionLevel: 9, palette: true }).toBuffer();
      writeFileSync(file, buffer);
      report.push({ file: path.relative(FRONTEND_ROOT, file), before, after: statSync(file).size, keptAsPngAlpha: true });
    } else {
      const jpgFile = file.replace(/\.png$/i, '.jpg');
      const buffer = await img.jpeg({ quality: GENERATED_QUALITY, mozjpeg: true }).toBuffer();
      writeFileSync(jpgFile, buffer);
      unlinkSync(file);
      rewriteMap.set(suffixKey, suffixKey.replace(/\.png$/i, '.jpg'));
      report.push({ file: path.relative(FRONTEND_ROOT, jpgFile), before, after: statSync(jpgFile).size, renamedFrom: path.relative(FRONTEND_ROOT, file) });
    }
  }
}

function rewriteReferences(rewriteMap) {
  if (rewriteMap.size === 0) return 0;
  const files = walk(SRC_DIR, ['.ts', '.tsx']);
  let filesChanged = 0;

  for (const file of files) {
    let text = readFileSync(file, 'utf-8');
    let changed = false;
    for (const [oldPath, newPath] of rewriteMap) {
      if (text.includes(oldPath)) {
        text = text.split(oldPath).join(newPath);
        changed = true;
      }
    }
    if (changed) {
      writeFileSync(file, text, 'utf-8');
      filesChanged += 1;
    }
  }
  return filesChanged;
}

async function main() {
  const report = [];
  const rewriteMap = new Map();

  // NOTE: this script re-compresses whatever it finds every run. It's safe to run
  // repeatedly for *new* images, but re-running it against files it already converted
  // applies a second, unnecessary lossy JPEG pass — comment out steps that have nothing
  // new to process before re-running.
  console.log('[optimize-images] processing public/images/factory/*.jpg ...');
  await optimizeFactoryJpgs(report);
  console.log('[optimize-images] processing public/images/factory/*.png ...');
  await optimizeFactoryPngs(report, rewriteMap);
  console.log('[optimize-images] processing public/images/bags/**/*.png ...');
  await optimizeBagsPngs(report, rewriteMap);

  console.log('[optimize-images] processing src/assets/generated/**/*.png ...');
  await optimizeGeneratedAssets(report, rewriteMap);

  console.log('[optimize-images] rewriting source references for renamed files ...');
  const filesChanged = rewriteReferences(rewriteMap);

  const totalBefore = report.reduce((s, r) => s + r.before, 0);
  const totalAfter = report.reduce((s, r) => s + r.after, 0);

  const sorted = [...report].sort((a, b) => b.before - a.before);
  console.log('\n[optimize-images] largest files (before -> after):');
  for (const r of sorted.slice(0, 10)) {
    console.log(
      `  ${r.file}: ${(r.before / 1024 / 1024).toFixed(2)}MB -> ${(r.after / 1024 / 1024).toFixed(2)}MB`
    );
  }

  console.log(`\n[optimize-images] ${report.length} files processed, ${rewriteMap.size} renamed, ${filesChanged} source file(s) updated`);
  console.log(`[optimize-images] total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
}

main().catch((err) => {
  console.error('[optimize-images] failed:', err);
  process.exit(1);
});
