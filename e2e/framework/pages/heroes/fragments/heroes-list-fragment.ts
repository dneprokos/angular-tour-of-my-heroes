import { Page } from "playwright";
import { BaseFragment } from "../../../../libs/base.fragment";
import { waits } from "../../../../libs/helpers/waits";
import { Hero } from "../../../models/hero";
import { DetailsPage } from "../../details";

export class HeroesList extends BaseFragment {
    private heroesListLocator: string = "//ul[@class='heroes']/li";
    private heroesIdNameLocator: string = `${this.heroesListLocator}/a`;

    constructor(page: Page) {
        super(page);
    }

    async getHeroesIdNamePairs(): Promise<Hero[]> {
        await (await waits(this.page).waitVisibility(this.heroesIdNameLocator))
        let allLinesOfText = await this.page.locator(this.heroesIdNameLocator).allInnerTexts();
        if (allLinesOfText.length === 0) {
            throw new Error('Heroes count should not be null');
        }
        return allLinesOfText.map(val => this.convertStringToHero(val)); 
    }

    async selectHeroById(heroId: number) : Promise<DetailsPage> {
        await this.page.click(`//ul/li/a[span[contains(text(), '${heroId}')]]`);
        return new DetailsPage(this.page);
    };

    //TODO: Need to override. IT will be nice ti get only first element. 
    async getFirstHero() {
        await (await waits(this.page).waitVisibility(this.heroesIdNameLocator))
        let allLinesOfText = await this.page.locator(this.heroesIdNameLocator).allInnerTexts();

        if (allLinesOfText.length === 0) {
            throw new Error('Heroes count should not be null');
        }
        else {
            return this.convertStringToHero(allLinesOfText[0]);
        }
    }

    async selectHeroByName(name: string) {
        const selector = `//a[contains(text(), '${name}')]`;

        await Promise.all([
            waits(this.page).waitVisibility(selector),
            this.page.click(selector)
        ]);
        
        return new DetailsPage(this.page);
    }

    convertStringToHero(value:string):Hero {
        let splitValues = value.split(' ');
        const id = parseInt(splitValues[0]);
        let slicedValues = splitValues.slice(1, splitValues.length)
        let name = '';
        slicedValues.forEach(part => name += ` ${part}`);
        let hero: Hero = {id: id, name: name.trim()}
        return hero;
    }
    
}