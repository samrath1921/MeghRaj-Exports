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
    validateInput(name, country, email, whatsapp, category, message);

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

  func validateInput(name : Text, country : Text, email : Text, whatsapp : Text, category : Text, message : Text) {
    if (name.isEmpty()) {
      Runtime.trap("Name is required. Please fill in the name field.");
    };

    if (country.isEmpty()) {
      Runtime.trap("Country is required. Please fill in the country field.");
    };
    validateCountry(country);

    if (email.isEmpty()) {
      Runtime.trap("Email is required. Please fill in the email field.");
    };
    validateEmail(email);
    validateWhatsapp(whatsapp);

    if (category.isEmpty()) {
      Runtime.trap("Category is required. Please select a category.");
    };

    if (message.isEmpty()) {
      Runtime.trap("Message is required. Please fill in the message field.");
    };
  };

  func validateCountry(country : Text) {
    var letterCount : Nat = 0;

    for (char in Text.toIter(country)) {
      let isUpper = char >= 'A' and char <= 'Z';
      let isLower = char >= 'a' and char <= 'z';
      let isLetter = isUpper or isLower;

      if (isLetter) {
        letterCount += 1;
      } else if (char == ' ' or char == '-' or char == '\'' or char == '.') {
        // Allowed separators for country names.
      } else {
        Runtime.trap(
          "Country is invalid. Use letters only (spaces, hyphens, apostrophes, and dots are allowed)."
        );
      };
    };

    if (letterCount < 2) {
      Runtime.trap("Country is invalid. Please enter a valid country name.");
    };
  };

  func validateEmail(email : Text) {
    var seenAt : Bool = false;
    var localLen : Nat = 0;
    var domainLen : Nat = 0;
    var labelLen : Nat = 0;
    var dotAfterAt : Bool = false;

    for (char in Text.toIter(email)) {
      if (char == ' ') {
        Runtime.trap("Email is invalid. Spaces are not allowed.");
      };

      if (char == '@') {
        if (seenAt or localLen == 0) {
          Runtime.trap("Email is invalid. Please enter a valid email address.");
        };
        seenAt := true;
        labelLen := 0;
      } else if (not seenAt) {
        if (isAsciiLetter(char) or isAsciiDigit(char) or char == '.' or char == '_' or char == '%' or char == '+' or char == '-') {
          localLen += 1;
        } else {
          Runtime.trap("Email is invalid. Please enter a valid email address.");
        };
      } else {
        if (char == '.') {
          // Dot cannot start a label or appear twice consecutively.
          if (labelLen == 0) {
            Runtime.trap("Email is invalid. Please enter a valid email address.");
          };
          dotAfterAt := true;
          labelLen := 0;
        } else if (isAsciiLetter(char) or isAsciiDigit(char) or char == '-') {
          domainLen += 1;
          labelLen += 1;
        } else {
          Runtime.trap("Email is invalid. Please enter a valid email address.");
        };
      };
    };

    // Must contain @, domain with at least one dot, and valid final domain label.
    if (not seenAt or domainLen == 0 or not dotAfterAt or labelLen == 0) {
      Runtime.trap("Email is invalid. Please enter a valid email address.");
    };
  };

  func isAsciiLetter(char : Char) : Bool {
    (char >= 'A' and char <= 'Z') or (char >= 'a' and char <= 'z');
  };

  func isAsciiDigit(char : Char) : Bool {
    char >= '0' and char <= '9';
  };

  func validateWhatsapp(whatsapp : Text) {
    if (whatsapp.isEmpty()) {
      return;
    };

    var index : Nat = 0;
    var digitCount : Nat = 0;

    for (char in Text.toIter(whatsapp)) {
      if (index == 0) {
        if (char != '+') {
          Runtime.trap("WhatsApp number is invalid. Please select country code and enter a valid number.");
        };
      } else {
        if (not isAsciiDigit(char)) {
          Runtime.trap("WhatsApp number is invalid. Only digits are allowed after country code.");
        };
        digitCount += 1;
      };
      index += 1;
    };

    if (digitCount < 7 or digitCount > 15) {
      Runtime.trap("WhatsApp number is invalid. It must be in international format.");
    };
  };
};
