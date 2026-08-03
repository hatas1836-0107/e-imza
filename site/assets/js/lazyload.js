// Lazy Loading Script - Images & Iframes
(function() {
  'use strict';
  
  // Intersection Observer ile performanslı lazy load
  if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('[loading="lazy"]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          
          // Image lazy load
          if (el.tagName === 'IMG' && el.dataset.src) {
            el.src = el.dataset.src;
            if (el.dataset.srcset) el.srcset = el.dataset.srcset;
            el.removeAttribute('data-src');
            el.removeAttribute('data-srcset');
          }
          
          // Iframe lazy load
          if (el.tagName === 'IFRAME' && el.dataset.src) {
            el.src = el.dataset.src;
            el.removeAttribute('data-src');
          }
          
          lazyObserver.unobserve(el);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
  }
  
  // Fallback for older browsers
  else {
    const lazyElements = document.querySelectorAll('[loading="lazy"]');
    lazyElements.forEach(el => {
      if (el.dataset.src) {
        el.src = el.dataset.src;
        if (el.dataset.srcset) el.srcset = el.dataset.srcset;
      }
    });
  }
})();
