// Dynamically load OG Image from Firebase and update meta tags
(function() {
  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyADykV8-GjNNoK30CUkPlqCNMjR7Ggc1M8",
    authDomain: "e-imza-4c867.firebaseapp.com",
    databaseURL: "https://e-imza-4c867-default-rtdb.firebaseio.com",
    projectId: "e-imza-4c867",
    storageBucket: "e-imza-4c867.firebasestorage.app",
    messagingSenderId: "856535109805",
    appId: "1:856535109805:web:39f6fa2e23275f7be77624"
  };

  // Load OG Image from Firebase
  async function loadOGImage() {
    try {
      const response = await fetch(`${firebaseConfig.databaseURL}/settings/ogImage.json`);
      const ogImageData = await response.json();
      
      if (ogImageData && typeof ogImageData === 'string' && ogImageData.startsWith('data:image')) {
        // Update all OG Image meta tags
        const metaTags = [
          { selector: 'meta[property="og:image"]', attr: 'content' },
          { selector: 'meta[property="og:image:secure_url"]', attr: 'content' },
          { selector: 'meta[name="twitter:image"]', attr: 'content' }
        ];

        metaTags.forEach(({ selector, attr }) => {
          const tags = document.querySelectorAll(selector);
          tags.forEach(tag => {
            tag.setAttribute(attr, ogImageData);
          });
        });

        // Update image type to JPEG
        const typeTag = document.querySelector('meta[property="og:image:type"]');
        if (typeTag) {
          typeTag.setAttribute('content', 'image/jpeg');
        }

        console.log('✅ OG Image loaded from Firebase');
      } else {
        console.log('ℹ️ Using default OG Image');
      }
    } catch (err) {
      console.error('❌ Failed to load OG Image:', err);
      // Fallback to default image - no action needed
    }
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadOGImage);
  } else {
    loadOGImage();
  }
})();
