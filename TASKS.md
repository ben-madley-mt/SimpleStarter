1. Extract methods in the server for each of the database functions
2. Move your extracted methods into a `CardProvider` adapter
3. Add a `time_created` field to the database (set to server time on object creation). Do not return it in the output
4. Add a `last_updated` field to the database (set to server time on object creation and update), do not return it in the output
5. Rename the `body` column in the table to `contents` (don't change the test, it will still be looking for body in the output of the GET)
6. Make the primary key of the table UUIDs instead of row numbers, and change access to use the UUIDs
7. Rename the sqlite database file from `test.sqlite` to `card.sqlite`
8. Migrate from sqlite to PostgreSQL hosted in a [docker container](https://hub.docker.com/_/postgres)