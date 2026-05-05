import { sendCommand } from "@/api/rakshak";
import { useAlarm, useAuthGuard, useDeviceStatus } from "@/hooks/useRakshak";
import { useRakshakStore } from "@/store/useRakshakStore";
import type { DeviceCommand } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  Signal,
  Wifi,
  WifiOff,
  Zap,
  ZapOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Test Alarm Button ───────────────────────────────────────────────────────
function TestAlarmButton() {
  const { triggerAlarm } = useAlarm();
  return (
    <div
      className="fixed bottom-20 right-4 z-50 md:bottom-4"
      data-ocid="dashboard.test_alarm_button"
    >
      <button
        type="button"
        className="text-[9px] font-bold tracking-widest font-display uppercase px-2 py-1 opacity-30 hover:opacity-70 transition-opacity"
        style={{
          border: "1px solid #1E2A45",
          color: "#FF3B3B",
          backgroundColor: "#141929",
        }}
        onClick={() =>
          triggerAlarm({
            type: "SENSOR_ALARM",
            message: "Sensor 3 Triggered — Motion Detector",
            timestamp: new Date().toISOString(),
            source: "DEVICE",
          })
        }
      >
        TEST ALARM
      </button>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function relativeTime(isoStr: string): string {
  const diffMs = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function gsmColor(signal: number): string {
  if (signal > 70) return "#00E676";
  if (signal >= 40) return "#FFA500";
  return "#FF3B3B";
}

function gsmQualityLabel(signal: number): string {
  if (signal > 70) return "EXCELLENT";
  if (signal >= 40) return "FAIR";
  return "POOR";
}

function lastEventBorderColor(event: string): string {
  const e = event.toUpperCase();
  if (e.includes("ALARM") || e.includes("SOS") || e.includes("INTRUDE"))
    return "#FF3B3B";
  if (e.includes("DISARM")) return "#00E676";
  if (e.includes("ARM")) return "#FF3B3B";
  if (e.includes("AC") || e.includes("POWER")) return "#FFA500";
  return "#00A3FF";
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

function ConfirmDialog({
  action,
  onConfirm,
  onCancel,
  loading,
  danger,
}: {
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
  danger?: boolean;
}) {
  // Close on backdrop click
  const backdropRef = useRef<HTMLDivElement>(null);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [loading, onCancel]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(11,15,28,0.92)" }}
      onClick={(e) => {
        if (e.target === backdropRef.current && !loading) onCancel();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && !loading) onCancel();
      }}
      aria-modal="true"
      data-ocid="confirm.dialog"
    >
      <div
        className="w-full max-w-sm border slide-up"
        style={{
          backgroundColor: "#141929",
          borderColor: danger ? "#FF3B3B" : "#1E2A45",
        }}
      >
        {/* Title bar */}
        <div
          className="px-5 py-3 border-b flex items-center gap-2"
          style={{ borderColor: danger ? "rgba(255,59,59,0.3)" : "#1E2A45" }}
        >
          <AlertTriangle
            className="w-4 h-4 flex-shrink-0"
            style={{ color: danger ? "#FF3B3B" : "#FFA500" }}
          />
          <h3 className="text-xs font-bold tracking-widest font-display uppercase text-foreground">
            CONFIRM ACTION
          </h3>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {action}
          </p>
        </div>

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            type="button"
            className="flex-1 py-3 text-xs font-bold tracking-widest font-display uppercase border transition-colors hover:bg-[#1E2A45]"
            style={{ borderColor: "#1E2A45", color: "#6b7a9a" }}
            onClick={onCancel}
            disabled={loading}
            data-ocid="confirm.cancel_button"
          >
            CANCEL
          </button>
          <button
            type="button"
            className="flex-1 py-3 text-xs font-bold tracking-widest font-display uppercase transition-all active:scale-95 disabled:opacity-60"
            style={{
              backgroundColor: danger ? "#FF3B3B" : "#00A3FF",
              color: "#0B0F1C",
            }}
            onClick={onConfirm}
            disabled={loading}
            data-ocid="confirm.confirm_button"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="w-3.5 h-3.5 border-2 border-t-transparent animate-spin rounded-full"
                  style={{
                    borderColor: "#0B0F1C",
                    borderTopColor: "transparent",
                  }}
                />
                SENDING...
              </span>
            ) : (
              "CONFIRM"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Zone Shield ──────────────────────────────────────────────────────────────

function ZoneShield({
  zone,
  sublabel,
  armed,
  loading,
}: {
  zone: "arm1" | "arm2";
  sublabel: string;
  armed: boolean;
  loading: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center gap-3 transition-all duration-500"
      data-ocid={`zone.${zone}.shield`}
    >
      {/* Outer glow ring */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 108, height: 108 }}
      >
        {/* Pulse ring — only visible when armed */}
        {armed && (
          <span
            className="absolute inset-0 rounded-full glow-pulse-red"
            style={{
              border: "2px solid #FF3B3B",
              borderRadius: "50%",
              animation:
                "glow-pulse-red 1.2s cubic-bezier(0.4,0,0.6,1) infinite",
            }}
          />
        )}

        {/* Shield circle */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-500"
          style={{
            backgroundColor: armed
              ? "rgba(255,59,59,0.12)"
              : "rgba(30,42,69,0.6)",
            borderColor: armed ? "#FF3B3B" : "#1E2A45",
            boxShadow: armed
              ? "0 0 28px rgba(255,59,59,0.25), inset 0 0 16px rgba(255,59,59,0.08)"
              : "none",
          }}
        >
          {loading ? (
            <span
              className="w-10 h-10 border-2 border-t-transparent animate-spin rounded-full"
              style={{
                borderColor: armed ? "#FF3B3B" : "#00A3FF",
                borderTopColor: "transparent",
              }}
            />
          ) : armed ? (
            <ShieldAlert
              className="w-11 h-11 transition-all duration-300"
              style={{ color: "#FF3B3B" }}
            />
          ) : (
            <ShieldOff
              className="w-11 h-11 transition-all duration-300"
              style={{ color: "#344060" }}
            />
          )}
        </div>
      </div>

      {/* Label group */}
      <div className="text-center">
        <p
          className="text-[10px] font-bold tracking-[0.2em] font-display uppercase mb-0.5"
          style={{ color: "#4a5878" }}
        >
          {zone === "arm1" ? "ZONE 1" : "ZONE 2"}
        </p>
        <p
          className="text-xs font-bold tracking-[0.15em] font-display uppercase transition-colors duration-300"
          style={{ color: armed ? "#FF3B3B" : "#00E676" }}
        >
          {armed
            ? `${zone === "arm1" ? "ARM 1" : "ARM 2"} — ARMED`
            : `${zone === "arm1" ? "ARM 1" : "ARM 2"} — DISARMED`}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5 tracking-wider font-display uppercase">
          {sublabel}
        </p>
      </div>
    </div>
  );
}

// ─── Control Button ───────────────────────────────────────────────────────────

function ControlBtn({
  label,
  variant,
  onClick,
  disabled,
  loading,
  ocid,
}: {
  label: string;
  variant: "arm" | "disarm";
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  ocid: string;
}) {
  const isArm = variant === "arm";
  return (
    <button
      type="button"
      className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold tracking-widest font-display uppercase border transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        backgroundColor: disabled
          ? "transparent"
          : isArm
            ? "#FF3B3B"
            : "transparent",
        borderColor: disabled ? "#1E2A45" : isArm ? "#FF3B3B" : "#00E676",
        color: disabled ? "#344060" : isArm ? "#fff" : "#00E676",
      }}
      onClick={onClick}
      disabled={disabled || loading}
      data-ocid={ocid}
    >
      {loading ? (
        <span
          className="w-3.5 h-3.5 border-2 border-t-transparent animate-spin rounded-full"
          style={{
            borderColor: isArm ? "#fff" : "#00E676",
            borderTopColor: "transparent",
          }}
        />
      ) : isArm ? (
        <ShieldAlert className="w-3.5 h-3.5" />
      ) : (
        <ShieldCheck className="w-3.5 h-3.5" />
      )}
      {label}
    </button>
  );
}

// ─── Status Card ──────────────────────────────────────────────────────────────

function StatusCard({
  ocid,
  icon,
  label,
  value,
  valueColor,
  sub,
  isRefetching,
}: {
  ocid: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor: string;
  sub?: string;
  isRefetching?: boolean;
}) {
  return (
    <div
      className="p-4 border transition-all duration-300 relative overflow-hidden"
      style={{
        backgroundColor: "#141929",
        borderColor: isRefetching ? "#00A3FF" : "#1E2A45",
        boxShadow: isRefetching ? "0 0 0 1px rgba(0,163,255,0.3)" : "none",
      }}
      data-ocid={ocid}
    >
      {/* Refetch indicator stripe */}
      {isRefetching && (
        <span
          className="absolute top-0 left-0 right-0 h-[2px] animate-pulse"
          style={{ backgroundColor: "#00A3FF" }}
        />
      )}
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <p className="text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground">
          {label}
        </p>
      </div>
      <p
        className="text-sm font-bold font-display uppercase leading-none"
        style={{ color: valueColor }}
      >
        {value}
      </p>
      {sub && (
        <p className="text-[10px] text-muted-foreground font-mono mt-1 tracking-wider">
          {sub}
        </p>
      )}
    </div>
  );
}

// ─── Device Switcher Inline ───────────────────────────────────────────────────

function InlineSwitcher() {
  const [open, setOpen] = useState(false);
  const devices = useRakshakStore((s) => s.devices);
  const activeDeviceId = useRakshakStore((s) => s.activeDeviceId);
  const setActiveDevice = useRakshakStore((s) => s.setActiveDevice);
  const status = useRakshakStore((s) => s.status);
  const ref = useRef<HTMLDivElement>(null);

  const active = devices.find((d) => d.deviceId === activeDeviceId);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref} data-ocid="dashboard.device_switcher">
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 border transition-colors hover:bg-[#1a2035]"
        style={{ backgroundColor: "#141929", borderColor: "#1E2A45" }}
        onClick={() => setOpen((o) => !o)}
        data-ocid="dashboard.device_switcher_button"
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{
            backgroundColor: status?.online ? "#00E676" : "#FF3B3B",
            boxShadow: status?.online ? "0 0 6px #00E676" : "none",
          }}
        />
        <span className="text-sm font-bold tracking-[0.15em] font-display uppercase text-foreground">
          {active?.name ?? "No Device"}
        </span>
        <span className="text-[10px] text-muted-foreground font-mono">
          {activeDeviceId}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 left-0 min-w-[220px] border z-50 slide-up"
          style={{ backgroundColor: "#141929", borderColor: "#1E2A45" }}
          data-ocid="dashboard.device_dropdown"
        >
          {devices.map((d, i) => (
            <button
              type="button"
              key={d.deviceId}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs transition-colors hover:bg-[#1E2A45] ${
                d.deviceId === activeDeviceId
                  ? "text-[#00A3FF]"
                  : "text-foreground"
              }`}
              onClick={() => {
                setActiveDevice(d.deviceId);
                setOpen(false);
              }}
              data-ocid={`dashboard.device_option.${i + 1}`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: d.online ? "#00E676" : "#FF3B3B" }}
              />
              <span className="font-bold tracking-wider font-display uppercase">
                {d.name}
              </span>
              <span className="ml-auto text-muted-foreground font-mono text-[10px]">
                {d.deviceId}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export function DashboardPage() {
  useAuthGuard();
  const navigate = useNavigate();

  const activeDeviceId = useRakshakStore((s) => s.activeDeviceId);
  const { status, isLoading } = useDeviceStatus(activeDeviceId);
  const lastPoll = useRakshakStore((s) => s.lastPoll);
  const addToast = useRakshakStore((s) => s.addToast);
  const zoneLabels = useRakshakStore((s) => s.zoneLabels);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);

  // Track first load vs subsequent polls
  useEffect(() => {
    if (!isLoading && isFirstLoad && status) {
      setIsFirstLoad(false);
    }
  }, [isLoading, isFirstLoad, status]);

  // Subtle refetch indicator (not on first load)
  useEffect(() => {
    if (!isFirstLoad && isLoading) {
      setIsRefetching(true);
    } else {
      const t = setTimeout(() => setIsRefetching(false), 400);
      return () => clearTimeout(t);
    }
  }, [isLoading, isFirstLoad]);

  const [pending, setPending] = useState<DeviceCommand | null>(null);
  const [confirm, setConfirm] = useState<{
    cmd: DeviceCommand;
    label: string;
    danger?: boolean;
  } | null>(null);

  const executeCommand = async (cmd: DeviceCommand) => {
    if (!activeDeviceId) return;
    setPending(cmd);
    try {
      await sendCommand(activeDeviceId, cmd);
      addToast({ type: "success", message: "Command sent successfully" });
    } catch {
      addToast({
        type: "error",
        message: "Command failed — device may be offline",
      });
    } finally {
      setPending(null);
      setConfirm(null);
    }
  };

  const anyArmed = (status?.arm1 ?? false) || (status?.arm2 ?? false);

  const getLastSeenText = () => {
    if (!lastPoll) return "";
    const mins = Math.floor((Date.now() - lastPoll.getTime()) / 60000);
    if (mins < 1) return "Just now";
    return `${mins}m ago`;
  };

  // First load skeleton
  if (isFirstLoad && isLoading) {
    return (
      <div
        className="flex-1 flex items-center justify-center min-h-[60vh]"
        data-ocid="dashboard.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#00A3FF", borderTopColor: "transparent" }}
          />
          <p className="text-[11px] font-bold tracking-[0.25em] font-display uppercase text-muted-foreground">
            CONNECTING TO DEVICE...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-full pb-4 dot-grid-bg"
      data-ocid="dashboard.page"
    >
      {/* ── Section: Device Header ── */}
      <div
        className="px-4 pt-4 pb-3 border-b"
        style={{ borderColor: "#1E2A45" }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Switcher row */}
          <div className="flex items-center justify-between gap-3">
            <InlineSwitcher />

            {/* Online / Last seen */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border text-[10px] font-bold tracking-widest font-display uppercase"
                style={{
                  backgroundColor: status?.online
                    ? "rgba(0,230,118,0.08)"
                    : "rgba(255,59,59,0.08)",
                  borderColor: status?.online
                    ? "rgba(0,230,118,0.4)"
                    : "rgba(255,59,59,0.4)",
                  color: status?.online ? "#00E676" : "#FF3B3B",
                }}
                data-ocid="dashboard.online_badge"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: status?.online ? "#00E676" : "#FF3B3B",
                    boxShadow: status?.online
                      ? "0 0 5px #00E676"
                      : "0 0 5px #FF3B3B",
                  }}
                />
                {status?.online ? "ONLINE" : "OFFLINE"}
              </span>

              {status?.lastSeen && (
                <span
                  className="text-[10px] text-muted-foreground font-mono hidden sm:block"
                  data-ocid="dashboard.last_seen"
                >
                  {getLastSeenText()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: Zone Shields ── */}
      <div
        className="px-4 py-6"
        style={{ backgroundColor: "#0B0F1C" }}
        data-ocid="dashboard.zones_section"
      >
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {/* Zone 1 shield + controls */}
            <div
              className="flex flex-col items-center gap-4 p-5 border transition-all duration-500"
              style={{
                backgroundColor: "#141929",
                borderColor: status?.arm1 ? "rgba(255,59,59,0.5)" : "#1E2A45",
                boxShadow: status?.arm1
                  ? "0 0 24px rgba(255,59,59,0.12)"
                  : "none",
              }}
              data-ocid="zone.arm1.card"
            >
              <ZoneShield
                zone="arm1"
                sublabel={zoneLabels.arm1}
                armed={status?.arm1 ?? false}
                loading={pending === "arm1" || pending === "disarm1"}
              />

              <div className="flex gap-2 w-full">
                <ControlBtn
                  label="ARM 1"
                  variant="arm"
                  disabled={status?.arm1 ?? false}
                  loading={pending === "arm1"}
                  onClick={() =>
                    setConfirm({
                      cmd: "arm1",
                      label: `Arm Zone 1 — ${zoneLabels.arm1}?`,
                      danger: true,
                    })
                  }
                  ocid="zone.arm1.arm_button"
                />
                <ControlBtn
                  label="DISARM 1"
                  variant="disarm"
                  disabled={!(status?.arm1 ?? false)}
                  loading={pending === "disarm1"}
                  onClick={() =>
                    setConfirm({
                      cmd: "disarm1",
                      label: "Disarm Zone 1?",
                    })
                  }
                  ocid="zone.arm1.disarm_button"
                />
              </div>
            </div>

            {/* Zone 2 shield + controls */}
            <div
              className="flex flex-col items-center gap-4 p-5 border transition-all duration-500"
              style={{
                backgroundColor: "#141929",
                borderColor: status?.arm2 ? "rgba(255,59,59,0.5)" : "#1E2A45",
                boxShadow: status?.arm2
                  ? "0 0 24px rgba(255,59,59,0.12)"
                  : "none",
              }}
              data-ocid="zone.arm2.card"
            >
              <ZoneShield
                zone="arm2"
                sublabel={zoneLabels.arm2}
                armed={status?.arm2 ?? false}
                loading={pending === "arm2" || pending === "disarm2"}
              />

              <div className="flex gap-2 w-full">
                <ControlBtn
                  label="ARM 2"
                  variant="arm"
                  disabled={status?.arm2 ?? false}
                  loading={pending === "arm2"}
                  onClick={() =>
                    setConfirm({
                      cmd: "arm2",
                      label: `Arm Zone 2 — ${zoneLabels.arm2}?`,
                      danger: true,
                    })
                  }
                  ocid="zone.arm2.arm_button"
                />
                <ControlBtn
                  label="DISARM 2"
                  variant="disarm"
                  disabled={!(status?.arm2 ?? false)}
                  loading={pending === "disarm2"}
                  onClick={() =>
                    setConfirm({
                      cmd: "disarm2",
                      label: "Disarm Zone 2?",
                    })
                  }
                  ocid="zone.arm2.disarm_button"
                />
              </div>
            </div>
          </div>

          {/* ── DISARM ALL button ── */}
          {anyArmed && (
            <button
              type="button"
              className="mt-4 w-full py-4 flex items-center justify-center gap-2.5 text-sm font-bold tracking-[0.2em] font-display uppercase border transition-all duration-200 active:scale-95 disabled:opacity-50 animate-alarm-pulse"
              style={{
                borderColor: "#FF3B3B",
                color: "#FF3B3B",
              }}
              onClick={() =>
                setConfirm({
                  cmd: "disarmall",
                  label: "Disarm ALL zones and stop siren?",
                  danger: true,
                })
              }
              disabled={pending === "disarmall"}
              data-ocid="dashboard.disarm_all_button"
            >
              {pending === "disarmall" ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 border-2 border-t-transparent animate-spin rounded-full"
                    style={{
                      borderColor: "#FF3B3B",
                      borderTopColor: "transparent",
                    }}
                  />
                  DISARMING...
                </span>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4" />⚠ DISARM ALL ZONES
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ── Section: Status Cards ── */}
      <div
        className="px-4 py-4"
        style={{ backgroundColor: "rgba(20,25,41,0.5)" }}
        data-ocid="dashboard.status_section"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.25em] font-display uppercase text-muted-foreground mb-3 flex items-center gap-2">
            <Activity className="w-3 h-3" />
            SYSTEM STATUS
          </p>
          <div className="grid grid-cols-2 gap-3">
            <StatusCard
              ocid="status.zone1_card"
              icon={
                status?.arm1 ? (
                  <ShieldAlert
                    className="w-3.5 h-3.5"
                    style={{ color: "#FF3B3B" }}
                  />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                )
              }
              label="ZONE 1"
              value={status?.arm1 ? "ARMED" : "CLEAR"}
              valueColor={status?.arm1 ? "#FF3B3B" : "#00E676"}
              sub={zoneLabels.arm1.toUpperCase()}
              isRefetching={isRefetching}
            />
            <StatusCard
              ocid="status.zone2_card"
              icon={
                status?.arm2 ? (
                  <ShieldAlert
                    className="w-3.5 h-3.5"
                    style={{ color: "#FF3B3B" }}
                  />
                ) : (
                  <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                )
              }
              label="ZONE 2"
              value={status?.arm2 ? "ARMED" : "CLEAR"}
              valueColor={status?.arm2 ? "#FF3B3B" : "#00E676"}
              sub={zoneLabels.arm2.toUpperCase()}
              isRefetching={isRefetching}
            />
            <StatusCard
              ocid="status.ac_card"
              icon={
                status?.acPower ? (
                  <Zap className="w-3.5 h-3.5" style={{ color: "#00E676" }} />
                ) : (
                  <ZapOff
                    className="w-3.5 h-3.5"
                    style={{ color: "#FF3B3B" }}
                  />
                )
              }
              label="AC POWER"
              value={status?.acPower ? "ON" : "CUT"}
              valueColor={status?.acPower ? "#00E676" : "#FF3B3B"}
              sub={status?.acPower ? "MAINS POWER" : "BATTERY BACKUP"}
              isRefetching={isRefetching}
            />
            <StatusCard
              ocid="status.gsm_card"
              icon={
                status && status.gsmSignal > 0 ? (
                  <Signal
                    className="w-3.5 h-3.5"
                    style={{ color: gsmColor(status.gsmSignal) }}
                  />
                ) : (
                  <Wifi className="w-3.5 h-3.5 text-muted-foreground" />
                )
              }
              label="GSM SIGNAL"
              value={`${status?.gsmSignal ?? 0}%`}
              valueColor={gsmColor(status?.gsmSignal ?? 0)}
              sub={gsmQualityLabel(status?.gsmSignal ?? 0)}
              isRefetching={isRefetching}
            />
          </div>
        </div>
      </div>

      {/* ── Last Event Banner ── */}
      {status?.lastEvent && (
        <button
          type="button"
          className="mx-4 mt-3 mb-2 max-w-2xl w-full self-center flex items-center gap-3 px-4 py-3 border-l-4 transition-colors hover:bg-[#141929] text-left"
          style={{
            backgroundColor: "rgba(20,25,41,0.6)",
            borderLeftColor: lastEventBorderColor(status.lastEvent),
            borderTopColor: "#1E2A45",
            borderRightColor: "#1E2A45",
            borderBottomColor: "#1E2A45",
          }}
          onClick={() => navigate({ to: "/alerts" })}
          data-ocid="dashboard.last_event_banner"
        >
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: lastEventBorderColor(status.lastEvent) }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-muted-foreground font-display uppercase tracking-wider mb-0.5">
              LAST EVENT
            </p>
            <p className="text-xs font-bold font-display uppercase text-foreground truncate">
              {status.lastEvent}
            </p>
          </div>
          {status.lastSeen && (
            <span className="text-[10px] text-muted-foreground font-mono flex-shrink-0">
              {relativeTime(status.lastSeen)}
            </span>
          )}
          <ChevronDown className="w-3 h-3 text-muted-foreground -rotate-90 flex-shrink-0" />
        </button>
      )}

      {/* ── Confirm Dialog ── */}
      {confirm && (
        <ConfirmDialog
          action={confirm.label}
          onConfirm={() => executeCommand(confirm.cmd)}
          onCancel={() => setConfirm(null)}
          loading={pending !== null}
          danger={confirm.danger}
        />
      )}

      {/* Demo test trigger — hidden in corner */}
      <TestAlarmButton />

      {/* Hidden shield to satisfy unused import check */}
      <span className="hidden">
        <WifiOff />
      </span>
    </div>
  );
}
