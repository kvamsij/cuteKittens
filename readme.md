# A RestAPI using TDD approach

An api to Create, Read, Update and Delete Kittens details.
Very basic in nature, this is just to give a basic understanding of how my approach to develop an application.

RED -> GREEN -> REFRACTOR

The idea is to add new kitten details (again very simple data) like name, age to the database. using UUID to save auto-generated ***id*** when inserting into database. id is used to getKittenById, updateKitten, deleteKitten.

## Installation Steps

open up the terminal and clone the repo. Then please follow the steps below

- ***npm install***
- ***npm test*** to check the test results and then ***npm run***

- You should be able to see a file generated ***database.sqlite***
- After that you should also able to see the following in the terminal

```text
> cutekittens@1.0.0 start
> cross-env NODE_ENV=development nodemon index.js

[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Cute kittens api is running on port: 3000 
```

- if you have postmon use this link <http://localhost:3000>

## Node packages used

- Server
  - express
- Database
  - Sqlite
- ORM
  - sequelize an ORM to connect to Sqlite database
- Testing
  - jest, supertest for testing

## API Routes to test

You can find this code in the file ***KittensApi.http*** this works using a VS-CODE extension ***REST Client*** or you can use a postmon.

```text

@id = a55ef8d8-f802-4cbe-8f59-a6934f317158

###
POST http://localhost:3000/api/1.0/kittens HTTP/1.1
Content-Type: application/json

{
    "name": "kitten22",
    "age": 4
}

###
GET http://localhost:3000/api/1.0/kittens HTTP/1.1
Content-Type: application/json

###
GET http://localhost:3000/api/1.0/kittens/{{id}} HTTP/1.1
Content-Type: application/json

###
PUT http://localhost:3000/api/1.0/kittens/{{id}} HTTP/1.1
Content-Type: application/json

{
    "name": "kitten2",
    "age": 14
}

###
DELETE http://localhost:3000/api/1.0/kittens/{{id}} HTTP/1.1
Content-Type: application/json
```
