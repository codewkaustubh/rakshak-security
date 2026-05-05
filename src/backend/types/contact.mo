module {
  public type Contact = {
    id : Text;
    name : Text;
    phone : Text;
    role : Text; // primary | secondary
    receiveCall : Bool;
    receiveSms : Bool;
  };
};
