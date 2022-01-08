import { PageUrls } from "../../../framework/constants/page-uri-const";
import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page";
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

    async open(): Promise<HeroesPage> {
        await Promise.all([
            this.navigateUrl(PageUrls.heroesPage),
            this.page.waitForNavigation({url: PageUrls.heroesPage}) 
        ]);
        return await new HeroesPage(this.page);
    }
}