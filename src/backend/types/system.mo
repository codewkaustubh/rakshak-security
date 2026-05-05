import Types "common";

module {
  public type SystemState = {
    var armed : Bool;
    var mode : Text; // away | home | night
    var triggeredSensorId : ?Text;
    var lastArmedTime : ?Types.Timestamp;
    var armedBy : Text; // app | sms | keypad | remote
    var connectionStatus : Text; // online | offline
    var signalStrength : Nat; // 0-100 percentage
  };

  // Shared-safe version for public API
  public type SystemStatePublic = {
    armed : Bool;
    mode : Text;
    triggeredSensorId : ?Text;
    lastArmedTime : ?Types.Timestamp;
    armedBy : Text;
    connectionStatus : Text;
    signalStrength : Nat;
  };
};
