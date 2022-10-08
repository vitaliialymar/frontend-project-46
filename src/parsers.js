import yaml from 'js-yaml';

const parser = (data, format) => {
  let parse;
  if (format === 'yml' || format === 'yaml') {
    parse = yaml.load(data);
  }
  if (format === 'json') {
    parse = JSON.parse(data);
  }
  return parse;
};

export default parser;
