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
  software errors, connection issues, etc. Rather than getting bogged down by this in each view, deal with it once in a
  centralized network layer.

- A centralized network layer opens up possibilities such as better and consistent caching.

_Alternatives_: [Apollo Client][], HTTP requests

### Styled Components

[]

_Alternatives_: StyleSheet.js

# Dev Tooling

### TypeScript

[]

_Alternatives_: [Flow][], [ReasonML][]

### Jest

[]

_Alternatives_: [Mocha][], [Ava][]

### Storybooks

[]

_Alternatives_: [Styleguidist][], Nothing

### VS Code

[]

_Alternatives_: [Atom][], [Sublime Text][], [TextMate][]

## Bonu

### Yarn

[]

_Alternatives_: [NPM][]

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
