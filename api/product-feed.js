/**
 * Dinamik Product Feed - Firebase'den otomatik çeker
 * URL: https://www.imzaistanbul.com/api/product-feed
 */

const admin = require('firebase-admin');

// Firebase Admin başlat (sadece bir kez)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = admin.database();

function escapeXML(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

module.exports = async (req, res) => {
  try {
    // Firebase'den aktif ürünleri çek
    const snapshot = await db.ref('products').once('value');
    const products = snapshot.val();

    if (!products) {
      return res.status(200).type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>İmza İstanbul - E-İmza Ürünleri</title>
    <link>https://www.imzaistanbul.com/</link>
    <description>Ürün bulunamadı</description>
  </channel>
</rss>`);
    }

    // Aktif ürünleri filtrele
    const activeProducts = Object.entries(products)
      .filter(([_, product]) => product.status === 'active')
      .map(([id, product]) => ({ id, ...product }));

    // XML oluştur
    const items = activeProducts.map(product => `
    <item>
      <g:id>${escapeXML(product.id)}</g:id>
      <g:title>${escapeXML(product.name)} - Aynı Gün Teslimat</g:title>
      <g:description>${escapeXML(product.description || `Nitelikli elektronik imza ${product.name}. İstanbul'un 39 ilçesine aynı gün ücretsiz kurye teslimatı. Akıllı kart okuyucu dahil, kurulum desteği dahil.`)}</g:description>
      <g:link>https://www.imzaistanbul.com/fiyatlandirma.html</g:link>
      <g:image_link>https://www.imzaistanbul.com/api/og-image</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${escapeXML(product.price)} TRY</g:price>
      <g:brand>İmza İstanbul</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:mpn>EIMZA-${escapeXML(product.id.toUpperCase())}-2026</g:mpn>
      <g:google_product_category>Software &gt; Computer Software</g:google_product_category>
      <g:product_type>Elektronik İmza &gt; Nitelikli E-İmza</g:product_type>
      <g:shipping>
        <g:country>TR</g:country>
        <g:service>Kurye</g:service>
        <g:price>0 TRY</g:price>
      </g:shipping>
    </item>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>İmza İstanbul - E-İmza Ürünleri</title>
    <link>https://www.imzaistanbul.com/</link>
    <description>Nitelikli elektronik imza ürünleri - İstanbul'da aynı gün teslimat</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

    // XML olarak dön
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 saat cache
    res.status(200).send(xml);

  } catch (error) {
    console.error('Feed Error:', error);
    res.status(500).type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Error</title>
    <description>${escapeXML(error.message)}</description>
  </channel>
</rss>`);
  }
};
