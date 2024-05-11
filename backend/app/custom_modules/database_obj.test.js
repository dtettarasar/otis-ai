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

let userOne = generateCorrectUser('DummyTestman');
let userTwo = generateCorrectUser('KingPilou');
let testCreateUserOne = null;
let testCreateUserTwo = null;

const userThree = {
    username: `VivinaDaBest!${getRandomInt(10000)}`,
    email: `vivinadabest${getRandomInt(10000)}@otis-ai-test.eu`,
    password: `TestPwd!!${getRandomInt(10000)}Vivina`
}

let testCreateUserThree = null;

const userFour = {
    username: `Lea Kpop${getRandomInt(10000)}`,
    email: `lk${getRandomInt(10000)}@otis-ai-test.eu`,
    password: `TestPwd!!${getRandomInt(10000)}Lea`
}

let testCreateUserFour = null;

let userFive = {
    username: `WilliballZ${getRandomInt(10000)}`,
    email: `williballz${getRandomInt(10000)}@otis-ai-test.eu`,
    password: `dbz`
}

let testCreateUserFive = null;

let userSix = {
    username: `BruceTheSensei${getRandomInt(10000)}`,
    email: `bruce${getRandomInt(10000)}@otis-ai-test.eu`,
    password: `thebestracer63`
}

let testCreateUserSix = null;

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
    
    console.log(userOne);
    console.log(userTwo);
    
    testCreateUserOne = await dataBaseObj.createUser(userOne.username, userOne.email, userOne.password);
    testCreateUserTwo = await dataBaseObj.createUser(userTwo.username, userTwo.email, userTwo.password);

    console.log(testCreateUserOne);
    console.log(testCreateUserTwo);

    await expect(testCreateUserOne.creationStatus).toBe(true);
    await expect(testCreateUserTwo.creationStatus).toBe(true);


});

test('test error handling for user creation: test wrong username', async () => {

    console.log(userThree);
    console.log(userFour);

    testCreateUserThree = await dataBaseObj.createUser(userThree.username, userThree.email, userThree.password);
    testCreateUserFour = await dataBaseObj.createUser(userFour.username, userFour.email, userFour.password);

    console.log(testCreateUserThree);
    console.log(testCreateUserFour);

    await expect(testCreateUserThree.creationStatus).toBe(false);
    await expect(testCreateUserFour.creationStatus).toBe(false);

});

test('test error handling for user creation: test wrong password', async () => {

    console.log(userFive);
    console.log(userSix);

    testCreateUserFive = await dataBaseObj.createUser(userFive.username, userFive.email, userFive.password);
    testCreateUserSix = await dataBaseObj.createUser(userSix.username, userSix.email, userSix.password);

    console.log(testCreateUserFive);
    console.log(testCreateUserSix);

    await expect(testCreateUserFive.creationStatus).toBe(false);
    await expect(testCreateUserSix.creationStatus).toBe(false);

});