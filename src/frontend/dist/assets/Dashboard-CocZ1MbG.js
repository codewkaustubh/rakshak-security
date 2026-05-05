import { c as createLucideIcon, e as useAuthGuard, u as useNavigate, a as useRakshakStore, f as useDeviceStatus, r as reactExports, j as jsxRuntimeExports, S as Shield, h as ChevronDown, s as sendCommand, i as useAlarm } from "./index-BVgOhRLP.js";
import { S as ShieldAlert } from "./shield-alert-mDB-I6Um.js";
import { Z as Zap } from "./zap-Dbl1kj5q.js";
import { W as Wifi } from "./wifi-ozb9e_Jq.js";
import { S as ShieldCheck } from "./shield-check-BIveGXso.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M2 20h.01", key: "4haj6o" }],
  ["path", { d: "M7 20v-4", key: "j294jx" }],
  ["path", { d: "M12 20v-8", key: "i3yub9" }],
  ["path", { d: "M17 20V8", key: "1tkaf5" }],
  ["path", { d: "M22 4v16", key: "sih9yq" }]
];
const Signal = createLucideIcon("signal", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const WifiOff = createLucideIcon("wifi-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10.513 4.856 13.12 2.17a.5.5 0 0 1 .86.46l-1.377 4.317", key: "193nxd" }],
  ["path", { d: "M15.656 10H20a1 1 0 0 1 .78 1.63l-1.72 1.773", key: "27a7lr" }],
  [
    "path",
    {
      d: "M16.273 16.273 10.88 21.83a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14H4a1 1 0 0 1-.78-1.63l4.507-4.643",
      key: "1e0qe9"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const ZapOff = createLucideIcon("zap-off", __iconNode);
function TestAlarmButton() {
  const { triggerAlarm } = useAlarm();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed bottom-20 right-4 z-50 md:bottom-4",
      "data-ocid": "dashboard.test_alarm_button",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "text-[9px] font-bold tracking-widest font-display uppercase px-2 py-1 opacity-30 hover:opacity-70 transition-opacity",
          style: {
            border: "1px solid #1E2A45",
            color: "#FF3B3B",
            backgroundColor: "#141929"
          },
          onClick: () => triggerAlarm({
            type: "SENSOR_ALARM",
            message: "Sensor 3 Triggered — Motion Detector",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            source: "DEVICE"
          }),
          children: "TEST ALARM"
        }
      )
    }
  );
}
function relativeTime(isoStr) {
  const diffMs = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diffMs / 6e4);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
function gsmColor(signal) {
  if (signal > 70) return "#00E676";
  if (signal >= 40) return "#FFA500";
  return "#FF3B3B";
}
function gsmQualityLabel(signal) {
  if (signal > 70) return "EXCELLENT";
  if (signal >= 40) return "FAIR";
  return "POOR";
}
function lastEventBorderColor(event) {
  const e = event.toUpperCase();
  if (e.includes("ALARM") || e.includes("SOS") || e.includes("INTRUDE"))
    return "#FF3B3B";
  if (e.includes("DISARM")) return "#00E676";
  if (e.includes("ARM")) return "#FF3B3B";
  if (e.includes("AC") || e.includes("POWER")) return "#FFA500";
  return "#00A3FF";
}
function ConfirmDialog({
  action,
  onConfirm,
  onCancel,
  loading,
  danger
}) {
  const backdropRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [loading, onCancel]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: backdropRef,
      className: "fixed inset-0 z-50 flex items-center justify-center px-4",
      style: { backgroundColor: "rgba(11,15,28,0.92)" },
      onClick: (e) => {
        if (e.target === backdropRef.current && !loading) onCancel();
      },
      onKeyDown: (e) => {
        if (e.key === "Escape" && !loading) onCancel();
      },
      "aria-modal": "true",
      "data-ocid": "confirm.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-sm border slide-up",
          style: {
            backgroundColor: "#141929",
            borderColor: danger ? "#FF3B3B" : "#1E2A45"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-5 py-3 border-b flex items-center gap-2",
                style: { borderColor: danger ? "rgba(255,59,59,0.3)" : "#1E2A45" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TriangleAlert,
                    {
                      className: "w-4 h-4 flex-shrink-0",
                      style: { color: danger ? "#FF3B3B" : "#FFA500" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold tracking-widest font-display uppercase text-foreground", children: "CONFIRM ACTION" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: action }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "flex-1 py-3 text-xs font-bold tracking-widest font-display uppercase border transition-colors hover:bg-[#1E2A45]",
                  style: { borderColor: "#1E2A45", color: "#6b7a9a" },
                  onClick: onCancel,
                  disabled: loading,
                  "data-ocid": "confirm.cancel_button",
                  children: "CANCEL"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "flex-1 py-3 text-xs font-bold tracking-widest font-display uppercase transition-all active:scale-95 disabled:opacity-60",
                  style: {
                    backgroundColor: danger ? "#FF3B3B" : "#00A3FF",
                    color: "#0B0F1C"
                  },
                  onClick: onConfirm,
                  disabled: loading,
                  "data-ocid": "confirm.confirm_button",
                  children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-3.5 h-3.5 border-2 border-t-transparent animate-spin rounded-full",
                        style: {
                          borderColor: "#0B0F1C",
                          borderTopColor: "transparent"
                        }
                      }
                    ),
                    "SENDING..."
                  ] }) : "CONFIRM"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function ZoneShield({
  zone,
  sublabel,
  armed,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center gap-3 transition-all duration-500",
      "data-ocid": `zone.${zone}.shield`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative flex items-center justify-center",
            style: { width: 108, height: 108 },
            children: [
              armed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute inset-0 rounded-full glow-pulse-red",
                  style: {
                    border: "2px solid #FF3B3B",
                    borderRadius: "50%",
                    animation: "glow-pulse-red 1.2s cubic-bezier(0.4,0,0.6,1) infinite"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  style: {
                    backgroundColor: armed ? "rgba(255,59,59,0.12)" : "rgba(30,42,69,0.6)",
                    borderColor: armed ? "#FF3B3B" : "#1E2A45",
                    boxShadow: armed ? "0 0 28px rgba(255,59,59,0.25), inset 0 0 16px rgba(255,59,59,0.08)" : "none"
                  },
                  children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-10 h-10 border-2 border-t-transparent animate-spin rounded-full",
                      style: {
                        borderColor: armed ? "#FF3B3B" : "#00A3FF",
                        borderTopColor: "transparent"
                      }
                    }
                  ) : armed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ShieldAlert,
                    {
                      className: "w-11 h-11 transition-all duration-300",
                      style: { color: "#FF3B3B" }
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ShieldOff,
                    {
                      className: "w-11 h-11 transition-all duration-300",
                      style: { color: "#344060" }
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-[10px] font-bold tracking-[0.2em] font-display uppercase mb-0.5",
              style: { color: "#4a5878" },
              children: zone === "arm1" ? "ZONE 1" : "ZONE 2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-bold tracking-[0.15em] font-display uppercase transition-colors duration-300",
              style: { color: armed ? "#FF3B3B" : "#00E676" },
              children: armed ? `${zone === "arm1" ? "ARM 1" : "ARM 2"} — ARMED` : `${zone === "arm1" ? "ARM 1" : "ARM 2"} — DISARMED`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 tracking-wider font-display uppercase", children: sublabel })
        ] })
      ]
    }
  );
}
function ControlBtn({
  label,
  variant,
  onClick,
  disabled,
  loading,
  ocid
}) {
  const isArm = variant === "arm";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      className: "flex-1 flex items-center justify-center gap-2 py-3.5 text-[11px] font-bold tracking-widest font-display uppercase border transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed",
      style: {
        backgroundColor: disabled ? "transparent" : isArm ? "#FF3B3B" : "transparent",
        borderColor: disabled ? "#1E2A45" : isArm ? "#FF3B3B" : "#00E676",
        color: disabled ? "#344060" : isArm ? "#fff" : "#00E676"
      },
      onClick,
      disabled: disabled || loading,
      "data-ocid": ocid,
      children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-3.5 h-3.5 border-2 border-t-transparent animate-spin rounded-full",
            style: {
              borderColor: isArm ? "#fff" : "#00E676",
              borderTopColor: "transparent"
            }
          }
        ) : isArm ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
        label
      ]
    }
  );
}
function StatusCard({
  ocid,
  icon,
  label,
  value,
  valueColor,
  sub,
  isRefetching
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 border transition-all duration-300 relative overflow-hidden",
      style: {
        backgroundColor: "#141929",
        borderColor: isRefetching ? "#00A3FF" : "#1E2A45",
        boxShadow: isRefetching ? "0 0 0 1px rgba(0,163,255,0.3)" : "none"
      },
      "data-ocid": ocid,
      children: [
        isRefetching && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute top-0 left-0 right-0 h-[2px] animate-pulse",
            style: { backgroundColor: "#00A3FF" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
          icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm font-bold font-display uppercase leading-none",
            style: { color: valueColor },
            children: value
          }
        ),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono mt-1 tracking-wider", children: sub })
      ]
    }
  );
}
function InlineSwitcher() {
  const [open, setOpen] = reactExports.useState(false);
  const devices = useRakshakStore((s) => s.devices);
  const activeDeviceId = useRakshakStore((s) => s.activeDeviceId);
  const setActiveDevice = useRakshakStore((s) => s.setActiveDevice);
  const status = useRakshakStore((s) => s.status);
  const ref = reactExports.useRef(null);
  const active = devices.find((d) => d.deviceId === activeDeviceId);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref, "data-ocid": "dashboard.device_switcher", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "flex items-center gap-2 px-3 py-1.5 border transition-colors hover:bg-[#1a2035]",
        style: { backgroundColor: "#141929", borderColor: "#1E2A45" },
        onClick: () => setOpen((o) => !o),
        "data-ocid": "dashboard.device_switcher_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-2 h-2 rounded-full flex-shrink-0",
              style: {
                backgroundColor: (status == null ? void 0 : status.online) ? "#00E676" : "#FF3B3B",
                boxShadow: (status == null ? void 0 : status.online) ? "0 0 6px #00E676" : "none"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-[0.15em] font-display uppercase text-foreground", children: (active == null ? void 0 : active.name) ?? "No Device" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono", children: activeDeviceId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-full mt-1 left-0 min-w-[220px] border z-50 slide-up",
        style: { backgroundColor: "#141929", borderColor: "#1E2A45" },
        "data-ocid": "dashboard.device_dropdown",
        children: devices.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `w-full flex items-center gap-2.5 px-3 py-2.5 text-xs transition-colors hover:bg-[#1E2A45] ${d.deviceId === activeDeviceId ? "text-[#00A3FF]" : "text-foreground"}`,
            onClick: () => {
              setActiveDevice(d.deviceId);
              setOpen(false);
            },
            "data-ocid": `dashboard.device_option.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                  style: { backgroundColor: d.online ? "#00E676" : "#FF3B3B" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold tracking-wider font-display uppercase", children: d.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-muted-foreground font-mono text-[10px]", children: d.deviceId })
            ]
          },
          d.deviceId
        ))
      }
    )
  ] });
}
function DashboardPage() {
  useAuthGuard();
  const navigate = useNavigate();
  const activeDeviceId = useRakshakStore((s) => s.activeDeviceId);
  const { status, isLoading } = useDeviceStatus(activeDeviceId);
  const lastPoll = useRakshakStore((s) => s.lastPoll);
  const addToast = useRakshakStore((s) => s.addToast);
  const zoneLabels = useRakshakStore((s) => s.zoneLabels);
  const [isFirstLoad, setIsFirstLoad] = reactExports.useState(true);
  const [isRefetching, setIsRefetching] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isLoading && isFirstLoad && status) {
      setIsFirstLoad(false);
    }
  }, [isLoading, isFirstLoad, status]);
  reactExports.useEffect(() => {
    if (!isFirstLoad && isLoading) {
      setIsRefetching(true);
    } else {
      const t = setTimeout(() => setIsRefetching(false), 400);
      return () => clearTimeout(t);
    }
  }, [isLoading, isFirstLoad]);
  const [pending, setPending] = reactExports.useState(null);
  const [confirm, setConfirm] = reactExports.useState(null);
  const executeCommand = async (cmd) => {
    if (!activeDeviceId) return;
    setPending(cmd);
    try {
      await sendCommand(activeDeviceId, cmd);
      addToast({ type: "success", message: "Command sent successfully" });
    } catch {
      addToast({
        type: "error",
        message: "Command failed — device may be offline"
      });
    } finally {
      setPending(null);
      setConfirm(null);
    }
  };
  const anyArmed = ((status == null ? void 0 : status.arm1) ?? false) || ((status == null ? void 0 : status.arm2) ?? false);
  const getLastSeenText = () => {
    if (!lastPoll) return "";
    const mins = Math.floor((Date.now() - lastPoll.getTime()) / 6e4);
    if (mins < 1) return "Just now";
    return `${mins}m ago`;
  };
  if (isFirstLoad && isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 flex items-center justify-center min-h-[60vh]",
        "data-ocid": "dashboard.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full border-2 border-t-transparent animate-spin",
              style: { borderColor: "#00A3FF", borderTopColor: "transparent" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold tracking-[0.25em] font-display uppercase text-muted-foreground", children: "CONNECTING TO DEVICE..." })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-full pb-4 dot-grid-bg",
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 pt-4 pb-3 border-b",
            style: { borderColor: "#1E2A45" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(InlineSwitcher, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1.5 px-2.5 py-1 border text-[10px] font-bold tracking-widest font-display uppercase",
                    style: {
                      backgroundColor: (status == null ? void 0 : status.online) ? "rgba(0,230,118,0.08)" : "rgba(255,59,59,0.08)",
                      borderColor: (status == null ? void 0 : status.online) ? "rgba(0,230,118,0.4)" : "rgba(255,59,59,0.4)",
                      color: (status == null ? void 0 : status.online) ? "#00E676" : "#FF3B3B"
                    },
                    "data-ocid": "dashboard.online_badge",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "w-1.5 h-1.5 rounded-full",
                          style: {
                            backgroundColor: (status == null ? void 0 : status.online) ? "#00E676" : "#FF3B3B",
                            boxShadow: (status == null ? void 0 : status.online) ? "0 0 5px #00E676" : "0 0 5px #FF3B3B"
                          }
                        }
                      ),
                      (status == null ? void 0 : status.online) ? "ONLINE" : "OFFLINE"
                    ]
                  }
                ),
                (status == null ? void 0 : status.lastSeen) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] text-muted-foreground font-mono hidden sm:block",
                    "data-ocid": "dashboard.last_seen",
                    children: getLastSeenText()
                  }
                )
              ] })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-6",
            style: { backgroundColor: "#0B0F1C" },
            "data-ocid": "dashboard.zones_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center gap-4 p-5 border transition-all duration-500",
                    style: {
                      backgroundColor: "#141929",
                      borderColor: (status == null ? void 0 : status.arm1) ? "rgba(255,59,59,0.5)" : "#1E2A45",
                      boxShadow: (status == null ? void 0 : status.arm1) ? "0 0 24px rgba(255,59,59,0.12)" : "none"
                    },
                    "data-ocid": "zone.arm1.card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ZoneShield,
                        {
                          zone: "arm1",
                          sublabel: zoneLabels.arm1,
                          armed: (status == null ? void 0 : status.arm1) ?? false,
                          loading: pending === "arm1" || pending === "disarm1"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ControlBtn,
                          {
                            label: "ARM 1",
                            variant: "arm",
                            disabled: (status == null ? void 0 : status.arm1) ?? false,
                            loading: pending === "arm1",
                            onClick: () => setConfirm({
                              cmd: "arm1",
                              label: `Arm Zone 1 — ${zoneLabels.arm1}?`,
                              danger: true
                            }),
                            ocid: "zone.arm1.arm_button"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ControlBtn,
                          {
                            label: "DISARM 1",
                            variant: "disarm",
                            disabled: !((status == null ? void 0 : status.arm1) ?? false),
                            loading: pending === "disarm1",
                            onClick: () => setConfirm({
                              cmd: "disarm1",
                              label: "Disarm Zone 1?"
                            }),
                            ocid: "zone.arm1.disarm_button"
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center gap-4 p-5 border transition-all duration-500",
                    style: {
                      backgroundColor: "#141929",
                      borderColor: (status == null ? void 0 : status.arm2) ? "rgba(255,59,59,0.5)" : "#1E2A45",
                      boxShadow: (status == null ? void 0 : status.arm2) ? "0 0 24px rgba(255,59,59,0.12)" : "none"
                    },
                    "data-ocid": "zone.arm2.card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ZoneShield,
                        {
                          zone: "arm2",
                          sublabel: zoneLabels.arm2,
                          armed: (status == null ? void 0 : status.arm2) ?? false,
                          loading: pending === "arm2" || pending === "disarm2"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 w-full", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ControlBtn,
                          {
                            label: "ARM 2",
                            variant: "arm",
                            disabled: (status == null ? void 0 : status.arm2) ?? false,
                            loading: pending === "arm2",
                            onClick: () => setConfirm({
                              cmd: "arm2",
                              label: `Arm Zone 2 — ${zoneLabels.arm2}?`,
                              danger: true
                            }),
                            ocid: "zone.arm2.arm_button"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ControlBtn,
                          {
                            label: "DISARM 2",
                            variant: "disarm",
                            disabled: !((status == null ? void 0 : status.arm2) ?? false),
                            loading: pending === "disarm2",
                            onClick: () => setConfirm({
                              cmd: "disarm2",
                              label: "Disarm Zone 2?"
                            }),
                            ocid: "zone.arm2.disarm_button"
                          }
                        )
                      ] })
                    ]
                  }
                )
              ] }),
              anyArmed && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "mt-4 w-full py-4 flex items-center justify-center gap-2.5 text-sm font-bold tracking-[0.2em] font-display uppercase border transition-all duration-200 active:scale-95 disabled:opacity-50 animate-alarm-pulse",
                  style: {
                    borderColor: "#FF3B3B",
                    color: "#FF3B3B"
                  },
                  onClick: () => setConfirm({
                    cmd: "disarmall",
                    label: "Disarm ALL zones and stop siren?",
                    danger: true
                  }),
                  disabled: pending === "disarmall",
                  "data-ocid": "dashboard.disarm_all_button",
                  children: pending === "disarmall" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "w-4 h-4 border-2 border-t-transparent animate-spin rounded-full",
                        style: {
                          borderColor: "#FF3B3B",
                          borderTopColor: "transparent"
                        }
                      }
                    ),
                    "DISARMING..."
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }),
                    "⚠ DISARM ALL ZONES"
                  ] })
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-4 py-4",
            style: { backgroundColor: "rgba(20,25,41,0.5)" },
            "data-ocid": "dashboard.status_section",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold tracking-[0.25em] font-display uppercase text-muted-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3 h-3" }),
                "SYSTEM STATUS"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusCard,
                  {
                    ocid: "status.zone1_card",
                    icon: (status == null ? void 0 : status.arm1) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShieldAlert,
                      {
                        className: "w-3.5 h-3.5",
                        style: { color: "#FF3B3B" }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    label: "ZONE 1",
                    value: (status == null ? void 0 : status.arm1) ? "ARMED" : "CLEAR",
                    valueColor: (status == null ? void 0 : status.arm1) ? "#FF3B3B" : "#00E676",
                    sub: zoneLabels.arm1.toUpperCase(),
                    isRefetching
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusCard,
                  {
                    ocid: "status.zone2_card",
                    icon: (status == null ? void 0 : status.arm2) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShieldAlert,
                      {
                        className: "w-3.5 h-3.5",
                        style: { color: "#FF3B3B" }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    label: "ZONE 2",
                    value: (status == null ? void 0 : status.arm2) ? "ARMED" : "CLEAR",
                    valueColor: (status == null ? void 0 : status.arm2) ? "#FF3B3B" : "#00E676",
                    sub: zoneLabels.arm2.toUpperCase(),
                    isRefetching
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusCard,
                  {
                    ocid: "status.ac_card",
                    icon: (status == null ? void 0 : status.acPower) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5", style: { color: "#00E676" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ZapOff,
                      {
                        className: "w-3.5 h-3.5",
                        style: { color: "#FF3B3B" }
                      }
                    ),
                    label: "AC POWER",
                    value: (status == null ? void 0 : status.acPower) ? "ON" : "CUT",
                    valueColor: (status == null ? void 0 : status.acPower) ? "#00E676" : "#FF3B3B",
                    sub: (status == null ? void 0 : status.acPower) ? "MAINS POWER" : "BATTERY BACKUP",
                    isRefetching
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusCard,
                  {
                    ocid: "status.gsm_card",
                    icon: status && status.gsmSignal > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Signal,
                      {
                        className: "w-3.5 h-3.5",
                        style: { color: gsmColor(status.gsmSignal) }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    label: "GSM SIGNAL",
                    value: `${(status == null ? void 0 : status.gsmSignal) ?? 0}%`,
                    valueColor: gsmColor((status == null ? void 0 : status.gsmSignal) ?? 0),
                    sub: gsmQualityLabel((status == null ? void 0 : status.gsmSignal) ?? 0),
                    isRefetching
                  }
                )
              ] })
            ] })
          }
        ),
        (status == null ? void 0 : status.lastEvent) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "mx-4 mt-3 mb-2 max-w-2xl w-full self-center flex items-center gap-3 px-4 py-3 border-l-4 transition-colors hover:bg-[#141929] text-left",
            style: {
              backgroundColor: "rgba(20,25,41,0.6)",
              borderLeftColor: lastEventBorderColor(status.lastEvent),
              borderTopColor: "#1E2A45",
              borderRightColor: "#1E2A45",
              borderBottomColor: "#1E2A45"
            },
            onClick: () => navigate({ to: "/alerts" }),
            "data-ocid": "dashboard.last_event_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-1.5 h-1.5 rounded-full flex-shrink-0",
                  style: { backgroundColor: lastEventBorderColor(status.lastEvent) }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-display uppercase tracking-wider mb-0.5", children: "LAST EVENT" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold font-display uppercase text-foreground truncate", children: status.lastEvent })
              ] }),
              status.lastSeen && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono flex-shrink-0", children: relativeTime(status.lastSeen) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-muted-foreground -rotate-90 flex-shrink-0" })
            ]
          }
        ),
        confirm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfirmDialog,
          {
            action: confirm.label,
            onConfirm: () => executeCommand(confirm.cmd),
            onCancel: () => setConfirm(null),
            loading: pending !== null,
            danger: confirm.danger
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TestAlarmButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WifiOff, {}) })
      ]
    }
  );
}
export {
  DashboardPage
};
