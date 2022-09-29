/* eslint-disable array-callback-return */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';

const getPath = (filepath) => path.resolve(process.cwd(), './__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const readFile1 = readFile(filepath1);
  const readFile2 = readFile(filepath2);

  const file1Obj = JSON.parse(readFile1);
  const file2Obj = JSON.parse(readFile2);

  const keysfile1 = _.keys(file1Obj);
  const keysfile2 = _.keys(file2Obj);
  const sortUniqKeys = _.sortBy(_.uniq([...keysfile1, ...keysfile2]));

  // eslint-disable-next-line consistent-return
  const compare = sortUniqKeys.map((key) => {
    if (!_.has(file2Obj, key)) {
      return `  - ${key}: ${file1Obj[key]}`;
    }
    if (!_.has(file1Obj, key)) {
      return `  + ${key}: ${file2Obj[key]}`;
    }
    if (file1Obj[key] === file2Obj[key]) {
      return `    ${key}: ${file1Obj[key]}`;
    }
    if (file1Obj[key] !== file2Obj[key]) {
      return `  - ${key}: ${file1Obj[key]}\n  + ${key}: ${file2Obj[key]}`;
    }
  });

  const result = compare.join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
