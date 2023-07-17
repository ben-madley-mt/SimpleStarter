# SimpleStarter

## About 

This repo contains a base for an exercise in migrating code in production. The app is a very basic REST API for cards with a title and body (sort of like Trello without the lists). It contains 3 parts:

### `server`

This code represents the code that would be running on your server. It contains endpoints for Create, Read, Update and Delete and uses a sqlite database.

### `client`

This code represents a client library the consumers of your API would be using. This might be analogous to the client-side javascript that your web page has, or a backend service separate to the server.

### `test.js`

This file will repeatedly call the server via the client, and then report stats to you. It's main cycle is to create a card, read the card, update the card, and delete the card. It reports how many attempts it's made to do each call and the success rate. You can configure how many workers are operating simultaneously and the delay between each call. On my machine, the database can handle 500 workers at maximum delay of 4 seconds.

## Using this repo

Install with `npm install`, start the server in one terminal with `npm run start`, and start the test script with `npm run test` or `node ./test.js -w <number of workers> -d <max delay>`.

Now try and either refactor the code, or migrate the database, with as little downtime as possible. **Do not stop the server or the test.** Deploy new versions of the server with `npm run deploy-server`, and new versions of the client with `npm run deploy-client`. This will copy them into the `LIVE` server where the server and test script run from.

Access the database with `sqlite3 test.sqlite`. The only table is the `card` table.