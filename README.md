# AngularTourOfHeroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.12 and it based on Angular tutorial: https://angular.io/tutorial/toh-pt6 

![Main page Image](/images/MainPage.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

<b>Summary:</b> e2e tests were designed with help of Playwight Node.js library (https://playwright.dev/) as API for browser automation and with 'playewright test' test runner and assertion framework (https://playwright.dev/docs/intro).

### Start running

1) Make sure .env file contains all expected environment configs
2) In CMD|Powershell|Linux shell run the following command "npm test"  

### Run allure reports

'allure serve' - direct command runs and opens report

### Script runs all e2e tests and generates and opens allure reports

On Windows in Powershell run script "runTestsAndGenerateReport.ps1"

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
