import { Button } from "@/components/ui/Button";
import { EcosystemHeroVisual } from "@/components/home/EcosystemHeroVisual";
import { PRODUCT_URLS } from "@/config/products";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          One platform, every stage of growth
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-text sm:text-5xl">
          Learning for Every
          <br />
          Stage of Growth.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted">
          One platform for learning, discovering potential, building
          skills, and growing with technology.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="#products" variant="primary">
            Explore Valiyo
          </Button>
          <Button href={PRODUCT_URLS.learn} variant="outline">
            Explore Valiyo Kids
          </Button>
        </div>
      </div>

      <EcosystemHeroVisual />
    </section>
  );
}