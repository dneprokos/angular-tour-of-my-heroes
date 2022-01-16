import * as playwrightConfig from '../../../playwright.config'

export class PageUrls {

    //static readonly baseUri: string = TestSettings.BaseUrl; //Old one jest runner implementation
    static readonly baseUri: string = playwrightConfig.default.use?.baseURL as string; //process.env.URL as string;

    static readonly heroesPage: string = `${PageUrls.baseUri}heroes`;

    static readonly dashboardPage: string = `${PageUrls.baseUri}dashboard`;

    static detailsPage(id: number) : string {
        return `${PageUrls.baseUri}detail/${id}`;
    }
}


