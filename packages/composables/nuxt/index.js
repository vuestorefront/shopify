/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import path from 'path';

// eslint-disable-next-line func-names
export default function(moduleOptions) {
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: moduleOptions
  });
}
