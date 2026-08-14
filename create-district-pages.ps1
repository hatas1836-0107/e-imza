# Eksik ilçe sayfalarını Ümraniye template'inden oluştur

$template = Get-Content "site/umraniye-e-imza.html" -Raw -Encoding UTF8

$ilceler = @{
    'atasehir' = @{ name='Ataşehir'; lat='40.9833'; lon='29.1167' }
    'kartal' = @{ name='Kartal'; lat='40.9'; lon='29.2'; }
    'uskudar' = @{ name='Üsküdar'; lat='41.0214'; lon='29.0058' }
    'sancaktepe' = @{ name='Sancaktepe'; lat='41.0058'; lon='29.2272' }
    'cekmekoy' = @{ name='Çekmeköy'; lat='41.0281'; lon='29.1831' }
    'sultanbeyli' = @{ name='Sultanbeyli'; lat='40.9572'; lon='29.2636' }
    'tuzla' = @{ name='Tuzla'; lat='40.8303'; lon='29.3053' }
    'beykoz' = @{ name='Beykoz'; lat='41.1296'; lon='29.0984' }
    'sile' = @{ name='Şile'; lat='41.1769'; lon='29.6159' }
    'bakirkoy' = @{ name='Bakırköy'; lat='40.9806'; lon='28.8719' }
    'beylikduzu' = @{ name='Beylikdüzü'; lat='41.0058'; lon='28.6417' }
    'esenyurt' = @{ name='Esenyurt'; lat='41.0322'; lon='28.6761' }
    'avcilar' = @{ name='Avcılar'; lat='40.9778'; lon='28.7189' }
    'kucukcekmece' = @{ name='Küçükçekmece'; lat='41.0103'; lon='28.7644' }
    'bahcelievler' = @{ name='Bahçelievler'; lat='41.0039'; lon='28.8564' }
    'bagcilar' = @{ name='Bağcılar'; lat='41.0392'; lon='28.8572' }
    'esenler' = @{ name='Esenler'; lat='41.0422'; lon='28.8786' }
    'sultangazi' = @{ name='Sultangazi'; lat='41.1111'; lon='28.8792' }
    'gaziosmanpasa' = @{ name='Gaziosmanpaşa'; lat='41.0628'; lon='28.9111' }
    'eyupsultan' = @{ name='Eyüpsultan'; lat='41.0544'; lon='28.9339' }
    'sariyer' = @{ name='Sarıyer'; lat='41.1661'; lon='29.0519' }
    'basaksehir' = @{ name='Başakşehir'; lat='41.0906'; lon='28.8061' }
    'arnavutkoy' = @{ name='Arnavutköy'; lat='41.1919'; lon='28.7306' }
    'catalca' = @{ name='Çatalca'; lat='41.1417'; lon='28.4622' }
    'fatih' = @{ name='Fatih'; lat='41.0192'; lon='28.9497' }
    'beyoglu' = @{ name='Beyoğlu'; lat='41.0392'; lon='28.9778' }
    'kagithane' = @{ name='Kağıthane'; lat='41.0786'; lon='28.9742' }
    'zeytinburnu' = @{ name='Zeytinburnu'; lat='40.9964'; lon='28.9044' }
    'gungoren' = @{ name='Güngören'; lat='41.0217'; lon='28.8769' }
    'bayrampasa' = @{ name='Bayrampaşa'; lat='41.0458'; lon='28.9106' }
    'adalar' = @{ name='Adalar'; lat='40.8778'; lon='29.1194' }
}

foreach ($slug in $ilceler.Keys) {
    $info = $ilceler[$slug]
    $fileName = "site/$slug-e-imza.html"
    
    if (Test-Path $fileName) {
        Write-Host "⏭️  Zaten var: $slug-e-imza.html"
        continue
    }
    
    $content = $template `
        -replace 'Ümraniye', $info.name `
        -replace 'umraniye', $slug `
        -replace 'UMRANIYE', $info.name.ToUpper() `
        -replace '"latitude": 41\.0214', "`"latitude`": $($info.lat)" `
        -replace '"longitude": 29\.1058', "`"longitude`": $($info.lon)" `
        -replace 'Armağanevler, Dudullu, Çakmak, Çamlık, Esenkent, Finans Merkezi, Küçükbakkalköy', "$($info.name)'nin tüm mahallelerine"
    
    $content | Out-File -FilePath $fileName -Encoding UTF8 -NoNewline
    Write-Host "✅ Oluşturuldu: $slug-e-imza.html"
}

Write-Host "`n🎉 Tamamlandı!"
