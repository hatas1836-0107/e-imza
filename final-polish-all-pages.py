#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🎨 SON CİLA - TÜM SAYFALAR MÜKEMMEL HALE GETİRİLİYOR
- Typo düzeltmeleri
- Tutarlı, profesyonel metin
"""

import os
import glob

# Tüm ilçe sayfalarını bul
district_files = glob.glob("site/*-e-imza.html")

fixes = {
    # Typo düzeltmeleri
    "Güncel Fiyatlarlar": "Güncel Fiyatlar",
    "Firebase'den güncel fiyatlar": "güncel fiyatlar",
    
    # Hero description - daha profesyonel
    "Firebase'den güncel fiyatlar, 2-4 saat teslim garantisi": "güncel fiyatlar, 2-4 saat teslim garantisi",
    
    # Loading text - müşteri dostu
    "Fiyatlar yükleniyor...": "Paketler yükleniyor...",
    
    # Trust items - daha açıklayıcı
    "Firebase Güncel Fiyat": "Şeffaf Fiyatlandırma",
}

print("🎨 SON CİLA UYGULAN IYOR...\n")

fixed_count = 0

for filepath in district_files:
    filename = os.path.basename(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    for old, new in fixes.items():
        if old in content:
            content = content.replace(old, new)
            modified = True
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_count += 1
        print(f"✅ {filename:30s} - Cilalındı")

print(f"\n🎉 TAMAMLANDI! {fixed_count} sayfa cilalındı")
print("\n✨ İYİLEŞTİRMELER:")
print("  ✓ Typo düzeltmeleri")
print("  ✓ Tutarlı başlıklar")
print("  ✓ Profesyonel, anlaşılır metin")
print("  ✓ Müşteri odaklı ifadeler")
