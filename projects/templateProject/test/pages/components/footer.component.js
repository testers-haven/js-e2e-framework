import allureReporter from "@wdio/allure-reporter";
import { utcTimestamp } from "../../../../../support/helpers/utils";

class FooterComponent {
  get languageSelect() {
    return $("footer select");
  }

  async changeLanguage(language) {
    await allureReporter.startStep(utcTimestamp + `Change language to ${language}`);
    await this.languageSelect.scrollAndClick();
    await this.languageSelect.selectByAttribute("value", language);
    await allureReporter.endStep("passed");
  }
}

export default new FooterComponent();
