import SystemTypes "../types/system";
import LogTypes "../types/log";
import SettingsTypes "../types/settings";
import SystemLib "../lib/system";
import SettingsLib "../lib/settings";
import LogLib "../lib/log";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  systemState : SystemTypes.SystemState,
  logs : List.List<LogTypes.LogEntry>,
  appSettings : SettingsTypes.AppSettings
) {
  public query func getStatus() : async SystemTypes.SystemStatePublic {
    SystemLib.toPublic(systemState);
  };

  public func armSystem(mode : Text, pin : Text) : async Bool {
    if (not SettingsLib.verifyPin(appSettings, pin)) { return false };
    let now = Time.now();
    SystemLib.arm(systemState, mode, now);
    let entry : LogTypes.LogEntry = {
      id = "log-" # now.toText();
      eventType = "arm";
      description = "System armed in " # mode # " mode";
      timestamp = now;
      armedBy = ?"app";
      sensorId = null;
    };
    ignore LogLib.addLog(logs, entry);
    true;
  };

  public func disarmSystem(pin : Text) : async Bool {
    if (not SettingsLib.verifyPin(appSettings, pin)) { return false };
    let now = Time.now();
    SystemLib.disarm(systemState);
    let entry : LogTypes.LogEntry = {
      id = "log-d" # now.toText();
      eventType = "disarm";
      description = "System disarmed";
      timestamp = now;
      armedBy = ?"app";
      sensorId = null;
    };
    ignore LogLib.addLog(logs, entry);
    true;
  };
};
