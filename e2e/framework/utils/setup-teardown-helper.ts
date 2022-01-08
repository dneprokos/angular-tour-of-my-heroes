import { Page } from "playwright";
import { DashboardPage } from "../pages/dashboard";
import { DetailsPage } from "../pages/details";
import { HeroesPage } from "../pages/heroes";
import { TestBrowser } from "./browser-setup";
import { pageProdider } from '../pages';

export async function runBrowserAndOpenMainPage(): Promise<DashboardPage> {
    const page: Page = await openBrowser();
    return await pageProdider(page).dashboard().open();
}
   
export async function closeBrowser(): Promise<void> {
    await (await TestBrowser.current()).close();
}

export async function runBrowserAndOpenOnDetailsPageWithFirstHero(): Promise<DetailsPage> {
    const page: Page = await openBrowser();
    let heroesPage: HeroesPage = await pageProdider(page).heroes().open(); 
    let heroes = await heroesPage.heroesListFragment.getHeroesIdNamePairs();
    expect(heroes.length).toBeGreaterThan(0);
    let firstHero = heroes[0];
    return await pageProdider(page).details().open(firstHero.id);
}

export async function openBrowser(): Promise<Page> {
    return await (await TestBrowser.current()).newPage();
}

