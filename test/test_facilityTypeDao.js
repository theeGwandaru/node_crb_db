let Session = require('../daos/Session');
let FacilityDao = require('../daos/FacilityTypeDao');
let FacilityType = require('../models/FacilityType');

let session = new Session();
let facilityDao = new FacilityDao(session);


function testGetFacilityType() {
    facilityDao.getFacilityTypeById(1)
        .then((facilityType) => {
            console.log(facilityType)
        })
        .catch((err) => {
            console.log(err);
        })
}

function testCreateFacilityType() {
    let newFacilityType = new FacilityType({ name: "standard loan" });
    facilityDao.createFacilityType(newFacilityType)
        .then((facilityType) => {
            console.log(facilityType);
        })
        .catch((err) => {
            console.log(err);
        })
}

//testGetFacilityType();
testCreateFacilityType();