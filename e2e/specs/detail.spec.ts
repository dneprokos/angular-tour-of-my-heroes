import { test, expect } from '@playwright/test';
import { openOnDetailsPageWithFirstHero } from '../framework/utils/setup-teardown-helper';
import { DetailsPage } from '../framework/pages';
import { PageUrls } from '../framework/constants/page-uri-const';
import { framework } from '../framework';

test.describe.parallel('Tour of Heroes - Detail page e2e tests', async () => {
    test("Hero details id should equals to url id", async ({ page }) => {
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
    initialPages.forEach(initPage => {
        test(`Save button click - Updates name and navigates user to previous page - ${initPage}`, async ({page}) => {
            //Arrange
            let detailsPage: DetailsPage;
            const newName: string = 'Test';

            //Note:Requires to start from initial page before navigation to details in order to remember it
            let expectedRedirectUrl: string;

            switch (initPage) {
                case 'Dashboard':
                    expectedRedirectUrl = PageUrls.dashboardPage;
                    let dashboardPage = await framework().pageProvider(page).dashboard().open();
                    let firstHeroName = await (await dashboardPage.topHeroes.getTopHeroesNames()).filter(name => name)[0];
                    detailsPage = await dashboardPage.topHeroes.clickHeroName(firstHeroName);
                    break;
                case 'Heroes':
                    expectedRedirectUrl = PageUrls.heroesPage;
                    let heroesPage = await framework().pageProvider(page).heroes().open();
                    const heroesList = heroesPage.heroesListFragment;
                    let firstHero = await (await heroesList.getHeroesIdNamePairs()).filter(name => name)[0];
                    detailsPage = await heroesList.selectHeroById(firstHero.id);
                    break;
                default:
                    throw new Error(`Case for init page ${initPage} was not implemented`);
            }

            //NOTE: Initial values to restore initial data
            const initialHeroName: string = await detailsPage.getHeroName();
            const intialId: string = await detailsPage.getHeroId() as string;

            try {
                //Act
                await detailsPage.fillNewHeroName(newName);
                await detailsPage.clickSaveButton();

                //Assert
                await page.waitForNavigation({url: expectedRedirectUrl})
                switch (initPage) {
                    case 'Dashboard':
                        const actualName: string = await (await framework()
                            .pageProvider(page)
                            .dashboard().topHeroes
                            .getTopHeroesNames())
                            .filter(name => name)[0];
                        expect(actualName).toBe(newName);
                        break;
                    case 'Heroes':
                        const actualHero = await framework()
                            .pageProvider(page)
                            .heroes().heroesListFragment
                            .getFirstHero();
                        expect(actualHero.name).toEqual(newName);
                        break;
                }
            }
            finally {
                await (await detailsPage
                    .open(intialId))
                    .fillNameAndClickSaveButton(initialHeroName);
            }
        });
    });

})