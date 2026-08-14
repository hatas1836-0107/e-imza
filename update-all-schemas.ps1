# Tüm ilçe sayfalarına geliştirilmiş schema ekle

$districts = @(
    @{name="Adalar"; lat=40.8786; lon=29.1263},
    @{name="Arnavutköy"; lat=41.1926; lon=28.7382},
    @{name="Ataşehir"; lat=40.9828; lon=29.1251},
    @{name="Avcılar"; lat=40.9786; lon=28.7214},
    @{name="Bağcılar"; lat=41.0394; lon=28.8571},
    @{name="Bahçelievler"; lat=41.0025; lon=28.8534},
    @{name="Bakırköy"; lat=40.9808; lon=28.8739},
    @{name="Başakşehir"; lat=41.0928; lon=28.8094},
    @{name="Bayrampaşa"; lat=41.0450; lon=28.9089},
    @{name="Beşiktaş"; lat=41.0426; lon=29.0081},
    @{name="Beykoz"; lat=41.1356; lon=29.0986},
    @{name="Beylikdüzü"; lat=40.9900; lon=28.6417},
    @{name="Beyoğlu"; lat=41.0391; lon=28.9784},
    @{name="Büyükçekmece"; lat=41.0219; lon=28.5839},
    @{name="Çatalca"; lat=41.1442; lon=28.4606},
    @{name="Çekmeköy"; lat=41.0321; lon=29.1834},
    @{name="Esenler"; lat=41.0428; lon=28.8758},
    @{name="Esenyurt"; lat=41.0311; lon=28.6742},
    @{name="Eyüpsultan"; lat=41.0454; lon=28.9343},
    @{name="Fatih"; lat=41.0192; lon=28.9497},
    @{name="Gaziosmanpaşa"; lat=41.0672; lon=28.9114},
    @{name="Güngören"; lat=41.0189; lon=28.8750},
    @{name="Kadıköy"; lat=40.9828; lon=29.0318},
    @{name="Kağıthane"; lat=41.0839; lon=28.9750},
    @{name="Kartal"; lat=40.9028; lon=29.1939},
    @{name="Küçükçekmece"; lat=41.0058; lon=28.7842},
    @{name="Maltepe"; lat=40.9361; lon=29.1458},
    @{name="Pendik"; lat=40.8789; lon=29.2358},
    @{name="Sancaktepe"; lat=40.9931; lon=29.2347},
    @{name="Sarıyer"; lat=41.1614; lon=29.0431},
    @{name="Şile"; lat=41.1758; lon=29.6186},
    @{name="Silivri"; lat=41.0706; lon=28.2456},
    @{name="Şişli"; lat=41.0594; lon=28.9856},
    @{name="Sultanbeyli"; lat=40.9669; lon=29.2664},
    @{name="Sultangazi"; lat=41.1028; lon=28.8667},
    @{name="Tuzla"; lat=40.8233; lon=29.2986},
    @{name="Ümraniye"; lat=41.0243; lon=29.1219},
    @{name="Üsküdar"; lat=41.0231; lon=29.0158},
    @{name="Zeytinburnu"; lat=40.9958; lon=28.9011}
)

foreach ($district in $districts) {
    $filename = "site/" + $district.name.ToLower() -replace 'ı','i' -replace 'ş','s' -replace 'ğ','g' -replace 'ü','u' -replace 'ö','o' -replace 'ç','c' + "-e-imza.html"
    
    if (Test-Path $filename) {
        $content = Get-Content $filename -Raw -Encoding UTF8
        
        $oldSchema = '<script type="application/ld\+json">\{[^}]+LocalBusiness[^<]+</script>'
        
        $newSchema = @"
<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"İmza İstanbul - $($district.name)","url":"https://www.imzaistanbul.com/$($district.name.ToLower() -replace 'ı','i' -replace 'ş','s' -replace 'ğ','g' -replace 'ü','u' -replace 'ö','o' -replace 'ç','c')-e-imza","telephone":"+905453863407","image":"https://www.imzaistanbul.com/logo.png","address":{"@type":"PostalAddress","addressLocality":"$($district.name)","addressRegion":"İstanbul","addressCountry":"TR"},"geo":{"@type":"GeoCoordinates","latitude":$($district.lat),"longitude":$($district.lon)},"contactPoint":[{"@type":"ContactPoint","telephone":"+905453863407","contactType":"customer service","availableLanguage":"Turkish","areaServed":"TR"},{"@type":"ContactPoint","contactType":"sales","telephone":"+905453863407","availableLanguage":"Turkish","url":"https://wa.me/905453863407"}],"priceRange":"₺₺₺","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"opens":"09:00","closes":"19:00"}]}</script>
"@
        
        if ($content -match $oldSchema) {
            $content = $content -replace $oldSchema, $newSchema
            Set-Content $filename -Value $content -Encoding UTF8 -NoNewline
            Write-Host "✓ $($district.name) güncellendi"
        }
    }
}

Write-Host "`nTüm ilçe sayfaları schema ile güncellendi!"
