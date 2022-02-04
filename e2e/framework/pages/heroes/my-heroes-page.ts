import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page/common-page";
import { AddHeroFragment } from "./fragments/add-hero-fragment";
import { HeroesList } from "./fragments/heroes-list-fragment";

export class HeroesPage extends PageWithNavMenuAndMessages {
    addHeroFragment: AddHeroFragment;
    heroesListFragment: HeroesList;

    constructor(page: Page) {
        super(page);

        //TODO: Think about lazy initialization
        this.addHeroFragment = new AddHeroFragment(page);
        this.heroesListFragment = new HeroesList(page);
    }
}