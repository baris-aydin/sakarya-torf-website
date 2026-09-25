"use client";

import { Lock } from "lucide-react";
import Link from "next/link";
import { TextAreaField, TextField } from "@/components/FormField";

type CheckoutFormProps = {
  productId: string;
  quantity: number;
  onSubmit: () => void;
};

export default function CheckoutForm({
  productId,
  quantity,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <section className="rounded-lg border border-line bg-white p-6 shadow-[0_1px_3px_rgba(18,61,42,0.05)] sm:p-8">
      <h2 className="text-[1.4rem] font-bold text-ink">
        Müşteri ve Teslimat Bilgileri
      </h2>

      <form
        className="mt-7"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {/* Carries the selected SKU and quantity for when a backend is added. */}
        <input type="hidden" name="urun" value={productId} readOnly />
        <input type="hidden" name="adet" value={quantity} readOnly />

        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <TextField id="ad" label="Ad" autoComplete="given-name" required />
          <TextField
            id="soyad"
            label="Soyad"
            autoComplete="family-name"
            required
          />

          <TextField
            id="eposta"
            label="E-posta"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            id="telefon"
            label="Telefon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
          />

          <TextField
            id="il"
            label="İl"
            autoComplete="address-level1"
            required
          />
          <TextField
            id="ilce"
            label="İlçe"
            autoComplete="address-level2"
            required
          />

          <TextField
            id="mahalle"
            label="Mahalle"
            autoComplete="address-level3"
            required
          />

          <TextAreaField
            id="acik-adres"
            label="Açık Adres"
            rows={3}
            autoComplete="street-address"
            required
            wrapperClassName="sm:col-span-2"
          />

          <TextField
            id="posta-kodu"
            label="Posta Kodu (isteğe bağlı)"
            inputMode="numeric"
            autoComplete="postal-code"
          />
        </div>

        <div className="mt-7 flex items-start gap-3 rounded-md border border-line bg-cream p-4">
          <input
            id="sozlesme"
            name="sozlesme"
            type="checkbox"
            required
            className="mt-0.5 size-[1.125rem] shrink-0 accent-moss"
          />
          <label
            htmlFor="sozlesme"
            className="text-[0.85rem] leading-relaxed text-ink/80"
          >
            <Link
              href="/mesafeli-satis-sozlesmesi"
              className="font-medium text-moss underline underline-offset-2"
            >
              Mesafeli Satış Sözleşmesi
            </Link>{" "}
            ve{" "}
            <Link
              href="/on-bilgilendirme-formu"
              className="font-medium text-moss underline underline-offset-2"
            >
              Ön Bilgilendirme Formu
            </Link>
            &apos;nu kabul ediyorum.
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 flex h-13 w-full items-center justify-center gap-2.5 rounded-md bg-moss text-base font-medium text-white transition-colors hover:bg-moss-dark"
        >
          Güvenli Ödemeye Devam Et
          <Lock className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}
