import LogTypes "../types/log";
import LogLib "../lib/log";
import List "mo:core/List";

mixin (logs : List.List<LogTypes.LogEntry>) {
  public query func getLogs() : async [LogTypes.LogEntry] {
    LogLib.getLogs(logs);
  };

  public func addLog(entry : LogTypes.LogEntry) : async Text {
    LogLib.addLog(logs, entry);
  };
};
