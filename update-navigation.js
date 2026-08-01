// Tüm HTML sayfalarına Sipariş Takip ve Admin linkini ekleyen script
const fs = require('fs');
const path = require('path');

const siteDir = './site';
const files = [
  'hizmetlerimiz.html',
  'fiyatlandirma.html',
  'bolgeler.html',
  'hakkimizda.html',
  'sss.html',
  'iletisim.html',
  'gizlilik-politikasi.html',
  'kullanim-kosullari.html'
];

// Desktop navigation update
const oldDesktopNav = `        <a href="/hakkimizda.html">Hakkımızda</a>
        <a href="/sss.html">S.S.S.</a>
        <a href="/iletisim.html">İletişim</a>
    </nav>`;

const newDesktopNav = `        <a href="/site/takip.html" style="color:#22c55e;font-weight:600;">📦 Sipariş Takip</a>
        <a href="/site/bolgeler.html">Hizmet Bölgeleri</a>
        <a href="/site/hakkimizda.html">Hakkımızda</a>
        <a href="/site/sss.html">S.S.S.</a>
        <a href="/site/iletisim.html">İletişim</a>
    </nav>`;

// Header actions update (add admin button)
const oldHeaderActions = `      <a href="/fiyatlandirma.html" class="btn btn-ghost btn-sm">Fiyatlar</a>`;

const newHeaderActions = `      <a href="/site/admin/index.html" class="btn btn-ghost btn-sm" style="background:rgba(79,70,229,0.1);color:#6366f1;border:1px solid rgba(79,70,229,0.3);">🔐 Admin</a>
      <a href="/site/fiyatlandirma.html" class="btn btn-ghost btn-sm">Fiyatlar</a>`;

// Mobile navigation update  
const oldMobileNav = `        <a href="/iletisim.html">İletişim</a>
  </nav>`;

const newMobileNav = `        <a href="/site/iletisim.html">İletişim</a>
        <a href="/site/takip.html" style="color:#22c55e;font-weight:600;">📦 Sipariş Takip</a>
        <a href="/site/admin/index.html" style="color:#6366f1;font-weight:600;border-top:1px solid rgba(255,255,255,0.1);margin-top:8px;padding-top:8px;">🔐 Admin Girişi</a>
  </nav>`;

files.forEach(file => {
  const filePath = path.join(siteDir, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Update desktop nav
    if (content.includes(oldDesktopNav)) {
      content = content.replace(oldDesktopNav, newDesktopNav);
      updated = true;
    }
    
    // Update header actions
    if (content.includes(oldHeaderActions)) {
      content = content.replace(oldHeaderActions, newHeaderActions);
      updated = true;
    }
    
    // Update mobile nav
    if (content.includes(oldMobileNav)) {
      content = content.replace(oldMobileNav, newMobileNav);
      updated = true;
    }
    
    // Fix all /href links to /site/href
    content = content.replace(/href="\/([^s])/g, 'href="/site/$1');
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${file} güncellendi`);
    } else {
      console.log(`⚠️  ${file} - Değişiklik bulunamadı`);
    }
  } else {
    console.log(`❌ ${file} bulunamadı`);
  }
});

console.log('\n✨ Navigasyon güncellemesi tamamlandı!');
