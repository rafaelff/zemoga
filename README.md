# Zemoga portfolio NodeJs app

## DESCRIPTION
Build a simple portfolio NodeJS based web app that displays the profile image, name, some text with the experience, and a 5 tweet list of the
user's Twitter timeline.
The second part should be a very simple API with 2 endpoints of the profile content.

## TERMS
- The data access should be developed using DynamoDB (preferred) or any other No-SQL database.
- Feel free to choose the NodeJS frameworks and/or libraries of your preference to develop both parts of the test and its features (API, data access, views, Twitter integration, etc). but use a serverless architecture and AWS as possible.
- Include some sort of unit tests (e.g. E2E, integration, etc)

### How to run the application
1. Make sure you have a DynamoDB database running
1. Make a copy of the file `.env.example` with the name `.env`
1. Fill the `.env` with the database connection credentials
1. Fill the `.env` with the twitter connection credentials
1. Run `npm install`
1. Run `npm run dev`
1. Access the frontend at `htttp://localhost:3000`
1. Change the user being displayed passing the `username` parameter at the url (ex: `htttp://localhost:3000?username=testuser`)
1. A new user can be registered sending a POST request to `htttp://localhost:3000/portfolio` containing the user data in the body following the expected format seen in the _interface_ at `src/models/portfolioModel.ts`  
1. The tests can be run with `npm run test`

### Tecnologies used
- Node.js
- Typescript
- Aws-DynamoDb
- Jest
- Express
- Twitter-Api
- GitKraken
- Insomnia

Total hours spent in the project: 15
