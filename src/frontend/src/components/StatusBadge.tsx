export type StatusBadgeVariant =
  | "active"
  | "triggered"
  | "offline"
  | "bypassed";

interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  label?: string;
  className?: string;
}

const VARIANT_STYLES: Record<StatusBadgeVariant, string> = {
  active:
    "bg-[oklch(0.75_0.18_142/0.15)] text-[oklch(0.75_0.18_142)] border-[oklch(0.75_0.18_142/0.4)]",
  triggered:
    "bg-[oklch(0.56_0.23_15/0.15)] text-[oklch(0.56_0.23_15)] border-[oklch(0.56_0.23_15/0.4)]",
  offline:
    "bg-[oklch(0.35_0.02_0/0.5)] text-[oklch(0.62_0.01_0)] border-[oklch(0.35_0.02_0)]",
  bypassed:
    "bg-[oklch(0.68_0.21_65/0.15)] text-[oklch(0.68_0.21_65)] border-[oklch(0.68_0.21_65/0.4)]",
};

const DEFAULT_LABELS: Record<StatusBadgeVariant, string> = {
  active: "ACTIVE",
  triggered: "TRIGGERED",
  offline: "OFFLINE",
  bypassed: "BYPASSED",
};

export function StatusBadge({
  variant,
  label,
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold tracking-widest font-mono border ${
        VARIANT_STYLES[variant]
      } ${className}`}
      data-ocid={`status_badge.${variant}`}
    >
      {label ?? DEFAULT_LABELS[variant]}
    </span>
  );
}
