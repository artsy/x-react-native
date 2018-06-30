## Node / Npm / Yarn

What is node etc?

- node is the javascript runtime
- run `node` on the CLI, do a few commands.

Running some code in node

- Show how to run a file which does `console.log`
- Show how to `require` a file
- Make a "library" by `mkdir node_modules` and adding the `package.json` with a `main`
- Show how to require that library

How to handle deps

- npm is the package manager
- Unlike CocoaPods npm has no special build projects, or build settings
- Just puts a bunch of files in a folder in an standard format

How to handle dev deps

- You can define dev dependencies differently from normal dependencies

## Babel / TypeScript

Talk about why transpilation exists. E.g. 6to5.

- Only two transpilers in town, Babel and TypeScript
- We're going to use the [Babel REPL](https://babeljs.io/repl) and
  [TypeScript playground](https://www.typescriptlang.org/play/) to explore what this does

## React Native Packager

If you've ever worked on a static site generator like Jekyll. You could consider your React Native app to be similar.
There is a dev mode which watches for changes and keeps the app up to date, and then when you publish it's just a bunch
of static files.

The dev-time watch mode is powered by a project called [Metro](https://github.com/facebook/metro) - it used to be called
React Native Packager, which is a bit more descriptive for our purposes.

## Jest

Jest is the best test runner I've ever used. It blows everything out of the water, and it made me stop ever wanting to
write tests in our native app. Ash Furrow wrote a blog post last year about what it would look like if all of Jest's
features were available [in Xcode here](https://ashfurrow.com/blog/apple-releases-jive/).

- `mkdir jesttest`
- `yarn init -y`
- `touch index.js`
- `yarn add jest`
- `touch index.test.js`
- Add a single test
  ```
  expect(1).toEqual("1')
  ```
- `yarn jest`

So we've wrote our first test, great.

- watch mode
- show some of the matchers
- show mocking system = show snapshots

## VS Code

What makes vscode a solid foundation for building JS projects?

Process separation, extensions API carefully expanded

- Settings.json
- Extensions.json
-
