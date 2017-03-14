describe('Login page', () => {
  it('should have title Log In to Intelligize', () => {
    browser.url('http://dev.intelligize.net');
    const title = browser.getTitle();
    title.should.be.equal('Log In To Intelligize');
  });
});
