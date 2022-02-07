import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page/common-page";
import { waits } from "../../../libs/helpers/waits";

export class DetailsPage extends PageWithNavMenuAndMessages {
    private heroNameInputFieldSelector = '#hero-name';

    constructor(page: Page) {
        super(page);
    }

    async getHeroId(): Promise<string | undefined> {
        const allTexts = await (await waits(this.page).waitVisibility('//div[child::span]')).textContent();
        return allTexts?.split(":")[1]?.trim();
    }

    async getHeroName(): Promise<string> {
        return await this.page.locator(this.heroNameInputFieldSelector).inputValue();
    }

    async fillNewHeroName(name: string): Promise<DetailsPage> {
        await this.page.locator(this.heroNameInputFieldSelector).fill(name);
        return this;
    }

    async clickSaveButton(): Promise<void> {
        await this.page.locator('text=save').click();
    }

    async clickGoBackButton(): Promise<void> {
        await this.page.locator('text=go back').click();
    }

    async fillNameAndClickSaveButton(name: string): Promise<void> {
        await this.fillNewHeroName(name);
        await this.clickSaveButton();
    }
}