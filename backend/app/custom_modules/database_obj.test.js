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
            password: `${passwordStr}`,
            result: null
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
testUserObj.generateUser('user with wrong username', 'VivinaDaBest!', 'vivinadabest', '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser('user with wrong username', 'Lea Kpop', 'lk', '@otis-ai-test.eu', 'Test001!');
testUserObj.generateUser('user with wrong password', 'WilliballZ', 'williballz', '@otis-ai-test.eu', 'dbz');
testUserObj.generateUser('user with wrong password', 'BruceTheSensei', 'bruce', '@otis-ai-test.eu', 'thebestracer63');

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

    //console.log(testUserObj.userCont);

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

    await testUserObj.testUserCreation(2);
    await testUserObj.testUserCreation(3);

    await expect(testUserObj.userCont[2].result.creationStatus).toBe(false);
    await expect(testUserObj.userCont[2].result.Error).toBe('username not valid');

    await expect(testUserObj.userCont[3].result.creationStatus).toBe(false);
    await expect(testUserObj.userCont[3].result.Error).toBe('username not valid');

    //console.log(testUserObj.userCont);

});

test('test error handling for user creation: test wrong password', async () => {

    await testUserObj.testUserCreation(4);
    await testUserObj.testUserCreation(5);

    await expect(testUserObj.userCont[4].result.creationStatus).toBe(false);
    await expect(testUserObj.userCont[4].result.Error).toBe('password not secure enough');

    await expect(testUserObj.userCont[5].result.creationStatus).toBe(false);
    await expect(testUserObj.userCont[5].result.Error).toBe('password not secure enough');

    console.log(testUserObj.userCont);

});

test('test error handling for user creation: test wrong email format', async () => {


});

test('test error handling for user creation: try to create user that already exist in mongodb', async () => {

    /*
        Take the intial user one & two and try to recreate new users with same email or username. 
        Make sure the database Object return Error object with false creationStatus
    */

});