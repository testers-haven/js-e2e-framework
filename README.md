
# Framework & E2E tests
* JS naming conventions [link](./docs/js-naming-conventions.md)


### Projects covered with E2E tests(used in configuration):
* template

### System requirements
* Install Java: [link](https://www.oracle.com/java/technologies/downloads/#jdk19-mac). If you get this error ('error @wdio/selenium-standalone-service error selenium exited before it could start with code 1')
* Node v12+ (will be installed automatically via Volta.sh)
* Docker for allure reports(optional)
### Installation
* `npm install`

### Usage
* `npm run test -- --platform=DESKTOP_CHROME --project=template --testEnv=staging` All tests within template project in Chrome(by default) browser.
* `npm run test -- --platform=DESKTOP_CHROME --project=template --site= --testEnv=staging --suite login ` Run specific tests, which are grouped to suites.
* `npm run test -- --platform=DESKTOP_CHROME --project=template --testEnv=staging --spec ./projects/template/test/specs/template.spec.js` Run one specific test file.
* `docker-compose up -d` It will spin up docker containers for local Allure reports, reports will be automatically generated every 40seconds(configured in `docker-compose.yml`)

### Reporting
* Spec(CLI) - default, useful for local testing
* Allure (by default works only in CI, tests are being sent to the centralized allure reporter
via a client imported as a [npm package](https://www.npmjs.com/package/allure-service-client). For local setup, before running tests
  * Execute in CLI `docker-compose up -d` .
  * Browse to `localhost:5252` and login (In the docker-compose.yml is the user and password)
  * Create your project in the server 
  * Modify your `wdio.conf.js` in the onComplete hook the allure host, user and password to the correct ones 
  * Run some tests with `ENV=CI`.
  * Tests should be uploaded to your local allure
* TestRail - custom implementation, reporting works in CI environment. Visit https://template.testrail.io
  * You can find the implementation on the `wdio.conf.js` file and the custom reporter in `./reporter/json-testrail-reporter`
  * if for some reason you are testing it `locally` then don't forget to remove previous test-run results before new test run. TestRail results folder: `projects/<project_name>/out`

### Add new project
In order to start new project and use existing shared helpers you need to:
1. Create new folder under `projects` folder - e.g `projects/template`
2. Copy-paste `wdio.shared.conf.js` and browser specific config file(s) (`wdio.DESKTOP_CHROME.conf.js`) from `projects/template/config` to `projects/template/config`
3. Add new folder(s) structure where u will have your tests (specs and PageObject files if needed) e.g `projects/template/test/specs`
4. Modify `wdio.shared.conf.js` according to your needs:
   * `baseUrl` string of th or some mapping
   * `specs` - depending on the structure from point #3
   * `suites` - optional and can be removed completely
   * `framework` - test framework (jasmine/mocha/cucumber)
   * `reporters` - refer to #Reporting section and choose which ones you need.
   * `onPrepare` - modify according to your needs. Allure environment variables are defined here
   * `onComplete` - modify according to your needs. Allure and Testrail reporters logic is used there, so it might be not needed in your case.
5. Add test file(s) in `specs` folder and you are ready to run tests locally. Refer to #Usage section.

### How to execute tests in CI 

To execute tests on circleci you will need to first push your tests into a branch, then you have 2 options
#### Via circle-ci (For full regression) 
1. Access circleci pipeline https://app.circleci.com/pipelines/
2. Select your branch 
3. Click on trigger pipeline button
4. Add following obligatory parameters:
   
| Parameter type | Name        | Value                                                                           |
|----------------|-------------|---------------------------------------------------------------------------------|
| String         | project     | your project folder name (template )                                            |
| String         | environment | your environment (t2, staging, prelive, live)                                   |

5. Optional parameters

| Parameter type | Name               | Value                                                                   |
|----------------|--------------------|-------------------------------------------------------------------------|
| String         | specFilter         | Specify specs to run                                                    |
| String         | suitesFilter       | Specify suites to run                                                   |
| boolean        | testrailReport     | Enables testrail report                                                 |
| int            | testrailProjectId  | Id of the testrail project (Mandatory if testrailReport enabled)        |
| int            | testrailPlanId     | Id of the testrail test plan (Mandatory if testrailReport enabled)      |
| boolean        | xrayReport         | Enables xray report                                                     |
| int            | xrayTestPlan       | Id of the xray test plan (Mandatory if XrayReport enabled)              |
| int            | xrayTestExecution  | Id of the xray test execution                                           |
| String         | site               | IF you have sites to run inside the project (template => sitetemplate)  |

6. Click again on trigger pipeline button in popup 
7. Wait until job its finished

---

# Webdriver.IO FAQ
* Crash course on framework: [link](https://youtu.be/RJ2kwpzX8so)
* Webdriver.IO API docs: [link](https://webdriver.io/docs/api)
* Webdriver.IO Workshop: [link](https://github.com/webdriverio/workshop)

#### Project structure:
* `docs` - folder with other documentation related to this project
* `support` - folder for shared util/helper files, available globally. You can import it from any subdirectory like this: `import ElementUtil from 'support/element-util';`
* `support/browserCommands` - helper file with globally available methods within *browser* scope
* `support/elementCommands` - helper file with globally available methods within *element* scope
* `projects` - different websites/brands that has e2e tests
* `reporters` - contains custom reporters(e.g TestRail)
* `projects/<project_name>/test/specs` - main folder where e2e tests/assertions are written
* `projects/<project_name>/test/pages` - main folder where all abstraction for UI element interaction is written.
* `projects/<project_name>/config` - main folder where all project configuration related files resides
* `projects/<project_name>/api` - main folder where API functions for querying BackEnd Services/BackOffice 
* `projects/<project_name>/fixtures` - main folder where test data resides 
* `projects/<project_name>/constants` - main folder with constants that are reused across the project 
* `env.example` - list of some ENVironment variables that can are used mostly in CI env. Not mandatory in local env. 
#### Google Chrome CLI options: 
* [all](https://peter.sh/experiments/chromium-command-line-switches/)
* [important](https://www.ghacks.net/2013/10/06/list-useful-google-chrome-command-line-switches/)
