import { test, expect } from '@playwright/test';
import { DashboardPage } from '../framework/pages/pages';
import { navigateToDashboardPage } from '../framework/utils/quick-url-navigation';


test.describe.parallel('Playwright test runner fixture examples', () => {
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        dashboardPage = await navigateToDashboardPage(page);
    })

    test('Verify top heroes contains expected heroes', async () => {
        //Arrange
        const expectedHeroes = ['Captain America', 'Iron Man', 'Thor', 'Hulk']; //TODO: Will be good to get it from API or modify request when backend is available https://playwright.dev/docs/network#variations-1 
        
        //Act
        const heroes = await dashboardPage.topHeroes.getTopHeroesNames();

        //Assert
        expect(heroes).toStrictEqual(expectedHeroes);
    })

    test('Search should show expected results', async () => {
        //Arrange
        const expectedHeroes = ['Iron Man', 'Ant-Man', 'Spider-Man', 'Temp']; //TODO: Will be good to get it from API or modify request when backend is available https://playwright.dev/docs/network#variations-1 
        
        //Act                                   
        const searchFragment = await dashboardPage.heroSearch.enterTextToSeachField('man');
        const foundHeroes = await searchFragment.waitAndReturnSearchResults();
        
        //Assert
        expect(foundHeroes).toStrictEqual(expectedHeroes); //NOTE: This test will fail. Created to test failure cases
    })
})