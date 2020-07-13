# Simple sample for GraphQL server and Next.js client.

## Feature

- Server side
  - Apollo server with Express
  - Authentication
- Client side
  - Next.js
  - Apollo client
- Others
  - Graphql with query, mutation, subscriptions
  - Use graphql-codegen
  - Typescript

## How to use

1. Install packages.

```bash
# At root
yarn install

# or

npm install
```

1. Start project

```bash
yarn dev

# or

npm run dev
```

1. Access the following URL.

- Client: [http://localhost:3000](http://localhost:3000)
- GraphQL: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## What you can do

- Sign up
  - email and password are required. Any strings are OK.
  - The token is stored in cookie.
- Login
- Logout
- List, Add, Delete and subscribe todo.

That's all, very simple :)
