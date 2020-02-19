# Description

In this project, there is an API which its purpose is check availability for a flight insurance and contract one.

# Instalation

This project is dockerized, so, you can install it using docker-compose and executing this command:

`docker-compose up`

Besides that, you also can install it without Docker, in this case, you need Node.js > 10 and MongoDB > 4 and following these steps:

* Modify the .env file and set your databse connection which you would like to use
* Execute this comand to install dependencies: `npm install`
* For developer environments, run this command: `npm run dev`
* For production environments, run this command: `npm start`

In both cases, the API should be listening on `http://localhost:3001`

# Documentation

You can find a collection postman for all endpoints into documentation folder
