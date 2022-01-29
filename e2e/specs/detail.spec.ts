import test, {expect} from '../framework/pages/pages';
import { openOnDetailsPageWithFirstHero } from '../framework/utils/setup-teardown-helper';
import { DetailsPage } from '../framework/pages/pages';
import { PageUrls } from '../framework/constants/page-uri-const';
import { Page } from 'playwright';
import { navigateToDashboardPage, navigateToDetailsPage, navigateToMyHeroesPage } from '../framework/utils/quick-url-navigation';

test.describe.parallel('Tour of Heroes - Detail page e2e tests', async () => {
    test("Hero details id should equals to url id", async ({ page  }) => {
        //Arrange
        const detailsPage: DetailsPage = await openOnDetailsPageWithFirstHero(page);

        //Act
        let currentUrl = await detailsPage.page.url();
        let urlArray: string[] = currentUrl.split('/');
        let urlId = urlArray[urlArray.length - 1];

        let heroId: string | undefined = await detailsPage.getHeroId();

        //Assert
        expect(heroId).toEqual(urlId);
    });

    const initialPages = ['Dashboard', 'Heroes'];
    initialPages.forEach(startPageName => {
        test(`Save button click - Updates name and navigates user to previous page - ${startPageName}`, async ({page, dashboardPage, heroesPage}) => {
            //Arrange
            const newName: string = 'Test';
            const [detailsPage, expectedRedirectUrl] = await navigateDetailsPageFromSpecificPage(startPageName, page);

            //NOTE: Initial values to restore initial data
            const initialHeroName: string = await detailsPage.getHeroName();
            const intialId: string = await detailsPage.getHeroId() as string;

            try {
                //Act
                await detailsPage.fillNewHeroName(newName);
                await detailsPage.clickSaveButton();

                //Assert
                await page.waitForNavigation({url: expectedRedirectUrl})
                switch (startPageName) {
                    case 'Dashboard':
                        const actualName: string =  (await dashboardPage.topHeroes.getTopHeroesNames()).filter(name => name)[0];
                        expect(actualName).toBe(newName);
                        break;
                    case 'Heroes':
                        const actualHero = await heroesPage.heroesListFragment.getFirstHero();
                        expect(actualHero.name).toEqual(newName);
                        break;
                }
            }
            finally {
                await (await navigateToDetailsPage(page, intialId))
                .fillNameAndClickSaveButton(initialHeroName);
            }
        });
    });

    //NOTE: It was used only once, not sure if it should be moved to separate helper file
    async function navigateDetailsPageFromSpecificPage(initPageName: string, page: Page): Promise<[DetailsPage, string]> {
        let detailsPage: DetailsPage;
        let expectedRedirectUrl: string;
        
        switch (initPageName) {
            case 'Dashboard':
                expectedRedirectUrl = PageUrls.dashboardPage;
                let dashboardPage = await navigateToDashboardPage(page);
                let firstHeroName = await (await dashboardPage.topHeroes.getTopHeroesNames()).filter(name => name)[0];
                detailsPage = await dashboardPage.topHeroes.clickHeroName(firstHeroName);
                break;
            case 'Heroes':
                expectedRedirectUrl = PageUrls.heroesPage;
                let heroesPage = await navigateToMyHeroesPage(page);
                const heroesList = heroesPage.heroesListFragment;
                let firstHero = await (await heroesList.getHeroesIdNamePairs()).filter(name => name)[0];
                detailsPage = await heroesList.selectHeroById(firstHero.id);
                break;
            default:
                throw new Error(`Case for init page ${initPageName} was not implemented`);
        }
        const expectedValues: [DetailsPage, string] = [detailsPage, expectedRedirectUrl];
        return expectedValues;
    }
})






















