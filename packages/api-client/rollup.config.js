// api-client/rollup.js
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import minimist from 'minimist';
import progress from 'rollup-plugin-progress';
import ttypescript from 'ttypescript';
import babel from '@rollup/plugin-babel';
import madge from 'madge';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import pkg from './package.json';

const argv = minimist(process.argv.slice(2));

// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  vue: 'Vue',
  axios: 'axios',
};

// function detects circular dependencies & dependency warnings and prints them to console
madge('./src/index.ts', {}).then((res) => {
  // eslint-disable-next-line no-console
  console.log(res.warnings(), res.circular());
});

// Base / common configs shared across the build formats
const baseConfig = {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: {
    replace: {
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('development')
    },
    nodeResolve: {
      isRequire: false,
      preferBuiltins: true,
      moduleDirectories: ['node_modules']
    },
    // Plugin provides a helpful progress bar and outputs to support debugging
    progress: {
      clearLine: true // set to false to print / retain the output in console
    },
    // Allows the node builtins to be required/imported.
    // https://www.npmjs.com/package/rollup-plugin-node-polyfills
    nodePolyfills: {
      include: [
        'node_modules',
        'src'
      ],
      sourceMap: true
    },
    // typescript options are inherited from tsconfig
    typescript: {
      typescript: ttypescript, // ttypescript enables support for custom transformers
      check: true, // runs diagnostics on the code
      verbosity: 1, // sets console message level (i.e. info, warn, debug)
      clean: true, // generates a clean build each time vs reading from cache
      abortOnError: true,
      include: ['*.ts+(|x)', '**/*.ts+(|x)']
    },
    babel: {
      extensions: ['.ts', '.tsx'],
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      skipPreflightCheck: true // resolves compilation failure with use of runtime for helpers
    }
  }
};
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    output: {
      file: pkg.module, // sets naming convention from package.json
      format: 'es',
      globals,
      sourcemap: true
    },
    plugins: [
      progress(baseConfig.plugins.progress),
      nodeResolve(baseConfig.plugins.nodeResolve),
      nodePolyfills(baseConfig.plugins.nodePolyfills),
      replace(baseConfig.plugins.replace),
      typescript(baseConfig.plugins.typescript),
      babel(baseConfig.plugins.babel)
    ]
  };
  buildFormats.push(esConfig);
}
if (!argv.format || argv.format === 'cjs') {
  const cjsConfig = {
    ...baseConfig,
    output: {
      exports: 'auto',
      file: pkg.main,
      format: 'cjs',
      globals,
      sourcemap: true
    },
    plugins: [
      nodeResolve(baseConfig.plugins.nodeResolve),
      progress(baseConfig.plugins.progress),
      replace(baseConfig.plugins.replace),
      commonjs({
        include: /node_modules/
      }),
      nodePolyfills(baseConfig.plugins.nodePolyfills),
      typescript(baseConfig.plugins.typescript),
      babel(baseConfig.plugins.babel)
    ]
  };
  buildFormats.push(cjsConfig);
}
if (!argv.format || argv.format === 'cjs') {
  const server = {
    ...baseConfig,
    input: 'src/index.server.ts',
    output: {
      exports: 'auto',
      file: pkg.server,
      format: 'cjs',
      globals,
      sourcemap: true,

    },
    plugins: [
      nodeResolve(baseConfig.plugins.nodeResolve),
      progress(baseConfig.plugins.progress),
      replace(baseConfig.plugins.replace),
      commonjs({
        include: /node_modules/
      }),
      nodePolyfills(baseConfig.plugins.nodePolyfills),
      typescript(baseConfig.plugins.typescript),
      babel(baseConfig.plugins.babel)
    ]
  };
  buildFormats.push(server);
}

// Export config
export default buildFormats;
