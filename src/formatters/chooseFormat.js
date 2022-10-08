import stylish from './stylish.js';

const chooseFormat = (data, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(data);
  }
  return 'Error!';
};

export default chooseFormat;
