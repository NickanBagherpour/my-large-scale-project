import * as process from 'process';

export const CONSTANTS = {};

export const isDevelop = process.env['NODE_ENV'] === 'development';
export const isProduction = process.env['NODE_ENV'] === 'production';
