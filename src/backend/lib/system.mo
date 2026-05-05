import SystemTypes "../types/system";

module {
  public type SystemState = SystemTypes.SystemState;
  public type SystemStatePublic = SystemTypes.SystemStatePublic;

  public func toPublic(s : SystemState) : SystemStatePublic {
    {
      armed = s.armed;
      mode = s.mode;
      triggeredSensorId = s.triggeredSensorId;
      lastArmedTime = s.lastArmedTime;
      armedBy = s.armedBy;
      connectionStatus = s.connectionStatus;
      signalStrength = s.signalStrength;
    };
  };

  public func getStatus(state : SystemState) : SystemState {
    state;
  };

  public func arm(state : SystemState, mode : Text, now : Int) {
    state.armed := true;
    state.mode := mode;
    state.triggeredSensorId := null;
    state.lastArmedTime := ?now;
  };

  public func disarm(state : SystemState) {
    state.armed := false;
    state.triggeredSensorId := null;
  };
};
