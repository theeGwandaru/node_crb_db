let GeneralDao = require('./GeneralDao');
let FacilityType = require('../models/FacilityType');

class FacilityTtypeDao extends GeneralDao {
    constructor(session) {
        super(session);
    }

    getFacilityTypeById(id) {
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "select * from facility_type where facility_type_id = ?";
                    connection.query(sql, [id], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        if (results.length > 0) {
                            let data = {
                                id: results[0].facility_type_id,
                                name: results[0].facility_type_name
                            }
                            let facilityType = new FacilityType(data);
                            resolve(facilityType);
                        } else {
                            resolve(null);
                        }
                    })
                });
                return promise;
            });
    }

    createFacilityType(facilityType) {
        let self = this;
        return super.getConnection()
            .then((connection) => {
                let promise = new Promise((resolve, reject) => {
                    let sql = "insert into facility_type (facility_type_name) values(?)";
                    connection.query(sql, [facilityType.name], function (err, results, fields) {
                        if (err) {
                            reject(err);
                        }
                        self.getFacilityTypeById(results.insertId)
                        .then((facilityType)=>{
                            resolve(facilityType);
                        })
                    })
                })
                return promise;
            });
    }
}

module.exports = FacilityTtypeDao;