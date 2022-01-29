import { Page } from "playwright";
import { pageProdider } from "./pages/pages";

export function framework() {
    return {
        pageProvider: (page: Page) => pageProdider(page)
    }
}