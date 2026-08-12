/**
 * Vercel Serverless Function
 * Google Merchant Center Ürün Senkronizasyonu
 * URL: /api/sync-products
 */

import { google } from 'googleapis';

export default async function handler(req, res) {
  // Sadece POST isteklerine izin ver
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Güvenlik: Secret token kontrolü
  const authToken = req.headers['x-auth-token'];
  if (authToken !== process.env.SYNC_SECRET_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'Products array required' });
    }

    // Service Account credentials
    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/content']
    });

    const authClient = await auth.getClient();
    const content = google.content('v2.1');
    const merchantId = process.env.MERCHANT_CENTER_ID;

    const results = [];

    // Her ürünü senkronize et
    for (const product of products) {
      try {
        const merchantProduct = {
          offerId: product.id,
          title: `${product.name} - E-İmza Aynı Gün Teslimat`,
          description: product.description || `Nitelikli elektronik imza ${product.name}. İstanbul'un 39 ilçesine aynı gün ücretsiz kurye teslimatı.`,
          link: 'https://www.imzaistanbul.com/fiyatlandirma.html',
          imageLink: product.imageUrl || 'https://www.imzaistanbul.com/api/og-image',
          contentLanguage: 'tr',
          targetCountry: 'TR',
          channel: 'online',
          availability: 'in stock',
          condition: 'new',
          price: {
            value: product.price,
            currency: 'TRY'
          },
          shipping: [{
            country: 'TR',
            region: 'İstanbul',
            service: 'Kurye',
            price: {
              value: '0',
              currency: 'TRY'
            }
          }],
          brand: 'İmza İstanbul',
          mpn: `EIMZA-${product.id}-2026`
        };

        await content.products.insert({
          merchantId,
          auth: authClient,
          requestBody: merchantProduct
        });

        results.push({ id: product.id, status: 'success' });
      } catch (error) {
        if (error.code === 409) {
          // Güncelle
          try {
            await content.products.update({
              merchantId,
              productId: product.id,
              auth: authClient,
              requestBody: merchantProduct
            });
            results.push({ id: product.id, status: 'updated' });
          } catch (updateError) {
            results.push({ id: product.id, status: 'error', error: updateError.message });
          }
        } else {
          results.push({ id: product.id, status: 'error', error: error.message });
        }
      }
    }

    return res.status(200).json({
      success: true,
      synced: results.length,
      results
    });

  } catch (error) {
    console.error('Sync error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
