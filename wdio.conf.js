/**
 * This file defines which config file to execute depending on the passed arguments
 * Currently supports chrome and safari. If you want to add more browsers/devices then modify this file
 * and add appropriate configuration file in "config" folder
 */
require('dotenv').config();
require('graphql-import-node/register'); // for importing *.graphql files
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(4));
const safari = process.argv.includes('--safari') ? 'SAFARI' : '';
const browser = safari || 'CHROME';

let testrailReport = argv.testrailReport;
if (!testrailReport) {
  testrailReport = false;
}
const testEnv = argv.testEnv;
if (!testEnv) {
  console.log('Pass correct testEnv name as an argument e.g: npm run test -- --project=default --testEnv=staging\n');
  process.exit(0);
}
const project = argv.project;
if (!project) {
  console.log('Pass correct project name as an argument e.g: npm run test -- --project=default --testEnv=staging\n');
  process.exit(0);
}
if (!fs.existsSync(`projects/${project}`)) {
  console.log(`"${project}" project doesn\'t exist`);
  process.exit(0);
}

process.env['TEST_ENVIRONMENT'] = testEnv;
process.env['TESTRAIL_GENERATE_REPORT'] = testrailReport;

module.exports = require(`./projects/${project}/config/wdio.${browser}.conf.js`);
