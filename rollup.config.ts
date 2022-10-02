/* eslint-disable @typescript-eslint/naming-convention */
import path from 'node:path';
import process from 'node:process';

import compiler from '@ampproject/rollup-plugin-closure-compiler';
import inject from '@rollup/plugin-inject';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const isProductionMode = process.env.MODE === 'production';

const config = [{
  input: 'source/index.ts',
  output: [{file: 'dist/measurement.js', format: 'iife'}],
  plugins: [
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
