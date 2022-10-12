import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const result = keys.map((key) => {
    if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
      return { key, children: getDiff(data1[key], data2[key]), type: 'nested' };
    }
    if (!_.has(data1, key)) {
      return { key, value2: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value1: data1[key], type: 'deleted' };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, value1: data1[key], value2: data2[key], type: 'changed',
      };
    }
    return { key, value1: data1[key], type: 'unchanged' };
  });
  return result;
};

export default getDiff;
