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

_Alternatives_: [Angular][] + [NativeScript][], [Dart][] + [Flutter][]

### GraphQL

[]

_Alternatives_: More REST

### Relay

[]

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
