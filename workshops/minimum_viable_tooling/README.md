## Node / Npm / Yarn

## What is Node

Node is a big open source project that takes the JavaScript runtime out of Google Chrome, and wraps it with a process
model and an unix-y API. The JavaScript runtime in Chrome is called v8, the equivalent tht you'd know from the iOS world
is JavaScriptCore. In fact, React Native runs inside JavaScriptCore on iOS, not inside Node!

Let's take a look at Node itself. You can install Node with `brew install node`. Once you start getting serious with JS
with a few projects you'll want to look [at nvm](https://github.com/creationix/nvm/) to handle different versions
elegantly.

#### Running some code in `node`

Let's try and make a one-liner "hello world" script to run. `cd` to a projects folder, and make a new project called
`x-node`

- `mkdir x-node`
- `touch index.js`
- Edit the `index.js` to be `console.log("Hello")`
- Run `node index.js`

This should output `Hello` to the terminal. Congrats, you're now a JavaScript programmer, please hand in your Swift
certification on the way out.

So - we've managed to write out a log, it's a good start. Let's make a function, change `index.js` to be this:

```js
// https://www.youtube.com/watch?v=czgOWmtGVGs
var toKurzgesagtYear = year => year + 10000
```

If you add `console.log(toKurzgesagtYear(2018))` and re-run your script with `node index.js` it should print out the
number `12018`.

In JavaScript the boundaries of code resolution is at a file level, not at a "target" like in iOS projects, so if you
want to use a function from another file - you'll need to include it. We're going to use the `require` function to
import it. You probably won't do this in production code, but that's OK - we're doing this to understand boundries, not
perfect code.

- Make a new file: `touch toKurzgesagtYear.js`
- Make the code in `toKurzgesagtYear.js`:

  ```js
  var toKurzgesagtYear = year => year + 10000
  module.exports = toKurzgesagtYear
  ```

- Then we can change `index.js` to require that function:

  ```js
  const toKurzgesagtYear = require("./toKurzgesagtYear")
  console.log(toKurzgesagtYear(2018))
  ```

Congrats - we now know how to do file imports. Let's go one step further, and turn this into library code.

We want move our `toKurzgesagtYear` into it's own library to do that. For Node, the file system is the source of truth
for all of your code, so libraries are just folders with a convention. Let's make one that conforms.

- `mkdir node_modules`
- `mkdir node_modules/toKurzgesagtYear`

Then we add a `package.json` file to `node_modules/toKurzgesagtYear`, this will tell the `require` function where to
find the code for the library.

- `touch node_modules/toKurzgesagtYear/package.json`
- Edit `node_modules/toKurzgesagtYear/package.json` to say:

  ```json
  {
    "main": "index.js"
  }
  ```

- Make `touch node_modules/toKurzgesagtYear/index.js` and have it be the same as `toKurzgesagtYear.js`:

  ```js
  var toKurzgesagtYear = year => year + 10000
  module.exports = toKurzgesagtYear
  ```

OK, now we need to make a minor change to our `index.js`, change

```diff
- const toKurzgesagtYear = require("./toKurzgesagtYear")
+ const toKurzgesagtYear = require("toKurzgesagtYear")
console.log(toKurzgesagtYear(2018))
```

If you run `node index.js` then you should see `12018` and :tada: you've made a library.

### So... ok... how... do we go from that... To this diagram?

![http://devhumor.com/content/uploads/images/August2017/node-modules.jpg](http://devhumor.com/content/uploads/images/August2017/node-modules.jpg)

We use a dependency manager, you have a choice of two. [NPM][] and [Yarn][]. They both have the same dependencies, so
you're not really losing out if you use either. They compete on features mainly. Both are great.

I use yarn, and because I'm running the workshop - so are you. Install it via `npm install -g yarn` - we're using one
dependency manager to install another. Meta.

Let's make a new folder, so go out of `x-node` with `cd ..` and make a new folder called `x-yarn` with `mkdir x-yarn`.

Inside `x-yarn` run `yarn init` to create your `package.json` - this is a JSON file that represents your project. Once
you've filled that out, we're going to add some dependencies to this new project.

We're going to add a dependency, `dadjokes-wrapper`. Because the project is entirely defined inside a JSON file it can
be handled by tools. So to add a dependency, instead of editing the package.json - you should run this command:

```sh
yarn add dadjokes-wrapper
```

That will add it to the package.json and set up a bunch of dependencies. If you're interested in how many dependencies
that's added, run `ls -1 node_modules | wc -l` and remember that there isn't really something like Foundation from
Apple - so you end up with this big tree of dependencies.

```
~/dev/projects/tmp/x-yarn
❯ tree node_modules/
node_modules/
├── @sindresorhus
│   └── is
│       ├── dist
│       │   ├── example.d.ts
│       │   ├── example.js
│       │   ├── example.js.map
│       │   ├── index.d.ts
│       │   ├── index.js
│       │   ├── index.js.map
│       │   └── source
│       │       ├── index.d.ts
│       │       ├── index.js
│       │       ├── index.js.map
│       │       └── tests
│       │           ├── test.d.ts
│       │           ├── test.js
│       │           └── test.js.map
│       ├── license
│       ├── package.json
│       └── readme.md
├── cacheable-request
│   ├── LICENSE
│   ├── README.md
│   ├── node_modules
│   │   └── lowercase-keys
│   │       ├── index.js
│   │       ├── package.json
│   │       └── readme.md
│   ├── package.json
│   └── src
│       └── index.js
├── clone-response
│   ├── LICENSE
│   ├── README.md
│   ├── package.json
│   └── src
│       └── index.js
├── core-util-is
│   ├── LICENSE
│   ├── README.md
│   ├── float.patch
│   ├── lib
│   │   └── util.js
│   ├── package.json
│   └── test.js
├── dadjokes-wrapper
│   ├── LICENSE
│   ├── README.md
│   ├── index.js
│   ├── package.json
│   ├── test
│   │   └── index.spec.js
│   └── yarn.lock
├── decode-uri-component
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── decompress-response
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── duplexer3
│   ├── LICENSE.md
│   ├── README.md
│   ├── index.js
│   └── package.json
├── from2
│   ├── LICENSE.md
│   ├── README.md
│   ├── index.js
│   ├── package.json
│   └── test.js
├── get-stream
│   ├── buffer-stream.js
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── got
│   ├── errors.js
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── has-symbol-support-x
│   ├── LICENSE
│   ├── README.md
│   ├── badges.html
│   ├── index.js
│   ├── lib
│   │   ├── has-symbol-support-x.js
│   │   ├── has-symbol-support-x.min.js
│   │   └── has-symbol-support-x.min.js.map
│   ├── package.json
│   └── tests
│       ├── index.html
│       ├── run.js
│       └── spec
│           └── test.js
├── has-to-string-tag-x
│   ├── LICENSE
│   ├── README.md
│   ├── badges.html
│   ├── index.js
│   ├── lib
│   │   ├── has-to-string-tag-x.js
│   │   ├── has-to-string-tag-x.min.js
│   │   └── has-to-string-tag-x.min.js.map
│   └── package.json
├── http-cache-semantics
│   ├── README.md
│   ├── node4
│   │   └── index.js
│   └── package.json
├── inherits
│   ├── LICENSE
│   ├── README.md
│   ├── inherits.js
│   ├── inherits_browser.js
│   └── package.json
├── into-stream
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── is-object
│   ├── LICENSE
│   ├── README.md
│   ├── index.js
│   ├── package.json
│   └── test
│       └── index.js
├── is-plain-obj
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── is-retry-allowed
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── isarray
│   ├── Makefile
│   ├── README.md
│   ├── component.json
│   ├── index.js
│   ├── package.json
│   └── test.js
├── isurl
│   ├── LICENSE
│   ├── README.md
│   ├── index.js
│   └── package.json
├── json-buffer
│   ├── LICENSE
│   ├── README.md
│   ├── index.js
│   ├── package.json
│   └── test
│       └── index.js
├── keyv
│   ├── LICENSE
│   ├── README.md
│   ├── package.json
│   └── src
│       └── index.js
├── lowercase-keys
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── mimic-response
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── normalize-url
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── object-assign
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── p-cancelable
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── p-finally
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── p-is-promise
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── p-timeout
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── pify
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── prepend-http
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── process-nextick-args
│   ├── index.js
│   ├── license.md
│   ├── package.json
│   └── readme.md
├── query-string
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── quick-lru
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── readable-stream
│   ├── CONTRIBUTING.md
│   ├── GOVERNANCE.md
│   ├── LICENSE
│   ├── README.md
│   ├── doc
│   │   └── wg-meetings
│   │       └── 2015-01-30.md
│   ├── duplex-browser.js
│   ├── duplex.js
│   ├── lib
│   │   ├── _stream_duplex.js
│   │   ├── _stream_passthrough.js
│   │   ├── _stream_readable.js
│   │   ├── _stream_transform.js
│   │   ├── _stream_writable.js
│   │   └── internal
│   │       └── streams
│   │           ├── BufferList.js
│   │           ├── destroy.js
│   │           ├── stream-browser.js
│   │           └── stream.js
│   ├── package.json
│   ├── passthrough.js
│   ├── readable-browser.js
│   ├── readable.js
│   ├── transform.js
│   ├── writable-browser.js
│   └── writable.js
├── responselike
│   ├── LICENSE
│   ├── README.md
│   ├── package.json
│   └── src
│       └── index.js
├── safe-buffer
│   ├── LICENSE
│   ├── README.md
│   ├── index.d.ts
│   ├── index.js
│   └── package.json
├── sort-keys
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── strict-uri-encode
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── string_decoder
│   ├── LICENSE
│   ├── README.md
│   ├── lib
│   │   └── string_decoder.js
│   └── package.json
├── timed-out
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── url-parse-lax
│   ├── index.js
│   ├── license
│   ├── package.json
│   └── readme.md
├── url-to-options
│   ├── LICENSE
│   ├── README.md
│   ├── index.js
│   └── package.json
└── util-deprecate
    ├── History.md
    ├── LICENSE
    ├── README.md
    ├── browser.js
    ├── node.js
    └── package.json

71 directories, 242 files
```

Let's make an `index.js` and add this;

```js
const DadJokes = require("dadjokes-wrapper")
const dj = new DadJokes()

dj.randomJoke().then(res => console.log(res))
```

Then run `node index.js` and it should echo out a terrible joke.

```sh
~/dev/projects/tmp/x-yarn
❯ node index.js
This morning I was wondering where the sun was, but then it dawned on me.
```

Awesome.

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

[npm]: https://www.npmjs.com
[yarn]: https://yarnpkg.com/en/
