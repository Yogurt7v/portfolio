import sharp from 'sharp';
import { readFile, readdir, stat, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

const QUALITY = 78;
const MAX_KB = 100;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function optimizeWebP(filePath) {
  let fileStat;
  try {
    fileStat = await stat(filePath);
  } catch {
    return;
  }
  const sizeKB = fileStat.size / 1024;

  if (sizeKB <= MAX_KB) {
    console.log(`  SKIP  ${filePath.replace(publicDir, '')} (${sizeKB.toFixed(0)} KB)`);
    return;
  }

  let inputBuffer;
  try {
    inputBuffer = await readFile(filePath);
  } catch (e) {
    console.log(`  LOCK  ${filePath.replace(publicDir, '')} (не удалось прочитать)`);
    return;
  }

  let outputBuffer;
  try {
    outputBuffer = await sharp(inputBuffer)
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();
  } catch (e) {
    console.log(`  ERR   ${filePath.replace(publicDir, '')} (${e.message})`);
    return;
  }

  if (outputBuffer.length >= fileStat.size) {
    console.log(`  SAME  ${filePath.replace(publicDir, '')} (уже оптимизирован)`);
    return;
  }

  try {
    await writeFile(filePath, outputBuffer);
  } catch (e) {
    console.log(`  ERR   ${filePath.replace(publicDir, '')} (${e.message})`);
    return;
  }

  const newKB = (outputBuffer.length / 1024).toFixed(0);
  const saved = ((fileStat.size - outputBuffer.length) / 1024).toFixed(0);
  const percent = ((1 - outputBuffer.length / fileStat.size) * 100).toFixed(0);
  console.log(`  OK    ${filePath.replace(publicDir, '')}  ${sizeKB.toFixed(0)} KB → ${newKB} KB (-${saved} KB, -${percent}%)`);
  return parseFloat(saved);
}

let totalSavedKB = 0;

async function main() {
  console.log('\n=== Оптимизация WebP >100KB ===\n');
  for await (const filePath of walk(publicDir)) {
    const ext = extname(filePath).toLowerCase();
    if (ext === '.webp') {
      const saved = await optimizeWebP(filePath);
      if (saved) totalSavedKB += saved;
    }
  }

  const ogPng = join(publicDir, 'og-image.png');
  try {
    const ogStat = await stat(ogPng);
    const ogKB = ogStat.size / 1024;

    console.log('\n=== Конвертация og-image.png → webp ===\n');
    const inputBuffer = await readFile(ogPng);
    const buffer = await sharp(inputBuffer)
      .webp({ quality: QUALITY, effort: 6 })
      .toBuffer();

    const webpPath = join(publicDir, 'og-image.webp');
    await writeFile(webpPath, buffer);
    const newKB = (buffer.length / 1024).toFixed(0);
    const saved = ((ogStat.size - buffer.length) / 1024).toFixed(0);
    const percent = ((1 - buffer.length / ogStat.size) * 100).toFixed(0);
    console.log(`  OK    og-image.png → og-image.webp  ${ogKB.toFixed(0)} KB → ${newKB} KB (-${saved} KB, -${percent}%)`);
    totalSavedKB += parseFloat(saved);
  } catch {
    console.log('\n  SKIP  og-image.png not found');
  }

  console.log(`\n  Всего сэкономлено: ~${totalSavedKB.toFixed(0)} KB\n`);
}

main().catch(console.error);
