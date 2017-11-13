let Session = require('../daos/Session');
let Subscriber = require('../models/Subscriber');
let SubscriberType = require('../models/SubscriberType');
let SubscriberDao = require('../daos/SubscriberDao');

let session = new Session();
let subscriberDao = new SubscriberDao(session);

// let subscriberType1 = new SubscriberType({ id: 0, name: 'bank' });
// subscriberDao.createSubscriberType(subscriberType1)
//     .then((id) => {
//         console.log(id);
//     })

function testGetSubscriberTypeByName() {
    subscriberDao.getSubcriberTypeByName("bank")
        .then((subscriberType) => {
            console.log(subscriberType);
        })
        .catch((err) => {
            console.log(err);
        })
}

function testCreateSubscriber() {
    subscriberDao.getSubcriberTypeByName("bank")
        .then((subscriberType) => {
            let subscriber = new Subscriber({ name: "kenya commercial bank", type: subscriberType });
            subscriberDao.createSubscriber(subscriber)
                .then((subscriber) => {
                    console.log(subscriber);
                })
        })
}

function testGetSubscriberById() {
    subscriberDao.getSubscriberById(1)
        .then((subscriber) => {
            console.log(subscriber);
        })
        .catch((err) => {
            console.log(err);
        })
}

function testGetSubscriberByName() {
    subscriberDao.getSubscriberByName('kenya commercial bank')
        .then((subscriber) => {
            console.log(subscriber);
        })
        .catch((err) => {
            console.log(err);
        })
}

//testGetSubscriberTypeByName();
//testCreateSubscriber();
//testGetSubscriberById();
testGetSubscriberByName();