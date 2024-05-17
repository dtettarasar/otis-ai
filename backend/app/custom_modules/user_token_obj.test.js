const userTokenObj = require('./user_token_obj');
const dataBaseObj = require('./database_obj');
const testUserObj = require('./test_user_obj');

let dbConnection;

testUserObj.generateUser('user with correct parameters','DummyTestlady', 'dummy.testlady', '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser("user with correct parameters, for this one we'll test login with wrong password", "Pilou", "king.pilou", '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser("user that won't be created in the database", "Natty", "queen.natty", '@otis-ai-test.eu', 'Test001!');

beforeAll(async () => {

    dbConnection = await dataBaseObj.initDB();
    await testUserObj.testUserCreation(0);
    await testUserObj.testUserCreation(1);

});
  
afterAll(() => {
    dbConnection.disconnect();
});

test('test checkUserLogin method', async() => {

    //console.log(testUserObj.userCont);

    testUserObj.userCont[0].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[0].username, testUserObj.userCont[0].password);
    testUserObj.userCont[1].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[1].username, 'didou&dede');
    testUserObj.userCont[2].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[2].username, testUserObj.userCont[2].password);

    await expect(testUserObj.userCont[0].authResult).toHaveProperty('authSuccess', true);
    await expect(testUserObj.userCont[1].authResult).toHaveProperty('authSuccess', false);
    await expect(testUserObj.userCont[2].authResult).toHaveProperty('authSuccess', false);

    console.log(testUserObj.userCont);
    console.log(testUserObj.userCont[0].authResult);

    // Check that users contain the userIdEncryption object
    await expect(testUserObj.userCont[0].authResult).toHaveProperty('userIdEncryption');
    await expect(testUserObj.userCont[0].authResult.userIdEncryption).toBeInstanceOf(Object);

    await expect(testUserObj.userCont[1].authResult).toHaveProperty('userIdEncryption');
    await expect(testUserObj.userCont[1].authResult.userIdEncryption).toBeInstanceOf(Object);

    await expect(testUserObj.userCont[2].authResult).toHaveProperty('userIdEncryption');
    await expect(testUserObj.userCont[2].authResult.userIdEncryption).toBeInstanceOf(Object);

    // Check that the userIdEncryption object has the iv & encryptedStr properties (for the the user successfully logged in)
    await expect(testUserObj.userCont[0].authResult.userIdEncryption).toHaveProperty('iv');
    await expect(testUserObj.userCont[0].authResult.userIdEncryption).toHaveProperty('encryptedStr');

});

test('test create token method', async() => {
    


})