import { Page } from "playwright";

export function waits(page: Page) {
    return {
        waitVisibility: (selector: any) => page.waitForSelector(selector, { state: 'attached' }), 
        waitForSeconds: (timeoutSecounds: number) => page.waitForTimeout(timeoutSecounds * 1000)
    }
}