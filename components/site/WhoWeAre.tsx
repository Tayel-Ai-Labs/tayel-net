import { Container } from "@/components/ui/Container";
import { about, founders } from "@/content/site";

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="scroll-mt-24 py-20 md:py-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-2">
          {[about.who, about.vision].map((block) => (
            <div key={block.title} className="rounded-2xl bg-subtle p-10 md:p-12">
              <h2 className="text-h3 text-ink">{block.title}</h2>
              <p className="mt-5 text-body-xl text-ink-soft">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-overline text-ink-muted">Founders</p>

          {/* One strip, three equal cells divided by hairlines. It stacks on a
              phone and sits on a single row from the DS tablet frame up. */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
              {founders.map((person) => (
                <div key={person.name} className="px-6 py-7 text-center">
                  <p className="text-h6 text-ink">{person.name}</p>
                  <p className="mt-1.5 text-body-sm text-ink-muted">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
}
