import path from 'path';
import fs from 'fs';
import parser from './parsers.js';
import getDiff from './getDiff.js';
import chooseFormat from './formatters/chooseFormat.js';

const getData = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf8');
const getFormat = (filepath) => filepath.split('.')[1];

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = parser(getData(filepath1), getFormat(filepath1));
  const file2 = parser(getData(filepath2), getFormat(filepath2));

  return chooseFormat(getDiff(file1, file2), format);
};

export default genDiff;
