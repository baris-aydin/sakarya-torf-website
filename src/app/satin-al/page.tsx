import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CheckoutClient from "@/components/CheckoutClient";
import {
  getProduct,
  isPurchasable,
  products,
  toOrderItem,
} from "@/lib/products";
import { MAX_QUANTITY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Siparişinizi Tamamlayın",
  description:
    "TORFADA Super Mix bitki toprağı siparişinizi tamamlamak için müşteri ve teslimat bilgilerinizi girin.",
};

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function readQuantity(value: string | string[] | undefined) {
  const parsed = Number.parseInt(readParam(value) ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.min(parsed, MAX_QUANTITY);
}

export default async function Page(props: PageProps<"/satin-al">) {
  const searchParams = await props.searchParams;

  // Fall back to the first orderable product if the URL names one that is
  // unknown or has no price yet.
  const requested = getProduct(readParam(searchParams.product));
  const selected =
    requested && isPurchasable(requested)
      ? requested
      : products.find(isPurchasable);

  if (!selected) {
    notFound();
  }

  return (
    <CheckoutClient
      item={toOrderItem(selected)}
      initialQuantity={readQuantity(searchParams.quantity)}
    />
  );
}
