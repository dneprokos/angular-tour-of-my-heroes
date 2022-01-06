import { PageUrls } from "../../constants/page-uri-const";
import { Page } from "playwright";
import { PageWithNavMenuAndMessages } from "../_common-page";
import { waits } from "../../../libs/helpers/waits";

export class DetailsPage extends PageWithNavMenuAndMessages {
    idLocator: string = "//div[child::span]";

    constructor(page: Page) {
        super(page);
    }

    async open(heroId: number): Promise<DetailsPage> {
        await this.navigateUrl(PageUrls.detailsPage(heroId));
        return await new DetailsPage(this.page);
    }

    async getHeroId() {
        let allTexts = await (await waits(this.page).waitVisibility(this.idLocator)).textContent();
        return allTexts?.split(":")[1].trim();
    }
}