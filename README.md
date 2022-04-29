## Getting started

### Setting up a project

* Move into your projects directory: `cd ~/YOUR_PROJECTS_DIRECTORY`
* Clone this repository: `git clone https://gitlab.openxcell.dev/fitnessapp/backend.git`
* Move into the project directory: `cd backend`
* Install the dependencies: `npm install`

### Working on the project

* Move into the project directory: `cd ~/YOUR_PROJECTS_DIRECTORY/YOUR_PROJECT_NAME`
* Run the development task: `npm start`
    * Starts a server running at http://localhost:8000
    * Automatically restarts when any of your files change

## Databases

By default, the template is configured to connect with Mysql database. If you want to change database then change into `database.js` file.

## Migration

### Create migration file
``sequelize migration:generate --name <filename>``

### Create seeder file
``sequelize seed:generate --name <filename>``

### Undo single migration file
``node_modules/.bin/sequelize db:migrate:undo --env <env> --name <migration-name>``

### Run single seed file
``node_modules/.bin/sequelize db:seed --seed <seed-name> --env <env>``

### Run seed
``npm run seed``

### Run migration
``npm run migrate``