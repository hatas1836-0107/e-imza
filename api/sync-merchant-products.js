/**
 * Google Merchant Center Otomatik Ürün Senkronizasyonu
 * Firebase -> Google Shopping otomatik yayınlama
 */

const { google } = require('googleapis');
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Service Account yükle
const serviceAccount = require('../site/trim-saga-505323-b4-054a5894e895.json');

// Firebase Admin başlat
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com"
  });
}

const db = admin.database();

// Google Merchant Center API
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ['https://www.googleapis.com/auth/content']
});

const merchantId = '8109809524'; // Merchant Center ID

async function syncProducts() {
  try {
    console.log('🔄 Firebase\'den ürünler alınıyor...');
    
    // Firebase'den aktif ürünleri çek
    const snapshot = await db.ref('products').once('value');
    const products = snapshot.val();
    
    if (!products) {
      console.log('❌ Firebase\'de ürün bulunamadı');
      return;
    }

    const content = google.content('v2.1');
    const authClient = await auth.getClient();

    // Her ürünü Google Shopping'e yükle
    for (const [productId, product] of Object.entries(products)) {
      if (product.status !== 'active') continue;

      console.log(`📦 ${product.name} senkronize ediliyor...`);

      const merchantProduct = {
        offerId: productId,
        title: `${product.name} - E-İmza Aynı Gün Teslimat`,
        description: product.description || `Nitelikli elektronik imza ${product.name}. İstanbul'un 39 ilçesine aynı gün ücretsiz kurye teslimatı. Akıllı kart okuyucu dahil.`,
        link: 'https://www.imzaistanbul.com/fiyatlandirma.html',
        imageLink: 'https://www.imzaistanbul.com/api/og-image',
        contentLanguage: 'tr',
        targetCountry: 'TR',
        channel: 'online',
        availability: 'in stock',
        condition: 'new',
        price: {
          value: product.price.toString(),
          currency: 'TRY'
        },
        shipping: [{
          country: 'TR',
          service: 'Kurye',
          price: {
            value: '0',
            currency: 'TRY'
          }
        }],
        brand: 'İmza İstanbul',
        identifierExists: false,
        mpn: `EIMZA-${productId.toUpperCase()}-2026`,
        googleProductCategory: 'Software > Computer Software',
        productTypes: ['Elektronik İmza > Nitelikli E-İmza']
      };

      try {
        await content.products.insert({
          merchantId: merchantId,
          auth: authClient,
          requestBody: merchantProduct
        });
        console.log(`✅ ${product.name} başarıyla yayınlandı`);
      } catch (error) {
        if (error.code === 409) {
          // Ürün zaten var, güncelle
          await content.products.update({
            merchantId: merchantId,
            productId: productId,
            auth: authClient,
            requestBody: merchantProduct
          });
          console.log(`✅ ${product.name} güncellendi`);
        } else {
          console.error(`❌ ${product.name} hatası:`, error.message);
        }
      }
    }

    console.log('🎉 Tüm ürünler senkronize edildi!');
  } catch (error) {
    console.error('❌ Hata:', error);
  }
}

// Otomatik senkronizasyon - Her 1 saatte bir
setInterval(syncProducts, 60 * 60 * 1000);

// İlk çalıştırma
syncProducts();

module.exports = { syncProducts };
