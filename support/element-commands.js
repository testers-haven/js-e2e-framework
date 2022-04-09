/**
 * This module adds custom methods to element instance. e.g: $('#someId').customMethod()
 *
 * NB!!! Do not use arrow function expressions or it won't work.
 */

module.exports = {
  waitAndClick: async function (timeout) {
    await this.waitForClickable({ timeout });
    await this.click();
  },
  scrollAndClick: async function (xCoords = 0, yCoords = 0) {
    await this.scrollIntoView();
    await this.click({ x: xCoords, y: yCoords });
  },
};
