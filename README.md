[![CodeFactor](https://www.codefactor.io/repository/github/cqref/coachingapp/badge/master)](https://www.codefactor.io/repository/github/cqref/coachingapp/overview/master)
![Github Actions Status](https://github.com/cqref/CoachingApp/workflows/CI/badge.svg)
[![DeepScan grade](https://deepscan.io/api/teams/6380/projects/8382/branches/98461/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6380&pid=8382&bid=98461)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/577d4324c55a4af8bfb4d7c07ecd1420)](https://www.codacy.com/manual/classroomqualityref/CoachingApp?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cqref/CoachingApp&amp;utm_campaign=Badge_Grade)

## New Branch Workflow:

### 1. Create new branch for each new feature you work on
    a. Checkout develop branch with "git checkout develop"
    b. Create new branch from master with "git checkout -b 'feature/<new-branch-name>'" or 'bug/<new-branch-name>'
    c. Add changes
    d. Commit `git commit -m "message"`
    e. Push `git push`
    
### 2. Creating Pull Requests
To learn, check out the [How to Create Pull Requests](https://help.github.com/en/desktop/contributing-to-projects/creating-a-pull-request).

## Available Scripts

### `First Run for Development?`
### `RUN`
    1. npm install
    2. npm run firebase:local
    3. npm run localdev

`npm run firebase:local` will configure and start the Firebase emulator suite. 
On your first run, you  will need to open the emulator suite and add yourself as a user. 
Any data you modify will be saved locally for future use.

In the project directory, you can run:

### `npm run livedev`

Dev server will run which will watch if any file changes and updates instantly.

### `npm run localdev`

Will start the live development server preconfigured with the environment information needed to connect to the Firebase emulators.

### `npm run firebase:local`

Configures the Firebase emulator suite for local development and starts the emulators.

### `npm run prod`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run lint`
Launches the ESlinter to show errors.<br>

### `npm run cypress`
Launches the test runner in the interactive watch mode.<br>

### `npm run test`
Launches the test runner locally in CLI.<br>

### `npm run recordtest`
Launches the test runner in the Cypress Cloud Dashboar<br>

### `npm run devdeploy` Deploy to Dev Environment
1. Make sure you are logged in via firebase-tools cli into CQREF Account
2. run devdeploy in the command prompt.

### `npm run stagingdeploy` Deploy to Staging Environment
1. Make sure you are logged in via firebase-tools cli into CQREF Account
2. run stagingdeploy in the command prompt.

### `npm run deploy` Deploy to Production
1. Make sure you are logged in via firebase-tools cli into CQREF Account
2. run deploy in the command prompt.

### `gcloud functions deploy helloGET --runtime nodejs8 --trigger-http` Deploy Cloud Function
1. Instead of helloGET substitute with function Folder name
2. CI/CD Is not done for Cloud Functions so deploy and submit pull request.

## Learn More
JSDocumentation is Available at [Chalk Docs](https://chalkdocs.web.app).
You can learn more about webpack at [Webpack](https://webpack.js.org/).
To learn React, check out the [React documentation](https://reactjs.org/).
To learn Cypress, check out the [Cypress documentation](https://www.cypress.io/).
