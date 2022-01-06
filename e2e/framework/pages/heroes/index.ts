import { PageUrls } from "../../../framework/constants/page-uri-const";
import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page";
import { waits } from "../../../libs/helpers/waits";
import { Hero } from "../../models/hero";
import { DetailsPage } from "../details";

export class HeroesPage extends PageWithNavMenuAndMessages {
    heroesListLocator: string = "//ul[@class='heroes']/li";
    heroesIdNameLocator: string = `${this.heroesListLocator}/a`;

    constructor(page: Page) {
        super(page);
    }

    async open(): Promise<HeroesPage> {
        await this.navigateUrl(PageUrls.heroesPage);
        return await new HeroesPage(this.page);
    }

    async getHeroesIdNamePairs(): Promise<Hero[]> {
        await (await waits(this.page).waitVisibility(this.heroesIdNameLocator))
        let allLinesOfText = await this.page.locator(this.heroesIdNameLocator).allInnerTexts();;
        return allLinesOfText.map(val => {
            let splitValues = val.split(' ');
            let hero: Hero = {id: parseInt(splitValues[0]), name: splitValues[1]}
            return hero;
        })
    }

    async selectHeroById(heroId: number) : Promise<DetailsPage> {
        await this.page.click(`//ul/li/a[span[contains(text(), '${heroId}')]]`);
        return await new DetailsPage(this.page);
    };

}