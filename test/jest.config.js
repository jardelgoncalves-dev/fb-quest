/* eslint-disable */

const { resolve } = require('path');
const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {...rootConfig, ...{
  rootDir: root,
  displayName: "e2e",
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.js"],
  testMatch: ["<rootDir>/test/**/*.test.js"],
}}
