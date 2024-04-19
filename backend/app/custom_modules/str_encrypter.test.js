import { expect, test } from 'vitest';
const strEncrypter = require('./str_encrypter');

const testStr = "this is a test string";

let testEncryption = {};

test('test the encrypter: make sure it returns an object', async () => {

    testEncryption = await strEncrypter.method.encryptString(testStr);
    //console.log(testEncryption);

    expect(testEncryption).toBeTypeOf('object');

});

test('test the object returned by the encrypter', async () => {

    console.log(testEncryption);

});
