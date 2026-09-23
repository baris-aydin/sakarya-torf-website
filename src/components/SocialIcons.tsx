/**
 * lucide-react v1 no longer ships brand marks, so the two social glyphs we need
 * are drawn here in the same 24x24 outline style as the rest of the icon set.
 */
type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Instagram({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...baseProps} strokeWidth={strokeWidth} className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Facebook({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...baseProps} strokeWidth={strokeWidth} className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
