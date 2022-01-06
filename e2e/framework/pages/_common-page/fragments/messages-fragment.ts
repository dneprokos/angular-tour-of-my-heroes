import { BaseFragment } from "../../../../libs/base.fragment";
import { Page } from "playwright";

export class MessagesFragment extends BaseFragment{
    constructor(page: Page) {
        super(page);
    }
}