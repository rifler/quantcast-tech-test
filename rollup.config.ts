/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';

import compiler from '@ampproject/rollup-plugin-closure-compiler';
import typescript from '@rollup/plugin-typescript';

const isProductionMode = process.env.MODE === 'production';

const config = [{
  input: 'source/index.ts',
  output: [{file: 'dist/measurement.js', format: 'iife'}],
  plugins: [
    typescript(),
    isProductionMode && compiler({
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
    }),
  ],
}];

export default config;
