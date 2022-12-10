import { config, USER_AGENT } from "./wdio.shared.conf";

// https://github.com/GoogleChrome/puppeteer/blob/e17d38c61b2b39ec485c3bcb20976afa2b4cc5b5/lib/Launcher.js#L38
const CHROME_ARGS = [
  "--disable-setuid-sandbox",
  "--disable-background-networking",
  "--enable-features=NetworkService,NetworkServiceInProcess",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-extensions-with-background-pages",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-extensions",
  "--disable-features=TranslateUI,BlinkGenPropertyTrees",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-popup-blocking",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-sync",
  "--force-color-profile=srgb",
  "--metrics-recording-only",
  "--no-first-run",
  "--password-store=basic",
  "--use-mock-keychain",
  "--window-size=1440,735",
  "--incognito",
  "--disable-blink-features=AutomationControlled",
  `--user-agent=${USER_AGENT}`,
  "--no-sandbox",
  "--shm-size=2gb",
];

const browserOptions = {
  excludeSwitches: ["enable-automation"],
  useAutomationExtension: "false",
  args: [...CHROME_ARGS],
};

const browserConfig = {
  ...config,
  specFileRetries: process.env.CI ? 1 : 0,
  specFileRetriesDelay: 5,
  specFileRetriesDeferred: true,
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": browserOptions,
      maxInstances: 10,
      acceptInsecureCerts: true,
    },
  ],
};

exports.config = browserConfig;
