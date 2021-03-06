## Create a React Native Repo

```sh
npm install -g react-native-cli
```

Then `cd` to a place where you can make a new React Native project.

```sh
cd dev/projects/js
```

Then create a react native project:

```sh
react-native init MyApp
```

### What just happened?

Things to cover:

- What did `npm install -g react-native-cli` do?
- What does `react-native-cli` do?
- How does a `package.json` work?
- What is this `node_modules` [blackhole](https://i.redd.it/tfugj4n3l6ez.png)?

### The `ios` folder

- Show how it's a normal Xcode project
- Explain why `main.jsbundle` is missing (dist only)
- Explain how the React Native Xcodeproj's live in node_modules

### The user-land code

- Show how the RN view gets defined
- Talk about how RN is basically views all the way down
- Maybe debate that this isn't a perfect abstraction either
- Hit run, it will open the RNP in a terminal.app window

<!--
For nvm users that don’t have a default node version set:
$ cat /Users/eloy/tmp/MyApp/node_modules/react-native/scripts/packager.sh
```
#!/usr/bin/env bash

# Copyright (c) 2015-present, Facebook, Inc.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

THIS_DIR=$(dirname "$0")
echo 'export NVM_DIR="$HOME/.nvm"' >> "${THIS_DIR}/.packager.env"
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> "${THIS_DIR}/.packager.env"
echo 'nvm use 8' >> "${THIS_DIR}/.packager.env"
source "${THIS_DIR}/.packager.env"
cd "$THIS_DIR/.."
node "./local-cli/cli.js" start "$@"
```
-->

### RNP

- Explain the two responsibilities:

  - creating a js bundle (prod)
  - hosting a JS server for RN (dev)

- Show how it can be configured (needed for TS) (rn-cli.config.js - looks basically un-documented)

### RN user code

- Walk through the `App.js`
- Cover the primitives
  * what does the React package bring
  * what does the React Native package bring: `View`, `Text` etc
- Describe what JSX is https://reactjs.org/docs/jsx-in-depth.html
  * how it is transpiled away: https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA

### RN - N integration

- Walk through the `index.js`
- Explain the `AppRegistry.registerComponent(appName, () => App);`
- Go back to the native code, show how `moduleName` is correlated

### Hot Reloading

- In the sim turn on live reloading
- Describe the fundamentals of what makes HMR work
  - E.g. React's strict definitions of state and props allows other code to change under the hood
- Make a change, watch it change

### Adding a Native Module in Swift

- [see this tutorial for images](https://moduscreate.com/blog/swift-modules-for-react-native/)

- In Xcode, add a new Swift file `Logger.swift`:

  ```swift
  import Foundation

  // This class need to be exposed to the obj-c runtime
  @objc(Logger)
  class Logger: NSObject {

    // This class also need to be exposed to the obj-c runtime
    @objc func log(_ file: String, message: String) -> Void {

      print(file, message)
    }

    // Speeds up RN loading, and removes a warning
    @objc static func requiresMainQueueSetup() -> Bool {
      return false
    }
  }
  ```

- You still need an objc file to be able to register the native module with RN using their macros: create `Logger.m`

  ```h
  #import <React/RCTBridgeModule.h>

  @interface RCT_EXTERN_MODULE(Logger, NSObject)

  RCT_EXTERN_METHOD(log:(NSString *)file message:(NSString *)location)

  @end
  ```

- Add `#import <React/RCTBridgeModule.h>` to the bridging header

- Edit `App.js` to include the NativeModule:

```diff
import React, { Component } from "react"
- import { Platform, StyleSheet, Text, View } from "react-native"
+ import { Platform, StyleSheet, Text, View, NativeModules } from "react-native"
+
+ const logger = NativeModules.Logger


export default class App extends Component<Props> {
  render() {
+    logger.log("App.js", "Rendering")
    return (
```

- Re-run the app.
- See the log in the console.
- Talk about how native modules are bridged via the objc/JSC runtime
- Why are they singletons?
