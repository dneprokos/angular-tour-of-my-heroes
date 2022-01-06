import { HeroesPage } from "../framework/pages/heroes";
import { DetailsPage } from "../framework/pages/details";
import { closeBrowser, runBrowserAndOpenOnDetailsPageWithFirstHero } from "../framework/utils/setup-teardown-helper";

describe("Tour of Heroes - Detail page e2e tests", () => {
    let detailsPage: DetailsPage;
    
    beforeEach(async () => {
        detailsPage = await runBrowserAndOpenOnDetailsPageWithFirstHero();
    })
    
    afterAll(async () => {
        await closeBrowser();
    })

    it("Hero details id should equals to url id", async () => {
        //Arrange

        //Act
        let currentUrl = await detailsPage.page.url();
        let urlArray: string[] = currentUrl.split('/');
        let urlId = urlArray[urlArray.length - 1];

        let heroId: string | undefined = await detailsPage.getHeroId();
        //Notes: Values can also be converted to numbers in case when we need to compare with APi response

        //Assert
        expect(heroId).toEqual(urlId);
    });

    it("Hero name can be updated", async () => {
        //Arrange

        try {
            //Act

            //Assert
        }
        finally {

        }
    });

})