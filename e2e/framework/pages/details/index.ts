import { PageUrls } from "../../constants/page-uri-const";
import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page";
import { waits } from "../../../libs/helpers/waits";

export class DetailsPage extends PageWithNavMenuAndMessages {
    private idLocator: string = "//div[child::span]";
    private nameInputLocator: string = "#hero-name";
    private saveButtonLocator: string = 'button:has-text("save")';
    private goBackButtonLocator: string = 'button:has-text("go back")';

    constructor(page: Page) {
        super(page);
    }

    async open(heroId: number | string): Promise<DetailsPage> {
        if (typeof(heroId) === 'string') {
            heroId = Number.parseInt(heroId);
        }
        const expectedUrl = PageUrls.detailsPage(heroId);
        await Promise.all([
            this.navigateUrl(expectedUrl),
            this.page.waitForNavigation({url: expectedUrl})
        ]);
        return await new DetailsPage(this.page);
    }

    async getHeroId(): Promise<string | undefined> {
        let allTexts = await (await waits(this.page).waitVisibility(this.idLocator)).textContent();
        return allTexts?.split(":")[1].trim();
    }

    async getHeroName(): Promise<string> {
        return await this.page.locator(this.nameInputLocator).inputValue();
    }

    async fillNewHeroName(name: string): Promise<DetailsPage> {
        await this.page.fill(this.nameInputLocator, name);
        return new DetailsPage(this.page);
    }

    async clickSaveButton(): Promise<void> {
        await this.page.click(this.saveButtonLocator);
    }

    async clickGoBackButton(): Promise<void> {
        await this.page.click(this.goBackButtonLocator);
    }

    async fillNameAndClickSaveButton(name: string): Promise<void> {
        await Promise.all([
            this.fillNewHeroName(name),
            this.clickSaveButton()
        ]);
    }
}