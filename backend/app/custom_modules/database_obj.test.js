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

const testUserObj = {

    generateCorrectUser: function(userNameStr) {

        const int = Math.floor(Math.random() * 10000);

        const testUserObj = {
            username: `${userNameStr}${int}`,
            email: `${userNameStr}${int}@otis-ai-test.eu`,
            password: `TestPwd!!${userNameStr}${int}`
        }

        //return testUserObj;
        this.userCont.push(testUserObj);

    }, 

    userCont: []

}

//testUserObj.userCont.push(testUserObj.generateCorrectUser('DummyTestman'));
//testUserObj.userCont.push(testUserObj.generateCorrectUser('KingPilou'));

testUserObj.generateCorrectUser('DummyTestman');
testUserObj.generateCorrectUser('KingPilou');

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

let userSeven = {
    username: `WilliballZ${getRandomInt(10000)}`,
    email: `williballz${getRandomInt(10000)}@otis-ai-test.eu`,
    password: `dbz`
}

let testCreateUserSeven = null;

let userEight = {
    username: `BruceTheSensei${getRandomInt(10000)}`,
    email: `bruce${getRandomInt(10000)}@otis-ai-test.eu`,
    password: `thebestracer63`
}

let testCreateUserEight = null;

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
    
    //console.log(testUserObj.userCont[0]);
    //console.log(testUserObj.userCont[1]);
    
    testUserObj.userCont[0].result = await dataBaseObj.createUser(testUserObj.userCont[0].username, testUserObj.userCont[0].email, testUserObj.userCont[0].password);
    testUserObj.userCont[1].result = await dataBaseObj.createUser(testUserObj.userCont[1].username, testUserObj.userCont[1].email, testUserObj.userCont[1].password);

    //console.log(testCreateUserOne);
    //console.log(testCreateUserTwo);

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