import List "mo:core/List";
import SystemTypes "types/system";
import SensorTypes "types/sensor";
import ContactTypes "types/contact";
import LogTypes "types/log";
import SettingsTypes "types/settings";
import SettingsLib "lib/settings";
import SystemApi "mixins/system-api";
import SensorApi "mixins/sensor-api";
import ContactApi "mixins/contact-api";
import LogApi "mixins/log-api";
import SettingsApi "mixins/settings-api";
import DemoApi "mixins/demo-api";

actor {
  // --- Stable state ---
  let systemState : SystemTypes.SystemState = {
    var armed = false;
    var mode = "away";
    var triggeredSensorId = null;
    var lastArmedTime = null;
    var armedBy = "app";
    var connectionStatus = "online";
    var signalStrength = 100;
  };

  let sensors = List.empty<SensorTypes.Sensor>();
  let contacts = List.empty<ContactTypes.Contact>();
  let logs = List.empty<LogTypes.LogEntry>();
  let appSettings : SettingsTypes.AppSettings = SettingsLib.defaultSettings();

  // --- Mixin inclusions ---
  include SystemApi(systemState, logs, appSettings);
  include SensorApi(sensors);
  include ContactApi(contacts);
  include LogApi(logs);
  include SettingsApi(appSettings);
  include DemoApi(sensors, contacts, logs);
};
