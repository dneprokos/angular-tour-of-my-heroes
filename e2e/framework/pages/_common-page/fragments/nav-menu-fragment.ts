import { BaseFragment } from "../../../../libs/base.fragment";
import { Page } from "playwright";

export class NavigationMenuFragment extends BaseFragment {
    constructor(page: Page) {
        super(page);
    }
}