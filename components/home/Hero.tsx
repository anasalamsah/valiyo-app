import { Button } from "@/components/ui/Button";
import { AuthButton } from "@/components/ui/AuthButton";
import { HeroVisual } from "@/components/home/HeroVisual";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          Every child grows differently
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.1] text-text sm:text-5xl">
          Growing Every
          <br />
          Child&rsquo;s Future
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted">
          Help parents understand each child&rsquo;s unique strengths and
          support their learning journey with personalized insights and
          future-ready experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button href="#journey" variant="primary">
            Start Your Journey
          </Button>
          <AuthButton variant="outline" />
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}
