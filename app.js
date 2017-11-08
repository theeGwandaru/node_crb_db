var { Contact } = require("./models/Contact");

var contact1 = new Contact("email.domain", "password");

console.log(contact1.email);