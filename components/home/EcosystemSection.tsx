import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductLineCard } from "@/components/home/ProductLineCard";
import { ecosystemProducts } from "@/config/ecosystem";

export function EcosystemSection() {
  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeader
        eyebrow="The Valiyo ecosystem"
        title="One ecosystem. Different learning journeys."
        description="Valiyo Kids is live today. The rest of the ecosystem is on the way — built for students, professionals, teachers, and organizations."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ecosystemProducts.map((product) => (
          <ProductLineCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
