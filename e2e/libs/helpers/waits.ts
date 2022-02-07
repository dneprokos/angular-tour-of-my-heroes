import { Page } from "playwright";

export function waits(page: Page) {
    return {
        waitVisibility: (selector: never) => page.waitForSelector(selector, { state: 'attached' }), 
        waitForSeconds: (timeoutSecounds: number) => page.waitForTimeout(timeoutSecounds * 1000)
    }
}