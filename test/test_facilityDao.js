let Session = require('../daos/Session');
let FacilityDao = require('../daos/FacilityDao');
let FacilityTypeDao = require('../daos/FacilityTypeDao');
let SubscriberDao = require('../daos/SubscriberDao');
let ContactDao = require('../daos/ContactDao');

let Facility = require('../models/Facility');
let FacilityType = require('../models/FacilityType');

let session = new Session();
let contactDao = new ContactDao(session);
let facilityDao = new FacilityDao(session);
let facilityTypeDao = new FacilityTypeDao(session);
let subscriberDao = new SubscriberDao(session);

function testGetFacilityById() {
    facilityDao.getFacilityById(1)
        .then((facility) => {
            console.log(facility.subscriber.name);
        });
}

function testCreateFacility() {
    let testFacility = new Facility({
        principleAmount: 447100,
        currentBalance: 263100,
        hasDefaultHistory: false,
        isDelinquent: false,
        dateOpened: new Date(2017, 4, 1),
        lastPaymentDate: new Date(2017, 11, 11)
    });

    contactDao.
    facilityTypeDao.getFacilityTypeById(2)
        .then((facilityType) => {
            testFacility.facilityType = facilityType;
        })
        .then(() => {
            subscriberDao.getSubscriberById(1)
                .then((subscriber) => {
                    testFacility.subscriber = subscriber;
                })
                .then(() => {
                    facilityDao.createFacility(testFacility)
                        .then((facility) => {
                            console.log(facility);
                        })
                })
        })
}

//testGetFacilityById();
testCreateFacility();