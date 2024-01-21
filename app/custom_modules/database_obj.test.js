const dataBaseObj = require('./database_obj');

let dbConnexion;

beforeAll(async () => {
    dbConnexion = await dataBaseObj.initDB();
});
  
afterAll(() => {
    dbConnexion.disconnect();
});

test('test connexion to MongoDB', async () => {

    await expect(dbConnexion).toBeDefined();

});