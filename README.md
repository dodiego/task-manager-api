# Task Manager API

## Requirements

- [docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/)
- [pnpm](https://pnpm.io/pt/installation)

## Preparing your environment

- run `pnpm i`
- Spin up database container with `npm run db:start`
- Populate database schema and generate types with `npm run bootstrap`
- Populate .env following the rules in src/shared/config.ts

## Running the dev environment

`npm run dev`

## Running the compiled application

`npm start`

## Running tests

`npm test`