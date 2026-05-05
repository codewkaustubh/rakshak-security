import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Sensor {
    id: string;
    status: string;
    signalPercent?: bigint;
    batteryPercent?: bigint;
    name: string;
    type: string;
    zone: string;
    bypassed: boolean;
    lastTriggered?: Timestamp;
}
export type Timestamp = bigint;
export interface LogEntry {
    id: string;
    armedBy?: string;
    description: string;
    sensorId?: string;
    timestamp: Timestamp;
    eventType: string;
}
export interface Contact {
    id: string;
    name: string;
    role: string;
    receiveSms: boolean;
    phone: string;
    receiveCall: boolean;
}
export interface SystemStatePublic {
    armed: boolean;
    signalStrength: bigint;
    lastArmedTime?: Timestamp;
    mode: string;
    armedBy: string;
    triggeredSensorId?: string;
    connectionStatus: string;
}
export interface AppSettingsPublic {
    pin: string;
    notificationsEnabled: boolean;
    sirenDuration: string;
    simStatus: string;
    deviceIp: string;
    entryDelay: bigint;
    firmwareVersion: string;
    exitDelay: bigint;
}
export interface backendInterface {
    addContact(contact: Contact): Promise<string>;
    addLog(entry: LogEntry): Promise<string>;
    addSensor(sensor: Sensor): Promise<string>;
    armSystem(mode: string, pin: string): Promise<boolean>;
    changePin(oldPin: string, newPin: string): Promise<boolean>;
    deleteContact(id: string): Promise<boolean>;
    deleteSensor(id: string): Promise<boolean>;
    disarmSystem(pin: string): Promise<boolean>;
    getContacts(): Promise<Array<Contact>>;
    getLogs(): Promise<Array<LogEntry>>;
    getSensors(): Promise<Array<Sensor>>;
    getSettings(): Promise<AppSettingsPublic>;
    getStatus(): Promise<SystemStatePublic>;
    seedDemoData(): Promise<boolean>;
    updateContact(id: string, contact: Contact): Promise<boolean>;
    updateSensorBypass(id: string, bypassed: boolean): Promise<boolean>;
    updateSettings(settings: AppSettingsPublic): Promise<boolean>;
}
