"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { focusAreas } from "@/content/site";

/**
 * Core Focus Areas.
 *
 * Each question is a bordered bar, matching the live tayel.net accordion:
 * radius/xl, spacing/4 padding, spacing/3 between bars. Sizes come from the DS
 * scale (H6 to H5 for the question, Body/md for the answer) rather than from
 * the Tailwind slate/indigo classes the live site hardcodes.
 *
 * Open/close animates with the grid-rows 0fr -> 1fr technique, so the height
 * transitions without measuring anything in JS. The bar is a <button> rather
 * than a clickable div, so it is reachable by keyboard.
 */
export function FocusAreas() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="focus" className="scroll-mt-24 py-20 md:py-24">
      <Container>
        <p className="text-overline text-ink-muted">Research</p>
        <h2 className="mt-3 text-h2 text-ink">Our Core Focus Areas</h2>

        <div className="mt-5 flex flex-col gap-3">
          {focusAreas.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-action/30"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full select-none items-center justify-between gap-4 text-start"
                >
                  <span className="text-h6 md:text-h5 text-ink">{item.q}</span>
                  <Plus
                    size={20}
                    aria-hidden
                    className={`shrink-0 text-ink-muted transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-3 text-body-md text-ink-soft">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
