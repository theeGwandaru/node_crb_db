let Session = require('../daos/Session');
let ContactDao = require('../daos/ContactDao');
let Contact = require('../models/Contact');

let session = new Session();
let contactDao = new ContactDao(session);

function testCreateContact() {

    let testContact = new Contact({
        surname: "surname1",
        otherNames: "Other Names1",
        nationalId: "11111111",
        passportNumber: "A00001",
        alienId: "11111111",
        serviceId: "11111111",
        dateOfBirth: new Date(1980, 4, 14)
    });
    contactDao.createContact(testContact)
        .then((contact) => {
            console.log(contact);
        })
}

testCreateContact();