const personPrototype = {
    email: undefined,
    name: undefined,
    birthdate: undefined,
    teamId: undefined,
    suscribed: undefined
}

newEmptyPerson = () => {
    
    return Object.assign({}, personPrototype);

}

module.exports = newEmptyPerson;