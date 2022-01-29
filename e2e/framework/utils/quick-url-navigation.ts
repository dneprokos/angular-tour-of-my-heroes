import { Page } from "@playwright/test";
import { PageUrls } from "../constants/page-uri-const";
import { DashboardPage, DetailsPage, HeroesPage } from "../pages/pages";

export async function navigateToDashboardPage(page:Page): Promise<DashboardPage> {
    await page.goto(PageUrls.baseUri);
    return new DashboardPage(page);
}

export async function navigateToDetailsPage(page:Page, heroId: number | string): Promise<DetailsPage> {
    if (typeof(heroId) === 'string') {
        heroId = Number.parseInt(heroId);
    }
    const expectedUrl = PageUrls.detailsPage(heroId);

    await page.goto(expectedUrl);
    return new DetailsPage(page);
}

export async function navigateToMyHeroesPage(page:Page): Promise<HeroesPage> {
    await page.goto(PageUrls.heroesPage);
    return new HeroesPage(page);
}