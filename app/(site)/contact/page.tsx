import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-overline text-ink-muted">Get in touch</p>
          <h1 className="mt-3 text-h1 text-ink">Contact Us</h1>
          <p className="mt-6 text-body-xl text-ink-soft">
            Tell us what you are building. We answer on the same number the
            team actually picks up.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {site.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 rounded-xl border border-line bg-surface p-6 shadow-sm transition-colors hover:border-line-strong"
              >
                <Phone size={20} className="text-action" />
                <span className="text-body-lg text-ink">{phone}</span>
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-4 rounded-xl border border-line bg-surface p-6 shadow-sm transition-colors hover:border-line-strong sm:col-span-2"
            >
              <Mail size={20} className="text-action" />
              <span className="text-body-lg text-ink">{site.email}</span>
            </a>
          </div>

          {/* TODO: the live site has a Name / Email / Message form. It needs a
              destination (an inbox, a webhook, or a form service) before it is
              worth rebuilding. A form that silently drops messages is worse
              than no form. */}
        </div>
      </Container>
    </section>
  );
}
