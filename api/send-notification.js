// Vercel Serverless Function - Push Notification Sender
// Bu endpoint admin panel tarafından çağrılacak

import admin from 'firebase-admin';

// Firebase Admin SDK initialization
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

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const { fcmToken, title, body, orderId, trackingCode } = req.body;
    
    if (!fcmToken || !title || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Firebase Cloud Messaging ile bildirim gönder
    const message = {
      notification: {
        title: title,
        body: body
      },
      data: {
        orderId: orderId || '',
        trackingCode: trackingCode || '',
        url: trackingCode ? `https://imzaistanbul.com/takip/${trackingCode}` : ''
      },
      token: fcmToken,
      webpush: {
        fcmOptions: {
          link: trackingCode ? `https://imzaistanbul.com/takip/${trackingCode}` : 'https://imzaistanbul.com'
        },
        notification: {
          icon: 'https://imzaistanbul.com/assets/images/logo.png',
          badge: 'https://imzaistanbul.com/assets/images/badge.png',
          requireInteraction: true,
          vibrate: [200, 100, 200],
          tag: 'order-update'
        }
      }
    };
    
    const response = await admin.messaging().send(message);
    
    console.log('✅ Notification sent:', response);
    
    return res.status(200).json({ 
      success: true, 
      messageId: response,
      message: 'Notification sent successfully'
    });
    
  } catch (error) {
    console.error('❌ Notification error:', error);
    
    return res.status(500).json({ 
      error: 'Failed to send notification',
      details: error.message 
    });
  }
}
