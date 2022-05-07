# Rest TypeScript server

This is a complete rest server, entirely coded with TypeScript. Is a ready to use server to authenticate users.
In this case, i used MySQL and Sequalize for handle all users into the DB. It also includes validations, middlewares and configs that makes this server a good starting shell for your next project.

## What is this?

This is a ready to use server. You will be able to make http request on the programmed endpoints or set your own ones. Feel free of clone it and modify what you want. All this server was coded with node.js, TypeScript and Express. You can check all the documentation.

[Here are the endpoints](#endpoints)

## Starting with the project

### Testing

_npm test_ runs **nodemon server.ts** so we should use it for testing.

### Running the server

_npm start_ runs **node server.ts** so we should run to start the server.

## How to use it?

1. First you need to clone the repository

2. After that, you need to download all packages. [Are detailed here](#dependencies)

3. Once you have all installed, you need to set your enviroment variables, this ones are
   into the **example.env** file. There you can set the port or some connections

4. After that, must run the test script

5. There are define schemas and DB operations, maybe you want to change all and define
   your own data, but the core is it and using it will allows to save a lot of time!

6. All is ready, you can use your own TypeScript server

## Some extra information

This "shell" includes validated routes, own middlewares, designed SQL schemas,
Maria DB operations with Sequelize (ORM) and some more features. How i said previously, you can modify all that data. To use your own SQL DB, use your .env variables or fill the db/db.config.ts file with your db name, username, password, host and dialect (MySQL, PostgreSQL, SQL Server, SQLite3, MariaDB). For the dialect, you must install the one that you want, for example, i used _npm install --save mariadb_. After that, you will be able to set it into dialect config. Here is the [Sequelize documentation](https://sequelize.org/docs/v6/getting-started/).

I used Maria DB and phpMyAdmin to manage it. If you don't have any of those installed, maybe you can install WAMP, XAMPP or another similar or directly install phpMyAdmin. More info about [WAMP](https://www.wampserver.com/en/).

## Endpoints

### Users

- http://localhost:5000/api/users (GET)
- http://localhost:5000/api/users/:id (GET one)
- http://localhost:5000/api/users/add (POST)
- http://localhost:5000/api/users/modify/:id (PUT)
- http://localhost:5000/api/users/delete/:id (DELETE)

### Auth

- http://localhost:5000/api/auth/login (POST)

## POSTMAN documentation

You can test all this rest api endpoints with the available link into the description, or cloning this
repository and starting a node server. I recommends to use POSTMAN to test all the endpoints.
[Here is the POSTMAN documentation](https://documenter.getpostman.com/view/20548561/UyrHfYu2).

## Dependencies

You can execute _npm install_. Note that all these packages are installed with types into the devDep, because for TypeScript are required.

- typescript
- node.js
- express
- dotenv
- cors
- sequelize
- nodemon (you must have it downloaded global)
- express-validator

## Notice

The last version includes a authentication system with the DB and all the validations.

Good Code!
