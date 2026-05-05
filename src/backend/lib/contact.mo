import List "mo:core/List";
import ContactTypes "../types/contact";

module {
  public type Contact = ContactTypes.Contact;

  public func listContacts(contacts : List.List<Contact>) : [Contact] {
    contacts.toArray();
  };

  public func addContact(contacts : List.List<Contact>, contact : Contact) : Text {
    contacts.add(contact);
    contact.id;
  };

  public func updateContact(contacts : List.List<Contact>, id : Text, contact : Contact) : Bool {
    var found = false;
    contacts.mapInPlace(
      func(c) {
        if (c.id == id) {
          found := true;
          { contact with id = id };
        } else { c };
      }
    );
    found;
  };

  public func deleteContact(contacts : List.List<Contact>, id : Text) : Bool {
    let before = contacts.size();
    let filtered = contacts.filter(func(c) { c.id != id });
    contacts.clear();
    contacts.append(filtered);
    contacts.size() < before;
  };
};
