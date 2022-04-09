import axios from 'axios';

/**
 * TestRail API Wrapper
 * api docs: https://www.gurock.com/testrail/docs/api/
 */
export default class TestRail {
  constructor(options) {
    this._validate(options);

    this.baseURL = options.host.includes('https') ? options.host : `https://${options.host}`;
    this.username = options.username;
    this.password = options.password;

    axios.defaults.baseURL = this.baseURL + '/index.php?/api/v2';
    axios.defaults.headers.common['Authorization'] = 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');
  }

  _validate(options) {
    if (!options.host) {
      throw new TestRailError('Host not provided');
    }
    if (!options.username) {
      throw new TestRailError('Username not provided');
    }
    if (!options.password) {
      throw new TestRailError('Password or token not provided');
    }
  }

  async addRun(projectId, props) {
    return await axios.post(`/add_run/${projectId}`, props);
  }

  async addResultsForCases(runId, results) {
    return await axios.post(`/add_results_for_cases/${runId}`, { results: results });
  }

  async getCases(projectId, suiteId, filters = '') {
    const queryParams = this.queryCaseFilters(filters);
    return await axios.get(`/get_cases/${projectId}&suite_id=${suiteId}${queryParams}`);
  }

  queryCaseFilters(filters) {
    let val = [];
    if (filters !== undefined) {
      const val = Object.entries(filters).map((key) => {
        let st = '';
        if (key[1] !== '') {
          st = `&${key[0]}=${key[1]}`;
        } else {
          st = `&${key[0]}`;
        }
        return st;
      });
      return val.toString().replace(/,&/g, '&');
    }
    return val.toString();
  }
}

class TestRailError extends Error {
  constructor(message) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TestRailError);
    }
    this.name = 'TestRailError';
  }
}
