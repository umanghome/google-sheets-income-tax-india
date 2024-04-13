import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'build/main/index.js',
    plugins: [resolve(), commonjs()],
    treeshake: false,
    output: {
      name: 'main',
      file: 'build/bundle.js',
      format: 'cjs',
    },
  },
];
