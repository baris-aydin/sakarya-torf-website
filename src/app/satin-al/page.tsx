import type { Metadata } from "next";
import CheckoutClient from "@/components/CheckoutClient";
import { MAX_QUANTITY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Siparişinizi Tamamlayın",
  description:
    "TORFADA Super Mix 40 litre bitki toprağı siparişinizi tamamlamak için müşteri ve teslimat bilgilerinizi girin.",
};

function readQuantity(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.min(parsed, MAX_QUANTITY);
}

export default async function Page(props: PageProps<"/satin-al">) {
  const searchParams = await props.searchParams;

  return <CheckoutClient initialQuantity={readQuantity(searchParams.quantity)} />;
}
