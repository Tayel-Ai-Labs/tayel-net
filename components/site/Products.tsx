import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { products } from "@/content/site";

export function Products() {
  return (
    <section id="products" className="scroll-mt-24 py-20 md:py-24">
      <Container>
        <p className="text-overline text-ink-muted">What we build</p>
        <h2 className="mt-3 text-h2 text-ink">Our Products</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.slug}
              className="group flex flex-col justify-between rounded-2xl bg-linear-to-br from-primary-700 to-primary-500 p-8 text-white shadow-brand-sm md:p-10"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-label-md text-primary-200">{product.index}</span>
                  {product.status === "coming-soon" && (
                    <Badge tone="accent" size="sm">
                      Coming soon
                    </Badge>
                  )}
                </div>
                <h3 className="mt-6 text-h4 text-white">{product.name}</h3>
                <p className="mt-3 max-w-md text-body-lg text-primary-100">{product.blurb}</p>
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="mt-10 inline-flex items-center gap-2 text-label-md text-white transition-opacity hover:opacity-80"
              >
                Explore
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
