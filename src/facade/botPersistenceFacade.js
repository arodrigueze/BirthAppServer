const messageDao = require("../dao/messageDao");
const personDao = require("../dao/personDao");
const personUtils = require("../utils/personUtils")

class BotPersistenceFacade {
    
    constructor(){
        this.messageDao = new messageDao(); 
        this.personDao = new personDao(); 
        this.personUtils = new personUtils();
    }
  
    getPersonByEmail(personEmail) {

        let getPersonByEmailPromise = new Promise((resolve, reject) =>{
            
            let personResult = this.personUtils.newEmptyPerson();
            
            let getPersonByEmailDaoPromise = this.personDao.getPersonByEmail(personEmail);
    
            getPersonByEmailDaoPromise.then(
    
                (result) => {

                    if(result){
                        
                        this.personUtils.hydratePerson(personResult, result);

                        resolve(personResult);
                    
                    }
                    else{
    
                        personResult = null;
    
                        reject(personResult);

                    }
    
                },
                (err) => {

                    reject(err);
    
                }
    
            );

        });    

        return getPersonByEmailPromise;

    }

    suscribePerson(personId) {
        
        let suscribePersonPromise = new Promise((resolve, reject) =>{

            const updateStatePromise = this.personDao.updateStateById(personId);
    
            let personResult = this.personUtils.newEmptyPerson();
    
            updateStatePromise.then(
    
                (result) => {
    
                    if(result){

                        this.personUtils.hydratePerson(personResult, result);
                    
                        resolve(personResult);
                    
                    }
                    else{
                        
                        personResult = undefined;

                        reject(personResult);

                    }
    
                },
                (err) => {
    
                    personResult = undefined;

                    reject(personResult);
    
                }
    
            );
        });

        return suscribePersonPromise;

    }

    sendBirthdayMessage(personIdSender, personIdReciever, birthdayMessage) {
         
        let sentMessage = {
            message: birthdayMessage,
            senderId: personIdSender,
            listMessageId: undefined
        }
        
        const sendBirthdayMessagePromise = this.messageDao.createMessage(sentMessage, personIdReciever);
        
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
    
        let registerAddressPromise = new Promise((resolve, reject) =>{
    
            let addressString = JSON.stringify(personAdress);

            let personResult = this.personUtils.newEmptyPerson();
            
            const registerAddressDaoPromise = this.personDao.updateAddressBotById(personId, addressString);
    
            registerAddressDaoPromise.then(
    
                (result) => {
        
                    if(result == null){
                        
                        this.personUtils.hydratePerson(personResult, result);
                        
                        resolve(personResult);

                    }
                    else{
                        
                        personResult = undefined;
                        
                        reject(personResult);
                    
                    }
    
                },
                (err) => {
    
                    personResult = undefined;

                    reject(personResult);

                }
    
            );

        });

        return registerAddressPromise;

    }
    
}

module.exports = BotPersistenceFacade;