"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/FormField";

const subjects = [
  "Genel Bilgi",
  "Ürün Hakkında",
  "Sipariş Hakkında",
  "Teslimat",
  "Diğer",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section className="rounded-lg border border-line bg-ivory p-6 shadow-[0_1px_3px_rgba(18,61,42,0.05)] sm:p-8">
      <h2 className="sr-only">İletişim formu</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
        }}
      >
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <TextField
            id="ad-soyad"
            label="Ad Soyad"
            autoComplete="name"
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
          />
          <SelectField id="konu" label="Konu" defaultValue="" required>
            <option value="" disabled>
              Konu seçin
            </option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </SelectField>

          <TextAreaField
            id="mesaj"
            label="Mesaj"
            rows={6}
            required
            wrapperClassName="sm:col-span-2"
          />
        </div>

        <button
          type="submit"
          className="mt-6 flex h-13 w-full items-center justify-center gap-2.5 rounded-md bg-moss text-base font-medium text-white transition-colors hover:bg-moss-dark"
        >
          Mesaj Gönder
          <Send className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>

        <p aria-live="polite" className="mt-4 text-[0.9rem] text-moss">
          {sent
            ? "Mesajınız alındı. En kısa sürede size dönüş yapacağız."
            : ""}
        </p>
      </form>
    </section>
  );
}
