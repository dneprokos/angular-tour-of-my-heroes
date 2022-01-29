import { PageUrls } from "../../constants/page-uri-const";
import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page/common-page";
import { HeroSearchFragment } from "./fragments/hero-search-fragment";
import { TopHeroesFragment } from "./fragments/top-heroes-fragment";

export class DashboardPage extends PageWithNavMenuAndMessages {
    topHeroes: TopHeroesFragment;
    heroSearch: HeroSearchFragment;

    constructor(page: Page) {
        super(page);

        //TODO: Think about lazy initialization
        this.topHeroes = new TopHeroesFragment(page);
        this.heroSearch = new HeroSearchFragment(page);
    }

    // async open(): Promise<DashboardPage> {
        // await this.navigateUrl(PageUrls.baseUri)
        // return new DashboardPage(this.page);
    // }
}