# CoachMe Health SMS Care Tool Front End

## Setting Up

#### Tool Dependencies

- Git Clone this repository
- Install relevant NodeJS version as documented in Dockerfile and/or .tool-versions.
  - We recommend you use [ASDF](https://github.com/asdf-vm/asdf) as a language version manager.
- Install Yarn Package Manager

#### Editor Setup

This project uses Typescript, ESLint and Prettier. You should ensure you have your editor, or git hooks setup to run these tools automatically. PRs will not be merged if there are compiler, or lint errors.

We recommend using VSCode as it has very good Typescript support.


#### Running the Project

1. Make sure you have all tool dependencies installed and running
1. Install project dependencies using `yarn install`
1. Setup your local ENV variables using your prefered shell environment management tool (we like [direnv](https://github.com/direnv/direnv).
    - There's only 1 env variable that matters `REACT_APP_API_URL` which should be the URI where the backend is running. One example would be `REACT_APP_API_URL=http://localhost:3001 yarn start`
1. Run the tests, local server, or typescript compiler using the relevant yarn command. `yarn run` will list tasks

## Contributing

You can find info on how to see open features/issues, as well as best practices here - https://github.com/coachmehealth/sms-care-portal-backend#contributing
