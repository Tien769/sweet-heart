# EXPRESS BACKEND

## Installation

---

### Windows 10

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
