#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🔧 TÜM İLÇE SAYFALARI DÜZELTİLİYOR
- "Firebase" kelimesi kaldırılıyor
- "Güncel Fiyatlar" kullanılacak
- Profesyonel, tutarlı, müşteri odaklı metin
"""

import os
import glob

# Tüm ilçe sayfalarını bul
district_files = glob.glob("site/*-e-imza.html")

changes = {
    # Hero section
    "Firebase'den güncel fiyatlar": "güncel fiyatlar",
    "Firebase Fiyatları Gör": "Güncel Fiyatları Gör",
    "Firebase Güncel Fiyat": "Güncel Fiyatlar",
    
    # Products section titles
    '<h1>{{DISTRICT}} <span class="accent">Firebase Güncel Fiyatlar</span></h1>': '<h1>{{DISTRICT}} <span class="accent">Güncel Fiyatlar</span></h1>',
    "Firebase Güncel Fiyatlar": "Güncel Fiyatlar",
    
    # Products section descriptions
    "Dinamik fiyatlandırma sistemi ile her zaman güncel fiyatlar": "Nitelikli elektronik imza paketleri ve güncel fiyatlar",
    "Firebase'den fiyatlar yükleniyor": "Fiyatlar yükleniyor",
    
    # Blog section
    "Firebase Realtime Database'den anlık güncel fiyatlar": "Anlık güncel fiyatlar ve kampanyalar",
    "Firebase'den güncel fiyatlar": "güncel ve şeffaf fiyatlandırma",
    "Firebase Güncel": "Güncel",
    "Firebase güncel fiyatlar": "güncel fiyatlar",
}

print("🔧 TÜM İLÇE SAYFALARI DÜZELTİLİYOR...\n")

fixed_count = 0

for filepath in district_files:
    filename = os.path.basename(filepath)
    
    # Dosyayı oku
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Değişiklikleri uygula
    modified = False
    for old, new in changes.items():
        if old in content:
            content = content.replace(old, new)
            modified = True
    
    # Eğer değişiklik yapıldıysa kaydet
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_count += 1
        print(f"✅ {filename:30s} - Düzeltildi")

print(f"\n🎉 TAMAMLANDI! {fixed_count} sayfa düzeltildi")
print("\n✨ DEĞİŞİKLİKLER:")
print("  ✓ 'Firebase' kelimesi kaldırıldı")
print("  ✓ 'Güncel Fiyatlar' kullanılıyor")
print("  ✓ Müşteri odaklı, profesyonel metin")
print("  ✓ Tutarlı başlıklar ve açıklamalar")
