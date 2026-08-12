/**
 * Vercel Serverless Function - Google Merchant Center Sync
 * POST /api/merchant-sync-endpoint
 */

const { google } = require('googleapis');

const MERCHANT_ID = '5838463772';

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'Products array required' });
    }

    // Service Account credentials from environment
    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.GOOGLE_CERT_URL
    };

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/content']
    });

    const authClient = await auth.getClient();
    const content = google.content('v2.1');

    const results = {
      success: [],
      failed: [],
      updated: []
    };

    // Her ürünü yükle/güncelle
    for (const product of products) {
      const merchantProduct = {
        offerId: product.id,
        title: `${product.name} - E-İmza Aynı Gün Teslimat`,
        description: `Nitelikli elektronik imza ${product.name}. İstanbul'un 39 ilçesine aynı gün ücretsiz kurye teslimatı. Akıllı kart okuyucu dahil, kurulum desteği dahil.`,
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
        mpn: `EIMZA-${product.id.toUpperCase()}-2026`,
        googleProductCategory: 'Software > Computer Software',
        productTypes: ['Elektronik İmza > Nitelikli E-İmza']
      };

      try {
        await content.products.insert({
          merchantId: MERCHANT_ID,
          auth: authClient,
          requestBody: merchantProduct
        });
        results.success.push(product.id);
      } catch (error) {
        if (error.code === 409) {
          // Ürün var, güncelle
          try {
            await content.products.update({
              merchantId: MERCHANT_ID,
              productId: `online:tr:${product.id}`,
              auth: authClient,
              requestBody: merchantProduct
            });
            results.updated.push(product.id);
          } catch (updateError) {
            results.failed.push({
              id: product.id,
              error: updateError.message
            });
          }
        } else {
          results.failed.push({
            id: product.id,
            error: error.message
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      count: results.success.length + results.updated.length,
      details: results
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
