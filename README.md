# Investments app
An app to check your investments performance. The first release will only cover fixed income analysis.

## Setup the development environment
### Install node dependencies
```
npm install
```
### Start development server
```
npm run dev
```
*It starts an express server with a webpack development middleware. Hot module replacement is not implemented.*

The server will be listening for requests at `http://localhost:3000/`

## Running with production build
To run the app in production mode, in order to analyze the JS bundle size, response times and other optimization opportunities, just set the environment variable `NODE_ENV='production'` and run:
```
npm run build && npm start
```

## To Do
- add tests
