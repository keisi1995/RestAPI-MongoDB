# RestAPI-MongoDB
RestAPI, with connection to MongoDB, with jwt authentication.

## Configuration
Enter a terminal and execute the following commands.

## Download the repository to your local machine:
git clone https://github.com/keisi1995/RestAPI-MongoDB.git

## Enter the project:
cd RestAPI-MongoDB

## Install dependencies:
npm install

## Configure our mongoDB container
docker-compose up -d

## Run the Node server:
npm start

## Run the Node server dev:
npm run dev

## EndPoint API:
    -POST / http://localhost:8080/api/v1/authenticate
    -POST / http://localhost:8080/api/v1/user/
    -GET / http://localhost:8080/api/v1/user/
    -GET / http://localhost:8080/api/v1/user/{id_user}
    -PUT / http://localhost:8080/api/v1/user/{id_user}
    -DEL / http://localhost:8080/api/v1/user/{id_user}
