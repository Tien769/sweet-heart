# SWEET HEART: PASTRIES E-COMMERCE WEBSITE

## Backend Installation

---

1. Install [NodeJS](https://nodejs.org/en/download/)
2. Install [Yarn](https://classic.yarnpkg.com/latest.msi)
3. Create a file with path /sweet-heart/express/.env and add the following:

   ```env
   NODE_ENV=development
   PORT=3001
   HOST='localhost'
   BCRYPT_SALT=12
   REACT_HOST="https://localhost:3000"
   SESSION_SECRET="Loremipsumdoloritame,consecteturadipiscingelitsedoeiusmodtempoincididunutlaboreetdolore"
   ```

4. cd into /sweet-heart/express and run:

   ```shell
    yarn install
    yarn run compile
    yarn run watch:build
   ```

## Frontend Installation

---

1. cd into /sweet-heart/react
2. Create a file with path /sweet-heart/react/.env. Add the follow to the file:

   ```env
   REACT_APP_API_SERVER='http://localhost:3001'
   ```

3. Run command:

   ```shell
   yarn install
   yarn start
   ```
