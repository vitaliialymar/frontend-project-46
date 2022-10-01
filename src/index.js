/* eslint-disable array-callback-return */
import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);

  const keysfile1 = _.keys(file1);
  const keysfile2 = _.keys(file2);
  const sortUniqKeys = _.sortBy(_.uniq([...keysfile1, ...keysfile2]));

  // eslint-disable-next-line consistent-return
  const compare = sortUniqKeys.map((key) => {
    if (!_.has(file2, key)) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key)) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (file1[key] === file2[key]) {
      return `    ${key}: ${file1[key]}`;
    }
    if (file1[key] !== file2[key]) {
      return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    }
  });

  const result = compare.join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
