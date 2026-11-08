import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { products, site } from "@/content/site";

/**
 * The four product pages the old footer linked to and never had. Every one
 * of /products/our-life, /products/courses, /products/mind and
 * /products/research returned a hard 404 on the live site.
 *
 * Body copy is deliberately thin: it says what the product is and that it is
 * not open yet, rather than inventing detail the owner has not written.
 */

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.blurb,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Button href="/#products" variant="ghost" size="sm" leading={<ArrowLeft size={16} />}>
          All products
        </Button>

        <div className="mt-10 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="text-label-md text-ink-muted">{product.index}</span>
            {product.status === "coming-soon" && (
              <Badge tone="accent" size="sm">
                Coming soon
              </Badge>
            )}
          </div>

          <h1 className="mt-6 text-h1 text-ink">{product.name}</h1>
          <p className="mt-6 text-body-xl text-ink-soft">{product.blurb}</p>

          <div className="mt-12 rounded-xl border border-line bg-subtle p-8">
            <h2 className="text-h5 text-ink">Not open yet</h2>
            <p className="mt-3 text-body-lg text-ink-soft">
              {product.name} is in build. If it is a fit for what you are
              working on, talk to us now and we will bring you in early.
            </p>
            <Button href="/contact" className="mt-6">
              Talk to us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
