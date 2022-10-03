/* eslint-disable @typescript-eslint/naming-convention */
import path from 'node:path';
import process from 'node:process';

import compiler from '@ampproject/rollup-plugin-closure-compiler';
import inject from '@rollup/plugin-inject';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

const {MODE = 'development'} = process.env;
const isProductionMode = MODE === 'production';

const config = [{
  input: 'source/index.ts',
  output: [{file: 'dist/measurement.js', format: 'iife'}],
  plugins: [
    replace({
      MODE: JSON.stringify(MODE),
    }),
    nodeResolve(),
    inject({
      Promise: [path.resolve('source/utils/promise.ts'), 'PromisePonyfill'],
    }),
    typescript(),
    isProductionMode && compiler({
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
    }),
  ],
}];

export default config;
