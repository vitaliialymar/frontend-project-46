#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const file1yml = getFixturePath('file1.yml');
const file2yml = getFixturePath('file2.yml');

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('testOne', () => {
  expect(genDiff(file1, file2)).toEqual(expected);
});

test('testYmlFiles', () => {
  expect(genDiff(file1yml, file2yml)).toEqual(expected);
});
