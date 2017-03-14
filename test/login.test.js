describe('Login page', () => {
  it('should have title Log In to Intelligize', () => {
    browser.url('http://dev.intelligize.net');
    const title = browser.getTitle();
    title.should.be.equal('Log In To Intelligize');
  });
  
  it('should log in to home page', () => {
    browser.url('http://dev.intelligize.net');
    
    browser.setValue('input[name=\'username\']','usuario@mail.com');
    browser.setValue('input[name=\'password\']','contraseñaAlfaNumerica');
    browser.click('button');

    browser.waitUntil(() => {
      return browser.getUrl() === 'http://dev.intelligize.net/app/eo';
    }, 5000, 'Timeout waiting for redirect to /app/eo');
  });
});