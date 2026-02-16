import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";



actor {
  public type Inquiry = {
    timestamp : Time.Time;
    name : Text;
    company : Text;
    country : Text;
    email : Text;
    whatsapp : Text;
    category : Text;
    message : Text;
  };

  var inquiries : [Inquiry] = [];

  public shared ({ caller }) func submitInquiry(name : Text, company : Text, country : Text, email : Text, whatsapp : Text, category : Text, message : Text) : async () {
    validateInput(name, country, email, category, message);

    let inquiry : Inquiry = {
      timestamp = Time.now();
      name;
      company;
      country;
      email;
      whatsapp;
      category;
      message;
    };

    inquiries := inquiries.concat([inquiry]);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries;
  };

  func validateInput(name : Text, country : Text, email : Text, category : Text, message : Text) {
    if (name.isEmpty()) {
      Runtime.trap("Name is required. Please fill in the name field.");
    };

    if (country.isEmpty()) {
      Runtime.trap("Country is required. Please fill in the country field.");
    };

    if (email.isEmpty()) {
      Runtime.trap("Email is required. Please fill in the email field.");
    };

    if (category.isEmpty()) {
      Runtime.trap("Category is required. Please select a category.");
    };

    if (message.isEmpty()) {
      Runtime.trap("Message is required. Please fill in the message field.");
    };
  };
};
