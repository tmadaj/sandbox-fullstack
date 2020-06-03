# Project Setup

## Prerequisites

- node >=12
- npm 6
- Chrome >=76 | Edge >=79 | Firefox >=70

## Initialisation

`npm i`

to install dependencies

## Running server

`npm run prod`

lunches a local HTTP server with production build.
Its address is printed out.

### HMR dev server

`npm run build:dll:dev` or `npm run build:dll:prod`

Once to speed up all further builds, React and other infrequently updated libraries are built into a separate bundle.

`npm run dev`

lunches a local HTTP server with development build and Hot Module Reloading.

## Builds

`npm run build:prod` or `npm run build:dev`

## Lint

ESLint and Stylelint are run in build chain.

`npm run lint` for manual

## Tests

`npm run test` for Jest

# TODOs

- TS d config & fixes
- tests
