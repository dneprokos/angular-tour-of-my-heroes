import { test, expect } from '@playwright/test';
import { framework } from '../framework';
import { DetailsPage, HeroesPage  } from '../framework/pages';


test.describe.parallel('Tour of Heroes - Heroes page e2e tests', async () => {
    let heroesPage: HeroesPage;

    test('Create user - Should be created', async ({page}) => {
        //Arrange
        heroesPage = await framework().pageProvider(page).heroes().open();
        const newHeroName = 'Star Lord';

        //Act
        await heroesPage.addHeroFragment.fillNewHeroName(newHeroName);
        await heroesPage.addHeroFragment.clickAddHeroButton();

        //Assert
        const detailPage: DetailsPage = await heroesPage.heroesListFragment.selectHeroByName(newHeroName);
        let actualHeroName = await detailPage.getHeroName();
        expect(actualHeroName).toEqual(newHeroName);
    });
})