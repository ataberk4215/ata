# Ata Berk · Kişisel Portfolyo

Saf **HTML, CSS ve JavaScript** ile yazılmış, framework gerektirmeyen kişisel portfolyo / CV sitesi.

## Özellikler

- 🌗 Karanlık / aydınlık tema (tercih tarayıcıda hatırlanır)
- ⌨️ Daktilo efektli giriş bölümü
- 📱 Mobil uyumlu tasarım ve hamburger menü
- ✨ Kaydırınca beliren animasyonlar, sayaçlar ve yetenek çubukları
- 🗂️ Kategoriye göre filtrelenebilen proje kartları
- 🕒 Deneyim ve eğitim zaman çizelgesi
- ✉️ Doğrulamalı iletişim formu

## Çalıştırma

Kurulum gerekmez. `index.html` dosyasını tarayıcıda açman yeterli.

İstersen yerel bir sunucuyla da açabilirsin:

```bash
python3 -m http.server 8000
# http://localhost:8000 adresine git
```

## Kendine göre düzenleme

| Ne değişecek | Nerede |
| --- | --- |
| İsim, açıklama, sosyal medya linkleri | `index.html` → `#hero` bölümü |
| Hakkımda yazısı ve sayılar | `index.html` → `#hakkimda` (`data-count`) |
| Yetenekler ve yüzdeleri | `index.html` → `#yetenekler` (`data-width`) |
| Projeler | `index.html` → `#projeler` içindeki `<article>` kartları (`data-cat`: `web`, `bot`, `oyun`) |
| Deneyim / eğitim | `index.html` → `#deneyim` |
| Daktilo efektindeki unvanlar | `script.js` → `roles` dizisi |
| Renkler | `style.css` → `:root` ve `[data-theme="light"]` değişkenleri |

## Yayınlama (GitHub Pages)

1. GitHub'da depo → **Settings → Pages**
2. **Source**: `Deploy from a branch`, dal olarak siteyi içeren dalı ve `/ (root)` klasörünü seç
3. Birkaç dakika sonra site `https://ataberk4215.github.io/ata/` adresinde yayında olur
