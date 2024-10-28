1. Extract methods in the server for each of the database functions
2. Move your extracted methods into a `CardProvider` adapter
3. Add a `time_created` field to the database (set to server time on object creation)
4. Add a `last_updated` field to the database (set to server time on object creation and update)
5. Rename the `body` column in the table to `contents` (don't change the test, it will still be looking for body in the output of the GET)
6. Supply ids as UUIDs instead of row numbers
7. Rename the sqlite database file from `test.sqlite` to `card.sqlite`
8. Migrate from sqlite to PostgreSQL hosted in a [docker container](https://hub.docker.com/_/postgres)