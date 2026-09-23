"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import CheckoutForm from "@/components/CheckoutForm";
import Container from "@/components/Container";
import OrderSummary from "@/components/OrderSummary";
import { cx } from "@/lib/cx";

const steps = ["1. Bilgiler", "2. Teslimat", "3. Ödeme"] as const;

type CheckoutClientProps = {
  initialQuantity: number;
};

export default function CheckoutClient({
  initialQuantity,
}: CheckoutClientProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [activeStep, setActiveStep] = useState(1);

  return (
    <>
      <div className="border-b border-line bg-cream pt-12 pb-6 lg:pt-16">
        <Container width="narrow">
          <h1 className="text-[clamp(1.9rem,3.6vw,2.6rem)] leading-tight font-bold text-ink">
            Siparişinizi Tamamlayın
          </h1>

          <ol className="mt-8 grid grid-cols-3 gap-4 text-[0.95rem]">
            {steps.map((label, index) => {
              const isActive = index + 1 === activeStep;

              return (
                <li
                  key={label}
                  aria-current={isActive ? "step" : undefined}
                  className={cx(
                    index === 1 && "text-center",
                    index === 2 && "text-right",
                    isActive ? "font-medium text-moss" : "text-muted",
                  )}
                >
                  {label}
                </li>
              );
            })}
          </ol>
        </Container>
      </div>

      <div className="bg-cream py-10 lg:py-14">
        <Container width="narrow">
          <div className="grid items-start gap-8 lg:grid-cols-[1.65fr_1fr]">
            {activeStep === 3 ? (
              <section className="rounded-lg border border-line bg-white p-6 shadow-[0_1px_3px_rgba(18,61,42,0.05)] sm:p-8">
                <span className="flex size-11 items-center justify-center rounded-md bg-sage text-moss">
                  <CreditCard
                    className="size-5"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>
                <h2 className="mt-6 text-[1.4rem] font-bold text-ink">
                  Ödeme Adımı
                </h2>
                <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted">
                  Bilgileriniz alındı. Güvenli ödeme altyapısı hazırlanıyor;
                  bu adım çok yakında kullanıma açılacak.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="mt-7 rounded-md border border-line px-6 py-3 text-[0.95rem] font-medium text-ink transition-colors hover:bg-mist"
                >
                  Bilgileri Düzenle
                </button>
              </section>
            ) : (
              <CheckoutForm onSubmit={() => setActiveStep(3)} />
            )}

            <div className="lg:sticky lg:top-28">
              <OrderSummary
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
