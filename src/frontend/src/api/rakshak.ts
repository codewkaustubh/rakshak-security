import { MOCK_DEVICES, MOCK_LOGS, MOCK_STATUS } from "@/api/mockData";
import { useRakshakStore } from "@/store/useRakshakStore";
import type {
  DeviceCommand,
  DeviceStatus,
  LogEntry,
  PairedDevice,
} from "@/types";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(): Promise<void> {
  return delay(200 + Math.random() * 200);
}

// Mutable state for mock session (resets on page reload)
let mockDevices: PairedDevice[] = [...MOCK_DEVICES];
const mockStatuses: Map<string, DeviceStatus> = new Map([
  ["RKSH-A3F7", { ...MOCK_STATUS }],
  [
    "RKSH-B9C2",
    { ...MOCK_STATUS, deviceId: "RKSH-B9C2", name: "Office", online: false },
  ],
]);

export async function getDevices(): Promise<PairedDevice[]> {
  await randomDelay();
  return [...mockDevices];
}

export async function getDeviceStatus(deviceId: string): Promise<DeviceStatus> {
  await randomDelay();
  const status = mockStatuses.get(deviceId);
  if (!status) throw new Error(`Device ${deviceId} not found`);
  return { ...status, lastSeen: new Date().toISOString() };
}

export async function getDeviceLogs(
  deviceId: string,
  filter?: string,
): Promise<LogEntry[]> {
  await randomDelay();
  void deviceId;
  return MOCK_LOGS.filter((l) => {
    if (!filter || filter === "ALL") return true;
    if (filter === "ALARMS") return l.type === "alarm" || l.type === "sos";
    if (filter === "ARM") return l.type.includes("arm");
    if (filter === "POWER")
      return l.type === "ac_cut" || l.type === "ac_restored";
    if (filter === "SYSTEM")
      return l.type === "device_online" || l.type === "device_offline";
    return true;
  });
}

export async function sendCommand(
  deviceId: string,
  cmd: DeviceCommand,
): Promise<{ success: boolean; queued: boolean }> {
  await randomDelay();
  const status = mockStatuses.get(deviceId);
  if (!status) throw new Error(`Device ${deviceId} not found`);

  const store = useRakshakStore.getState();
  if (cmd === "arm1") {
    mockStatuses.set(deviceId, {
      ...status,
      arm1: true,
      lastEvent: "ARM1_ACTIVATED",
    });
    store.updateZone("arm1", true);
  } else if (cmd === "disarm1") {
    mockStatuses.set(deviceId, {
      ...status,
      arm1: false,
      lastEvent: "ARM1_DISARMED",
    });
    store.updateZone("arm1", false);
  } else if (cmd === "arm2") {
    mockStatuses.set(deviceId, {
      ...status,
      arm2: true,
      lastEvent: "ARM2_ACTIVATED",
    });
    store.updateZone("arm2", true);
  } else if (cmd === "disarm2") {
    mockStatuses.set(deviceId, {
      ...status,
      arm2: false,
      lastEvent: "ARM2_DISARMED",
    });
    store.updateZone("arm2", false);
  } else if (cmd === "disarmall") {
    mockStatuses.set(deviceId, {
      ...status,
      arm1: false,
      arm2: false,
      sirenActive: false,
      lastEvent: "DISARMED ALL",
    });
    store.updateZone("arm1", false);
    store.updateZone("arm2", false);
  }

  return { success: true, queued: false };
}

export async function pairDevice(
  deviceId: string,
  name: string,
): Promise<{ success: boolean }> {
  await delay(600);
  const exists = mockDevices.find((d) => d.deviceId === deviceId);
  if (exists) throw new Error("Device already paired");
  const newDevice: PairedDevice = {
    deviceId,
    name,
    online: false,
    lastSeen: new Date().toISOString(),
  };
  mockDevices = [...mockDevices, newDevice];
  mockStatuses.set(deviceId, {
    deviceId,
    name,
    online: false,
    lastSeen: new Date().toISOString(),
    arm1: false,
    arm2: false,
    acPower: true,
    gsmSignal: 0,
    gsmQuality: "Unknown",
    sirenActive: false,
    lastEvent: "DEVICE_PAIRED",
  });
  return { success: true };
}

export async function renameDevice(
  deviceId: string,
  name: string,
): Promise<{ success: boolean }> {
  await randomDelay();
  mockDevices = mockDevices.map((d) =>
    d.deviceId === deviceId ? { ...d, name } : d,
  );
  const status = mockStatuses.get(deviceId);
  if (status) mockStatuses.set(deviceId, { ...status, name });
  return { success: true };
}

export async function removeDevice(
  deviceId: string,
): Promise<{ success: boolean }> {
  await randomDelay();
  mockDevices = mockDevices.filter((d) => d.deviceId !== deviceId);
  mockStatuses.delete(deviceId);
  return { success: true };
}
