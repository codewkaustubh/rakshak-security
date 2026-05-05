import { c as createLucideIcon, u as useNavigate, a as useRakshakStore, r as reactExports, j as jsxRuntimeExports, U as User, C as CircleAlert, M as MOCK_USER } from "./index-BVgOhRLP.js";
import { m as motion, A as AnimatePresence } from "./proxy-CIFgaEQY.js";
import { L as Lock } from "./lock-CoZrhtli.js";
import { S as ShieldCheck } from "./shield-check-BIveGXso.js";
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
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", className: "w-4 h-4", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
        fill: "#4285F4"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
        fill: "#34A853"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z",
        fill: "#FBBC05"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
        fill: "#EA4335"
      }
    )
  ] });
}
function RakshakShield({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex items-center justify-center ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border border-primary/15 glow-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-[10px] rounded-full border border-primary/25 animate-pulse",
        style: { animationDuration: "3s" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-[22px] rounded-full bg-primary/8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ShieldCheck,
      {
        className: "w-14 h-14 text-primary relative z-10",
        strokeWidth: 1.5,
        style: { filter: "drop-shadow(0 0 16px rgba(0,163,255,0.75))" }
      }
    )
  ] });
}
function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setHasDevices } = useRakshakStore();
  const [mode, setMode] = reactExports.useState("signin");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [shake, setShake] = reactExports.useState(false);
  const [fieldError, setFieldError] = reactExports.useState("");
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const triggerShake = (msg) => {
    setFieldError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setTimeout(() => setFieldError(""), 3e3);
  };
  const mockLogin = () => {
    setUser(MOCK_USER);
    setHasDevices(true);
    navigate({ to: "/dashboard" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email.trim()) {
      triggerShake("EMAIL ADDRESS IS REQUIRED");
      return;
    }
    if (!form.password) {
      triggerShake("PASSWORD IS REQUIRED");
      return;
    }
    if (mode === "register") {
      if (!form.name.trim()) {
        triggerShake("DISPLAY NAME IS REQUIRED");
        return;
      }
      if (form.password !== form.confirmPassword) {
        triggerShake("PASSWORDS DO NOT MATCH");
        return;
      }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      mockLogin();
    }, 800);
  };
  const isRegister = mode === "register";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen dot-grid-bg flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden",
      "data-ocid": "login.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 pointer-events-none opacity-[0.025]",
            "aria-hidden": "true",
            style: {
              backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 36px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-primary/20 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-primary/20 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20 pointer-events-none",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[380px] flex flex-col items-center gap-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.7 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
              className: "flex flex-col items-center gap-4",
              "data-ocid": "login.logo",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RakshakShield, { className: "w-28 h-28" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-black tracking-[0.3em] text-primary font-display leading-none", children: "RAKSHAK" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center mt-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-primary/30" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] tracking-[0.45em] text-muted-foreground font-mono font-semibold", children: "CLOUD SECURITY SYSTEM" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-primary/30" })
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 32 },
              animate: { opacity: 1, y: 0 },
              transition: {
                duration: 0.5,
                delay: 0.25,
                ease: [0.34, 1.56, 0.64, 1]
              },
              className: "w-full",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card/70 backdrop-blur-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-5 py-3 border-b border-border bg-card", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-[0.45em] text-primary/90 font-display", children: isRegister ? "CREATE ACCOUNT" : "SECURE AUTHENTICATION" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.form,
                    {
                      initial: { opacity: 0, x: isRegister ? 20 : -20 },
                      animate: { opacity: 1, x: 0 },
                      exit: { opacity: 0, x: isRegister ? -20 : 20 },
                      transition: { duration: 0.25 },
                      onSubmit: handleSubmit,
                      className: "p-5 flex flex-col gap-4",
                      "data-ocid": "login.form",
                      children: [
                        isRegister && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, y: 10 },
                            animate: { opacity: 1, y: 0 },
                            transition: { delay: 0.05 },
                            className: "flex flex-col gap-1.5",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "label",
                                {
                                  htmlFor: "login-name",
                                  className: "text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display",
                                  children: "DISPLAY NAME"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "input",
                                  {
                                    id: "login-name",
                                    type: "text",
                                    autoComplete: "name",
                                    placeholder: "Your full name",
                                    value: form.name,
                                    onChange: update("name"),
                                    className: "w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body",
                                    "data-ocid": "login.name_input"
                                  }
                                )
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, y: 10 },
                            animate: { opacity: 1, y: 0 },
                            transition: { delay: 0.08 },
                            className: "flex flex-col gap-1.5",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "label",
                                {
                                  htmlFor: "login-email",
                                  className: "text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display",
                                  children: "EMAIL ADDRESS"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "input",
                                  {
                                    id: "login-email",
                                    type: "email",
                                    autoComplete: "email",
                                    placeholder: "operator@domain.com",
                                    value: form.email,
                                    onChange: update("email"),
                                    className: "w-full pl-9 pr-4 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body",
                                    "data-ocid": "login.email_input"
                                  }
                                )
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, y: 10 },
                            animate: { opacity: 1, y: 0 },
                            transition: { delay: 0.12 },
                            className: "flex flex-col gap-1.5",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "label",
                                {
                                  htmlFor: "login-password",
                                  className: "text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display",
                                  children: "PASSWORD"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "input",
                                  {
                                    id: "login-password",
                                    type: showPassword ? "text" : "password",
                                    autoComplete: isRegister ? "new-password" : "current-password",
                                    placeholder: "••••••••",
                                    value: form.password,
                                    onChange: update("password"),
                                    className: "w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body",
                                    "data-ocid": "login.password_input"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => setShowPassword((v) => !v),
                                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors",
                                    "aria-label": showPassword ? "Hide password" : "Show password",
                                    "data-ocid": "login.toggle_password",
                                    children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                                  }
                                )
                              ] })
                            ]
                          }
                        ),
                        isRegister && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, y: 10 },
                            animate: { opacity: 1, y: 0 },
                            transition: { delay: 0.16 },
                            className: "flex flex-col gap-1.5",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "label",
                                {
                                  htmlFor: "login-confirm",
                                  className: "text-[9px] font-bold tracking-[0.35em] text-muted-foreground font-display",
                                  children: "CONFIRM PASSWORD"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "input",
                                  {
                                    id: "login-confirm",
                                    type: showConfirm ? "text" : "password",
                                    autoComplete: "new-password",
                                    placeholder: "••••••••",
                                    value: form.confirmPassword,
                                    onChange: update("confirmPassword"),
                                    className: "w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-input text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors font-body",
                                    "data-ocid": "login.confirm_password_input"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    onClick: () => setShowConfirm((v) => !v),
                                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors",
                                    "aria-label": showConfirm ? "Hide password" : "Show password",
                                    children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                                  }
                                )
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: fieldError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, y: -6, height: 0 },
                            animate: { opacity: 1, y: 0, height: "auto" },
                            exit: { opacity: 0, height: 0 },
                            className: `flex items-center gap-2 px-3 py-2 border border-destructive/60 bg-destructive/10 ${shake ? "shake" : ""}`,
                            "data-ocid": "login.error_state",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-destructive flex-shrink-0" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-[0.25em] text-destructive font-display", children: fieldError })
                            ]
                          }
                        ) }),
                        !isRegister && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right -mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-wider font-mono",
                            "data-ocid": "login.forgot_password",
                            onClick: mockLogin,
                            children: "Forgot password?"
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "submit",
                            disabled: loading,
                            className: "w-full py-3 text-sm font-black tracking-[0.35em] font-display\n                    bg-primary text-primary-foreground\n                    hover:opacity-90 active:scale-[0.98]\n                    disabled:opacity-60 disabled:cursor-not-allowed\n                    transition-all duration-200\n                    relative overflow-hidden",
                            style: { boxShadow: "0 0 20px rgba(0,163,255,0.35)" },
                            "data-ocid": "login.submit_button",
                            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent animate-spin rounded-full" }),
                              "AUTHENTICATING..."
                            ] }) : isRegister ? "CREATE ACCOUNT" : "SIGN IN"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-mono tracking-widest", children: "OR" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: mockLogin,
                            className: "w-full py-2.5 flex items-center justify-center gap-2.5\n                    border border-border bg-transparent text-foreground text-sm font-medium\n                    hover:border-primary/40 hover:bg-primary/5\n                    active:scale-[0.98] transition-all duration-200 font-body",
                            "data-ocid": "login.google_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SIGN IN WITH GOOGLE" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-[11px] text-muted-foreground font-body", children: [
                          isRegister ? "Already have an account? " : "Don't have an account? ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                setMode(isRegister ? "signin" : "register");
                                setFieldError("");
                              },
                              className: "text-primary font-bold hover:underline tracking-wider",
                              "data-ocid": "login.toggle_mode",
                              children: isRegister ? "SIGN IN" : "REGISTER"
                            }
                          )
                        ] })
                      ]
                    },
                    mode
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] text-muted-foreground/50 font-mono mt-3 tracking-wider", children: "DEMO MODE — No real auth required" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.6 },
              className: "text-[9px] text-muted-foreground/40 font-mono tracking-[0.35em]",
              children: "SECURE · AES-256 ENCRYPTED · PROTECTED"
            }
          )
        ] })
      ]
    }
  );
}
export {
  LoginPage
};
