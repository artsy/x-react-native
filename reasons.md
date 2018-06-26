Goes back [to 2015](https://github.com/artsy/mobile/issues/22)
Further [discussions here](https://github.com/artsy/mobile/issues/65)


Artsy needed better abstractions:
Serious choice to make between Swift and RN
Tried Live Auctions in Swift, tried the new Artist View in RN


Settled on RN for the following reasons:
- De-siloing the mobile team
- Moving business logic into a shared networked layer through Relay / GraphQL.
  Now [Metaphysics](https://github.com/artsy/metaphysics)
- More of the new work could be shared with an Android app, when the time would
  come

