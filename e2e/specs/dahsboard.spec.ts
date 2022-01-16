import { test, expect } from '@playwright/test';
import { DashboardPage } from '../framework/pages/dashboard';
import { framework } from '../framework';


test.describe.parallel('Playwright test runner fixture examples', () => {
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        dashboardPage = await framework().pageProvider(page).dashboard().open();
    })

    test('Verify top heroes contains expected heroes', async () => {
        //Arrange
        let expectedHeroes = ['Captain America', 'Iron Man', 'Thor', 'Hulk']; //TODO: Will be good to get it from API
        
        //Act
        let heroes = await dashboardPage.topHeroes.getTopHeroesNames();

        //Assert
        expect(heroes).toStrictEqual(expectedHeroes);
    })

    test('Search should show expected results', async () => {
        //Arrange
        let expectedHeroes = ['Iron Man', 'Ant-Man', 'Spider-Man', 'Temp']; //TODO: Will be good to get it from API
        
        //Act
        await dashboardPage.heroSearch.enterTextToSeachField('man');
        let foundHeroes = await dashboardPage.heroSearch.waitAndReturnSearchResults();
        
        //Assert
        expect(foundHeroes).toStrictEqual(expectedHeroes); //NOTE: This test will fail. Created to test failure cases
    })
})