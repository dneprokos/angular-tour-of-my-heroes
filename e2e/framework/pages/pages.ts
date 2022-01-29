import { DashboardPage } from './dashboard/dashboard-page';
import { DetailsPage } from './details/details-page';
import { HeroesPage } from './heroes/my-heroes-page';
import { test as base } from '@playwright/test';


type pages = {
    dashboardPage: DashboardPage;
    detailsPage: DetailsPage;
    heroesPage: HeroesPage;
};

export const test = base.extend<pages>({
    dashboardPage: async ({page}, use) => {
        await use(new DashboardPage(page));
    },
    detailsPage: async ({page}, use) => {
        await use(new DetailsPage(page));
    },
    heroesPage: async ({page}, use) => {
        await use(new HeroesPage(page));
    }
});

export default test;
export const expect = test.expect;
export  { DashboardPage, DetailsPage, HeroesPage }