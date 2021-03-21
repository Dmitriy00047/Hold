# HoldExpress [dev]

## Star up

To launch server in debug mode simply run following command `docker-compose up`

## Access database via admin page
Once every service launched you can access database UI via http://localhost:8081.

## Setup database
Go to http://localhost:8081 and create database `hold`. Create collection `users` in this database so app can work.

## Upload initial set of users
Go to your `users` collection and import data data from `./data/hold/users`.