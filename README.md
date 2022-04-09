
# Framework & E2E tests
* JS naming conventions [link](./docs/js-naming-conventions.md)

### System requirements
* Node v12+ (will be installed automatically via Volta.sh)
* Docker for allure reports(optional)
### Installation
* `npm install`

### Usage
* `npm run test -- --project=default --testEnv=staging` All tests within default project in Chrome(by default) browser.
* `npm run test -- --project=default --testEnv=staging --suite login ` Run specific tests, which are grouped to suites.
* `npm run test -- --project=default --testEnv=staging --spec ./projects/default/test/specs/redirects-promotions.js` Run one specific test file.
* `npm run test:headless -- --project=default` Run default tests in headless mode
* `docker-compose up -d` It will spin up docker containers for local Allure reports, reports will be automatically generated every 40seconds(configured in `docker-compose.yml`)

### Reporting
* Spec(CLI) - default, useful for local testing
* Allure (by default works only in CI and can be found in CircleCI test run -> Artifacts -> index.html)
  * before running tests, execute in CLI `docker-compose up -d`. Run some tests. Now browse `localhost:5252`
  * or you can locally [download & install Allure](https://github.com/allure-framework/allure2) [Java required], run tests with `ENV=CI` and then execute in CLI: `allure open <report path>`
* TestRail - custom implementation, reporting works in CI environment. Visit https://heathmont.testrail.io
  * if for some reason you are testing it `locally` then don't forget to remove previous test-run results before new test run. TestRail results folder: `projects/<project_name>/out`

### Add new project
In order to start new project and use existing shared helpers you need to:
1. Create new folder under `projects` folder - e.g `projects/default2`
2. Copy-paste `wdio.shared.conf.js` and browser specific config file(s) (`wdio.CHROME.conf.js`) from `projects/default/config` to `projects/default2/config`
3. Add new folder(s) structure where u will have your tests (specs and PageObject files if needed) e.g `projects/default2/test/specs`
4. Modify `wdio.shared.conf.js` according to your needs:
   * `baseUrl` string of th or some mapping
   * `specs` - depending on the structure from point #3
   * `suites` - optional and can be removed completely
   * `framework` - test framework (jasmine/mocha/cucumber)
   * `reporters` - refer to #Reporting section and choose which ones you need.
   * `onPrepare` - modify according to your needs. Allure environment variables are defined here
   * `onComplete` - modify according to your needs. Allure and Testrail reporters logic is used there, so it might be not needed in your case.
5. Add test file(s) in `specs` folder and you are ready to run tests locally. Refer to #Usage section.

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
