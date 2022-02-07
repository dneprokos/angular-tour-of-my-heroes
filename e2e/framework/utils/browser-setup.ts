import { BrowserContext, chromium, ChromiumBrowser, firefox, FirefoxBrowser, Page } from "playwright";
import { SupportedBrowsers } from "./supported-browsers";

export class TestBrowser {
    private static instance: TestBrowser;
    private _browser: ChromiumBrowser | FirefoxBrowser | undefined;
    private _browserContext: BrowserContext | undefined;

    public static async current(): Promise<TestBrowser> {
        if (!TestBrowser.instance) {
          TestBrowser.instance = new TestBrowser();
          await TestBrowser.instance.setup();
        }
        return TestBrowser.instance;
    }

    public async newPage(): Promise<Page> {
        const page = await this.browserContext.newPage();
        //page.setDefaultTimeout(5000)
        if (page == null) {
          throw new Error('Failed to create new Page');
        }
        await page.setViewportSize({ width: 2045, height: 960 });
        return page;
    }

    public async close(): Promise<void> {
      await this.browserContext.close();
      await this.browser.close(); 
    }

    public getFirstPage(): Page {
      return this.browserContext.pages()[0];
    }

    private get browserContext() {
      if (this._browserContext == null) throw new Error('BrowserContext was not initialized');
      return this._browserContext;
    }

    private get browser() {
      if (this._browser == null) throw new Error('Browser was not launched or already closed');
      return this._browser;
    }

    private async setup(): Promise<void> {
        const configBrowser = TestSettings.Browser;

        switch (configBrowser) {
          case SupportedBrowsers.Chrome:
            this._browser = await chromium.launch({headless: TestSettings.HeadlessBrowser})
            break;
          case SupportedBrowsers.Firefox:
            this._browser = await firefox.launch({headless: TestSettings.HeadlessBrowser})
            break;
          default:
            throw new Error(`Unsupported browser ${configBrowser} was specified in .env`);
        }

        this._browserContext = await this._browser.newContext();
    }
}