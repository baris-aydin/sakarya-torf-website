import BrandStory from "@/components/BrandStory";
import ContactCTA from "@/components/ContactCTA";
import Hero from "@/components/Hero";
import ProductsPreview from "@/components/ProductsPreview";
import WhySakaryaTorf from "@/components/WhySakaryaTorf";

export default function Page() {
  return (
    <>
      <Hero />
      <ProductsPreview />
      <WhySakaryaTorf />
      <BrandStory />
      <ContactCTA />
    </>
  );
}
