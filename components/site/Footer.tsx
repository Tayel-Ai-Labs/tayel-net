import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";
import { site, products } from "@/content/site";

const socials = [
  { href: site.social.facebook, label: "Facebook", Icon: Facebook },
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.social.youtube, label: "YouTube", Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="mt-10 rounded-t-2xl bg-primary-500 text-primary-100">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr] md:py-20">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9" />
              <span className="text-label-lg font-display text-white">{site.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-body-md text-primary-200">{site.tagline}</p>
            <div className="mt-8 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-primary-100 transition-colors hover:bg-primary-400 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-label-md text-white">Products</h3>
            <ul className="mt-5 space-y-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-body-md text-primary-200 transition-colors hover:text-white"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-label-md text-white">Contact</h3>
            <ul className="mt-5 space-y-3">
              {site.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-body-md text-primary-200 transition-colors hover:text-white"
                  >
                    <Phone size={15} />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-body-md text-primary-200 transition-colors hover:text-white"
                >
                  <Mail size={15} />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-600 py-8">
          <p className="text-body-sm text-primary-300">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
