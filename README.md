# Initial setup

This codebase uses `docker` and `docker-compose` to build and run inside virtual
containers. To get started, all you need is to have `docker` installed (see
docs.docker.com for installation instructions).

# Installing JS dependencies

If you make any changes to package.json, make sure to `docker-compose down` and then
`docker-compose up` again to get the docker container to rebuild and restart. This will
trigger the JS dependencies to be updated.

# Running locally

Run `docker-compose up` to build and launch both the backend and the frontend app. The backend is located at http://localhost:4000. The frontend server is located at http://localhost:3000.

# Frontend structure

```
src
|__api
|  |__graphQLClient.ts              (GraphQL Client instance)
|__components                       (For resuable-components)
|  |__LoadingSpinner.tsx
|__context
|  |__phoneBook.tsx                 (Context for phoneBook)
|__features
|  |__Phonebook
|     |__components
|     |  |__addContactModal.tsx     (Modal for adding or updating)
|     |  |__contactList.tsx         (List for contacts where you are able to edit or delete)
|     |__hooks
|     |  |__useMutationAddContact.ts    (Create a contact)
|     |  |__useMutationDeleteContact.ts (Delete a contact)
|     |  |__useMutationUpdateContact.ts (Update a contact)
|     |  |__useQueryGetContacts.ts      (Read all contacts)
|     |__index.tsx
|__App.tsx
|__index.css
|__index.tsx
|__theme.ts (Material UI theme custom variables)
|__types.ts
```

Utilized libraries : `Material UI`, `react-query`, `graphql`, `typescript`

# Backend structure

```
root
|__sql
|  |__init_pg.sql     (Init scripts for postgreSQL)
|__src
|  |__database
|  |  |__migrations   (DB migration script)
|  |  |__seeds        (Seeds for initialize)
|  |  |__db.ts        (Returning DB pool instance)
|  |  |__knexfile.ts  (knex configuration)
|  |__schemas
|  |  |__contacts.ts  (Contact schema)
|  |__services
|  |  |__contacts.ts  (Service for contact)
|  |__index.ts
|__.env
|__dev.sqlite3        (sqlite3 db for development)
|__package.json
|__tsconfig.json
```

Utlized libraries : `knex`, `graphql`, `typescript`, `sqlite3`, `@apollo/server`

# Helpful comments

- Initial db file has been created alreayd by scripts of seed and migration. (dev.sqlite3)
- Availiable npm scripts are defined inside the `package.json`
- `Sqlite3` is being used but the problem is we can't use the `wherILike` on `Sqlite3` this means, while querying the contacts, we are doing `case-sensitive` search. While testing search functionality, please be aware of this one.
