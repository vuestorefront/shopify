import typescript from 'rollup-plugin-typescript2';

export function generateBaseConfig(pkg) {
  const mainEntrypoint = {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      typescript({
        typescript: require('typescript')
      })
    ]
  };

  const serverEntrypoint = {
    input: 'src/index.server.ts',
    output: [
      {
        file: pkg.server,
        format: 'cjs',
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      typescript({
        typescript: require('typescript')
      })
    ]
  };

  if (pkg.server) {
    return [mainEntrypoint, serverEntrypoint];
  }

  return mainEntrypoint;
}