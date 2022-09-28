import compiler from '@ampproject/rollup-plugin-closure-compiler';
import typescript from '@rollup/plugin-typescript';

const isProductionMode = process.env.MODE === 'production'

const config = [{
	input: 'source/index.ts',
	output: [{file: 'dist/measurement.js', format: 'iife'}],
	plugins: [
		typescript(),
		isProductionMode && compiler(),
	],
}];

export default config;
