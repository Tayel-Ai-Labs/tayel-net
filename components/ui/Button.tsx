import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Button, Tayel DS.
 *
 * 5 types x 3 sizes x 3 states (default / hover / disabled), with an optional
 * leading and trailing icon slot on every variant.
 *
 * Heights, padding and per-size radius are not printed anywhere in the Figma
 * captures. The values below are derived from the 4px spacing scale and the
 * radius tokens; swap them for the real ones when the component page is
 * exported. See DESIGN-SYSTEM.md section 10, item 5.
 */

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const disabled =
  "disabled:bg-[var(--interactive-disabled)] disabled:text-[var(--interactive-disabled-text)] disabled:border-transparent disabled:shadow-none";

/**
 * Variants read the semantic layer (layer 2), never the primitives, that is
 * what makes the dark theme work without a second set of classes. A primary
 * button is navy-on-white in light and lavender-on-navy in dark because
 * --interactive-primary and --text-inverse both move.
 */
const variants: Record<Variant, string> = {
  primary: `bg-action text-ink-inverse shadow-brand-sm hover:bg-action-hover ${disabled}`,
  secondary: `bg-action-2 text-ink-inverse hover:bg-action-2-hover ${disabled}`,
  ghost: `bg-transparent text-action hover:bg-subtle ${disabled}`,
  outline: `bg-surface text-ink border border-line hover:bg-subtle hover:border-line-strong ${disabled}`,
  danger: `bg-error-500 text-white hover:bg-error-600 ${disabled}`,
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 gap-2 text-label-md rounded-md",
  md: "h-11 px-5 gap-2 text-label-md rounded-lg",
  lg: "h-13 px-6 gap-3 text-label-lg rounded-lg",
};

const base =
  "inline-flex items-center justify-center font-sans whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  disabled?: boolean;
  className?: string;
  /** Only used when there is no href. "submit" lets the button send a form. */
  type?: "button" | "submit";
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  leading,
  trailing,
  disabled: isDisabled = false,
  className = "",
  type = "button",
}: Props) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const inner = (
    <>
      {leading}
      <span>{children}</span>
      {trailing}
    </>
  );

  if (href && !isDisabled) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={isDisabled}>
      {inner}
    </button>
  );
}
