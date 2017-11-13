class Contact {
    constructor(details) {
        this.surname = details.surname;
        this.otherNames = details.otherNames;
        this.nationalId = details.nationalId;
        this.passportNumber = details.passportNumber;
        this.alienId = details.alienId;
        this.serviceId = details.serviceId;
        this.dateOfBirth = details.dateOfBirth;
        this.facilities = null;
    }
}

module.exports = Contact;