import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

const getPath = (filepath) => path.resolve(process.cwd(), './__fixtures__', filepath);

const parser = (filepath) => {
  if (filepath.endsWith('.yml') || filepath.endsWith('.yaml')) {
    const parseFile = yaml.load(fs.readFileSync(getPath(filepath), 'utf8'));
    return parseFile;
  }
  const readFile = fs.readFileSync(getPath(filepath), 'utf-8');
  return JSON.parse(readFile);
};

export default parser;
