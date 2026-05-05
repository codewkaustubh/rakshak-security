import SensorTypes "../types/sensor";
import ContactTypes "../types/contact";
import LogTypes "../types/log";
import SensorLib "../lib/sensor";
import ContactLib "../lib/contact";
import LogLib "../lib/log";
import List "mo:core/List";

mixin (
  sensors : List.List<SensorTypes.Sensor>,
  contacts : List.List<ContactTypes.Contact>,
  logs : List.List<LogTypes.LogEntry>
) {
  public func seedDemoData() : async Bool {
    // Clear existing data
    sensors.clear();
    contacts.clear();
    logs.clear();

    // --- Sensors: Ground Floor ---
    ignore SensorLib.addSensor(
      sensors,
      {
        id = "sensor-1";
        name = "Front Door";
        zone = "Ground Floor";
        type_ = "door";
        status = "active";
        lastTriggered = ?1746374400000000000; // May 4 2026 ~23:45
        bypassed = false;
        batteryPercent = ?92;
        signalPercent = ?87;
      }
    );
    ignore SensorLib.addSensor(
      sensors,
      {
        id = "sensor-2";
        name = "Kitchen Smoke";
        zone = "Ground Floor";
        type_ = "smoke";
        status = "active";
        lastTriggered = null;
        bypassed = false;
        batteryPercent = ?78;
        signalPercent = ?95;
      }
    );
    ignore SensorLib.addSensor(
      sensors,
      {
        id = "sensor-3";
        name = "Living Room Motion";
        zone = "Ground Floor";
        type_ = "motion";
        status = "active";
        lastTriggered = ?1746374400000000000;
        bypassed = false;
        batteryPercent = ?65;
        signalPercent = ?82;
      }
    );

    // --- Sensors: First Floor ---
    ignore SensorLib.addSensor(
      sensors,
      {
        id = "sensor-4";
        name = "Master Bedroom Window";
        zone = "First Floor";
        type_ = "window";
        status = "active";
        lastTriggered = null;
        bypassed = false;
        batteryPercent = ?88;
        signalPercent = ?76;
      }
    );
    ignore SensorLib.addSensor(
      sensors,
      {
        id = "sensor-5";
        name = "Stairs Motion";
        zone = "First Floor";
        type_ = "motion";
        status = "active";
        lastTriggered = null;
        bypassed = false;
        batteryPercent = ?55;
        signalPercent = ?90;
      }
    );
    ignore SensorLib.addSensor(
      sensors,
      {
        id = "sensor-6";
        name = "Bathroom Window";
        zone = "First Floor";
        type_ = "window";
        status = "active";
        lastTriggered = null;
        bypassed = true;
        batteryPercent = ?40;
        signalPercent = ?71;
      }
    );

    // --- Contacts ---
    ignore ContactLib.addContact(
      contacts,
      {
        id = "contact-1";
        name = "Raj Kumar";
        phone = "+91-9876543210";
        role = "primary";
        receiveCall = true;
        receiveSms = true;
      }
    );
    ignore ContactLib.addContact(
      contacts,
      {
        id = "contact-2";
        name = "Priya Singh";
        phone = "+91-8765432109";
        role = "secondary";
        receiveCall = true;
        receiveSms = true;
      }
    );

    // --- Activity Logs (newest first) ---
    // Use fixed timestamps to avoid repeated Time.now() calls
    // Base: May 5 2026 10:32 AM IST = 1746415320000000000 ns
    let t0 : Int = 1746415320000000000; // May 5 10:32 AM — armed
    let t1 : Int = 1746411720000000000; // May 5 09:22 AM — disarmed
    let t2 : Int = 1746408120000000000; // May 5 08:12 AM — armed
    let t3 : Int = 1746374520000000000; // May 4 11:42 PM — disarmed
    let t4 : Int = 1746374400000000000; // May 4 11:40 PM — alert front door
    let t5 : Int = 1746374280000000000; // May 4 11:38 PM — alert living room
    let t6 : Int = 1746374160000000000; // May 4 11:36 PM — SMS sent
    let t7 : Int = 1746374040000000000; // May 4 11:34 PM — call placed
    let t8 : Int = 1746370440000000000; // May 4 10:34 PM — armed
    let t9 : Int = 1746366840000000000; // May 4 09:34 PM — disarmed

    logs.add({
      id = "log-1";
      eventType = "arm";
      description = "System Armed — AWAY mode";
      timestamp = t0;
      armedBy = ?"app";
      sensorId = null;
    });
    logs.add({
      id = "log-2";
      eventType = "disarm";
      description = "System Disarmed";
      timestamp = t1;
      armedBy = ?"app";
      sensorId = null;
    });
    logs.add({
      id = "log-3";
      eventType = "arm";
      description = "System Armed — HOME mode";
      timestamp = t2;
      armedBy = ?"keypad";
      sensorId = null;
    });
    logs.add({
      id = "log-4";
      eventType = "disarm";
      description = "System Disarmed";
      timestamp = t3;
      armedBy = ?"sms";
      sensorId = null;
    });
    logs.add({
      id = "log-5";
      eventType = "alert";
      description = "ALERT: Front Door triggered";
      timestamp = t4;
      armedBy = null;
      sensorId = ?"sensor-1";
    });
    logs.add({
      id = "log-6";
      eventType = "alert";
      description = "ALERT: Living Room Motion triggered";
      timestamp = t5;
      armedBy = null;
      sensorId = ?"sensor-3";
    });
    logs.add({
      id = "log-7";
      eventType = "sms";
      description = "SMS sent to 2 contacts";
      timestamp = t6;
      armedBy = null;
      sensorId = null;
    });
    logs.add({
      id = "log-8";
      eventType = "call";
      description = "Call placed to +91-9876543210";
      timestamp = t7;
      armedBy = null;
      sensorId = null;
    });
    logs.add({
      id = "log-9";
      eventType = "arm";
      description = "System Armed — AWAY mode";
      timestamp = t8;
      armedBy = ?"app";
      sensorId = null;
    });
    logs.add({
      id = "log-10";
      eventType = "disarm";
      description = "System Disarmed";
      timestamp = t9;
      armedBy = ?"remote";
      sensorId = null;
    });

    true;
  };
};
