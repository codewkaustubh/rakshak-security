import {
  getDevices,
  pairDevice,
  removeDevice,
  renameDevice,
} from "@/api/rakshak";
import { useAuthGuard } from "@/hooks/useRakshak";
import { useRakshakStore } from "@/store/useRakshakStore";
import type { InvitedUser, UserSettings } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BellOff,
  Check,
  ChevronRight,
  Info,
  Lock,
  LogOut,
  Pencil,
  Plus,
  Shield,
  Trash2,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab =
  | "account"
  | "devices"
  | "notifications"
  | "users"
  | "zones"
  | "about";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "account", label: "ACCOUNT", icon: User },
  { id: "devices", label: "DEVICES", icon: Shield },
  { id: "notifications", label: "NOTIFICATIONS", icon: Bell },
  { id: "users", label: "USERS", icon: Users },
  { id: "zones", label: "ZONE LABELS", icon: Lock },
  { id: "about", label: "ABOUT", icon: Info },
];

// ─── Shared primitives ────────────────────────────────────────────────────────
function Card({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-sm border ${className}`}
      style={{ backgroundColor: "#141929", borderColor: "#1E2A45", ...style }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-bold tracking-widest font-display uppercase mb-3"
      style={{ color: "#00A3FF" }}
    >
      {children}
    </p>
  );
}

function FieldInput({
  value,
  onChange,
  placeholder,
  type = "text",
  ocid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  ocid?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm bg-[#0B0F1C] border border-[#1E2A45] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00A3FF] transition-colors rounded-sm"
      data-ocid={ocid}
    />
  );
}

function ActionButton({
  onClick,
  children,
  variant = "primary",
  disabled = false,
  ocid,
  fullWidth = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "danger" | "ghost";
  disabled?: boolean;
  ocid?: string;
  fullWidth?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-[11px] font-bold tracking-widest font-display uppercase transition-all disabled:opacity-40 cursor-pointer";
  const styles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: "#00A3FF", color: "#0B0F1C" },
    outline: { border: "1px solid #1E2A45", color: "#a0aec0" },
    danger: { border: "1px solid #FF3B3B", color: "#FF3B3B" },
    ghost: { color: "#a0aec0" },
  };
  return (
    <button
      type="button"
      className={`${base} ${fullWidth ? "w-full" : ""}`}
      style={styles[variant]}
      onClick={onClick}
      disabled={disabled}
      data-ocid={ocid}
    >
      {children}
    </button>
  );
}

// Custom CSS toggle
function Toggle({
  enabled,
  onChange,
  ocid,
  disabled = false,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  ocid: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      className="relative inline-flex flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3FF]"
      style={{
        backgroundColor: disabled ? "#1E2A45" : enabled ? "#00A3FF" : "#1E2A45",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={() => !disabled && onChange(!enabled)}
      data-ocid={ocid}
    >
      <span
        className="pointer-events-none inline-block w-5 h-5 rounded-full shadow transform transition-transform duration-200 ease-in-out"
        style={{
          backgroundColor: enabled ? "#0B0F1C" : "#4a5878",
          transform: enabled ? "translateX(22px)" : "translateX(2px)",
          marginTop: "2px",
        }}
      />
    </button>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "CONFIRM",
  danger = false,
  onConfirm,
  onClose,
  requireTyping,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  requireTyping?: string;
}) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!open) setTyped("");
  }, [open]);
  if (!open) return null;
  const canConfirm = !requireTyping || typed === requireTyping;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(11,15,28,0.85)" }}
      data-ocid="settings.dialog"
    >
      <div
        className="w-full max-w-sm border rounded-sm p-6 space-y-4"
        style={{
          backgroundColor: "#141929",
          borderColor: danger ? "#FF3B3B" : "#1E2A45",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <p
            className="text-sm font-bold font-display uppercase tracking-wider"
            style={{ color: danger ? "#FF3B3B" : "#00A3FF" }}
          >
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="settings.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
        {requireTyping && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground">
              TYPE <span style={{ color: "#FF3B3B" }}>{requireTyping}</span> TO
              CONFIRM
            </p>
            <FieldInput
              value={typed}
              onChange={setTyped}
              placeholder={requireTyping}
              ocid="settings.confirm_type_input"
            />
          </div>
        )}
        <div className="flex gap-3 pt-1">
          <ActionButton
            variant="ghost"
            onClick={onClose}
            ocid="settings.cancel_button"
          >
            CANCEL
          </ActionButton>
          <ActionButton
            variant={danger ? "danger" : "primary"}
            onClick={() => {
              if (canConfirm) {
                onConfirm();
                onClose();
              }
            }}
            disabled={!canConfirm}
            ocid="settings.confirm_button"
          >
            {confirmLabel}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: ACCOUNT ─────────────────────────────────────────────────────────────
function AccountTab() {
  const { user, logout, addToast } = useRakshakStore();
  const navigate = useNavigate();
  const [showChangePw, setShowChangePw] = useState(false);
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwSaved, setPwSaved] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const initials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

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
    }, 2000);
    addToast({ type: "success", message: "Password changed successfully" });
  };

  const handleDeleteAccount = () => {
    addToast({ type: "info", message: "Account deletion requested" });
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="space-y-6" data-ocid="settings.account.panel">
      {/* Identity card */}
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold font-display flex-shrink-0"
            style={{
              backgroundColor: "rgba(0,163,255,0.15)",
              border: "2px solid #00A3FF",
              color: "#00A3FF",
            }}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-bold font-display tracking-wider text-foreground uppercase truncate">
              {user?.displayName ?? "USER"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email}
            </p>
            <span
              className="inline-block mt-1 text-[9px] font-bold tracking-widest font-display uppercase px-2 py-0.5"
              style={{
                backgroundColor: "rgba(0,163,255,0.1)",
                color: "#00A3FF",
                border: "1px solid rgba(0,163,255,0.3)",
              }}
            >
              ADMIN
            </span>
          </div>
        </div>
      </Card>

      {/* Change password */}
      <div>
        <SectionLabel>Security</SectionLabel>
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-foreground">Password</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Change your account password
                </p>
              </div>
              {!showChangePw && (
                <ActionButton
                  variant="outline"
                  onClick={() => setShowChangePw(true)}
                  ocid="settings.change_password_button"
                >
                  CHANGE
                </ActionButton>
              )}
            </div>
            {showChangePw && (
              <div
                className="mt-4 space-y-3 border-t pt-4"
                style={{ borderColor: "#1E2A45" }}
              >
                <FieldInput
                  value={oldPw}
                  onChange={setOldPw}
                  placeholder="Current password"
                  type="password"
                  ocid="settings.current_password_input"
                />
                <FieldInput
                  value={newPw}
                  onChange={setNewPw}
                  placeholder="New password"
                  type="password"
                  ocid="settings.new_password_input"
                />
                <FieldInput
                  value={confirmPw}
                  onChange={setConfirmPw}
                  placeholder="Confirm new password"
                  type="password"
                  ocid="settings.confirm_password_input"
                />
                <div className="flex gap-2 pt-1">
                  <ActionButton
                    variant="primary"
                    onClick={handleSavePassword}
                    ocid="settings.save_password_button"
                  >
                    {pwSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> SAVED
                      </>
                    ) : (
                      "SAVE PASSWORD"
                    )}
                  </ActionButton>
                  <ActionButton
                    variant="ghost"
                    onClick={() => setShowChangePw(false)}
                    ocid="settings.cancel_password_button"
                  >
                    CANCEL
                  </ActionButton>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Sign out */}
      <div>
        <SectionLabel>Session</SectionLabel>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-foreground">Sign Out</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                End your current session
              </p>
            </div>
            <ActionButton
              variant="danger"
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              ocid="settings.signout_button"
            >
              <LogOut className="w-3.5 h-3.5" /> SIGN OUT
            </ActionButton>
          </div>
        </Card>
      </div>

      {/* Danger zone */}
      <div>
        <SectionLabel>Danger Zone</SectionLabel>
        <div
          className="rounded-sm border-l-2 p-4 space-y-3"
          style={{
            backgroundColor: "rgba(255,59,59,0.05)",
            borderLeft: "2px solid #FF3B3B",
            border: "1px solid rgba(255,59,59,0.3)",
          }}
        >
          <div>
            <p className="text-sm font-bold" style={{ color: "#FF3B3B" }}>
              Delete Account
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
              Permanently delete your account and all paired devices. This
              cannot be undone.
            </p>
          </div>
          <ActionButton
            variant="danger"
            onClick={() => setShowDeleteDialog(true)}
            ocid="settings.delete_account_button"
          >
            <Trash2 className="w-3.5 h-3.5" /> DELETE ACCOUNT
          </ActionButton>
        </div>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Account"
        body="This will permanently delete your account and all paired devices. This cannot be undone."
        confirmLabel="DELETE ACCOUNT"
        danger
        onConfirm={handleDeleteAccount}
        onClose={() => setShowDeleteDialog(false)}
        requireTyping="DELETE"
      />
    </div>
  );
}

// ─── Tab: DEVICES ─────────────────────────────────────────────────────────────
function DevicesTab() {
  const { devices, setDevices, setActiveDevice, addToast } = useRakshakStore();
  const navigate = useNavigate();
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameName, setRenameName] = useState("");
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");
  const [pairing, setPairing] = useState(false);

  const fmtTime = (iso: string) => {
    const diffMs = Date.now() - new Date(iso).getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.floor(diffHr / 24)}d ago`;
  };

  const handleRename = async (deviceId: string) => {
    if (!renameName.trim()) return;
    await renameDevice(deviceId, renameName.trim());
    const updated = await getDevices();
    setDevices(updated);
    setRenameId(null);
    addToast({ type: "success", message: "Device renamed" });
  };

  const handleRemove = async (deviceId: string) => {
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
        message: "Pairing failed. Check the device ID.",
      });
    }
    setPairing(false);
  };

  return (
    <div className="space-y-4" data-ocid="settings.devices.panel">
      {devices.length === 0 ? (
        <Card
          className="p-8 text-center"
          data-ocid="settings.devices.empty_state"
        >
          <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-bold text-muted-foreground font-display uppercase tracking-widest">
            No Devices Paired
          </p>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Add your first Rakshak device to get started.
          </p>
          <ActionButton
            variant="primary"
            onClick={() => navigate({ to: "/setup" })}
            ocid="settings.pair_first_device_button"
          >
            <Plus className="w-3.5 h-3.5" /> PAIR DEVICE
          </ActionButton>
        </Card>
      ) : (
        <Card>
          {devices.map((d, idx) => (
            <div
              key={d.deviceId}
              className="p-4 border-b last:border-b-0"
              style={{ borderColor: "#1E2A45" }}
              data-ocid={`settings.devices.item.${idx + 1}`}
            >
              {renameId === d.deviceId ? (
                <div className="space-y-2">
                  <FieldInput
                    value={renameName}
                    onChange={setRenameName}
                    placeholder="Device name"
                    ocid={`settings.rename_input.${idx + 1}`}
                  />
                  <div className="flex gap-2">
                    <ActionButton
                      variant="primary"
                      onClick={() => handleRename(d.deviceId)}
                      ocid={`settings.save_rename_button.${idx + 1}`}
                    >
                      <Check className="w-3.5 h-3.5" /> SAVE
                    </ActionButton>
                    <ActionButton
                      variant="ghost"
                      onClick={() => setRenameId(null)}
                      ocid={`settings.cancel_rename_button.${idx + 1}`}
                    >
                      CANCEL
                    </ActionButton>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: d.online ? "#00E676" : "#FF3B3B",
                          boxShadow: d.online ? "0 0 6px #00E676" : "none",
                        }}
                      />
                      <p className="font-bold font-display uppercase tracking-wider text-foreground text-sm">
                        {d.name}
                      </p>
                      <span
                        className="text-[9px] font-mono px-1.5 py-0.5"
                        style={{
                          backgroundColor: "rgba(0,163,255,0.08)",
                          color: "#00A3FF",
                          border: "1px solid rgba(0,163,255,0.25)",
                        }}
                      >
                        {d.deviceId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-[9px] font-bold tracking-widest font-display uppercase px-1.5 py-0.5"
                        style={{
                          backgroundColor: d.online
                            ? "rgba(0,230,118,0.1)"
                            : "rgba(255,59,59,0.1)",
                          color: d.online ? "#00E676" : "#FF3B3B",
                        }}
                      >
                        {d.online ? "ONLINE" : "OFFLINE"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Last seen {fmtTime(d.lastSeen)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded"
                      onClick={() => {
                        setRenameId(d.deviceId);
                        setRenameName(d.name);
                      }}
                      aria-label="Rename device"
                      data-ocid={`settings.rename_device_button.${idx + 1}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 transition-colors rounded"
                      style={{ color: "#FF3B3B" }}
                      onClick={() => setRemoveId(d.deviceId)}
                      aria-label="Remove device"
                      data-ocid={`settings.remove_device_button.${idx + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Card>
      )}

      {showAdd ? (
        <Card className="p-4 space-y-3">
          <SectionLabel>Pair New Device</SectionLabel>
          <FieldInput
            value={newId}
            onChange={(v) => setNewId(v.toUpperCase())}
            placeholder="Device ID (e.g. RKSH-A3F7)"
            ocid="settings.add_device_id_input"
          />
          <FieldInput
            value={newName}
            onChange={setNewName}
            placeholder="Device name (e.g. Home)"
            ocid="settings.add_device_name_input"
          />
          <div className="flex gap-2">
            <ActionButton
              variant="primary"
              onClick={handlePair}
              disabled={pairing}
              ocid="settings.pair_device_button"
            >
              {pairing ? (
                "PAIRING..."
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" /> PAIR DEVICE
                </>
              )}
            </ActionButton>
            <ActionButton
              variant="ghost"
              onClick={() => setShowAdd(false)}
              ocid="settings.cancel_add_button"
            >
              CANCEL
            </ActionButton>
          </div>
        </Card>
      ) : (
        <ActionButton
          variant="outline"
          onClick={() => setShowAdd(true)}
          ocid="settings.add_device_button"
          fullWidth
        >
          <Plus className="w-3.5 h-3.5" /> ADD NEW DEVICE
        </ActionButton>
      )}

      <ConfirmDialog
        open={removeId !== null}
        title="Remove Device"
        body={`Remove "${devices.find((d) => d.deviceId === removeId)?.name}" from your account? You can re-pair it later.`}
        confirmLabel="REMOVE"
        danger
        onConfirm={() => {
          if (removeId) handleRemove(removeId);
        }}
        onClose={() => setRemoveId(null)}
      />
    </div>
  );
}

// ─── Tab: NOTIFICATIONS ───────────────────────────────────────────────────────
const NOTIF_ROWS: {
  key: keyof UserSettings;
  label: string;
  desc: string;
  icon: string;
}[] = [
  {
    key: "notif_sensor_alarms",
    label: "SENSOR ALARMS",
    desc: "Motion or contact sensor triggered",
    icon: "🚨",
  },
  {
    key: "notif_sos",
    label: "SOS ALERTS",
    desc: "SOS button pressed",
    icon: "🆘",
  },
  {
    key: "notif_arm_events",
    label: "ARM EVENTS",
    desc: "Zone armed from any source",
    icon: "🔒",
  },
  {
    key: "notif_disarm_events",
    label: "DISARM EVENTS",
    desc: "Zone disarmed",
    icon: "🔓",
  },
  {
    key: "notif_power_alerts",
    label: "POWER ALERTS",
    desc: "AC power cut or restored",
    icon: "⚡",
  },
  {
    key: "notif_device_status",
    label: "DEVICE STATUS",
    desc: "Device online or offline",
    icon: "📡",
  },
];

function NotificationsTab() {
  const { userSettings, setUserSettings, addToast } = useRakshakStore();
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = (key: keyof UserSettings, value: boolean) => {
    setUserSettings({ ...userSettings, [key]: value });
    if (timerRef.current) clearTimeout(timerRef.current);
    setSavedKey(key);
    timerRef.current = setTimeout(() => setSavedKey(null), 1500);
    if (key !== "masterNotifications") {
      addToast({
        type: "success",
        message: "Preference saved",
        duration: 2000,
      });
    }
  };

  const master = userSettings.masterNotifications;

  return (
    <div className="space-y-4" data-ocid="settings.notifications.panel">
      {/* Master toggle */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold font-display uppercase tracking-widest text-sm text-foreground">
              PUSH NOTIFICATIONS
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Master switch for all notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            {savedKey === "masterNotifications" && (
              <span
                className="text-[10px] font-bold tracking-widest font-display"
                style={{ color: "#00E676" }}
              >
                SAVED
              </span>
            )}
            <Toggle
              enabled={master}
              onChange={(v) => update("masterNotifications", v)}
              ocid="settings.notif_master"
            />
          </div>
        </div>
      </Card>

      {/* Per-event toggles */}
      <Card>
        {NOTIF_ROWS.map((row, idx) => (
          <div
            key={row.key}
            className="flex items-center justify-between px-4 py-3.5 border-b last:border-b-0 transition-opacity"
            style={{ borderColor: "#1E2A45", opacity: master ? 1 : 0.45 }}
            data-ocid={`settings.notif.item.${idx + 1}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl flex-shrink-0">{row.icon}</span>
              <div>
                <p className="text-xs font-bold font-display uppercase tracking-widest text-foreground">
                  {row.label}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {row.desc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {savedKey === row.key && (
                <span
                  className="text-[10px] font-bold tracking-widest font-display"
                  style={{ color: "#00E676" }}
                >
                  SAVED
                </span>
              )}
              <Toggle
                enabled={userSettings[row.key]}
                onChange={(v) => update(row.key, v)}
                ocid={`settings.notif_${row.key}`}
                disabled={!master}
              />
            </div>
          </div>
        ))}
      </Card>

      {!master && (
        <div
          className="flex items-center gap-2.5 px-4 py-3 rounded-sm border"
          style={{
            backgroundColor: "rgba(255,165,0,0.08)",
            borderColor: "rgba(255,165,0,0.3)",
            color: "#FFA500",
          }}
        >
          <BellOff className="w-4 h-4 flex-shrink-0" />
          <p className="text-[11px] font-bold tracking-wider font-display uppercase">
            All notifications are currently paused
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Tab: USERS ───────────────────────────────────────────────────────────────
function UsersTab() {
  const { invitedUsers, setInvitedUsers, addToast } = useRakshakStore();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"control" | "view">("control");
  const [removing, setRemoving] = useState<string | null>(null);

  const handleInvite = () => {
    if (!email.trim() || !email.includes("@")) {
      addToast({ type: "error", message: "Enter a valid email address" });
      return;
    }
    if (invitedUsers.find((u) => u.email === email.trim())) {
      addToast({ type: "error", message: "User already invited" });
      return;
    }
    const newUser: InvitedUser = {
      email: email.trim(),
      role,
      addedAt: new Date().toISOString(),
    };
    setInvitedUsers([...invitedUsers, newUser]);
    setEmail("");
    addToast({ type: "success", message: `Invite sent to ${newUser.email}` });
  };

  const handleRemove = (em: string) => {
    setInvitedUsers(invitedUsers.filter((u) => u.email !== em));
    addToast({ type: "success", message: "User removed" });
  };

  return (
    <div className="space-y-6" data-ocid="settings.users.panel">
      <div>
        <SectionLabel>Share Access</SectionLabel>
        <Card className="p-4 space-y-3">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Invited users can control devices linked to your account. They
            receive their own login with the role you assign.
          </p>
          <FieldInput
            value={email}
            onChange={setEmail}
            placeholder="Email address"
            type="email"
            ocid="settings.invite_email_input"
          />
          <div className="flex gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "control" | "view")}
              className="flex-1 px-3 py-2 text-xs bg-[#0B0F1C] border border-[#1E2A45] text-foreground focus:outline-none focus:border-[#00A3FF] rounded-sm"
              data-ocid="settings.invite_role_select"
            >
              <option value="control">Full Control</option>
              <option value="view">View Only</option>
            </select>
            <ActionButton
              variant="primary"
              onClick={handleInvite}
              ocid="settings.invite_button"
            >
              <Plus className="w-3.5 h-3.5" /> INVITE
            </ActionButton>
          </div>
        </Card>
      </div>

      {invitedUsers.length > 0 && (
        <div>
          <SectionLabel>Invited Users ({invitedUsers.length})</SectionLabel>
          <Card>
            {invitedUsers.map((u, i) => (
              <div
                key={u.email}
                className="flex items-center justify-between px-4 py-3.5 border-b last:border-b-0 gap-3"
                style={{ borderColor: "#1E2A45" }}
                data-ocid={`settings.users.item.${i + 1}`}
              >
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{u.email}</p>
                  <span
                    className="inline-block mt-1 text-[9px] font-bold tracking-widest font-display uppercase px-2 py-0.5"
                    style={{
                      backgroundColor:
                        u.role === "control"
                          ? "rgba(255,59,59,0.12)"
                          : "rgba(0,163,255,0.10)",
                      color: u.role === "control" ? "#FF3B3B" : "#00A3FF",
                      border: `1px solid ${u.role === "control" ? "rgba(255,59,59,0.3)" : "rgba(0,163,255,0.3)"}`,
                    }}
                  >
                    {u.role === "control" ? "FULL CONTROL" : "VIEW ONLY"}
                  </span>
                </div>
                <button
                  type="button"
                  className="p-2 transition-colors rounded flex-shrink-0"
                  style={{ color: "#FF3B3B" }}
                  onClick={() => setRemoving(u.email)}
                  aria-label="Remove user"
                  data-ocid={`settings.remove_user_button.${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </Card>
        </div>
      )}

      <ConfirmDialog
        open={removing !== null}
        title="Remove User"
        body={`Remove ${removing} from your account? They will lose all access to your devices.`}
        confirmLabel="REMOVE"
        danger
        onConfirm={() => {
          if (removing) handleRemove(removing);
        }}
        onClose={() => setRemoving(null)}
      />
    </div>
  );
}

// ─── Tab: ZONE LABELS ─────────────────────────────────────────────────────────
function ZoneLabelsTab() {
  const { zoneLabels, setZoneLabels, addToast } = useRakshakStore();
  const [z1, setZ1] = useState(zoneLabels.arm1);
  const [z2, setZ2] = useState(zoneLabels.arm2);

  const handleSave = () => {
    if (!z1.trim() || !z2.trim()) {
      addToast({ type: "error", message: "Zone labels cannot be empty" });
      return;
    }
    setZoneLabels({ arm1: z1.trim(), arm2: z2.trim() });
    addToast({ type: "success", message: "Zone labels saved" });
  };

  return (
    <div className="space-y-6" data-ocid="settings.zones.panel">
      <div>
        <SectionLabel>Zone Labels</SectionLabel>
        <p className="text-[11px] text-muted-foreground mb-4">
          Zone labels appear on the Dashboard and Alerts screens.
        </p>
        <Card className="p-4 space-y-4">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground">
              ZONE 1 LABEL
            </p>
            <FieldInput
              value={z1}
              onChange={setZ1}
              placeholder="Away / Full Arm"
              ocid="settings.zone1_label_input"
            />
          </div>
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground">
              ZONE 2 LABEL
            </p>
            <FieldInput
              value={z2}
              onChange={setZ2}
              placeholder="Home / Perimeter"
              ocid="settings.zone2_label_input"
            />
          </div>
          <ActionButton
            variant="primary"
            onClick={handleSave}
            ocid="settings.save_zones_button"
          >
            <Check className="w-3.5 h-3.5" /> SAVE LABELS
          </ActionButton>
        </Card>
      </div>

      <div
        className="flex items-center gap-2.5 px-4 py-3 rounded-sm border text-sm"
        style={{
          backgroundColor: "rgba(0,163,255,0.06)",
          borderColor: "rgba(0,163,255,0.2)",
          color: "#00A3FF",
        }}
      >
        <ChevronRight className="w-4 h-4 flex-shrink-0" />
        <p className="text-[11px] font-bold tracking-wider font-display uppercase">
          ARM 1: "{zoneLabels.arm1}" &nbsp;·&nbsp; ARM 2: "{zoneLabels.arm2}"
        </p>
      </div>
    </div>
  );
}

// ─── Tab: ABOUT ───────────────────────────────────────────────────────────────
function AboutTab() {
  const { status } = useRakshakStore();

  return (
    <div className="space-y-4" data-ocid="settings.about.panel">
      <Card className="p-5">
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "rgba(0,163,255,0.15)",
              border: "1px solid rgba(0,163,255,0.3)",
            }}
          >
            <Shield className="w-5 h-5" style={{ color: "#00A3FF" }} />
          </div>
          <div>
            <p className="font-bold font-display uppercase tracking-widest text-foreground">
              RAKSHAK WEB
            </p>
            <p className="text-[11px] text-muted-foreground">Version 1.0.0</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Platform", value: "Cloud / ESP32" },
            {
              label: "Device Firmware",
              value: status?.online ? "v1.4.2 (ESP32)" : "N/A",
            },
            { label: "Build", value: "2026.05.05" },
            { label: "Protocol", value: "MQTT + WebSocket" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] font-bold tracking-widest font-display uppercase text-muted-foreground">
                {item.label}
              </p>
              <p className="text-sm text-foreground mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="divide-y" style={{ borderColor: "#1E2A45" }}>
        {[
          {
            label: "Support",
            href: "mailto:support@rakshak.app",
            value: "support@rakshak.app",
          },
          { label: "Privacy Policy", href: "#", value: "View Policy" },
          { label: "Terms of Service", href: "#", value: "View Terms" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-4 py-3.5"
            style={{ borderColor: "#1E2A45" }}
          >
            <p className="text-xs font-bold font-display uppercase tracking-wider text-foreground">
              {item.label}
            </p>
            <a
              href={item.href}
              className="text-xs font-bold tracking-wider font-display uppercase transition-opacity hover:opacity-70"
              style={{ color: "#00A3FF" }}
            >
              {item.value}
            </a>
          </div>
        ))}
      </Card>

      <div className="flex justify-center pt-2">
        <span
          className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest font-display uppercase"
          style={{ color: "rgba(0,163,255,0.45)" }}
        >
          <Zap className="w-3.5 h-3.5" />
          RAKSHAK WEB v1.0.0
        </span>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function SettingsPage() {
  useAuthGuard();
  const [activeTab, setActiveTab] = useState<Tab>("account");

  const tabContent: Record<Tab, React.ReactNode> = {
    account: <AccountTab />,
    devices: <DevicesTab />,
    notifications: <NotificationsTab />,
    users: <UsersTab />,
    zones: <ZoneLabelsTab />,
    about: <AboutTab />,
  };

  return (
    <div className="min-h-full" data-ocid="settings.page">
      {/* Page header */}
      <div className="px-4 pt-6 pb-4 md:px-8">
        <h1 className="text-2xl font-bold font-display uppercase tracking-widest text-foreground">
          SETTINGS
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure your Rakshak security system
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-0 md:gap-6 md:px-8 pb-10">
        {/* Mobile: horizontal scrollable tab bar */}
        <div
          className="flex md:hidden gap-1 px-4 pb-4 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold tracking-widest font-display uppercase whitespace-nowrap transition-all"
                style={{
                  backgroundColor: active ? "rgba(0,163,255,0.15)" : "#141929",
                  color: active ? "#00A3FF" : "#6B7280",
                  border: active
                    ? "1px solid rgba(0,163,255,0.35)"
                    : "1px solid #1E2A45",
                  borderRadius: "2px",
                }}
                onClick={() => setActiveTab(tab.id)}
                data-ocid={`settings.tab.${tab.id}`}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Desktop: vertical sidebar */}
        <nav className="hidden md:flex flex-col gap-0.5 w-48 flex-shrink-0 pt-0.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                className="flex items-center gap-2.5 px-3 py-2.5 text-[11px] font-bold tracking-widest font-display uppercase transition-all text-left w-full"
                style={{
                  backgroundColor: active
                    ? "rgba(0,163,255,0.12)"
                    : "transparent",
                  color: active ? "#00A3FF" : "#6B7280",
                  borderLeft: active
                    ? "2px solid #00A3FF"
                    : "2px solid transparent",
                  borderRadius: "0 2px 2px 0",
                }}
                onClick={() => setActiveTab(tab.id)}
                data-ocid={`settings.tab.${tab.id}`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 px-4 md:px-0">
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
}
