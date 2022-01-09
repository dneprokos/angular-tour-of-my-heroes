Write-Output "Running e2e tests"
npm test
Write-Output "Running allure reports"
allure serve 