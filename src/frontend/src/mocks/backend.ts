import type { backendInterface } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const oneHourAgo = now - BigInt(3_600_000_000_000);
const oneDayAgo = now - BigInt(86_400_000_000_000);

export const mockBackend: backendInterface = {
  getStatus: async () => ({
    armed: false,
    mode: "away",
    triggeredSensorId: undefined,
    lastArmedTime: oneHourAgo,
    armedBy: "app",
    connectionStatus: "online",
    signalStrength: BigInt(87),
  }),

  getSensors: async () => [
    {
      id: "s1",
      name: "Front Door",
      type: "door",
      zone: "Ground Floor",
      status: "active",
      bypassed: false,
      lastTriggered: oneHourAgo,
      signalPercent: BigInt(92),
      batteryPercent: BigInt(78),
    },
    {
      id: "s2",
      name: "Window 1",
      type: "window",
      zone: "Ground Floor",
      status: "active",
      bypassed: false,
      lastTriggered: oneDayAgo,
      signalPercent: BigInt(85),
      batteryPercent: BigInt(95),
    },
    {
      id: "s3",
      name: "Smoke – Kitchen",
      type: "smoke",
      zone: "Ground Floor",
      status: "active",
      bypassed: false,
      signalPercent: BigInt(90),
      batteryPercent: BigInt(60),
    },
    {
      id: "s4",
      name: "Back Door",
      type: "door",
      zone: "Ground Floor",
      status: "offline",
      bypassed: false,
      signalPercent: BigInt(20),
      batteryPercent: BigInt(10),
    },
    {
      id: "s5",
      name: "Master Bedroom Window",
      type: "window",
      zone: "First Floor",
      status: "active",
      bypassed: true,
      signalPercent: BigInt(75),
      batteryPercent: BigInt(80),
    },
  ],

  getLogs: async () => [
    {
      id: "l1",
      eventType: "arm",
      description: "System Armed — Away Mode",
      timestamp: oneHourAgo,
      armedBy: "app",
    },
    {
      id: "l2",
      eventType: "alert",
      description: "ALERT: Front Door triggered",
      timestamp: oneDayAgo,
      sensorId: "s1",
    },
    {
      id: "l3",
      eventType: "disarm",
      description: "System Disarmed",
      timestamp: oneDayAgo + BigInt(60_000_000_000),
      armedBy: "sms",
    },
    {
      id: "l4",
      eventType: "sms",
      description: "SMS sent to 3 contacts",
      timestamp: oneDayAgo + BigInt(65_000_000_000),
    },
  ],

  getContacts: async () => [
    {
      id: "c1",
      name: "Rahul Sharma",
      phone: "+91-98765-43210",
      role: "primary",
      receiveCall: true,
      receiveSms: true,
    },
    {
      id: "c2",
      name: "Priya Sharma",
      phone: "+91-87654-32109",
      role: "secondary",
      receiveCall: false,
      receiveSms: true,
    },
  ],

  getSettings: async () => ({
    pin: "****",
    entryDelay: BigInt(30),
    exitDelay: BigInt(30),
    sirenDuration: "3min",
    notificationsEnabled: true,
    deviceIp: "192.168.1.100",
    simStatus: "connected",
    firmwareVersion: "v2.4.1",
  }),

  armSystem: async (_mode: string, _pin: string) => true,
  disarmSystem: async (_pin: string) => true,
  addSensor: async (_sensor) => "s_new",
  deleteSensor: async (_id: string) => true,
  updateSensorBypass: async (_id: string, _bypassed: boolean) => true,
  addContact: async (_contact) => "c_new",
  updateContact: async (_id: string, _contact) => true,
  deleteContact: async (_id: string) => true,
  addLog: async (_entry) => "l_new",
  updateSettings: async (_settings) => true,
  changePin: async (_oldPin: string, _newPin: string) => true,
  seedDemoData: async () => true,
};
