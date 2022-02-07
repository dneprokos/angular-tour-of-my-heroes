import { BaseFragment } from "../../../../libs/base.fragment";
import { Page } from "playwright";
import { waits } from "../../../../libs/helpers/waits";

export class HeroSearchFragment extends BaseFragment {
    searchResultsListSelector = '.search-result > li h4'
    
    constructor(page: Page) {
        super(page);
    }

    async enterTextToSeachField(text: string): Promise<HeroSearchFragment> {
        await this.page.locator('#search-box').fill(text);
        return this;
    }

    async waitAndReturnSearchResults(): Promise<string []> {
        await waits(this.page).waitVisibility(this.searchResultsListSelector);
        return await this.page.locator(this.searchResultsListSelector).allInnerTexts();
    }
}