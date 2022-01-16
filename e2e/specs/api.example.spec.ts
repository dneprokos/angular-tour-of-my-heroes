import { test, expect } from '@playwright/test';
import { Country } from '../framework/models/api-models/country';

const BASE_URL = 'https://restcountries.com/v2/';
const HEADERS = { 'Accept': 'application/json' };

test.describe.parallel('REST API requests test examples', () => {
    test('Get Country info by name', async ({request}) => {
        
        //Act
        let getResponse = await request.get(`${BASE_URL}name/usa`, { headers: HEADERS });

        //Assert
        expect(getResponse.ok()).toBeTruthy();
        let responseBody: Country [] = await getResponse.json();
        console.log(responseBody);
        expect(responseBody.length).toEqual(1);
        expect(responseBody[0].name).toEqual('United States of America');
    });

    test('Get Capital info by name', async ({request}) => {
    
        //Act
        let getResponse = await request.get(`${BASE_URL}capital/kyiv`, { headers: HEADERS });
        
        //Assert
        expect(getResponse.ok()).toBeTruthy();
        let responseBody = await getResponse.json();
        console.log(responseBody);
    });
})