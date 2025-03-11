import typescript from '@rollup/plugin-typescript';
import less from 'rollup-plugin-less';

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: 'inline',
      },
    ],
    plugins: [typescript(), less()],
  },
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: 'inline',
      },
    ],
    plugins: [typescript(), less()],
  },
];
