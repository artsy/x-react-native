# Artsy Omakase

Summary:

JavaScript is a buffet, and there are a million tools and dependencies to work from. This talk focuses on how and why we
choose to be our major dependencies.

Our constraints:

Building Apps to last ~5 years, and have them be open to change, wanting to share ideas with the web. The aim is to
build out a tight development experience, where we can improve own some of the gaps between these larger projects .

# App Tech

### React

I mean, it is the React in React Native, and none of us would be here without that. Honestly though, React's abstraction
model is very, very good. React is a uni-direction Component model that _can_ replace MVC in a front-end application.
React was built out of a desire to abstract away a web page's true view hierarchy (called the DOM) so that they could
make changes to the view in memory and then React would handle finding the differences between view states.

You create a set of Components to encapsulate each part of the state of the page. React makes it easy to make components
that are functional in the
[Functional Reactive Programming](https://en.wikipedia.org/wiki/functional_reactive_programming) sense. They act like a
function which takes some specially declared state and it is rendered into HTML.

_Alternatives_: [Angular][] + [NativeScript][], [Dart][] + [Flutter][]

### GraphQL

GraphQL is a way to handle API requests. I consider it the successor to REST when working with front-end clients. A big
claim, yeah. So, what is it?

Officially [GraphQL is a specification][graph-spec]. A server can conform to the GraphQL spec, and then clients can make
queries against it. Think of it a bit like how SQL is a standardized way of doing database queries across multiple
databases types.

As a client, you
[send](https://github.com/artsy/eigen/blob/dac7c80b66b600f9a45aaae6095544fe420f0bbc/Artsy/Networking/ARRouter.m#L1011) a
"[JSON-shaped query](http://graphql.org/docs/getting-started/#queries)" structure, which is hierarchical and easy to
read:

```json
{
  "artwork"(id: "kimber-berry-as-close-to-magic-as-you-can-get") {
    id
    additional_information

    is_price_hidden
    is_inquireable
  }
}
```

> This will search for a
> [specific artwork](https://www.artsy.net/artwork/kimber-berry-as-close-to-magic-as-you-can-get), with the response
> JSON as the Artwork's `id`, `additional_information`, `is_price_hidden` and `is_inquireable`.

It's important to note here, the data being sent _back_ is specifically what you ask for. This is not defined on the
server as a _short_ or _embedded_ version of a model, but the specific data the client requested. When bandwidth and
speed is crucial, this is the other way in which GraphQL vastly improves an app-user's experience.

This is in stark contrast to other successors to REST APIs, the hypermedia APIs, like
[HAL](http://stateless.co/hal_specification.html) and [JSON-API](http://jsonapi.org) - both of which are optimised for
caching, and rely on "one model, one request" types of API access. E.g. a list of Artworks would actually contain a list
of hrefs instead of the model data, and you have to fetch each model in a separate request.

Hypermedia APIs have a really useful space in cross-server communications, but are extremely wasteful of the most
precious resource for a front-end device - bandwidth. [Latency matters considerably](latency), on mobile where bandwidth
is spotty, and attention spans are short you need to do everything possible to show more than a loading spinner.

_Alternatives_: More REST, [Hypermedia][]

### Relay

The React for data. Where React declares what views should look like, Relay declares what data those views need. Also
from Facebook.

Being used heavily by the iOS app for over 2 years and invested in by Artsy to make it work the best for us, such as
enhancements to get autocompletion of Artsy’s available data and some compile-time safety to verify that we’re only
trying to access data that actually exists.

- Because these integrate with React components, they follow the same idea of being isolated components that can be
  composed into any view without much wiring up

- Because the data requirements are ‘colocated’ with the UI code, it’s much easier to keep the two in sync and not
  over-fetch data.

- Additionally in our traditional approach all of the data requirements of the UI elements that would get rendered would
  need to be considered and aggregated in a single place, which makes the code/data relationship brittle and a daunting
  task to keep up to date.

- Relay creates efficient queries at compile-time by reducing overlap of data requirements of various components.

- Relay aggregates data requirements into single/few queries, which is especially important for mobile networks with
  high latency, which can lead to longer render times if views can only be rendered once another piece of data is
  fetched first.

- Fetching data over the network can seem simple at first, until you try to deal with the harsh reality of dealing with
  software errors, connection issues, etc. Rather than getting bogged down by this in each view, we get to deal with it
  once in a centralized network layer.

- A centralized network layer opens up possibilities such as better and consistent caching, logging, tracing etc.

_Alternatives_: [Apollo Client][], HTTP requests

### Styled Components

React Native uses an existing CSS layout model called Flexbox, by using a project called Yoga, this moves all of the
layout code onto a background thread and allows you to use the same abstractions that web engineers use.

About 2 years ago, the JavaScript community basically took overthrew the idea of separating style and content and joined
the iOS community in having their app styling be in the same place as their app code. It wraps up the single file
encapsulation that we were looking for.

_Alternatives_: [StyleSheet.js](https://github.com/ryanflorence/js-stylesheet)

# Dev Tooling

### TypeScript

[TypeScript][ts] and [Flow][flow] really moved JavaScript forwards in the last few years. They both tackle the essential
problems of "how can I trust my code does what I think", "how can I be sure of this change" and "how can I build better
tools for JavaScript" in different ways.

Yes, the title of this section is TypeScript and yet I instantly include Flow. I don't think you can, or should talk
about TypeScript without understanding it's relationship to Flow. It's quite possible that you don't know what Flow is,
so I should explain.

Flow and TypeScript both are JavaScript language extensions that add types to the system. In both cases the types are
removed at runtime, so you cannot check if an object conforms to a type class in an `if`.

Both [TypeScript][ts-types] and [Flow][flow-types] provide a structure for applying Types to JavaScript.

Both [TypeScript][ts-infer] and [Flow][flow-infer] will infer typing metadata from untyped data.

Both [TypeScript][ts-def] and [Flow][flow-def] have systems for applying types to un-typed node modules.

From our perspective, working with TypeScript in VS Code is Xcode-like level of integration. Microsoft created a new
standard in how languages and IDEs can communicate with TypeScript that's slowly being adopted by most modern
languages - the Swift team just adopted it for example.

The language is deeply pragmatic, coming from native it's extremely fast, it's a language that allows you to choose the
level of strictness in the compiler. If you have a team of iOS engineers coming from Swift, just turn strict mode and
you've got a useful pedantic compiler. If it's a set of web engineers, don't turn it on and let people use types without
nullability or function rules.

If you were a JavaScript engineer today, you may also be interested in Reason, a new language from Facebook based on
OCaml but with a JavaScript swing. If you're into functional languages, you can write extremely typesafe code which
works with React Native. I've heard it's one of the fastest compilers out there, it's worth keeping an eye on - but
personally I'm in favour of more traditionally imperative languages.

_Alternatives_: [Flow][], [ReasonML][]

### Jest

I can't stress how awesome Jest is. It makes me embarrassed at how bad iOS testing is. Honestly, it's decades away in
features. Let's try highlight a few key major features.

**The watcher** - The majority of your usage of Jest is with it running in watcher mode. This mode uses your git diff as
a seed for what to run tests against. Jest will use that diff to define all the files that the changed code touches, and
then all of the tests that cover those files.

For example, I make a change in one source file and 60 tests run from 6 different test suites. Finishing in under a
second.

**Fast and safe** - You think the watcher is smart? Well the way Jest handle test suites is also extremely elegant. Jest
keeps track of how long each test suite took to run, and then will weigh the test suites across different processes in
order to speed up the overall test suite. If Jest thinks they're all going to be really quick they will all happen in
one process, as that can also be faster.

Each process is a fresh environment of your app, so you can make changes knowing fully well it won't leak into another
test.

**Better Testing Primitives**

- Jest provides a concept called snapshots, which provides an easy way to compare JavaScript objects. This works really
  well for hiding large objects outside of your test code. Like image snapshots, but for data.

- One the flip side, you can have sections of your tests _which jest updates_ in your code. `toMatchInlineSnapshot` will
  take the source code inside your test file and update it with the new code entirely. So you can automate small
  snapshots inline, and larger snapshots into another file.

- Jest's mocking system allows you to mock any file, function or module in your app. It's trivial to do, and has really
  great introspection tools.

_Alternatives_: [Mocha][], [Ava][]

### Storybook

We structured our React Native components as a library. When we first started with React Native it was ok to use the
native view controller scaffolding to work on a screen. This worked for the first two screens but it became hard to
treat our components as a library of shared primitives instead of a screen with a set of unique views.

Storybook came to the rescue here, as it provided an isolated development environment for an individual components. I'd
liken it to making a Swift Playground where you could set up the many potential states a UIView subclass could have. You
don't (or can't) aim to cover them all, but to provide the general shape of what each one looks like.

Because this works with React, you get instant jumping between them, and can handle hot reloading of code for many
states as you work. This makes it a total pleasure to work with.

When we first started, there weren't other options, but since then a project called styleguidist has popped up. It's an
interesting project that

_Alternatives_: [Styleguidist][], Nothing

### VS Code

It's an Electron app, sure, but realistically, it's _the_ electron app. Very few Electron apps have this level of
polish, and Apple could take a considerable amount of ideas from Microsoft's opinions around extensibility. VS Code has
a really controlled, slowly adopted extension API, where the VS Code team help migrate projects using older APIs.

This made it an exceptional editor to build and improve upon. When we decided to move to React Native, we took a look at
all of the options for IDE-level support for JavaScript projects. We explored WebStorm, Atom and Sublime Text as
alternatives.

We didn't want to build our own IDE, which Facebook did with Nuclide, but we wanted to really own the gaps between our
key projects in the Omakase. So, we baked VS Code settings and extensions into our apps, and slowly showed people how
much better it was to work in that environment - till eventually we just had critical mass. Then it became worth our
time to built out vscode-jest and vscode-react-native-storybooks.

_Alternatives_: [Atom][], [Sublime Text][], [TextMate][]

## Bonus

### Yarn

We had a good debate internally about Yarn recently, when we adopted React Native we really felt the pain points of
JavaScript dependency management- having built and maintained an iOS one for so many years. Yarn came out a couple of
months after our adoption of NPM and offered features which were needed.

- A lockfile. I know right?
- Common commands that made more sense - `yarn add danger` vs `npm install --save danger`
- A fast, reliable, offline cache of node modules
- It supported everything that npm supported

NPM ships with node, and it basically the de-facto package manager for node projects . Perhaps a good analogy for Yarn
is if someone recreated CocoaPods as a Swift project and it supported all existing Pods, but made the entire system
simpler for an end-user and required no effort for library authors. It's an interesting mix of working together, while
also competing on features. As opposed to what happened in the iOS community, twice.

In time, NPM gained all of these features (except thel cogial commands) and we kinda just stayed with Yarn. We're not
the only ones either, yarn accounts for 40% (?) of all NPM downloads. Which is why it's in the bonus round.

_Alternatives_: [NPM][]

# Giving Back

We don't want to be idle consumers of these projects. Each of them is a key dependency for us, and we want to both
encourage and shape their growth. The more people are involved, the more stable, mature and long-lasting these projects
remain.

Given that I think tech generally gets reshuffled every five years, we need to help make sure these projects live that
long.

- _React_ / _React Native_, we're not so day-to-day active in the running of these projects, but we're available for
  CocoaPods issues, and strive to provide a lot of native-focused documentation around what makes them tick.

- _GraphQL_, we're less active here, but we've occasionally helped out on the GraphQL working group.

- _Relay_, we helped create an open source outreach project with the team and try to improve documentation and tooling
  for people wanting to use Relay with TypeScript.

- _Styled Components_, we've genuinely not had to help out at all here, it's such an active and well maintained project
  that we've never felt problems with it.

- _TypeScript_, when we originally moved to React Native we chatted with the TypeScript team, and that conversation is
  what led me working on vscode itself. I co-run the TypeScript NYC meetup, and help maintain a lot of the type
  definitions for libraries that we use.

- _VS Code_, we've only sent simpler pull requests to VS Code itself, I think most of our contributions come in the form
  of building extensions and trying to give useful feedback on extension APIs as they come out.

- _Jest_, we built out a lot of the IDE support inside Jest, hang out in the core dev chat room and occasionally try to
  fix CI.

We're not a massive team, and a lot of this is managed by just me and Alloy, but we care, and that adds a lot of value
to the community and ourselves. We can feel more secure in the knowledge that our dependencies are not going to
disappear overnight and dependency owners can feel like more people are invested in the idea.

I've only created one really big multi-year project myself, Danger, the rest has been a case of seeing something else
that just needed more love and really taken someone's ideas and tried to flesh them out. I find that more satisfying.
Which is what makes working and co-owning your dependencies so fulfilling.

[angular]: https://angularjs.org
[nativescript]: https://www.nativescript.org
[dart]: https://www.dartlang.org/
[flutter]: https://flutter.io
[apollo client]: https://www.apollographql.com
[flow]: https://flow.org
[reasonml]: https://reasonml.github.io
[mocha]: https://mochajs.org
[ava]: https://github.com/avajs/ava
[styleguidist]: https://react-styleguidist.js.org
[atom]: https://atom.io
[sublime text]: https://www.sublimetext.com
[textmate]: https://macromates.com
[npm]: https://www.npmjs.com
[hal]: http://stateless.co/hal_specification.html
