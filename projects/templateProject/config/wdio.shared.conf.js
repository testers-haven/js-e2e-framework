import allureReporter from "@wdio/allure-reporter";
import allure from "allure-commandline";
import { reportToAllure } from "allure-service-client";
import { resolve } from "path";
import browserCommands from "support/browser-commands";
import elementCommands from "support/element-commands";
import mergeResults from "support/helpers/report-utils";
import CustomJsonReporter from "../../../reporters/json-testrail-reporter";
import TestRail from "../../../reporters/json-testrail-reporter/testrail";
import { ARGSUITES } from "../../../wdio.conf";
import { urls } from "../constants/urls";

const fs = require("fs");
export const USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 ${process.env.USER_AGENT}`;

exports.config = {
  runner: "local",
  //
  // ==================
  // Application URL
  // ==================
  baseUrl: urls[process.env.TEST_ENVIRONMENT].website,
  //
  // ==================
  // Specify Test Files
  // ==================
  specs: [resolve(__dirname, "../test/specs/**/*.js")],
  suites: {
    P0: [resolve(__dirname, "../test/specs/p0/*.js")],
    P1: [resolve(__dirname, "../test/specs/p1/*.js")],
    P2: [resolve(__dirname, "../test/specs/p2/*.js")],
    P3: [resolve(__dirname, "../test/specs/p3/*.js")],
    Registration: [resolve(__dirname, "../test/specs/p0/register.js")],
    Account_security: [resolve(__dirname, "../test/specs/p0/user-change-password.js")],
    Bet_placement: [
      resolve(__dirname, "../test/specs/p1/betslip.js"),
      resolve(__dirname, "../test/specs/p1/multibet-insurance.js"),
      resolve(__dirname, "../test/specs/p0/normal-betting.js"),
      resolve(__dirname, "../test/specs/p0/boosted-betting.js"),
    ],
    Loyalty: [
      resolve(__dirname, "../test/specs/p1/loyalty-redirections.js"),
      resolve(__dirname, "../test/specs/p1/clubhouse-redirections.js"),
      resolve(__dirname, "../test/specs/p1/user-clubhouse-redirections.js"),
    ],
    User_Portal: [
      resolve(__dirname, "../test/specs/p0/wallet.js"),
      resolve(__dirname, "../test/specs/p0/redirects-wallet.js"),
      resolve(__dirname, "../test/specs/p0/user-withdraw.js"),
      resolve(__dirname, "../test/specs/p0/bet-status.js"),
    ],
    User_Preferences: [resolve(__dirname, "../test/specs/p1/promotions-preferences.js")],
    Redirections_and_Verification_of_content_opening_and_Loading: [
      resolve(__dirname, "../test/specs/p0/redirects-main-page.js"),
      resolve(__dirname, "../test/specs/p0/redirects-events.js"),
      resolve(__dirname, "../test/specs/p0/redirects-promotions.js"),
      resolve(__dirname, "../test/specs/p0/redirects-login.js"),
      resolve(__dirname, "../test/specs/p0/redirects-register.js"),
      resolve(__dirname, "../test/specs/p1/vip.js"),
    ],
    //
  },
  //
  // ============
  // Capabilities
  // ============
  maxInstances: 10,
  capabilities: [],
  commonCapabilities: {
    project: "template",
    build: process.env.TEST_ENVIRONMENT,
    "browserstack.debug": "true", // for enabling visual logs
    "browserstack.console": "info", // to enable console logs at the info level. You can also use other log levels here
    "browserstack.networkLogs": "true", // to enable network logs to be logged
  },
  //
  // ===================
  // Test Configurations
  // ===================
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: process.env.DEBUG ? "info" : "warn",
  //
  // This option stops running other spec files, but will continue with other test cases inside of a failed spec file.
  bail: 0,
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,
  //
  // Default timeout in milliseconds for request if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  // ===================
  // Test runner services
  // ===================
  // Services take over a specific job you don't want to take care of. They enhance
  // your test setup with almost no effort. Unlike plugins, they don't add new
  // commands. Instead, they hook themselves up into the test process.

  //
  // ===================
  // Framework
  // ===================
  // Framework you want to run your specs with.
  // The following are supported: Mocha, Jasmine, and Cucumber see also: https://webdriver.io/docs/frameworks
  // Make sure you have the wdio adapter package for the specific framework installed before running any tests.
  framework: "jasmine",
  //
  // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 1,
  //
  // Delay in seconds between the spec file retry attempts
  // specFileRetriesDelay: 0,
  //
  // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: false,
  //
  // ===================
  // Reporter
  // ===================
  // The only one supported by default is 'dot', see also: https://webdriver.io/docs/dot-reporter
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: resolve(__dirname, "../results"),
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true,
        issueLinkTemplate: "https://template.atlassian.net/browse/{}",
        tmsLinkTemplate: "https://template.testrail.io/index.php?/cases/view/{}",
      },
    ],
    [
      CustomJsonReporter,
      {
        outputDir: resolve(__dirname, "../out"),
        outputFileFormat: function (opts) {
          return `results-${opts.cid}.json`;
        },
        caseIdPattern: /(^[C\d]{5,7})(?=\s\w+)/gm,
      },
    ],
  ],
  //
  // Options to be passed to Jasmine.
  jasmineOpts: {
    defaultTimeoutInterval: process.env.DEBUG === "true" ? 999999 : 120000,
    //
    // The Jasmine framework allows interception of each assertion in order to log the state of the application
    // or website depending on the result. For example, it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function (passed, assertion) {
      // do something
    },
    // if test case failed then stop testing current spec file.
    stopOnSpecFailure: false,
    // stopSpecOnExpectationFailure: true,
    //
    // Make use of Jasmine-specific grep functionality
    grep: null,
    invertGrep: null,
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) { },
  /**
   * Gets executed before a worker process is spawned and can be used to initialise specific service
   * for that worker as well as modify runtime environments in an async fashion.
   * @param  {String} cid      capability id (e.g 0-0)
   * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
   * @param  {[type]} specs    specs to be run in the worker process
   * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
   * @param  {[type]} execArgv list of string arguments passed to the worker process
   */
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   * @param {String} cid worker id (e.g. 0-0)
   */
  // beforeSession: function (config, capabilities, specs, cid) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs        List of spec file paths that are to be run
   * @param {Object}         browser      instance of created browser/device session
   */
  before: function (capabilities, specs) {
    // add custom commands to browser scope
    Object.keys(browserCommands).forEach((key) => {
      browser.addCommand(key, browserCommands[key]);
    });

    // add custom commands to element scope
    Object.keys(elementCommands).forEach((key) => {
      browser.addCommand(key, elementCommands[key], true);
    });
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  // beforeSuite: function (suite) {
  // },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) starts.
   */
  beforeTest: async function () {
    if (!process.env.CI) {
      return Promise.resolve(0);
    }

    await allureReporter.addEnvironment("Environment", process.env.TEST_ENVIRONMENT);
    await allureReporter.addEnvironment("Project", "template");
    await allureReporter.addEnvironment("User", process.env.CIRCLE_USERNAME);
  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  // beforeHook: function (test, context) {
  // },
  /**
   * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
   * afterEach in Mocha)
   */
  // afterHook: async function (test, context, { error, result, duration, passed, retries }) {
  // },
  /**
   * Function to be executed after a test (in Mocha/Jasmine only)
   * @param {Object}  test             test object
   * @param {Object}  context          scope object the test was executed with
   * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
   * @param {Any}     result.result    return object of test function
   * @param {Number}  result.duration  duration of test
   * @param {Boolean} result.passed    true if test has passed, otherwise false
   * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
   */
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },

  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  // afterSuite: function (suite) {
  // },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete: async function (exitCode, config, capabilities, results) {
    if (!process.env.CI) {
      return Promise.resolve(0);
    }

    // ****************************************************************************************
    // TestRail reports related
    // ****************************************************************************************
    if (process.env.TESTRAIL_GENERATE_REPORT === "true") {
      const testRail = new TestRail({
        host: process.env.TESTRAIL_HOST,
        username: process.env.TESTRAIL_USERNAME,
        password: process.env.TESTRAIL_PASSWORD,
      });

      const mergedResults = mergeResults(resolve(__dirname, "../out"), "results-*");
      const testRailProjectId = process.env.TESTRAIL_PROJECT_ID;
      let testRailPlanId = process.env.TESTRAIL_PLAN_ID;
      const executedSuites = ARGSUITES.filter((suite) => Object.keys(config.suites).includes(suite)).map((x) => x.replaceAll("_", " "));

      try {
        const suites = (await testRail.getSuites(testRailProjectId)).data.filter((suite) => executedSuites.includes(suite.name));
        const planRuns = (await testRail.getPlan(testRailPlanId)).data.entries;

        for (const suite of suites) {
          const testCasesResponse = await testRail.getCases(testRailProjectId, suite.id);
          const lastRunId = planRuns
            .find((run) => run.suite_id === suite.id)
            .runs.sort((a, b) => {
              return a.created_on < b.created_on ? 1 : -1;
            })[0].id;

          const acceptableResults = mergedResults.filter((result) => {
            const { cases } = testCasesResponse.data;
            return cases.find((testCase) => testCase.id === parseInt(result.case_id));
          });

          await testRail.addResultsForCases(lastRunId, acceptableResults);
        }

        const reportUrl = `${testRail.baseURL}/index.php?/plans/view/${testRailPlanId}`;
        await fs.writeFileSync("./reportUrl.txt", reportUrl);

        console.log("TestRail results uploaded!");
      } catch (e) {
        console.error("Testrail Error response: ", e.message);
        console.error("Testrail Error details: ", e.response.data);
      }
    }

    // ****************************************************************************************
    // Allure reports related
    // ****************************************************************************************
    try {
      let options = {
        project: "template",
        resultsFolder: resolve(__dirname, "../results"),
        cleanupFilesAfterUpload: true,
        host: process.env.ALLURE_HOST,
      };
      await reportToAllure(options);
      console.log("Allure results uploaded!");
    } catch (e) {
      console.error("Allure Error response: ", e.message);
    }
  },
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  //onReload: function(oldSessionId, newSessionId) {
  //}
};
