import type { ReactNode } from "react";

/**
 * Badge, Tayel DS. 6 colours x 3 sizes.
 * Always tonal: a 50 ground with 600/700 text. Never a solid fill.
 */

type Tone = "neutral" | "primary" | "success" | "warning" | "error" | "accent";
type Size = "sm" | "md" | "lg";

const tones: Record<Tone, string> = {
  neutral: "bg-neutral-50 text-neutral-700",
  primary: "bg-primary-50 text-primary-500",
  success: "bg-success-50 text-success-700",
  warning: "bg-warning-50 text-warning-700",
  error: "bg-error-50 text-error-700",
  accent: "bg-accent-50 text-accent-600",
};

const sizes: Record<Size, string> = {
  sm: "h-6 px-2 text-label-sm rounded-md",
  md: "h-7 px-3 text-label-sm rounded-md",
  lg: "h-8 px-3 text-label-md rounded-lg",
};

export function Badge({
  children,
  tone = "neutral",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center font-sans ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
