import { addSpecDoneReporter as addSpecDoneReporter, closeBrowser, makeScreenshotOnFailure, runBrowserAndOpenMainPage } from "../framework/utils/setup-teardown-helper";
import { DashboardPage } from "../framework/pages/dashboard";

addSpecDoneReporter();

describe("Tour of Heroes - Dashboard page e2e tests", () => {
    let dashboardPage: DashboardPage;

    beforeAll(async () => {})

    beforeEach(async () => {
        dashboardPage = await runBrowserAndOpenMainPage();
    });

    afterEach(async () => {
        //TODO: For some reason it takes name of the first failed test, but it makes screenshot only for the second one, but with a name of the first failed test.
        //The same case if 3 tests are failing. It makese screenshot of test 2 and 3 with a name of 1st and 2nd test. Still don't know how to resolve it.         
        await makeScreenshotOnFailure();
        await dashboardPage.page.close();
    })

    afterAll(async () => {
        await closeBrowser();
    });

    it("Top heroes should be names of the first four heroes", async () => {        
        //Arrange
        let expectedHeroes = ['Captain America', 'Iron Man', 'Thor', 'Hulk', 'Temp']; //TODO: Will be good to get it from API
        
        //Act
        let heroes = await dashboardPage.topHeroes.getTopHeroesNames();
        
        //Assert
        expect(heroes).toEqual(expectedHeroes);
    })

    it("Search should show expected results", async () => {
        //Arrange
        let expectedHeroes = ['Iron Man', 'Ant-Man', 'Spider-Man', 'Temp']; //TODO: Will be good to get it from API

        //Act
        await dashboardPage.heroSearch.enterTextToSeachField('man');
        let foundHeroes = await dashboardPage.heroSearch.waitAndReturnSearchResults();

        //Assert
        expect(foundHeroes).toEqual(expectedHeroes);
    })
})





