import { expectTypeOf } from 'vitest';
const strEncrypter = require('./str_encrypter');

const testStr = "this is a test string";

test('test the encrypter: make sure it returns an object', async () => {

    const testEncryption = await strEncrypter.method.encryptString(testStr);
    console.log(testEncryption);

    expectTypeOf(testEncryption).toBeObject();

});
