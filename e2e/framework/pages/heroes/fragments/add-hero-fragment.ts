import { waits } from "../../../../libs/helpers/waits";
import { Page } from "playwright";
import { BaseFragment } from "../../../../libs/base.fragment";
import { DetailsPage } from "../../details";

export class AddHeroFragment extends BaseFragment {
    private newHeroInputLocator: string = '#new-hero';
    private addHeroButtonLocator: string = 'button.add-button';
    
    constructor(page: Page) {
        super(page);
    }

    async fillNewHeroName(name: string): Promise<DetailsPage> {
        await this.page.fill(this.newHeroInputLocator, name);
        return new DetailsPage(this.page);
    }

    async clickAddHeroButton(): Promise<DetailsPage> {
        await this.page.click(this.addHeroButtonLocator);
        return new DetailsPage(this.page);
    }
}