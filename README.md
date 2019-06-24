# How to run Zombie app

## Tools and technologies you need
1. Configured and installed PostgreSQL database
2. NPM and Node.JS (version 10.15.1 recommended)
3. Patience (node_modules, you know...)

## How to install Application
1. Copy and edit `.env.example` to `.env` file according to your needs (PostgreSQL database)
2. Install globally `typescript` and `tsc` packages (depends on your OS)
3. Run `npm install` to install all required dependencies

## How to run locally
There are prepared couple of npm scripts that will help you run application easily.
- `migrate:dev` - to run migrations directly from TS files
- `start:dev` to run app with nodemon
- `start:debug` - to debug application with nodemon
- `start:local` - to start application with ts-node (without nodemon)

## Build and prepare for live
Use following scripts to achieve it
- `build` - transpiles TS files to pure JS
- `migration:run` - run migrations for database
- `start` - run JS compiled application

## Swagger
Swagger API Docs will genenerate automatically when you restart the app.
- You can find the API at: `{YOUR_APP_BASE_URL}/docs/api`

## Contact
Do you enjoy it? Give me feedback here: [drwiega.marcin@gmail.com](mailto:drwiega.marcin@gmail.com)