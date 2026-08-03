#!/usr/bin/env node

/**
 * Sync OG Image from Firebase to static file
 * This ensures social media crawlers can see the image
 */

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
            reject(new Error('No OG Image found in Firebase'));
            return;
          }

          if (!imageData.startsWith('data:image')) {
            reject(new Error('Invalid image data format'));
            return;
          }

          resolve(imageData);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

function saveBase64ToFile(base64Data, outputPath) {
  // Extract base64 content (remove data:image/jpeg;base64, prefix)
  const matches = base64Data.match(/^data:image\/\w+;base64,(.+)$/);
  
  if (!matches || !matches[1]) {
    throw new Error('Invalid base64 format');
  }

  const buffer = Buffer.from(matches[1], 'base64');
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
  
  const sizeKB = (buffer.length / 1024).toFixed(2);
  return sizeKB;
}

async function main() {
  try {
    console.log('🔄 Fetching OG Image from Firebase...');
    const imageData = await fetchOGImage();
    
    console.log('💾 Saving to static file...');
    const sizeKB = saveBase64ToFile(imageData, OUTPUT_PATH);
    
    console.log(`✅ OG Image synced successfully!`);
    console.log(`   File: ${OUTPUT_PATH}`);
    console.log(`   Size: ${sizeKB} KB`);
    console.log('');
    console.log('📝 Next steps:');
    console.log('   1. Update HTML meta tags to point to /og-image.jpg');
    console.log('   2. Commit and deploy to Vercel');
    console.log('   3. Test with: https://www.opengraph.xyz/');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
