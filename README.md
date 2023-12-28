# Car market place Node.js Express API with TypeScript 4, Redis, Dcoker implementation



> Node.js Express API with TypeScript 4. Supports MongoDB

## Description
Car market place

### Project Introduction
- suppot ES6/ES7 features
- using tslint followed [Airbnb JavaScript Style Guide]

## Features
##### Authentication:
- OAuth2.0 Server (Authorization code grant, Refresh token grant)

##### Session Storage:
- MongoDB
- Redis

##### Integration testing
- mocha
- chai
- supertest

## Requirements

- node >= 14
- npm >= 6
- mongodb >= 4.0
- typescript >= 4.0

## Installation and start

```bash
npm install 
```


## Running the API

### Development
To start the application in development mode, run:

```bash
npm install
npm run build 
npm start
```

### Start the application docker container

In (dot env) file change MONGO_URI by // MONGODB_URI: 'mongodb://mongo:27017/docker-db',

```bash
docker-compose up

Express server listening on http://localhost:3000/, in development mode/docker


### Testing

```bash
npm test
```

## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.
If you want to add some new variables, you also need to add them to interface and config object (Look `src/config/index.ts`)

## Usage as OAuth2.0 Server
To use this generator as OAuth2.0 server you should implement client side, that will be handle your redirectUris and make requests to `/auth/token/` route. 

### Swagger documentation will be available on route:
Not implemented due to ime constraints
```
```
### Cloud platform
Not deployed on cloud due to ime constraints

Thank you
