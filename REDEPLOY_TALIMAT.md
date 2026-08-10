# Vercel Redeploy Talimatı

## Adımlar:

1. **Sol menüden "Deployments"** tıkla (Overview'ın altında)

2. En üstteki deployment'ın **sağında 3 nokta (...)** menüsü var

3. **"Redeploy"** seçeneğine tıkla

4. **"Use existing Build Cache"** KAPALI olsun (unchecked)

5. **"Redeploy"** butonuna bas

---

## Alternatif: Boş commit ile deploy tetikleme

Eğer Vercel'de bulamıyorsan, komut satırından:

```bash
git commit --allow-empty -m "Trigger Vercel redeploy with env vars"
git push
```

Bu boş bir commit atar ve Vercel otomatik deploy eder.
