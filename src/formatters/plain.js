import _ from 'lodash';

const getValue = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (typeof currentValue === 'string') {
    return `'${currentValue}'`;
  }
  return currentValue;
};

const plain = (data, path = '') => {
  const lines = data.flatMap((el) => {
    const keyPath = (path === '' ? `${el.key}` : `${path}.${el.key}`);

    if (el.type === 'nested') {
      return `${plain(el.children, keyPath)}`;
    }
    if (el.type === 'added') {
      return `Property '${keyPath}' was added with value: ${getValue(el.value2)}`;
    }
    if (el.type === 'deleted') {
      return `Property '${keyPath}' was removed`;
    }
    if (el.type === 'changed') {
      return `Property '${keyPath}' was updated. From ${getValue(el.value1)} to ${getValue(el.value2)}`;
    }
    return '';
  });

  return lines.filter((e) => e !== '').join('\n');
};

export default plain;
