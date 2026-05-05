import { MOCK_DEVICES, MOCK_STATUS, MOCK_USER } from "@/api/mockData";
import type {
  AlarmEvent,
  AppUser,
  DeviceStatus,
  InvitedUser,
  LogEntry,
  PairedDevice,
  Toast,
  UserSettings,
  ZoneLabels,
} from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Auth Slice ───────────────────────────────────────────────────────────────
interface AuthSlice {
  user: AppUser | null;
  isAuthenticated: boolean;
  hasDevices: boolean;
  setUser: (user: AppUser) => void;
  logout: () => void;
  setHasDevices: (has: boolean) => void;
}

// ─── Device Slice ─────────────────────────────────────────────────────────────
interface DeviceSlice {
  devices: PairedDevice[];
  activeDeviceId: string | null;
  status: DeviceStatus | null;
  logs: LogEntry[];
  isLoading: boolean;
  lastPoll: Date | null;
  setDevices: (devices: PairedDevice[]) => void;
  setActiveDevice: (deviceId: string) => void;
  setStatus: (status: DeviceStatus) => void;
  appendLogs: (logs: LogEntry[]) => void;
  setLoading: (loading: boolean) => void;
  updateZone: (zone: "arm1" | "arm2", armed: boolean) => void;
}

// ─── Alarm Slice ──────────────────────────────────────────────────────────────
interface AlarmSlice {
  alarm: AlarmEvent | null;
  triggerAlarm: (event: AlarmEvent) => void;
  clearAlarm: () => void;
}

// ─── Settings Slice ───────────────────────────────────────────────────────────
interface SettingsSlice {
  userSettings: UserSettings;
  zoneLabels: ZoneLabels;
  invitedUsers: InvitedUser[];
  setUserSettings: (settings: UserSettings) => void;
  setZoneLabels: (labels: ZoneLabels) => void;
  setInvitedUsers: (users: InvitedUser[]) => void;
}

// ─── UI Slice ─────────────────────────────────────────────────────────────────
interface UiSlice {
  unreadAlertCount: number;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearUnread: () => void;
  incrementUnread: () => void;
}

type RakshakStore = AuthSlice &
  DeviceSlice &
  AlarmSlice &
  SettingsSlice &
  UiSlice;

const DEFAULT_USER_SETTINGS: UserSettings = {
  masterNotifications: true,
  notif_sensor_alarms: true,
  notif_sos: true,
  notif_arm_events: true,
  notif_disarm_events: true,
  notif_power_alerts: true,
  notif_device_status: false,
};

const DEFAULT_ZONE_LABELS: ZoneLabels = {
  arm1: "Away / Full Arm",
  arm2: "Home / Perimeter",
};

export const useRakshakStore = create<RakshakStore>()(
  persist(
    (set, get) => ({
      // ── Auth ──
      user: MOCK_USER,
      isAuthenticated: true,
      hasDevices: true,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () =>
        set({ user: null, isAuthenticated: false, hasDevices: false }),
      setHasDevices: (hasDevices) => set({ hasDevices }),

      // ── Device ──
      devices: MOCK_DEVICES,
      activeDeviceId: MOCK_DEVICES[0]?.deviceId ?? null,
      status: MOCK_STATUS,
      logs: [],
      isLoading: false,
      lastPoll: null,
      setDevices: (devices) => set({ devices }),
      setActiveDevice: (deviceId) => set({ activeDeviceId: deviceId }),
      setStatus: (status) => set({ status, lastPoll: new Date() }),
      appendLogs: (logs) =>
        set((state) => ({
          logs: [...logs, ...state.logs].slice(0, 200),
        })),
      setLoading: (isLoading) => set({ isLoading }),
      updateZone: (zone, armed) =>
        set((state) => ({
          status: state.status ? { ...state.status, [zone]: armed } : null,
        })),

      // ── Alarm ──
      alarm: null,
      triggerAlarm: (event) => set({ alarm: event }),
      clearAlarm: () => set({ alarm: null }),

      // ── Settings ──
      userSettings: DEFAULT_USER_SETTINGS,
      zoneLabels: DEFAULT_ZONE_LABELS,
      invitedUsers: [
        {
          email: "family@example.com",
          role: "control",
          addedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          email: "guard@example.com",
          role: "view",
          addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      setUserSettings: (userSettings) => set({ userSettings }),
      setZoneLabels: (zoneLabels) => set({ zoneLabels }),
      setInvitedUsers: (invitedUsers) => set({ invitedUsers }),

      // ── UI ──
      unreadAlertCount: 3,
      toasts: [],
      addToast: (toast) => {
        const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
        const duration = toast.duration ?? 4000;
        setTimeout(() => get().removeToast(id), duration);
      },
      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
      clearUnread: () => set({ unreadAlertCount: 0 }),
      incrementUnread: () =>
        set((state) => ({ unreadAlertCount: state.unreadAlertCount + 1 })),
    }),
    {
      name: "rakshak-v2-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasDevices: state.hasDevices,
        userSettings: state.userSettings,
        zoneLabels: state.zoneLabels,
        activeDeviceId: state.activeDeviceId,
      }),
    },
  ),
);
