var sinon = require('sinon');
var ListMessagesDB = require('../../src/model/listMessagesModel');
var ListMessagesDao = require('../../src/dao/listMessagesDao');

describe('Given a listMessageDao', () => {

    describe('When i pass receiverID to a createListMessage function', () => {

        it('Then return  json with listMessageData', () => {
            //Arrange
            var listMessagesDBMock = sinon.mock(ListMessagesDB);
            var expectation = listMessagesDBMock.expects('save').once();
            //ListMessagesDBMock.
            var listMessageDaoOnTest = new ListMessagesDao();
            listMessageDaoOnTest.createListMessages("ñlaksjdl89a7s8d");
            //Act
            expectation.verify();
            //const result = true;

            //Assert
            //expect(true).toBe(result);
        })
    })
})
