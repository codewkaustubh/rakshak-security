import List "mo:core/List";
import SensorTypes "../types/sensor";

module {
  public type Sensor = SensorTypes.Sensor;

  public func listSensors(sensors : List.List<Sensor>) : [Sensor] {
    sensors.toArray();
  };

  public func addSensor(sensors : List.List<Sensor>, sensor : Sensor) : Text {
    sensors.add(sensor);
    sensor.id;
  };

  public func updateBypass(sensors : List.List<Sensor>, id : Text, bypassed : Bool) : Bool {
    var found = false;
    sensors.mapInPlace(
      func(s) {
        if (s.id == id) {
          found := true;
          let newStatus = if (bypassed) "bypassed" else "active";
          { s with bypassed = bypassed; status = newStatus };
        } else { s };
      }
    );
    found;
  };

  public func deleteSensor(sensors : List.List<Sensor>, id : Text) : Bool {
    let before = sensors.size();
    let filtered = sensors.filter(func(s) { s.id != id });
    sensors.clear();
    sensors.append(filtered);
    sensors.size() < before;
  };
};
