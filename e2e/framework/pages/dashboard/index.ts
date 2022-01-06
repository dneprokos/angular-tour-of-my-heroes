import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page";
import { HeroSearchFragment } from "./fragments/hero-search-fragment";
import { TopHeroesFragment } from "./fragments/top-heroes-fragment";

export class DashboardPage extends PageWithNavMenuAndMessages {
    topHeroes: TopHeroesFragment;
    heroSearch: HeroSearchFragment;

    constructor(page: Page) {
        super(page);
        this.topHeroes = new TopHeroesFragment(page);
        this.heroSearch = new HeroSearchFragment(page);
    }

    async open(): Promise<DashboardPage> {
        await this.navigateUrl(TestSettings.BaseUrl);
        return await new DashboardPage(this.page);
    }
}