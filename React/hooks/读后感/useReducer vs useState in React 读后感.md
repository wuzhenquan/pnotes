https://www.robinwieruch.de/react-usereducer-vs-usestate

**Use useState if you have:**

- A) JavaScript primitives as state
- B) simple state transitions
- C) business logic within your component
- D) different properties that don't change in any correlated way and can be managed by multiple useState hooks
- E) state co-located to your component
- F) a small application (but the lines are blurry here)

**Use useReducer if you have:**

- A) JavaScript objects or arrays as state
- B) complex state transitions
- C) complicated business logic more suitable for a reducer function
- D) different properties tied together that should be managed in one state object
- E) the need to update state deep down in your component tree
- F) a medium-sized application (NB: the lines are blurry here)
- G) need for an easier time testing it
- H) need for a more predictable and maintainable state architecture