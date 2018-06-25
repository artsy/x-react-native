## Step one, give up

We will not have enough time to go through all the possibilities of a React Native components library.

Fear not though, the full documentation for the entire process is on the Artsy blog here:
http://artsy.github.io/blog/2018/04/17/making-a-components-pod/

It takes about 2 hours to go through that post doing everything manually. So, what we're going to go through is the
higher level abstraction.

## The Aim

We want to introduce React Native to our app. We do not want to mix all of the JavaScript complexity in with our native
complexity. How do we manage complexity normally in software? By separating things into modules of code, and using a
dependency manager to handle a piecing and connecting things together.

So, the aim of this workshop is to _comprehend_ the idea of how Artsy built Emission.

Some links for understanding Emission

- [artsy/emission](https://github.com/artsy/emission/)
- ["On Our Implementation of React Native"](http://artsy.github.io/blog/2016/08/24/On-Emission/)

## How it works

All of our React Native code should be encapsulated inside a CocoaPod. So we'll need to create a new CocoaPods project.
