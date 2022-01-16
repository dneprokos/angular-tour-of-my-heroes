import { Page } from 'playwright';
import { DashboardPage } from './dashboard';
import { DetailsPage } from './details';
import { HeroesPage } from './heroes';

export function pageProdider(page: Page) {
    return {
        dashboard: () => new DashboardPage(page),
        details: () => new DetailsPage(page),
        heroes: () => new HeroesPage(page)
    }
}

export  { DashboardPage, DetailsPage, HeroesPage }