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

let correctUserOne = null;
let correctUserTwo = null;
let testCreateUserOne = null;
let testCreateUserTwo = null;

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

    correctUserOne = generateCorrectUser('DummyTestman');
    correctUserTwo = generateCorrectUser('KingPilou');

    console.log(correctUserOne);
    console.log(correctUserTwo);

    testCreateUserOne = await dataBaseObj.createUser(correctUserOne.username, correctUserOne.email, correctUserOne.password);
    testCreateUserTwo = await dataBaseObj.createUser(correctUserTwo.username, correctUserTwo.email, correctUserTwo.password);

    console.log(testCreateUserOne);
    console.log(testCreateUserTwo);

    await expect(testCreateUserOne.creationStatus).toBe(true);
    await expect(testCreateUserTwo.creationStatus).toBe(true);

});