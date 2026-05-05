import { MOCK_LOGS } from "@/api/mockData";
import { useAuthGuard } from "@/hooks/useRakshak";
import { useRakshakStore } from "@/store/useRakshakStore";
import type { LogEntry, LogEventType, LogSource } from "@/types";
import { ShieldAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

const FILTERS = [
  { key: "ALL", label: "ALL" },
  { key: "ALARMS", label: "ALARMS" },
  { key: "ARM_EVENTS", label: "ARM EVENTS" },
  { key: "POWER", label: "POWER" },
  { key: "SYSTEM", label: "SYSTEM" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const BORDER_COLOR: Record<LogEventType, string> = {
  alarm: "#FF3B3B",
  sos: "#FF3B3B",
  arm1_activated: "#FF3B3B",
  arm2_activated: "#FF3B3B",
  arm1_disarmed: "#00E676",
  arm2_disarmed: "#00E676",
  disarmed_all: "#00E676",
  ac_cut: "#FFA500",
  ac_restored: "#00E676",
  device_online: "#00A3FF",
  device_offline: "#FF3B3B",
};

const EVENT_EMOJI: Record<LogEventType, string> = {
  alarm: "🚨",
  sos: "🆘",
  arm1_activated: "🔒",
  arm2_activated: "🔒",
  arm1_disarmed: "🔓",
  arm2_disarmed: "🔓",
  disarmed_all: "🔓",
  ac_cut: "⚡",
  ac_restored: "⚡",
  device_online: "📡",
  device_offline: "📡",
};

const EVENT_LABEL: Record<LogEventType, string> = {
  alarm: "SENSOR ALARM",
  sos: "SOS ALERT",
  arm1_activated: "ZONE 1 ARMED",
  arm2_activated: "ZONE 2 ARMED",
  arm1_disarmed: "ZONE 1 DISARMED",
  arm2_disarmed: "ZONE 2 DISARMED",
  disarmed_all: "ALL ZONES DISARMED",
  ac_cut: "AC POWER CUT",
  ac_restored: "AC RESTORED",
  device_online: "DEVICE ONLINE",
  device_offline: "DEVICE OFFLINE",
};

const SOURCE_LABEL: Record<LogSource, string> = {
  APP: "via App",
  REMOTE: "via Remote",
  SCREEN: "via Screen",
  SMS: "via SMS",
  DEVICE: "via Device",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

function filterLogs(logs: LogEntry[], filter: FilterKey): LogEntry[] {
  switch (filter) {
    case "ALL":
      return logs;
    case "ALARMS":
      return logs.filter((l) => l.type === "alarm" || l.type === "sos");
    case "ARM_EVENTS":
      return logs.filter((l) =>
        [
          "arm1_activated",
          "arm2_activated",
          "arm1_disarmed",
          "arm2_disarmed",
          "disarmed_all",
        ].includes(l.type),
      );
    case "POWER":
      return logs.filter(
        (l) => l.type === "ac_cut" || l.type === "ac_restored",
      );
    case "SYSTEM":
      return logs.filter(
        (l) => l.type === "device_online" || l.type === "device_offline",
      );
    default:
      return logs;
  }
}

// ─── AlertItem Component ──────────────────────────────────────────────────────

interface AlertItemProps {
  log: LogEntry;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function AlertItem({ log, index, isExpanded, onToggle }: AlertItemProps) {
  const borderColor = BORDER_COLOR[log.type];
  const emoji = EVENT_EMOJI[log.type];
  const label = EVENT_LABEL[log.type];
  const sourceLabel = SOURCE_LABEL[log.source];

  return (
    <button
      type="button"
      className="w-full text-left transition-colors"
      style={{
        backgroundColor: "#141929",
        borderBottom: "1px solid #1E2A45",
        borderLeft: `4px solid ${borderColor}`,
      }}
      onClick={onToggle}
      data-ocid={`alerts.item.${index}`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base mt-0.5"
          style={{ backgroundColor: `${borderColor}20` }}
          aria-hidden="true"
        >
          {emoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span
              className="text-[10px] font-bold tracking-widest font-display uppercase leading-none"
              style={{ color: borderColor }}
            >
              {label}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono flex-shrink-0">
              {formatRelTime(log.timestamp)}
            </span>
          </div>

          <p className="text-sm text-foreground mt-1 leading-snug">
            {log.message}
          </p>

          {/* Source badge */}
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="text-[10px] px-1.5 py-0.5 font-mono"
              style={{
                color: "#8899bb",
                backgroundColor: "#1E2A45",
                borderRadius: "2px",
              }}
            >
              {sourceLabel}
            </span>
          </div>

          {/* Expanded detail */}
          {isExpanded && (
            <div
              className="mt-3 pt-3 space-y-2"
              style={{ borderTop: "1px solid #1E2A45" }}
            >
              <p className="text-[11px] text-muted-foreground font-mono">
                {new Date(log.timestamp).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground">
                  ZONE SNAPSHOT:
                </span>
                <span
                  className="text-[10px] font-bold font-mono tracking-wider"
                  style={{ color: log.arm1 ? "#FF3B3B" : "#00E676" }}
                >
                  Z1:{log.arm1 ? "ARMED" : "SAFE"}
                </span>
                <span
                  className="text-[10px] font-bold font-mono tracking-wider"
                  style={{ color: log.arm2 ? "#FF3B3B" : "#00E676" }}
                >
                  Z2:{log.arm2 ? "ARMED" : "SAFE"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Expand chevron */}
        <div
          className="flex-shrink-0 text-muted-foreground mt-1 transition-transform duration-200"
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <title>Expand</title>
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ─── AlertsPage ───────────────────────────────────────────────────────────────

export function AlertsPage() {
  useAuthGuard();
  const clearUnread = useRakshakStore((s) => s.clearUnread);
  const storeLogs = useRakshakStore((s) => s.logs);

  const [filter, setFilter] = useState<FilterKey>("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Merge store logs with mock data, deduplicate by id
  const allLogs = useMemo(() => {
    const merged = [...storeLogs, ...MOCK_LOGS];
    const seen = new Set<string>();
    return merged.filter((l) => {
      if (seen.has(l.id)) return false;
      seen.add(l.id);
      return true;
    });
  }, [storeLogs]);

  const filtered = useMemo(
    () => filterLogs(allLogs, filter),
    [allLogs, filter],
  );

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  // Reset page when filter changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    setPage(1);
    setExpanded(null);
  }, [filter]);

  // Clear unread on mount
  useEffect(() => {
    clearUnread();
  }, [clearUnread]);

  function handleToggle(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  return (
    <div className="max-w-2xl mx-auto" data-ocid="alerts.page">
      {/* Page header */}
      <div className="px-4 pt-5 pb-4" style={{ backgroundColor: "#0B0F1C" }}>
        <h1
          className="text-xl font-bold font-display tracking-widest uppercase"
          style={{ color: "#00A3FF" }}
        >
          ALERT LOG
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          All events from your Rakshak devices
        </p>
      </div>

      {/* Filter tabs */}
      <div
        className="flex border-b sticky top-0 z-10 overflow-x-auto"
        style={{ borderColor: "#1E2A45", backgroundColor: "#141929" }}
        data-ocid="alerts.filter_tabs"
      >
        {FILTERS.map((f) => (
          <button
            type="button"
            key={f.key}
            className="flex-shrink-0 px-4 py-3 text-[10px] font-bold tracking-widest font-display uppercase transition-colors whitespace-nowrap"
            style={{
              color: filter === f.key ? "#00A3FF" : "#8899bb",
              borderBottom:
                filter === f.key
                  ? "2px solid #00A3FF"
                  : "2px solid transparent",
            }}
            onClick={() => setFilter(f.key)}
            data-ocid={`alerts.filter.${f.key.toLowerCase()}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Event list */}
      {visible.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4"
          data-ocid="alerts.empty_state"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1E2A45" }}
          >
            <ShieldAlert className="w-7 h-7" style={{ color: "#8899bb" }} />
          </div>
          <div className="text-center">
            <p
              className="text-sm font-bold tracking-widest font-display uppercase"
              style={{ color: "#8899bb" }}
            >
              NO EVENTS FOUND
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              No{" "}
              {filter === "ALL" ? "" : filter.replace("_", " ").toLowerCase()}{" "}
              events recorded yet
            </p>
          </div>
        </div>
      ) : (
        <div>
          {visible.map((log, idx) => (
            <AlertItem
              key={log.id}
              log={log}
              index={idx + 1}
              isExpanded={expanded === log.id}
              onToggle={() => handleToggle(log.id)}
            />
          ))}

          {/* Load More */}
          {hasMore && (
            <div className="p-4 flex justify-center">
              <button
                type="button"
                className="px-6 py-2.5 text-[10px] font-bold tracking-widest font-display uppercase transition-colors ripple-tap"
                style={{
                  backgroundColor: "#1E2A45",
                  color: "#00A3FF",
                  border: "1px solid #1E2A45",
                }}
                onClick={() => setPage((p) => p + 1)}
                data-ocid="alerts.load_more_button"
              >
                LOAD MORE — {filtered.length - visible.length} REMAINING
              </button>
            </div>
          )}

          {/* End of list */}
          {!hasMore && filtered.length > PAGE_SIZE && (
            <div className="py-6 flex items-center justify-center gap-3">
              <div
                className="h-px flex-1 max-w-16"
                style={{ backgroundColor: "#1E2A45" }}
              />
              <p className="text-[10px] font-mono text-muted-foreground tracking-wider">
                END OF LOG
              </p>
              <div
                className="h-px flex-1 max-w-16"
                style={{ backgroundColor: "#1E2A45" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
