#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const FIREBASE_DB_URL = 'https://e-imza-4c867-default-rtdb.firebaseio.com';
const OUTPUT_PATH = path.join(__dirname, 'site', 'og-image.jpg');

async function fetchOGImage() {
  return new Promise((resolve, reject) => {
    https.get(`${FIREBASE_DB_URL}/settings/ogImage.json`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const imageData = JSON.parse(data);
          if (!imageData || typeof imageData !== 'string') {
            console.log('ℹ️  No OG Image in Firebase, keeping existing file');
            process.exit(0);
          }
          if (!imageData.startsWith('data:image')) {
            console.log('⚠️  Invalid image format in Firebase');
            process.exit(0);
          }
          resolve(imageData);
        } catch (err) {
          console.log('⚠️  Error parsing Firebase data:', err.message);
          process.exit(0);
        }
      });
    }).on('error', (err) => {
      console.log('⚠️  Firebase connection error:', err.message);
      process.exit(0);
    });
  });
}

function saveBase64ToFile(base64Data, outputPath) {
  const matches = base64Data.match(/^data:image\/\w+;base64,(.+)$/);
  if (!matches || !matches[1]) {
    throw new Error('Invalid base64 format');
  }
  const buffer = Buffer.from(matches[1], 'base64');
  fs.writeFileSync(outputPath, buffer);
  const sizeKB = (buffer.length / 1024).toFixed(2);
  return sizeKB;
}

async function main() {
  try {
    console.log('🔄 Checking Firebase for OG Image...');
    const imageData = await fetchOGImage();
    console.log('💾 Updating og-image.jpg...');
    const sizeKB = saveBase64ToFile(imageData, OUTPUT_PATH);
    console.log(`✅ OG Image updated: ${OUTPUT_PATH} (${sizeKB} KB)`);
    console.log('📝 Next: git add site/og-image.jpg && git commit && git push');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
