const dataBaseObj = require('./database_obj');

let dbConnection;


const getRandomInt = (max) => {

    return Math.floor(Math.random() * max);

}

// Test users

const testUserObj = {

    getRandomInt: function (max) {

        return Math.floor(Math.random() * max);

    },

    generateUser: function(comment, userNameStr, emailNameStr, emailDomainStr, passwordStr) {

        const int = this.getRandomInt(10000);

        const testUserObj = {
            id: this.userCont.length,
            comment: comment,
            username: `${userNameStr}${int}`,
            email: `${emailNameStr}${int}${emailDomainStr}`,
            password: `${passwordStr}`
        }

        this.userCont.push(testUserObj);

    },
    
    testUserCreation: async function(testUserId) {

        const test = await dataBaseObj.createUser(this.userCont[testUserId].username, this.userCont[testUserId].email, this.userCont[testUserId].password);

        this.userCont[testUserId].result = test;

    },

    userCont: []

}

testUserObj.generateUser('user with correct parameters','DummyTestman', 'dummy.testman', '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser('user with correct parameters','KingPilou', 'king.pilou', '@otis-ai-test.eu', 'Test001!');

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

    await testUserObj.testUserCreation(0);
    await testUserObj.testUserCreation(1);

    await expect(testUserObj.userCont[0].result.creationStatus).toBe(true);
    await expect(testUserObj.userCont[1].result.creationStatus).toBe(true);

    console.log(testUserObj.userCont);


});

test('test saved users data', async () => {

    /*
    Test here the username, email and password for the 2 first users.
    Make a comparison between the initial users Object and the object returned by Mongodb after creation. 
    Check that username & email are the same
    Check that the hashed password in MongoDB object match the initial not hashed password. 
    */

});

test('test error handling for user creation: test wrong username', async () => {

    console.log(userThree);
    console.log(userFour);

    testCreateUserThree = await dataBaseObj.createUser(userThree.username, userThree.email, userThree.password);
    testCreateUserFour = await dataBaseObj.createUser(userFour.username, userFour.email, userFour.password);

    console.log(testCreateUserThree);
    console.log(testCreateUserFour);

    await expect(testCreateUserThree.creationStatus).toBe(false);
    await expect(testCreateUserThree.Error).toBe('username not valid');

    await expect(testCreateUserFour.creationStatus).toBe(false);
    await expect(testCreateUserFour.Error).toBe('username not valid');

});

test('test error handling for user creation: test wrong password', async () => {

    console.log(userFive);
    console.log(userSix);

    testCreateUserFive = await dataBaseObj.createUser(userFive.username, userFive.email, userFive.password);
    testCreateUserSix = await dataBaseObj.createUser(userSix.username, userSix.email, userSix.password);

    console.log(testCreateUserFive);
    console.log(testCreateUserSix);

    await expect(testCreateUserFive.creationStatus).toBe(false);
    await expect(testCreateUserFive.Error).toBe('password not secure enough');

    await expect(testCreateUserSix.creationStatus).toBe(false);
    await expect(testCreateUserSix.Error).toBe('password not secure enough');

});

test('test error handling for user creation: test wrong email format', async () => {


});

test('test error handling for user creation: try to create user that already exist in mongodb', async () => {

    /*
        Take the intial user one & two and try to recreate new users with same email or username. 
        Make sure the database Object return Error object with false creationStatus
    */

});