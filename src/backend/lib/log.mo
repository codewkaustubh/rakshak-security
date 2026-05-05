import List "mo:core/List";
import LogTypes "../types/log";

module {
  public type LogEntry = LogTypes.LogEntry;

  public func getLogs(logs : List.List<LogEntry>) : [LogEntry] {
    logs.toArray();
  };

  public func addLog(logs : List.List<LogEntry>, entry : LogEntry) : Text {
    // Keep max 200 entries — remove oldest when over limit
    if (logs.size() >= 200) {
      ignore logs.removeLast();
    };
    // Prepend: insert at front by reversing, adding, reversing back
    let tmp = logs.reverse();
    logs.clear();
    logs.add(entry);
    logs.append(tmp);
    entry.id;
  };
};
