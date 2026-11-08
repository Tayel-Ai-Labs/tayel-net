import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { Polyhedron } from "@/components/site/Polyhedron";

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-overline text-ink-muted">{site.motto}</p>
            <h1 className="mt-6 text-h1 md:text-display-lg text-ink">{site.name}</h1>
            <p className="mt-6 max-w-xl text-body-xl text-ink-soft">{site.tagline}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/#products" size="lg" trailing={<ArrowRight size={18} />}>
                Our Products
              </Button>
              <Button href="/#clients" size="lg" variant="outline">
                See our work
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <Polyhedron className="mx-auto w-full max-w-md" />
          </div>
        </div>
      </Container>
    </section>
  );
}
