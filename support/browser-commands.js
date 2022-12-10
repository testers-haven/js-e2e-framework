/**
 * This module adds custom methods to `browser` scope. e.g browser.customMethod()
 *
 * NB!!! Do not use arrow function expressions or it won't work.
 */

module.exports = {
  jsClick: async function (element) {
    await this.execute("arguments[0].click();", element);
  },

  waitForPage: async function () {
    await this.waitUntil(() => this.execute(() => document.readyState === "complete"), {
      timeout: 60 * 1000,
      timeoutMsg: "Timeout on page loading",
    });
  },

  waitForDropDownOptions: async function (element) {
    await this.waitUntil(
      async () => (
        (await element.$$("option")).length > 0,
        {
          timeout: 15000,
          timeoutMsg: "Data did not appeared for popup",
        }
      )
    );
  },

  waitForNewBrowserTab: async function () {
    await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1, {
      timeout: 15000,
      timeoutMsg: "New browser tab has not loaded after 15 seconds",
    });
  },

  switchToBrowserTab: async function (tab) {
    await browser.switchToWindow((await browser.getWindowHandles())[tab]);
  },

  getElementByExactText: async function (element, text) {
    return await $(`${element}=${text}`);
  },

  getElementByStartsWithText: async function (element, text) {
    return await $(`${element}^=${text}`);
  },

  getElementThatContainsText: async function (element, text) {
    return await $(`${element}^=${text}`);
  },

  scrollDownByPixels: async function (pixels) {
    await this.execute(`window.scrollBy(0,${pixels})`);
  },
};
