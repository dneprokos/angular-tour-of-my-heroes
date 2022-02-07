import { BaseFragment } from "../../../../libs/base.fragment";
import { Page } from "playwright";
import { waits } from "../../../../libs/helpers/waits";
import { PageUrls } from "../../../../framework/constants/page-uri-const";
import { DetailsPage } from "../../details/details-page";

export class TopHeroesFragment extends BaseFragment {
    topHeroesLocator = '.heroes-menu > a';

    constructor(page: Page) {
        super(page);
    }

    async getTopHeroesNames(): Promise<string []> {
        await waits(this.page).waitVisibility(this.topHeroesLocator);
        return await this.page.locator(this.topHeroesLocator).allInnerTexts();
    }

    async clickHeroName(name: string): Promise<DetailsPage> {
        const baseSelector = `//div/a[contains(text(), '${name}')]`;
        const href = await this.page.getAttribute(baseSelector, 'href');
        const heroId =  href?.split('/')[2] as string;
        const expectedUrl: string = PageUrls.detailsPage(+heroId);

        await Promise.all([
            this.page.click(baseSelector),
            this.page.waitForNavigation({url: expectedUrl})
        ]);
        return new DetailsPage(this.page);
    }
    
}