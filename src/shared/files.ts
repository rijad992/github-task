import glob from 'glob';

const globFiles = (globPath: string): string[] => {
  return glob.sync(globPath);
};

export { globFiles };
