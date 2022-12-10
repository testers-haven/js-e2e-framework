import allureReporter from "@wdio/allure-reporter";
import { utcTimestamp } from "../../../../../support/helpers/utils";

class SidebarComponent {
  get languageDropdown() {
    return $$('div[class^="container__MenuContainer"] select')[0];
  }

  async languageOption(lang) {
    return $(`div[class^="container__MenuContainer"] select option[value="${lang}"]`);
  }
  async changeLanguage(language) {
    await allureReporter.startStep(utcTimestamp() + `Change language to ${language}`);
    let optionIsSelected = (await (await this.languageOption(language)).getAttribute("selected")) !== null;
    if (!optionIsSelected) {
      await this.languageDropdown.selectByAttribute("value", language);
    }
    await allureReporter.endStep("passed");
  }
}
export default new SidebarComponent();
