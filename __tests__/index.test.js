#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test one', () => {
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const result = readFile('result.txt');
  const actualresult = result.trim();
  expect(actual).toEqual(actualresult);
});
