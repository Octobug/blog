# Contributing Guide

## Development Setup

### Node.js

The version number is stored in this file: [.nvmrc](../.nvmrc).

After the corresponding [Node.js](https://nodejs.org/) is installed, run:

```sh
# install dependencies
npm install
# start the development server
npm run dev
# build static files for deployment
npm run build
```

There are several other npm script commands in the `scripts` part of [`package.json`](../package.json) that you might want to use.

### Visual Studio Code

If you're using [Visual Studio Code](https://code.visualstudio.com/), there are a few extensions that are really helpful to development for you:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
