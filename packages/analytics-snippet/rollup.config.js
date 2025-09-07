import eslint from '@rollup/plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';


export default [
  {
    input: 'src/index.js',

    external: [
      'core-js/modules/es.array.slice.js',
    ],

    plugins: [
      eslint(),

      json(),

      commonjs({
        sourceMap: false,
      }),

      resolve({
        browser: true,
      }),

      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),

      terser({
        format: {
          max_line_len: 120,
        }
      }),
    ],

    output: [
      { file: 'dist/analytics-snippet.js', format: 'iife', name: 'AnalyticsSnippet' },
    ],
  },
];
