import { Page } from "playwright";
import { BaseFragment } from "../../../../libs/base.fragment";
import { waits } from "../../../../libs/helpers/waits";
import { Hero } from "../../../models/hero";
import { DetailsPage } from "../../details/details-page";

export class HeroesList extends BaseFragment {
    private heroesListSelector: string = "//ul[@class='heroes']/li";
    private heroesIdNameSelector: string = `${this.heroesListSelector}/a`;

    constructor(page: Page) {
        super(page);
    }

    async getHeroesIdNamePairs(): Promise<Hero[]> {
        await waits(this.page).waitVisibility(this.heroesIdNameSelector)
        let allLinesOfText = await this.page.locator(this.heroesIdNameSelector).allInnerTexts();
        if (allLinesOfText.length === 0) {
            throw new Error('Heroes count should not be null');
        }
        return allLinesOfText.map(val => this.convertStringToHero(val)); 
    }

    async selectHeroById(heroId: number) : Promise<DetailsPage> {
        await this.page.locator(`text=${heroId}`).click();
        return new DetailsPage(this.page);
    };

    async getFirstHero(): Promise<Hero> {
        await waits(this.page).waitVisibility(this.heroesIdNameSelector);

        let firstElement = await this.page.$(this.heroesIdNameSelector);
        const text = await firstElement?.textContent() as unknown as string;
        console.log(text);
        return this.convertStringToHero(text);
    }

    async selectHeroByName(name: string): Promise<DetailsPage> {        
        await this.page.locator(`text=${name}`).click();
        return new DetailsPage(this.page);
    }

    private convertStringToHero(value:string):Hero {
        let splitValues = value.split(' ');
        const id = parseInt(splitValues[0]);
        let slicedValues = splitValues.slice(1, splitValues.length)
        let name = '';
        slicedValues.forEach(part => name += ` ${part}`);
        let hero: Hero = {id: id, name: name.trim()}
        return hero;
    }
    
}