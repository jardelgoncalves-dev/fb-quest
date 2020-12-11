/* eslint-disable */

const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: 'unit',
  testMatch: ['<rootDir>/src/**/*.test.js'],
  testEnvironment: 'node',
  clearMocks: true,
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};
