import _ from 'lodash';

const getValue = (currentValue, depth = 1) => {
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const currentIndent = ' '.repeat(indentSize + 2);
  const bracketIndent = ' '.repeat(indentSize - spacesCount);
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object
    .entries(currentValue)
    .map(([key, value]) => `${currentIndent}${key}: ${getValue(value, depth + 2)}`);

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data, depth = 1) => {
  const spacesCount = 2;
  const indentSize = depth * spacesCount;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - spacesCount);

  const lines = data.flatMap((el) => {
    if (el.type === 'nested') {
      return `${' '.repeat(indentSize + 1)} ${el.key}: ${stylish(el.children, depth + 2)}`;
    }
    if (el.type === 'added') {
      return `${currentIndent}+ ${el.key}: ${getValue(el.value2, depth + 2)}`;
    }
    if (el.type === 'deleted') {
      return `${currentIndent}- ${el.key}: ${getValue(el.value1, depth + 2)}`;
    }
    if (el.type === 'changed') {
      return [
        `${currentIndent}- ${el.key}: ${getValue(el.value1, depth + 2)}`,
        `${currentIndent}+ ${el.key}: ${getValue(el.value2, depth + 2)}`,
      ];
    }
    return `${currentIndent}  ${el.key}: ${getValue(el.value1, depth + 2)}`;
  });

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};
export default stylish;
