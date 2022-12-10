import allureReporter from "@wdio/allure-reporter";
import BasicUser from "./users/basicUser";

export default class NewUser extends BasicUser {
  constructor(userNumber) {
    super();
    this.username = "automationUser" + userNumber;
    this.password = "test112233";
    this.email = "test" + userNumber + "@template.net";
    this.phone = "";
    allureReporter.addStep(`Using user ${this.username} with password ${this.password} and email ${this.email}`);
  }
}
