# Rest TypeScript Server

This is a complete rest server, entirely coded with TypeScript. Is a ready to use server to server apps like a social media app. Was thinked to serve a blog app, but changing some names and adding a few new features, you will be alowed to serve another app like this.

In this case, i used MongoDB and Mongoose for handle all data into the DB. It also includes validations, middlewares,
interface and configs that makes this server a good starting shell for your next project.

## What is this?

This is a ready to use server. You will be able to make http request on the programmed endpoints or set your own ones. Feel free of clone it and modify what you want. All this server was coded with node.js, TypeScript and Express. You can check all the documentation.

[Here are the endpoints](#endpoints)

## Starting with the project

### Testing

_npm test_ runs **nodemon dist/server.js** so we should use it for testing.

### Running the server

_npm start_ runs **node dist/server.js** so we should run to start the server.

## How to use it?

1. First you need to clone the repository

2. After that, you need to download all packages. [Are detailed here](#dependencies)

3. Once you have all installed, you need to set your enviroment variables, this ones are
   into the **example.env** file. There you can set the port or some connections

4. After that, you must run _tsc_ to transpile _Ts_ to _Js_. Then run the test script

5. There are define schemas and DB operations, maybe you want to change all and define
   your own data, but the core is it and using it will allows to save a lot of time!

6. All is ready, you can use your own TypeScript server

## Some extra information

This "shell" includes validated routes, own middlewares, designed SQL schemas,
MongoDB operations with Mongoose (ODM) and some more features. How i said previously, you can modify all that data. To use your own MongoDB, use your .env variables or fill the db/db.config.ts file with your Mongo's link.

## Endpoints

### Users

- http://localhost:5000/api/users (GET)
- http://localhost:5000/api/users/:id (GET one)
- http://localhost:5000/api/users/add (POST)
- http://localhost:5000/api/users/modify/:id (PUT)
- http://localhost:5000/api/users/delete/:id (DELETE)
- http://localhost:5000/api/users/:id/follow/:toId (POST)
- http://localhost:5000/api/users/:id/unfollow/:toId (POST)

### Entries

- http://localhost:5000/api/entries/all (GET all)
- http://localhost:5000/api/entries/entry/:entryID (GET one)
- http://localhost:5000/api/entries/:id (GET user entries)
- http://localhost:5000/api/entries/add/:id (POST)
- http://localhost:5000/api/entries/modify/:entryID (PUT)
- http://localhost:5000/api/entries/delete/:entryID (DELETE)

### Auth

- http://localhost:5000/api/auth/login (POST)
- http://localhost:5000/api/auth/logout/:id (POST)

### Search

- http://localhost:5000/api/search/users/:params (GET)
- http://localhost:5000/api/search/entries/:params (GET)

## Dependencies

You can execute _npm install_. Note that all these packages are installed with types into the devDep, because for TypeScript are required.

- node.js
- typescript
- express
- dotenv
- cors
- mongoose
- nodemon (you must have it downloaded global)
- express-validator
- jsonwebtoken

## Notice

The last version includes a complete users managment, authentication and an entire social media functionality (a blog in this case) with follow-unfollow and searching system. Also includes interfaces, validations, etc.

Good Code!
