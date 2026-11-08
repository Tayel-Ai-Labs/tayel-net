"use client";

import { useEffect, useRef } from "react";

/**
 * The faceted shape beside the hero, a stellated icosahedron turning slowly.
 *
 * Rebuilt from a capture of tayel.net taken on 2026-10-12. The live site no
 * longer renders its own: the hero's second column is empty there now, with no
 * canvas and no 3D chunk loading, so there was nothing left to copy from.
 *
 * Real 3D, no dependency: 20 icosahedron faces are each raised to a spike,
 * giving 60 triangles that are rotated, projected, depth-sorted and shaded per
 * frame. Face colours come from the DS Primary and Neutral ramps, so the shape
 * belongs to the palette instead of sitting next to it.
 *
 * React renders the triangles once; the animation mutates SVG attributes
 * directly, so a 60fps loop never re-renders a component. Under
 * prefers-reduced-motion it draws a single frame and stops.
 */

const PHI = (1 + Math.sqrt(5)) / 2;

const BASE_VERTICES: number[][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];

const BASE_FACES: number[][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

/** How far each face's apex is pushed out. 1 would leave a plain icosahedron. */
const SPIKE = 1.62;

/** DS ramp values. Greys carry the form, the indigos catch the light. */
const PALETTE: number[][] = [
  [209, 213, 219], // neutral-300
  [156, 163, 175], // neutral-400
  [173, 168, 227], // primary-200
  [131, 124, 213], // primary-300
  [90, 82, 199],   // primary-400
];

type Tri = { v: number[][]; colour: number[] };

function buildTriangles(): Tri[] {
  const unit = BASE_VERTICES.map((v) => {
    const len = Math.hypot(v[0], v[1], v[2]);
    return [v[0] / len, v[1] / len, v[2] / len];
  });

  const tris: Tri[] = [];
  BASE_FACES.forEach((face, faceIndex) => {
    const [a, b, c] = face.map((i) => unit[i]);
    const centroid = [
      (a[0] + b[0] + c[0]) / 3,
      (a[1] + b[1] + c[1]) / 3,
      (a[2] + b[2] + c[2]) / 3,
    ];
    const len = Math.hypot(centroid[0], centroid[1], centroid[2]);
    const apex = centroid.map((n) => (n / len) * SPIKE);

    // Mostly grey, with every third face taking an indigo so the ramp shows.
    const colour =
      faceIndex % 3 === 0
        ? PALETTE[2 + (faceIndex % 3)]
        : PALETTE[faceIndex % 2];

    tris.push({ v: [a, b, apex], colour });
    tris.push({ v: [b, c, apex], colour });
    tris.push({ v: [c, a, apex], colour });
  });
  return tris;
}

const TRIANGLES = buildTriangles();

/** Camera distance, in the same units as the unit sphere. */
const DEPTH = 3.4;
const RADIUS = 27;
const LIGHT = (() => {
  const l = [-0.35, 0.65, 1];
  const len = Math.hypot(l[0], l[1], l[2]);
  return l.map((n) => n / len);
})();

export function Polyhedron({ className = "" }: { className?: string }) {
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const polys = Array.from(group.children) as SVGPolygonElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t: number) => {
      const ay = t * 0.00022;
      const ax = Math.sin(t * 0.00013) * 0.42 - 0.25;
      const cy = Math.cos(ay), sy = Math.sin(ay);
      const cx = Math.cos(ax), sx = Math.sin(ax);

      const frame = TRIANGLES.map((tri, i) => {
        const pts: number[][] = tri.v.map(([x, y, z]) => {
          const x1 = x * cy - z * sy;
          const z1 = x * sy + z * cy;
          const y2 = y * cx - z1 * sx;
          const z2 = y * sx + z1 * cx;
          return [x1, y2, z2];
        });

        // Face normal, for both shading and back-face culling.
        const [p0, p1, p2] = pts;
        const u = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]];
        const w = [p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]];
        const n = [
          u[1] * w[2] - u[2] * w[1],
          u[2] * w[0] - u[0] * w[2],
          u[0] * w[1] - u[1] * w[0],
        ];
        const nlen = Math.hypot(n[0], n[1], n[2]) || 1;
        const shade = Math.max(
          0,
          (n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]) / nlen,
        );

        const depth = (p0[2] + p1[2] + p2[2]) / 3;
        const screen = pts
          .map(([x, y, z]) => {
            const k = DEPTH / (DEPTH - z);
            return `${(50 + x * k * RADIUS).toFixed(2)},${(50 - y * k * RADIUS).toFixed(2)}`;
          })
          .join(" ");

        const lift = 0.42 + 0.62 * shade;
        const [r, g, b] = tri.colour;
        const fill = `rgb(${Math.min(255, Math.round(r * lift))} ${Math.min(255, Math.round(g * lift))} ${Math.min(255, Math.round(b * lift))})`;

        return { i, depth, screen, fill };
      });

      // Painter's algorithm: furthest first.
      frame.sort((a, b) => a.depth - b.depth);
      frame.forEach((f, slot) => {
        const poly = polys[slot];
        poly.setAttribute("points", f.screen);
        poly.setAttribute("fill", f.fill);
      });
    };

    if (reduceMotion) {
      draw(4200);
      return;
    }

    let raf = 0;
    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g ref={groupRef}>
        {TRIANGLES.map((_, i) => (
          <polygon
            key={i}
            points="50,50 50,50 50,50"
            stroke="rgb(255 255 255 / 0.18)"
            strokeWidth="0.25"
            strokeLinejoin="round"
          />
        ))}
      </g>
    </svg>
  );
}
