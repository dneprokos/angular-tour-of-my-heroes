import { BasePage } from "../../../libs/base.page";
import { Page } from "playwright";
import { MessagesFragment } from "./fragments/messages-fragment";
import { NavigationMenuFragment } from "./fragments/nav-menu-fragment";

export class PageWithNavMenuAndMessages extends BasePage {
    navigationMenu: NavigationMenuFragment;
    messages: MessagesFragment;

    constructor(page: Page) {
        super(page);
        this.navigationMenu = new NavigationMenuFragment(page);
        this.messages = new MessagesFragment(page);
    }
}