export const getAuthToken = async () => {
  return (await browser.getAllCookies()).find((cookie) => cookie.name.includes("token")).value;
};

export const isLoggedIn = async () => {
  let filteredCookies = (await browser.getAllCookies()).filter((cookie) => cookie.name.includes("token"));
  return filteredCookies.length > 0;
};
