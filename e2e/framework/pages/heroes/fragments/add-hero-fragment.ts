import { Page } from "playwright";
import { BaseFragment } from "../../../../libs/base.fragment";
import { DetailsPage } from "../../details/details-page";

export class AddHeroFragment extends BaseFragment {    
    constructor(page: Page) {
        super(page);
    }

    async fillNewHeroName(name: string): Promise<DetailsPage> {
        await this.page.locator('#new-hero').fill(name);
        return new DetailsPage(this.page);
    }

    async clickAddHeroButton(): Promise<DetailsPage> {
        await this.page.locator('button.add-button').click();
        return new DetailsPage(this.page);
    }
}