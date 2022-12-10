import allureReporter from "@wdio/allure-reporter";
import { utcTimestamp } from "../../../../support/helpers/utils";

export default class Page {
  async open(path = "") {
    await allureReporter.startStep(utcTimestamp() + `Opening ${await browser.options.baseUrl} on path ${path}`);
    await browser.url(path);
    await allureReporter.endStep("passed");
  }

  async navigateTo(url) {
    await browser.navigateTo(url);
  }

  async reload(authToken = "") {
    await browser.reloadSession();
    await browser.url("");
    if (authToken !== "") await browser.setCookies({ name: "token", value: authToken });
  }

  async addAuthToken(authToken) {
    await browser.setCookies({ name: "token", value: authToken });
  }
}
