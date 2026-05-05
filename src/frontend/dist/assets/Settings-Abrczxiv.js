import { c as createLucideIcon, e as useAuthGuard, r as reactExports, j as jsxRuntimeExports, U as User, S as Shield, B as Bell, I as Info, a as useRakshakStore, u as useNavigate, L as LogOut, X, l as renameDevice, g as getDevices, p as pairDevice, m as removeDevice } from "./index-BVgOhRLP.js";
import { L as Lock } from "./lock-CoZrhtli.js";
import { Z as Zap } from "./zap-Dbl1kj5q.js";
import { C as ChevronRight } from "./chevron-right-BIRGdOLx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const TABS = [
  { id: "account", label: "ACCOUNT", icon: User },
  { id: "devices", label: "DEVICES", icon: Shield },
  { id: "notifications", label: "NOTIFICATIONS", icon: Bell },
  { id: "users", label: "USERS", icon: Users },
  { id: "zones", label: "ZONE LABELS", icon: Lock },
  { id: "about", label: "ABOUT", icon: Info }
];
function Card({
  children,
  className = "",
  style
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `rounded-sm border ${className}`,
      style: { backgroundColor: "#141929", borderColor: "#1E2A45", ...style },
      children
    }
  );
}
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      className: "text-[10px] font-bold tracking-widest font-display uppercase mb-3",
      style: { color: "#00A3FF" },
      children
    }
  );
}
function FieldInput({
  value,
  onChange,
  placeholder,
  type = "text",
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      placeholder,
      value,
      onChange: (e) => onChange(e.target.value),
      className: "w-full px-3 py-2 text-sm bg-[#0B0F1C] border border-[#1E2A45] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00A3FF] transition-colors rounded-sm",
      "data-ocid": ocid
    }
  );
}
function ActionButton({
  onClick,
  children,
  variant = "primary",
  disabled = false,
  ocid,
  fullWidth = false
}) {
  const base = "inline-flex items-center justify-center gap-2 px-4 py-2 text-[11px] font-bold tracking-widest font-display uppercase transition-all disabled:opacity-40 cursor-pointer";
  const styles = {
    primary: { backgroundColor: "#00A3FF", color: "#0B0F1C" },
    outline: { border: "1px solid #1E2A45", color: "#a0aec0" },
    danger: { border: "1px solid #FF3B3B", color: "#FF3B3B" },
    ghost: { color: "#a0aec0" }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: `${base} ${fullWidth ? "w-full" : ""}`,
      style: styles[variant],
      onClick,
      disabled,
      "data-ocid": ocid,
      children
    }
  );
}
function Toggle({
  enabled,
  onChange,
  ocid,
  disabled = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      role: "switch",
      "aria-checked": enabled,
      className: "relative inline-flex flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]",
      style: {
        backgroundColor: disabled ? "#1E2A45" : enabled ? "#00A3FF" : "#1E2A45",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1
      },
      onClick: () => !disabled && onChange(!enabled),
      "data-ocid": ocid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "pointer-events-none inline-block w-5 h-5 rounded-full shadow transform transition-transform duration-200 ease-in-out",
          style: {
            backgroundColor: enabled ? "#0B0F1C" : "#4a5878",
            transform: enabled ? "translateX(22px)" : "translateX(2px)",
            marginTop: "2px"
          }
        }
      )
    }
  );
}
function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "CONFIRM",
  danger = false,
  onConfirm,
  onClose,
  requireTyping
}) {
  const [typed, setTyped] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!open) setTyped("");
  }, [open]);
  if (!open) return null;
  const canConfirm = !requireTyping || typed === requireTyping;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { backgroundColor: "rgba(11,15,28,0.85)" },
      "data-ocid": "settings.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "w-full max-w-sm border rounded-sm p-6 space-y-4",
          style: {
            backgroundColor: "#141929",
            borderColor: danger ? "#FF3B3B" : "#1E2A45"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-bold font-display uppercase tracking-wider",
                  style: { color: danger ? "#FF3B3B" : "#00A3FF" },
                  children: title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "text-muted-foreground hover:text-foreground transition-colors",
                  "data-ocid": "settings.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: body }),
            requireTyping && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground", children: [
                "TYPE ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#FF3B3B" }, children: requireTyping }),
                " TO CONFIRM"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldInput,
                {
                  value: typed,
                  onChange: setTyped,
                  placeholder: requireTyping,
                  ocid: "settings.confirm_type_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionButton,
                {
                  variant: "ghost",
                  onClick: onClose,
                  ocid: "settings.cancel_button",
                  children: "CANCEL"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionButton,
                {
                  variant: danger ? "danger" : "primary",
                  onClick: () => {
                    if (canConfirm) {
                      onConfirm();
                      onClose();
                    }
                  },
                  disabled: !canConfirm,
                  ocid: "settings.confirm_button",
                  children: confirmLabel
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function AccountTab() {
  const { user, logout, addToast } = useRakshakStore();
  const navigate = useNavigate();
  const [showChangePw, setShowChangePw] = reactExports.useState(false);
  const [oldPw, setOldPw] = reactExports.useState("");
  const [newPw, setNewPw] = reactExports.useState("");
  const [confirmPw, setConfirmPw] = reactExports.useState("");
  const [pwSaved, setPwSaved] = reactExports.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const initials = (user == null ? void 0 : user.displayName) ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U";
  const handleSavePassword = () => {
    if (!oldPw || !newPw || newPw !== confirmPw) {
      addToast({ type: "error", message: "Passwords do not match" });
      return;
    }
    setPwSaved(true);
    setOldPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => {
      setPwSaved(false);
      setShowChangePw(false);
    }, 2e3);
    addToast({ type: "success", message: "Password changed successfully" });
  };
  const handleDeleteAccount = () => {
    addToast({ type: "info", message: "Account deletion requested" });
    logout();
    navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "settings.account.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold font-display flex-shrink-0",
          style: {
            backgroundColor: "rgba(0,163,255,0.15)",
            border: "2px solid #00A3FF",
            color: "#00A3FF"
          },
          children: initials
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-display tracking-wider text-foreground uppercase truncate", children: (user == null ? void 0 : user.displayName) ?? "USER" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user == null ? void 0 : user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-block mt-1 text-[9px] font-bold tracking-widest font-display uppercase px-2 py-0.5",
            style: {
              backgroundColor: "rgba(0,163,255,0.1)",
              color: "#00A3FF",
              border: "1px solid rgba(0,163,255,0.3)"
            },
            children: "ADMIN"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Security" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Change your account password" })
          ] }),
          !showChangePw && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionButton,
            {
              variant: "outline",
              onClick: () => setShowChangePw(true),
              ocid: "settings.change_password_button",
              children: "CHANGE"
            }
          )
        ] }),
        showChangePw && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-4 space-y-3 border-t pt-4",
            style: { borderColor: "#1E2A45" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldInput,
                {
                  value: oldPw,
                  onChange: setOldPw,
                  placeholder: "Current password",
                  type: "password",
                  ocid: "settings.current_password_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldInput,
                {
                  value: newPw,
                  onChange: setNewPw,
                  placeholder: "New password",
                  type: "password",
                  ocid: "settings.new_password_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FieldInput,
                {
                  value: confirmPw,
                  onChange: setConfirmPw,
                  placeholder: "Confirm new password",
                  type: "password",
                  ocid: "settings.confirm_password_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ActionButton,
                  {
                    variant: "primary",
                    onClick: handleSavePassword,
                    ocid: "settings.save_password_button",
                    children: pwSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                      " SAVED"
                    ] }) : "SAVE PASSWORD"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ActionButton,
                  {
                    variant: "ghost",
                    onClick: () => setShowChangePw(false),
                    ocid: "settings.cancel_password_button",
                    children: "CANCEL"
                  }
                )
              ] })
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Session" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Sign Out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "End your current session" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          ActionButton,
          {
            variant: "danger",
            onClick: () => {
              logout();
              navigate({ to: "/" });
            },
            ocid: "settings.signout_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
              " SIGN OUT"
            ]
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Danger Zone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-sm border-l-2 p-4 space-y-3",
          style: {
            backgroundColor: "rgba(255,59,59,0.05)",
            borderLeft: "2px solid #FF3B3B",
            border: "1px solid rgba(255,59,59,0.3)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold", style: { color: "#FF3B3B" }, children: "Delete Account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 leading-relaxed", children: "Permanently delete your account and all paired devices. This cannot be undone." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              ActionButton,
              {
                variant: "danger",
                onClick: () => setShowDeleteDialog(true),
                ocid: "settings.delete_account_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  " DELETE ACCOUNT"
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: showDeleteDialog,
        title: "Delete Account",
        body: "This will permanently delete your account and all paired devices. This cannot be undone.",
        confirmLabel: "DELETE ACCOUNT",
        danger: true,
        onConfirm: handleDeleteAccount,
        onClose: () => setShowDeleteDialog(false),
        requireTyping: "DELETE"
      }
    )
  ] });
}
function DevicesTab() {
  var _a;
  const { devices, setDevices, setActiveDevice, addToast } = useRakshakStore();
  const navigate = useNavigate();
  const [renameId, setRenameId] = reactExports.useState(null);
  const [renameName, setRenameName] = reactExports.useState("");
  const [removeId, setRemoveId] = reactExports.useState(null);
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [newId, setNewId] = reactExports.useState("");
  const [newName, setNewName] = reactExports.useState("");
  const [pairing, setPairing] = reactExports.useState(false);
  const fmtTime = (iso) => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const diffMin = Math.floor(diffMs / 6e4);
    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.floor(diffHr / 24)}d ago`;
  };
  const handleRename = async (deviceId) => {
    if (!renameName.trim()) return;
    await renameDevice(deviceId, renameName.trim());
    const updated = await getDevices();
    setDevices(updated);
    setRenameId(null);
    addToast({ type: "success", message: "Device renamed" });
  };
  const handleRemove = async (deviceId) => {
    await removeDevice(deviceId);
    const updated = await getDevices();
    setDevices(updated);
    if (updated[0]) setActiveDevice(updated[0].deviceId);
    addToast({ type: "success", message: "Device removed" });
  };
  const handlePair = async () => {
    if (!newId.trim() || !newName.trim()) return;
    setPairing(true);
    try {
      await pairDevice(newId.trim().toUpperCase(), newName.trim());
      const updated = await getDevices();
      setDevices(updated);
      setActiveDevice(newId.trim().toUpperCase());
      setNewId("");
      setNewName("");
      setShowAdd(false);
      addToast({ type: "success", message: `${newName} paired successfully` });
    } catch {
      addToast({
        type: "error",
        message: "Pairing failed. Check the device ID."
      });
    }
    setPairing(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "settings.devices.panel", children: [
    devices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "p-8 text-center",
        "data-ocid": "settings.devices.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 mx-auto mb-3 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-muted-foreground font-display uppercase tracking-widest", children: "No Devices Paired" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 mb-4", children: "Add your first Rakshak device to get started." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            ActionButton,
            {
              variant: "primary",
              onClick: () => navigate({ to: "/setup" }),
              ocid: "settings.pair_first_device_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                " PAIR DEVICE"
              ]
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: devices.map((d, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-4 border-b last:border-b-0",
        style: { borderColor: "#1E2A45" },
        "data-ocid": `settings.devices.item.${idx + 1}`,
        children: renameId === d.deviceId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldInput,
            {
              value: renameName,
              onChange: setRenameName,
              placeholder: "Device name",
              ocid: `settings.rename_input.${idx + 1}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              ActionButton,
              {
                variant: "primary",
                onClick: () => handleRename(d.deviceId),
                ocid: `settings.save_rename_button.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                  " SAVE"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionButton,
              {
                variant: "ghost",
                onClick: () => setRenameId(null),
                ocid: `settings.cancel_rename_button.${idx + 1}`,
                children: "CANCEL"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full flex-shrink-0",
                  style: {
                    backgroundColor: d.online ? "#00E676" : "#FF3B3B",
                    boxShadow: d.online ? "0 0 6px #00E676" : "none"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-display uppercase tracking-wider text-foreground text-sm", children: d.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[9px] font-mono px-1.5 py-0.5",
                  style: {
                    backgroundColor: "rgba(0,163,255,0.08)",
                    color: "#00A3FF",
                    border: "1px solid rgba(0,163,255,0.25)"
                  },
                  children: d.deviceId
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[9px] font-bold tracking-widest font-display uppercase px-1.5 py-0.5",
                  style: {
                    backgroundColor: d.online ? "rgba(0,230,118,0.1)" : "rgba(255,59,59,0.1)",
                    color: d.online ? "#00E676" : "#FF3B3B"
                  },
                  children: d.online ? "ONLINE" : "OFFLINE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                "Last seen ",
                fmtTime(d.lastSeen)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-2 text-muted-foreground hover:text-foreground transition-colors rounded",
                onClick: () => {
                  setRenameId(d.deviceId);
                  setRenameName(d.name);
                },
                "aria-label": "Rename device",
                "data-ocid": `settings.rename_device_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-2 transition-colors rounded",
                style: { color: "#FF3B3B" },
                onClick: () => setRemoveId(d.deviceId),
                "aria-label": "Remove device",
                "data-ocid": `settings.remove_device_button.${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      },
      d.deviceId
    )) }),
    showAdd ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Pair New Device" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FieldInput,
        {
          value: newId,
          onChange: (v) => setNewId(v.toUpperCase()),
          placeholder: "Device ID (e.g. RKSH-A3F7)",
          ocid: "settings.add_device_id_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FieldInput,
        {
          value: newName,
          onChange: setNewName,
          placeholder: "Device name (e.g. Home)",
          ocid: "settings.add_device_name_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ActionButton,
          {
            variant: "primary",
            onClick: handlePair,
            disabled: pairing,
            ocid: "settings.pair_device_button",
            children: pairing ? "PAIRING..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
              " PAIR DEVICE"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ActionButton,
          {
            variant: "ghost",
            onClick: () => setShowAdd(false),
            ocid: "settings.cancel_add_button",
            children: "CANCEL"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ActionButton,
      {
        variant: "outline",
        onClick: () => setShowAdd(true),
        ocid: "settings.add_device_button",
        fullWidth: true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
          " ADD NEW DEVICE"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: removeId !== null,
        title: "Remove Device",
        body: `Remove "${(_a = devices.find((d) => d.deviceId === removeId)) == null ? void 0 : _a.name}" from your account? You can re-pair it later.`,
        confirmLabel: "REMOVE",
        danger: true,
        onConfirm: () => {
          if (removeId) handleRemove(removeId);
        },
        onClose: () => setRemoveId(null)
      }
    )
  ] });
}
const NOTIF_ROWS = [
  {
    key: "notif_sensor_alarms",
    label: "SENSOR ALARMS",
    desc: "Motion or contact sensor triggered",
    icon: "🚨"
  },
  {
    key: "notif_sos",
    label: "SOS ALERTS",
    desc: "SOS button pressed",
    icon: "🆘"
  },
  {
    key: "notif_arm_events",
    label: "ARM EVENTS",
    desc: "Zone armed from any source",
    icon: "🔒"
  },
  {
    key: "notif_disarm_events",
    label: "DISARM EVENTS",
    desc: "Zone disarmed",
    icon: "🔓"
  },
  {
    key: "notif_power_alerts",
    label: "POWER ALERTS",
    desc: "AC power cut or restored",
    icon: "⚡"
  },
  {
    key: "notif_device_status",
    label: "DEVICE STATUS",
    desc: "Device online or offline",
    icon: "📡"
  }
];
function NotificationsTab() {
  const { userSettings, setUserSettings, addToast } = useRakshakStore();
  const [savedKey, setSavedKey] = reactExports.useState(null);
  const timerRef = reactExports.useRef(null);
  const update = (key, value) => {
    setUserSettings({ ...userSettings, [key]: value });
    if (timerRef.current) clearTimeout(timerRef.current);
    setSavedKey(key);
    timerRef.current = setTimeout(() => setSavedKey(null), 1500);
    if (key !== "masterNotifications") {
      addToast({
        type: "success",
        message: "Preference saved",
        duration: 2e3
      });
    }
  };
  const master = userSettings.masterNotifications;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "settings.notifications.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-display uppercase tracking-widest text-sm text-foreground", children: "PUSH NOTIFICATIONS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Master switch for all notifications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        savedKey === "masterNotifications" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[10px] font-bold tracking-widest font-display",
            style: { color: "#00E676" },
            children: "SAVED"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Toggle,
          {
            enabled: master,
            onChange: (v) => update("masterNotifications", v),
            ocid: "settings.notif_master"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: NOTIF_ROWS.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-4 py-3.5 border-b last:border-b-0 transition-opacity",
        style: { borderColor: "#1E2A45", opacity: master ? 1 : 0.45 },
        "data-ocid": `settings.notif.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", children: row.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold font-display uppercase tracking-widest text-foreground", children: row.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: row.desc })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            savedKey === row.key && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-bold tracking-widest font-display",
                style: { color: "#00E676" },
                children: "SAVED"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Toggle,
              {
                enabled: userSettings[row.key],
                onChange: (v) => update(row.key, v),
                ocid: `settings.notif_${row.key}`,
                disabled: !master
              }
            )
          ] })
        ]
      },
      row.key
    )) }),
    !master && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2.5 px-4 py-3 rounded-sm border",
        style: {
          backgroundColor: "rgba(255,165,0,0.08)",
          borderColor: "rgba(255,165,0,0.3)",
          color: "#FFA500"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "w-4 h-4 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold tracking-wider font-display uppercase", children: "All notifications are currently paused" })
        ]
      }
    )
  ] });
}
function UsersTab() {
  const { invitedUsers, setInvitedUsers, addToast } = useRakshakStore();
  const [email, setEmail] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("control");
  const [removing, setRemoving] = reactExports.useState(null);
  const handleInvite = () => {
    if (!email.trim() || !email.includes("@")) {
      addToast({ type: "error", message: "Enter a valid email address" });
      return;
    }
    if (invitedUsers.find((u) => u.email === email.trim())) {
      addToast({ type: "error", message: "User already invited" });
      return;
    }
    const newUser = {
      email: email.trim(),
      role,
      addedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setInvitedUsers([...invitedUsers, newUser]);
    setEmail("");
    addToast({ type: "success", message: `Invite sent to ${newUser.email}` });
  };
  const handleRemove = (em) => {
    setInvitedUsers(invitedUsers.filter((u) => u.email !== em));
    addToast({ type: "success", message: "User removed" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "settings.users.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Share Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: "Invited users can control devices linked to your account. They receive their own login with the role you assign." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FieldInput,
          {
            value: email,
            onChange: setEmail,
            placeholder: "Email address",
            type: "email",
            ocid: "settings.invite_email_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: role,
              onChange: (e) => setRole(e.target.value),
              className: "flex-1 px-3 py-2 text-xs bg-[#0B0F1C] border border-[#1E2A45] text-foreground focus:outline-none focus:border-[#00A3FF] rounded-sm",
              "data-ocid": "settings.invite_role_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "control", children: "Full Control" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "view", children: "View Only" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            ActionButton,
            {
              variant: "primary",
              onClick: handleInvite,
              ocid: "settings.invite_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                " INVITE"
              ]
            }
          )
        ] })
      ] })
    ] }),
    invitedUsers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionLabel, { children: [
        "Invited Users (",
        invitedUsers.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: invitedUsers.map((u, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between px-4 py-3.5 border-b last:border-b-0 gap-3",
          style: { borderColor: "#1E2A45" },
          "data-ocid": `settings.users.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground truncate", children: u.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-block mt-1 text-[9px] font-bold tracking-widest font-display uppercase px-2 py-0.5",
                  style: {
                    backgroundColor: u.role === "control" ? "rgba(255,59,59,0.12)" : "rgba(0,163,255,0.10)",
                    color: u.role === "control" ? "#FF3B3B" : "#00A3FF",
                    border: `1px solid ${u.role === "control" ? "rgba(255,59,59,0.3)" : "rgba(0,163,255,0.3)"}`
                  },
                  children: u.role === "control" ? "FULL CONTROL" : "VIEW ONLY"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "p-2 transition-colors rounded flex-shrink-0",
                style: { color: "#FF3B3B" },
                onClick: () => setRemoving(u.email),
                "aria-label": "Remove user",
                "data-ocid": `settings.remove_user_button.${i + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ]
        },
        u.email
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDialog,
      {
        open: removing !== null,
        title: "Remove User",
        body: `Remove ${removing} from your account? They will lose all access to your devices.`,
        confirmLabel: "REMOVE",
        danger: true,
        onConfirm: () => {
          if (removing) handleRemove(removing);
        },
        onClose: () => setRemoving(null)
      }
    )
  ] });
}
function ZoneLabelsTab() {
  const { zoneLabels, setZoneLabels, addToast } = useRakshakStore();
  const [z1, setZ1] = reactExports.useState(zoneLabels.arm1);
  const [z2, setZ2] = reactExports.useState(zoneLabels.arm2);
  const handleSave = () => {
    if (!z1.trim() || !z2.trim()) {
      addToast({ type: "error", message: "Zone labels cannot be empty" });
      return;
    }
    setZoneLabels({ arm1: z1.trim(), arm2: z2.trim() });
    addToast({ type: "success", message: "Zone labels saved" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "settings.zones.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Zone Labels" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mb-4", children: "Zone labels appear on the Dashboard and Alerts screens." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground", children: "ZONE 1 LABEL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldInput,
            {
              value: z1,
              onChange: setZ1,
              placeholder: "Away / Full Arm",
              ocid: "settings.zone1_label_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground", children: "ZONE 2 LABEL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldInput,
            {
              value: z2,
              onChange: setZ2,
              placeholder: "Home / Perimeter",
              ocid: "settings.zone2_label_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          ActionButton,
          {
            variant: "primary",
            onClick: handleSave,
            ocid: "settings.save_zones_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
              " SAVE LABELS"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2.5 px-4 py-3 rounded-sm border text-sm",
        style: {
          backgroundColor: "rgba(0,163,255,0.06)",
          borderColor: "rgba(0,163,255,0.2)",
          color: "#00A3FF"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-bold tracking-wider font-display uppercase", children: [
            'ARM 1: "',
            zoneLabels.arm1,
            '"  ·  ARM 2: "',
            zoneLabels.arm2,
            '"'
          ] })
        ]
      }
    )
  ] });
}
function AboutTab() {
  const { status } = useRakshakStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "settings.about.panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded flex items-center justify-center flex-shrink-0",
            style: {
              backgroundColor: "rgba(0,163,255,0.15)",
              border: "1px solid rgba(0,163,255,0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5", style: { color: "#00A3FF" } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold font-display uppercase tracking-widest text-foreground", children: "RAKSHAK WEB" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Version 1.0.0" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: [
        { label: "Platform", value: "Cloud / ESP32" },
        {
          label: "Device Firmware",
          value: (status == null ? void 0 : status.online) ? "v1.4.2 (ESP32)" : "N/A"
        },
        { label: "Build", value: "2026.05.05" },
        { label: "Protocol", value: "MQTT + WebSocket" }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground", children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground mt-0.5", children: item.value })
      ] }, item.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "divide-y", style: { borderColor: "#1E2A45" }, children: [
      {
        label: "Support",
        href: "mailto:support@rakshak.app",
        value: "support@rakshak.app"
      },
      { label: "Privacy Policy", href: "#", value: "View Policy" },
      { label: "Terms of Service", href: "#", value: "View Terms" }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-4 py-3.5",
        style: { borderColor: "#1E2A45" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold font-display uppercase tracking-wider text-foreground", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: item.href,
              className: "text-xs font-bold tracking-wider font-display uppercase transition-opacity hover:opacity-70",
              style: { color: "#00A3FF" },
              children: item.value
            }
          )
        ]
      },
      item.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: "inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest font-display uppercase",
        style: { color: "rgba(0,163,255,0.45)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
          "RAKSHAK WEB v1.0.0"
        ]
      }
    ) })
  ] });
}
function SettingsPage() {
  useAuthGuard();
  const [activeTab, setActiveTab] = reactExports.useState("account");
  const tabContent = {
    account: /* @__PURE__ */ jsxRuntimeExports.jsx(AccountTab, {}),
    devices: /* @__PURE__ */ jsxRuntimeExports.jsx(DevicesTab, {}),
    notifications: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsTab, {}),
    users: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, {}),
    zones: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoneLabelsTab, {}),
    about: /* @__PURE__ */ jsxRuntimeExports.jsx(AboutTab, {})
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-full", "data-ocid": "settings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-6 pb-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display uppercase tracking-widest text-foreground", children: "SETTINGS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Configure your Rakshak security system" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-0 md:gap-6 md:px-8 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex md:hidden gap-1 px-4 pb-4 overflow-x-auto",
          style: { scrollbarWidth: "none" },
          children: TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold tracking-widest font-display uppercase whitespace-nowrap transition-all",
                style: {
                  backgroundColor: active ? "rgba(0,163,255,0.15)" : "#141929",
                  color: active ? "#00A3FF" : "#6B7280",
                  border: active ? "1px solid rgba(0,163,255,0.35)" : "1px solid #1E2A45",
                  borderRadius: "2px"
                },
                onClick: () => setActiveTab(tab.id),
                "data-ocid": `settings.tab.${tab.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3" }),
                  tab.label
                ]
              },
              tab.id
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex flex-col gap-0.5 w-48 flex-shrink-0 pt-0.5", children: TABS.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-2.5 px-3 py-2.5 text-[11px] font-bold tracking-widest font-display uppercase transition-all text-left w-full",
            style: {
              backgroundColor: active ? "rgba(0,163,255,0.12)" : "transparent",
              color: active ? "#00A3FF" : "#6B7280",
              borderLeft: active ? "2px solid #00A3FF" : "2px solid transparent",
              borderRadius: "0 2px 2px 0"
            },
            onClick: () => setActiveTab(tab.id),
            "data-ocid": `settings.tab.${tab.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 flex-shrink-0" }),
              tab.label
            ]
          },
          tab.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 px-4 md:px-0", children: tabContent[activeTab] })
    ] })
  ] });
}
export {
  SettingsPage
};
