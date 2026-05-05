import Types "common";

module {
  public type Sensor = {
    id : Text;
    name : Text;
    zone : Text;
    type_ : Text; // door | window | smoke | motion
    status : Text; // active | triggered | offline | bypassed
    lastTriggered : ?Types.Timestamp;
    bypassed : Bool;
    batteryPercent : ?Nat;
    signalPercent : ?Nat;
  };
};
