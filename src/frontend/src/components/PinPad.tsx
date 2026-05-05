import { Check, Delete } from "lucide-react";
import { useCallback, useState } from "react";

interface PinPadProps {
  digitCount?: number;
  onComplete: (pin: string) => void;
  onError?: () => void;
  title?: string;
  subtitle?: string;
}

const KEYS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "backspace",
  "0",
  "confirm",
];

export function PinPad({
  digitCount = 4,
  onComplete,
  title = "ENTER PIN",
  subtitle,
}: PinPadProps) {
  const [digits, setDigits] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handleKey = useCallback(
    (key: string) => {
      if (key === "backspace") {
        setDigits((d) => d.slice(0, -1));
        setError(false);
        return;
      }
      if (key === "confirm") {
        if (digits.length === digitCount) {
          onComplete(digits.join(""));
        } else {
          setError(true);
          setTimeout(() => setError(false), 600);
        }
        return;
      }
      if (digits.length >= digitCount) return;
      const next = [...digits, key];
      setDigits(next);
      if (next.length === digitCount) {
        setTimeout(() => onComplete(next.join("")), 150);
      }
    },
    [digits, digitCount, onComplete],
  );

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs mx-auto">
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground font-mono">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>

      {/* PIN dots */}
      <div
        className={`flex gap-3 transition-all duration-150 ${
          error ? "animate-[shake_0.3s_ease]" : ""
        }`}
        data-ocid="pinpad.dots"
      >
        {Array.from({ length: digitCount }, (_, i) => `pin-dot-pos-${i}`).map(
          (dotId, i) => (
            <div
              key={dotId}
              className={`w-4 h-4 border-2 transition-all duration-200 ${
                i < digits.length
                  ? "bg-primary border-primary scale-110"
                  : error
                    ? "border-destructive"
                    : "border-border bg-transparent"
              }`}
            />
          ),
        )}
      </div>

      {/* Keypad grid */}
      <div className="grid grid-cols-3 gap-2 w-full" data-ocid="pinpad.grid">
        {KEYS.map((key) => {
          const _isSpecial = key === "backspace" || key === "confirm";
          const isConfirm = key === "confirm";
          const isBack = key === "backspace";
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleKey(key)}
              data-ocid={`pinpad.key.${key}`}
              className={`h-14 flex items-center justify-center text-lg font-bold font-mono
                border transition-all duration-150 ripple-tap select-none
                active:bg-primary/30
                ${
                  isConfirm
                    ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                    : isBack
                      ? "border-border bg-card text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      : "border-border bg-card text-foreground hover:bg-muted/30 hover:border-primary/50"
                }
              `}
            >
              {isBack ? (
                <Delete className="w-4 h-4" />
              ) : isConfirm ? (
                <Check className="w-5 h-5" />
              ) : (
                key
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
