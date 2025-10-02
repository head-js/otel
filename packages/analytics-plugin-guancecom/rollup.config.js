// import eslint from '@rollup/plugin-eslint';
// import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
// import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';


export default [
  {
    input: 'src/index.ts',

    external: [
      // 'core-js/modules/es.object.to-string.js',
      // 'core-js/modules/es.promise.js',
    ],

    plugins: [
      // eslint(),

      // json(),

      resolve({
        browser: true,
      }),

      commonjs({
        sourceMap: false,
      }),

      typescript(),

      // babel({
      //   exclude: 'node_modules/**',
      //   babelHelpers: 'bundled',
      // }),

      terser({
        compress: false,
        mangle: false,
        format: {
          comments: false,
          beautify: true,
        },
      }),
    ],

    output: [
      { file: '.dist/analytics-plugin-guancecom.js', format: 'iife', name: 'AnalyticsPluginGuancecom' },
    ],
  },
  {
    input: 'src/pv.ts',

    external: [
    ],

    plugins: [
      // eslint(),

      // json(),

      resolve({
        browser: true,
      }),

      commonjs({
        sourceMap: false,
      }),

      typescript(),

      // babel({
      //   exclude: 'node_modules/**',
      //   babelHelpers: 'bundled',
      // }),

      terser({
        compress: false,
        mangle: false,
        format: {
          max_line_len: 120,
          preamble: '/* @head.js/analytics-pv 0.0.1 */',
        }
      }),
    ],

    output: [
      { file: '.dist/pv.js', format: 'iife', strict: false, exports: 'none' },
    ],
  },
];
