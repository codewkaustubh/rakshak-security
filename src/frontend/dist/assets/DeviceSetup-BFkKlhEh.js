import { c as createLucideIcon, u as useNavigate, a as useRakshakStore, r as reactExports, j as jsxRuntimeExports, S as Shield, b as CircleCheck, p as pairDevice, g as getDevices, d as MOCK_DEVICES } from "./index-BVgOhRLP.js";
import { A as AnimatePresence, m as motion } from "./proxy-CIFgaEQY.js";
import { C as ChevronRight } from "./chevron-right-BIRGdOLx.js";
import { W as Wifi } from "./wifi-ozb9e_Jq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
const DEVICE_ID_PATTERN = /^RKSH-[A-Z0-9]{4}$/;
const NAME_SUGGESTIONS = ["Home", "Office", "Garage", "Warehouse", "Factory"];
const STEPS = [
  { id: 1, label: "ENTER DEVICE ID" },
  { id: 2, label: "NAME DEVICE" },
  { id: 3, label: "CONNECTING" }
];
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-0 w-full",
      "data-ocid": "setup.step_indicator",
      children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-7 h-7 flex items-center justify-center border-2 transition-all duration-300 text-[10px] font-bold font-display ${s.id < current ? "border-primary bg-primary text-primary-foreground" : s.id === current ? "border-primary bg-primary/15 text-primary" : "border-border/50 bg-transparent text-muted-foreground/50"}`,
              children: s.id < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : s.id
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-[8px] tracking-[0.25em] font-display font-bold hidden sm:block text-center ${s.id === current ? "text-primary" : "text-muted-foreground/50"}`,
              children: s.label
            }
          )
        ] }),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-px flex-1 transition-all duration-500 ${current > s.id ? "bg-primary" : "bg-border/40"}`
          }
        )
      ] }, s.id))
    }
  );
}
function ConnectingAnimation({ success }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32 flex items-center justify-center", children: [
      !success && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 rounded-full border-2 border-primary/30 animate-ping",
            style: { animationDuration: "1.5s" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-4 rounded-full border border-primary/20 animate-ping",
            style: { animationDuration: "2s", animationDelay: "0.3s" }
          }
        )
      ] }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 rounded-full border-2",
          style: { borderColor: "rgba(0,230,118,0.6)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${success ? "border-[#00E676] bg-[#00E676]/15" : "border-primary/50 bg-primary/10 glow-pulse"}`,
          children: success ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheck,
            {
              className: "w-10 h-10",
              style: {
                color: "#00E676",
                filter: "drop-shadow(0 0 12px rgba(0,230,118,0.7))"
              }
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Shield,
            {
              className: "w-10 h-10 text-primary",
              style: { filter: "drop-shadow(0 0 12px rgba(0,163,255,0.7))" },
              strokeWidth: 1.5
            }
          )
        }
      )
    ] }),
    success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xl font-black tracking-[0.25em] font-display",
          style: {
            color: "#00E676",
            textShadow: "0 0 20px rgba(0,230,118,0.5)"
          },
          children: "PAIRED SUCCESSFULLY"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Device is ready" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-4 h-4 text-primary animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold tracking-[0.3em] text-primary font-display", children: "CONNECTING..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Establishing secure link to device" })
    ] })
  ] });
}
function DeviceSetupPage() {
  const navigate = useNavigate();
  const { setDevices, setActiveDevice } = useRakshakStore();
  const [step, setStep] = reactExports.useState(1);
  const [deviceId, setDeviceId] = reactExports.useState("");
  const [name, setName] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [_connecting, setConnecting] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [pairedId, setPairedId] = reactExports.useState("");
  const [pairedName, setPairedName] = reactExports.useState("");
  const [idError, setIdError] = reactExports.useState("");
  const idInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    if (step === 1) (_a = idInputRef.current) == null ? void 0 : _a.focus();
  }, [step]);
  const isValidId = DEVICE_ID_PATTERN.test(deviceId);
  const handleIdChange = (v) => {
    const formatted = v.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    setDeviceId(formatted);
    if (idError) setIdError("");
  };
  const handleIdContinue = () => {
    if (!isValidId) {
      setIdError("INVALID FORMAT — MUST BE RKSH-XXXX");
      return;
    }
    setStep(2);
  };
  const handlePair = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setStep(3);
    setConnecting(true);
    try {
      await pairDevice(deviceId, name.trim());
      const devices = await getDevices();
      setDevices(devices);
      setActiveDevice(deviceId);
    } catch {
      setDevices(MOCK_DEVICES);
      setActiveDevice(deviceId);
    }
    setTimeout(() => {
      setConnecting(false);
      setSuccess(true);
      setPairedId(deviceId);
      setPairedName(name.trim());
      setLoading(false);
    }, 1400);
  };
  const handleSkip = () => {
    setDevices(MOCK_DEVICES);
    setActiveDevice(MOCK_DEVICES[0].deviceId);
    navigate({ to: "/dashboard" });
  };
  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 1) navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen dot-grid-bg flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden",
      "data-ocid": "setup.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/20 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-primary/20 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-primary/20 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-primary/20 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[420px] flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: step < 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              type: "button",
              onClick: goBack,
              className: "flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors tracking-wider font-mono self-start",
              "data-ocid": "setup.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
                step === 1 ? "BACK TO LOGIN" : "BACK"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4 },
              className: "flex flex-col gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary", strokeWidth: 1.5 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black tracking-[0.2em] text-primary font-display", children: "PAIR YOUR DEVICE" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Connect your Rakshak unit to cloud control" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.1 },
              className: "px-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.15 },
              className: "border border-border bg-card/70 backdrop-blur-sm",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
                step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -20 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -20 },
                    transition: { duration: 0.25 },
                    className: "p-6 flex flex-col gap-5",
                    "data-ocid": "setup.step1",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold tracking-[0.4em] text-primary/80 font-display mb-0.5", children: "STEP 1 OF 3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black tracking-wider text-foreground font-display", children: "ENTER DEVICE ID" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-1", children: "The unique identifier printed on your Rakshak unit label" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "device-id-input",
                            className: "text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display",
                            children: "DEVICE ID"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "device-id-input",
                            ref: idInputRef,
                            type: "text",
                            maxLength: 9,
                            placeholder: "RKSH-XXXX",
                            value: deviceId,
                            onChange: (e) => handleIdChange(e.target.value),
                            onKeyDown: (e) => e.key === "Enter" && handleIdContinue(),
                            className: "w-full px-4 py-3 text-lg font-mono bg-background border border-input text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary tracking-[0.3em] transition-colors text-center",
                            "data-ocid": "setup.device_id_input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: idError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.p,
                          {
                            initial: { opacity: 0, y: -4 },
                            animate: { opacity: 1, y: 0 },
                            exit: { opacity: 0 },
                            className: "text-[10px] font-bold tracking-wider text-destructive font-display",
                            "data-ocid": "setup.id_error_state",
                            children: idError
                          }
                        ) : isValidId ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.p,
                          {
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            className: "text-[10px] font-bold tracking-wider font-display",
                            style: { color: "#00E676" },
                            children: "✓ VALID FORMAT"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50 font-mono", children: "Format: RKSH-XXXX" }) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/60 font-body mt-1", children: [
                          "The Device ID begins with",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: "RKSH-" }),
                          " ",
                          "and is printed on the label on your Rakshak unit."
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: handleIdContinue,
                          disabled: !isValidId,
                          className: "w-full py-3 flex items-center justify-center gap-2\n                    text-sm font-black tracking-[0.3em] font-display\n                    bg-primary text-primary-foreground\n                    hover:opacity-90 active:scale-[0.98]\n                    disabled:opacity-40 disabled:cursor-not-allowed\n                    transition-all duration-200",
                          style: {
                            boxShadow: isValidId ? "0 0 16px rgba(0,163,255,0.3)" : "none"
                          },
                          "data-ocid": "setup.continue_button",
                          children: [
                            "CONTINUE",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                          ]
                        }
                      )
                    ]
                  },
                  "step1"
                ),
                step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 20 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: 20 },
                    transition: { duration: 0.25 },
                    className: "p-6 flex flex-col gap-5",
                    "data-ocid": "setup.step2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold tracking-[0.4em] text-primary/80 font-display mb-0.5", children: "STEP 2 OF 3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black tracking-wider text-foreground font-display", children: "NAME YOUR DEVICE" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-1", children: [
                          "Pairing:",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-primary", children: deviceId })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "device-name-input",
                            className: "text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display",
                            children: "DEVICE NAME"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "device-name-input",
                            type: "text",
                            placeholder: "e.g. Home, Office, Warehouse",
                            value: name,
                            onChange: (e) => setName(e.target.value),
                            onKeyDown: (e) => e.key === "Enter" && name.trim() && handlePair(),
                            className: "w-full px-4 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors font-body",
                            "data-ocid": "setup.device_name_input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] tracking-[0.3em] text-muted-foreground/60 font-display font-bold", children: "QUICK NAMES" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "flex flex-wrap gap-2",
                            "data-ocid": "setup.name_suggestions",
                            children: NAME_SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => setName(s),
                                className: `px-3 py-1.5 text-xs font-bold tracking-wider font-display border transition-all duration-200 ${name === s ? "border-primary bg-primary/15 text-primary" : "border-border/60 bg-transparent text-muted-foreground hover:border-primary/50 hover:text-foreground"}`,
                                "data-ocid": `setup.name_suggestion.${s.toLowerCase()}`,
                                children: s.toUpperCase()
                              },
                              s
                            ))
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: handlePair,
                          disabled: !name.trim() || loading,
                          className: "w-full py-3 flex items-center justify-center gap-2\n                    text-sm font-black tracking-[0.3em] font-display\n                    bg-primary text-primary-foreground\n                    hover:opacity-90 active:scale-[0.98]\n                    disabled:opacity-40 disabled:cursor-not-allowed\n                    transition-all duration-200",
                          style: {
                            boxShadow: name.trim() ? "0 0 16px rgba(0,163,255,0.3)" : "none"
                          },
                          "data-ocid": "setup.pair_button",
                          children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent animate-spin rounded-full" }),
                            "PAIRING..."
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            "PAIR DEVICE",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                          ] })
                        }
                      )
                    ]
                  },
                  "step2"
                ),
                step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.35 },
                    className: "p-6 flex flex-col gap-5",
                    "data-ocid": "setup.step3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-bold tracking-[0.4em] text-primary/80 font-display mb-0.5", children: "STEP 3 OF 3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-black tracking-wider text-foreground font-display", children: success ? "DEVICE PAIRED" : "CONNECTING TO CLOUD" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectingAnimation, { success }),
                      success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        motion.div,
                        {
                          initial: { opacity: 0, y: 10 },
                          animate: { opacity: 1, y: 0 },
                          transition: { delay: 0.2 },
                          className: "flex flex-col gap-4",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "border border-border/60 bg-background p-4 flex items-center gap-3",
                                "data-ocid": "setup.success_state",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      className: "w-10 h-10 flex items-center justify-center border-2 flex-shrink-0",
                                      style: {
                                        borderColor: "#00E676",
                                        backgroundColor: "rgba(0,230,118,0.1)"
                                      },
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        Shield,
                                        {
                                          className: "w-5 h-5",
                                          style: { color: "#00E676" },
                                          strokeWidth: 1.5
                                        }
                                      )
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "p",
                                      {
                                        className: "text-sm font-black tracking-widest font-display",
                                        style: { color: "#00E676" },
                                        children: pairedName.toUpperCase()
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground", children: pairedId })
                                  ] }),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      className: "ml-auto text-[9px] font-bold tracking-widest font-display px-2 py-1",
                                      style: {
                                        color: "#00E676",
                                        backgroundColor: "rgba(0,230,118,0.1)",
                                        border: "1px solid rgba(0,230,118,0.3)"
                                      },
                                      children: "ONLINE"
                                    }
                                  )
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => navigate({ to: "/dashboard" }),
                                className: "w-full py-3 text-sm font-black tracking-[0.3em] font-display\n                        bg-primary text-primary-foreground\n                        hover:opacity-90 active:scale-[0.98]\n                        transition-all duration-200",
                                style: { boxShadow: "0 0 20px rgba(0,163,255,0.35)" },
                                "data-ocid": "setup.dashboard_button",
                                children: "GO TO DASHBOARD"
                              }
                            )
                          ]
                        }
                      )
                    ]
                  },
                  "step3"
                )
              ] })
            }
          ),
          step < 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.4 },
              className: "text-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSkip,
                  className: "text-[11px] text-muted-foreground/60 hover:text-muted-foreground font-mono tracking-wider transition-colors underline underline-offset-2",
                  "data-ocid": "setup.skip_button",
                  children: "Skip for now (use demo device)"
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
export {
  DeviceSetupPage
};
