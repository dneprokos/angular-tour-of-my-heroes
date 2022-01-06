import { BaseFragment } from "../../../../libs/base.fragment";
import { Page } from "playwright";
import { waits } from "../../../../libs/helpers/waits";

export class HeroSearchFragment extends BaseFragment {
    searchFieldLocator: string = '#search-box';
    searchResultsListLocator: string = '.search-result>li h4'
    
    constructor(page: Page) {
        super(page);
    }

    async enterTextToSeachField(text: string): Promise<void> {
        await this.page.fill(this.searchFieldLocator, text);
    }

    async waitAndReturnSearchResults(): Promise<string []> {
        await await waits(this.page).waitVisibility(this.searchResultsListLocator);
        return await this.page.locator(this.searchResultsListLocator).allInnerTexts();
    }
}