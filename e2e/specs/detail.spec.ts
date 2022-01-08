import { PageUrls } from "../framework/constants/page-uri-const";
import { Page } from "playwright";
import { DetailsPage } from "../framework/pages/details";
import { closeBrowser, openBrowser, runBrowserAndOpenOnDetailsPageWithFirstHero } from "../framework/utils/setup-teardown-helper";
import { framework } from "../framework";

describe("Tour of Heroes - Detail page e2e tests", () => {
    afterAll(async () => {
        await closeBrowser();
    });

    it("Hero details id should equals to url id", async () => {
        //Arrange
        let detailsPage: DetailsPage = await runBrowserAndOpenOnDetailsPageWithFirstHero();
    
        //Act
        let currentUrl = await detailsPage.page.url();
        let urlArray: string[] = currentUrl.split('/');
        let urlId = urlArray[urlArray.length - 1];

        let heroId: string | undefined = await detailsPage.getHeroId();
        //Notes: Values can also be converted to numbers in case when we need to compare with APi response

        //Assert
        expect(heroId).toEqual(urlId);
    });

    const initialPages = ['Dashboard', 'Heroes'];
    initialPages.forEach(initPage => {
        it(`Save button click - Updates name and navigates user to previous page - ${initPage}`, async () => {
            //Arrange
            let page: Page = await openBrowser();
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
    })
})