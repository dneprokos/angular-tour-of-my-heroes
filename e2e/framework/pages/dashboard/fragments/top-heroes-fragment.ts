import { BaseFragment } from "../../../../libs/base.fragment";
import { Page } from "playwright";
import { waits } from "../../../../libs/helpers/waits";

export class TopHeroesFragment extends BaseFragment {
    topHeroesLocator: string = '.heroes-menu>a';

    constructor(page: Page) {
        super(page);
    }

    async getTopHeroesNames(): Promise<string []> {
        await waits(this.page).waitVisibility(this.topHeroesLocator);
        return await this.page.locator(this.topHeroesLocator).allInnerTexts();
    }
    
}