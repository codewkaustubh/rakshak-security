import ContactTypes "../types/contact";
import ContactLib "../lib/contact";
import List "mo:core/List";

mixin (contacts : List.List<ContactTypes.Contact>) {
  public query func getContacts() : async [ContactTypes.Contact] {
    ContactLib.listContacts(contacts);
  };

  public func addContact(contact : ContactTypes.Contact) : async Text {
    ContactLib.addContact(contacts, contact);
  };

  public func updateContact(id : Text, contact : ContactTypes.Contact) : async Bool {
    ContactLib.updateContact(contacts, id, contact);
  };

  public func deleteContact(id : Text) : async Bool {
    ContactLib.deleteContact(contacts, id);
  };
};
