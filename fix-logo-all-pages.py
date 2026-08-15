#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Tüm HTML sayfalarındaki SVG favicon'ları PNG logo ile değiştir
"""
import os
import re
from pathlib import Path

# SVG favicon pattern
svg_favicon_pattern = r'<link rel="icon" href="data:image/svg[^>]+>'

# Yeni logo tagları
new_logo_tags = '''<!-- Favicon ve Logo -->
<link rel="icon" type="image/png" sizes="32x32" href="/logo.png">
<link rel="icon" type="image/png" sizes="192x192" href="/logo.png">
<link rel="apple-touch-icon" sizes="180x180" href="/logo.png">
<link rel="shortcut icon" href="/logo.png">'''

def fix_html_file(filepath):
    """Bir HTML dosyasındaki favicon'u düzelt"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Eğer SVG favicon varsa değiştir
        if 'data:image/svg+xml' in content and '<link rel="icon"' in content:
            # SVG favicon'u bul ve değiştir
            new_content = re.sub(svg_favicon_pattern, new_logo_tags, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ Düzeltildi: {filepath}")
                return True
    except Exception as e:
        print(f"❌ Hata ({filepath}): {e}")
        return False
    
    return False

def main():
    """Tüm HTML dosyalarını tara ve düzelt"""
    html_files = []
    
    # Site klasöründeki tüm HTML dosyalarını bul
    for root, dirs, files in os.walk('.'):
        # .git, node_modules gibi klasörleri atla
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'dist']]
        
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"📋 Toplam {len(html_files)} HTML dosyası bulundu\n")
    
    fixed_count = 0
    for filepath in html_files:
        if fix_html_file(filepath):
            fixed_count += 1
    
    print(f"\n✨ Toplam {fixed_count} dosya düzeltildi")

if __name__ == '__main__':
    main()
