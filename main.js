var { Contact } = require("./models/Contact");
var { Session } = require('./daos/Session');
var { ContactDao } = require('./daos/ContactDao');

var session = new Session();
var contactDao = new ContactDao(session);
var contact1 = new Contact("email.domain", "password");


contactDao.createContact(contact1)
    .then((results) => {
        console.log(results);
    }).catch((err) => {
        console.log(err);
    }).then((results) => {
        contactDao.getAllContacts()
            .then((results) => {
                console.log(results);
            }).catch((err) => {
                console.log("could not finish task");
                console.log(err);
            }).then((results) => {
                session.pool.end();
            })
    })



