import yaml from 'js-yaml';

const parser = (data, format) => {
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  if (format === 'json') {
    return JSON.parse(data);
  }
  return 'Error! Unknown format!';
};

export default parser;
