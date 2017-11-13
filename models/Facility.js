class Facility{
    constructor(details){
        this.id = details.id;
        this.subscriber = details.subscriber;
        this.facilityType = details.facilityType;
        this.principleAmount = details.principleAmount;
        this.currentBalance = details.currentBalance;
        this.hasDefaultHistory = details.hasDefaultHistory;
        this.isDelinquent = details.isDelinquent;
        this.dateOpened = details.dateOpened;
        this.lastPaymentDate = details.lastPaymentDate;
    }
}
module.exports = Facility;