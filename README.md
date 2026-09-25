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
| `/` | Hero, Ürünlerimiz önizleme kartları, Neden Sakarya Torf?, Doğadan Gelen Verim, iletişim CTA |
| `/urunler` | Her ürün için tam detay bölümü ve satın alma kontrolleri, ardından Galeri |
| `/neden-sakarya-torf` | Yaklaşım, ürün özellikleri, özel karışım ve ürünlere CTA |
| `/satin-al` | Sipariş formu ve sipariş özeti |
| `/iletisim` | İletişim bilgileri ve mesaj formu |

Bilgi mimarisi şöyle ayrılır: **ana sayfa ürün keşfi**, **`/urunler` ise detay ve satın alma**. Önizleme kartları `/urunler#40-litre` ve `/urunler#20-litre` bağlantılarıyla ilgili bölüme kaydırır.

`/satin-al` sayfası `?product=` ve `?quantity=` parametrelerini okur — örneğin `/satin-al?product=40-litre&quantity=3`. İstenen ürün bulunamazsa veya fiyatı henüz yoksa, fiyatı tanımlı ilk ürüne düşer.

## Dizin yapısı

```
src/
  app/
    layout.tsx          Kök layout: fontlar, metadata, Header + Footer
    globals.css         Tailwind v4 @theme tokenleri ve temel stiller
    icon.png            Tarayıcı sekmesi ikonu (Next.js icon dosya kuralı)
    page.tsx            Ana sayfa
    urunler/page.tsx    Ürünler sayfası (ürün detayları + galeri)
    neden-sakarya-torf/page.tsx  Neden Sakarya Torf? sayfası
    satin-al/page.tsx   Ödeme sayfası (searchParams okur)
    iletisim/page.tsx   İletişim sayfası
  components/           Paylaşılan arayüz bileşenleri
  lib/
    products.ts         Ürün verisi ve tipleri — tek kaynak
    gallery.ts          Galeri verisi (ÜRETİLEN — betikle yenilenir)
    site.ts             Site geneli ayarlar, kargo, fiyat biçimlendirme
    cx.ts               className birleştirme yardımcısı
public/
  images/
    brand/              Logo, amblem, kırsal görsel
    hero/               Hero arka planı
    products/           TORFADA ambalaj görselleri (ürün başına klasör)
  media/
    gallery/            Instagram'dan indirilen galeri medyası (yerel)
scripts/
  import-instagram-gallery.mjs   Galeri medyasını indirir, gallery.ts üretir
```

### Ürün bileşenleri

Her iki ürün de aynı bileşenlerden render edilir; JSX kopyalanmaz.

| Bileşen | Görev |
| --- | --- |
| `ProductDetailSection` | `/urunler` üzerindeki tam ürün bölümü |
| `ProductPreviewCard` | Ana sayfadaki önizleme kartı |
| `ProductImage` | Görsel yuvası; görsel yoksa yer tutucu gösterir |
| `ProductFeatures` | Özellik ızgarası |
| `ProductPurchase` | Fiyat, adet seçici ve Satın Al düğmesi |
| `Gallery` / `GalleryCard` | `galleryItems` dizisinden beslenen galeri |

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

## Ürün verisi ve fiyatlandırma

Ürünler `src/lib/products.ts` içindeki tek dizide tanımlıdır. `id` alanı hem `/urunler` üzerindeki çapa hem de ödeme sayfasındaki `?product=` parametresidir — 40 L ve 20 L ayrı SKU olarak işlenir.

```ts
{ id: "40-litre", size: "40 Litre", price: 250,  image: ".../torfada-super-mix-40l.jpg", … }
{ id: "20-litre", size: "20 Litre", price: null, image: ".../torfada-super-mix-20l.png", … }
```

Ürün görselleri `public/images/products/torfada-super-mix/` altındadır ve yalnızca bu dosyadan referans verilir; hiçbir bileşen görsel yolunu kendi içinde tutmaz.

`price: null` "henüz verilmedi" anlamına gelir; uydurma fiyat eklenmez. Bu durumda:

- fiyat alanında **Fiyat yakında** yazar,
- adet seçici ve Satın Al düğmesi devre dışı kalır, iletişim bağlantısı gösterilir,
- `/satin-al?product=20-litre` isteği fiyatı tanımlı ilk ürüne düşer.

**20 L fiyatı geldiğinde tek yapılacak `price: null` yerine sayıyı yazmaktır**; düzen değişmeden tüm kontroller açılır.

`image: null` da desteklenir; görseli olmayan bir ürün için yuva yer tutucu gösterir.

Ambalaj fotoğrafları `object-contain` ile gösterilir — paketin hiçbir kısmı kırpılmaz. Ürün görsel çerçeveleri **beyazdır** (`bg-white`); krem sayfadan ayrışma ince kenarlık/`ring` ve hafif gölge ile sağlanır, yeşil tint kullanılmaz. Galeri kartları ve ödeme sayfasındaki küçük ürün görseli bu değişikliğin dışındadır, soluk yeşil (`bg-mist`) zeminlerini korur.

Kargo `src/lib/site.ts` içinde: `SHIPPING_COST = 0` ve `SHIPPING_LABEL = "Ücretsiz"`. `OrderSummary` ara toplamı `ürün fiyatı × adet` olarak hesaplar; toplam ara toplama eşittir.

`formatPrice()` binlik ayracını elle ekler (`₺1.750`). `Intl.NumberFormat` bilinçli olarak kullanılmadı: çıktısı ICU sürümüne göre değişebildiği için sunucu ve istemci arasında hydration uyuşmazlığı riski taşır.

Ürün bileşenlerindeki `features` alanı React bileşenleri (ikonlar) içerdiğinden serialize edilemez. Bu yüzden istemci bileşenlerine tüm ürün değil, `toOrderItem()` ile üretilen serialize edilebilir alt küme geçirilir.

## Galeri

`/urunler` sayfasının altındaki galeri, Sakarya Torf Instagram hesabından seçilmiş **8 gönderiden** oluşur (5 görsel, 3 video). Gönderiler elle seçilmiştir; otomatik senkronizasyon yoktur.

**Instagram gömme kullanılmaz ve çalışma anında Instagram CDN'ine istek atılmaz.** Tüm medya `public/media/gallery/` altından, kendi sunucumuzdan servis edilir — Instagram CDN adresleri imzalıdır ve süresi dolar.

### İçeriği yenilemek

Kaynak veri, proje kökündeki `sakarya-torf-instagram-gallery.json` dosyasıdır (Apify dışa aktarımı). `public/` altında olmadığı için tarayıcıya servis edilmez.

```bash
node scripts/import-instagram-gallery.mjs          # eksik dosyaları indirir
node scripts/import-instagram-gallery.mjs --force  # hepsini yeniden indirir
```

Betik her varlığı indirir, sihirli baytlarından doğrular (HTML hata sayfası veya bozuk dosya diske yazılmaz) ve `src/lib/gallery.ts` dosyasını **yeniden üretir**. Tekrar çalıştırmak güvenlidir: geçerli dosyalar atlanır. Herhangi bir indirme başarısız olursa veri dosyası yazılmaz ve hangi shortcode'un başarısız olduğu bildirilir.

`src/lib/gallery.ts` üretilen bir dosyadır — elle düzenlemeyin.

Dosya adları Instagram shortcode'udur: `<shortCode>.jpg`, video için `<shortCode>.mp4` + `<shortCode>-cover.jpg`.

### Veri ve davranış

Alt yazılar JSON'dan **birebir** aktarılır; emoji, hashtag, telefon numarası, satır sonları ve Türkçe karakterler korunur. `likesCount`, `commentsCount`, `ownerId` gibi alanlar frontend verisine taşınmaz.

- Medya alanı her kartta `aspect-[4/5]` ve `object-contain` — gönderilerin en boy oranları 0,56 ile 1,88 arasında değişiyor, hiçbiri kırpılmıyor.
- Alt yazılar 4 satırda `line-clamp` ile kesilir; taşma varsa **Devamını Oku** / **Daha Az Göster** düğmesi çıkar (taşma istemcide ölçülür, kısa alt yazılarda düğme görünmez).
- Videolar `controls` + `playsInline` + `preload="metadata"` ile gelir; otomatik oynatma yoktur. MP4'lerde `moov` atomu `mdat`'tan önce (faststart), yani baştan indirilmeden oynamaya başlar.
- Galeri sayfanın altında olduğu için görseller `priority` almaz, tembel yüklenir.

## Marka görselleri

- `public/images/brand/sakarya-torf-logo.jpeg` — tam logo (amblem + kelime markası + slogan), beyaz zeminli JPEG.
- `public/images/brand/sakarya-torf-emblem.png` — dairesel amblem, 512×512, köşeleri saydam. Tam logodan kırpılarak üretildi (daire sınırları: sol 265, üst 81, çap 715) ve daire maskesi uygulandı.
- `src/app/icon.png` — aynı amblemin 256×256 sürümü; Next.js `icon` dosya kuralı sayesinde `<link rel="icon">` otomatik eklenir.

Header ve footer'da **amblem** kullanılır, tam logo değil: tam logodaki "DOĞADAN GELEN VERİM / AKYAZI / SAKARYA" satırları header yüksekliğinde okunmaz hale gelir. Tam logonun beyaz JPEG zemini koyu yeşil footer ile de uyuşmaz — oraya koymak için saydam zeminli bir PNG gerekir.

`sakarya-torf-emblem.jpeg` dosyası tam logonun birebir kopyasıdır ve kod tarafından kullanılmaz.

## Henüz yapılmayanlar

Bunlar bilinçli olarak sonraki aşamalara bırakıldı:

- **20 Litre ürünün fiyatı ve ambalaj görseli** — veri modelinde `null`, eklendiğinde kendiliğinden devreye girer
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
