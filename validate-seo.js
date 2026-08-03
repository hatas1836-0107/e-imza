#!/usr/bin/env node

/**
 * SEO & Structured Data Validation Script
 * Validates all pages for SEO best practices and schema.org compliance
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://e-imza.vercel.app';
const PAGES = [
  '/',
  '/fiyatlandirma.html',
  '/hakkimizda.html',
  '/sss.html',
  '/iletisim.html',
  '/bolgeler.html'
];

console.log('🔍 SEO & Schema Validation Starting...\n');

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateHTML(html, url) {
  const issues = [];
  const warnings = [];
  
  // Check meta tags
  if (!html.includes('<meta name="description"')) {
    issues.push('❌ Missing meta description');
  }
  
  if (!html.includes('<title>')) {
    issues.push('❌ Missing title tag');
  }
  
  // Check title length
  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  if (titleMatch && titleMatch[1].length > 60) {
    warnings.push(`⚠️  Title too long (${titleMatch[1].length} chars, recommended < 60)`);
  }
  
  // Check description length
  const descMatch = html.match(/<meta name="description" content="(.*?)"/);
  if (descMatch && descMatch[1].length > 160) {
    warnings.push(`⚠️  Description too long (${descMatch[1].length} chars, recommended < 160)`);
  }
  
  // Check canonical URL
  if (!html.includes('<link rel="canonical"')) {
    issues.push('❌ Missing canonical URL');
  }
  
  // Check Open Graph tags
  if (!html.includes('property="og:title"')) {
    warnings.push('⚠️  Missing og:title');
  }
  if (!html.includes('property="og:description"')) {
    warnings.push('⚠️  Missing og:description');
  }
  if (!html.includes('property="og:image"')) {
    warnings.push('⚠️  Missing og:image');
  }
  
  // Check structured data
  if (!html.includes('application/ld+json')) {
    issues.push('❌ Missing structured data (JSON-LD)');
  } else {
    log('  ✅ Structured data found', 'green');
    
    // Extract and validate JSON-LD
    const jsonLdMatches = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs);
    if (jsonLdMatches) {
      jsonLdMatches.forEach((match, index) => {
        try {
          const jsonStr = match.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
          const data = JSON.parse(jsonStr);
          
          // Check for @context and @type
          if (data['@context'] !== 'https://schema.org') {
            warnings.push(`⚠️  Schema ${index + 1}: Invalid @context`);
          }
          
          if (!data['@type'] && !data['@graph']) {
            issues.push(`❌ Schema ${index + 1}: Missing @type or @graph`);
          }
          
          log(`  ✅ Schema ${index + 1}: Valid JSON-LD${data['@type'] ? ' (' + data['@type'] + ')' : ''}`, 'green');
          
          // Validate specific schema types
          if (data['@graph']) {
            data['@graph'].forEach((item, i) => {
              log(`    📊 Entity ${i + 1}: ${item['@type']}`, 'cyan');
            });
          }
        } catch (e) {
          issues.push(`❌ Schema ${index + 1}: Invalid JSON - ${e.message}`);
        }
      });
    }
  }
  
  // Check h1 tags
  const h1Matches = html.match(/<h1[^>]*>/g);
  if (!h1Matches) {
    issues.push('❌ Missing H1 tag');
  } else if (h1Matches.length > 1) {
    warnings.push(`⚠️  Multiple H1 tags found (${h1Matches.length})`);
  }
  
  // Check alt tags on images
  const imgMatches = html.match(/<img[^>]*>/g);
  if (imgMatches) {
    const missingAlt = imgMatches.filter(img => !img.includes('alt=')).length;
    if (missingAlt > 0) {
      warnings.push(`⚠️  ${missingAlt} images missing alt attributes`);
    }
  }
  
  return { issues, warnings };
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ html: data, status: res.statusCode }));
    }).on('error', reject);
  });
}

async function validatePage(path) {
  const fullUrl = SITE_URL + path;
  log(`\n📄 Validating: ${path}`, 'blue');
  log(`   URL: ${fullUrl}`, 'cyan');
  
  try {
    const { html, status } = await fetchPage(fullUrl);
    
    if (status !== 200) {
      log(`   ❌ HTTP ${status}`, 'red');
      return false;
    }
    
    log(`   ✅ HTTP 200 OK`, 'green');
    
    const { issues, warnings } = validateHTML(html, fullUrl);
    
    if (issues.length === 0 && warnings.length === 0) {
      log('   ✅ Perfect! No issues found', 'green');
      return true;
    }
    
    if (issues.length > 0) {
      log('\n   🔴 Critical Issues:', 'red');
      issues.forEach(issue => log(`      ${issue}`, 'red'));
    }
    
    if (warnings.length > 0) {
      log('\n   🟡 Warnings:', 'yellow');
      warnings.forEach(warning => log(`      ${warning}`, 'yellow'));
    }
    
    return issues.length === 0;
  } catch (error) {
    log(`   ❌ Error: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  let totalPages = 0;
  let passedPages = 0;
  
  for (const page of PAGES) {
    totalPages++;
    const passed = await validatePage(page);
    if (passed) passedPages++;
  }
  
  log('\n' + '='.repeat(60), 'cyan');
  log(`\n📊 Validation Summary:`, 'blue');
  log(`   Total Pages: ${totalPages}`, 'cyan');
  log(`   Passed: ${passedPages}`, passedPages === totalPages ? 'green' : 'yellow');
  log(`   Failed: ${totalPages - passedPages}`, totalPages - passedPages === 0 ? 'green' : 'red');
  
  if (passedPages === totalPages) {
    log('\n🎉 All pages validated successfully!', 'green');
  } else {
    log('\n⚠️  Some pages need attention', 'yellow');
  }
  
  log('\n' + '='.repeat(60), 'cyan');
  log('\n✨ Next Steps:', 'blue');
  log('   1. Test on Google Rich Results: https://search.google.com/test/rich-results', 'cyan');
  log('   2. Validate Schema: https://validator.schema.org/', 'cyan');
  log('   3. Submit to Google Search Console', 'cyan');
  log('   4. Create Google My Business profile', 'cyan');
}

main().catch(console.error);
