module {
  public type AppSettings = {
    var entryDelay : Nat; // 0-60 seconds
    var exitDelay : Nat; // 0-60 seconds
    var sirenDuration : Text; // 30s | 1min | 3min | until_disarmed
    var pin : Text; // hashed
    var deviceIp : Text;
    var simStatus : Text;
    var notificationsEnabled : Bool;
    firmwareVersion : Text;
  };

  // Shared-safe version for public API
  public type AppSettingsPublic = {
    entryDelay : Nat;
    exitDelay : Nat;
    sirenDuration : Text;
    pin : Text;
    deviceIp : Text;
    simStatus : Text;
    notificationsEnabled : Bool;
    firmwareVersion : Text;
  };
};
