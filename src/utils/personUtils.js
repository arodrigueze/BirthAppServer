const personPrototype = {
    email: undefined,
    name: undefined,
    birthdate: undefined,
    teamId: undefined,
    suscribed: undefined,
    addressBot: undefined
}

class PersonUtils {

    newEmptyPerson() {
        
        return Object.assign({}, personPrototype);
    
    }

    hydratePerson(person, personDatabaseResult) {

        person.email = personDatabaseResult.email;
        person.name = personDatabaseResult.name;
        person.birthdate = personDatabaseResult.birthdate;
        person.teamId = personDatabaseResult.teamId;
        person.suscribed = personDatabaseResult.suscribed;
        person.address = personDatabaseResult.address;

    }

}


module.exports = PersonUtils;