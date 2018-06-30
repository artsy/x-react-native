## Node / Npm / Yarn

What is node etc?

Node is a big open source project that takes the JavaScript runtime out of Google Chrome, and wraps it with a process
model and an unix-y API. The JavaScript runtime in Chrome is called v8, the equivalent tht you'd know from the iOS world
is JavaScriptCore. In fact, React Native runs inside JavaScriptCore on iOS, not inside node!

It's worth noting because there are many APIs in node, which are not in React Native. All your tools will be running in
Node though, so you'll need to understand.

Let's take a look at node itself. You can run install node with `brew install node`. Once you start getting serious with
JS with a few projects you'll want to look [at nvm](https://github.com/creationix/nvm/).

#### Running some code in `node`

Let's try and make a one-liner hello world script to run. `cd` to a projects folder, and make a new project called
`x-node`

- `mkdir x-jest`
- `touch index.js`
- Edit the `index.js` to be `console.log("Hello")`
- Run `node index.js`

This should output `Hello` to the terminal. Congrats, you're now a JavaScript programmer, please hand in your Swift
certification on the way out.

So - we've managed to write out a log, it's a good start.

- Show how to run a file which does `console.log`

* Show how to `require` a file
* Make a "library" by `mkdir node_modules` and adding the `package.json` with a `main`
* Show how to require that library

How to handle deps

- npm is the package manager
- Unlike CocoaPods npm has no special build projects, or build settings
- Just puts a bunch of files in a folder in an standard format

How to handle dev deps

- You can define dev dependencies differently from normal dependencies

## Yarn vs NPM

- fixes merge conflicts
- `yarn add` makes sense
- `yarn x` runs the binary
- readable lockfile
- resolutions

downsides:

-have to install yarn

- doesn't have the security analysis in npm
- the registry can be down

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

We're going to make a new folder to try out Jest. Run these:

- `mkdir x-jest`
- `yarn init -y`
- `touch index.js`
- `yarn add jest`
- `touch index.test.js`
- Add a single test
  ```
  expect(1).toEqual("1')
  ```
- `yarn jest`

We've wrote our first test, great. It's a failing one too, so we can see the sort of results Jest gives us back. Let's
take a look at running Jest in watch mode.

```sh
yarn jest --watchAll
```

This will take over the entire terminal, you can close it by pressing `q` or `ctrl + c`. Now any time you press save
inside `index.test.js` it will run your tests. Let's try it, split your screen in half with the code on one side and the
terminal on the other. Then copy & paste these tests in.

```js
describe("literals", () => {
  it("matches numbers", () => {
    expect(3).toEqual(3)
  })

  it("has a more extensive matchers for numbers", () => {
    expect(3).toBeGreaterThan(1)
    expect(23).toBeLessThanOrEqual(50)
  })
})

describe("objects", () => {
  const emptyObj = {}

  it("matches objects", () => {
    expect({}).toEqual(emptyObj)
  })

  it("handles subsets of an object", () => {
    const myData = {
      hello: "world",
      exists: true
    }

    expect(myData).toEqual(expect.objectContaining({ exists: true }))
  })
})
```

The general types of matchers, and a normal RSpec-like `describe` and `it` structure for your tests. Try changing some
of these tests to fail and see what it looks like.

Here's some object-based tests you can play with too:

```js
describe("objects", () => {
  const emptyObj = {}

  it("matches objects", () => {
    expect({}).toEqual(emptyObj)
  })

  it("handles subsets of an object", () => {
    const myData = {
      hello: "world",
      exists: true
    }

    expect(myData).toEqual(expect.objectContaining({ exists: true }))
  })
})
```

One of Jest's most impressive features, and how you tend to write tests in JavaScript is by mocking objects. A mock in
Jest is created by using `jest.fn()`.

```js
describe("mocks", () => {
  it("validates a mock is called", () => {
    const mockFn = jest.fn()
    mockFn("Hi")

    expect(mockFn).toBeCalled()
    expect(mockFn).toBeCalledWith("Hi")
  })

  it("supports giving one off values", () => {
    const mockFn = jest.fn()
    mockFn.mockReturnValueOnce(23)

    const firstValue = mockFn()
    const secondValue = mockFn()

    expect(mockFn).toHaveBeenCalledTimes(2)
    expect(firstValue).toEqual(23)
    expect(secondValue).toBeUndefined()
  })
})
```

A mock in Jest has some great introspection tools, and it really easy to mock dependencies of the code you're testing.
There's one more thing worth showing when looking at the overview of testing with Jest. That is snapshots. These aren't
like FBSnapshots in iOS world, where you have a screenshot of a screen, but instead it's a snapshot of data.

```js
```

## VS Code

What makes vscode a solid foundation for building JS projects?

Process separation, extensions API carefully expanded

- Settings.json
- Extensions.json
-
