const env = require('dotenv').config();
const userTokenObj = require('./user_token_obj');
const dataBaseObj = require('./database_obj');
const testUserObj = require('./test_user_obj');

let dbConnection;

// build the test users
testUserObj.generateUser('user with correct parameters','DummyTestlady', 'dummy.testlady', '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser("user with correct parameters, for this one we'll test login with wrong password", "Pilou", "king.pilou", '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser("user that won't be created in the database", "Natty", "queen.natty", '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser("user with correct parameters, created to test failed token creation", "CafeTheGuineaPig", "cafe.guinea.pig", '@otis-ai-test.eu', 'Test001!');

beforeAll(async () => {

    dbConnection = await dataBaseObj.initDB();
    await testUserObj.testUserCreation(0);
    await testUserObj.testUserCreation(1);
    await testUserObj.testUserCreation(3);

});
  
afterAll(() => {
    dbConnection.disconnect();
});

test('test checkUserLogin method', async() => {

    // Test the user authentication
    testUserObj.userCont[0].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[0].username, testUserObj.userCont[0].password);
    testUserObj.userCont[1].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[1].username, 'didou&dede');
    testUserObj.userCont[2].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[2].username, testUserObj.userCont[2].password);
    testUserObj.userCont[3].authResult = await userTokenObj.checkUserLogin(testUserObj.userCont[3].username, testUserObj.userCont[3].password);

    // Check the authSuccess
    await expect(testUserObj.userCont[0].authResult).toHaveProperty('authSuccess', true);
    await expect(testUserObj.userCont[1].authResult).toHaveProperty('authSuccess', false);
    await expect(testUserObj.userCont[2].authResult).toHaveProperty('authSuccess', false);
    await expect(testUserObj.userCont[3].authResult).toHaveProperty('authSuccess', true);

    console.log(testUserObj.userCont);
    // console.log(testUserObj.userCont[0].authResult);

    // Check that users contain the userIdEncryption object
    await expect(testUserObj.userCont[0].authResult).toHaveProperty('userIdEncryption');
    await expect(testUserObj.userCont[0].authResult.userIdEncryption).toBeInstanceOf(Object);

    await expect(testUserObj.userCont[1].authResult).toHaveProperty('userIdEncryption');
    await expect(testUserObj.userCont[1].authResult.userIdEncryption).toBeInstanceOf(Object);

    await expect(testUserObj.userCont[2].authResult).toHaveProperty('userIdEncryption');
    await expect(testUserObj.userCont[2].authResult.userIdEncryption).toBeInstanceOf(Object);

    await expect(testUserObj.userCont[3].authResult).toHaveProperty('userIdEncryption');
    await expect(testUserObj.userCont[3].authResult.userIdEncryption).toBeInstanceOf(Object);

    // Check that the userIdEncryption object has the iv & encryptedStr properties (for the the user successfully logged in)
    await expect(testUserObj.userCont[0].authResult.userIdEncryption).toHaveProperty('iv');
    await expect(testUserObj.userCont[0].authResult.userIdEncryption).toHaveProperty('encryptedStr');

    await expect(testUserObj.userCont[3].authResult.userIdEncryption).toHaveProperty('iv');
    await expect(testUserObj.userCont[3].authResult.userIdEncryption).toHaveProperty('encryptedStr');


    // Regex to check encryptedStr & iv formats
    const ivRegex = /^[a-f0-9]{32}$/;
    const encryptedStrRegex = /^[a-f0-9]{64}$/;

    await expect(testUserObj.userCont[0].authResult.userIdEncryption.iv).toMatch(ivRegex);
    await expect(testUserObj.userCont[0].authResult.userIdEncryption.encryptedStr).toMatch(encryptedStrRegex);

    await expect(testUserObj.userCont[3].authResult.userIdEncryption.iv).toMatch(ivRegex);
    await expect(testUserObj.userCont[3].authResult.userIdEncryption.encryptedStr).toMatch(encryptedStrRegex);

});

test('test create token method', async() => {
    
    testUserObj.userCont[0].tokenResult = await userTokenObj.createToken(testUserObj.userCont[0].authResult, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXP);
    console.log(testUserObj.userCont[0]);

    testUserObj.userCont[3].tokenResult = await userTokenObj.createToken(testUserObj.userCont[3].authResult, false, process.env.ACCESS_TOKEN_EXP);
    console.log(testUserObj.userCont[3]);

    // check that userCont[0].tokenResult contains a proper token
    await expect(typeof testUserObj.userCont[0].tokenResult).toBe('string');

    // check that userCont[3].tokenResult is a bool and false;
    await expect(typeof testUserObj.userCont[3].tokenResult).toBe('boolean');
    await expect(testUserObj.userCont[3].tokenResult).toBe(false);
    
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    await expect(testUserObj.userCont[0].tokenResult).toMatch(jwtRegex);

});

test('test auth token method', async() => {

    testUserObj.userCont[0].authTokenResult = await userTokenObj.authToken(testUserObj.userCont[0].tokenResult, process.env.ACCESS_TOKEN_SECRET);
    console.log(testUserObj.userCont[0]);

    testUserObj.userCont[3].authTokenResult = await userTokenObj.authToken(testUserObj.userCont[3].tokenResult, process.env.ACCESS_TOKEN_SECRET);
    console.log(testUserObj.userCont[3]);

    await expect(testUserObj.userCont[0].authTokenResult).toBeInstanceOf(Object);
    await expect(testUserObj.userCont[0].authTokenResult.token).toBe(testUserObj.userCont[0].tokenResult);
    await expect(testUserObj.userCont[0].authTokenResult.status).toBe(true);

    // Check that the user token contains the right userIdEncryption object (should be equal to the one generated from the checkUserLogin method)
    await expect(testUserObj.userCont[0].authTokenResult.result).toBeInstanceOf(Object);
    await expect(testUserObj.userCont[0].authTokenResult.result.userIdEncryption).toBeInstanceOf(Object);
    await expect(testUserObj.userCont[0].authTokenResult.result.userIdEncryption.iv).toBe(testUserObj.userCont[0].authResult.userIdEncryption.iv);
    await expect(testUserObj.userCont[0].authTokenResult.result.userIdEncryption.encryptedStr).toBe(testUserObj.userCont[0].authResult.userIdEncryption.encryptedStr);

    // Check the error handling: no token provided
    await expect(testUserObj.userCont[3].authTokenResult).toBeInstanceOf(Object);
    await expect(testUserObj.userCont[3].authTokenResult.token).toBe(testUserObj.userCont[3].tokenResult);
    await expect(testUserObj.userCont[3].authTokenResult.status).toBe(false);
    await expect(testUserObj.userCont[3].authTokenResult.result).toBeInstanceOf(Object);
    await expect(testUserObj.userCont[3].authTokenResult.result.name).toBe('JsonWebTokenError');
    await expect(testUserObj.userCont[3].authTokenResult.result.message).toBe('jwt must be provided');

});