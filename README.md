# Sakarya Torf

Ürün tanıtım ve sipariş sitesi — **TORFADA Super Mix**, 40 litre genel kullanım bitki toprağı.
Site tamamen Türkçedir.

Next.js 16 (App Router), React 19, TypeScript ve Tailwind CSS v4 ile geliştirilmiştir.

## Başlangıç

Gereksinimler: **Node.js 20.9+** (Next.js 16 minimumu; geliştirme Node 22 ile yapıldı).

```bash
npm install
npm run dev
```

http://localhost:3000 adresini açın.

### Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusu (Turbopack) |
| `npm run build` | Üretim derlemesi |
| `npm start` | Derlenmiş sürümü çalıştırır |
| `npm run lint` | ESLint (`next lint` Next.js 16'da kaldırıldı, doğrudan `eslint` çalışır) |

`npx tsc --noEmit` ile tip kontrolü yapılabilir. `next build` zaten TypeScript kontrolünü çalıştırır.

## Sayfalar

| Rota | İçerik |
| --- | --- |
| `/` | Hero, ürün bölümü, Neden Sakarya Torf?, Doğadan Gelen Verim, iletişim CTA |
| `/satin-al` | Sipariş formu ve sipariş özeti |
| `/iletisim` | İletişim bilgileri ve mesaj formu |

`/satin-al` sayfası `?quantity=` parametresini okur — örneğin `/satin-al?quantity=3` adet alanını 3 ile başlatır. Ana sayfadaki "Satın Al" düğmesi bu bağlantıyı üretir.

## Dizin yapısı

```
src/
  app/
    layout.tsx          Kök layout: fontlar, metadata, Header + Footer
    globals.css         Tailwind v4 @theme tokenleri ve temel stiller
    icon.png            Tarayıcı sekmesi ikonu (Next.js icon dosya kuralı)
    page.tsx            Ana sayfa
    satin-al/page.tsx   Ödeme sayfası (searchParams okur)
    iletisim/page.tsx   İletişim sayfası
  components/           Paylaşılan arayüz bileşenleri
  lib/
    site.ts             İçerik ve fiyat ayarları — tek kaynak
    cx.ts               className birleştirme yardımcısı
public/images/
  brand/                Logo, amblem, kırsal görsel
  hero/                 Hero arka planı
  product/              Gerçek TORFADA ambalaj görseli
```

## Tasarım sistemi

Renkler ve fontlar `src/app/globals.css` içinde Tailwind v4 `@theme` tokenleri olarak tanımlıdır; Tailwind bunlardan `bg-moss`, `text-forest` gibi sınıfları üretir.

| Token | Değer | Kullanım |
| --- | --- | --- |
| `cream` | `#f7f5ed` | Sayfa zemini |
| `ivory` | `#fbfaf5` | Form kartı zemini |
| `sage` | `#dfebdd` | Neden Sakarya Torf? bölümü |
| `mist` | `#eaf2e7` | Soluk yeşil ikon zeminleri |
| `moss` | `#21652d` | Düğmeler, CTA bölümleri, vurgular |
| `moss-dark` | `#1a5325` | Düğme hover durumu |
| `forest` | `#123d2a` | Koyu yeşil ikon kutuları |
| `night` | `#0c2e1b` | Footer zemini |
| `bark` | `#76543a` | Toprak tonu vurgular |
| `ink` / `muted` / `line` | | Metin, ikincil metin, kenarlıklar |

Tipografi: başlıklar **Playfair Display**, arayüz ve gövde metni **DM Sans** — ikisi de `next/font/google` ile self-host edilir. `h1`–`h3` varsayılan olarak serif alır; bir başlığın sans olması gerekiyorsa `font-sans` sınıfı eklenir.

Bölüm üstü küçük etiketler için `.eyebrow` sınıfı kullanılır. Bu metinler şablonda **doğrudan büyük harfle** yazılır; CSS `text-transform` Türkçe noktalı İ için dil ayarına bağımlı olduğundan buna güvenilmez.

## Fiyatlandırma

Tüm fiyat mantığı `src/lib/site.ts` içinde tek yerdedir:

```ts
export const PRICE_PER_UNIT = 250;  // TL, bir adet 40 L torba
export const SHIPPING_COST = 0;     // kargo ücretsiz
```

`OrderSummary` ara toplamı `PRICE_PER_UNIT × adet` olarak hesaplar; kargo satırı **Ücretsiz** yazar ve toplam ara toplama eşittir. Fiyat değişirse yalnızca bu iki sabit güncellenir.

`formatPrice()` binlik ayracını elle ekler (`₺1.750`). `Intl.NumberFormat` bilinçli olarak kullanılmadı: çıktısı ICU sürümüne göre değişebildiği için sunucu ve istemci arasında hydration uyuşmazlığı riski taşır.

## Marka görselleri

- `public/images/brand/sakarya-torf-logo.jpeg` — tam logo (amblem + kelime markası + slogan), beyaz zeminli JPEG.
- `public/images/brand/sakarya-torf-emblem.png` — dairesel amblem, 512×512, köşeleri saydam. Tam logodan kırpılarak üretildi (daire sınırları: sol 265, üst 81, çap 715) ve daire maskesi uygulandı.
- `src/app/icon.png` — aynı amblemin 256×256 sürümü; Next.js `icon` dosya kuralı sayesinde `<link rel="icon">` otomatik eklenir.

Header ve footer'da **amblem** kullanılır, tam logo değil: tam logodaki "DOĞADAN GELEN VERİM / AKYAZI / SAKARYA" satırları header yüksekliğinde okunmaz hale gelir. Tam logonun beyaz JPEG zemini koyu yeşil footer ile de uyuşmaz — oraya koymak için saydam zeminli bir PNG gerekir.

`sakarya-torf-emblem.jpeg` dosyası tam logonun birebir kopyasıdır ve kod tarafından kullanılmaz.

## Henüz yapılmayanlar

Bunlar bilinçli olarak sonraki aşamalara bırakıldı:

- Ziraat Bankası Sanal POS ve kredi kartı alanları — "Güvenli Ödemeye Devam Et" şu an sayfa içi bir yer tutucu adıma geçer
- Veritabanı ve sipariş kayıtları
- E-posta gönderimi (sipariş onayı, firma bildirimi, iletişim formu) — formlar yalnızca istemci tarafında çalışır
- Kimlik doğrulama ve yönetim paneli
- `/siparis-onay` rotası
- Footer'daki yasal sayfalar (`/mesafeli-satis-sozlesmesi`, `/on-bilgilendirme-formu`, `/kvkk-aydinlatma-metni`, `/gizlilik-politikasi`, `/teslimat-ve-iade-kosullari`) — bağlantılar mevcut, sayfalar **henüz yok ve 404 döner**. Ödeme sayfasındaki sözleşme onayı da ilk ikisine bağlanır.

## Notlar

- `AGENTS.md` dosyasındaki uyarı bloğu `next dev` tarafından otomatik yazılır. Next.js 16 eğitim verisindeki sürümlerden farklıdır; kod yazmadan önce `node_modules/next/dist/docs/` altındaki ilgili rehberi okuyun.
- `lucide-react` v1 marka ikonlarını (Instagram, Facebook) kaldırdı. Bu iki simge `src/components/SocialIcons.tsx` içinde aynı 24×24 outline stilinde elle çizildi.
- Kök `<html>` etiketinde `data-scroll-behavior="smooth"` bulunur. Next.js 16 rota geçişlerinde global `scroll-behavior` ayarını artık otomatik geçersiz kılmıyor; bu öznitelik sayesinde bağlantı kaydırmaları yumuşak kalırken sayfa geçişleri anında olur.
