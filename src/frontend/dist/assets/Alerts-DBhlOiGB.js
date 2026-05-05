import { e as useAuthGuard, a as useRakshakStore, r as reactExports, k as MOCK_LOGS, j as jsxRuntimeExports } from "./index-BVgOhRLP.js";
import { S as ShieldAlert } from "./shield-alert-mDB-I6Um.js";
const PAGE_SIZE = 20;
const FILTERS = [
  { key: "ALL", label: "ALL" },
  { key: "ALARMS", label: "ALARMS" },
  { key: "ARM_EVENTS", label: "ARM EVENTS" },
  { key: "POWER", label: "POWER" },
  { key: "SYSTEM", label: "SYSTEM" }
];
const BORDER_COLOR = {
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
  device_offline: "#FF3B3B"
};
const EVENT_EMOJI = {
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
  device_offline: "📡"
};
const EVENT_LABEL = {
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
  device_offline: "DEVICE OFFLINE"
};
const SOURCE_LABEL = {
  APP: "via App",
  REMOTE: "via Remote",
  SCREEN: "via Screen",
  SMS: "via SMS",
  DEVICE: "via Device"
};
function formatRelTime(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 6e4);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}
function filterLogs(logs, filter) {
  switch (filter) {
    case "ALL":
      return logs;
    case "ALARMS":
      return logs.filter((l) => l.type === "alarm" || l.type === "sos");
    case "ARM_EVENTS":
      return logs.filter(
        (l) => [
          "arm1_activated",
          "arm2_activated",
          "arm1_disarmed",
          "arm2_disarmed",
          "disarmed_all"
        ].includes(l.type)
      );
    case "POWER":
      return logs.filter(
        (l) => l.type === "ac_cut" || l.type === "ac_restored"
      );
    case "SYSTEM":
      return logs.filter(
        (l) => l.type === "device_online" || l.type === "device_offline"
      );
    default:
      return logs;
  }
}
function AlertItem({ log, index, isExpanded, onToggle }) {
  const borderColor = BORDER_COLOR[log.type];
  const emoji = EVENT_EMOJI[log.type];
  const label = EVENT_LABEL[log.type];
  const sourceLabel = SOURCE_LABEL[log.source];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "w-full text-left transition-colors",
      style: {
        backgroundColor: "#141929",
        borderBottom: "1px solid #1E2A45",
        borderLeft: `4px solid ${borderColor}`
      },
      onClick: onToggle,
      "data-ocid": `alerts.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-4 py-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base mt-0.5",
            style: { backgroundColor: `${borderColor}20` },
            "aria-hidden": "true",
            children: emoji
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-bold tracking-widest font-display uppercase leading-none",
                style: { color: borderColor },
                children: label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono flex-shrink-0", children: formatRelTime(log.timestamp) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-1 leading-snug", children: log.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] px-1.5 py-0.5 font-mono",
              style: {
                color: "#8899bb",
                backgroundColor: "#1E2A45",
                borderRadius: "2px"
              },
              children: sourceLabel
            }
          ) }),
          isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-3 pt-3 space-y-2",
              style: { borderTop: "1px solid #1E2A45" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground font-mono", children: new Date(log.timestamp).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground", children: "ZONE SNAPSHOT:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[10px] font-bold font-mono tracking-wider",
                      style: { color: log.arm1 ? "#FF3B3B" : "#00E676" },
                      children: [
                        "Z1:",
                        log.arm1 ? "ARMED" : "SAFE"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[10px] font-bold font-mono tracking-wider",
                      style: { color: log.arm2 ? "#FF3B3B" : "#00E676" },
                      children: [
                        "Z2:",
                        log.arm2 ? "ARMED" : "SAFE"
                      ]
                    }
                  )
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-shrink-0 text-muted-foreground mt-1 transition-transform duration-200",
            style: { transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" },
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Expand" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M2 4L6 8L10 4",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                ]
              }
            )
          }
        )
      ] })
    }
  );
}
function AlertsPage() {
  useAuthGuard();
  const clearUnread = useRakshakStore((s) => s.clearUnread);
  const storeLogs = useRakshakStore((s) => s.logs);
  const [filter, setFilter] = reactExports.useState("ALL");
  const [expanded, setExpanded] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const allLogs = reactExports.useMemo(() => {
    const merged = [...storeLogs, ...MOCK_LOGS];
    const seen = /* @__PURE__ */ new Set();
    return merged.filter((l) => {
      if (seen.has(l.id)) return false;
      seen.add(l.id);
      return true;
    });
  }, [storeLogs]);
  const filtered = reactExports.useMemo(
    () => filterLogs(allLogs, filter),
    [allLogs, filter]
  );
  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;
  reactExports.useEffect(() => {
    setPage(1);
    setExpanded(null);
  }, [filter]);
  reactExports.useEffect(() => {
    clearUnread();
  }, [clearUnread]);
  function handleToggle(id) {
    setExpanded((prev) => prev === id ? null : id);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", "data-ocid": "alerts.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-5 pb-4", style: { backgroundColor: "#0B0F1C" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-xl font-bold font-display tracking-widest uppercase",
          style: { color: "#00A3FF" },
          children: "ALERT LOG"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "All events from your Rakshak devices" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex border-b sticky top-0 z-10 overflow-x-auto",
        style: { borderColor: "#1E2A45", backgroundColor: "#141929" },
        "data-ocid": "alerts.filter_tabs",
        children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "flex-shrink-0 px-4 py-3 text-[10px] font-bold tracking-widest font-display uppercase transition-colors whitespace-nowrap",
            style: {
              color: filter === f.key ? "#00A3FF" : "#8899bb",
              borderBottom: filter === f.key ? "2px solid #00A3FF" : "2px solid transparent"
            },
            onClick: () => setFilter(f.key),
            "data-ocid": `alerts.filter.${f.key.toLowerCase()}`,
            children: f.label
          },
          f.key
        ))
      }
    ),
    visible.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-20 gap-4",
        "data-ocid": "alerts.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-14 h-14 rounded-full flex items-center justify-center",
              style: { backgroundColor: "#1E2A45" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-7 h-7", style: { color: "#8899bb" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm font-bold tracking-widest font-display uppercase",
                style: { color: "#8899bb" },
                children: "NO EVENTS FOUND"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "No",
              " ",
              filter === "ALL" ? "" : filter.replace("_", " ").toLowerCase(),
              " ",
              "events recorded yet"
            ] })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      visible.map((log, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        AlertItem,
        {
          log,
          index: idx + 1,
          isExpanded: expanded === log.id,
          onToggle: () => handleToggle(log.id)
        },
        log.id
      )),
      hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "px-6 py-2.5 text-[10px] font-bold tracking-widest font-display uppercase transition-colors ripple-tap",
          style: {
            backgroundColor: "#1E2A45",
            color: "#00A3FF",
            border: "1px solid #1E2A45"
          },
          onClick: () => setPage((p) => p + 1),
          "data-ocid": "alerts.load_more_button",
          children: [
            "LOAD MORE — ",
            filtered.length - visible.length,
            " REMAINING"
          ]
        }
      ) }),
      !hasMore && filtered.length > PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-px flex-1 max-w-16",
            style: { backgroundColor: "#1E2A45" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground tracking-wider", children: "END OF LOG" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-px flex-1 max-w-16",
            style: { backgroundColor: "#1E2A45" }
          }
        )
      ] })
    ] })
  ] });
}
export {
  AlertsPage
};
