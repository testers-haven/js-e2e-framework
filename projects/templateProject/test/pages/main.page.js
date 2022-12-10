import allureReporter from "@wdio/allure-reporter";
import { utcTimestamp } from "../../../../support/helpers/utils";
import FooterComponent from "./components/footer.component";
import HeaderComponent from "./components/header.component";
import SidebarComponent from "./components/sidebar.component";
import Page from "./page";

/**
 * convention for getters: start from type: input/btn then append context = btnLogin
 */
class MainPage extends Page {
  get header() {
    return HeaderComponent;
  }

  get sidebar() {
    return SidebarComponent;
  }

  get footer() {
    return FooterComponent;
  }

  get pageColor() {
    return $('div[class^="Page__StyledMainDiv"]');
  }

  async getPageColor() {
    await allureReporter.startStep(utcTimestamp() + "Get theme color");
    let pageColor = (await this.pageColor.getCSSProperty("background-color")).value;
    await allureReporter.endStep("passed");
    return pageColor;
  }
}

export default new MainPage();
