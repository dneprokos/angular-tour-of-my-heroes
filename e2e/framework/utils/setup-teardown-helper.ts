import { Page } from "playwright";
import { DashboardPage } from "../pages/dashboard/dashboard-page";
import { DetailsPage } from "../pages/details/details-page";
import { HeroesPage } from "../pages/heroes/my-heroes-page";
import { TestBrowser } from "./browser-setup";
import { expect } from '@playwright/test';
import { navigateToDashboardPage, navigateToDetailsPage, navigateToMyHeroesPage } from "./quick-url-navigation";

export async function runBrowserAndOpenMainPage(): Promise<DashboardPage> {
    const page: Page = await openBrowser();
    return await navigateToDashboardPage(page);
}
   
export async function closeBrowser(): Promise<void> {
    await (await TestBrowser.current()).close();
}

export async function openOnDetailsPageWithFirstHero(page: Page): Promise<DetailsPage> {
    //const page: Page = await openBrowser();
    let heroesPage: HeroesPage = await navigateToMyHeroesPage(page); 
    let heroes = await heroesPage.heroesListFragment.getHeroesIdNamePairs();
    expect(heroes.length).toBeGreaterThan(0);
    let firstHero = heroes[0];
    return await navigateToDetailsPage(page, firstHero.id);
}

export async function openBrowser(): Promise<Page> {
    return await (await TestBrowser.current()).newPage();
}

export async function makeScreenshotOnFailure(): Promise<void> {
    if (IsLastTestFailed) {
      IsLastTestFailed = false;
      const screenshotName = FailedTestName.replace(/ /g, '_');
      console.log(screenshotName);
      const page = (await TestBrowser.current()).getFirstPage();
      await page.screenshot({
        path: `${TestSettings.ScreenshotsFolder}/${screenshotName}.png`, fullPage: true
      });
    }
}

export async function addSpecDoneReporter() {
    jasmine.getEnv().addReporter({specDone: async result => {
        if (result.status === 'failed') {
            IsLastTestFailed = true;
            FailedTestName = result.fullName;
            console.log(result);
        }
    }});
}
