/**
 * The Tayel AI Labs mark: the planet on its own, without the wordmark.
 *
 * Rebuilt as SVG from the owner's logo image. Geometry is one ellipse rotated
 * -38deg around the sphere's centre, drawn twice: once behind the planet, once
 * across its face, so the ring reads as passing around it. The spark sits at
 * the ellipse's upper tip, just clear of the sphere's edge.
 *
 * When `spinning` is set, the orbit travels a full turn around the planet and
 * the spark rides with it. The planet itself does not move, which is the point:
 * this is a body being orbited, not a logo spinning on its own axis.
 *
 * The sphere is near-black on a light page, so its gradient stops are theme
 * tokens and it lifts rather than disappearing on the dark theme.
 */
export function Logo({
  className = "",
  spinning = false,
  onAnimationEnd,
}: {
  className?: string;
  spinning?: boolean;
  onAnimationEnd?: () => void;
}) {
  // Both halves of the ring turn together, around the sphere's centre.
  const orbit = spinning ? "animate-orbit" : "";
  const pivot = {
    transformBox: "view-box" as const,
    transformOrigin: "50px 47px",
  };

  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Tayel AI Labs">
      <defs>
        <radialGradient id="tayel-sphere" cx="40%" cy="34%" r="80%">
          <stop offset="0%" stopColor="var(--logo-sphere-from)" />
          <stop offset="100%" stopColor="var(--logo-sphere-to)" />
        </radialGradient>
        <linearGradient id="tayel-orbit" x1="12%" y1="88%" x2="88%" y2="12%">
          <stop offset="0%" stopColor="var(--color-secondary-400)" />
          <stop offset="60%" stopColor="var(--color-secondary-300)" />
          <stop offset="100%" stopColor="var(--color-accent-400)" />
        </linearGradient>
      </defs>

      {/* Far side of the ring. Only what clears the planet stays visible. */}
      <g className={orbit} style={pivot}>
        <g transform="rotate(-38 50 47)">
          <ellipse
            cx="50"
            cy="47"
            rx="40"
            ry="11"
            fill="none"
            stroke="url(#tayel-orbit)"
            strokeWidth="1.5"
            opacity="0.85"
          />
        </g>
      </g>

      <circle cx="50" cy="47" r="29" fill="url(#tayel-sphere)" />

      {/* Near side, across the planet's face, with the spark at its tip. */}
      <g className={orbit} style={pivot} onAnimationEnd={onAnimationEnd}>
        <g transform="rotate(-38 50 47)">
          <path
            d="M 90 47 A 40 11 0 0 1 10 47"
            fill="none"
            stroke="url(#tayel-orbit)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M 81.5 18.2 Q 82.3 21.6 85.8 22.4 Q 82.3 23.2 81.5 26.6 Q 80.7 23.2 77.2 22.4 Q 80.7 21.6 81.5 18.2 Z"
          fill="var(--color-accent-400)"
        />
      </g>
    </svg>
  );
}
