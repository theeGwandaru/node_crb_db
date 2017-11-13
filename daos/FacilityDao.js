let GeneralDao = require('./GeneralDao');
let SubcriberDao = require('./SubscriberDao');
let FacilityTypeDao = require('./FacilityTypeDao');
let Facility = require('../models/Facility');

class FacilityDao extends GeneralDao {
    constructor(session) {
        super(session);
        this.subcriberDao = new SubcriberDao(session);
        this.facilityTypeDao = new FacilityTypeDao(session);
    }

    getFacilityById(id) {
        //To Do: Use Sql Joins instead of many calls to the database
        let self = this;
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "select * from facility where facility_id = ?";
                    connection.query(sql, [id], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        } else {
                            if (results.length > 0) {
                                let data = {
                                    id: results[0].facility_id,
                                    principleAmount: results[0].principle_amount,
                                    currentBalance: results[0].current_balance,
                                    hasDefaultHistory: results[0].has_default_history,
                                    isDelinquent: results[0].is_delinquent,
                                    dateOpened: results[0].date_opened,
                                    lastPaymentDate: results[0].last_payment_date
                                }
                                self.subcriberDao.getSubscriberById(results[0].subscriber_id)
                                    .then((subscriber) => {
                                        data.subscriber = subscriber;
                                        return data;
                                    }).then((data) => {
                                        self.facilityTypeDao.getFacilityTypeById(results[0].facility_type)
                                            .then((facilityType) => {
                                                data.facilityType = facilityType;
                                                return data;
                                            }).then((data) => {
                                                let facility = new Facility(data);
                                                resolve(facility);
                                            })
                                    })
                            }
                            else {
                                resolve(null);
                            }
                        }
                    });
                });
                return promise;
            })
    }

    createFacility(facility) {
        let self = this;
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "insert into facility"
                        + " (contact_id, subscriber_id, facility_type, principle_amount, current_balance, has_default_history, is_delinquent, date_opened, last_payment_date)"
                        + " values (?,?,?,?,?,?,?,?)";
                    let values = [
                        facility.contact.id,
                        facility.subscriber.id,
                        facility.facilityType.id,
                        facility.principleAmount,
                        facility.currentBalance,
                        facility.hasDefaultHistory,
                        facility.isDelinquent,
                        facility.dateOpened,
                        facility.lastPaymentDate
                    ];
                    connection.query(sql, values, function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            self.getFacilityById(results.insertId)
                                .then((facility) => {
                                    resolve(facility);
                                });
                        }
                    });
                });
                return promise;
            })
    }


}

module.exports = FacilityDao;