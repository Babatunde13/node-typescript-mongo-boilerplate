# Node MongoDB BoilerPlate

Steps to run this project locally:

1. Run `npm i` command.
2. Add your env variables to `.env` file, look at `.env.sample` file for reference.
3. Run `npm run build` to compile the project.
4. Run `npm lint` to lint the project.
5. Run `npm test` to run the test.
6. Run `npm run build:watch` to compile the project in watch mode.
7. Run `npm run dev` to run the server in watch mode.
8. Run `npm start` command  to start the server.

You need to have a database instance to run this project as it uses mongodb to connect to a database, you can also run the server by running `docker-compose up` which will create a docker container for MongoDB then run the instance in a container

Built with [TypeScript](https://www.typescriptlang.org/), [MongoDB](https://www.mongodb.com/) and[Express](https://expressjs.com/).

Built with ❤️ by [@bkoiki950](https://twitter.com/bkoiki950)
