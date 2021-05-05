![Tests](https://github.com/dino16m/scelloo-backend/actions/workflows/tests.yml/badge.svg)
# Scelloo full stack developer backend task

This is an implementation of the fullstack task provided by gokada and implemented by [dino16m](https://github.com/dino16m)

This app contains an expressjs api backend written in Typescript/Javascript using Sequelize as the  ORM:


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
### Starts the built app in production
```
npm run start
```

## Frontend link

https://dino16m.github.io/scelloo-frontend/#

## Backend api link

https://scelloo.herokuapp.com/


### Env Setup

This app needs the following environmental variables set, in order to run, they are;
```
CLIENT_URL = http://some-frontend.me  // the url where the client is hosted, for CORS purposes
DB_URL = '{scheme}://{dbuser}:{dbpass}@{host}:{port}/{dbname}'
```

## API Documentation

## Open Endpoints

Open endpoints require no Authentication.

* [Create user](docs/createuser.md) : `POST /users/create`
* [Create delegatee](docs/createdelegatee.md) : `POST /users/create-delegatee`
* [Approve request](docs/approverequest.md) : `POST /leaves/approve/:requestId`
* [Disapprove request](docs/approverequest.md) : `POST /leaves/approve/:requestId`
* [Get all requests](docs/allrequests.md) : `GET /leaves/all`
* [Get al delegatees](docs/delegatees.md) : `GET /leaves/delegatees`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in a query param in
request. A Token can be acquired from the Create user above.

* [Create request](docs/request.md) : `POST /leaves/request`
* [Get leave balances](docs/balances.md) : `GET /leaves/balances`
