<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Project made to manage the inventory of a bookstore

## Project setup

### 1. First of all you have to clone this repository by using
```bash
$ git clone https://github.com/luiselianmg/bookstore-inventory-api.git
```
### 2. After cloning the project you have to make a copy of the ```.env.example``` and fill it with your credentials. Note that the file already contains credentials, so you can try with those dummy credentials.

### 3. Next you can run the project using docker by running
```bash
$ docker compose up -d
```

## How to interact with the API

### Documentation

You can access this route ```http://localhost:3000/docs``` to see all the API documentation made with swagger.

In case that you prefer to use Postman to interact with the API, you can make an import of the collection that I created with all the endpoints. This collection is available in the route ```postman/bookstore-inventory-api.postman_collection.json```.