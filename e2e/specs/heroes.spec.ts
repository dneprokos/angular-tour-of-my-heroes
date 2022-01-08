import { framework } from "../framework";
import { HeroesPage } from "../framework/pages/heroes";
import { Page } from "playwright";
import { closeBrowser, openBrowser } from "../framework/utils/setup-teardown-helper";
import { DetailsPage } from "../framework/pages/details";

describe("Tour of Heroes - Heroes page e2e tests", () => {
    let heroesPage: HeroesPage;
    
    beforeEach(async () => {
        let page: Page = await openBrowser();
        heroesPage = await framework().pageProvider(page).heroes().open();
    })
    
    afterAll(async () => {
        await closeBrowser();
    });

    it("Create user - Should be created", async () => {
        //Arrange
        const newHeroName = 'Star Lord';
        
        //Act
        await heroesPage.addHeroFragment.fillNewHeroName(newHeroName);
        await heroesPage.addHeroFragment.clickAddHeroButton();

        //Assert
        const detailPage: DetailsPage = await heroesPage.heroesListFragment.selectHeroByName(newHeroName);
        let actualHeroName = await detailPage.getHeroName();
        expect(actualHeroName).toEqual(newHeroName);
    })
})