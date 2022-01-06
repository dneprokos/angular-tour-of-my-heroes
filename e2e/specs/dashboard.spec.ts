import { closeBrowser, runBrowserAndOpenMainPage } from "../framework/utils/setup-teardown-helper";
import { DashboardPage } from "../framework/pages/dashboard";

describe("Tour of Heroes - Dashboard page e2e tests", () => {
    let dashboardPage: DashboardPage;

    beforeEach(async () => {
        dashboardPage = await runBrowserAndOpenMainPage();
    })

    afterAll(async () => {
        await closeBrowser();
    })

    it("Top heroes should be names of the first four heroes", async () => {        
        //Arrange
        let expectedHeroes = ['Captain America', 'Iron Man', 'Thor', 'Hulk']; //TODO: Will be good to get it from API
        
        //Act
        let heroes = await dashboardPage.topHeroes.getTopHeroesNames();
        
        //Assert
        expect(heroes).toEqual(expectedHeroes);
    })

    it("Search should show expected results", async () => {
        //Arrange
        let expectedHeroes = ['Iron Man', 'Ant-Man', 'Spider-Man']; //TODO: Will be good to get it from API

        //Act
        await dashboardPage.heroSearch.enterTextToSeachField('man');
        let foundHeroes = await dashboardPage.heroSearch.waitAndReturnSearchResults();

        //Assert
        expect(foundHeroes).toEqual(expectedHeroes);
    })
})





