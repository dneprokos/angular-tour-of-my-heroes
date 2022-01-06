import { Page } from "playwright";
import { DashboardPage } from "../pages/dashboard";
import { DetailsPage } from "../pages/details";
import { HeroesPage } from "../pages/heroes";
import { TestBrowser } from "./browser-setup";

export async function runBrowserAndOpenMainPage(): Promise<DashboardPage> {
    const page: Page = await openBrowser();
    return await new DashboardPage(page).open();
}
   
export async function closeBrowser(): Promise<void> {
    await (await TestBrowser.current()).close();
}

export async function runBrowserAndOpenOnDetailsPageWithFirstHero(): Promise<DetailsPage> {
    const page: Page = await openBrowser();
    let heroesPage = await new HeroesPage(page).open();
    let heroes = await heroesPage.getHeroesIdNamePairs();
    expect(heroes.length).toBeGreaterThan(0);
    let firstHero = heroes[0];
    return await new DetailsPage(page).open(firstHero.id);
}

export async function openBrowser(): Promise<Page> {
    return await (await TestBrowser.current()).newPage();
}

