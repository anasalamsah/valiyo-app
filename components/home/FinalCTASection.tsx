import { Button } from "@/components/ui/Button";
import { PRODUCT_URLS } from "@/config/products";

export function FinalCTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-[32px] bg-gradient-to-br from-[#efe9ff] to-[#fff6e6] px-8 py-16 text-center sm:px-14">
        <h2 className="mx-auto max-w-lg font-display text-3xl font-semibold text-text sm:text-4xl">
          Find Your Way to Learn, Discover, and Grow.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-text-muted sm:text-base">
          Explore the Valiyo experience that fits your journey.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="#products" variant="primary">
            Explore Valiyo
          </Button>
          <Button href={PRODUCT_URLS.learn} variant="outline">
            Explore Valiyo Kids
          </Button>
        </div>
      </div>
    </section>
  );
}
