import path from 'path';
import glob from 'glob';

const dirname = path.resolve();

const getFilePath = (filePath: string) => path.join(dirname, filePath);

const globFiles = (globPath: string) => {
  return glob.sync(getFilePath(globPath));
};

export { globFiles, getFilePath };
