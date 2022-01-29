import { Page } from 'playwright';
import { DashboardPage } from './dashboard/dashboard-page';
import { DetailsPage } from './details/details-page';
import { HeroesPage } from './heroes/my-heroes-page';

export function pageProdider(page: Page) {
    return {
        dashboard: () => new DashboardPage(page),
        details: () => new DetailsPage(page),
        heroes: () => new HeroesPage(page)
    }
}

export  { DashboardPage, DetailsPage, HeroesPage }