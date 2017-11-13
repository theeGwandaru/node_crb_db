let GeneralDao = require('./GeneralDao');
let Contact = require('../models/Contact');

class ContactDao extends GeneralDao {
    constructor(session) {
        super(session);
    }

    getAllContacts() {
        return super.getConnection().then((connection) => {
            let promise = new Promise(function (resolve, reject) {
                connection.query("select * from person", function (err, results, fields) {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                })
            })
            return promise;
        }).catch((err) => {
            console.log("could not connect to the db here");
        })

    }

    createContact(contact) {
        let self = this;
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "insert into contact (surname, other_names, national_id, passport_no, alien_id, service_id, date_of_birth)"
                        + " values(?,?,?,?,?,?,?)";
                    let values = [
                        contact.surname,
                        contact.otherNames,
                        contact.nationalId,
                        contact.serviceId,
                        contact.passportNumber,
                        contact.alienId,
                        contact.dateOfBirth
                    ];
                    connection.query(sql, values, function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            self.getContactById(results.insertId)
                                .then((contact) => {
                                    resolve(contact);
                                })
                        }
                    });
                });
                return promise;
            });
    }

    getContactById(id) {
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "select * from contact as c"
                        + " left join facility f on c.contact_id = f.contact_id"
                        + " where c.contact_id = ?";
                    connection.query(sql, [id], function (err, results, fields) {
                        if (err) {
                            reject(err)
                        }
                        else {
                            let data = {
                                surname: results[0].surname,
                                otherNames: results[0].other_names,
                                nationalId: results[0].national_id,
                                passportNumber: results[0].passport_number,
                                alienId: results[0].alien_id,
                                serviceId: results[0].service_id,
                                dateOfBirth: results[0].date_of_birth
                            }
                            let contact = new Contact(data);
                            resolve(contact);
                        }
                    })
                });
                return promise;
            })
    }
}

module.exports = ContactDao;