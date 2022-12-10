import allureReporter from "@wdio/allure-reporter";
import { utcTimestamp } from "../../../../../support/helpers/utils";

class HeaderComponent {
  get loginBtn() {
    return $('a[to="/id/login"]');
  }

  async goToLogInPage() {
    await allureReporter.startStep(utcTimestamp() + "Navigating to sign in page");
    await this.loginBtn.click();
    await allureReporter.endStep("passed");
  }
}

export default new HeaderComponent();
