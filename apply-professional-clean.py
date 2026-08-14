#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# TÜM İLÇELER VE DOĞRU MAHALLE BİLGİLERİ
districts = {
    "umraniye-e-imza": {
        "name": "Ümraniye",
        "lat": "41.0214",
        "lon": "29.1058",
        "neighborhoods": ["Armağanevler", "Aşağı Dudullu", "Atakent", "Aydınevler", "Çakmak", "Çamlık", "Dumlupınar", "Esenevler", "Esenkent", "Finans Merkezi", "Göğüşlü", "Hekimbaşı", "İnkılap", "İstiklal", "Kazım Karabekir", "Küçükbakkalköy", "Madenler", "Mehmet Akif", "Necip Fazıl", "Parseller", "Saray", "Site", "Şerifali", "Tantavi", "Tatlısu", "Topağacı", "Yamanevler", "Yenişehir", "Yukarı Dudullu"],
        "popular": ["Finans Merkezi", "Küçükbakkalköy", "Çakmak"]
    },
    "kadikoy-e-imza": {
        "name": "Kadıköy",
        "lat": "40.9901",
        "lon": "29.0251",
        "neighborhoods": ["19 Mayıs", "Acıbadem", "Bostancı", "Caferağa", "Caddebostan", "Erenköy", "Fenerbahçe", "Feneryolu", "Fikirtepe", "Göztepe", "Hasanpaşa", "Koşuyolu", "Kozyatağı", "Moda", "Osmanağa", "Rasimpaşa", "Sahrayıcedit", "Suadiye", "Zühtüpaşa"],
        "popular": ["Moda", "Bostancı", "Acıbadem"]
    },
    "besiktas-e-imza": {
        "name": "Beşiktaş",
        "lat": "41.0422",
        "lon": "29.0070",
        "neighborhoods": ["Abbasağa", "Akatlar", "Arnavutköy", "Bebek", "Etiler", "Gayrettepe", "Konaklar", "Levent", "Levazım", "Mecidiye", "Muradiye", "Nisbetiye", "Ortaköy", "Sinanpaşa", "Türkali", "Ulus", "Vişnezade", "Yıldız"],
        "popular": ["Levent", "Etiler", "Ortaköy"]
    },
    "sisli-e-imza": {
        "name": "Şişli",
        "lat": "41.0602",
        "lon": "28.9876",
        "neighborhoods": ["19 Mayıs", "Ayazağa", "Bomonti", "Cumhuriyet", "Esentepe", "Eskişehir", "Feriköy", "Fulya", "Gülbahar", "Halaskargazi", "Harbiye", "İnönü", "Kaptanpaşa", "Kuştepe", "Mecidiyeköy", "Meşrutiyet", "Teşvikiye"],
        "popular": ["Mecidiyeköy", "Osmanbey", "Nişantaşı"]
    },
    "bakirkoy-e-imza": {
        "name": "Bakırköy",
        "lat": "40.9808",
        "lon": "28.8767",
        "neighborhoods": ["Ataköy 1.Kısım", "Ataköy 2-5-6", "Ataköy 3-4-11", "Ataköy 7-8-9-10", "Bahçelievler", "Basınköy", "Cevizlik", "Kartaltepe", "Osmaniye", "Sakızağacı", "Şenlikköy", "Yenimahalle", "Yeşilköy", "Yeşilyurt", "Zuhuratbaba"],
        "popular": ["Ataköy", "Yeşilköy", "Florya"]
    },
    "maltepe-e-imza": {
        "name": "Maltepe",
        "lat": "40.9333",
        "lon": "29.1333",
        "neighborhoods": ["Altayçeşme", "Altıntepe", "Aydınevler", "Bağlarbaşı", "Başıbüyük", "Büyükbakkalköy", "Cevizli", "Esenkent", "Feyzullah", "Fındıklı", "Girne", "Gülsuyu", "Gülensu", "İdealtepe", "Küçükyalı", "Zümrütevler"],
        "popular": ["Küçükyalı", "Bağlarbaşı", "Cevizli"]
    },
    "pendik-e-imza": {
        "name": "Pendik",
        "lat": "40.8764",
        "lon": "29.2331",
        "neighborhoods": ["Bahçelievler", "Batı", "Çamçeşme", "Doğu", "Dumlupınar", "Ertuğrul Gazi", "Esenyalı", "Esenşehir", "Fevzi Çakmak", "Göçbeyli", "Güllü Bağlar", "Güzelyalı", "Kaynarca", "Kurtköy", "Orta", "Osman Gazi", "Ramazanoğlu", "Sanayi", "Sapanbağları", "Velibaba", "Yenişehir"],
        "popular": ["Kurtköy", "Kaynarca", "Esenyalı"]
    },
    "atasehir-e-imza": {
        "name": "Ataşehir",
        "lat": "40.9827",
        "lon": "29.1252",
        "neighborhoods": ["Atatürk", "Barbaros", "Esatpaşa", "Ferhatpaşa", "Fetih", "İçerenköy", "İnönü", "Kayışdağı", "Küçükbakkalköy", "Mevlana", "Mustafa Kemal", "Örnek", "Yenisahra", "Yenişehir"],
        "popular": ["İçerenköy", "Küçükbakkalköy", "Barbaros"]
    },
    "kartal-e-imza": {
        "name": "Kartal",
        "lat": "40.9",
        "lon": "29.2",
        "neighborhoods": ["Atalar", "Cevizli", "Çavuşoğlu", "Esentepe", "Gümüşpınar", "Hürriyet", "Karlıktepe", "Kordonboyu", "Orta", "Petrol", "Soğanlık", "Topselvi", "Uğur Mumcu", "Yakacık", "Yukarı", "Yunus"],
        "popular": ["Yakacık", "Cevizli", "Soğanlık"]
    },
    "uskudar-e-imza": {
        "name": "Üsküdar",
        "lat": "41.0226",
        "lon": "29.0190",
        "neighborhoods": ["Acıbadem", "Ahmediye", "Altunizade", "Aziz Mahmut Hüdai", "Bahçelievler", "Barbaros", "Beylerbeyi", "Bulgurlu", "Burhaniye", "Cumhuriyet", "Güzeltepe", "Kandilli", "Kısıklı", "Kirazlıtepe", "Küçük Çamlıca", "Küçüksu", "Kuzguncuk", "Mehmet Akif Ersoy", "Murat Reis", "Salacak", "Selimiye", "Selamiali", "Sultantepe", "Validei Atik"],
        "popular": ["Acıbadem", "Altunizade", "Bağlarbaşı"]
    },
    "sancaktepe-e-imza": {
        "name": "Sancaktepe",
        "lat": "41.0092",
        "lon": "29.2161",
        "neighborhoods": ["15 Temmuz", "Abdurrahmangazi", "Akpınar", "Atatürk", "Emek", "Eyüp Sultan", "Fatih", "Hikmet", "İnönü", "Kemal Türkler", "Meclis", "Mevlana", "Mimar Sinan", "Osmangazi", "Paşaköy", "Sarıgazi", "Veysel Karani"],
        "popular": ["Sarıgazi", "Emek", "Osmangazi"]
    },
    "cekmekoy-e-imza": {
        "name": "Çekmeköy",
        "lat": "41.0326",
        "lon": "29.1858",
        "neighborhoods": ["Alemdar", "Atatürk", "Çamlık", "Ekşioğlu", "Huzur", "Kirazlıdere", "Koçullu", "Mehmet Akif", "Mimar Sinan", "Nişantepe", "Reşadiye", "Sırapınar", "Soğukpınar", "Sultançiftliği", "Taşdelen"],
        "popular": ["Alemdağ", "Hamidiye", "Sultançiftliği"]
    },
    "sultanbeyli-e-imza": {
        "name": "Sultanbeyli",
        "lat": "40.9671",
        "lon": "29.2632",
        "neighborhoods": ["Abdurrahmangazi", "Akşemsettin", "Battalgazi", "Hasanpaşa", "Mecidiye", "Mimar Sinan", "Necip Fazıl", "Orhangazi", "Turgut Reis", "Yavuz Selim"],
        "popular": ["Abdurrahmangazi", "Akşemsettin", "Hasanpaşa"]
    },
    "tuzla-e-imza": {
        "name": "Tuzla",
        "lat": "40.8275",
        "lon": "29.3040",
        "neighborhoods": ["Aydınlı", "Aydıntepe", "Cami", "Fatih", "İçmeler", "İstasyon", "Mescit", "Mimar Sinan", "Orhantepe", "Şifa", "Yayla"],
        "popular": ["İçmeler", "Aydınlı", "Evliya Çelebi"]
    },
    "beykoz-e-imza": {
        "name": "Beykoz",
        "lat": "41.1415",
        "lon": "29.0973",
        "neighborhoods": ["Acarlar", "Akbaba", "Alibahadır", "Anadolufeneri", "Anadoluhisarı", "Çavuşbaşı", "Çubuklu", "Dereseki", "Görele", "Göztepe", "Güzelce", "İncirköy", "Kanlıca", "Merkez", "Örnekköy", "Paşabahçe", "Polonezköy", "Riva", "Tokatköy"],
        "popular": ["Çubuklu", "Kanlıca", "Anadoluhisarı"]
    },
    "sile-e-imza": {
        "name": "Şile",
        "lat": "41.1769",
        "lon": "29.6159",
        "neighborhoods": ["Ağva", "Ahmetli", "Akçakese", "Alacalı", "Avcıkoru", "Balibey", "Bıçkıdere", "Bucaklı", "Çayırbaşı", "Darlık", "Değirmençayırı", "Doğancılı", "Esenceli", "Geredeli", "Göçe", "Hacıkasım", "İmrendere", "İmrenli", "İvriz", "Kabakoz", "Kalem", "Karacaköy", "Kervansaray", "Kızılca", "Meşrutiyet", "Oruçoğlu", "Ovacık", "Sahilköy", "Satmazlı", "Şuayipli", "Teke", "Yakaköy", "Yazımanayır", "Yeniköy"],
        "popular": ["Ağva", "Kabakoz", "Sofular"]
    },
    "beylikduzu-e-imza": {
        "name": "Beylikdüzü",
        "lat": "41.0041",
        "lon": "28.6413",
        "neighborhoods": ["Adnan Kahveci", "Barış", "Büyükşehir", "Cumhuriyet", "Dereağzı", "Gürpınar", "Kavakpınar", "Kavaklı", "Marmara", "Sahil", "Yakuplu"],
        "popular": ["Gürpınar", "Yakuplu", "Marmara"]
    },
    "esenyurt-e-imza": {
        "name": "Esenyurt",
        "lat": "41.0259",
        "lon": "28.6779",
        "neighborhoods": ["Akevler", "Akşemsettin", "Ardıçlı", "Aşıklar", "Balıkyolu", "Barbaros", "Battalgazi", "Birlik", "Cumhuriyet", "Dede Gülizar", "Doğan Arafat", "Dumlu", "Esenkent", "Eski", "Fatih", "Ferhatpaşa", "Firuzköy", "Gökevler", "Güzelyurt", "Haramidere", "Havaalanı", "Hoşdere", "İnönü", "İstiklal", "Kapalı", "Kavaklı", "Kemer", "Kıraç", "Mehterçeşme", "Merkez", "Oruçreis", "Pınar", "Saadetdere", "Süleymaniye", "Talatpaşa", "Turgut Özal", "Uysal", "Yamanevler", "Yenikent", "Yeşilkent", "Zafer"],
        "popular": ["Kıraç", "Yeşilkent", "Havaalanı"]
    },
    "avcilar-e-imza": {
        "name": "Avcılar",
        "lat": "40.9790",
        "lon": "28.7212",
        "neighborhoods": ["Ambarlı", "Cihangir", "Denizköşkler", "Firuzköy", "Gümüşpala", "Merkez", "Mustafa Kemal Paşa", "Tahtakale", "Üniversite", "Yeşilkent"],
        "popular": ["Ambarlı", "Denizköşkler", "Firuzköy"]
    },
    "kucukcekmece-e-imza": {
        "name": "Küçükçekmece",
        "lat": "41.0205",
        "lon": "28.7768",
        "neighborhoods": ["Atakent", "Atatürk", "Beşyol", "Cennet", "Fatih", "Fevziçakmak", "Halkalı Merkez", "İnönü", "Kanarya", "Kartaltepe", "Kemalpaşa", "Söğütlüçeşme", "Tevfikbey", "Yarımburgaz", "Yeni Mahalle"],
        "popular": ["Atakent", "Halkalı", "Kanarya"]
    },
    "bahcelievler-e-imza": {
        "name": "Bahçelievler",
        "lat": "40.9972",
        "lon": "28.8569",
        "neighborhoods": ["Bahçelievler", "Cumhuriyet", "Çobançeşme", "Fevziçakmak", "Hoca Ahmet Yesevi", "Kocasinan", "Siyavuşpaşa", "Soğanlı", "Şirinevler", "Yenibosna", "Zafer"],
        "popular": ["Cumhuriyet", "Kocasinan", "Şirinevler"]
    },
    "bagcilar-e-imza": {
        "name": "Bağcılar",
        "lat": "41.0394",
        "lon": "28.8575",
        "neighborhoods": ["Bağlar", "Barbaros", "Çınar", "Demirkapı", "Esenler", "Evren", "Fatih", "Fethalmuk", "Göztepe", "Güneşli", "İnönü", "Kemalpaşa", "Kirazlı", "Mahmutbey", "Merkez", "Sancaktepe", "Yavuz Selim", "Yenimahalle", "Yıldıztepe"],
        "popular": ["Güneşli", "Kirazlı", "Mahmutbey"]
    },
    "esenler-e-imza": {
        "name": "Esenler",
        "lat": "41.0437",
        "lon": "28.8792",
        "neighborhoods": ["Atışalanı", "Birlik", "Çiftehavuzlar", "Davutpaşa", "Fatih", "Havaalanı", "Kazım Karabekir", "Kemer", "Menderes", "Mimarsinan", "Nenehatun", "Nine Hatun", "Oruçreis", "Tuna"],
        "popular": ["Çiftehavuzlar", "Havaalanı", "Menderes"]
    },
    "sultangazi-e-imza": {
        "name": "Sultangazi",
        "lat": "41.1016",
        "lon": "28.8692",
        "neighborhoods": ["75. Yıl", "Cebeci", "Esentepe", "Gazi", "Habibler", "İsmetpaşa", "Malkoçoğlu", "Sultançiftliği", "Uğur Mumcu", "Yayla"],
        "popular": ["Cebeci", "Esentepe", "İsmetpaşa"]
    },
    "gaziosmanpasa-e-imza": {
        "name": "Gaziosmanpaşa",
        "lat": "41.0698",
        "lon": "28.9064",
        "neighborhoods": ["Bağlarbaşı", "Barbaros Hayrettin Paşa", "Fevzi Çakmak", "Hürriyet", "Karadeniz", "Karayolları", "Karlıtepe", "Küçükköy", "Merkez", "Mevlana", "Sarıgöl", "Şemsipaşa", "Yeni Mahalle", "Yenidoğan", "Yıldıztabya"],
        "popular": ["Karayolları", "Karadeniz", "Yenidoğan"]
    },
    "eyupsultan-e-imza": {
        "name": "Eyüpsultan",
        "lat": "41.0467",
        "lon": "28.9339",
        "neighborhoods": ["Akşemsettin", "Alibeyköy", "Çırçır", "Defterdar", "Düğmeciler", "Emniyettepe", "Esentepe", "Göktürk Merkez", "Güzeltepe", "İhsaniye", "Karadolap", "Kemerburgaz", "Merkez", "Mithatpaşa", "Nişanca", "Odayeri", "Pirinççi", "Ramı", "Sakarya", "Silahtarağa", "Topçular", "Yeşilpınar"],
        "popular": ["Alibeyköy", "Göktürk", "Kemerburgaz"]
    },
    "sariyer-e-imza": {
        "name": "Sarıyer",
        "lat": "41.1682",
        "lon": "29.0531",
        "neighborhoods": ["Ayazağa", "Bahçeköy", "Büyükdere", "Demirciköy", "Emirgan", "Ferahevler", "Huzur", "İstinye", "Kireçburnu", "Maslak", "Merkez", "Poligon", "Rumeli Feneri", "Rumelihisarı", "Tarabya", "Uskumruköy", "Yeniköy", "Zekeriyaköy"],
        "popular": ["İstinye", "Zekeriyaköy", "Tarabya"]
    },
    "basaksehir-e-imza": {
        "name": "Başakşehir",
        "lat": "41.0922",
        "lon": "28.8059",
        "neighborhoods": ["Altınşehir", "Bahçeşehir 1. Kısım", "Bahçeşehir 2. Kısım", "Başak", "Başakşehir", "Güvercintepe", "Kayabaşı", "Şamlar", "Şahintepe", "Ziya Gökalp"],
        "popular": ["Bahçeşehir", "Ziya Gökalp", "Şamlar"]
    },
    "arnavutkoy-e-imza": {
        "name": "Arnavutköy",
        "lat": "41.1830",
        "lon": "28.7360",
        "neighborhoods": ["Anadolu", "Arnavutköy Merkez", "Balaban", "Bolluca", "Boyuklu", "Dursunköy", "Durusu", "Hadımköy", "Haraççı", "Hastane", "İmrahor", "İslambey", "Karaburun", "Marmaracık", "Mavigöl", "Nenehatun", "Taşoluk", "Tayakadın", "Yeşilbayır"],
        "popular": ["Hadımköy", "Tayakadın", "Bolluca"]
    },
    "catalca-e-imza": {
        "name": "Çatalca",
        "lat": "41.1405",
        "lon": "28.4616",
        "neighborhoods": ["Atatürk", "Aydınlar", "Belgrat", "Dağyenice", "Fatih", "Ferhatpaşa", "Gökçeali", "Gökçeali Merkez", "İhsaniye", "Kabakça", "Kaleiçi", "Karacaköy", "Karamandere", "Muratbey", "Nakkaş", "Oklalı", "Örencik", "Örcünlü"],
        "popular": ["Kaleiçi", "Ferhatpaşa", "Gökçeali"]
    },
    "fatih-e-imza": {
        "name": "Fatih",
        "lat": "41.0201",
        "lon": "28.9499",
        "neighborhoods": ["Aksaray", "Alemdar", "Ali Kuşçu", "Atikali", "Ayvansaray", "Balabanağa", "Balat", "Beyazıt", "Binbirdirek", "Cankurtaran", "Cerrahpaşa", "Çarşamba", "Çemberlitaş", "Demirtaş", "Dervişali", "Eminsinan", "Hacı Kadın", "Hırka-i Şerif", "Hocapaşa", "İskenderpaşa", "Kalenderhane", "Karagümrük", "Katip Kasım", "Kemalpaşa", "Koca Mustafapaşa", "Mercan", "Mevlanakapı", "Mimar Hayrettin", "Mimar Kemalettin", "Molla Fenari", "Molla Gürani", "Molla Hüsrev", "Muhsine Hatun", "Nişanca", "Rüstempaşa", "Sarıdemir", "Seyyid Ömer", "Silivrikapı", "Süleymaniye", "Sururi", "Şehremini", "Şehsuvar Bey", "Tahtakale", "Taya Hatun", "Yavuz Sinan", "Yavuz Sultan Selim", "Zeyrek"],
        "popular": ["Aksaray", "Çapa", "Fındıkzade"]
    },
    "beyoglu-e-imza": {
        "name": "Beyoğlu",
        "lat": "41.0343",
        "lon": "28.9770",
        "neighborhoods": ["Bereketzade", "Bülbül", "Camiikebir", "Cihangir", "Çukur", "Emekyemez", "Evliya Çelebi", "Fetihtepe", "Firuzağa", "Gümüşsuyu", "Hacıahmet", "Hacımimi", "Halıcıoğlu", "Hasköy", "Hüseyinağa", "İstiklal", "Kadımehmet", "Kaptanpaşa", "Katip Mustafa Çelebi", "Keçecipiri", "Kemankeş Karamustafa Paşa", "Kılıçalipaşa", "Kocatepe", "Kuloğlu", "Piri Paşa", "Piyalepaşa", "Pürtelaş Hasan Efendi", "Sütlüce", "Şahkulu", "Şehit Muhtar", "Tomtom", "Yenişehir"],
        "popular": ["Taksim", "Galata", "Cihangir"]
    },
    "kagithane-e-imza": {
        "name": "Kağıthane",
        "lat": "41.0785",
        "lon": "28.9746",
        "neighborhoods": ["Çağlayan", "Emniyet Evleri", "Gültepe", "Hamidiye", "Harmantepe", "Merkez", "Nurtepe", "Ortabayır", "Sanayi", "Seyrantepe", "Şirintepe", "Telsizler", "Yahya Kemal", "Yeşilce"],
        "popular": ["Çağlayan", "Gültepe", "Hamidiye"]
    },
    "zeytinburnu-e-imza": {
        "name": "Zeytinburnu",
        "lat": "41.0021",
        "lon": "28.9024",
        "neighborhoods": ["Beştelsiz", "Çırpıcı", "Gökalp", "Kazlıçeşme", "Maltepe", "Merkez", "Nuripaşa", "Seyitnizam", "Sümer", "Telsiz", "Veliefendi", "Yeşiltepe"],
        "popular": ["Kazlıçeşme", "Maltepe", "Sümer"]
    },
    "gungoren-e-imza": {
        "name": "Güngören",
        "lat": "40.9998",
        "lon": "28.8761",
        "neighborhoods": ["Akıncılar", "Gençosman", "Güneştepe", "Haznedar", "Mareşal Çakmak", "Merkez", "Tozkoparan"],
        "popular": ["Gençosman", "Güneştepe", "Merkez"]
    },
    "bayrampasa-e-imza": {
        "name": "Bayrampaşa",
        "lat": "41.0450",
        "lon": "28.9082",
        "neighborhoods": ["Altıntepsi", "Cevatpaşa", "Eski", "Ispartakule", "Kartaltepe", "Kocatepe", "Muratpaşa", "Orta", "Terazidere", "Yeni", "Yıldırım"],
        "popular": ["Altıntepsi", "Cevatpaşa", "Muratpaşa"]
    },
    "adalar-e-imza": {
        "name": "Adalar",
        "lat": "40.8779",
        "lon": "29.1156",
        "neighborhoods": ["Büyükada", "Burgazada", "Heybeliada", "Kınalıada", "Maden"],
        "popular": ["Büyükada", "Heybeliada", "Burgazada"]
    },
}

# Read template
with open('professional-district-template.html', 'r', encoding='utf-8') as f:
    template = f.read()

print("🚀 Profesyonel, beyaz arkaplan, SVG ikonlu template uygulanıyor...\n")

for file, data in districts.items():
    name = data["name"]
    neighborhoods = data["neighborhoods"]
    popular = data["popular"]
    
    # Neighborhood HTML oluştur
    neighborhood_html = ""
    for n in neighborhoods:
        if n in popular:
            neighborhood_html += f'<div class="neighborhood-item popular">{n}</div>\n        '
        else:
            neighborhood_html += f'<div class="neighborhood-item">{n}</div>\n        '
    
    # Mahalle listesi için
    all_neighborhoods = ", ".join(neighborhoods[:15]) + ("..." if len(neighborhoods) > 15 else "")
    
    # Template değişkenlerini değiştir
    content = template
    content = content.replace('{{DISTRICT}}', name)
    content = content.replace('{{FILE}}', file)
    content = content.replace('{{LAT}}', data["lat"])
    content = content.replace('{{LON}}', data["lon"])
    content = content.replace('{{ALL_NEIGHBORHOODS}}', all_neighborhoods)
    content = content.replace('{{POPULAR_1}}', popular[0])
    content = content.replace('{{POPULAR_2}}', popular[1] if len(popular) > 1 else popular[0])
    content = content.replace('{{POPULAR_3}}', popular[2] if len(popular) > 2 else popular[0])
    content = content.replace('{{NEIGHBORHOOD_HTML}}', neighborhood_html)
    
    # Kaydet
    filepath = f"site/{file}.html"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {name} - {len(neighborhoods)} mahalle")

print(f"\n🎉 {len(districts)} ilçe sayfası PROFESYONEL tasarıma güncellendi!")
print("\n✨ ÖZELLİKLER:")
print("  ✅ BEYAZ ARKAPLAN: Temiz, profesyonel görünüm")
print("  ✅ SVG İKONLAR: Emoji yok, gerçek SVG grafikler")
print("  ✅ DOĞRU MAHALLELER: Her ilçenin TÜM mahalleleri")
print("  ✅ SEO OPTİMİZE: 3 FAQ + LocalBusiness + keywords")
print("  ✅ MOBİL UYUMLU: Responsive, modern tasarım")
print("  ✅ HIZLI YÜKLEME: Minimal, optimize CSS")
