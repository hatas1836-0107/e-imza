#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
🔥🔥🔥 FİNAL SEO BOMBASI - TÜM 37 İLÇE 🔥🔥🔥
- HER İLÇE İÇİN TEK TEK ÖZEL ARAMA KELİMELERİ
- 6 BÜYÜK BLOG KARTI - KAPSAMLI İÇERİK
- INTER FONT - PERFECT SPACING - MODERN TASARIM
- FİREBASE DİNAMİK FİYATLAR
- TÜM İSTANBUL'A TESLİMAT VURGUSU (39 İLÇE)
- RAKİPLERİN ÖNÜNE GEÇME MODU AKTİF 🚀
"""

districts = {
    "umraniye-e-imza": {
        "name": "Ümraniye",
        "lat": "41.0214",
        "lon": "29.1058",
        "neighborhoods": ["Armağanevler", "Aşağı Dudullu", "Atakent", "Aydınevler", "Çakmak", "Çamlık", "Dumlupınar", "Esenevler", "Esenkent", "Finans Merkezi", "Göğüşlü", "Hekimbaşı", "İnkılap", "İstiklal", "Kazım Karabekir", "Küçükbakkalköy", "Madenler", "Mehmet Akif", "Necip Fazıl", "Parseller", "Saray", "Site", "Şerifali", "Tantavi", "Tatlısu", "Topağacı", "Yamanevler", "Yenişehir", "Yukarı Dudullu"],
        "popular": ["Finans Merkezi", "Küçükbakkalköy", "Çakmak"],
        "keywords": "Ümraniye e-imza, Ümraniye e-imza nereden alınır, Ümraniye e-imza fiyatları, Ümraniye aynı gün e-imza, Ümraniye kurye e-imza, Ümraniye Finans Merkezi e-imza, Ümraniye Küçükbakkalköy e-imza, Ümraniye Çakmak e-imza, Ümraniye e-imza satan yerler, Ümraniye online e-imza başvurusu, Ümraniye e-imza ücreti, Ümraniye SGK e-imza, Ümraniye noter e-imza, Ümraniye e-fatura e-imza, Ümraniye nitelikli elektronik imza, Ümraniye e-imza kurulumu, Ümraniye e-imza teslimatı"
    },
    "kadikoy-e-imza": {
        "name": "Kadıköy",
        "lat": "40.9901",
        "lon": "29.0251",
        "neighborhoods": ["19 Mayıs", "Acıbadem", "Bostancı", "Caferağa", "Caddebostan", "Erenköy", "Fenerbahçe", "Feneryolu", "Fikirtepe", "Göztepe", "Hasanpaşa", "Koşuyolu", "Kozyatağı", "Moda", "Osmanağa", "Rasimpaşa", "Sahrayıcedit", "Suadiye", "Zühtüpaşa"],
        "popular": ["Moda", "Bostancı", "Acıbadem"],
        "keywords": "Kadıköy e-imza, Kadıköy e-imza nereden alınır, Kadıköy e-imza fiyatları, Kadıköy Moda e-imza, Kadıköy Bostancı e-imza, Kadıköy Acıbadem e-imza, Kadıköy aynı gün e-imza, Kadıköy kurye e-imza, Kadıköy e-imza satan yerler, Kadıköy online e-imza, Kadıköy SGK e-imza, Kadıköy noter e-imza, Kadıköy e-fatura, Kadıköy nitelikli elektronik imza, Kadıköy e-imza başvurusu, Kadıköy e-imza kurulumu"
    },
    "besiktas-e-imza": {
        "name": "Beşiktaş",
        "lat": "41.0422",
        "lon": "29.0070",
        "neighborhoods": ["Abbasağa", "Akatlar", "Arnavutköy", "Bebek", "Etiler", "Gayrettepe", "Konaklar", "Levent", "Levazım", "Mecidiye", "Muradiye", "Nisbetiye", "Ortaköy", "Sinanpaşa", "Türkali", "Ulus", "Vişnezade", "Yıldız"],
        "popular": ["Levent", "Etiler", "Ortaköy"],
        "keywords": "Beşiktaş e-imza, Beşiktaş e-imza nereden alınır, Beşiktaş Levent e-imza, Beşiktaş Etiler e-imza, Beşiktaş Ortaköy e-imza, Beşiktaş aynı gün e-imza, Beşiktaş kurye e-imza, Beşiktaş e-imza fiyatları, Beşiktaş e-imza satan yerler, Beşiktaş online e-imza başvurusu, Beşiktaş SGK e-imza, Beşiktaş noter e-imza, Beşiktaş nitelikli elektronik imza, Beşiktaş e-fatura e-imza, Beşiktaş e-imza kurulumu"
    },
    "sisli-e-imza": {
        "name": "Şişli",
        "lat": "41.0602",
        "lon": "28.9876",
        "neighborhoods": ["19 Mayıs", "Ayazağa", "Bomonti", "Cumhuriyet", "Esentepe", "Eskişehir", "Feriköy", "Fulya", "Gülbahar", "Halaskargazi", "Harbiye", "İnönü", "Kaptanpaşa", "Kuştepe", "Mecidiyeköy", "Meşrutiyet", "Teşvikiye"],
        "popular": ["Mecidiyeköy", "Osmanbey", "Nişantaşı"],
        "keywords": "Şişli e-imza, Şişli e-imza nereden alınır, Şişli Mecidiyeköy e-imza, Şişli Osmanbey e-imza, Şişli Nişantaşı e-imza, Şişli aynı gün e-imza, Şişli kurye e-imza, Şişli e-imza fiyatları, Şişli e-imza satan yerler, Şişli online e-imza, Şişli SGK e-imza, Şişli noter e-imza, Şişli nitelikli elektronik imza, Şişli e-fatura, Şişli e-imza başvurusu"
    },
    "maltepe-e-imza": {
        "name": "Maltepe",
        "lat": "40.9322",
        "lon": "29.1416",
        "neighborhoods": ["Altayçeşme", "Altıntepe", "Bağlarbaşı", "Başıbüyük", "Büyükbakkalköy", "Cevizli", "Esenkent", "Feyzullah", "Fındıklı", "Girne", "Gülsuyu", "Gülensu", "İdealtepe", "Küçükyalı", "Zümrütevler"],
        "popular": ["Altayçeşme", "Cevizli", "Küçükyalı"],
        "keywords": "Maltepe e-imza, Maltepe e-imza nereden alınır, Maltepe e-imza fiyatları, Maltepe Altayçeşme e-imza, Maltepe Cevizli e-imza, Maltepe Küçükyalı e-imza, Maltepe aynı gün e-imza, Maltepe kurye e-imza, Maltepe e-imza satan yerler, Maltepe online e-imza, Maltepe SGK e-imza, Maltepe noter e-imza, Maltepe e-fatura, Maltepe nitelikli elektronik imza"
    },
    "pendik-e-imza": {
        "name": "Pendik",
        "lat": "40.8783",
        "lon": "29.2345",
        "neighborhoods": ["Ahmet Yesevi", "Bahçelievler", "Batı", "Çamlik", "Çınardere", "Doğu", "Dumlupınar", "Ertuğrul Gazi", "Esenyalı", "Esenşehir", "Fevzi Çakmak", "Göçbeyli", "Güllü Bağlar", "Güzelyalı", "Harmandere", "Kavakpınar", "Kaynarca", "Kurtköy", "Orta", "Ramazanoğlu", "Sapanbağları", "Sülüntepe", "Velibaba", "Yeşilbağlar"],
        "popular": ["Kurtköy", "Kavakpınar", "Kaynarca"],
        "keywords": "Pendik e-imza, Pendik e-imza nereden alınır, Pendik e-imza fiyatları, Pendik Kurtköy e-imza, Pendik Kavakpınar e-imza, Pendik Kaynarca e-imza, Pendik aynı gün e-imza, Pendik kurye e-imza, Pendik e-imza satan yerler, Pendik online e-imza, Pendik SGK e-imza, Pendik noter e-imza, Pendik e-fatura, Pendik nitelikli elektronik imza"
    },
    "atasehir-e-imza": {
        "name": "Ataşehir",
        "lat": "40.9826",
        "lon": "29.1249",
        "neighborhoods": ["Ataşehir", "Aşık Veysel", "Barbaros", "Esatpaşa", "Ferhatpaşa", "İçerenköy", "İnönü", "Kayışdağı", "Küçükbakkalköy", "Mustafa Kemal", "Örnek", "Yenisahra"],
        "popular": ["Barbaros", "İçerenköy", "Küçükbakkalköy"],
        "keywords": "Ataşehir e-imza, Ataşehir e-imza nereden alınır, Ataşehir e-imza fiyatları, Ataşehir Barbaros e-imza, Ataşehir İçerenköy e-imza, Ataşehir Küçükbakkalköy e-imza, Ataşehir aynı gün e-imza, Ataşehir kurye e-imza, Ataşehir e-imza satan yerler, Ataşehir online e-imza, Ataşehir SGK e-imza, Ataşehir noter e-imza"
    },
    "kartal-e-imza": {
        "name": "Kartal",
        "lat": "40.8992",
        "lon": "29.1842",
        "neighborhoods": ["Atalar", "Cevizli", "Esentepe", "Gümüşpınar", "Hürriyet", "Karlıktepe", "Kordonboyu", "Orta", "Petrol İş", "Soğanlık", "Topselvi", "Uğur Mumcu", "Yakacık", "Yalı", "Yukarı", "Yunus"],
        "popular": ["Yakacık", "Soğanlık", "Kartal Merkez"],
        "keywords": "Kartal e-imza, Kartal e-imza nereden alınır, Kartal e-imza fiyatları, Kartal Yakacık e-imza, Kartal Soğanlık e-imza, Kartal aynı gün e-imza, Kartal kurye e-imza, Kartal e-imza satan yerler, Kartal online e-imza, Kartal SGK e-imza, Kartal noter e-imza, Kartal e-fatura"
    },
    "bakirkoy-e-imza": {
        "name": "Bakırköy",
        "lat": "40.9808",
        "lon": "28.8737",
        "neighborhoods": ["Ataköy 1. Kısım", "Ataköy 2-5-6. Kısım", "Ataköy 3-4-11. Kısım", "Ataköy 7-8-9-10. Kısım", "Bahçelievler", "Basınköy", "Cevizlik", "Kartaltepe", "Osmaniye", "Sakızağacı", "Şenlikköy", "Yeşilköy", "Yenimahalle", "Zeytinlik", "Zuhuratbaba"],
        "popular": ["Ataköy", "Yeşilköy", "Şenlikköy"],
        "keywords": "Bakırköy e-imza, Bakırköy e-imza nereden alınır, Bakırköy e-imza fiyatları, Bakırköy Ataköy e-imza, Bakırköy Yeşilköy e-imza, Bakırköy Şenlikköy e-imza, Bakırköy aynı gün e-imza, Bakırköy kurye e-imza, Bakırköy e-imza satan yerler, Bakırköy online e-imza, Bakırköy SGK e-imza, Bakırköy noter e-imza"
    },
    "beylikduzu-e-imza": {
        "name": "Beylikdüzü",
        "lat": "41.0022",
        "lon": "28.6414",
        "neighborhoods": ["Adnan Kahveci", "Barış", "Büyükşehir", "Cumhuriyet", "Dereağzı", "Gürpınar", "Kavaklı", "Marmara", "Sahil", "Yakuplu"],
        "popular": ["Adnan Kahveci", "Yakuplu", "Gürpınar"],
        "keywords": "Beylikdüzü e-imza, Beylikdüzü e-imza nereden alınır, Beylikdüzü e-imza fiyatları, Beylikdüzü Adnan Kahveci e-imza, Beylikdüzü Yakuplu e-imza, Beylikdüzü Gürpınar e-imza, Beylikdüzü aynı gün e-imza, Beylikdüzü kurye e-imza, Beylikdüzü e-imza satan yerler, Beylikdüzü online e-imza"
    },
    "sariyer-e-imza": {
        "name": "Sarıyer",
        "lat": "41.1661",
        "lon": "29.0507",
        "neighborhoods": ["Ayazağa", "Bahçeköy", "Büyükdere", "Demirciköy", "Emirgan", "Ferahevler", "Gümüşdere", "Huzur", "İstinye", "Kocataş", "Maslak", "Merkez", "Pınar", "Poligon", "Reşitpaşa", "Rumelihisarı", "Tarabya", "Yeniköy", "Zekeriyaköy"],
        "popular": ["Maslak", "İstinye", "Zekeriyaköy"],
        "keywords": "Sarıyer e-imza, Sarıyer e-imza nereden alınır, Sarıyer e-imza fiyatları, Sarıyer Maslak e-imza, Sarıyer İstinye e-imza, Sarıyer Zekeriyaköy e-imza, Sarıyer aynı gün e-imza, Sarıyer kurye e-imza, Sarıyer e-imza satan yerler, Sarıyer online e-imza"
    },
    "basaksehir-e-imza": {
        "name": "Başakşehir",
        "lat": "41.0909",
        "lon": "28.8045",
        "neighborhoods": ["Altınşehir", "Bahçeşehir 1. Kısım", "Bahçeşehir 2. Kısım", "Başak", "Başakşehir", "Güvercintepe", "Kayabaşı", "Şahintepe", "Şamlar", "Ziya Gökalp"],
        "popular": ["Bahçeşehir", "Kayabaşı", "Başakşehir Merkez"],
        "keywords": "Başakşehir e-imza, Başakşehir e-imza nereden alınır, Başakşehir e-imza fiyatları, Başakşehir Bahçeşehir e-imza, Başakşehir Kayabaşı e-imza, Başakşehir aynı gün e-imza, Başakşehir kurye e-imza, Başakşehir e-imza satan yerler"
    },
    "fatih-e-imza": {
        "name": "Fatih",
        "lat": "41.0192",
        "lon": "28.9497",
        "neighborhoods": ["Aksaray", "Alemdar", "Atikali", "Ayvansaray", "Balat", "Beyazıt", "Binbirdirek", "Cankurtaran", "Cerrahpaşa", "Dervişali", "Eminönü", "Hırkaişerif", "Karagümrük", "Kocamustafapaşa", "Küçükayasofya", "Mercan", "Molla Hüsrev", "Sultanahmet", "Süleymaniye", "Zeyrek"],
        "popular": ["Sultanahmet", "Eminönü", "Aksaray"],
        "keywords": "Fatih e-imza, Fatih e-imza nereden alınır, Fatih e-imza fiyatları, Fatih Sultanahmet e-imza, Fatih Eminönü e-imza, Fatih Aksaray e-imza, Fatih aynı gün e-imza, Fatih kurye e-imza, Fatih e-imza satan yerler, Fatih online e-imza"
    },
    "uskudar-e-imza": {
        "name": "Üsküdar",
        "lat": "41.0224",
        "lon": "29.0151",
        "neighborhoods": ["Acıbadem", "Ahmediye", "Altunizade", "Beylerbeyi", "Bülbülderesi", "Burhaniye", "Çengelköy", "İcadiye", "Kandilli", "Kısıklı", "Kirazlıtepe", "Kuleli", "Kuzguncuk", "Mahmut Şevket Paşa", "Murat Reis", "Salacak", "Selimiye", "Sultantepe", "Ünalan", "Valide-i Atik"],
        "popular": ["Acıbadem", "Altunizade", "Ünalan"],
        "keywords": "Üsküdar e-imza, Üsküdar e-imza nereden alınır, Üsküdar e-imza fiyatları, Üsküdar Acıbadem e-imza, Üsküdar Altunizade e-imza, Üsküdar Ünalan e-imza, Üsküdar aynı gün e-imza, Üsküdar kurye e-imza, Üsküdar e-imza satan yerler"
    },
    "tuzla-e-imza": {
        "name": "Tuzla",
        "lat": "40.8231",
        "lon": "29.2983",
        "neighborhoods": ["Aydınlı", "Aydıntepe", "Cami", "Evliya Çelebi", "İçmeler", "Mescit", "Orhantepe", "Postane", "Şifa", "Tepeören", "Yayla"],
        "popular": ["Aydınlı", "İçmeler", "Evliya Çelebi"],
        "keywords": "Tuzla e-imza, Tuzla e-imza nereden alınır, Tuzla e-imza fiyatları, Tuzla Aydınlı e-imza, Tuzla İçmeler e-imza, Tuzla aynı gün e-imza, Tuzla kurye e-imza, Tuzla e-imza satan yerler, Tuzla online e-imza"
    },
    "zeytinburnu-e-imza": {
        "name": "Zeytinburnu",
        "lat": "41.0022",
        "lon": "28.9038",
        "neighborhoods": ["Beştelsiz", "Çırçır", "Gökalp", "Kazlıçeşme", "Maltepe", "Merkez", "Nuripaşa", "Seyitnizam", "Sümer", "Telsiz", "Veliefendi", "Yeşiltepe"],
        "popular": ["Kazlıçeşme", "Merkez", "Maltepe"],
        "keywords": "Zeytinburnu e-imza, Zeytinburnu e-imza nereden alınır, Zeytinburnu e-imza fiyatları, Zeytinburnu Kazlıçeşme e-imza, Zeytinburnu aynı gün e-imza, Zeytinburnu kurye e-imza"
    },
    "kagithane-e-imza": {
        "name": "Kağıthane",
        "lat": "41.0798",
        "lon": "28.9759",
        "neighborhoods": ["Çağlayan", "Çeliktepe", "Emniyet Evleri", "Gültepe", "Güzeltepe", "Hamidiye", "Harmantepe", "Merkez", "Nurtepe", "Ortabayır", "Sanayi", "Seyrantepe", "Şirintepe", "Talatpaşa", "Telsizler", "Yahya Kemal", "Yeşilce"],
        "popular": ["Çağlayan", "Seyrantepe", "Merkez"],
        "keywords": "Kağıthane e-imza, Kağıthane e-imza nereden alınır, Kağıthane e-imza fiyatları, Kağıthane Çağlayan e-imza, Kağıthane Seyrantepe e-imza, Kağıthane aynı gün e-imza"
    },
    "esenler-e-imza": {
        "name": "Esenler",
        "lat": "41.0426",
        "lon": "28.8794",
        "neighborhoods": ["Atışalanı", "Birlik", "Davutpaşa", "Fatih", "Havaalanı", "Kemer", "Menderes", "Mimarsinan", "Nenehatun", "Oruçreis", "Tuna", "Turgutreis", "Yavuz Selim"],
        "popular": ["Menderes", "Tuna", "Oruçreis"],
        "keywords": "Esenler e-imza, Esenler e-imza nereden alınır, Esenler e-imza fiyatları, Esenler Menderes e-imza, Esenler aynı gün e-imza, Esenler kurye e-imza"
    },
    "gungoren-e-imza": {
        "name": "Güngören",
        "lat": "41.0226",
        "lon": "28.8754",
        "neighborhoods": ["Akıncılar", "Güneştepe", "Güven", "Gençosman", "Haznedar", "İnönü", "Mareşal Çakmak", "Mehmet Nesih Özmen", "Merkez", "Sanayi", "Tozkoparan"],
        "popular": ["Güneştepe", "Merkez", "Haznedar"],
        "keywords": "Güngören e-imza, Güngören e-imza nereden alınır, Güngören e-imza fiyatları, Güngören Güneştepe e-imza, Güngören aynı gün e-imza"
    },
    "beyoglu-e-imza": {
        "name": "Beyoğlu",
        "lat": "41.0391",
        "lon": "28.9784",
        "neighborhoods": ["Bereketzade", "Bülbül", "Camiikebir", "Cihangir", "Çukur", "Evliya Çelebi", "Firuzağa", "Galipdede", "Hacıahmet", "Hacımimi", "Halıcıoğlu", "Hasköy", "Hüseyinağa", "Kalyoncu Kulluk", "Kaptanpaşa", "Katip Mustafa Çelebi", "Kılıçalipaşa", "Kuloğlu", "Ömerpaşa", "Piripaşa", "Sütlüce", "Tomtom"],
        "popular": ["Taksim", "Galata", "Cihangir"],
        "keywords": "Beyoğlu e-imza, Beyoğlu e-imza nereden alınır, Beyoğlu e-imza fiyatları, Beyoğlu Taksim e-imza, Beyoğlu Galata e-imza, Beyoğlu Cihangir e-imza, Beyoğlu aynı gün e-imza"
    },
    "avcilar-e-imza": {
        "name": "Avcılar",
        "lat": "40.9779",
        "lon": "28.7219",
        "neighborhoods": ["Ambarlı", "Cihangir", "Denizköşkler", "Firuzköy", "Gümüşpala", "Merkez", "Mustafa Kemal Paşa", "Tahtakale", "Üniversite", "Yeşilkent"],
        "popular": ["Üniversite", "Denizköşkler", "Firuzköy"],
        "keywords": "Avcılar e-imza, Avcılar e-imza nereden alınır, Avcılar e-imza fiyatları, Avcılar Üniversite e-imza, Avcılar Denizköşkler e-imza, Avcılar aynı gün e-imza"
    },
    "bagcilar-e-imza": {
        "name": "Bağcılar",
        "lat": "41.0392",
        "lon": "28.8575",
        "neighborhoods": ["100.Yıl", "Bağlar", "Barbaros", "Çınar", "Demirkapı", "Evren", "Fatih", "Fevziçakmak", "Göztepe", "Güneşli", "İnönü", "Kazım Karabekir", "Kemalpaşa", "Kirazlı", "Mahmutbey", "Merkez", "Yavuz Selim", "Yeni Mahalle", "Yıldıztepe"],
        "popular": ["Güneşli", "Mahmutbey", "Kirazlı"],
        "keywords": "Bağcılar e-imza, Bağcılar e-imza nereden alınır, Bağcılar e-imza fiyatları, Bağcılar Güneşli e-imza, Bağcılar Mahmutbey e-imza, Bağcılar aynı gün e-imza"
    },
    "bahcelievler-e-imza": {
        "name": "Bahçelievler",
        "lat": "41.0013",
        "lon": "28.8563",
        "neighborhoods": ["Bahçelievler", "Çobançeşme", "Cumhuriyet", "Fevziçakmak", "Hürriyet", "Kocasinan", "Şirinevler", "Soganli", "Yenibosna", "Zafer"],
        "popular": ["Şirinevler", "Yenibosna", "Bahçelievler Merkez"],
        "keywords": "Bahçelievler e-imza, Bahçelievler e-imza nereden alınır, Bahçelievler e-imza fiyatları, Bahçelievler Şirinevler e-imza, Bahçelievler Yenibosna e-imza"
    },
    "sultangazi-e-imza": {
        "name": "Sultangazi",
        "lat": "41.1045",
        "lon": "28.8687",
        "neighborhoods": ["75. Yıl", "Cebeci", "Cumhuriyet", "Esentepe", "Esenyurt", "Gazi", "İsmetpaşa", "Sultan Murat", "Uğur Mumcu", "Yayla"],
        "popular": ["75. Yıl", "Cebeci", "Esentepe"],
        "keywords": "Sultangazi e-imza, Sultangazi e-imza nereden alınır, Sultangazi e-imza fiyatları, Sultangazi aynı gün e-imza, Sultangazi kurye e-imza"
    },
    "gaziosmanpasa-e-imza": {
        "name": "Gaziosmanpaşa",
        "lat": "41.0683",
        "lon": "28.9079",
        "neighborhoods": ["Bağlarbaşı", "Barbaros Hayrettin Paşa", "Ferhatpaşa", "Hürriyet", "Karadeniz", "Karlıtepe", "Karayolları", "Kazım Karabekir", "Küçükköy", "Merkez", "Mevlana", "Pazariçi", "Sarıgöl", "Şemsipaşa", "Yeni Mahalle", "Yıldıztabya"],
        "popular": ["Merkez", "Karayolları", "Yıldıztabya"],
        "keywords": "Gaziosmanpaşa e-imza, Gaziosmanpaşa e-imza nereden alınır, Gaziosmanpaşa e-imza fiyatları, Gaziosmanpaşa aynı gün e-imza"
    },
    "eyupsultan-e-imza": {
        "name": "Eyüpsultan",
        "lat": "41.0463",
        "lon": "28.9330",
        "neighborhoods": ["Akşemsettin", "Alibeyköy", "Çırçır", "Defterdar", "Düğmeciler", "Emniyettepe", "Göktürk Merkez", "Güzeltepe", "İslambey", "Merkez", "Mithatpaşa", "Pirinççi", "Rami", "Silahtarağa", "Topçular", "Yeşilpınar"],
        "popular": ["Alibeyköy", "Göktürk", "Topçular"],
        "keywords": "Eyüpsultan e-imza, Eyüpsultan e-imza nereden alınır, Eyüpsultan e-imza fiyatları, Eyüpsultan Alibeyköy e-imza, Eyüpsultan Göktürk e-imza"
    },
    "esenyurt-e-imza": {
        "name": "Esenyurt",
        "lat": "41.0299",
        "lon": "28.6791",
        "neighborhoods": ["Akevler", "Akören", "Ardıçlı", "Aşık Veysel", "Bahçeşehir 1. Kısım", "Balıkyolu", "Beylikdüzü Osb", "Esenkent", "Esenyurt Merkez", "Fatih", "Gökevler", "Güzelyurt", "Haramidere", "Hoşdere", "İnönü", "Kavaklı", "Kıraç", "Mehterçeşme", "Orta", "Ömerli", "Pınar", "Saadetdere", "Sakalar", "Sultanmurat", "Talatpaşa", "Turgut Özal", "Yenikent"],
        "popular": ["Bahçeşehir", "Esenkent", "Yenikent"],
        "keywords": "Esenyurt e-imza, Esenyurt e-imza nereden alınır, Esenyurt e-imza fiyatları, Esenyurt Bahçeşehir e-imza, Esenyurt Esenkent e-imza, Esenyurt aynı gün e-imza"
    },
    "kucukcekmece-e-imza": {
        "name": "Küçükçekmece",
        "lat": "41.0129",
        "lon": "28.7865",
        "neighborhoods": ["Atatürk", "Beşyol", "Cennet", "Cumhuriyet", "Fatih", "Fevzi Çakmak", "Gültepe", "Halkalı Merkez", "İnönü", "Kanarya", "Kartaltepe", "Kemalpaşa", "Mehmet Akif", "Söğütlüçeşme", "Tevfikbey", "Yeşilova", "Yarımburgaz"],
        "popular": ["Halkalı", "Atatürk", "Cennet"],
        "keywords": "Küçükçekmece e-imza, Küçükçekmece e-imza nereden alınır, Küçükçekmece e-imza fiyatları, Küçükçekmece Halkalı e-imza, Küçükçekmece aynı gün e-imza"
    },
    "buyukcekmece-e-imza": {
        "name": "Büyükçekmece",
        "lat": "41.0216",
        "lon": "28.5814",
        "neighborhoods": ["Atatürk", "Celaliye", "Dizdariye", "Fatih", "Güzelce", "Kamiloba", "Karaağaç", "Kumburgaz", "Mimar Sinan", "Mimaroba", "Muratbey", "Pınartepe", "Sinanoba", "Türkoba", "Ulus", "Yakuplu"],
        "popular": ["Kumburgaz", "Mimaroba", "Ulus"],
        "keywords": "Büyükçekmece e-imza, Büyükçekmece e-imza nereden alınır, Büyükçekmece e-imza fiyatları, Büyükçekmece Kumburgaz e-imza, Büyükçekmece aynı gün e-imza"
    },
    "sancaktepe-e-imza": {
        "name": "Sancaktepe",
        "lat": "41.0038",
        "lon": "29.2290",
        "neighborhoods": ["Abdurrahmangazi", "Akpınar", "Atatürk", "Emek", "Eyüp Sultan", "Fatih", "Hikmet", "İnönü", "Kemal Türkler", "Meclis", "Merve", "Mevlana", "Osmangazi", "Paşaköy", "Sarayli", "Sarıgazi", "Safa", "Veysel Karani"],
        "popular": ["Sarıgazi", "Paşaköy", "Emek"],
        "keywords": "Sancaktepe e-imza, Sancaktepe e-imza nereden alınır, Sancaktepe e-imza fiyatları, Sancaktepe Sarıgazi e-imza, Sancaktepe aynı gün e-imza"
    },
    "sultanbeyli-e-imza": {
        "name": "Sultanbeyli",
        "lat": "40.9658",
        "lon": "29.2627",
        "neighborhoods": ["Abdurrahmangazi", "Adil", "Akşemsettin", "Battalgazi", "Fatih", "Hasanpaşa", "Mecidiye", "Mimar Sinan", "Necip Fazıl", "Orhangazi", "Yavuz Selim"],
        "popular": ["Mimar Sinan", "Yavuz Selim", "Abdurrahmangazi"],
        "keywords": "Sultanbeyli e-imza, Sultanbeyli e-imza nereden alınır, Sultanbeyli e-imza fiyatları, Sultanbeyli aynı gün e-imza, Sultanbeyli kurye e-imza"
    },
    "cekmekoy-e-imza": {
        "name": "Çekmeköy",
        "lat": "41.0323",
        "lon": "29.1841",
        "neighborhoods": ["Alemdağ", "Aydinlar", "Çakmak", "Ekşioğlu", "Güngören", "Hamidiye", "Huzur", "Kirazlidere", "Koçullu", "Merkez", "Nişantepe", "Ömerli", "Reşadiye", "Sırapınar", "Sultançiftliği", "Taşdelen"],
        "popular": ["Taşdelen", "Ömerli", "Alemdağ"],
        "keywords": "Çekmeköy e-imza, Çekmeköy e-imza nereden alınır, Çekmeköy e-imza fiyatları, Çekmeköy Taşdelen e-imza, Çekmeköy Ömerli e-imza, Çekmeköy aynı gün e-imza"
    },
    "beykoz-e-imza": {
        "name": "Beykoz",
        "lat": "41.1273",
        "lon": "29.0982",
        "neighborhoods": ["Akbaba", "Anadolu Hisarı", "Anadolu Kavağı", "Çavuşbaşı", "Çubuklu", "Dereseki", "Göksu", "Görele", "Gümüşsuyu", "İncirköy", "Kanlıca", "Kavacık", "Merkez", "Örnekköy", "Paşabahçe", "Paşamandıra", "Polonezköy", "Riva", "Rüzgarlıbahçe", "Tokatköy", "Yalıköy", "Yeni Mahalle"],
        "popular": ["Kavacık", "Çubuklu", "Beykoz Merkez"],
        "keywords": "Beykoz e-imza, Beykoz e-imza nereden alınır, Beykoz e-imza fiyatları, Beykoz Kavacık e-imza, Beykoz Çubuklu e-imza, Beykoz aynı gün e-imza"
    },
    "catalca-e-imza": {
        "name": "Çatalca",
        "lat": "41.1428",
        "lon": "28.4609",
        "neighborhoods": ["Atatürk", "Fatih", "Ferhatpaşa", "Gökçeali", "Kaleiçi", "Karacaköy"],
        "popular": ["Kaleiçi", "Gökçeali", "Ferhatpaşa"],
        "keywords": "Çatalca e-imza, Çatalca e-imza nereden alınır, Çatalca e-imza fiyatları, Çatalca aynı gün e-imza, Çatalca kurye e-imza"
    },
    "silivri-e-imza": {
        "name": "Silivri",
        "lat": "41.0767",
        "lon": "28.2458",
        "neighborhoods": ["Alibey", "Çayırdere", "Fatih", "Mimar Sinan", "Piri Mehmet Paşa", "Selimpaşa", "Semiz Kum", "Seymen", "Yeni Mahalle"],
        "popular": ["Selimpaşa", "Semiz Kum", "Merkez"],
        "keywords": "Silivri e-imza, Silivri e-imza nereden alınır, Silivri e-imza fiyatları, Silivri Selimpaşa e-imza, Silivri aynı gün e-imza, Silivri kurye e-imza"
    },
    "sile-e-imza": {
        "name": "Şile",
        "lat": "41.1760",
        "lon": "29.6179",
        "neighborhoods": ["Ağva", "Ahmetli", "Alacali", "Bali", "Balibey", "Çayırbaşı", "Değirmençayır", "Dereköy", "Dodurga", "Esenceli", "Göçe", "Hasanlı", "Kabakoz", "Kalem", "Karabeyli", "Karakiraz", "Kervansaray", "Kömürlük", "Kurna", "Kurfallı", "Sahilköy", "Satmazlı", "Şuayipli", "Teke", "Üvezli", "Yazımanayır", "Yeniköy", "Yeşilvadi"],
        "popular": ["Ağva", "Şile Merkez", "Kabakoz"],
        "keywords": "Şile e-imza, Şile e-imza nereden alınır, Şile e-imza fiyatları, Şile Ağva e-imza, Şile aynı gün e-imza, Şile kurye e-imza"
    },
    "arnavutkoy-e-imza": {
        "name": "Arnavutköy",
        "lat": "41.1900",
        "lon": "28.7365",
        "neighborhoods": ["Anadolu", "Arapçeşme", "Atatürk", "Baklalı", "Balaban", "Bolluca", "Boyalik", "Dursunköy", "Hacımaşlı", "Hadımköy", "İmrahor", "İslâmlar", "Karlıköy", "Merkez", "Nenehatun", "Sazlıbosna", "Taşoluk", "Tayakadın", "Yayla"],
        "popular": ["Hadımköy", "Bolluca", "Merkez"],
        "keywords": "Arnavutköy e-imza, Arnavutköy e-imza nereden alınır, Arnavutköy e-imza fiyatları, Arnavutköy Hadımköy e-imza, Arnavutköy Bolluca e-imza"
    },
    "adalar-e-imza": {
        "name": "Adalar",
        "lat": "40.8630",
        "lon": "29.1249",
        "neighborhoods": ["Burgazada", "Büyükada", "Heybeliada", "Kinaliada", "Maden"],
        "popular": ["Büyükada", "Heybeliada", "Burgazada"],
        "keywords": "Adalar e-imza, Adalar e-imza nereden alınır, Adalar e-imza fiyatları, Büyükada e-imza, Heybeliada e-imza, Adalar aynı gün e-imza, Adalar kurye e-imza"
    },
    "bayramapasa-e-imza": {
        "name": "Bayrampaşa",
        "lat": "41.0444",
        "lon": "28.9085",
        "neighborhoods": ["Altıntepsi", "Cevatpaşa", "Değirmentepe", "İsmetpaşa", "Kartaltepe", "Kocatepe", "Muratpaşa", "Orta", "Terazidere", "Yeni Mahalle", "Yıldırım"],
        "popular": ["Kocatepe", "Yıldırım", "Kartaltepe"],
        "keywords": "Bayrampaşa e-imza, Bayrampaşa e-imza nereden alınır, Bayrampaşa e-imza fiyatları, Bayrampaşa aynı gün e-imza, Bayrampaşa kurye e-imza"
    }
}

print("🔥🔥🔥 FİNAL SEO BOMBASI BAŞLIYOR 🔥🔥🔥\n")
print("📊 TOPLAM 37 İLÇE OLUŞTURULACAK")
print("✨ ÖZELLİKLER:")
print("  🎯 HER İLÇE İÇİN TEK TEK ÖZEL ARAMA KELİMELERİ")
print("  📝 6 BÜYÜK BLOG KARTI - KAPSAMLI İÇERİK")
print("  🎨 INTER FONT - PERFECT SPACING - MODERN TASARIM")
print("  💰 FİREBASE DİNAMİK FİYATLAR")
print("  🌍 TÜM İSTANBUL 39 İLÇEYE TESLİMAT VURGUSU")
print("  🚀 RAKİPLERİN ÖNÜNE GEÇME MOD AKTİF\n")

# ULTRA MODERN TEMPLATE - ANASAYFA STİLİ, INTER FONT, 6 BLOG KARTI
template_start = '''<!DOCTYPE html>
<html lang="tr">
<head>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-315P2FGR91"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-315P2FGR91');</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{DISTRICT}} E-İmza | {{POPULAR_1}}, {{POPULAR_2}}, {{POPULAR_3}} | Tüm İstanbul'a Aynı Gün Teslimat</title>
<meta name="description" content="{{DISTRICT}} e-imza aynı gün ücretsiz kurye teslimatı. {{ALL_NEIGHBORHOODS}} ve tüm İstanbul'un 39 ilçesine hizmet. Online başvuru, 2-4 saat teslimat, Firebase'den güncel fiyatlar.">
<meta name="keywords" content="{{KEYWORDS}}">
<link rel="canonical" href="https://www.imzaistanbul.com/{{FILE}}">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"İmza İstanbul - {{DISTRICT}}","telephone":"+905453863407","address":{"@type":"PostalAddress","addressLocality":"{{DISTRICT}}","addressRegion":"İstanbul"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127"}}</script>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<link rel="stylesheet" href="assets/css/products-premium.css">
<style>
*{font-family:'Inter',sans-serif!important;margin:0;padding:0;box-sizing:border-box}
body{letter-spacing:-0.011em;line-height:1.6}
h1,h2,h3,h4{font-weight:800;letter-spacing:-0.03em;line-height:1.15}
.hero-lead{font-size:1.25rem;line-height:1.8;font-weight:500;letter-spacing:-0.01em}
.section{padding:120px 0}
.section-head{margin-bottom:80px;text-align:center}
.section-head h2{font-size:clamp(2rem,5vw,3.5rem);margin-bottom:20px;font-weight:900}
.section-head p{font-size:1.2rem;color:#94a3b8;font-weight:500;letter-spacing:-0.01em}
@keyframes spin{to{transform:rotate(360deg)}}
.neighborhood-tag{background:rgba(99,102,241,0.08);border:2px solid rgba(99,102,241,0.2);padding:18px 24px;border-radius:16px;text-align:center;font-weight:700;color:#f8fafc;font-size:15px;transition:all 0.4s cubic-bezier(0.4,0,0.2,1);letter-spacing:-0.01em}
.neighborhood-tag:hover{background:rgba(99,102,241,0.15);border-color:rgba(99,102,241,0.4);transform:translateY(-6px) scale(1.02);box-shadow:0 12px 40px rgba(99,102,241,0.25)}
.neighborhood-tag.popular{background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;border:none;box-shadow:0 8px 30px rgba(99,102,241,0.4);font-weight:800}
.neighborhood-tag.popular:hover{transform:translateY(-8px) scale(1.05);box-shadow:0 16px 50px rgba(99,102,241,0.5)}
.blog-card{transition:all 0.5s cubic-bezier(0.4,0,0.2,1);border-radius:20px;overflow:hidden}
.blog-card:hover{transform:translateY(-12px);box-shadow:0 20px 60px rgba(0,0,0,0.3)}
.blog-card h3{font-size:1.55rem;font-weight:800;margin:24px 0 16px;line-height:1.25;letter-spacing:-0.02em}
.blog-card p{font-size:1.05rem;line-height:1.75;color:#94a3b8;margin-bottom:24px;font-weight:400}
.blog-img{width:100%;height:280px;border-radius:16px;margin-bottom:24px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.blog-img::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.8) 100%);z-index:1}
.blog-img svg{position:relative;z-index:2;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.3))}
.istanbul-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(34,197,94,0.1);border:2px solid rgba(34,197,94,0.3);padding:12px 20px;border-radius:999px;font-weight:700;color:#22c55e;font-size:14px;margin-top:16px}
@media(max-width:768px){.section{padding:80px 0}.blog-card h3{font-size:1.35rem}.blog-img{height:220px}}
</style>
</head>
<body>
<div class="custom-cursor"></div>
<div class="custom-cursor-dot"></div>
<div class="mesh-bg"><div class="spotlight spotlight-1"></div><div class="spotlight spotlight-2"></div><div class="spotlight spotlight-3"></div></div>
<div class="grain-overlay"></div>
<header class="site-header"><div class="container"><a href="anasayfa" class="brand"><span class="brand-mark"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 11-14h-7l0-6Z"/></svg></span><span>İmza İstanbul<small>Tüm İstanbul'a Teslimat</small></span></a><nav class="main-nav"><a href="anasayfa">Ana Sayfa</a><a href="hizmetlerimiz">Hizmetler</a><a href="fiyatlandirma">Fiyatlar</a><a href="bolgeler">39 İlçe</a><a href="iletisim">İletişim</a></nav></div></header>
'''

template_hero = '''<section class="hero"><div class="container"><span class="eyebrow"><span class="dot"></span> {{DISTRICT}} / İSTANBUL - TÜM İSTANBUL'A TESLİMAT</span><h1>{{DISTRICT}} E-İmza<br><span class="grad-text">Tüm İstanbul'a Aynı Gün</span></h1><p class="hero-lead">{{POPULAR_1}}, {{POPULAR_2}}, {{POPULAR_3}} ve İstanbul'un tüm 39 ilçesine ücretsiz kurye teslimatı. Firebase'den güncel fiyatlar, 2-4 saat teslim garantisi.</p><div class="hero-cta-row"><a href="#fiyatlar" class="btn btn-primary btn-lg">Firebase Fiyatları Gör</a><a href="https://wa.me/905453863407?text={{DISTRICT}}%20e-imza" class="btn btn-whatsapp btn-lg">WhatsApp Destek</a></div><div class="trust-row"><span class="trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.7 7.7a9 9 0 1 1-12.7 0M12 1v9"/></svg>İstanbul'un 39 İlçesine</span><span class="trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>2-4 Saat Teslimat</span><span class="trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>Firebase Güncel Fiyat</span></div></div></section>
'''

template_stats = '''<section class="section-tight"><div class="container"><div class="glass reveal" style="padding:48px 50px"><div class="stat-row"><div class="stat"><div class="stat-num">39</div><div class="stat-label">İstanbul İlçesi</div></div><div class="stat"><div class="stat-num">2-4h</div><div class="stat-label">Teslimat</div></div><div class="stat"><div class="stat-num">₺0</div><div class="stat-label">Kurye Ücreti</div></div><div class="stat"><div class="stat-num">4.9★</div><div class="stat-label">Müşteri Puanı</div></div></div><div class="istanbul-badge"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>Tüm İstanbul'a Ücretsiz Teslimat</div></div></div></section>
'''

template_neighborhoods = '''<section class="section"><div class="container"><div class="section-head reveal"><span class="badge-soft badge-indigo">Teslimat Bölgeleri</span><h2>{{DISTRICT}} ve Tüm İstanbul</h2><p>{{DISTRICT}} başta olmak üzere İstanbul'un 39 ilçesine ücretsiz aynı gün kurye teslimatı</p></div><div class="glass reveal" style="padding:60px 50px"><h3 style="text-align:center;font-size:1.8rem;margin-bottom:40px;font-weight:800;letter-spacing:-0.02em">{{DISTRICT}} Mahalleleri</h3><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">{{NEIGHBORHOOD_HTML}}</div></div></div></section>
'''

template_products = '''<section class="products-premium-section" id="fiyatlar"><canvas id="bgCanvas" class="products-bg-canvas"></canvas><div class="products-container"><div class="products-hero"><h1>{{DISTRICT}} <span class="accent">Firebase Güncel Fiyatlar</span></h1><p>Dinamik fiyatlandırma sistemi ile her zaman güncel fiyatlar. Tüm İstanbul'a ücretsiz teslimat.</p></div><div id="productsLoading" style="text-align:center;padding:80px 20px"><div style="display:inline-block;width:56px;height:56px;border:5px solid rgba(79,70,229,0.2);border-radius:50%;border-top-color:#4f46e5;animation:spin 0.8s linear infinite"></div><p style="margin-top:24px;font-size:1.1rem;font-weight:600;color:#94a3b8">Firebase'den fiyatlar yükleniyor...</p></div><div id="productsContainer" style="display:none"><div class="products-grid"></div></div></div></section>
'''

template_blog = '''<section class="section" style="background:rgba(15,23,42,0.4)"><div class="container"><div class="section-head reveal"><span class="badge-soft badge-indigo">E-İmza Rehberi</span><h2>{{DISTRICT}} E-İmza <span class="grad-text">Kapsamlı Rehber</span></h2><p>E-imza hakkında bilmeniz gereken her şey - fiyatlar, kullanım, başvuru, SGK, noter, e-fatura</p></div><div class="grid grid-3 reveal-stagger">

<div class="card glass blog-card reveal" style="--i:0">
<div class="blog-img" style="background:linear-gradient(135deg,#667eea,#764ba2)">
<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
</div>
<h3>{{DISTRICT}} E-İmza Nereden Alınır?</h3>
<p>{{DISTRICT}} {{POPULAR_1}}, {{POPULAR_2}}, {{POPULAR_3}} mahallelerine ve tüm İstanbul'un 39 ilçesine aynı gün kurye teslimatı. Online başvuru yapın, 2-4 saat içinde elinizde olsun. Ofisten çıkmadan e-imza alın.</p>
<a href="blog-e-imza-nedir" class="btn btn-ghost">Detaylı Bilgi →</a>
</div>

<div class="card glass blog-card reveal" style="--i:1">
<div class="blog-img" style="background:linear-gradient(135deg,#f093fb,#f5576c)">
<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
</div>
<h3>E-İmza Fiyatları 2026 - Firebase Güncel</h3>
<p>Firebase Realtime Database'den anlık güncel fiyatlar. 1 yıllık, 2 yıllık, 3 yıllık paketler. Kurye ücretsiz, akıllı kart ve okuyucu dahil, kurulum desteği veriliyor. Toplu başvurularda %15'e varan indirimler.</p>
<a href="fiyatlandirma" class="btn btn-ghost">Fiyatları Gör →</a>
</div>

<div class="card glass blog-card reveal" style="--i:2">
<div class="blog-img" style="background:linear-gradient(135deg,#4facfe,#00f2fe)">
<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
</div>
<h3>SGK E-İmza Başvurusu Nasıl Yapılır?</h3>
<p>SGK işlemleri için nitelikli elektronik imza zorunludur. Muhasebeciler, işverenler ve çalışanlar için SGK e-imza başvuru süreci, gerekli belgeler, kurulum adımları ve kullanım rehberi.</p>
<a href="blog-sgk-e-imza" class="btn btn-ghost">SGK Rehberi →</a>
</div>

<div class="card glass blog-card reveal" style="--i:3">
<div class="blog-img" style="background:linear-gradient(135deg,#43e97b,#38f9d7)">
<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
</div>
<h3>E-Fatura ve E-Arşiv İçin E-İmza</h3>
<p>E-fatura, e-arşiv fatura ve e-defter için nitelikli elektronik imza zorunluluğu. Hangi firmalar kullanmalı? Vergi dairesi işlemleri nasıl yapılır? Muhasebe yazılımlarına entegrasyon süreci.</p>
<a href="blog-e-fatura" class="btn btn-ghost">E-Fatura Rehberi →</a>
</div>

<div class="card glass blog-card reveal" style="--i:4">
<div class="blog-img" style="background:linear-gradient(135deg,#fa709a,#fee140)">
<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
</div>
<h3>İstanbul Aynı Gün Teslimat Nasıl Olur?</h3>
<p>Sabah saat 13:00'e kadar başvurun, akşam e-imzanız elinizde olsun. İstanbul'un 39 ilçesine 2-4 saat kurye garantisi. Teslimat süreci, kurulum desteği, kullanıma hazır teslim edilir.</p>
<a href="blog-ayni-gun-teslimat" class="btn btn-ghost">Teslimat Detayları →</a>
</div>

<div class="card glass blog-card reveal" style="--i:5">
<div class="blog-img" style="background:linear-gradient(135deg,#a8edea,#fed6e3)">
<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:100px;height:100px"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
</div>
<h3>E-İmza Kullanım Alanları ve Faydaları</h3>
<p>Noter işlemleri, SGK başvuruları, vergi dairesi, bankacılık, sözleşme imzalama, e-ihale, e-defter, mobil imza. Nitelikli elektronik imza nerede kullanılır? 5070 Sayılı Kanun kapsamında yasal geçerlilik.</p>
<a href="blog-kullanim-alanlari" class="btn btn-ghost">Kullanım Alanları →</a>
</div>

</div></div></section>
'''

template_footer = '''<footer class="footer"><div class="container"><div class="footer-brand">İmza İstanbul</div><p class="footer-tagline">İstanbul'un 39 İlçesine Aynı Gün E-İmza Teslimatı</p><div class="footer-phone"><a href="tel:+905453863407">0 545 386 34 07</a></div><div class="footer-links"><a href="anasayfa">Ana Sayfa</a><a href="hizmetlerimiz">Hizmetler</a><a href="fiyatlandirma">Firebase Fiyatlar</a><a href="bolgeler">39 İlçe</a><a href="hakkimizda">Hakkımızda</a><a href="iletisim">İletişim</a></div></div></footer>
<div class="float-stack"><a href="https://wa.me/905453863407?text={{DISTRICT}}%20e-imza" class="fab-whatsapp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z"/></svg></a></div>
<script src="assets/js/main.js"></script>
<script src="assets/js/products-premium.js"></script>
<script type="module">import{initializeApp}from'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';import{getDatabase,ref,onValue}from'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';const app=initializeApp({apiKey:"AIzaSyADykV8-GjNNoK30CUkPlqCNMjR7Ggc1M8",databaseURL:"https://e-imza-4c867-default-rtdb.firebaseio.com",projectId:"e-imza-4c867"});const db=getDatabase(app);if(window.initProductsBackground)window.initProductsBackground('bgCanvas');onValue(ref(db,'products'),(s)=>{const d=s.val()||{};const p=Object.entries(d).map(([id,data])=>({id,...data})).filter(x=>x.status==='active').sort((a,b)=>(a.price||0)-(b.price||0));document.getElementById('productsLoading').style.display='none';document.getElementById('productsContainer').style.display='block';if(window.renderPremiumProducts)window.renderPremiumProducts(p,'productsContainer');});</script>
</body>
</html>'''

# CREATE ALL DISTRICT PAGES
for file, data in districts.items():
    name = data["name"]
    neighborhoods = data["neighborhoods"]
    popular = data["popular"]
    keywords = data["keywords"]
    
    # Neighborhood HTML
    n_html = ""
    for n in neighborhoods:
        if n in popular:
            n_html += f'<div class="neighborhood-tag popular">{n} ⭐</div>'
        else:
            n_html += f'<div class="neighborhood-tag">{n}</div>'
    
    all_neighborhoods = ", ".join(neighborhoods[:12])
    
    # Build complete HTML
    content = template_start + template_hero + template_stats + template_neighborhoods + template_products + template_blog + template_footer
    
    # Replace placeholders
    content = content.replace('{{DISTRICT}}', name)
    content = content.replace('{{FILE}}', file)
    content = content.replace('{{KEYWORDS}}', keywords)
    content = content.replace('{{ALL_NEIGHBORHOODS}}', all_neighborhoods)
    content = content.replace('{{POPULAR_1}}', popular[0])
    content = content.replace('{{POPULAR_2}}', popular[1] if len(popular) > 1 else popular[0])
    content = content.replace('{{POPULAR_3}}', popular[2] if len(popular) > 2 else popular[0])
    content = content.replace('{{NEIGHBORHOOD_HTML}}', n_html)
    
    # Save
    filepath = f"site/{file}.html"
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {name:20s} | {len(neighborhoods):2d} mahalle | SEO BOMBA + 6 Blog + Inter Font + Firebase")

print(f"\n🎉🎉🎉 TAMAMLANDI! 37 İLÇE OLUŞTURULDU!")
print("\n📊 ÖZELLİKLER:")
print("  ✓ Her ilçe için özel SEO arama kelimeleri")
print("  ✓ 6 büyük blog kartı - kapsamlı içerik")
print("  ✓ Inter font ailesi - mükemmel spacing")
print("  ✓ Firebase dinamik fiyatlandırma")
print("  ✓ Mesh-bg + grain-overlay + custom cursor")
print("  ✓ '39 İlçe' teslimat vurgusu her yerde")
print("  ✓ Modern gradient blog kartları")
print("\n🚀 RAKİPLERİN ÖNÜNE GEÇMEYİ BAŞARDINIZ!")
