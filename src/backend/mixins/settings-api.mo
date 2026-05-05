import SettingsTypes "../types/settings";
import SettingsLib "../lib/settings";

mixin (appSettings : SettingsTypes.AppSettings) {
  public query func getSettings() : async SettingsTypes.AppSettingsPublic {
    SettingsLib.toPublic(appSettings);
  };

  public func updateSettings(settings : SettingsTypes.AppSettingsPublic) : async Bool {
    appSettings.entryDelay := settings.entryDelay;
    appSettings.exitDelay := settings.exitDelay;
    appSettings.sirenDuration := settings.sirenDuration;
    appSettings.deviceIp := settings.deviceIp;
    appSettings.simStatus := settings.simStatus;
    appSettings.notificationsEnabled := settings.notificationsEnabled;
    true;
  };

  public func changePin(oldPin : Text, newPin : Text) : async Bool {
    SettingsLib.changePin(appSettings, oldPin, newPin);
  };
};
