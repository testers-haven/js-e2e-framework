import MainPage from "../pages/main.page";

describe("On main page", () => {
  it("Log in button is displayed", async () => {
    await MainPage.open();
    await expect(MainPage.header.loginBtn).toBeDisplayed();
  });
});
