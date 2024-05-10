const dataBaseObj = require('./database_obj');

let dbConnection;

const getRandomInt = (max) => {

    return Math.floor(Math.random() * max);

}

const generateCorrectUser = (userNameStr) => {

    const int = getRandomInt(10000);

    const testUserObj = {
        username: `${userNameStr}${int}`,
        email: `${userNameStr}${int}@otis-ai-test.eu`,
        password: `TestPwd!!${userNameStr}${int}`
    }

    return testUserObj;
}

// Test users

let userOne = null;
let userTwo = null;
let testCreateUserOne = null;
let testCreateUserTwo = null;

const userThree = {
    username: `VivinaDaBest!${getRandomInt(10000)}`,
    email: `vivinadabest${getRandomInt(10000)}@otis-ai-test.eu`,
    password: 'TestPwd!!Vivina'
}

let testCreateUserThree = null;

beforeAll(async () => {

    dbConnection = await dataBaseObj.initDB();

});
  
afterAll(() => {
    dbConnection.disconnect();
});

test('test connexion to MongoDB', async () => {
 
    await expect(dbConnection).toBeDefined();
    await expect(dbConnection.connection.client).toBeDefined();
    await expect(dbConnection.connection.db).toBeDefined();

    await expect(dbConnection.connections[0]['_readyState']).toBe(1);
    await expect(dbConnection.connections[0]['_hasOpened']).toBe(true);

});

test('test user creation', async () => {

    userOne = generateCorrectUser('DummyTestman');
    userTwo = generateCorrectUser('KingPilou');

    console.log(userOne);
    console.log(userTwo);

    testCreateUserOne = await dataBaseObj.createUser(userOne.username, userOne.email, userOne.password);
    testCreateUserTwo = await dataBaseObj.createUser(userTwo.username, userTwo.email, userTwo.password);
    testCreateUserThree = await dataBaseObj.createUser(userThree.username, userThree.email, userThree.password);

    console.log(testCreateUserOne);
    console.log(testCreateUserTwo);

    await expect(testCreateUserOne.creationStatus).toBe(true);
    await expect(testCreateUserTwo.creationStatus).toBe(true);

    // user Three shouldn't be created: the username contain a special character
    await expect(testCreateUserThree.creationStatus).toBe(false);

});