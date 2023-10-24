# Developer Documentation

## Setting up Development Environment

### Requirements

1. (Recommended) **VSCode extensions**:

- Docker
- ESLint
- Prettier
- Prisma
- MarkdownLint
- Code Spell Checker

2. **API Testing**: [Postman](https://www.postman.com/)
3. **Docker**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
4. **Runtime Environment**: Node.js >= 19.4

### Installing Dependencies

```bash
cd client
npm install
cd ../server
npm install
cd ..
```

### Set environment variables

Environment variables need to be set in `server/.env`:
```bash
DATABASE_URL="postgresql://admin:admin@db:5432/spendr_database"
PORT=7005
JWT_SECRET=<Your JWT secret>
NODE_ENV="production"
```

## Development

### Running the application in Docker

To start the application, run:
```bash
docker-compose up
```

If you make certain changes and need to re-build, run:
```bash
docker-compose build --no-cache
```

Or you can specifically build one of the containers, for example:
```bash
docker-compose build server --no-cache
```

Access links:
- **pgadmin**: [localhost:5050](http://localhost:5050)
- **client**: [localhost:3000](http://localhost:3000)
- **backend**: [localhost:7005](http://localhost:7005)
- **database**: [localhost:5432](http://localhost:5432)

### Running the frontend locally with hot reload

1. Make sure the backend and db containers are running.
2. Use the following command to start the frontend:
```bash
npm start
```

### Using pgAdmin to View PostgreSQL database

1. **Login**:
   - Email: `admin@admin.com`
   - Password: `root`
2. **Add Server**:
   - Name: `db`
   - Connection:
     - Hostname: `db`
     - Port: `5432`
     - Maintenance Database: `spendr_database`
     - Username: `admin`
     - Password: `admin`

To view data, on the left panel: `Servers` > `db` > `spendr_database` > `Schemas` > `public` > `Tables` > Right click a table > `View/Edit data` > `All Rows`.

### Testing the API with Postman

With the Postman Desktop Client, you can test the API by sending requests to `localhost:7005`. Make sure you fill the body, and set the content type to JSON.

## Disabling Authentication in the Backend for Testing

You can disable authentication in the backend to make testing easier.

To do this, set the environment variable in `server/.env`:
```bash
NODE_ENV='development'
```

**NOTE**: This will completely override authentication and set your `userId` for your requests to be `1`. So if you're signed in to a user with `userId=3` in the frontend and send a request, the backend will still assume `userId=1`.

## Writing Jest Tests with Mocks

### Mocking Authentication

```typescript
const { Request, Response, NextFunction } = require('express');

jest.mock('../../../middleware/authenticate', () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    req.userId = 1;
    next();
  },
}));
```

### Mocking resolved values of the DB

```typescript
prismaMock.budget.create.mockResolvedValue(newBudget);
```

## Checking Code Coverage

To check the code coverage for your Jest tests in the /server directory, use the following command:

```bash
npx jest --collect-coverage
```