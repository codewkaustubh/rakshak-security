// ─── Device & Status ──────────────────────────────────────────────────────────
export interface DeviceStatus {
  deviceId: string;
  name: string;
  online: boolean;
  lastSeen: string;
  arm1: boolean;
  arm2: boolean;
  acPower: boolean;
  gsmSignal: number;
  gsmQuality: string;
  sirenActive: boolean;
  lastEvent: string;
}

export interface PairedDevice {
  deviceId: string;
  name: string;
  online: boolean;
  lastSeen: string;
}

// ─── Event Log ────────────────────────────────────────────────────────────────
export type LogEventType =
  | "alarm"
  | "sos"
  | "arm1_activated"
  | "arm2_activated"
  | "arm1_disarmed"
  | "arm2_disarmed"
  | "disarmed_all"
  | "ac_cut"
  | "ac_restored"
  | "device_online"
  | "device_offline";

export type LogSource = "APP" | "REMOTE" | "SCREEN" | "SMS" | "DEVICE";

export interface LogEntry {
  id: string;
  timestamp: string;
  type: LogEventType;
  message: string;
  source: LogSource;
  arm1: boolean;
  arm2: boolean;
}

// ─── User & Auth ──────────────────────────────────────────────────────────────
export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
}

// ─── Settings ─────────────────────────────────────────────────────────────────
export interface UserSettings {
  masterNotifications: boolean;
  notif_sensor_alarms: boolean;
  notif_sos: boolean;
  notif_arm_events: boolean;
  notif_disarm_events: boolean;
  notif_power_alerts: boolean;
  notif_device_status: boolean;
}

export interface ZoneLabels {
  arm1: string;
  arm2: string;
}

export interface InvitedUser {
  email: string;
  role: "control" | "view";
  addedAt: string;
}

// ─── Alarm ────────────────────────────────────────────────────────────────────
export interface AlarmEvent {
  type: "SENSOR_ALARM" | "SOS";
  message: string;
  timestamp: string;
  source: string;
}

// ─── UI ───────────────────────────────────────────────────────────────────────
export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// ─── Commands ─────────────────────────────────────────────────────────────────
export type DeviceCommand =
  | "arm1"
  | "disarm1"
  | "arm2"
  | "disarm2"
  | "disarmall";
