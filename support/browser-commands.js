/**
 * This module adds custom methods to `browser` scope. e.g browser.customMethod()
 *
 * NB!!! Do not use arrow function expressions or it won't work.
 */

module.exports = {
  getUrlAndTitle: async function () {
    // `this` refers to the `browser` scope
    return {
      url: await this.getUrl(),
      title: await this.getTitle(),
    };
  },
  jsClick: async function (element) {
    await this.execute('arguments[0].click();', element);
  },
  reloadPage: async function () {
    await this.refresh();
    const cfReloadButton = this.$('#reload-btn');
    if (await cfReloadButton.isExisting()) {
      await cfReloadButton.click();
    }
  },
};
