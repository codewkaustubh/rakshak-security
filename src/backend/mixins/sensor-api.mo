import SensorTypes "../types/sensor";
import SensorLib "../lib/sensor";
import List "mo:core/List";

mixin (sensors : List.List<SensorTypes.Sensor>) {
  public query func getSensors() : async [SensorTypes.Sensor] {
    SensorLib.listSensors(sensors);
  };

  public func addSensor(sensor : SensorTypes.Sensor) : async Text {
    SensorLib.addSensor(sensors, sensor);
  };

  public func updateSensorBypass(id : Text, bypassed : Bool) : async Bool {
    SensorLib.updateBypass(sensors, id, bypassed);
  };

  public func deleteSensor(id : Text) : async Bool {
    SensorLib.deleteSensor(sensors, id);
  };
};
