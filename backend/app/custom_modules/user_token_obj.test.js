const userTokenObj = require('./user_token_obj');
const dataBaseObj = require('./database_obj');
const testUserObj = require('./test_user_obj');

let dbConnection;

testUserObj.generateUser('user with correct parameters','DummyTestlady', 'dummy.testlady', '@otis-ai-test.eu', 'Test001!');

beforeAll(async () => {

    dbConnection = await dataBaseObj.initDB();
    await testUserObj.testUserCreation(0);

});
  
afterAll(() => {
    dbConnection.disconnect();
});

test('test checkUserLogin method', async() => {

    console.log(testUserObj.userCont);

});