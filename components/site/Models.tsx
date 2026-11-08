import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { models, type Model } from "@/content/site";

/**
 * Models sit next to the four core products. A product is a platform we are
 * opening; a model is a system already built for a named problem. Same card
 * language as the rest of the page on purpose: both are evidence, not roadmap.
 */

const status: Record<Model["status"], { label: string; tone: "success" | "accent" | "neutral" }> = {
  live: { label: "Live", tone: "success" },
  "in-build": { label: "In build", tone: "accent" },
  planned: { label: "Planned", tone: "neutral" },
};

export function Models() {
  return (
    <section id="models" className="scroll-mt-24 py-20 md:py-24">
      <Container>
        <p className="text-overline text-ink-muted">Built here</p>
        <h2 className="mt-3 text-h2 text-ink">Models</h2>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-soft">
          Systems we have already built, each for a named problem: a café, a tutor,
          an engineering team, a dance floor. The products above are platforms
          we are opening; these are the work behind them.
        </p>

        <div className="mt-12 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(360px,1fr))]">
          {models.map((model) => {
            const s = status[model.status];
            return (
              <article
                key={model.slug}
                className="flex flex-col rounded-xl border border-line bg-surface p-8 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-overline text-ink-muted">{model.owner}</p>
                    <h3 className="mt-2 text-h5 text-ink">{model.name}</h3>
                  </div>
                  <Badge tone={s.tone} size="sm">
                    {s.label}
                  </Badge>
                </div>

                <p className="mt-4 text-body-md text-ink-soft">{model.blurb}</p>

                {model.reach && (
                  <p className="mt-4 text-label-md text-action">{model.reach}</p>
                )}

                {model.note !== "TODO" && (
                  <p className="mt-5 border-s-2 border-line ps-4 text-body-md text-ink-muted">
                    {model.note}
                  </p>
                )}

                {model.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {model.tags.map((tag) => (
                      <Badge key={tag} tone="primary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {model.url && (
                  <a
                    href={model.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-label-md text-action transition-opacity hover:opacity-70"
                  >
                    Visit
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
