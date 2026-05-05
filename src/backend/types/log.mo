import Types "common";

module {
  public type LogEntry = {
    id : Text;
    eventType : Text; // arm | disarm | alert | sms | call
    description : Text;
    timestamp : Types.Timestamp;
    armedBy : ?Text;
    sensorId : ?Text;
  };
};
