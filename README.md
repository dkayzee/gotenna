# goTenna Photo Viewer

## React UI served through ExpressJS (NodeJS)

For the Kaban board click [here](https://trello.com/b/TELQGlPc/gotenna)

### Packages Used

- React
- Express
- Material-UI
- Axios
- Webpack
- Babel
- Eslint
- Prettier
- Passport
- Redis

## Redis Cache Server

Redis is needed for this application!

Ensure you have redis installed. If you don't follow these instructions:

```sh
brew install Redis
brew services start Redis
```

Turn off redis when you're not using it:

```sh
brew services stop Redis
```

Don't want to download Redis and you are familiar with Docker?

```sh
docker run –name redis -p 6379:6379 -d redis
```

To stop the Redis container:

```sh
docker stop redis
docker rm redis
```

## Production

First install dependencies:

```sh
npm install
```

To create a production build:

```sh
npm run build
```

To start the production environment:

```sh
npm run start
```

## Development

First install dependencies:

```sh
npm install
```

To build and start a development environment that autostarts redis-server:

```sh
npm run dev
```

To build and start a development environment with redis container (started by the user):

```sh
npm run dev:docker
```
