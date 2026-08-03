// Vercel Serverless Function - Dynamic OG Image
export default async function handler(req, res) {
  try {
    // Fetch OG Image from Firebase
    const response = await fetch('https://e-imza-4c867-default-rtdb.firebaseio.com/settings/ogImage.json');
    const imageData = await response.json();
    
    if (!imageData || !imageData.startsWith('data:image')) {
      return res.status(404).json({ error: 'No OG Image found' });
    }
    
    // Extract base64 data
    const base64Data = imageData.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Determine image type
    const imageType = imageData.match(/data:image\/(\w+);/)?.[1] || 'jpeg';
    
    // Set cache headers (1 hour)
    res.setHeader('Content-Type', `image/${imageType}`);
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('Content-Length', buffer.length);
    
    return res.send(buffer);
  } catch (error) {
    console.error('OG Image API Error:', error);
    return res.status(500).json({ error: 'Failed to load OG Image' });
  }
}
