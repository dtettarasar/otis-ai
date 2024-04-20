import { expect, test } from 'vitest';
import { method as strHasher } from './str_hasher';

const password = "mypass123";
let hashedStr = '';

test('test the genHashedStr method', async () => {

    hashedStr = await strHasher.genHashedStr(password);
    console.log(hashedStr);

    expect(typeof hashedStr).toBe('string');

    // Regex pour vérifier un hash bcrypt (60 caractères avec des lettres, chiffres et caractères spéciaux)
    const bcryptHashRegex = /^\$2[ayb]\$[0-9]{2}\$[./0-9A-Za-z]{53}$/;

    expect(hashedStr).toMatch(bcryptHashRegex);

});