let GeneralDao = require('./GeneralDao');
let Subscriber = require('../models/Subscriber');
let SubscriberType = require('../models/SubscriberType');

class SubscriberDao extends GeneralDao {
    constructor(session) {
        super(session);
    }

    getSubcriberTypeByName(subscriberTypeName) {
        return super.getConnection()
            .then((connection) => {
                var promise = new Promise((resolve, reject) => {
                    var sql = "select * from subscriber_type where subscriber_type_name = ?"
                    connection.query(sql, [subscriberTypeName], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        if (results) {
                            console.log(results);
                            var data = {
                                id: results[0].subscriber_type_id,
                                name: results[0].subscriber_type_name,
                            }
                            var subscriberType = new SubscriberType(data);
                            resolve(subscriberType);
                        }
                        else {
                            resolve(null);
                        }

                    })
                });
                return promise;
            });
    }

    getSubscriberTypeById(id) {
        return super.getConnection()
            .then((connection) => {
                var promise = new Promise((resolve, reject) => {
                    var sql = "select * from subscriber_type where subscriber_type_id = ?"
                    connection.query(sql, [id], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        if (results) {
                            var data = {
                                id: results[0].subscriber_type_id,
                                name: results[0].subscriber_type_name,
                            }
                            var subscriberType = new SubscriberType(data);
                            resolve(subscriberType);
                        }
                        else {
                            resolve(null);
                        }

                    })
                });
                return promise;
            });
    }

    createSubscriberType(subscriberType) {
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "insert into subscriber_type (subscriber_type_name) values(?)"
                    connection.query(sql, [subscriberType.name], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        resolve(results.insertId);
                    });
                });
                connection.release();
                return promise;
            });
    }


    createSubscriber(subscriber) {
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "insert into subscriber (subscriber_name, subscriber_type_id) values (?,?)";
                    let query = connection.query(sql, [subscriber.name, subscriber.type.id], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        resolve(results.insertId);
                    });
                });
                return promise;
            });
    }

    getSubscriberById(id) {
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let self = this;
                    let sql = "select * from subscriber where subscriber_id = ?";
                    connection.query(sql, [id], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        if (results.length > 0) {
                            self.getSubscriberTypeById(results[0].subscriber_type_id)
                                .then((subscriber_type_results) => {
                                    let data = {
                                        id: results[0].subscriber_id,
                                        name: results[0].subscriber_name,
                                        type: subscriber_type_results
                                    }
                                    let subscriber = new Subscriber(data);
                                    resolve(subscriber);
                                });
                        } else {
                            resolve(null);
                        }
                    })
                });
                return promise;
            });
    }

    getSubscriberByName(name) {
        let self = this;
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "select * from subscriber where subscriber_name = ?";
                    connection.query(sql, [name], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        if (results.length > 0) {
                            self.getSubscriberTypeById(results[0].subscriber_type_id)
                                .then((subscriber_type_results) => {
                                    let data = {
                                        id: results[0].subscriber_id,
                                        name: results[0].subscriber_name,
                                        type: subscriber_type_results
                                    }
                                    let subscriber = new Subscriber(data);
                                    resolve(subscriber);
                                });
                        } else {
                            resolve(null);
                        }
                    });
                })
                return promise;
            });
    }
}

module.exports = SubscriberDao;