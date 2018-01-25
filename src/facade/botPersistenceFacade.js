const messagesDao = require("../dao/messagesDao");
const personDao = require("../dao/personDao");
const personUtils = require("../utils/personUtils")

class BotPersistenceFacade {
    
    constructor(){
        this.messagesDao = new messagesDao(); 
        this.personDao = new personDao(); 
        this.personUtils = new personUtils();
    }
  
    getPersonByEmail(personEmail) {

        const getPersonByEmailPromise = this.personDao.getPersonByEmail(personEmail);

        let personResult = this.personUtils.newEmptyPerson();

        getPersonByEmailPromise.then(

            (result) => {
                
                this.personUtils.hydratePerson(personResult, result);

            },
            (err) => {
                
                personResult = undefined;

            }

        );

        return personResult;

    }

    suscribePerson(personId) {
        
        //Rename DAO method
        const updateStatePromise = this.personDao.updateStateById(personId);

        let personResult = personUtils.newEmptyPerson();

        updateStatePromise.then(

            (result) => {

                this.personUtils.hydratePerson(personResult, result);

            },
            (err) => {

                personResult = undefined;

            }

        );

        return personResult;

    }

    sendBirthdayMessage(personIdSender, personIdReciever, birthdayMessage) {
         
        let sentMessage = {
            message: birthdayMessage,
            senderId: personIdSender,
            listMessageId: undefined
        }
        
        const sendBirthdayMessagePromise = messagesDao.createMessage(sentMessage, personIdReciever);
        
        sendBirthdayMessagePromise.then(

            (result) => {
                
                sentMessage.message = result.message;
                sentMessage.senderId = result.senderId;
                sentMessage.listMessageId = result.listMessageId;

            },
            (err) => {

                sentMessage = undefined;

            }

        );

        return sentMessage;

    }

    registerUserAddress(personId, personAdress) {

        const registerAddressPromise = messagesDao.updateAddressBotById(personId, personAdress);

        let personResult = personUtils.newEmptyPerson();

        registerAddressPromise.then(

            (result) => {

                this.personUtils.hydratePerson(personResult, result);

            },
            (err) => {

                personResult = undefined;

            }

        );

        return personResult;

    }
    
}

module.exports = BotPersistenceFacade;