import { useRakshakStore } from "@/store/useRakshakStore";
import type { Toast } from "@/types";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { useEffect, useState } from "react";

const MAX_TOASTS = 3;

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
} as const;

const BORDER_COLORS = {
  success: "#00E676",
  error: "#FF3B3B",
  info: "#00A3FF",
} as const;

const ICON_COLORS = {
  success: "#00E676",
  error: "#FF3B3B",
  info: "#00A3FF",
} as const;

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useRakshakStore((s) => s.removeToast);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on next tick
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const Icon = ICONS[toast.type];

  return (
    <div
      className="flex items-start gap-3 pr-3 pl-0 py-3 min-w-[280px] max-w-[340px] pointer-events-auto"
      style={{
        backgroundColor: "#141929",
        border: "1px solid #1E2A45",
        borderLeftColor: BORDER_COLORS[toast.type],
        borderLeftWidth: "3px",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: mounted ? "translateX(0)" : "translateX(110%)",
        opacity: mounted ? 1 : 0,
      }}
      data-ocid={`toast.${toast.type}`}
    >
      {/* Left color accent strip already handled by borderLeft */}
      <div className="flex-shrink-0 pl-3 pt-0.5">
        <Icon className="w-4 h-4" style={{ color: ICON_COLORS[toast.type] }} />
      </div>
      <p className="flex-1 text-xs leading-5 text-foreground font-body">
        {toast.message}
      </p>
      <button
        type="button"
        className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-0.5"
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
        data-ocid="toast.close_button"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useRakshakStore((s) => s.toasts);
  const visible = toasts.slice(-MAX_TOASTS);

  if (visible.length === 0) return null;

  return (
    <div
      className="fixed z-[9000] flex flex-col gap-2 pointer-events-none"
      style={{
        bottom: "1.25rem",
        right: "1.25rem",
        left: "auto",
      }}
      // On mobile, center at bottom
      aria-live="polite"
      aria-atomic="false"
      data-ocid="toast.container"
    >
      <style>{`
        @media (max-width: 480px) {
          [data-ocid="toast.container"] {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
            align-items: center;
          }
          [data-ocid="toast.container"] > div {
            min-width: 0;
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>
      {visible.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}
