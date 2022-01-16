import { PageUrls } from "../../../framework/constants/page-uri-const";
import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page";
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

    async open(): Promise<DashboardPage> {
        await Promise.all([
            //this.navigateUrl(TestSettings.BaseUrl),
            this.navigateUrl('http://localhost:4200/'),
            this.page.waitForNavigation({url: PageUrls.dashboardPage})
        ]);
        
        return await new DashboardPage(this.page);
    }
}