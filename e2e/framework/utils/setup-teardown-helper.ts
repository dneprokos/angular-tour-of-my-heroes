import { Page } from "playwright";
import { DashboardPage } from "../pages/dashboard";
import { DetailsPage } from "../pages/details";
import { HeroesPage } from "../pages/heroes";
import { TestBrowser } from "./browser-setup";
import { pageProdider } from '../pages';
import { expect } from '@playwright/test';

export async function runBrowserAndOpenMainPage(): Promise<DashboardPage> {
    const page: Page = await openBrowser();
    return await pageProdider(page).dashboard().open();
}
   
export async function closeBrowser(): Promise<void> {
    await (await TestBrowser.current()).close();
}

export async function openOnDetailsPageWithFirstHero(page: Page): Promise<DetailsPage> {
    //const page: Page = await openBrowser();
    let heroesPage: HeroesPage = await pageProdider(page).heroes().open(); 
    let heroes = await heroesPage.heroesListFragment.getHeroesIdNamePairs();
    expect(heroes.length).toBeGreaterThan(0);
    let firstHero = heroes[0];
    return await pageProdider(page).details().open(firstHero.id);
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
