# Github task project

[![TypeScript version][ts-badge]][typescript-4-7]
[![Node.js version][nodejs-badge]][nodejs]

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].
Api is documented via SwaggerUi.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/rijad992/github-task-project
cd github-task-project
npm i
```

### App Structure

Module defines single feature.
Its defined by controller and entity.
Controller is the one that defines our application routes and handles I/O.
Entity handles business logic.

Services are defined in services folder and contain logic reused trough modules.
Core folder contains all core features of the app as types, enums, models, decorators.

App code is locatedin `src` folder. Application starter is inside `bin` folder.
Unit tests are located inside `__tests__`.

Modules, services and entities are registered to di-container on root level of the app.
Unit tests are performed by jest.

### Development

To start local development server use `npm run dev` script which utilizes nodemon.

### Deployment

Deployment of app is handled with Pulumi IaC written in typesript.
Infrastructure code is contained in `infra` folder.

CI/CD is handled by Github actions which will on push lint, test and build code.
It will than test deployment with `pulumi preview` before deploying container to AWS ECR.
Container is ran on AWS Fargate.

## Available Scripts

- `start` - starts server from build folder,
- `dev` - starts local dev server with nodemon,
- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.7-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2016.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v14.x/docs/api/
[gha-badge]: https://github.com/jsynowiec/node-typescript-boilerplate/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/jsynowiec/node-typescript-boilerplate/actions/workflows/nodejs.yml
[typescript]: https://www.typescriptlang.org/
[typescript-4-7]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/jsynowiec/node-typescript-boilerplate/blob/main/LICENSE
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[wiki-js-tests]: https://github.com/jsynowiec/node-typescript-boilerplate/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io
[volta]: https://volta.sh
[volta-getting-started]: https://docs.volta.sh/guide/getting-started
[volta-tomdale]: https://twitter.com/tomdale/status/1162017336699838467?s=20
[gh-actions]: https://github.com/features/actions
[repo-template-action]: https://github.com/jsynowiec/node-typescript-boilerplate/generate
[esm]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[sindresorhus-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[nodejs-esm]: https://nodejs.org/docs/latest-v16.x/api/esm.html
[ts47-esm]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#esm-nodejs
[editorconfig]: https://editorconfig.org
