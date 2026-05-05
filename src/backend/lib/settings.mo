import SettingsTypes "../types/settings";

module {
  public type AppSettings = SettingsTypes.AppSettings;
  public type AppSettingsPublic = SettingsTypes.AppSettingsPublic;

  public func toPublic(s : AppSettings) : AppSettingsPublic {
    {
      entryDelay = s.entryDelay;
      exitDelay = s.exitDelay;
      sirenDuration = s.sirenDuration;
      pin = s.pin;
      deviceIp = s.deviceIp;
      simStatus = s.simStatus;
      notificationsEnabled = s.notificationsEnabled;
      firmwareVersion = s.firmwareVersion;
    };
  };

  public func getSettings(settings : AppSettings) : AppSettings {
    settings;
  };

  public func updateSettings(current : AppSettings, updated : AppSettings) {
    // Preserve the PIN — only changePin may modify it
    current.entryDelay := updated.entryDelay;
    current.exitDelay := updated.exitDelay;
    current.sirenDuration := updated.sirenDuration;
    current.deviceIp := updated.deviceIp;
    current.simStatus := updated.simStatus;
    current.notificationsEnabled := updated.notificationsEnabled;
  };

  public func verifyPin(settings : AppSettings, pin : Text) : Bool {
    settings.pin == pin;
  };

  public func changePin(settings : AppSettings, oldPin : Text, newPin : Text) : Bool {
    if (settings.pin != oldPin) { return false };
    settings.pin := newPin;
    true;
  };

  public func defaultSettings() : AppSettings {
    {
      var entryDelay = 30;
      var exitDelay = 30;
      var sirenDuration = "1min";
      var pin = "1234";
      var deviceIp = "192.168.1.100";
      var simStatus = "active";
      var notificationsEnabled = true;
      firmwareVersion = "v2.1.4";
    };
  };
};
