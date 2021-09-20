# Overview
This is a <sub><sup>Small</sub></sup> lightweight REST API for a todo list.\
The API is secured using JWT Authentication & role-based authorization.\
The idea behind this simple API is to demonstrate technical ability in a given UI framework.
<!-- User
- This is the default User created by the API
- Can create, edit, list & remove their own todo items
- Can mark todos they own as complete or incomplete
- Users cannot see other users todo items -->

## Notes
There is no setup required, the database will be created (in memory) when the API is run, just copy `.env.test` to `.env`.
You can find the endpoints available in the routes directory or see how the tests interact with the API.
# Instructions
The API is missing a working front-end. To complete the challenge, do the following:
- Create a fork of this repository in your own github account
- Choose a ui framework, preferably React, Angular+ or Vue & create a ui application in folder named "Todo.UI"
- The following functionality should be implemented:
  - State management
  - Register a user and receive a JWT token
  - Log in with your credentials and receive a JWT token
  - View a list of todos
  - Mark a todo as complete or incomplete from the list
  - Add a todo
  - Edit a todo
  - Delete a todo
  - Signout
  - Styling is not a priority
  - Unit tests; you do not need full coverage. A few components is fine.
- Please consider your git history as this will be reviewed
  - Commit & push code regularly
- Once complete, please send a link to your repository to careers@geminisolution.co.za
# Dependencies:
Node v12.6.3

## Scripts
To run the dev environment after install
```
npm run dev
```

To run the tests after install
```
npm run test
```

<!-- # Interview Node Challenge

NodeJS Challenge, creating a REST Todo List API.

## Description & Feature
<sub><sup>Small</sub></sup> lightweight REST API for a todo list.
You should be able to do the following:
- Register a user and receive a JWT token.
- Log in with your credentials and receive a JWT token
- List your todo's
- View your todo's
- Edit your todo's (mark as complete or change the todo)
- Delete a todo

## Dependencies:
- Node v12.6.3

## Scripts
To run the dev environment after install
```
npm run dev
```

To run the tests after install
```
npm run test
``` -->
