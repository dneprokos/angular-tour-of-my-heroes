export class PageUrls {

    static readonly baseUri: string = TestSettings.BaseUrl;

    static readonly heroesPage: string = `${PageUrls.baseUri}heroes`;

    static readonly dashboardPage: string = `${PageUrls.baseUri}dashboard`;

    static detailsPage(id: number) : string {
        return `${PageUrls.baseUri}detail/${id}`;
    }
}


