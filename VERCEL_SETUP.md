# Vercel Environment Variables Setup

Push notification çalışması için Vercel'de environment variables eklemeniz gerekiyor.

## 1. Firebase Service Account Key Al

### Adım 1: Firebase Console'a Git
https://console.firebase.google.com/project/e-imza-4c867/settings/serviceaccounts/adminsdk

### Adım 2: Service Account Key Oluştur
1. **"Generate new private key"** butonuna tıkla
2. JSON dosyası indirilecek (örn: `e-imza-4c867-firebase-adminsdk-xxxxx.json`)
3. Bu dosyayı aç, içinde şunlar olacak:
   - `project_id`
   - `client_email`
   - `private_key`

## 2. Vercel'e Environment Variables Ekle

### Vercel Dashboard:
https://vercel.com/your-username/e-imza/settings/environment-variables

### Eklenecek Değişkenler:

**FIREBASE_PROJECT_ID**
```
e-imza-4c867
```

**FIREBASE_CLIENT_EMAIL**
```
firebase-adminsdk-xxxxx@e-imza-4c867.iam.gserviceaccount.com
```
(JSON dosyasından `client_email` değerini kopyala)

**FIREBASE_PRIVATE_KEY**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...
...
-----END PRIVATE KEY-----
```
(JSON dosyasından `private_key` değerini kopyala - TÜM satırları)

**FIREBASE_DATABASE_URL**
```
https://e-imza-4c867-default-rtdb.firebaseio.com
```

---

## 3. Vercel'de Redeploy

Environment variables ekledikten sonra:
1. Vercel Dashboard → **Deployments**
2. Son deployment'ın sağındaki **"..."** menü
3. **Redeploy** tıkla

---

## 4. Test Et

### Manuel Test:
```bash
curl -X POST https://your-site.vercel.app/api/send-notification \
  -H "Content-Type: application/json" \
  -d '{
    "fcmToken": "customer_fcm_token_here",
    "title": "Test Bildirimi",
    "body": "Bu bir test bildirimidir",
    "orderId": "TEST-001",
    "trackingCode": "ZE-2026-TEST"
  }'
```

### Beklenen Yanıt:
```json
{
  "success": true,
  "messageId": "projects/e-imza-4c867/messages/0:1234567890",
  "message": "Notification sent successfully"
}
```

---

## 5. Admin Panel'den Test

1. Admin panel'e gir
2. Bir siparişin durumunu değiştir (örn: "Hazırlanıyor")
3. Console'da şunu göreceksin:
   - ✅ FCM Token bulundu
   - ✅ Bildirim başarıyla gönderildi
4. Müşteri **site kapalı olsa bile** bildirim alacak! 🎉

---

## Sorun Giderme

### "Missing required fields" hatası
- Environment variables doğru eklendi mi kontrol et
- Vercel redeploy yaptın mı?

### "Invalid token" hatası
- Müşteri bildirim izni vermiş mi?
- FCM token Firebase'de kayıtlı mı? (`fcmTokens` collection)

### "403 Forbidden" hatası
- Service Account key doğru mu?
- Firebase Admin SDK aktif mi?

---

## Güvenlik Notu

⚠️ **PRIVATE_KEY'i asla Git'e commit etme!**
- Sadece Vercel environment variables'da olmalı
- `.env` dosyası `.gitignore`'da olmalı

---

## Özet Checklist

- [ ] Firebase Console'dan Service Account JSON indir
- [ ] Vercel'e 4 environment variable ekle
- [ ] Vercel'de redeploy yap
- [ ] Admin panel'den durum değiştir ve test et
- [ ] Tarayıcıyı kapat ve bildirimin geldiğini gör! 🎊
