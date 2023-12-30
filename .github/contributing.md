# Contributing Guide

## Development Setup

### Node.js

The version number is stored in this file: [`.nvmrc`](../.nvmrc).

After the corresponding [Node.js](https://nodejs.org/) is installed, run:

```sh
# setup .env
mv .env.tmpl .env
# then fill out the .env

# install dependencies
npm install

# start the development server
npm run dev

# build static files for deployment
npm run build
```

### Atom Feed Preview

Feed contents are built with VitePress's [`buildEnd`](https://vitepress.dev/reference/site-config#buildend) build hook, so you need to run `build` & `preview` to see the results:

```sh
npm run build
npm run preview
```

There are several other npm script commands in the `scripts` part of [`package.json`](../package.json) that you might want to use.

### Visual Studio Code

If you're using [Visual Studio Code](https://code.visualstudio.com/), the extensions below are really helpful for you to set up the development environment:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
