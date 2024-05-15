const userTokenObj = require('./user_token_obj');
const dataBaseObj = require('./database_obj');
const testUserObj = require('./test_user_obj');

let dbConnection;

testUserObj.generateUser('user with correct parameters','DummyTestlady', 'dummy.testlady', '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser("user that won't be created in the database", "Natty", "queen.natty", '@otis-ai-test.eu', 'Test001!');

beforeAll(async () => {

    dbConnection = await dataBaseObj.initDB();
    await testUserObj.testUserCreation(0);

});
  
afterAll(() => {
    dbConnection.disconnect();
});

test('test checkUserLogin method', async() => {

    console.log(testUserObj.userCont);

    testUserObj.userCont[0].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[0].username, testUserObj.userCont[0].password);
    testUserObj.userCont[1].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[1].username, testUserObj.userCont[1].password);

    await expect(testUserObj.userCont[0].authResult.authSuccess).toBe(true);
    await expect(testUserObj.userCont[1].authResult.authSuccess).toBe(false);

    console.log(testUserObj.userCont);

});