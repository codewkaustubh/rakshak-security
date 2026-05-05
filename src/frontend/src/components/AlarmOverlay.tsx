import { sendCommand } from "@/api/rakshak";
import { useAlarm } from "@/hooks/useRakshak";
import { useRakshakStore } from "@/store/useRakshakStore";
import type { AlarmEvent } from "@/types";
import { useEffect, useRef, useState } from "react";

// ── Audio helpers ──────────────────────────────────────────────────────────────
function startAlertAudio(ctxRef: React.MutableRefObject<AudioContext | null>) {
  try {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // 0.3s on / 0.2s off repeating beep pattern
    let t = ctx.currentTime;
    const scheduleBeeps = () => {
      for (let i = 0; i < 10; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(880, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
        gain.gain.setValueAtTime(0.25, t + 0.28);
        gain.gain.linearRampToValueAtTime(0, t + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
        t += 0.5; // 0.3 on + 0.2 off
      }
    };
    scheduleBeeps();
    // Reschedule every 5s so it loops
    const interval = setInterval(() => {
      if (!ctxRef.current) return;
      t = ctxRef.current.currentTime;
      scheduleBeeps();
    }, 5000);
    // Attach interval id to ctx for cleanup
    (ctx as AudioContext & { _rafId?: ReturnType<typeof setInterval> })._rafId =
      interval;
  } catch {
    // Audio API unavailable (autoplay blocked etc)
  }
}

function stopAlertAudio(ctxRef: React.MutableRefObject<AudioContext | null>) {
  if (!ctxRef.current) return;
  const ctx = ctxRef.current as AudioContext & {
    _rafId?: ReturnType<typeof setInterval>;
  };
  if (ctx._rafId) clearInterval(ctx._rafId);
  try {
    ctx.close();
  } catch {
    /* ignore */
  }
  ctxRef.current = null;
}

// ── Expose test trigger on window ─────────────────────────────────────────────
declare global {
  interface Window {
    triggerTestAlarm: () => void;
  }
}

export function AlarmOverlay() {
  const { alarm, clearAlarm } = useAlarm();
  const triggerAlarm = useRakshakStore((s) => s.triggerAlarm);
  const activeDeviceId = useRakshakStore((s) => s.activeDeviceId);
  const addToast = useRakshakStore((s) => s.addToast);
  const [disarming, setDisarming] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Register window test helper
  useEffect(() => {
    window.triggerTestAlarm = () => {
      triggerAlarm({
        type: "SENSOR_ALARM",
        message: "Sensor 3 Triggered — Motion Detector",
        timestamp: new Date().toISOString(),
        source: "DEVICE",
      });
    };
    return () => {
      (window as Partial<Window>).triggerTestAlarm = undefined;
    };
  }, [triggerAlarm]);

  // Show/hide with fade transition
  useEffect(() => {
    if (alarm) {
      setFading(false);
      setVisible(true);
      startAlertAudio(audioCtxRef);
    } else if (visible) {
      setFading(true);
      stopAlertAudio(audioCtxRef);
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    }
  }, [alarm, visible]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => stopAlertAudio(audioCtxRef);
  }, []);

  const handleDisarmAll = async () => {
    if (!activeDeviceId) return;
    setDisarming(true);
    try {
      await sendCommand(activeDeviceId, "disarmall");
      clearAlarm();
      addToast({ type: "success", message: "All zones disarmed" });
    } catch {
      addToast({
        type: "error",
        message: "Command failed — check device connection",
      });
    } finally {
      setDisarming(false);
    }
  };

  if (!visible) return null;

  const isSOS = alarm?.type === "SOS";
  const title = isSOS ? "SOS ALERT" : "INTRUDER ALERT";
  const emoji = isSOS ? "🆘" : "🚨";
  const detail = isSOS
    ? "Emergency SOS Activated"
    : (alarm?.message ?? "Motion detected");
  const ts = alarm?.timestamp
    ? new Date(alarm.timestamp).toLocaleString(undefined, {
        dateStyle: "short",
        timeStyle: "medium",
      })
    : "";

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        zIndex: 9999,
        transition: "opacity 0.5s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : undefined,
      }}
      data-ocid="alarm.overlay"
    >
      {/* Pulsing background */}
      <div
        className="absolute inset-0 animate-alarm-bg-pulse"
        aria-hidden="true"
      />

      {/* Scan-line texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Content card */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 px-8 py-10 text-center w-full max-w-sm mx-4"
        style={{
          backgroundColor: "rgba(26,0,0,0.75)",
          border: "1px solid rgba(255,59,59,0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Animated icon */}
        <div
          className="text-[80px] leading-none animate-alarm-icon-pulse select-none"
          role="img"
          aria-label={isSOS ? "SOS" : "Alarm"}
        >
          {emoji}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1
            className="font-display font-bold uppercase tracking-[0.15em] text-white"
            style={{ fontSize: "52px", lineHeight: 1 }}
          >
            {title}
          </h1>
          <p className="text-base font-semibold text-white/90 tracking-wide">
            {detail}
          </p>
          {ts && <p className="text-xs text-white/50 font-mono mt-1">{ts}</p>}
          {alarm?.source && (
            <p className="text-[10px] font-bold tracking-widest font-display uppercase text-white/40">
              SOURCE: {alarm.source}
            </p>
          )}
        </div>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ backgroundColor: "rgba(255,59,59,0.3)" }}
        />

        {/* Action buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button
            type="button"
            className="w-full py-4 text-sm font-bold tracking-[0.2em] font-display uppercase transition-all active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#FF3B3B",
              color: "#fff",
              boxShadow: disarming ? "none" : "0 0 20px rgba(255,59,59,0.5)",
            }}
            onClick={handleDisarmAll}
            disabled={disarming}
            data-ocid="alarm.disarm_button"
          >
            {disarming ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                DISARMING...
              </>
            ) : (
              "⚠ DISARM ALL ZONES"
            )}
          </button>

          <button
            type="button"
            className="w-full py-3 text-xs font-bold tracking-[0.2em] font-display uppercase transition-all hover:bg-white/5 active:scale-95 flex flex-col items-center gap-1"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.6)",
            }}
            onClick={clearAlarm}
            data-ocid="alarm.dismiss_button"
          >
            <span>DISMISS</span>
            <span
              className="text-[9px] tracking-normal normal-case font-normal"
              style={{ color: "rgba(255,180,0,0.7)" }}
            >
              Alert remains active on device
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
